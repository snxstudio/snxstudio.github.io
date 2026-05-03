---
title: "Building Resilient Data Pipelines at Scale"
description: "Lessons learned from designing data pipelines that handle 10M+ events daily without breaking a sweat."
date: "2024-12-15"
category: "Engineering"
featured: true
draft: true
---

When we started building Meridian's analytics pipeline, the existing system processed events in batch — four-hour windows that left teams staring at stale data while making critical decisions. The brief was straightforward: make it real-time without sacrificing reliability.

## The architecture that worked

We landed on a three-layer approach: ingestion, processing, and serving. Each layer can scale independently, and failure in one doesn't cascade to the others.

**Ingestion** runs on Apache Kafka with a 72-hour retention window. Every event gets a unique ID and timestamp at the edge, so deduplication downstream is deterministic rather than probabilistic.

**Processing** uses a combination of stream processing for real-time aggregations and materialized views for complex queries. The key insight was separating hot-path (sub-second latency) from warm-path (sub-minute) processing — not everything needs to be instant.

**Serving** sits on ClickHouse for analytical queries and Redis for pre-computed dashboards. The distinction matters: analysts need flexible querying, operators need fast answers to known questions.

## What we'd do differently

The main lesson was about schema evolution. We designed the initial schema around the data we had, not the data we'd eventually need. Building schema migration into the pipeline from day one would have saved us three weeks of careful backfilling.

We'd also invest more in observability earlier. Our first monitoring setup tracked throughput and latency, but not data quality. A dashboard showing "events processed per second" looks great until you realize 12% of those events have malformed timestamps.

## The numbers

- **10M+ events/day** processed with sub-200ms end-to-end latency
- **73% reduction** in anomaly detection false positives
- **Zero data loss** incidents in 8 months of production operation
- **4x reduction** in infrastructure costs compared to the batch system

The real metric, though, is that the product team stopped asking "when will the data be ready?" and started asking "what does the data tell us?" That shift — from waiting for technology to using it — is the goal of every system we build.
