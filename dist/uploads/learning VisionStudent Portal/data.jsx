// ============================================================
// MOCK DATA
// ============================================================

const STUDENT = {
  name: "Aarav Shah",
  initials: "AS",
  email: "aarav.s@company.com",
  employeeId: "LV-STU-0042",
  department: "Engineering",
  designation: "Software Engineer",
  institution: "AIVision Learning Institute",
  joinedDate: "Jan 10, 2025"
};

const enrolledBatches = [
  {
    id: "BAT-001",
    name: "React Batch 2025-A",
    course: "React Advanced Patterns",
    supervisor: "Rahul Verma",
    startDate: "Apr 1, 2025",
    endDate: "May 26, 2025",
    duration: "8 weeks",
    progress: 72,
    status: "active",
    color: "#E8620A",
    totalChapters: 18,
    completedChapters: 13,
    nextLesson: "Context API Deep Dive"
  },
  {
    id: "BAT-002",
    name: "Python DS Batch B",
    course: "Python for Data Science",
    supervisor: "Anita Desai",
    startDate: "Mar 15, 2025",
    endDate: "Apr 26, 2025",
    duration: "6 weeks",
    progress: 45,
    status: "active",
    color: "#2563EB",
    totalChapters: 14,
    completedChapters: 6,
    nextLesson: "NumPy Fundamentals"
  },
  {
    id: "BAT-003",
    name: "UI/UX Jan Batch",
    course: "UI/UX Fundamentals",
    supervisor: "Meera Singh",
    startDate: "Jan 10, 2025",
    endDate: "Feb 7, 2025",
    duration: "4 weeks",
    progress: 100,
    status: "completed",
    color: "#16A34A",
    totalChapters: 9,
    completedChapters: 9,
    nextLesson: null
  }
];

const recentActivity = [
  { id: 1, type: "completed", text: "Completed 'JSX Deep Dive' video", batch: "React Batch 2025-A", time: "2 hours ago", iconType: "video", color: "#2563EB", bgColor: "#EFF6FF" },
  { id: 2, type: "test", text: "Scored 90% on React Fundamentals Quiz", batch: "React Batch 2025-A", time: "Yesterday", iconType: "test", color: "#16A34A", bgColor: "#DCFCE7" },
  { id: 3, type: "started", text: "Started 'useEffect Patterns'", batch: "React Batch 2025-A", time: "Yesterday", iconType: "video", color: "#E8620A", bgColor: "#FFF3EE" },
  { id: 4, type: "completed", text: "Completed UI/UX Fundamentals batch", batch: "UI/UX Jan Batch", time: "Feb 7, 2025", iconType: "batch", color: "#BD1313", bgColor: "#FDF2F2" }
];

const upcomingEvents = [
  { id: 1, title: "JSX & Components Test", type: "test", date: "May 28, 2025", time: "10:00 AM", batch: "React Batch 2025-A", color: "#2563EB", bg: "#EFF6FF", daysLeft: 8 },
  { id: 2, title: "React Batch 2025-A ends", type: "deadline", date: "May 26, 2025", time: "End of Day", batch: "React Batch 2025-A", color: "#DC2626", bg: "#FEF2F2", daysLeft: 6 },
  { id: 3, title: "Data Structures Quiz", type: "test", date: "Jun 5, 2025", time: "2:00 PM", batch: "Python DS Batch B", color: "#7C3AED", bg: "#FAF5FF", daysLeft: 16 }
];

const dashboardStats = [
  { id: 1, value: "3",   label: "Enrolled Batches", icon: "https://img.icons8.com/pulsar-color/48/group.png",       gradient: "linear-gradient(135deg, #FFF3EE, white)", borderColor: "#E8620A" },
  { id: 2, value: "48",  label: "Hours Learned",    icon: "https://img.icons8.com/pulsar-color/48/clock.png",       gradient: "linear-gradient(135deg, #EFF6FF, white)", borderColor: "#2563EB" },
  { id: 3, value: "7",   label: "Tests Taken",      icon: "https://img.icons8.com/pulsar-color/48/test-passed.png", gradient: "linear-gradient(135deg, #F0FDF4, white)", borderColor: "#16A34A" },
  { id: 4, value: "82%", label: "Avg Test Score",   icon: "https://img.icons8.com/pulsar-color/48/trophy.png",      gradient: "linear-gradient(135deg, #FAF5FF, white)", borderColor: "#7C3AED" }
];

const notifications = [
  { id: 1, title: "New test available",      body: "JSX & Components Test is now open",        time: "1h ago",     read: false, type: "test" },
  { id: 2, title: "Batch deadline approaching", body: "React Batch 2025-A ends in 6 days",     time: "3h ago",     read: false, type: "deadline" },
  { id: 3, title: "Test result published",   body: "You scored 90% on React Fundamentals Quiz", time: "Yesterday",  read: true,  type: "result" },
  { id: 4, title: "New content added",       body: "2 new videos added to Python DS Batch B",  time: "2 days ago", read: true,  type: "content" }
];

const navItems = [
  { label: 'Dashboard',     screen: 'dashboard',     icon: 'https://img.icons8.com/pulsar-color/48/dashboard.png' },
  { label: 'My Learning',   screen: 'my-learning',   icon: 'https://img.icons8.com/pulsar-color/48/training.png' },
  { label: 'Tests',         screen: 'tests',         icon: 'https://img.icons8.com/pulsar-color/48/test-passed.png' },
  { label: 'Calendar',      screen: 'calendar',      icon: 'https://img.icons8.com/pulsar-color/48/calendar.png' },
  { label: 'Notifications', screen: 'notifications', icon: 'https://img.icons8.com/pulsar-color/48/bell.png' },
  { label: 'TutorBot',      screen: 'tutorbot',      icon: 'https://img.icons8.com/pulsar-color/48/bot.png', aiBadge: true },
  { label: 'Profile',       screen: 'profile',       icon: 'https://img.icons8.com/pulsar-color/48/student-male.png' }
];

const screenLabels = {
  'dashboard': 'Dashboard',
  'my-learning': 'My Learning',
  'tests': 'Tests',
  'calendar': 'Calendar',
  'notifications': 'Notifications',
  'profile': 'Profile',
  'settings': 'Settings',
  'batch-detail': 'Batch Detail',
  'learning-player': 'Learning',
  'test-active': 'Test',
  'test-results': 'Test Results',
  'tutorbot': 'TutorBot AI',
  'analytics': 'Analytics'
};

const getActiveNavItem = (screen) => {
  if (['batch-detail', 'learning-player'].includes(screen)) return 'my-learning';
  if (['test-results', 'test-active'].includes(screen)) return 'tests';
  if (screen === 'analytics') return 'dashboard';
  return screen;
};

Object.assign(window, { getActiveNavItem });

Object.assign(window, {
  STUDENT, enrolledBatches, recentActivity, upcomingEvents,
  dashboardStats, notifications, navItems, screenLabels
});
