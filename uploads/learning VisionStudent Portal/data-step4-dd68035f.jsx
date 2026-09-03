// ============================================================
// STEP 4 — Calendar / Activity / Profile data
// ============================================================

const calendarEvents = {
  2025: {
    4: { // April
      1:  [{ type:'activity', label:'React Batch starts',   color:'#E8620A' }],
      5:  [{ type:'test',     label:'Python Basics Test',   color:'#2563EB' }],
      10: [{ type:'test',     label:'React Fundamentals',   color:'#E8620A' },
           { type:'activity', label:'Lesson completed',     color:'#16A34A' }],
      14: [{ type:'activity', label:'JSX Deep Dive',        color:'#E8620A' }],
      18: [{ type:'activity', label:'Lifecycle Methods',    color:'#E8620A' }],
      22: [{ type:'activity', label:'useEffect Patterns',   color:'#E8620A' }],
      26: [{ type:'deadline', label:'Python Batch ends',    color:'#DC2626' }]
    },
    5: { // May
      2:  [{ type:'activity', label:'Context API video',    color:'#E8620A' }],
      5:  [{ type:'activity', label:'NumPy Arrays',         color:'#2563EB' }],
      8:  [{ type:'activity', label:'Custom Hooks video',   color:'#E8620A' }],
      12: [{ type:'activity', label:'Array Operations',     color:'#2563EB' }],
      15: [{ type:'activity', label:'Hook Challenge',       color:'#E8620A' }],
      20: [{ type:'activity', label:'Today - useEffect',    color:'#E8620A' }],
      26: [{ type:'deadline', label:'React Batch ends',     color:'#DC2626' }],
      28: [{ type:'test',     label:'JSX & Components Test',color:'#2563EB' }]
    },
    6: { // June
      5:  [{ type:'test',     label:'Data Structures Quiz', color:'#2563EB' }],
      10: [{ type:'activity', label:'New batch expected',   color:'#9898B0' }]
    }
  }
};

const activityStreak = [
  { day: 'Mon', active: true  },
  { day: 'Tue', active: true  },
  { day: 'Wed', active: true  },
  { day: 'Thu', active: true  },
  { day: 'Fri', active: false },
  { day: 'Sat', active: true  },
  { day: 'Sun', active: true  }
];

const weeklyHours = [
  { week: 'W1 Apr', hours: 6  },
  { week: 'W2 Apr', hours: 9  },
  { week: 'W3 Apr', hours: 7  },
  { week: 'W4 Apr', hours: 11 },
  { week: 'W1 May', hours: 8  },
  { week: 'W2 May', hours: 7  }
];

const profileSkills = [
  { name: 'React.js',     level: 72,  color: '#E8620A', bg: '#FFF3EE' },
  { name: 'Python',       level: 45,  color: '#2563EB', bg: '#EFF6FF' },
  { name: 'UI/UX Design', level: 100, color: '#16A34A', bg: '#DCFCE7' },
  { name: 'JavaScript',   level: 68,  color: '#BD1313', bg: '#FDF2F2' }
];

const certificates = [
  {
    id: 'CERT-001',
    title: 'UI/UX Fundamentals',
    issueDate: 'Feb 7, 2025',
    batch: 'UI/UX Jan Batch',
    instructor: 'Meera Singh',
    color: '#16A34A',
    bg: '#F0FDF4',
    border: '#86EFAC'
  }
];

const achievements = [
  { id: 1, title: 'First Completion', desc: 'Completed your first batch', icon: 'https://img.icons8.com/3d-fluency/100/trophy.png',         color: '#16A34A', bg: '#F0FDF4', earned: true,  earnedDate: 'Feb 7, 2025' },
  { id: 2, title: 'Top Scorer',       desc: 'Scored 90%+ on a test',       icon: 'https://img.icons8.com/3d-fluency/100/star.png',           color: '#D97706', bg: '#FFFBEB', earned: true,  earnedDate: 'Apr 10, 2025' },
  { id: 3, title: '12-Day Streak',    desc: 'Learned 12 days in a row',    icon: 'https://img.icons8.com/3d-fluency/100/fire-element.png',   color: '#E8620A', bg: '#FFF3EE', earned: true,  earnedDate: 'May 18, 2025' },
  { id: 4, title: 'Speed Learner',    desc: 'Complete 5 lessons in one day', icon: 'https://img.icons8.com/3d-fluency/100/lightning-bolt.png', color: '#7C3AED', bg: '#FAF5FF', earned: false, earnedDate: null },
  { id: 5, title: 'Perfect Score',    desc: 'Score 100% on any test',      icon: 'https://img.icons8.com/3d-fluency/100/goal.png',           color: '#BD1313', bg: '#FDF2F2', earned: false, earnedDate: null },
  { id: 6, title: 'Multi-Learner',    desc: 'Enroll in 3 batches',         icon: 'https://img.icons8.com/3d-fluency/100/graduation-cap.png', color: '#2563EB', bg: '#EFF6FF', earned: true,  earnedDate: 'Mar 20, 2025' }
];

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const getDaysInMonth = (month, year) =>
  new Date(year, month + 1, 0).getDate();
const getFirstDay = (month, year) =>
  new Date(year, month, 1).getDay();

Object.assign(window, {
  calendarEvents, activityStreak, weeklyHours,
  profileSkills, certificates, achievements,
  monthNames, getDaysInMonth, getFirstDay
});
