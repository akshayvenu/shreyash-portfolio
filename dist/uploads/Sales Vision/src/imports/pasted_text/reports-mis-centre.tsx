=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
Board, Lead Detail, Executive Profile, or the Organization module from
Steps 1-9. This step ADDS the Reports & MIS Centre AND makes one required
edit to Step 1's shell (below) so the "Export" button in the global filter
strip finally does something real instead of showing a placeholder toast.
Everything else must remain intact.
Reminder of the locked palette: primary/brand #17181C, positive green
#4CAF50, negative red #F5365C.

=============================================================
STEP 10 — REPORTS & MIS CENTRE
=============================================================

Replace the 'reports' placeholder with a centralized download hub: a
left filter panel, four report template cards with their own Download
actions, and a download history table. This step also retires the
shell's "Export will be available from the Reports Centre (Step 10)"
placeholder toast that's been sitting on every screen since Step 1 — now
that this screen exists, that button actually exports something.

> **Required edit to Step 1's shell:** the global "Export" button in the
> filter strip currently fires a placeholder toast. Replace its onClick
> with a real call into the shared `performExport()` function defined
> below, exporting "{current screen's title} — Current View" as XLSX,
> and show a small inline spinner on the button while it's generating
> (reuse the same spin pattern already used on the Refresh button).
> This is the ONLY change to Step 1 — do not touch anything else in the shell.

=============================================================
MOCK DATA — ADD TO TOP OF FILE
=============================================================

const reportTemplates = [
  { id: "RPT-001", name: "Daily Call Activity Report",
    description: "All call outcomes, executive-wise, for the selected date range.",
    filters: ["Period", "Executive", "Manager"], icon: "phone" },
  { id: "RPT-002", name: "Pipeline & Lead Temperature MIS",
    description: "Hot/Warm/Cold counts, conversion rates, and industry split.",
    filters: ["Period", "Industry"], icon: "trending-up" },
  { id: "RPT-003", name: "Mapping Coverage Report",
    description: "Mapping totals by industry and customer type, with assignment status.",
    filters: ["Period", "Industry", "Customer Type"], icon: "map-pin" },
  { id: "RPT-004", name: "Executive Performance Report",
    description: "Ranked executive table with every KPI for the selected period.",
    filters: ["Period", "Manager"], icon: "bar-chart" }
];

const customerTypes = ["All", "Enterprise", "Mid-Market", "SMB", "Startup"];

// Reuses the SAME industries list already declared in Step 2 (Mapping) —
// do not redeclare it here if it already exists at the top of the file;
// this entry is shown only so the shape is clear if it needs restating.
// const industries = ["All", "BFSI", "Healthcare", "Manufacturing", "Retail", "IT/Tech"];

const initialDownloadHistory = [
  { id: 1, reportName: "Executive Performance Report", timestamp: "22 Jul 2026, 5:12 PM", format: "XLSX", period: "This Week" },
  { id: 2, reportName: "Daily Call Activity Report", timestamp: "21 Jul 2026, 11:40 AM", format: "PDF", period: "This Week" },
  { id: 3, reportName: "Mapping Coverage Report", timestamp: "19 Jul 2026, 2:05 PM", format: "XLSX", period: "This Month" },
  { id: 4, reportName: "Dashboard — Current View", timestamp: "18 Jul 2026, 9:30 AM", format: "XLSX", period: "Today" },
  { id: 5, reportName: "Pipeline & Lead Temperature MIS", timestamp: "15 Jul 2026, 4:50 PM", format: "PDF", period: "This Month" }
];

=============================================================
STATE — ADD TO STATE SECTION (downloadHistory is app-level, used by both this screen and Step 1's shell Export button)
=============================================================

const [downloadHistory, setDownloadHistory] = useState(initialDownloadHistory);
const [isShellExporting, setIsShellExporting] = useState(false); // drives the shell Export button's spinner

// Reports Centre's own filter panel state
const [reportPeriodRange, setReportPeriodRange] = useState({ start: '', end: '' });
const [reportManagerFilter, setReportManagerFilter] = useState([]); // multi-select, empty = All
const [reportExecutiveFilter, setReportExecutiveFilter] = useState('All');
const [reportIndustryFilter, setReportIndustryFilter] = useState('All');
const [reportCustomerTypeFilter, setReportCustomerTypeFilter] = useState('All');
const [reportFormat, setReportFormat] = useState('XLSX'); // 'XLSX' | 'PDF'
const [generatingTemplateId, setGeneratingTemplateId] = useState(null);

function screenPeriodLabel(period) {
  const labels = { all: 'All Time', today: 'Today', week: 'This Week', month: 'This Month' };
  return labels[period] || 'Custom Range';
}

// SHARED export engine — both this screen's template Download buttons
// and the shell's global Export button (Step 1 edit above) call this.
function performExport({ reportName, format }) {
  return new Promise(resolve => {
    const isLargeRange = globalPeriod === 'custom'; // treat any custom range as
      // potentially "large" for the purposes of showing a progress indicator
    const duration = format === 'PDF' ? (isLargeRange ? 3200 : 1800) : (isLargeRange ? 2200 : 1200);
    setTimeout(() => {
      const entry = {
        id: Date.now(),
        reportName,
        timestamp: new Date().toLocaleString('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }),
        format,
        period: globalPeriod === 'custom'
          ? `${globalDateRange.start} – ${globalDateRange.end}`
          : screenPeriodLabel(globalPeriod)
      };
      setDownloadHistory(prev => [entry, ...prev].slice(0, 10)); // keep only the last 10
      setTimeout(() => showToast(`${reportName} downloaded as ${format}`, 'success'), 0);
      resolve();
    }, duration);
  });
}

async function handleTemplateDownload(template) {
  setGeneratingTemplateId(template.id);
  await performExport({ reportName: template.name, format: reportFormat });
  setGeneratingTemplateId(null);
}

async function handleShellExport() {
  // This replaces Step 1's placeholder toast — see the required shell edit above.
  setIsShellExporting(true);
  await performExport({ reportName: `${screenTitle(screen)} — Current View`, format: 'XLSX' });
  setIsShellExporting(false);
}

function toggleReportManager(managerId) {
  setReportManagerFilter(prev =>
    prev.includes(managerId) ? prev.filter(id => id !== managerId) : [...prev, managerId]);
}

=============================================================
SCREEN — REPORTS & MIS CENTRE
=============================================================

screen: 'reports'
animation: screenEnter 280ms ease-out both

FULL STRUCTURE: display flex, gap 16px, height 100%

── LEFT FILTER PANEL (width 280px, flexShrink 0, bg white, radius 18px, elevation-1, padding 20px, display flex, flexDirection column, gap 20px) ──

Title "Filters" (Poppins 14px weight 600 #1A1A1A)

PERIOD (uses the global period from the shell strip as its baseline, plus
  its own custom range override specific to report generation):
  Label "PERIOD" (Inter 11px uppercase #67748E)
  Two native date inputs (start/end), 40px height, radius 8px, border 1px
    solid #DEE2E6 — value: reportPeriodRange.start/.end
  Small caption beneath: "Leave blank to use the current global period
    ({screenPeriodLabel(globalPeriod)})" (Inter 12px #8392AB)

MANAGER (multi-select):
  Label "MANAGER"
  Chip list from orgManagers (Step 9's shared manager pool — reused, not
    redeclared): each chip toggles via toggleReportManager(manager.id);
    active = bg #17181C white text, inactive = bg #F1F1F3 #67748E
  "All managers" implied when reportManagerFilter.length === 0

EXECUTIVE (single-select dropdown):
  Label "EXECUTIVE"
  Select: "All" + executiveDirectory.map(e => option(e.id, e.name))
  value: reportExecutiveFilter

INDUSTRY (single-select dropdown):
  Label "INDUSTRY"
  Select: options from the existing industries list (Step 2) — reuse it,
    do not redeclare
  value: reportIndustryFilter

CUSTOMER TYPE (single-select dropdown):
  Label "CUSTOMER TYPE"
  Select: options from customerTypes
  value: reportCustomerTypeFilter

DIVIDER (1px, bg #F0F0F0)

FORMAT TOGGLE:
  Label "FORMAT"
  Segmented control, two options XLSX / PDF — bg #F1F1F3, active pill
    white + elevation-1, Inter 13px weight 600
  onClick: setReportFormat(...)

── RIGHT COLUMN (flex 1, display flex, flexDirection column, gap 16px, overflowY auto) ──

REPORT TEMPLATE CARDS (display flex, flexDirection column, gap 12px):

  Each card (bg white, radius 18px, elevation-1, padding 20px, display
    flex, alignItems center, justifyContent space-between, gap 20px):

    LEFT (flex 1):
      TOP ROW: icon circle (40px, bg #17181C, white icon) + template
        name (Poppins 15px weight 600 #1A1A1A)
      Description (Inter 13px #67748E, marginTop 6px, maxWidth ~480px)
      Applicable filters row (marginTop 10px, display flex, gap 6px):
        small neutral chips (bg #F1F1F3, Inter 11px weight 600 #67748E,
        radius 6px, padding '3px 8px') — one per entry in template.filters

    RIGHT: Download button (bg #17181C, white text, height 44px, radius
      8px, minWidth 140px, display flex, alignItems center, justifyContent
      center, gap 8px):
      Default state: download icon + "Download"
      Generating state (generatingTemplateId === template.id): spinner
        (16px, white, spin animation) + "Generating…" — button disabled
        while in this state
      onClick: handleTemplateDownload(template)

      If globalPeriod === 'custom' AND generatingTemplateId === template.id:
        show a thin indeterminate progress bar (4px height, bg #DEE2E6
        track, animated #17181C sweep) directly beneath this specific
        card, since a custom range is treated as "large" per the source
        PRD's note about longer generation times

DOWNLOAD HISTORY TABLE (bg white, radius 18px, elevation-1):

  HEADER (52px, padding '0 20px', borderBottom 1px solid #F0F0F0):
    "Download History" title (Poppins 14px weight 600 #1A1A1A) + "Last
      10 downloads" caption (Inter 12.5px #8392AB) beside it

  TABLE — transparent header, bottom-border-only rows, same style as
    every other table:
    Columns: Report Name | Timestamp | Format | Period

    Format cell: small neutral badge (bg #F1F1F3, Inter 11px weight 700,
      radius 6px, padding '3px 8px') showing "XLSX" or "PDF"

    Rows from downloadHistory (most recent first — already unshifted in
      performExport())

    Empty state (downloadHistory.length === 0): centered icon + "No
      downloads yet — generate a report above to see it here"

=============================================================
ACCESSIBILITY REQUIREMENTS THIS STEP
=============================================================

- Manager filter chips: role="group" aria-label="Filter by manager", each
  chip aria-pressed reflecting active state
- Format toggle: role="radiogroup"/"radio" pattern, consistent with every
  other segmented toggle in the app
- Download buttons: while generating, aria-busy="true" and the button's
  accessible name updates to reflect "Generating {report name}", not just
  a visual spinner
- Progress bar (custom-range case): role="progressbar" even though it's
  indeterminate (omit aria-valuenow, keep aria-label describing what's
  generating)
- Download history table: same semantic table requirements as every
  other table in the app

=============================================================
RESPONSIVE BEHAVIOR THIS STEP
=============================================================

Tablet (900-1199px): filter panel moves above the report cards as a
  collapsible section instead of a fixed left column, matching the PRD's
  documented tablet requirement ("filters collapse to a slide-out drawer").
Mobile (<768px): report template cards stack their icon/description above
  the Download button instead of side-by-side; download history table
  becomes a stacked card list.

=============================================================
EVERY INTERACTION — FUNCTIONAL CHECKLIST
=============================================================

  ✅ Manager chips are multi-select and toggle independently
  ✅ Executive/Industry/Customer Type dropdowns update their respective
     filter state
  ✅ Format toggle switches between XLSX and PDF
  ✅ Clicking any template's Download button shows that button's own
     "Generating…" state (and ONLY that button, not all four at once)
  ✅ After the simulated generation completes, a new row appears at the
     top of Download History with the correct report name, a real
     timestamp, the selected format, and the correct period label
  ✅ A success toast fires naming the report and format
  ✅ Download History never exceeds 10 rows — the oldest entry drops off
     once an 11th is added
  ✅ The shell's global "Export" button (Step 1) now calls
     handleShellExport() instead of showing the old placeholder toast,
     shows its own spinner while exporting, and its result also appears
     in Download History as "{Screen Title} — Current View"
  ✅ Custom global period shows the progress bar under the generating
     template card; non-custom periods do not

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Poppins for titles; Inter for everything else
✅ Page background #F4F5F7, inherited from the shell — do not redeclare
✅ Primary/brand color #17181C — Download buttons, icon circles, active
   format pill, active manager chips
✅ Reuse orgManagers (Step 9), executiveDirectory (Step 7), and the
   existing industries list (Step 2) — do not redeclare any of these
✅ Format/status badges are neutral chips here (bg #F1F1F3), not the
   solid-fill status pills used for Active/Inactive elsewhere — XLSX/PDF
   is a format label, not a status
✅ Cards: 18px radius, elevation-1
✅ Tables: transparent header, bottom-border-only rows, no zebra striping
✅ All toasts role="alert"
✅ Only ONE button shows "Generating…" at a time per template — never
   disable or spin every Download button simultaneously

=============================================================
BUILD ORDER
=============================================================

1. Add reportTemplates, customerTypes, initialDownloadHistory mock data
   (confirm industries list already exists from Step 2, don't redeclare)
2. Add downloadHistory, isShellExporting, and the Reports Centre's own
   filter state + performExport(), handleTemplateDownload(),
   handleShellExport(), toggleReportManager(), screenPeriodLabel()
3. Update Step 1's shell Export button to call handleShellExport()
   instead of the old placeholder toast, with its own spinner state
4. Build the left filter panel (period override, manager chips,
   executive/industry/customer-type dropdowns, format toggle)
5. Build the 4 report template cards with description, filter chips, and
   the Download button's default/generating states
6. Build the conditional progress bar for custom-period generation
7. Build the Download History table with the correct empty state
8. Wire handleTemplateDownload() and confirm the 10-row cap and toast firing
9. Test the shell's Export button from at least 2 different screens
   (e.g. Dashboard and Calls) and confirm both log correctly to Download
   History with the right screen title
10. Verify accessibility attributes and responsive behavior from the
    sections above

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT rebuild Sign-In, App Shell, Dashboard, Mapping, Calls, Team, Leads
  Board, Lead Detail, Executive Profile, or the Organization module beyond
  the one required Export-button edit called out at the top.
DO NOT let more than one template's Download button show "Generating…"
  at the same time.
DO NOT let Download History grow past 10 entries.
DO NOT redeclare orgManagers, executiveDirectory, or the industries list —
  reuse them exactly as established in Steps 9, 7, and 2.