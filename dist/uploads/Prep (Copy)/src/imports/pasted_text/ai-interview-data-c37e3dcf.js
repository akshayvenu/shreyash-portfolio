Continue building EduVision.
Read system guidelines fully before writing any code.
Do NOT rebuild any existing screens.
Only ADD AI Interview screens.
All existing screens must remain intact.

=============================================================
STEP 6 — AI INTERVIEW MODULE
=============================================================

Build the complete AI Interview module.
5 screens total.

Module color identity: #16A34A / #F0FDF4
All headers use soft green gradient background.
AI Interviewer character name: "Aria"

Update navigation:
  sidebar Mic icon → setScreen('interview')
  dashboard "AI Interview" card → setScreen('interview')
  'interview' → setup → 'interview-setup'
  'interview-setup' → start → 'interview-session'
  'interview-session' → end → 'interview-complete'
  'interview-complete' → feedback → 'interview-feedback'
  'interview-feedback' → back → 'interview'
  'interview-complete' → back → 'interview'

=============================================================
INTERVIEW MOCK DATA — ADD TO TOP OF FILE
=============================================================

const interviewTypes = [
  {id:'hr', name:'HR Interview',
   icon:'https://img.icons8.com/3d-fluency/100/conference-call.png',
   color:'#16A34A', bg:'#F0FDF4',
   description:'Behavioral & personality questions',
   duration:'15-20 min', popular:true},
  {id:'technical', name:'Technical Interview',
   icon:'https://img.icons8.com/3d-fluency/100/source-code.png',
   color:'#2563EB', bg:'#EFF6FF',
   description:'DSA, system design & coding concepts',
   duration:'20-30 min', popular:false},
  {id:'managerial', name:'Managerial Round',
   icon:'https://img.icons8.com/3d-fluency/100/businessman.png',
   color:'#7C3AED', bg:'#FAF5FF',
   description:'Leadership & decision making',
   duration:'15-20 min', popular:false},
  {id:'resume', name:'Resume Walkthrough',
   icon:'https://img.icons8.com/3d-fluency/100/resume.png',
   color:'#BD1313', bg:'#FFF1F2',
   description:'Walk through your resume with AI',
   duration:'10-15 min', popular:false}
];

const interviewHistory = [
  {id:'i1', type:'HR Interview',
   date:'Mar 16', duration:'18 min',
   score:82, questions:8,
   feedback:'Good communication, improve STAR format',
   status:'completed'},
  {id:'i2', type:'Technical Interview',
   date:'Mar 14', duration:'24 min',
   score:68, questions:10,
   feedback:'Needs improvement on system design',
   status:'completed'},
  {id:'i3', type:'HR Interview',
   date:'Mar 10', duration:'15 min',
   score:75, questions:7,
   feedback:'Confident delivery, good answers',
   status:'completed'}
];

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

=============================================================
SCREEN 1 — AI INTERVIEW HOME
=============================================================

screen: 'interview'
animation: screenEnter 280ms ease-out both

Active sidebar: Mic → #16A34A

SECTION HEADER (56px, flex-shrink 0):
  background white, border-bottom 1px #E2E8F0
  padding 0 24px
  display flex, align-items center
  justify-content space-between

  LEFT (display flex, align-items center, gap 12px):
    Icon circle (36px, bg #F0FDF4, radius 10px):
      <img src="https://img.icons8.com/3d-fluency/100/microphone.png"
           width="22" height="22"
           style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>

    Column:
      "AI Interview 🎤" Syne 20px weight 700 #0F172A
      "Practice with Aria — your AI interviewer"
      Plus Jakarta Sans 12px #94A3B8

  RIGHT:
    "3 Sessions" neutral chip
    "82% Avg" success chip (#16A34A)

CONTENT (flex 1, overflow-y auto, padding 20px 24px):
  display flex, flex-direction column, gap 16px

── ARIA HERO CARD ───────────────────────────────────────────

background: linear-gradient(135deg, #16A34A, #15803D)
border-radius: 20px
padding: 24px
display: flex
align-items: center
gap: 24px
position: relative
overflow: hidden
cursor: pointer
transition: all 0.3s

hover: translateY(-3px)
       shadow 0 12px 32px rgba(22,163,74,0.35)

Noise texture overlay:
  position absolute, inset 0, pointer-events none
  background-image url(https://i.ibb.co/XZDscnRB/card-noise.png)
  background-repeat repeat
  background-size 200px 200px
  opacity 0.4, border-radius inherit

Background circles:
  Circle 1: position absolute, top -20px, right -20px
    width 120px, height 120px, border-radius 50%
    bg rgba(255,255,255,0.06)
  Circle 2: position absolute, bottom -15px, left -15px
    width 80px, height 80px, border-radius 50%
    bg rgba(255,255,255,0.04)

LEFT: Aria avatar (position relative, z-index 1):
  <img src="https://i.ibb.co/8DT43N37/aria-avatar.png"
       width="80" height="80"
       style={{
         filter:'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',
         animation:'float 3s ease-in-out infinite',
         borderRadius:'50%',
         border:'3px solid rgba(255,255,255,0.3)'
       }}/>

  Online indicator (absolute bottom-right of avatar):
    width 14px, height 14px, border-radius 50%
    bg #86EFAC, border 2px white
    animation pulse 2s infinite

CENTER (flex 1, position relative, z-index 1):
  "Meet Aria 🤖" font-body 11px weight 600
    rgba(255,255,255,0.7), uppercase, letter-spacing 0.8px
    mb 4px

  "Your AI Interview Coach" Syne 22px weight 800 white
  mb 6px

  "Aria will ask you real interview questions, listen to
   your answers, and give you detailed feedback."
  font-body 13px rgba(255,255,255,0.75), line-height 1.5
  mb 12px

  3 feature pills (flex-wrap, gap 8px):
    Each: bg rgba(255,255,255,0.15)
          border rgba(255,255,255,0.2)
          color white, font-body 11px weight 600
          radius 9999px, padding 4px 12px

    "🎯 Real Questions"
    "💬 Live Feedback"
    "📊 Performance Score"

RIGHT (position relative, z-index 1):
  "Start Practice →" button:
    bg white, color #16A34A
    Syne 14px weight 700
    border-radius 12px, border none
    padding 10px 20px
    shadow 0 4px 12px rgba(0,0,0,0.15)
    cursor pointer
    hover: shadow increase, translateY(-1px)
    onClick: setScreen('interview-setup')

── STATS ROW ────────────────────────────────────────────────

display grid, grid-template-columns repeat(4, 1fr)
gap 12px

4 STAT CARDS (height 80px):
  Same pattern as Test stats

  Card 1: Sessions: "3"
    accent #16A34A, bg #F0FDF4
    icon: https://img.icons8.com/3d-fluency/100/microphone.png

  Card 2: Avg Score: "75%"
    accent #D97706, bg #FFFBEB
    icon: https://img.icons8.com/3d-fluency/100/goal.png

  Card 3: Questions: "23"
    accent #2563EB, bg #EFF6FF
    icon: https://img.icons8.com/3d-fluency/100/chat.png

  Card 4: Best Score: "82%"
    accent #BD1313, bg #FFF1F2
    icon: https://img.icons8.com/3d-fluency/100/trophy.png

── INTERVIEW TYPES ──────────────────────────────────────────

HEADER ROW:
  "Choose Interview Type 🎯" Syne 16px weight 700
  "All types →" ghost link #16A34A right

display grid, grid-template-columns repeat(2, 1fr)
gap 12px, margin-top 8px

4 TYPE CARDS (from interviewTypes, height 100px):

Each CARD:
  bg white, border 1.5px #E2E8F0
  border-radius 16px, padding 16px
  cursor pointer, transition all 0.2s
  display flex, align-items center, gap 14px
  position relative

  hover: border-color type.color
         translateY(-2px)
         shadow 0 6px 20px rgba(0,0,0,0.08)

  If popular:
    "Popular" badge (absolute top-right):
      bg #FEF3C7, color #D97706, border #FCD34D
      font-body 10px weight 700, radius 9999px
      padding 2px 8px
      position absolute, top 8px, right 8px

  LEFT: icon circle (44px, border-radius 12px):
    background type.bg
    <img src={type.icon} width="26" height="26"
         style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>

  RIGHT:
    Type name: font-body 14px weight 700 #0F172A
    
    Row (gap 8px, mt 4px):
      Duration chip: neutral style, 10px
      Description: font-body 11px #94A3B8, mt 2px

  onClick: setScreen('interview-setup')
           with pre-selected type

── PAST SESSIONS ────────────────────────────────────────────

HEADER ROW:
  "Past Sessions 📋" Syne 16px weight 700
  "View all →" ghost link #16A34A right

3 SESSION ROWS (from interviewHistory):

Each ROW (height 72px):
  bg white, border 1px #E2E8F0
  border-radius 14px, padding 12px 16px
  display flex, align-items center, gap 12px
  cursor pointer, transition all 0.2s
  margin-bottom 8px

  hover: border #86EFAC, bg #F0FDF4

  LEFT: score circle (44px):
    border 2px solid:
      >=75: #16A34A
      else: #D97706
    border-radius 50%
    display flex, align-items center
    justify-content center
    Syne 14px weight 800
    color: same as border

  CENTER (flex 1):
    Type: font-body 14px weight 600 #0F172A
    Row: date + duration + questions
      font-body 11px #94A3B8
    Feedback snippet: font-body 11px #64748B
      italic, margin-top 2px
      text-overflow ellipsis, 1 line

  RIGHT:
    ChevronRight 16px #94A3B8

  onClick: setScreen('interview-feedback')

=============================================================
SCREEN 2 — INTERVIEW SETUP
=============================================================

screen: 'interview-setup'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  Back → setScreen('interview')
  "Setup Interview 🎤" Syne 18px weight 700
  "Configure your practice session" muted

CONTENT (flex 1, overflow-y auto, padding 20px 24px):
  max-width 640px, margin 0 auto, width 100%
  display flex, flex-direction column, gap 20px

  const [setupConfig, setSetupConfig] = useState({
    type: 'hr',
    role: 'Software Engineer',
    experience: 'fresher',
    questionCount: 8,
    focus: []
  });

── INTERVIEW TYPE SELECTOR ───────────────────────────────────

Label: "INTERVIEW TYPE" 11px uppercase #94A3B8, mb 8px

display grid, grid-template-columns repeat(2, 1fr)
gap 8px

4 type chips (from interviewTypes):
  Each (height 56px):
    bg white, border 1.5px #E2E8F0
    border-radius 12px, padding 8px 14px
    display flex, align-items center, gap 10px
    cursor pointer, transition all 0.2s

    Icon (22px, in colored circle 32px) + name 13px weight 600

    SELECTED: border 2px #16A34A, bg #F0FDF4

  onClick: setSetupConfig({...setupConfig, type: id})

── TARGET ROLE ──────────────────────────────────────────────

Label: "TARGET ROLE" 11px uppercase #94A3B8, mb 8px

Input (height 48px):
  value "Software Engineer"
  Left icon: Briefcase (lucide) 18px #94A3B8
  Suggestions dropdown on focus:
    Same style as resume college suggestions
    ['Software Engineer','Data Analyst',
     'Product Manager','UI/UX Designer',
     'Business Analyst','Marketing Manager']

── EXPERIENCE LEVEL ─────────────────────────────────────────

Label: "EXPERIENCE LEVEL" 11px uppercase #94A3B8, mb 8px

3 option cards (horizontal, gap 8px):
  Each (height 56px, flex 1):
    bg white, border 1.5px #E2E8F0
    border-radius 12px, padding 8px 16px
    text-align center, cursor pointer

    Emoji (20px) + label (13px weight 600)

    SELECTED: border 2px #16A34A, bg #F0FDF4

  "🌱 Fresher" | "📈 1-2 Years" | "💼 3+ Years"

── QUESTION COUNT ────────────────────────────────────────────

Label: "NUMBER OF QUESTIONS" 11px uppercase #94A3B8, mb 8px

Pills: [5] [8] [10] [12] [15]
  Selected: bg #16A34A, color white
  Unselected: bg #F1F5F9, color #475569
  40px × 40px, radius 10px

── FOCUS AREAS ──────────────────────────────────────────────

Label: "FOCUS AREAS" 11px uppercase #94A3B8
       + "Optional" neutral chip right
       mb 8px

Toggleable chips (flex-wrap, gap 8px):
  ['Introduction','Behavioral','Technical',
   'Career Goals','Company Fit','Problem Solving',
   'Leadership','Communication']

  Each chip (height 36px, padding 0 14px):
    radius 9999px, font-body 12px weight 600
    cursor pointer, transition all 0.2s
    
    Unselected: bg #F1F5F9, color #475569
    Selected: bg #F0FDF4, border #86EFAC, color #16A34A

  onClick: toggle in setupConfig.focus array

── SESSION PREVIEW CARD ─────────────────────────────────────

bg linear-gradient(135deg, #F0FDF4, white)
border 1px #86EFAC, border-radius 16px
padding 16px 20px

HEADER ROW:
  Aria small avatar (32px, circular):
    <img src="https://i.ibb.co/8DT43N37/aria-avatar.png"
         width="32" height="32"
         style={{borderRadius:'50%',
                 filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'}}/>
  "Aria is ready! 🎯" font-body 13px weight 600 #16A34A

Session details (margin-top 10px):
  display grid, grid-template-columns 1fr 1fr, gap 8px

  4 detail rows:
    Label 10px #94A3B8 + value 13px weight 600 #0F172A

    Type: HR Interview
    Role: Software Engineer
    Questions: 8
    Est. Duration: ~18 minutes

── START BUTTON ─────────────────────────────────────────────

Full width, height 56px
bg linear-gradient(135deg, #16A34A, #15803D)
border-radius 16px, border none
Syne 18px weight 700 white
cursor pointer
shadow 0 8px 24px rgba(22,163,74,0.35)
margin-top 8px
transition all 0.3s

hover: translateY(-2px), shadow increase

Content row:
  <img src="https://i.ibb.co/8DT43N37/aria-avatar.png"
       width="28" height="28"
       style={{borderRadius:'50%',
               filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.2))'}}/>
  "Start Interview with Aria"

onClick:
  setScreen('interview-session')
  showToast("Interview starting — take a breath! 🌿")
  showXPToast("+75 XP 🎉")

=============================================================
SCREEN 3 — INTERVIEW SESSION
=============================================================

screen: 'interview-session'
animation: screenEnter 280ms ease-out both

Full screen focus mode.
Clean, minimal, no distractions.
This is the most important emotional screen.

const [sessionState, setSessionState] = useState({
  currentQ: 0,
  phase: 'question',
  // 'question' | 'listening' | 'aria-response'
  userAnswer: '',
  answers: [],
  sessionTime: 0,
  ariaMessage: ''
});

Timer (session duration counter):
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionState(prev => ({
        ...prev,
        sessionTime: prev.sessionTime + 1
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

const formatSessionTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2,'0')}`;
};

── SESSION TOP BAR (56px) ───────────────────────────────────

bg white, border-bottom 1px #E2E8F0
padding 0 24px, flex-shrink 0
display flex, align-items center
justify-content space-between

LEFT:
  Green recording dot (8px, bg #16A34A, animate pulse)
  "Session Live" font-body 12px weight 600 #16A34A
  margin-left 8px

CENTER:
  "{formatSessionTime(sessionState.sessionTime)}"
  Syne 20px weight 800 #0F172A

RIGHT:
  Question counter chip:
    "Q{currentQ+1} / {hrQuestions.length}"
    bg #F0FDF4, color #16A34A, border #86EFAC
    font-body 12px weight 700, radius 9999px
    padding 4px 12px

  "End Session" button:
    bg #FEF2F2, color #DC2626, border #FECACA
    font-body 12px weight 600, radius 8px
    padding 6px 14px, cursor pointer
    onClick: setScreen('interview-complete')

── SESSION PROGRESS BAR (4px) ───────────────────────────────

bg #E2E8F0
Fill: (currentQ / hrQuestions.length) * 100%
bg #16A34A, transition width 500ms

── MAIN SESSION AREA (flex 1, display flex) ─────────────────

LEFT PANEL (flex 1, padding 24px):
  display flex, flex-direction column
  align-items center, justify-content flex-start
  overflow-y auto

  ── ARIA SECTION ─────────────────────────────────────────

  Aria container (text-align center, mb 24px):

    Aria avatar (large):
      <img src="https://i.ibb.co/8DT43N37/aria-avatar.png"
           width="100" height="100"
           style={{
             borderRadius:'50%',
             border:'3px solid #86EFAC',
             filter:'drop-shadow(0 8px 24px rgba(22,163,74,0.3))',
             animation: sessionState.phase==='listening'
               ? 'pulse 1s ease-in-out infinite'
               : 'float 3s ease-in-out infinite',
             display:'block',
             margin:'0 auto 12px'
           }}/>

    Status pill below avatar:
      phase === 'question':
        bg #F0FDF4, color #16A34A, border #86EFAC
        "🎤 Aria is asking..."
      phase === 'listening':
        bg #FFFBEB, color #D97706, border #FCD34D
        animate pulse
        "👂 Aria is listening..."
      phase === 'aria-response':
        bg #EFF6FF, color #2563EB, border #BFDBFE
        "💬 Aria is responding..."
      
      font-body 12px weight 600, radius 9999px
      padding 5px 14px

  ── QUESTION CARD ──────────────────────────────────────────

  bg white, border 1px #E2E8F0
  border-radius 20px, padding 20px 24px
  width 100%, max-width 560px
  box-shadow 0 4px 16px rgba(0,0,0,0.06)
  margin-bottom 16px

  QUESTION HEADER ROW (mb 14px):
    Left: category badge
      bg #F0FDF4, color #16A34A, border #86EFAC
      font-body 11px weight 700, radius 9999px, padding 3px 10px
      {hrQuestions[currentQ].category}
    
    Right: question number
      "Question {currentQ+1} of {hrQuestions.length}"
      font-body 11px #94A3B8

  QUESTION TEXT:
    Syne 18px weight 700 #0F172A
    line-height 1.5
    {hrQuestions[sessionState.currentQ].question}

  HINT (below question):
    display flex, align-items center, gap 8px
    bg #F0FDF4, border 1px #86EFAC
    border-radius 8px, padding 8px 12px
    margin-top 12px

    Lightbulb icon:
      <img src="https://img.icons8.com/3d-fluency/100/light-on.png"
           width="16" height="16"/>

    "Hint: {hrQuestions[sessionState.currentQ].hint}"
    font-body 12px #16A34A, font-style italic

  ── ARIA RESPONSE (shows after user answers) ─────────────

  If phase === 'aria-response':
    Slide in from below animation

    bg linear-gradient(135deg, #F0FDF4, white)
    border 1px #86EFAC, border-radius 16px
    padding 14px 18px, margin-top 12px
    width 100%, max-width 560px
    display flex, gap 12px, align-items flex-start

    Aria mini avatar (28px circular):
      <img src="https://i.ibb.co/8DT43N37/aria-avatar.png"
           width="28" height="28"
           style={{borderRadius:'50%', flexShrink:0}}/>

    Content:
      "Aria" font-body 11px weight 700 #16A34A, mb 2px
      Response text: font-body 13px #475569, line-height 1.5
      {ariaResponses[currentQ % ariaResponses.length]}

  ── ANSWER INPUT SECTION ─────────────────────────────────

  width 100%, max-width 560px, margin-top 16px

  Label row:
    "YOUR ANSWER" 11px uppercase #94A3B8
    "Speak or type your answer" 11px #94A3B8 right

  Textarea:
    width 100%, minHeight 120px
    padding 14px 16px
    bg white, border 1.5px #E2E8F0
    border-radius 14px
    font-family var(--font-body)
    font-size 14px, color #0F172A
    line-height 1.6, resize none

    Focus: border #16A34A
           shadow 0 0 0 3px rgba(22,163,74,0.10)

    placeholder "Type your answer here, or click 
                 the microphone to speak..."

    onChange: update userAnswer in state

  Character counter: font-body 11px #94A3B8
    text-align right, margin-top 4px

  TIPS ROW (margin-top 10px):
    "Tips:" font-body 11px weight 600 #94A3B8, mb 6px
    
    3 tip chips (from hrQuestions[currentQ].tips):
      Each: bg #F8FAFF, border 1px #E2E8F0
        font-body 11px #475569, radius 8px
        padding 4px 10px, display inline-block
        margin-right 6px, margin-bottom 6px

  ── ACTION BUTTONS ─────────────────────────────────────────

  display flex, gap 10px, margin-top 14px
  width 100%, max-width 560px

  "Skip →" ghost (h44, flex 0.5):
    color #94A3B8, font-body 13px
    onClick: advance to next question silently

  "Submit Answer →" primary (h44, flex 1.5):
    bg linear-gradient(135deg, #16A34A, #15803D)
    color white, Syne 14px weight 700
    border none, radius 12px

    onClick:
      setSessionState({...sessionState,
        phase: 'aria-response'})
      setTimeout(() => {
        if (currentQ < hrQuestions.length - 1) {
          setSessionState({...sessionState,
            currentQ: currentQ + 1,
            phase: 'question',
            userAnswer: ''})
        } else {
          setScreen('interview-complete')
        }
      }, 2000)

RIGHT PANEL (300px, border-left 1px #E2E8F0):
  padding 20px 16px
  overflow-y auto
  background #FAFAFA

  Aria info card (mb 16px):
    bg white, border 1px #E2E8F0
    border-radius 16px, padding 16px
    text-align center

    <img src="https://i.ibb.co/8DT43N37/aria-avatar.png"
         width="60" height="60"
         style={{borderRadius:'50%',
                 border:'2px solid #86EFAC',
                 display:'block', margin:'0 auto 8px',
                 filter:'drop-shadow(0 4px 12px rgba(22,163,74,0.2))'}}/>

    "Aria" Syne 16px weight 700 #0F172A
    "AI Interview Coach" font-body 12px #94A3B8, mt 2px

    Divider 1px #E2E8F0, my 10px

    3 feature rows (each 28px):
      display flex, align-items center, gap 8px
      CheckCircle icon 14px #16A34A
      font-body 12px #475569

      "Listens and adapts"
      "Gives real feedback"
      "Tracks your progress"

  Session progress (mb 16px):
    bg white, border 1px #E2E8F0
    border-radius 16px, padding 14px 16px

    "Progress" Syne 13px weight 700, mb 10px

    Questions answered row:
      "{currentQ}/{hrQuestions.length}" answered
      Progress bar: h4px, fill #16A34A
      width (currentQ/hrQuestions.length)*100%

    Time elapsed:
      font-body 12px #475569
      "⏱ {formatSessionTime(sessionTime)}"

  Question preview list (upcoming):
    "Up Next" font-body 12px weight 600 #94A3B8
    UPPERCASE, mb 8px

    3 upcoming questions (from currentQ+1):
      Each (30px, display flex, align-items center, gap 8px):
        Number circle (20px, bg #F1F5F9):
          font-body 10px weight 700 #94A3B8
        Category: font-body 11px #475569
          text-overflow ellipsis, 1 line

=============================================================
SCREEN 4 — INTERVIEW COMPLETE
=============================================================

screen: 'interview-complete'
animation: screenEnter 280ms ease-out both

FULL CONTENT:
  display flex, flex-direction column
  align-items center, justify-content center
  padding 40px 24px, text-align center
  height 100%, overflow-y auto
  background white

  max-width 560px, margin 0 auto, width 100%

COMPLETION ILLUSTRATION:
  <img src="https://i.ibb.co/WNN9RBHX/interview-session.png"
       height="160"
       style={{
         filter:'drop-shadow(0 12px 32px rgba(0,0,0,0.15))',
         animation:'float 3s ease-in-out infinite',
         display:'block', margin:'0 auto 8px'
       }}/>

SUCCESS CIRCLE (animation scaleSpring):
  width 64px, height 64px, border-radius 50%
  bg linear-gradient(135deg, #DCFCE7, #BBF7D0)
  border 2px #86EFAC
  CheckCircle icon 28px #16A34A centered
  shadow 0 0 0 12px rgba(22,163,74,0.08)
  margin 0 auto 16px

HEADING:
  "Great session, Rahul! 🎉"
  Syne 26px weight 800 #0F172A, mb 6px

SUBHEADING:
  "You answered {hrQuestions.length} questions
   with Aria in {formatSessionTime(sessionTime)}"
  font-body 14px #64748B, line-height 1.6
  mb 24px

SCORE PREVIEW CARD:
  bg linear-gradient(135deg, #F0FDF4, white)
  border 1px #86EFAC, border-radius 20px
  padding 20px 24px, width 100%, mb 20px

  "Preliminary Score" font-body 11px uppercase #94A3B8
  mb 12px

  Score row (display flex, align-items center,
             justify-content center, gap 20px):
    Large score: Syne 48px weight 800 #16A34A "82%"
    
    Right: 3 mini stats stack:
      "✓ 7 Questions" font-body 12px #475569
      "⏱ 18 min 30s" font-body 12px #475569
      "🎯 HR Interview" font-body 12px #475569

  Progress bar (mt 12px):
    h6px, track #DCFCE7, fill #16A34A at 82%

QUICK FEEDBACK PREVIEW:
  bg white, border 1px #E2E8F0
  border-radius 16px, padding 16px 20px
  width 100%, mb 20px
  text-align left

  HEADER ROW:
    Aria mini avatar (24px) + "Aria says..." 
    font-body 12px weight 600 #16A34A

  Feedback text (margin-top 8px):
    font-body 13px #475569, line-height 1.5
    italic, font-style italic
    "Great communication today! You structured your
     answers well and showed confidence. Focus on
     adding specific metrics to your examples next time."

XP EARNED (margin-bottom 20px):
  <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png"
       width="24" height="24"
       style={{filter:'drop-shadow(0 2px 6px rgba(217,119,6,0.3))'}}/>
  "+75 XP Earned!" Syne 18px weight 800 #D97706
  display flex, align-items center, gap 8px
  justify-content center

BUTTONS (display flex flex-col gap 10px):
  "View Full Feedback →" primary (full width h52):
    bg #16A34A, color white, Syne 15px weight 700
    onClick: setScreen('interview-feedback')

  "Practice Again 🔄" secondary (full width h44):
    border #86EFAC, color #16A34A
    onClick: setScreen('interview-setup')

  "Back to Dashboard" ghost (full width h40):
    color #94A3B8, font-body 13px
    onClick: setScreen('dashboard')

=============================================================
SCREEN 5 — DETAILED FEEDBACK
=============================================================

screen: 'interview-feedback'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  Back → setScreen('interview-complete')
    OR → setScreen('interview') from history
  "Session Feedback 📊" Syne 18px weight 700
  "HR Interview · Mar 18, 2025" muted

CONTENT (flex 1, overflow-y auto, padding 20px 24px):
  max-width 720px, margin 0 auto, width 100%

── SCORE OVERVIEW ───────────────────────────────────────────

display flex, gap 16px, margin-bottom 16px

LEFT CARD (flex 1):
  bg linear-gradient(135deg, #F0FDF4, white)
  border 1px #86EFAC, border-radius 20px
  padding 20px, text-align center

  CircularProgress value=82 size=100
    (use green: #16A34A for this module)

  "Overall Score" font-body 11px uppercase #94A3B8
  mt 8px

  Score rating badge (mt 8px):
    score >= 80: "Excellent 🌟" bg #DCFCE7 color #16A34A
    score >= 70: "Good 👍" bg #FEF3C7 color #D97706
    score < 70: "Needs Work 💪" bg #FEF2F2 color #DC2626
    font-body 12px weight 700, radius 9999px
    padding 4px 12px

RIGHT CARD (flex 1):
  bg white, border 1px #E2E8F0
  border-radius 20px, padding 20px

  4 quick stats (display grid 2×2, gap 10px):
    Each: text-center
      Value: Syne 20px weight 800 #0F172A
      Label: font-body 10px uppercase #94A3B8

    "7" / "Questions"
    "18m" / "Duration"
    "82%" / "Score"
    "3/5" / "Full Marks"

── STRENGTHS & IMPROVEMENTS ─────────────────────────────────

display grid, grid-template-columns 1fr 1fr, gap 12px
margin-bottom 16px

STRENGTHS CARD:
  bg white, border 1px #E2E8F0
  border-radius 20px, padding 20px

  HEADER ROW:
    "💪 Strengths" Syne 15px weight 700 #0F172A
    count badge: bg #DCFCE7 color #16A34A
    "{strengths.length}" font-body 12px weight 700

  LIST (mt 12px, display flex flex-col gap 8px):
    {sessionFeedback.strengths.map(s => (
      <div style={{
        display:'flex', alignItems:'flex-start', gap:8
      }}>
        <div style={{
          width:18, height:18, borderRadius:'50%',
          background:'#DCFCE7', flexShrink:0,
          display:'flex', alignItems:'center',
          justifyContent:'center',
          fontSize:10
        }}>✓</div>
        <span style={{
          fontFamily:'var(--font-body)',
          fontSize:13, color:'#475569',
          lineHeight:1.5
        }}>{s}</span>
      </div>
    ))}

IMPROVEMENTS CARD:
  Same structure but:
    Header: "🎯 To Improve" + amber count badge
    bg #FEF9C3 tint
    Circle: bg #FEF3C7, text #D97706
    Text: same #475569

── QUESTION BY QUESTION SCORES ──────────────────────────────

"Question Scores 📝" Syne 16px weight 700, mb 12px

{sessionFeedback.questionScores.map((item, i) => (
  <div style={{
    display:'flex', alignItems:'center', gap:12,
    padding:'10px 16px',
    background:'white', border:'1px solid #E2E8F0',
    borderRadius:12, marginBottom:8
  }}>

    Question number (24px circle):
      bg #F0FDF4, color #16A34A
      Syne 12px weight 700
      display flex, center
      "{i+1}"

    Question snippet (flex 1):
      font-body 13px #475569
      text-overflow ellipsis
      "{item.q}"

    Score (right):
      Syne 15px weight 800
      color: item.score>=80 ? '#16A34A'
             : item.score>=70 ? '#D97706'
             : '#DC2626'
      "{item.score}%"

    Mini bar (80px × 4px):
      bg #E2E8F0, radius 9999px, overflow hidden
      Fill: width item.score%
      bg: same color as score

  </div>
))}

── ARIA DETAILED FEEDBACK ───────────────────────────────────

bg linear-gradient(135deg, #F0FDF4, white)
border 1px #86EFAC, border-radius 20px
padding 20px, margin-top 4px

HEADER ROW:
  <img src="https://i.ibb.co/8DT43N37/aria-avatar.png"
       width="36" height="36"
       style={{borderRadius:'50%',
               border:'2px solid #86EFAC',
               filter:'drop-shadow(0 2px 8px rgba(22,163,74,0.2))'}}/>
  "Aria's Detailed Assessment" Syne 15px weight 700, ml 10px
  display flex, align-items center

Feedback paragraphs (mt 14px):
  font-body 14px #475569, line-height 1.7
  
  Para 1: "Your communication style was clear and professional
   throughout the session. You demonstrated good self-awareness
   when discussing your strengths and weaknesses."

  Para 2 (mt 10px): "To improve your score further, focus on
   quantifying your achievements with specific numbers and
   metrics. For example, instead of 'I improved the process',
   say 'I reduced processing time by 30%.'"

  Para 3 (mt 10px): "Your answer to the behavioral question
   was particularly strong — you followed the STAR format
   naturally. Keep practicing this structure for all
   situation-based questions."

── NEXT STEPS ───────────────────────────────────────────────

"Recommended Next Steps 🚀" Syne 15px weight 700, mb 12px

3 STEP CARDS:
  Each: bg white, border 1px #E2E8F0
    border-radius 14px, padding 14px 16px
    display flex, align-items center, gap 12px
    margin-bottom 8px, cursor pointer
    hover: border #86EFAC, bg #F0FDF4

    Left: numbered circle (32px, bg #F0FDF4):
      Syne 14px weight 700 #16A34A
      "1" / "2" / "3"

    Right:
      Title: font-body 14px weight 600 #0F172A
      Action: font-body 12px #94A3B8, mt 1px

  Step 1: "Practice STAR format answers"
          "Take another HR Interview session"
          onClick: setScreen('interview-setup')

  Step 2: "Build quantifiable resume points"
          "Update your Resume Builder"
          onClick: setScreen('resume')

  Step 3: "Try Technical Interview next"
          "Test your coding knowledge with Aria"
          onClick: setScreen('interview-setup')

── SHARE / ACTIONS ROW ──────────────────────────────────────

display flex, gap 10px, margin-top 16px

"Practice Again 🔄" primary (flex 1, h48):
  bg #16A34A, color white
  onClick: setScreen('interview-setup')

"Download Report 📄" secondary (flex 1, h48):
  border #86EFAC, color #16A34A
  onClick: showToast("Report downloaded! 📄")

"Share 🔗" ghost (flex 0.7, h48):
  color #64748B
  onClick: showToast("Link copied! 🔗")

=============================================================
INTERVIEW STATE MANAGEMENT
=============================================================

const [interviewState, setInterviewState] = useState({
  setupConfig: {
    type: 'hr',
    role: 'Software Engineer',
    experience: 'fresher',
    questionCount: 8,
    focus: []
  },
  sessionState: {
    currentQ: 0,
    phase: 'question',
    userAnswer: '',
    answers: [],
    sessionTime: 0
  },
  isSessionActive: false
});

=============================================================
TOAST TRIGGERS FOR INTERVIEW MODULE
=============================================================

Enter interview module:
  showToast("AI Interview — Practice with Aria! 🎤")

Setup complete, session starting:
  showToast("Interview starting — take a breath! 🌿")
  showXPToast("+75 XP 🎉")

Answer submitted (each question):
  No toast (keep focus mode clean)

Session complete:
  showToast("Session complete! Great job 🎉")

Feedback viewed:
  showToast("Feedback ready — let's review 📊")

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Module color #16A34A / #F0FDF4 throughout
✅ Aria avatar URL: https://i.ibb.co/8DT43N37/aria-avatar.png
✅ Float animation on Aria in hero card
✅ Pulse animation when Aria is listening
✅ Session timer counts UP (not down)
✅ Question map in right panel of session
✅ Answer advances automatically after 2s
✅ Phase transitions: question → listening → aria-response
✅ Score celebration illustration on complete screen
✅ Detailed feedback shows all question scores
✅ Strengths and improvements in 2-column layout
✅ Aria's detailed paragraph feedback
✅ Next steps cards with navigation
✅ All imgbb URLs used correctly
✅ All Icons8 3D Fluency URLs correct
✅ Toast triggers on key actions
✅ XP toast on session start
✅ No full page scroll on any screen
✅ Device frame maintained throughout
✅ Primary green #16A34A for this module

=============================================================
BUILD ORDER FOR STEP 6
=============================================================

1. Add all interview mock data to top of file
2. Build Interview Home screen
3. Build Interview Setup screen
4. Build Interview Session screen (most complex)
5. Build Interview Complete screen
6. Build Detailed Feedback screen
7. Add interview state management
8. Add session timer logic
9. Add phase transition logic
10. Add all navigation connections
11. Add toast triggers
12. Connect sidebar Mic icon
13. Connect dashboard action card

DO NOT rebuild any existing screens.
DO NOT change any existing code.
ONLY add AI Interview screens.
=============================================================