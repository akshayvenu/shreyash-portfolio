=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
This is the FIRST step — there is nothing to preserve yet, but every screen,
token, and state pattern established here is LOCKED for all future steps.
Do not introduce colors, fonts, spacing values, or state patterns that
aren't in the Design System doc. In particular: the primary/brand color
is near-black (#17181C), NOT blue — every button, active nav state, and
KPI icon square uses it. The sidebar is WHITE, not dark.

=============================================================
STEP 1 — FOUNDATION: APP SHELL + SIGN-IN + DASHBOARD
=============================================================

Build three things in this step, in this order:
1. The Sign-In screen (full-bleed, outside the app shell)
2. The persistent App Shell (sidebar + top bar + global filter strip)
3. The Dashboard screen (S1) — the first and default screen inside the shell

=============================================================
GLOBAL STATE — SCREEN MACHINE (ADD TO TOP OF STATE SECTION)
=============================================================

Declare the FULL screen enum now, even though only 'dashboard' has real
content this step. Every other value is a placeholder screen that renders
a simple "coming in a later step" card. This lets every nav click and every
drill-down link work and navigate correctly from Step 1 onward.

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [screen, setScreen] = useState('dashboard');
const [navHistory, setNavHistory] = useState(['dashboard']); // for breadcrumbs later

// Global filter state — shared by EVERY screen, forever. Never let a future
// step create a screen-local period filter; they all read/write these two.
const [globalPeriod, setGlobalPeriod] = useState('week'); // 'all'|'today'|'week'|'month'|'custom'
const [globalDateRange, setGlobalDateRange] = useState({ start: '', end: '' });

// Shell state
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const [notifOpen, setNotifOpen] = useState(false);
const [globalSearch, setGlobalSearch] = useState('');
const [isRefreshing, setIsRefreshing] = useState(false);
const [showPassword, setShowPassword] = useState(false);

// Screen enum (for reference — implement as a simple switch/if-chain):
// 'dashboard' | 'mapping' | 'calls' | 'team' | 'leads' | 'leads-detail'
// | 'executive-profile' | 'organization' | 'organization-department'
// | 'organization-team' | 'reports' | 'settings'

function navigateTo(nextScreen) {
  setScreen(nextScreen);
  setNavHistory(prev => [...prev, nextScreen]);
}

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

const director = {
  name: "Vikram Malhotra",
  initials: "VM",
  role: "Director",
  email: "vikram.malhotra@salesvisionai.com",
  accessLevel: "enterprise",       // 'enterprise' | 'cross' | 'standard'
  departmentNames: [],             // populated only when accessLevel !== 'enterprise'
  companyName: "SalesVision"
};

const dashboardKpis = {
  callsMade: 4820, callsMadeDelta: 12.4,
  totalMappings: 1360, totalMappingsDelta: 6.1,
  hotLeads: 214, hotLeadsDelta: -3.2,
  connectedCalls: 2115, connectRate: 43.9
};

const callOutcomesTrend = [
  { date: "Mon", accepted: 310, no_response: 180, rejected: 90 },
  { date: "Tue", accepted: 340, no_response: 165, rejected: 100 },
  { date: "Wed", accepted: 295, no_response: 200, rejected: 85 },
  { date: "Thu", accepted: 360, no_response: 150, rejected: 95 },
  { date: "Fri", accepted: 410, no_response: 140, rejected: 70 },
  { date: "Sat", accepted: 220, no_response: 190, rejected: 60 },
  { date: "Sun", accepted: 180, no_response: 210, rejected: 55 }
];

const leadTemperature = { cold: 640, warm: 506, hot: 214 };

const executivesList = [
  { id: "EXE-001", name: "Aarav Shah", initials: "AS", managerName: "Rahul Verma",
    callsPeriod: 312, connectedPeriod: 168, hotLeads: 14, warmLeads: 28,
    connectRate: 53.8, callsToday: 22 },
  { id: "EXE-002", name: "Diya Mehta", initials: "DM", managerName: "Anita Desai",
    callsPeriod: 288, connectedPeriod: 140, hotLeads: 11, warmLeads: 24,
    connectRate: 48.6, callsToday: 19 },
  { id: "EXE-003", name: "Rohan Gupta", initials: "RG", managerName: "Rahul Verma",
    callsPeriod: 201, connectedPeriod: 76, hotLeads: 4, warmLeads: 15,
    connectRate: 37.8, callsToday: 12 },
  { id: "EXE-004", name: "Kavya Iyer", initials: "KI", managerName: "Meera Singh",
    callsPeriod: 356, connectedPeriod: 201, hotLeads: 19, warmLeads: 31,
    connectRate: 56.4, callsToday: 27 },
  { id: "EXE-005", name: "Ishaan Bose", initials: "IB", managerName: "Arjun Nair",
    callsPeriod: 142, connectedPeriod: 39, hotLeads: 2, warmLeads: 9,
    connectRate: 27.5, callsToday: 6 },
  { id: "EXE-006", name: "Priya Nambiar", initials: "PN", managerName: "Anita Desai",
    callsPeriod: 274, connectedPeriod: 151, hotLeads: 13, warmLeads: 22,
    connectRate: 55.1, callsToday: 21 }
];

const managersList = [
  { id: "MGR-001", name: "Rahul Verma", initials: "RV", department: "Enterprise Sales",
    teamSize: 6, callsPeriod: 980, connectedPeriod: 512, hotLeads: 41, warmLeads: 88,
    connectRate: 52.2, callsToday: 68 },
  { id: "MGR-002", name: "Anita Desai", initials: "AD", department: "SMB Sales",
    teamSize: 5, callsPeriod: 845, connectedPeriod: 401, hotLeads: 33, warmLeads: 70,
    connectRate: 47.5, callsToday: 55 },
  { id: "MGR-003", name: "Kiran Patel", initials: "KP", department: "Enterprise Sales",
    teamSize: 4, callsPeriod: 520, connectedPeriod: 198, hotLeads: 15, warmLeads: 40,
    connectRate: 38.1, callsToday: 30 },
  { id: "MGR-004", name: "Meera Singh", initials: "MS", department: "Strategic Accounts",
    teamSize: 5, callsPeriod: 902, connectedPeriod: 487, hotLeads: 37, warmLeads: 65,
    connectRate: 54.0, callsToday: 61 },
  { id: "MGR-005", name: "Arjun Nair", initials: "AN", department: "SMB Sales",
    teamSize: 3, callsPeriod: 310, connectedPeriod: 92, hotLeads: 6, warmLeads: 20,
    connectRate: 29.7, callsToday: 14 }
];

const notifications = [
  { id: 1, title: "Hot lead surge — Enterprise Sales", body: "14 new Hot leads logged in the last 24h under Rahul Verma's team", time: "2h ago", read: false, type: "lead" },
  { id: 2, title: "Weekly report ready", body: "Executive Performance Report for this week has finished generating", time: "5h ago", read: false, type: "report" },
  { id: 3, title: "Coverage drop — Retail industry", body: "Retail mapping coverage fell to 22% this week", time: "Yesterday", read: true, type: "mapping" },
  { id: 4, title: "New manager added", body: "Meera Singh was added to Strategic Accounts", time: "3 days ago", read: true, type: "team" }
];

=============================================================
SCREEN 1 — SIGN-IN (full-bleed, outside the shell)
=============================================================

Rendered when isAuthenticated === false. NO sidebar, NO top bar. This
replicates the Material Dashboard reference sign-in screen structure
exactly: full-bleed photo background + a two-tone card (dark header
strip + white body).

FULL STRUCTURE:
  position: fixed, inset: 0
  background: full-bleed professional office/workspace photo (Unsplash
    "software company" style), with a rgba(10,10,10,0.45) dark overlay
    for legibility
  display: flex, alignItems: center, justifyContent: center

  Thin top bar overlay (72px, semi-transparent light pill container
  centered near the top, matching the reference's floating nav bar):
    bg rgba(255,255,255,0.9), radius 16px, padding '0 24px', width fit-content,
    position absolute top 24px, display flex, alignItems center, gap 24px
    Left: "SalesVision" wordmark, Poppins 16px weight 700 #1A1A1A
    Right: small text nav-style links (non-functional placeholders this
    step): "Dashboard", "Profile" — Inter 14px #67748E

SIGN-IN CARD (centered):
  width: 420px
  borderRadius: 16px
  overflow: hidden (so the two-tone split has clean corners)
  boxShadow: 0 24px 64px rgba(0,0,0,0.35)
  animation: scaleIn 300ms ease-out

  DARK HEADER STRIP (matches the reference's black gradient "Sign in" bar):
    height: 96px
    background: linear-gradient(135deg, #2B2B2E, #17181C)
    display: flex, alignItems: center, justifyContent: center
    borderRadius: 16px 16px 0 0
    "Sign in" — Poppins 22px weight 700, white, centered

  WHITE BODY (padding: 32px 32px):
    FORM (flex column, gap 16px):
      EMAIL input: 44px height, radius 8px, border 1px solid #DEE2E6,
        placeholder "Email" (Inter 14px #ADB5BD), no icon inside
        (matches reference exactly — plain bordered input, no icon)
        focus: border #17181C
      PASSWORD input: same styling, placeholder "Password", eye-icon
        toggle for show/hide inside the input, right-aligned
      "Remember me" row: dark toggle switch (bg #17181C when on) +
        "Remember me" label, Inter 14px #1A1A1A

    "Sign in" PRIMARY BUTTON: full width, 44px height, bg #17181C,
      hover #000000, white text, Inter 14px weight 600, radius 8px,
      marginTop 20px
      onClick: () => { setIsAuthenticated(true); setScreen('dashboard'); }
      (mock front-end — any non-empty email/password proceeds)

    "Don't have an account? Sign up" — Inter 13px #67748E, "Sign up"
      in #1A1A1A weight 600, centered, marginTop 16px (non-functional
      this step)

  Below the card (not inside it): "Director View — Read Only" small
    neutral badge, Inter 11px rgba(255,255,255,0.8), centered, marginTop
    16px — establishes this persistent indicator's look now so every
    later screen reuses it exactly

=============================================================
APP SHELL (persistent — renders once isAuthenticated === true)
=============================================================

FULL STRUCTURE:
  display: flex, height: 100vh, overflow: hidden
  background: #F4F5F7

── SIDEBAR (flexShrink 0) ───────────────────────────────────

width: sidebarCollapsed ? 72px : 240px
transition: width 200ms ease
background: #FFFFFF
borderRight: 1px solid #EEEEEE
display: flex, flexDirection: column
height: 100vh

LOGO AREA (72px height, padding 20px, borderBottom 1px solid #EEEEEE):
  provided SalesVision mark, 28px, never recolored
  {!sidebarCollapsed && "SalesVision" Poppins 15px weight 600 #1A1A1A, marginLeft 10px}

NAV ITEMS (flex 1, padding '16px 12px', display flex, flexDirection column, gap 4px):
  Each item: height 44px, borderRadius 12px, padding '0 12px',
    display flex, alignItems center, gap 12px, cursor pointer,
    transition all 0.15s

  Icons: Icons8 Material Outlined, 20px

  Inactive: color #67748E, bg transparent
  Active: bg #17181C (near-black solid fill), color WHITE — the ENTIRE
    pill fills black, no left border/accent bar needed, this achieves
    "active" purely through the solid fill exactly like the reference
  Hover (inactive): bg #F4F5F7

  Label: Inter 14px weight 500 — hidden (icon + tooltip-on-hover only) when
    sidebarCollapsed is true

  Items, in order:
    Dashboard   → onClick: navigateTo('dashboard')
    Mapping     → onClick: navigateTo('mapping')
    Calls       → onClick: navigateTo('calls')
    Team        → onClick: navigateTo('team')
    Leads       → onClick: navigateTo('leads')
    Organization → onClick: navigateTo('organization')
    Reports     → onClick: navigateTo('reports')

  Active item is whichever matches the current `screen` (map sub-screens
  like 'leads-detail' or 'organization-team' back to their parent nav item
  so the correct top-level nav stays highlighted during drill-downs)

BOTTOM (borderTop 1px solid #EEEEEE, padding 12px):
  Settings nav item (same style as above) → navigateTo('settings')
  Collapse toggle: small chevron icon button (grey #67748E), onClick
    toggles sidebarCollapsed
  User mini-card (only when !sidebarCollapsed): avatar (32px, bg #17181C,
    initials white) + director.name (Inter 13px weight 600 #1A1A1A) +
    "Director" (Inter 11px #8392AB)

── MAIN COLUMN (flex 1, display flex, flexDirection column, overflow hidden) ──

── TOP BAR (64px, flexShrink 0) ─────────────────────────────

background: white, borderBottom 1px solid #EEEEEE, padding '0 24px'
display: flex, alignItems: center, justifyContent: space-between

LEFT: page title (Poppins 18px weight 600 #1A1A1A) derived from `screen`
  ("Dashboard" / "Mapping" / "Calls" / etc.) + a scope badge, shown ONLY
  when director.accessLevel !== 'enterprise':
    pill, bg #F1F1F3, color #1A1A1A, Inter 12px weight 600, radius 9999px,
    padding '4px 10px', text "Scoped: {departmentNames.join(', ')}"

CENTER: global search — 320px pill input, bg #F4F5F7, border 1px solid
  #EEEEEE, radius 9999px, NO icon inside (matches reference exactly),
  placeholder text **"Type here…"** (Inter 14px #ADB5BD)
  value: globalSearch, onChange updates it (functional filtering wired in
  a later step — for now, just capture the value)

RIGHT (display flex, gap 12px, align center):
  Notification bell: 36x36 circular button, border 1px solid #EEEEEE,
    bg white, Icons8 Material Outlined bell icon (#67748E), small red dot
    badge if any notifications.read === false
    onClick: setNotifOpen(!notifOpen)
    — dropdown panel (280px wide, elevation-3 shadow, radius 12px) lists
      the 4 notifications from mock data: colored dot by type, title
      (Inter 13px weight 600), body (Inter 12px #8392AB), time (Inter
      11px #ADB5BD); closes on outside click

  Avatar + name (director.initials in a 32px #17181C circle, white text +
    director.name, Inter 13px weight 500 #1A1A1A) — clicking navigates to
    'settings'

── GLOBAL FILTER STRIP (48px, flexShrink 0) ─────────────────

background: white, borderBottom 1px solid #EEEEEE, padding '0 24px'
display: flex, alignItems: center, gap: 12px

PERIOD PILL GROUP: ['all','today','week','month','custom'] rendered as a
  segmented control (bg #F1F1F3, radius 8px, padding 3px; active pill:
  bg white + elevation-1 shadow, text #1A1A1A; inactive: transparent,
  text #67748E), labels "All Time" / "Today" / "This Week" / "This Month" /
  "Custom"
  onClick sets globalPeriod — THIS IS READ BY EVERY SCREEN, do not let any
  future screen create its own period state

CUSTOM RANGE (renders inline, fadeUp 200ms, only when globalPeriod === 'custom'):
  two native date inputs (start/end) + "Apply" button (black, disabled
  until both filled; end input's min = start value)

RIGHT (marginLeft auto, display flex, gap 8px):
  "Export" button: bg #17181C, white text, Icons8 Material Outlined
    download icon, height 36px, radius 8px — this step: onClick shows a
    toast "Export will be available from the Reports Centre (Step 10)"
    since the real export engine isn't built yet
  "Refresh" icon button (36x36, border 1px solid #EEEEEE, bg white):
    onClick sets isRefreshing(true), spins the icon (rotate animation)
    for 600ms, then isRefreshing(false) + toast "Data refreshed"

── CONTENT AREA (flex 1, overflowY auto, padding 24px, bg #F4F5F7) ──

Renders whichever screen is active. This step, only 'dashboard' has real
content (below). Every other screen value renders this placeholder:

  PLACEHOLDER CARD: centered, bg white, radius 18px, elevation-1,
    padding 48px, maxWidth 480px, margin '80px auto'
    Icons8 Material Outlined "construction" icon, 40px, #ADB5BD
    "{Screen Title} is coming in a later step" — Poppins 16px weight 600 #1A1A1A
    "This screen will be built in Step {N} of the roadmap." — Inter 13px #8392AB

=============================================================
SCREEN — DASHBOARD (S1) — the only fully real screen this step
=============================================================

screen: 'dashboard'
animation: screenEnter 280ms ease-out both

── KPI ROW (display grid, grid-template-columns: repeat(4, 1fr), gap 16px) ──

All 4 KPI cards use the SAME anatomy — this is the exact reference
pattern ("Today's Money $53k +55% than last week"), NOT a left-accent-bar
card. Every card:

  bg white, radius 18px, elevation-1, padding 20px, height 108px (hero
  card can be 120px if you want the "Calls Made" numeral slightly larger)
  display: flex, justifyContent space-between, alignItems flex-start

  LEFT COLUMN:
    Label — Inter 13px weight 500 #67748E
    Value — Poppins 28-30px weight 700 #1A1A1A, marginTop 4px, ANIMATE
      counting up from 0 over 600ms ease-out on mount
    Delta line, marginTop 8px, Inter 13px:
      "{delta}%" in weight 700, color #4CAF50 if positive / #F5365C if
      negative, immediately followed by muted grey text "than last week"
      (Inter 13px weight 400 #8392AB) — one continuous text line, NOT a
      pill/badge

  RIGHT: 44x44 ICON SQUARE, bg #17181C, radius 14px, centered white
    Icons8 Material Outlined icon (phone icon for Calls, map-pin for
    Mappings, flame/fire for Hot Leads, checkmark for Connected) — ALWAYS
    black, never module-colored

  4 cards, in order:
    "Calls Made" — {dashboardKpis.callsMade}, delta {callsMadeDelta}%, phone icon
    "Total Mappings" — {dashboardKpis.totalMappings}, delta {totalMappingsDelta}%, map-pin icon
    "Hot Leads" — {dashboardKpis.hotLeads}, delta {hotLeadsDelta}%, flame icon
    "Connected Calls" — {dashboardKpis.connectedCalls}, sub-line instead of
      delta: "{connectRate}% connect rate" in Inter 13px #8392AB (no
      green/red coloring on this one since it's not a delta), checkmark icon

── CHART ROW (display grid, grid-template-columns: 1.6fr 1fr, gap 16px, marginTop 16px) ──

CALL OUTCOMES CHART CARD (min-height 320px, bg white, radius 18px,
  elevation-1, padding 20px):
  Title "Call Outcomes" (Poppins 14px weight 600 #1A1A1A)
  Subtitle "This Week" (Inter 12.5px #8392AB), marginBottom 12px
  Grouped bar chart, one group per day (callOutcomesTrend): Accepted
    (#4CAF50 green), No Response (#8392AB slate-grey), Rejected (#F5365C
    red) — legend below the chart pairing each color with its label
    (never color-only)
  TOOLTIP on hover — replicate the reference exactly: dark rounded box
    (bg #1A1A1A, radius 8px, padding '8px 12px'), small colored square
    swatch matching the hovered series + day label on line 1 (e.g. "Wed"),
    then "{Series}: {value}" in white Inter 12-13px on line 2
  Bars animate up from baseline over 500ms on mount, staggered 40ms per series
  Loading: skeleton chart block (shimmer). Empty (if no data for period):
    centered icon + "No call data for this period"

LEAD TEMPERATURE DONUT CARD (min-height 320px, bg white, radius 18px,
  elevation-1, padding 20px):
  Title "Lead Temperature" (Poppins 14px weight 600 #1A1A1A)
  Donut: Hot (#F5365C) / Warm (#FB6340) / Cold (#8392AB), center label
    shows total lead count in Poppins 20px weight 700, legend below with
    each slice's absolute count

── PERFORMANCE TABLE CARD (marginTop 16px, bg white, radius 18px, elevation-1) ──

HEADER (52px, padding '0 20px', display flex, alignItems center,
  justifyContent space-between, borderBottom 1px solid #F0F0F0):
  "Performance" title (Poppins 14px weight 600 #1A1A1A)
  Segmented toggle (Executives / Managers) — bg #F1F1F3, active pill
    white + elevation-1, Inter 13px weight 600
    state: const [perfView, setPerfView] = useState('executives')

TABLE (matches the reference's clean row style — transparent header, no
  zebra striping, bottom-border-only rows):

  HEADER ROW: uppercase Inter 11px weight 600 #8392AB, NO background
    fill, borderBottom 1px solid #F0F0F0

  Executives view — columns: Executive (avatar+name) | Manager | Calls |
    Connected | Hot | Today
  Managers view — columns: Manager (avatar+name) | Department | Team |
    Calls | Connected | Hot | Today

  DATA ROWS: borderBottom 1px solid #F0F0F0 (no other border), padding
    '16px 20px' per cell, hover bg #FAFAFA
  Entity cell: avatar circle (36px, bg #17181C, white initials) + name
    (Inter 14px weight 600 #1A1A1A) stacked over manager/dept name (Inter
    12.5px #8392AB) — exactly the reference's Author-column pattern
  Numeric cells: Inter 14px weight 500 #1A1A1A, tabular figures

  Rows from executivesList / managersList, clicking any row: onClick
  shows a toast "Executive Profile screen coming in Step 7" (placeholder
  wiring — do NOT build the real profile screen yet, just prove the row
  is clickable)

  Empty state (either view, if list is empty): centered icon + "No
  {executive/manager} data available"

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Sign-in inputs: visible <label> (visually hidden if design calls for
  placeholder-only, but present in the DOM), password field aria-label
  toggles between "Show password"/"Hide password"
- Sidebar nav items: aria-current="page" on the active item
- Icon-only buttons (collapse toggle, refresh, notification bell, sidebar
  collapsed-state nav items): aria-label describing the action
- Notification dropdown: role="menu", closes on Escape, focus returns to
  the bell button on close
- Period pill group: role="radiogroup", each pill role="radio" + aria-checked
- Chart legends pair color with text labels — never color-only
- Toasts: role="alert"
- Status pills / delta text: color is never the only signal — the delta
  line already includes "+"/"-" and "than last week" text, and status
  pills (used in later steps) always include the text label, not just color

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): sidebar defaults to collapsed (72px); global filter
  strip's period pills collapse into a single "Period ▾" button opening a
  dropdown; Dashboard's KPI grid drops to 2 columns; chart row stacks to 1 column.
Mobile (<768px): sidebar becomes a bottom tab bar (Dashboard/Mapping/Calls/
  Team/More) with sign-in remaining a centered full-screen card; KPI cards
  stack single-column; performance table becomes a stacked card list instead
  of a scrolling table.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Sign-in: any non-empty email+password → setIsAuthenticated(true), lands on Dashboard
  ✅ Sign-in password show/hide toggle works
  ✅ Sidebar: every nav item navigates to its screen and highlights correctly
     (solid black pill, not a left accent bar)
  ✅ Sidebar collapse toggle shrinks/expands width and hides/shows labels
  ✅ Sub-screens (once built in later steps) keep the correct PARENT nav item
     highlighted — wire this rule now even though only 'dashboard' exists
  ✅ Top bar notification bell opens/closes the dropdown; closes on outside click
  ✅ Avatar click navigates to 'settings' (renders the placeholder card this step)
  ✅ Global search input updates globalSearch state on type (no real results yet)
  ✅ Period pills switch globalPeriod; "Custom" reveals the date range picker
  ✅ Custom range "Apply" stays disabled until both dates are filled
  ✅ Refresh button spins for 600ms then fires a "Data refreshed" toast
  ✅ Export button fires the "coming in Step 10" toast
  ✅ Dashboard KPI numerals count up on mount
  ✅ Dashboard chart tooltips show the dark box + colored swatch + value on hover
  ✅ Dashboard Executives/Managers toggle swaps the table content
  ✅ Dashboard table rows fire the appropriate "coming in Step 7" toast
  ✅ Any screen other than 'dashboard' renders the correctly-labeled placeholder card

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for headings/titles/KPI numerals; Inter for everything else
   (body, table data, labels — Inter numerals use tabular figures)
✅ Page/content background: #F4F5F7
✅ Sidebar: WHITE (#FFFFFF), border-right #EEEEEE — never dark, never a gradient
✅ Primary/brand color: #17181C near-black — the ONLY color used for primary
   buttons, active sidebar pill, and KPI icon squares anywhere in this app
✅ KPI cards: label+value+delta stacked on the LEFT, black 44-48px icon
   square on the RIGHT — never a left accent bar, never a module color
✅ Delta text is inline copy ("+12.4% than last week" in green/red +
   grey), never a standalone pill/badge
✅ Chart primary color is #4CAF50 green; negative/rejected is #F5365C red;
   neutral is #8392AB slate — reused everywhere, no per-module rainbow
✅ Chart tooltips are dark (#1A1A1A) rounded boxes with a colored swatch +
   label + value — replicate this exactly on every chart, every future step
✅ Tables: transparent header (no shaded bg), bottom-border-only rows, no
   zebra striping — airy padding, not dense
✅ Cards: 16-18px radius (rounder than a typical enterprise tool), elevation-1
✅ The provided SalesVision logo mark is used exactly as given — never
   recolored, never used as a functional UI color source
✅ Icons8 Material Outlined throughout
✅ globalPeriod / globalDateRange are the ONLY period filter state in the
   entire app, declared once here — no future screen may create its own
✅ Every screen not yet built renders the placeholder card, never a blank
   page or a broken nav click
✅ All toasts role="alert", auto-dismiss ~3000ms

=============================================================
BUILD ORDER
=============================================================

1. Add all mock data (director, KPIs, trend, temperature, executives,
   managers, notifications)
2. Add the full screen-enum state + globalPeriod/globalDateRange + shell state
3. Build the Sign-In screen (two-tone card, dark header strip + white body), wire isAuthenticated
4. Build the Sidebar (white bg, black active pill, all nav items, collapse toggle)
5. Build the Top Bar ("Type here…" search, notifications dropdown, avatar)
6. Build the Global Filter Strip (period pills, custom range, black export button, refresh)
7. Build the placeholder card and wire it to every non-dashboard screen value
8. Build the Dashboard KPI row (icon-square-right anatomy, count-up animation)
9. Build the two Dashboard charts (bar + donut) with the dark tooltip and loading/empty states
10. Build the Dashboard performance table (transparent header, bottom-border rows, toggle, row clicks)
11. Wire every interaction from the functional checklist
12. Verify accessibility attributes and responsive behavior from the sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT build Mapping, Calls, Team, Leads, Organization, Reports, or Settings
  screens with real content — placeholder cards ONLY for those, this step.
DO NOT create any screen-local period/date filter — everything reads
  globalPeriod/globalDateRange.
DO NOT recolor or modify the provided logo mark.
DO NOT use a left-accent-bar KPI card, a dark sidebar, or blue/indigo as a
  primary color anywhere — the palette is black/white/grey + green/red for
  data only.
Every screen and nav item must exist and be clickable NOW, even though only
  Dashboard has real content — this is the wiring foundation every later
  step builds directly on top of.
