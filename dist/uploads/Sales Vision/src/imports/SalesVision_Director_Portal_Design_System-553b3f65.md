# SalesVision — Director Portal
### UI/UX Design System — v1.1 (Director Portal Build)
**Product:** SalesVision (CRM Vision) — B2B telecalling/sales-ops CRM
**Scope of this document:** Director role only. Manager and Executive portals inherit this system later but are out of scope for v1.0.
**Derived from:** Universal Design System Template v2.0, reconciled against the Director PRD, Director UI Spec, and Director Functional Spec (reverse-engineered from `CRM_Vision_Frontend`/`CRM_Vision_Backend`), and the Material Dashboard + Creative Tim visual reference set supplied for this project.

> **v1.1 CHANGELOG — visual system replaced, structure unchanged.** v1.0 used the Material Dashboard reference only as a *layout/behavior* inspiration while inventing its own indigo-blue + dark-navy-sidebar palette. Direct feedback on v1.0 was clear: replicate the reference **literally** — same near-black/white monochrome system, same white sidebar, same KPI card anatomy (icon-square top-right, not a left accent bar), same green line/bar chart color and dark tooltip, same solid-fill status pills. Sections 0, 3, 5, and 7 below are rewritten to match the reference image-for-image. Everything NOT about color/shape (Section 2 reconciliation, Section 12 mock data, Section 13-15 screen architecture, Section 8/9/10 accessibility/content/UX patterns) is unchanged — this is a re-skin, not a re-plan.

---

## 0. PROJECT CONFIGURATION

```
COMPANY / PRODUCT:   SalesVision (CRM Vision) — TNM
WEBSITE:             salesvisionai.com
REPOS:               CRM_Vision_Backend (FastAPI + MongoDB) · CRM_Vision_Frontend (Next.js/TS/Tailwind)

PORTAL / AUDIENCE:   Director Portal — senior leadership, read-primary analytics + org oversight
VERSION:             1.0

PRIMARY USER:        Sales Directors / VPs of Sales / Ops Leads overseeing multiple Managers,
                      each Manager leading a team of telecalling Executives
CONTEXT OF USE:      Daily/multiple-times-daily performance monitoring; weekly coaching reviews;
                      periodic org structure setup
PRIMARY DEVICE:      Desktop-first (1440px+ target), tablet secondary, mobile simplified-card view
USER MINDSET:        Executive, fast-scanning, numbers-first, zero patience for configuration —
                      "tell me what needs my attention in 5 seconds"

DESIGN PHILOSOPHY:   Full corporate, data-dense, boardroom-grade analytics software — a literal
                      monochrome replication of the Material Dashboard reference: white sidebar,
                      light neutral canvas, near-black as the one functional UI color, green as
                      the one chart/success color. No blue, no navy gradient, no per-module
                      color-coding beyond what the reference itself uses.
Reference comps:      "Material Dashboard (Creative Tim), reproduced closely" — same anatomy,
                      same palette discipline, same chart/tooltip treatment.

PRIMARY ACCENT COLOR: #17181C (near-black — used for the sidebar's active pill, every primary
                      button, and every KPI card's icon square)
FONT FAMILY:          Poppins (headings/titles) + Inter (body, data, tables — tabular figures)
BACKGROUND MOOD:      Cool neutral light grey (#F4F5F7) app canvas, WHITE sidebar (not dark)
```

> **Why near-black, not the logo's red, and not indigo either:** the provided SalesVision mark (red-to-black gradient infinity form) stays a standalone mark only — red is still reserved for Hot Leads/error/Rejected semantics, so it was never a candidate for the primary UI color (this reasoning from v1.0 still holds). v1.0's indigo-blue has been dropped in favor of matching the Material Dashboard reference literally: that reference uses near-black as its only functional accent (sidebar active state, primary buttons, KPI icon squares) and reserves all color for data itself — green for positive/success, red for negative, blue/other only inside charts and progress bars. This is a more restrained, more "boardroom" palette than indigo, and it's what was explicitly asked for.

---

## TABLE OF CONTENTS

- 0. Project Configuration
- 1. Product Overview (SalesVision Director Portal)
- 2. Reconciling the Source Documents (what we're building vs. what exists vs. what's aspirational)
- 3. Design Tokens (Color, Typography, Spacing, Radius, Elevation, Motion)
- 4. Iconography, Illustration & Photography Sourcing
- 5. Layout System & App Shell
- 6. Responsive Grid & Breakpoints
- 7. Component Library (mapped to Creative Tim reference blocks)
- 8. Accessibility Guidelines
- 9. Content Strategy & Microcopy (Director voice)
- 10. UX Patterns & States
- 11. Motion & Micro-interactions
- 12. Mock Data Modeling Guide (SalesVision-specific)
- 13. Screen & Navigation Architecture (the single connected flow)
- 14. Screen-by-Screen Spec
- 15. Extra Metrics & Additions (things the source specs were missing)
- 16. Design Handoff & Developer Tokens
- 17. QA, Analytics & Governance
- Appendix A: One-Page Cheat Sheet
- Appendix B: Creative Tim Component → SalesVision Screen Map

---

## 1. PRODUCT OVERVIEW — SALESVISION DIRECTOR PORTAL

SalesVision is a sales-operations analytics and organization-management platform for outbound telecalling teams. The Director Portal gives leadership a real-time, filterable, exportable view of calling activity, lead/contact mapping, and team performance across their entire reporting hierarchy — **Director → Manager → Executive** — plus the tools to browse (and, where access permits, build) that org structure directly from the UI.

**Core loop the Director lives in:** *mapped contact → assigned to an executive → called → outcome logged → lead heats up (Cold → Warm → Hot) → converts or dies.* Every screen in this portal is a different lens on that same pipeline: volume (Mapping), activity (Calls), quality (Leads/Temperature), people (Team), and structure (Organization) — tied together by one global time filter and one export system.

**Success for this user looks like:** opening the portal and knowing, within five seconds, whether anything needs their attention today — and being three clicks away from the specific rep, team, or industry causing it.

---

## 2. RECONCILING THE SOURCE DOCUMENTS

Three source documents describe overlapping but not identical versions of this product. This section is the single source of truth going forward — later screen specs build from this reconciliation, not from any one source document alone.

| Topic | PRD ("directors-view", aspirational) | Actual live build (UI Spec + Functional Spec) | **Decision for this design system** |
|---|---|---|---|
| Read-only enforcement | Director is *strictly* read-only, no writes anywhere | Director can create Departments/Teams/Managers via Org Management | **Keep Org Management, but gate creation controls behind an explicit `can_manage_org` capability** (enterprise-access Directors only, or a future permission flag) — browsing is always available, creation buttons render only when the capability is present. Every analytics screen (Dashboard/Mapping/Calls/Team/Leads) stays 100% read-only+export, matching both sources. |
| Screen count | 7 screens incl. Lead Temperature Board, Lead Detail, Reports & MIS Centre | 4 analytics tabs + 3 org-browsing screens + 2 modals (no dedicated lead board, no MIS centre) | **Build both.** The PRD's Lead Temperature Board and Lead Detail are genuinely valuable views the live product is missing — we add them as new screens (Section 14, S5/S6). The Reports & MIS Centre replaces today's scattered per-screen "Export Excel" buttons with one governed hub (Section 14, S9) while keeping the fast inline export per screen. |
| Export formats | XLSX + PDF, with a download history log | XLSX only, client-side, no history | **XLSX + PDF**, with a download history log, per the PRD — this is a real gap in the current build worth closing. |
| Global time filter | One persistent filter across all screens | Independent state per screen (explicit UX debt, flagged in the Functional Spec itself) | **One persistent global filter**, this system's single biggest structural fix over the current build. |
| Executive detail | Lead Detail exists (PRD); no standalone Executive detail page (either source) | — | **Add an Executive Profile drill-in** (Section 15) — asymmetry between "we can drill into a lead but not into a rep" was worth closing. |

Everything else below (KPI definitions, table columns, color semantics, coverage-badge thresholds) is taken directly from the live build, since it reflects real backend contracts already in production.

---

## 3. DESIGN TOKENS

### 3.1 Color System — v1.1, literal Material Dashboard replication

**A. Brand Accent Ramp — near-black, not indigo**
| Token | Usage | Value |
|---|---|---|
| `color-brand` | Primary CTAs, sidebar active pill, KPI icon squares | `#17181C` |
| `color-brand-hover` | Hover state | `#000000` |
| `color-brand-pressed` | Active/pressed state | `#000000` with `scale(0.97)` |
| `color-brand-light` | Selected-row tint (used sparingly — the reference itself barely uses this) | `#F1F1F3` |
| `color-brand-glow` | Focus rings | `rgba(23,24,28,0.14)` |

**B. Page & Surface Backgrounds — white sidebar, light grey canvas**
| Token | Usage | Value |
|---|---|---|
| `bg-app` | Outer app canvas | `#F4F5F7` |
| `bg-sidebar` | Sidebar — **white, not dark.** This supersedes v1.0's dark-navy-gradient decision; the reference sidebar is white with a black active pill, and that's what we're building now. | `#FFFFFF` |
| `bg-content` | Main content area | `#F4F5F7` |
| `bg-card` | Card surface | `#FFFFFF` |
| `bg-card-alt` | Table header / hover row | `#FAFAFA` |
| `bg-icon-square` | KPI card icon square (see §7.1) | `#17181C` (same as `color-brand`) |

**C. Chart & Data Color Map** — matches the reference image's actual chart colors, not an invented per-module palette:
| Series / Metric | Color | Rationale |
|---|---|---|
| Primary chart series (line/bar — "Website Views," "Daily Sales" style) | `#4CAF50` green | direct match to the reference charts' green line/bar color |
| Call outcome — Accepted / Connected / Success | `#4CAF50` green | same green, reused for consistency |
| Call outcome — No Response / neutral | `#8392AB` slate-grey | matches the reference's muted secondary tone |
| Call outcome — Rejected / Hot Leads / Error | `#F5365C` red | matches the reference's negative-delta red |
| Progress bar — "working" state | `#3B82F6` blue | matches the reference Projects table's blue bar |
| Progress bar — "done" state | `#4CAF50` green | matches reference |
| Progress bar — "canceled" state | `#F5365C` red | matches reference |
| Progress bar — "not set" / 0% | `#DEE2E6` grey | matches reference's empty track |

Only chart series, progress bars, and status pills carry color. Every button, active nav state, and KPI icon square stays `color-brand` black — this is the core discipline of the reference and the one thing v1.0 got wrong by inventing a module color map.

**D. Semantic Status — solid-fill pills (matches reference "ONLINE/OFFLINE" style, not light-tint chips)**
| Status | Pill background | Pill text |
|---|---|---|
| Active / Online / Success | `#4CAF50` | white |
| Inactive / Offline / Neutral | `#344055` | white |
| Warning | `#FB6340` | white |
| Error / Rejected | `#F5365C` | white |

**Coverage / Connect-rate 3-tier badge** (kept as light-tint chips, not solid — this one stays a *reference number* the eye scans down a column, not a status pill, so the lighter treatment remains clearer):
`≥50% → bg #E7F7EC / text #4CAF50` · `25–49% → bg #FFF3E6 / text #FB6340` · `<25% → bg #FDE8EC / text #F5365C`

**E. Neutrals / Text**
| Token | Value |
|---|---|
| `text-primary` | `#1A1A1A` (near-black, never pure `#000` for text) |
| `text-secondary` | `#67748E` |
| `text-muted` | `#8392AB` |
| `text-hint` | `#ADB5BD` |
| `border` | `#EEEEEE` |
| `border-strong` | `#DEE2E6` |
| `divider` | `#F0F0F0` |

**F. Dark Mode** (tokenized now, ships later)
| Token | Light | Dark |
|---|---|---|
| `bg-app` | `#F4F5F7` | `#141414` |
| `bg-sidebar` | `#FFFFFF` | `#1A1A1A` |
| `bg-card` | `#FFFFFF` | `#1E1E1E` |
| `text-primary` | `#1A1A1A` | `#F4F5F7` |
| `color-brand` | `#17181C` | `#F4F5F7` (inverts — white becomes the "black" accent on a dark canvas) |

### 3.2 Typography

**Poppins** — page titles, section titles, KPI hero numerals, nav labels (structure/hierarchy).
**Inter** — body copy, table data, form inputs, all numeric values (tabular-figures enabled — replaces the legacy JetBrains Mono convention from the live build; Inter's tabular numerals keep KPI/table alignment crisp without a "coder" aesthetic, which fits the corporate direction better).

| Style | Font | Size | Line-height | Weight | Usage |
|---|---|---|---|---|---|
| Display / Hero KPI | Poppins | 34px | 1.15× | 700 | Hero KPI numeral (Calls Made) |
| Page Title | Poppins | 22px | 1.3× | 600 | Top of every screen |
| Section Title | Poppins | 16px | 1.3× | 600 | Card/section headers |
| Card Title | Poppins | 14px | 1.4× | 600 | Component headers |
| Body | Inter | 14px | 1.5× | 400 | Paragraph copy |
| Table Data | Inter (tabular figures) | 14px | 1.4× | 500 | All table cells with numbers |
| Small / Meta | Inter | 12.5px | 1.4× | 400 | Timestamps, captions |
| Label | Inter | 11px | 1.3×, UPPERCASE, 0.6px tracking | 600 | Table headers, field labels |
| Button | Inter | 14px | 1× | 600 | All button text |
| KPI Delta | Inter | 13px | 1× | 600 | +/- % badges |

### 3.3 Spacing (8pt Grid) — unchanged from master template
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 48` px. Never 5/7/9/11/13/15.

**Fixed heights**
| Element | Height |
|---|---|
| Top bar | 64px |
| Sidebar width (labeled) | 240px (collapsible to 72px icon rail) |
| Global filter strip | 48px |
| KPI card (hero) | 128px |
| KPI card (secondary) | 108px |
| Table row | 52px |
| Table header row | 44px |
| Input / Button | 40px (standard) / 44px (CTA) |
| Chart card min-height | 320px |

### 3.4 Border Radius
Chips/badges `6px` · Inputs/buttons `10px` · Cards `16-20px` (the reference's cards read noticeably rounder than a typical enterprise tool — keep them generous) · Modals `16px` · Avatars `50%` · Sidebar nav item `12px` · KPI icon square `14px`.

### 3.5 Elevation & Shadows
| Token | Value |
|---|---|
| `elevation-1` (card) | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` |
| `elevation-2` (hover) | `0 4px 12px rgba(0,0,0,0.08)` |
| `elevation-3` (dropdown/popover) | `0 12px 32px rgba(0,0,0,0.12)` |
| `elevation-modal` | `0 24px 64px rgba(0,0,0,0.20)` |
| `shadow-focus-ring` | `0 0 0 3px rgba(23,24,28,0.14)` |

Flatter, tighter shadows than a consumer app — matches the Material Dashboard reference's restrained card elevation.

### 3.6 Motion
Same token structure as the master template (`150 / 280 / 500ms`, transform+opacity only, respects `prefers-reduced-motion`). Two additions specific to this data-dense product:
- **Number roll-up:** KPI numerals count up from 0 (or previous value) over 600ms ease-out on data load/refresh — reinforces "live data," a pattern pulled from the micro-interactions reference library.
- **Chart draw-in:** bars/lines animate from baseline over 500ms, staggered 40ms per series — never on every re-render, only on first load or period change.

---

## 4. ICONOGRAPHY, ILLUSTRATION & PHOTOGRAPHY SOURCING

```
ICON SET (UI icons):        Icons8 Material Outlined (primary) — icons8.com/icons/material-outlined
FALLBACK / FILLED VARIANT:  Icons8 Material (filled) — used only for active/selected nav states
ICON DELIVERY:               via icons8-mcp where available, otherwise direct SVG export
ILLUSTRATION (empty states): Minimal line-art only — no cartoon/beam-style illustration (too casual
                              for this product); prefer a simple icon-in-circle over a full illustration
PHOTOGRAPHY:                 Unsplash "software company" collection — used only for the sign-in/
                              login screen background and any marketing-adjacent empty states,
                              never inside the analytics/data screens themselves
LOGO MARK:                   Provided SalesVision mark (red→black gradient infinity form) — used at
                              32px in the sidebar header and centered on the sign-in card; never
                              recolored, never used as an in-app functional-color source (see §0)
```

**Rules:**
- Outlined Material icons throughout the nav, toolbars, and table actions — filled Material icons *only* for the active sidebar item and for filled-state toggles (e.g., an active filter chip). Never mix outline/filled within the same nav at rest.
- No decorative illustration inside dashboards, tables, or KPI cards — this is a "boardroom" tool, not a consumer app; empty states use an icon-in-a-tinted-circle + one line of copy instead of a mascot-style graphic.
- Photography (Unsplash) is reserved for the sign-in screen backdrop, matching the Material Dashboard sign-in reference — a full-bleed, moody, professional office/workspace photo behind a centered glass-panel card, logo centered at top of the card.

---

## 5. LAYOUT SYSTEM & APP SHELL

```
┌───────────────┬──────────────────────────────────────────────┐
│               │  TOP BAR (64px): breadcrumb, "Type here…"     │
│  SIDEBAR      │  search pill, notifications, avatar+name      │
│  (240px,      ├──────────────────────────────────────────────┤
│  WHITE)       │  GLOBAL FILTER STRIP (48px): period selector, │
│               │  Export, Refresh — persistent across screens  │
│  Logo         ├──────────────────────────────────────────────┤
│  Nav items    │                                                │
│  (black       │        MAIN CONTENT (inner-scroll)            │
│  active pill) │        bg: #F4F5F7                             │
│  Settings     │                                                │
│  pinned btm   │                                                │
└───────────────┴──────────────────────────────────────────────┘
```

**Non-negotiables:**
1. **Desktop-first, 1440px canvas** — this is a leadership tool used at a desk. Tablet is a faithful, legible adaptation (tables scroll horizontally, filters collapse to a drawer); mobile is a simplified card-based read view with export still available (per the source PRD's own non-functional requirement).
2. **One persistent global filter** — the single biggest change from the current build. The period selector (Day/Week/Month/Custom) and its resulting date range live in the top filter strip and apply to every screen; navigating from Dashboard to Calls to Mapping keeps the same period selected. This directly fixes the UX debt flagged in the Functional Spec (§11.1, §14.1).
3. **Sidebar is labeled, WHITE, matching the reference exactly** — this supersedes v1.0's dark-navy sidebar decision. White background, light grey border-right, black pill for the active item, grey icons/text at rest.
4. **Inner-scroll content, fixed shell** — sidebar, top bar, and filter strip never scroll; only the content region scrolls (`overflow-y:auto`), keeping filters/nav always reachable — critical for a screen a Director may spend 10+ minutes scanning.
5. **Scope badge** — shown in the top bar whenever `access_level !== enterprise`, exactly as in the live build — a small pill: "Scoped to: {Department name(s)}".

**Sidebar spec — rewritten to match the reference image exactly:**
```
Width: 240px (labeled) / 72px (collapsed, icon+tooltip)
Background: #FFFFFF
Border-right: 1px solid #EEEEEE
Logo: SalesVision mark, 28px, top, 20px padding, "SalesVision" wordmark beside it
  (Poppins 15px weight 600 #1A1A1A)

Nav item: 44px height, 12px radius, 8px horizontal margin, icon (20px) + label (Inter 14px weight 500)
  Inactive: bg transparent, icon/text #67748E
  Active:   bg #17181C (near-black), icon/text WHITE, no left accent bar needed —
    the reference achieves "active" purely through the solid black pill fill
  Hover (inactive): bg #F4F5F7

Bottom-pinned: Settings nav item (same style) → then a thin divider →
  "Documentation"-style secondary button (optional, can repurpose as
  "Help & Support") → user mini-card (avatar 32px black circle, white
  initials + director.name Inter 13px weight 600 #1A1A1A + "Director"
  Inter 11px #8392AB)
```

**Top bar:** breadcrumb/page title (left) · global search — pill input, bg `#F4F5F7`, placeholder **"Type here…"** exactly as the reference (not "Search…"), border `1px solid #EEEEEE` (center) · notification bell (plain outline circle button, no colored background) + avatar/name (right).

**Global filter strip (new, replaces per-screen filters):** Period pill group (All · Today · This Week · This Month · Custom) — inactive pills transparent, active pill white + `elevation-1` inside a light grey `#F1F1F3` track (same segmented-control pattern as before, just recolored to monochrome) · Custom range date pickers (appear inline on "Custom") · Export button (now solid black, see §7.1) · Refresh button — all screens read from this one piece of state.

---

## 6. RESPONSIVE GRID & BREAKPOINTS
Same scale as the master template: `0 / 600 / 900 / 1200 / 1536`. Container max-width 1440px centered on ultra-wide monitors. Tables get horizontal scroll below 1024px; filter strip collapses into a slide-out drawer below 900px (matches the PRD's explicit tablet requirement).

---

## 7. COMPONENT LIBRARY

Built against the Creative Tim Material Dashboard reference and the `@creative-tim/ui` block list supplied — see Appendix B for the exact block-to-screen mapping. Every component below needs all states (default/hover/active/disabled/loading/error/empty), not just default.

### 7.1 KPI Cards — rebuilt to match the reference's exact anatomy

This is the single biggest visual change from v1.0. The reference KPI card is NOT a left-accent-bar card — it's:

```
Card: bg white, radius 16-20px, elevation-1, padding 20px
Layout: display flex, justifyContent space-between, alignItems flex-start

LEFT COLUMN (stacked):
  Label — Inter 13px weight 500 #67748E ("Today's Money" / "Calls Made")
  Value — Poppins 28-30px weight 700 #1A1A1A, marginTop 4px ("$53k" / "4,820")
  Delta line — marginTop 8px, Inter 13-14px:
    delta % in weight 700, GREEN #4CAF50 if positive / RED #F5365C if negative
    + muted grey text after it, weight 400, e.g. "than last week" / "than yesterday"
    (this exact "+55% than last week" pattern — never a standalone badge/pill)

RIGHT: ICON SQUARE — 48x48px, bg #17181C (near-black), radius 14px,
  centered white icon (24px, Icons8 Material Outlined), positioned top-right
  of the card, NOT a left accent bar, NOT module-colored — always black
```

One hero-scale variant (marginally larger value text, e.g. 32-34px) for the single primary KPI per screen, otherwise this exact anatomy is used for every KPI card across every screen — no exceptions, no per-module recoloring of the icon square.

### 7.2 Charts — green line/bar, dark tooltip, matching the reference exactly

Standardize on a real chart library (Recharts) for maintainability, but match the reference's actual rendered look:
- **Single-series charts** ("Website Views" bar-style, "Daily Sales" line-style): solid `#4CAF50` green fill/stroke, no gradient needed on bars; a soft gradient fill under the line is acceptable for line charts specifically (matches the reference's subtle area-under-line treatment).
- **Multi-series charts** (Call Outcomes: accepted/no_response/rejected): use the Chart & Data Color Map (§3.1C) — green/slate-grey/red — always paired with a text legend below the chart, never color-only.
- **Tooltip — replicate exactly:** dark rounded box (`bg #1A1A1A`, `radius 8px`, `padding 8px 12px`), small colored square swatch (matches the series color) + the period label (e.g. "September") on one line, then `"{Series name}: {value}"` on the next line, both in white Inter 12-13px. Appears on hover/tap over any data point, positioned above the point with a small pointer/arrow.
- Axis labels: light grey `#8392AB`, gridlines very faint `#F0F0F0` or omitted entirely (the reference's charts are close to gridline-free).
- Loading: skeleton block. Empty: centered icon + "No data for this period" — never a blank chart card.

### 7.3 Tables — matching the reference's clean row style

Reference blocks: `data-table-advanced`, `advanced-comparison-table`, `global-sales-table`, `member-list-table`.
- Header row: uppercase, Inter 11px weight 600, `#8392AB`, NO background fill (the reference header is transparent, not a shaded bar) — just a `1px solid #F0F0F0` bottom border.
- Data rows: `1px solid #F0F0F0` bottom border only (no zebra striping, no left borders), generous vertical padding (~16px) so rows feel airy rather than dense.
- Entity cell: avatar (photo or initials circle) + name (Inter 14px weight 600 `#1A1A1A`) + email/subtitle below (Inter 12.5px `#8392AB`) — exactly the reference's "Author" column pattern.
- Status cell: **solid-fill pill** (§3.1D) — "ONLINE" green pill / "OFFLINE" dark pill, uppercase, white text, Inter 11px weight 700, radius 6px, padding `4px 10px`.
- Action cell: plain text link style ("Edit") in `#1A1A1A`, underline on hover — not an icon-button, matching the reference exactly. Icon buttons remain acceptable for actions the reference doesn't show (view/toggle-status), but the primary "Edit" affordance is a text link.
- Additions over the live build (kept from v1.0, still true): pagination/virtualized scroll on every table, sticky group-header rows for grouped tables (Calls), sortable column headers with `aria-sort`.

### 7.4 Cards, Badges, Progress
Standard card: `16-20px` radius (rounder than v1.0's `12px` — matches the reference), `elevation-1`, hover `elevation-2` + `translateY(-2px)` only where clickable. Progress bar (matches the reference's "Projects" table exactly): track `#DEE2E6`, height `4px`, radius `9999px`, fill color per §3.1C's progress-bar row (blue=working, green=done, red=canceled), percentage label directly above the bar in Inter 12px weight 600 `#1A1A1A`, bar animates 0→value on mount.

### 7.5 Filters & Toggles
Segmented toggle (Executives⇄Managers): pill container `bg #F1F1F3`, active option white bg + `elevation-1`, text `#1A1A1A`. Filter chips (Manager multi-select, Industry single-select): rounded-full, active state = `#17181C` bg + white text (solid black chip, matching the brand-is-black rule) rather than a light tint.

### 7.6 Modals & Forms
Backdrop must be `rgba(0,0,0,0.5)` + `blur(4px)` — **explicitly fixes the transparent-backdrop bug flagged in the Functional Spec.** Primary submit buttons inside modals are solid black (§7.1's button rule), matching the reference's "+ Add New Card" / "Sign in" button treatment exactly. Department Builder / Create Manager modals keep their existing field-level pattern (repeatable team rows, nested manager-creation escape hatch) but add: a confirmation prompt before discarding unsaved changes on close, and a success toast on submit (both gaps flagged in the Functional Spec §11.5).

### 7.7 Buttons — solid black primary, matching the reference exactly
| Variant | Background | Text | Usage |
|---|---|---|---|
| Primary | `#17181C`, hover `#000000` | white | Every primary action — "Sign in," "+ Add New Card," "Export," modal submit buttons |
| Secondary / Outline | transparent, `1.5px solid #DEE2E6` | `#1A1A1A` | Cancel, secondary actions |
| Ghost / Text link | transparent, no border | `#1A1A1A`, underline on hover | Table row actions ("Edit"), minor actions |
| Danger | `#F5365C` | white | Destructive actions only |

Radius `10px`, height `44px` standard / `48px` CTA — same sizing discipline as before, only the fill color changed.

### 7.7 Profile / Account (new for this portal)
Reference blocks: `user-profile-with-stats`, `account-basic-info-01`, `account-notifications-01`, `account-sessions-01` — used for the Director's own Settings screen (Section 14, S10).

---

## 8. ACCESSIBILITY
Same WCAG 2.1/2.2 AA minimums as the master template (§8), with two items called out because they're *known, documented gaps* in the current build:
- **Contrast:** the existing `text-hint` value (`#94A3B8`-and-lighter in places) was explicitly flagged as too light against white — corrected to `#94A3B8` as the *lightest* permitted tone here, never lighter.
- **Color-only signaling:** chart series and delta indicators must pair color with a label, icon, or pattern — direct fix for the accessibility gap the Functional Spec calls out on the Dashboard's call-outcome chart.

---

## 9. CONTENT STRATEGY & MICROCOPY — DIRECTOR VOICE
**Voice:** authoritative, precise, zero fluff. This user does not want to be charmed — they want to be informed correctly and fast.
- KPI labels are nouns, not sentences: "Calls Made," not "You've made these calls."
- Empty states are factual: "No call data for this period" — not "Looks like it's quiet around here! 👋"
- Errors are calm and specific: "Couldn't load Team Performance data — try refreshing." Never a raw stack trace or bare "Error."
- Success is confirmed, not celebrated: "Department created." — not "Woohoo! Department created!"
- The Director-mode indicator, wherever shown, is neutral and permanent: "Director View — Read Only" as a small persistent badge, not a warning-styled banner.

---

## 10. UX PATTERNS & STATES
Every data-bearing screen designs for all five states, per the Functional Spec's own recommendation:
**Loading** (skeleton, matching real card/table shapes — not generic bars) → **Loaded** → **Empty** (icon + message + optional "adjust filters" hint) → **Error** (inline banner, non-blocking, rest of page still attempts to render) → **Filtered** (a visible "Filtered by: {Manager name} ✕" chip near the page title, not just an inline text link — fixes the "filter state gets lost on scroll" gap flagged in §11.2).

---

## 11. MOTION & MICRO-INTERACTIONS
Carried over + new, referencing the supplied micro-interactions library:
- Hover-lift + shadow increase on every clickable card (Department/Team/Manager/Lead cards) — preserve, it already works well.
- Spin animation on Refresh icon while loading — preserve.
- Sort-direction chevrons flip on repeated header clicks — preserve.
- Custom date-range picker fades in only when "Custom" is selected — preserve.
- **New:** KPI number roll-up animation on load/refresh (§3.6).
- **New:** filter-chip "pop" (scale 0→1.05→1, 200ms) when a filter is applied, giving tactile confirmation that a click registered before data finishes loading.

---

## 12. MOCK DATA MODELING GUIDE — SALESVISION

```
DIRECTOR OBJECT:
  name, initials, role ("Director"), access_level (enterprise|cross|standard),
  department_names (if scoped), company_name

TOP-LEVEL METRICS (Dashboard hero + secondary KPIs):
  calls_made, calls_made_delta, total_mappings, total_mappings_delta,
  hot_leads, hot_leads_delta, connected_calls, connect_rate

TREND DATA:
  6-8 periods of {date, accepted, no_response, rejected} for the call-outcomes chart

STATUS BREAKDOWNS:
  lead_temperature: {cold, warm, hot}
  mapping donut: {assigned, unassigned}

ENTITY LISTS (5-6 realistic rows each):
  Executives: {id, name, manager_name, calls_period, connected_period, hot_leads,
               warm_leads, connect_rate, calls_today}
  Managers:   {id, name, department, team_size, calls_period, connected_period,
               hot_leads, warm_leads, connect_rate, calls_today}
  Leads:      {id, company_name, industry, temperature, assigned_executive,
               last_call_date, current_stage, days_in_pipeline}
  Departments: {id, name, team_count, manager_count, executive_count, total_calls,
               total_conversions}

NOTIFICATIONS LIST:
  4-5 items: title, body, relative time, read/unread, type (batch/course/test/supervisor
  equivalents → here: lead/report/team/system)
```

Use real-sounding industries (BFSI, Healthcare, Manufacturing, Retail, IT/Tech) and real-sounding company names in lead/mapping mock rows — this is what exposes whether the Mapping bar chart's rotated labels and the Leads board's card layout hold up under realistic name lengths.

---

## 13. SCREEN & NAVIGATION ARCHITECTURE — THE SINGLE CONNECTED FLOW

This is the one state machine every screen is built against — no screen exists in isolation.

```js
const [screen, setScreen] = useState('dashboard');
const [globalPeriod, setGlobalPeriod] = useState('week');       // shared across ALL screens
const [globalDateRange, setGlobalDateRange] = useState(null);   // for 'custom'

// PRIMARY NAV — sidebar, always visible
'dashboard'
'mapping'
'calls'
'team'                  // Executives ⇄ Managers rankings
'leads'                 // NEW — Lead Temperature Board (funnel + cards)
'organization'           // Department List
'reports'                // NEW — Reports & MIS Centre
'settings'

// DRILL-DOWN SCREENS (breadcrumb back to parent, inherit globalPeriod)
'leads-detail'           // NEW — from 'leads', single lead read-only timeline
'organization-department'   // from 'organization', per-department team grid
'organization-team'         // from 'organization-department', single team detail
'executive-profile'         // NEW — from 'team' or 'calls' table row click

// MODALS (overlay, not routed — triggered from 'organization' screens)
'modal:department-builder'
'modal:create-manager'      // nested inside department-builder
```

**Wiring rules (what makes this "one flow, not disconnected screens"):**
1. `globalPeriod` / `globalDateRange` live above the `screen` state and are read by every screen — changing period on Dashboard and then navigating to Calls shows the same period already applied.
2. Every card/row that represents a *specific entity* is clickable and navigates deeper: a Lead card → `leads-detail`; a Department card → `organization-department`; a Team card → `organization-team`; an Executive table row (Team, Calls, or Dashboard) → `executive-profile`. Nothing in this system is a dead end.
3. Every drill-down screen renders a breadcrumb built from the navigation stack, not hand-written per screen (e.g., `Organization / Sales Dept / Team Alpha`).
4. Manager/Industry filter selections made on one screen (e.g., filtering Calls to one manager) do **not** silently carry into other screens' filters — but the Manager or Industry entity itself is a real link: clicking a manager's name anywhere always routes to that manager's aggregated view.
5. The Reports & MIS Centre (`reports`) is reachable from the sidebar directly, *and* every analytics screen's inline "Export" button is a shortcut that pre-fills the Reports Centre's filter state with the current screen/period/filter combination rather than being a fully separate export path — one export engine, two entry points.

---

## 14. SCREEN-BY-SCREEN SPEC

**[S1] Dashboard** (home/landing) — Hero KPI (Calls Made, with sparkline) + 3 secondary KPIs (Total Mappings, Hot Leads, Connected Calls w/ connect-rate) + Call Outcomes bar chart + Lead Temperature donut + Executives⇄Managers performance table toggle. Everything reads `globalPeriod`.

**[S2] Mapping** — Industry filter chips + Mapping-by-Industry bar chart + Assigned/Unassigned donut + Industry Breakdown table (with coverage badge) + Manager Overview card grid (mapped/assigned/coverage progress bar per manager).

**[S3] Calls** — 4 KPI cards (Made/Received/Not Picked/Not Interested) + Executives⇄Managers toggle + Manager multi-select filter chips + grouped executive table (sticky manager subtotal headers — new) with Connect % badge.

**[S4] Team** — Manager summary card grid (click to filter) + fully sortable Executives/Managers ranking table + medal indicator for rank #1 + sparkline trend column per executive (from the PRD's Executive Performance screen, merged in here rather than as a separate screen, since it's the same ranking data at a different grain).

**[S5] Leads** *(new, from PRD)* — Pipeline funnel (Mapped → Assigned → Call Made → Warm → Hot, with conversion % at each step) + Hot/Warm/Cold tab strip + scrollable, color-bordered lead card list (Industry + Manager filter chips). Clicking any card → S6.

**[S6] Lead Detail** *(new, from PRD)* — Breadcrumb back to Leads. Header: company, temperature badge, stage, industry, executive, manager, date mapped. Persistent "Read-Only" indicator. Two-column: chronological activity timeline (left) + summary panel (Stage, Total Calls, Connected, Days in Pipeline, Next Action — right). Download this lead's activity log (PDF).

**[S7] Executive Profile** *(new, addition — see §15)* — drill-in from any table row showing an executive's name. Full individual performance history, call outcome breakdown, assigned leads list, trend chart over the selected period.

**[S8] Organization** (Department List → Department Detail → Team Detail) — card-grid drill-down exactly as reverse-engineered, with capability-gated "+ Create Department" (see §2 reconciliation) and confirm-before-discard on the builder modal.

**[S9] Reports & MIS Centre** *(new, from PRD)* — Left filter panel (Period, Manager multi-select, Executive, Industry, Customer type, format toggle XLSX/PDF). Right: 4 report template cards (Daily Call Activity, Pipeline & Lead Temperature MIS, Mapping Coverage, Executive Performance) each with Download button + progress indicator for large ranges. Download history table below (last 10, per audit requirement in the PRD's NFRs).

**[S10] Settings** *(new, standard for any portal)* — Director's own profile, notification preferences, session management — built from the `account-*` Creative Tim reference blocks.

---

## 15. EXTRA METRICS & ADDITIONS — WHERE THE SOURCE SPECS WERE THIN

Beyond reconciling the two source specs (§2), these are net-new ideas worth building in from day one:

1. **Executive Profile drill-in (S7)** — both source docs let you drill into a *lead* but never into a *person*; a Director's most common real question ("what's actually going on with this one rep") had no screen. Added.
2. **Period-over-period comparison mode** — a small toggle next to the global filter: "vs. previous period" on/off, applied consistently to every delta badge app-wide (today it's implicit/inconsistent).
3. **Pinned/saved filter views** — let a Director save "Manager = Rahul Verma + This Month" as a one-click shortcut; this recurring need is implied by the "investigating a performance dip" user flow in the Functional Spec but never solved.
4. **Colorblind-safe chart encoding** — direct fix, called out in §8 and §7.2.
5. **Global command palette (⌘K)** — the existing search box already searches the contacts pool; extending it to jump between screens ("Go to Mapping," "Go to Rahul Verma's profile") costs little and matches the Apple HIG-inflected, keyboard-friendly direction requested for this build.
6. **Download history + audit trail surfaced in Reports Centre (S9)** — closes the PRD's explicit security/audit requirement that the live build doesn't yet implement.
7. **Sticky group headers in dense tables** — direct fix for the flagged Calls-table scanability problem.
8. **Standardized skeleton system** — one shared skeleton component library instead of each tab hand-rolling its own (flagged as inconsistent in the UI Spec).

---

## 16. DESIGN HANDOFF & DEVELOPER TOKENS

```css
:root {
  --color-brand: #17181C;
  --color-brand-hover: #000000;
  --color-error: #F5365C;
  --color-success: #4CAF50;
  --color-warning: #FB6340;
  --color-chart-primary: #4CAF50;
  --color-chart-neutral: #8392AB;
  --color-progress-working: #3B82F6;

  --bg-app: #F4F5F7;
  --bg-sidebar: #FFFFFF;

  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;

  --space-4: 16px; --space-6: 24px;
  --radius-card: 18px; --radius-modal: 16px; --radius-icon-square: 14px;
  --motion-duration-md: 280ms;
  --motion-ease: cubic-bezier(0,0,0.2,1);
}
```

Figma structure: `Foundations → Components → Screens/Director`. Component naming: `KPI/Standard`, `KPI/Hero`, `Table/Grouped`, `Chart/Line/Green`, `Chart/Bar/MultiSeries`, `Button/Primary/Black`.

---

## 17. QA, ANALYTICS & GOVERNANCE
Same checklist structure as the master template (§17), with SalesVision-specific analytics events to instrument: `period_changed`, `export_triggered {screen, format}`, `lead_detail_viewed`, `executive_profile_viewed`, `filter_applied {screen, filter_type}`, `department_created`, `manager_created_inline`. Version this document alongside the design system (`v1.0` → next revision on Manager/Executive portal kickoff).

---

## APPENDIX A: CHEAT SHEET

```
ACCENT:        #17181C near-black — the ONLY functional UI color (buttons, active
               nav, KPI icon squares). Logo red stays logo-only, see §0.
FONT:          Poppins (headings) + Inter (body/data, tabular figures)
GRID:          8px — {4,8,12,16,20,24,32,48}
RADIUS:        chips 6 / inputs+buttons 10 / cards 16-20 / modals 16 / icon-square 14
KPI CARD:      label+value+delta stacked left, black 48px icon square top-right —
               NOT a left accent bar. Delta text: green #4CAF50 / red #F5365C +
               muted "than last week" copy, never a standalone pill.
CHART COLOR:   #4CAF50 green primary series everywhere; dark #1A1A1A tooltip with
               colored swatch + "{period} / {series}: {value}"
STATUS PILLS:  solid-fill — green #4CAF50 (Active/Online) / dark #344055 (Inactive/Offline)
COVERAGE TIER: ≥50% green / 25-49% orange #FB6340 / <25% red #F5365C (light-tint chips)
SIDEBAR:       240px labeled, WHITE bg, black pill for active item, grey at rest
GLOBAL FILTER: one persistent Period selector — never per-screen again
ICONS:         Icons8 Material Outlined (primary) / Material filled (active only)
```

---

## APPENDIX B: CREATIVE TIM COMPONENT → SALESVISION SCREEN MAP

| Reference block | Used for |
|---|---|
| `kpi-sparkline-cards`, `kpi-cards-with-arrow`, `complex-kpi-cards` | Dashboard hero/secondary KPIs (S1) |
| `bar-chart-example`, `donut-chart-breakdown`, `combo-chart-target` | Dashboard + Mapping charts (S1, S2) |
| `data-table-advanced`, `advanced-comparison-table` | Team, Calls, Mapping tables (S2–S4) |
| `agent-management-list-01/detail-01/analytics-01` | Executive Profile (S7) |
| `sidebar-with-notification`, `double-sidebar` | App shell sidebar (§5) |
| `cruds-01/02/03` | Organization Management CRUD screens (S8) |
| `account-basic-info-01`, `account-notifications-01`, `account-sessions-01`, `user-profile-with-stats` | Settings (S10) |
| `table-header-with-title-and-cta`, `simple-table-footer-with-pagination` | Reports & MIS Centre table (S9) |
| `member-list-table`, `global-sales-table` | Lead card list styling reference (S5) |
| Material Dashboard sign-in reference | Login screen — Unsplash photo backdrop + centered glass card + logo |

This document is the operating spec for the Director Portal build. Next step per your plan: turn Sections 13–14 into individual, sequential build prompts, screen by screen, starting with S1 (Dashboard).
