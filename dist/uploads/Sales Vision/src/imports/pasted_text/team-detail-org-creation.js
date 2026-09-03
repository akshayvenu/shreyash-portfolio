=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
Board, Lead Detail, Executive Profile, or the Department List/Detail
screens from Steps 1-8. This step ADDS Team Detail's real content, the
Department Builder modal, and its nested Create Manager modal — plus one
required, narrow edit to Step 8's data declarations (below). Everything
else must remain intact.
Reminder of the locked palette: primary/brand #17181C, positive green
#4CAF50, negative red #F5365C, neutral slate #8392AB, warning orange #FB6340.

=============================================================
STEP 9 — TEAM DETAIL + ORG CREATION MODALS
=============================================================

Three deliverables in this step, in this order:
1. Real content for the 'organization-team' screen (replacing the
   team-aware placeholder from Step 8)
2. The Department Builder modal (create a department + its teams,
   assigning an existing or brand-new manager to each)
3. The nested Create Manager modal (opened from inside the Department
   Builder, without losing the builder's in-progress state)

> **Required edit to Step 8: promote `departments` and `teamsByDepartment`
> to state.** They were declared as plain `const` arrays/objects in Step 8
> because nothing needed to mutate them yet. The Department Builder in
> this step needs to append new departments and teams, so:
> ```js
> const [departments, setDepartments] = useState([ /* same 3 entries from Step 8, unchanged */ ]);
> const [teamsByDepartment, setTeamsByDepartment] = useState({ /* same object from Step 8, unchanged */ });
> ```
> This is the ONLY change to Step 8 — same data, same shape, just now
> mutable. Do not alter any Step 8 screen logic beyond this declaration change.

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

// Per-team executive performance, reusing the SAME executives already
// established in executiveDirectory (Step 7) under the correct managers —
// no new people invented, just their team-level performance numbers.

const teamExecutivesByTeam = {
  "TEAM-001": [ // Enterprise Team A — Rahul Verma
    { id: "EXE-001", name: "Aarav Shah", initials: "AS", mapping: 210, callsDone: 312, followUps: 18, meetings: 6, conversions: 22 },
    { id: "EXE-003", name: "Rohan Gupta", initials: "RG", mapping: 202, callsDone: 201, followUps: 11, meetings: 3, conversions: 14 }
  ],
  "TEAM-002": [ // Enterprise Team B — Kiran Patel
    { id: "EXE-007", name: "Meher Chopra", initials: "MC", mapping: 205, callsDone: 165, followUps: 9, meetings: 2, conversions: 9 }
  ],
  "TEAM-003": [ // SMB Team A — Anita Desai
    { id: "EXE-002", name: "Diya Mehta", initials: "DM", mapping: 140, callsDone: 288, followUps: 16, meetings: 5, conversions: 19 },
    { id: "EXE-006", name: "Priya Nambiar", initials: "PN", mapping: 135, callsDone: 274, followUps: 15, meetings: 5, conversions: 20 }
  ],
  "TEAM-004": [ // SMB Team B — Arjun Nair
    { id: "EXE-005", name: "Ishaan Bose", initials: "IB", mapping: 120, callsDone: 142, followUps: 7, meetings: 1, conversions: 8 }
  ],
  "TEAM-005": [ // Strategic Accounts Team — Meera Singh
    { id: "EXE-004", name: "Kavya Iyer", initials: "KI", mapping: 265, callsDone: 356, followUps: 20, meetings: 7, conversions: 24 }
  ]
  // Any NEWLY CREATED team (via the Department Builder below) intentionally
  // has NO entry here — this is what naturally produces the "team with
  // zero executives" edge case the Functional Spec calls out, without
  // artificially forcing it onto an existing team.
};

const teamActivityByTeam = {
  "TEAM-001": [
    { color: "#4CAF50", text: "Aarav Shah closed a Hot lead — Vantage Financial Corp", time: "2h ago" },
    { color: "#8392AB", text: "Rohan Gupta logged 14 calls today", time: "5h ago" },
    { color: "#4CAF50", text: "Meeting completed with Zenith Capital Partners", time: "Yesterday" },
    { color: "#FB6340", text: "Mapping coverage dropped below 55% for BFSI", time: "2 days ago" }
  ],
  "TEAM-003": [
    { color: "#4CAF50", text: "Diya Mehta scheduled a demo with Corewave IT Solutions", time: "3h ago" },
    { color: "#8392AB", text: "Priya Nambiar logged 21 calls today", time: "6h ago" },
    { color: "#4CAF50", text: "New lead marked Warm — Aster Wellness Clinics", time: "Yesterday" },
    { color: "#F5365C", text: "Coastal Retail Group marked Not Interested", time: "3 days ago" }
  ]
  // TEAM-002/004/005 and any new team fall back to an empty activity state
  // — see the screen spec below. Do NOT fabricate placeholder text like
  // "Executive did something" the way the original product's fallback
  // did; render the proper empty state instead.
};

// Shared manager pool that the Department Builder's dropdown reads from
// and appends to — separate from each analytics screen's own mock arrays
// (Dashboard/Calls/Team), since those are independent per-screen datasets
// already established; this pool exists specifically to make the Org
// module's manager-assignment dropdown and new-manager creation work.
const initialOrgManagers = [
  { id: "MGR-001", name: "Rahul Verma", email: "rahul.verma@salesvisionai.com" },
  { id: "MGR-002", name: "Anita Desai", email: "anita.desai@salesvisionai.com" },
  { id: "MGR-003", name: "Kiran Patel", email: "kiran.patel@salesvisionai.com" },
  { id: "MGR-004", name: "Meera Singh", email: "meera.singh@salesvisionai.com" },
  { id: "MGR-005", name: "Arjun Nair", email: "arjun.nair@salesvisionai.com" }
];

function generateId(prefix, existingItems) {
  return `${prefix}-${String(existingItems.length + 1).padStart(3, '0')}`;
}

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let pw = "";
  for (let i = 0; i < 12; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw;
}

=============================================================
STATE — ADD TO STATE SECTION
=============================================================

const [orgManagers, setOrgManagers] = useState(initialOrgManagers);

// Department Builder modal state
const [showDepartmentBuilder, setShowDepartmentBuilder] = useState(false);
const [builderDepartmentName, setBuilderDepartmentName] = useState('');
const [builderTeamRows, setBuilderTeamRows] = useState([
  { rowId: 1, name: '', managerId: '' }
]);
const [builderError, setBuilderError] = useState('');
const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

// Nested Create Manager modal state
const [showCreateManagerModal, setShowCreateManagerModal] = useState(false);
const [creatingForRowId, setCreatingForRowId] = useState(null);
const [newManagerForm, setNewManagerForm] = useState({ name: '', email: '', password: '' });
const [newManagerErrors, setNewManagerErrors] = useState({});
const [showManagerPassword, setShowManagerPassword] = useState(false);

function isDepartmentBuilderDirty() {
  return builderDepartmentName.trim() !== '' ||
    builderTeamRows.some(r => r.name.trim() !== '' || r.managerId !== '');
}

function resetDepartmentBuilder() {
  setBuilderDepartmentName('');
  setBuilderTeamRows([{ rowId: 1, name: '', managerId: '' }]);
  setBuilderError('');
}

function handleCloseDepartmentBuilder() {
  if (isDepartmentBuilderDirty()) {
    setShowDiscardConfirm(true); // confirm before discarding — fixes the
                                  // gap flagged in the Design System doc
  } else {
    setShowDepartmentBuilder(false);
  }
}

=============================================================
SCREEN — TEAM DETAIL ('organization-team')
=============================================================

screen: 'organization-team'
animation: screenEnter 280ms ease-out both

const currentTeam = Object.values(teamsByDepartment).flat().find(t => t.id === selectedTeamId);
const currentTeamExecutives = teamExecutivesByTeam[selectedTeamId] || [];
const currentTeamActivity = teamActivityByTeam[selectedTeamId] || [];
// find the parent department for the breadcrumb:
const parentDepartment = departments.find(d =>
  (teamsByDepartment[d.id] || []).some(t => t.id === selectedTeamId));

Guard: if currentTeam is undefined, show a simple "← Back" fallback
  (goBack()) and stop.

── BREADCRUMB (flexShrink 0, marginBottom 16px) ──

"← Back to {parentDepartment?.name || 'Organization'}" (Inter 13px weight
  600 #67748E, hover #1A1A1A, onClick: goBack()) + " / " (muted) +
  "{currentTeam.name}" (Inter 13px weight 600 #1A1A1A)

── KPI ROW (display grid, grid-template-columns: repeat(4, 1fr), gap 16px, marginBottom 16px) ──

Same exact KPI card anatomy as every other screen, each WITH a small
"+X%" trend chip in the delta position (green if positive, matching the
established delta convention — use plausible fixed values since this is
mock data, not computed from history):

  "Mapping Uploaded" — {currentTeam.mappingUploaded}, delta "+6.2%", upload icon
  "Calls Done" — {currentTeam.callsDone}, delta "+9.8%", phone icon
  "Follow-ups / Meetings" — {currentTeam.followUpsMeetings}, delta "+3.1%", calendar icon
  "Total Conversions" — {currentTeam.conversions}, delta "+11.4%", trophy icon

── MANAGER INFO CARD (flexShrink 0, bg white, radius 18px, elevation-1, padding 20px, marginBottom 16px, display flex, alignItems center, gap 16px) ──

Avatar (48px circle, bg #17181C, white initials derived from
  currentTeam.managerName)
Content: manager name (Poppins 16px weight 600 #1A1A1A) + "Team Manager"
  (Inter 12.5px #8392AB) beneath it
Status badge (marginLeft auto): solid-fill pill, bg #4CAF50, white text,
  "ACTIVE" — same solid-fill pill pattern as every status badge
  established since Step 3

── TWO-COLUMN BODY (display flex, gap 16px) ──

LEFT COLUMN — EXECUTIVE PERFORMANCE TABLE (flex 1.6, bg white, radius
  18px, elevation-1):

  HEADER (52px, padding '0 20px', borderBottom 1px solid #F0F0F0):
    "Executive Performance" title (Poppins 14px weight 600 #1A1A1A)

  TABLE — transparent header, bottom-border-only rows, same style as
    every other table:
    Columns: Executive | Mapping | Calls Done | Follow-ups | Meetings | Conversions

    Executive cell: avatar (32px, bg #17181C, white initials) + name
      (Inter 14px weight 600 #1A1A1A)
    Mapping / Calls Done: Inter 14px weight 500 #1A1A1A, tabular figures
    Follow-ups / Meetings / Conversions: small neutral badge (bg #F1F1F3,
      color #1A1A1A, Inter 12px weight 700, radius 6px, padding '3px 10px')
      showing the number — these are counts worth visually distinguishing
      from raw numeric cells, per the source spec's "badge" columns

    Rows from currentTeamExecutives

    EMPTY STATE (currentTeamExecutives.length === 0) — this is the exact
      case the source product got wrong (it fell back to placeholder
      text like "Executive" in the activity feed instead of a real empty
      state). Build it correctly here:
      Full-width table message row: centered icon + "No executives
      assigned to this team." (Poppins 14px weight 600 #1A1A1A) + "Add
      executives to this team to see their performance here." (Inter
      13px #8392AB) — no placeholder names, no fabricated data

RIGHT COLUMN — RECENT ACTIVITY FEED (width 340px, flexShrink 0, bg
  white, radius 18px, elevation-1, padding 20px):

  Title "Recent Activity" (Poppins 14px weight 600 #1A1A1A), marginBottom 16px

  If currentTeamActivity.length > 0: render each item —
    display flex, gap 10px, alignItems flex-start, marginBottom 14px
    Colored dot (8px circle, {item.color}, marginTop 4px, flexShrink 0)
    Content: text (Inter 13px weight 500 #1A1A1A) + time (Inter 11.5px
      #8392AB, marginTop 2px)

  If currentTeamActivity.length === 0: render a proper empty state
    instead of any placeholder text — centered icon + "No recent
    activity yet." (Poppins 14px weight 600 #1A1A1A) + "Activity will
    appear here once this team starts logging calls." (Inter 12.5px
    #8392AB) — this directly fixes the fallback-placeholder bug flagged
    in the Functional Spec; never substitute a generic "Executive" string
    for missing data again, anywhere in this app.

=============================================================
MODAL — DEPARTMENT BUILDER
=============================================================

Triggered from the Department List's "+ Create Department" button
(Step 8) — update that button's onClick from the placeholder toast to:
  onClick: () => setShowDepartmentBuilder(true)

{showDepartmentBuilder && (
  BACKDROP: fixed inset:0, bg rgba(0,0,0,0.5), backdropFilter blur(4px),
    onClick: handleCloseDepartmentBuilder() (NOT a bare setShowDepartmentBuilder(false)
    — must go through the dirty-check)

  MODAL CARD: centered, bg white, radius 16px, width 560px, maxHeight
    90vh, overflowY auto, boxShadow elevation-modal, animation scaleIn 300ms

  HEADER (60px, borderBottom 1px solid #F0F0F0, padding '0 24px', display
    flex, alignItems center, justifyContent space-between):
    LEFT: icon circle (36px, bg #17181C, white "building+" icon) +
      "Create Department" (Poppins 16px weight 600 #1A1A1A)
    X close button → handleCloseDepartmentBuilder()

  BODY (padding 24px, display flex, flexDirection column, gap 20px):

    DEPARTMENT NAME field:
      Label "DEPARTMENT NAME" (Inter 11px uppercase #67748E weight 600)
      Input (44px height, radius 8px, border 1px solid #DEE2E6, focus
        border #17181C), placeholder "e.g. Enterprise Sales"
      value: builderDepartmentName, onChange: setBuilderDepartmentName

    DIVIDER (1px, bg #F0F0F0)

    TEAMS SECTION:
      Header row: "Teams" (Inter 13px weight 600 #1A1A1A) + count badge
        (bg #F1F1F3, "{builderTeamRows.length}") + "+ Add Team" button
        (ghost style, Inter 13px weight 600 #17181C, onClick: append a
        new row { rowId: Date.now(), name: '', managerId: '' } to
        builderTeamRows) — right aligned

      REPEATABLE TEAM ROW, for each row in builderTeamRows:
        bg #FAFAFA, radius 10px, padding 14px, display flex, gap 10px,
          alignItems center, marginBottom 10px
        Index badge (24px circle, bg #17181C, white, "{index + 1}")
        Team Name input (flex 1, 40px height, radius 8px, border 1px
          solid #DEE2E6), placeholder "Team name"
          value: row.name, onChange updates that row's name in builderTeamRows
        Manager select dropdown (flex 1, 40px height, radius 8px, border
          1px solid #DEE2E6):
          Options: "Select manager..." (empty value) → orgManagers.map(m
            => option value=m.id, label=m.name) → a visual separator
            (disabled option, "──────") → "+ Create New Manager" (a
            special option, value="__CREATE_NEW__")
          onChange:
            if selected value === "__CREATE_NEW__":
              setCreatingForRowId(row.rowId);
              setShowCreateManagerModal(true);
              // do NOT change row.managerId yet — leave it as-is until
              // the nested modal succeeds or is cancelled
            else:
              update that row's managerId to the selected value
        "Assigned" badge (small, bg #E7F7EC, color #4CAF50, Inter 11px
          weight 700, radius 6px, padding '2px 8px') — appears ONLY once
          row.managerId is a real (non-empty, non-sentinel) value
        Remove (trash icon) button (32x32, border 1px solid #DEE2E6,
          bg white): onClick removes this row from builderTeamRows;
          DISABLED (opacity 0.4, cursor not-allowed, no onClick effect)
          when builderTeamRows.length === 1 — there must always be at
          least one team row

      INLINE VALIDATION MESSAGE (if builderError is non-empty): red text
        area, Inter 13px #F5365C, bg #FDE8EC, radius 8px, padding '10px 14px',
        marginTop 8px, showing {builderError}

  FOOTER (64px, borderTop 1px solid #F0F0F0, padding '0 24px', display
    flex, alignItems center, justifyContent space-between):
    "Cancel" secondary button → handleCloseDepartmentBuilder()
    "Create Department" primary button (bg #17181C, white text):
      onClick validation logic:
        1. if builderDepartmentName.trim() === '': setBuilderError(
           "Department name is required."); return.
        2. if any row has empty name OR empty/sentinel managerId:
           setBuilderError("All teams must have a name and an assigned
           manager."); return. (ONE combined error message, not per-row —
           matches the source product's documented behavior exactly)
        3. On success:
           const newDeptId = generateId('DEPT', departments);
           const newDept = { id: newDeptId, name: builderDepartmentName.trim(),
             teamCount: builderTeamRows.length,
             managerCount: new Set(builderTeamRows.map(r => r.managerId)).size,
             executiveCount: 0, totalCalls: 0, totalConversions: 0 };
           const newTeams = builderTeamRows.map(row => ({
             id: generateId('TEAM', Object.values(teamsByDepartment).flat()),
             name: row.name.trim(),
             managerName: orgManagers.find(m => m.id === row.managerId)?.name || '',
             mappingUploaded: 0, callsDone: 0, followUpsMeetings: 0,
             conversions: 0, executiveCount: 0
           }));
           setDepartments(prev => [...prev, newDept]);
           setTeamsByDepartment(prev => ({ ...prev, [newDeptId]: newTeams }));
           setShowDepartmentBuilder(false);
           resetDepartmentBuilder();
           setTimeout(() => showToast(`"${newDept.name}" department created`,
             'success'), 0); // success toast — fixes the "silent modal
             // close" gap flagged in the Design System doc

  DISCARD CONFIRMATION (nested, shown when showDiscardConfirm is true —
    small secondary modal or an inline confirm bar over the builder,
    z-index above the builder but the builder stays visible/dimmed
    behind it):
    "Discard this department?" (Poppins 15px weight 600) + "You have
      unsaved changes that will be lost." (Inter 13px #8392AB)
    "Keep Editing" secondary button → setShowDiscardConfirm(false)
    "Discard" danger button (bg #F5365C, white text) → {
      setShowDiscardConfirm(false); setShowDepartmentBuilder(false);
      resetDepartmentBuilder(); }
)}

=============================================================
NESTED MODAL — CREATE MANAGER
=============================================================

{showCreateManagerModal && (
  Renders ON TOP of the Department Builder (higher z-index) — the
  builder stays mounted and visible (dimmed by this modal's own backdrop)
  behind it, so closing/cancelling this nested modal returns cleanly to
  the builder with its state untouched.

  BACKDROP: fixed inset:0, bg rgba(0,0,0,0.5), backdropFilter blur(4px),
    onClick: handleCancelCreateManager() (defined below)

  MODAL CARD: centered, bg white, radius 16px, width 460px, boxShadow
    elevation-modal, animation scaleIn 300ms, HIGHER z-index than the
    Department Builder card

  HEADER (60px, borderBottom 1px solid #F0F0F0, padding '0 24px'):
    icon circle (36px, bg #17181C, white "person+" icon) + "Create New
      Manager" (Poppins 16px weight 600 #1A1A1A)
    Subtitle beneath the title row: "Manager will be available
      immediately in the dropdown" (Inter 12.5px #8392AB)
    X close button → handleCancelCreateManager()

  BODY (padding 24px, display flex, flexDirection column, gap 16px):

    FULL NAME field: label "FULL NAME", input, placeholder "e.g. Divya Krishnan"
      value: newManagerForm.name, onChange updates it
      error (if newManagerErrors.name): "Full name is required." in red
        text beneath the field

    EMAIL field: label "EMAIL ADDRESS", input type email, placeholder
      "e.g. divya.k@salesvisionai.com"
      value: newManagerForm.email, onChange updates it
      errors (if present): "Email is required." / "Enter a valid email
        address." / "A manager with this email already exists." (check
        case-insensitively against orgManagers' emails)

    PASSWORD field: label "PASSWORD", input (type password/text toggled
      by showManagerPassword), eye icon toggle inside the input, "Auto-
      generate" ghost button beside/below the input (Inter 13px weight
      600 #17181C): onClick sets newManagerForm.password to
      generatePassword() and sets showManagerPassword(true) so the
      generated password is immediately visible
      error (if present): "Password is required." / "Password must be
        at least 8 characters."

    ROLE field: read-only display, label "ROLE", value "Manager" shown
      in a disabled-looking input (bg #F4F5F7, color #67748E, not
      editable) — never user-editable in this modal

  FOOTER (64px, borderTop 1px solid #F0F0F0, padding '0 24px'):
    "Cancel" secondary button → handleCancelCreateManager()
    "Create Manager" primary button (bg #17181C, white text):
      onClick validation (all three fields validated together, errors
        object populated, submission blocked if any error exists):
        name: required
        email: required, regex format check, case-insensitive duplicate
          check against orgManagers
        password: required, min 8 characters
      On success:
        const newManager = { id: generateId('MGR', orgManagers),
          name: newManagerForm.name.trim(),
          email: newManagerForm.email.trim().toLowerCase() };
        setOrgManagers(prev => [...prev, newManager]);
        // auto-select the new manager into the row that triggered this modal:
        setBuilderTeamRows(prev => prev.map(r =>
          r.rowId === creatingForRowId ? { ...r, managerId: newManager.id } : r));
        setShowCreateManagerModal(false);
        setNewManagerForm({ name: '', email: '', password: '' });
        setNewManagerErrors({});
        setShowManagerPassword(false);
        setCreatingForRowId(null);
)}

function handleCancelCreateManager() {
  // Cancelling leaves the triggering row's manager selection EXACTLY as
  // it was before — since we never wrote to it optimistically, this is
  // just resetting the modal's own form state.
  setShowCreateManagerModal(false);
  setNewManagerForm({ name: '', email: '', password: '' });
  setNewManagerErrors({});
  setShowManagerPassword(false);
  setCreatingForRowId(null);
}

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Both modals: role="dialog", aria-labelledby pointing to each modal's
  title, focus trapped inside while open, Escape key closes (Department
  Builder's Escape goes through handleCloseDepartmentBuilder()'s dirty
  check, not a bare close), focus returns to the triggering element on close
- Discard confirmation: role="alertdialog" (it's confirming a potentially
  destructive/data-losing action)
- Department Builder's manager <select>: the "+ Create New Manager"
  option and the separator are real, distinguishable option elements —
  the separator should be disabled/non-selectable
- Password show/hide toggle: aria-label toggles "Show password"/"Hide password"
- "Auto-generate" button: announce the result (e.g. a visually-hidden
  live region confirming "Password generated") since the field's content
  changes programmatically, not by direct user typing
- Team Detail's empty states (executives, activity): real text content,
  not just an icon — already specified above, but confirm it's not
  color-only or icon-only
- Status badge ("ACTIVE"): text label always present, color reinforces only

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): Team Detail's two-column body stacks to one column
  (table first, activity feed below, full width). Both modals stay
  centered and width-capped, already scrollable (maxHeight 90vh).
Mobile (<768px): Department Builder's team rows stack their Team Name
  input and Manager select vertically instead of side-by-side; both
  modals become near-full-width with reduced side margins.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Team Detail shows correct KPIs, manager info, executive table, and
     activity feed for whichever team was clicked from Department Detail
  ✅ A team with no executives shows the correct empty state (not
     fabricated placeholder data) — verify by clicking into a NEWLY
     CREATED team via the Department Builder
  ✅ A team with no activity history shows the correct empty state
  ✅ "+ Create Department" (Step 8) now opens the Department Builder
     instead of firing a toast
  ✅ Department Builder: "+ Add Team" appends a row; trash button removes
     a row but is disabled when only one row remains
  ✅ Manager dropdown lists orgManagers + a working "+ Create New
     Manager" option
  ✅ Selecting "+ Create New Manager" opens the nested modal WITHOUT
     altering the triggering row's current selection
  ✅ Creating a manager successfully closes the nested modal, adds the
     manager to orgManagers, and auto-selects them into the correct row
     with an "Assigned" badge appearing
  ✅ Cancelling the nested modal leaves the triggering row exactly as it was
  ✅ Department Builder validates: empty department name blocks submit
     with the correct message; any incomplete team row blocks submit with
     the single combined message
  ✅ Successful department creation adds a real, clickable department
     card to the Department List (Step 8) and a success toast fires
  ✅ Closing the Department Builder with unsaved input triggers the
     discard-confirmation prompt; closing with no input closes immediately
  ✅ Create Manager modal validates name/email(format+duplicate)/password(length)
     independently and shows the correct error per field
  ✅ Auto-generate fills a 12-character password and reveals it (toggles
     showManagerPassword to true)

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for titles/KPI numerals; Inter for everything else
✅ Page background #F4F5F7 inherited from the shell — do not redeclare
✅ Primary/brand color #17181C — every primary button, index badges,
   avatar circles, icon circles
✅ Modal backdrop is rgba(0,0,0,0.5) + blur(4px) — NOT transparent, this
   was an explicit bug fix from the Design System doc, verify it visually
✅ Two modals stacked (Department Builder + Create Manager) need visibly
   distinct z-index layering so it's clear one is on top of the other
✅ Never fabricate placeholder data for empty states (the "Executive"
   placeholder-text bug from the source product) — always render a real,
   honest empty-state message instead
✅ Status badges are solid-fill pills (matches Steps 3/4's pattern), not
   light-tint chips
✅ Tables: transparent header, bottom-border-only rows, no zebra striping
✅ Cards/modals: 16-18px radius, elevation-1/elevation-modal appropriately
✅ All toasts role="alert", including the new department-created success toast

=============================================================
BUILD ORDER
=============================================================

1. Promote departments/teamsByDepartment to useState (the one required
   edit to Step 8, same data, same shape)
2. Add teamExecutivesByTeam, teamActivityByTeam, initialOrgManagers,
   generateId(), generatePassword()
3. Add orgManagers state + all Department Builder and Create Manager
   modal state variables + isDepartmentBuilderDirty(),
   resetDepartmentBuilder(), handleCloseDepartmentBuilder(),
   handleCancelCreateManager()
4. Build Team Detail's real content: breadcrumb, KPI row, manager info
   card, executive table (with correct empty state), activity feed
   (with correct empty state)
5. Wire Step 8's "+ Create Department" button to
   setShowDepartmentBuilder(true) instead of its old toast
6. Build the Department Builder modal: header, department name field,
   repeatable team rows with manager dropdown + "+ Create New Manager"
   option, add/remove row logic, validation, footer actions
7. Build the discard-confirmation prompt and wire it to
   handleCloseDepartmentBuilder()
8. Build the nested Create Manager modal: fields, validation, auto-
   generate password, submit logic that appends to orgManagers and
   auto-selects into the triggering row
9. Wire the full success path: Create Department → new department
   appears in Step 8's list → click into it → click into a new team →
   Team Detail shows the correct empty states
10. Verify accessibility attributes and responsive behavior from the
    sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
  Board, Lead Detail, Executive Profile, or Department List/Detail beyond
  the one required state-promotion edit called out at the top.
DO NOT fabricate placeholder data anywhere empty states are needed — this
  is the step that specifically fixes that bug from the source product.
DO NOT let the Create Manager modal write to the Department Builder's row
  optimistically before the manager is actually created — only on success.
DO NOT allow the last remaining team row in the Department Builder to be removed.
DO NOT close the Department Builder without a discard confirmation when
  it has unsaved input.