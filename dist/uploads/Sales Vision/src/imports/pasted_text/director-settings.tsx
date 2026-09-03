=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
Board, Lead Detail, Executive Profile, Organization module, or Reports &
MIS Centre from Steps 1-10. Only ADD the Settings screen.
All existing screens, state, and shell behavior must remain intact.
Reminder of the locked palette: primary/brand #17181C, positive green
#4CAF50, negative red #F5365C.

=============================================================
STEP 11 — SETTINGS
=============================================================

Replace the 'settings' placeholder with a real account screen: Director
profile info, notification preferences, and session management — with a
working Log Out action that returns all the way to the Sign-In screen,
closing the loop this whole build started with in Step 1.

=============================================================
MOCK DATA — EXTEND THE EXISTING director OBJECT FROM STEP 1
=============================================================

Add these fields to the existing director object (do not redeclare it):

  phone: "+91 98765 00001",
  timezone: "Asia/Kolkata (IST)",
  joinedDate: "Jan 8, 2025"

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

const initialNotificationPrefs = {
  hotLeadAlerts: true,
  weeklyReportReady: true,
  mappingCoverageDrops: true,
  teamOrgChanges: false,
  productUpdates: false
};

const notificationPrefLabels = [
  { key: "hotLeadAlerts", label: "Hot Lead Alerts", description: "Notify me when a lead moves to Hot temperature." },
  { key: "weeklyReportReady", label: "Weekly Report Ready", description: "Notify me when the scheduled weekly report finishes generating." },
  { key: "mappingCoverageDrops", label: "Mapping Coverage Drops", description: "Notify me if an industry's coverage falls below 25%." },
  { key: "teamOrgChanges", label: "Team & Organization Changes", description: "Notify me when a department, team, or manager is added." },
  { key: "productUpdates", label: "Product Updates", description: "Occasional updates about new SalesVision features." }
];

const initialSessions = [
  { id: 1, device: "Chrome on Windows", location: "Mumbai, IN", lastActive: "Active now", current: true },
  { id: 2, device: "Safari on iPhone", location: "Mumbai, IN", lastActive: "2 hours ago", current: false },
  { id: 3, device: "Chrome on MacBook", location: "Bengaluru, IN", lastActive: "3 days ago", current: false }
];

=============================================================
STATE — ADD TO STATE SECTION
=============================================================

const [settingsTab, setSettingsTab] = useState('profile'); // 'profile' | 'notifications' | 'sessions'

const [profileForm, setProfileForm] = useState({
  name: director.name, email: director.email, phone: director.phone
});

const [notificationPrefs, setNotificationPrefs] = useState(initialNotificationPrefs);
const [sessions, setSessions] = useState(initialSessions);
const [showSignOutAllConfirm, setShowSignOutAllConfirm] = useState(false);

function handleSaveProfile() {
  if (!profileForm.name.trim() || !profileForm.email.trim()) {
    setTimeout(() => showToast("Name and email are required.", 'error'), 0);
    return;
  }
  setTimeout(() => showToast("Profile updated", 'success'), 0);
}

function handleSaveNotificationPrefs() {
  setTimeout(() => showToast("Notification preferences updated", 'success'), 0);
}

function handleLogOutSession(sessionId) {
  const session = sessions.find(s => s.id === sessionId);
  setSessions(prev => prev.filter(s => s.id !== sessionId));
  setTimeout(() => showToast(`Signed out of ${session.device}`, 'success'), 0);
}

function handleSignOutAllOthers() {
  setSessions(prev => prev.filter(s => s.current));
  setShowSignOutAllConfirm(false);
  setTimeout(() => showToast("Signed out of all other sessions", 'success'), 0);
}

function handleLogOut() {
  setIsAuthenticated(false);
  setScreen('dashboard');       // resets so the app lands on Dashboard
  setNavHistory(['dashboard']); // after the NEXT sign-in
}

=============================================================
SCREEN — SETTINGS
=============================================================

screen: 'settings'
animation: screenEnter 280ms ease-out both

FULL STRUCTURE: display flex, gap 16px, height 100%

── LEFT TAB COLUMN (width 220px, flexShrink 0, display flex, flexDirection column, gap 4px) ──

3 tabs, each: height 44px, radius 8px, padding '0 14px', display flex,
  alignItems center, gap 10px, cursor pointer, Inter 14px weight 500
  Active: bg #17181C, color white
  Inactive: bg transparent, color #67748E, hover bg #F4F5F7

  "Profile" (person icon) → onClick: setSettingsTab('profile')
  "Notifications" (bell icon) → onClick: setSettingsTab('notifications')
  "Sessions" (monitor/device icon) → onClick: setSettingsTab('sessions')

DIVIDER (1px, bg #EEEEEE, marginY 16px)

"Log Out" — danger-outline button (transparent bg, 1.5px solid #F5365C
  border, color #F5365C, Inter 14px weight 600, height 44px, radius 8px,
  full width of the 220px column):
  onClick: handleLogOut() — this signs the Director out and returns to
    the Sign-In screen from Step 1, closing the full app loop

── RIGHT CONTENT PANEL (flex 1, bg white, radius 18px, elevation-1, padding 24px, overflowY auto) ──

RENDER BASED ON settingsTab:

━━━ PROFILE TAB ━━━

Title "Profile" (Poppins 16px weight 600 #1A1A1A), marginBottom 20px

TOP ROW (display flex, gap 20px, alignItems center, marginBottom 24px):
  Avatar (80px circle, bg #17181C, white initials, Poppins 26px weight 700)
  "Change Photo" ghost button (Inter 13px weight 600 #17181C, border 1.5px
    solid #DEE2E6, radius 8px, height 36px, padding '0 14px')
    onClick: fires a toast "Photo upload coming soon" — no real upload
    pipeline in this mock build

FORM (display grid, grid-template-columns: 1fr 1fr, gap 16px, maxWidth 640px):
  FULL NAME field: label "FULL NAME", editable input, value:
    profileForm.name, onChange updates it
  EMAIL field: label "EMAIL ADDRESS", editable input, value:
    profileForm.email, onChange updates it
  PHONE field: label "PHONE", editable input, value: profileForm.phone,
    onChange updates it
  TIMEZONE field: label "TIMEZONE", read-only display (bg #F4F5F7, color
    #67748E), value: director.timezone
  COMPANY field: label "COMPANY", read-only, value: director.companyName
  ROLE field: label "ROLE", read-only, value: "Director"

ACCESS LEVEL ROW (marginTop 20px, display flex, alignItems center, gap 12px):
  Label "ACCESS LEVEL" (Inter 11px uppercase #67748E)
  Badge: neutral pill (bg #F1F1F3, color #1A1A1A, Inter 12px weight 700,
    radius 6px, padding '4px 10px', uppercase) showing
    "{director.accessLevel}"
  If director.accessLevel !== 'enterprise': show the same scope badge
    style already used in the top bar since Step 1 ("Scoped:
    {departmentNames.join(', ')}") beside it

"Save Changes" primary button (bg #17181C, white text, height 44px,
  radius 8px, marginTop 24px): onClick: handleSaveProfile()

━━━ NOTIFICATIONS TAB ━━━

Title "Notifications" (Poppins 16px weight 600 #1A1A1A), marginBottom 20px

For each entry in notificationPrefLabels, render a preference row:
  display flex, justifyContent space-between, alignItems center,
  paddingBottom 16px, borderBottom 1px solid #F0F0F0, marginBottom 16px
  (last row: no border/margin)

  LEFT: label (Inter 14px weight 600 #1A1A1A) + description (Inter 13px
    #8392AB, marginTop 2px, maxWidth ~420px)
  RIGHT: toggle switch — track 44px wide x 24px tall, radius 9999px, bg
    #17181C when ON / #DEE2E6 when OFF, white circle thumb slides
    left/right, transition 200ms
    checked: notificationPrefs[item.key]
    onClick: setNotificationPrefs(prev => ({ ...prev, [item.key]: !prev[item.key] }))

"Save Preferences" primary button (bg #17181C, white text, height 44px,
  radius 8px, marginTop 8px): onClick: handleSaveNotificationPrefs()

━━━ SESSIONS TAB ━━━

HEADER ROW (display flex, justifyContent space-between, alignItems
  center, marginBottom 20px):
  Title "Active Sessions" (Poppins 16px weight 600 #1A1A1A)
  "Sign Out All Other Sessions" danger-outline button (only rendered if
    sessions.filter(s => !s.current).length > 0): border 1.5px solid
    #F5365C, color #F5365C, Inter 13px weight 600, height 36px, radius 8px
    onClick: setShowSignOutAllConfirm(true)

SESSIONS LIST (display flex, flexDirection column, gap 12px):
  Each session card (bg #FAFAFA, radius 12px, padding 16px, display flex,
    justifyContent space-between, alignItems center):

    LEFT: device icon (Icons8 Material Outlined — laptop/phone based on
      device string) + "{device}" (Inter 14px weight 600 #1A1A1A) +
      "{location} · {lastActive}" (Inter 12.5px #8392AB) beneath it

    RIGHT:
      if session.current: solid-fill green pill "CURRENT SESSION" (bg
        #4CAF50, white text, Inter 11px weight 700, radius 6px, padding
        '4px 10px', uppercase)
      else: "Log Out" text-link button (Inter 13px weight 600 #F5365C,
        hover underline) → onClick: handleLogOutSession(session.id)

CONFIRMATION (shown when showSignOutAllConfirm is true — same
  confirm-dialog pattern established in Step 9's discard confirmation):
  Backdrop rgba(0,0,0,0.5) + blur(4px), centered card:
  "Sign out of all other sessions?" (Poppins 15px weight 600) +
    "This will immediately sign you out on {N} other device(s)." (Inter
    13px #8392AB, N = count of non-current sessions)
  "Cancel" secondary button → setShowSignOutAllConfirm(false)
  "Sign Out All" danger button (bg #F5365C, white text) →
    handleSignOutAllOthers()

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Left tab column: role="tablist"/role="tab", aria-selected on the
  active tab, associated with the right panel via aria-controls/id
- Toggle switches: role="switch" + aria-checked, operable via keyboard
  (Space/Enter toggles), not just a clickable div
- Log Out and Sign Out All buttons: clear, unambiguous accessible names —
  never just an icon
- Confirmation dialog: role="alertdialog", focus trapped, Escape cancels
- Form fields: visible <label> for every input, read-only fields marked
  with aria-readonly or a real disabled/readOnly attribute, not just
  styled to look muted

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): left tab column becomes a horizontal tab strip above
  the content panel instead of a left column; Profile form drops to 1 column.
Mobile (<768px): same horizontal tab strip; session cards stack their
  device info above the action/badge instead of side-by-side.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Clicking each of the 3 left tabs shows the correct content panel
  ✅ Profile form fields are editable and "Save Changes" validates
     name/email are non-empty before showing the success toast
  ✅ "Change Photo" fires its own coming-soon toast, no crash
  ✅ Each notification toggle switches independently and visually
     reflects on/off state correctly
  ✅ "Save Preferences" fires a success toast
  ✅ "Log Out" (non-current) session removes it from the list and fires
     a toast naming that device
  ✅ "Sign Out All Other Sessions" only appears when there's at least one
     non-current session, and opens the confirmation dialog rather than
     acting immediately
  ✅ Confirming "Sign Out All" removes every non-current session and
     fires one summary toast
  ✅ The Log Out button (bottom of the left tab column) sets
     isAuthenticated to false, and the app correctly falls back to the
     Sign-In screen from Step 1 — verify this full round-trip: sign in →
     navigate around the app → open Settings → Log Out → land back on
     Sign-In → sign in again → app returns to Dashboard fresh

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for section titles; Inter for everything else
✅ Page background #F4F5F7, inherited from the shell — do not redeclare
✅ Primary/brand color #17181C — active tab, Save buttons, avatar circle
✅ Destructive actions (Log Out, Sign Out All, per-session Log Out) use
   red #F5365C — either as button text/border (outline style) or, for the
   confirmed destructive action inside the dialog, a solid red button
✅ Toggle switches: black track when ON, light grey when OFF — do not use
   green for the "on" state here, this is a black-brand toggle, not a
   status indicator
✅ Cards: 18px radius, elevation-1
✅ All toasts role="alert"
✅ This is the FIRST screen with real destructive/session-ending actions
   in the whole app — make sure the confirmation dialog pattern from
   Step 9 is reused faithfully, not reinvented differently here

=============================================================
BUILD ORDER
=============================================================

1. Add phone/timezone/joinedDate to the existing director object
2. Add initialNotificationPrefs, notificationPrefLabels, initialSessions
   mock data
3. Add settingsTab, profileForm, notificationPrefs, sessions,
   showSignOutAllConfirm state + all handler functions
4. Build the left tab column + Log Out button
5. Build the Profile tab content (avatar, form, access level row, Save button)
6. Build the Notifications tab content (toggle rows, Save button)
7. Build the Sessions tab content (session list, per-session Log Out,
   Sign Out All + confirmation dialog)
8. Wire the Log Out button to fully sign out and return to Sign-In
9. Test the complete round-trip described in the functional checklist
10. Verify accessibility attributes and responsive behavior from the
    sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
  Board, Lead Detail, Executive Profile, Organization module, or Reports
  & MIS Centre from Steps 1-10.
DO NOT let "Sign Out All Other Sessions" act without going through the
  confirmation dialog first.
DO NOT use green for the notification toggle's "on" state — black,
  matching the brand-accent toggle convention, not a status color.
DO NOT skip testing the full sign-out → sign-in round-trip — this is the
  screen that finally closes the loop opened in Step 1.