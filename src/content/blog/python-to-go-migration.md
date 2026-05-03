---
title: "Why we ditched Python for Go"
description: "How a weekend rewrite of a hot FastAPI endpoint cut p99 latency 10×, dropped infrastructure costs by 68%, and made 3 AM pages stop. The honest story — including the three weeks of velocity we lost teaching the team a new language."
date: "2025-09-15"
category: "Engineering"
readTime: "9 min"
featured: false
---

There's a particular kind of bug that doesn't show up in staging, doesn't reproduce on demand, and doesn't have a clean stack trace. It just shows up in production at 2 AM, eats your weekend, and disappears before anyone can pin it down.

We had one of those.

A FastAPI service handling several million requests a day on Cloud Run, hosting one of our most-trafficked endpoints. P50 was a respectable 200 ms. Then, with no warning, the same endpoint would spike to ten or more seconds. No deploy correlation. No traffic pattern. No reproducibility in staging.

We did all the things you do.

- **Tripled the Cloud Run instance count.** Bought us nothing. The tail latency was the same.
- **Rewrote the async handlers.** Cleaner code, identical symptoms.
- **Layered in caching that the endpoint did not need.** Hid the problem on warm reads. Did nothing for the cold ones.
- **Cranked up monitoring.** Confirmed that the latency was real and that none of our dashboards explained why.

A week of digging eventually surfaced an open-and-active bug: **FastAPI + Hypercorn + HTTP/2 on Cloud Run, producing exactly these symptoms.** The recommended workaround was to disable HTTP/2.

That was the moment we stopped patching and started thinking.

## The weekend that changed the stack

In a debugging session, one of our engineers asked the obvious question we had been avoiding: *what if we rewrote it in Go?*

We treated it as a thought experiment. Two of us spent a weekend porting the offending endpoint to Go using Echo. Same routes, same behaviour, same database calls.

> **Same endpoint. 10× less memory. Rock-solid 50 ms response times.**

The point of the exercise wasn't speed. We could have got speed by throwing more instances at the FastAPI service forever. The point was *predictability*. Go's goroutines handle concurrent connections in a shape that doesn't bend under load the way our async Python pipeline did. Echo is small enough that the framework gets out of the way. The CPU cycles end up in business logic, not framework abstractions.

The service became boring — in the best possible way.

## How we actually rolled it out

The migration was four weeks. None of it was glamorous.

**Weeks 1–2 — Parallel deploy, behavioural parity.** The Go service ran alongside the Python one, taking shadow traffic. We diffed responses byte-for-byte and surfaced three real edge cases we would have missed in a hot rollout — the kind of behaviour the original Python code expressed implicitly that we had to make explicit in Go.

**Week 3 — 1% to 10% rollout.** Feature-flagged by request hash. Dashboards watched p50/p95/p99 side by side. No surprises.

**Week 4 — 50/50 split.** This is where the cost picture became undeniable. The Go service was serving its half of traffic on roughly **a quarter of the resources** the Python service needed for the other half. We finished the cutover that week.

## The numbers

We had a long-running ledger of "things we wish we could fix." Most of it got fixed by the migration.

**Latency:**

- p50: 200 ms → **50 ms**
- p95: 800 ms → **120 ms**
- p99: 2 s+ → **200 ms**

**Infrastructure (Cloud Run):**

- Instances: 7 → 2
- Memory per instance: 4 GB → 1 GB
- CPU per instance: 2 vCPU → 1 vCPU
- Monthly bill: **−68%**

**Developer ergonomics:**

- Build time: 3 min → 25 sec
- Container image: 850 MB → 30 MB
- Cold start: 45 sec → under 10 sec

We deliberately did not over-tune. These are the numbers we got from the straightforward port.

## The uncomfortable truths

If we wrote only the wins, this would be a pitch deck, not an engineering note.

**The learning curve hit everyone, including the people leading the migration.** Go's error handling is verbose. Its paradigms are different from Python's. The first three weeks of writing it felt slow.

**Sprint velocity dipped for those three weeks.** Visibly. We told the rest of the company in advance, which made it survivable.

**Years of accumulated Python utilities got rebuilt from scratch.** Some of them were genuinely better the second time. Some of them were the same shape, in a new language, for no other reason than we needed them.

We would do it again. We would not pretend the cost was zero.

## When to switch — and when not to

**Stay on FastAPI when:**

- You are building MVPs or prototypes. Python's iteration speed is the asset.
- Your hot path is CPU-bound ML model serving. The Python ecosystem is irreplaceable here.
- Your team's Python expertise outweighs your performance ceiling.
- You have not actually hit a scale wall. Premature migration is a category of expensive mistake.

**Make the switch when:**

- You have unpredictable tail latency at scale and you have already exhausted the obvious fixes.
- Infrastructure cost is constraining product decisions.
- The shape of your traffic demands consistent response under variable load.
- The team has the runway to absorb a learning curve and the appetite to leave a comfort zone.

## The three-month verdict

About twelve weeks after the cutover, traffic on the migrated endpoint spiked **4×** in a single afternoon. We found out from the sales team's celebration channel, not from the on-call rotation. The service had absorbed it without paging anyone.

That is the real result.

- 68% infrastructure cost reduction.
- Zero 3 AM incidents tied to this service since the migration.
- Zero customer complaints traceable to it.
- A team that came out the other side knowing a second language well enough to use it where it belongs.

The hardest technical decisions are usually the right ones. And a team willing to leave its comfort zone with you is the actual competitive advantage.

The rest is just craft.
