Continue building EduVision.
Read system guidelines fully before writing any code.
Do NOT rebuild any existing screens.
Complete ONLY the placeholder screens.
All existing screens must remain intact.

=============================================================
COMPLETE PLACEHOLDER SCREENS
=============================================================

These screens currently show placeholder content.
Replace ONLY the placeholder content with full implementations.
Do not touch any other screens.

Screens to complete:
1. interview-session (Screen 3 of AI Interview)
2. interview-complete (Screen 4 of AI Interview)
3. interview-feedback (Screen 5 of AI Interview)
4. resume-editor (Screen 5 of Resume Builder)
5. resume-complete (Screen 6 of Resume Builder)

=============================================================
MOCK DATA — ADD IF NOT ALREADY IN FILE
=============================================================

If any of this data is missing, add it now:

const hrQuestions = [
  {id:1,
   question:'Tell me about yourself.',
   hint:'Structure: Present → Past → Future',
   category:'Introduction',
   tips:['Keep it under 2 minutes',
         'Focus on professional journey',
         'End with why you want this role']},
  {id:2,
   question:'What are your greatest strengths?',
   hint:'Pick 2-3 relevant to the role',
   category:'Self Assessment',
   tips:['Use specific examples',
         'Relate to job requirements',
         'Be confident not arrogant']},
  {id:3,
   question:'Where do you see yourself in 5 years?',
   hint:'Show ambition aligned with company growth',
   category:'Career Goals',
   tips:['Research the company growth path',
         'Show commitment to the role',
         'Be realistic and specific']},
  {id:4,
   question:'Why do you want to work at our company?',
   hint:'Research the company before the interview',
   category:'Company Fit',
   tips:['Mention specific company achievements',
         'Align personal values with company mission',
         'Show genuine enthusiasm']},
  {id:5,
   question:'Describe a challenge you faced and how you overcame it.',
   hint:'Use STAR: Situation Task Action Result',
   category:'Behavioral',
   tips:['Choose a real professional challenge',
         'Focus on your specific actions',
         'Quantify the result if possible']},
  {id:6,
   question:'What is your biggest weakness?',
   hint:'Choose a real weakness with a growth story',
   category:'Self Assessment',
   tips:['Be honest but strategic',
         'Show self-awareness',
         'Always include improvement steps']},
  {id:7,
   question:'Why should we hire you?',
   hint:'Summarize your unique value proposition',
   category:'Closing',
   tips:['Connect skills to job requirements',
         'Highlight unique strengths',
         'Express genuine enthusiasm']},
  {id:8,
   question:'Do you have any questions for us?',
   hint:'Always have 2-3 thoughtful questions ready',
   category:'Closing',
   tips:['Ask about team culture',
         'Ask about growth opportunities',
         'Never ask about salary in first round']}
];

const ariaResponses = [
  "Great answer! You structured that well. Let's move to the next question.",
  "Good points. Try to add a specific example next time to strengthen your answer.",
  "I like your enthusiasm! Remember to use the STAR format for behavioral questions.",
  "That's a solid response. Your confidence is coming through clearly.",
  "Nice! You covered the key points. Let's continue with the next question."
];

const sessionFeedback = {
  overallScore: 82,
  duration: '18 min 30s',
  questionsAnswered: 7,
  strengths: [
    'Strong communication and clarity',
    'Good use of specific examples',
    'Confident and composed delivery',
    'Well-structured answers'
  ],
  improvements: [
    'Use STAR format more consistently',
    'Add quantifiable results to answers',
    'Research company-specific details more'
  ],
  questionScores: [
    {q:'Tell me about yourself', score:88},
    {q:'Greatest strengths', score:85},
    {q:'5 year plan', score:78},
    {q:'Why our company', score:72},
    {q:'Challenge faced', score:90},
    {q:'Biggest weakness', score:75},
    {q:'Why hire you', score:85}
  ]
};

const resumeData = {
  templateId: 'classic',
  strength: 68,
  personalInfo: {
    fullName: 'Rahul Sharma',
    title: 'Software Engineer',
    email: 'rahul@vit.edu',
    phone: '+91 98765 43210',
    linkedin: 'linkedin.com/in/rahulsharma',
    portfolio: '',
    city: 'Vellore, Tamil Nadu'
  },
  education: [{
    id: 'edu_1',
    degree: 'B.Tech Computer Science',
    institution: 'VIT Vellore',
    year: '2025',
    grade: '7.8 CGPA',
    location: 'Vellore, TN'
  }],
  experience: [{
    id: 'exp_1',
    title: 'Software Development Intern',
    company: 'TCS Digital',
    startDate: 'June 2024',
    endDate: 'August 2024',
    isPresent: false,
    description: 'Developed RESTful APIs using Node.js and Express. Worked on React frontend features. Collaborated in agile team of 8 engineers.'
  }],
  skills: [
    {id:'sk_1', name:'JavaScript', level:'Expert'},
    {id:'sk_2', name:'React', level:'Intermediate'},
    {id:'sk_3', name:'Python', level:'Intermediate'},
    {id:'sk_4', name:'SQL', level:'Intermediate'},
    {id:'sk_5', name:'Node.js', level:'Beginner'},
    {id:'sk_6', name:'Git', level:'Expert'}
  ],
  projects: [{
    id: 'prj_1',
    name: 'Student Portal App',
    techStack: ['React', 'Node.js', 'MongoDB'],
    description: 'Built a full-stack portal for 500+ students to track attendance and grades. Reduced manual effort by 60%.',
    link: 'github.com/rahul/student-portal'
  }],
  summary: 'Results-driven CS student at VIT Vellore with hands-on experience in full-stack development. Proficient in React, Python, and SQL. Seeking a software engineering role to apply technical skills and drive impactful solutions.'
};

const resumeSections = [
  {label:"Personal", value:100},
  {label:"Education", value:100},
  {label:"Experience", value:100},
  {label:"Skills", value:60},
  {label:"Projects", value:40},
  {label:"Summary", value:0}
];

const resumeTemplates = [
  {id:'classic', name:'Classic',
   headerColor:'#BD1313', accent:'#BD1313'},
  {id:'modern', name:'Modern',
   headerColor:'#0F172A', accent:'#475569'},
  {id:'minimal', name:'Minimal',
   headerColor:'#E2E8F0', accent:'#94A3B8'},
  {id:'bold', name:'Bold',
   headerColor:'#D97706', accent:'#D97706'},
  {id:'creative', name:'Creative',
   headerColor:'#7C3AED', accent:'#7C3AED'},
  {id:'executive', name:'Executive',
   headerColor:'#1E293B', accent:'#334155'}
];

const aiSuggestions = [
  {id:1, type:'missing', icon:'💡',
   title:'Add certifications',
   detail:'Certifications boost credibility by 40%',
   priority:'high'},
  {id:2, type:'improve', icon:'💡',
   title:'Expand project descriptions',
   detail:'Add metrics and impact numbers',
   priority:'high'},
  {id:3, type:'missing', icon:'💡',
   title:'Add LinkedIn URL',
   detail:'Increases profile visibility by 30%',
   priority:'medium'},
  {id:4, type:'good', icon:'✅',
   title:'Contact info complete',
   detail:'Great — all basics are covered',
   priority:'low'}
];

const suggestedSkills = [
  'JavaScript','Python','React','SQL',
  'Node.js','Communication','Leadership',
  'Problem Solving','Excel','Figma',
  'Git','Machine Learning','TypeScript',
  'System Design','AWS'
];

=============================================================
INTERVIEW SESSION STATE
=============================================================

Add this state if not already present:

const [sessionQ, setSessionQ] = useState(0);
const [sessionAnswers, setSessionAnswers] = useState({});
const [sessionPhase, setSessionPhase] = useState('question');
const [sessionTime, setSessionTime] = useState(0);
const [sessionFlagged, setSessionFlagged] = useState([]);
const [sessionAnswer, setSessionAnswer] = useState('');

const formatSessionTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2,'0')}`;
};

useEffect(() => {
  if (screen === 'interview-session') {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }
}, [screen]);

=============================================================
PLACEHOLDER 1 — INTERVIEW SESSION
=============================================================

Replace 'interview-session' placeholder with:

Full screen focus mode. Clean minimal UI.
No distractions. Green module theme.

STRUCTURE:
  display flex, flex-direction column
  height 100%, overflow hidden
  background white

── SESSION TOP BAR (56px) ───────────────────────────────────

bg white, border-bottom 1px #E2E8F0
padding 0 24px, flex-shrink 0
display flex, align-items center
justify-content space-between

LEFT:
  display flex, align-items center, gap 8px
  
  Recording dot:
    width 8px, height 8px, border-radius 50%
    background #16A34A
    animation pulse 2s ease-in-out infinite
  
  "Session Live"
  Plus Jakarta Sans 12px weight 600 #16A34A

CENTER:
  Session timer:
    Syne 20px weight 800 #0F172A
    {formatSessionTime(sessionTime)}

RIGHT:
  display flex, align-items center, gap 10px
  
  Question counter chip:
    bg #F0FDF4, color #16A34A, border 1px #86EFAC
    Plus Jakarta Sans 12px weight 700
    border-radius 9999px, padding 4px 12px
    "Q{sessionQ + 1} / {hrQuestions.length}"
  
  End session button:
    bg #FEF2F2, color #DC2626, border 1px #FECACA
    Plus Jakarta Sans 12px weight 600
    border-radius 8px, padding 6px 14px
    cursor pointer
    onClick: () => {
      setScreen('interview-complete');
      setTimeout(() => showToast("Session complete! Great job 🎉"), 0);
    }

── SESSION PROGRESS BAR (4px) ───────────────────────────────

height 4px, flex-shrink 0
background #E2E8F0, overflow hidden

Fill div:
  height 100%, background #16A34A
  width: ((sessionQ) / hrQuestions.length * 100) + '%'
  transition width 500ms ease-out

── MAIN SESSION CONTENT (flex 1, display flex) ──────────────

overflow hidden

LEFT PANEL (flex 1, overflow-y auto, padding 24px):

  ARIA SECTION (text-align center, margin-bottom 20px):
    
    Aria avatar:
      <img
        src="https://i.ibb.co/8DT43N37/aria-avatar.png"
        width={100}
        height={100}
        style={{
          borderRadius: '50%',
          border: '3px solid #86EFAC',
          filter: 'drop-shadow(0 8px 24px rgba(22,163,74,0.3))',
          animation: sessionPhase === 'listening'
            ? 'pulse 1s ease-in-out infinite'
            : 'float 3s ease-in-out infinite',
          display: 'block',
          margin: '0 auto 12px'
        }}
      />
    
    Status pill:
      border-radius 9999px, padding 5px 16px
      Plus Jakarta Sans 12px weight 600
      display inline-block
      
      phase === 'question':
        bg #F0FDF4, color #16A34A, border 1px #86EFAC
        "🎤 Aria is asking..."
      
      phase === 'listening':
        bg #FFFBEB, color #D97706, border 1px #FCD34D
        "👂 Aria is listening..."
        animation pulse 1.5s infinite
      
      phase === 'aria-response':
        bg #EFF6FF, color #2563EB, border 1px #BFDBFE
        "💬 Aria is responding..."

  QUESTION CARD:
    bg white, border 1px #E2E8F0
    border-radius 20px, padding 24px
    box-shadow 0 4px 16px rgba(0,0,0,0.06)
    margin-bottom 16px, max-width 560px
    margin-left auto, margin-right auto
    width 100%

    QUESTION HEADER ROW (mb 14px):
      display flex, justify-content space-between
      align-items center

      Category badge:
        bg #F0FDF4, color #16A34A, border 1px #86EFAC
        Plus Jakarta Sans 11px weight 700
        border-radius 9999px, padding 3px 10px
        {hrQuestions[sessionQ]?.category}

      Question counter:
        Plus Jakarta Sans 11px #94A3B8
        "Question {sessionQ + 1} of {hrQuestions.length}"

    QUESTION TEXT:
      Syne 18px weight 700 #0F172A
      line-height 1.5, margin-bottom 12px
      {hrQuestions[sessionQ]?.question}

    HINT BOX:
      display flex, align-items center, gap 8px
      bg #F0FDF4, border 1px #86EFAC
      border-radius 8px, padding 10px 14px

      <img
        src="https://img.icons8.com/3d-fluency/100/light-on.png"
        width={16} height={16}
      />

      Plus Jakarta Sans 12px #16A34A font-style italic
      "Hint: {hrQuestions[sessionQ]?.hint}"

  ARIA RESPONSE (shows when phase === 'aria-response'):
    max-width 560px, margin 0 auto 16px, width 100%
    bg linear-gradient(135deg, #F0FDF4, white)
    border 1px #86EFAC, border-radius 16px
    padding 14px 18px
    display flex, gap 12px, align-items flex-start
    animation fadeUp 300ms ease-out

    <img
      src="https://i.ibb.co/8DT43N37/aria-avatar.png"
      width={28} height={28}
      style={{borderRadius:'50%', flexShrink:0}}
    />

    Content column:
      "Aria" Plus Jakarta Sans 11px weight 700 #16A34A, mb 2px
      Response: Plus Jakarta Sans 13px #475569 line-height 1.5
      {ariaResponses[sessionQ % ariaResponses.length]}

  ANSWER INPUT SECTION:
    max-width 560px, margin 0 auto, width 100%

    Label row (display flex, justify-content space-between, mb 6px):
      "YOUR ANSWER" Plus Jakarta Sans 11px uppercase #94A3B8
      "{sessionAnswer.length}/500" Plus Jakarta Sans 11px #94A3B8

    Textarea:
      width 100%, min-height 120px
      padding 14px 16px
      bg white, border 1.5px
      border-color: sessionPhase==='listening'
        ? '#16A34A' : '#E2E8F0'
      border-radius 14px
      font-family var(--font-body)
      font-size 14px, color #0F172A
      line-height 1.6, resize none
      outline none

      Focus:
        border-color #16A34A
        box-shadow 0 0 0 3px rgba(22,163,74,0.10)

      placeholder "Type your answer here..."

      onChange: (e) => setSessionAnswer(e.target.value)
      value: sessionAnswer

    TIPS ROW (margin-top 10px):
      "💡 Tips:" Plus Jakarta Sans 11px weight 600 #94A3B8
      mb 6px

      display flex, flex-wrap wrap, gap 6px
      {hrQuestions[sessionQ]?.tips.map((tip, i) => (
        <span style={{
          background:'#F8FAFF', border:'1px solid #E2E8F0',
          borderRadius:8, padding:'4px 10px',
          fontFamily:'var(--font-body)',
          fontSize:11, color:'#475569'
        }}>{tip}</span>
      ))}

    ACTION BUTTONS (display flex, gap 10px, margin-top 14px):

      Skip button (flex 0.5, height 44px):
        bg transparent, border 1.5px #E2E8F0
        color #94A3B8
        Plus Jakarta Sans 13px weight 600
        border-radius 12px, cursor pointer
        hover: bg #F8FAFF
        "Skip →"
        onClick: () => {
          if (sessionQ < hrQuestions.length - 1) {
            setSessionQ(prev => prev + 1);
            setSessionAnswer('');
            setSessionPhase('question');
          } else {
            setScreen('interview-complete');
          }
        }

      Submit button (flex 1.5, height 44px):
        bg linear-gradient(135deg, #16A34A, #15803D)
        color white, Syne 14px weight 700
        border none, border-radius 12px
        cursor pointer
        "Submit Answer →"
        onClick: () => {
          setSessionAnswers({
            ...sessionAnswers,
            [sessionQ]: sessionAnswer
          });
          setSessionPhase('aria-response');
          setTimeout(() => {
            if (sessionQ < hrQuestions.length - 1) {
              setSessionQ(prev => prev + 1);
              setSessionAnswer('');
              setSessionPhase('question');
            } else {
              setScreen('interview-complete');
              setTimeout(() =>
                showToast("Session complete! Great job 🎉"), 0);
            }
          }, 2000);
        }

RIGHT PANEL (280px wide, border-left 1px #E2E8F0):
  padding 20px 16px
  overflow-y auto
  background #FAFAFA
  flex-shrink 0

  ARIA INFO CARD (mb 16px):
    bg white, border 1px #E2E8F0
    border-radius 16px, padding 16px
    text-align center

    <img
      src="https://i.ibb.co/8DT43N37/aria-avatar.png"
      width={60} height={60}
      style={{
        borderRadius:'50%',
        border:'2px solid #86EFAC',
        display:'block', margin:'0 auto 8px',
        filter:'drop-shadow(0 4px 12px rgba(22,163,74,0.2))'
      }}
    />

    "Aria" Syne 16px weight 700 #0F172A
    "AI Interview Coach"
    Plus Jakarta Sans 12px #94A3B8, mt 2px

    Divider: height 1px, bg #E2E8F0, my 10px

    3 feature rows:
      Each (height 28px, display flex, gap 8px, align-items center):
        CheckCircle icon 14px #16A34A (lucide)
        Plus Jakarta Sans 12px #475569

      "Listens and adapts"
      "Gives real feedback"
      "Tracks your progress"

  SESSION PROGRESS CARD (mb 16px):
    bg white, border 1px #E2E8F0
    border-radius 16px, padding 14px 16px

    "Progress" Syne 13px weight 700 #0F172A, mb 10px

    Questions answered:
      display flex, justify-content space-between, mb 4px
      "Answered" Plus Jakarta Sans 12px #475569
      "{Object.keys(sessionAnswers).length}/{hrQuestions.length}"
      Plus Jakarta Sans 12px weight 600 #16A34A

    Progress bar:
      height 4px, bg #DCFCE7, radius 9999px, overflow hidden
      Fill: (Object.keys(sessionAnswers).length /
             hrQuestions.length * 100) + '%'
      bg #16A34A, transition width 400ms

    Time elapsed (mt 8px):
      Plus Jakarta Sans 12px #475569
      "⏱ {formatSessionTime(sessionTime)}"

  QUESTION MAP:
    "Questions" Plus Jakarta Sans 12px weight 600
    uppercase #94A3B8, mb 8px

    display grid, grid-template-columns repeat(4, 1fr)
    gap 6px

    {hrQuestions.map((q, i) => (
      <div
        onClick={() => setSessionQ(i)}
        style={{
          width: 36, height: 36,
          borderRadius: 8, cursor: 'pointer',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: 12, fontWeight: 700,
          border: '1.5px solid',
          transition: 'all 0.2s',
          background:
            i === sessionQ ? '#16A34A'
            : sessionAnswers[i] !== undefined ? '#DCFCE7'
            : sessionFlagged.includes(i) ? '#FEF3C7'
            : 'white',
          color:
            i === sessionQ ? 'white'
            : sessionAnswers[i] !== undefined ? '#16A34A'
            : sessionFlagged.includes(i) ? '#D97706'
            : '#64748B',
          borderColor:
            i === sessionQ ? '#16A34A'
            : sessionAnswers[i] !== undefined ? '#86EFAC'
            : sessionFlagged.includes(i) ? '#FCD34D'
            : '#E2E8F0'
        }}
      >
        {i + 1}
      </div>
    ))}

    LEGEND (mt 12px, display flex flex-col gap 6px):
      Each: display flex, align-items center, gap 8px
        Colored square 10px + label 11px #64748B

      #16A34A → "Current"
      #DCFCE7 → "Answered"
      #FEF3C7 → "Flagged"
      white → "Not answered"

=============================================================
PLACEHOLDER 2 — INTERVIEW COMPLETE
=============================================================

Replace 'interview-complete' placeholder with:

STRUCTURE:
  display flex, flex-direction column
  align-items center, justify-content center
  padding 40px 24px, text-align center
  height 100%, overflow-y auto
  background white

  INNER CONTAINER (max-width 520px, width 100%, margin 0 auto):

    ILLUSTRATION:
      <img
        src="https://i.ibb.co/WNN9RBHX/interview-session.png"
        height={150}
        style={{
          filter:'drop-shadow(0 12px 32px rgba(0,0,0,0.15))',
          animation:'float 3s ease-in-out infinite',
          display:'block', margin:'0 auto 16px'
        }}
      />

    SUCCESS CIRCLE (margin 0 auto 16px):
      width 64px, height 64px, border-radius 50%
      bg linear-gradient(135deg, #DCFCE7, #BBF7D0)
      border 2px solid #86EFAC
      display flex, align-items center, justify-content center
      box-shadow 0 0 0 12px rgba(22,163,74,0.08)
      animation scaleSpring 600ms ease-out
      CheckCircle icon 28px #16A34A (lucide)

    HEADING:
      "Great session, Rahul! 🎉"
      Syne 26px weight 800 #0F172A, mb 6px

    SUBHEADING:
      "You answered {Object.keys(sessionAnswers).length} questions
       with Aria in {formatSessionTime(sessionTime)}"
      Plus Jakarta Sans 14px #64748B
      line-height 1.6, mb 24px

    SCORE CARD:
      bg linear-gradient(135deg, #F0FDF4, white)
      border 1px #86EFAC, border-radius 20px
      padding 20px 24px, width 100%, mb 20px

      "Preliminary Score"
      Plus Jakarta Sans 11px uppercase #94A3B8, mb 12px

      Score row (display flex, align-items center,
                 justify-content center, gap 24px):

        "82%" Syne 52px weight 800 #16A34A

        Right stats column (text-align left):
          "✓ {Object.keys(sessionAnswers).length} Answered"
          Plus Jakarta Sans 12px #475569
          "⏱ {formatSessionTime(sessionTime)}"
          Plus Jakarta Sans 12px #475569
          "🎤 HR Interview"
          Plus Jakarta Sans 12px #475569
          gap 4px between each

      Progress bar (mt 12px):
        height 6px, bg #DCFCE7, radius 9999px, overflow hidden
        Fill: 82%, bg #16A34A

    ARIA QUICK FEEDBACK:
      bg white, border 1px #E2E8F0
      border-radius 16px, padding 16px 20px
      width 100%, mb 20px, text-align left

      Header row (display flex, align-items center, gap 10px, mb 8px):
        <img
          src="https://i.ibb.co/8DT43N37/aria-avatar.png"
          width={28} height={28}
          style={{borderRadius:'50%',
                  border:'2px solid #86EFAC'}}
        />
        "Aria says..." Plus Jakarta Sans 12px weight 600 #16A34A

      Feedback text:
        Plus Jakarta Sans 13px #475569
        line-height 1.6, font-style italic
        "Great communication today! You structured your answers
         well and showed confidence. Focus on adding specific
         metrics to your examples next time."

    XP ROW (display flex, align-items center,
             justify-content center, gap 8px, mb 20px):
      <img
        src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png"
        width={24} height={24}
        style={{filter:'drop-shadow(0 2px 6px rgba(217,119,6,0.3))'}}
      />
      "+75 XP Earned!" Syne 18px weight 800 #D97706

    BUTTONS (display flex, flex-direction column, gap 10px):

      "View Full Feedback →" (full width, height 52px):
        bg #16A34A, color white, Syne 15px weight 700
        border none, border-radius 12px, cursor pointer
        onClick: () => setScreen('interview-feedback')

      "Practice Again 🔄" (full width, height 44px):
        bg transparent, border 1.5px #86EFAC
        color #16A34A, Plus Jakarta Sans 14px weight 600
        border-radius 12px, cursor pointer
        onClick: () => {
          setSessionQ(0);
          setSessionAnswers({});
          setSessionPhase('question');
          setSessionTime(0);
          setSessionAnswer('');
          setScreen('interview-setup');
        }

      "Back to Dashboard" (full width, height 40px):
        bg transparent, border none
        color #94A3B8, Plus Jakarta Sans 13px
        cursor pointer
        onClick: () => setScreen('dashboard')

=============================================================
PLACEHOLDER 3 — INTERVIEW FEEDBACK
=============================================================

Replace 'interview-feedback' placeholder with:

SECTION HEADER (56px, flex-shrink 0):
  bg white, border-bottom 1px #E2E8F0
  padding 0 24px
  display flex, align-items center, gap 12px

  Back button:
    ChevronLeft icon 20px #475569 (lucide)
    cursor pointer
    onClick: () => setScreen('interview-complete')

  Column:
    "Session Feedback 📊" Syne 18px weight 700 #0F172A
    "HR Interview · Mar 18, 2025"
    Plus Jakarta Sans 12px #94A3B8

CONTENT (flex 1, overflow-y auto, padding 20px 24px):
  max-width 720px, margin 0 auto, width 100%

  SCORE ROW (display flex, gap 16px, mb 16px):

    LEFT SCORE CARD (flex 1):
      bg linear-gradient(135deg, #F0FDF4, white)
      border 1px #86EFAC, border-radius 20px
      padding 20px, text-align center

      CircularProgress value=82 size=100
        Use green #16A34A for stroke

      "Overall Score"
      Plus Jakarta Sans 11px uppercase #94A3B8, mt 8px

      Score badge (mt 8px):
        bg #DCFCE7, color #16A34A, border 1px #86EFAC
        Plus Jakarta Sans 12px weight 700
        border-radius 9999px, padding 4px 12px
        "Excellent 🌟"

    RIGHT STATS CARD (flex 1):
      bg white, border 1px #E2E8F0
      border-radius 20px, padding 20px

      display grid, grid-template-columns 1fr 1fr, gap 12px

      4 stat items (text-align center):
        Value: Syne 20px weight 800 #0F172A
        Label: Plus Jakarta Sans 10px uppercase #94A3B8

        "7" / "QUESTIONS"
        "18m" / "DURATION"
        "82%" / "SCORE"
        "3/7" / "FULL MARKS"

  STRENGTHS + IMPROVEMENTS (display grid 1fr 1fr, gap 12px, mb 16px):

    STRENGTHS CARD:
      bg white, border 1px #E2E8F0
      border-radius 20px, padding 20px

      Header (display flex, justify-content space-between, mb 12px):
        "💪 Strengths" Syne 15px weight 700 #0F172A
        Count badge: bg #DCFCE7 color #16A34A
          Plus Jakarta Sans 12px weight 700
          border-radius 9999px, padding 2px 10px
          "4"

      {sessionFeedback.strengths.map((s, i) => (
        <div style={{
          display:'flex', alignItems:'flex-start',
          gap:8, marginBottom:8
        }}>
          <div style={{
            width:18, height:18, borderRadius:'50%',
            background:'#DCFCE7', flexShrink:0,
            display:'flex', alignItems:'center',
            justifyContent:'center',
            fontSize:10, color:'#16A34A', fontWeight:700
          }}>✓</div>
          <span style={{
            fontFamily:'var(--font-body)',
            fontSize:13, color:'#475569',
            lineHeight:1.5
          }}>{s}</span>
        </div>
      ))}

    IMPROVEMENTS CARD:
      Same structure
      Header: "🎯 To Improve"
      Count badge: bg #FEF3C7 color #D97706

      Circle: bg #FEF3C7, color #D97706, text "!"

      {sessionFeedback.improvements.map((s, i) => (
        Same structure as strengths
      ))}

  QUESTION SCORES (mb 16px):
    "Question Scores 📝" Syne 16px weight 700, mb 12px

    {sessionFeedback.questionScores.map((item, i) => (
      <div style={{
        display:'flex', alignItems:'center', gap:12,
        padding:'10px 16px',
        background:'white', border:'1px solid #E2E8F0',
        borderRadius:12, marginBottom:8
      }}>
        Number circle (24px, bg #F0FDF4):
          Syne 12px weight 700 #16A34A
          "{i + 1}"

        Question text (flex 1):
          Plus Jakarta Sans 13px #475569
          overflow hidden, text-overflow ellipsis
          white-space nowrap
          "{item.q}"

        Score value:
          Syne 15px weight 800
          color: item.score>=80 ? '#16A34A'
                 : item.score>=70 ? '#D97706'
                 : '#DC2626'
          "{item.score}%"

        Mini bar (80px wide, 4px tall):
          bg #E2E8F0, border-radius 9999px
          overflow hidden
          Fill: width item.score%
            bg: same color as score

      </div>
    ))}

  ARIA DETAILED FEEDBACK:
    bg linear-gradient(135deg, #F0FDF4, white)
    border 1px #86EFAC, border-radius 20px
    padding 20px, mb 16px

    Header (display flex, align-items center, gap 10px, mb 14px):
      <img
        src="https://i.ibb.co/8DT43N37/aria-avatar.png"
        width={36} height={36}
        style={{borderRadius:'50%', border:'2px solid #86EFAC'}}
      />
      "Aria's Detailed Assessment"
      Syne 15px weight 700 #0F172A

    Paragraphs (Plus Jakarta Sans 14px #475569, line-height 1.7):

      Para 1:
        "Your communication style was clear and professional
         throughout the session. You demonstrated good
         self-awareness when discussing your strengths
         and weaknesses."

      Para 2 (mt 10px):
        "To improve your score further, focus on quantifying
         your achievements with specific numbers and metrics.
         For example, instead of 'I improved the process',
         say 'I reduced processing time by 30%.'"

      Para 3 (mt 10px):
        "Your answer to the behavioral question was particularly
         strong — you followed the STAR format naturally. Keep
         practicing this structure for all situation-based
         questions."

  NEXT STEPS (mb 16px):
    "Recommended Next Steps 🚀" Syne 15px weight 700, mb 12px

    3 step cards:
      Each (bg white, border 1px #E2E8F0,
            border-radius 14px, padding 14px 16px,
            display flex, align-items center, gap 12px,
            mb 8px, cursor pointer):

        hover: border #86EFAC, bg #F0FDF4

        Number circle (32px, bg #F0FDF4):
          Syne 14px weight 700 #16A34A

        Content:
          Title: Plus Jakarta Sans 14px weight 600 #0F172A
          Subtitle: Plus Jakarta Sans 12px #94A3B8, mt 1px

        ChevronRight 16px #94A3B8

      Step 1: "Practice STAR format answers"
              "Take another HR Interview session"
              onClick: () => setScreen('interview-setup')

      Step 2: "Build quantifiable resume points"
              "Update your Resume Builder"
              onClick: () => setScreen('resume')

      Step 3: "Try Technical Interview next"
              "Test your coding knowledge with Aria"
              onClick: () => setScreen('interview-setup')

  ACTION BUTTONS ROW (display flex, gap 10px):
    "Practice Again 🔄" (flex 1, h48):
      bg #16A34A, color white, border none
      Syne 14px weight 700, border-radius 12px
      onClick: () => setScreen('interview-setup')

    "Download Report 📄" (flex 1, h48):
      bg transparent, border 1.5px #86EFAC
      color #16A34A, Plus Jakarta Sans 14px weight 600
      border-radius 12px
      onClick: () => setTimeout(() =>
        showToast("Report downloaded! 📄"), 0)

    "Share 🔗" (flex 0.7, h48):
      bg transparent, border 1.5px #E2E8F0
      color #64748B, Plus Jakarta Sans 13px
      border-radius 12px
      onClick: () => setTimeout(() =>
        showToast("Link copied! 🔗"), 0)

=============================================================
PLACEHOLDER 4 — RESUME EDITOR (SPLIT SCREEN)
=============================================================

Replace 'resume-editor' placeholder with:

Add editor state if not present:
  const [activeSection, setActiveSection] = useState('personal');
  const [resumePersonal, setResumePersonal] = useState(resumeData.personalInfo);
  const [resumeSkills, setResumeSkills] = useState(resumeData.skills.map(s => s.name));
  const [skillInput, setSkillInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [resumeSummary, setResumeSummary] = useState(resumeData.summary);
  const [selectedTemplateId, setSelectedTemplateId] = useState('classic');
  const activeTemplate = resumeTemplates.find(t => t.id === selectedTemplateId) || resumeTemplates[0];

STRUCTURE (display flex, flex-direction column, height 100%, overflow hidden):

── EDITOR HEADER BAR (56px, flex-shrink 0) ──────────────────

bg white, border-bottom 1px #E2E8F0
padding 0 24px
display flex, align-items center, gap 12px

Back button:
  ChevronLeft 20px #475569 (lucide)
  onClick: () => setScreen('resume-method')

"Resume Editor ✏️" Syne 16px weight 700 #0F172A

Strength bar (flex 1, max-width 200px):
  "Strength: 68%" Plus Jakarta Sans 10px #94A3B8, mb 2px
  Progress bar: h4px, track #F5BFBF, fill #BD1313 at 68%

RIGHT buttons (margin-left auto, display flex, gap 8px):
  "Save" button (h36 w80):
    bg transparent, border 1.5px #F5BFBF, color #BD1313
    Plus Jakarta Sans 13px weight 600, radius 8px
    onClick: () => setTimeout(() =>
      showToast("Resume saved ✓"), 0)

  "Preview →" button (h36 w100):
    bg #BD1313, color white
    Plus Jakarta Sans 13px weight 600
    border none, radius 8px
    onClick: () => setScreen('resume-complete')

── SPLIT CONTENT (flex 1, display grid, overflow hidden) ─────

grid-template-columns: 45% 55%
height: 100%
overflow: hidden

LEFT PANEL (border-right 1px #E2E8F0, display flex flex-col):

  SECTION TABS (48px, flex-shrink 0):
    bg #FAFAFA, border-bottom 1px #E2E8F0
    display flex, overflow-x auto, padding 0 16px
    gap 0, scrollbar-width none

    Tabs: ['personal','education','experience',
           'skills','projects','summary']

    Each tab (height 48px, padding 0 14px):
      Plus Jakarta Sans 13px weight 500
      white-space nowrap, cursor pointer
      border-bottom 2px transparent
      display flex, align-items center

      Active: color #BD1313, border-bottom #BD1313
      Inactive: color #94A3B8
      onClick: () => setActiveSection(tab)

  FORM CONTENT (flex 1, overflow-y auto, padding 20px):
    scrollbar-width thin
    scrollbar-color #F5BFBF transparent

    PERSONAL INFO (activeSection === 'personal'):
      display grid, grid-template-columns 1fr 1fr, gap 12px

      Each field:
        Label: Plus Jakarta Sans 10px uppercase #94A3B8, mb 4px
        Input: h44, bg white, border 1.5px #E2E8F0, radius 8px
          padding 0 12px, font-body 14px #0F172A
          Focus: border #BD1313, shadow brand glow

      Fields:
        "FULL NAME" / value resumePersonal.fullName
        "PROFESSIONAL TITLE" / value resumePersonal.title
        "EMAIL ADDRESS" / value resumePersonal.email
        "PHONE NUMBER" / value resumePersonal.phone
        "LINKEDIN URL" / value resumePersonal.linkedin
        "PORTFOLIO URL" / placeholder "Optional"
        "CITY / LOCATION" col-span 2 / value resumePersonal.city

    EDUCATION (activeSection === 'education'):
      {resumeData.education.map((entry, i) => (
        Entry card (bg #FAFAFA, border 1px #E2E8F0,
                    radius 12px, padding 14px, mb 10px):

          2-column grid, gap 10px:
            "DEGREE / PROGRAM" / value entry.degree
            "INSTITUTION" / value entry.institution
            "YEAR OF GRADUATION" / value entry.year
            "CGPA / GRADE" / value entry.grade
            "LOCATION" col-span 2 / value entry.location
      ))}

      ADD BUTTON (full width, h44, dashed):
        border 2px dashed #F5BFBF, bg #FFF8F8
        color #BD1313, Plus Jakarta Sans 13px weight 600
        border-radius 12px, cursor pointer
        "+ Add Education"

    EXPERIENCE (activeSection === 'experience'):
      Same pattern as education
      Fields: Job Title, Company, Start Date,
              End Date, Description textarea

    SKILLS (activeSection === 'skills'):
      "Your Skills" Syne 15px weight 700, mb 4px
      "Add skills relevant to your target role"
      Plus Jakarta Sans 12px #94A3B8, mb 12px

      TAG INPUT (h44, full width):
        border 1.5px #E2E8F0, radius 8px
        padding 0 12px, font-body 14px
        placeholder "Type a skill and press Enter..."
        onKeyDown: if Enter key:
          setResumeSkills([...resumeSkills, skillInput])
          setSkillInput('')
        Focus: border #BD1313

      SKILLS CHIPS (flex-wrap, gap 8px, mt 10px):
        {resumeSkills.map((skill, i) => (
          <div style={{
            display:'flex', alignItems:'center', gap:6,
            background:'#FDF2F2', border:'1px solid #F5BFBF',
            borderRadius:9999, padding:'4px 10px',
            fontFamily:'var(--font-body)',
            fontSize:12, fontWeight:600, color:'#BD1313'
          }}>
            {skill}
            <span
              onClick={() => setResumeSkills(
                resumeSkills.filter((_, j) => j !== i))}
              style={{cursor:'pointer', fontSize:14,
                      lineHeight:1, color:'#BD1313'}}>
              ×
            </span>
          </div>
        ))}

      SUGGESTED SKILLS (mt 16px):
        "Suggested for your profile:"
        Plus Jakarta Sans 11px #94A3B8, mb 8px

        display flex, overflow-x auto, gap 8px
        scrollbar-width none, pb 4px

        {suggestedSkills.filter(s =>
          !resumeSkills.includes(s)).slice(0,10)
          .map(skill => (
          <div
            onClick={() =>
              setResumeSkills([...resumeSkills, skill])}
            style={{
              flexShrink:0,
              background:'#F1F5F9', border:'1px solid #E2E8F0',
              borderRadius:9999, padding:'4px 12px',
              fontFamily:'var(--font-body)',
              fontSize:11, fontWeight:600, color:'#475569',
              cursor:'pointer', whiteSpace:'nowrap'
            }}>
            {skill}
          </div>
        ))}

    PROJECTS (activeSection === 'projects'):
      {resumeData.projects.map((entry, i) => (
        Entry card same style as education:
          "PROJECT NAME" / value entry.name
          Tech chips + add field
          "DESCRIPTION" textarea / value entry.description
          "GITHUB / PROJECT URL" / value entry.link
      ))}

    SUMMARY (activeSection === 'summary'):
      "Professional Summary" Syne 15px weight 700, mb 4px
      "A powerful 3-4 line intro about yourself"
      Plus Jakarta Sans 12px #94A3B8, mb 12px

      Textarea (min-height 120px):
        value resumeSummary
        onChange: (e) => setResumeSummary(e.target.value)
        border 1.5px #E2E8F0, radius 12px
        padding 14px, font-body 14px, line-height 1.6
        resize none, focus: border #BD1313

      Character counter: text-align right
        Plus Jakarta Sans 11px #94A3B8
        "{resumeSummary.length}/400"

      AI GENERATE BUTTON (full width, h48, mt 12px):
        bg #FDF2F2, border 1px #F5BFBF, color #BD1313
        border-radius 12px, cursor pointer
        display flex, align-items center
        justify-content center, gap 8px

        <img src="https://img.icons8.com/3d-fluency/100/star.png"
             width={18} height={18}/>

        {generating ? "Generating..." :
         generated ? "✨ Regenerate" : "✨ Generate with AI"}

        onClick: () => {
          setGenerating(true);
          setTimeout(() => {
            setGenerating(false);
            setGenerated(true);
            setResumeSummary(resumeData.summary);
            setTimeout(() =>
              showToast("AI summary generated! ✓"), 0);
          }, 1500);
        }

RIGHT PANEL (overflow-y auto, bg #F8FAFF):

  PREVIEW WRAPPER (margin 16px, padding 28px, bg white,
                   border 1px #E2E8F0, border-radius 16px,
                   min-height calc(100% - 32px),
                   box-shadow 0 4px 16px rgba(0,0,0,0.06)):

    RESUME HEADER:
      bg {activeTemplate.headerColor}
      margin -28px -28px 20px
      padding 20px 28px
      border-radius 16px 16px 0 0

      Name: Syne 22px weight 800 white
        {resumePersonal.fullName}

      Title: Plus Jakarta Sans 14px rgba(255,255,255,0.85)
        {resumePersonal.title}

      Contact row (mt 8px, display flex, gap 16px, flex-wrap wrap):
        "📧 {resumePersonal.email}"
        "📱 {resumePersonal.phone}"
        "📍 {resumePersonal.city}"
        Each: Plus Jakarta Sans 11px rgba(255,255,255,0.75)

    SECTION HELPER (reusable):
      Section title style:
        Plus Jakarta Sans 11px weight 700
        color {activeTemplate.accent}
        UPPERCASE, letter-spacing 1px
        border-bottom 1.5px {activeTemplate.accent} at 30% opacity
        pb 4px, mb 8px

    SUMMARY SECTION:
      "SUMMARY" header
      Plus Jakarta Sans 13px #475569
      line-height 1.6
      {resumeSummary}

    EXPERIENCE SECTION:
      "EXPERIENCE" header
      {resumeData.experience.map(entry => (
        Role: Plus Jakarta Sans 14px weight 600 #0F172A
        Company + dates: 12px #64748B, mt 2px
        Description: 12px #475569, mt 6px, line-height 1.5
      ))}

    EDUCATION SECTION:
      "EDUCATION" header
      {resumeData.education.map(entry => (
        Degree: 14px weight 600 #0F172A
        Institution + year + grade: 12px #64748B
      ))}

    SKILLS SECTION:
      "SKILLS" header
      display flex, flex-wrap wrap, gap 6px
      {resumeSkills.map(skill => (
        <span style={{
          background:'#FDF2F2', border:'1px solid #F5BFBF',
          color:'#BD1313', borderRadius:9999,
          padding:'3px 10px', fontSize:11, fontWeight:600,
          fontFamily:'var(--font-body)'
        }}>{skill}</span>
      ))}

    PROJECTS SECTION:
      "PROJECTS" header
      {resumeData.projects.map(entry => (
        Name: 14px weight 600 #0F172A
        Tech chips: small neutral chips
        Description: 12px #475569, mt 4px
        Link: 11px #BD1313
      ))}

=============================================================
PLACEHOLDER 5 — RESUME COMPLETE
=============================================================

Replace 'resume-complete' placeholder with:

SECTION HEADER (56px, flex-shrink 0):
  bg white, border-bottom 1px #E2E8F0
  padding 0 24px
  display flex, align-items center, gap 12px

  Back: ChevronLeft → setScreen('resume-editor')
  "Resume Preview 📄" Syne 18px weight 700
  "Strength: 68%" primary badge right

CONTENT (flex 1, overflow hidden, padding 16px 24px):
  display grid, grid-template-columns 60% 40%
  gap 16px, height 100%

LEFT: RESUME PREVIEW PANEL
  bg white, border 1px #E2E8F0
  border-radius 20px, overflow-y auto
  padding 28px
  box-shadow 0 4px 16px rgba(0,0,0,0.06)

  Full resume rendered same as editor right panel
  But taller, more complete view
  Use resumeData and activeTemplate for rendering

RIGHT: AI SUGGESTIONS PANEL
  display flex, flex-direction column, gap 12px

  SUGGESTIONS CARD (flex 1, overflow hidden):
    bg white, border 1px #E2E8F0
    border-radius 20px, padding 20px

    HEADER ROW:
      "AI Suggestions ✨" Syne 15px weight 700
      "68%" badge: bg #FDF2F2 color #BD1313 border #F5BFBF
        Plus Jakarta Sans 14px weight 700
        border-radius 9999px, padding 3px 12px

    STRENGTH METER (mt 12px):
      "Resume Strength — 68%"
      Plus Jakarta Sans 11px uppercase #94A3B8, mb 6px
      Progress bar: h6px, track #F5BFBF, fill #BD1313 at 68%

    SUGGESTIONS LIST (inner scroll, mt 12px, max-height 200px):
      overflow-y auto
      {aiSuggestions.map((item, i) => (
        <div style={{
          display:'flex', gap:10, alignItems:'flex-start',
          padding:'10px 0',
          borderBottom:'1px solid #F8FAFF'
        }}>
          <span style={{fontSize:16, flexShrink:0}}>
            {item.icon}
          </span>
          <div style={{flex:1}}>
            <div style={{
              fontFamily:'var(--font-body)',
              fontSize:13, fontWeight:600,
              color: item.type==='good' ? '#16A34A' : '#0F172A'
            }}>{item.title}</div>
            <div style={{
              fontFamily:'var(--font-body)',
              fontSize:12, color:'#94A3B8', marginTop:2
            }}>{item.detail}</div>
          </div>
          {item.type !== 'good' && (
            <span style={{
              fontFamily:'var(--font-body)',
              fontSize:11, fontWeight:600,
              color:'#BD1313', cursor:'pointer',
              flexShrink:0
            }}>Fix →</span>
          )}
        </div>
      ))}

  SECTION BARS CARD:
    bg white, border 1px #E2E8F0
    border-radius 20px, padding 16px 20px

    "Sections" Syne 14px weight 700, mb 10px

    {resumeSections.map((s, i) => (
      <div style={{marginBottom:8}}>
        <div style={{
          display:'flex', justifyContent:'space-between',
          marginBottom:3
        }}>
          <span style={{
            fontFamily:'var(--font-body)',
            fontSize:11, color:'#475569'
          }}>{s.label}</span>
          <span style={{
            fontFamily:'var(--font-body)',
            fontSize:11, fontWeight:600,
            color: s.value===100 ? '#16A34A'
                   : s.value>0 ? '#BD1313' : '#DC2626'
          }}>{s.value}%</span>
        </div>
        <div style={{
          height:4, background:'#F5BFBF',
          borderRadius:9999, overflow:'hidden'
        }}>
          <div style={{
            height:'100%', borderRadius:9999,
            width: s.value + '%',
            background: s.value===100 ? '#16A34A'
                        : s.value>0 ? '#BD1313' : '#F5BFBF',
            transition:'width 0.8s ease-out'
          }}/>
        </div>
      </div>
    ))}

  DOWNLOAD BUTTONS ROW (display grid, grid-template-columns 1fr 1fr 1fr, gap 8px):
    "⬇ Download PDF" (h40):
      bg #BD1313, color white, border none
      Plus Jakarta Sans 13px weight 600, radius 8px
      cursor pointer
      onClick: () => setTimeout(() =>
        showToast("Resume downloaded! 📄"), 0)

    "✏ Edit" (h40):
      bg transparent, border 1.5px #F5BFBF, color #BD1313
      Plus Jakarta Sans 13px weight 600, radius 8px
      onClick: () => setScreen('resume-editor')

    "🔗 Share" (h40):
      bg transparent, border 1.5px #E2E8F0, color #64748B
      Plus Jakarta Sans 13px weight 600, radius 8px
      onClick: () => setTimeout(() =>
        showToast("Link copied! 🔗"), 0)

=============================================================
NAVIGATION CONNECTIONS
=============================================================

Make sure these all work:

interview-session → End Session → interview-complete
interview-session → last question answered → interview-complete
interview-complete → View Full Feedback → interview-feedback
interview-complete → Practice Again → interview-setup (reset state)
interview-complete → Back to Dashboard → dashboard
interview-feedback → back arrow → interview-complete
interview-feedback → Practice Again → interview-setup
interview-feedback → Update Resume → resume

resume-editor → back arrow → resume-method
resume-editor → Preview → resume-complete
resume-editor → Save → stays on editor + toast
resume-complete → back arrow → resume-editor
resume-complete → Edit → resume-editor
resume-complete → Download → toast

=============================================================
TOAST TRIGGERS
=============================================================

interview-session answer submit:
  No toast (keep focus clean)

interview-session end:
  setTimeout(() => showToast("Session complete! Great job 🎉"), 0)

interview-complete → view feedback:
  setTimeout(() => showToast("Loading your feedback... 📊"), 0)

resume-editor save:
  setTimeout(() => showToast("Resume saved ✓"), 0)

resume-editor AI generate:
  setTimeout(() => showToast("AI summary generated! ✓"), 0)

resume-complete download:
  setTimeout(() => showToast("Resume downloading... 📄"), 0)

resume-complete share:
  setTimeout(() => showToast("Link copied! 🔗"), 0)

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Wrap ALL showToast calls in setTimeout(..., 0)
   to prevent setState during render errors

✅ Interview session timer counts UP not down

✅ Aria avatar uses URL:
   https://i.ibb.co/8DT43N37/aria-avatar.png

✅ Resume editor is SPLIT SCREEN (45% left, 55% right)

✅ Live preview on right updates as user edits

✅ Section tabs switch form content smoothly

✅ Skills tag input adds on Enter key press

✅ AI generate button simulates loading 1.5s then fills

✅ All illustrations use exact imgbb CDN URLs

✅ All Icons8 3D Fluency URLs correct

✅ Module colors:
   Interview: #16A34A
   Resume: #BD1313

✅ No full page scroll on any screen

✅ Device frame maintained throughout

✅ Primary fonts: Syne + Plus Jakarta Sans

=============================================================
BUILD ORDER
=============================================================

1. Add missing mock data if not present
2. Add interview session state variables
3. Replace interview-session placeholder
4. Replace interview-complete placeholder
5. Replace interview-feedback placeholder
6. Add resume editor state variables
7. Replace resume-editor placeholder
8. Replace resume-complete placeholder
9. Verify all navigation connections
10. Add all toast triggers with setTimeout
11. Test all screen transitions

DO NOT rebuild any existing screens.
DO NOT change any working code.
ONLY replace the 5 placeholder screens.
=============================================================