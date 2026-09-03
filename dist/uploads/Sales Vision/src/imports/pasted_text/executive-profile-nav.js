=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
Board, or Lead Detail from Steps 1-6. This step ADDS the Executive Profile
screen AND makes two small, deliberate edits to earlier steps (detailed
below) to wire real navigation into placeholders that were left as toasts.
Everything else must remain intact.
Reminder of the locked palette: primary/brand #17181C, chart/positive
green #4CAF50, negative red #F5365C, neutral slate #8392AB.

=============================================================
STEP 7 — EXECUTIVE PROFILE
=============================================================

Build the real 'executive-profile' screen: a full individual performance
history for one executive, drilled into from any table row across
Dashboard, Calls, or Team that shows an executive's name. This is the
"asymmetry fix" flagged back in the Design System doc — the app already
lets you drill into a lead, but never into a person, until now.

> **Two small edits to earlier steps, required for this screen to be reachable:**
>
> 1. **Introduce a generic `goBack()` helper and use it for Lead Detail's
>    breadcrumb too.** Step 6's Lead Detail breadcrumb was hardcoded to
>    always say "← Leads Board" because it only had one entry point at the
>    time. Now that leads can ALSO be reached from an Executive Profile's
>    assigned-leads list (built in this step), Lead Detail needs to go back
>    to wherever the person actually came from. Add:
>    ```js
>    function goBack() {
>      setNavHistory(prev => {
>        if (prev.length <= 1) return prev;
>        const newHistory = prev.slice(0, -1);
>        setScreen(newHistory[newHistory.length - 1]);
>        return newHistory;
>      });
>    }
>    function screenTitle(screenId) {
>      const titles = { dashboard: 'Dashboard', mapping: 'Mapping', calls: 'Calls',
>        team: 'Team', leads: 'Leads Board', 'executive-profile': 'Executive Profile',
>        organization: 'Organization', reports: 'Reports', settings: 'Settings' };
>      return titles[screenId] || 'Dashboard';
>    }
>    ```
>    Then update Lead Detail's breadcrumb link text from the hardcoded
>    "← Leads Board" to `"← Back to " + screenTitle(navHistory[navHistory.length - 2])`,
>    and its onClick from `navigateTo('leads')` to `goBack()`. This is the
>    ONLY change to Step 6 — do not touch anything else on that screen.
>
> 2. **Replace three placeholder toasts with real navigation.** Dashboard's
>    performance table (Step 1), Calls' executive table (Step 3), and
>    Team's ranking table (Step 4) all currently fire a toast
>    ("Executive Profile screen coming in Step 7") on row click. Replace
>    each of those three onClick handlers with a call to
>    `navigateToExecutive(executiveId)` (defined below) instead of the
>    toast. Do not change anything else about those three tables.

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

// Identity fields not captured anywhere yet (email/phone/joined date) —
// same EXE-xxx ids and names used consistently since Step 1, so this is
// an extension of an existing identity, not a new roster.

const executiveDirectory = [
  { id: "EXE-001", name: "Aarav Shah", initials: "AS", email: "aarav.shah@salesvisionai.com",
    phone: "+91 98765 22011", managerId: "MGR-001", managerName: "Rahul Verma",
    department: "Enterprise Sales", joinedDate: "Feb 12, 2025" },
  { id: "EXE-002", name: "Diya Mehta", initials: "DM", email: "diya.mehta@salesvisionai.com",
    phone: "+91 98765 22012", managerId: "MGR-002", managerName: "Anita Desai",
    department: "SMB Sales", joinedDate: "Apr 3, 2025" },
  { id: "EXE-003", name: "Rohan Gupta", initials: "RG", email: "rohan.gupta@salesvisionai.com",
    phone: "+91 98765 22013", managerId: "MGR-001", managerName: "Rahul Verma",
    department: "Enterprise Sales", joinedDate: "Jun 20, 2025" },
  { id: "EXE-004", name: "Kavya Iyer", initials: "KI", email: "kavya.iyer@salesvisionai.com",
    phone: "+91 98765 22014", managerId: "MGR-004", managerName: "Meera Singh",
    department: "Strategic Accounts", joinedDate: "Jan 8, 2025" },
  { id: "EXE-005", name: "Ishaan Bose", initials: "IB", email: "ishaan.bose@salesvisionai.com",
    phone: "+91 98765 22015", managerId: "MGR-005", managerName: "Arjun Nair",
    department: "SMB Sales", joinedDate: "May 15, 2025" },
  { id: "EXE-006", name: "Priya Nambiar", initials: "PN", email: "priya.nambiar@salesvisionai.com",
    phone: "+91 98765 22016", managerId: "MGR-002", managerName: "Anita Desai",
    department: "SMB Sales", joinedDate: "Mar 1, 2025" },
  { id: "EXE-007", name: "Meher Chopra", initials: "MC", email: "meher.chopra@salesvisionai.com",
    phone: "+91 98765 22017", managerId: "MGR-003", managerName: "Kiran Patel",
    department: "Enterprise Sales", joinedDate: "Jul 22, 2025" }
];

// Pulls together everything already established about one executive
// across teamExecutives (Step 4), callExecutives (Step 3), and leadsList
// (Step 5) into one profile object — this is a READ/merge function, it
// does not duplicate or redeclare any of those arrays.
function getExecutiveProfile(executiveId) {
  const identity = executiveDirectory.find(e => e.id === executiveId);
  const performance = teamExecutives.find(e => e.id === executiveId);
  const callBreakdown = callExecutives.find(e => e.id === executiveId);
  const assignedLeads = leadsList.filter(l => l.assignedExecutive === identity?.name);
  return { identity, performance, callBreakdown, assignedLeads };
}

=============================================================
STATE — ADD TO STATE SECTION
=============================================================

const [selectedExecutiveId, setSelectedExecutiveId] = useState(null);

function navigateToExecutive(executiveId) {
  setSelectedExecutiveId(executiveId);
  navigateTo('executive-profile');
}

// goBack() and screenTitle() as shown in the callout above — add these
// once, reuse for both Lead Detail's and this screen's breadcrumb.

=============================================================
SCREEN — EXECUTIVE PROFILE
=============================================================

screen: 'executive-profile'
animation: screenEnter 280ms ease-out both

const profile = getExecutiveProfile(selectedExecutiveId);

Guard: if profile.identity is undefined, render a simple "← Back" fallback
  (calling goBack()) and stop — don't crash.

── BREADCRUMB (flexShrink 0, marginBottom 16px) ──

"← Back to {screenTitle(navHistory[navHistory.length - 2])}" (Inter 13px
  weight 600 #67748E, hover #1A1A1A, cursor pointer, onClick: goBack())
  + " / " (muted) + "{profile.identity.name}" (Inter 13px weight 600 #1A1A1A)

── PROFILE HEADER CARD (flexShrink 0, bg white, radius 18px, elevation-1, padding 20px, marginBottom 16px) ──

display: flex, justifyContent space-between, alignItems center

LEFT (display flex, gap 16px, alignItems center):
  Avatar: 64px circle, bg #17181C, white initials, Poppins 20px weight 700
  Content:
    Name (Poppins 20px weight 700 #1A1A1A) + "Executive" role tag beside
      it (Inter 12px #8392AB, e.g. "Executive · {department}")
    Meta row (marginTop 6px, display flex, gap 20px, Inter 13px #67748E):
      "Manager: {managerName}"
      "Email: {email}"
      "Phone: {phone}"
      "Joined: {joinedDate}"

RIGHT: overall Connect % badge — same connectTier() component reused
  from Steps 2-3-4, larger size here (Inter 16px weight 700, padding
  '8px 16px', radius 8px), showing "{callBreakdown.connectPct}% Connect Rate"

── KPI ROW (display grid, grid-template-columns: repeat(4, 1fr), gap 16px, marginBottom 16px) ──

Same exact KPI card anatomy as every other screen — label+value+delta
left, 44px black icon square right (delta values here can reuse a fixed
placeholder like "vs. team avg" comparison instead of period-over-period,
since this is an individual's page, not a company aggregate):

  "Calls Made" — {profile.performance.callsMade}, phone icon
  "Connect Rate" — "{profile.callBreakdown.connectPct}%", checkmark icon
  "Hot Leads" — {profile.performance.hotLeads}, flame icon
  "Warm Leads" — {profile.performance.warmLeads}, inbox icon

  (These 4 don't need a delta/trend line if no sensible comparison value
  exists yet — omit the delta line rather than fabricate one; the card
  anatomy still works with just label+value+icon-square)

── CHART ROW (display grid, grid-template-columns: 1fr 1.4fr, gap 16px, marginBottom 16px) ──

CALL OUTCOME BREAKDOWN CARD (min-height 280px, bg white, radius 18px,
  elevation-1, padding 20px):
  Title "Call Outcome Breakdown" (Poppins 14px weight 600 #1A1A1A)
  Donut or single stacked bar (pick whichever reads more clearly at this
    card size — a donut is recommended): Received (#4CAF50 green), Not
    Picked (#8392AB slate), Not Interested (#F5365C red), built from
    profile.callBreakdown's received/notPicked/notInterested values
  Legend below with each slice's color + label + absolute count

TREND CARD — 7-DAY CALL VOLUME (min-height 280px, bg white, radius 18px,
  elevation-1, padding 20px):
  Title "Call Volume Trend" (Poppins 14px weight 600 #1A1A1A)
  Subtitle "Last 7 days" (Inter 12.5px #8392AB)
  Full-size line chart (not a mini-sparkline this time — this is the
    enlarged version of the same dailyTrend data used as a sparkline on
    Team's ranking table in Step 4), single #4CAF50 green line/area
  Same dark tooltip pattern as every other chart in the app: dark box,
    green swatch, day label + "Calls: {value}"

── ASSIGNED LEADS TABLE (bg white, radius 18px, elevation-1) ──

HEADER (52px, padding '0 20px', borderBottom 1px solid #F0F0F0):
  "Assigned Leads" title (Poppins 14px weight 600 #1A1A1A) + count beside
    it (Inter 13px #8392AB, "{profile.assignedLeads.length} leads")

TABLE — transparent header, bottom-border-only rows, same style as every
  other table in the app:
  Columns: Company | Industry | Temperature | Stage | Last Call

  Temperature cell: same badge component as the Leads Board (Step 5) —
    temperatureColor() reused exactly, Hot red / Warm orange / Cold grey

  Row click: onClick navigates to the Lead Detail screen for that lead —
    reuse navigateToLead(lead.id) from Step 5 exactly (sets
    selectedLeadId, navigates to 'leads-detail') — this is the first time
    Lead Detail is reached from somewhere OTHER than the Leads Board,
    which is exactly why goBack() was introduced above instead of a
    hardcoded breadcrumb target

  Empty state (profile.assignedLeads.length === 0): centered icon + "No
    leads currently assigned to {profile.identity.name}"

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Breadcrumb: real focusable link/button, same pattern as Lead Detail
- Profile header: name is the page's <h1>-equivalent heading
- KPI cards without a delta line: don't leave an empty visually-broken
  gap — the card's layout should look intentional whether or not a delta
  line is present, not like a missing piece
- Assigned leads table rows: keyboard-operable (Enter/Space triggers the
  same row-click navigation), not mouse-only
- Donut/chart legend: color paired with text label, as everywhere else
- goBack()/screenTitle(): ensure the computed breadcrumb label is always
  a real word ("Dashboard," "Calls," "Team") never a raw screen id string
  like "executive-profile" leaking into the UI

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): chart row stacks to 1 column; KPI row drops to 2 columns.
Mobile (<768px): profile header stacks (avatar+name row, then meta row,
  then connect-rate badge below rather than right-aligned); KPI row
  stacks to 1 column; assigned leads table becomes a stacked card list.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Clicking an executive row on Dashboard's performance table navigates
     here with the correct executive's data (no more toast)
  ✅ Clicking an executive row on Calls' grouped table navigates here
     correctly (no more toast)
  ✅ Clicking an executive row on Team's ranking table navigates here
     correctly (no more toast)
  ✅ Breadcrumb "← Back to {X}" correctly reflects whichever screen you
     actually came from, and goBack() returns you there
  ✅ Profile header shows correct name/manager/email/phone/joined-date
     for the selected executive
  ✅ KPI row, call outcome donut, and trend chart all populate from the
     correct merged data via getExecutiveProfile()
  ✅ Assigned leads table shows only leads where assignedExecutive
     matches this executive's name
  ✅ Clicking an assigned lead row navigates to Lead Detail (Step 6) for
     that lead, and Lead Detail's breadcrumb now correctly says "← Back
     to Executive Profile" instead of the old hardcoded "← Leads Board"
  ✅ From that Lead Detail screen, goBack() correctly returns to THIS
     Executive Profile (not to the Leads Board) — this is the key
     regression test for the goBack()/screenTitle() refactor
  ✅ Guard case: undefined selectedExecutiveId doesn't crash the screen

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for the executive's name/section titles; Inter for everything else
✅ Page background #F4F5F7, inherited from the shell — do not redeclare
✅ Primary/brand color #17181C — avatar circle, KPI icon squares
✅ Call outcome colors LOCKED and reused from every prior screen:
   Received/Accepted green #4CAF50, Not Picked slate #8392AB, Not
   Interested red #F5365C
✅ Temperature badge colors LOCKED: Hot red, Warm orange, Cold grey — never blue
✅ Connect % badge reuses connectTier() exactly, same thresholds as
   Steps 2-3-4, no new variant
✅ Cards: 18px radius, elevation-1
✅ Trend chart is #4CAF50 green with the same dark tooltip pattern used
   everywhere else — this is not a new chart style, it's the existing
   one at a larger size
✅ All toasts role="alert" (this screen fires none of its own — the
   three toasts it REPLACES are the point of this step)

=============================================================
BUILD ORDER
=============================================================

1. Add executiveDirectory mock data and getExecutiveProfile()
2. Add selectedExecutiveId state, navigateToExecutive(), goBack(),
   screenTitle()
3. Update Lead Detail's (Step 6) breadcrumb to use goBack()/screenTitle()
   instead of the hardcoded "← Leads Board" — verify this doesn't break
   the original Leads-Board-to-Lead-Detail flow
4. Replace the three placeholder toasts (Dashboard, Calls, Team executive
   rows) with navigateToExecutive() calls
5. Build the breadcrumb for Executive Profile
6. Build the profile header card (avatar, identity, connect-rate badge)
7. Build the KPI row (reusing the exact shared card anatomy)
8. Build the call outcome breakdown donut/bar
9. Build the 7-day trend chart (enlarged version of Team's sparkline data)
10. Build the assigned leads table, wiring row clicks to navigateToLead()
11. Test the full round-trip: Team row → Executive Profile → assigned
    lead row → Lead Detail → goBack() → back to Executive Profile →
    goBack() → back to Team. Repeat starting from Dashboard and from
    Calls to confirm all three origins work.
12. Verify accessibility attributes and responsive behavior from the
    sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
  Board, or Lead Detail beyond the two specific, narrow edits called out
  at the top of this prompt (Lead Detail's breadcrumb, and the three
  executive-row onClick handlers).
DO NOT introduce a new chart style, color, or card anatomy for this
  screen — everything here is a reuse of components already established
  in Steps 1-6.
DO NOT fabricate a period-over-period delta for KPIs where no sensible
  comparison exists — omit the delta line rather than invent a number.