=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, or Team from
Steps 1-4. Only ADD the Leads Board screen.
All existing screens, state, and shell behavior must remain intact.
Reminder of the locked palette: primary/brand #17181C, chart/positive green
#4CAF50, negative red #F5365C, neutral slate #8392AB, warning orange #FB6340.

=============================================================
STEP 5 — LEADS BOARD
=============================================================

Replace the 'leads' placeholder with a full pipeline board: a conversion
funnel (Mapped → Assigned → Call Made → Warm → Hot) on the left, and a
temperature-tabbed, filterable list of lead cards on the right. Clicking
any card navigates to the Lead Detail screen (built in Step 6 — for now,
wire the navigation and a lead-specific placeholder, described below).

> **One deliberate departure from the source PRD, flagged explicitly:**
> the PRD specifies lead-card border colors as red (Hot) / amber (Warm) /
> **blue** (Cold). This build already established Hot=red, Warm=orange,
> Cold=SLATE GREY (#8392AB) for the Lead Temperature donut back in Step 1's
> Dashboard — introducing blue here for Cold would create two different
> color meanings for the same "Cold" concept in the same app. This step
> keeps Cold = slate grey everywhere, consistent with Step 1. If you want
> blue for Cold specifically, Step 1's donut needs to change too — don't
> let the two screens disagree.

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

const funnelStages = [
  { stage: "Mapped", count: 1360 },
  { stage: "Assigned", count: 1030 },
  { stage: "Call Made", count: 812 },
  { stage: "Warm", count: 506 },
  { stage: "Hot", count: 214 }
];
// Conversion % at each transition is computed at render time as
// (thisStage.count / previousStage.count * 100) — never hardcode it,
// since it must stay consistent if counts are edited later.

const leadsList = [
  { id: "LEAD-001", companyName: "Vantage Financial Corp", industry: "BFSI", temperature: "hot",
    assignedExecutive: "Aarav Shah", managerName: "Rahul Verma", lastCallDate: "Jul 22, 2026",
    currentStage: "Contract Discussion", daysInPipeline: 18 },
  { id: "LEAD-002", companyName: "Meridian Health Group", industry: "Healthcare", temperature: "hot",
    assignedExecutive: "Kavya Iyer", managerName: "Meera Singh", lastCallDate: "Jul 23, 2026",
    currentStage: "Meeting Done", daysInPipeline: 12 },
  { id: "LEAD-003", companyName: "Northfield Manufacturing", industry: "Manufacturing", temperature: "warm",
    assignedExecutive: "Diya Mehta", managerName: "Anita Desai", lastCallDate: "Jul 21, 2026",
    currentStage: "Information Sent", daysInPipeline: 7 },
  { id: "LEAD-004", companyName: "Skyline Retail Ventures", industry: "Retail", temperature: "cold",
    assignedExecutive: "Ishaan Bose", managerName: "Arjun Nair", lastCallDate: "Jul 10, 2026",
    currentStage: "Not Interested", daysInPipeline: 21 },
  { id: "LEAD-005", companyName: "Corewave IT Solutions", industry: "IT/Tech", temperature: "hot",
    assignedExecutive: "Priya Nambiar", managerName: "Anita Desai", lastCallDate: "Jul 23, 2026",
    currentStage: "Meeting Scheduled", daysInPipeline: 9 },
  { id: "LEAD-006", companyName: "Aster Wellness Clinics", industry: "Healthcare", temperature: "warm",
    assignedExecutive: "Meher Chopra", managerName: "Kiran Patel", lastCallDate: "Jul 20, 2026",
    currentStage: "Information Sent", daysInPipeline: 5 },
  { id: "LEAD-007", companyName: "Bharat Steel Industries", industry: "Manufacturing", temperature: "cold",
    assignedExecutive: "Rohan Gupta", managerName: "Rahul Verma", lastCallDate: "Jul 8, 2026",
    currentStage: "Not Picked Up", daysInPipeline: 25 },
  { id: "LEAD-008", companyName: "Zenith Capital Partners", industry: "BFSI", temperature: "warm",
    assignedExecutive: "Aarav Shah", managerName: "Rahul Verma", lastCallDate: "Jul 22, 2026",
    currentStage: "Call Received", daysInPipeline: 4 },
  { id: "LEAD-009", companyName: "Pinnacle Cloud Systems", industry: "IT/Tech", temperature: "hot",
    assignedExecutive: "Kavya Iyer", managerName: "Meera Singh", lastCallDate: "Jul 23, 2026",
    currentStage: "Contract Discussion", daysInPipeline: 15 },
  { id: "LEAD-010", companyName: "Coastal Retail Group", industry: "Retail", temperature: "cold",
    assignedExecutive: "Diya Mehta", managerName: "Anita Desai", lastCallDate: "Jul 5, 2026",
    currentStage: "Not Interested", daysInPipeline: 30 }
];

const leadIndustries = ["All", "BFSI", "Healthcare", "Manufacturing", "Retail", "IT/Tech"];
const leadManagers = ["All", "Rahul Verma", "Anita Desai", "Kiran Patel", "Meera Singh", "Arjun Nair"];

=============================================================
STATE — ADD TO STATE SECTION
=============================================================

const [temperatureTab, setTemperatureTab] = useState('All'); // 'All'|'hot'|'warm'|'cold'
const [leadIndustryFilter, setLeadIndustryFilter] = useState('All');
const [leadManagerFilter, setLeadManagerFilter] = useState('All');
const [selectedLeadId, setSelectedLeadId] = useState(null);

const filteredLeads = leadsList.filter(lead => {
  const matchTemp = temperatureTab === 'All' || lead.temperature === temperatureTab;
  const matchIndustry = leadIndustryFilter === 'All' || lead.industry === leadIndustryFilter;
  const matchManager = leadManagerFilter === 'All' || lead.managerName === leadManagerFilter;
  return matchTemp && matchIndustry && matchManager;
});

// Funnel counts scale approximately with the industry/manager filter so the
// funnel visibly responds to filtering, matching the source spec's
// requirement that "Industry and Manager filter chips... updates funnel
// counts too." This is a mock-data approximation (real backend would
// return pre-aggregated funnel counts for the filtered scope) — scale each
// stage by the ratio of filtered-to-total leads currently matching the
// industry/manager filters (ignoring the temperature tab, since the
// funnel represents the WHOLE pipeline, not just one temperature slice):
const scopedLeads = leadsList.filter(lead => {
  const matchIndustry = leadIndustryFilter === 'All' || lead.industry === leadIndustryFilter;
  const matchManager = leadManagerFilter === 'All' || lead.managerName === leadManagerFilter;
  return matchIndustry && matchManager;
});
const filterRatio = leadIndustryFilter === 'All' && leadManagerFilter === 'All'
  ? 1
  : Math.max(scopedLeads.length / leadsList.length, 0.05);
const scaledFunnel = funnelStages.map(s => ({ ...s, count: Math.round(s.count * filterRatio) }));

function temperatureColor(temp) {
  // LOCKED to match Step 1's Lead Temperature donut exactly — do not
  // introduce blue for 'cold' here, see the flagged note at the top.
  if (temp === 'hot') return { border: '#F5365C', bg: '#FDE8EC', label: 'Hot' };
  if (temp === 'warm') return { border: '#FB6340', bg: '#FFF3E6', label: 'Warm' };
  return { border: '#8392AB', bg: '#F1F1F3', label: 'Cold' };
}

function navigateToLead(leadId) {
  setSelectedLeadId(leadId);
  navigateTo('leads-detail');
}

=============================================================
SHELL UPDATE — LEAD-AWARE PLACEHOLDER (small addition to Step 1's shell)
=============================================================

Update the generic placeholder card logic so that specifically when
screen === 'leads-detail', it shows a lead-aware message instead of the
generic one — this proves the navigation/state wiring is correct before
Step 6 builds the real screen:

  IF screen === 'leads-detail' AND selectedLeadId is set:
    Show a breadcrumb-style back link "← Back to Leads Board" (onClick:
      navigateTo('leads'))
    "{leadsList.find(l => l.id === selectedLeadId)?.companyName} — Lead
      Detail coming in Step 6" (Poppins 16px weight 600 #1A1A1A)
  ELSE: fall back to the existing generic placeholder from Step 1

=============================================================
SCREEN — LEADS BOARD
=============================================================

screen: 'leads'
animation: screenEnter 280ms ease-out both

FULL STRUCTURE: display flex, gap 16px, height 100% (two-panel layout —
  funnel on the left, filterable card list on the right)

── LEFT PANEL — PIPELINE FUNNEL (width 320px, flexShrink 0, bg white, radius 18px, elevation-1, padding 20px) ──

Title "Pipeline Funnel" (Poppins 14px weight 600 #1A1A1A), marginBottom 16px

For each stage in scaledFunnel, top to bottom, render a funnel segment:
  Segment bar: width scales proportionally to count relative to the
    first stage (Mapped) — e.g. width% = (stage.count / scaledFunnel[0].count * 100),
    minimum width 30% so the narrowest stage (Hot) is never invisible
  Bar: height 40px, bg #17181C at full opacity for the FIRST stage,
    then progressively lighter greys/tints as you go down (or use a
    single green #4CAF50 fill that simply narrows — pick one approach
    and keep it consistent), radius 8px, centered horizontally within
    the 320px panel, marginBottom 8px
  Stage label (Inter 13px weight 600 #1A1A1A) + count (Poppins 16px
    weight 700 #1A1A1A) centered inside or directly below the bar

  CONVERSION CONNECTOR (between this stage and the next, except after
    the last stage): small downward chevron/arrow icon (#8392AB) +
    "{conversionPct}%" text (Inter 12px weight 600 #67748E) computed as
    (nextStage.count / thisStage.count * 100), centered, marginY 4px

  Loading: skeleton bars. Empty (scopedLeads.length === 0): centered
    icon + "No pipeline data for this selection"

── RIGHT PANEL (flex 1, display flex, flexDirection column, gap 12px) ──

TEMPERATURE TAB STRIP (flexShrink 0, display flex, gap 8px):
  Tabs: All / Hot / Warm / Cold (the "All" tab is an addition over the
    source spec's Hot/Warm/Cold-only list — it's the sensible default so
    the board doesn't open already filtered down to just Hot)
  Each tab: height 36px, padding '0 18px', radius 8px, Inter 13px weight 600
  Active: bg #17181C, color white (except when the active tab is a
    temperature, in which case use that temperature's border color as a
    thin 2px underline beneath the black active pill, so the tab strip
    still visually previews which color you're filtering to)
  Inactive: bg #F1F1F3, color #67748E
  onClick: setTemperatureTab(...)

FILTER CHIP ROW (flexShrink 0, display flex, gap 8px, flexWrap wrap):
  Industry chips from leadIndustries (single-select, same solid-black-
    when-active pattern as Mapping's industry chips in Step 2)
  Divider (1px x 20px, bg #EEEEEE)
  Manager chips from leadManagers (single-select, same pattern)
  Results count, marginLeft auto: "{filteredLeads.length} leads" (Inter
    13px #8392AB)

LEAD CARD LIST (flex 1, overflowY auto, display flex, flexDirection
  column, gap 12px):

  Each card (bg white, radius 16px, elevation-1, padding 16px, cursor
    pointer, borderLeft: 4px solid {temperatureColor(lead.temperature).border},
    transition all 0.15s, hover: translateY(-2px) + elevation-2):

    TOP ROW (display flex, justifyContent space-between, alignItems flex-start):
      LEFT: company name (Poppins 15px weight 600 #1A1A1A) + industry
        (Inter 12.5px #8392AB) below it
      RIGHT: temperature badge — small pill, bg
        {temperatureColor(lead.temperature).bg}, color
        {temperatureColor(lead.temperature).border}, Inter 11px weight
        700 uppercase, "{temperatureColor(lead.temperature).label}"

    META ROW (marginTop 10px, display flex, gap 16px, flexWrap wrap):
      "Assigned to {assignedExecutive}" (Inter 13px #67748E)
      "Manager: {managerName}" (Inter 13px #67748E)
      "Last call: {lastCallDate}" (Inter 13px #67748E)

    BOTTOM ROW (marginTop 10px, display flex, justifyContent space-between, alignItems center):
      Current stage chip (bg #F1F1F3, color #1A1A1A, Inter 12px weight
        600, radius 6px, padding '3px 10px', "{currentStage}") + "{daysInPipeline}
        days in pipeline" (Inter 12px #8392AB)
      "View →" text link (Inter 13px weight 600 #1A1A1A, hover underline)

    onClick (on the whole card, not just the "View →" link):
      navigateToLead(lead.id)

  Empty state (filteredLeads.length === 0): centered icon + "No leads
    match this filter" + "Clear Filters" ghost button resetting
    temperatureTab/leadIndustryFilter/leadManagerFilter to their defaults

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Temperature tab strip: role="tablist"/role="tab", aria-selected on the
  active tab
- Industry/manager filter chips: role="radiogroup" per chip row, each
  chip role="radio" + aria-checked
- Lead cards: the whole card is a single interactive element — use a
  real <button> or a div with role="button", tabIndex=0, and Enter/Space
  triggering navigateToLead(), not just an onClick with no keyboard path
- Temperature badges/borders: color is paired with the text label
  ("Hot"/"Warm"/"Cold") always visible on the badge — never rely on the
  border color alone
- Funnel conversion %: each connector's percentage is real text, not an
  image or color-only indicator

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): funnel panel narrows to 240px or collapses to a
  horizontal mini-funnel above the card list instead of a left column,
  whichever reads more clearly at that width — pick the horizontal
  layout if the vertical funnel becomes too cramped.
Mobile (<768px): funnel becomes a simple horizontal 5-step strip at the
  top (compact numbers only, no bars); lead cards stack full-width;
  filter chips become horizontally scrollable instead of wrapping.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Temperature tabs (All/Hot/Warm/Cold) filter the lead card list
  ✅ Industry chips filter the lead card list AND rescale the funnel
     (via scaledFunnel/filterRatio)
  ✅ Manager chips filter the lead card list AND rescale the funnel
  ✅ Funnel conversion % values are computed live from scaledFunnel, not
     hardcoded
  ✅ Lead card border color and badge match temperatureColor() exactly,
     with Cold rendering as slate grey (NOT blue)
  ✅ Clicking any lead card sets selectedLeadId and navigates to
     'leads-detail'
  ✅ The 'leads-detail' placeholder shows the correct company name and a
     working "← Back to Leads Board" link
  ✅ Empty state + Clear Filters button work correctly when a filter
     combination yields zero leads
  ✅ Results count updates live as filters change

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for card titles/funnel numerals; Inter for everything else
✅ Page background #F4F5F7, inherited from the shell — do not redeclare
✅ Primary/brand color #17181C — active tabs/chips, funnel's top segment
✅ Temperature colors are LOCKED and must match Step 1's donut exactly:
   Hot #F5365C red · Warm #FB6340 orange · Cold #8392AB slate grey
   (never blue for Cold — see the flagged note at the top of this prompt)
✅ Cards: 16-18px radius, elevation-1 default, elevation-2 + translateY(-2px)
   on hover
✅ No per-industry or per-manager rainbow coloring — only the temperature
   dimension gets color-coding on this screen
✅ All toasts role="alert" (none expected to fire from this screen this
   step — export still routes through the Step 1 shell's existing toast)

=============================================================
BUILD ORDER
=============================================================

1. Add funnelStages, leadsList, leadIndustries, leadManagers mock data
2. Add temperatureTab, leadIndustryFilter, leadManagerFilter,
   selectedLeadId state + filteredLeads, scopedLeads, scaledFunnel,
   temperatureColor(), navigateToLead()
3. Update the shell's placeholder logic to special-case 'leads-detail'
   with the lead-aware message + back link
4. Build the left pipeline funnel panel with proportional bars and live
   conversion % connectors
5. Build the temperature tab strip
6. Build the industry + manager filter chip rows with live results count
7. Build the lead card list with temperature-coded borders/badges
8. Wire card clicks to navigateToLead()
9. Build the empty state + Clear Filters action
10. Verify the funnel rescales correctly when industry/manager filters change
11. Verify accessibility attributes and responsive behavior from the
    sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, or Team from
  Steps 1-4.
DO NOT create a local period filter — this screen does read
  globalPeriod/globalDateRange conceptually (a real backend would scope
  leads by it), but no new period UI is needed here — the shell's strip
  already covers it.
DO NOT use blue for the Cold temperature — grey, matching Step 1's donut.
DO NOT build the real Lead Detail screen content yet — Step 6 owns that;
  this step only wires navigation and the lead-aware placeholder message.