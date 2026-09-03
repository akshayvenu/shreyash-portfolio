=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild Sign-In, App Shell, Dashboard, Mapping, or Calls from Steps 1-3.
Only ADD the Team screen.
All existing screens, state, and shell behavior must remain intact.
Reminder of the locked palette: primary/brand color is near-black #17181C,
positive/chart color is green #4CAF50, connect-rate 3-tier thresholds are
≥50% green · 25-49% orange #FB6340 · <25% red #F5365C (identical to Steps
2-3, do not diverge), KPI/card anatomy stays label+value-left /
black-icon-square-right where cards appear.

=============================================================
STEP 4 — TEAM
=============================================================

Replace the 'team' placeholder with a full team-performance ranking
screen: manager summary card grid (click to filter), an Executives⇄Managers
ranking toggle, a fully sortable ranking table with a medal for rank #1,
and a per-executive sparkline trend column.

> **One deliberate departure from the source spec, flagged explicitly:**
> the original product's manager cards used "rotating color accents purely
> for visual distinction, not semantic meaning" (a different color per
> card, no pattern to it). That directly conflicts with this design
> system's locked monochrome-plus-green discipline — introducing 5 random
> colors here would look like a different app bolted onto Dashboard/
> Mapping/Calls. Manager cards in this build are monochrome (black avatar,
> white card) like everything else. If you want per-manager color-coding
> back, it needs to be a deliberate, documented decision in the Design
> System doc first, not slipped in at the component level.

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

// Same roster as Steps 1 and 3 — same manager and executive names, just
// this screen's specific fields (calls/connect/hot/warm + a 7-day trend
// per executive for the sparkline column).

const teamExecutives = [
  { id: "EXE-001", name: "Aarav Shah", initials: "AS", managerId: "MGR-001", managerName: "Rahul Verma",
    callsMade: 312, connectPct: 53.8, hotLeads: 14, warmLeads: 28,
    dailyTrend: [38, 45, 41, 50, 47, 44, 47] },
  { id: "EXE-003", name: "Rohan Gupta", initials: "RG", managerId: "MGR-001", managerName: "Rahul Verma",
    callsMade: 201, connectPct: 37.8, hotLeads: 4, warmLeads: 15,
    dailyTrend: [30, 28, 25, 33, 29, 27, 29] },
  { id: "EXE-002", name: "Diya Mehta", initials: "DM", managerId: "MGR-002", managerName: "Anita Desai",
    callsMade: 288, connectPct: 48.6, hotLeads: 11, warmLeads: 24,
    dailyTrend: [40, 42, 38, 44, 41, 39, 44] },
  { id: "EXE-006", name: "Priya Nambiar", initials: "PN", managerId: "MGR-002", managerName: "Anita Desai",
    callsMade: 274, connectPct: 55.1, hotLeads: 13, warmLeads: 22,
    dailyTrend: [36, 40, 39, 41, 40, 38, 40] },
  { id: "EXE-007", name: "Meher Chopra", initials: "MC", managerId: "MGR-003", managerName: "Kiran Patel",
    callsMade: 165, connectPct: 31.5, hotLeads: 3, warmLeads: 11,
    dailyTrend: [22, 24, 20, 25, 23, 25, 26] },
  { id: "EXE-004", name: "Kavya Iyer", initials: "KI", managerId: "MGR-004", managerName: "Meera Singh",
    callsMade: 356, connectPct: 56.4, hotLeads: 19, warmLeads: 31,
    dailyTrend: [45, 48, 50, 52, 49, 53, 59] },
  { id: "EXE-005", name: "Ishaan Bose", initials: "IB", managerId: "MGR-005", managerName: "Arjun Nair",
    callsMade: 142, connectPct: 27.5, hotLeads: 2, warmLeads: 9,
    dailyTrend: [18, 20, 19, 22, 20, 21, 22] }
];

const teamManagers = [
  { id: "MGR-001", name: "Rahul Verma", initials: "RV", department: "Enterprise Sales", teamSize: 6,
    callsMade: 980, connectPct: 52.2, hotLeads: 41, warmLeads: 88 },
  { id: "MGR-002", name: "Anita Desai", initials: "AD", department: "SMB Sales", teamSize: 5,
    callsMade: 845, connectPct: 47.5, hotLeads: 33, warmLeads: 70 },
  { id: "MGR-003", name: "Kiran Patel", initials: "KP", department: "Enterprise Sales", teamSize: 4,
    callsMade: 520, connectPct: 38.1, hotLeads: 15, warmLeads: 40 },
  { id: "MGR-004", name: "Meera Singh", initials: "MS", department: "Strategic Accounts", teamSize: 5,
    callsMade: 902, connectPct: 54.0, hotLeads: 37, warmLeads: 65 },
  { id: "MGR-005", name: "Arjun Nair", initials: "AN", department: "SMB Sales", teamSize: 3,
    callsMade: 310, connectPct: 29.7, hotLeads: 6, warmLeads: 20 }
];

=============================================================
STATE — ADD TO STATE SECTION
=============================================================

const [rankView, setRankView] = useState('executives'); // 'executives' | 'managers'
const [selectedManagerCardId, setSelectedManagerCardId] = useState(null); // single-select
const [sortColumn, setSortColumn] = useState('callsMade');
const [sortDirection, setSortDirection] = useState('desc'); // 'asc' | 'desc'

function handleRankViewChange(view) {
  setRankView(view);
  // Switching view resets BOTH the manager-card filter and the sort —
  // this exact reset behavior is documented in the source Functional Spec
  setSelectedManagerCardId(null);
  setSortColumn('callsMade');
  setSortDirection('desc');
}

function handleSort(column) {
  if (sortColumn === column) {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  } else {
    setSortColumn(column);
    setSortDirection('desc');
  }
}

function handleManagerCardClick(managerId) {
  setSelectedManagerCardId(prev => prev === managerId ? null : managerId);
}

const visibleExecutives = (selectedManagerCardId
  ? teamExecutives.filter(e => e.managerId === selectedManagerCardId)
  : teamExecutives
).slice().sort((a, b) => {
  const dir = sortDirection === 'desc' ? -1 : 1;
  return (a[sortColumn] - b[sortColumn]) * dir;
});

const sortedManagers = teamManagers.slice().sort((a, b) => {
  const dir = sortDirection === 'desc' ? -1 : 1;
  return (a[sortColumn] - b[sortColumn]) * dir;
});

// connectTier() — SAME helper/thresholds as Steps 2-3, do not redefine
// differently. If not already hoisted to a shared file by this point,
// redeclare it identically here.

=============================================================
SCREEN — TEAM
=============================================================

screen: 'team'
animation: screenEnter 280ms ease-out both

Reads globalPeriod / globalDateRange from the shell — no local period filter.

── RANK VIEW TOGGLE ROW (flexShrink 0, marginBottom 16px, display flex, justifyContent space-between, alignItems center) ──

LEFT: Executives ⇄ Managers segmented toggle — same visual pattern as
  Calls' toggle (bg #F1F1F3, active pill white + elevation-1)
  onClick: handleRankViewChange(...)

RIGHT: when selectedManagerCardId is set AND rankView === 'executives',
  show a "Filtered by: {manager name} ✕" chip (bg #F1F1F3, Inter 13px
  weight 600 #1A1A1A, small ✕ icon) — clicking it calls
  handleManagerCardClick(selectedManagerCardId) again to clear. This is
  the persistent "you are filtered" indicator the design system calls for
  (fixes the "filter state gets lost on scroll" gap noted from the
  source product) — it must stay visible near the page title, not just
  as a small text link buried in the card grid below.

── MANAGER SUMMARY CARD GRID (only rendered when rankView === 'executives', marginBottom 20px) ──

display: grid, grid-template-columns: repeat(5, 1fr), gap: 16px

Each card (bg white, radius 18px, elevation-1, padding 16px, cursor
  pointer, transition all 0.15s):
  Selected state (card.id === selectedManagerCardId): border 2px solid
    #17181C, elevation-2
  Hover (unselected): translateY(-2px) + elevation-2

  TOP: avatar (36px circle, bg #17181C, white initials) + manager name
    (Inter 14px weight 600 #1A1A1A) + "{teamSize} executives" (Inter 12px
    #8392AB) stacked beside/below it

  BOTTOM ROW (marginTop 12px, display flex, justifyContent space-between):
    "Calls" — Inter 11px uppercase #8392AB over "{callsMade}" Poppins 16px
      weight 700 #1A1A1A
    "Hot" — same styling over "{hotLeads}"
    "Connect" — same styling over "{connectPct}%" in the color from
      connectTier(connectPct) instead of plain black — this is the one
      spot on the card allowed a non-black color, since it's reusing the
      already-established connect-rate semantic, not an arbitrary accent

  onClick: handleManagerCardClick(manager.id)

── RANKING TABLE (bg white, radius 18px, elevation-1) ──

HEADER (52px, padding '0 20px', borderBottom 1px solid #F0F0F0, display
  flex, alignItems center, justifyContent space-between):
  "{rankView === 'executives' ? 'Executive' : 'Manager'} Rankings" title
    (Poppins 14px weight 600 #1A1A1A)

TABLE — transparent header row, every column header clickable and
  sortable (Inter 11px weight 600 uppercase #8392AB, cursor pointer,
  hover color #1A1A1A, chevron icon appears/flips based on sortColumn/
  sortDirection — up chevron for asc, down for desc, only shown on the
  currently-active sort column):

  EXECUTIVES VIEW columns: Rank | Executive | Manager | Calls Made |
    Connect % | Hot | Warm | Trend
  MANAGERS VIEW columns: Rank | Manager | Department | Team | Calls Made |
    Connect % | Hot | Warm

  DATA ROWS (borderBottom 1px solid #F0F0F0, padding '14px 20px' per
    cell, hover bg #FAFAFA):

    RANK CELL: rank #1 (first row after sorting) shows a medal emoji/icon
      🥇 (24px) instead of the number "1"; all other rows show their
      numeric rank (Inter 14px weight 600 #1A1A1A) recomputed live from
      current sort order — rank is NOT a fixed database value, it's
      always "position in the currently sorted list"

    EXECUTIVE/MANAGER CELL: avatar (32px, bg #17181C, white initials) +
      name (Inter 14px weight 600 #1A1A1A)

    MANAGER CELL (executives view only): manager name, Inter 13px #67748E

    DEPARTMENT / TEAM CELLS (managers view only): Inter 13px #67748E /
      "{teamSize} executives"

    CALLS MADE / HOT / WARM CELLS: Inter 14px weight 500 #1A1A1A, tabular figures

    CONNECT % CELL: connectTier(pct) badge — identical component/
      thresholds to Steps 2-3, no new variant

    TREND CELL (executives view only): inline mini sparkline (bar or
      line, ~80x28px), single color #4CAF50 green, built from
      executive.dailyTrend — no axis labels, no gridlines, just the
      shape; on hover show the same dark tooltip pattern (day index +
      value) used on Dashboard's chart, kept lightweight

  Empty state (if visibleExecutives.length === 0, e.g. a manager filter
    somehow yields nothing): centered icon + "No executives found" with a
    hint: "Try a different manager or clear the filter" + a "Clear
    Filter" ghost-button that calls handleManagerCardClick(selectedManagerCardId)

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Sortable column headers: role="button" (or a real <button> inside the
  <th>), aria-sort="ascending"|"descending"|"none" on the <th> itself,
  not just a visual chevron
- Manager cards: keyboard-operable (Enter/Space triggers the same
  onClick), aria-pressed reflecting selected state, and each card is a
  labeled group (manager's name as the accessible name)
- "Filtered by: X ✕" chip: the ✕ has an aria-label like "Clear manager
  filter," not just an icon
- Medal indicator: still include the numeric rank in an aria-label or
  visually-hidden text ("Rank 1") since an emoji alone isn't reliably
  announced by all screen readers
- Sparkline: aria-label summarizing the trend direction (e.g. "7-day
  trend, increasing") since the visual shape alone conveys no information
  to non-sighted users

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): manager card grid drops from 5 to 3 columns
  (wrapping to 2 rows); ranking table scrolls horizontally with the
  Executive/Manager name column pinned.
Mobile (<768px): manager card grid becomes a horizontally-scrollable row
  of cards instead of wrapping; ranking table becomes a stacked card list
  (rank + name + connect % badge visible by default, calls/hot/warm/trend
  revealed on tap-to-expand).

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Executives⇄Managers toggle swaps the table AND resets both the
     manager-card filter and the sort column/direction
  ✅ Manager card grid only renders in Executives view
  ✅ Clicking a manager card filters the executive table to that
     manager's reps; clicking the same card again clears the filter
  ✅ Selected manager card shows a visible black border + elevation change
  ✅ "Filtered by: X ✕" chip appears near the page title when filtered,
     and clicking its ✕ clears the filter
  ✅ Every column header is clickable; clicking sorts ascending/descending,
     clicking the same header again reverses direction
  ✅ Chevron indicator appears only on the active sort column and points
     the correct direction
  ✅ Rank #1 always shows the medal, recomputed live after every sort or
     filter change (i.e., rank is never a stale/fixed value)
  ✅ Connect % badges use the identical thresholds/colors from Steps 2-3
  ✅ Sparkline renders correctly for each executive's dailyTrend data
     (executives view only)
  ✅ Empty state + Clear Filter button work correctly if a filter yields
     zero rows

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for titles; Inter for everything else, tabular figures on all
   numeric table cells
✅ Page background #F4F5F7, inherited from the shell — do not redeclare
✅ Primary/brand color #17181C only — selected manager card border, avatar
   circles, active toggle pill
✅ Manager cards are MONOCHROME — no rotating per-card colors (see the
   flagged departure from the source spec at the top of this prompt)
✅ Connect % 3-tier thresholds/colors are IDENTICAL to Steps 2-3 — reuse
   the same helper function, do not restyle
✅ Sparkline color is #4CAF50 green, matching every other chart in the app
✅ Tables: transparent header, bottom-border-only rows, no zebra striping
✅ Cards: 18px radius, elevation-1 default, elevation-2 + translateY(-2px)
   on hover/selected
✅ No left-accent-bar cards, no blue/indigo anywhere
✅ All toasts role="alert" (none expected to fire from this screen)

=============================================================
BUILD ORDER
=============================================================

1. Add teamExecutives, teamManagers mock data (with dailyTrend arrays)
2. Add rankView, selectedManagerCardId, sortColumn, sortDirection state +
   handleRankViewChange(), handleSort(), handleManagerCardClick(),
   visibleExecutives, sortedManagers
3. Build the rank-view toggle row + the "Filtered by: X ✕" chip
4. Build the manager summary card grid (click-to-filter, selected-state styling)
5. Build the ranking table header with sortable/clickable columns + chevrons
6. Build the data rows for both Executives and Managers views, including
   the medal-for-rank-1 logic
7. Build the sparkline trend column (Executives view only)
8. Build the empty state + Clear Filter action
9. Wire the view-toggle's reset behavior (filter AND sort both clear)
10. Verify sort correctness, medal recomputation, and connect-tier colors
11. Verify accessibility attributes and responsive behavior from the
    sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, Dashboard, Mapping, or Calls from
  Steps 1-3.
DO NOT create a local period filter — read globalPeriod/globalDateRange
  from the shell.
DO NOT reintroduce rotating per-card manager colors — monochrome only,
  per the flagged decision at the top of this prompt.
DO NOT change the Connect %/coverage 3-tier thresholds or colors — same
  rule reused a third time now, it must not drift.
DO NOT build a standalone Executive Profile page from clicking a table
  row here — that drill-down belongs to Step 7. Table rows in this step
  are for sorting/scanning only, not navigation, unless you want to wire
  a placeholder toast ("Executive Profile coming in Step 7") consistent
  with Dashboard's existing row-click behavior from Step 1.