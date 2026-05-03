---
title: "IRCTC: A Solution Document"
description: "Diagnosing Tatkal and designing what should replace it. Three concrete proposals — a two-track Tatkal lottery, a Booking Reputation Score, and an atomic booking pipeline that kills 'money debited, no ticket'."
date: "2026-04-26"
category: "Teardown"
readTime: "30 min"
featured: true
---

*Diagnosing Tatkal and designing what should replace it.*
*~12 pages. Read end-to-end in 30 minutes.*
*Produced April 2026.*

---

## 1. TL;DR

IRCTC processes about **14 lakh tickets a day** across one of the most-used digital platforms in India. Yet booking a Tatkal ticket on a popular route remains the most reliably broken digital experience in the country — a state of affairs that has produced an entire third-party industry (ConfirmTkt, Ixigo, RailYatri, Trainman) and a parasitic agent economy operating openly on WhatsApp.

This document is short, and is built around a single argument:

> **The 10:00 AM Tatkal rush is the load-bearing wall. Every other failure descends from it. Take the synchronised rush away, and the rest can be fixed.**

We propose three concrete changes:

1. **Two-track Tatkal.** Replace the synchronised 10:00 AM window with two complementary tracks: an Aadhaar-anchored *lottery* opening at T − 24 hours for ~80% of inventory (no rush, no race, allocation is a function of identity, not network speed), and a *true last-minute virtual queue* opening at T − 6 hours for the remaining ~20% (preserves the genuine emergency-travel use case Tatkal was originally built for, without a thundering herd).

2. **Booking Reputation Score (BRS).** Replace the captcha → OTP → Aadhaar-OTP gate stack with a reputation-based access tier system. Genuine repeat users with verified travel history get smoother UX. New accounts and anomalous behaviour get extra friction. Account-creation clustering (the "100 accounts from one VPS" attack) is detected at *creation time*, not booking time.

3. **Atomic booking pipeline + user-side observability.** End the "money debited, no ticket" failure with idempotent payment intents, automatic reconciliation, and a persistent reference ID that lets the user check the status of any booking attempt at any time, on any device. Recover from failures within 60 seconds instead of 30 days.

Each of these proposals is designed to *complement* the cloud-native PRS rewrite already in flight at CRIS (target completion mid-2026, capacity goal 1.25–1.5 lakh tickets per minute).[^pib-new-prs] Phase 1 ships safely on the current PRS. Phases 2 and 3 ride on top of the new PRS once it lands.

Total implementation horizon: **12–18 months for full rollout**, with the highest-leverage user-visible wins (atomic booking, reference-ID observability, and the Tatkal lottery on a few pilot routes) shipping in the first 6–9 months.

The rest of this document explains why each change is necessary, why this specific combination is the right one, and what implementation looks like.

---

## 2. The Problem

If you have ever lost a Tatkal seat at 10:00:07 AM, watched money leave your bank account with no ticket on the other end, or refreshed a "Session expired" screen for the third time while a Rajdhani fills up around you — you have already met the problem this document is trying to solve.

IRCTC was built around assumptions that were correct in 2002 and are now broken — not slightly broken, but broken in the way that the load-bearing wall of a house is broken when you have added three more floors than it was designed for. Seven of those assumptions are doing the structural breaking.

### 2.1 — The seven assumptions

1. **Built for desktops, broadband, and English.** Most bookings now come from mobile phones, in vernacular languages, on patchy networks. The 2025 launch of *RailOne* — pitched as a mobile-first replacement — is itself the most authoritative admission that the 2002 baseline does not fit.[^onmanorama-railone]

2. **Booking happens at a leisurely pace.** For a large segment of users, Tatkal *is* the booking strategy. The 10:00 AM (AC) and 11:00 AM (non-AC) windows are not last-resort options — they are the front door. The platform faces a self-inflicted denial-of-service event from its own legitimate users twice every day.

3. **The user is honest.** During the first five minutes of a Tatkal opening, automated bot traffic accounts for **roughly half of all login attempts**.[^republic-bot-share] An entire industry — browser extensions, headless-browser farms, captcha-solver APIs, WhatsApp-based agent markets — has grown up around defeating each gate IRCTC erects.

4. **Payments take a few seconds, and that's fine.** UPI is now the dominant payment rail and users expect sub-second confirmation. The mismatch between UPI's expected latency, the gateway's internal timeout, and IRCTC's own seat-hold timer creates a three-way race. The most painful symptom — money debited, no ticket — is among the most-cited complaints across user channels.[^onmanorama-railone]

5. **A captcha is enough to keep bots out.** Every layer (text-captcha, question-captcha, SMS-OTP, even Aadhaar-OTP) has been independently defeated cheaply. The Government's mandatory Aadhaar-OTP rollout for Tatkal in July 2025[^pib-aadhaar-tatkal] is itself the official admission that the prior gate had stopped working.

6. **Sessions stay alive, networks stay still.** Mobile users move between cell towers, jump between Wi-Fi and 4G, and lose connectivity for tens of seconds at a time. Sessions tied to server affinity die mid-form, producing the canonical "Session expired" interruption.

7. **A booking is a single transaction.** Booking has become an *anxiety event* — multi-tab, multi-app, family-coordinated. The existence of a thriving multi-app third-party ecosystem (ConfirmTkt, Ixigo, RailYatri, Trainman) is the audit of this assumption.

### 2.2 — Tatkal: where all seven fail at once

Tatkal is the most extreme expression of these assumptions colliding with reality, and it is therefore the spine of this document.

The 10:00 AM math is unforgiving: lakhs of legitimate users, plus an industrial bot layer, all hitting a fixed pool of roughly 1,500 seats per popular train, against a platform-wide throughput ceiling of about **25,000 to 32,000 tickets per minute**.[^ddnews-capacity] During peak Tatkal minutes, traffic spikes are estimated at over ten times normal load.

The four user-visible failure modes that consume most of the lived Tatkal experience — captcha rendering loops, login failure at the clock-tick, "session expired" mid-form, and multi-passenger forms resetting on submit — are all in the **fixability ≥ 3** zone, meaning they could be materially improved without a backend rewrite. The fact that they have not been is itself diagnostic: every reform to date has added gates at the front door rather than addressing the synchronised rush itself.

### 2.3 — Premium Tatkal: the dark pattern in plain sight

In 2014, the Government rolled out *Premium Tatkal* under emergency-travel framing. Structurally, the scheme did not add inventory. It **converted roughly 50% of the existing fixed-price Tatkal quota into dynamic-priced Premium Tatkal**.[^deshgujarat-pt] On 9 August 2024, the Bengaluru–Kolkata SMVB Howrah Express 2A Premium Tatkal fare reached **₹10,100**, against a standard 2A base fare of approximately ₹2,900 — a 3.5× multiplier on the same seat, on the same train, on the same day.[^bs-premium-extreme] Users either pay the surge or go without. This is not a feature. It is structural extraction from precisely the users — last-minute travellers — that the original Tatkal scheme was designed to help.

### 2.4 — Where the system actually is, technically

The PRS — the engine that issues every ticket — was originally built in **C and FORTRAN on DEC VAX OpenVMS** in the 1980s, with a **Reliable Transaction Router (RTR)** middleware. It later migrated to **HP-UX with Oracle RDBMS**.[^cris-wiki] CRIS operates two hot-hot data centres (Delhi and Navi Mumbai). Throughput is reported at 25–32K tickets per minute today.

A **cloud-native rewrite** is in flight: CRIS issued an RFP in October 2023, with a target completion in mid-2026, a publicly-stated capacity goal of **1.25–1.5 lakh tickets per minute**, and a budget reported at approximately **₹1,000 crore**.[^pib-new-prs] This document is published with that modernisation explicitly in mind. The proposals in §3 and §4 are designed to be *complementary* to it: assuming the new PRS lands as advertised, what should sit on top of it.

### 2.5 — Why now

Three reasons:

- The cloud-native rewrite at CRIS provides a once-in-a-decade opportunity to retire architectural assumptions rather than just performance bottlenecks.
- The July 2025 Aadhaar-OTP and 30-minute agent-lockout reforms[^pib-aadhaar-tatkal] are official acknowledgements that the existing gate-based defence has failed — the policy door is open.
- The third-party ecosystem is large enough (and the agent-mafia visible enough) that the cost of *not* fixing this is now legible: it shows up as users opening WhatsApp instead of opening RailOne.

---

## 3. Solution — Backend & Anti-Bot Architecture

The proposals here are the smallest set of changes that retire the most assumptions from §2.

### 3.1 — Two-track Tatkal (replace the 10 AM thundering herd)

**The problem to solve.** The synchronised 10 AM rush is the root cause of most Tatkal failures. Every defence layered on top of it (captcha, OTP, Aadhaar) shifts the failure rather than eliminating it, because the underlying load mismatch *is* the synchronisation itself.

**The proposal.** Split Tatkal inventory into two tracks, served on different timelines:

**Track A — Aadhaar-anchored lottery (~80% of current Tatkal inventory)**

- Opens at **T − 24 hours** before train departure as an *intent registration* window.
- User registers train, date, class, passenger list. **One Aadhaar = one entry per train.**
- Lottery runs at **T − 12 hours**. Winners notified. Payment window of 2 hours.
- No rush. No 10 AM. Allocation is a function of Aadhaar identity, not network speed.

**Track B — True last-minute (~20% of current Tatkal inventory)**

- Opens at **T − 6 hours** before train departure.
- Virtual queue: users get a position; served first-come within available inventory; *no instant FCFS race*.
- Modest fixed surcharge — not Premium-Tatkal-style dynamic pricing.

```
DEPARTURE TIMELINE  (T = train start time)

T − 24h   Track A intent registration opens         (no rush; mobile-first)
T − 12h   Track A lottery runs; winners notified    (allocation event)
T − 10h   Track A payment window closes             (forfeiture rule applies)
T − 6h    Track B virtual queue opens               (queued FCFS)
T − 3h    Track B closes; charting begins
T         Train departs
```

**Why this is better than the existing system.** It eliminates the synchronised window completely. It kills the timing arbitrage that bots exploit (an Aadhaar-anchored lottery has nothing to time-attack — being faster gives no advantage). It preserves both halves of Tatkal's original intent: the majority of users who plan a day ahead, *and* the minority of genuinely-can't-plan-ahead travellers. It recasts Premium Tatkal as a fair fixed surcharge instead of a dynamic-pricing extraction.

**Why this is better than a pure 24-hour bid/lottery.** A pure lottery loses the truly-last-minute case Tatkal was originally built for. Track B preserves it, in a controlled way.

### 3.2 — Booking Reputation Score (BRS): anti-bot through reputation, not gates

**The problem to solve.** Every gate added so far (captcha, SMS-OTP, Aadhaar-OTP) punishes legitimate users (rendering loops, OTP delivery delay) without stopping determined adversaries. Adding more gates makes the user experience worse for humans without making it worse for bots.

**The proposal.** Replace the gate-based defence with a *reputation-based access tier system*. Every Aadhaar-verified account carries a Booking Reputation Score (BRS), 0–100. The score controls how much friction the user experiences during peak windows.

**BRS inputs (signals, weighted):**

| Signal | Effect | Why bots can't fake it cheaply |
|--------|--------|------------------------------|
| Account age | + | Aging fake accounts costs real time and money |
| Successful past bookings | ++ | Hard to fake at scale without real travel |
| Travel completion (verified GPS or station scan) | +++ | Very hard to fake |
| Cancellation rate | − | Excessive cancellations downweight the score |
| Device-family consistency | + | Rotating device fingerprints flagged |
| Behavioural fingerprint (typing cadence, scroll patterns, navigation) | ++ | Hard for headless browsers to mimic convincingly |
| Network reputation (residential IP vs cloud / VPS) | + | VPS-origin traffic deeply downweighted |
| **Account-creation clustering** | −−− | **Multiple accounts from same IP / device family flagged at *creation* time, before booking** |

**BRS friction tiers at Tatkal entry:**

| Score | Friction |
|-------|----------|
| 70+ | Instant entry; Aadhaar OTP only |
| 30–70 | Aadhaar OTP + brief verification wait (5–15 sec) |
| < 30 / new account | Aadhaar OTP + ₹10 refundable hold + extended wait |
| Anomaly flag | Routed to manual-review queue; blocked from immediate booking |

**Why this works.** A reputation system *rewards* genuine repeat users with smoother UX. Bot farms have to spend real money and time to age accounts, and account-creation-cluster detection catches them at the moment of creation, not at booking time. Behavioural fingerprinting catches sophisticated bots that pass Aadhaar but cannot mimic human navigation under load.

### 3.3 — Atomic booking pipeline (kill "money debited, no ticket")

**The problem to solve.** Today, the seat-hold and payment confirmation steps are not strictly atomic. A timeout in either direction can leave the user paid-but-not-confirmed, recoverable only via a 30-day TDR refund.

**The proposal.** Make the seat-hold + payment pair into a single atomic state machine, with explicit recovery for each failure transition.

```
[Search]
   │
   ▼
[Hold seat — 30s TTL, idempotent]
   │
   ▼
[Payment intent created with idempotency key]
   ├─ Payment success      → [Confirm + PNR issued]
   ├─ Payment timeout      → [Reconciliation worker queries PG by idempotency key]
   │                              ├─ PG says "succeeded" → [Confirm + PNR issued]
   │                              └─ PG says "failed"    → [Auto-refund initiated]
   └─ Hold TTL expires     → [Auto-release; user notified]
```

Two architectural commitments:

- **Idempotency keys** on every payment attempt — retries never create duplicate bookings.
- **Reconciliation worker** that queries the payment gateway for *every in-flight intent* every few seconds and resolves the booking state without waiting for the user.

**Result.** "Money debited, no ticket" stops being a 30-day TDR problem and becomes a sub-60-second auto-resolution.

### 3.4 — User-side observability: a "where is my booking" surface

**The problem to solve.** When something goes wrong today, the user sees "Something went wrong" with no error code, no recovery path, and no visibility into whether the booking actually went through.

**The proposal.** Every booking attempt gets a **persistent reference ID** (e.g. `R-A47B-9C82`) generated at search time. The user can look up "the status of booking attempt R-A47B-9C82" from any device, at any time, without needing the original session. The status surface returns:

- Where in the pipeline the attempt is (search / hold / payment / confirm).
- What happened on the last transition.
- The recovery path (retry / refund / contact support) if applicable.

This is the user-side equivalent of an order-tracking page on an e-commerce app. It does not require a PRS rewrite — it can be built as a thin reconciliation layer on top of the existing PNR + payment systems, which makes it the **highest-leverage Phase 1 deliverable** in this document.

### 3.5 — Migration path

| Phase | Scope | Estimated duration |
|-------|-------|---------------------|
| 1 | BRS scoring engine, atomic booking pipeline, payment idempotency keys, reference-ID observability surface (all backwards-compatible with the current PRS) | 3–4 months |
| 2 | Two-track Tatkal piloted on 5–10 high-demand routes (feature-flagged) | 4–6 months |
| 3 | Full rollout, UX refresh (§4) shipped alongside | 12–18 months |

The new PRS rewrite from CRIS lands during Phase 2 / 3. These proposals are designed to ride on top of it, not in conflict with it.

---

## 4. Solution — UX Patterns

The four highest-value moments in the user's journey, each redesigned around the architecture in §3.

### 4.1 — The Tatkal queue UI

**Today.** "Tatkal opens at 10:00 AM. Log in. Fight the captcha loop. Fill the form fast. Hope the session doesn't expire. Hope the seat doesn't disappear at payment."

**Tomorrow — Track A (lottery).** A calm asynchronous flow that mirrors how IPL ticket lotteries already work in India.

```
T − 24h   "Register interest" screen.
          User picks: train, date, class, passengers.
          One-Aadhaar-one-entry banner clearly shown.
          Confirmation: "Lottery runs at <time>. We will notify you."

T − 13h   Push notification + SMS: "Lottery in 1 hour."

T − 12h   Lottery runs server-side.
          Winners get push + SMS:
          "You've got a seat! Pay within 2 hours."

T − 10h   Payment window closes.
          Forfeited slots released to next-in-line.
```

Key design choices:

- **The lottery is explicit, not hidden.** Showing the user "you are 1 of 8,200 entries for 1,500 seats" is more honest than today's implicit "be there at 10 AM and good luck."
- **Notifications, not refresh-checking.** The user does not have to sit at the screen.
- **Forfeiture rule is strict.** Winners who do not pay within 2 hours lose the slot to a wait-list entry — keeps the secondary market honest.

**Tomorrow — Track B (last-minute virtual queue).** Replaces the 10 AM rush with a take-a-number surface.

- User taps "Book last-minute Tatkal."
- Sees: "You're number 1,247 in queue. Estimated booking start: 09:42."
- The app is closeable. A push notification arrives when it is the user's turn ("You're up — open the app within 5 minutes to book.").
- Once at the front: a 3-minute booking window, no captcha, BRS-gated friction only.

### 4.2 — Payment-in-flight surface

**Today.** "Processing payment..." on a spinning loader. If anything goes wrong: "Something went wrong, please try again."

**Tomorrow.** A visible state machine the user can watch, with a persistent reference ID:

```
┌─────────────────────────────────────────────┐
│  Booking R-A47B-9C82                        │
│                                             │
│   ✓  Seat held       (12:04:18)             │
│   ✓  Payment sent    (12:04:21)             │
│   ⟳  Confirming with bank…                  │
│   ◯  Confirming PNR                         │
│                                             │
│  Don't close this. We'll keep checking      │
│  every few seconds. If your network drops,  │
│  this booking will continue on its own —    │
│  open the app later to see where it ended.  │
└─────────────────────────────────────────────┘
```

Key design choices:

- **Each step has a timestamp.** Users can diagnose their own failures.
- **Reference ID is shown and copyable from the start.** If something fails later, the user has the handle.
- **Explicit reassurance about backgrounding.** The architecture in §3.3 makes this *true*. The UX makes it *visible*.

### 4.3 — "Is my booking actually confirmed?" surface

**Today.** A confirmation page with a PNR and a status of CNF / RAC / WL. If there is any doubt — and there often is — the user calls IRCTC support, refreshes PNR-status pages, or checks a third-party app like ConfirmTkt.

**Tomorrow.** A unified booking page per booking attempt, accessible from the home screen by reference ID, showing:

- Current status (CNF / RAC / WL / Pending / Failed).
- A timeline of every state transition with timestamp.
- *Probability of confirmation* for waitlist entries — using the same prediction logic that ConfirmTkt and Ixigo already publish. Bringing this in-house is overdue.
- Direct action buttons: cancel, file TDR, rebook, share with family.

**Why this matters.** The single biggest source of in-app anxiety is "did this work?" Surface design fixes that without any backend change.

### 4.4 — Recovery-from-failure surface

**Today.** A failure screen that offers, at most, "Try again" — usually with no error code, no recovery context, and no link to your in-flight money.

**Tomorrow.** Every failure routes to a recovery surface that says, in plain language:

- *What just happened* — "Your payment to the bank succeeded, but our system did not get the confirmation in time."
- *What we are doing about it* — "We are checking with the bank now. This usually takes 10–30 seconds."
- *What you should do* — "Don't pay again. Stay on this screen. If the booking does not go through in 2 minutes, we will automatically refund — typically within 1 working day."

The point is to **stop losing the user at the failure moment**. Every failure UI today is a place where the user either pays twice, panics and contacts an agent, or abandons the platform for a third-party app. Each of those outcomes is a self-inflicted wound.

---

## 5. Cost, Risk, and Sequencing

**Implementation order.**

| Phase | Scope | Duration |
|-------|-------|----------|
| 1 | BRS, atomic booking pipeline, payment idempotency, reference-ID observability | 3–4 months |
| 2 | Two-track Tatkal pilot on 5–10 high-demand routes (feature-flagged) | 4–6 months |
| 3 | Full rollout and UX refresh (§4) | 12–18 months |

**Key risks.**

- **Aadhaar OTP / UIDAI capacity.** Track A is asynchronous, which removes the synchronised OTP demand from 10 AM and *reduces* UIDAI dependency at peak. Track B traffic is bounded.
- **User education for the lottery model.** Mitigated by parallel running of old and new flows for 2–3 months, with clear in-app explanations. India already has lottery-based ticketing precedent (IPL, ICC events).
- **Railway Board policy approval** is required to alter the timing of Tatkal release. The change is structurally simple but politically sensitive. The framing — *we are eliminating the bot-and-agent advantage and giving genuine users a fair shot* — is the right pitch.
- **Migration risk on the new PRS** (in flight). Phase 1 is designed to be safe on the *current* PRS; Phases 2 and 3 ride on top of the new PRS once it lands.

**What this avoids.**

- The bot and agent ecosystem loses its primary monetisation surface — there is no synchronised window left to game.
- "Money debited, no ticket" stops being a 30-day TDR problem.
- The third-party ecosystem (ConfirmTkt, Ixigo, RailYatri) loses its core wedge — *waitlist prediction and timing arbitrage* — because IRCTC publishes the prediction itself and removes the timing arbitrage entirely.

**What this enables.**

- Tatkal becomes a fair lottery for the majority, with a true last-minute path preserved for the minority.
- The user-side observability surface positions IRCTC for any future complex booking surfaces (multi-leg, group, packages).
- BRS becomes a foundation for any future trust-based products (priority booking, frequent-traveller programmes, partner bookings).

---

## 6. Sources

[^onmanorama-railone]: Onmanorama, 2 July 2025, "Railways launches RailOne app: Many users face log in issues, 'high' risk alerts, data safety warnings", https://www.onmanorama.com/travel/travel-news/2025/07/02/railone-app-launched-railways-how-to-use.html

[^republic-bot-share]: Republic World, 2025, "'System Rigged for Agents?': Frustrated Indian Railway Users Call Out '3 Minute Mystery' of IRCTC Tatkal Bookings", https://www.republicworld.com/india/netizens-slam-irctc-over-tatkal-scam-as-bots-and-agents-grab-tickets-in-seconds

[^pib-aadhaar-tatkal]: Press Information Bureau, Ministry of Railways, June 2025, "Only Aadhaar authenticated user can book Tatkal tickets on IRCTC Website and App from July 1", https://www.pib.gov.in/PressReleasePage.aspx?PRID=2135694

[^ddnews-capacity]: DDNews, 2025, "IRCTC's upgraded system to handle over 1.5 lakh bookings and 40 lakh enquiries per minute", https://ddnews.gov.in/en/irctcs-upgraded-system-to-handle-over-1-5-lakh-bookings-and-40-lakh-enquiries-per-minute/

[^deshgujarat-pt]: DeshGujarat, October 2014, "50% Tatkal quota seats to be made available at premium rates in select trains", https://www.deshgujarat.com/2014/10/02/50-tatkal-quota-seats-to-be-made-available-at-premium-rates/

[^bs-premium-extreme]: Business Standard, 10 August 2024, "Rs 10,100 premium tatkal ticket fee for B'luru-Kolkata train shocks public", https://www.business-standard.com/india-news/rs-10-100-premium-tatkal-ticket-fee-for-b-luru-kolkata-train-shocks-public-124081000175_1.html

[^cris-wiki]: Wikipedia, "Centre for Railway Information Systems", accessed April 2026, https://en.wikipedia.org/wiki/Centre_for_Railway_Information_Systems

[^pib-new-prs]: Press Information Bureau, Ministry of Railways, "New Passenger Reservation System Capable of generating over 1.5 lakh rail tickets per minute, i.e. about five times the current capacity of 32000 tickets in a minute, to be ready by year end", https://www.pib.gov.in/PressReleasePage.aspx?PRID=2140614
