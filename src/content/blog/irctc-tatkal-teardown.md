---
title: "How IRCTC Quietly Broke Their Own Tatkal"
description: "A timed booking flow built around a single race-condition wins zero engineers and loses a hundred million users their morning. A teardown of what IRCTC actually shipped, and the better design they refused to reach for."
date: "2026-04-14"
category: "Teardown"
readTime: "14 min"
featured: true
---

There is a small ritual that begins, every morning, in every Indian household with a journey on its calendar — a ritual where someone sits in front of a screen, refreshes IRCTC, and prepares to lose. This is the Tatkal booking window. Ten o'clock for AC classes, eleven for non-AC. Two hundred thousand people, give or take, all hammering the same booking screen at the same second. The only acceptable outcome, from the user's point of view, is to be one of the ones who walks away with a confirmed berth.

It is, in that sense, a perfectly designed lottery dressed in the clothes of a service.

## The flow, briefly

You sign in. You wait. At exactly 10:00, the booking page becomes "available" — though "available" means something quite specific here: a queue page that may or may not let you proceed; a captcha that appears, vanishes, re-appears; a payment screen that times out at the exact moment the railway is *also* timing out your seat hold. There are at least four points of failure between "I have selected my train" and "I have a ticket," and on a Tatkal morning every one of them is fully loaded.

This is not, in itself, a controversial design. Booking systems for genuinely scarce resources are hard. Selling 200 seats to 200,000 users in 90 seconds is a problem with no clean solution. What is controversial is that IRCTC has now spent over a decade iterating on this flow — and has, repeatedly, *chosen* the worst available trade-off at almost every junction.

## What broke, specifically

The most visible failure mode is the one users feel: the seat held in your basket disappears between the booking screen and the payment screen. From the user's perspective this is incomprehensible. From the system's perspective, it is a race condition baked into the sequencing of three separate services — inventory, payment, and confirmation — none of which were designed to talk to each other on a sub-second budget.

Here is, roughly, the sequence on a Tatkal morning:

1. The booking service marks your selected seat as **held** for ~10 minutes.
2. You are redirected to a **payment gateway**, which is itself a separate service operated by a bank.
3. The payment gateway attempts to pre-authorise your card or UPI.
4. On success, control returns to IRCTC, which **confirms** the booking and releases the hold.

Every one of those steps, on Tatkal morning, is operating at three to ten times its normal load. Step 2 — the redirect — is the most fragile. Banks rate-limit. UPI handlers buckle. The user sits on a spinner. Meanwhile, the **hold** on step 1 is ticking down on a timer that does not know about step 2's queue depth.

The result is a user who, having technically *won* the lottery in step 1, loses it in step 4 because step 3 took 11 seconds instead of 8.

## The mitigations IRCTC actually shipped

To their credit, the team has not done nothing. Over the years they shipped:

- **Captchas** at multiple points to slow down scripts.
- A **queue page** that, in theory, throttles incoming users.
- **OTP-based** payment confirmation to reduce the bank-redirect window.
- A re-architected **Tatkal-only window** with separate quotas and infrastructure.

Each of these is a sensible local fix. But notice: every one of them is a defence against *demand*, not a fix to the *coordination problem* between hold, payment, and confirm. The race condition is structural. It is not a captcha problem.

## The better design they refused to reach for

The thing IRCTC has consistently declined to do — and this is where I will be uncharitable — is the design that the rest of the world's high-stakes booking flows have converged on: a **commit-or-cancel** pattern with an **idempotent payment** and an **explicit user-visible queue position**.

Specifically:

1. **Atomic seat hold + payment intent.** When the user is given a seat, the *same transaction* should create a payment intent with a longer-than-needed authorisation window. The hold is not released until the payment intent times out — and the payment intent *cannot* expire before the hold.

2. **Idempotent payment gateway calls.** Multiple retries to the bank for the same payment intent must not be able to charge the user twice. This is a 2018 problem, not a 2026 one.

3. **A real queue, with a real position number.** A queue that says "you are 14,219 in line, estimated wait 4 minutes" is humane. A queue that says "please wait" is not.

4. **No optimistic UI on the user's side.** The user should not see "seat selected" until the seat is *actually* held. This is the change that costs the team almost nothing, and that has, more than any other, been responsible for the screaming you hear every morning.

Most of these are not engineering problems. They are *political* ones inside IRCTC's stack — different vendors own different layers, and aligning them across the seam is harder than shipping another captcha. So we get another captcha.

## Why this matters beyond the train

The Tatkal flow is one of the largest, most-stressed, most-watched user flows in the country. It is the sort of system where a designer could earn their salary for the rest of their career by fixing a single coordination failure. And it is the sort of system that an entire generation of Indian product engineers grew up *believing* could not be fixed — because the public version they touched every morning visibly couldn't be.

That belief is the real cost of letting Tatkal stay broken. Public software shapes our expectation of what software can do. Every morning that Tatkal fails to gracefully tell the user what is happening, we lose a small amount of national appetite for ambition in public systems.

That is the failure I am unwilling to forgive.

## What we'd actually ship

If the studio were tasked with rebuilding Tatkal, the first three weeks would not be code. They would be:

- **An audit** of every coordination failure across hold, pay, confirm.
- **A data view** of the actual distribution of failures — at which step, at which second.
- **A re-framing** of the problem to the team: this is not a load problem, it is a transaction-design problem.

Then we would do the boring work: a single composable booking transaction, an idempotent payment surface, a real queue, and a UI that refuses to lie to the user.

Tatkal will never be a happy experience — there are not enough seats — but it does not have to be a *humiliating* one.

That is the bar. We should hold ourselves, and the systems we depend on, to it.
