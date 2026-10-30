# WIP — Control Room redesign

Working doc. Living. Edit freely.

## The vision

The site **is** a live ops dashboard of the studio itself.

We sell "things stay up under load." So the marketing site demonstrates the
product instead of describing it. Every tile on the home page is a real
telemetry probe. The aesthetic is industrial SCADA / Grafana / NOC — but
*productized* as a brand surface. Closest reference is the internal status
board of a serious infra company. No studio in our space is doing this.

Why this works:
1. Cannot be cloned by an LLM prompt — needs real data plumbed in.
2. Demonstrates capability instead of asserting it.
3. Ages *backwards* — most studio sites decay, this one updates itself.
4. Industrial-grade clients (Ministry of Power tier) recognize the language
   immediately. Energy, logistics, agritech buyers see "these people ship
   live systems."
5. The aesthetic is *functional*, not decorative. There is nothing to
   "redesign in a trend cycle" — the design is the data.

## What we are killing

Burn-list from the current site. None of this survives.

- [ ] Aged manila paper background + grain layers
- [ ] Red rubber-stamp / masking-tape / receipt motifs
- [ ] Hand-drawn ink circles, scribble underlines, marker highlights
- [ ] Editorial italic serif (Instrument Serif)
- [ ] "Studio note · No°1" / coordinates / N°XII chrome
- [ ] Page-turn corner
- [ ] Ink-trail cursor
- [ ] Stroke-draw SNX studio mark (the X-stamp)
- [ ] Three-word marquees ("Make it work · Make it true · Make it disappear")
- [ ] All "creative-studio aphorism" copy
- [ ] Tilted hand-placed elements
- [ ] Decorative SVG corner marks
- [ ] Drift animations on logos

## Aesthetic system

### Typography (two faces only)

- **Readouts / body / nav** — neo-grot mono. Default to Berkeley Mono if we
  can license it; fallback IBM Plex Mono. Tight tracking, 13–14px base.
- **Display numerals** — one heavy display face. Söhne Breit or Neue Haas
  Grotesk Display Black. Used only for the few hero numbers (uptime,
  engagements, years).
- **No serif. No italic. No script. No editorial flourish.**

### Color (functional, not decorative)

```
--bg          near-white #F4F4F2   (warm neutral, not pure white)
--bg-panel    #FFFFFF
--ink         #0B0C0E
--ink-2       #5A5E66
--rule        #D6D8DC

--signal-ok       #1FA45C   live / healthy / running
--signal-watch    #D4A017   degraded / watching
--signal-alert    #C13B2F   incident / down
--signal-idle     #5A5E66   inactive / no data
```

Color **only appears when a probe is in that state.** A green dot means
something is currently green. A red rule means an actual incident is open.
No purely decorative use of the signal palette.

### Layout

- Strict 12-column grid. No tilt. No "hand-placed" asymmetry.
- Hairline rules (1px `--rule`) divide everything. No drop shadows.
- No rounded corners anywhere. Square inputs, square cards, square buttons.
- Density: more information per screen than a normal marketing site, less
  than a real Grafana board. Aim for "ops dashboard you'd show a board
  member" not "ops dashboard you debug with."

### Motion

- Only **state changes** animate. A counter increments, a probe flips green
  → amber, a row appears at the top of a log. No scroll-triggered reveals.
  No drift. No spin. No hover micro-interactions on decoration.
- Live probes pulse at their actual update cadence (e.g. weather every 10
  min, GitHub commits every 60 s). Pulse = "fresh data just arrived."

## Information architecture

Five pages. Each one earns its place.

### `/` — Status board

Single screen, no scroll on desktop. Grid of live tiles.

```
┌────────────────────────────────────────────────────────────────┐
│ SNX/STUDIO                                  bangalore · 09:42  │
├────────────────────────────────────────────────────────────────┤
│ ●  ACCEPTING 1 ENGAGEMENT · Q3 2026                            │
├──────────────────┬──────────────────┬──────────────────────────┤
│ 10               │ 47               │ 6                        │
│ YEARS LIVE       │ DEPLOYS / 90D    │ REPOS OPEN-SOURCE        │
├──────────────────┴──────────────────┴──────────────────────────┤
│ LAST EVENT                                                     │
│ 2026-05-14 09:38  push  agrigrid       main  +212 −18          │
│ 2026-05-14 08:11  ship  irctc.report   v1.4  ok                │
│ 2026-05-13 22:40  deploy meta-obs       prod  ok               │
├────────────────────────────────────────────────────────────────┤
│ CAPABILITY MATRIX            CURRENT WORK                      │
│ ● ai/llm systems             ● 02 live engagements             │
│ ● industrial iot             ● 01 discovery                    │
│ ● edge compute               ○ 00 maintenance only             │
│ ● cloud / devex                                                │
│ ● web platforms                                                │
└────────────────────────────────────────────────────────────────┘
```

### `/work` — System map

Not a portfolio grid. A single pan/zoom canvas. Clients/projects are nodes.
Edges are the disciplines that connected them. Live projects pulse green.
Click a node to drop into the case study without a page navigation.

### `/log` — Runtime log

Replaces `/about` and `/blog`. One scrollable timestamped feed. Mix of:
- Real GitHub commits (auto-pulled)
- Real deploy events (auto-pulled if we wire CI)
- Manual entries Mayur writes ("started work on substation edge inference")
- Project launches / client milestones

Scrolls back ten years if you let it. Has anchors for the big moments.

### `/availability` — Contact

Not a form. A real signal showing current capacity. When you submit, you
see your queue position and an honest ETA. No "we'll get back to you within
24 hours" lies.

### `/incidents` — Public post-mortems

Honest engineering culture move. Public write-ups of things that went
wrong and how they got fixed. Anti-AI because LLMs will not invent these;
they only exist if you actually had the incident.

## Data plumbing

What's live vs. mocked, in order of difficulty.

### Phase 1 — static mock that looks live (1–2 days)
- All numbers hard-coded but plausible
- "Last event" feed is hand-written but real (3–4 actual recent events)
- Time updates client-side (clock ticks, "X min ago" recalculates)
- No backend yet

### Phase 2 — pull real signals from public APIs (2–3 days)
- GitHub API → commit feed, repo count
- Cloudflare Analytics → site traffic readout (optional)
- A weather API → Bangalore conditions tile
- A small Cloudflare Worker proxies and caches everything (5 min TTL)

### Phase 3 — studio-controlled signals (later)
- Tiny Cloud Run / Workers KV service Mayur posts events to
- `snx log "shipped agrigrid v2.4"` from the terminal pushes a row
- Capacity flag (`accepting / full / on holiday`) is a single env var
- Deploy events come from CI webhooks of our own projects

### Phase 4 — real public ops board (much later, optional)
- Live uptime of `snxstudio.com` itself
- Last build status of our open-source repos
- Public response-time graph

## Components to build (Phase 1)

- [x] `StatusBar` — top strip: studio name, location, local time, status dot
- [x] `MetricTile` — big numeral + label + optional sparkline
- [x] `LogRow` — timestamp + verb + target + meta + status pill
- [x] `LogFeed` — scrolling list of `LogRow`s
- [x] `CapabilityList` — bulleted list with signal dot per row
- [x] `EngagementPanel` — capacity readout with queue
- [ ] `SystemMap` — pan/zoom canvas for `/work` (use d3 or pixi; later)
- [ ] `IncidentEntry` — post-mortem block layout
- [ ] `Probe` — wrapper component that owns one probe's data + freshness

## Copy direction

Kill all creative-studio voice. New voice is:
- **Operational.** "Last deploy: 14:22 IST." "Accepting 1 engagement / Q3."
- **Specific.** Real timestamps, real version numbers, real client work.
- **Honest about state.** If we're full, the site says so. If something is
  broken, the site says so. The signal palette is real.
- **No taglines.** No "we ship the intelligent systems behind great
  products." The data is the tagline.

## Open questions

- Berkeley Mono license cost — worth it, or commit to Plex Mono?
- Do we keep dark mode? (Real NOC boards are dark; brand might want light
  default.) Lean: light default, dark toggle that flips to NOC mode.
- Where does the founder show up? A NOC has no faces. Probably one tile
  reading "oncall: mayur@" linking out to a longer page.
- How public can "real signals" get without leaking client info?
  Probably: redact client names, show counts and verbs only.
- Mobile: dashboards die on phones. Mobile becomes a vertical stack of
  the same tiles, but the system-map page degrades to a list.

## Sequencing

1. **Today** — get sign-off on this WIP. Lock the aesthetic system.
2. **Day 1** — kill the current home. Build `StatusBar`, three `MetricTile`s,
   `LogFeed` with hand-written events. Ship to `/` behind feature flag.
3. **Day 2** — kill `/about`, `/blog`, `/services`. Stand up `/log` and
   `/availability`.
4. **Day 3** — rebuild `/work` as a basic system map (start with a static
   SVG, upgrade to interactive later).
5. **Day 4** — stand up the Cloudflare Worker, wire GitHub + weather.
6. **Day 5** — review. Fix typography, spacing, density. Lighthouse pass.
7. **Later** — Phase 3 signals, `/incidents`, system map upgrade.

## Risks

- **Looks empty on day one.** Mitigation: hand-seed the log feed with
  enough real history that it feels populated.
- **Real signals break the site if APIs fail.** Mitigation: every probe
  has a "stale" state (grey dot) and shows last-known value. No probe is
  load-bearing for first paint.
- **Too austere — reads as cold.** Mitigation: Mayur's voice in the log
  entries is the warmth. Don't add decoration to compensate; fix it in
  copy.
- **Berkeley Mono unavailable / too expensive.** Fallback to IBM Plex Mono
  is solid.
