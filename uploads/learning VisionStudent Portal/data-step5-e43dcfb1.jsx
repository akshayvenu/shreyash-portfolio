// ============================================================
// STEP 5 — Player lesson list + Settings defaults
// ============================================================

const playerLessonList = {
  "BAT-001": [
    { id: "ITM-001", type: "video",      title: "JSX Syntax & Rules",     duration: "12 min",      durationSecs: 720,  status: "completed",   section: "React Fundamentals Review", chapter: "JSX Deep Dive",          thumbnail: "https://img.icons8.com/pulsar-color/48/video.png" },
    { id: "ITM-002", type: "pdf",        title: "JSX Reference Guide",    duration: "5 min read",  durationSecs: 300,  status: "completed",   section: "React Fundamentals Review", chapter: "JSX Deep Dive",          thumbnail: "https://img.icons8.com/pulsar-color/48/pdf.png" },
    { id: "ITM-003", type: "quiz",       title: "JSX Quick Quiz",         duration: "3 questions", durationSecs: 180,  status: "completed",   section: "React Fundamentals Review", chapter: "JSX Deep Dive",          thumbnail: "https://img.icons8.com/pulsar-color/48/test-passed.png" },
    { id: "ITM-004", type: "video",      title: "Lifecycle Methods",      duration: "18 min",      durationSecs: 1080, status: "completed",   section: "React Fundamentals Review", chapter: "Component Lifecycle",    thumbnail: "https://img.icons8.com/pulsar-color/48/video.png" },
    { id: "ITM-005", type: "video",      title: "useEffect Patterns",     duration: "22 min",      durationSecs: 1320, status: "in-progress", section: "React Fundamentals Review", chapter: "Component Lifecycle",    thumbnail: "https://img.icons8.com/pulsar-color/48/video.png" },
    { id: "ITM-006", type: "video",      title: "Context API Overview",   duration: "15 min",      durationSecs: 900,  status: "upcoming",    section: "Advanced Patterns",         chapter: "Context API Deep Dive",  thumbnail: "https://img.icons8.com/pulsar-color/48/video.png" },
    { id: "ITM-007", type: "pdf",        title: "Context API Cookbook",   duration: "8 min read",  durationSecs: 480,  status: "locked",      section: "Advanced Patterns",         chapter: "Context API Deep Dive",  thumbnail: "https://img.icons8.com/pulsar-color/48/pdf.png" },
    { id: "ITM-008", type: "video",      title: "Building Custom Hooks",  duration: "20 min",      durationSecs: 1200, status: "locked",      section: "Advanced Patterns",         chapter: "Custom Hooks",           thumbnail: "https://img.icons8.com/pulsar-color/48/video.png" },
    { id: "ITM-009", type: "assignment", title: "Hook Challenge",         duration: "45 min",      durationSecs: 2700, status: "locked",      section: "Advanced Patterns",         chapter: "Custom Hooks",           thumbnail: "https://img.icons8.com/pulsar-color/48/test-passed.png" }
  ]
};

const settingsData = {
  profile: {
    name: "Aarav Shah",
    email: "aarav.s@company.com",
    phone: "+91 98765 00042",
    dept: "Engineering",
    designation: "Software Engineer",
    institution: "AIVision Learning Institute",
    employeeId: "LV-STU-0042"
  },
  preferences: {
    language: "English",
    timezone: "Asia/Kolkata (IST)",
    dateFormat: "DD/MM/YYYY"
  },
  notifications: {
    testReminders: true,
    deadlineAlerts: true,
    contentUpdates: false,
    weeklyReport: true,
    emailNotifs: true,
    pushNotifs: false
  },
  appearance: {
    theme: "light",
    fontSize: "medium",
    compactMode: false
  },
  privacy: {
    showProgress: true,
    showActivity: true,
    allowAnalytics: true
  }
};

const formatSecs = (totalSecs, progress) => {
  const elapsed = Math.floor((totalSecs || 0) * (progress || 0) / 100);
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

Object.assign(window, { playerLessonList, settingsData, formatSecs });
