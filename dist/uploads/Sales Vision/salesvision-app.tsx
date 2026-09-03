const { useState, useEffect, useRef, useCallback } = React;
const { Toaster, toast } = window.__sonner;

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const director = {
  name: "Vikram Malhotra",
  initials: "VM",
  role: "Director",
  email: "vikram.malhotra@salesvisionai.com",
  phone: "+91 98765 00001",
  timezone: "Asia/Kolkata (IST)",
  joinedDate: "Jan 8, 2025",
  accessLevel: "enterprise",
  departmentNames: [] as string[],
  companyName: "SalesVision",
  canManageOrg: true,
};

const dashboardKpis = {
  callsMade: 4820, callsMadeDelta: 12.4,
  totalMappings: 1360, totalMappingsDelta: 6.1,
  hotLeads: 214, hotLeadsDelta: -3.2,
  connectedCalls: 2115, connectRate: 43.9,
};

const callOutcomesTrend = [
  { date: "Mon", accepted: 310, no_response: 180, rejected: 90 },
  { date: "Tue", accepted: 340, no_response: 165, rejected: 100 },
  { date: "Wed", accepted: 295, no_response: 200, rejected: 85 },
  { date: "Thu", accepted: 360, no_response: 150, rejected: 95 },
  { date: "Fri", accepted: 410, no_response: 140, rejected: 70 },
  { date: "Sat", accepted: 220, no_response: 190, rejected: 60 },
  { date: "Sun", accepted: 180, no_response: 210, rejected: 55 },
];

const leadTemperature = { cold: 640, warm: 506, hot: 214 };

const executivesList = [
  { id: "EXE-001", name: "Aarav Shah", initials: "AS", managerName: "Rahul Verma", callsPeriod: 312, connectedPeriod: 168, hotLeads: 14, warmLeads: 28, connectRate: 53.8, callsToday: 22 },
  { id: "EXE-002", name: "Diya Mehta", initials: "DM", managerName: "Anita Desai", callsPeriod: 288, connectedPeriod: 140, hotLeads: 11, warmLeads: 24, connectRate: 48.6, callsToday: 19 },
  { id: "EXE-003", name: "Rohan Gupta", initials: "RG", managerName: "Rahul Verma", callsPeriod: 201, connectedPeriod: 76, hotLeads: 4, warmLeads: 15, connectRate: 37.8, callsToday: 12 },
  { id: "EXE-004", name: "Kavya Iyer", initials: "KI", managerName: "Meera Singh", callsPeriod: 356, connectedPeriod: 201, hotLeads: 19, warmLeads: 31, connectRate: 56.4, callsToday: 27 },
  { id: "EXE-005", name: "Ishaan Bose", initials: "IB", managerName: "Arjun Nair", callsPeriod: 142, connectedPeriod: 39, hotLeads: 2, warmLeads: 9, connectRate: 27.5, callsToday: 6 },
  { id: "EXE-006", name: "Priya Nambiar", initials: "PN", managerName: "Anita Desai", callsPeriod: 274, connectedPeriod: 151, hotLeads: 13, warmLeads: 22, connectRate: 55.1, callsToday: 21 },
];

const managersList = [
  { id: "MGR-001", name: "Rahul Verma", initials: "RV", department: "Enterprise Sales", teamSize: 6, callsPeriod: 980, connectedPeriod: 512, hotLeads: 41, warmLeads: 88, connectRate: 52.2, callsToday: 68 },
  { id: "MGR-002", name: "Anita Desai", initials: "AD", department: "SMB Sales", teamSize: 5, callsPeriod: 845, connectedPeriod: 401, hotLeads: 33, warmLeads: 70, connectRate: 47.5, callsToday: 55 },
  { id: "MGR-003", name: "Kiran Patel", initials: "KP", department: "Enterprise Sales", teamSize: 4, callsPeriod: 520, connectedPeriod: 198, hotLeads: 15, warmLeads: 40, connectRate: 38.1, callsToday: 30 },
  { id: "MGR-004", name: "Meera Singh", initials: "MS", department: "Strategic Accounts", teamSize: 5, callsPeriod: 902, connectedPeriod: 487, hotLeads: 37, warmLeads: 65, connectRate: 54.0, callsToday: 61 },
  { id: "MGR-005", name: "Arjun Nair", initials: "AN", department: "SMB Sales", teamSize: 3, callsPeriod: 310, connectedPeriod: 92, hotLeads: 6, warmLeads: 20, connectRate: 29.7, callsToday: 14 },
];

// ─── MAPPING MOCK DATA ────────────────────────────────────────────────────────

const industries = ["All", "BFSI", "Healthcare", "Manufacturing", "Retail", "IT/Tech"];

const mappingByIndustry = [
  { industry: "BFSI", totalMapped: 412, assigned: 340, unassigned: 72, callsInitiated: 198, coveragePct: 58 },
  { industry: "Healthcare", totalMapped: 268, assigned: 190, unassigned: 78, callsInitiated: 121, coveragePct: 45 },
  { industry: "Manufacturing", totalMapped: 205, assigned: 110, unassigned: 95, callsInitiated: 40, coveragePct: 32 },
  { industry: "Retail", totalMapped: 88, assigned: 20, unassigned: 68, callsInitiated: 5, coveragePct: 18 },
  { industry: "IT/Tech", totalMapped: 387, assigned: 301, unassigned: 86, callsInitiated: 210, coveragePct: 61 },
];

const mappingKpis = {
  totalMapped: mappingByIndustry.reduce((s, r) => s + r.totalMapped, 0),
  totalMappedDelta: 6.1,
  totalAssigned: mappingByIndustry.reduce((s, r) => s + r.assigned, 0),
  totalAssignedDelta: 4.3,
  totalUnassigned: mappingByIndustry.reduce((s, r) => s + r.unassigned, 0),
  totalUnassignedDelta: -2.7,
  avgCoveragePct: 42.8,
  avgCoveragePctDelta: 3.9,
};

const managerMappingOverview = [
  { managerId: "MGR-001", managerName: "Rahul Verma", initials: "RV", department: "Enterprise Sales", teamSize: 6, mappingCount: 310, assignedLeads: 260, callCoveragePct: 56 },
  { managerId: "MGR-002", managerName: "Anita Desai", initials: "AD", department: "SMB Sales", teamSize: 5, mappingCount: 275, assignedLeads: 198, callCoveragePct: 41 },
  { managerId: "MGR-003", managerName: "Kiran Patel", initials: "KP", department: "Enterprise Sales", teamSize: 4, mappingCount: 190, assignedLeads: 96, callCoveragePct: 28 },
  { managerId: "MGR-004", managerName: "Meera Singh", initials: "MS", department: "Strategic Accounts", teamSize: 5, mappingCount: 265, assignedLeads: 231, callCoveragePct: 53 },
  { managerId: "MGR-005", managerName: "Arjun Nair", initials: "AN", department: "SMB Sales", teamSize: 3, mappingCount: 120, assignedLeads: 47, callCoveragePct: 19 },
];

function coverageTier(pct: number) {
  if (pct >= 50) return { bg: "#E7F7EC", color: "#4CAF50" };
  if (pct >= 25) return { bg: "#FFF3E6", color: "#FB6340" };
  return { bg: "#FDE8EC", color: "#F5365C" };
}

const notifications = [
  { id: 1, title: "Hot lead surge — Enterprise Sales", body: "14 new Hot leads logged in the last 24h under Rahul Verma's team", time: "2h ago", read: false, type: "lead" },
  { id: 2, title: "Weekly report ready", body: "Executive Performance Report for this week has finished generating", time: "5h ago", read: false, type: "report" },
  { id: 3, title: "Coverage drop — Retail industry", body: "Retail mapping coverage fell to 22% this week", time: "Yesterday", read: true, type: "mapping" },
  { id: 4, title: "New manager added", body: "Meera Singh was added to Strategic Accounts", time: "3 days ago", read: true, type: "team" },
];

// ─── CALLS MOCK DATA ─────────────────────────────────────────────────────────

const callExecutives = [
  { id: "EXE-001", name: "Aarav Shah",    initials: "AS", managerId: "MGR-001", managerName: "Rahul Verma",  made: 312, received: 168, notPicked: 98,  notInterested: 46, connectPct: 53.8 },
  { id: "EXE-003", name: "Rohan Gupta",   initials: "RG", managerId: "MGR-001", managerName: "Rahul Verma",  made: 201, received: 76,  notPicked: 88,  notInterested: 37, connectPct: 37.8 },
  { id: "EXE-002", name: "Diya Mehta",    initials: "DM", managerId: "MGR-002", managerName: "Anita Desai",  made: 288, received: 140, notPicked: 102, notInterested: 46, connectPct: 48.6 },
  { id: "EXE-006", name: "Priya Nambiar", initials: "PN", managerId: "MGR-002", managerName: "Anita Desai",  made: 274, received: 151, notPicked: 89,  notInterested: 34, connectPct: 55.1 },
  { id: "EXE-007", name: "Meher Chopra",  initials: "MC", managerId: "MGR-003", managerName: "Kiran Patel",  made: 165, received: 52,  notPicked: 84,  notInterested: 29, connectPct: 31.5 },
  { id: "EXE-004", name: "Kavya Iyer",    initials: "KI", managerId: "MGR-004", managerName: "Meera Singh",  made: 356, received: 201, notPicked: 105, notInterested: 50, connectPct: 56.4 },
  { id: "EXE-005", name: "Ishaan Bose",   initials: "IB", managerId: "MGR-005", managerName: "Arjun Nair",   made: 142, received: 39,  notPicked: 76,  notInterested: 27, connectPct: 27.5 },
];

const callManagers = [
  { id: "MGR-001", name: "Rahul Verma", initials: "RV", department: "Enterprise Sales",  teamSize: 6, made: 980, received: 512, notPicked: 320, notInterested: 148, connectPct: 52.2 },
  { id: "MGR-002", name: "Anita Desai", initials: "AD", department: "SMB Sales",          teamSize: 5, made: 845, received: 401, notPicked: 296, notInterested: 148, connectPct: 47.5 },
  { id: "MGR-003", name: "Kiran Patel", initials: "KP", department: "Enterprise Sales",  teamSize: 4, made: 520, received: 198, notPicked: 234, notInterested: 88,  connectPct: 38.1 },
  { id: "MGR-004", name: "Meera Singh", initials: "MS", department: "Strategic Accounts",teamSize: 5, made: 902, received: 487, notPicked: 280, notInterested: 135, connectPct: 54.0 },
  { id: "MGR-005", name: "Arjun Nair",  initials: "AN", department: "SMB Sales",          teamSize: 3, made: 310, received: 92,  notPicked: 152, notInterested: 66,  connectPct: 29.7 },
];

const callsKpis = {
  totalCalls:       callExecutives.reduce((s, e) => s + e.made, 0),        totalCallsDelta: 8.7,
  received:         callExecutives.reduce((s, e) => s + e.received, 0),    receivedDelta: 5.2,
  notPicked:        callExecutives.reduce((s, e) => s + e.notPicked, 0),   notPickedDelta: -1.9,
  notInterested:    callExecutives.reduce((s, e) => s + e.notInterested, 0), notInterestedDelta: -3.4,
};

// ─── LEADS MOCK DATA ──────────────────────────────────────────────────────────

const funnelStages = [
  { stage: "Mapped",    count: 1360 },
  { stage: "Assigned",  count: 1030 },
  { stage: "Call Made", count: 812 },
  { stage: "Warm",      count: 506 },
  { stage: "Hot",       count: 214 },
];

const leadsList = [
  { id: "LEAD-001", companyName: "Vantage Financial Corp",   industry: "BFSI",          temperature: "hot",  assignedExecutive: "Aarav Shah",    managerName: "Rahul Verma",  lastCallDate: "Jul 22, 2026", currentStage: "Contract Discussion", daysInPipeline: 18, dateMapped: "Jul 5, 2026",  totalCalls: 6, connectedCalls: 5, nextAction: "Finalize MSA redlines with legal" },
  { id: "LEAD-002", companyName: "Meridian Health Group",    industry: "Healthcare",    temperature: "hot",  assignedExecutive: "Kavya Iyer",    managerName: "Meera Singh",  lastCallDate: "Jul 23, 2026", currentStage: "Meeting Done",        daysInPipeline: 12, dateMapped: "Jul 11, 2026", totalCalls: 4, connectedCalls: 4, nextAction: "Send updated proposal post-demo" },
  { id: "LEAD-003", companyName: "Northfield Manufacturing", industry: "Manufacturing", temperature: "warm", assignedExecutive: "Diya Mehta",    managerName: "Anita Desai",  lastCallDate: "Jul 21, 2026", currentStage: "Information Sent",    daysInPipeline:  7, dateMapped: "Jul 14, 2026", totalCalls: 3, connectedCalls: 2, nextAction: "Follow up on deck sent — schedule demo call" },
  { id: "LEAD-004", companyName: "Skyline Retail Ventures",  industry: "Retail",        temperature: "cold", assignedExecutive: "Ishaan Bose",   managerName: "Arjun Nair",   lastCallDate: "Jul 10, 2026", currentStage: "Not Interested",      daysInPipeline: 21, dateMapped: "Jul 2, 2026",  totalCalls: 3, connectedCalls: 1, nextAction: "No further action — marked not interested" },
  { id: "LEAD-005", companyName: "Corewave IT Solutions",    industry: "IT/Tech",       temperature: "hot",  assignedExecutive: "Priya Nambiar", managerName: "Anita Desai",  lastCallDate: "Jul 23, 2026", currentStage: "Meeting Scheduled",   daysInPipeline:  9, dateMapped: "Jul 14, 2026", totalCalls: 4, connectedCalls: 3, nextAction: "Confirm attendees and send calendar invite" },
  { id: "LEAD-006", companyName: "Aster Wellness Clinics",   industry: "Healthcare",    temperature: "warm", assignedExecutive: "Meher Chopra",  managerName: "Kiran Patel",  lastCallDate: "Jul 20, 2026", currentStage: "Information Sent",    daysInPipeline:  5, dateMapped: "Jul 15, 2026", totalCalls: 2, connectedCalls: 2, nextAction: "Check in on brochure review next week" },
  { id: "LEAD-007", companyName: "Bharat Steel Industries",  industry: "Manufacturing", temperature: "cold", assignedExecutive: "Rohan Gupta",   managerName: "Rahul Verma",  lastCallDate: "Jul  8, 2026", currentStage: "Not Picked Up",       daysInPipeline: 25, dateMapped: "Jun 29, 2026", totalCalls: 4, connectedCalls: 1, nextAction: "Try alternate contact number after 3 missed calls" },
  { id: "LEAD-008", companyName: "Zenith Capital Partners",  industry: "BFSI",          temperature: "warm", assignedExecutive: "Aarav Shah",    managerName: "Rahul Verma",  lastCallDate: "Jul 22, 2026", currentStage: "Call Received",       daysInPipeline:  4, dateMapped: "Jul 18, 2026", totalCalls: 2, connectedCalls: 2, nextAction: "Send product overview and pricing sheet" },
  { id: "LEAD-009", companyName: "Pinnacle Cloud Systems",   industry: "IT/Tech",       temperature: "hot",  assignedExecutive: "Kavya Iyer",    managerName: "Meera Singh",  lastCallDate: "Jul 23, 2026", currentStage: "Contract Discussion", daysInPipeline: 15, dateMapped: "Jul 8, 2026",  totalCalls: 5, connectedCalls: 5, nextAction: "Get legal sign-off on SLA terms by Friday" },
  { id: "LEAD-010", companyName: "Coastal Retail Group",     industry: "Retail",        temperature: "cold", assignedExecutive: "Diya Mehta",    managerName: "Anita Desai",  lastCallDate: "Jul  5, 2026", currentStage: "Not Interested",      daysInPipeline: 30, dateMapped: "Jun 24, 2026", totalCalls: 5, connectedCalls: 1, nextAction: "Archive — declined for this quarter" },
];

const leadActivityLogs: Record<string, { date: string; action: string; outcome: string; duration: string; note: string }[]> = {
  "LEAD-001": [
    { date: "Jul 5, 2026 · 10:12 AM",  action: "Cold call",           outcome: "Call Received",  duration: "4m 12s", note: "Spoke with CFO, expressed interest in the cost-reduction angle." },
    { date: "Jul 9, 2026 · 3:40 PM",   action: "Information sent",    outcome: "Email + Deck",   duration: "—",      note: "Sent the product deck and pricing tiers as requested." },
    { date: "Jul 14, 2026 · 11:00 AM", action: "Follow-up call",      outcome: "Call Received",  duration: "9m 30s", note: "Discussed implementation timeline, requested a live demo." },
    { date: "Jul 18, 2026 · 2:00 PM",  action: "Meeting",             outcome: "Meeting Done",   duration: "32m",    note: "Live demo with the procurement team — positive reception." },
    { date: "Jul 22, 2026 · 4:15 PM",  action: "Contract discussion", outcome: "In Negotiation", duration: "18m",    note: "Reviewing MSA redlines with legal." },
  ],
  "LEAD-002": [
    { date: "Jul 11, 2026 · 9:30 AM",  action: "Cold call",        outcome: "Call Received", duration: "5m 05s",  note: "Spoke with Head of Ops, flagged a staffing-efficiency use case." },
    { date: "Jul 15, 2026 · 1:15 PM",  action: "Information sent", outcome: "Brochure",      duration: "—",       note: "Shared case studies from two comparable healthcare groups." },
    { date: "Jul 19, 2026 · 10:45 AM", action: "Follow-up call",   outcome: "Call Received", duration: "11m 20s", note: "Confirmed budget window for this quarter, scheduled a demo." },
    { date: "Jul 23, 2026 · 3:00 PM",  action: "Meeting",          outcome: "Meeting Done",  duration: "40m",     note: "Demo completed, stakeholders aligned — awaiting updated proposal." },
  ],
  "LEAD-004": [
    { date: "Jul 2, 2026 · 2:20 PM",  action: "Cold call",     outcome: "Call Received",  duration: "2m 40s", note: "Brief conversation, asked to call back next week." },
    { date: "Jul 6, 2026 · 11:00 AM", action: "Follow-up call", outcome: "Not Picked Up", duration: "—",      note: "" },
    { date: "Jul 10, 2026 · 4:30 PM", action: "Follow-up call", outcome: "Not Interested", duration: "3m 10s", note: "Client stated they've committed to an existing vendor for this cycle." },
  ],
};

function generateFallbackTimeline(lead: typeof leadsList[0]) {
  const entries: { date: string; action: string; outcome: string; duration: string; note: string }[] = [
    { date: lead.dateMapped ? `${lead.dateMapped} · 10:00 AM` : "—", action: "Cold call",
      outcome: "Call Received", duration: "5m 00s", note: `Initial contact with ${lead.companyName}.` },
  ];
  if (lead.temperature !== "cold") {
    entries.push({ date: lead.lastCallDate + " · 1:00 PM", action: "Follow-up call",
      outcome: lead.temperature === "hot" ? "Meeting Done" : "Information Sent",
      duration: "12m 00s", note: `Currently at "${lead.currentStage}."` });
  } else {
    entries.push({ date: lead.lastCallDate + " · 1:00 PM", action: "Follow-up call",
      outcome: lead.currentStage, duration: "—", note: "" });
  }
  return entries;
}

function getLeadTimeline(leadId: string, lead: typeof leadsList[0]) {
  return leadActivityLogs[leadId] ?? generateFallbackTimeline(lead);
}

const leadIndustries = ["All", "BFSI", "Healthcare", "Manufacturing", "Retail", "IT/Tech"];
const leadManagers   = ["All", "Rahul Verma", "Anita Desai", "Kiran Patel", "Meera Singh", "Arjun Nair"];

function temperatureColor(temp: string) {
  // LOCKED to match Step 1's Lead Temperature donut — Cold = slate grey, NOT blue
  if (temp === "hot")  return { border: "#F5365C", bg: "#FDE8EC", label: "Hot" };
  if (temp === "warm") return { border: "#FB6340", bg: "#FFF3E6", label: "Warm" };
  return                      { border: "#8392AB", bg: "#F1F1F3", label: "Cold" };
}

// ─── SETTINGS MOCK DATA ───────────────────────────────────────────────────────

const initialNotificationPrefs = {
  hotLeadAlerts: true,
  weeklyReportReady: true,
  mappingCoverageDrops: true,
  teamOrgChanges: false,
  productUpdates: false,
};

const notificationPrefLabels = [
  { key: "hotLeadAlerts",       label: "Hot Lead Alerts",               description: "Notify me when a lead moves to Hot temperature." },
  { key: "weeklyReportReady",   label: "Weekly Report Ready",           description: "Notify me when the scheduled weekly report finishes generating." },
  { key: "mappingCoverageDrops",label: "Mapping Coverage Drops",        description: "Notify me if an industry's coverage falls below 25%." },
  { key: "teamOrgChanges",      label: "Team & Organization Changes",   description: "Notify me when a department, team, or manager is added." },
  { key: "productUpdates",      label: "Product Updates",               description: "Occasional updates about new SalesVision features." },
] as const;

const initialSessions = [
  { id: 1, device: "Chrome on Windows",  location: "Mumbai, IN",    lastActive: "Active now",  current: true  },
  { id: 2, device: "Safari on iPhone",   location: "Mumbai, IN",    lastActive: "2 hours ago", current: false },
  { id: 3, device: "Chrome on MacBook",  location: "Bengaluru, IN", lastActive: "3 days ago",  current: false },
];

// ─── COMMAND PALETTE & SAVED VIEWS MOCK DATA ──────────────────────────────────

const initialSavedViews = [
  { id: 1, name: "This Week — Hot Leads", screen: "leads",
    globalPeriod: "week", globalDateRange: { start: "", end: "" },
    screenFilters: { temperatureTab: "hot", leadIndustryFilter: "All", leadManagerFilter: "All" } },
  { id: 2, name: "Enterprise Sales — Calls", screen: "calls",
    globalPeriod: "month", globalDateRange: { start: "", end: "" },
    screenFilters: { callsView: "executives", selectedManagerIds: ["MGR-001"] } },
];

// ─── REPORTS MOCK DATA ────────────────────────────────────────────────────────

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
    filters: ["Period", "Manager"], icon: "bar-chart" },
];

const customerTypes = ["All", "Enterprise", "Mid-Market", "SMB", "Startup"];

const initialDownloadHistory = [
  { id: 1, reportName: "Executive Performance Report",      timestamp: "22 Jul 2026, 5:12 PM",  format: "XLSX", period: "This Week"  },
  { id: 2, reportName: "Daily Call Activity Report",        timestamp: "21 Jul 2026, 11:40 AM", format: "PDF",  period: "This Week"  },
  { id: 3, reportName: "Mapping Coverage Report",           timestamp: "19 Jul 2026, 2:05 PM",  format: "XLSX", period: "This Month" },
  { id: 4, reportName: "Dashboard — Current View",          timestamp: "18 Jul 2026, 9:30 AM",  format: "XLSX", period: "Today"      },
  { id: 5, reportName: "Pipeline & Lead Temperature MIS",   timestamp: "15 Jul 2026, 4:50 PM",  format: "PDF",  period: "This Month" },
];

// ─── ORGANIZATION MOCK DATA ───────────────────────────────────────────────────

type DeptRecord = { id: string; name: string; teamCount: number; managerCount: number; executiveCount: number; totalCalls: number; totalConversions: number };
type TeamRecord = { id: string; name: string; managerName: string; mappingUploaded: number; callsDone: number; followUpsMeetings: number; conversions: number; executiveCount: number };

const initialDepartments: DeptRecord[] = [
  { id: "DEPT-001", name: "Enterprise Sales",   teamCount: 2, managerCount: 2, executiveCount: 10, totalCalls: 1500, totalConversions: 84 },
  { id: "DEPT-002", name: "SMB Sales",          teamCount: 2, managerCount: 2, executiveCount:  8, totalCalls: 1155, totalConversions: 61 },
  { id: "DEPT-003", name: "Strategic Accounts", teamCount: 1, managerCount: 1, executiveCount:  5, totalCalls:  902, totalConversions: 47 },
];

const initialTeamsByDepartment: Record<string, TeamRecord[]> = {
  "DEPT-001": [
    { id: "TEAM-001", name: "Enterprise Team A",      managerName: "Rahul Verma",  mappingUploaded: 412, callsDone: 980, followUpsMeetings: 62, conversions: 48, executiveCount: 6 },
    { id: "TEAM-002", name: "Enterprise Team B",      managerName: "Kiran Patel",  mappingUploaded: 205, callsDone: 520, followUpsMeetings: 31, conversions: 36, executiveCount: 4 },
  ],
  "DEPT-002": [
    { id: "TEAM-003", name: "SMB Team A",             managerName: "Anita Desai",  mappingUploaded: 275, callsDone: 845, followUpsMeetings: 54, conversions: 39, executiveCount: 5 },
    { id: "TEAM-004", name: "SMB Team B",             managerName: "Arjun Nair",   mappingUploaded: 120, callsDone: 310, followUpsMeetings: 18, conversions: 22, executiveCount: 3 },
  ],
  "DEPT-003": [
    { id: "TEAM-005", name: "Strategic Accounts Team", managerName: "Meera Singh", mappingUploaded: 265, callsDone: 902, followUpsMeetings: 58, conversions: 47, executiveCount: 5 },
  ],
};

// ─── TEAM DETAIL MOCK DATA ────────────────────────────────────────────────────

const teamExecutivesByTeam: Record<string, { id: string; name: string; initials: string; mapping: number; callsDone: number; followUps: number; meetings: number; conversions: number }[]> = {
  "TEAM-001": [
    { id: "EXE-001", name: "Aarav Shah",    initials: "AS", mapping: 210, callsDone: 312, followUps: 18, meetings: 6, conversions: 22 },
    { id: "EXE-003", name: "Rohan Gupta",   initials: "RG", mapping: 202, callsDone: 201, followUps: 11, meetings: 3, conversions: 14 },
  ],
  "TEAM-002": [
    { id: "EXE-007", name: "Meher Chopra",  initials: "MC", mapping: 205, callsDone: 165, followUps:  9, meetings: 2, conversions:  9 },
  ],
  "TEAM-003": [
    { id: "EXE-002", name: "Diya Mehta",    initials: "DM", mapping: 140, callsDone: 288, followUps: 16, meetings: 5, conversions: 19 },
    { id: "EXE-006", name: "Priya Nambiar", initials: "PN", mapping: 135, callsDone: 274, followUps: 15, meetings: 5, conversions: 20 },
  ],
  "TEAM-004": [
    { id: "EXE-005", name: "Ishaan Bose",   initials: "IB", mapping: 120, callsDone: 142, followUps:  7, meetings: 1, conversions:  8 },
  ],
  "TEAM-005": [
    { id: "EXE-004", name: "Kavya Iyer",    initials: "KI", mapping: 265, callsDone: 356, followUps: 20, meetings: 7, conversions: 24 },
  ],
};

const teamActivityByTeam: Record<string, { color: string; text: string; time: string }[]> = {
  "TEAM-001": [
    { color: "#4CAF50", text: "Aarav Shah closed a Hot lead — Vantage Financial Corp",      time: "2h ago" },
    { color: "#8392AB", text: "Rohan Gupta logged 14 calls today",                          time: "5h ago" },
    { color: "#4CAF50", text: "Meeting completed with Zenith Capital Partners",              time: "Yesterday" },
    { color: "#FB6340", text: "Mapping coverage dropped below 55% for BFSI",                time: "2 days ago" },
  ],
  "TEAM-003": [
    { color: "#4CAF50", text: "Diya Mehta scheduled a demo with Corewave IT Solutions",     time: "3h ago" },
    { color: "#8392AB", text: "Priya Nambiar logged 21 calls today",                        time: "6h ago" },
    { color: "#4CAF50", text: "New lead marked Warm — Aster Wellness Clinics",              time: "Yesterday" },
    { color: "#F5365C", text: "Coastal Retail Group marked Not Interested",                 time: "3 days ago" },
  ],
};

const initialOrgManagers = [
  { id: "MGR-001", name: "Rahul Verma", email: "rahul.verma@salesvisionai.com" },
  { id: "MGR-002", name: "Anita Desai", email: "anita.desai@salesvisionai.com" },
  { id: "MGR-003", name: "Kiran Patel", email: "kiran.patel@salesvisionai.com" },
  { id: "MGR-004", name: "Meera Singh", email: "meera.singh@salesvisionai.com" },
  { id: "MGR-005", name: "Arjun Nair",  email: "arjun.nair@salesvisionai.com"  },
];

function generateId(prefix: string, existingItems: unknown[]) {
  return `${prefix}-${String(existingItems.length + 1).padStart(3, "0")}`;
}
function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let pw = "";
  for (let i = 0; i < 12; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw;
}

// ─── EXECUTIVE DIRECTORY ──────────────────────────────────────────────────────

const executiveDirectory = [
  { id: "EXE-001", name: "Aarav Shah",    initials: "AS", email: "aarav.shah@salesvisionai.com",    phone: "+91 98765 22011", managerId: "MGR-001", managerName: "Rahul Verma",  department: "Enterprise Sales",   joinedDate: "Feb 12, 2025" },
  { id: "EXE-002", name: "Diya Mehta",    initials: "DM", email: "diya.mehta@salesvisionai.com",    phone: "+91 98765 22012", managerId: "MGR-002", managerName: "Anita Desai",  department: "SMB Sales",          joinedDate: "Apr 3, 2025" },
  { id: "EXE-003", name: "Rohan Gupta",   initials: "RG", email: "rohan.gupta@salesvisionai.com",   phone: "+91 98765 22013", managerId: "MGR-001", managerName: "Rahul Verma",  department: "Enterprise Sales",   joinedDate: "Jun 20, 2025" },
  { id: "EXE-004", name: "Kavya Iyer",    initials: "KI", email: "kavya.iyer@salesvisionai.com",    phone: "+91 98765 22014", managerId: "MGR-004", managerName: "Meera Singh",  department: "Strategic Accounts", joinedDate: "Jan 8, 2025" },
  { id: "EXE-005", name: "Ishaan Bose",   initials: "IB", email: "ishaan.bose@salesvisionai.com",   phone: "+91 98765 22015", managerId: "MGR-005", managerName: "Arjun Nair",   department: "SMB Sales",          joinedDate: "May 15, 2025" },
  { id: "EXE-006", name: "Priya Nambiar", initials: "PN", email: "priya.nambiar@salesvisionai.com", phone: "+91 98765 22016", managerId: "MGR-002", managerName: "Anita Desai",  department: "SMB Sales",          joinedDate: "Mar 1, 2025" },
  { id: "EXE-007", name: "Meher Chopra",  initials: "MC", email: "meher.chopra@salesvisionai.com",  phone: "+91 98765 22017", managerId: "MGR-003", managerName: "Kiran Patel",  department: "Enterprise Sales",   joinedDate: "Jul 22, 2025" },
];

function getExecutiveProfile(executiveId: string) {
  const identity      = executiveDirectory.find(e => e.id === executiveId);
  const performance   = teamExecutives.find(e => e.id === executiveId);
  const callBreakdown = callExecutives.find(e => e.id === executiveId);
  const assignedLeads = leadsList.filter(l => l.assignedExecutive === identity?.name);
  return { identity, performance, callBreakdown, assignedLeads };
}

// ─── TEAM MOCK DATA ───────────────────────────────────────────────────────────

const teamExecutives = [
  { id: "EXE-001", name: "Aarav Shah",    initials: "AS", managerId: "MGR-001", managerName: "Rahul Verma",  callsMade: 312, connectPct: 53.8, hotLeads: 14, warmLeads: 28, dailyTrend: [38,45,41,50,47,44,47] },
  { id: "EXE-003", name: "Rohan Gupta",   initials: "RG", managerId: "MGR-001", managerName: "Rahul Verma",  callsMade: 201, connectPct: 37.8, hotLeads:  4, warmLeads: 15, dailyTrend: [30,28,25,33,29,27,29] },
  { id: "EXE-002", name: "Diya Mehta",    initials: "DM", managerId: "MGR-002", managerName: "Anita Desai",  callsMade: 288, connectPct: 48.6, hotLeads: 11, warmLeads: 24, dailyTrend: [40,42,38,44,41,39,44] },
  { id: "EXE-006", name: "Priya Nambiar", initials: "PN", managerId: "MGR-002", managerName: "Anita Desai",  callsMade: 274, connectPct: 55.1, hotLeads: 13, warmLeads: 22, dailyTrend: [36,40,39,41,40,38,40] },
  { id: "EXE-007", name: "Meher Chopra",  initials: "MC", managerId: "MGR-003", managerName: "Kiran Patel",  callsMade: 165, connectPct: 31.5, hotLeads:  3, warmLeads: 11, dailyTrend: [22,24,20,25,23,25,26] },
  { id: "EXE-004", name: "Kavya Iyer",    initials: "KI", managerId: "MGR-004", managerName: "Meera Singh",  callsMade: 356, connectPct: 56.4, hotLeads: 19, warmLeads: 31, dailyTrend: [45,48,50,52,49,53,59] },
  { id: "EXE-005", name: "Ishaan Bose",   initials: "IB", managerId: "MGR-005", managerName: "Arjun Nair",   callsMade: 142, connectPct: 27.5, hotLeads:  2, warmLeads:  9, dailyTrend: [18,20,19,22,20,21,22] },
];

const teamManagers = [
  { id: "MGR-001", name: "Rahul Verma", initials: "RV", department: "Enterprise Sales",   teamSize: 6, callsMade: 980, connectPct: 52.2, hotLeads: 41, warmLeads: 88 },
  { id: "MGR-002", name: "Anita Desai", initials: "AD", department: "SMB Sales",           teamSize: 5, callsMade: 845, connectPct: 47.5, hotLeads: 33, warmLeads: 70 },
  { id: "MGR-003", name: "Kiran Patel", initials: "KP", department: "Enterprise Sales",   teamSize: 4, callsMade: 520, connectPct: 38.1, hotLeads: 15, warmLeads: 40 },
  { id: "MGR-004", name: "Meera Singh", initials: "MS", department: "Strategic Accounts", teamSize: 5, callsMade: 902, connectPct: 54.0, hotLeads: 37, warmLeads: 65 },
  { id: "MGR-005", name: "Arjun Nair",  initials: "AN", department: "SMB Sales",           teamSize: 3, callsMade: 310, connectPct: 29.7, hotLeads:  6, warmLeads: 20 },
];

// ─── SCREEN CONFIG ────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { id: "mapping", label: "Mapping", icon: MapIcon },
  { id: "calls", label: "Calls", icon: PhoneIcon },
  { id: "team", label: "Team", icon: TeamIcon },
  { id: "leads", label: "Leads", icon: LeadsIcon },
  { id: "organization", label: "Organization", icon: OrgIcon },
  { id: "reports", label: "Reports", icon: ReportsIcon },
];

const SCREEN_STEP_MAP: Record<string, string> = {
  leads: "Step 5",
  "leads-detail": "Step 6",
  "executive-profile": "Step 7",
  organization: "Step 8",
  "organization-department": "Step 8",
  "organization-team": "Step 8",
  reports: "Step 9",
  settings: "Step 10",
};

const SCREEN_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  mapping: "Mapping",
  calls: "Calls",
  team: "Team",
  leads: "Leads",
  "leads-detail": "Lead Detail",
  "executive-profile": "Executive Profile",
  organization: "Organization",
  "organization-department": "Department",
  "organization-team": "Team Detail",
  reports: "Reports & MIS Centre",
  settings: "Settings",
};

const PARENT_NAV: Record<string, string> = {
  "leads-detail": "leads",
  "executive-profile": "team",
  "organization-department": "organization",
  "organization-team": "organization",
};

// ─── ICON COMPONENTS ──────────────────────────────────────────────────────────

function DashboardIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function MapIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function TeamIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function LeadsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function OrgIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <rect x="9" y="16" width="6" height="6" rx="1" />
      <rect x="16" y="7" width="6" height="6" rx="1" />
      <path d="M12 8v4M5 10h4M15 10h4" />
    </svg>
  );
}
function ReportsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}
function SettingsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
function MonitorIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
function PersonIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function BellIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}
function EyeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function RefreshIcon({ size = 16, spinning = false }: { size?: number; spinning?: boolean }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ animation: spinning ? "spin 0.6s linear infinite" : "none" }}
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  );
}
function ChevronLeftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function InboxIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    </svg>
  );
}
function TargetIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function ConstructionIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M12 12h.01" />
      <path d="M8 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
}
function FlameIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-7-7c0-1.17.3-2.3.8-3.3" />
    </svg>
  );
}
function CheckIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── USE COUNT-UP HOOK ────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 600) {
  const [value, setValue] = useState(0);
  const prevRef = useRef(0);
  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = target;
    if (from === target) return;
    const start = performance.now();
    const raf = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

// ─── CUSTOM SVG BAR CHART ─────────────────────────────────────────────────────

const SERIES = [
  { key: "accepted" as const, label: "Accepted", color: "#4CAF50" },
  { key: "no_response" as const, label: "No Response", color: "#8392AB" },
  { key: "rejected" as const, label: "Rejected", color: "#F5365C" },
];

function GroupedBarChart({ data }: { data: typeof callOutcomesTrend }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; day: string; vals: { label: string; value: number; color: string }[] } | null>(null);
  const W = 520, H = 200, PL = 36, PB = 24, PT = 10;
  const chartW = W - PL;
  const chartH = H - PB - PT;
  const allVals = data.flatMap(d => [d.accepted, d.no_response, d.rejected]);
  const maxVal = Math.max(...allVals);
  const yMax = Math.ceil(maxVal / 100) * 100;
  const groupW = chartW / data.length;
  const barW = Math.floor(groupW * 0.22);
  const gap = Math.floor(groupW * 0.04);
  const groupPad = Math.floor((groupW - 3 * barW - 2 * gap) / 2);

  const yTicks = [0, yMax / 2, yMax];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
        {/* Y gridlines */}
        {yTicks.map((t, i) => {
          const y = PT + chartH - (t / yMax) * chartH;
          return (
            <g key={`ytick-${i}`}>
              <line x1={PL} x2={W} y1={y} y2={y} stroke="#F0F0F0" strokeWidth={1} />
              <text x={PL - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#8392AB" fontFamily="Inter, sans-serif">{t}</text>
            </g>
          );
        })}
        {/* Bars */}
        {data.map((d, gi) => {
          const gx = PL + gi * groupW + groupPad;
          const cx = gx + (3 * barW + 2 * gap) / 2;
          return (
            <g key={`group-${gi}`}>
              {SERIES.map((s, si) => {
                const bh = Math.max(2, (d[s.key] / yMax) * chartH);
                const bx = gx + si * (barW + gap);
                const by = PT + chartH - bh;
                return (
                  <rect
                    key={`bar-${gi}-${si}`}
                    x={bx} y={by} width={barW} height={bh}
                    fill={s.color} rx={2}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setTooltip({
                      x: cx, y: by - 8,
                      day: d.date,
                      vals: SERIES.map(sv => ({ label: sv.label, value: d[sv.key], color: sv.color })),
                    })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}
              {/* X label */}
              <text x={cx} y={H - 4} textAnchor="middle" fontSize={10} fill="#8392AB" fontFamily="Inter, sans-serif">{d.date}</text>
            </g>
          );
        })}
      </svg>
      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "absolute",
          left: `calc(${(tooltip.x / W) * 100}% - 70px)`,
          top: `calc(${(tooltip.y / H) * 100}% - 8px)`,
          background: "#1A1A1A", borderRadius: 8, padding: "8px 12px",
          pointerEvents: "none", zIndex: 20, minWidth: 140,
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, marginBottom: 4, fontFamily: "Inter, sans-serif" }}>{tooltip.day}</p>
          {tooltip.vals.map(v => (
            <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: v.color, flexShrink: 0 }} />
              <span style={{ color: "white", fontSize: 12, fontFamily: "Inter, sans-serif" }}>
                {v.label}: <strong>{v.value}</strong>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CUSTOM SVG DONUT CHART ───────────────────────────────────────────────────

function DonutChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 70, r = 44, cx = 90, cy = 90;
  let angle = -Math.PI / 2;
  const slices = data.map(d => {
    const sweep = (d.value / total) * 2 * Math.PI;
    const start = angle;
    angle += sweep;
    return { ...d, start, sweep };
  });

  const arc = (startA: number, sweepA: number, outerR: number, innerR: number) => {
    const x1 = cx + outerR * Math.cos(startA);
    const y1 = cy + outerR * Math.sin(startA);
    const x2 = cx + outerR * Math.cos(startA + sweepA);
    const y2 = cy + outerR * Math.sin(startA + sweepA);
    const ix1 = cx + innerR * Math.cos(startA + sweepA);
    const iy1 = cy + innerR * Math.sin(startA + sweepA);
    const ix2 = cx + innerR * Math.cos(startA);
    const iy2 = cy + innerR * Math.sin(startA);
    const large = sweepA > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`;
  };

  return (
    <svg viewBox="0 0 180 180" style={{ width: "100%", maxWidth: 180, display: "block", margin: "0 auto" }}>
      {slices.map((s, i) => (
        <path key={`slice-${i}`} d={arc(s.start, s.sweep, R, r)} fill={s.color} />
      ))}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize={18} fontWeight={700} fill="#1A1A1A" fontFamily="Poppins, sans-serif">{total.toLocaleString()}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize={10} fill="#8392AB" fontFamily="Inter, sans-serif">Total</text>
    </svg>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────

function KpiCard({
  label, value, delta, deltaLabel, isConnectRate, connectRate, icon: Icon,
}: {
  label: string; value: number; delta?: number; deltaLabel?: string;
  isConnectRate?: boolean; connectRate?: number; icon: React.FC<{ size?: number }>;
}) {
  const animated = useCountUp(value);
  const positive = (delta ?? 0) >= 0;

  return (
    <div style={{
      background: "white", borderRadius: 18, padding: 20, height: 116,
      boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#67748E" }}>{label}</span>
        <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 30, fontWeight: 700, color: "#1A1A1A", marginTop: 4, lineHeight: 1 }}>
          {animated.toLocaleString()}
        </span>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
          {isConnectRate ? (
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>
              {connectRate}% connect rate
            </span>
          ) : delta !== undefined ? (
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13 }}>
              <span style={{ fontWeight: 700, color: positive ? "#4CAF50" : "#F5365C" }}>
                {positive ? "+" : ""}{delta}%
              </span>
              {" "}
              <span style={{ color: "#8392AB", fontWeight: 400 }}>{deltaLabel ?? "than last week"}</span>
            </span>
          ) : null}
        </div>
      </div>
      <div style={{
        width: 44, height: 44, borderRadius: 14, background: "#17181C",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <span style={{ color: "white", display: "flex", alignItems: "center" }}>
          <Icon size={22} />
        </span>
      </div>
    </div>
  );
}

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────

function SettingsScreen({
  settingsTab, setSettingsTab,
  profileForm, setProfileForm,
  notificationPrefs, setNotificationPrefs,
  sessions, showSignOutAllConfirm, setShowSignOutAllConfirm,
  handleSaveProfile, handleSaveNotificationPrefs,
  handleLogOutSession, handleSignOutAllOthers, handleLogOut,
}: {
  settingsTab: "profile" | "notifications" | "sessions";
  setSettingsTab: (t: "profile" | "notifications" | "sessions") => void;
  profileForm: { name: string; email: string; phone: string };
  setProfileForm: (f: { name: string; email: string; phone: string }) => void;
  notificationPrefs: Record<string, boolean>;
  setNotificationPrefs: (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
  sessions: { id: number; device: string; location: string; lastActive: string; current: boolean }[];
  showSignOutAllConfirm: boolean;
  setShowSignOutAllConfirm: (v: boolean) => void;
  handleSaveProfile: () => void;
  handleSaveNotificationPrefs: () => void;
  handleLogOutSession: (id: number) => void;
  handleSignOutAllOthers: () => void;
  handleLogOut: () => void;
}) {
  const tabs: { id: "profile" | "notifications" | "sessions"; label: string; icon: React.ReactNode }[] = [
    { id: "profile",       label: "Profile",       icon: <PersonIcon size={16} /> },
    { id: "notifications", label: "Notifications", icon: <BellIcon size={16} /> },
    { id: "sessions",      label: "Sessions",      icon: <MonitorIcon size={16} /> },
  ];

  const labelStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.06em", textTransform: "uppercase", color: "#67748E",
    display: "block", marginBottom: 6,
  };
  const inputStyle: React.CSSProperties = {
    width: "100%", height: 40, border: "1px solid #DEE2E6", borderRadius: 8,
    padding: "0 12px", fontFamily: "Inter, sans-serif", fontSize: 13,
    color: "#1A1A1A", outline: "none", boxSizing: "border-box", background: "white",
  };
  const readOnlyStyle: React.CSSProperties = {
    ...inputStyle, background: "#F4F5F7", color: "#67748E", cursor: "default",
  };

  const otherSessions = sessions.filter(s => !s.current);

  return (
    <div style={{ display: "flex", gap: 16, height: "100%", animation: "screenEnter 280ms ease-out both" }}>

      {/* LEFT TAB COLUMN */}
      <div
        role="tablist"
        aria-label="Settings sections"
        style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: 4 }}
      >
        {tabs.map(tab => {
          const active = settingsTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              aria-controls={`settings-panel-${tab.id}`}
              id={`settings-tab-${tab.id}`}
              onClick={() => setSettingsTab(tab.id)}
              style={{
                height: 44, padding: "0 14px", borderRadius: 8, border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500,
                background: active ? "#17181C" : "transparent",
                color: active ? "white" : "#67748E",
                transition: "all 0.15s", textAlign: "left",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#F4F5F7"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ color: active ? "white" : "#67748E", display: "flex", alignItems: "center" }}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}

        <div style={{ height: 1, background: "#EEEEEE", margin: "16px 0" }} />

        <button
          onClick={handleLogOut}
          aria-label="Log out of SalesVision"
          style={{
            height: 44, width: "100%", background: "transparent",
            border: "1.5px solid #F5365C", borderRadius: 8, cursor: "pointer",
            fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600,
            color: "#F5365C", transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(245,54,92,0.05)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          Log Out
        </button>
      </div>

      {/* RIGHT CONTENT PANEL */}
      <div
        role="tabpanel"
        id={`settings-panel-${settingsTab}`}
        aria-labelledby={`settings-tab-${settingsTab}`}
        key={settingsTab}
        style={{
          flex: 1, background: "white", borderRadius: 18,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)", padding: 24, overflowY: "auto",
          animation: "screenEnter 150ms ease-out both",
        }}
      >

        {/* ── PROFILE TAB ── */}
        {settingsTab === "profile" && (
          <div>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A", marginBottom: 20 }}>
              Profile
            </p>

            {/* Avatar row */}
            <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24 }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%", background: "#17181C",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 26, fontWeight: 700, color: "white" }}>
                  {director.initials}
                </span>
              </div>
              <button
                onClick={() => toast("Photo upload coming soon", { duration: 3000 })}
                style={{
                  height: 36, padding: "0 14px", background: "transparent",
                  border: "1.5px solid #DEE2E6", borderRadius: 8, cursor: "pointer",
                  fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                  color: "#17181C", transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F4F5F7")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                Change Photo
              </button>
            </div>

            {/* Form grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 640 }}>
              <div>
                <label htmlFor="sf-name" style={labelStyle}>Full Name</label>
                <input
                  id="sf-name" style={inputStyle}
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="sf-email" style={labelStyle}>Email Address</label>
                <input
                  id="sf-email" type="email" style={inputStyle}
                  value={profileForm.email}
                  onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="sf-phone" style={labelStyle}>Phone</label>
                <input
                  id="sf-phone" type="tel" style={inputStyle}
                  value={profileForm.phone}
                  onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="sf-tz" style={labelStyle}>Timezone</label>
                <input id="sf-tz" style={readOnlyStyle} value={director.timezone} readOnly aria-readonly="true" />
              </div>
              <div>
                <label htmlFor="sf-company" style={labelStyle}>Company</label>
                <input id="sf-company" style={readOnlyStyle} value={director.companyName} readOnly aria-readonly="true" />
              </div>
              <div>
                <label htmlFor="sf-role" style={labelStyle}>Role</label>
                <input id="sf-role" style={readOnlyStyle} value="Director" readOnly aria-readonly="true" />
              </div>
            </div>

            {/* Access level */}
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={labelStyle as React.CSSProperties}>Access Level</span>
              <span style={{
                background: "#F1F1F3", color: "#1A1A1A", fontFamily: "Inter, sans-serif",
                fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "4px 10px",
                textTransform: "uppercase",
              }}>
                {director.accessLevel}
              </span>
            </div>

            <button
              onClick={handleSaveProfile}
              style={{
                marginTop: 24, height: 44, padding: "0 24px", background: "#17181C",
                color: "white", border: "none", borderRadius: 8, cursor: "pointer",
                fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#000000")}
              onMouseLeave={e => (e.currentTarget.style.background = "#17181C")}
            >
              Save Changes
            </button>
          </div>
        )}

        {/* ── NOTIFICATIONS TAB ── */}
        {settingsTab === "notifications" && (
          <div>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A", marginBottom: 20 }}>
              Notifications
            </p>

            {notificationPrefLabels.map((item, i) => {
              const isLast = i === notificationPrefLabels.length - 1;
              const checked = !!notificationPrefs[item.key];
              return (
                <div
                  key={item.key}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    paddingBottom: isLast ? 0 : 16,
                    borderBottom: isLast ? "none" : "1px solid #F0F0F0",
                    marginBottom: isLast ? 0 : 16,
                  }}
                >
                  <div style={{ flex: 1, marginRight: 24 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>
                      {item.label}
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", margin: "2px 0 0", maxWidth: 420 }}>
                      {item.description}
                    </p>
                  </div>
                  {/* Toggle switch */}
                  <button
                    role="switch"
                    aria-checked={checked}
                    aria-label={item.label}
                    onClick={() => setNotificationPrefs(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                    style={{
                      width: 44, height: 24, borderRadius: 9999, border: "none", cursor: "pointer",
                      background: checked ? "#17181C" : "#DEE2E6",
                      position: "relative", flexShrink: 0, transition: "background 0.2s",
                      padding: 0,
                    }}
                  >
                    <span style={{
                      position: "absolute", top: 3, left: checked ? 23 : 3,
                      width: 18, height: 18, borderRadius: "50%", background: "white",
                      transition: "left 200ms cubic-bezier(0.34,1.56,0.64,1)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      display: "block",
                    }} />
                  </button>
                </div>
              );
            })}

            <button
              onClick={handleSaveNotificationPrefs}
              style={{
                marginTop: 8, height: 44, padding: "0 24px", background: "#17181C",
                color: "white", border: "none", borderRadius: 8, cursor: "pointer",
                fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#000000")}
              onMouseLeave={e => (e.currentTarget.style.background = "#17181C")}
            >
              Save Preferences
            </button>
          </div>
        )}

        {/* ── SESSIONS TAB ── */}
        {settingsTab === "sessions" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>
                Active Sessions
              </p>
              {otherSessions.length > 0 && (
                <button
                  onClick={() => setShowSignOutAllConfirm(true)}
                  style={{
                    height: 36, padding: "0 14px", background: "transparent",
                    border: "1.5px solid #F5365C", borderRadius: 8, cursor: "pointer",
                    fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                    color: "#F5365C", transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(245,54,92,0.05)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  Sign Out All Other Sessions
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {sessions.map(session => (
                <div key={session.id} style={{
                  background: "#FAFAFA", borderRadius: 12, padding: 16,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: "#67748E", display: "flex", alignItems: "center" }}>
                      {session.device.toLowerCase().includes("iphone") ? <PhoneIcon size={20} /> : <MonitorIcon size={20} />}
                    </span>
                    <div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>
                        {session.device}
                      </p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", margin: "2px 0 0" }}>
                        {session.location} · {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {session.current ? (
                    <span style={{
                      background: "#4CAF50", color: "white", fontFamily: "Inter, sans-serif",
                      fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "4px 10px",
                      textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>
                      Current Session
                    </span>
                  ) : (
                    <button
                      onClick={() => handleLogOutSession(session.id)}
                      aria-label={`Log out of ${session.device}`}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                        color: "#F5365C", textDecoration: "none", padding: 0,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                    >
                      Log Out
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Sign Out All Confirmation Dialog */}
            {showSignOutAllConfirm && (
              <>
                <div
                  onClick={() => setShowSignOutAllConfirm(false)}
                  style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)", zIndex: 60,
                  }}
                />
                <div
                  role="alertdialog"
                  aria-modal="true"
                  aria-labelledby="signout-dialog-title"
                  aria-describedby="signout-dialog-desc"
                  style={{
                    position: "fixed", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)", zIndex: 61,
                    background: "white", borderRadius: 18, padding: 32,
                    width: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
                    animation: "scaleIn 200ms ease-out both",
                  }}
                >
                  <p id="signout-dialog-title" style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A", margin: "0 0 8px" }}>
                    Sign out of all other sessions?
                  </p>
                  <p id="signout-dialog-desc" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", margin: "0 0 24px", lineHeight: 1.5 }}>
                    This will immediately sign you out on {otherSessions.length} other device{otherSessions.length !== 1 ? "s" : ""}.
                  </p>
                  <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                    <button
                      onClick={() => setShowSignOutAllConfirm(false)}
                      style={{
                        height: 40, padding: "0 20px", background: "#F4F5F7", border: "none",
                        borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif",
                        fontSize: 13, fontWeight: 600, color: "#67748E",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSignOutAllOthers}
                      style={{
                        height: 40, padding: "0 20px", background: "#F5365C", border: "none",
                        borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif",
                        fontSize: 13, fontWeight: 600, color: "white",
                      }}
                    >
                      Sign Out All
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── REPORTS & MIS CENTRE ─────────────────────────────────────────────────────

function ReportsScreen({
  orgManagers,
  reportPeriodRange,
  setReportPeriodRange,
  reportManagerFilter,
  toggleReportManager,
  reportExecutiveFilter,
  setReportExecutiveFilter,
  reportIndustryFilter,
  setReportIndustryFilter,
  reportCustomerTypeFilter,
  setReportCustomerTypeFilter,
  reportFormat,
  setReportFormat,
  generatingTemplateId,
  handleTemplateDownload,
  downloadHistory,
  globalPeriod,
  screenPeriodLabel,
}: {
  orgManagers: { id: string; name: string; email: string }[];
  reportPeriodRange: { start: string; end: string };
  setReportPeriodRange: (v: { start: string; end: string }) => void;
  reportManagerFilter: string[];
  toggleReportManager: (id: string) => void;
  reportExecutiveFilter: string;
  setReportExecutiveFilter: (v: string) => void;
  reportIndustryFilter: string;
  setReportIndustryFilter: (v: string) => void;
  reportCustomerTypeFilter: string;
  setReportCustomerTypeFilter: (v: string) => void;
  reportFormat: "XLSX" | "PDF";
  setReportFormat: (v: "XLSX" | "PDF") => void;
  generatingTemplateId: string | null;
  handleTemplateDownload: (t: typeof reportTemplates[0]) => void;
  downloadHistory: { id: number; reportName: string; timestamp: string; format: string; period: string }[];
  globalPeriod: string;
  screenPeriodLabel: (p: string) => string;
}) {
  const inputStyle: React.CSSProperties = {
    width: "100%", height: 40, border: "1px solid #DEE2E6", borderRadius: 8,
    padding: "0 10px", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1A1A1A",
    outline: "none", boxSizing: "border-box", background: "white",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
    textTransform: "uppercase", color: "#67748E", marginBottom: 8, display: "block",
  };
  const selectStyle: React.CSSProperties = {
    ...inputStyle, cursor: "pointer",
  };

  const templateIcon = (icon: string) => {
    if (icon === "phone")       return <PhoneIcon size={18} />;
    if (icon === "trending-up") return <TrendingUpIcon size={18} />;
    if (icon === "map-pin")     return <MapPinIcon size={18} />;
    return <BarChart2Icon size={18} />;
  };

  return (
    <div style={{ display: "flex", gap: 16, height: "100%", animation: "screenEnter 280ms ease-out both" }}>

      {/* LEFT FILTER PANEL */}
      <div style={{
        width: 280, flexShrink: 0, background: "white", borderRadius: 18,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)", padding: 20,
        display: "flex", flexDirection: "column", gap: 20, overflowY: "auto",
      }}>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>
          Filters
        </p>

        {/* PERIOD */}
        <div>
          <label style={labelStyle}>Period</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              type="date"
              value={reportPeriodRange.start}
              onChange={e => setReportPeriodRange({ ...reportPeriodRange, start: e.target.value })}
              style={inputStyle}
              aria-label="Report period start date"
            />
            <input
              type="date"
              value={reportPeriodRange.end}
              onChange={e => setReportPeriodRange({ ...reportPeriodRange, end: e.target.value })}
              style={inputStyle}
              aria-label="Report period end date"
            />
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB", marginTop: 8, lineHeight: 1.4 }}>
            Leave blank to use global period ({screenPeriodLabel(globalPeriod)})
          </p>
        </div>

        {/* MANAGER */}
        <div>
          <label style={labelStyle}>Manager</label>
          <div role="group" aria-label="Filter by manager" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {orgManagers.map(m => {
              const active = reportManagerFilter.includes(m.id);
              return (
                <button
                  key={m.id}
                  aria-pressed={active}
                  onClick={() => toggleReportManager(m.id)}
                  style={{
                    padding: "5px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                    fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
                    background: active ? "#17181C" : "#F1F1F3",
                    color: active ? "white" : "#67748E",
                    transition: "all 0.15s",
                  }}
                >
                  {m.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* EXECUTIVE */}
        <div>
          <label style={labelStyle}>Executive</label>
          <select
            value={reportExecutiveFilter}
            onChange={e => setReportExecutiveFilter(e.target.value)}
            style={selectStyle}
            aria-label="Filter by executive"
          >
            <option value="All">All</option>
            {executiveDirectory.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </select>
        </div>

        {/* INDUSTRY */}
        <div>
          <label style={labelStyle}>Industry</label>
          <select
            value={reportIndustryFilter}
            onChange={e => setReportIndustryFilter(e.target.value)}
            style={selectStyle}
            aria-label="Filter by industry"
          >
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* CUSTOMER TYPE */}
        <div>
          <label style={labelStyle}>Customer Type</label>
          <select
            value={reportCustomerTypeFilter}
            onChange={e => setReportCustomerTypeFilter(e.target.value)}
            style={selectStyle}
            aria-label="Filter by customer type"
          >
            {customerTypes.map(ct => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>
        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: "#F0F0F0" }} />

        {/* FORMAT TOGGLE */}
        <div>
          <label style={labelStyle}>Format</label>
          <div
            role="radiogroup"
            aria-label="Export format"
            style={{
              display: "flex", background: "#F1F1F3", borderRadius: 10, padding: 3,
            }}
          >
            {(["XLSX", "PDF"] as const).map(fmt => {
              const active = reportFormat === fmt;
              return (
                <button
                  key={fmt}
                  role="radio"
                  aria-checked={active}
                  onClick={() => setReportFormat(fmt)}
                  style={{
                    flex: 1, height: 34, border: "none", borderRadius: 8, cursor: "pointer",
                    fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                    background: active ? "white" : "transparent",
                    color: active ? "#17181C" : "#8392AB",
                    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>

        {/* REPORT TEMPLATE CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {reportTemplates.map(template => {
            const isGenerating = generatingTemplateId === template.id;
            const showProgress = isGenerating && globalPeriod === "custom";
            return (
              <div key={template.id}>
                <div style={{
                  background: "white", borderRadius: 18, boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
                }}>
                  {/* LEFT */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%", background: "#17181C",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <span style={{ color: "white", display: "flex", alignItems: "center" }}>
                          {templateIcon(template.icon)}
                        </span>
                      </div>
                      <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>
                        {template.name}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E",
                      marginTop: 6, maxWidth: 480, lineHeight: 1.5,
                    }}>
                      {template.description}
                    </p>
                    <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                      {template.filters.map(f => (
                        <span key={f} style={{
                          background: "#F1F1F3", fontFamily: "Inter, sans-serif",
                          fontSize: 11, fontWeight: 600, color: "#67748E",
                          borderRadius: 6, padding: "3px 8px",
                        }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DOWNLOAD BUTTON */}
                  <button
                    onClick={() => !isGenerating && handleTemplateDownload(template)}
                    disabled={isGenerating}
                    aria-busy={isGenerating}
                    aria-label={isGenerating ? `Generating ${template.name}` : `Download ${template.name}`}
                    style={{
                      height: 44, minWidth: 140, background: "#17181C", color: "white",
                      border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif",
                      fontSize: 13, fontWeight: 600, cursor: isGenerating ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      opacity: isGenerating ? 0.8 : 1, flexShrink: 0, transition: "opacity 0.15s",
                    }}
                  >
                    {isGenerating
                      ? <><RefreshIcon size={16} spinning={true} /> Generating…</>
                      : <><DownloadIcon size={15} /> Download</>
                    }
                  </button>
                </div>

                {/* INDETERMINATE PROGRESS BAR for custom range */}
                {showProgress && (
                  <div
                    role="progressbar"
                    aria-label={`Generating ${template.name}`}
                    style={{ height: 4, background: "#DEE2E6", borderRadius: "0 0 8px 8px", overflow: "hidden" }}
                  >
                    <div style={{
                      height: "100%", background: "#17181C", borderRadius: 4,
                      animation: "indeterminateSweep 1.5s ease-in-out infinite",
                    }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DOWNLOAD HISTORY TABLE */}
        <div style={{ background: "white", borderRadius: 18, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{
            height: 52, padding: "0 20px", borderBottom: "1px solid #F0F0F0",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
              Download History
            </span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB" }}>
              Last 10 downloads
            </span>
          </div>

          {downloadHistory.length === 0 ? (
            <div style={{ padding: "48px 20px", textAlign: "center" }}>
              <div style={{ color: "#ADB5BD", marginBottom: 8, display: "flex", justifyContent: "center" }}>
                <DownloadIcon size={28} />
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#8392AB" }}>
                No downloads yet — generate a report above to see it here
              </p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Report Name", "Timestamp", "Format", "Period"].map(col => (
                    <th key={col} style={{
                      padding: "12px 20px", textAlign: "left", fontFamily: "Inter, sans-serif",
                      fontSize: 11, fontWeight: 600, color: "#8392AB", letterSpacing: "0.05em",
                      textTransform: "uppercase", background: "transparent",
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {downloadHistory.map((row, i) => (
                  <tr key={row.id} style={{
                    borderTop: "1px solid #F0F0F0",
                    animation: i === 0 ? "newHistoryRow 800ms ease-out both" : "none",
                  }}>
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>
                      {row.reportName}
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E" }}>
                      {row.timestamp}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        background: "#F1F1F3", fontFamily: "Inter, sans-serif",
                        fontSize: 11, fontWeight: 700, color: "#67748E",
                        borderRadius: 6, padding: "3px 8px",
                      }}>
                        {row.format}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E" }}>
                      {row.period}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PLACEHOLDER SCREEN ───────────────────────────────────────────────────────

function PlaceholderScreen({ screen, selectedTeamId, goBack, departments, teamsByDepartment }: {
  screen: string; selectedTeamId?: string; goBack?: () => void;
  departments?: DeptRecord[]; teamsByDepartment?: Record<string, TeamRecord[]>;
}) {
  const label = SCREEN_LABELS[screen] ?? screen;
  const step = SCREEN_STEP_MAP[screen] ?? "a later step";
  const depts = departments ?? initialDepartments;
  const teamsByDept = teamsByDepartment ?? initialTeamsByDepartment;

  // Team-aware placeholder for organization-team
  if (screen === "organization-team" && selectedTeamId) {
    const allTeams = Object.values(teamsByDept).flat();
    const team = allTeams.find(t => t.id === selectedTeamId);
    const dept = team ? Object.entries(teamsByDept).find(([, teams]) => teams.some(t => t.id === selectedTeamId)) : null;
    const deptName = dept ? (depts.find(d => d.id === dept[0])?.name ?? "Department") : "Department";

    return (
      <div style={{ animation: "screenEnter 280ms ease-out both" }}>
        <button
          onClick={goBack}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
            color: "#67748E", padding: 0, marginBottom: 20, transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#17181C")}
          onMouseLeave={e => (e.currentTarget.style.color = "#67748E")}
        >
          ← Back to {deptName}
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
          <div style={{
            background: "white", borderRadius: 18, padding: 48, maxWidth: 480, width: "100%", textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          }}>
            <div style={{ color: "#ADB5BD", marginBottom: 16 }}><ConstructionIcon size={40} /></div>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A", marginBottom: 8 }}>
              {team?.name ?? "Team"} — Team Detail coming in Step 9
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>
              Full team activity, call logs, and roster will be available in Step 9.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
      <div style={{
        background: "white", borderRadius: 18, padding: 48, maxWidth: 480, width: "100%", textAlign: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}>
        <div style={{ color: "#ADB5BD", marginBottom: 16 }}><ConstructionIcon size={40} /></div>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A", marginBottom: 8 }}>
          {label} is coming in {step}
        </p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>
          This screen will be built in {step} of the roadmap.
        </p>
      </div>
    </div>
  );
}

// ─── DASHBOARD SCREEN ─────────────────────────────────────────────────────────

function DashboardScreen({ navigateToExecutive }: { navigateToExecutive: (id: string) => void }) {
  const [perfView, setPerfView] = useState<"executives" | "managers">("executives");
  const donutData = [
    { name: "Hot", value: leadTemperature.hot, color: "#F5365C" },
    { name: "Warm", value: leadTemperature.warm, color: "#FB6340" },
    { name: "Cold", value: leadTemperature.cold, color: "#8392AB" },
  ];

  return (
    <div style={{ animation: "screenEnter 280ms ease-out both" }}>
      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KpiCard label="Calls Made" value={dashboardKpis.callsMade} delta={dashboardKpis.callsMadeDelta} icon={PhoneIcon} />
        <KpiCard label="Total Mappings" value={dashboardKpis.totalMappings} delta={dashboardKpis.totalMappingsDelta} icon={MapIcon} />
        <KpiCard label="Hot Leads" value={dashboardKpis.hotLeads} delta={dashboardKpis.hotLeadsDelta} icon={FlameIcon} />
        <KpiCard label="Connected Calls" value={dashboardKpis.connectedCalls} isConnectRate connectRate={dashboardKpis.connectRate} icon={CheckIcon} />
      </div>

      {/* Chart Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginTop: 16 }}>
        {/* Call Outcomes Bar Chart */}
        <div style={{
          background: "white", borderRadius: 18, padding: 20, minHeight: 320,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Call Outcomes</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", marginBottom: 16 }}>This Week</p>
          <GroupedBarChart data={callOutcomesTrend} />
          <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: "center" }}>
            {SERIES.map(s => (
              <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, display: "inline-block" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#67748E" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Temperature Donut */}
        <div style={{
          background: "white", borderRadius: 18, padding: 20, minHeight: 320,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Lead Temperature</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", marginBottom: 8 }}>Distribution</p>
          <DonutChart data={donutData} />
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
            {donutData.map(d => (
              <div key={d.name} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, display: "inline-block" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#67748E" }}>{d.name}</span>
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div style={{
        background: "white", borderRadius: 18, marginTop: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        {/* Table Header */}
        <div style={{
          height: 52, padding: "0 20px", display: "flex", alignItems: "center",
          justifyContent: "space-between", borderBottom: "1px solid #F0F0F0",
        }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Performance</span>
          {/* Segmented Toggle */}
          <div role="radiogroup" aria-label="Performance view" style={{
            background: "#F1F1F3", borderRadius: 8, padding: 3, display: "flex", gap: 2,
          }}>
            {(["executives", "managers"] as const).map(view => (
              <button
                key={view}
                role="radio"
                aria-checked={perfView === view}
                onClick={() => setPerfView(view)}
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                  padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                  background: perfView === view ? "white" : "transparent",
                  color: "#1A1A1A",
                  boxShadow: perfView === view ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {view === "executives" ? "Executives" : "Managers"}
              </button>
            ))}
          </div>
        </div>

        {/* Column Headers */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                {perfView === "executives"
                  ? ["Executive", "Manager", "Calls", "Connected", "Hot", "Today"].map(col => (
                    <th key={col} style={{
                      fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
                      color: "#8392AB", textTransform: "uppercase", letterSpacing: "0.6px",
                      padding: "12px 20px", textAlign: col === "Executive" ? "left" : "right",
                      background: "transparent", whiteSpace: "nowrap",
                    }}>{col}</th>
                  ))
                  : ["Manager", "Department", "Team", "Calls", "Connected", "Hot", "Today"].map(col => (
                    <th key={col} style={{
                      fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
                      color: "#8392AB", textTransform: "uppercase", letterSpacing: "0.6px",
                      padding: "12px 20px", textAlign: col === "Manager" ? "left" : "right",
                      background: "transparent", whiteSpace: "nowrap",
                    }}>{col}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {perfView === "executives"
                ? executivesList.map(exe => (
                  <tr
                    key={exe.id}
                    onClick={() => navigateToExecutive(exe.id)}
                    style={{ borderBottom: "1px solid #F0F0F0", cursor: "pointer", transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%", background: "#17181C",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "white" }}>{exe.initials}</span>
                        </div>
                        <div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{exe.name}</div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB" }}>{exe.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#67748E" }}>{exe.managerName}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{exe.callsPeriod}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{exe.connectedPeriod}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{exe.hotLeads}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{exe.callsToday}</td>
                  </tr>
                ))
                : managersList.map(mgr => (
                  <tr
                    key={mgr.id}
                    onClick={() => toast("Manager profile coming in a later step", { duration: 3000 })}
                    style={{ borderBottom: "1px solid #F0F0F0", cursor: "pointer", transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%", background: "#17181C",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "white" }}>{mgr.initials}</span>
                        </div>
                        <div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{mgr.name}</div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB" }}>{mgr.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#67748E" }}>{mgr.department}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{mgr.teamSize}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{mgr.callsPeriod}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{mgr.connectedPeriod}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{mgr.hotLeads}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{mgr.callsToday}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── CALLS ICONS ─────────────────────────────────────────────────────────────

function PhoneMissedIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="23" y1="1" x2="17" y2="7" /><line x1="17" y1="1" x2="23" y2="7" />
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function XCircleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

// ─── CALLS SCREEN ─────────────────────────────────────────────────────────────

function connectTier(pct: number) {
  // Identical thresholds to coverageTier() in Mapping — never diverge
  if (pct >= 50) return { bg: "#E7F7EC", color: "#4CAF50" };
  if (pct >= 25) return { bg: "#FFF3E6", color: "#FB6340" };
  return { bg: "#FDE8EC", color: "#F5365C" };
}

function CallsScreen({ navigateToExecutive, callsView, setCallsView, selectedManagerIds, setSelectedManagerIds }: { navigateToExecutive: (id: string) => void; callsView: "executives" | "managers"; setCallsView: (v: "executives" | "managers") => void; selectedManagerIds: string[]; setSelectedManagerIds: (v: string[] | ((prev: string[]) => string[])) => void }) {
  const toggleManagerFilter = (id: string) =>
    setSelectedManagerIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const groupedExecutiveRows = callManagers
    .filter(m => selectedManagerIds.length === 0 || selectedManagerIds.includes(m.id))
    .map(manager => {
      const execs = callExecutives.filter(e => e.managerId === manager.id);
      return {
        manager,
        executives: execs,
        subtotal: {
          made:          execs.reduce((s, e) => s + e.made, 0),
          received:      execs.reduce((s, e) => s + e.received, 0),
          notPicked:     execs.reduce((s, e) => s + e.notPicked, 0),
          notInterested: execs.reduce((s, e) => s + e.notInterested, 0),
        },
      };
    });

  // count-up animations for KPI cards
  const aTotalCalls    = useCountUp(callsKpis.totalCalls);
  const aReceived      = useCountUp(callsKpis.received);
  const aNotPicked     = useCountUp(callsKpis.notPicked);
  const aNotInterested = useCountUp(callsKpis.notInterested);

  const kpiCards = [
    { label: "Total Calls",    animated: aTotalCalls,    delta: callsKpis.totalCallsDelta,    invertDelta: false, icon: PhoneIcon },
    { label: "Received",       animated: aReceived,      delta: callsKpis.receivedDelta,       invertDelta: false, icon: CheckIcon },
    // Negative delta = fewer unanswered calls = good → invert color logic
    { label: "Not Picked",     animated: aNotPicked,     delta: callsKpis.notPickedDelta,     invertDelta: true,  icon: PhoneMissedIcon },
    // Negative delta = fewer rejections = good → invert color logic
    { label: "Not Interested", animated: aNotInterested, delta: callsKpis.notInterestedDelta, invertDelta: true,  icon: XCircleIcon },
  ];

  const TD: React.CSSProperties = { padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums", textAlign: "right" as const };

  return (
    <div style={{ animation: "screenEnter 280ms ease-out both" }}>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
        {kpiCards.map((k, i) => {
          const pos = k.delta >= 0;
          const deltaColor = k.invertDelta ? (pos ? "#F5365C" : "#4CAF50") : (pos ? "#4CAF50" : "#F5365C");
          const Icon = k.icon;
          return (
            <div key={i} style={{
              background: "white", borderRadius: 18, padding: 20, height: 116,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#67748E" }}>{k.label}</span>
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 30, fontWeight: 700, color: "#1A1A1A", marginTop: 4, lineHeight: 1 }}>
                  {k.animated.toLocaleString()}
                </span>
                <div style={{ marginTop: 8, fontFamily: "Inter, sans-serif", fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: deltaColor }}>{pos ? "+" : ""}{k.delta}%</span>
                  {" "}<span style={{ color: "#8392AB" }}>than last week</span>
                </div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "white", display: "flex", alignItems: "center" }}><Icon size={22} /></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls Row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
        {/* Executives ⇄ Managers toggle */}
        <div role="radiogroup" aria-label="Table view" style={{ background: "#F1F1F3", borderRadius: 8, padding: 3, display: "flex", gap: 2 }}>
          {(["executives", "managers"] as const).map(v => (
            <button
              key={v}
              role="radio"
              aria-checked={callsView === v}
              onClick={() => setCallsView(v)}
              style={{
                fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                background: callsView === v ? "white" : "transparent",
                color: callsView === v ? "#1A1A1A" : "#67748E",
                boxShadow: callsView === v ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.15s",
              }}
            >
              {v === "executives" ? "Executives" : "Managers"}
            </button>
          ))}
        </div>

        {/* Manager filter chips — executives view only */}
        {callsView === "executives" && (
          <div role="group" aria-label="Filter by manager" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              aria-pressed={selectedManagerIds.length === 0}
              onClick={() => setSelectedManagerIds([])}
              style={{
                height: 32, padding: "0 14px", borderRadius: 9999, border: "none",
                fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: selectedManagerIds.length === 0 ? "#17181C" : "#F1F1F3",
                color: selectedManagerIds.length === 0 ? "white" : "#67748E",
                transition: "all 0.15s",
              }}
            >All</button>
            {callManagers.map(m => {
              const active = selectedManagerIds.includes(m.id);
              return (
                <button
                  key={m.id}
                  aria-pressed={active}
                  onClick={() => toggleManagerFilter(m.id)}
                  style={{
                    height: 32, padding: "0 14px", borderRadius: 9999, border: "none",
                    fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer",
                    background: active ? "#17181C" : "#F1F1F3",
                    color: active ? "white" : "#67748E",
                    transition: "all 0.15s",
                  }}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Table Card */}
      <div style={{ background: "white", borderRadius: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          {callsView === "executives" ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                  {["Executive", "Manager", "Made", "Received", "Not Picked", "Not Interested", "Connect %"].map(col => (
                    <th key={col} style={{
                      fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
                      color: "#8392AB", textTransform: "uppercase", letterSpacing: "0.6px",
                      padding: "12px 20px", textAlign: col === "Executive" ? "left" : "right",
                      background: "transparent", whiteSpace: "nowrap",
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>

              {groupedExecutiveRows.length === 0 ? (
                <tbody>
                  <tr><td colSpan={7} style={{ padding: 40, textAlign: "center" }}>
                    <div style={{ color: "#ADB5BD", marginBottom: 8 }}><ConstructionIcon size={28} /></div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>No call data found for the selected managers</span>
                  </td></tr>
                </tbody>
              ) : groupedExecutiveRows.map(({ manager, executives, subtotal }) => {
                const subConnectPct = subtotal.made > 0 ? Math.round((subtotal.received / subtotal.made) * 1000) / 10 : 0;
                const subTier = connectTier(subConnectPct);
                return (
                  <tbody key={manager.id}>
                    {/* Manager subtotal row */}
                    <tr style={{ background: "#FAFAFA", borderBottom: "1px solid #F0F0F0", position: "sticky", top: 44 }}>
                      <td style={{ padding: "12px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "white" }}>{manager.initials}</span>
                          </div>
                          <div>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>{manager.name}</span>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB", marginLeft: 8 }}>{manager.teamSize} executives</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ ...TD, color: "#8392AB", fontSize: 13 }}>{manager.department}</td>
                      <td style={{ ...TD, fontWeight: 700 }}>{subtotal.made.toLocaleString()}</td>
                      <td style={{ ...TD, fontWeight: 700 }}>{subtotal.received.toLocaleString()}</td>
                      <td style={{ ...TD, fontWeight: 700 }}>{subtotal.notPicked.toLocaleString()}</td>
                      <td style={{ ...TD, fontWeight: 700 }}>{subtotal.notInterested.toLocaleString()}</td>
                      <td style={{ ...TD }}>
                        <span style={{ background: subTier.bg, color: subTier.color, fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "4px 10px" }}>{subConnectPct}%</span>
                      </td>
                    </tr>
                    {/* Executive rows */}
                    {executives.map(exe => {
                      const tier = connectTier(exe.connectPct);
                      return (
                        <tr
                          key={exe.id}
                          onClick={() => navigateToExecutive(exe.id)}
                          style={{ borderBottom: "1px solid #F0F0F0", transition: "background 0.1s", cursor: "pointer" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          <td style={{ padding: "14px 20px 14px 32px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "white" }}>{exe.initials}</span>
                              </div>
                              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{exe.name}</span>
                            </div>
                          </td>
                          <td style={{ ...TD, color: "#67748E", fontSize: 13, fontWeight: 400 }}>{exe.managerName}</td>
                          <td style={TD}>{exe.made.toLocaleString()}</td>
                          <td style={TD}>{exe.received.toLocaleString()}</td>
                          <td style={TD}>{exe.notPicked.toLocaleString()}</td>
                          <td style={TD}>{exe.notInterested.toLocaleString()}</td>
                          <td style={{ ...TD }}>
                            <span style={{ background: tier.bg, color: tier.color, fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "4px 10px" }}>{exe.connectPct}%</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                );
              })}
            </table>
          ) : (
            /* Managers flat table */
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                  {["Manager", "Department", "Team", "Made", "Received", "Not Picked", "Not Interested", "Connect %"].map(col => (
                    <th key={col} style={{
                      fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
                      color: "#8392AB", textTransform: "uppercase", letterSpacing: "0.6px",
                      padding: "12px 20px", textAlign: col === "Manager" ? "left" : "right",
                      background: "transparent", whiteSpace: "nowrap",
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {callManagers.length === 0 ? (
                  <tr><td colSpan={8} style={{ padding: 40, textAlign: "center" }}>
                    <div style={{ color: "#ADB5BD", marginBottom: 8 }}><ConstructionIcon size={28} /></div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>No manager call data found — managers need contacts assigned to them directly</span>
                  </td></tr>
                ) : callManagers.map(m => {
                  const tier = connectTier(m.connectPct);
                  return (
                    <tr
                      key={m.id}
                      style={{ borderBottom: "1px solid #F0F0F0", transition: "background 0.1s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "white" }}>{m.initials}</span>
                          </div>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{m.name}</span>
                        </div>
                      </td>
                      <td style={{ ...TD, color: "#67748E", fontSize: 13, fontWeight: 400, textAlign: "right" }}>{m.department}</td>
                      <td style={{ ...TD }}>{m.teamSize} exec</td>
                      <td style={TD}>{m.made.toLocaleString()}</td>
                      <td style={TD}>{m.received.toLocaleString()}</td>
                      <td style={TD}>{m.notPicked.toLocaleString()}</td>
                      <td style={TD}>{m.notInterested.toLocaleString()}</td>
                      <td style={{ ...TD }}>
                        <span style={{ background: tier.bg, color: tier.color, fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "4px 10px" }}>{m.connectPct}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SPARKLINE ────────────────────────────────────────────────────────────────

function Sparkline({ data, label }: { data: number[]; label: string }) {
  const [tip, setTip] = useState<{ x: number; y: number; val: number; idx: number } | null>(null);
  const W = 80, H = 28, PAD = 2;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: PAD + (1 - (v - min) / range) * (H - PAD * 2),
    v,
  }));
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const trend = data[data.length - 1] >= data[0] ? "increasing" : "decreasing";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg
        width={W} height={H}
        aria-label={`7-day trend, ${trend}`}
        role="img"
        style={{ display: "block", overflow: "visible" }}
      >
        <path d={d} fill="none" stroke="#4CAF50" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <g key={i}
            onMouseEnter={() => setTip({ x: p.x, y: p.y, val: p.v, idx: i })}
            onMouseLeave={() => setTip(null)}
            style={{ cursor: "pointer" }}
          >
            {/* invisible hit area */}
            <circle cx={p.x} cy={p.y} r={6} fill="transparent" />
            {/* hover dot with pop animation */}
            {tip?.idx === i && (
              <circle cx={p.x} cy={p.y} r={3.5}
                fill="#4CAF50" stroke="white" strokeWidth={1.5}
                style={{ animation: "dotPop 120ms cubic-bezier(0.34,1.56,0.64,1) both" }}
              />
            )}
          </g>
        ))}
      </svg>
      {tip && (
        <div style={{
          position: "absolute",
          left: tip.x - 28,
          top: tip.y - 44,
          background: "#1A1A1A", borderRadius: 6, padding: "5px 8px",
          pointerEvents: "none", zIndex: 30, whiteSpace: "nowrap",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          <div style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", fontSize: 10 }}>Day {tip.idx + 1}</div>
          <div style={{ color: "white", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600 }}>{tip.val}</div>
        </div>
      )}
    </div>
  );
}

// ─── TEAM SCREEN ──────────────────────────────────────────────────────────────

type SortDir = "asc" | "desc";

function SortChevron({ col, active, dir }: { col: string; active: boolean; dir: SortDir }) {
  if (!active) return null;
  return (
    <span style={{ marginLeft: 4, color: "#1A1A1A", fontSize: 10 }}>
      {dir === "desc" ? "▼" : "▲"}
    </span>
  );
}

function TeamScreen({ navigateToExecutive, rankView, setRankView, selectedManagerCardId, setSelectedManagerCardId, sortColumn, setSortColumn, sortDir, setSortDir }: { navigateToExecutive: (id: string) => void; rankView: "executives" | "managers"; setRankView: (v: "executives" | "managers") => void; selectedManagerCardId: string | null; setSelectedManagerCardId: (v: string | null) => void; sortColumn: string; setSortColumn: (v: string) => void; sortDir: SortDir; setSortDir: (v: SortDir | ((p: SortDir) => SortDir)) => void }) {
  const handleRankViewChange = (view: "executives" | "managers") => {
    setRankView(view);
    setSelectedManagerCardId(null);
    setSortColumn("callsMade");
    setSortDir("desc");
  };

  const handleSort = (col: string) => {
    if (sortColumn === col) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortColumn(col); setSortDir("desc"); }
  };

  const handleCardClick = (id: string) =>
    setSelectedManagerCardId(prev => prev === id ? null : id);

  const visibleExecutives = (selectedManagerCardId
    ? teamExecutives.filter(e => e.managerId === selectedManagerCardId)
    : teamExecutives
  ).slice().sort((a, b) => {
    const dir = sortDir === "desc" ? -1 : 1;
    return ((a as any)[sortColumn] - (b as any)[sortColumn]) * dir;
  });

  const sortedManagers = teamManagers.slice().sort((a, b) => {
    const dir = sortDir === "desc" ? -1 : 1;
    return ((a as any)[sortColumn] - (b as any)[sortColumn]) * dir;
  });

  const selectedMgrName = teamManagers.find(m => m.id === selectedManagerCardId)?.name;

  const thStyle = (col: string): React.CSSProperties => ({
    fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
    color: sortColumn === col ? "#1A1A1A" : "#8392AB",
    textTransform: "uppercase", letterSpacing: "0.6px",
    padding: "12px 20px", textAlign: "right", background: "transparent",
    whiteSpace: "nowrap", cursor: "pointer", userSelect: "none",
  });

  const TD: React.CSSProperties = {
    padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 14,
    fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums", textAlign: "right",
  };

  const exeCols = [
    { key: "callsMade", label: "Calls Made" },
    { key: "connectPct", label: "Connect %" },
    { key: "hotLeads",   label: "Hot" },
    { key: "warmLeads",  label: "Warm" },
  ];
  const mgrCols = [
    { key: "callsMade", label: "Calls Made" },
    { key: "connectPct", label: "Connect %" },
    { key: "hotLeads",   label: "Hot" },
    { key: "warmLeads",  label: "Warm" },
  ];

  return (
    <div style={{ animation: "screenEnter 280ms ease-out both" }}>

      {/* Toggle row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div role="radiogroup" aria-label="Ranking view" style={{ background: "#F1F1F3", borderRadius: 8, padding: 3, display: "flex", gap: 2 }}>
          {(["executives", "managers"] as const).map(v => (
            <button
              key={v}
              role="radio"
              aria-checked={rankView === v}
              onClick={() => handleRankViewChange(v)}
              style={{
                fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                background: rankView === v ? "white" : "transparent",
                color: rankView === v ? "#1A1A1A" : "#67748E",
                boxShadow: rankView === v ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.15s",
              }}
            >
              {v === "executives" ? "Executives" : "Managers"}
            </button>
          ))}
        </div>

        {/* Active filter chip */}
        {selectedManagerCardId && rankView === "executives" && (
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "#F1F1F3", borderRadius: 9999, padding: "5px 12px",
          }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>
              Filtered by: {selectedMgrName}
            </span>
            <button
              aria-label="Clear manager filter"
              onClick={() => setSelectedManagerCardId(null)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#67748E", padding: 0, display: "flex", alignItems: "center", fontSize: 14, lineHeight: 1 }}
            >✕</button>
          </div>
        )}
      </div>

      {/* Manager summary card grid — executives view only */}
      {rankView === "executives" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
          {teamManagers.map(mgr => {
            const selected = selectedManagerCardId === mgr.id;
            const tier = connectTier(mgr.connectPct);
            return (
              <button
                key={mgr.id}
                aria-pressed={selected}
                aria-label={mgr.name}
                onClick={() => handleCardClick(mgr.id)}
                style={{
                  background: "white", borderRadius: 18, padding: 16,
                  boxShadow: selected ? "0 4px 12px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
                  border: selected ? "2px solid #17181C" : "2px solid transparent",
                  cursor: "pointer", textAlign: "left", width: "100%",
                  transition: "all 0.15s", display: "flex", flexDirection: "column", gap: 10,
                }}
                onMouseEnter={e => { if (!selected) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; } }}
                onMouseLeave={e => { if (!selected) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)"; } }}
              >
                {/* Top */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "white" }}>{mgr.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.3 }}>{mgr.name}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#8392AB" }}>{mgr.teamSize} executives</div>
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {[
                    { lbl: "Calls", val: mgr.callsMade.toLocaleString(), valColor: "#1A1A1A" },
                    { lbl: "Hot",   val: String(mgr.hotLeads),           valColor: "#1A1A1A" },
                    { lbl: "Connect", val: `${mgr.connectPct}%`,         valColor: tier.color },
                  ].map(s => (
                    <div key={s.lbl}>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, color: "#8392AB", textTransform: "uppercase", letterSpacing: "0.4px" }}>{s.lbl}</div>
                      <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: s.valColor }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Ranking table */}
      <div style={{ background: "white", borderRadius: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)", overflow: "hidden" }}>
        <div style={{ height: 52, padding: "0 20px", display: "flex", alignItems: "center", borderBottom: "1px solid #F0F0F0" }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
            {rankView === "executives" ? "Executive" : "Manager"} Rankings
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          {rankView === "executives" ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                  <th style={{ ...thStyle("rank"), textAlign: "left", cursor: "default", color: "#8392AB" }}>Rank</th>
                  <th style={{ ...thStyle("name"), textAlign: "left", cursor: "default" }}>Executive</th>
                  <th style={{ ...thStyle("managerName"), cursor: "default" }}>Manager</th>
                  {exeCols.map(c => (
                    <th
                      key={c.key}
                      aria-sort={sortColumn === c.key ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                      style={thStyle(c.key)}
                      onClick={() => handleSort(c.key)}
                    >
                      {c.label}<SortChevron col={c.key} active={sortColumn === c.key} dir={sortDir} />
                    </th>
                  ))}
                  <th style={{ ...thStyle("trend"), cursor: "default" }}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {visibleExecutives.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: 40, textAlign: "center" }}>
                      <div style={{ color: "#ADB5BD", marginBottom: 8 }}><ConstructionIcon size={28} /></div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", marginBottom: 12 }}>No executives found — try a different manager or clear the filter</p>
                      <button
                        onClick={() => setSelectedManagerCardId(null)}
                        style={{ border: "1.5px solid #DEE2E6", background: "transparent", borderRadius: 8, padding: "7px 16px", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A", cursor: "pointer" }}
                      >Clear Filter</button>
                    </td>
                  </tr>
                ) : visibleExecutives.map((exe, idx) => {
                  const tier = connectTier(exe.connectPct);
                  const isFirst = idx === 0;
                  return (
                    <tr
                      key={exe.id}
                      onClick={() => navigateToExecutive(exe.id)}
                      style={{ borderBottom: "1px solid #F0F0F0", cursor: "pointer", transition: "background 0.1s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 20px", textAlign: "left" }}>
                        {isFirst
                          ? <span aria-label="Rank 1" style={{ fontSize: 20, display: "inline-block", animation: "medalShimmer 3s ease-in-out infinite" }}>🥇</span>
                          : <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{idx + 1}</span>
                        }
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "white" }}>{exe.initials}</span>
                          </div>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{exe.name}</span>
                        </div>
                      </td>
                      <td style={{ ...TD, color: "#67748E", fontSize: 13, fontWeight: 400 }}>{exe.managerName}</td>
                      <td style={TD}>{exe.callsMade.toLocaleString()}</td>
                      <td style={{ ...TD }}>
                        <span style={{ background: tier.bg, color: tier.color, fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "4px 10px" }}>{exe.connectPct}%</span>
                      </td>
                      <td style={TD}>{exe.hotLeads}</td>
                      <td style={TD}>{exe.warmLeads}</td>
                      <td style={{ padding: "14px 20px", textAlign: "right" }}>
                        <Sparkline data={exe.dailyTrend} label={exe.name} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                  <th style={{ ...thStyle("rank"), textAlign: "left", cursor: "default", color: "#8392AB" }}>Rank</th>
                  <th style={{ ...thStyle("name"), textAlign: "left", cursor: "default" }}>Manager</th>
                  <th style={{ ...thStyle("department"), cursor: "default" }}>Department</th>
                  <th style={{ ...thStyle("teamSize"), cursor: "default" }}>Team</th>
                  {mgrCols.map(c => (
                    <th
                      key={c.key}
                      aria-sort={sortColumn === c.key ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                      style={thStyle(c.key)}
                      onClick={() => handleSort(c.key)}
                    >
                      {c.label}<SortChevron col={c.key} active={sortColumn === c.key} dir={sortDir} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedManagers.map((mgr, idx) => {
                  const tier = connectTier(mgr.connectPct);
                  const isFirst = idx === 0;
                  return (
                    <tr
                      key={mgr.id}
                      style={{ borderBottom: "1px solid #F0F0F0", transition: "background 0.1s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 20px", textAlign: "left" }}>
                        {isFirst
                          ? <span aria-label="Rank 1" style={{ fontSize: 20, display: "inline-block", animation: "medalShimmer 3s ease-in-out infinite" }}>🥇</span>
                          : <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{idx + 1}</span>
                        }
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "white" }}>{mgr.initials}</span>
                          </div>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{mgr.name}</span>
                        </div>
                      </td>
                      <td style={{ ...TD, color: "#67748E", fontSize: 13, fontWeight: 400 }}>{mgr.department}</td>
                      <td style={{ ...TD, color: "#67748E", fontSize: 13 }}>{mgr.teamSize} executives</td>
                      <td style={TD}>{mgr.callsMade.toLocaleString()}</td>
                      <td style={{ ...TD }}>
                        <span style={{ background: tier.bg, color: tier.color, fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "4px 10px" }}>{mgr.connectPct}%</span>
                      </td>
                      <td style={TD}>{mgr.hotLeads}</td>
                      <td style={TD}>{mgr.warmLeads}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── TEAM DETAIL SCREEN ───────────────────────────────────────────────────────

function CalendarIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function TrophyIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H3V4h3M18 9h3V4h-3M9 17v3h6v-3M12 17a5 5 0 005-5V4H7v8a5 5 0 005 5z" />
    </svg>
  );
}
function UploadIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </svg>
  );
}
function TrashIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
    </svg>
  );
}
function PersonPlusIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}
function BuildingPlusIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="14" height="18" rx="1" /><path d="M3 9h14M9 21V9" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

function TeamDetailScreen({ teamId, goBack, departments, teamsByDepartment }: {
  teamId: string;
  goBack: () => void;
  departments: DeptRecord[];
  teamsByDepartment: Record<string, TeamRecord[]>;
}) {
  const allTeams = Object.values(teamsByDepartment).flat();
  const currentTeam = allTeams.find(t => t.id === teamId);
  const currentTeamExecutives = teamExecutivesByTeam[teamId] ?? [];
  const currentTeamActivity   = teamActivityByTeam[teamId]   ?? [];
  const parentDeptEntry = Object.entries(teamsByDepartment).find(([, teams]) => teams.some(t => t.id === teamId));
  const parentDepartment = parentDeptEntry ? departments.find(d => d.id === parentDeptEntry[0]) : undefined;

  if (!currentTeam) {
    return (
      <div style={{ animation: "screenEnter 280ms ease-out both" }}>
        <button onClick={goBack} style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#67748E", padding: 0 }}>← Back</button>
      </div>
    );
  }

  const managerInitials = currentTeam.managerName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const KPI_CARDS = [
    { label: "Mapping Uploaded",      value: currentTeam.mappingUploaded.toLocaleString(), delta: "+6.2%",  icon: UploadIcon },
    { label: "Calls Done",            value: currentTeam.callsDone.toLocaleString(),        delta: "+9.8%",  icon: PhoneIcon },
    { label: "Follow-ups / Meetings", value: currentTeam.followUpsMeetings.toLocaleString(), delta: "+3.1%", icon: CalendarIcon },
    { label: "Total Conversions",     value: currentTeam.conversions.toLocaleString(),       delta: "+11.4%", icon: TrophyIcon },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "screenEnter 280ms ease-out both" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <button
          onClick={goBack}
          style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#67748E", padding: 0, transition: "color 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#17181C")}
          onMouseLeave={e => (e.currentTarget.style.color = "#67748E")}
        >
          ← Back to {parentDepartment?.name ?? "Organization"}
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#C4C9D4" }}>/</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{currentTeam.name}</span>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, flexShrink: 0 }}>
        {KPI_CARDS.map(card => (
          <div key={card.label} style={{
            background: "white", borderRadius: 18, padding: 20,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#8392AB", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>{card.label}</p>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 24, fontWeight: 700, color: "#1A1A1A", margin: "0 0 4px" }}>{card.value}</p>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#4CAF50" }}>{card.delta}</span>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#17181C", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", display: "flex", alignItems: "center" }}><card.icon size={20} /></span>
            </div>
          </div>
        ))}
      </div>

      {/* Manager info card */}
      <div style={{
        background: "white", borderRadius: 18, padding: 20, flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#17181C", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "white" }}>{managerInitials}</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>{currentTeam.managerName}</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", margin: "2px 0 0" }}>Team Manager</p>
        </div>
        <span style={{ background: "#4CAF50", color: "white", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, borderRadius: 9999, padding: "4px 12px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          ACTIVE
        </span>
      </div>

      {/* Two-column body */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

        {/* Left: Executive Performance Table */}
        <div style={{ flex: 1.6, background: "white", borderRadius: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)", overflow: "hidden", minWidth: 0 }}>
          <div style={{ height: 52, padding: "0 20px", display: "flex", alignItems: "center", borderBottom: "1px solid #F0F0F0" }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Executive Performance</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                  {["Executive", "Mapping", "Calls Done", "Follow-ups", "Meetings", "Conversions"].map(col => (
                    <th key={col} style={{ padding: "12px 20px", textAlign: "left", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#8392AB", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTeamExecutives.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "48px 20px", textAlign: "center" }}>
                      <div style={{ color: "#ADB5BD", marginBottom: 12 }}><ConstructionIcon size={32} /></div>
                      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: "0 0 6px" }}>No executives assigned to this team.</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", margin: 0 }}>Add executives to this team to see their performance here.</p>
                    </td>
                  </tr>
                ) : currentTeamExecutives.map(exe => (
                  <tr key={exe.id} style={{ borderBottom: "1px solid #F0F0F0" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "white" }}>{exe.initials}</span>
                        </div>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{exe.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{exe.mapping}</td>
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{exe.callsDone}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ background: "#F1F1F3", color: "#1A1A1A", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "3px 10px" }}>{exe.followUps}</span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ background: "#F1F1F3", color: "#1A1A1A", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "3px 10px" }}>{exe.meetings}</span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ background: "#F1F1F3", color: "#1A1A1A", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, borderRadius: 6, padding: "3px 10px" }}>{exe.conversions}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Recent Activity Feed */}
        <div style={{ width: 340, flexShrink: 0, background: "white", borderRadius: 18, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)" }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: "0 0 16px" }}>Recent Activity</p>
          {currentTeamActivity.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 0", gap: 10, textAlign: "center" }}>
              <span style={{ color: "#ADB5BD" }}><ConstructionIcon size={28} /></span>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: "0 0 4px" }}>No recent activity yet.</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", margin: 0 }}>Activity will appear here once this team starts logging calls.</p>
            </div>
          ) : currentTeamActivity.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < currentTeamActivity.length - 1 ? 14 : 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, marginTop: 5, flexShrink: 0, display: "block" }} />
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{item.text}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "#8392AB", margin: "2px 0 0" }}>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ORGANIZATION SCREENS ─────────────────────────────────────────────────────

function OrgDeptIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function OrgTeamIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="7" r="3" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <path d="M21 21v-2a4 4 0 00-3-3.87" />
    </svg>
  );
}

function TrendingUpIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function MapPinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function BarChart2Icon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6"  y1="20" x2="6"  y2="14" />
    </svg>
  );
}

function OrganizationScreen({ navigateToDepartment, goBack, departments, onOpenBuilder }: {
  navigateToDepartment: (id: string) => void;
  goBack: () => void;
  departments: DeptRecord[];
  onOpenBuilder: () => void;
}) {
  const handleCreate = onOpenBuilder;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "screenEnter 280ms ease-out both" }}>

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", margin: 0 }}>
          Browse departments, teams, and managers
        </p>
        {director.canManageOrg && (
          <button
            onClick={handleCreate}
            style={{
              height: 44, padding: "0 18px", background: "#17181C", color: "white",
              border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif",
              fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex",
              alignItems: "center", gap: 8, transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#000")}
            onMouseLeave={e => (e.currentTarget.style.background = "#17181C")}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Create Department
          </button>
        )}
      </div>

      {/* Department card grid */}
      {departments.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 12 }}>
          <span style={{ color: "#ADB5BD" }}><ConstructionIcon size={36} /></span>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>No departments yet</p>
          {director.canManageOrg && (
            <button onClick={handleCreate} style={{
              height: 40, padding: "0 16px", background: "#17181C", color: "white",
              border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>+ Create Department</button>
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {departments.map(dept => (
            <div
              key={dept.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${dept.name} department`}
              onClick={() => navigateToDepartment(dept.id)}
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && navigateToDepartment(dept.id)}
              style={{
                background: "white", borderRadius: 18, padding: 20, cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)"; }}
            >
              {/* Top */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14, background: "#17181C", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ color: "white", display: "flex" }}><OrgDeptIcon size={20} /></span>
                </div>
                <div>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>{dept.name}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", margin: "2px 0 0" }}>{dept.teamCount} team{dept.teamCount !== 1 ? "s" : ""}</p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "#F0F0F0", margin: "14px 0" }} />

              {/* 2×2 stat grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "Managers",    value: dept.managerCount },
                  { label: "Executives",  value: dept.executiveCount },
                  { label: "Total Calls", value: dept.totalCalls.toLocaleString() },
                  { label: "Conversions", value: dept.totalConversions },
                ].map(stat => (
                  <div key={stat.label}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#8392AB", textTransform: "uppercase", letterSpacing: "0.04em", margin: "0 0 3px" }}>{stat.label}</p>
                    <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrganizationDepartmentScreen({ departmentId, navigateToTeam, goBack, departments, teamsByDepartment }: {
  departmentId: string;
  navigateToTeam: (id: string) => void;
  goBack: () => void;
  departments: DeptRecord[];
  teamsByDepartment: Record<string, TeamRecord[]>;
}) {
  const currentDepartment = departments.find(d => d.id === departmentId);
  const currentTeams = teamsByDepartment[departmentId] ?? [];

  if (!currentDepartment) {
    return (
      <div style={{ animation: "screenEnter 280ms ease-out both" }}>
        <button onClick={goBack} style={{
          background: "transparent", border: "none", cursor: "pointer",
          fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#67748E", padding: 0,
        }}>← Back</button>
      </div>
    );
  }

  const KPI_CARDS = [
    { label: "Teams",             value: String(currentDepartment.teamCount),        icon: OrgTeamIcon },
    { label: "Managers",          value: String(currentDepartment.managerCount),      icon: TeamIcon },
    { label: "Executives",        value: String(currentDepartment.executiveCount),    icon: TeamIcon },
    { label: "Total Conversions", value: String(currentDepartment.totalConversions),  icon: CheckIcon },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "screenEnter 280ms ease-out both" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <button
          onClick={goBack}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
            color: "#67748E", padding: 0, transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#17181C")}
          onMouseLeave={e => (e.currentTarget.style.color = "#67748E")}
        >
          ← Back to Organization
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#C4C9D4" }}>/</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{currentDepartment.name}</span>
      </div>

      {/* Department Summary KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, flexShrink: 0 }}>
        {KPI_CARDS.map(card => (
          <div key={card.label} style={{
            background: "white", borderRadius: 18, padding: 20,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
                {card.label}
              </p>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 26, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>
                {card.value}
              </p>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 10, background: "#17181C", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "white", display: "flex", alignItems: "center" }}>
                <card.icon size={20} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Teams section title */}
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A", margin: "4px 0 -4px", flexShrink: 0 }}>
        Teams in {currentDepartment.name}
      </p>

      {/* Team card grid */}
      {currentTeams.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 200, gap: 10 }}>
          <span style={{ color: "#ADB5BD" }}><ConstructionIcon size={28} /></span>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>No teams in this department yet</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {currentTeams.map(team => (
            <div
              key={team.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${team.name}`}
              onClick={() => navigateToTeam(team.id)}
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && navigateToTeam(team.id)}
              style={{
                background: "white", borderRadius: 18, padding: 20, cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)"; }}
            >
              {/* Top */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: "#17181C", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ color: "white", display: "flex" }}><OrgTeamIcon size={18} /></span>
                </div>
                <div>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>{team.name}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", margin: "2px 0 0" }}>Manager: {team.managerName}</p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "#F0F0F0", margin: "12px 0" }} />

              {/* Metric rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Mapping Uploaded",    value: team.mappingUploaded.toLocaleString() },
                  { label: "Calls Done",           value: team.callsDone.toLocaleString() },
                  { label: "Follow-ups / Meetings", value: team.followUpsMeetings },
                  { label: "Conversions",          value: team.conversions },
                ].map(m => (
                  <div key={m.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB" }}>{m.label}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB" }}>{team.executiveCount} executives</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>View Activity →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── EXECUTIVE PROFILE SCREEN ─────────────────────────────────────────────────

function ExecutiveProfileTrendChart({ data }: { data: number[] }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; day: number; value: number } | null>(null);
  const W = 420, H = 180, PL = 36, PB = 28, PT = 16;
  const chartW = W - PL;
  const chartH = H - PB - PT;
  const maxVal = Math.max(...data, 1);
  const minVal = Math.min(...data);
  const range  = maxVal - minVal || 1;
  const days   = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const px = (i: number) => PL + (i / (data.length - 1)) * chartW;
  const py = (v: number) => PT + (1 - (v - minVal) / range) * chartH;

  const points = data.map((v, i) => `${px(i)},${py(v)}`).join(" ");
  const areaPath = `M${px(0)},${py(data[0])} ` + data.map((v, i) => `L${px(i)},${py(v)}`).join(" ")
    + ` L${px(data.length - 1)},${PT + chartH} L${px(0)},${PT + chartH} Z`;

  const yTicks = [minVal, Math.round((minVal + maxVal) / 2), maxVal];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 180, overflow: "visible" }}>
        <defs>
          <linearGradient id="exec-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4CAF50" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y-axis ticks */}
        {yTicks.map(v => (
          <text key={v} x={PL - 6} y={py(v) + 4} textAnchor="end"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fill: "#ADB5BD" }}>{v}</text>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#exec-area-grad)" />

        {/* Line */}
        <polyline points={points} fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinejoin="round" />

        {/* Hover points */}
        {data.map((v, i) => (
          <circle
            key={i}
            cx={px(i)} cy={py(v)} r={5}
            fill="white" stroke="#4CAF50" strokeWidth="2"
            style={{ cursor: "pointer", opacity: tooltip?.day === i ? 1 : 0, transition: "opacity 0.1s" }}
            onMouseEnter={e => {
              const rect = (e.target as SVGCircleElement).closest("svg")!.getBoundingClientRect();
              const svgEl = (e.target as SVGCircleElement).closest("svg")!;
              const parentRect = svgEl.parentElement!.getBoundingClientRect();
              setTooltip({ x: px(i) / W * 100, y: py(v), day: i, value: v });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
        {/* Invisible wider hit targets */}
        {data.map((v, i) => (
          <rect
            key={`hit-${i}`}
            x={px(i) - 18} y={PT} width={36} height={chartH}
            fill="transparent"
            onMouseEnter={() => setTooltip({ x: px(i) / W * 100, y: py(v), day: i, value: v })}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}

        {/* X-axis labels */}
        {days.map((d, i) => (
          <text key={d} x={px(i)} y={H - 4} textAnchor="middle"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fill: "#ADB5BD" }}>{d}</text>
        ))}
      </svg>

      {tooltip && (
        <div style={{
          position: "absolute", left: `${tooltip.x}%`, top: 0, transform: "translateX(-50%)",
          background: "#1A1A1A", color: "white", borderRadius: 8, padding: "8px 12px",
          fontFamily: "Inter, sans-serif", fontSize: 12, pointerEvents: "none", whiteSpace: "nowrap",
          zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4CAF50", display: "inline-block" }} />
            {days[tooltip.day]}
          </div>
          <div style={{ marginTop: 2 }}>Calls: <strong>{tooltip.value}</strong></div>
        </div>
      )}
    </div>
  );
}

function ExecutiveProfileDonut({ received, notPicked, notInterested }: { received: number; notPicked: number; notInterested: number }) {
  const total = received + notPicked + notInterested || 1;
  const slices = [
    { value: received,      color: "#4CAF50", label: "Received",       count: received },
    { value: notPicked,     color: "#8392AB", label: "Not Picked",     count: notPicked },
    { value: notInterested, color: "#F5365C", label: "Not Interested", count: notInterested },
  ];

  const CX = 70, CY = 70, R = 52, INNER = 28;
  let angle = -Math.PI / 2;
  const paths = slices.map(s => {
    const sweep = (s.value / total) * 2 * Math.PI;
    const x1 = CX + R * Math.cos(angle), y1 = CY + R * Math.sin(angle);
    angle += sweep;
    const x2 = CX + R * Math.cos(angle), y2 = CY + R * Math.sin(angle);
    const xi1 = CX + INNER * Math.cos(angle - sweep), yi1 = CY + INNER * Math.sin(angle - sweep);
    const xi2 = CX + INNER * Math.cos(angle), yi2 = CY + INNER * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    return { ...s, d: `M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} L${xi2},${yi2} A${INNER},${INNER} 0 ${large} 0 ${xi1},${yi1} Z` };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
      <svg width={140} height={140} viewBox={`0 0 140 140`} style={{ flexShrink: 0 }}>
        {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} />)}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {slices.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0, display: "inline-block" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E" }}>{s.label}:</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: "#1A1A1A" }}>{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutiveProfileScreen({ executiveId, goBack, prevScreenTitle, navigateToLead }: {
  executiveId: string;
  goBack: () => void;
  prevScreenTitle: string;
  navigateToLead: (id: string) => void;
}) {
  const profile = getExecutiveProfile(executiveId);

  if (!profile.identity) {
    return (
      <div style={{ animation: "screenEnter 280ms ease-out both" }}>
        <button onClick={goBack} style={{
          background: "transparent", border: "none", cursor: "pointer",
          fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#67748E", padding: 0,
        }}>← Back</button>
      </div>
    );
  }

  const { identity, performance, callBreakdown, assignedLeads } = profile;
  const ctTier = callBreakdown ? connectTier(callBreakdown.connectPct) : { bg: "#F1F1F3", color: "#8392AB" };

  const KPI_CARDS = [
    { label: "Calls Made",    value: performance?.callsMade.toLocaleString() ?? "—", icon: PhoneIcon },
    { label: "Connect Rate",  value: callBreakdown ? `${callBreakdown.connectPct}%` : "—", icon: CheckIcon },
    { label: "Hot Leads",     value: String(performance?.hotLeads ?? "—"), icon: FlameIcon },
    { label: "Warm Leads",    value: String(performance?.warmLeads ?? "—"), icon: InboxIcon },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "screenEnter 280ms ease-out both" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <button
          onClick={goBack}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
            color: "#67748E", padding: 0, transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#17181C")}
          onMouseLeave={e => (e.currentTarget.style.color = "#67748E")}
        >
          ← Back to {prevScreenTitle}
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#C4C9D4" }}>/</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{identity.name}</span>
      </div>

      {/* Profile header card */}
      <div style={{
        background: "white", borderRadius: 18, padding: 20, flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Avatar */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "#17181C", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 700, color: "white" }}>
              {identity.initials}
            </span>
          </div>
          {/* Identity */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>
                {identity.name}
              </h1>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB" }}>
                Executive · {identity.department}
              </span>
            </div>
            <div style={{ marginTop: 6, display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                `Manager: ${identity.managerName}`,
                `Email: ${identity.email}`,
                `Phone: ${identity.phone}`,
                `Joined: ${identity.joinedDate}`,
              ].map(txt => (
                <span key={txt} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E" }}>{txt}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Connect Rate badge */}
        {callBreakdown && (
          <span style={{
            background: ctTier.bg, color: ctTier.color,
            fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700,
            borderRadius: 8, padding: "8px 16px", flexShrink: 0,
          }}>
            {callBreakdown.connectPct}% Connect Rate
          </span>
        )}
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, flexShrink: 0 }}>
        {KPI_CARDS.map(card => (
          <div key={card.label} style={{
            background: "white", borderRadius: 18, padding: 20,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
                {card.label}
              </p>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 24, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>
                {card.value}
              </p>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 10, background: "#17181C", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "white", display: "flex", alignItems: "center" }}>
                <card.icon size={20} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16, flexShrink: 0 }}>
        {/* Call outcome donut */}
        <div style={{
          background: "white", borderRadius: 18, padding: 20, minHeight: 280,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: "0 0 16px" }}>
            Call Outcome Breakdown
          </p>
          {callBreakdown ? (
            <ExecutiveProfileDonut
              received={callBreakdown.received}
              notPicked={callBreakdown.notPicked}
              notInterested={callBreakdown.notInterested}
            />
          ) : (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>No call data available</p>
          )}
        </div>

        {/* 7-day trend chart */}
        <div style={{
          background: "white", borderRadius: 18, padding: 20, minHeight: 280,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: "0 0 4px" }}>
            Call Volume Trend
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", margin: "0 0 16px" }}>Last 7 days</p>
          {performance ? (
            <ExecutiveProfileTrendChart data={performance.dailyTrend} />
          ) : (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>No trend data available</p>
          )}
        </div>
      </div>

      {/* Assigned leads table */}
      <div style={{
        background: "white", borderRadius: 18,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        <div style={{ height: 52, padding: "0 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #F0F0F0" }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Assigned Leads</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>{assignedLeads.length} lead{assignedLeads.length !== 1 ? "s" : ""}</span>
        </div>

        {assignedLeads.length === 0 ? (
          <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#ADB5BD" }}><ConstructionIcon size={28} /></span>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>
              No leads currently assigned to {identity.name}
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                {["Company", "Industry", "Temperature", "Stage", "Last Call"].map(col => (
                  <th key={col} style={{
                    padding: "12px 20px", textAlign: "left",
                    fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
                    color: "#8392AB", textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignedLeads.map(lead => {
                const tc = temperatureColor(lead.temperature);
                return (
                  <tr
                    key={lead.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`View lead: ${lead.companyName}`}
                    onClick={() => navigateToLead(lead.id)}
                    onKeyDown={e => (e.key === "Enter" || e.key === " ") && navigateToLead(lead.id)}
                    style={{ borderBottom: "1px solid #F0F0F0", cursor: "pointer", transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
                      {lead.companyName}
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E" }}>
                      {lead.industry}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        background: tc.bg, color: tc.border,
                        fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700,
                        textTransform: "uppercase", borderRadius: 6, padding: "3px 10px",
                      }}>{tc.label}</span>
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1A1A1A" }}>
                      {lead.currentStage}
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E" }}>
                      {lead.lastCallDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── LEADS SCREEN ─────────────────────────────────────────────────────────────

function LeadsScreen({ navigateToLead, temperatureTab, setTemperatureTab, leadIndustryFilter, setLeadIndustryFilter, leadManagerFilter, setLeadManagerFilter }: { navigateToLead: (id: string) => void; temperatureTab: string; setTemperatureTab: (v: string) => void; leadIndustryFilter: string; setLeadIndustryFilter: (v: string) => void; leadManagerFilter: string; setLeadManagerFilter: (v: string) => void }) {
  const filteredLeads = leadsList.filter(lead => {
    const matchTemp     = temperatureTab === "All"      || lead.temperature === temperatureTab;
    const matchIndustry = leadIndustryFilter === "All"  || lead.industry    === leadIndustryFilter;
    const matchManager  = leadManagerFilter === "All"   || lead.managerName === leadManagerFilter;
    return matchTemp && matchIndustry && matchManager;
  });

  const scopedLeads = leadsList.filter(lead =>
    (leadIndustryFilter === "All" || lead.industry    === leadIndustryFilter) &&
    (leadManagerFilter  === "All" || lead.managerName === leadManagerFilter)
  );
  const filterRatio  = (leadIndustryFilter === "All" && leadManagerFilter === "All")
    ? 1 : Math.max(scopedLeads.length / leadsList.length, 0.05);
  const scaledFunnel = funnelStages.map(s => ({ ...s, count: Math.round(s.count * filterRatio) }));

  const handleCardClick = (id: string) => navigateToLead(id);

  const clearFilters = () => {
    setTemperatureTab("All");
    setLeadIndustryFilter("All");
    setLeadManagerFilter("All");
  };

  const TEMP_TABS = ["All", "hot", "warm", "cold"] as const;

  // ── Funnel panel ──────────────────────────────────────────────────────────
  const FunnelPanel = () => (
    <div style={{
      width: 300, flexShrink: 0, background: "white", borderRadius: 18,
      boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
      padding: 20, display: "flex", flexDirection: "column",
    }}>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", marginBottom: 16 }}>Pipeline Funnel</p>

      {scaledFunnel[0].count === 0 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#ADB5BD", gap: 8 }}>
          <ConstructionIcon size={28} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", textAlign: "center" }}>No pipeline data for this selection</span>
        </div>
      ) : scaledFunnel.map((stage, i) => {
        const widthPct = Math.max((stage.count / scaledFunnel[0].count) * 100, 30);
        // Dark → progressively lighter through the funnel
        const fills = ["#17181C", "#344055", "#4D6275", "#6B8090", "#8392AB"];
        const next  = scaledFunnel[i + 1];
        const convPct = next ? Math.round((next.count / stage.count) * 100) : null;

        return (
          <div key={stage.stage} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Bar */}
            <div style={{
              width: `${widthPct}%`, height: 40, background: fills[i] ?? "#8392AB",
              borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "white", marginRight: 6 }}>{stage.stage}</span>
              <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: "white" }}>{stage.count.toLocaleString()}</span>
            </div>

            {/* Conversion connector */}
            {convPct !== null && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "4px 0" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#67748E" }}>{convPct}%</span>
                <span style={{ color: "#8392AB", fontSize: 10, lineHeight: 1 }}>↓</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ display: "flex", gap: 16, animation: "screenEnter 280ms ease-out both", minHeight: 0 }}>

      {/* Left: funnel */}
      <FunnelPanel />

      {/* Right: tabs + filters + cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>

        {/* Temperature tab strip */}
        <div role="tablist" aria-label="Lead temperature filter" style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {TEMP_TABS.map(tab => {
            const active = temperatureTab === tab;
            const tc = tab !== "All" ? temperatureColor(tab) : null;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={active}
                onClick={() => setTemperatureTab(tab)}
                style={{
                  height: 36, padding: "0 18px", borderRadius: 8, border: "none",
                  fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.15s",
                  background: active ? "#17181C" : "#F1F1F3",
                  color: active ? "white" : "#67748E",
                  borderBottom: active && tc ? `2px solid ${tc.border}` : "2px solid transparent",
                }}
              >
                {tab === "All" ? "All" : temperatureColor(tab).label}
              </button>
            );
          })}
        </div>

        {/* Filter chip rows */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <div role="radiogroup" aria-label="Filter by industry" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {leadIndustries.map(ind => (
              <button key={ind} role="radio" aria-checked={leadIndustryFilter === ind}
                onClick={() => setLeadIndustryFilter(ind)}
                style={{
                  height: 30, padding: "0 12px", borderRadius: 9999, border: "none",
                  fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer",
                  background: leadIndustryFilter === ind ? "#17181C" : "#F1F1F3",
                  color:      leadIndustryFilter === ind ? "white"   : "#67748E",
                  transition: "all 0.15s",
                }}>{ind}</button>
            ))}
          </div>

          <div style={{ width: 1, height: 20, background: "#EEEEEE", flexShrink: 0 }} />

          <div role="radiogroup" aria-label="Filter by manager" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {leadManagers.map(mgr => (
              <button key={mgr} role="radio" aria-checked={leadManagerFilter === mgr}
                onClick={() => setLeadManagerFilter(mgr)}
                style={{
                  height: 30, padding: "0 12px", borderRadius: 9999, border: "none",
                  fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer",
                  background: leadManagerFilter === mgr ? "#17181C" : "#F1F1F3",
                  color:      leadManagerFilter === mgr ? "white"   : "#67748E",
                  transition: "all 0.15s",
                }}>{mgr}</button>
            ))}
          </div>

          <span style={{ marginLeft: "auto", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", flexShrink: 0 }}>
            {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Lead card list — key on temperatureTab so the list crossfades on tab switch */}
        <div key={temperatureTab} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, animation: "screenEnter 150ms ease-out both" }}>
          {filteredLeads.length === 0 ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 40 }}>
              <div style={{ color: "#ADB5BD" }}><ConstructionIcon size={32} /></div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>No leads match this filter</p>
              <button onClick={clearFilters} style={{
                border: "1.5px solid #DEE2E6", background: "transparent", borderRadius: 8,
                padding: "7px 16px", fontFamily: "Inter, sans-serif", fontSize: 13,
                fontWeight: 600, color: "#1A1A1A", cursor: "pointer",
              }}>Clear Filters</button>
            </div>
          ) : filteredLeads.map(lead => {
            const tc = temperatureColor(lead.temperature);
            return (
              <div
                key={lead.id}
                role="button"
                tabIndex={0}
                aria-label={`View lead: ${lead.companyName}`}
                onClick={() => handleCardClick(lead.id)}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleCardClick(lead.id)}
                style={{
                  background: "white", borderRadius: 16, padding: 16,
                  borderLeft: `4px solid ${tc.border}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
                  cursor: "pointer", transition: "all 0.15s", flexShrink: 0,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)"; }}
              >
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>{lead.companyName}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", marginTop: 2 }}>{lead.industry}</div>
                  </div>
                  <span style={{
                    background: tc.bg, color: tc.border, fontFamily: "Inter, sans-serif",
                    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                    borderRadius: 6, padding: "3px 8px", flexShrink: 0, marginLeft: 12,
                  }}>{tc.label}</span>
                </div>

                {/* Meta row */}
                <div style={{ marginTop: 10, display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {[
                    `Assigned to ${lead.assignedExecutive}`,
                    `Manager: ${lead.managerName}`,
                    `Last call: ${lead.lastCallDate}`,
                  ].map(txt => (
                    <span key={txt} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E" }}>{txt}</span>
                  ))}
                </div>

                {/* Bottom row */}
                <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ background: "#F1F1F3", color: "#1A1A1A", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, borderRadius: 6, padding: "3px 10px" }}>{lead.currentStage}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB" }}>{lead.daysInPipeline} days in pipeline</span>
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>View →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── LEAD DETAIL SCREEN ───────────────────────────────────────────────────────

function LeadsDetailPlaceholder({ leadId, goBack, prevScreenTitle }: { leadId: string; goBack: () => void; prevScreenTitle: string }) {
  const lead = leadsList.find(l => l.id === leadId);

  if (!lead) {
    return (
      <div style={{ animation: "screenEnter 280ms ease-out both" }}>
        <button onClick={goBack} style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "transparent", border: "none", cursor: "pointer",
          fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#67748E", padding: 0,
        }}>← Back</button>
      </div>
    );
  }

  const tc = temperatureColor(lead.temperature);
  const timeline = getLeadTimeline(lead.id, lead);

  const handleDownloadPDF = () => {
    toast(`Activity log for ${lead.companyName} exported as PDF`, { duration: 3000 });
  };

  const SUMMARY_ROWS = [
    { label: "Stage",            value: lead.currentStage },
    { label: "Total Calls",      value: String(lead.totalCalls) },
    { label: "Connected",        value: String(lead.connectedCalls) },
    { label: "Days in Pipeline", value: `${lead.daysInPipeline} days` },
    { label: "Next Action",      value: lead.nextAction },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", animation: "screenEnter 280ms ease-out both" }}>

      {/* Breadcrumb */}
      <div className="sv-breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, flexShrink: 0 }}>
        <button
          onClick={goBack}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
            color: "#67748E", padding: 0, transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#17181C")}
          onMouseLeave={e => (e.currentTarget.style.color = "#67748E")}
          aria-label={`Back to ${prevScreenTitle}`}
        >
          ← Back to {prevScreenTitle}
        </button>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#C4C9D4" }}>/</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{lead.companyName}</span>
      </div>

      {/* Lead header card */}
      <div style={{
        background: "white", borderRadius: 18, padding: 20, marginBottom: 16, flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
      }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>
              {lead.companyName}
            </h1>
            <span style={{
              background: tc.bg, color: tc.border,
              fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700,
              textTransform: "uppercase", borderRadius: 6, padding: "3px 10px", flexShrink: 0,
            }}>{tc.label}</span>
            <span style={{
              background: "#F1F1F3", color: "#67748E",
              fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
              borderRadius: 6, padding: "3px 10px", flexShrink: 0,
            }}>🔒 Director View — Read Only</span>
            <span className="sr-only">This lead is read-only. No edit actions are available.</span>
          </div>
          <button
            onClick={handleDownloadPDF}
            aria-label={`Download PDF activity log for ${lead.companyName}`}
            style={{
              height: 40, padding: "0 16px", background: "#17181C", color: "white",
              border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif",
              fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex",
              alignItems: "center", gap: 7, flexShrink: 0, transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#000000")}
            onMouseLeave={e => (e.currentTarget.style.background = "#17181C")}
          >
            <DownloadIcon size={14} /> Download PDF
          </button>
        </div>

        {/* Meta row */}
        <div style={{ marginTop: 14, display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            `Industry: ${lead.industry}`,
            `Stage: ${lead.currentStage}`,
            `Assigned to: ${lead.assignedExecutive}`,
            `Manager: ${lead.managerName}`,
            `Mapped: ${lead.dateMapped}`,
          ].map(txt => (
            <span key={txt} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E" }}>{txt}</span>
          ))}
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ flex: 1, display: "flex", gap: 16, minHeight: 0 }}>

        {/* Left: Activity Timeline */}
        <div style={{
          flex: 1, background: "white", borderRadius: 18, padding: 20, overflowY: "auto",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
          minWidth: 0,
        }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: "0 0 20px" }}>
            Activity Timeline
          </p>

          {timeline.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, gap: 10 }}>
              <span style={{ color: "#ADB5BD" }}><ConstructionIcon size={28} /></span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>No activity recorded for this lead yet</span>
            </div>
          ) : (
            <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {timeline.map((entry, i) => (
                <li key={i} style={{
                  position: "relative",
                  marginLeft: 8,
                  paddingLeft: 20,
                  paddingBottom: i < timeline.length - 1 ? 20 : 0,
                  borderLeft: i < timeline.length - 1 ? "2px solid #EEEEEE" : "2px solid transparent",
                  animation: `timelineEntry 250ms ease-out ${Math.min(i, 7) * 60}ms both`,
                }}>
                  <span style={{
                    position: "absolute", left: -5, top: 5,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#17181C", display: "block",
                  }} />
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB", margin: "0 0 3px" }}>
                    {entry.date}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: "0 0 2px" }}>
                    {entry.action} — {entry.outcome}
                  </p>
                  {entry.duration !== "—" && (
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", margin: "0 0 2px" }}>
                      Duration: {entry.duration}
                    </p>
                  )}
                  {entry.note && (
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1A1A1A", margin: "4px 0 0", fontStyle: "italic" }}>
                      {entry.note}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Right: Lead Summary Panel */}
        <div style={{
          width: 320, flexShrink: 0, background: "white", borderRadius: 18, padding: 20,
          display: "flex", flexDirection: "column",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
          alignSelf: "flex-start",
        }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: "0 0 16px" }}>
            Summary
          </p>

          {SUMMARY_ROWS.map((row, i) => (
            <div key={row.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              paddingBottom: i < SUMMARY_ROWS.length - 1 ? 12 : 0,
              marginBottom: i < SUMMARY_ROWS.length - 1 ? 12 : 0,
              borderBottom: i < SUMMARY_ROWS.length - 1 ? "1px solid #F0F0F0" : "none",
            }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", flexShrink: 0, marginRight: 12 }}>{row.label}</span>
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#1A1A1A",
                textAlign: "right", fontVariantNumeric: "tabular-nums",
              }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAPPING SCREEN ───────────────────────────────────────────────────────────

function IndustryBarChart({ data }: { data: typeof mappingByIndustry }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; industry: string; value: number } | null>(null);
  const W = 480, H = 230, PL = 40, PB = 64, PT = 24;
  const chartW = W - PL;
  const chartH = H - PB - PT;
  const maxVal = Math.max(...data.map(d => d.totalMapped), 1);
  const yMax = Math.ceil(maxVal / 100) * 100;
  const barW = Math.floor((chartW / data.length) * 0.52);
  const groupW = chartW / data.length;

  const yTicks = [0, Math.round(yMax / 2), yMax];

  if (data.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 200, color: "#ADB5BD" }}>
        <ConstructionIcon size={32} />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", marginTop: 8 }}>No mapping data for this selection</span>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-label="Mapping totals by industry" role="img" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        {yTicks.map((t, i) => {
          const y = PT + chartH - (t / yMax) * chartH;
          return (
            <g key={`yt-${i}`}>
              <line x1={PL} x2={W} y1={y} y2={y} stroke="#F0F0F0" strokeWidth={1} />
              <text x={PL - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#8392AB" fontFamily="Inter, sans-serif">{t}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const bh = Math.max(3, (d.totalMapped / yMax) * chartH);
          const bx = PL + i * groupW + (groupW - barW) / 2;
          const by = PT + chartH - bh;
          const cx = bx + barW / 2;
          return (
            <g key={`bar-${i}`}>
              <rect
                x={bx} y={by} width={barW} height={bh}
                fill="#4CAF50" rx={3} style={{ cursor: "pointer" }}
                onMouseEnter={() => setTooltip({ x: cx, y: by, industry: d.industry, value: d.totalMapped })}
                onMouseLeave={() => setTooltip(null)}
              />
              {/* Value above bar */}
              <text x={cx} y={by - 5} textAnchor="middle" fontSize={10} fontWeight={600} fill="#1A1A1A" fontFamily="Inter, sans-serif">{d.totalMapped}</text>
              {/* X label — rotated -35° anchored at bar centre, sitting within PB space */}
              <text
                x={cx} y={PT + chartH + 14}
                textAnchor="end" fontSize={10} fill="#8392AB" fontFamily="Inter, sans-serif"
                transform={`rotate(-35, ${cx}, ${PT + chartH + 14})`}
              >{d.industry}</text>
            </g>
          );
        })}
      </svg>
      {tooltip && (
        <div style={{
          position: "absolute",
          left: `calc(${(tooltip.x / W) * 100}% - 72px)`,
          top: `calc(${(tooltip.y / H) * 100}% - 16px)`,
          background: "#1A1A1A", borderRadius: 8, padding: "8px 12px",
          pointerEvents: "none", zIndex: 20, minWidth: 144,
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          transform: "translateY(-100%)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "#4CAF50", flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "Inter, sans-serif" }}>{tooltip.industry}</span>
          </div>
          <span style={{ color: "white", fontSize: 12, fontFamily: "Inter, sans-serif" }}>Total Mapped: <strong>{tooltip.value}</strong></span>
        </div>
      )}
    </div>
  );
}

function AssignedDonut({ assigned, unassigned }: { assigned: number; unassigned: number }) {
  const total = assigned + unassigned;
  const R = 60, r = 38, cx = 80, cy = 80;
  const assignedAngle = (assigned / total) * 2 * Math.PI;

  const arcPath = (startA: number, sweep: number, outerR: number, innerR: number) => {
    const x1 = cx + outerR * Math.cos(startA - Math.PI / 2);
    const y1 = cy + outerR * Math.sin(startA - Math.PI / 2);
    const x2 = cx + outerR * Math.cos(startA + sweep - Math.PI / 2);
    const y2 = cy + outerR * Math.sin(startA + sweep - Math.PI / 2);
    const ix1 = cx + innerR * Math.cos(startA + sweep - Math.PI / 2);
    const iy1 = cy + innerR * Math.sin(startA + sweep - Math.PI / 2);
    const ix2 = cx + innerR * Math.cos(startA - Math.PI / 2);
    const iy2 = cy + innerR * Math.sin(startA - Math.PI / 2);
    const large = sweep > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg viewBox="0 0 160 160" style={{ width: 160, height: 160 }}>
        <path d={arcPath(0, assignedAngle, R, r)} fill="#4CAF50" />
        <path d={arcPath(assignedAngle, 2 * Math.PI - assignedAngle, R, r)} fill="#DEE2E6" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={16} fontWeight={700} fill="#1A1A1A" fontFamily="Poppins, sans-serif">{total.toLocaleString()}</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fontSize={9} fill="#8392AB" fontFamily="Inter, sans-serif">Total Contacts</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 200, marginTop: 8 }}>
        {[
          { label: "Assigned", value: assigned, color: "#4CAF50" },
          { label: "Unassigned", value: unassigned, color: "#DEE2E6", textColor: "#8392AB" },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: item.color, border: item.color === "#DEE2E6" ? "1px solid #CCC" : "none", flexShrink: 0 }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E" }}>{item.label}</span>
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: item.textColor ?? "#1A1A1A" }}>{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  const [width, setWidth] = useState(0);
  const tier = coverageTier(pct);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 60);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div style={{ height: 4, background: "#DEE2E6", borderRadius: 9999, overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 9999, background: tier.color,
        width: `${width}%`, transition: "width 800ms ease-out",
      }} />
    </div>
  );
}

function MappingScreen({ industryFilter, setIndustryFilter }: { industryFilter: string; setIndustryFilter: (v: string) => void }) {
  const filteredRows = industryFilter === "All" ? mappingByIndustry : mappingByIndustry.filter(r => r.industry === industryFilter);

  const mappedAnim = useCountUp(mappingKpis.totalMapped);
  const assignedAnim = useCountUp(mappingKpis.totalAssigned);
  const unassignedAnim = useCountUp(mappingKpis.totalUnassigned);

  const kpis = [
    {
      label: "Total Mapped", value: mappingKpis.totalMapped, animated: mappedAnim,
      delta: mappingKpis.totalMappedDelta, invertDelta: false, icon: MapIcon,
    },
    {
      label: "Assigned", value: mappingKpis.totalAssigned, animated: assignedAnim,
      delta: mappingKpis.totalAssignedDelta, invertDelta: false, icon: CheckIcon,
    },
    {
      label: "Unassigned", value: mappingKpis.totalUnassigned, animated: unassignedAnim,
      // Negative delta on unassigned = fewer gaps = good news, so invert color logic here only
      delta: mappingKpis.totalUnassignedDelta, invertDelta: true, icon: InboxIcon,
    },
    {
      label: "Avg Coverage", value: null, displayStr: `${mappingKpis.avgCoveragePct}%`,
      delta: mappingKpis.avgCoveragePctDelta, invertDelta: false, icon: TargetIcon,
    },
  ];

  return (
    <div style={{ animation: "screenEnter 280ms ease-out both" }}>
      {/* Industry Filter Chips */}
      <div role="radiogroup" aria-label="Industry filter" style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {industries.map(ind => (
          <button
            key={ind}
            role="radio"
            aria-checked={industryFilter === ind}
            onClick={() => setIndustryFilter(ind)}
            style={{
              height: 32, padding: "0 16px", borderRadius: 9999, border: "none",
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "all 0.15s",
              background: industryFilter === ind ? "#17181C" : "#F1F1F3",
              color: industryFilter === ind ? "white" : "#67748E",
            }}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
        {kpis.map((kpi, i) => {
          const positive = (kpi.delta ?? 0) >= 0;
          // For invertDelta cards: negative is good (green), positive is bad (red)
          const deltaColor = kpi.invertDelta
            ? (positive ? "#F5365C" : "#4CAF50")
            : (positive ? "#4CAF50" : "#F5365C");
          const Icon = kpi.icon;
          return (
            <div key={i} style={{
              background: "white", borderRadius: 18, padding: 20, height: 116,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#67748E" }}>{kpi.label}</span>
                <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 30, fontWeight: 700, color: "#1A1A1A", marginTop: 4, lineHeight: 1 }}>
                  {kpi.displayStr ?? (kpi.animated ?? 0).toLocaleString()}
                </span>
                <div style={{ marginTop: 8 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13 }}>
                    <span style={{ fontWeight: 700, color: deltaColor }}>
                      {positive ? "+" : ""}{kpi.delta}%
                    </span>
                    {" "}
                    <span style={{ color: "#8392AB", fontWeight: 400 }}>than last week</span>
                  </span>
                </div>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: 14, background: "#17181C",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ color: "white", display: "flex", alignItems: "center" }}>
                  <Icon size={22} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Mapping by Industry Bar Chart */}
        <div style={{
          background: "white", borderRadius: 18, padding: 20, minHeight: 320,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Mapping by Industry</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", marginBottom: 16 }}>Total mapped contacts</p>
          <div style={{ paddingBottom: 8 }}>
            <IndustryBarChart data={filteredRows} />
          </div>
        </div>

        {/* Assigned vs Unassigned Donut */}
        <div style={{
          background: "white", borderRadius: 18, padding: 20, minHeight: 320,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          display: "flex", flexDirection: "column",
        }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Assigned vs Unassigned</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", marginBottom: 16 }}>Company-wide</p>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AssignedDonut
              assigned={mappingByIndustry.reduce((s, r) => s + r.assigned, 0)}
              unassigned={mappingByIndustry.reduce((s, r) => s + r.unassigned, 0)}
            />
          </div>
        </div>
      </div>

      {/* Industry Breakdown Table */}
      <div style={{
        background: "white", borderRadius: 18, marginBottom: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        <div style={{ height: 52, padding: "0 20px", display: "flex", alignItems: "center", borderBottom: "1px solid #F0F0F0" }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Industry Breakdown</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                {["Industry", "Total Mapped", "Assigned", "Unassigned", "Calls Initiated", "Coverage %"].map(col => (
                  <th key={col} style={{
                    fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
                    color: "#8392AB", textTransform: "uppercase", letterSpacing: "0.6px",
                    padding: "12px 20px", textAlign: col === "Industry" ? "left" : "right",
                    background: "transparent", whiteSpace: "nowrap",
                  }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: 40, textAlign: "center" }}>
                    <div style={{ color: "#ADB5BD", marginBottom: 8 }}><ConstructionIcon size={28} /></div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>No industry data for this period</span>
                  </td>
                </tr>
              ) : filteredRows.map((row, i) => {
                const tier = coverageTier(row.coveragePct);
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #F0F0F0", transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 20px", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{row.industry}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{row.totalMapped.toLocaleString()}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{row.assigned.toLocaleString()}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{row.unassigned.toLocaleString()}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>{row.callsInitiated.toLocaleString()}</td>
                    <td style={{ padding: "14px 20px", textAlign: "right" }}>
                      <span style={{
                        background: tier.bg, color: tier.color,
                        fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700,
                        borderRadius: 6, padding: "4px 10px", whiteSpace: "nowrap",
                      }}>{row.coveragePct}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manager Overview */}
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A", marginBottom: 12 }}>Manager Overview</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {managerMappingOverview.map(mgr => {
          const tier = coverageTier(mgr.callCoveragePct);
          return (
            <article key={mgr.managerId} style={{
              background: "white", borderRadius: 18, padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
              display: "flex", flexDirection: "column", gap: 12,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
              }}
            >
              {/* Top Row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: "#17181C",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "white" }}>{mgr.initials}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>{mgr.managerName}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB", margin: 0 }}>{mgr.department} · {mgr.teamSize} executives</p>
                </div>
              </div>

              {/* Stats Row */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {[
                  { label: "Mapped", value: mgr.mappingCount },
                  { label: "Assigned", value: mgr.assignedLeads },
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB" }}>{stat.label}</div>
                    <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 700, color: "#1A1A1A" }}>{stat.value.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB" }}>Call Coverage</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: tier.color }}>{mgr.callCoveragePct}%</span>
                </div>
                <ProgressBar pct={mgr.callCoveragePct} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

// ─── SIGN-IN SCREEN ───────────────────────────────────────────────────────────

function SignInScreen({ onSignIn }: { onSignIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    onSignIn();
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Background texture overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: "radial-gradient(circle at 25px 25px, white 2px, transparent 0)",
        backgroundSize: "50px 50px",
      }} />

      {/* Floating top bar */}
      <div style={{
        position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.92)", borderRadius: 16, padding: "0 24px",
        height: 52, display: "flex", alignItems: "center", gap: 24,
        backdropFilter: "blur(12px)", boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        zIndex: 10,
      }}>
        <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "#1A1A1A" }}>
          SalesVision
        </span>
        <div style={{ width: 1, height: 20, background: "#EEEEEE" }} />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#67748E" }}>Dashboard</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#67748E" }}>Profile</span>
      </div>

      {/* Sign-in Card */}
      <div style={{
        width: 420, borderRadius: 16, overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
        animation: "scaleIn 300ms ease-out",
        position: "relative", zIndex: 5,
      }}>
        {/* Dark header strip */}
        <div style={{
          height: 96, background: "linear-gradient(135deg, #2B2B2E, #17181C)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 700, color: "white" }}>
            Sign in
          </span>
        </div>

        {/* White body */}
        <div style={{ background: "white", padding: "32px 32px 28px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {error && (
              <div role="alert" style={{
                background: "#FDE8EC", color: "#F5365C", fontFamily: "Inter, sans-serif",
                fontSize: 13, padding: "10px 14px", borderRadius: 8,
              }}>{error}</div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                style={{
                  width: "100%", height: 44, border: "1px solid #DEE2E6", borderRadius: 8,
                  padding: "0 14px", fontFamily: "Inter, sans-serif", fontSize: 14,
                  outline: "none", boxSizing: "border-box", transition: "border 0.15s",
                  color: "#1A1A1A",
                }}
                onFocus={e => (e.target.style.borderColor = "#17181C")}
                onBlur={e => (e.target.style.borderColor = "#DEE2E6")}
              />
            </div>

            <div style={{ position: "relative" }}>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password" type={showPassword ? "text" : "password"} value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                style={{
                  width: "100%", height: 44, border: "1px solid #DEE2E6", borderRadius: 8,
                  padding: "0 44px 0 14px", fontFamily: "Inter, sans-serif", fontSize: 14,
                  outline: "none", boxSizing: "border-box", transition: "border 0.15s",
                  color: "#1A1A1A",
                }}
                onFocus={e => (e.target.style.borderColor = "#17181C")}
                onBlur={e => (e.target.style.borderColor = "#DEE2E6")}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "#67748E",
                  display: "flex", alignItems: "center",
                }}
              >
                {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>

            {/* Remember me */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                type="button"
                onClick={() => setRemember(r => !r)}
                aria-checked={remember}
                role="switch"
                style={{
                  width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer",
                  background: remember ? "#17181C" : "#DEE2E6", transition: "background 0.2s",
                  position: "relative", flexShrink: 0,
                }}
              >
                <span style={{
                  position: "absolute", top: 3, left: remember ? 20 : 3,
                  width: 16, height: 16, borderRadius: "50%", background: "white",
                  transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }} />
              </button>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#1A1A1A" }}>Remember me</span>
            </div>

            <button
              type="submit"
              style={{
                width: "100%", height: 44, background: "#17181C", color: "white",
                border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif",
                fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#000000")}
              onMouseLeave={e => (e.currentTarget.style.background = "#17181C")}
            >
              Sign in
            </button>
          </form>

          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: 13, color: "#67748E",
            textAlign: "center", marginTop: 20,
          }}>
            {"Don't have an account? "}
            <span style={{ color: "#1A1A1A", fontWeight: 600, cursor: "pointer" }}>Sign up</span>
          </p>
        </div>
      </div>

      {/* Director badge below card */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)",
        whiteSpace: "nowrap",
      }}>
        Director View — Read Only
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────

function AppShell() {
  const [screen, setScreen] = useState("dashboard");
  const [navHistory, setNavHistory] = useState(["dashboard"]);
  const [globalPeriod, setGlobalPeriod] = useState("week");
  const [globalDateRange, setGlobalDateRange] = useState({ start: "", end: "" });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [selectedExecutiveId, setSelectedExecutiveId] = useState<string>("");
  const notifRef = useRef<HTMLDivElement>(null);

  const navigateTo = useCallback((next: string) => {
    setScreen(next);
    setNavHistory(prev => [...prev, next]);
  }, []);

  const goBack = useCallback(() => {
    setNavHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = prev.slice(0, -1);
      setScreen(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  }, []);

  const screenTitle = (screenId: string): string => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard", mapping: "Mapping", calls: "Calls", team: "Team",
      leads: "Leads Board", "leads-detail": "Lead Detail",
      "executive-profile": "Executive Profile",
      organization: "Organization", reports: "Reports", settings: "Settings",
    };
    return titles[screenId] ?? "Dashboard";
  };

  const navigateToExecutive = useCallback((executiveId: string) => {
    setSelectedExecutiveId(executiveId);
    navigateTo("executive-profile");
  }, [navigateTo]);

  const navigateToLead = useCallback((leadId: string) => {
    setSelectedLeadId(leadId);
    navigateTo("leads-detail");
  }, [navigateTo]);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [selectedTeamId, setSelectedTeamId]             = useState<string>("");

  // Org state (promoted from const in Step 8)
  const [departments, setDepartments]           = useState<DeptRecord[]>(initialDepartments);
  const [teamsByDepartment, setTeamsByDepartment] = useState<Record<string, TeamRecord[]>>(initialTeamsByDepartment);
  const [orgManagers, setOrgManagers]           = useState(initialOrgManagers);

  // Department Builder modal
  const [showDepartmentBuilder, setShowDepartmentBuilder]   = useState(false);
  const [builderDepartmentName, setBuilderDepartmentName]   = useState("");
  const [builderTeamRows, setBuilderTeamRows]               = useState<{ rowId: number; name: string; managerId: string }[]>([{ rowId: 1, name: "", managerId: "" }]);
  const [builderError, setBuilderError]                     = useState("");
  const [showDiscardConfirm, setShowDiscardConfirm]         = useState(false);

  // Nested Create Manager modal
  const [showCreateManagerModal, setShowCreateManagerModal] = useState(false);
  const [creatingForRowId, setCreatingForRowId]             = useState<number | null>(null);
  const [newManagerForm, setNewManagerForm]                 = useState({ name: "", email: "", password: "" });
  const [newManagerErrors, setNewManagerErrors]             = useState<Record<string, string>>({});
  const [showManagerPassword, setShowManagerPassword]       = useState(false);
  const builderTriggerRef = useRef<HTMLButtonElement>(null);

  // ── REPORTS STATE ──
  const [downloadHistory, setDownloadHistory] = useState(initialDownloadHistory);
  const [isShellExporting, setIsShellExporting] = useState(false);
  const [reportPeriodRange, setReportPeriodRange] = useState({ start: "", end: "" });
  const [reportManagerFilter, setReportManagerFilter] = useState<string[]>([]);
  const [reportExecutiveFilter, setReportExecutiveFilter] = useState("All");
  const [reportIndustryFilter, setReportIndustryFilter] = useState("All");
  const [reportCustomerTypeFilter, setReportCustomerTypeFilter] = useState("All");
  const [reportFormat, setReportFormat] = useState<"XLSX" | "PDF">("XLSX");
  const [generatingTemplateId, setGeneratingTemplateId] = useState<string | null>(null);

  const screenPeriodLabel = (period: string): string => {
    const labels: Record<string, string> = { all: "All Time", today: "Today", week: "This Week", month: "This Month" };
    return labels[period] || "Custom Range";
  };

  const performExport = (opts: { reportName: string; format: string }): Promise<void> => {
    return new Promise(resolve => {
      const isLargeRange = globalPeriod === "custom";
      const duration = opts.format === "PDF" ? (isLargeRange ? 3200 : 1800) : (isLargeRange ? 2200 : 1200);
      setTimeout(() => {
        const entry = {
          id: Date.now(),
          reportName: opts.reportName,
          timestamp: new Date().toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
          }),
          format: opts.format,
          period: globalPeriod === "custom"
            ? `${globalDateRange.start} – ${globalDateRange.end}`
            : screenPeriodLabel(globalPeriod),
        };
        setDownloadHistory(prev => [entry, ...prev].slice(0, 10));
        toast(`${opts.reportName} downloaded as ${opts.format}`, { duration: 3000 });
        resolve();
      }, duration);
    });
  };

  const handleTemplateDownload = async (template: typeof reportTemplates[0]) => {
    setGeneratingTemplateId(template.id);
    await performExport({ reportName: template.name, format: reportFormat });
    setGeneratingTemplateId(null);
  };

  const handleShellExport = async () => {
    setIsShellExporting(true);
    await performExport({ reportName: `${screenTitle(screen)} — Current View`, format: "XLSX" });
    setIsShellExporting(false);
  };

  const toggleReportManager = (managerId: string) => {
    setReportManagerFilter(prev =>
      prev.includes(managerId) ? prev.filter(id => id !== managerId) : [...prev, managerId]
    );
  };

  // ── SETTINGS STATE ──
  const [settingsTab, setSettingsTab] = useState<"profile" | "notifications" | "sessions">("profile");
  const [profileForm, setProfileForm] = useState({ name: director.name, email: director.email, phone: director.phone });
  const [notificationPrefs, setNotificationPrefs] = useState<Record<string, boolean>>(initialNotificationPrefs);
  const [sessions, setSessions] = useState(initialSessions);
  const [showSignOutAllConfirm, setShowSignOutAllConfirm] = useState(false);

  const handleSaveProfile = () => {
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      toast("Name and email are required.", { duration: 3000 });
      return;
    }
    toast("Profile updated", { duration: 3000 });
  };

  const handleSaveNotificationPrefs = () => {
    toast("Notification preferences updated", { duration: 3000 });
  };

  const handleLogOutSession = (sessionId: number) => {
    const session = sessions.find(s => s.id === sessionId);
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    toast(`Signed out of ${session?.device}`, { duration: 3000 });
  };

  const handleSignOutAllOthers = () => {
    setSessions(prev => prev.filter(s => s.current));
    setShowSignOutAllConfirm(false);
    toast("Signed out of all other sessions", { duration: 3000 });
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
    setScreen("dashboard");
    setNavHistory(["dashboard"]);
  };

  // ── LIFTED SCREEN FILTER STATES ──
  const [industryFilter, setIndustryFilter]               = useState("All");
  const [callsView, setCallsView]                         = useState<"executives" | "managers">("executives");
  const [selectedManagerIds, setSelectedManagerIds]       = useState<string[]>([]);
  const [rankView, setRankView]                           = useState<"executives" | "managers">("executives");
  const [selectedManagerCardId, setSelectedManagerCardId] = useState<string | null>(null);
  const [sortColumn, setSortColumn]                       = useState("callsMade");
  const [sortDir, setSortDir]                             = useState<"asc" | "desc">("desc");
  const [temperatureTab, setTemperatureTab]               = useState("All");
  const [leadIndustryFilter, setLeadIndustryFilter]       = useState("All");
  const [leadManagerFilter, setLeadManagerFilter]         = useState("All");

  // ── COMMAND PALETTE STATE ──
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [paletteHighlightIndex, setPaletteHighlightIndex] = useState(0);

  const commandIndex = [
    { type: "screen", label: "Dashboard",            screen: "dashboard" },
    { type: "screen", label: "Mapping",              screen: "mapping" },
    { type: "screen", label: "Calls",                screen: "calls" },
    { type: "screen", label: "Team",                 screen: "team" },
    { type: "screen", label: "Leads Board",          screen: "leads" },
    { type: "screen", label: "Organization",         screen: "organization" },
    { type: "screen", label: "Reports & MIS Centre", screen: "reports" },
    { type: "screen", label: "Settings",             screen: "settings" },
    { type: "action", label: "Export Current View",  action: "export" },
    { type: "action", label: "Refresh Data",         action: "refresh" },
    { type: "action", label: "Log Out",              action: "logout" },
    ...executiveDirectory.map(e => ({ type: "executive", label: e.name, subtitle: `Executive · ${e.department}`, executiveId: e.id } as const)),
    ...orgManagers.map(m => ({ type: "manager", label: m.name, subtitle: "Manager", managerId: m.id } as const)),
    ...leadsList.map(l => ({ type: "lead", label: l.companyName, subtitle: `${l.industry} · ${l.currentStage}`, leadId: l.id } as const)),
  ] as const;

  type CommandItem = typeof commandIndex[number];

  const paletteResults: CommandItem[] = (paletteQuery.trim() === ""
    ? (commandIndex as unknown as CommandItem[]).slice(0, 8)
    : (commandIndex as unknown as CommandItem[]).filter(item =>
        item.label.toLowerCase().includes(paletteQuery.toLowerCase())
      ).slice(0, 8));

  const executePaletteItem = (item: CommandItem) => {
    if (item.type === "screen") navigateTo((item as any).screen);
    else if (item.type === "executive") navigateToExecutive((item as any).executiveId);
    else if (item.type === "lead") navigateToLead((item as any).leadId);
    else if (item.type === "manager") {
      setRankView("executives");
      setSelectedManagerCardId((item as any).managerId);
      navigateTo("team");
    } else if (item.type === "action") {
      const a = (item as any).action;
      if (a === "export") handleShellExport();
      if (a === "refresh") { setIsRefreshing(true); setTimeout(() => { setIsRefreshing(false); toast("Data refreshed", { duration: 3000 }); }, 600); }
      if (a === "logout") handleLogOut();
    }
    setPaletteOpen(false);
    setPaletteQuery("");
    setPaletteHighlightIndex(0);
  };

  // ── SAVED VIEWS STATE ──
  const [savedViews, setSavedViews] = useState(initialSavedViews as any[]);
  const [showViewsDropdown, setShowViewsDropdown] = useState(false);
  const [showSaveViewPrompt, setShowSaveViewPrompt] = useState(false);
  const [saveViewName, setSaveViewName] = useState("");

  const captureCurrentScreenFilters = () => {
    switch (screen) {
      case "mapping": return { industryFilter };
      case "calls":   return { callsView, selectedManagerIds };
      case "team":    return { rankView, selectedManagerCardId, sortColumn, sortDir };
      case "leads":   return { temperatureTab, leadIndustryFilter, leadManagerFilter };
      default:        return {};
    }
  };

  const applyScreenFilters = (view: any) => {
    const f = view.screenFilters || {};
    if (view.screen === "mapping" && f.industryFilter !== undefined) setIndustryFilter(f.industryFilter);
    if (view.screen === "calls") {
      if (f.callsView !== undefined) setCallsView(f.callsView);
      if (f.selectedManagerIds !== undefined) setSelectedManagerIds(f.selectedManagerIds);
    }
    if (view.screen === "team") {
      if (f.rankView !== undefined) setRankView(f.rankView);
      if (f.selectedManagerCardId !== undefined) setSelectedManagerCardId(f.selectedManagerCardId);
      if (f.sortColumn !== undefined) setSortColumn(f.sortColumn);
      if (f.sortDir !== undefined) setSortDir(f.sortDir);
    }
    if (view.screen === "leads") {
      if (f.temperatureTab !== undefined) setTemperatureTab(f.temperatureTab);
      if (f.leadIndustryFilter !== undefined) setLeadIndustryFilter(f.leadIndustryFilter);
      if (f.leadManagerFilter !== undefined) setLeadManagerFilter(f.leadManagerFilter);
    }
  };

  const handleSaveCurrentView = () => {
    if (!saveViewName.trim()) { toast("Please name this view.", { duration: 3000 }); return; }
    const newView = { id: Date.now(), name: saveViewName.trim(), screen, globalPeriod, globalDateRange, screenFilters: captureCurrentScreenFilters() };
    setSavedViews(prev => [...prev, newView]);
    setShowSaveViewPrompt(false);
    setSaveViewName("");
    toast(`View "${newView.name}" saved`, { duration: 3000 });
  };

  const handleApplyView = (view: any) => {
    setScreen(view.screen);
    setNavHistory(prev => [...prev, view.screen]);
    setGlobalPeriod(view.globalPeriod);
    setGlobalDateRange(view.globalDateRange);
    applyScreenFilters(view);
    setShowViewsDropdown(false);
    toast(`Loaded view "${view.name}"`, { duration: 3000 });
  };

  const handleDeleteView = (viewId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedViews(prev => prev.filter(v => v.id !== viewId));
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key === "Escape" && paletteOpen) {
        setPaletteOpen(false);
        setPaletteQuery("");
        setPaletteHighlightIndex(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [paletteOpen]);

  const isDepartmentBuilderDirty = () =>
    builderDepartmentName.trim() !== "" || builderTeamRows.some(r => r.name.trim() !== "" || r.managerId !== "");

  const resetDepartmentBuilder = () => {
    setBuilderDepartmentName("");
    setBuilderTeamRows([{ rowId: 1, name: "", managerId: "" }]);
    setBuilderError("");
  };

  const handleCloseDepartmentBuilder = () => {
    if (isDepartmentBuilderDirty()) {
      setShowDiscardConfirm(true);
    } else {
      setShowDepartmentBuilder(false);
    }
  };

  const handleCancelCreateManager = () => {
    setShowCreateManagerModal(false);
    setNewManagerForm({ name: "", email: "", password: "" });
    setNewManagerErrors({});
    setShowManagerPassword(false);
    setCreatingForRowId(null);
  };

  const handleSubmitDepartmentBuilder = () => {
    if (builderDepartmentName.trim() === "") {
      setBuilderError("Department name is required.");
      return;
    }
    if (builderTeamRows.some(r => r.name.trim() === "" || !r.managerId || r.managerId === "__CREATE_NEW__")) {
      setBuilderError("All teams must have a name and an assigned manager.");
      return;
    }
    const newDeptId = generateId("DEPT", departments);
    const newDept: DeptRecord = {
      id: newDeptId, name: builderDepartmentName.trim(),
      teamCount: builderTeamRows.length,
      managerCount: new Set(builderTeamRows.map(r => r.managerId)).size,
      executiveCount: 0, totalCalls: 0, totalConversions: 0,
    };
    const newTeams: TeamRecord[] = builderTeamRows.map(row => ({
      id: generateId("TEAM", Object.values(teamsByDepartment).flat()),
      name: row.name.trim(),
      managerName: orgManagers.find(m => m.id === row.managerId)?.name ?? "",
      mappingUploaded: 0, callsDone: 0, followUpsMeetings: 0, conversions: 0, executiveCount: 0,
    }));
    setDepartments(prev => [...prev, newDept]);
    setTeamsByDepartment(prev => ({ ...prev, [newDeptId]: newTeams }));
    setShowDepartmentBuilder(false);
    resetDepartmentBuilder();
    setTimeout(() => toast(`"${newDept.name}" department created`, { duration: 3000 }), 0);
  };

  const handleSubmitCreateManager = () => {
    const errs: Record<string, string> = {};
    if (!newManagerForm.name.trim()) errs.name = "Full name is required.";
    if (!newManagerForm.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newManagerForm.email.trim())) {
      errs.email = "Enter a valid email address.";
    } else if (orgManagers.some(m => m.email.toLowerCase() === newManagerForm.email.trim().toLowerCase())) {
      errs.email = "A manager with this email already exists.";
    }
    if (!newManagerForm.password) {
      errs.password = "Password is required.";
    } else if (newManagerForm.password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    if (Object.keys(errs).length > 0) { setNewManagerErrors(errs); return; }
    const newMgr = { id: generateId("MGR", orgManagers), name: newManagerForm.name.trim(), email: newManagerForm.email.trim().toLowerCase() };
    setOrgManagers(prev => [...prev, newMgr]);
    setBuilderTeamRows(prev => prev.map(r => r.rowId === creatingForRowId ? { ...r, managerId: newMgr.id } : r));
    setShowCreateManagerModal(false);
    setNewManagerForm({ name: "", email: "", password: "" });
    setNewManagerErrors({});
    setShowManagerPassword(false);
    setCreatingForRowId(null);
  };

  const navigateToDepartment = useCallback((departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    navigateTo("organization-department");
  }, [navigateTo]);

  const navigateToTeam = useCallback((teamId: string) => {
    setSelectedTeamId(teamId);
    navigateTo("organization-team");
  }, [navigateTo]);

  // Close notif on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    if (notifOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  // Close notif on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNotifOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast("Data refreshed", { duration: 3000 });
    }, 600);
  };

  // handleExport replaced by handleShellExport (defined above with Reports state)

  const activeNavItem = PARENT_NAV[screen] ?? screen;
  const unreadCount = notifications.filter(n => !n.read).length;
  const screenLabel = SCREEN_LABELS[screen] ?? screen;

  const [badgePulsed, setBadgePulsed] = useState(false);
  useEffect(() => {
    if (unreadCount > 0 && !badgePulsed) setBadgePulsed(true);
  }, [unreadCount]);

  const PERIOD_OPTIONS = [
    { id: "all", label: "All Time" },
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "custom", label: "Custom" },
  ];

  const NOTIF_TYPE_COLORS: Record<string, string> = {
    lead: "#F5365C", report: "#4CAF50", mapping: "#FB6340", team: "#3B82F6", system: "#8392AB",
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F4F5F7" }}>
      {/* ── SIDEBAR ── */}
      <nav
        style={{
          width: sidebarCollapsed ? 72 : 240, flexShrink: 0, transition: "width 200ms ease",
          background: "#FFFFFF", borderRight: "1px solid #EEEEEE",
          display: "flex", flexDirection: "column", height: "100vh",
          overflow: "hidden",
        }}
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <div style={{
          height: 64, padding: "0 20px", display: "flex", alignItems: "center",
          borderBottom: "1px solid #EEEEEE", gap: 10, flexShrink: 0,
        }}>
          {/* SalesVision Mark */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <defs>
              <linearGradient id="sv-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E53E3E" />
                <stop offset="100%" stopColor="#1A1A1A" />
              </linearGradient>
            </defs>
            <path d="M14 4C8.5 4 4 8.5 4 14s4.5 10 10 10 10-4.5 10-10S19.5 4 14 4zM7 14c0-3.9 3.1-7 7-7 1.5 0 2.9.5 4 1.3L8 16.3C7.4 15.6 7 14.8 7 14zm7 7c-1.5 0-2.9-.5-4-1.3l10-8c.6.7 1 1.5 1 2.3 0 3.9-3.1 7-7 7z" fill="url(#sv-logo-grad)" />
          </svg>
          {!sidebarCollapsed && (
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A", whiteSpace: "nowrap" }}>
              SalesVision
            </span>
          )}
        </div>

        {/* Nav Items */}
        <div style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
          {NAV_ITEMS.map(item => {
            const isActive = activeNavItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                aria-current={isActive ? "page" : undefined}
                title={sidebarCollapsed ? item.label : undefined}
                style={{
                  height: 44, borderRadius: 12, padding: "0 12px", display: "flex",
                  alignItems: "center", gap: 12, cursor: "pointer", border: "none",
                  background: isActive ? "#17181C" : "transparent",
                  color: isActive ? "white" : "#67748E",
                  transition: "all 0.15s", textAlign: "left", width: "100%",
                  flexShrink: 0, justifyContent: sidebarCollapsed ? "center" : "flex-start",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#F4F5F7"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <item.icon size={20} />
                {!sidebarCollapsed && (
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid #EEEEEE", padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Settings */}
          <button
            onClick={() => navigateTo("settings")}
            aria-current={activeNavItem === "settings" ? "page" : undefined}
            title={sidebarCollapsed ? "Settings" : undefined}
            style={{
              height: 44, borderRadius: 12, padding: "0 12px", display: "flex",
              alignItems: "center", gap: 12, cursor: "pointer", border: "none",
              background: activeNavItem === "settings" ? "#17181C" : "transparent",
              color: activeNavItem === "settings" ? "white" : "#67748E",
              transition: "all 0.15s", width: "100%",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
            }}
            onMouseEnter={e => { if (activeNavItem !== "settings") e.currentTarget.style.background = "#F4F5F7"; }}
            onMouseLeave={e => { if (activeNavItem !== "settings") e.currentTarget.style.background = "transparent"; }}
          >
            <SettingsIcon size={20} />
            {!sidebarCollapsed && (
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500 }}>Settings</span>
            )}
          </button>

          {/* Collapse toggle */}
          <button
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setSidebarCollapsed(s => !s)}
            style={{
              height: 36, borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center", border: "1px solid #EEEEEE", background: "transparent",
              cursor: "pointer", color: "#67748E", transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F4F5F7")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            {sidebarCollapsed ? <ChevronRightIcon size={16} /> : <ChevronLeftIcon size={16} />}
          </button>

          {/* User mini-card */}
          {!sidebarCollapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 4px 0" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: "#17181C",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "white" }}>{director.initials}</span>
              </div>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{director.name}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#8392AB" }}>Director</div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── MAIN COLUMN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* TOP BAR */}
        <header style={{
          height: 64, background: "white", borderBottom: "1px solid #EEEEEE",
          padding: "0 24px", display: "flex", alignItems: "center",
          justifyContent: "space-between", flexShrink: 0,
        }}>
          {/* Left: page title */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}>
              {screenLabel}
            </span>
            {director.accessLevel !== "enterprise" && director.departmentNames.length > 0 && (
              <span style={{
                background: "#F1F1F3", color: "#1A1A1A", fontFamily: "Inter, sans-serif",
                fontSize: 12, fontWeight: 600, borderRadius: 9999, padding: "4px 10px",
              }}>
                Scoped: {director.departmentNames.join(", ")}
              </span>
            )}
          </div>

          {/* Center: Global Search */}
          <div style={{ position: "relative", flex: "0 0 320px" }}>
            <input
              type="search"
              aria-label="Global search"
              placeholder="Search… (⌘K)"
              value={globalSearch}
              readOnly
              onClick={() => setPaletteOpen(true)}
              onFocus={() => setPaletteOpen(true)}
              style={{
                width: "100%", height: 38, background: "#F4F5F7", border: "1px solid #EEEEEE",
                borderRadius: 9999, padding: "0 16px", fontFamily: "Inter, sans-serif",
                fontSize: 14, color: "#ADB5BD", outline: "none", boxSizing: "border-box",
                transition: "border 0.15s", cursor: "pointer",
              }}
            />
          </div>

          {/* Right: Bell + Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Notification Bell */}
            <div ref={notifRef} style={{ position: "relative" }}>
              <button
                aria-label="Open notifications"
                onClick={() => setNotifOpen(o => !o)}
                style={{
                  width: 36, height: 36, borderRadius: "50%", border: "1px solid #EEEEEE",
                  background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#67748E", position: "relative", transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F4F5F7")}
                onMouseLeave={e => (e.currentTarget.style.background = "white")}
              >
                <BellIcon size={18} />
                {unreadCount > 0 && (
                  <span
                    className={badgePulsed ? "badge-pulse" : ""}
                    style={{
                      position: "absolute", top: 6, right: 6, width: 8, height: 8,
                      borderRadius: "50%", background: "#F5365C", border: "2px solid white",
                    }}
                  />
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div
                  role="menu"
                  aria-label="Notifications"
                  style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    width: 320, background: "white", borderRadius: 12,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                    zIndex: 100, overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F0F0" }}>
                    <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Notifications</span>
                  </div>
                  {notifications.map((notif, ni) => (
                    <div key={notif.id} role="menuitem" style={{
                      padding: "12px 16px", borderBottom: "1px solid #F0F0F0",
                      display: "flex", gap: 10, alignItems: "flex-start",
                      background: notif.read ? "transparent" : "#FAFAFA",
                      cursor: "default",
                      animation: `fadeUp 200ms ease-out ${ni * 30}ms both`,
                    }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: NOTIF_TYPE_COLORS[notif.type] ?? "#8392AB",
                        flexShrink: 0, marginTop: 5,
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A", marginBottom: 2 }}>{notif.title}</div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8392AB", lineHeight: 1.4 }}>{notif.body}</div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#ADB5BD", marginTop: 4 }}>{notif.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <button
              onClick={() => navigateTo("settings")}
              aria-label="Go to settings"
              style={{
                display: "flex", alignItems: "center", gap: 8, border: "none",
                background: "transparent", cursor: "pointer", padding: "4px 0",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: "#17181C",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "white" }}>{director.initials}</span>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>{director.name}</span>
            </button>
          </div>
        </header>

        {/* GLOBAL FILTER STRIP */}
        <div style={{
          height: globalPeriod === "custom" ? "auto" : 48, minHeight: 48,
          background: "white", borderBottom: "1px solid #EEEEEE",
          padding: "0 24px", display: "flex", alignItems: "center",
          gap: 12, flexShrink: 0, flexWrap: "wrap",
        }}>
          {/* Period Segmented Control */}
          <div
            role="radiogroup"
            aria-label="Time period"
            style={{ background: "#F1F1F3", borderRadius: 8, padding: 3, display: "flex", gap: 2 }}
          >
            {PERIOD_OPTIONS.map(opt => (
              <button
                key={opt.id}
                role="radio"
                aria-checked={globalPeriod === opt.id}
                onClick={() => setGlobalPeriod(opt.id)}
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
                  padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                  background: globalPeriod === opt.id ? "white" : "transparent",
                  color: globalPeriod === opt.id ? "#1A1A1A" : "#67748E",
                  boxShadow: globalPeriod === opt.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.15s", whiteSpace: "nowrap",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Custom date range */}
          {globalPeriod === "custom" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, animation: "fadeUp 200ms ease-out" }}>
              <input
                type="date" value={globalDateRange.start}
                onChange={e => setGlobalDateRange(r => ({ ...r, start: e.target.value }))}
                style={{
                  height: 34, border: "1px solid #DEE2E6", borderRadius: 8,
                  padding: "0 10px", fontFamily: "Inter, sans-serif", fontSize: 13, outline: "none",
                }}
              />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB" }}>to</span>
              <input
                type="date" value={globalDateRange.end}
                min={globalDateRange.start}
                onChange={e => setGlobalDateRange(r => ({ ...r, end: e.target.value }))}
                style={{
                  height: 34, border: "1px solid #DEE2E6", borderRadius: 8,
                  padding: "0 10px", fontFamily: "Inter, sans-serif", fontSize: 13, outline: "none",
                }}
              />
              <button
                disabled={!globalDateRange.start || !globalDateRange.end}
                style={{
                  height: 34, padding: "0 14px", background: "#17181C", color: "white",
                  border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  opacity: (!globalDateRange.start || !globalDateRange.end) ? 0.4 : 1,
                }}
              >
                Apply
              </button>
            </div>
          )}

          {/* Right: Export + Refresh */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            {/* ☆ Save View */}
            <button
              onClick={() => setShowSaveViewPrompt(true)}
              style={{
                height: 36, padding: "0 12px", background: "transparent",
                border: "1.5px solid #DEE2E6", borderRadius: 8, cursor: "pointer",
                fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                color: "#1A1A1A", display: "flex", alignItems: "center", gap: 6,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F4F5F7")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              aria-label="Save current view"
            >
              ☆ Save View
            </button>

            {/* Views dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowViewsDropdown(v => !v)}
                aria-haspopup="listbox"
                aria-expanded={showViewsDropdown}
                style={{
                  height: 36, padding: "0 12px", background: "transparent",
                  border: "1.5px solid #DEE2E6", borderRadius: 8, cursor: "pointer",
                  fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                  color: "#1A1A1A", display: "flex", alignItems: "center", gap: 4,
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F4F5F7")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                Views ▾
              </button>
              {showViewsDropdown && (
                <>
                  <div onClick={() => setShowViewsDropdown(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
                  <div role="listbox" style={{
                    position: "absolute", top: "calc(100% + 6px)", right: 0, width: 240,
                    background: "white", borderRadius: 12, zIndex: 50,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.16)", overflow: "hidden",
                  }}>
                    {savedViews.length === 0 ? (
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", padding: 16, margin: 0 }}>
                        No saved views yet
                      </p>
                    ) : savedViews.map(view => (
                      <div
                        key={view.id}
                        role="option"
                        onClick={() => handleApplyView(view)}
                        style={{
                          padding: "10px 14px", cursor: "pointer", display: "flex",
                          justifyContent: "space-between", alignItems: "center",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F4F5F7")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#1A1A1A", flex: 1, marginRight: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {view.name}
                        </span>
                        <button
                          onClick={(e) => handleDeleteView(view.id, e)}
                          aria-label={`Delete view "${view.name}"`}
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "#ADB5BD", fontSize: 14, padding: "0 2px",
                            lineHeight: 1, flexShrink: 0,
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#F5365C")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#ADB5BD")}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleShellExport}
              disabled={isShellExporting}
              aria-busy={isShellExporting}
              aria-label={isShellExporting ? "Exporting current view…" : "Export current view as XLSX"}
              style={{
                height: 36, padding: "0 14px", background: "#17181C", color: "white",
                border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif",
                fontSize: 13, fontWeight: 600, cursor: isShellExporting ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s",
                opacity: isShellExporting ? 0.75 : 1,
              }}
              onMouseEnter={e => { if (!isShellExporting) e.currentTarget.style.background = "#000000"; }}
              onMouseLeave={e => (e.currentTarget.style.background = "#17181C")}
            >
              {isShellExporting
                ? <><RefreshIcon size={14} spinning={true} /> Exporting…</>
                : <><DownloadIcon size={14} /> Export</>}
            </button>
            <button
              aria-label="Refresh data"
              onClick={handleRefresh}
              style={{
                width: 36, height: 36, borderRadius: 8, border: "1px solid #EEEEEE",
                background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#67748E", transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F4F5F7")}
              onMouseLeave={e => (e.currentTarget.style.background = "white")}
            >
              <RefreshIcon size={16} spinning={isRefreshing} />
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24, background: "#F4F5F7" }}>
          {screen === "dashboard" ? (
            <DashboardScreen navigateToExecutive={navigateToExecutive} />
          ) : screen === "mapping" ? (
            <MappingScreen industryFilter={industryFilter} setIndustryFilter={setIndustryFilter} />
          ) : screen === "calls" ? (
            <CallsScreen navigateToExecutive={navigateToExecutive} callsView={callsView} setCallsView={setCallsView} selectedManagerIds={selectedManagerIds} setSelectedManagerIds={setSelectedManagerIds} />
          ) : screen === "team" ? (
            <TeamScreen navigateToExecutive={navigateToExecutive} rankView={rankView} setRankView={setRankView} selectedManagerCardId={selectedManagerCardId} setSelectedManagerCardId={setSelectedManagerCardId} sortColumn={sortColumn} setSortColumn={setSortColumn} sortDir={sortDir} setSortDir={setSortDir} />
          ) : screen === "leads" ? (
            <LeadsScreen navigateToLead={navigateToLead} temperatureTab={temperatureTab} setTemperatureTab={setTemperatureTab} leadIndustryFilter={leadIndustryFilter} setLeadIndustryFilter={setLeadIndustryFilter} leadManagerFilter={leadManagerFilter} setLeadManagerFilter={setLeadManagerFilter} />
          ) : screen === "leads-detail" ? (
            <LeadsDetailPlaceholder
              leadId={selectedLeadId}
              goBack={goBack}
              prevScreenTitle={screenTitle(navHistory[navHistory.length - 2] ?? "leads")}
            />
          ) : screen === "executive-profile" ? (
            <ExecutiveProfileScreen
              executiveId={selectedExecutiveId}
              goBack={goBack}
              prevScreenTitle={screenTitle(navHistory[navHistory.length - 2] ?? "team")}
              navigateToLead={navigateToLead}
            />
          ) : screen === "organization" ? (
            <OrganizationScreen
              navigateToDepartment={navigateToDepartment}
              goBack={goBack}
              departments={departments}
              onOpenBuilder={() => setShowDepartmentBuilder(true)}
            />
          ) : screen === "organization-department" ? (
            <OrganizationDepartmentScreen
              departmentId={selectedDepartmentId}
              navigateToTeam={navigateToTeam}
              goBack={goBack}
              departments={departments}
              teamsByDepartment={teamsByDepartment}
            />
          ) : screen === "organization-team" ? (
            <TeamDetailScreen
              teamId={selectedTeamId}
              goBack={goBack}
              departments={departments}
              teamsByDepartment={teamsByDepartment}
            />
          ) : screen === "settings" ? (
            <SettingsScreen
              settingsTab={settingsTab}
              setSettingsTab={setSettingsTab}
              profileForm={profileForm}
              setProfileForm={setProfileForm}
              notificationPrefs={notificationPrefs}
              setNotificationPrefs={setNotificationPrefs}
              sessions={sessions}
              showSignOutAllConfirm={showSignOutAllConfirm}
              setShowSignOutAllConfirm={setShowSignOutAllConfirm}
              handleSaveProfile={handleSaveProfile}
              handleSaveNotificationPrefs={handleSaveNotificationPrefs}
              handleLogOutSession={handleLogOutSession}
              handleSignOutAllOthers={handleSignOutAllOthers}
              handleLogOut={handleLogOut}
            />
          ) : screen === "reports" ? (
            <ReportsScreen
              orgManagers={orgManagers}
              reportPeriodRange={reportPeriodRange}
              setReportPeriodRange={setReportPeriodRange}
              reportManagerFilter={reportManagerFilter}
              toggleReportManager={toggleReportManager}
              reportExecutiveFilter={reportExecutiveFilter}
              setReportExecutiveFilter={setReportExecutiveFilter}
              reportIndustryFilter={reportIndustryFilter}
              setReportIndustryFilter={setReportIndustryFilter}
              reportCustomerTypeFilter={reportCustomerTypeFilter}
              setReportCustomerTypeFilter={setReportCustomerTypeFilter}
              reportFormat={reportFormat}
              setReportFormat={setReportFormat}
              generatingTemplateId={generatingTemplateId}
              handleTemplateDownload={handleTemplateDownload}
              downloadHistory={downloadHistory}
              globalPeriod={globalPeriod}
              screenPeriodLabel={screenPeriodLabel}
            />
          ) : (
            <PlaceholderScreen screen={screen} selectedTeamId={selectedTeamId} goBack={goBack} departments={departments} teamsByDepartment={teamsByDepartment} />
          )}
        </main>
      </div>

      {/* ── DEPARTMENT BUILDER MODAL ── */}
      {showDepartmentBuilder && (
        <>
          {/* Backdrop */}
          <div
            onClick={handleCloseDepartmentBuilder}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 50 }}
          />
          {/* Modal card */}
          <div
            role="dialog"
            aria-labelledby="builder-title"
            style={{
              position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 51, pointerEvents: "none",
            }}
          >
            <div style={{
              background: "white", borderRadius: 16, width: 560, maxHeight: "90vh",
              overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", pointerEvents: "all",
              animation: "scaleIn 300ms ease-out both",
            }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ height: 60, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #F0F0F0", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "white", display: "flex" }}><BuildingPlusIcon size={18} /></span>
                  </div>
                  <span id="builder-title" style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A" }}>Create Department</span>
                </div>
                <button onClick={handleCloseDepartmentBuilder} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#8392AB", fontSize: 20, lineHeight: 1, padding: 4 }} aria-label="Close">×</button>
              </div>

              {/* Body */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Department name */}
                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#67748E", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                    Department Name
                  </label>
                  <input
                    value={builderDepartmentName}
                    onChange={e => { setBuilderDepartmentName(e.target.value); setBuilderError(""); }}
                    placeholder="e.g. Enterprise Sales"
                    style={{ width: "100%", height: 44, borderRadius: 8, border: "1px solid #DEE2E6", padding: "0 12px", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#1A1A1A", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => (e.target.style.borderColor = "#17181C")}
                    onBlur={e => (e.target.style.borderColor = "#DEE2E6")}
                  />
                </div>

                <div style={{ height: 1, background: "#F0F0F0" }} />

                {/* Teams section */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>Teams</span>
                      <span style={{ background: "#F1F1F3", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#67748E", borderRadius: 6, padding: "2px 8px" }}>{builderTeamRows.length}</span>
                    </div>
                    <button
                      onClick={() => setBuilderTeamRows(prev => [...prev, { rowId: Date.now(), name: "", managerId: "" }])}
                      style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#17181C", padding: 0 }}
                    >
                      + Add Team
                    </button>
                  </div>

                  {builderTeamRows.map((row, idx) => (
                    <div key={row.rowId} style={{ background: "#FAFAFA", borderRadius: 10, padding: 14, display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "white" }}>{idx + 1}</span>
                      </div>
                      <input
                        value={row.name}
                        onChange={e => { setBuilderTeamRows(prev => prev.map(r => r.rowId === row.rowId ? { ...r, name: e.target.value } : r)); setBuilderError(""); }}
                        placeholder="Team name"
                        style={{ flex: 1, height: 40, borderRadius: 8, border: "1px solid #DEE2E6", padding: "0 10px", fontFamily: "Inter, sans-serif", fontSize: 13, outline: "none" }}
                        onFocus={e => (e.target.style.borderColor = "#17181C")}
                        onBlur={e => (e.target.style.borderColor = "#DEE2E6")}
                      />
                      <select
                        value={row.managerId}
                        onChange={e => {
                          const val = e.target.value;
                          if (val === "__CREATE_NEW__") {
                            setCreatingForRowId(row.rowId);
                            setShowCreateManagerModal(true);
                            e.target.value = row.managerId; // revert visual selection
                          } else {
                            setBuilderTeamRows(prev => prev.map(r => r.rowId === row.rowId ? { ...r, managerId: val } : r));
                            setBuilderError("");
                          }
                        }}
                        style={{ flex: 1, height: 40, borderRadius: 8, border: "1px solid #DEE2E6", padding: "0 10px", fontFamily: "Inter, sans-serif", fontSize: 13, outline: "none", background: "white" }}
                      >
                        <option value="">Select manager...</option>
                        {orgManagers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        <option disabled>──────</option>
                        <option value="__CREATE_NEW__">+ Create New Manager</option>
                      </select>
                      {row.managerId && row.managerId !== "__CREATE_NEW__" && (
                        <span style={{ background: "#E7F7EC", color: "#4CAF50", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "2px 8px", flexShrink: 0 }}>Assigned</span>
                      )}
                      <button
                        onClick={() => { if (builderTeamRows.length > 1) setBuilderTeamRows(prev => prev.filter(r => r.rowId !== row.rowId)); }}
                        disabled={builderTeamRows.length === 1}
                        aria-label="Remove team row"
                        style={{
                          width: 32, height: 32, borderRadius: 8, border: "1px solid #DEE2E6", background: "white",
                          display: "flex", alignItems: "center", justifyContent: "center", cursor: builderTeamRows.length === 1 ? "not-allowed" : "pointer",
                          opacity: builderTeamRows.length === 1 ? 0.4 : 1, flexShrink: 0, color: "#67748E",
                        }}
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  ))}

                  {builderError && (
                    <div style={{ background: "#FDE8EC", borderRadius: 8, padding: "10px 14px", marginTop: 8 }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#F5365C", margin: 0 }}>{builderError}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div style={{ height: 64, padding: "0 24px", borderTop: "1px solid #F0F0F0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <button
                  onClick={handleCloseDepartmentBuilder}
                  style={{ height: 40, padding: "0 16px", background: "transparent", border: "1.5px solid #DEE2E6", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#67748E", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitDepartmentBuilder}
                  style={{ height: 40, padding: "0 20px", background: "#17181C", color: "white", border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#000")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#17181C")}
                >
                  Create Department
                </button>
              </div>
            </div>
          </div>

          {/* Discard confirmation */}
          {showDiscardConfirm && (
            <>
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 60 }} />
              <div
                role="alertdialog"
                aria-labelledby="discard-title"
                style={{
                  position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 61, pointerEvents: "none",
                }}
              >
                <div style={{ background: "white", borderRadius: 16, padding: 28, width: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", pointerEvents: "all" }}>
                  <p id="discard-title" style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A", margin: "0 0 8px" }}>Discard this department?</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", margin: "0 0 24px" }}>You have unsaved changes that will be lost.</p>
                  <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                    <button
                      onClick={() => setShowDiscardConfirm(false)}
                      style={{ height: 38, padding: "0 16px", background: "transparent", border: "1.5px solid #DEE2E6", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#67748E", cursor: "pointer" }}
                    >
                      Keep Editing
                    </button>
                    <button
                      onClick={() => { setShowDiscardConfirm(false); setShowDepartmentBuilder(false); resetDepartmentBuilder(); }}
                      style={{ height: 38, padding: "0 16px", background: "#F5365C", color: "white", border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* ── CREATE MANAGER MODAL (nested, higher z-index) ── */}
      {showCreateManagerModal && (
        <>
          <div onClick={handleCancelCreateManager} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 70 }} />
          <div
            role="dialog"
            aria-labelledby="create-mgr-title"
            style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 71, pointerEvents: "none" }}
          >
            <div style={{ background: "white", borderRadius: 16, width: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", pointerEvents: "all", animation: "scaleIn 300ms ease-out both" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ padding: "0 24px", borderBottom: "1px solid #F0F0F0" }}>
                <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#17181C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "white", display: "flex" }}><PersonPlusIcon size={18} /></span>
                    </div>
                    <span id="create-mgr-title" style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 600, color: "#1A1A1A" }}>Create New Manager</span>
                  </div>
                  <button onClick={handleCancelCreateManager} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#8392AB", fontSize: 20, lineHeight: 1, padding: 4 }} aria-label="Close">×</button>
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", margin: "0 0 14px" }}>Manager will be available immediately in the dropdown</p>
              </div>

              {/* Body */}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#67748E", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Full Name</label>
                  <input
                    value={newManagerForm.name}
                    onChange={e => { setNewManagerForm(p => ({ ...p, name: e.target.value })); setNewManagerErrors(p => ({ ...p, name: "" })); }}
                    placeholder="e.g. Divya Krishnan"
                    style={{ width: "100%", height: 44, borderRadius: 8, border: `1px solid ${newManagerErrors.name ? "#F5365C" : "#DEE2E6"}`, padding: "0 12px", fontFamily: "Inter, sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                  {newManagerErrors.name && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#F5365C", margin: "4px 0 0" }}>{newManagerErrors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#67748E", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Email Address</label>
                  <input
                    type="email"
                    value={newManagerForm.email}
                    onChange={e => { setNewManagerForm(p => ({ ...p, email: e.target.value })); setNewManagerErrors(p => ({ ...p, email: "" })); }}
                    placeholder="e.g. divya.k@salesvisionai.com"
                    style={{ width: "100%", height: 44, borderRadius: 8, border: `1px solid ${newManagerErrors.email ? "#F5365C" : "#DEE2E6"}`, padding: "0 12px", fontFamily: "Inter, sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                  {newManagerErrors.email && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#F5365C", margin: "4px 0 0" }}>{newManagerErrors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#67748E", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Password</label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ flex: 1, position: "relative" }}>
                      <input
                        type={showManagerPassword ? "text" : "password"}
                        value={newManagerForm.password}
                        onChange={e => { setNewManagerForm(p => ({ ...p, password: e.target.value })); setNewManagerErrors(p => ({ ...p, password: "" })); }}
                        style={{ width: "100%", height: 44, borderRadius: 8, border: `1px solid ${newManagerErrors.password ? "#F5365C" : "#DEE2E6"}`, padding: "0 40px 0 12px", fontFamily: "Inter, sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                      />
                      <button
                        type="button"
                        aria-label={showManagerPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowManagerPassword(p => !p)}
                        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", color: "#8392AB", display: "flex", padding: 2 }}
                      >
                        {showManagerPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                      </button>
                    </div>
                    <button
                      onClick={() => { setNewManagerForm(p => ({ ...p, password: generatePassword() })); setShowManagerPassword(true); setNewManagerErrors(p => ({ ...p, password: "" })); }}
                      style={{ height: 44, padding: "0 14px", background: "transparent", border: "1.5px solid #DEE2E6", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#17181C", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
                    >
                      Auto-generate
                    </button>
                  </div>
                  {newManagerErrors.password && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#F5365C", margin: "4px 0 0" }}>{newManagerErrors.password}</p>}
                </div>

                {/* Role (read-only) */}
                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#67748E", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Role</label>
                  <div style={{ height: 44, borderRadius: 8, border: "1px solid #DEE2E6", padding: "0 12px", fontFamily: "Inter, sans-serif", fontSize: 14, color: "#67748E", background: "#F4F5F7", display: "flex", alignItems: "center" }}>
                    Manager
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ height: 64, padding: "0 24px", borderTop: "1px solid #F0F0F0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <button
                  onClick={handleCancelCreateManager}
                  style={{ height: 40, padding: "0 16px", background: "transparent", border: "1.5px solid #DEE2E6", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#67748E", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitCreateManager}
                  style={{ height: 40, padding: "0 20px", background: "#17181C", color: "white", border: "none", borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#000")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#17181C")}
                >
                  Create Manager
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── COMMAND PALETTE ── */}
      {paletteOpen && (
        <>
          <div onClick={() => { setPaletteOpen(false); setPaletteQuery(""); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 80 }} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            style={{
              position: "fixed", top: "15%", left: "50%", transform: "translateX(-50%)",
              width: 560, background: "white", borderRadius: 16, zIndex: 81, overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)", animation: "scaleIn 200ms ease-out both",
            }}
          >
            {/* Search row */}
            <div style={{ height: 56, borderBottom: "1px solid #F0F0F0", padding: "0 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8392AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                autoFocus
                value={paletteQuery}
                onChange={e => { setPaletteQuery(e.target.value); setPaletteHighlightIndex(0); }}
                onKeyDown={e => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setPaletteHighlightIndex(i => Math.min(i + 1, paletteResults.length - 1)); }
                  if (e.key === "ArrowUp")   { e.preventDefault(); setPaletteHighlightIndex(i => Math.max(i - 1, 0)); }
                  if (e.key === "Enter" && paletteResults[paletteHighlightIndex]) executePaletteItem(paletteResults[paletteHighlightIndex]);
                  if (e.key === "Escape") { setPaletteOpen(false); setPaletteQuery(""); }
                }}
                placeholder="Search screens, people, leads…"
                style={{ flex: 1, border: "none", outline: "none", fontFamily: "Inter, sans-serif", fontSize: 15, color: "#1A1A1A", background: "transparent" }}
              />
            </div>

            {/* Results */}
            <div style={{ maxHeight: 360, overflowY: "auto", padding: "8px 0" }}>
              {paletteResults.length === 0 ? (
                <p style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8392AB", padding: 24, margin: 0 }}>
                  No results for "{paletteQuery}"
                </p>
              ) : (() => {
                const groups: Record<string, CommandItem[]> = {};
                paletteResults.forEach(item => {
                  const g = item.type === "executive" || item.type === "manager" ? "people" : item.type;
                  if (!groups[g]) groups[g] = [];
                  groups[g].push(item);
                });
                const groupLabels: Record<string, string> = { screen: "Screens", action: "Actions", people: "People", lead: "Leads" };
                let globalIdx = 0;
                return Object.entries(groups).map(([group, items]) => (
                  <div key={group}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: "#8392AB", padding: "8px 20px 4px", margin: 0, letterSpacing: "0.06em" }}>
                      {groupLabels[group] ?? group}
                    </p>
                    {items.map(item => {
                      const idx = globalIdx++;
                      const isHighlighted = idx === paletteHighlightIndex;
                      return (
                        <div
                          key={(item as any).id ?? item.label}
                          onClick={() => executePaletteItem(item)}
                          onMouseEnter={() => setPaletteHighlightIndex(idx)}
                          style={{
                            height: 44, padding: "0 20px", display: "flex", alignItems: "center", gap: 10,
                            cursor: "pointer", background: isHighlighted ? "#F4F5F7" : "transparent",
                          }}
                        >
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A" }}>{item.label}</span>
                          {(item as any).subtitle && (
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#8392AB", marginLeft: 4 }}>{(item as any).subtitle}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
          </div>
        </>
      )}

      {/* ── SAVE VIEW PROMPT ── */}
      {showSaveViewPrompt && (
        <>
          <div onClick={() => setShowSaveViewPrompt(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 80 }} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="save-view-title"
            style={{
              position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: 360, background: "white", borderRadius: 18, zIndex: 81, padding: 28,
              boxShadow: "0 8px 40px rgba(0,0,0,0.2)", animation: "scaleIn 200ms ease-out both",
            }}
          >
            <p id="save-view-title" style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A", margin: "0 0 16px" }}>
              Save Current View
            </p>
            <input
              autoFocus
              value={saveViewName}
              onChange={e => setSaveViewName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSaveCurrentView(); if (e.key === "Escape") setShowSaveViewPrompt(false); }}
              placeholder="e.g. This Month — Hot Leads"
              style={{
                width: "100%", height: 40, border: "1px solid #DEE2E6", borderRadius: 8,
                padding: "0 12px", fontFamily: "Inter, sans-serif", fontSize: 13,
                color: "#1A1A1A", outline: "none", boxSizing: "border-box", marginBottom: 20,
              }}
            />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={() => { setShowSaveViewPrompt(false); setSaveViewName(""); }}
                style={{ height: 40, padding: "0 18px", background: "#F4F5F7", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#67748E" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCurrentView}
                style={{ height: 40, padding: "0 18px", background: "#17181C", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600 }}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        /* ── KEYFRAMES ── */
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes screenEnter {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes indeterminateSweep {
          0%   { transform: translateX(-100%) scaleX(0.3); }
          50%  { transform: translateX(60%)  scaleX(0.6); }
          100% { transform: translateX(200%) scaleX(0.3); }
        }
        @keyframes chipBounce {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes dotPop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
        @keyframes badgePulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes timelineEntry {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes newHistoryRow {
          0%   { opacity: 0; transform: translateY(-6px); background: rgba(76,175,80,0.08); }
          30%  { opacity: 1; transform: translateY(0);    background: rgba(76,175,80,0.08); }
          100% { background: transparent; }
        }
        @keyframes medalShimmer {
          0%, 80%, 100% { filter: brightness(1); }
          40%            { filter: brightness(1.25) drop-shadow(0 0 4px rgba(255,215,0,0.6)); }
        }
        @keyframes sparklineDraw {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }

        /* ── GLOBAL BUTTON PRESS FEEDBACK ── */
        button:active { transform: scale(0.97); transition: transform 100ms ease-out !important; }
        button { transition: background 150ms, transform 100ms, opacity 150ms; }

        /* ── FOCUS RING ── */
        button:focus-visible, [role="button"]:focus-visible, [role="tab"]:focus-visible,
        [role="switch"]:focus-visible, [role="radio"]:focus-visible, a:focus-visible {
          outline: 2px solid #17181C;
          outline-offset: 2px;
          transition: outline-offset 100ms ease-out;
        }

        /* ── CARD HOVER LIFT — consistent timing everywhere ── */
        .sv-card-hover {
          transition: transform 150ms ease-out, box-shadow 150ms ease-out;
        }
        .sv-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        /* ── CHIP / PILL BOUNCE ON CLICK ── */
        .sv-chip:active {
          animation: chipBounce 150ms cubic-bezier(0.34,1.56,0.64,1) both;
        }

        /* ── BADGE PULSE (one-shot) ── */
        .badge-pulse {
          animation: badgePulse 400ms ease-out both;
        }

        /* ── INPUT FOCUS TRANSITION ── */
        input:focus, select:focus, textarea:focus {
          transition: border-color 120ms ease-out, box-shadow 120ms ease-out;
        }

        /* ── COMMAND PALETTE ROW TRANSITION ── */
        .palette-row { transition: background 100ms ease-out; }

        /* ── BREADCRUMB ENTRANCE ── */
        .sv-breadcrumb {
          animation: fadeLeft 200ms ease-out both;
        }

        /* ── SIDEBAR NAV ITEM ── */
        .sv-nav-item { transition: background 150ms ease-out, color 150ms ease-out; }

        /* ── PERIOD PILL TRANSITIONS ── */
        .sv-period-pill { transition: background 150ms ease-out, box-shadow 150ms ease-out, color 150ms ease-out; }

        /* ── COVERAGE / CONNECT BADGE COLOR CROSSFADE ── */
        .sv-tier-badge { transition: background 200ms ease-out, color 200ms ease-out; }

        /* ── TOOLTIP HOVER DELAY ── */
        .sv-tooltip-anchor .sv-tooltip {
          opacity: 0; pointer-events: none;
          transition: opacity 100ms ease-out;
          transition-delay: 0ms;
        }
        .sv-tooltip-anchor:hover .sv-tooltip {
          opacity: 1;
          transition-delay: 150ms;
        }

        /* ── SKELETON SHIMMER ── */
        @keyframes shimmer {
          from { background-position: -400px 0; }
          to   { background-position: 400px 0; }
        }
        .sv-skeleton {
          background: linear-gradient(90deg, #F0F0F0 25%, #E8E8E8 50%, #F0F0F0 75%);
          background-size: 800px 100%;
          animation: shimmer 1.8s infinite linear;
          border-radius: 18px;
        }

        /* ── UTILITY ── */
        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0;
          margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
          white-space: nowrap; border-width: 0;
        }

        /* ── PREFERS-REDUCED-MOTION ── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          /* Keep essential press/focus feedback — just shortened */
          button:active { transform: scale(0.99) !important; }
          .badge-pulse, .medalShimmer, .sv-skeleton { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

function App() {
  // Prototype embeds land straight in the portal; add ?signin=1 to see the sign-in screen.
  const [isAuthenticated, setIsAuthenticated] = useState(
    new URLSearchParams(location.search).get("signin") !== "1"
  );

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            borderRadius: 10,
          },
        }}
      />
      {isAuthenticated ? (
        <AppShell />
      ) : (
        <SignInScreen onSignIn={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}


ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
