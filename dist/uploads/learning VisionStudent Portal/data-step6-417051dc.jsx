// ============================================================
// STEP 6 — TutorBot + Analytics data
// ============================================================

const tutorBotSuggestions = [
  "Explain React useEffect with examples",
  "What is the difference between props and state?",
  "How does the virtual DOM work?",
  "Give me a quiz on JSX basics",
  "Summarize my current batch progress",
  "What should I study next?"
];

const tutorBotInitialMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Hi Aarav! 👋 I'm your AI learning assistant. I can help you understand concepts, quiz you on topics, summarise your progress, or answer any questions about your courses.\n\nWhat would you like to explore today?",
    time: "Just now",
    typing: false
  }
];

const analyticsData = {
  weeklyHoursChart: [
    { label: 'W1 Apr', hours: 6,  sessions: 4 },
    { label: 'W2 Apr', hours: 9,  sessions: 6 },
    { label: 'W3 Apr', hours: 7,  sessions: 5 },
    { label: 'W4 Apr', hours: 11, sessions: 8 },
    { label: 'W1 May', hours: 8,  sessions: 5 },
    { label: 'W2 May', hours: 7,  sessions: 4 }
  ],
  testScoresHistory: [
    { test: 'Python Basics', score: 75, date: 'Apr 5'  },
    { test: 'React Quiz',    score: 90, date: 'Apr 10' }
  ],
  completionByBatch: [
    { name: 'React Batch', pct: 72,  color: '#E8620A' },
    { name: 'Python DS',   pct: 45,  color: '#2563EB' },
    { name: 'UI/UX',       pct: 100, color: '#16A34A' }
  ],
  contentTypeSplit: [
    { type: 'Video',      count: 8, color: '#2563EB', pct: 53 },
    { type: 'PDF',        count: 4, color: '#DC2626', pct: 27 },
    { type: 'Quiz',       count: 2, color: '#7C3AED', pct: 13 },
    { type: 'Assignment', count: 1, color: '#D97706', pct: 7  }
  ],
  monthlyStreak: Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const activeSet = new Set([3, 4, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20]);
    return { day, active: activeSet.has(day) };
  })
};

// Bot reply heuristic (returns plain text with simple **bold** + ``` blocks)
const getBotReply = (input) => {
  const lower = input.toLowerCase();
  if (lower.includes('useeffect') || lower.includes('use effect')) {
    return "Great question! **useEffect** is a React hook that lets you perform side effects in functional components.\n\n**Basic syntax:**\n```\nuseEffect(() => {\n  // your side effect\n  return () => { /* cleanup */ };\n}, [dependencies]);\n```\n\n**Key points:**\n• Runs after every render by default\n• Pass [] to run only once (on mount)\n• Pass [dep] to run when dep changes\n• Return a function for cleanup\n\nWould you like a practice quiz on useEffect? 🧠";
  }
  if (lower.includes('props') && lower.includes('state')) {
    return "Here's a quick breakdown:\n\n**Props** 📦\n• Passed from parent to child\n• Read-only (immutable)\n• Used to configure a component\n\n**State** 🔄\n• Managed inside the component\n• Can be changed with setState/useState\n• Triggers re-render when changed\n\n**Simple rule:** Props come in from outside; state lives inside.";
  }
  if (lower.includes('virtual dom')) {
    return "The **Virtual DOM** is one of React's superpowers! 🚀\n\nHere's how it works:\n1. React keeps a lightweight copy of the real DOM in memory\n2. When state changes, React updates the virtual DOM first\n3. It then compares (diffs) the old and new virtual DOM\n4. Only the actual changed parts get updated in the real DOM\n\nThis makes React much faster than directly manipulating the DOM. It's called **reconciliation**. 🎯";
  }
  if (lower.includes('quiz') || lower.includes('test me')) {
    return "Let's test your knowledge! 🎯\n\n**Quick Quiz — React Basics**\n\n**Q1:** What hook would you use to fetch data when a component mounts?\n\nA) useState\nB) useEffect  ← correct!\nC) useContext\nD) useMemo\n\nType your answer or 'next' for another question!";
  }
  if (lower.includes('progress') || lower.includes('batch')) {
    return "Here's your current progress summary, Aarav! 📊\n\n🟠 **React Batch 2025-A** — 72% complete\n   13/18 chapters done · Next: Context API\n\n🔵 **Python DS Batch B** — 45% complete\n   6/14 chapters done · Next: NumPy\n\n🟢 **UI/UX Jan Batch** — 100% complete ✓\n   Certificate earned!\n\n**Overall:** 48 hours learned · 82% avg test score 🏆";
  }
  if (lower.includes('what should') || lower.includes('study next') || lower.includes('recommend')) {
    return "Based on your progress, here's what I recommend next, Aarav! 🎯\n\n**Immediate priority:**\n▶ Continue **useEffect Patterns** (React Batch — in progress)\n\n**Up next:**\n📖 Context API Overview (React Batch — Section 2)\n\n**Don't forget:**\n⚠️ JSX & Components Test due in 8 days!\n\nYou're doing great — keep the momentum! 💪";
  }
  if (lower.includes('hello') || lower.includes('hi ') || lower === 'hi' || lower.startsWith('hi') || lower.includes('hey')) {
    return "Hey Aarav! 👋 Great to see you. Ready to learn something today?\n\nYou're 72% through React Batch — so close! Want me to help you prep for the upcoming JSX test, or shall we dive into a concept together?";
  }
  if (lower.includes('jsx')) {
    return "**JSX** (JavaScript XML) is React's syntax extension that lets you write HTML-like code in JavaScript! 🎨\n\n**Key rules:**\n• Must return a single root element\n• Use className instead of class\n• Self-closing tags need a slash: <img />\n• Expressions go in curly braces: {variable}\n• Inline styles use objects: style={{color:'red'}}\n\n**Example:**\n```\nfunction Card({ title }) {\n  return (\n    <div className=\"card\">\n      <h1>{title}</h1>\n    </div>\n  );\n}\n```\nWant me to quiz you on this? 🧠";
  }
  if (lower.includes('certificate') || lower.includes('completed')) {
    return "🎉 Congratulations on completing **UI/UX Fundamentals**!\n\nYour certificate has been issued on **Feb 7, 2025**.\n\nYou can find it in:\n📂 Profile → Certificates tab\n\nYou're well on your way with 2 more active batches. Keep going — you've got this! 💪";
  }
  return "That's a great question! Let me help you with that.\n\nBased on your current courses in **React Advanced Patterns** and **Python for Data Science**, I can help you with:\n\n• Explaining concepts\n• Practice quizzes\n• Code examples\n• Progress summaries\n\nCould you be more specific about what you'd like to explore? For example: *'Explain React hooks'* or *'Quiz me on Python basics'* 🎯";
};

Object.assign(window, {
  tutorBotSuggestions, tutorBotInitialMessages,
  analyticsData, getBotReply
});
