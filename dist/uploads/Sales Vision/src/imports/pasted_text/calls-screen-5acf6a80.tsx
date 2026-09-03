=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild Sign-In, App Shell, Dashboard, or Mapping from Steps 1-2.
Only ADD the Calls screen.
All existing screens, state, and shell behavior must remain intact.
Reminder of the locked palette: primary/brand color is near-black #17181C,
chart/positive color is green #4CAF50, negative is red #F5365C, neutral is
slate #8392AB, KPI cards use the label+value+delta-left / black-icon-square-
right anatomy, coverage/connect 3-tier badge is ≥50% green · 25-49% orange
#FB6340 · <25% red #F5365C — the SAME thresholds locked in Step 2, reused
here without modification.

=============================================================
STEP 3 — CALLS
=============================================================

Replace the 'calls' placeholder with a full call-outcome analytics screen:
4 KPI cards, an Executives⇄Managers toggle, manager multi-select filter
chips (executives view only), a grouped executive table with sticky
manager-subtotal rows, and a flat manager table.

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

// Reuses the same manager roster from Step 1 (managersList) — these rows
// are the call-outcome breakdown for those same 5 managers and their
// executives, so names stay consistent across the whole app.

const callExecutives = [
  { id: "EXE-001", name: "Aarav Shah", initials: "AS", managerId: "MGR-001", managerName: "Rahul Verma",
    made: 312, received: 168, notPicked: 98, notInterested: 46, connectPct: 53.8 },
  { id: "EXE-003", name: "Rohan Gupta", initials: "RG", managerId: "MGR-001", managerName: "Rahul Verma",
    made: 201, received: 76, notPicked: 88, notInterested: 37, connectPct: 37.8 },
  { id: "EXE-002", name: "Diya Mehta", initials: "DM", managerId: "MGR-002", managerName: "Anita Desai",
    made: 288, received: 140, notPicked: 102, notInterested: 46, connectPct: 48.6 },
  { id: "EXE-006", name: "Priya Nambiar", initials: "PN", managerId: "MGR-002", managerName: "Anita Desai",
    made: 274, received: 151, notPicked: 89, notInterested: 34, connectPct: 55.1 },
  { id: "EXE-007", name: "Meher Chopra", initials: "MC", managerId: "MGR-003", managerName: "Kiran Patel",
    made: 165, received: 52, notPicked: 84, notInterested: 29, connectPct: 31.5 },
  { id: "EXE-004", name: "Kavya Iyer", initials: "KI", managerId: "MGR-004", managerName: "Meera Singh",
    made: 356, received: 201, notPicked: 105, notInterested: 50, connectPct: 56.4 },
  { id: "EXE-005", name: "Ishaan Bose", initials: "IB", managerId: "MGR-005", managerName: "Arjun Nair",
    made: 142, received: 39, notPicked: 76, notInterested: 27, connectPct: 27.5 }
];

const callManagers = [
  { id: "MGR-001", name: "Rahul Verma", department: "Enterprise Sales", teamSize: 6,
    made: 980, received: 512, notPicked: 320, notInterested: 148, connectPct: 52.2 },
  { id: "MGR-002", name: "Anita Desai", department: "SMB Sales", teamSize: 5,
    made: 845, received: 401, notPicked: 296, notInterested: 148, connectPct: 47.5 },
  { id: "MGR-003", name: "Kiran Patel", department: "Enterprise Sales", teamSize: 4,
    made: 520, received: 198, notPicked: 234, notInterested: 88, connectPct: 38.1 },
  { id: "MGR-004", name: "Meera Singh", department: "Strategic Accounts", teamSize: 5,
    made: 902, received: 487, notPicked: 280, notInterested: 135, connectPct: 54.0 },
  { id: "MGR-005", name: "Arjun Nair", department: "SMB Sales", teamSize: 3,
    made: 310, received: 92, notPicked: 152, notInterested: 66, connectPct: 29.7 }
];

const callsKpis = {
  totalCalls: callExecutives.reduce((s, e) => s + e.made, 0),
  totalCallsDelta: 8.7,
  received: callExecutives.reduce((s, e) => s + e.received, 0),
  receivedDelta: 5.2,
  notPicked: callExecutives.reduce((s, e) => s + e.notPicked, 0),
  notPickedDelta: -1.9,   // negative here is GOOD — fewer unanswered calls
  notInterested: callExecutives.reduce((s, e) => s + e.notInterested, 0),
  notInterestedDelta: -3.4  // negative here is also GOOD — fewer rejections
};

=============================================================
STATE — ADD TO STATE SECTION
=============================================================

const [callsView, setCallsView] = useState('executives'); // 'executives' | 'managers'
const [selectedManagerIds, setSelectedManagerIds] = useState([]); // empty = "All"

function toggleManagerFilter(managerId) {
  setSelectedManagerIds(prev =>
    prev.includes(managerId)
      ? prev.filter(id => id !== managerId)
      : [...prev, managerId]
  );
}

// Grouped rows for the Executives view: bucket callExecutives by managerId,
// respecting selectedManagerIds (empty array = show every manager's group)
const groupedExecutiveRows = callManagers
  .filter(m => selectedManagerIds.length === 0 || selectedManagerIds.includes(m.id))
  .map(manager => ({
    manager,
    executives: callExecutives.filter(e => e.managerId === manager.id),
    subtotal: {
      made: callExecutives.filter(e => e.managerId === manager.id).reduce((s, e) => s + e.made, 0),
      received: callExecutives.filter(e => e.managerId === manager.id).reduce((s, e) => s + e.received, 0),
      notPicked: callExecutives.filter(e => e.managerId === manager.id).reduce((s, e) => s + e.notPicked, 0),
      notInterested: callExecutives.filter(e => e.managerId === manager.id).reduce((s, e) => s + e.notInterested, 0)
    }
  }));

function connectTier(pct) {
  // SAME thresholds/colors as Mapping's coverageTier() in Step 2 — do not
  // diverge. If a shared helper file exists by this step, move both there.
  if (pct >= 50) return { bg: '#E7F7EC', color: '#4CAF50' };
  if (pct >= 25) return { bg: '#FFF3E6', color: '#FB6340' };
  return { bg: '#FDE8EC', color: '#F5365C' };
}

=============================================================
SCREEN — CALLS
=============================================================

screen: 'calls'
animation: screenEnter 280ms ease-out both

Reads globalPeriod / globalDateRange from the shell — no local period filter.

── KPI ROW (display grid, grid-template-columns: repeat(4, 1fr), gap 16px, marginBottom 16px) ──

Same KPI card anatomy as Dashboard/Mapping — label+value+delta left, 44px
black icon square right. All 4 cards are equal weight this screen (no
hero variant):

  "Total Calls" — {callsKpis.totalCalls}, delta {totalCallsDelta}%, phone icon
  "Received" — {callsKpis.received}, delta {receivedDelta}%, checkmark icon
  "Not Picked" — {callsKpis.notPicked}, delta {notPickedDelta}%
    (negative delta renders GREEN here — fewer unanswered calls is good
    news; same inversion rule as Mapping's "Unassigned" KPI in Step 2 —
    reuse that exact color-inversion logic), phone-missed icon
  "Not Interested" — {callsKpis.notInterested}, delta {notInterestedDelta}%
    (same inversion — negative is green), thumbs-down or x-circle icon

── CONTROLS ROW (flexShrink 0, display flex, alignItems center, justifyContent space-between, marginBottom 16px) ──

LEFT: Executives ⇄ Managers segmented toggle — bg #F1F1F3, active pill
  white + elevation-1, Inter 13px weight 600, text #1A1A1A active /
  #67748E inactive
  onClick: setCallsView(...); switching to 'managers' hides the manager
  filter chip row below (it's Executives-view-only, matching the source
  product's documented behavior)

RIGHT (only rendered when callsView === 'executives'): manager filter
  chip row — multi-select:
    "All" chip: active (bold, bg #17181C, white text) when
      selectedManagerIds.length === 0; onClick clears selectedManagerIds
    One chip per callManagers entry: active (bg #17181C, white text) when
      its id is in selectedManagerIds; inactive (bg #F1F1F3, #67748E);
      onClick: toggleManagerFilter(manager.id)
    Chips: height 32px, padding '0 14px', radius 9999px, Inter 13px weight 600

── TABLE CARD (bg white, radius 18px, elevation-1) ──

EXECUTIVES VIEW (callsView === 'executives'):

  Transparent header row (uppercase Inter 11px weight 600 #8392AB,
    borderBottom 1px solid #F0F0F0, no background fill):
    Executive | Manager | Made | Received | Not Picked | Not Interested | Connect %

  For each entry in groupedExecutiveRows:

    MANAGER SUBTOTAL ROW (sticky within the table's scroll container —
      position: sticky, top matches the header row's height, so it stays
      visible while scrolling through that manager's executives; this
      directly fixes the "hard to scan" debt noted in the design system):
      bg #FAFAFA, borderBottom 1px solid #F0F0F0, padding '12px 20px'
      Manager name in Inter 14px weight 700 #1A1A1A (bold, clearly
        heavier than executive rows below it) + small "{teamSize}
        executives" caption (Inter 12px #8392AB) beside it
      Subtotal numbers (Made/Received/Not Picked/Not Interested) in Inter
        13px weight 700 #1A1A1A — visibly bolder than the executive rows
      Connect % — compute {subtotal.received / subtotal.made * 100} and
        render with the same connectTier() badge as executive rows

    EXECUTIVE ROWS (nested beneath, slightly indented, e.g. paddingLeft
      32px on the Executive cell to visually nest under its manager):
      borderBottom 1px solid #F0F0F0, padding '14px 20px' per cell, hover
      bg #FAFAFA
      Executive cell: avatar (32px, bg #17181C, white initials) + name
        (Inter 14px weight 600 #1A1A1A)
      Manager cell: manager name, Inter 13px #67748E (muted — the bold
        subtotal row above already established which manager this is)
      Made / Received / Not Picked / Not Interested: Inter 14px weight
        500 #1A1A1A, tabular figures
      Connect % cell: connectTier(pct) badge — bg/color from the helper,
        Inter 12px weight 700, radius 6px, padding '4px 10px', "{pct}%"

  If groupedExecutiveRows has zero groups (all managers filtered out —
    shouldn't happen since manager chips only toggle visibility of
    already-known managers, but handle defensively): centered icon +
    "No call data found for the selected managers"

MANAGERS VIEW (callsView === 'managers') — flat table, no grouping:

  Transparent header: Manager | Department | Team | Made | Received |
    Not Picked | Not Interested | Connect %

  Rows from callManagers: avatar+name cell (same style as executive rows),
    department (Inter 13px #67748E), team size ("{teamSize} executives"),
    numeric cells (Inter 14px weight 500, tabular figures), Connect %
    badge via connectTier()

  Empty state (if callManagers were empty): centered icon + "No manager
    call data found — managers need contacts assigned to them directly"
    (this exact copy preserved from the source product's documented
    empty-state message)

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Executives⇄Managers toggle: role="tablist" / role="tab" pattern, or a
  radiogroup — pick one and be consistent with the identical toggle
  pattern used on Dashboard's performance table
- Manager filter chips: role="group" with aria-label="Filter by manager",
  each chip toggleable via keyboard (Enter/Space), aria-pressed reflecting
  active state
- Sticky manager subtotal rows: ensure they don't trap keyboard focus or
  break tab order when they visually "stick" during scroll
- Connect % badges: percentage text is the primary always-legible signal,
  color is reinforcement only (per the Functional Spec's own accessibility
  note on this exact component)
- Table: proper <table>/<thead>/<tbody> semantics even with the grouped/
  subtotal-row structure — use a <tbody> per manager group with the
  subtotal as a distinctly-styled row inside it, not a separate table

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): KPI row drops to 2 columns; manager filter chips
  become horizontally scrollable; table scrolls horizontally with the
  Executive/Manager name column pinned (sticky left column) so identity
  stays visible while scrolling through the numeric columns.
Mobile (<768px): KPI row stacks to 1 column; grouped executive table
  becomes a stacked card per manager (manager name + subtotal as the card
  header, each executive as a row inside the card) rather than a
  horizontally-scrolling table.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Executives⇄Managers toggle swaps the table content and hides/shows
     the manager filter chip row correctly
  ✅ Manager filter chips are multi-select; toggling one on/off updates
     which manager groups render in the Executives-view table
  ✅ "All" chip clears every individual manager selection
  ✅ Manager subtotal rows show correct aggregated Made/Received/Not
     Picked/Not Interested and a correctly-computed Connect %
  ✅ Manager subtotal rows are visually bolder/shaded vs. executive rows
     and stay sticky while scrolling that manager's block
  ✅ Connect % badges render the correct tier color at the same
     thresholds used in Mapping (Step 2) — no divergence
  ✅ "Not Picked" and "Not Interested" KPI deltas use the inverted
     green/red logic (negative = green) and this is verified visually
  ✅ KPI numerals count up on mount, same animation as Dashboard/Mapping
  ✅ Empty states render the correct, source-accurate copy for both views
  ✅ Global period filter (Step 1 shell) is still visibly present and
     understood to govern this screen's numbers

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for titles/KPI numerals; Inter for everything else
✅ Page background #F4F5F7, inherited from the Step 1 shell — do not
   redeclare
✅ Primary/brand color #17181C only — active toggle pill, active manager
   chips (solid black fill), KPI icon squares
✅ Connect % 3-tier thresholds/colors are IDENTICAL to Mapping's coverage
   badge from Step 2 (≥50 green / 25-49 orange / <25 red) — this is now
   a reusable pattern across the whole app, not a one-off
✅ Tables: transparent header, bottom-border-only rows, no zebra striping
   — the manager subtotal row is the ONE deliberate exception, using a
   light shaded background specifically to separate it from executive rows
✅ Cards: 18px radius, elevation-1
✅ No left-accent-bar KPI cards, no blue/indigo, no per-module rainbow
✅ All toasts role="alert" (Export button still shows the Step 1 "coming
   in Step 10" toast — do not rebuild export logic here)

=============================================================
BUILD ORDER
=============================================================

1. Add callExecutives, callManagers, callsKpis mock data
2. Add callsView, selectedManagerIds state + toggleManagerFilter(),
   groupedExecutiveRows, and connectTier()
3. Build the KPI row (reusing the exact card anatomy from Dashboard/Mapping)
4. Build the Executives⇄Managers toggle + manager filter chip row
5. Build the grouped Executives-view table with sticky manager subtotal rows
6. Build the flat Managers-view table
7. Wire the toggle to swap table content and the chips to filter groups
8. Wire Connect % badges via connectTier() in both views
9. Build both views' empty states with the exact copy specified above
10. Verify KPI count-up animation and the delta color-inversion on Not
    Picked / Not Interested
11. Verify accessibility attributes and responsive behavior from the
    sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, Dashboard, or Mapping from Steps 1-2.
DO NOT create a local period filter — read globalPeriod/globalDateRange
  from the shell.
DO NOT change the Connect %/coverage 3-tier thresholds or colors — they
  must stay identical to Mapping's and to every future reuse of this
  pattern (Team rankings in Step 4 will reuse it again).
DO NOT make manager filter chips available in the Managers view — that
  filter is Executives-view-only, matching the real product's documented
  behavior.
DO NOT wire a real Export flow — the Step 1 shell's "coming in Step 10"
  toast already covers this screen.