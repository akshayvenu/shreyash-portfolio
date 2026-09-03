// ============================================================
// STEP 2 — Course content tree + class tests (mock data)
// ============================================================

const courseContentTree = {
  "BAT-001": {
    course: "React Advanced Patterns",
    totalSections: 2,
    totalChapters: 4,
    totalItems: 9,
    completedItems: 5,
    sections: [
      {
        id: "SEC-001",
        title: "React Fundamentals Review",
        totalItems: 5,
        completedItems: 5,
        expanded: true,
        chapters: [
          {
            id: "CH-001",
            title: "JSX Deep Dive",
            completedItems: 3,
            totalItems: 3,
            expanded: true,
            items: [
              { id: "ITM-001", type: "video", title: "JSX Syntax & Rules",   duration: "12 min",       status: "completed" },
              { id: "ITM-002", type: "pdf",   title: "JSX Reference Guide",  duration: "5 min read",   status: "completed" },
              { id: "ITM-003", type: "quiz",  title: "JSX Quick Quiz",       duration: "3 questions",  status: "completed" }
            ]
          },
          {
            id: "CH-002",
            title: "Component Lifecycle",
            completedItems: 2, totalItems: 2,
            expanded: false,
            items: [
              { id: "ITM-004", type: "video", title: "Lifecycle Methods",   duration: "18 min", status: "completed" },
              { id: "ITM-005", type: "video", title: "useEffect Patterns",  duration: "22 min", status: "in-progress" }
            ]
          }
        ]
      },
      {
        id: "SEC-002",
        title: "Advanced Patterns",
        totalItems: 4, completedItems: 0,
        expanded: false,
        chapters: [
          {
            id: "CH-003",
            title: "Context API Deep Dive",
            completedItems: 0, totalItems: 2,
            expanded: false,
            items: [
              { id: "ITM-006", type: "video", title: "Context API Overview", duration: "15 min",     status: "upcoming" },
              { id: "ITM-007", type: "pdf",   title: "Context API Cookbook", duration: "8 min read", status: "locked" }
            ]
          },
          {
            id: "CH-004",
            title: "Custom Hooks",
            completedItems: 0, totalItems: 2,
            expanded: false,
            items: [
              { id: "ITM-008", type: "video",      title: "Building Custom Hooks", duration: "20 min", status: "locked" },
              { id: "ITM-009", type: "assignment", title: "Hook Challenge",        duration: "45 min", status: "locked" }
            ]
          }
        ]
      }
    ]
  },
  "BAT-002": {
    course: "Python for Data Science",
    totalSections: 2, totalChapters: 3, totalItems: 7, completedItems: 3,
    sections: [
      {
        id: "SEC-003",
        title: "Python Basics",
        totalItems: 4, completedItems: 3, expanded: true,
        chapters: [
          {
            id: "CH-005",
            title: "Python Fundamentals",
            completedItems: 2, totalItems: 2, expanded: false,
            items: [
              { id: "ITM-010", type: "video", title: "Variables & Data Types",     duration: "14 min",     status: "completed" },
              { id: "ITM-011", type: "pdf",   title: "Python Syntax Cheatsheet",   duration: "4 min read", status: "completed" }
            ]
          },
          {
            id: "CH-006",
            title: "Control Flow",
            completedItems: 1, totalItems: 2, expanded: false,
            items: [
              { id: "ITM-012", type: "video", title: "Loops & Conditionals", duration: "16 min",      status: "completed" },
              { id: "ITM-013", type: "quiz",  title: "Control Flow Quiz",    duration: "5 questions", status: "in-progress" }
            ]
          }
        ]
      },
      {
        id: "SEC-004",
        title: "Data Science Libraries",
        totalItems: 3, completedItems: 0, expanded: false,
        chapters: [
          {
            id: "CH-007",
            title: "NumPy Fundamentals",
            completedItems: 0, totalItems: 3, expanded: false,
            items: [
              { id: "ITM-014", type: "video",      title: "NumPy Arrays",       duration: "19 min", status: "upcoming" },
              { id: "ITM-015", type: "video",      title: "Array Operations",   duration: "17 min", status: "locked" },
              { id: "ITM-016", type: "assignment", title: "NumPy Practice Set", duration: "30 min", status: "locked" }
            ]
          }
        ]
      }
    ]
  },
  "BAT-003": {
    course: "UI/UX Fundamentals",
    totalSections: 1, totalChapters: 2, totalItems: 5, completedItems: 5,
    sections: [
      {
        id: "SEC-005",
        title: "Design Principles",
        totalItems: 5, completedItems: 5, expanded: true,
        chapters: [
          {
            id: "CH-008",
            title: "Design Thinking",
            completedItems: 3, totalItems: 3, expanded: false,
            items: [
              { id: "ITM-017", type: "video", title: "Intro to Design Thinking",  duration: "11 min",      status: "completed" },
              { id: "ITM-018", type: "pdf",   title: "Design Principles Guide",   duration: "6 min read",  status: "completed" },
              { id: "ITM-019", type: "quiz",  title: "Design Thinking Quiz",      duration: "4 questions", status: "completed" }
            ]
          },
          {
            id: "CH-009",
            title: "Wireframing & Prototyping",
            completedItems: 2, totalItems: 2, expanded: false,
            items: [
              { id: "ITM-020", type: "video",      title: "Figma Essentials",     duration: "24 min", status: "completed" },
              { id: "ITM-021", type: "assignment", title: "Wireframe Challenge",  duration: "60 min", status: "completed" }
            ]
          }
        ]
      }
    ]
  }
};

// Class tests per batch (sidebar list inside Batch Detail)
const classTests = [
  { id: "TST-001", batchId: "BAT-001", name: "JSX & Components Test",   status: "available", score: null },
  { id: "TST-002", batchId: "BAT-001", name: "React Fundamentals Quiz", status: "completed", score: 90 },
  { id: "TST-003", batchId: "BAT-002", name: "Control Flow Quiz",       status: "available", score: null },
  { id: "TST-004", batchId: "BAT-002", name: "Data Structures Quiz",    status: "upcoming",  score: null }
];

// Content type → badge style
const getItemTypeStyle = (type) => {
  switch (type) {
    case 'video':      return { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE', label: 'Video' };
    case 'pdf':        return { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', label: 'PDF' };
    case 'audio':      return { bg: '#F0FDF4', color: '#16A34A', border: '#86EFAC', label: 'Audio' };
    case 'quiz':       return { bg: '#FAF5FF', color: '#7C3AED', border: '#DDD6FE', label: 'Quiz' };
    case 'assignment': return { bg: '#FFFBEB', color: '#D97706', border: '#FCD34D', label: 'Assignment' };
    default:           return { bg: '#F5F0EB', color: '#4A4A68', border: '#EEE8E3', label: type };
  }
};

// Item status → status pill / icon
const getItemStatusStyle = (status) => {
  switch (status) {
    case 'completed':   return { color: '#16A34A', icon: 'check' };
    case 'in-progress': return { color: '#E8620A', icon: 'play' };
    case 'upcoming':    return { color: '#2563EB', icon: 'upcoming' };
    case 'locked':      return { color: '#9898B0', icon: 'lock' };
    default:            return { color: '#9898B0', icon: 'dot' };
  }
};

Object.assign(window, {
  courseContentTree, classTests,
  getItemTypeStyle, getItemStatusStyle
});
