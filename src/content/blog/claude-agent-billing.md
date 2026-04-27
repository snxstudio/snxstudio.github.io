---
title: "Designing a Claude Agent You Would Trust With Billing"
description: "The cheap way to build agents is to wire tools to a model and pray. The reliable way is a small constitution, hard tool boundaries, structured output, and a human in the loop wherever a refund is possible. Here is the pattern."
date: "2026-03-22"
category: "AI"
readTime: "11 min"
featured: false
---

There is a natural arc to building any agent on Claude. You start by giving it three tools and a system prompt. Two demos in, you are giving it eight tools and a system prompt that has begun to sprout sub-headings. Six demos in, you are giving it twenty tools, the entire customer-support knowledge base, and a long list of things it must under no circumstances do.

This is the wrong shape.

## The pattern that survives production

The agents we trust in production share a particular structure:

1. **A small, written constitution.** Three to seven sentences that describe the agent's job, the user it serves, and the things it must never do. Short enough that you can read it before every change.
2. **Hard tool boundaries.** Tools that *cannot* take destructive actions without a confirmation step are far easier to ship than tools that *should not*.
3. **Structured output, always.** The model returns JSON or a typed object, never prose-as-action. The action is a separate, deterministic step.
4. **A human in the loop wherever a refund is possible.** This is the line. If the action could result in a refund, a chargeback, an embarrassing email, or a deleted file, a human approves it.
5. **Evals from day one, not "later".** A folder of recorded conversations and the assertions that should hold for each. Re-run on every prompt change.

That's the whole pattern. Most of the engineering effort goes into points 2 and 5.

## What "tool boundaries" actually means

A common mistake: shipping `send_refund(amount, customer_id)` as a tool, then writing a system prompt that says "do not send refunds over $50 without explicit user confirmation." The model will, eventually, do exactly that.

The right shape is two tools:

- `propose_refund(amount, customer_id, reason)` — returns a draft, never charges.
- `confirm_refund(proposal_id)` — only callable on a previously proposed refund, only after a human has clicked "approve" in your dashboard.

Now the rule is enforced by the *type signature*, not by a paragraph in a system prompt. The model can hallucinate all it wants; it cannot reach the dangerous code path.

This is the pattern Claude itself uses for its own most consequential tools. Imitate it.

## Prompt caching as a first-class architectural concern

If you are building a serious agent, your system prompt and tool definitions are going to be 5–20k tokens. They will be sent on every request. The cost difference between a cache-aware design and a cache-naive one is roughly a factor of ten.

Two rules:

- **Stable parts go first.** The constitution, the tool definitions, and the high-level role description live at the top of the prompt and never change between requests.
- **Volatile parts go last.** User context, recent conversation, dynamic state. Anything that changes per request goes at the bottom.

Get this right and your bill drops by an order of magnitude on day one. Get it wrong and you will be the one explaining to the CFO why the Anthropic invoice doubled this month.

## Evals are not optional

The most common reason production agents misbehave is that the team made a "small" change to the system prompt and didn't realise it broke a behaviour that wasn't covered by any test. Evals are the only insurance against this.

A useful eval suite for an agent looks like:

- **Happy path conversations** — the things the agent is supposed to do.
- **Refusal cases** — the things the agent must decline to do.
- **Edge cases** — ambiguous requests, half-formed inputs, attempts to jailbreak.
- **Regression cases** — every production bug, captured as a test.

Run them on every prompt change. The first time a reasonable-looking edit fails three evals, you'll understand why.

## What to do tomorrow

If you have an agent in production today and you are not sure it is shaped right:

1. Write down the constitution. Five sentences.
2. Find the two tools that could lose you the most money and split them into propose / confirm.
3. Convert your system prompt into a cache-friendly layout.
4. Capture ten conversations as your first evals.

That is a week of work. It will earn its keep within a month.

The rest is just craft.
