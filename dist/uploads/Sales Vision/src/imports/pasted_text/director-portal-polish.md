=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild any of the 11 screens or 2 modals from Steps 1-11. This is
the final step — it ADDS two small new features (a command palette and
saved views), makes one narrow required edit to Step 1's global filter
strip to surface them, and then walks the ENTIRE app through a QA and
accessibility audit. Nothing about visual language changes in this step —
no new colors, no new card anatomy. This step is wiring and verification,
not redesign.

=============================================================
STEP 12 — THE POLISH PASS
=============================================================

Four parts, in this order:
  A. Global Command Palette (⌘K)
  B. Saved Views
  C. Full Cross-Screen Wiring Verification (checklist — run it, fix
     anything that fails, don't skip it because it looks like "just
     testing")
  D. Accessibility & Responsive Audit (checklist — same as above)

=============================================================
PART A — GLOBAL COMMAND PALETTE (⌘K)
=============================================================

> **Required edit to Step 1:** the top bar's "Type here…" search input
> currently just captures typed text into `globalSearch` with no real
> destination. Change its behavior: clicking it (or pressing ⌘K/Ctrl+K
> from anywhere in the app) OPENS the command palette below instead of
> just focusing a plain input. The input itself can stay visually
> identical — it's the trigger, not a separate feature.

MOCK DATA — ADD TO TOP OF FILE:

  Build a single searchable index by combining data ALREADY established
  in Steps 1, 5, 7, and 9 — do not invent new people/leads, reuse the
  same ones the rest of the app already knows about:

  const commandIndex = [
    { type: 'screen', label: 'Dashboard', screen: 'dashboard' },
    { type: 'screen', label: 'Mapping', screen: 'mapping' },
    { type: 'screen', label: 'Calls', screen: 'calls' },
    { type: 'screen', label: 'Team', screen: 'team' },
    { type: 'screen', label: 'Leads Board', screen: 'leads' },
    { type: 'screen', label: 'Organization', screen: 'organization' },
    { type: 'screen', label: 'Reports & MIS Centre', screen: 'reports' },
    { type: 'screen', label: 'Settings', screen: 'settings' },
    { type: 'action', label: 'Export Current View', action: 'export' },
    { type: 'action', label: 'Refresh Data', action: 'refresh' },
    { type: 'action', label: 'Log Out', action: 'logout' },
    ...executiveDirectory.map(e => ({
      type: 'executive', label: e.name, subtitle: `Executive · ${e.department}`, executiveId: e.id
    })),
    ...orgManagers.map(m => ({
      type: 'manager', label: m.name, subtitle: 'Manager', managerId: m.id
    })),
    ...leadsList.map(l => ({
      type: 'lead', label: l.companyName, subtitle: `${l.industry} · ${l.currentStage}`, leadId: l.id
    }))
  ];

STATE — ADD TO STATE SECTION:

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [paletteHighlightIndex, setPaletteHighlightIndex] = useState(0);

  const paletteResults = paletteQuery.trim() === ''
    ? commandIndex.slice(0, 8) // show a short default list (screens first) when empty
    : commandIndex.filter(item =>
        item.label.toLowerCase().includes(paletteQuery.toLowerCase())
      ).slice(0, 8);

  function executePaletteItem(item) {
    if (item.type === 'screen') navigateTo(item.screen);
    else if (item.type === 'executive') navigateToExecutive(item.executiveId);
    else if (item.type === 'lead') navigateToLead(item.leadId);
    else if (item.type === 'manager') {
      // Route to Team, filtered to this manager — reuses Step 4's exact
      // manager-card-click filtering logic, just triggered from the palette
      setRankView('executives');
      setSelectedManagerCardId(item.managerId);
      navigateTo('team');
    } else if (item.type === 'action') {
      if (item.action === 'export') handleShellExport();
      if (item.action === 'refresh') { /* reuse the exact Refresh button logic from Step 1 */ }
      if (item.action === 'logout') handleLogOut();
    }
    setPaletteOpen(false);
    setPaletteQuery('');
    setPaletteHighlightIndex(0);
  }

  // Global keyboard listener (add once, at the top-level component):
  // on Cmd+K or Ctrl+K anywhere → setPaletteOpen(true) (and preventDefault
  // so the browser's own shortcuts don't fire); on Escape while open →
  // setPaletteOpen(false)

BUILD THE PALETTE UI:

  {paletteOpen && (
    BACKDROP: fixed inset:0, bg rgba(0,0,0,0.5), backdropFilter blur(4px),
      onClick: setPaletteOpen(false)

    PALETTE CARD: fixed, centered horizontally, top ~15% of viewport (NOT
      vertically centered like a normal modal — command palettes sit
      near the top), width 560px, bg white, radius 16px, boxShadow
      elevation-modal, overflow hidden, animation scaleIn 200ms

      SEARCH INPUT ROW (56px, borderBottom 1px solid #F0F0F0, padding
        '0 20px', display flex, alignItems center, gap 10px):
        search icon (#8392AB) + input (flex 1, border none, outline none,
          Inter 15px, placeholder "Search screens, people, leads…",
          autoFocus when paletteOpen becomes true)
        value: paletteQuery, onChange: updates it AND resets
          paletteHighlightIndex to 0
        onKeyDown: ArrowDown/ArrowUp move paletteHighlightIndex within
          paletteResults.length bounds; Enter calls
          executePaletteItem(paletteResults[paletteHighlightIndex])

      RESULTS LIST (maxHeight 360px, overflowY auto, padding '8px 0'):
        Group results by type with a small section label (Inter 11px
          uppercase #8392AB, padding '8px 20px 4px') — "Screens",
          "Actions", "People", "Leads" — only rendered if that group has
          at least one result

        Each result row (height 44px, padding '0 20px', display flex,
          alignItems center, gap 10px, cursor pointer):
          Highlighted (index === paletteHighlightIndex): bg #F4F5F7
          Icon matching the type (screen/action/executive/manager/lead —
            reuse whichever icon that entity already uses elsewhere in
            the app, e.g. the same avatar-circle treatment for people)
          Label (Inter 14px weight 500 #1A1A1A) + subtitle if present
            (Inter 12.5px #8392AB, marginLeft 8px)
          onClick: executePaletteItem(item)

        Empty state (paletteResults.length === 0): centered, "No results
          for '{paletteQuery}'" (Inter 13px #8392AB), padding 24px
  )}

=============================================================
PART B — SAVED VIEWS
=============================================================

> **Required edit to Step 1:** add two small buttons to the right side of
> the global filter strip, before the existing Export/Refresh buttons:
> a "☆ Save View" ghost button and a "Views ▾" dropdown button. Nothing
> else in the filter strip changes.

MOCK DATA — ADD TO TOP OF FILE:

  const initialSavedViews = [
    { id: 1, name: "This Week — Hot Leads", screen: 'leads',
      globalPeriod: 'week', globalDateRange: { start: '', end: '' },
      screenFilters: { temperatureTab: 'hot', leadIndustryFilter: 'All', leadManagerFilter: 'All' } },
    { id: 2, name: "Enterprise Sales — Calls", screen: 'calls',
      globalPeriod: 'month', globalDateRange: { start: '', end: '' },
      screenFilters: { callsView: 'executives', selectedManagerIds: ['MGR-001'] } }
  ];

STATE — ADD TO STATE SECTION:

  const [savedViews, setSavedViews] = useState(initialSavedViews);
  const [showViewsDropdown, setShowViewsDropdown] = useState(false);
  const [showSaveViewPrompt, setShowSaveViewPrompt] = useState(false);
  const [saveViewName, setSaveViewName] = useState('');

  // Captures whichever filter state is relevant for the CURRENT screen —
  // extend this switch as new screens gain their own filters; every case
  // here reuses state variables already declared in earlier steps.
  function captureCurrentScreenFilters() {
    switch (screen) {
      case 'mapping': return { industryFilter };
      case 'calls': return { callsView, selectedManagerIds };
      case 'team': return { rankView, selectedManagerCardId, sortColumn, sortDirection };
      case 'leads': return { temperatureTab, leadIndustryFilter, leadManagerFilter };
      default: return {};
    }
  }

  function applyScreenFilters(view) {
    const f = view.screenFilters || {};
    if (view.screen === 'mapping' && f.industryFilter !== undefined) setIndustryFilter(f.industryFilter);
    if (view.screen === 'calls') {
      if (f.callsView !== undefined) setCallsView(f.callsView);
      if (f.selectedManagerIds !== undefined) setSelectedManagerIds(f.selectedManagerIds);
    }
    if (view.screen === 'team') {
      if (f.rankView !== undefined) setRankView(f.rankView);
      if (f.selectedManagerCardId !== undefined) setSelectedManagerCardId(f.selectedManagerCardId);
      if (f.sortColumn !== undefined) setSortColumn(f.sortColumn);
      if (f.sortDirection !== undefined) setSortDirection(f.sortDirection);
    }
    if (view.screen === 'leads') {
      if (f.temperatureTab !== undefined) setTemperatureTab(f.temperatureTab);
      if (f.leadIndustryFilter !== undefined) setLeadIndustryFilter(f.leadIndustryFilter);
      if (f.leadManagerFilter !== undefined) setLeadManagerFilter(f.leadManagerFilter);
    }
  }

  function handleSaveCurrentView() {
    if (!saveViewName.trim()) {
      setTimeout(() => showToast("Please name this view.", 'error'), 0);
      return;
    }
    const newView = {
      id: Date.now(),
      name: saveViewName.trim(),
      screen, globalPeriod, globalDateRange,
      screenFilters: captureCurrentScreenFilters()
    };
    setSavedViews(prev => [...prev, newView]);
    setShowSaveViewPrompt(false);
    setSaveViewName('');
    setTimeout(() => showToast(`View "${newView.name}" saved`, 'success'), 0);
  }

  function handleApplyView(view) {
    setScreen(view.screen);
    setNavHistory(prev => [...prev, view.screen]);
    setGlobalPeriod(view.globalPeriod);
    setGlobalDateRange(view.globalDateRange);
    applyScreenFilters(view);
    setShowViewsDropdown(false);
    setTimeout(() => showToast(`Loaded view "${view.name}"`, 'success'), 0);
  }

  function handleDeleteView(viewId, e) {
    e.stopPropagation(); // don't also trigger handleApplyView on the row
    setSavedViews(prev => prev.filter(v => v.id !== viewId));
  }

BUILD THE UI (added to Step 1's global filter strip, right side, to the
  LEFT of the existing Export button):

  "☆ Save View" ghost button (Inter 13px weight 600 #1A1A1A, border
    1.5px solid #DEE2E6, height 36px, radius 8px):
    onClick: setShowSaveViewPrompt(true)

  "Views ▾" button (same style), with a dropdown panel (240px wide,
    elevation-3, radius 12px) listing savedViews:
    Each row: view.name (Inter 13px weight 500 #1A1A1A) + a small "✕"
      delete icon (appears on hover, calls handleDeleteView) + click
      anywhere else on the row calls handleApplyView(view)
    Empty state: "No saved views yet" (Inter 13px #8392AB, padding 16px)

  SAVE VIEW PROMPT (small modal, shown when showSaveViewPrompt is true):
    Backdrop + centered card (360px wide, same modal treatment as every
      other modal in the app): "Save Current View" title, a single name
      input (autoFocus), Cancel + "Save" (bg #17181C) buttons
    "Save" onClick: handleSaveCurrentView()

=============================================================
PART C — FULL CROSS-SCREEN WIRING VERIFICATION (run this, fix failures)
=============================================================

Go through every item below manually. This is not optional polish — a
failure here means an earlier step's placeholder was never actually
replaced, or a piece of state leaked incorrectly between screens.

  [ ] Sidebar: all 7 nav items + Settings navigate correctly and
      highlight the correct parent item, including while on a
      drill-down screen (leads-detail highlights "Leads", executive-
      profile highlights whichever of Dashboard/Calls/Team it came from
      — actually verify this specifically, since Executive Profile can
      be reached from three different parents)
  [ ] globalPeriod/globalDateRange, set on any screen, are still applied
      when you navigate to any other screen — no screen has reintroduced
      a local period filter
  [ ] Dashboard → click an executive row → Executive Profile → click an
      assigned lead → Lead Detail → back → back → back returns you
      cleanly to Dashboard (repeat starting from Calls, and from Team)
  [ ] Leads Board → click a lead card → Lead Detail → back → returns to
      Leads Board with your previous filters (temperature tab, industry,
      manager) still applied, not reset
  [ ] Organization → click a department → Department Detail → click a
      team → Team Detail (or the placeholder, if that team predates Step
      9's build) → back → back → returns cleanly
  [ ] "+ Create Department" only appears for canManageOrg === true;
      successfully creating one makes it immediately clickable from the
      Department List with a working drill-down into its (empty) teams
  [ ] Every table's row-click across Dashboard/Calls/Team correctly opens
      Executive Profile for THAT row's person, not a stale/previous one
  [ ] The shell's Export button and the Reports Centre's 4 template
      buttons all log correctly to the same Download History list
  [ ] Settings → Log Out → returns to Sign-In → signing back in lands
      fresh on Dashboard with navHistory reset
  [ ] NEW this step: the command palette's results for every type
      (screen/action/executive/manager/lead) all navigate correctly
  [ ] NEW this step: saving a view on Mapping/Calls/Team/Leads, navigating
      elsewhere, then loading that view from the Views dropdown restores
      BOTH the screen and that screen's specific filters correctly
  [ ] No screen anywhere still shows the Step 1 generic placeholder card
      except ones genuinely not yet built (there should be none left —
      if any screen still shows "coming in a later step," find out why)

=============================================================
PART D — ACCESSIBILITY & RESPONSIVE AUDIT (run this, fix failures)
=============================================================

  [ ] Run an automated pass (axe or Lighthouse) across all 12 screens +
      2 modals + the command palette; fix any critical/serious issues
  [ ] Keyboard-only pass: Tab through the ENTIRE app — sidebar, top bar,
      every filter, every table row, every card, every modal — with no
      dead ends and a visible focus ring (≥2px, ≥3:1 contrast) at every stop
  [ ] Every icon-only button anywhere in the app has an aria-label —
      spot-check the collapse toggle, notification bell, refresh button,
      password show/hide toggles, and every table action icon
  [ ] Every modal (Department Builder, Create Manager, Save View, Sign
      Out All confirmation, Discard confirmation, Command Palette) traps
      focus, closes on Escape, and returns focus to its trigger on close
  [ ] Every status/temperature/coverage badge pairs color with a visible
      text label — spot check Hot/Warm/Cold, Active/Inactive, and the
      3-tier coverage badges
  [ ] Every chart (Dashboard's bar+donut, Mapping's bar+donut, Executive
      Profile's donut+trend, Team's sparklines) has a text legend, not
      color-only encoding
  [ ] Screen reader spot-check: Lead Detail's Read-Only indicator has its
      visually-hidden explanatory note (from Step 6); empty states read
      as real sentences, not just icons
  [ ] Responsive pass at 1440px, 1024px (tablet), and 375px (mobile) for
      every screen — confirm no horizontal overflow anywhere except
      tables that are INTENTIONALLY horizontally scrollable, and that
      every documented mobile adaptation (bottom nav, stacked cards,
      collapsed filters) actually renders, not just described
  [ ] Command palette specifically: confirm ⌘K/Ctrl+K works from every
      screen (not just Dashboard), and that it doesn't conflict with any
      browser or OS-level shortcut in a way that breaks the app

=============================================================
CRITICAL REMINDERS
=============================================================

✅ No new colors, fonts, radii, or card anatomy in this step — Parts A
   and B reuse every visual pattern already established in Steps 1-11
✅ Primary/brand color #17181C for the palette's search icon focus state,
   Save/Views buttons, and the palette's highlighted-row background tint
   (#F4F5F7, matching hover states used everywhere else)
✅ The command palette and saved-views dropdown both close on outside
   click AND on Escape
✅ Saved views only restore state that ALREADY exists — do not invent new
   filter dimensions just to make the save/restore feature look richer
✅ All toasts role="alert"
✅ Parts C and D are checklists, not features — do not skip them because
   there's no new UI to show for them; fix whatever they surface

=============================================================
BUILD ORDER
=============================================================

1. Add commandIndex, palette state, executePaletteItem(), and the global
   ⌘K/Ctrl+K/Escape keyboard listener
2. Build the command palette UI and wire the search-input trigger from
   Step 1's top bar to open it
3. Add initialSavedViews, saved-views state, captureCurrentScreenFilters(),
   applyScreenFilters(), handleSaveCurrentView(), handleApplyView(),
   handleDeleteView()
4. Add the "☆ Save View" and "Views ▾" buttons to Step 1's global filter
   strip, plus the Views dropdown panel and the Save View prompt modal
5. Work through the ENTIRE Part C checklist, screen by screen, fixing
   any broken link, lost filter state, or stale placeholder you find
6. Work through the ENTIRE Part D checklist — automated audit first,
   then manual keyboard/screen-reader/responsive passes
7. Re-test the full sign-in → wander → sign-out → sign-in round-trip one
   final time end-to-end

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT introduce any new visual language — this step is wiring and
  verification on top of 11 steps of established design, not a redesign.
DO NOT consider this step done if any checklist item in Part C or D
  fails and is left unfixed — the whole point of a polish pass is that
  nothing gets waved through.
DO NOT let the command palette or saved views bypass any access-control
  logic already established (e.g., a scoped Director's palette should
  still only surface data they're allowed to see, consistent with the
  access_level scoping described throughout the Design System doc).