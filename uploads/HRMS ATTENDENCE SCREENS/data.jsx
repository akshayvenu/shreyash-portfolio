// Mock data + helpers
const STATUS_STYLES = {
  checkedIn:    { bg:'#DCFCE7', color:'#16A34A', border:'#86EFAC', label:'Checked In',    dot:'#16A34A' },
  checkedOut:   { bg:'#EFF6FF', color:'#2563EB', border:'#BFDBFE', label:'Checked Out',   dot:'#2563EB' },
  late:         { bg:'#FEF3C7', color:'#D97706', border:'#FCD34D', label:'Late',          dot:'#D97706' },
  onLeave:      { bg:'#FAF5FF', color:'#7C3AED', border:'#DDD6FE', label:'On Leave',      dot:'#7C3AED' },
  notCheckedIn: { bg:'#FEF2F2', color:'#DC2626', border:'#FECACA', label:'Not Checked In',dot:'#DC2626' },
  outdoor:      { bg:'#ECFEFF', color:'#0891B2', border:'#A5F3FC', label:'Outdoor',       dot:'#0891B2' },
  wfh:          { bg:'#F0FDF4', color:'#16A34A', border:'#86EFAC', label:'Work From Home',dot:'#16A34A' },
  travelling:   { bg:'#FEF3C7', color:'#D97706', border:'#FCD34D', label:'Travelling',    dot:'#D97706' },
  atEvent:      { bg:'#FAF5FF', color:'#7C3AED', border:'#DDD6FE', label:'At Event',      dot:'#7C3AED' },
  active:       { bg:'#DCFCE7', color:'#16A34A', border:'#86EFAC', label:'Active',        dot:'#16A34A' },
};
const getStatusStyle = (s) => STATUS_STYLES[s] || { bg:'#F1F5F9', color:'#64748B', border:'#E2E8F0', label:'Unknown', dot:'#94A3B8' };

const ROLE_STYLES = {
  superadmin: { bg:'#BD1313', color:'#FFFFFF', label:'Super Admin', soft:'#FDF2F2', softColor:'#BD1313', grad:'linear-gradient(135deg,#BD1313,#7A0D0D)' },
  admin:      { bg:'#2563EB', color:'#FFFFFF', label:'Admin',       soft:'#EFF6FF', softColor:'#2563EB', grad:'linear-gradient(135deg,#2563EB,#1D4ED8)' },
  manager:    { bg:'#7C3AED', color:'#FFFFFF', label:'Manager',     soft:'#FAF5FF', softColor:'#7C3AED', grad:'linear-gradient(135deg,#7C3AED,#6D28D9)' },
  employee:   { bg:'#16A34A', color:'#FFFFFF', label:'Employee',    soft:'#DCFCE7', softColor:'#16A34A', grad:'linear-gradient(135deg,#16A34A,#15803D)' },
};
const getRoleStyle = (r) => ROLE_STYLES[r] || ROLE_STYLES.employee;

const CURRENT_USER = { name:'Rajesh Kumar', initials:'RK', email:'rajesh.kumar@aivision.com', branch:'Mumbai HQ' };

const SUMMARY = {
  totalEmployees: 847, checkedIn: 612, checkedOut: 89, late: 43,
  onLeave: 52, notCheckedIn: 94, outdoor: 38, wfh: 67,
  travelling: 14, atEvent: 11
};

const STAT_CARDS = [
  { key:'total',        value:847, label:'Total Employees',  icon:'groups',             strip:'#64748B', trend:'up',   delta:'3%' },
  { key:'checkedIn',    value:612, label:'Checked In',       icon:'attendance-mark',    strip:'#16A34A', trend:'up',   delta:'4%' },
  { key:'checkedOut',   value:89,  label:'Checked Out',      icon:'time-card',          strip:'#2563EB', trend:'down', delta:'2%' },
  { key:'late',         value:43,  label:'Late',             icon:'overtime',           strip:'#D97706', trend:'up',   delta:'1%' },
  { key:'onLeave',      value:52,  label:'On Leave',         icon:'leave',              strip:'#7C3AED', trend:'down', delta:'1%' },
  { key:'notCheckedIn', value:94,  label:'Not Checked In',   icon:'attendance-mark',    strip:'#DC2626', trend:'down', delta:'3%' },
  { key:'outdoor',      value:38,  label:'Outdoor',          icon:'tent',               strip:'#0891B2', trend:'up',   delta:'2%' },
  { key:'wfh',          value:67,  label:'Work From Home',   icon:'home-office',        strip:'#16A34A', trend:'up',   delta:'5%' },
  { key:'travelling',   value:14,  label:'Travelling',       icon:'airplane-mode-on',   strip:'#D97706', trend:'flat', delta:'0%' },
  { key:'atEvent',      value:11,  label:'At Event',         icon:'calendar',           strip:'#7C3AED', trend:'flat', delta:'0%' },
];

const STATUS_TILES = [
  { key:'checkedIn',    label:'Checked In',     count:612 },
  { key:'checkedOut',   label:'Checked Out',    count:89  },
  { key:'onLeave',      label:'On Leave',       count:52  },
  { key:'notCheckedIn', label:'Not Checked In', count:94  },
  { key:'outdoor',      label:'Outdoor',        count:38  },
  { key:'wfh',          label:'Work From Home', count:67  },
  { key:'travelling',   label:'Travelling',     count:14  },
  { key:'atEvent',      label:'At Event',       count:11  },
];

const BRANCHES = [
  { branch:'Mumbai HQ',        city:'Mumbai',    state:'Maharashtra',  country:'India', total:312, present:234, onLeave:18, outdoor:14, wfh:28, notIn:18 },
  { branch:'Delhi Branch',     city:'Delhi',     state:'Delhi',        country:'India', total:187, present:142, onLeave:12, outdoor:9,  wfh:15, notIn:9  },
  { branch:'Bangalore Office', city:'Bangalore', state:'Karnataka',    country:'India', total:156, present:118, onLeave:10, outdoor:8,  wfh:14, notIn:6  },
  { branch:'Chennai Hub',      city:'Chennai',   state:'Tamil Nadu',   country:'India', total:112, present:78,  onLeave:8,  outdoor:5,  wfh:12, notIn:9  },
  { branch:'Pune Office',      city:'Pune',      state:'Maharashtra',  country:'India', total:80,  present:62,  onLeave:4,  outdoor:2,  wfh:8,  notIn:4  },
];

const ADMINS = [
  { id:'ADM-001', name:'Priya Sharma',  initials:'PS', role:'admin', dept:'Engineering',       branch:'Mumbai HQ',         status:'checkedIn', checkIn:'09:02 AM', checkOut:null, shift:'General (9AM–6PM)',  managersCount:8, employeesCount:124 },
  { id:'ADM-002', name:'Vikram Mehta',  initials:'VM', role:'admin', dept:'Operations',        branch:'Delhi Branch',      status:'late',      checkIn:'10:15 AM', checkOut:null, shift:'General (9AM–6PM)',  managersCount:5, employeesCount:78  },
  { id:'ADM-003', name:'Sneha Iyer',    initials:'SI', role:'admin', dept:'Design & Product',  branch:'Bangalore Office',  status:'checkedIn', checkIn:'08:55 AM', checkOut:null, shift:'Flexible (8AM–5PM)', managersCount:4, employeesCount:62  },
  { id:'ADM-004', name:'Arjun Bose',    initials:'AB', role:'admin', dept:'Marketing',         branch:'Chennai Hub',       status:'onLeave',   checkIn:null,        checkOut:null, shift:'General (9AM–6PM)',  managersCount:3, employeesCount:45  },
  { id:'ADM-005', name:'Kavita Rao',    initials:'KR', role:'admin', dept:'Finance & HR',      branch:'Pune Office',       status:'checkedIn', checkIn:'09:10 AM', checkOut:null, shift:'General (9AM–6PM)',  managersCount:3, employeesCount:37  },
];

const MANAGERS = [
  { id:'MGR-001', name:'Rahul Desai', initials:'RD', role:'manager', dept:'Frontend Engineering', branch:'Mumbai HQ', adminId:'ADM-001', status:'checkedIn', checkIn:'09:05 AM', checkOut:null, shift:'General (9AM–6PM)', employeesCount:12, presentToday:10 },
  { id:'MGR-002', name:'Anita Verma', initials:'AV', role:'manager', dept:'Backend Engineering',  branch:'Mumbai HQ', adminId:'ADM-001', status:'outdoor',   checkIn:'08:50 AM', checkOut:null, shift:'General (9AM–6PM)', employeesCount:10, presentToday:8  },
  { id:'MGR-003', name:'Karan Patel', initials:'KP', role:'manager', dept:'QA & Testing',         branch:'Mumbai HQ', adminId:'ADM-001', status:'wfh',       checkIn:'09:20 AM', checkOut:null, shift:'Flexible (8AM–5PM)', employeesCount:8,  presentToday:7  },
];

const EMPLOYEES = [
  { id:'EMP-001', name:'Aarav Shah',   initials:'AS', role:'employee', designation:'Senior Developer',     dept:'Frontend Engineering', branch:'Mumbai HQ', managerId:'MGR-001', status:'checkedIn',    checkIn:'09:01 AM', checkOut:null, shift:'General (9AM–6PM)', leavesUsed:5, leavesTotal:24 },
  { id:'EMP-002', name:'Diya Mehta',   initials:'DM', role:'employee', designation:'UI Developer',         dept:'Frontend Engineering', branch:'Mumbai HQ', managerId:'MGR-001', status:'checkedIn',    checkIn:'09:15 AM', checkOut:null, shift:'General (9AM–6PM)', leavesUsed:3, leavesTotal:24 },
  { id:'EMP-003', name:'Rohan Gupta',  initials:'RG', role:'employee', designation:'React Developer',      dept:'Frontend Engineering', branch:'Mumbai HQ', managerId:'MGR-001', status:'notCheckedIn', checkIn:null,        checkOut:null, shift:'General (9AM–6PM)', leavesUsed:8, leavesTotal:24 },
  { id:'EMP-004', name:'Prachi Singh', initials:'PS', role:'employee', designation:'Angular Developer',    dept:'Frontend Engineering', branch:'Mumbai HQ', managerId:'MGR-001', status:'travelling',   checkIn:'08:30 AM', checkOut:null, shift:'General (9AM–6PM)', leavesUsed:2, leavesTotal:24 },
  { id:'EMP-005', name:'Nikhil Joshi', initials:'NJ', role:'employee', designation:'Full Stack Developer', dept:'Frontend Engineering', branch:'Mumbai HQ', managerId:'MGR-001', status:'late',         checkIn:'10:05 AM', checkOut:null, shift:'General (9AM–6PM)', leavesUsed:6, leavesTotal:24 },
];

const LEAVES = [
  { id:'LV-001', name:'Arjun Bose',  initials:'AB', role:'admin',    dept:'Marketing',             type:'Annual Leave', from:'Apr 28', to:'Apr 30', days:3, status:'approved' },
  { id:'LV-002', name:'Aarav Shah',  initials:'AS', role:'employee', dept:'Frontend Engineering',  type:'Sick Leave',   from:'May 2',  to:'May 2',  days:1, status:'approved' },
  { id:'LV-003', name:'Rahul Desai', initials:'RD', role:'manager',  dept:'Frontend Engineering',  type:'Casual Leave', from:'May 5',  to:'May 6',  days:2, status:'pending'  },
  { id:'LV-004', name:'Diya Mehta',  initials:'DM', role:'employee', dept:'Frontend Engineering',  type:'Annual Leave', from:'May 10', to:'May 14', days:5, status:'approved' },
];

// State + country aggregates for Location Report
const STATES = [
  {
    state:'Maharashtra', country:'India', branchCount:2,
    total:392, present:296, onLeave:22,
    branches:[
      { branch:'Mumbai HQ',   present:234 },
      { branch:'Pune Office', present:62  },
    ]
  },
  {
    state:'Delhi', country:'India', branchCount:1,
    total:187, present:142, onLeave:12,
    branches:[ { branch:'Delhi Branch', present:142 } ]
  },
  {
    state:'Karnataka', country:'India', branchCount:1,
    total:156, present:118, onLeave:10,
    branches:[ { branch:'Bangalore Office', present:118 } ]
  },
  {
    state:'Tamil Nadu', country:'India', branchCount:1,
    total:112, present:78, onLeave:8,
    branches:[ { branch:'Chennai Hub', present:78 } ]
  },
];

const COUNTRY = {
  name:'India', flag:'🇮🇳', region:'Asia / South Asia',
  branches:5, states:4, cities:5,
  total:847, present:634, onLeave:52, notIn:46
};

// Outdoor & Travel directory — 14 people
const OUTDOOR_PEOPLE = [
  { id:'EMP-004', name:'Prachi Singh', initials:'PS', role:'employee', designation:'Angular Developer',  dept:'Frontend Engineering', status:'travelling', destination:'Pune',      purpose:'Client Meeting',     date:'Apr 28' },
  { id:'MGR-002', name:'Anita Verma',  initials:'AV', role:'manager',  designation:'Manager',            dept:'Backend Engineering',  status:'outdoor',    destination:'Mumbai',    purpose:'Vendor Discussion',  date:'Apr 28' },
  { id:'EMP-007', name:'Suresh Nair',  initials:'SN', role:'employee', designation:'Backend Developer',  dept:'Backend Engineering',  status:'atEvent',    destination:'Bangalore', purpose:'Tech Conference',    date:'Apr 28–29' },
  { id:'EMP-012', name:'Meera Reddy',  initials:'MR', role:'employee', designation:'QA Lead',            dept:'QA & Testing',         status:'wfh',        destination:'Home',      purpose:'Work From Home',     date:'Apr 28' },
  { id:'MGR-003', name:'Karan Patel',  initials:'KP', role:'manager',  designation:'Manager',            dept:'QA & Testing',         status:'wfh',        destination:'Home',      purpose:'Work From Home',     date:'Apr 28' },
  { id:'EMP-001', name:'Aarav Shah',   initials:'AS', role:'employee', designation:'Senior Developer',   dept:'Frontend Engineering', status:'wfh',        destination:'Home',      purpose:'Work From Home',     date:'Apr 28' },
  { id:'EMP-002', name:'Diya Mehta',   initials:'DM', role:'employee', designation:'UI Developer',       dept:'Frontend Engineering', status:'wfh',        destination:'Home',      purpose:'Work From Home',     date:'Apr 28' },
  { id:'EMP-021', name:'Ravi Kumar',   initials:'RK', role:'employee', designation:'DevOps Engineer',    dept:'Engineering',          status:'travelling', destination:'Delhi',     purpose:'Infrastructure Audit', date:'Apr 28–29' },
  { id:'EMP-034', name:'Pooja Nair',   initials:'PN', role:'employee', designation:'HR Executive',       dept:'Finance & HR',         status:'outdoor',    destination:'Mumbai',    purpose:'Campus Hiring',      date:'Apr 28' },
  { id:'EMP-051', name:'Rohan Shetty', initials:'RS', role:'employee', designation:'Marketing Exec',     dept:'Marketing',            status:'atEvent',    destination:'Chennai',   purpose:'Brand Summit',       date:'Apr 28' },
  { id:'EMP-052', name:'Priya Das',    initials:'PD', role:'employee', designation:'Content Writer',     dept:'Marketing',            status:'wfh',        destination:'Home',      purpose:'Work From Home',     date:'Apr 28' },
  { id:'EMP-061', name:'Vikram Singh', initials:'VS', role:'employee', designation:'Sales Manager',      dept:'Operations',           status:'travelling', destination:'Bangalore', purpose:'Client Pitch',       date:'Apr 28' },
  { id:'EMP-062', name:'Nisha Mehta',  initials:'NM', role:'employee', designation:'Operations Exec',    dept:'Operations',           status:'outdoor',    destination:'Delhi',     purpose:'Site Inspection',    date:'Apr 28' },
  { id:'EMP-071', name:'Tanvi Kapoor', initials:'TK', role:'employee', designation:'Account Manager',    dept:'Operations',           status:'wfh',        destination:'Home',      purpose:'Work From Home',     date:'Apr 28' },
];

const RETURNING_SOON = [
  { id:'EMP-007', name:'Suresh Nair',  initials:'SN', role:'employee', type:'At Event',    date:'Apr 29', today:false },
  { id:'EMP-021', name:'Ravi Kumar',   initials:'RK', role:'employee', type:'Travelling',  date:'Apr 29', today:false },
  { id:'EMP-061', name:'Vikram Singh', initials:'VS', role:'employee', type:'Travelling',  date:'Apr 29', today:false },
  { id:'ADM-004', name:'Arjun Bose',   initials:'AB', role:'admin',    type:'On Leave',    date:'Apr 30', today:false },
  { id:'EMP-004', name:'Prachi Singh', initials:'PS', role:'employee', type:'Travelling',  date:'Today',  today:true  },
];

const SCREEN_TITLES = {
  today:'Today\u2019s Report', live:'Live Status',
  attendance:'Attendance Report', leaves:'Leave Report',
  'late-absent':'Late & Absent', hierarchy:'Hierarchy View',
  location:'Location Report', outdoor:'Outdoor & Travel',
  trends:'Trends', export:'Export Reports'
};

Object.assign(window, {
  STATUS_STYLES, getStatusStyle, ROLE_STYLES, getRoleStyle,
  CURRENT_USER, SUMMARY, STAT_CARDS, STATUS_TILES, BRANCHES,
  STATES, COUNTRY, OUTDOOR_PEOPLE, RETURNING_SOON,
  ADMINS, MANAGERS, EMPLOYEES, LEAVES, SCREEN_TITLES
});
