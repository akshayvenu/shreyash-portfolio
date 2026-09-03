Continue building EduVision.
Read system guidelines fully before writing any code.
Do NOT rebuild any existing screens from scratch.
Only FIX and ENHANCE existing screens as specified.
All working functionality must remain intact.

=============================================================
SECTION 1 — GLOBAL FIXES
=============================================================

FIX 1 — REMOVE ALL FLOATING ANIMATIONS FROM ILLUSTRATIONS
──────────────────────────────────────────────────────────
Find every instance of:
  animation: 'float 3s ease-in-out infinite'
  animation: 'floatSlow 4s ease-in-out infinite'

On ALL illustration <img> tags throughout the entire app
REMOVE the animation style property completely.

Keep float animation ONLY on:
  XP pill medal icon in top bar
  Nothing else

All other illustrations should be STATIC.
No movement anywhere on any screen.

FIX 2 — REMOVE CARD NOISE TEXTURE GLOBALLY
───────────────────────────────────────────
Find every instance of:
  url('https://i.ibb.co/XZDscnRB/card-noise.png')
  url(card-noise.png)
  card-noise

Remove ALL card noise texture overlays from EVERY card
in the ENTIRE application.

Also find and remove any ::after pseudo elements
that reference card noise.

Replace with nothing — just solid gradient backgrounds.

FIX 3 — REMOVE IMAGE BACKGROUNDS
─────────────────────────────────
For ALL <img> tags that show illustrations:
  Add: background: 'transparent'
  Add: mixBlendMode: 'multiply' if white bg still showing

For action gradient cards specifically:
  The illustration images inside gradient cards
  should blend with the card background.
  Add to those img tags:
    style={{ mixBlendMode: 'multiply',
             background: 'transparent' }}

=============================================================
SECTION 2 — DASHBOARD FIXES & ENHANCEMENTS
=============================================================

FIX 4 — DASHBOARD LAYOUT — ALL CARDS FULLY VISIBLE
────────────────────────────────────────────────────
The dashboard must show ALL cards without cutting.
Fix the outer container:

const dashboardStyle = {
  height: 'calc(100vh - 56px)',
  overflowY: 'auto',         // change from hidden to auto
  overflowX: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 20px',
  gap: '12px',
  background: '#FAFAFA',
  backgroundImage: "url('https://i.ibb.co/GQM6xx2F/dot-grid-light.png')",
  backgroundRepeat: 'repeat',
  backgroundSize: '40px 40px'
};

Each section must have flexShrink: 0 except
the main content grid which gets flex: 1 minHeight 0.

FIX 5 — STAT CARDS NAMES VISIBLE
──────────────────────────────────
Each stat card must show clearly:
  3D icon (28px)
  Big number value (Syne 22px weight 800)
  LABEL NAME in uppercase below number
  Trend badge top right

Do NOT show only emoji. Always show text label.

FIX 6 — ACHIEVEMENTS ROW FIXED
────────────────────────────────
Replace the current achievements row with this:

ACHIEVEMENTS ROW (height 110px, flexShrink 0):
  background: white
  border: '1px solid #E2E8F0'
  borderRadius: 20
  padding: '12px 20px'
  overflow: 'hidden'

  HEADER ROW (display flex, justify space-between, mb 10px):
    "🏅 Achievements" Syne 14px weight 700
    "3/8 unlocked" neutral chip

  BADGES SCROLL (display flex, gap 12px, overflowX auto):
    Hide scrollbar:
      scrollbarWidth: 'none'
      msOverflowStyle: 'none'

    const achievementBadges = [
      {name:'First Test', icon:'https://img.icons8.com/3d-fluency/100/medal.png',
       unlocked:true, color:'#D97706'},
      {name:'Resume Pro', icon:'https://img.icons8.com/3d-fluency/100/resume.png',
       unlocked:true, color:'#BD1313'},
      {name:'5 Day Streak', icon:'https://img.icons8.com/3d-fluency/100/fire-element.png',
       unlocked:true, color:'#DC2626'},
      {name:'Score 80%+', icon:'https://img.icons8.com/3d-fluency/100/goal.png',
       unlocked:false, color:'#94A3B8'},
      {name:'Perfect Score', icon:'https://img.icons8.com/3d-fluency/100/star.png',
       unlocked:false, color:'#94A3B8'},
      {name:'Interview Pro', icon:'https://img.icons8.com/3d-fluency/100/microphone.png',
       unlocked:false, color:'#94A3B8'},
      {name:'Subject Master', icon:'https://img.icons8.com/3d-fluency/100/book.png',
       unlocked:false, color:'#94A3B8'},
      {name:'Champion', icon:'https://img.icons8.com/3d-fluency/100/trophy.png',
       unlocked:false, color:'#94A3B8'}
    ];

    {achievementBadges.map((badge, i) => (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        flexShrink: 0,
        width: 64,
        cursor: 'pointer'
      }}>
        <div style={{
          width: 48, height: 48,
          borderRadius: 14,
          background: badge.unlocked
            ? 'white' : '#F8FAFF',
          border: `2px ${badge.unlocked
            ? 'solid' : 'dashed'}`,
          borderColor: badge.unlocked
            ? badge.color : '#E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: badge.unlocked
            ? `0 4px 12px ${badge.color}30`
            : 'none',
          position: 'relative'
        }}>
          <img
            src={badge.icon}
            width={28} height={28}
            style={{
              filter: badge.unlocked
                ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
                : 'grayscale(100%) opacity(0.35)',
              background: 'transparent'
            }}
          />
          {!badge.unlocked && (
            <div style={{
              position: 'absolute',
              bottom: 2, right: 2,
              fontSize: 10
            }}>🔒</div>
          )}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 9,
          fontWeight: 600,
          color: badge.unlocked ? '#0F172A' : '#94A3B8',
          textAlign: 'center',
          lineHeight: 1.2,
          width: '100%'
        }}>{badge.name}</div>
      </div>
    ))}

FIX 7 — XP PILL CLICKABLE (TOP BAR)
──────────────────────────────────────
Make the XP pill in the top bar clickable.
Add onClick: () => setShowXPModal(true)
Add cursor: 'pointer'

Add this state: const [showXPModal, setShowXPModal] = useState(false);

XP MODAL:
Build a full modal overlay when showXPModal is true.

BACKDROP:
  position fixed, inset 0
  bg rgba(15,23,42,0.5)
  backdropFilter blur(4px)
  zIndex 400
  onClick: () => setShowXPModal(false)

MODAL CARD:
  position fixed, top '50%', left '50%'
  transform 'translate(-50%,-50%)'
  bg white, borderRadius 24px
  width 560px, maxHeight '85vh'
  overflowY auto
  boxShadow '0 20px 60px rgba(0,0,0,0.2)'
  zIndex 401
  padding 0

  MODAL HEADER (56px):
    bg linear-gradient(135deg, #D97706, #B45309)
    borderRadius '24px 24px 0 0'
    padding '0 24px'
    display flex, alignItems center
    justifyContent space-between

    LEFT (display flex, gap 12px, align center):
      <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png"
           width={28} height={28}
           style={{filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
                   background:'transparent'}}/>
      "XP & Rewards" Syne 18px weight 700 white

    X button: X icon lucide 20px white
      onClick: () => setShowXPModal(false)

  MODAL BODY (padding 24px):

    CURRENT LEVEL CARD:
      bg linear-gradient(135deg, #FFFBEB, #FEF3C7)
      border '1px solid #FCD34D'
      borderRadius 20px, padding 20px, mb 20px
      display flex, alignItems center, gap 20px

      LEFT: CircularProgress value=80 size=80
        stroke #D97706

      CENTER:
        "🔥 Hustler" Syne 24px weight 800 #D97706
        "Level 3 · 2,400 XP" font-body 14px #B45309, mt 4px

        Progress bar (mt 10px):
          "600 XP to Elite" font-body 11px #B45309, mb 4px
          h6px, track rgba(217,119,6,0.2)
          fill #D97706 at 80%, radius 9999px

      RIGHT:
        <img src="https://img.icons8.com/3d-fluency/100/medal.png"
             width={56} height={56}
             style={{filter:'drop-shadow(0 4px 12px rgba(217,119,6,0.3))',
                     background:'transparent'}}/>

    LEVEL JOURNEY (mb 20px):
      "Level Journey 🗺️" Syne 15px weight 700, mb 12px

      5 level rows:
      const levels = [
        {name:'🌱 Starter', range:'0–499 XP',
         done:true, color:'#16A34A'},
        {name:'⚡ Rising', range:'500–1,499 XP',
         done:true, color:'#2563EB'},
        {name:'🔥 Hustler', range:'1,500–2,999 XP',
         current:true, color:'#D97706'},
        {name:'💎 Elite', range:'3,000–4,999 XP',
         done:false, color:'#7C3AED'},
        {name:'🏆 Champion', range:'5,000+ XP',
         done:false, color:'#D97706'}
      ];

      {levels.map(level => (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12, padding: '10px 14px',
          borderRadius: 12, marginBottom: 6,
          background: level.current
            ? '#FFFBEB' : 'white',
          border: '1px solid',
          borderColor: level.current
            ? '#FCD34D' : '#E2E8F0'
        }}>
          <div style={{fontSize: 18}}>{level.name.split(' ')[0]}</div>
          <div style={{flex:1}}>
            <div style={{
              fontFamily:'var(--font-body)',
              fontSize:13, fontWeight:600,
              color: level.current ? '#D97706' : '#0F172A'
            }}>{level.name}</div>
            <div style={{
              fontFamily:'var(--font-body)',
              fontSize:11, color:'#94A3B8'
            }}>{level.range}</div>
          </div>
          {level.done && (
            <div style={{
              background:'#DCFCE7', color:'#16A34A',
              fontSize:11, fontWeight:700,
              borderRadius:9999, padding:'2px 10px',
              fontFamily:'var(--font-body)'
            }}>✓ Done</div>
          )}
          {level.current && (
            <div style={{
              background:'#D97706', color:'white',
              fontSize:11, fontWeight:700,
              borderRadius:9999, padding:'2px 10px',
              fontFamily:'var(--font-body)'
            }}>Current</div>
          )}
        </div>
      ))}

    HOW TO EARN XP (mb 20px):
      "How to Earn XP ⚡" Syne 15px weight 700, mb 12px

      display grid, gridTemplateColumns '1fr 1fr', gap 8px

      const xpActions = [
        {action:'Daily Login', xp:'+10 XP', icon:'🌅'},
        {action:'Complete Task', xp:'+20 XP', icon:'✅'},
        {action:'Add a Skill', xp:'+20 XP', icon:'📈'},
        {action:'Resume Section', xp:'+30 XP', icon:'📄'},
        {action:'Take Any Test', xp:'+50 XP', icon:'📝'},
        {action:'Interview Session', xp:'+75 XP', icon:'🎤'},
        {action:'Score 75%+', xp:'+100 XP', icon:'🎯'},
        {action:'7-Day Streak', xp:'+200 XP', icon:'🔥'}
      ];

      {xpActions.map(item => (
        <div style={{
          display:'flex', alignItems:'center', gap:10,
          padding:'10px 12px',
          background:'white', border:'1px solid #E2E8F0',
          borderRadius:10
        }}>
          <span style={{fontSize:18}}>{item.icon}</span>
          <span style={{
            fontFamily:'var(--font-body)',
            fontSize:12, color:'#475569', flex:1
          }}>{item.action}</span>
          <span style={{
            fontFamily:'var(--font-body)',
            fontSize:12, fontWeight:700, color:'#D97706'
          }}>{item.xp}</span>
        </div>
      ))}

    XP STORE PREVIEW (mb 20px):
      "XP Store 🛍️" Syne 15px weight 700
      "Spend your XP on exclusive rewards" font-body 12px #94A3B8
      mb 12px

      display grid, gridTemplateColumns 'repeat(3,1fr)', gap 8px

      const storeItems = [
        {name:'Streak Shield', cost:'500 XP', icon:'🛡️',
         desc:'Protect your streak once',
         color:'#2563EB', bg:'#EFF6FF'},
        {name:'Premium Template', cost:'800 XP', icon:'📄',
         desc:'Unlock exclusive resume design',
         color:'#7C3AED', bg:'#FAF5FF'},
        {name:'AI Feedback Token', cost:'300 XP', icon:'🤖',
         desc:'Extra AI review session',
         color:'#16A34A', bg:'#F0FDF4'},
        {name:'Expert Discount', cost:'1000 XP', icon:'👥',
         desc:'20% off expert sessions',
         color:'#D97706', bg:'#FFFBEB'},
        {name:'Profile Badge', cost:'400 XP', icon:'🏅',
         desc:'Exclusive profile frame',
         color:'#BD1313', bg:'#FFF1F2'},
        {name:'Leaderboard Boost', cost:'600 XP', icon:'🚀',
         desc:'Double XP for 24 hours',
         color:'#D97706', bg:'#FFFBEB'}
      ];

      {storeItems.map(item => (
        <div
          onClick={() => {
            if (item.cost.replace(' XP','')
                <= 2400) {
              setTimeout(() => showToast(
                item.name + ' purchased! 🎉'), 0);
            } else {
              setTimeout(() => showToast(
                'Not enough XP! Need ' + item.cost), 0);
            }
          }}
          style={{
            background: item.bg,
            border: '1px solid #E2E8F0',
            borderRadius: 14, padding: 12,
            textAlign: 'center', cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
          <div style={{fontSize:24, mb:6}}>{item.icon}</div>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:12, fontWeight:700,
            color:'#0F172A', marginTop:4
          }}>{item.name}</div>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:10, color:'#94A3B8',
            marginTop:2, marginBottom:6
          }}>{item.desc}</div>
          <div style={{
            background: item.color,
            color:'white', borderRadius:9999,
            fontFamily:'var(--font-body)',
            fontSize:11, fontWeight:700,
            padding:'3px 10px',
            display:'inline-block'
          }}>{item.cost}</div>
        </div>
      ))}

    "View Full Store →" primary button:
      full width h44, bg #D97706, color white
      Syne 14px weight 700, border none, radius 12px
      onClick: () => {
        setShowXPModal(false);
        setTimeout(() => showToast("XP Store coming soon! 🛍️"), 0);
      }

FIX 8 — COLLAPSIBLE WIDGETS
─────────────────────────────
In the right column of the dashboard
(leaderboard, skill gap, recent activity),
make each widget collapsible.

Add state:
const [expandedWidgets, setExpandedWidgets] = useState({
  leaderboard: true,
  skillGap: true,
  activity: false
});

const toggleWidget = (key) =>
  setExpandedWidgets(prev => ({
    ...prev, [key]: !prev[key]
  }));

Each widget card:
  Header is always visible (clickable)
  Body shows/hides based on state

  HEADER ROW (always show, cursor pointer):
    onClick: () => toggleWidget('leaderboard')
    ChevronDown/Up icon right side:
      rotate 180deg when expanded
      transition transform 200ms

  BODY (only show when expanded):
    animation fadeUp 200ms ease-out when opening

When collapsed: card height = 52px (header only)
When expanded: full content shows

Also ADD these new collapsible widgets
in the right column below existing ones:

NEW WIDGET 1 — Daily Motivation:
  Default: collapsed
  Header: "💭 Daily Quote"

  Content when expanded:
    bg #FFFBEB, border #FCD34D
    borderRadius 0 0 20px 20px, padding 14px 16px

    Quote: font-body 13px #D97706 italic lineHeight 1.6
    "The secret of getting ahead is getting started."

    Author: font-body 11px #94A3B8, mt 6px
    "— Mark Twain"

    Refresh button:
      "New Quote 🔄" ghost #D97706 12px
      onClick: cycle through 5 quotes

NEW WIDGET 2 — Placement Countdown:
  Default: expanded
  Header: "📅 Placement Countdown"

  Content when expanded:
    bg linear-gradient(135deg, #FFF1F2, white)
    padding 14px 16px

    Big number: "92" Syne 36px weight 800 #BD1313
    "days remaining" font-body 12px #94A3B8

    3 mini milestones (display flex, gap 8px, mt 10px):
      Each: small chip
      "📝 Tests: 12 done"
      "📄 Resume: 68%"
      "🎤 Sessions: 3"
      font-body 10px, neutral chip style

    Progress bar: h4px #F5BFBF → fill #BD1313 at ~30%

NEW WIDGET 3 — Today's Focus:
  Default: collapsed
  Header: "🎯 Today's Focus"

  Content when expanded:
    "Based on your weak areas:"
    font-body 12px #94A3B8, mb 8px

    3 focus items:
      Each: display flex, gap 8px, align center
        Colored dot + text 12px #475569
        "Practice Probability questions"
        "Add 2 skills to resume"
        "Do 1 mock interview"

=============================================================
SECTION 3 — RESUME BUILDER ENHANCEMENTS
=============================================================

ENHANCEMENT 1 — RECENT RESUMES ON HOME SCREEN
───────────────────────────────────────────────
Add this section to the Resume Builder home screen
BELOW the option cards and AI nudge banner.

const recentResumes = [
  {id:'r1', name:'Software Engineer Resume',
   template:'Classic', strength:68,
   status:'draft', lastEdited:'Today',
   aiScore:72, color:'#BD1313'},
  {id:'r2', name:'Data Analyst Application',
   template:'Modern', strength:45,
   status:'draft', lastEdited:'Mar 15',
   aiScore:55, color:'#0F172A'},
  {id:'r3', name:'Internship Resume',
   template:'Minimal', strength:90,
   status:'completed', lastEdited:'Mar 10',
   aiScore:88, color:'#E2E8F0'}
];

RECENT RESUMES SECTION:
  Header (display flex, justify space-between, mb 12px):
    "Recent Resumes 📄" Syne 16px weight 700
    "+ New Resume" ghost link #BD1313 13px weight 500
      cursor pointer
      onClick: () => setScreen('resume-templates')

  {recentResumes.map(resume => (
    RESUME ROW CARD (height 72px):
      bg white, border 1px #E2E8F0
      borderRadius 16px, padding '0 16px'
      display flex, alignItems center, gap 12px
      marginBottom 8px, cursor pointer
      transition all 0.2s
      hover: border #F5BFBF, bg #FFF8F8

      LEFT: Template color strip (4px width, full height):
        borderRadius '8px 0 0 8px'
        background resume.color

      Resume icon (36px, bg #FDF2F2, radius 10px):
        <img src="https://img.icons8.com/3d-fluency/100/resume.png"
             width={20} height={20}
             style={{background:'transparent'}}/>

      CENTER (flex 1):
        Name: font-body 14px weight 600 #0F172A
        Row: template chip + last edited + AI score chip
          font-body 11px #94A3B8
          "{resume.template} · {resume.lastEdited}"
          AI Score chip: bg #F0FDF4, color #16A34A
            "AI: {resume.aiScore}%" 10px weight 700
            radius 9999px, padding '2px 8px'

      STATUS CHIP:
        completed: bg #DCFCE7, color #16A34A "✓ Complete"
        draft: bg #FEF3C7, color #D97706 "Draft"
        font-body 11px weight 700, radius 9999px, padding '3px 8px'

      ACTION ICONS (display flex, gap 6px):
        Each icon button (28px circle, bg #F8FAFF,
                          radius 8px, cursor pointer):

        View: Eye icon lucide 14px #475569
          onClick: () => setScreen('resume-complete')

        Edit: Edit icon lucide 14px #BD1313
          onClick: () => setScreen('resume-editor')

        Download: Download icon lucide 14px #475569
          onClick: () => setTimeout(() =>
            showToast("Downloading " + resume.name + "..."), 0)

        Delete: Trash icon lucide 14px #DC2626
          onClick: () => setTimeout(() =>
            showToast(resume.name + " deleted"), 0)
  ))}

ENHANCEMENT 2 — RESUME FINAL PREVIEW SCREEN
──────────────────────────────────────────────
After all sections are filled in the editor,
when user clicks "Preview →" button,
show the resume-complete screen BUT also:

Add a "✅ Resume Complete!" banner at top
if strength >= 80:
  bg #DCFCE7, border-bottom 1px #86EFAC
  padding '10px 24px'
  display flex, gap 8px, align center
  "🎉 Your resume looks great! Ready to download."
  font-body 13px #16A34A weight 600

Add "Done ✅" button in the header right side:
  bg #16A34A, color white, border none
  Syne 14px weight 700, radius 8px
  h36, padding '0 16px', cursor pointer
  onClick: () => {
    setScreen('resume');
    setTimeout(() =>
      showToast("Resume saved! Great work 🎉"), 0);
    setTimeout(() =>
      showXPToast("+30 XP 🎉"), 200);
  }

ENHANCEMENT 3 — RESUME SAVE REDIRECTS
────────────────────────────────────────
Find the "Save" button in resume-editor.
Change onClick to:
  () => {
    setScreen('resume');
    setTimeout(() =>
      showToast("Resume saved successfully! 📄"), 0);
    setTimeout(() =>
      showXPToast("+30 XP 🎉"), 200);
  }

=============================================================
SECTION 4 — TEST PREPARATION ENHANCEMENTS
=============================================================

ENHANCEMENT 1 — STAT CARD NAMES
──────────────────────────────────
Find the 4 stat cards on the Test home screen.
Each card MUST show:
  3D icon image (24px)
  Value (Syne 20px weight 800)
  Label name (font-body 10px uppercase #94A3B8)

Update labels to be clearly visible:
  "TESTS TAKEN"
  "AVG SCORE"
  "BEST SCORE"
  "TIME SPENT"

ENHANCEMENT 2 — CREATE TEST OVERHAUL
──────────────────────────────────────
Replace the existing Create Test screen content with:

Add state:
const [createTestConfig, setCreateTestConfig] = useState({
  mode: 'subject',
  subject: 'Mathematics',
  topic: '',
  jobDescription: '',
  difficulty: 'mixed',
  questionCount: 10,
  timeLimit: 15,
  passPercentage: 60,
  sections: [
    {type:'MCQ', count:5, enabled:true},
    {type:'True/False', count:2, enabled:true},
    {type:'Single Choice', count:2, enabled:false},
    {type:'Short Answer', count:1, enabled:false},
    {type:'Long Answer', count:0, enabled:false}
  ]
});

SECTION: TEST MODE SELECTOR (top):
  "Choose Test Mode" Syne 15px weight 700, mb 10px

  3 mode cards (display grid, 3 columns, gap 10px):

    Card 1 — Subject Based (default selected):
      bg #FFFBEB, border 2px #FCD34D (when selected)
      border 1.5px #E2E8F0 (unselected)
      borderRadius 14px, padding 14px 16px
      cursor pointer
      emoji "📚" large + "Subject Based" bold
      "Choose from our subject library" muted

    Card 2 — Topic Specific:
      emoji "🎯" + "Topic Specific"
      "Enter any specific topic" muted

    Card 3 — JD Based:
      emoji "💼" + "JD Assessment"
      "Paste job description for targeted test" muted
      "Popular" badge top right:
        bg #FEF3C7, color #D97706
        font-body 10px weight 700, radius 9999px

  onClick each: setCreateTestConfig({...config, mode: value})

IF mode === 'subject':
  Subject grid (existing 6 subjects, same as before)

  TOPIC PLACEHOLDER (below subject grid):
    Label: "SPECIFIC TOPIC (Optional)"
    Input (h44):
      placeholder "e.g. Quadratic Equations, Probability..."
      value createTestConfig.topic
      onChange: update topic

IF mode === 'topic':
  Label: "ENTER YOUR TOPIC"
  Input (h48):
    placeholder "e.g. Time and Work, Data Structures..."
    value createTestConfig.topic
    Large, prominent

  Suggested topics (flex-wrap, gap 8px, mt 8px):
    chips: ['Quadratic Equations','Probability',
            'Time & Work','Binary Trees',
            'Sorting Algorithms','Profit & Loss',
            'Comprehension','Grammar']
    Each: clickable, fills topic input

IF mode === 'jd':
  Label: "PASTE JOB DESCRIPTION"
  Textarea (minHeight 120px):
    placeholder "Paste the complete job description here.
    We will analyze requirements and generate targeted
    questions to assess your fit for this role..."
    value createTestConfig.jobDescription
    onChange: update jobDescription
    border 1.5px #E2E8F0, radius 12px, padding 12px
    font-body 14px, resize none
    Focus: border #D97706

  AI ANALYZE BUTTON (full width h44, mt 8px):
    bg linear-gradient(135deg, #D97706, #B45309)
    color white, Syne 14px weight 700
    "✨ Analyze JD & Generate Questions"
    onClick: () => setTimeout(() =>
      showToast("Analyzing JD... Generating questions! 🎯"), 0)

SECTION: DIFFICULTY (same as before)

SECTION: TIME LIMIT (same as before)

SECTION: PASS PERCENTAGE (NEW):
  Label: "PASS PERCENTAGE" 11px uppercase #94A3B8, mb 8px

  Slider-style pills:
    [40%] [50%] [60%] [70%] [80%]
    Selected: bg #D97706, color white
    Unselected: bg #F1F5F9, color #475569
    h36, padding '0 16px', radius 9999px

  "Students need to score {passPercentage}% to pass"
  font-body 12px #64748B, mt 6px

SECTION: QUESTION FORMAT BUILDER (NEW):
  "Question Format" Syne 15px weight 700, mb 4px
  "Build your question distribution" muted, mb 12px

  Total count indicator:
    "Total: {sections.filter(s=>s.enabled)
              .reduce((sum,s)=>sum+s.count,0)} questions"
    font-body 12px weight 600 #D97706, mb 8px

  5 SECTION ROWS:

    Each ROW (height 56px):
      bg white, border 1px #E2E8F0
      borderRadius 12px, padding '0 14px'
      display flex, alignItems center, gap 12px
      marginBottom 6px

      LEFT: Toggle checkbox (18px):
        checked: bg #D97706, border #D97706, white tick
        unchecked: border #CBD5E1, bg white

      Section type label (flex 1):
        font-body 13px weight 600
        enabled: #0F172A
        disabled: #94A3B8

      RIGHT: Count adjuster (only when enabled):
        display flex, alignItems center, gap 8px

        "-" button (24px circle, bg #F1F5F9):
          onClick: decrease count (min 0)
        Count: Syne 16px weight 700 #D97706, width 20px, center
        "+" button (24px circle, bg #F1F5F9):
          onClick: increase count (max 7)

        "Max 7" hint: font-body 10px #94A3B8

    SECTION TYPES:
      MCQ (default enabled, count 5)
      True/False (default enabled, count 2)
      Single Choice (default disabled, count 0)
      Short Answer (default disabled, count 0)
      Long Answer (default disabled, count 0)

    onToggle each:
      setCreateTestConfig(prev => ({
        ...prev,
        sections: prev.sections.map(s =>
          s.type === type
            ? {...s, enabled: !s.enabled}
            : s)
      }))

    onCountChange:
      Update count in sections array

ENHANCEMENT 3 — TEST TAKING IMPROVEMENTS
──────────────────────────────────────────
Find the test-taking screen.
Fill the white space in the question area:

1. Add QUESTION DIFFICULTY BADGE more prominently
   Show: "🟡 Medium Difficulty" in the card header

2. Add POINTS indicator:
   "+1 Point" badge top right of question card
   bg #F0FDF4, color #16A34A, border #86EFAC
   font-body 11px weight 700, radius 9999px, padding '2px 8px'

3. Add HINT SECTION below options:
   "💡 Need a hint?" collapsed link
   onClick: expand to show hint text
   bg #FFFBEB, border #FCD34D, radius 8px, padding 10px

4. Add TIME PRESSURE indicator when < 2 minutes:
   Red warning banner below top bar:
   bg #FEF2F2, border-bottom #FECACA
   "⚠️ Less than 2 minutes remaining!" font-body 13px #DC2626
   Only show when timeLeft < 120

5. Fill right panel empty space with:
   MOTIVATION CARD (bottom of right panel):
     bg #F0FDF4, border #86EFAC
     borderRadius 12px, padding 12px
     "You're doing great! 💪"
     Syne 13px weight 700 #16A34A
     font-body 11px #475569, mt 4px:
     "Stay focused and review flagged
      questions before submitting."

ENHANCEMENT 4 — TEST RESULT SCREEN OVERHAUL
──────────────────────────────────────────────
Replace the test-score screen content with:

Add const testScore = 74; at top of component.

SCREEN STRUCTURE:
  header (56px) + content (flex 1, overflowY auto)

CONTENT (padding '20px 24px', maxWidth 800px, margin auto):

  SCORE HERO (display flex, gap 20px, mb 16px):

    LEFT SCORE CARD (bg gradient, borderRadius 20px, padding 24px):
      bg: testScore>=75
        ? 'linear-gradient(135deg,#DCFCE7,white)'
        : 'linear-gradient(135deg,#FEF3C7,white)'
      border: testScore>=75
        ? '1px solid #86EFAC' : '1px solid #FCD34D'
      textAlign center

      Score display:
        Syne 64px weight 800
        color: testScore>=75 ? '#16A34A' : '#D97706'
        "{testScore}%"

      "Score" font-body 12px uppercase #94A3B8, mb 8px

      Pass/Fail badge:
        testScore>=60:
          bg #DCFCE7, color #16A34A "✅ PASSED"
        else:
          bg #FEF2F2, color #DC2626 "❌ FAILED"
        Syne 14px weight 700, radius 9999px, padding '4px 16px'

      Score illustration:
        testScore>=75:
          <img src="https://i.ibb.co/WpP4kMkt/score-celebration.png"
               height={80} style={{background:'transparent',
               display:'block', margin:'12px auto 0'}}/>
        else:
          <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
               height={60} style={{background:'transparent',
               display:'block', margin:'12px auto 0'}}/>

    RIGHT STATS (display flex, flexDirection column, gap 10px, flex 1):

      4 STAT CARDS (height 60px each):

        Card 1 — Accuracy:
          bg white, border 1px #E2E8F0, radius 14px
          padding '0 16px', display flex, align center
          gap 12px
          <img icons8 goal 28px/>
          "Accuracy" font-body 12px #94A3B8
          "70%" Syne 18px weight 800 #16A34A

        Card 2 — Time Taken:
          <img icons8 lightning-bolt 28px/>
          "Time Taken"
          "12 min 30s" Syne 18px weight 800 #D97706

        Card 3 — Questions:
          <img icons8 bookmark-book 28px/>
          "Total Questions"
          "10 Questions" Syne 18px weight 800 #0F172A

        Card 4 — Pass Threshold:
          <img icons8 goal 28px/>
          "Pass Threshold"
          "60% Required" Syne 18px weight 800 #BD1313

  ANSWER BREAKDOWN ROW (display flex, gap 10px, mb 16px):
    3 cards equal width

    CORRECT:
      bg #DCFCE7, border #86EFAC
      borderRadius 14px, padding '12px 16px'
      textAlign center
      "✓" font 24px #16A34A
      "7 Correct" Syne 16px weight 700 #16A34A
      "70% of total" font-body 11px #94A3B8

    WRONG:
      bg #FEF2F2, border #FECACA
      "✗" + "2 Wrong" #DC2626
      "20% of total"

    SKIPPED:
      bg #F1F5F9, border #E2E8F0
      "—" + "1 Skipped" #64748B
      "10% of total"

  RESULT SUMMARY CARD (mb 16px):
    bg white, border 1px #E2E8F0
    borderRadius 20px, padding 20px

    "Result Summary 📊" Syne 15px weight 700, mb 14px

    display grid, gridTemplateColumns '1fr 1fr', gap 10px

    6 summary rows:
      Each (display flex, justify space-between, h36,
             borderBottom '1px solid #F8FAFF'):
        Label: font-body 13px #475569
        Value: font-body 13px weight 700 #0F172A

      "Subject:" / "Mathematics"
      "Difficulty:" / "Mixed"
      "Date:" / "Mar 18, 2025"
      "Duration:" / "12 min 30s"
      "Score:" / "74% (7/10)"
      "Result:" / "✅ Passed" or "❌ Failed"

  KEY METRICS (mb 16px):
    display grid, gridTemplateColumns 'repeat(3,1fr)'
    gap 10px

    3 metric cards:
      Accuracy Rate: "70%" circular progress green
      Speed: "1.25 min/Q" lightning icon
      Difficulty: bar chart showing Easy/Med/Hard breakdown

  EVALUATION SUMMARY (mb 16px):
    display grid, gridTemplateColumns '1fr 1fr', gap 12px

    KEY STRENGTHS CARD:
      bg white, border 1px #86EFAC
      borderRadius 16px, padding 16px

      "💪 Key Strengths" Syne 14px weight 700 #16A34A, mb 10px

      List items:
        "✓ Strong arithmetic skills"
        "✓ Good speed on easy questions"
        "✓ 100% accuracy on easy difficulty"
        Each: font-body 13px #475569, display flex, gap 8px

    AREAS TO IMPROVE CARD:
      bg white, border 1px #FCD34D
      borderRadius 16px, padding 16px

      "🎯 Areas to Improve" Syne 14px weight 700 #D97706

      "⚠ Probability section needs work"
      "⚠ Hard questions: only 33% accuracy"
      "⚠ Review time management"

  SCORE VS THRESHOLD (mb 16px):
    bg white, border 1px #E2E8F0
    borderRadius 20px, padding 20px

    "Score vs Pass Threshold 📈" Syne 15px weight 700, mb 12px

    Horizontal bar comparison:
      Your Score:
        Label "Your Score" left
        Bar: full width, fill 74% #D97706
        "74%" right

      Pass Threshold:
        Label "Pass Mark" left
        Bar: fill 60% dashed #16A34A
        "60%" right

      Both bars: h12px, bg #F1F5F9, radius 9999px, mb 8px

      Result chip: "✅ You passed by 14%"
        bg #DCFCE7, color #16A34A
        font-body 13px weight 700, radius 9999px, padding '4px 14px'

  DETAILED QUESTION OVERVIEW (mb 16px):
    "Question Overview 📋" Syne 15px weight 700, mb 12px

    {sampleQuestions.slice(0,5).map((q, i) => (
      <div style={{
        bg: 'white', border: '1px solid',
        borderColor: i===0||i===2||i===4||i===6
          ? '#86EFAC' : '#FECACA',
        borderRadius: 12, padding: '12px 16px',
        marginBottom: 8,
        display: 'flex', gap: 12, alignItems: 'flex-start'
      }}>
        Status icon (20px circle):
          correct: bg #DCFCE7, "✓" #16A34A
          wrong: bg #FEF2F2, "✗" #DC2626

        Content (flex 1):
          "Q{i+1}: {q.question.slice(0,60)}..."
          font-body 13px #475569, lineHeight 1.4

        Right:
          "+1pt" if correct (bg #DCFCE7, color #16A34A)
          "0pt" if wrong (bg #FEF2F2, color #DC2626)
          font-body 11px weight 700, radius 6px, padding '2px 8px'
      </div>
    ))}

    "Review All Answers →" ghost button:
      color #D97706, font-body 13px weight 600
      cursor pointer
      onClick: () => setScreen('tests-answers')

=============================================================
SECTION 5 — AI INTERVIEW ENHANCEMENTS
=============================================================

ENHANCEMENT 1 — STAT CARD NAMES
──────────────────────────────────
Find the 4 stat cards on Interview home screen.
Each MUST show clear label name below value:
  "SESSIONS"
  "AVG SCORE"
  "QUESTIONS"
  "BEST SCORE"

ENHANCEMENT 2 — INTERVIEW SETUP OVERHAUL
──────────────────────────────────────────
Add these enhancements to interview-setup screen:

ADD MODE SELECTOR (same as test):
  3 cards:
  "🎭 Standard Interview" — predefined questions
  "💼 JD Based" — paste job description
  "📄 Resume Based" — AI interviews from resume

  const [interviewMode, setInterviewMode] = useState('standard');

IF mode === 'jd':
  "PASTE JOB DESCRIPTION" textarea (minHeight 120px):
    placeholder "Paste the job description here.
    Aria will ask questions specific to this role
    and assess your fit based on requirements..."
    bg white, border 1.5px #E2E8F0, radius 12px
    padding 12px, font-body 14px

  AI button: "✨ Generate from JD"
    onClick: () => setTimeout(() =>
      showToast("Analyzing JD... Aria is ready! 🎯"), 0)

IF mode === 'resume':
  RESUME SELECTOR:
    "SELECT RESUME" label 11px uppercase #94A3B8, mb 8px

    2 options:
      Option 1 — Use Existing:
        bg white, border 1.5px #E2E8F0
        borderRadius 12px, padding 14px 16px
        display flex, gap 10px, align center
        cursor pointer, mb 8px
        hover: border #16A34A

        FileText icon 20px #16A34A + content:
          "Use Saved Resume" font-body 14px weight 600
          "Software Engineer Resume · 68%" muted 12px

        SELECTED: border 2px #16A34A, bg #F0FDF4

      Option 2 — Upload New:
        Same structure
        Upload icon + "Upload New Resume"
        "PDF or DOC, max 5MB" muted
        onClick: () => setTimeout(() =>
          showToast("File upload coming soon!"), 0)

ADD DIFFICULTY LEVEL:
  Same as test creation, below experience level:
  "INTERVIEW DIFFICULTY" label
  Pills: [Beginner] [Intermediate] [Advanced]
    Beginner: bg #DCFCE7 color #16A34A when selected
    Intermediate: bg #FEF3C7 color #D97706
    Advanced: bg #FEF2F2 color #DC2626

ENHANCEMENT 3 — INTERVIEW SESSION CAMERA VIEW
────────────────────────────────────────────────
Replace the interview-session screen with:
Google Meet style layout.

FULL HEIGHT, 2 panels:
  LEFT (flex 1): Question + Answer area (same as before)
  RIGHT (300px): Camera + sidebar

RIGHT PANEL camera redesign:
  TOP — CAMERA VIEW:
    height 200px, bg #0F172A
    borderRadius 16px, overflow hidden
    position relative, mb 12px

    Camera placeholder (full size):
      bg linear-gradient(135deg, #1E293B, #0F172A)
      display flex, flexDirection column
      alignItems center, justifyContent center

      Camera icon (lucide) 40px rgba(255,255,255,0.3)
      "Camera Preview" font-body 13px rgba(255,255,255,0.5), mt 8px
      "Click to enable camera" font-body 11px rgba(255,255,255,0.3)

    CAMERA CONTROLS (absolute bottom, full width):
      bg rgba(0,0,0,0.5), padding '8px 12px'
      display flex, justifyContent center, gap 12px

      Each control (32px circle, bg rgba(255,255,255,0.15)):
        Mic icon: white (active) or red (muted)
        Video icon: white (active) or red (disabled)
        Each toggleable on click

    USER LABEL (absolute top-left):
      "📹 You" bg rgba(0,0,0,0.5) white
      font-body 10px weight 600, radius 6px, padding '2px 8px'

  LIVE TRANSCRIPT (below camera):
    bg white, border 1px #E2E8F0
    borderRadius 16px, padding 14px
    maxHeight 180px, overflowY auto

    HEADER:
      "🎙️ Live Transcript"
      font-body 12px weight 700 #0F172A
      "Listening..." font-body 10px #16A34A
        animation pulse 2s infinite

    TRANSCRIPT MESSAGES:
      Show mock transcript messages:

      const transcriptMessages = [
        {speaker:'Aria', text:'Tell me about yourself.',
         time:'0:05'},
        {speaker:'You', text:'I am Rahul Sharma, a final
          year B.Tech CS student from VIT Vellore...',
          time:'0:15'},
        {speaker:'Aria', text:'Great! What are your greatest strengths?',
          time:'1:02'}
      ];

      {transcriptMessages.map(msg => (
        <div style={{marginBottom:8}}>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:10, fontWeight:700,
            color: msg.speaker==='Aria'
              ? '#16A34A' : '#BD1313',
            marginBottom:2
          }}>{msg.speaker} · {msg.time}</div>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:12, color:'#475569',
            lineHeight:1.5
          }}>{msg.text}</div>
        </div>
      ))}

      "● Recording..." at bottom:
        font-body 10px #DC2626 weight 600
        display flex, gap 4px, align center
        animation pulse 1.5s infinite

ENHANCEMENT 4 — INTERVIEW COMPLETE SCREEN
───────────────────────────────────────────
Make the score display bigger and better:

Replace the score "82%" display with:

HERO SECTION:
  bg linear-gradient(135deg, #F0FDF4, white)
  border 1px #86EFAC, borderRadius 24px
  padding 32px, textAlign center, mb 20px

  <img src="https://i.ibb.co/WNN9RBHX/interview-session.png"
       height={120} style={{background:'transparent',
       display:'block', margin:'0 auto 16px'}}/>

  "Interview Complete! 🎉"
  Syne 28px weight 800 #0F172A, mb 4px

  Score display (large):
    Syne 72px weight 800
    color #16A34A (>=75) or #D97706 (<75)
    "82%"
    lineHeight 1

  "Overall Score" font-body 14px #94A3B8, mb 16px

  4 quick stats row (display flex, gap 16px, justify center):
    Each (textAlign center):
      Value: Syne 20px weight 700 #0F172A
      Label: font-body 11px #94A3B8

      "7" / "Questions"
      "18m" / "Duration"
      "4/7" / "Full Marks"
      "82%" / "Score"

ENHANCEMENT 5 — FULL INTERVIEW REPORT
────────────────────────────────────────
Replace interview-feedback screen content with
a comprehensive analysis report.

REPORT SECTIONS (in order, all collapsible):

Each section has header (always visible) +
body (expandable, default: first 3 open, rest closed)

Add state:
const [reportSections, setReportSections] = useState({
  overview: true,
  scores: true,
  feedback: true,
  video: false,
  facial: false,
  communication: false,
  questions: false
});

const toggleReport = (key) => setReportSections(
  prev => ({...prev, [key]: !prev[key]}));

── SECTION 1: OVERVIEW (open by default) ──────────────────

Header: "📊 Performance Overview"

Content:
  display grid, gridTemplateColumns '1fr 1fr', gap 12px

  4 BIG METRIC CARDS:
    Avg Score: "82%" bg #F0FDF4
    Questions: "7 asked / 7 answered" bg #EFF6FF
    Strong Answers: "4/7" bg #DCFCE7
    Needs Review: "3/7" bg #FEF3C7

── SECTION 2: SCORE BREAKDOWN (open) ──────────────────────

Header: "📈 Score by Question"

Content:
  {sessionFeedback.questionScores.map((item, i) => (
    Row (h44, display flex, align center, gap 12px,
          borderBottom '1px solid #F8FAFF'):
      Circle "Q{i+1}" (24px, bg #F0FDF4, green)
      Question text (flex 1, truncated)
      Mini bar (80px): fill item.score%
      Score: Syne 15px weight 800 colored
  ))}

  Chart (Recharts BarChart):
    7 bars, each Q score
    color #16A34A if >=80, #D97706 if >=60, #DC2626 if <60
    height 120px

── SECTION 3: OVERALL FEEDBACK (open) ─────────────────────

Header: "💬 Aria's Feedback"

Content:
  3 category cards (display grid, 3 cols, gap 10px, mb 14px):

    KEY STRENGTHS:
      bg #F0FDF4, border #86EFAC, radius 14px, padding 14px
      "💪 Key Strengths" Syne 13px weight 700 #16A34A, mb 8px
      List: 3 strength items
        Each: "✓" + text, font-body 12px #475569

    AREAS OF IMPROVEMENT:
      bg #FFFBEB, border #FCD34D
      "🎯 To Improve" #D97706
      List: 3 items with "→"

    AREAS OF CONCERN:
      bg #FEF2F2, border #FECACA
      "⚠️ Concerns" #DC2626
      List: 2 items with "!"

  AREAS OF EXPERTISE (below, full width):
    bg #EFF6FF, border #BFDBFE
    borderRadius 14px, padding 14px
    "🌟 Areas of Expertise" Syne 13px weight 700 #2563EB, mb 8px
    flex-wrap chips:
      "HR Communication" "Problem Framing" "Self Awareness"
      Each: bg white, border #BFDBFE, radius 9999px
        font-body 11px weight 600 #2563EB, padding '3px 10px'

── SECTION 4: VIDEO ANALYSIS (collapsed) ──────────────────

Header: "🎥 Video Presentation Analysis"

Content:
  NOTE BANNER (mb 12px):
    bg #FFFBEB, border #FCD34D, radius 10px, padding 10px 14px
    "📹 Video analysis is based on your recorded session.
     Enable camera in future sessions for full analysis."
    font-body 12px #D97706

  OVERALL CONFIDENCE SCORE:
    Large display: "7.2 / 10"
    Syne 36px weight 800 #D97706, textAlign center, mb 16px
    "Confidence Score" font-body 13px #94A3B8

    Circular progress large (size 100):
      value 72, stroke #D97706

  CONFIDENCE ASSESSMENT GRID:
    display grid, gridTemplateColumns '1fr 1fr', gap 10px, mb 14px

    const confidenceMetrics = [
      {label:'Body & Posture', score:8.1,
       observation:'Upright posture maintained throughout'},
      {label:'Voice Tone', score:7.5,
       observation:'Clear and steady, slight nervousness noted'},
      {label:'Confidence Level', score:6.8,
       observation:'Good overall, hesitation on technical Q'},
      {label:'Overall Assessment', score:7.2,
       observation:'Above average for a fresher candidate'}
    ];

    {confidenceMetrics.map(metric => (
      <div style={{
        bg:'white', border:'1px solid #E2E8F0',
        borderRadius:12, padding:12
      }}>
        "{metric.label}"
        font-body 12px weight 700 #0F172A, mb 4px
        Score: Syne 20px weight 800 #D97706
          "{metric.score}/10"
        Observation: font-body 11px #94A3B8, mt 4px
          italic, "{metric.observation}"
      </div>
    ))}

── SECTION 5: FACIAL EXPRESSION (collapsed) ────────────────

Header: "😊 Facial Expression Analysis"

Content:
  const facialMetrics = [
    {label:'Emotional Consistency',
     score:82, color:'#16A34A',
     observation:'Expressions aligned with speech content'},
    {label:'Warmth & Approachability',
     score:75, color:'#D97706',
     observation:'Friendly demeanor, slight tension noted'},
    {label:'Eye Contact & Camera Engagement',
     score:68, color:'#D97706',
     observation:'Moderate eye contact, can be improved'},
    {label:'Gaze Pattern',
     score:71, color:'#D97706',
     observation:'Occasional looking away when thinking'}
  ];

  {facialMetrics.map(metric => (
    Row (h56, display flex, align center, gap 14px,
          borderBottom '1px solid #F8FAFF'):
      Label (flex 1): font-body 13px weight 500 #475569
      Progress bar (120px, h6px):
        fill metric.score%, color metric.color
      Score: Syne 14px weight 700 metric.color
        "{metric.score}%"
  ))}

  Observations card (bg #F8FAFF, radius 12px, padding 12px, mt 10px):
    "Key Observations" font-body 12px weight 700 #0F172A, mb 6px
    "• Maintain consistent eye contact with camera lens"
    "• Practice neutral expressions during pauses"
    "• Smile naturally when discussing achievements"
    Each: font-body 12px #475569, mb 4px

── SECTION 6: COMMUNICATION (collapsed) ───────────────────

Header: "🗣️ Communication Quality"

Content:
  const commMetrics = [
    {label:'Clarity of Speech',
     score:85, color:'#16A34A',
     detail:'Clear articulation, easy to understand'},
    {label:'Pace & Rhythm',
     score:72, color:'#D97706',
     detail:'Slightly fast at times, good overall'},
    {label:'Filler Words',
     score:65, color:'#D97706',
     detail:'12 instances of "um/uh" detected'},
    {label:'Articulation',
     score:80, color:'#16A34A',
     detail:'Well-structured sentences throughout'}
  ];

  Circular progress for each (display grid, 4 cols):
    Each: CircularProgress size=60, value=score
      color metric.color
    Label below: font-body 10px #475569, textAlign center

  FILLER WORDS DETAIL (mt 12px):
    bg #FFFBEB, border #FCD34D, radius 12px, padding 12px
    "Filler Words Detected" font-body 12px weight 700, mb 6px
    Chips: "um (5x)" "uh (4x)" "like (3x)"
      bg #FEF3C7, color #D97706, radius 9999px
      font-body 11px weight 700, padding '3px 10px', gap 6px

  VIDEO TIPS CARDS (mt 12px):
    display grid, gridTemplateColumns '1fr 1fr', gap 8px

    STRENGTHS:
      bg #F0FDF4, border #86EFAC, radius 12px, padding 12px
      "✅ Video Strengths" font-body 12px weight 700 #16A34A, mb 6px
      "• Clear pronunciation throughout"
      "• Good response structure"
      Each: font-body 11px #475569

    TO IMPROVE:
      bg #FFFBEB, border #FCD34D, radius 12px, padding 12px
      "🎯 Improve" font-body 12px weight 700 #D97706, mb 6px
      "• Reduce filler words"
      "• Maintain consistent pace"

    ACTIONABLE TIPS (full width, col-span 2):
      bg #EFF6FF, border #BFDBFE, radius 12px, padding 12px
      "💡 Actionable Tips" font-body 12px weight 700 #2563EB, mb 6px
      "1. Practice recording yourself daily for 5 minutes"
      "2. Use pause instead of filler words"
      "3. Read out loud to improve articulation"
      Each: font-body 11px #475569, mb 4px

── SECTION 7: QUESTION REVIEW (collapsed) ──────────────────

Header: "❓ Question by Question Review"

Content:
  {sessionFeedback.questionScores.map((item, i) => (
    <div style={{
      bg:'white', border:'1px solid',
      borderColor: item.score>=80 ? '#86EFAC' : '#FCD34D',
      borderRadius:14, padding:16, marginBottom:10
    }}>
      HEADER ROW (display flex, justify space-between, mb 10px):
        "Q{i+1}: {hrQuestions[i]?.category}"
          font-body 12px weight 700
          bg #F0FDF4, color #16A34A
          radius 9999px, padding '2px 10px'
        Score: Syne 16px weight 800
          color: score>=80 ? '#16A34A' : '#D97706'
          "{item.score}%"

      Question text:
        font-body 13px weight 600 #0F172A, mb 8px
        "{hrQuestions[i]?.question}"

      YOUR ANSWER (bg #FAFAFA, radius 8px, padding 10px, mb 8px):
        "Your Answer:" font-body 11px uppercase #94A3B8, mb 4px
        font-body 13px #475569 lineHeight 1.5
        "I am Rahul Sharma, a final year B.Tech CS
         student specializing in web development..."

      ARIA FEEDBACK:
        bg: score>=80 ? '#F0FDF4' : '#FFFBEB'
        border: score>=80 ? '1px solid #86EFAC' : '1px solid #FCD34D'
        borderRadius 8px, padding 10px
        display flex, gap 8px, align flex-start

        <img src aria avatar 24px circular/>
        font-body 12px color #475569 lineHeight 1.5
        score>=80:
          "Excellent answer! Well-structured and specific."
        else:
          "Good attempt. Try to add specific examples next time."
    </div>
  ))}

── RECOMMENDED NEXT STEPS (always visible at bottom) ────────

"Recommended Next Steps 🚀"
Syne 15px weight 700, mb 12px

3 step cards (same as before with navigation)

ACTION BUTTONS ROW (display flex, gap 10px):
  "Practice Again" primary #16A34A
  "Download Report" secondary border #86EFAC
  "Share" ghost

=============================================================
SECTION 6 — XP STORE (NEW SCREEN)
=============================================================

Add new screen: 'xp-store'

Add navigation:
  From XP modal "View Full Store →" → setScreen('xp-store')
  From Profile XP card "Visit Store →" → setScreen('xp-store')

screen: 'xp-store'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  bg white, borderBottom '1px solid #E2E8F0'
  padding '0 24px'
  display flex, alignItems center, gap 12px

  Back: ChevronLeft → setScreen('dashboard')
  "XP Store 🛍️" Syne 20px weight 700 #0F172A
  "Spend your XP on exclusive rewards" muted right

  XP BALANCE PILL (right):
    bg linear-gradient(135deg, #D97706, #B45309)
    color white, radius 9999px
    padding '6px 16px'
    "⚡ 2,400 XP Available"
    font-body 13px weight 700

CONTENT (flex 1, overflowY auto, padding '20px 24px'):

  const [xpBalance, setXpBalance] = useState(2400);
  const [purchasedItems, setPurchasedItems] =
    useState([]);

  const xpStoreItems = [
    {id:'shield', category:'Protection',
     name:'Streak Shield 🛡️',
     desc:'Protect your daily streak once — miss a day without losing it',
     cost:500, icon:'https://img.icons8.com/3d-fluency/100/shield.png',
     color:'#2563EB', bg:'#EFF6FF', popular:false},
    {id:'template', category:'Resume',
     name:'Premium Template ✨',
     desc:'Unlock exclusive Executive resume template',
     cost:800, icon:'https://img.icons8.com/3d-fluency/100/resume.png',
     color:'#7C3AED', bg:'#FAF5FF', popular:true},
    {id:'ai-token', category:'AI',
     name:'AI Feedback Token 🤖',
     desc:'Get extra AI-powered feedback on your interview answers',
     cost:300, icon:'https://img.icons8.com/3d-fluency/100/artificial-intelligence.png',
     color:'#16A34A', bg:'#F0FDF4', popular:false},
    {id:'expert', category:'Network',
     name:'Expert Session Discount 👥',
     desc:'20% off your next expert mentorship session',
     cost:1000, icon:'https://img.icons8.com/3d-fluency/100/conference-call.png',
     color:'#D97706', bg:'#FFFBEB', popular:true},
    {id:'badge-frame', category:'Profile',
     name:'Gold Profile Frame 🥇',
     desc:'Show off a premium gold frame around your profile avatar',
     cost:400, icon:'https://img.icons8.com/3d-fluency/100/medal.png',
     color:'#D97706', bg:'#FEFCE8', popular:false},
    {id:'xp-boost', category:'XP',
     name:'XP Boost Rocket 🚀',
     desc:'Double XP earned for the next 24 hours',
     cost:600, icon:'https://img.icons8.com/3d-fluency/100/rocket.png',
     color:'#BD1313', bg:'#FFF1F2', popular:false},
    {id:'dark-theme', category:'Appearance',
     name:'Dark Pro Theme 🌙',
     desc:'Unlock premium dark theme with custom accent colors',
     cost:700, icon:'https://img.icons8.com/3d-fluency/100/crescent-moon.png',
     color:'#475569', bg:'#F8FAFF', popular:false},
    {id:'certificate', category:'Achievement',
     name:'Course Certificate 🎓',
     desc:'Generate a shareable certificate of completion',
     cost:1200, icon:'https://img.icons8.com/3d-fluency/100/certificate.png',
     color:'#BD1313', bg:'#FFF1F2', popular:true},
    {id:'study-pack', category:'Study',
     name:'Study Material Pack 📚',
     desc:'Access premium aptitude and reasoning study guides',
     cost:900, icon:'https://img.icons8.com/3d-fluency/100/book.png',
     color:'#2563EB', bg:'#EFF6FF', popular:false}
  ];

  BALANCE CARD (mb 20px):
    bg linear-gradient(135deg, #FFFBEB, #FEF3C7)
    border '#FCD34D', borderRadius 20px, padding 20px
    display flex, alignItems center, gap 16px

    <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png"
         width={48} height={48}
         style={{background:'transparent'}}/>

    LEFT:
      "Your XP Balance" font-body 11px uppercase #D97706, mb 4px
      "{xpBalance.toLocaleString()} XP"
        Syne 32px weight 800 #D97706

    RIGHT (ml auto):
      "How to earn more →" ghost link #D97706 12px
        onClick: () => setShowXPModal(true)

  CATEGORIES FILTER (display flex, gap 8px, mb 16px, flexWrap wrap):
    const [storeFilter, setStoreFilter] = useState('All');
    const categories = ['All','Protection','Resume',
      'AI','Network','Profile','XP','Appearance',
      'Achievement','Study'];

    {categories.map(cat => (
      <div onClick={() => setStoreFilter(cat)}
        style={{
          height:32, padding:'0 14px',
          borderRadius:9999, cursor:'pointer',
          fontFamily:'var(--font-body)',
          fontSize:12, fontWeight:600,
          background: storeFilter===cat ? '#BD1313' : '#F1F5F9',
          color: storeFilter===cat ? 'white' : '#475569',
          transition:'all 0.2s',
          display:'flex', alignItems:'center'
        }}>
        {cat}
      </div>
    ))}

  STORE GRID:
    const filteredItems = storeFilter==='All'
      ? xpStoreItems
      : xpStoreItems.filter(i => i.category===storeFilter);

    display grid, gridTemplateColumns 'repeat(3,1fr)', gap 14px

    {filteredItems.map(item => (
      <div style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: 20, padding: 20,
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter: translateY(-4px) + shadow
      >
        {item.popular && (
          POPULAR BADGE (absolute top-right):
            bg #D97706, color white
            font-body 10px weight 700
            radius 0 20px 0 12px, padding '4px 12px'
            "⭐ Popular"
        )}

        {purchasedItems.includes(item.id) && (
          OWNED BADGE (absolute top-left):
            bg #DCFCE7, color #16A34A
            font-body 10px weight 700
            radius 20px 0 12px 0, padding '4px 12px'
            "✓ Owned"
        )}

        TOP (display flex, gap 12px, mb 14px):
          Icon circle (52px, bg item.bg, radius 16px):
            <img src={item.icon} width={30} height={30}
                 style={{background:'transparent'}}/>

          RIGHT:
            Category: font-body 10px uppercase #94A3B8
              "{item.category}"
            Name: font-body 15px weight 700 #0F172A, mt 2px

        Description:
          font-body 13px #64748B lineHeight 1.5, mb 14px

        BOTTOM (display flex, justify space-between, align center):
          COST DISPLAY:
            <img src lightning-bolt 16px/>
            "{item.cost.toLocaleString()} XP"
            font-body 13px weight 700 #D97706
            display flex, gap 4px, align center

          PURCHASE BUTTON:
            IF owned:
              bg #DCFCE7, color #16A34A, border none
              "✓ Owned", cursor default

            ELSE IF can afford (xpBalance >= item.cost):
              bg item.color, color white, border none
              "Get Now →"
              cursor pointer
              onClick: () => {
                setXpBalance(prev => prev - item.cost);
                setPurchasedItems(prev => [...prev, item.id]);
                setTimeout(() => showToast(
                  item.name + " purchased! 🎉"), 0);
                setTimeout(() => showXPToast(
                  "-" + item.cost + " XP"), 200);
              }

            ELSE (can't afford):
              bg #F1F5F9, color #94A3B8, border none
              "Need more XP"
              cursor not-allowed

            h36, padding '0 14px', radius 9999px
            font-body 13px weight 600

      </div>
    ))}

  EARN MORE XP SECTION (mt 24px):
    bg linear-gradient(135deg, #FFF1F2, white)
    border #F5BFBF, borderRadius 20px, padding 20px
    display flex, alignItems center, gap 16px

    <img src="https://img.icons8.com/3d-fluency/100/rocket.png"
         width={60} height={60}
         style={{background:'transparent'}}/>

    Content (flex 1):
      "Need more XP? 🚀"
      Syne 18px weight 700 #0F172A, mb 4px
      "Complete tests, interviews and daily tasks to earn XP"
      font-body 13px #64748B, mb 12px

      display flex, gap 10px:
        "Take a Test +50 XP" → setScreen('tests')
        "Do Interview +75 XP" → setScreen('interview')
        Each: primary/secondary button h40

=============================================================
TOAST TRIGGERS FOR NEW FEATURES
=============================================================

All wrapped in setTimeout(..., 0):

XP modal open:
  No toast needed

XP Store purchase success:
  showToast(item.name + " purchased! 🎉")
  showXPToast("-" + cost + " XP")

XP Store insufficient:
  showToast("Need " + (cost - balance) + " more XP!")

Widget expand/collapse:
  No toast needed

Resume save/done:
  showToast("Resume saved! 🎉")
  showXPToast("+30 XP 🎉")

Test result viewed:
  testScore >= 75:
    showToast("Amazing score! 🎉")
    showXPToast("+100 XP Bonus! 🎉")
  else:
    showToast("Good effort! Review answers 💪")
    showXPToast("+50 XP 🎉")

Interview report opened:
  showToast("Full report ready 📊")

=============================================================
CRITICAL REMINDERS
=============================================================

✅ ALL showToast wrapped in setTimeout(..., 0)
✅ Remove ALL floating animations from illustrations
✅ Remove ALL card noise texture globally
✅ Remove ALL image white backgrounds
✅ Dashboard overflowY: auto (not hidden)
✅ Achievements badges properly sized (48px icons)
✅ XP pill clickable → XP modal
✅ XP modal has store preview + how to earn
✅ XP Store is a full separate screen
✅ Collapsible widgets in dashboard right column
✅ New widgets: quote, countdown, focus
✅ Resume recent files on home
✅ Resume save → navigate to resume home
✅ Test stat cards have text labels
✅ Create test has JD mode + topic + format builder
✅ Test result has full breakdown
✅ Interview stat cards have text labels
✅ Interview setup has JD + resume upload
✅ Interview session has camera view + transcript
✅ Interview complete has large score display
✅ Interview report has all 7 sections
✅ All sections collapsible
✅ XP store functional with balance deduction
✅ Purchase button disabled when insufficient XP
✅ Owned items show "✓ Owned" state
✅ No full page scroll broken
✅ Device frame maintained
✅ Brand colors maintained

=============================================================
BUILD ORDER
=============================================================

1. Global fixes (animations, noise, bg)
2. Dashboard fixes (layout, achievements,
   collapsible widgets, new widgets)
3. XP modal + XP pill click
4. Resume enhancements (recent files, final screen)
5. Test enhancements (stat labels, create overhaul,
   result screen)
6. Interview enhancements (stat labels, setup overhaul,
   camera session, complete screen, full report)
7. XP Store screen (new)
8. Wire all navigation
9. All toasts with setTimeout

DO NOT rebuild any working screen from scratch.
ONLY fix and enhance as specified above.
=============================================================