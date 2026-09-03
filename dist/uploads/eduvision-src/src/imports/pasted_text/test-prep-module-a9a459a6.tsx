Continue building EduVision.
Read system guidelines fully before writing any code.
Do NOT rebuild any existing screens.
Only ADD Test Preparation screens.
All existing screens must remain intact.

=============================================================
STEP 5 — TEST PREPARATION MODULE
=============================================================

Build the complete Test Preparation module.
7 screens total.

Module color identity: #D97706 / #FFFBEB
All headers use soft amber gradient background.

Update navigation:
  sidebar BookOpen icon → setScreen('tests')
  dashboard "Practice Test" card → setScreen('tests')
  'tests' → create → 'tests-create'
  'tests-create' → preview → 'tests-preview'
  'tests-preview' → start → 'tests-taking'
  'tests-taking' → submit → 'tests-submit'
  'tests-submit' → view results → 'tests-score'
  'tests-score' → review answers → 'tests-answers'
  'tests-answers' → back → 'tests-score'
  'tests-score' → back → 'tests'

=============================================================
TEST MOCK DATA — ADD TO TOP OF FILE
=============================================================

const testModules = [
  {id:'math', name:'Mathematics',
   icon:'https://img.icons8.com/3d-fluency/100/calculator.png',
   color:'#BD1313', bg:'#FFF1F2',
   lastScore:79, totalTests:5},
  {id:'english', name:'English',
   icon:'https://img.icons8.com/3d-fluency/100/open-book.png',
   color:'#16A34A', bg:'#F0FDF4',
   lastScore:88, totalTests:3},
  {id:'aptitude', name:'Aptitude',
   icon:'https://img.icons8.com/3d-fluency/100/brain.png',
   color:'#D97706', bg:'#FFFBEB',
   lastScore:52, totalTests:4},
  {id:'programming', name:'Programming',
   icon:'https://img.icons8.com/3d-fluency/100/source-code.png',
   color:'#2563EB', bg:'#EFF6FF',
   lastScore:71, totalTests:2},
  {id:'science', name:'Science',
   icon:'https://img.icons8.com/3d-fluency/100/test-tube.png',
   color:'#7C3AED', bg:'#FAF5FF',
   lastScore:65, totalTests:3},
  {id:'gk', name:'General Knowledge',
   icon:'https://img.icons8.com/3d-fluency/100/globe.png',
   color:'#0891B2', bg:'#ECFEFF',
   lastScore:74, totalTests:1}
];

const testHistory = [
  {id:'t1', subject:'Mathematics', score:79,
   date:'Mar 17', duration:'28 min',
   totalQ:30, correct:24, incorrect:4, skipped:2,
   status:'completed'},
  {id:'t2', subject:'English', score:88,
   date:'Mar 15', duration:'22 min',
   totalQ:25, correct:22, incorrect:2, skipped:1,
   status:'completed'},
  {id:'t3', subject:'Aptitude', score:52,
   date:'Mar 13', duration:'35 min',
   totalQ:40, correct:21, incorrect:12, skipped:7,
   status:'completed'},
  {id:'t4', subject:'Programming', score:71,
   date:'Mar 11', duration:'30 min',
   totalQ:25, correct:18, incorrect:5, skipped:2,
   status:'completed'},
  {id:'t5', subject:'Science', score:65,
   date:'Mar 10', duration:'25 min',
   totalQ:30, correct:20, incorrect:7, skipped:3,
   status:'completed'}
];

const sampleQuestions = [
  {id:1, subject:'Mathematics',
   question:'If a train travels 360 km in 4 hours, what is its average speed in km/h?',
   options:['80','90','100','120'],
   correct:1, difficulty:'easy',
   explanation:'Speed = Distance/Time = 360/4 = 90 km/h'},
  {id:2, subject:'Mathematics',
   question:'What is the value of 15% of 240?',
   options:['30','36','40','42'],
   correct:1, difficulty:'easy',
   explanation:'15% of 240 = (15/100) × 240 = 36'},
  {id:3, subject:'Mathematics',
   question:'A rectangle has length 12cm and width 8cm. What is its area?',
   options:['80 cm²','96 cm²','100 cm²','120 cm²'],
   correct:1, difficulty:'medium',
   explanation:'Area = length × width = 12 × 8 = 96 cm²'},
  {id:4, subject:'Mathematics',
   question:'If 3x + 7 = 22, what is the value of x?',
   options:['3','4','5','6'],
   correct:2, difficulty:'medium',
   explanation:'3x = 22 - 7 = 15, so x = 15/3 = 5'},
  {id:5, subject:'Mathematics',
   question:'What is the LCM of 12 and 18?',
   options:['24','36','48','72'],
   correct:1, difficulty:'medium',
   explanation:'LCM(12,18) = 36'},
  {id:6, subject:'Mathematics',
   question:'A circle has radius 7cm. What is its circumference? (π = 22/7)',
   options:['22 cm','44 cm','66 cm','88 cm'],
   correct:1, difficulty:'hard',
   explanation:'Circumference = 2πr = 2 × 22/7 × 7 = 44 cm'},
  {id:7, subject:'Mathematics',
   question:'If A = {1,2,3} and B = {2,3,4}, what is A∩B?',
   options:['{1,2,3,4}','{2,3}','{1,4}','{1,2,3}'],
   correct:1, difficulty:'hard',
   explanation:'Intersection contains elements in both sets: {2,3}'},
  {id:8, subject:'Mathematics',
   question:'What is the simple interest on ₹5000 at 8% per annum for 3 years?',
   options:['₹1000','₹1200','₹1500','₹2000'],
   correct:1, difficulty:'hard',
   explanation:'SI = (P × R × T)/100 = (5000 × 8 × 3)/100 = ₹1200'},
  {id:9, subject:'Mathematics',
   question:'Two numbers are in ratio 3:5. If their sum is 96, find the larger number.',
   options:['36','48','60','72'],
   correct:2, difficulty:'hard',
   explanation:'3x + 5x = 96, 8x = 96, x = 12. Larger = 5x = 60'},
  {id:10, subject:'Mathematics',
   question:'What is the probability of getting a head when a fair coin is tossed?',
   options:['1/4','1/3','1/2','2/3'],
   correct:2, difficulty:'easy',
   explanation:'P(Head) = 1/2 = 0.5'}
];

const testConfig = {
  subject: 'Mathematics',
  difficulty: 'mixed',
  questionCount: 10,
  timeLimit: 15,
  questionTypes: ['mcq']
};

=============================================================
SCREEN 1 — TEST PREPARATION HOME
=============================================================

screen: 'tests'
animation: screenEnter 280ms ease-out both

Active sidebar: BookOpen → #D97706

SECTION HEADER (56px, flex-shrink 0):
  background white, border-bottom 1px #E2E8F0
  padding 0 24px
  display flex, align-items center
  justify-content space-between

  LEFT (display flex, align-items center, gap 12px):
    Icon circle (36px, bg #FFFBEB, radius 10px):
      <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
           width="22" height="22"/>
    
    Column:
      "Test Preparation 📝" Syne 20px weight 700 #0F172A
      "Practice. Analyze. Improve."
      Plus Jakarta Sans 12px #94A3B8

  RIGHT:
    "12 Tests Taken" neutral chip
    "74% Avg" warning chip (#D97706)

CONTENT AREA (flex 1, overflow-y auto, padding 20px 24px):
  display flex, flex-direction column, gap 16px

── STATS ROW ────────────────────────────────────────────────

display grid, grid-template-columns repeat(4, 1fr)
gap 12px

4 MINI STAT CARDS (height 80px each):

  Each card:
    bg white, border 1px #E2E8F0
    border-radius 16px, padding 14px 16px
    position relative, overflow hidden

    Top strip: 3px solid accent color

  Card 1: Tests Taken
    value "12", label "TESTS TAKEN"
    accent #D97706, icon bookmark-book
    bg gradient: linear-gradient(135deg, #FFFBEB, white)

  Card 2: Avg Score
    value "74%", label "AVG SCORE"
    accent #16A34A, icon goal
    bg gradient: linear-gradient(135deg, #F0FDF4, white)

  Card 3: Best Score
    value "88%", label "BEST SCORE"
    accent #BD1313, icon trophy
    bg gradient: linear-gradient(135deg, #FFF1F2, white)

  Card 4: Time Spent
    value "4.2h", label "TOTAL TIME"
    accent #2563EB, icon lightning-bolt
    bg gradient: linear-gradient(135deg, #EFF6FF, white)

  Each stat card inner:
    <img src={icon URL} width="24" height="24"
         style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
    Value: Syne 22px weight 800 #0F172A
    Label: font-body 10px uppercase #94A3B8

── CREATE TEST BUTTON ───────────────────────────────────────

full width, height 56px
background linear-gradient(135deg, #D97706, #B45309)
border-radius 16px, border none
display flex, align-items center
justify-content center, gap 12px
cursor pointer
transition all 0.3s
box-shadow: 0 4px 16px rgba(217,119,6,0.3)

hover: translateY(-2px)
       box-shadow 0 8px 24px rgba(217,119,6,0.4)

Left:
  <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
       width="28" height="28"
       style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
               animation:'float 3s ease-in-out infinite'}}/>

Text column:
  "Create New Test +" Syne 18px weight 700 white
  "AI generates questions for you"
  Plus Jakarta Sans 12px rgba(255,255,255,0.75)

onClick: setScreen('tests-create')

── SUBJECT CARDS GRID ───────────────────────────────────────

HEADER ROW:
  "Practice by Subject 📚" Syne 16px weight 700
  "Quick practice →" ghost link #D97706 right

display grid, grid-template-columns repeat(3, 1fr)
gap 12px, margin-top 8px

6 SUBJECT CARDS (from testModules):

Each SUBJECT CARD (height 90px):
  bg white, border 1px #E2E8F0
  border-radius 16px, padding 14px 16px
  cursor pointer, transition all 0.2s
  display flex, align-items center, gap 12px

  hover: translateY(-3px)
         box-shadow 0 8px 20px rgba(0,0,0,0.08)
         border-color: module.color

  LEFT: icon circle (40px, border-radius 12px):
    background: module.bg
    <img src={module.icon} width="24" height="24"
         style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>

  RIGHT:
    Module name: Plus Jakarta Sans 14px weight 600 #0F172A
    
    Row: last score chip + tests count
      Score chip: colored by performance
        >=75: bg #DCFCE7 text #16A34A
        50-74: bg #FEF3C7 text #D97706
        <50: bg #FEF2F2 text #DC2626
        font-body 11px weight 700, radius 9999px
        padding 2px 8px
      
      "· {totalTests} tests" 11px #94A3B8

  onClick: setScreen('tests-create')
           pre-select that subject

── TEST HISTORY ─────────────────────────────────────────────

HEADER ROW:
  "Recent Tests 📋" Syne 16px weight 700
  "View all →" ghost link #D97706 right

display flex, flex-direction column, gap 8px
margin-top 8px

5 HISTORY ROWS (from testHistory):

Each ROW (height 64px):
  bg white, border 1px #E2E8F0
  border-radius 14px, padding 12px 16px
  display flex, align-items center, gap 12px
  cursor pointer, transition all 0.2s

  hover: border-color #FCD34D
         bg #FFFBEB

  LEFT: score circle (40px):
    border-radius 50%
    border 2px solid:
      >=75: #16A34A
      50-74: #D97706
      <50: #DC2626
    display flex, align-items center
    justify-content center
    font-family var(--font-display)
    font-size 13px, font-weight 800
    color: same as border color
    bg: soft version of border color
    "{score}%"

  CENTER (flex 1):
    Subject: Plus Jakarta Sans 14px weight 600 #0F172A
    Row: date + duration + question count
      Plus Jakarta Sans 11px #94A3B8
      "{date} · {duration} · {totalQ} questions"

  RIGHT:
    Mini stats row (display flex, gap 8px):
      "✓{correct}" chip: bg #DCFCE7 color #16A34A
      "✗{incorrect}" chip: bg #FEF2F2 color #DC2626
      Each: font-body 10px weight 700
            radius 6px, padding 2px 8px

    ChevronRight icon 16px #94A3B8, margin-top 4px

  onClick: setScreen('tests-score')

=============================================================
SCREEN 2 — CREATE TEST
=============================================================

screen: 'tests-create'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  Back arrow → setScreen('tests')
  "Create Test 🎯" Syne 18px weight 700
  "Configure your practice test" muted

CONTENT (flex 1, overflow-y auto, padding 20px 24px):
  max-width 680px, margin 0 auto, width 100%
  display flex, flex-direction column, gap 20px

  const [config, setConfig] = useState({
    subject: 'Mathematics',
    difficulty: 'mixed',
    questionCount: 10,
    timeLimit: 15,
    types: ['mcq']
  });

── SUBJECT SELECTOR ─────────────────────────────────────────

Label: "SELECT SUBJECT" 11px uppercase #94A3B8
margin-bottom 8px

display grid, grid-template-columns repeat(3, 1fr)
gap 8px

6 subject chips (from testModules):
  Each (height 52px):
    bg white, border 1.5px #E2E8F0
    border-radius 12px, padding 8px 12px
    display flex, align-items center, gap 8px
    cursor pointer, transition all 0.2s

    Icon (20px) + name (13px weight 600)

    SELECTED:
      border 2px solid module.color
      bg module.bg

  onClick: setConfig({...config, subject: module.name})

── DIFFICULTY SELECTOR ──────────────────────────────────────

Label: "DIFFICULTY LEVEL" 11px uppercase #94A3B8
margin-bottom 8px

display flex, gap 8px

3 pills: [Easy] [Medium] [Hard] [Mixed]

Each pill (height 40px, padding 0 20px):
  border-radius 9999px, cursor pointer
  font-body 13px weight 600

  UNSELECTED: bg white, border 1.5px #E2E8F0, color #475569
  SELECTED per difficulty:
    Easy: bg #DCFCE7, border #16A34A, color #16A34A
    Medium: bg #FEF3C7, border #D97706, color #D97706
    Hard: bg #FEF2F2, border #DC2626, color #DC2626
    Mixed: bg #FDF2F2, border #BD1313, color #BD1313

onClick: setConfig({...config, difficulty: value})

── QUESTION COUNT SLIDER ────────────────────────────────────

Label: "NUMBER OF QUESTIONS" 11px uppercase #94A3B8
margin-bottom 8px

Preset pills row (gap 8px):
  [5] [10] [15] [20] [30]

  Each pill (40px × 40px, border-radius 10px):
    UNSELECTED: bg #F1F5F9, border #E2E8F0, color #475569
    SELECTED: bg #D97706, color white, border #D97706

  onClick: setConfig({...config, questionCount: value})

Custom count display:
  "Selected: {config.questionCount} questions"
  font-body 12px #64748B, margin-top 6px

── TIME LIMIT ───────────────────────────────────────────────

Label: "TIME LIMIT" 11px uppercase #94A3B8
margin-bottom 8px

display flex, gap 8px

5 options (height 40px):
  [5 min] [10 min] [15 min] [20 min] [30 min]
  
  Same pill style as above
  SELECTED: bg #D97706, color white
  onClick: setConfig({...config, timeLimit: value})

── QUESTION TYPES ───────────────────────────────────────────

Label: "QUESTION TYPES" 11px uppercase #94A3B8
margin-bottom 8px

display flex, gap 8px

3 toggleable chips:
  [Multiple Choice ✓] [True/False] [Fill in Blank]

  MCQ pre-selected
  Each chip (height 40px, padding 0 16px):
    Selected: bg #FFFBEB, border #FCD34D, color #D97706
    Unselected: bg white, border #E2E8F0, color #475569
    font-body 13px weight 600, radius 9999px
    Has checkmark when selected

── TEST SUMMARY CARD ────────────────────────────────────────

bg linear-gradient(135deg, #FFFBEB, white)
border 1px #FCD34D, border-radius 16px
padding 16px 20px

"Test Summary" Syne 15px weight 700 #D97706
margin-bottom 12px

display grid, grid-template-columns 1fr 1fr
gap 8px

4 summary items:
  Each: label 10px uppercase #94A3B8 + value 14px weight 600

  Subject: config.subject
  Difficulty: config.difficulty
  Questions: config.questionCount
  Time: config.timeLimit + " minutes"

Estimated score chip:
  "~Estimated: 70-80% 🎯"
  bg #FFFBEB, border #FCD34D, color #D97706
  font-body 12px weight 600, radius 8px
  padding 6px 14px, margin-top 8px
  display inline-block

── ACTION BUTTONS ───────────────────────────────────────────

display flex, gap 12px, margin-top 8px

"Preview Questions" secondary (flex 1, height 48px):
  border #FCD34D, color #D97706
  hover: bg #FFFBEB
  onClick: setScreen('tests-preview')

"Start Test →" primary (flex 1.5, height 48px):
  bg linear-gradient(135deg, #D97706, #B45309)
  color white, Syne 15px weight 700
  border none
  onClick: setScreen('tests-preview')

=============================================================
SCREEN 3 — TEST PREVIEW
=============================================================

screen: 'tests-preview'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  Back → setScreen('tests-create')
  "Test Preview 👀" Syne 18px weight 700
  "Review before starting" muted

CONTENT (flex 1, overflow-y auto, padding 20px 24px):
  max-width 680px, margin 0 auto, width 100%

── TEST INFO BANNER ─────────────────────────────────────────

display flex, align-items center, gap 16px
padding 16px 20px
bg linear-gradient(135deg, #FFFBEB, white)
border 1px #FCD34D, border-radius 16px
margin-bottom 16px

<img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
     width="48" height="48"
     style={{
       filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
       animation:'float 3s ease-in-out infinite'
     }}/>

Right content:
  "Mathematics Test 📝" Syne 18px weight 700 #0F172A
  Row: 4 info chips (gap 8px, margin-top 6px):
    "10 Questions" #D97706
    "15 Minutes" #BD1313
    "Mixed Difficulty" #2563EB
    "MCQ Format" #16A34A
    Each: bg soft color, border, font-body 11px weight 600
          radius 9999px, padding 3px 10px

── INSTRUCTIONS CARD ────────────────────────────────────────

bg white, border 1px #E2E8F0
border-radius 16px, padding 16px 20px
margin-bottom 16px

"Instructions 📋" Syne 15px weight 700, mb 12px

5 instruction rows (each 32px):
  display flex, align-items center, gap 10px
  
  Green check circle (18px, bg #DCFCE7):
    CheckCircle icon 12px #16A34A
  
  Instruction text: font-body 13px #475569

  Instructions:
    "Each correct answer earns 1 mark"
    "No negative marking for wrong answers"
    "You can skip and return to questions"
    "Timer starts when you click Start Test"
    "Results are shown immediately after submission"

── SAMPLE QUESTIONS (first 3) ───────────────────────────────

"Sample Questions 👇" Syne 15px weight 700, mb 12px

3 SAMPLE QUESTION CARDS (from sampleQuestions[0-2]):
  bg white, border 1px #E2E8F0
  border-radius 14px, padding 16px
  margin-bottom 10px

  HEADER ROW:
    "Q{index+1}" chip:
      bg #FFFBEB, color #D97706, border #FCD34D
      font-body 11px weight 700, radius 6px
      padding 2px 8px
    Difficulty chip right:
      easy: green, medium: amber, hard: red
      font-body 10px weight 600, radius 9999px

  Question text (margin-top 10px):
    font-body 14px #0F172A, line-height 1.6

  Options (margin-top 12px, display flex flex-col gap 6px):
    4 options per question
    Each: bg #F8FAFF, border 1px #E2E8F0
      border-radius 8px, padding 8px 12px
      font-body 13px #475569
      display flex, gap 10px, align-items center
      
      Option letter: A/B/C/D
        width 20px, height 20px, border-radius 50%
        bg white, border 1px #E2E8F0
        font-body 11px weight 700 #94A3B8
        display flex, align-items center
        justify-content center

"+ 7 more questions" muted text center, margin-top 8px

── START BUTTON ─────────────────────────────────────────────

Full width, height 56px
bg linear-gradient(135deg, #D97706, #B45309)
border-radius 16px, border none
Syne 18px weight 700 white
cursor pointer
shadow 0 8px 24px rgba(217,119,6,0.35)
margin-top 16px
transition all 0.3s

hover: translateY(-2px), shadow increase

Content: row with icon + text:
  <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
       width="24" height="24"
       style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.2))'}}/>
  "Start Test — 15 Minutes"

onClick:
  setScreen('tests-taking')
  showToast("Test started! Good luck 🍀")
  showXPToast("+50 XP 🎉")

=============================================================
SCREEN 4 — TEST TAKING (FOCUS MODE)
=============================================================

screen: 'tests-taking'
animation: screenEnter 280ms ease-out both

FULL SCREEN FOCUS MODE:
  No sidebar visible (hide sidebar during test)
  OR sidebar visible but all icons disabled
  Clean minimal UI — no distractions

const [currentQ, setCurrentQ] = useState(0)
const [answers, setAnswers] = useState({})
const [timeLeft, setTimeLeft] = useState(15 * 60)
const [flagged, setFlagged] = useState([])
const [testComplete, setTestComplete] = useState(false)

Timer effect:
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setScreen('tests-submit');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2,'0')}`;
};

── TEST TOP BAR (56px) ──────────────────────────────────────

bg white, border-bottom 1px #E2E8F0
padding 0 24px
display flex, align-items center
justify-content space-between
flex-shrink 0

LEFT:
  "Mathematics Test" Syne 16px weight 700 #0F172A
  "Q{currentQ+1} of {sampleQuestions.length}"
  font-body 12px #94A3B8, margin-left 8px

CENTER: TIMER PILL
  bg: timeLeft < 60 ? '#FEF2F2' : '#FFFBEB'
  border: timeLeft < 60 ? '1px solid #FECACA'
         : '1px solid #FCD34D'
  color: timeLeft < 60 ? '#DC2626' : '#D97706'
  border-radius 9999px, padding 6px 16px
  display flex, align-items center, gap 6px
  font-family var(--font-display)
  font-size 18px, font-weight 800
  
  Clock icon (lucide) 16px same color
  "{formatTime(timeLeft)}"
  
  animation: pulse 1s infinite when timeLeft < 60

RIGHT:
  Flag button:
    bookmark icon 20px
    color: flagged.includes(currentQ) ? '#D97706' : '#94A3B8'
    onClick: toggle flag
    
  "Submit Test" danger button (height 36px):
    bg #DC2626, color white
    font-body 13px weight 600
    border-radius 8px, padding 0 16px
    onClick: setScreen('tests-submit')

── PROGRESS BAR (4px, full width) ───────────────────────────

bg #E2E8F0, no border-radius
Fill: (currentQ / sampleQuestions.length) * 100 %
bg #D97706, transition width 300ms

── MAIN TEST AREA (flex 1, display flex) ────────────────────

LEFT PANEL (flex 1, padding 24px 20px 24px 24px):
  overflow-y auto

  QUESTION CARD:
    bg white, border 1px #E2E8F0
    border-radius 20px, padding 24px
    margin-bottom 16px
    box-shadow 0 4px 16px rgba(0,0,0,0.06)

    QUESTION HEADER:
      display flex, justify-content space-between
      margin-bottom 16px

      Left: "Question {currentQ+1}" badge
        bg #FFFBEB, color #D97706, border #FCD34D
        font-body 12px weight 700, radius 8px
        padding 4px 12px

      Right: difficulty badge
        easy: green, medium: amber, hard: red

    QUESTION TEXT:
      font-display 18px weight 700 #0F172A
      line-height 1.5
      {sampleQuestions[currentQ].question}

    OPTIONS (margin-top 20px, display flex flex-col gap 10px):
      4 options A, B, C, D

      Each OPTION (height 56px):
        display flex, align-items center, gap 14px
        border-radius 14px, padding 0 16px
        cursor pointer, transition all 0.2s

        UNSELECTED:
          bg white, border 1.5px #E2E8F0
          hover: border #FCD34D, bg #FFFBEB

        SELECTED:
          bg #FFFBEB, border 2px #D97706
          shadow 0 0 0 3px rgba(217,119,6,0.12)

        Option letter circle (32px):
          border-radius 50%
          UNSELECTED: bg #F1F5F9, color #94A3B8
          SELECTED: bg #D97706, color white
          font-display 14px weight 700
          display flex, align-items center
          justify-content center
          transition all 0.2s
          flex-shrink 0

        Option text: font-body 14px weight 500
          UNSELECTED: #475569
          SELECTED: #D97706 weight 600

        onClick: setAnswers({...answers, [currentQ]: optionIndex})

  NAVIGATION BUTTONS (margin-top 16px):
    display flex, justify-content space-between
    align-items center

    Left: "← Previous" secondary button (h44 w120):
      disabled if currentQ === 0
      onClick: setCurrentQ(prev => prev - 1)

    Center: "Skip →" ghost button (h44):
      color #94A3B8
      onClick: setCurrentQ(prev =>
        Math.min(prev+1, sampleQuestions.length-1))

    Right: "Next →" primary button (h44 w120):
      bg #D97706, color white
      If last question: "Submit →" text
      onClick: if last → setScreen('tests-submit')
               else → setCurrentQ(prev => prev + 1)

RIGHT PANEL (280px, border-left 1px #E2E8F0):
  padding 20px 16px
  overflow-y auto
  background #FAFAFA

  "Question Map" font-display 14px weight 700
  mb 12px

  QUESTION GRID (4 columns, gap 8px):
    {sampleQuestions.map((q, i) => (
      <div
        onClick={() => setCurrentQ(i)}
        style={{
          width:40, height:40,
          borderRadius:10, cursor:'pointer',
          display:'flex', alignItems:'center',
          justifyContent:'center',
          fontFamily:'var(--font-display)',
          fontSize:13, fontWeight:700,
          border:'1.5px solid',
          transition:'all 0.2s',
          
          background:
            i === currentQ ? '#D97706'
            : answers[i] !== undefined ? '#DCFCE7'
            : flagged.includes(i) ? '#FEF3C7'
            : 'white',
          
          color:
            i === currentQ ? 'white'
            : answers[i] !== undefined ? '#16A34A'
            : flagged.includes(i) ? '#D97706'
            : '#64748B',
          
          borderColor:
            i === currentQ ? '#D97706'
            : answers[i] !== undefined ? '#86EFAC'
            : flagged.includes(i) ? '#FCD34D'
            : '#E2E8F0'
        }}>
        {i + 1}
      </div>
    ))}

  LEGEND (margin-top 16px, display flex flex-col gap 6px):
    Each: display flex, align-items center, gap 8px
    Colored square (12px) + label (11px #64748B)
    
    #D97706 → "Current"
    #DCFCE7 → "Answered"
    #FEF3C7 → "Flagged"
    white → "Not visited"

  QUICK STATS (margin-top 16px):
    bg white, border 1px #E2E8F0, radius 12px
    padding 12px, display flex flex-col gap 8px

    Row: "Answered" left, 
         "{Object.keys(answers).length}/{sampleQuestions.length}" right
         font-body 12px

    Row: "Flagged" left,
         "{flagged.length}" right #D97706

    Row: "Remaining" left,
         "{sampleQuestions.length - Object.keys(answers).length}" right

=============================================================
SCREEN 5 — SUBMIT CONFIRMATION MODAL
=============================================================

screen: 'tests-submit'
animation: screenEnter 280ms ease-out both

Show over tests-taking screen OR as full screen.
Use full screen approach for simplicity.

OUTER:
  width 100%, height 100%
  background rgba(15,23,42,0.7)
  backdrop-filter blur(4px)
  display flex, align-items center
  justify-content center

MODAL CARD:
  bg white, border-radius 24px
  padding 32px 28px
  max-width 440px, width 90%
  box-shadow 0 20px 60px rgba(0,0,0,0.2)
  text-align center
  animation: scaleIn 300ms ease-out

<img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
     width="64" height="64"
     style={{
       filter:'drop-shadow(0 4px 16px rgba(0,0,0,0.15))',
       animation:'float 3s ease-in-out infinite',
       display:'block', margin:'0 auto 16px'
     }}/>

"Submit Test? 📝"
Syne 26px weight 800 #0F172A, mb 8px

"You have answered {Object.keys(answers).length} out of
{sampleQuestions.length} questions."
font-body 14px #64748B, line-height 1.6, mb 20px

ANSWER SUMMARY (3 chips row, justify center, gap 12px):
  "✓ {answered} Answered" bg #DCFCE7 color #16A34A
  "— {skipped} Skipped" bg #F1F5F9 color #475569
  "⚑ {flagged.length} Flagged" bg #FEF3C7 color #D97706
  Each: font-body 13px weight 700
        border-radius 9999px, padding 6px 14px
        border matching color

WARNING (if any unanswered, margin 16px 0):
  display flex, align-items center, gap 8px
  bg #FEF3C7, border #FCD34D, border-radius 10px
  padding 10px 14px, text-align left
  AlertTriangle icon (lucide) 18px #D97706
  "You have {skipped} unanswered questions."
  font-body 13px #D97706

BUTTONS (display flex flex-col gap 10px, margin-top 20px):
  "Submit Test →" primary (full width h52):
    bg #BD1313, Syne 16px weight 700
    onClick: setScreen('tests-score')
             showToast("Test submitted! Calculating results... 📊")

  "Continue Test" secondary (full width h44):
    onClick: setScreen('tests-taking')

=============================================================
SCREEN 6 — SCORE OVERVIEW
=============================================================

screen: 'tests-score'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  Back → setScreen('tests')
  "Test Results 📊" Syne 18px weight 700
  "Mathematics · Mar 18, 2025" muted

CONTENT (flex 1, overflow-y auto, padding 20px 24px):
  max-width 720px, margin 0 auto, width 100%

── SCORE HERO CARD ──────────────────────────────────────────

Score >= 75: show celebration
Score < 75: show encouragement

bg: score>=75
  ? linear-gradient(135deg, #DCFCE7, white)
  : linear-gradient(135deg, #FFFBEB, white)
border: score>=75 ? 1px #86EFAC : 1px #FCD34D
border-radius 20px, padding 24px
margin-bottom 16px
display flex, align-items center, gap 24px

LEFT: score circle (100px):
  position relative, width 100px, height 100px

  SVG circular progress:
    radius 45, circumference 283
    stroke: score>=75 ? '#16A34A' : '#D97706'
    strokeWidth 6
    show score percentage filled

  Center text:
    "74%" Syne 28px weight 800 color matching stroke
    "Score" 10px uppercase #94A3B8

RIGHT:
  Celebration/encouragement illustration:
  
  If score >= 75:
    <img src="https://i.ibb.co/WpP4kMkt/score-celebration.png"
         width="120"
         style={{filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.15))',
                 animation:'float 3s ease-in-out infinite'}}/>
  
  If score < 75:
    <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
         width="80"
         style={{filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
                 animation:'float 3s ease-in-out infinite'}}/>

CENTER (flex 1):
  Big result message:
    score>=75: "🎉 Great job, Rahul!"
    score<75: "Keep going, Rahul! 💪"
    Syne 22px weight 800 #0F172A

  Score breakdown: font-body 14px #64748B mt 4px
    "You scored 74% — above your average of 68%"

  4 stat chips (flex-wrap, gap 8px, mt 12px):
    "✓ 7 Correct" bg #DCFCE7 color #16A34A
    "✗ 2 Wrong" bg #FEF2F2 color #DC2626
    "— 1 Skipped" bg #F1F5F9 color #475569
    "⏱ 12 min 30s" bg #EFF6FF color #2563EB
    Each: font-body 12px weight 700
          radius 9999px, padding 4px 12px

── PERFORMANCE BREAKDOWN ────────────────────────────────────

"Performance Breakdown 📈" Syne 16px weight 700
mb 12px

display grid, grid-template-columns 1fr 1fr
gap 12px

4 BREAKDOWN CARDS:

  Card 1: Accuracy
    value "70%", label "Accuracy Rate"
    CircularProgress value=70 size=64
    color #16A34A

  Card 2: Speed
    value "1.2 min/Q", label "Avg per Question"
    <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png"
         width="40"/>
    color #D97706

  Card 3: Difficulty
    Bar showing: Easy 3/3, Medium 5/7, Hard 1/3
    Each bar: height 4px, colored

  Card 4: Comparison
    "vs Last Test: +5%"
    "vs Average: +6%"
    Trend arrows in green

  Each card: bg white, border 1px #E2E8F0
    border-radius 14px, padding 14px 16px
    text-align center

── SUBJECT TIPS ─────────────────────────────────────────────

"AI Insights 💡" Syne 16px weight 700 mb 12px

3 TIP CARDS:
  Each: bg white, border 1px #E2E8F0
    border-radius 14px, padding 14px 16px
    display flex, gap 12px, align-items flex-start
    margin-bottom 8px

    Left: colored icon circle (36px):
      "💡" or "⚠️" or "✅" emoji (18px)

    Right:
      Title: font-body 14px weight 600 #0F172A
      Tip: font-body 12px #64748B, mt 2px

  Tips:
    "💡 Focus on Probability & Statistics — only 40% accuracy"
    "⚠️ Speed up — you used 83% of available time"
    "✅ Strong on Arithmetic — 95% accuracy, keep it up"

── ACTION BUTTONS ───────────────────────────────────────────

display flex, gap 12px, margin-top 16px

"Review Answers 📋" secondary (flex 1, h48):
  border #FCD34D, color #D97706
  onClick: setScreen('tests-answers')

"Retake Test 🔄" ghost (flex 1, h48):
  color #BD1313
  onClick: setScreen('tests-create')

"Share Result 🔗" ghost (flex 1, h48):
  color #64748B
  onClick: showToast("Result link copied! 🔗")

=============================================================
SCREEN 7 — ANSWER REVIEW
=============================================================

screen: 'tests-answers'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  Back → setScreen('tests-score')
  "Answer Review 📋" Syne 18px weight 700
  "10 questions · Mathematics" muted

FILTER ROW (48px, flex-shrink 0):
  bg white, border-bottom 1px #E2E8F0
  padding 0 24px, display flex
  align-items center, gap 8px

  const [filter, setFilter] = useState('all')

  Filter pills: [All 10] [Correct 7] [Wrong 2] [Skipped 1]

  Each pill (height 32px, padding 0 14px):
    radius 9999px, font-body 12px weight 600
    cursor pointer, transition all 0.2s

    All: bg #F1F5F9 color #475569
    Correct: bg #DCFCE7 color #16A34A border #86EFAC
    Wrong: bg #FEF2F2 color #DC2626 border #FECACA
    Skipped: bg #F1F5F9 color #475569

    ACTIVE: opacity 1, border visible
    INACTIVE: opacity 0.6

CONTENT (flex 1, overflow-y auto, padding 16px 24px):

  10 QUESTION REVIEW CARDS:

  Each CARD (margin-bottom 12px):
    bg white, border 1.5px solid:
      correct: #86EFAC
      wrong: #FECACA
      skipped: #E2E8F0
    border-radius 16px, padding 16px 20px
    position relative

    STATUS BADGE (absolute top-right):
      correct: bg #DCFCE7 color #16A34A "✓ Correct"
      wrong: bg #FEF2F2 color #DC2626 "✗ Wrong"
      skipped: bg #F1F5F9 color #475569 "— Skipped"
      font-body 11px weight 700, radius 9999px
      padding 3px 10px

    QUESTION HEADER (mb 12px):
      "Q{index+1}" amber badge + difficulty badge

    QUESTION TEXT:
      font-body 14px #0F172A, line-height 1.5
      margin-bottom 12px

    OPTIONS (display flex flex-col gap 6px):
      4 options, each showing result:

      CORRECT ANSWER:
        bg #DCFCE7, border 1.5px #86EFAC
        CheckCircle icon 16px #16A34A left
        text #16A34A weight 600

      WRONG SELECTION (if user picked wrong):
        bg #FEF2F2, border 1.5px #FECACA
        XCircle icon 16px #DC2626 left
        text #DC2626 weight 600

      OTHER OPTIONS:
        bg #F8FAFF, border 1px #E2E8F0
        text #94A3B8

      Option letter circle: same as taking screen
      Option text: 13px

    EXPLANATION (if answered):
      bg #F0FDF4, border 1px #86EFAC
      border-radius 10px, padding 10px 14px
      margin-top 12px
      display flex, align-items flex-start, gap 8px

      Lightbulb icon:
        <img src="https://img.icons8.com/3d-fluency/100/light-on.png"
             width="18" height="18"/>

      "Explanation:" font-body 12px weight 600 #16A34A
      + explanation text 12px #475569
      {sampleQuestions[index].explanation}

=============================================================
TEST STATE MANAGEMENT
=============================================================

const [testState, setTestState] = useState({
  config: testConfig,
  currentQuestion: 0,
  answers: {},
  flagged: [],
  timeLeft: 15 * 60,
  isActive: false,
  submitted: false
});

const scoreCalculated = () => {
  const correct = Object.values(testState.answers)
    .filter((ans, i) =>
      ans === sampleQuestions[i]?.correct).length;
  return Math.round((correct / sampleQuestions.length) * 100);
};

=============================================================
TOAST TRIGGERS FOR TEST MODULE
=============================================================

Enter tests module:
  showToast("Test Preparation — Let's practice! 📝")

Test created:
  showToast("Test configured! Ready to start 🎯")

Test started:
  showToast("Test started! Good luck 🍀")
  showXPToast("+50 XP 🎉")

Test submitted:
  showToast("Calculating your results... 📊")

Score >= 75:
  showToast("Amazing score! 🎉")
  showXPToast("+100 XP Bonus! 🎉")

Score < 75:
  showToast("Good effort! Review and try again 💪")
  showXPToast("+50 XP 🎉")

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Module color #D97706 / #FFFBEB throughout
✅ All Icons8 3D Fluency URLs loading correctly
✅ Timer counts down in test-taking screen
✅ Question map updates as user answers
✅ Selected option highlights in amber
✅ Submit modal shows answer summary
✅ Score screen shows celebration if >= 75%
✅ Score-celebration illustration on high score
✅ Answer review shows correct/wrong clearly
✅ Explanations shown for each question
✅ All navigation connections working
✅ Toast triggers on all key actions
✅ XP toasts on test start and completion
✅ Primary amber #D97706 for this module
✅ No full page scroll on any screen
✅ Device frame maintained throughout

=============================================================
BUILD ORDER FOR STEP 5
=============================================================

1. Add all test mock data to top of file
2. Build Test Home screen
3. Build Create Test screen
4. Build Test Preview screen
5. Build Test Taking screen (focus mode)
6. Build Submit Confirmation screen
7. Build Score Overview screen
8. Build Answer Review screen
9. Add test state management
10. Add timer logic
11. Add all navigation connections
12. Add toast triggers
13. Connect sidebar BookOpen icon
14. Connect dashboard action card

DO NOT rebuild any existing screens.
DO NOT change any existing code.
ONLY add Test Preparation screens.
=============================================================