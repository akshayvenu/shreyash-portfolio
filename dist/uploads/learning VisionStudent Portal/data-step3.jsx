// ============================================================
// STEP 3 — Tests + Questions (mock data)
// ============================================================
// Overrides the lightweight Step 2 classTests with the full schema.

const classTestsFull = [
  {
    id: "TST-001",
    title: "React Fundamentals Quiz",
    name: "React Fundamentals Quiz",
    batch: "React Batch 2025-A",
    batchId: "BAT-001",
    course: "React Advanced Patterns",
    totalQuestions: 10,
    duration: 15,
    status: "completed",
    score: 90,
    submittedOn: "Apr 10, 2025",
    maxScore: 100,
    color: "#E8620A",
    colorBg: "#FFF3EE"
  },
  {
    id: "TST-002",
    title: "JSX & Components Test",
    name: "JSX & Components Test",
    batch: "React Batch 2025-A",
    batchId: "BAT-001",
    course: "React Advanced Patterns",
    totalQuestions: 5,
    duration: 20,
    status: "available",
    score: null,
    dueDate: "May 28, 2025",
    daysLeft: 8,
    maxScore: 100,
    color: "#E8620A",
    colorBg: "#FFF3EE"
  },
  {
    id: "TST-003",
    title: "Python Basics Assessment",
    name: "Python Basics Assessment",
    batch: "Python DS Batch B",
    batchId: "BAT-002",
    course: "Python for Data Science",
    totalQuestions: 12,
    duration: 18,
    status: "completed",
    score: 75,
    submittedOn: "Apr 5, 2025",
    maxScore: 100,
    color: "#2563EB",
    colorBg: "#EFF6FF"
  },
  {
    id: "TST-004",
    title: "Data Structures Quiz",
    name: "Data Structures Quiz",
    batch: "Python DS Batch B",
    batchId: "BAT-002",
    course: "Python for Data Science",
    totalQuestions: 8,
    duration: 12,
    status: "upcoming",
    score: null,
    dueDate: "Jun 5, 2025",
    daysLeft: 16,
    maxScore: 100,
    color: "#2563EB",
    colorBg: "#EFF6FF"
  }
];

const testQuestions = [
  {
    id: "Q1",
    type: "mcq",
    question: "Which hook is used to manage side effects in React?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correct: "useEffect",
    marks: 10,
    explanation: "useEffect is specifically designed to handle side effects like data fetching, subscriptions, or manually changing the DOM."
  },
  {
    id: "Q2",
    type: "true-false",
    question: "JSX must always return a single root element.",
    options: ["True", "False"],
    correct: "True",
    marks: 10,
    explanation: "JSX expressions must have one parent element. You can use React.Fragment or an empty <> tag as a wrapper if needed."
  },
  {
    id: "Q3",
    type: "mcq",
    question: "What does the virtual DOM in React help with?",
    options: [
      "Direct DOM manipulation",
      "Efficient UI updates",
      "Server-side rendering",
      "State management"
    ],
    correct: "Efficient UI updates",
    marks: 20,
    explanation: "The virtual DOM is a lightweight copy of the real DOM. React uses it to calculate the minimal set of changes needed, making UI updates more efficient."
  },
  {
    id: "Q4",
    type: "mcq",
    question: "Which method is called first in a React component's lifecycle?",
    options: [
      "componentDidMount",
      "componentWillMount",
      "render",
      "constructor"
    ],
    correct: "constructor",
    marks: 20,
    explanation: "The constructor is called before the component is mounted. It's used to initialize state and bind event handlers."
  },
  {
    id: "Q5",
    type: "true-false",
    question: "React.memo() can prevent unnecessary re-renders of functional components.",
    options: ["True", "False"],
    correct: "True",
    marks: 40,
    explanation: "React.memo() is a higher-order component that memoizes a functional component, preventing re-renders when props haven't changed."
  }
];

// Override Step 2 classTests with the richer schema
window.classTests = classTestsFull;
window.testQuestions = testQuestions;

window.formatTime = (seconds) => {
  const total = Math.max(0, seconds | 0);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

window.scoreColor = (pct) => {
  if (pct >= 80) return '#16A34A';
  if (pct >= 60) return '#D97706';
  return '#DC2626';
};

window.scoreBg = (pct) => {
  if (pct >= 80) return { bg: '#DCFCE7', border: '#86EFAC' };
  if (pct >= 60) return { bg: '#FEF3C7', border: '#FCD34D' };
  return { bg: '#FEF2F2', border: '#FECACA' };
};
