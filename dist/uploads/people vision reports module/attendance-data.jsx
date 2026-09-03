// Data for Attendance, Leaves, Late & Absent tabs

const ATTENDANCE_ROWS = [
  { id:'EMP-001', name:'Aarav Shah',   initials:'AS', role:'employee', dept:'Frontend Engineering',  branch:'Mumbai HQ',         checkIn:'09:01 AM', checkOut:null,      status:'checkedIn',    shift:'Gen 9-6'  },
  { id:'EMP-002', name:'Diya Mehta',   initials:'DM', role:'employee', dept:'Frontend Engineering',  branch:'Mumbai HQ',         checkIn:'09:15 AM', checkOut:null,      status:'checkedIn',    shift:'Gen 9-6'  },
  { id:'EMP-003', name:'Rohan Gupta',  initials:'RG', role:'employee', dept:'Frontend Engineering',  branch:'Mumbai HQ',         checkIn:null,        checkOut:null,     status:'notCheckedIn', shift:'Gen 9-6'  },
  { id:'EMP-004', name:'Prachi Singh', initials:'PS', role:'employee', dept:'Frontend Engineering',  branch:'Mumbai HQ',         checkIn:'08:30 AM', checkOut:null,      status:'travelling',   shift:'Gen 9-6'  },
  { id:'EMP-005', name:'Nikhil Joshi', initials:'NJ', role:'employee', dept:'Frontend Engineering',  branch:'Mumbai HQ',         checkIn:'10:05 AM', checkOut:null,      status:'late',         shift:'Gen 9-6'  },
  { id:'MGR-001', name:'Rahul Desai',  initials:'RD', role:'manager',  dept:'Frontend Engineering',  branch:'Mumbai HQ',         checkIn:'09:05 AM', checkOut:null,      status:'checkedIn',    shift:'Gen 9-6'  },
  { id:'MGR-002', name:'Anita Verma',  initials:'AV', role:'manager',  dept:'Backend Engineering',   branch:'Mumbai HQ',         checkIn:'08:50 AM', checkOut:null,      status:'outdoor',      shift:'Gen 9-6'  },
  { id:'MGR-003', name:'Karan Patel',  initials:'KP', role:'manager',  dept:'QA & Testing',          branch:'Mumbai HQ',         checkIn:'09:20 AM', checkOut:null,      status:'wfh',          shift:'Flex 8-5' },
  { id:'EMP-007', name:'Suresh Nair',  initials:'SN', role:'employee', dept:'Backend Engineering',   branch:'Bangalore Office',  checkIn:'08:45 AM', checkOut:null,      status:'atEvent',      shift:'Gen 9-6'  },
  { id:'EMP-012', name:'Meera Reddy',  initials:'MR', role:'employee', dept:'QA & Testing',          branch:'Mumbai HQ',         checkIn:'09:30 AM', checkOut:null,      status:'wfh',          shift:'Gen 9-6'  },
  { id:'ADM-001', name:'Priya Sharma', initials:'PS', role:'admin',    dept:'Engineering',           branch:'Mumbai HQ',         checkIn:'09:02 AM', checkOut:null,      status:'checkedIn',    shift:'Gen 9-6'  },
  { id:'ADM-002', name:'Vikram Mehta', initials:'VM', role:'admin',    dept:'Operations',            branch:'Delhi Branch',      checkIn:'10:15 AM', checkOut:null,      status:'late',         shift:'Gen 9-6'  },
  { id:'ADM-003', name:'Sneha Iyer',   initials:'SI', role:'admin',    dept:'Design & Product',      branch:'Bangalore Office',  checkIn:'08:55 AM', checkOut:null,      status:'checkedIn',    shift:'Flex 8-5' },
  { id:'ADM-004', name:'Arjun Bose',   initials:'AB', role:'admin',    dept:'Marketing',             branch:'Chennai Hub',       checkIn:null,        checkOut:null,     status:'onLeave',      shift:'Gen 9-6'  },
  { id:'ADM-005', name:'Kavita Rao',   initials:'KR', role:'admin',    dept:'Finance & HR',          branch:'Pune Office',       checkIn:'09:10 AM', checkOut:null,      status:'checkedIn',    shift:'Gen 9-6'  },
  { id:'EMP-021', name:'Ravi Kumar',   initials:'RK', role:'employee', dept:'Engineering',           branch:'Delhi Branch',      checkIn:'08:40 AM', checkOut:null,      status:'travelling',   shift:'Gen 9-6'  },
  { id:'EMP-034', name:'Pooja Nair',   initials:'PN', role:'employee', dept:'Finance & HR',          branch:'Mumbai HQ',         checkIn:'09:05 AM', checkOut:null,      status:'outdoor',      shift:'Gen 9-6'  },
  { id:'EMP-051', name:'Rohan Shetty', initials:'RS', role:'employee', dept:'Marketing',             branch:'Chennai Hub',       checkIn:'08:55 AM', checkOut:null,      status:'atEvent',      shift:'Gen 9-6'  },
  { id:'EMP-052', name:'Priya Das',    initials:'PD', role:'employee', dept:'Marketing',             branch:'Chennai Hub',       checkIn:'09:25 AM', checkOut:null,      status:'wfh',          shift:'Gen 9-6'  },
  { id:'EMP-062', name:'Nisha Mehta',  initials:'NM', role:'employee', dept:'Operations',            branch:'Delhi Branch',      checkIn:'09:00 AM', checkOut:'05:45 PM',status:'checkedOut',   shift:'Gen 9-6'  },
];

const LEAVE_ROWS = [
  { id:'LV-001', empId:'ADM-004', name:'Arjun Bose',   initials:'AB', role:'admin',    type:'Annual Leave',    from:'Apr 28', to:'Apr 30', days:3, dept:'Marketing',            status:'approved' },
  { id:'LV-002', empId:'EMP-001', name:'Aarav Shah',   initials:'AS', role:'employee', type:'Sick Leave',      from:'May 2',  to:'May 2',  days:1, dept:'Frontend Engineering', status:'approved' },
  { id:'LV-003', empId:'MGR-001', name:'Rahul Desai',  initials:'RD', role:'manager',  type:'Casual Leave',    from:'May 5',  to:'May 6',  days:2, dept:'Frontend Engineering', status:'pending'  },
  { id:'LV-004', empId:'EMP-002', name:'Diya Mehta',   initials:'DM', role:'employee', type:'Annual Leave',    from:'May 10', to:'May 14', days:5, dept:'Frontend Engineering', status:'approved' },
  { id:'LV-005', empId:'EMP-021', name:'Ravi Kumar',   initials:'RK', role:'employee', type:'Emergency Leave', from:'Apr 30', to:'May 1',  days:2, dept:'Engineering',          status:'approved' },
  { id:'LV-006', empId:'EMP-034', name:'Pooja Nair',   initials:'PN', role:'employee', type:'Sick Leave',      from:'May 3',  to:'May 3',  days:1, dept:'Finance & HR',         status:'pending'  },
  { id:'LV-007', empId:'EMP-012', name:'Meera Reddy',  initials:'MR', role:'employee', type:'Annual Leave',    from:'May 15', to:'May 19', days:5, dept:'QA & Testing',         status:'approved' },
  { id:'LV-008', empId:'ADM-003', name:'Sneha Iyer',   initials:'SI', role:'admin',    type:'Casual Leave',    from:'May 7',  to:'May 7',  days:1, dept:'Design & Product',     status:'approved' },
  { id:'LV-009', empId:'ADM-002', name:'Vikram Mehta', initials:'VM', role:'admin',    type:'Sick Leave',      from:'May 12', to:'May 13', days:2, dept:'Operations',           status:'pending'  },
  { id:'LV-010', empId:'EMP-005', name:'Nikhil Joshi', initials:'NJ', role:'employee', type:'Annual Leave',    from:'May 20', to:'May 23', days:4, dept:'Frontend Engineering', status:'approved' },
  { id:'LV-011', empId:'EMP-007', name:'Suresh Nair',  initials:'SN', role:'employee', type:'Casual Leave',    from:'May 8',  to:'May 8',  days:1, dept:'Backend Engineering',  status:'approved' },
  { id:'LV-012', empId:'EMP-052', name:'Priya Das',    initials:'PD', role:'employee', type:'Annual Leave',    from:'Jun 2',  to:'Jun 6',  days:5, dept:'Marketing',            status:'pending'  },
];

const LATE_ROWS = [
  { id:'EMP-005', name:'Nikhil Joshi', initials:'NJ', role:'employee', dept:'Frontend Engineering', checkIn:'10:05 AM', lateMin:65, shift:'Gen 9-6',  occurrences:3 },
  { id:'ADM-002', name:'Vikram Mehta', initials:'VM', role:'admin',    dept:'Operations',           checkIn:'10:15 AM', lateMin:75, shift:'Gen 9-6',  occurrences:5 },
  { id:'EMP-101', name:'Ravi Sharma',  initials:'RS', role:'employee', dept:'Backend Engineering',  checkIn:'09:45 AM', lateMin:45, shift:'Gen 9-6',  occurrences:2 },
  { id:'EMP-102', name:'Pooja Das',    initials:'PD', role:'employee', dept:'Marketing',            checkIn:'09:38 AM', lateMin:38, shift:'Gen 9-6',  occurrences:1 },
  { id:'EMP-103', name:'Amit Kumar',   initials:'AK', role:'employee', dept:'QA & Testing',         checkIn:'09:32 AM', lateMin:32, shift:'Flex 8-5', occurrences:4 },
  { id:'EMP-104', name:'Sona Patel',   initials:'SP', role:'employee', dept:'Design & Product',     checkIn:'09:28 AM', lateMin:28, shift:'Flex 8-5', occurrences:1 },
  { id:'EMP-105', name:'Deepak Singh', initials:'DS', role:'employee', dept:'Operations',           checkIn:'09:25 AM', lateMin:25, shift:'Gen 9-6',  occurrences:2 },
  { id:'EMP-106', name:'Rekha Iyer',   initials:'RI', role:'employee', dept:'Finance & HR',         checkIn:'09:22 AM', lateMin:22, shift:'Gen 9-6',  occurrences:3 },
  { id:'EMP-107', name:'Ajay Nair',    initials:'AN', role:'employee', dept:'Engineering',          checkIn:'09:18 AM', lateMin:18, shift:'Gen 9-6',  occurrences:1 },
  { id:'EMP-108', name:'Seema Rao',    initials:'SR', role:'employee', dept:'Marketing',            checkIn:'09:14 AM', lateMin:14, shift:'Gen 9-6',  occurrences:2 },
];

const ABSENT_ROWS = [
  { id:'EMP-003', name:'Rohan Gupta',   initials:'RG', role:'employee', dept:'Frontend Engineering', status:'notCheckedIn', shift:'Gen 9-6',  lastSeen:'Yesterday 6:02 PM' },
  { id:'ADM-004', name:'Arjun Bose',    initials:'AB', role:'admin',    dept:'Marketing',            status:'onLeave',      shift:'Gen 9-6',  lastSeen:'Apr 27 5:45 PM'    },
  { id:'EMP-201', name:'Kavya Reddy',   initials:'KR', role:'employee', dept:'Backend Engineering',  status:'notCheckedIn', shift:'Gen 9-6',  lastSeen:'Yesterday 5:30 PM' },
  { id:'EMP-202', name:'Manoj Sharma',  initials:'MS', role:'employee', dept:'Operations',           status:'notCheckedIn', shift:'Gen 9-6',  lastSeen:'Yesterday 6:15 PM' },
  { id:'EMP-203', name:'Sunita Patel',  initials:'SP', role:'employee', dept:'Finance & HR',         status:'notCheckedIn', shift:'Flex 8-5', lastSeen:'Yesterday 4:55 PM' },
  { id:'EMP-204', name:'Rohit Verma',   initials:'RV', role:'employee', dept:'QA & Testing',         status:'notCheckedIn', shift:'Gen 9-6',  lastSeen:'Yesterday 6:00 PM' },
  { id:'EMP-205', name:'Preethi Nair',  initials:'PN', role:'employee', dept:'Design & Product',     status:'onLeave',      shift:'Flex 8-5', lastSeen:'Apr 25 5:20 PM'    },
  { id:'EMP-206', name:'Sanjay Kumar',  initials:'SK', role:'employee', dept:'Engineering',          status:'notCheckedIn', shift:'Gen 9-6',  lastSeen:'Yesterday 5:50 PM' },
  { id:'EMP-207', name:'Deepa Menon',   initials:'DM', role:'employee', dept:'Marketing',            status:'notCheckedIn', shift:'Gen 9-6',  lastSeen:'Yesterday 6:08 PM' },
  { id:'EMP-208', name:'Rajesh Pillai', initials:'RP', role:'employee', dept:'Operations',           status:'notCheckedIn', shift:'Gen 9-6',  lastSeen:'Yesterday 5:40 PM' },
];

const LEAVE_TYPE_BREAKDOWN = [
  { type:'Annual Leave',    count:18, color:'#2563EB' },
  { type:'Sick Leave',      count:14, color:'#DC2626' },
  { type:'Casual Leave',    count:11, color:'#D97706' },
  { type:'Maternity Leave', count:5,  color:'#7C3AED' },
  { type:'Emergency Leave', count:4,  color:'#BD1313' },
];

const DEPT_LEAVE_SUMMARY = [
  { dept:'Frontend Engineering', count:9 },
  { dept:'Backend Engineering',  count:7 },
  { dept:'Operations',           count:8 },
  { dept:'Marketing',            count:6 },
  { dept:'Design & Product',     count:5 },
  { dept:'Finance & HR',         count:4 },
  { dept:'QA & Testing',         count:7 },
  { dept:'Other / Mixed',        count:6 },
];

const ATTENDANCE_BREAKDOWN = [
  { label:'Checked In',     count:612, color:'#16A34A' },
  { label:'Work From Home', count:67,  color:'#4ADE80' },
  { label:'Checked Out',    count:89,  color:'#2563EB' },
  { label:'Late',           count:43,  color:'#D97706' },
  { label:'On Leave',       count:52,  color:'#7C3AED' },
  { label:'Not Checked In', count:94,  color:'#DC2626' },
  { label:'Outdoor',        count:38,  color:'#0891B2' },
  { label:'Travelling',     count:14,  color:'#FCD34D' },
  { label:'At Event',       count:11,  color:'#A78BFA' },
];

const WEEKLY_TREND = [
  { day:'Mon', present:608, late:38, absent:89  },
  { day:'Tue', present:621, late:42, absent:76  },
  { day:'Wed', present:615, late:35, absent:82  },
  { day:'Thu', present:598, late:51, absent:99  },
  { day:'Fri', present:589, late:45, absent:108 },
  { day:'Sat', present:312, late:18, absent:235 },
  { day:'Sun', present:45,  late:8,  absent:554 },
];

const DEPT_LATE_BREAKDOWN = [
  { dept:'Frontend Eng',   count:8 },
  { dept:'Backend Eng',    count:6 },
  { dept:'Operations',     count:7 },
  { dept:'Marketing',      count:5 },
  { dept:'QA & Testing',   count:6 },
  { dept:'Design & Prod',  count:4 },
  { dept:'Finance & HR',   count:4 },
  { dept:'Other',          count:3 },
];

const DEPT_ABSENT_BREAKDOWN = [
  { dept:'Frontend Eng',   count:18 },
  { dept:'Backend Eng',    count:12 },
  { dept:'Operations',     count:14 },
  { dept:'Marketing',      count:11 },
  { dept:'QA & Testing',   count:13 },
  { dept:'Design & Prod',  count:9  },
  { dept:'Finance & HR',   count:8  },
  { dept:'Other',          count:9  },
];

const LEAVE_TYPE_BADGE = {
  'Annual Leave':    { bg:'#EFF6FF', color:'#2563EB' },
  'Sick Leave':      { bg:'#FEF2F2', color:'#DC2626' },
  'Casual Leave':    { bg:'#FEF3C7', color:'#D97706' },
  'Maternity Leave': { bg:'#FAF5FF', color:'#7C3AED' },
  'Emergency Leave': { bg:'#FEF2F2', color:'#DC2626' },
};

Object.assign(window, {
  ATTENDANCE_ROWS, LEAVE_ROWS, LATE_ROWS, ABSENT_ROWS,
  LEAVE_TYPE_BREAKDOWN, DEPT_LEAVE_SUMMARY,
  ATTENDANCE_BREAKDOWN, WEEKLY_TREND,
  DEPT_LATE_BREAKDOWN, DEPT_ABSENT_BREAKDOWN, LEAVE_TYPE_BADGE
});
