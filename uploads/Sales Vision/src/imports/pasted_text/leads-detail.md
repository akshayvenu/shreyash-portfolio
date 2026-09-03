=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, or the
Leads Board from Steps 1-5. Only ADD real content to the 'leads-detail'
screen, replacing the lead-aware placeholder built in Step 5.
All existing screens, state, and shell behavior must remain intact.
Reminder of the locked palette: primary/brand #17181C, Hot #F5365C red,
Warm #FB6340 orange, Cold #8392AB slate grey (never blue).

=============================================================
STEP 6 — LEAD DETAIL
=============================================================

Replace the Step 5 placeholder for 'leads-detail' with the real screen:
a breadcrumb back to the Leads Board, a lead header with a permanent
Read-Only indicator, a two-column layout (chronological activity timeline
on the left, a lead summary panel on the right), and a "Download PDF"
action that exports this specific lead's activity log.

=============================================================
MOCK DATA — EXTEND THE EXISTING leadsList FROM STEP 5
=============================================================

Add these fields to each existing entry in leadsList (do not redeclare
the array — extend the object literals already there with the following
additional keys):

  dateMapped, totalCalls, connectedCalls, nextAction

Example of the fields to add (shown for the first three leads — apply
the same pattern, with plausible values consistent with each lead's
existing temperature/stage/daysInPipeline, to the remaining seven):

  "LEAD-001" (Vantage Financial Corp): dateMapped: "Jul 5, 2026",
    totalCalls: 6, connectedCalls: 5, nextAction: "Finalize MSA redlines with legal"
  "LEAD-002" (Meridian Health Group): dateMapped: "Jul 11, 2026",
    totalCalls: 4, connectedCalls: 4, nextAction: "Send updated proposal post-demo"
  "LEAD-004" (Skyline Retail Ventures): dateMapped: "Jul 2, 2026",
    totalCalls: 3, connectedCalls: 1, nextAction: "No further action — marked not interested"

=============================================================
MOCK DATA — ADD TO TOP OF FILE (activity timelines)
=============================================================

const leadActivityLogs = {
  "LEAD-001": [
    { date: "Jul 5, 2026 · 10:12 AM", action: "Cold call", outcome: "Call Received", duration: "4m 12s",
      note: "Spoke with CFO, expressed interest in the cost-reduction angle." },
    { date: "Jul 9, 2026 · 3:40 PM", action: "Information sent", outcome: "Email + Deck", duration: "—",
      note: "Sent the product deck and pricing tiers as requested." },
    { date: "Jul 14, 2026 · 11:00 AM", action: "Follow-up call", outcome: "Call Received", duration: "9m 30s",
      note: "Discussed implementation timeline, requested a live demo." },
    { date: "Jul 18, 2026 · 2:00 PM", action: "Meeting", outcome: "Meeting Done", duration: "32m",
      note: "Live demo with the procurement team — positive reception." },
    { date: "Jul 22, 2026 · 4:15 PM", action: "Contract discussion", outcome: "In Negotiation", duration: "18m",
      note: "Reviewing MSA redlines with legal." }
  ],
  "LEAD-002": [
    { date: "Jul 11, 2026 · 9:30 AM", action: "Cold call", outcome: "Call Received", duration: "5m 05s",
      note: "Spoke with Head of Ops, flagged a staffing-efficiency use case." },
    { date: "Jul 15, 2026 · 1:15 PM", action: "Information sent", outcome: "Brochure", duration: "—",
      note: "Shared case studies from two comparable healthcare groups." },
    { date: "Jul 19, 2026 · 10:45 AM", action: "Follow-up call", outcome: "Call Received", duration: "11m 20s",
      note: "Confirmed budget window for this quarter, scheduled a demo." },
    { date: "Jul 23, 2026 · 3:00 PM", action: "Meeting", outcome: "Meeting Done", duration: "40m",
      note: "Demo completed, stakeholders aligned — awaiting updated proposal." }
  ],
  "LEAD-004": [
    { date: "Jul 2, 2026 · 2:20 PM", action: "Cold call", outcome: "Call Received", duration: "2m 40s",
      note: "Brief conversation, asked to call back next week." },
    { date: "Jul 6, 2026 · 11:00 AM", action: "Follow-up call", outcome: "Not Picked Up", duration: "—", note: "" },
    { date: "Jul 10, 2026 · 4:30 PM", action: "Follow-up call", outcome: "Not Interested", duration: "3m 10s",
      note: "Client stated they've committed to an existing vendor for this cycle." }
  ]
};

// Not every lead needs a hand-authored log — this generates a plausible
// short timeline from the lead's own fields for any lead clicked that
// doesn't have an explicit entry above, so every card from the Leads
// Board (Step 5) works when clicked, not just these three.
function generateFallbackTimeline(lead) {
  const entries = [
    { date: lead.dateMapped ? `${lead.dateMapped} · 10:00 AM` : "—", action: "Cold call",
      outcome: "Call Received", duration: "5m 00s", note: `Initial contact with ${lead.companyName}.` }
  ];
  if (lead.temperature !== 'cold') {
    entries.push({ date: lead.lastCallDate + " · 1:00 PM", action: "Follow-up call",
      outcome: lead.temperature === 'hot' ? "Meeting Done" : "Information Sent", duration: "12m 00s",
      note: `Currently at "${lead.currentStage}."` });
  } else {
    entries.push({ date: lead.lastCallDate + " · 1:00 PM", action: "Follow-up call",
      outcome: lead.currentStage, duration: "—", note: "" });
  }
  return entries;
}

function getLeadTimeline(leadId, lead) {
  return leadActivityLogs[leadId] || generateFallbackTimeline(lead);
}

=============================================================
STATE — NO NEW STATE NEEDED
=============================================================

This screen is fully derived from selectedLeadId (already set in Step 5)
and the mock data above. Do not add new top-level state for this screen
beyond what Step 5 already declared.

const currentLead = leadsList.find(l => l.id === selectedLeadId);
const currentTimeline = currentLead ? getLeadTimeline(currentLead.id, currentLead) : [];

=============================================================
SCREEN — LEAD DETAIL
=============================================================

screen: 'leads-detail'
animation: screenEnter 280ms ease-out both

Guard: if currentLead is undefined (selectedLeadId somehow unset), render
the same "← Back to Leads Board" fallback link and stop — don't crash.

── BREADCRUMB (flexShrink 0, marginBottom 16px) ──

"← Leads Board" (Inter 13px weight 600 #67748E, hover #1A1A1A, cursor
  pointer, onClick: navigateTo('leads')) + " / " (muted) +
  "{currentLead.companyName}" (Inter 13px weight 600 #1A1A1A)

── LEAD HEADER CARD (flexShrink 0, bg white, radius 18px, elevation-1, padding 20px, marginBottom 16px) ──

TOP ROW (display flex, justifyContent space-between, alignItems flex-start):

  LEFT: company name (Poppins 20px weight 700 #1A1A1A) + temperature
    badge beside it (same pill style as the Leads Board cards — bg/color
    from temperatureColor(currentLead.temperature), uppercase label) +
    "Read-Only" persistent indicator (small neutral pill, bg #F1F1F3,
    color #67748E, Inter 11px weight 600, "🔒 Director View — Read Only")
    — this badge is ALWAYS visible on this screen, no edit/reassign/
    status-change controls are ever rendered anywhere on this page

  RIGHT: "Download PDF" button — bg #17181C, white text, Icons8 Material
    Outlined download icon, height 40px, radius 8px
    onClick: fires a toast "Activity log for {companyName} exported as
    PDF" — this is a SEPARATE, lead-specific export action, distinct from
    the shell's global "Export" button (top filter strip), which still
    only shows the Step 1 "coming in Step 10" toast. Do not conflate the two.

META ROW (marginTop 12px, display flex, gap 24px, flexWrap wrap, Inter
  13px #67748E):
  "Industry: {currentLead.industry}"
  "Stage: {currentLead.currentStage}"
  "Assigned to: {currentLead.assignedExecutive}"
  "Manager: {currentLead.managerName}"
  "Mapped: {currentLead.dateMapped}"

── TWO-COLUMN BODY (flex 1, display flex, gap 16px, overflow hidden) ──

LEFT COLUMN — ACTIVITY TIMELINE (flex 1.6, bg white, radius 18px,
  elevation-1, padding 20px, overflowY auto):

  Title "Activity Timeline" (Poppins 14px weight 600 #1A1A1A), marginBottom 16px

  For each entry in currentTimeline, in chronological order, render a
  timeline row:
    display flex, gap 12px, paddingBottom 16px, borderLeft: 2px solid
      #EEEEEE (creates the vertical timeline line), marginLeft 8px,
      paddingLeft 16px, position relative

    Small filled circle (8px, bg #17181C) positioned on the left border
      line at the top of each entry (absolute positioned, marginLeft -21px
      or equivalent, to sit exactly on the vertical line)

    Content:
      Date/time (Inter 12px #8392AB)
      Action + outcome on one line (Inter 14px weight 600 #1A1A1A):
        "{action} — {outcome}"
      Duration, if not "—" (Inter 12.5px #8392AB): "Duration: {duration}"
      Note, if non-empty (Inter 13px #1A1A1A, marginTop 4px, italic or
        slightly indented to distinguish it as free text): "{note}"

  Empty state (currentTimeline.length === 0, shouldn't happen given the
    fallback generator, but code defensively): centered icon + "No
    activity recorded for this lead yet"

RIGHT COLUMN — LEAD SUMMARY PANEL (width 320px, flexShrink 0, bg white,
  radius 18px, elevation-1, padding 20px, display flex, flexDirection
  column, gap 16px):

  Title "Summary" (Poppins 14px weight 600 #1A1A1A)

  5 stat rows, each (display flex, justifyContent space-between,
    alignItems center, paddingBottom 12px, borderBottom 1px solid #F0F0F0;
    last row: no border):
    Label (Inter 13px #8392AB) + Value (Inter 14px weight 700 #1A1A1A,
      tabular figures where numeric)

    "Stage" — {currentLead.currentStage}
    "Total Calls" — {currentLead.totalCalls}
    "Connected" — {currentLead.connectedCalls}
    "Days in Pipeline" — {currentLead.daysInPipeline}
    "Next Action" — {currentLead.nextAction} (this value can wrap to two
      lines — right-align the text block, don't truncate it)

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Breadcrumb back link: a real, keyboard-focusable link/button, not just
  a styled span with an onClick
- Timeline entries: use a semantic <ol> (ordered list — chronological
  order matters) rather than a series of unordered <div>s
- Read-Only badge: not just a visual cue — the page's primary heading
  region should include a visually-hidden "This lead is read-only, no
  edit actions are available" note for screen reader users, since the
  ABSENCE of edit controls is itself information a sighted user infers
  from what's missing, but a screen reader user can't infer absence
- Temperature badge: color paired with the visible text label, as everywhere else
- Download PDF button: aria-label clarifies scope, e.g. "Download PDF
  activity log for {companyName}" — distinguishing it from the shell's
  generic "Export" button by more than just position on screen

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): two-column body stacks to a single column — timeline
  first, summary panel below it (not beside), summary panel becomes
  full-width instead of a fixed 320px sidebar.
Mobile (<768px): same single-column stack; lead header's meta row wraps
  to multiple lines naturally; Download PDF button becomes full-width
  below the company name/badges instead of top-right.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Arriving at this screen from any Leads Board card (Step 5) shows the
     CORRECT lead's data — company name, temperature, stage, timeline, summary
  ✅ Breadcrumb "← Leads Board" navigates back to the 'leads' screen
  ✅ Read-Only badge is visible and no edit/reassign/status controls exist
     anywhere on this screen
  ✅ "Download PDF" fires its own lead-specific toast, independent of the
     shell's global Export button/toast
  ✅ Timeline renders in correct chronological order for leads with an
     explicit log (LEAD-001, LEAD-002, LEAD-004)
  ✅ Any OTHER lead (no explicit log) still renders a sensible fallback
     timeline via generateFallbackTimeline() rather than an empty screen
  ✅ Summary panel's 5 stats all populate correctly from currentLead
  ✅ Guard case: if selectedLeadId is somehow unset, the screen doesn't
     crash — it shows a fallback back-link instead

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for the company name/section titles; Inter for everything else
✅ Page background #F4F5F7, inherited from the shell — do not redeclare
✅ Primary/brand color #17181C — Download PDF button, timeline dots
✅ Temperature colors LOCKED: Hot red #F5365C, Warm orange #FB6340, Cold
   slate grey #8392AB — reuse temperatureColor() from Step 5, don't
   redefine it differently here
✅ This screen has ZERO write actions — no edit, no reassign, no status
   change, anywhere. The Read-Only badge is not decorative, it's a
   correctness constraint on what you build
✅ Cards: 18px radius, elevation-1
✅ The shell's global Export button and this screen's Download PDF
   button are two SEPARATE actions with two separate toasts — do not merge them
✅ All toasts role="alert"

=============================================================
BUILD ORDER
=============================================================

1. Extend the existing leadsList entries with dateMapped/totalCalls/
   connectedCalls/nextAction fields (all 10 leads, following the pattern
   shown for the first three)
2. Add leadActivityLogs, generateFallbackTimeline(), getLeadTimeline()
3. Derive currentLead and currentTimeline from selectedLeadId
4. Build the breadcrumb
5. Build the lead header card (name, temperature badge, Read-Only badge,
   Download PDF button, meta row)
6. Build the activity timeline (left column) with the vertical line +
   dot pattern
7. Build the lead summary panel (right column, 5 stat rows)
8. Wire the breadcrumb back-navigation and the Download PDF toast
9. Test by clicking through several different leads from the Leads Board
   (Step 5) and confirming each one's data renders correctly, including
   at least one lead relying on generateFallbackTimeline()
10. Verify accessibility attributes and responsive behavior from the
    sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, or the
  Leads Board from Steps 1-5.
DO NOT add any edit, reassign, status-change, or note-adding controls to
  this screen — it is permanently read-only, by design, not by omission.
DO NOT merge the Download PDF action with the shell's global Export
  button — they are separate features with separate scopes.
DO NOT introduce blue for the Cold temperature badge — grey, matching
  Steps 1 and 5.