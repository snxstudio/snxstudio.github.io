---
title: "Edge Computing for Industrial IoT"
description: "How we architected a sensor network that processes data at the edge before it reaches the cloud."
date: "2024-10-10"
category: "IoT"
featured: false
draft: true
---

Industrial IoT has a bandwidth problem. When 5,000 sensors each generate data points every second, pushing everything to the cloud isn't just expensive — it's architecturally fragile. A network hiccup between factory floor and cloud provider shouldn't mean lost data or delayed alerts.

## Why edge computing matters

The Nexus platform taught us that the question isn't "edge or cloud?" but "what should happen where?" Processing at the edge isn't about replacing the cloud — it's about putting computation where it makes the most sense.

**Latency-critical decisions** happen at the edge. A vibration sensor detecting anomalous patterns on a machine needs to trigger an alert in milliseconds, not wait for a round-trip to AWS.

**Aggregation and filtering** happen at the edge. Raw sensor data at 1Hz resolution generates terabytes per day. But most analysis needs minute-level or hour-level aggregations. Edge nodes reduce data volume by 95% before transmission.

**Long-term storage and analysis** happen in the cloud. Trend analysis across months of data, ML model training, and cross-facility comparisons need the cloud's compute and storage capacity.

## The architecture

Each facility runs edge gateway devices — ruggedized compute nodes with enough processing power for real-time anomaly detection and data aggregation. These gateways communicate with sensors via MQTT (lightweight, reliable, designed for constrained networks) and sync with the cloud via a store-and-forward pattern that handles network outages gracefully.

The key design decision was making edge nodes eventually consistent rather than strongly consistent with the cloud. If the network drops for 30 minutes, edge nodes continue operating autonomously — processing data, triggering alerts, storing events. When connectivity resumes, they sync missed data to the cloud in order.

## Lessons learned

**Test with real network conditions.** Our development lab had perfect connectivity. Production environments had flaky Wi-Fi, congested cellular connections, and occasionally, literal walls blocking signals. We now test every deployment against simulated network degradation.

**Plan for device management at scale.** Deploying software updates to 200+ edge devices across 12 facilities is a DevOps challenge that deserves first-class tooling. We built custom Kubernetes operators for rolling deployments with automatic rollback.

**Sensor calibration is a software problem.** Sensors drift over time. Building calibration monitoring and automated adjustment into the platform caught issues that would have silently corrupted data for weeks before anyone noticed.
