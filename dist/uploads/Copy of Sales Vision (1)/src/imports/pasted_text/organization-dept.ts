=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
Board, Lead Detail, or Executive Profile from Steps 1-7. Only ADD the
Department List and Department Detail screens. All existing screens,
state, and shell behavior must remain intact.
Reminder of the locked palette: primary/brand #17181C, positive green
#4CAF50, negative red #F5365C, neutral slate #8392AB.

=============================================================
STEP 8 — ORGANIZATION: DEPARTMENT LIST + DEPARTMENT DETAIL
=============================================================

Replace the 'organization' placeholder with the Department List screen,
and build the 'organization-department' drill-down screen it leads to.
This is the first half of the Organization module — Team Detail and the
Department Builder / Create Manager modals are Step 9, not this step.

> **Reconciliation reminder from the Design System doc (§2):** browsing
> this module is available to every Director regardless of access level.
> CREATING a department is gated behind a `canManageOrg` capability —
> only enterprise-access Directors get the "+ Create Department" button
> this step; it stays invisible for scoped Directors. This is why you'll
> extend the existing `director` mock object with one new field below,
> rather than build a separate permissions screen.

=============================================================
MOCK DATA — EXTEND THE EXISTING director OBJECT FROM STEP 1
=============================================================

Add one field to the existing director object (do not redeclare it):

  canManageOrg: true   // enterprise-access Directors can create org structure;
                        // scoped Directors would have this as false

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

const departments = [
  { id: "DEPT-001", name: "Enterprise Sales", teamCount: 2, managerCount: 2,
    executiveCount: 10, totalCalls: 1500, totalConversions: 84 },
  { id: "DEPT-002", name: "SMB Sales", teamCount: 2, managerCount: 2,
    executiveCount: 8, totalCalls: 1155, totalConversions: 61 },
  { id: "DEPT-003", name: "Strategic Accounts", teamCount: 1, managerCount: 1,
    executiveCount: 5, totalCalls: 902, totalConversions: 47 }
];

const teamsByDepartment = {
  "DEPT-001": [
    { id: "TEAM-001", name: "Enterprise Team A", managerName: "Rahul Verma",
      mappingUploaded: 412, callsDone: 980, followUpsMeetings: 62, conversions: 48,
      executiveCount: 6 },
    { id: "TEAM-002", name: "Enterprise Team B", managerName: "Kiran Patel",
      mappingUploaded: 205, callsDone: 520, followUpsMeetings: 31, conversions: 36,
      executiveCount: 4 }
  ],
  "DEPT-002": [
    { id: "TEAM-003", name: "SMB Team A", managerName: "Anita Desai",
      mappingUploaded: 275, callsDone: 845, followUpsMeetings: 54, conversions: 39,
      executiveCount: 5 },
    { id: "TEAM-004", name: "SMB Team B", managerName: "Arjun Nair",
      mappingUploaded: 120, callsDone: 310, followUpsMeetings: 18, conversions: 22,
      executiveCount: 3 }
  ],
  "DEPT-003": [
    { id: "TEAM-005", name: "Strategic Accounts Team", managerName: "Meera Singh",
      mappingUploaded: 265, callsDone: 902, followUpsMeetings: 58, conversions: 47,
      executiveCount: 5 }
  ]
};

=============================================================
STATE — ADD TO STATE SECTION
=============================================================

const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
const [selectedTeamId, setSelectedTeamId] = useState(null);

function navigateToDepartment(departmentId) {
  setSelectedDepartmentId(departmentId);
  navigateTo('organization-department');
}

function navigateToTeam(teamId) {
  setSelectedTeamId(teamId);
  navigateTo('organization-team'); // still a placeholder until Step 9
}

=============================================================
SHELL UPDATE — TEAM-AWARE PLACEHOLDER (same pattern as Step 5's lead-aware placeholder)
=============================================================

Update the generic placeholder logic so that when screen ===
'organization-team' AND selectedTeamId is set, it shows a team-aware
message instead of the fully generic one:

  Find the team across all of teamsByDepartment's arrays by id.
  "← Back to {department name}" link (onClick: goBack())
  "{team.name} — Team Detail coming in Step 9" (Poppins 16px weight 600 #1A1A1A)

=============================================================
SCREEN — DEPARTMENT LIST ('organization')
=============================================================

screen: 'organization'
animation: screenEnter 280ms ease-out both

── HEADER ROW (flexShrink 0, marginBottom 16px, display flex, justifyContent space-between, alignItems center) ──

LEFT: (page title "Organization" already handled by the shared top bar)
  subtitle beneath it if you want one: "Browse departments, teams, and
  managers" (Inter 13px #8392AB) — optional, can also live inline here
  instead of the top bar if that's cleaner in your implementation

RIGHT: "+ Create Department" button — ONLY rendered when
  director.canManageOrg === true. bg #17181C, white text, Inter 14px
  weight 600, height 44px, radius 8px, "+" icon + "Create Department"
  onClick: fires a toast "Department Builder coming in Step 9" (this
  button exists and is visible now, per the reconciliation, but its real
  modal is Step 9's job)

── DEPARTMENT CARD GRID (display grid, grid-template-columns: repeat(3, 1fr), gap 16px) ──

Each card (bg white, radius 18px, elevation-1, padding 20px, cursor
  pointer, transition all 0.15s, hover: translateY(-2px) + elevation-2):

  TOP: icon circle (44px, bg #17181C, white "business/building" Icons8
    Material Outlined icon, radius 14px — reusing the same icon-square
    treatment as KPI cards, just circular here for a card-level icon) +
    department name (Poppins 16px weight 600 #1A1A1A) beside it +
    "{teamCount} teams" (Inter 12.5px #8392AB) beneath the name

  DIVIDER (1px, bg #F0F0F0, marginY 14px)

  2x2 STAT GRID (display grid, grid-template-columns: 1fr 1fr, gap 12px):
    Each cell: label (Inter 11px uppercase #8392AB) over value (Poppins
      18px weight 700 #1A1A1A)
    "Managers" — {managerCount}
    "Executives" — {executiveCount}
    "Total Calls" — {totalCalls}
    "Conversions" — {totalConversions}

  onClick: navigateToDepartment(department.id)

  Empty state (departments.length === 0 — not expected with this mock
  data, but code defensively): centered icon + "No departments yet" +
  (if director.canManageOrg) a "+ Create Department" button in the empty
  state itself, same toast behavior as above

=============================================================
SCREEN — DEPARTMENT DETAIL ('organization-department')
=============================================================

screen: 'organization-department'
animation: screenEnter 280ms ease-out both

const currentDepartment = departments.find(d => d.id === selectedDepartmentId);
const currentTeams = teamsByDepartment[selectedDepartmentId] || [];

Guard: if currentDepartment is undefined, show a simple "← Back" fallback
  (goBack()) and stop.

── BREADCRUMB (flexShrink 0, marginBottom 16px) ──

"← Back to Organization" (Inter 13px weight 600 #67748E, hover #1A1A1A,
  onClick: goBack()) + " / " (muted) + "{currentDepartment.name}" (Inter
  13px weight 600 #1A1A1A)

── DEPARTMENT SUMMARY KPI ROW (display grid, grid-template-columns: repeat(4, 1fr), gap 16px, marginBottom 16px) ──

This is an enhancement over the base spec — reusing the exact KPI card
anatomy from every other screen (label+value left, black icon square
right) so this drill-down screen still feels like a sibling of Dashboard/
Mapping/Calls, not a bare list of cards with no summary context:

  "Teams" — {currentDepartment.teamCount}, layers icon
  "Managers" — {currentDepartment.managerCount}, person icon
  "Executives" — {currentDepartment.executiveCount}, people icon
  "Total Conversions" — {currentDepartment.totalConversions}, trophy/check icon

── TEAM CARD GRID (display grid, grid-template-columns: repeat(3, 1fr), gap 16px) ──

Section title above the grid: "Teams in {currentDepartment.name}"
  (Poppins 16px weight 600 #1A1A1A), marginBottom 12px

Each team card (bg white, radius 18px, elevation-1, padding 20px, cursor
  pointer, hover: translateY(-2px) + elevation-2):

  TOP: icon circle (36px, bg #17181C, white "group/team" icon) + team
    name (Poppins 15px weight 600 #1A1A1A) + "Manager: {managerName}"
    (Inter 12.5px #8392AB) beneath it

  DIVIDER (1px, bg #F0F0F0, marginY 12px)

  4 METRIC ROWS (display flex, flexDirection column, gap 8px):
    Each row: label (Inter 12.5px #8392AB) + value (Inter 13px weight 600
      #1A1A1A), space-between
    "Mapping Uploaded" — {mappingUploaded}
    "Calls Done" — {callsDone}
    "Follow-ups / Meetings" — {followUpsMeetings}
    "Conversions" — {conversions}

  FOOTER ROW (marginTop 14px, display flex, justifyContent space-between,
    alignItems center, paddingTop 12px, borderTop 1px solid #F0F0F0):
    "{executiveCount} executives" (Inter 12px #8392AB)
    "View Activity →" (Inter 13px weight 600 #1A1A1A, hover underline) —
      this is the click target label, but the WHOLE card is clickable,
      matching the pattern established on Lead cards (Step 5)

  onClick: navigateToTeam(team.id)

  Empty state (currentTeams.length === 0): centered icon + "No teams in
    this department yet"

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Department and team cards: real <button> or role="button" + tabIndex=0
  + Enter/Space triggers the same onClick as a mouse click — this is the
  third screen in a row establishing this pattern (Lead cards, Manager
  cards on Team, now these), keep it consistent
- "+ Create Department" button: when hidden due to canManageOrg === false,
  it must be entirely absent from the DOM (not just visually hidden),
  so it isn't reachable by keyboard/screen reader for a Director who
  shouldn't see it
- Breadcrumbs: real focusable links, same pattern as Lead Detail and
  Executive Profile
- Department Summary KPI row: same accessibility treatment as every
  other KPI row in the app (no new requirements, just consistency)

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): both card grids (departments, teams) drop from 3 to
  2 columns; Department Summary KPI row drops to 2 columns.
Mobile (<768px): both card grids become single column; KPI row stacks
  to 1 column; "+ Create Department" button becomes full-width below the
  page title instead of top-right.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ "+ Create Department" only renders when director.canManageOrg is true
  ✅ Clicking it fires the "coming in Step 9" toast, no modal opens yet
  ✅ Clicking a department card navigates to Department Detail with the
     CORRECT department's data
  ✅ Department Detail's breadcrumb "← Back to Organization" returns
     correctly via goBack()
  ✅ Department Summary KPI row shows the correct department's numbers
  ✅ Team card grid shows only the teams belonging to the current
     department (via teamsByDepartment lookup)
  ✅ Clicking a team card sets selectedTeamId and navigates to
     'organization-team', which now shows the team-aware placeholder
     with the correct team name and a working "← Back to {department}" link
  ✅ Guard cases: undefined selectedDepartmentId doesn't crash Department
     Detail; empty currentTeams shows the correct empty state

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for card/section titles and KPI numerals; Inter for everything else
✅ Page background #F4F5F7, inherited from the shell — do not redeclare
✅ Primary/brand color #17181C — icon circles, "+ Create Department" button
✅ Cards: 18px radius, elevation-1 default, elevation-2 + translateY(-2px)
   on hover — every card in this module is clickable, so every card gets
   the hover treatment
✅ KPI cards (Department Summary row) use the EXACT SAME anatomy as
   Dashboard/Mapping/Calls/Executive Profile — label+value left, black
   icon square right, no new variant
✅ Capability gating (canManageOrg) hides the create button from the DOM
   entirely when false, not just via CSS
✅ Reuse goBack() from Step 7 for all breadcrumb back-navigation — do not
   hardcode a fixed target screen
✅ All toasts role="alert"

=============================================================
BUILD ORDER
=============================================================

1. Add canManageOrg: true to the existing director object
2. Add departments, teamsByDepartment mock data
3. Add selectedDepartmentId, selectedTeamId state + navigateToDepartment(),
   navigateToTeam()
4. Update the shell's placeholder logic to special-case
   'organization-team' with the team-aware message + back link
5. Build the Department List screen: header row with gated "+ Create
   Department" button, department card grid with 2x2 stat grids
6. Build the Department Detail screen: breadcrumb, Department Summary KPI
   row, team card grid
7. Wire department card clicks → navigateToDepartment(); team card
   clicks → navigateToTeam()
8. Test the full path: Organization → click a department → Department
   Detail (correct data) → click a team → placeholder shows the correct
   team name → back link returns to the correct department
9. Verify accessibility attributes and responsive behavior from the
   sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
  Board, Lead Detail, or Executive Profile from Steps 1-7.
DO NOT build Team Detail's real content or the Department Builder /
  Create Manager modals — those are Step 9. This step only wires the
  navigation and a team-aware placeholder toward them.
DO NOT show the "+ Create Department" button for a Director whose
  canManageOrg is false — verify this by testing with the flag flipped.
DO NOT hardcode breadcrumb back-targets — use goBack() consistently, as
  established in Step 7.