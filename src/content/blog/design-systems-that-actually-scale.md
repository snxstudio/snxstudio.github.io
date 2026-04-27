---
title: "Design Systems That Actually Scale"
description: "Why most design systems fail at adoption, and the architectural decisions that prevent it."
date: "2024-11-28"
category: "Design"
featured: false
---

Most design systems die not from technical failure, but from adoption failure. Teams stop using them when the system becomes more restrictive than helpful, when upgrading is painful, or when it simply doesn't match how people actually build.

## The adoption problem

After building Vertex — a design system serving 12 product teams and 200+ components — we've identified three patterns that kill adoption:

**1. Too much, too soon.** Shipping 200 components in month one sounds impressive. But if 180 of them are untested by real product use cases, you've built a liability, not an asset.

**2. Breaking changes without migration paths.** Every breaking change is a tax on every consumer team. If you ship one breaking change per month across 12 teams, you've created 12 migration tasks per month that compete with feature work.

**3. Design-dev mismatch.** When the Figma library and the code library drift apart, teams start building custom implementations because "the design system doesn't match the design."

## What worked for us

**Start with tokens, not components.** Colors, spacing, typography, and shadows as design tokens create a shared language before a shared component library exists. Teams that adopt tokens first have a smoother transition to shared components.

**Automated visual regression testing.** Every PR to the design system runs visual regression tests against a matrix of browsers, themes, and viewport sizes. This isn't about catching bugs — it's about building confidence that upgrades won't break anything.

**Figma-to-code pipeline.** We maintain tooling that keeps design tokens synchronized between Figma and code. When a designer updates a color token in Figma, the change propagates to the codebase via a PR that runs the full test suite.

## Measuring success

The metrics that matter for a design system aren't "number of components" or "downloads." They're:

- **Time from design to implementation** (we target under 2 hours for standard patterns)
- **Accessibility compliance** (Vertex went from 62% to 98% across all consuming products)
- **Custom component ratio** (percentage of product UI that bypasses the system — lower is better)
- **Upgrade friction** (time required for consuming teams to adopt new versions)

A design system is successful when teams choose to use it even when they're not required to. That choice is earned through reliability, flexibility, and respect for the people building with it.
