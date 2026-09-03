=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild the Sign-In screen, App Shell, or Dashboard from Step 1.
Only ADD the Mapping screen.
All existing screens, state, and shell behavior must remain intact.
Reminder of the locked palette: primary/brand color is near-black #17181C,
sidebar is WHITE, chart primary color is green #4CAF50, KPI cards use the
label+value+delta-on-left / black-icon-square-on-right anatomy — no left
accent bars, no blue/indigo, no per-module rainbow.

=============================================================
STEP 2 — MAPPING
=============================================================

Replace the 'mapping' placeholder with a full mapping-coverage screen:
industry filter chips, a KPI summary row, a mapping-by-industry bar chart,
an assigned/unassigned donut, an industry breakdown table, and a manager
overview card grid.

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

const industries = ["All", "BFSI", "Healthcare", "Manufacturing", "Retail", "IT/Tech"];

const mappingByIndustry = [
  { industry: "BFSI", totalMapped: 412, assigned: 340, unassigned: 72, callsInitiated: 198, coveragePct: 58 },
  { industry: "Healthcare", totalMapped: 268, assigned: 190, unassigned: 78, callsInitiated: 121, coveragePct: 45 },
  { industry: "Manufacturing", totalMapped: 205, assigned: 110, unassigned: 95, callsInitiated: 40, coveragePct: 32 },
  { industry: "Retail", totalMapped: 88, assigned: 20, unassigned: 68, callsInitiated: 5, coveragePct: 18 },
  { industry: "IT/Tech", totalMapped: 387, assigned: 301, unassigned: 86, callsInitiated: 210, coveragePct: 61 }
];

const mappingDonut = {
  assigned: mappingByIndustry.reduce((sum, r) => sum + r.assigned, 0),
  unassigned: mappingByIndustry.reduce((sum, r) => sum + r.unassigned, 0)
};

const mappingKpis = {
  totalMapped: mappingByIndustry.reduce((sum, r) => sum + r.totalMapped, 0),
  totalMappedDelta: 6.1,
  totalAssigned: mappingByIndustry.reduce((sum, r) => sum + r.assigned, 0),
  totalAssignedDelta: 4.3,
  totalUnassigned: mappingByIndustry.reduce((sum, r) => sum + r.unassigned, 0),
  totalUnassignedDelta: -2.7,
  avgCoveragePct: 42.8,
  avgCoveragePctDelta: 3.9
};

const managerMappingOverview = [
  { managerId: "MGR-001", managerName: "Rahul Verma", initials: "RV", department: "Enterprise Sales",
    teamSize: 6, mappingCount: 310, assignedLeads: 260, callCoveragePct: 56 },
  { managerId: "MGR-002", managerName: "Anita Desai", initials: "AD", department: "SMB Sales",
    teamSize: 5, mappingCount: 275, assignedLeads: 198, callCoveragePct: 41 },
  { managerId: "MGR-003", managerName: "Kiran Patel", initials: "KP", department: "Enterprise Sales",
    teamSize: 4, mappingCount: 190, assignedLeads: 96, callCoveragePct: 28 },
  { managerId: "MGR-004", managerName: "Meera Singh", initials: "MS", department: "Strategic Accounts",
    teamSize: 5, mappingCount: 265, assignedLeads: 231, callCoveragePct: 53 },
  { managerId: "MGR-005", managerName: "Arjun Nair", initials: "AN", department: "SMB Sales",
    teamSize: 3, mappingCount: 120, assignedLeads: 47, callCoveragePct: 19 }
];

=============================================================
STATE — ADD TO STATE SECTION
=============================================================

const [industryFilter, setIndustryFilter] = useState('All');

const filteredMappingRows = industryFilter === 'All'
  ? mappingByIndustry
  : mappingByIndustry.filter(r => r.industry === industryFilter);

// Manager cards and the donut/KPI row stay company-wide regardless of the
// industry filter in this step — the industry chip row narrows the BAR
// CHART and the INDUSTRY BREAKDOWN TABLE only, matching the reference
// product's existing behavior (confirmed in the Functional Spec).

function coverageTier(pct) {
  if (pct >= 50) return { bg: '#E7F7EC', color: '#4CAF50', label: 'green' };
  if (pct >= 25) return { bg: '#FFF3E6', color: '#FB6340', label: 'orange' };
  return { bg: '#FDE8EC', color: '#F5365C', label: 'red' };
}

=============================================================
SCREEN — MAPPING
=============================================================

screen: 'mapping'
animation: screenEnter 280ms ease-out both

Reads globalPeriod / globalDateRange from the shell (Step 1) — do NOT
create a local period filter. Page title "Mapping" is already handled by
the shared top bar logic from Step 1.

── INDUSTRY FILTER CHIP ROW (flexShrink 0, marginBottom 16px) ──

display: flex, gap: 8px, alignItems: center
{industries.map(ind => (
  chip: height 32px, padding '0 16px', radius 9999px, cursor pointer,
    Inter 13px weight 600, transition all 0.15s
  active (industryFilter === ind): bg #17181C, color white — solid black
    fill, matching the design system's "active chip = solid black" rule
  inactive: bg #F1F1F3, color #67748E
  onClick: () => setIndustryFilter(ind)
))}

── KPI ROW (display grid, grid-template-columns: repeat(4, 1fr), gap 16px, marginBottom 16px) ──

Same exact KPI card anatomy as Dashboard (Step 1) — label+value+delta on
the left, 44px black icon square on the right. Do NOT reintroduce a left
accent bar or any module color here.

  "Total Mapped" — {mappingKpis.totalMapped}, delta {totalMappedDelta}%,
    map-pin icon
  "Assigned" — {mappingKpis.totalAssigned}, delta {totalAssignedDelta}%,
    checkmark icon
  "Unassigned" — {mappingKpis.totalUnassigned}, delta {totalUnassignedDelta}%
    (note: for this KPI, a NEGATIVE delta is actually good news — fewer
    unassigned leads — so invert the color logic here only: negative
    delta renders GREEN, positive renders RED. Add a one-line code
    comment explaining this inversion so a future maintainer doesn't
    "fix" it back), inbox/tray icon
  "Avg Coverage" — "{avgCoveragePct}%", delta {avgCoveragePctDelta}%,
    target icon

── CHART ROW (display grid, grid-template-columns: 1.6fr 1fr, gap 16px, marginBottom 16px) ──

MAPPING BY INDUSTRY BAR CHART (min-height 320px, bg white, radius 18px,
  elevation-1, padding 20px):
  Title "Mapping by Industry" (Poppins 14px weight 600 #1A1A1A)
  Subtitle "Total mapped contacts" (Inter 12.5px #8392AB)
  Single-series bar chart, one bar per row in filteredMappingRows (or all
    5 industries if industryFilter === 'All'), bar color #4CAF50 green
    (matches the reference's single-series chart color exactly)
  X-axis labels: industry names, rotate -30deg if they overlap at this
    chart width (this is the ONLY place rotated labels are acceptable —
    prefer horizontal labels wherever they fit)
  Value label displayed directly above each bar (Inter 12px weight 600 #1A1A1A)
  TOOLTIP on hover: dark box (#1A1A1A, radius 8px, padding '8px 12px'),
    green swatch + industry name line 1, "Total Mapped: {value}" line 2 —
    same tooltip pattern as Step 1's Dashboard chart, reused exactly
  Bars animate up from baseline over 500ms on mount
  Loading: skeleton block. Empty (industryFilter yields 0 rows — shouldn't
    happen with fixed chip list, but code defensively): centered icon +
    "No mapping data for this selection"

ASSIGNED VS UNASSIGNED DONUT CARD (min-height 320px, bg white, radius
  18px, elevation-1, padding 20px):
  Title "Assigned vs Unassigned" (Poppins 14px weight 600 #1A1A1A)
  Donut: Assigned slice #4CAF50 green, Unassigned slice #DEE2E6 light
    grey (NOT a saturated color — unassigned is a neutral "gap," not a
    negative alert, so it stays grey, not red)
  Center label: total contacts (Poppins 20px weight 700 #1A1A1A) with
    "Total Contacts" caption below (Inter 11px #8392AB)
  Legend below: colored square + "Assigned: {count}" / "Unassigned:
    {count}", Inter 13px

── INDUSTRY BREAKDOWN TABLE (bg white, radius 18px, elevation-1, marginBottom 16px) ──

HEADER (52px, padding '0 20px', borderBottom 1px solid #F0F0F0,
  display flex, alignItems center, justifyContent space-between):
  "Industry Breakdown" title (Poppins 14px weight 600 #1A1A1A)

TABLE — transparent header row (uppercase Inter 11px weight 600 #8392AB,
  borderBottom 1px solid #F0F0F0, NO background fill), bottom-border-only
  data rows (1px solid #F0F0F0), hover bg #FAFAFA, no zebra striping:

  Columns: Industry | Total Mapped | Assigned | Unassigned | Calls
    Initiated | Coverage %

  Coverage % cell: light-tint 3-tier badge using coverageTier(pct) —
    bg/color from the helper function above, Inter 12px weight 700,
    radius 6px, padding '4px 10px", showing "{pct}%"

  Rows: {filteredMappingRows} — reacts live to the industry chip selection

  Empty state (if filteredMappingRows.length === 0): centered icon +
    "No industry data for this period"

── MANAGER OVERVIEW CARD GRID (display grid, grid-template-columns: repeat(3, 1fr), gap 16px) ──

SECTION TITLE (marginBottom 12px): "Manager Overview" — Poppins 16px
  weight 600 #1A1A1A

Each manager card:
  bg white, radius 18px, elevation-1, padding 20px
  display: flex, flexDirection column, gap 12px

  TOP ROW: avatar (40px circle, bg #17181C, white initials) + manager
    name (Inter 14px weight 600 #1A1A1A) + department/team-size subtitle
    (Inter 12.5px #8392AB, "{department} · {teamSize} executives")

  STATS ROW (display flex, justifyContent space-between):
    "Mapped" label (Inter 12px #8392AB) over "{mappingCount}" value
      (Poppins 18px weight 700 #1A1A1A)
    "Assigned" label over "{assignedLeads}" value, same styling

  CALL COVERAGE PROGRESS BAR:
    Label row: "Call Coverage" (Inter 12px #8392AB) + "{callCoveragePct}%"
      (Inter 12px weight 700, colored via coverageTier(pct).color) — right aligned
    Track: height 4px, bg #DEE2E6, radius 9999px
    Fill: width {callCoveragePct}%, bg coverageTier(pct).color, radius
      9999px, animates 0→value over 800ms ease-out on mount

  Cards from managerMappingOverview — hover: translateY(-2px) + elevation-2
    (cards aren't clickable to a detail screen yet in this step — that
    wiring arrives with the Organization module in Step 8/9; for now just
    the hover-lift, no onClick)

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Industry filter chips: role="radiogroup" container, each chip
  role="radio" + aria-checked matching the active state
- Coverage % badges and progress-bar fills: the percentage number itself
  is always rendered as visible text — color is a reinforcement, never
  the only signal
- Bar chart: rotated axis labels (if used) still need a title/aria-label
  on the chart summarizing the data ("Mapping totals by industry") for
  screen readers, since a rotated label is harder to parse visually and
  by some assistive tech
- Manager cards: even though non-interactive this step, use a semantic
  <article> or equivalent grouping with an accessible heading per card
  (the manager's name)
- Donut legend pairs color with text — never color-only

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): chart row stacks to 1 column; manager card grid
  drops to 2 columns; industry breakdown table scrolls horizontally.
Mobile (<768px): KPI row stacks to 2x2 grid; manager card grid becomes
  1 column; industry filter chips become horizontally scrollable instead
  of wrapping.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Industry chips: clicking any chip sets industryFilter and re-fetches
     (mock: re-filters) the bar chart and the industry breakdown table
  ✅ "All" chip resets to showing every industry
  ✅ Donut and manager cards remain company-wide regardless of industry
     filter (by design — only the bar chart and table narrow)
  ✅ Coverage % badges/progress bars render the correct tier color at the
     documented thresholds (≥50 green / 25-49 orange / <25 red)
  ✅ KPI row numerals count up on mount, same animation as Dashboard
  ✅ "Unassigned" KPI's delta color-inversion behaves correctly (negative
     delta = green, positive = red) — verify this explicitly, it's the
     one KPI on this screen that breaks the usual delta-color rule
  ✅ Bar chart tooltip shows on hover: dark box, green swatch, industry +
     value
  ✅ Manager card progress bars animate from 0 to their value on mount
  ✅ Empty states render correctly if you temporarily test with an empty
     filteredMappingRows array
  ✅ Global period filter (from the Step 1 shell) still visibly applies —
     changing it should be understood to affect this screen's numbers too
     (full live re-computation can be deferred, but the UI must not look
     disconnected from the global filter strip)

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for titles/KPI numerals/card titles; Inter for everything else
✅ Page background stays #F4F5F7 — this screen inherits the shell from
   Step 1, do not redeclare or override it
✅ Primary/brand color #17181C is the ONLY color used for the active
   industry chip and KPI icon squares
✅ Chart primary series color is #4CAF50 green — reused from Dashboard,
   not reinvented for this screen
✅ "Unassigned" donut slice is neutral grey #DEE2E6, NOT red — unassigned
   is a gap to close, not an alert state
✅ Coverage 3-tier badges/progress bars: ≥50% green #4CAF50 · 25-49% orange
   #FB6340 · <25% red #F5365C — identical thresholds and colors everywhere
   this pattern appears in the whole app, now and in every future step
✅ Tables: transparent header, bottom-border-only rows, no zebra striping
✅ Cards: 18px radius, elevation-1 default, elevation-2 + translateY(-2px)
   on hover only where genuinely interactive
✅ No left-accent-bar KPI cards, no blue/indigo, no per-module rainbow —
   this screen looks like a sibling of Dashboard, not a different app
✅ All toasts role="alert" (none expected to fire on this screen this
   step, but keep the pattern ready)

=============================================================
BUILD ORDER
=============================================================

1. Add mapping mock data (industries, mappingByIndustry, mappingDonut,
   mappingKpis, managerMappingOverview) and the coverageTier() helper
2. Add industryFilter state + filteredMappingRows computed value
3. Build the industry filter chip row
4. Build the KPI row (reusing the exact Dashboard KPI card anatomy)
5. Build the Mapping-by-Industry bar chart with tooltip
6. Build the Assigned/Unassigned donut with legend
7. Build the Industry Breakdown table with coverage badges + empty state
8. Build the Manager Overview card grid with progress bars
9. Wire the industry chip filtering to the bar chart and table
10. Verify KPI count-up, chart tooltip, and progress-bar animations all
    fire correctly on mount
11. Verify accessibility attributes and responsive behavior from the
    sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, or Dashboard from Step 1.
DO NOT create a local period filter — read globalPeriod/globalDateRange
  from the shell exactly as Dashboard does.
DO NOT make manager cards clickable yet — that drill-down is wired in
  the Organization module (Step 8/9), not here.
DO NOT change the coverage 3-tier thresholds or colors — they must stay
  identical everywhere this pattern is reused in later steps (Calls'
  connect-rate badge in Step 3 reuses this exact rule).