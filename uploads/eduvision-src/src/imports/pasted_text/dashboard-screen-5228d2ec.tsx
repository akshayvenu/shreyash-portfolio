Continue building EduVision.
Read system guidelines fully before writing any code.
Do NOT rebuild Step 1 or Step 2 screens.
Only ADD the Dashboard screen.
All existing screens must remain intact.

=============================================================
STEP 3 — DASHBOARD
=============================================================

Build the complete EduVision Dashboard.
This is the most important screen in the app.
It must feel like a premium BI analytics dashboard
but warm, colorful and student-friendly.

Think: Duolingo + Notion + BI Dashboard energy.
NOT corporate, NOT grey, NOT boring.

Update navigation:
  'plan-ready' → "Go to My Dashboard" → 'dashboard'
  'login' → "Login" → 'dashboard'
  Replace placeholder dashboard content with full dashboard

=============================================================
MOCK DATA — ADD ALL OF THIS AT TOP OF FILE
=============================================================

const scoreHistory = [
  {test:"T1", score:62, date:"Mar 10"},
  {test:"T2", score:58, date:"Mar 11"},
  {test:"T3", score:71, date:"Mar 12"},
  {test:"T4", score:68, date:"Mar 13"},
  {test:"T5", score:74, date:"Mar 15"},
  {test:"T6", score:79, date:"Mar 17"},
  {test:"T7", score:74, date:"Mar 18"}
];

const scoreAverage = scoreHistory.map(s => ({
  ...s, average: 74
}));

const subjectPerformance = [
  {subject:"Mathematics", short:"Mth", score:79},
  {subject:"English", short:"Eng", score:88},
  {subject:"Science", short:"Sci", score:65},
  {subject:"Aptitude", short:"Apt", score:52},
  {subject:"Programming", short:"Pro", score:71}
];

const leaderboard = [
  {rank:1, name:"Priya M.", avatar:"PM", score:94, isUser:false},
  {rank:2, name:"Arjun K.", avatar:"AK", score:91, isUser:false},
  {rank:3, name:"Rahul S.", avatar:"RS", score:88, isUser:true}
];

const recentActivity = [
  {icon:"📝", iconBg:"#FFF1F2", title:"Completed Math Test",
   time:"2h ago", badge:"74%", badgeVariant:"warning"},
  {icon:"📄", iconBg:"#FFFBEB", title:"Updated Resume Skills",
   time:"Yesterday", badge:"68%", badgeVariant:"primary"},
  {icon:"🎤", iconBg:"#F0FDF4", title:"AI Interview Session",
   time:"2 days ago", badge:"Practice", badgeVariant:"neutral"},
  {icon:"🏅", iconBg:"#FEFCE8", title:"Badge Unlocked!",
   time:"3 days ago", badge:"New 🏅", badgeVariant:"warning"},
  {icon:"📊", iconBg:"#F0FDF4", title:"Score Report Reviewed",
   time:"4 days ago", badge:"Done", badgeVariant:"success"}
];

const motivationalTips = [
  "Students who practice daily score 40% better 📈",
  "Your resume is 68% complete — finish it today! 🚀",
  "Practice 1 interview today to build confidence ⭐",
  "92 days to placement — you've got this! 💪",
  "Top performers practice tests 5x per week 🎯",
  "Consistency beats intensity — practice daily 🔥",
  "Every test you take builds your confidence 🎓",
  "30 mins today = better placement odds tomorrow ⚡"
];

const todaysTasks = [
  {id:1, text:"Complete Resume Skills section",
   priority:"high", time:"15 min", done:false},
  {id:2, text:"Take 1 Practice Test — Mathematics",
   priority:"medium", time:"30 min", done:false},
  {id:3, text:"Review yesterday's test report",
   priority:"low", time:"15 min", done:true},
  {id:4, text:"Practice HR Interview session",
   priority:"low", time:"20 min", done:false}
];

const skillGaps = [
  "System Design",
  "Data Structures & Algorithms",
  "AWS / Cloud Basics",
  "TypeScript"
];

const resumeSections = [
  {label:"Personal Info", value:100},
  {label:"Education", value:100},
  {label:"Experience", value:100},
  {label:"Skills", value:60},
  {label:"Projects", value:40},
  {label:"Summary", value:0}
];

=============================================================
DASHBOARD SCREEN
=============================================================

screen: 'dashboard'
animation: screenEnter 280ms ease-out both on mount

Uses the App Shell from Step 1:
  Sidebar (64px, always visible)
  Top bar (56px)
  Main content area (calc 100vh - 56px)

Active sidebar item: LayoutDashboard → #BD1313

Top bar left title: "Dashboard"

MAIN CONTENT AREA:
  height: calc(100vh - 56px)
  overflow: hidden
  background: #FAFAFA
  background-image: url('https://i.ibb.co/GQM6xx2F/dot-grid-light.png')
  background-repeat: repeat
  background-size: 40px 40px
  display: flex, flex-direction: column
  padding: 20px 24px
  gap: 14px

=============================================================
SECTION 1 — HERO ROW (height 140px, flex-shrink 0)
=============================================================

display: grid
grid-template-columns: 1.5fr 1fr 1fr
gap: 14px
height: 140px
flex-shrink: 0

── HERO WELCOME CARD ────────────────────────────────────────

background: linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)
border-radius: 20px
padding: 20px 24px
position: relative
overflow: hidden
cursor: default

Background texture overlay:
  position absolute, inset 0
  background-image: url('https://i.ibb.co/GQM6xx2F/dot-grid-light.png')
  background-repeat: repeat
  background-size: 40px 40px
  opacity: 0.06

Background circle decorations:
  Circle 1: position absolute, top -30px, right -30px
    width 180px, height 180px, border-radius 50%
    background rgba(255,255,255,0.05)
  Circle 2: position absolute, bottom -20px, left -20px
    width 120px, height 120px, border-radius 50%
    background rgba(255,255,255,0.04)

Content (position relative, z-index 1):
  LEFT content (flex col, justify center):

    Greeting row:
      "Good morning, Rahul 👋"
      font-family: var(--font-display)
      font-size: 22px, font-weight: 800
      color: white, margin-bottom: 4px

    Subtitle:
      "Tuesday, 18 March · "
      <span style="color: rgba(255,255,255,0.7)">
        92 days to placement season 🎯
      </span>
      Plus Jakarta Sans 13px rgba(255,255,255,0.75)
      margin-bottom: 12px

    Pills row (gap 8px):
      Pill 1: "🔥 7 Day Streak"
        bg rgba(255,255,255,0.15)
        border 1px rgba(255,255,255,0.25)
        color white, 11px weight 600
        radius 9999px, padding 5px 12px

      Pill 2: "📅 Mar 18, 2025"
        same style

RIGHT content (position absolute, right 16px, bottom 0):
  Dashboard abstract illustration:
  <img src="https://i.ibb.co/0jsxwDhQ/dashboard-abstract.png"
       height="130"
       style="filter: drop-shadow(0 8px 24px rgba(0,0,0,0.25));
              animation: float 3s ease-in-out infinite;
              object-fit: contain"/>

  Small floating elements around illustration:
    Star icon (24px, opacity 0.8):
      <img src="https://img.icons8.com/3d-fluency/100/star.png"
           width="24"
           style="position:absolute; top:10px; right:140px;
                  animation: float 2.5s ease-in-out infinite;
                  animationDelay: 0.5s;
                  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2))"/>

    Lightning bolt (20px):
      <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png"
           width="20"
           style="position:absolute; bottom:20px; right:150px;
                  animation: float 3.5s ease-in-out infinite;
                  animationDelay: 1s"/>

── XP CARD ──────────────────────────────────────────────────

background: linear-gradient(135deg, #FFFBEB, #FEF3C7)
border: 1px solid #FCD34D
border-radius: 20px
padding: 18px 20px
position: relative
overflow: hidden

Noise texture overlay:
  position absolute, inset 0, pointer-events none
  background-image: url('https://i.ibb.co/XZDscnRB/card-noise.png')
  background-repeat: repeat, background-size: 200px 200px
  opacity: 0.4, border-radius: inherit

Medal illustration (top right, absolute):
  <img src="https://img.icons8.com/3d-fluency/100/medal.png"
       width="56"
       style="position:absolute; top:-8px; right:12px;
              filter: drop-shadow(0 4px 12px rgba(217,119,6,0.3));
              animation: float 3s ease-in-out infinite"/>

Content:
  Label: "⚡ XP POINTS"
  Plus Jakarta Sans 10px weight 600 #D97706
  UPPERCASE letter-spacing 0.8px
  margin-bottom: 4px

  Value: "2,400"
  font-family: var(--font-display)
  font-size: 28px, font-weight: 800, color: #D97706
  
  Level badge:
    "🔥 Hustler · Lv.3"
    bg #D97706, color white
    Plus Jakarta Sans 11px weight 700
    border-radius: 9999px, padding: 3px 10px
    display: inline-block, margin-top: 4px

  Progress section (margin-top: 10px):
    "600 XP to Elite"
    Plus Jakarta Sans 10px #B45309, margin-bottom: 4px
    
    Progress bar:
      height: 4px, bg rgba(217,119,6,0.2)
      border-radius: 9999px, overflow: hidden
      
      Fill (80% = 2400/3000):
        width: 80%, height: 100%
        bg: #D97706, border-radius: 9999px
        transition: width 0.8s ease-out

── PROFILE CARD ─────────────────────────────────────────────

background: white
border: 1px solid #E2E8F0
border-radius: 20px
padding: 18px 20px
box-shadow: 0 2px 8px rgba(0,0,0,0.06)

TOP ROW (display flex, gap 12px, align-items center):
  Avatar circle (48px):
    width: 48px, height: 48px, border-radius: 50%
    background: linear-gradient(135deg, #BD1313, #7A0D0D)
    color: white
    font-family: var(--font-display)
    font-size: 18px, font-weight: 800
    display flex, align-items center, justify-content center
    border: 3px solid white
    box-shadow: 0 4px 12px rgba(189,19,19,0.3)
    "RS"

  Right content:
    Name: "Rahul Sharma"
    Plus Jakarta Sans 15px weight 700 #0F172A
    
    College: "VIT Vellore · Final Year"
    Plus Jakarta Sans 11px #94A3B8
    margin-top: 2px
    
    Badge: "🎯 SWE Track"
    bg #FDF2F2, color #BD1313, border #F5BFBF
    11px weight 600, radius 9999px
    padding 3px 10px, margin-top: 4px
    display inline-block

STATS ROW (margin-top 14px):
  display: grid, grid-template-columns: 1fr 1fr 1fr
  gap: 0, border-top: 1px solid #F1F5F9
  padding-top: 12px

  Each stat (text-align center):
    Value: Syne 18px weight 800 #0F172A
    Label: Plus Jakarta Sans 10px #94A3B8 uppercase

    Dividers between stats:
      border-right: 1px solid #F1F5F9 on first two

  Stat 1: "12" / "TESTS"
  Stat 2: "3" / "SESSIONS"
  Stat 3: "8" / "SKILLS"

=============================================================
SECTION 2 — ACTION CARDS ROW (height 100px, flex-shrink 0)
=============================================================

display: grid
grid-template-columns: 1fr 1fr 1fr
gap: 14px
height: 100px
flex-shrink: 0

Each action card:
  border-radius: 20px
  padding: 16px 20px
  display: flex, align-items: center
  gap: 16px, cursor: pointer
  position: relative, overflow: hidden
  transition: all 0.3s ease
  
  Hover:
    transform: translateY(-4px)
    box-shadow: 0 12px 32px [card-color at 0.4 opacity]

  Noise overlay:
    ::after position absolute inset 0
    background-image url noise
    opacity 0.4, pointer-events none

── RESUME ACTION CARD ───────────────────────────────────────
background: linear-gradient(135deg, #BD1313, #7A0D0D)
onClick: setScreen('resume')

Left icon:
  <img src="https://img.icons8.com/3d-fluency/100/resume.png"
       width="56" height="56"
       style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
              animation: float 3s ease-in-out infinite;
              flex-shrink: 0"/>

Center content:
  "Build Resume" Syne 16px weight 700 white
  "68% complete" Plus Jakarta Sans 12px rgba(255,255,255,0.7)
  
  Mini progress bar (margin-top 6px):
    width: 120px, height: 3px
    bg: rgba(255,255,255,0.2), radius: 9999px
    Fill: white, width: 68%

Right: ChevronRight icon 20px rgba(255,255,255,0.6)

── TEST ACTION CARD ─────────────────────────────────────────
background: linear-gradient(135deg, #D97706, #B45309)
onClick: setScreen('tests')

Left icon:
  <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
       width="56" height="56"
       style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
              animation: float 3.5s ease-in-out infinite;
              animationDelay: 0.5s; flex-shrink: 0"/>

Center:
  "Practice Test" Syne 16px weight 700 white
  "Last score: 74%" Plus Jakarta Sans 12px rgba(255,255,255,0.7)
  
  Mini score indicator:
    "74%" badge: bg rgba(255,255,255,0.2), color white
    10px weight 700, radius 4px, padding 2px 8px

Right: ChevronRight 20px rgba(255,255,255,0.6)

── INTERVIEW ACTION CARD ────────────────────────────────────
background: linear-gradient(135deg, #16A34A, #15803D)
onClick: setScreen('interview')

Left icon:
  <img src="https://img.icons8.com/3d-fluency/100/microphone.png"
       width="56" height="56"
       style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
              animation: float 4s ease-in-out infinite;
              animationDelay: 1s; flex-shrink: 0"/>

Center:
  "AI Interview" Syne 16px weight 700 white
  "3 sessions done" Plus Jakarta Sans 12px rgba(255,255,255,0.7)
  
  "Practice Mode ✨" badge:
    bg rgba(255,255,255,0.15), border rgba(255,255,255,0.2)
    color white, 10px weight 600, radius 9999px
    padding 2px 8px, margin-top 4px

Right: ChevronRight 20px rgba(255,255,255,0.6)

=============================================================
SECTION 3 — STAT CARDS ROW (height 90px, flex-shrink 0)
=============================================================

display: grid
grid-template-columns: repeat(5, 1fr)
gap: 12px
height: 90px
flex-shrink: 0

Build a StatCard component:

const StatCard = ({ icon, value, label, trend,
  trendPositive, accentColor, bgGradient }) => {
  
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    const numeric = parseFloat(String(value).replace('%',''));
    const isPercent = String(value).includes('%');
    let current = 0;
    const increment = numeric / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numeric) {
        current = numeric;
        clearInterval(timer);
      }
      setDisplayValue(Math.round(current) + (isPercent ? '%' : ''));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div style={{
      background: bgGradient || 'white',
      border: '1px solid #E2E8F0',
      borderRadius: 20,
      padding: '14px 16px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      animation: 'fadeUp 350ms ease-out both'
    }}>
      {/* Top color strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3, background: accentColor,
        borderRadius: '20px 20px 0 0'
      }}/>
      
      {/* Row 1: icon + trend */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 6, marginTop: 4
      }}>
        <img src={icon} width="28" height="28"
             style={{filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))'}}/>
        {trend && (
          <span style={{
            background: trendPositive ? '#DCFCE7' : '#FEF2F2',
            color: trendPositive ? '#16A34A' : '#DC2626',
            fontSize: 10, fontWeight: 600,
            padding: '2px 7px', borderRadius: 9999,
            fontFamily: 'var(--font-body)'
          }}>{trend}</span>
        )}
      </div>
      
      {/* Value */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 22, fontWeight: 800,
        color: '#0F172A', lineHeight: 1.1
      }}>{displayValue}</div>
      
      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 10, fontWeight: 600,
        color: '#94A3B8', textTransform: 'uppercase',
        letterSpacing: '0.8px', marginTop: 2
      }}>{label}</div>
    </div>
  );
};

RENDER 5 STAT CARDS:

<StatCard
  icon="https://img.icons8.com/3d-fluency/100/resume.png"
  value="68%"
  label="RESUME SCORE"
  trend="↑ 8%"
  trendPositive={true}
  accentColor="#BD1313"
  bgGradient="linear-gradient(135deg, #FFF1F2, white)"
/>

<StatCard
  icon="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
  value="12"
  label="TESTS TAKEN"
  trend="↑ 3 this week"
  trendPositive={true}
  accentColor="#D97706"
  bgGradient="linear-gradient(135deg, #FFFBEB, white)"
/>

<StatCard
  icon="https://img.icons8.com/3d-fluency/100/goal.png"
  value="74%"
  label="AVG SCORE"
  trend="↑ 5%"
  trendPositive={true}
  accentColor="#16A34A"
  bgGradient="linear-gradient(135deg, #F0FDF4, white)"
/>

<StatCard
  icon="https://img.icons8.com/3d-fluency/100/microphone.png"
  value="3"
  label="AI SESSIONS"
  trend="New"
  trendPositive={true}
  accentColor="#2563EB"
  bgGradient="linear-gradient(135deg, #EFF6FF, white)"
/>

<StatCard
  icon="https://img.icons8.com/3d-fluency/100/fire-element.png"
  value="7"
  label="DAY STREAK 🔥"
  trend="Best: 12"
  trendPositive={false}
  accentColor="#D97706"
  bgGradient="linear-gradient(135deg, #FFFBEB, white)"
/>

=============================================================
SECTION 4 — MAIN CONTENT GRID (flex 1, overflow hidden)
=============================================================

display: grid
grid-template-columns: 1.2fr 0.9fr 0.9fr
gap: 14px
flex: 1
overflow: hidden
min-height: 0

══ LEFT COLUMN (1.2fr) ══════════════════════════════════════

display: flex, flex-direction: column
gap: 12px, overflow: hidden

── SCORE TREND CARD ─────────────────────────────────────────

bg white, border 1px #E2E8F0
border-radius 20px, padding 16px 20px
flex: 1.2, overflow: hidden

Top border strip: 3px #BD1313

HEADER ROW:
  Left: "📊 Score Trend" Syne 15px weight 700 #0F172A
  Right: period pills [7d][30d][All]
    Active: bg #BD1313, color white, radius 9999px
    Inactive: bg #F1F5F9, color #94A3B8
    font: 11px weight 600, padding 4px 10px
    gap: 4px

RECHARTS AREA CHART (height 140px, margin-top 12px):
  Import from recharts:
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, defs,
  linearGradient, stop

  <ResponsiveContainer width="100%" height={140}>
    <AreaChart data={scoreAverage}
      margin={{top:5, right:5, bottom:0, left:-20}}>
      <defs>
        <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#BD1313" stopOpacity={0.15}/>
          <stop offset="95%" stopColor="#BD1313" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#D97706" stopOpacity={0.08}/>
          <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3"
        stroke="#F8FAFF" vertical={false}/>
      <XAxis dataKey="test"
        tick={{fontSize:10, fill:'#94A3B8',
               fontFamily:'var(--font-body)'}}
        axisLine={false} tickLine={false}/>
      <YAxis domain={[40,100]}
        tick={{fontSize:10, fill:'#94A3B8',
               fontFamily:'var(--font-body)'}}
        axisLine={false} tickLine={false}/>
      <Tooltip
        contentStyle={{
          background:'#0F172A', border:'none',
          borderRadius:9999, padding:'6px 14px'
        }}
        labelStyle={{color:'rgba(255,255,255,0.7)',
                    fontSize:10}}
        itemStyle={{color:'white', fontSize:12,
                    fontFamily:'var(--font-body)'}}
      />
      <ReferenceLine y={74} stroke="#94A3B8"
        strokeDasharray="4 4"
        label={{value:'Avg 74%', position:'right',
                fontSize:9, fill:'#94A3B8'}}/>
      <Area type="monotone" dataKey="score"
        stroke="#BD1313" strokeWidth={2.5}
        fill="url(#scoreGrad)"
        dot={{fill:'#BD1313', r:4, strokeWidth:0}}
        activeDot={{fill:'white', r:6,
                    stroke:'#BD1313', strokeWidth:2}}
        isAnimationActive={true}
        animationDuration={1200}
        animationEasing="ease-out"/>
      <Area type="monotone" dataKey="average"
        stroke="#D97706" strokeWidth={1.5}
        fill="url(#avgGrad)"
        dot={false}
        strokeDasharray="5 5"
        isAnimationActive={true}
        animationDuration={1400}/>
    </AreaChart>
  </ResponsiveContainer>

LEGEND ROW (below chart):
  display flex, gap 16px, margin-top 8px
  padding-top 8px, border-top 1px #F8FAFF

  Item 1: colored dot (#BD1313) + "Score" 11px #475569
  Item 2: colored dot (#D97706) dashed + "Average" 11px #475569

MINI STATS ROW (margin-top 8px):
  display flex, gap 16px
  
  3 stats:
  "Highest: 89%" color #16A34A, 12px weight 600
  "Latest: 74%" color #BD1313, 12px weight 600
  "Trend: ↑ Improving" color #16A34A, 12px weight 600
  
  Each: Plus Jakarta Sans 12px
  Separator: "·" muted between them

── TODAY'S TASKS CARD ───────────────────────────────────────

bg white, border 1px #E2E8F0
border-radius 20px, padding 16px 20px
flex: 1, overflow: hidden

Top border strip: 3px #BD1313

HEADER ROW:
  Left: "📋 Today's Tasks" Syne 15px weight 700
  Right: badge "3/4" primary chip

Progress bar (margin: 8px 0):
  height 4px, bg #F5BFBF, radius 9999px
  Fill: 75% width #16A34A (3 of 4 tasks done display)
  Actually: count done tasks for real %

TASK LIST:
  const [tasks, setTasks] = useState(todaysTasks);
  
  Each TASK ROW (44px, border-bottom 1px #F8FAFF):
    display flex, align-items center, gap 10px
    padding 8px 0, cursor pointer
    onClick: toggle task done state

    CHECKBOX (18px):
      border-radius 5px, flex-shrink 0
      Unchecked: border 1.5px #CBD5E1, bg white
      Checked: bg #BD1313, border #BD1313
        white checkmark (✓) centered 11px
        transition: all 200ms

    TASK TEXT (flex 1):
      Plus Jakarta Sans 13px weight 500 #0F172A
      If done: text-decoration line-through
              color #94A3B8

    META (right side):
      Priority dot (8px circle, flex-shrink 0):
        high: #DC2626
        medium: #D97706
        low: #16A34A

      Time chip: "~15 min"
        bg #F1F5F9, color #64748B
        10px weight 600, radius 6px
        padding 2px 7px

  4 TASKS from todaysTasks mock data

  "Add task" ghost link (bottom):
    Plus icon 14px + "Add task"
    Plus Jakarta Sans 12px #BD1313 weight 500
    margin-top 8px, cursor pointer

══ CENTER COLUMN (0.9fr) ════════════════════════════════════

display flex, flex-direction column
gap 12px, overflow hidden

── SUBJECT PERFORMANCE CARD ─────────────────────────────────

bg white, border 1px #E2E8F0
border-radius 20px, padding 16px 20px
flex: 1.2, overflow hidden

Top border strip: 3px #D97706

HEADER:
  "📚 Subject Performance" Syne 15px weight 700

TWO COLUMN LAYOUT (margin-top 12px):
  display grid, grid-template-columns 1fr 1fr
  gap 12px, align-items center

  LEFT: Recharts PieChart (height 130px):
    import PieChart, Pie, Cell, Tooltip from recharts

    <ResponsiveContainer width="100%" height={130}>
      <PieChart>
        <Pie
          data={subjectPerformance}
          dataKey="score"
          nameKey="subject"
          cx="50%" cy="50%"
          innerRadius={40}
          outerRadius={58}
          paddingAngle={3}
          isAnimationActive={true}
          animationDuration={1000}
          animationBegin={300}>
          {subjectPerformance.map((entry, i) => (
            <Cell key={i} fill={[
              '#BD1313','#16A34A',
              '#D97706','#DC2626','#2563EB'][i]}/>
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background:'#0F172A', border:'none',
            borderRadius:8, padding:'6px 12px'
          }}
          itemStyle={{color:'white', fontSize:11}}
        />
      </PieChart>
    </ResponsiveContainer>

    Center label (absolute, centered on donut):
      position absolute (use relative parent trick)
      "Avg" 10px #94A3B8 center
      "71%" Syne 18px weight 800 #0F172A center

  RIGHT: Legend list
    5 items, each 22px height, gap 4px

    Each: display flex, align-items center, gap 8px
      Colored dot (8px circle): [chart colors]
      Subject short name: 12px #475569
      Score chip: colored by performance
        >=75%: bg #DCFCE7 text #16A34A
        50-74%: bg #FEF3C7 text #D97706
        <50%: bg #FEF2F2 text #DC2626
        10px weight 700, radius 4px, padding 1px 6px

── RESUME STRENGTH CARD ─────────────────────────────────────

bg white, border 1px #E2E8F0
border-radius 20px, padding 16px 20px
flex: 1, overflow hidden

Top border strip: 3px #BD1313

HEADER ROW:
  Left: "📄 Resume Strength" Syne 15px weight 700
  Right: "68%" badge
    bg #FDF2F2, color #BD1313, border #F5BFBF
    14px weight 700, radius 9999px, padding 3px 12px

TWO COLUMN LAYOUT (margin-top 12px):
  display grid, grid-template-columns 80px 1fr
  gap 16px, align-items start

  LEFT: Circular Progress SVG (80px):
    Build CircularProgress component:

    const CircularProgress = ({value, size=80, strokeWidth=7}) => {
      const radius = (size - strokeWidth * 2) / 2;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (value / 100) * circumference;
      const color = value >= 80 ? '#16A34A'
                  : value >= 50 ? '#BD1313' : '#DC2626';
      return (
        <div style={{position:'relative', width:size, height:size,
                     display:'flex', alignItems:'center',
                     justifyContent:'center'}}>
          <svg width={size} height={size}
               style={{transform:'rotate(-90deg)'}}>
            <circle cx={size/2} cy={size/2} r={radius}
              stroke="#F5BFBF" strokeWidth={strokeWidth} fill="none"/>
            <circle cx={size/2} cy={size/2} r={radius}
              stroke={color} strokeWidth={strokeWidth} fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{transition:'stroke-dashoffset 1s ease-out'}}/>
          </svg>
          <div style={{position:'absolute', textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-display)',
                         fontSize:16, fontWeight:800,
                         color:'#0F172A', lineHeight:1}}>
              {value}%
            </div>
            <div style={{fontFamily:'var(--font-body)',
                         fontSize:9, color:'#94A3B8',
                         textTransform:'uppercase',
                         letterSpacing:'0.5px'}}>
              Score
            </div>
          </div>
        </div>
      );
    };

    <CircularProgress value={68}/>

  RIGHT: Section bars
    6 sections from resumeSections mock data
    Each (margin-bottom 5px):
      display flex, align-items center, gap 8px

      Label: 10px #475569, width 70px, flex-shrink 0
      Bar track: flex 1, height 4px
        bg #F5BFBF, radius 9999px, overflow hidden
        Fill: width = value%, height 100%
        color: value===100 ? '#16A34A'
               : value>0 ? '#BD1313' : '#F5BFBF'
        transition: width 0.8s ease-out
      Percentage: 10px weight 600, width 28px
        color: value===100 ? '#16A34A'
               : value>0 ? '#BD1313' : '#DC2626'

"Complete Skills →" ghost link:
  Plus Jakarta Sans 11px #BD1313 weight 500
  margin-top 8px, text-align right
  cursor pointer

══ RIGHT COLUMN (0.9fr) ═════════════════════════════════════

display flex, flex-direction column
gap 12px, overflow hidden

── LEADERBOARD CARD ─────────────────────────────────────────

bg white, border 1px #E2E8F0
border-radius 20px, padding 16px 20px
overflow hidden

Top border strip: 3px #D97706

HEADER ROW:
  Left: "🏆 Leaderboard" Syne 15px weight 700
  Right: "This Week" badge
    bg #DCFCE7, color #16A34A, border #86EFAC
    11px weight 600, radius 9999px, padding 3px 10px

Podium illustration (margin: 8px 0):
  <img src="https://i.ibb.co/93ZhMLjT/leaderboard-podium.png"
       height="60"
       style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
              display: block; margin: 0 auto 8px"/>

3 LEADERBOARD ROWS:
  Each ROW (height 48px):
    display flex, align-items center
    gap 10px, padding 8px 0
    border-bottom 1px #F8FAFF

    Rank medal emoji (18px):
      rank 1: 🥇, rank 2: 🥈, rank 3: 🥉

    Avatar circle (32px):
      border-radius 50%
      User row: bg #FDF2F2, color #BD1313
      Others: bg #F1F5F9, color #475569
      font: Syne 12px weight 700
      display flex align center justify center

    Name (flex 1):
      Plus Jakarta Sans 13px weight 600 #0F172A
      If isUser: add "YOU" chip beside name
        bg #FDF2F2, color #BD1313, border #F5BFBF
        10px weight 700, radius 9999px, padding 2px 7px

    Score:
      Syne 14px weight 700
      rank 1: color #D97706
      others: color #0F172A

    USER ROW (Rahul):
      border-left 2px #BD1313
      bg #FFF8F8, padding-left 10px
      border-radius 0 8px 8px 0

"View Full Leaderboard →" ghost link:
  Plus Jakarta Sans 11px #BD1313 weight 500
  margin-top 8px, text-align center

── SKILL GAP CARD ───────────────────────────────────────────

background: linear-gradient(135deg, #FFF1F2, white)
border: 1px solid #F5BFBF
border-radius: 20px
padding: 16px 20px
overflow: hidden

Top border strip: 3px #DC2626

HEADER ROW:
  Left: "🎯 Skill Gap" Syne 15px weight 700
  Right: "For SWE Role" chip
    bg #F1F5F9, color #64748B, border #E2E8F0
    10px weight 600, radius 9999px, padding 3px 10px

Subtitle (margin-top 4px):
  "Add these to boost your chances"
  Plus Jakarta Sans 11px #94A3B8

4 SKILL ROWS (margin-top 10px):
  Each ROW (36px, border-bottom 1px #FFF1F2):
    display flex, align-items center
    justify-content space-between, padding 6px 0

    Left: display flex, align-items center, gap 8px
      ⚠️ emoji (14px)
      Skill name: Plus Jakarta Sans 12px #475569 weight 500

    Right: "Add →" button
      bg #FDF2F2, color #BD1313, border #F5BFBF
      Plus Jakarta Sans 11px weight 600
      border-radius 8px, padding 3px 10px
      cursor pointer
      hover: bg #F5BFBF

  4 skills from skillGaps mock data

── RECENT ACTIVITY CARD ─────────────────────────────────────

bg white, border 1px #E2E8F0
border-radius 20px, padding 16px 20px
flex: 1, overflow hidden

Top border strip: 3px #16A34A

HEADER: "⚡ Recent Activity" Syne 15px weight 700

INNER SCROLL (max-height 160px, margin-top 10px):
  overflow-y auto
  scrollbar-width thin
  scrollbar-color #F5BFBF transparent

  5 ACTIVITY ITEMS (each 44px):
    display flex, align-items center
    gap 10px, padding 7px 0
    border-bottom 1px #F8FAFF

    Icon circle (32px, border-radius 10px):
      bg from iconBg in mock data
      emoji centered (16px)
      flex-shrink 0

    Content (flex 1):
      Title: Plus Jakarta Sans 12px weight 500 #0F172A
      Time: Plus Jakarta Sans 10px #94A3B8, margin-top 1px

    Badge chip (right):
      Sized per badgeVariant:
        primary: bg #FDF2F2 text #BD1313 border #F5BFBF
        warning: bg #FEF3C7 text #D97706 border #FCD34D
        success: bg #DCFCE7 text #16A34A border #86EFAC
        neutral: bg #F1F5F9 text #475569 border #E2E8F0
      10px weight 600, radius 9999px, padding 2px 8px

=============================================================
SECTION 5 — ACHIEVEMENTS ROW (height 90px, flex-shrink 0)
=============================================================

bg white, border 1px #E2E8F0
border-radius 20px, padding 12px 20px
height 90px, flex-shrink 0
overflow hidden

HEADER ROW (margin-bottom 10px):
  Left: "🏅 Achievements" Syne 14px weight 700
  Right: "3/8 unlocked" chip neutral

BADGES (horizontal scroll):
  display flex, gap 10px, overflow-x auto
  scrollbar-width none (hide scrollbar)
  padding-bottom 4px

  Achievement badges image:
  <img src="https://i.ibb.co/P0vh6SF/achievement-badges.png"
       height="44"
       style="filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
              flex-shrink: 0"/>

  NOTE: The badges image is a horizontal strip
  Show it full width scrollable
  height 44px maintains aspect ratio

=============================================================
SECTION 6 — MOTIVATIONAL STRIP (40px, flex-shrink 0)
=============================================================

height: 40px, flex-shrink: 0
background: #FFFBEB
border-top: 1px solid #FCD34D
display: flex, align-items: center
padding: 0 20px, gap: 10px

const [tipIndex, setTipIndex] = useState(0);
const [tipVisible, setTipVisible] = useState(true);

useEffect(() => {
  const interval = setInterval(() => {
    setTipVisible(false);
    setTimeout(() => {
      setTipIndex(i => (i + 1) % motivationalTips.length);
      setTipVisible(true);
    }, 300);
  }, 4000);
  return () => clearInterval(interval);
}, []);

Light bulb icon:
  <img src="https://img.icons8.com/3d-fluency/100/light-on.png"
       width="20" height="20"
       style="filter: drop-shadow(0 1px 4px rgba(217,119,6,0.3));
              flex-shrink: 0"/>

Tip text:
  Plus Jakarta Sans 12px weight 500 #D97706
  opacity: tipVisible ? 1 : 0
  transition: opacity 300ms ease
  white-space: nowrap, overflow: hidden
  text-overflow: ellipsis
  {motivationalTips[tipIndex]}

=============================================================
DASHBOARD STATE MANAGEMENT
=============================================================

const [tasks, setTasks] = useState(todaysTasks);

const toggleTask = (id) => {
  setTasks(prev => prev.map(t =>
    t.id === id ? {...t, done: !t.done} : t
  ));
  if (!tasks.find(t => t.id === id)?.done) {
    showToast("Task completed! +20 XP 🎉");
    showXPToast("+20 XP 🎉");
  }
};

const completedCount = tasks.filter(t => t.done).length;
const progressPercent = Math.round(
  (completedCount / tasks.length) * 100
);

=============================================================
TOAST TRIGGERS ON DASHBOARD
=============================================================

On dashboard mount (first time):
  setTimeout(() => {
    showToast("Welcome back, Rahul! 👋");
  }, 800);
  setTimeout(() => {
    showXPToast("+10 XP 🎉");
  }, 1500);

On task check/uncheck:
  showToast("Task completed! ✓")
  showXPToast("+20 XP 🎉")

On action card click (before navigation):
  Resume: showToast("Opening Resume Builder 📄")
  Tests: showToast("Opening Test Preparation 📝")
  Interview: showToast("Opening AI Interview 🎤")

=============================================================
QUICK NAVIGATION FROM DASHBOARD
=============================================================

Action cards onClick:
  Resume card → setScreen('resume')
  Test card → setScreen('tests')
  Interview card → setScreen('interview')

Sidebar items:
  Already connected from Step 1
  Update to navigate correctly

"Complete Skills →" link:
  onClick: setScreen('skills')

"View Full Leaderboard →":
  onClick: showToast("Leaderboard coming soon!")

Skill gap "Add →" buttons:
  onClick: setScreen('skills')

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Dashboard fills FULL WIDTH (not narrow column)
✅ 3-column grid layout for main content
✅ All 5 stat cards in single row
✅ Stat card numbers count up from 0 on mount
✅ Both area chart lines show (score + average)
✅ Chart uses exact recharts code above
✅ All imgbb illustration URLs used
✅ All Icons8 3D Fluency URLs used
✅ Float animation on all 3D illustrations
✅ Noise texture on gradient cards
✅ Colored top border strips on all stat cards
✅ Soft gradient backgrounds on stat cards
✅ Tasks are interactive (click to check/uncheck)
✅ Motivational tip rotates every 4 seconds
✅ Toast triggers on mount and interactions
✅ Primary color #BD1313 everywhere
✅ Fonts Syne + Plus Jakarta Sans
✅ No full page scroll
✅ Inner containers scroll where needed
✅ Device frame border-radius 24px maintained

=============================================================
BUILD ORDER FOR STEP 3
=============================================================

1. Add all mock data to top of file
2. Build StatCard component
3. Build CircularProgress component
4. Build Dashboard screen container
5. Build Section 1 — Hero Row (3 cards)
6. Build Section 2 — Action Cards Row
7. Build Section 3 — Stat Cards Row
8. Build Section 4 — Main Content Grid
   LEFT: Score Trend Chart + Tasks Card
   CENTER: Subject Donut + Resume Strength
   RIGHT: Leaderboard + Skill Gap + Activity
9. Build Section 5 — Achievements Row
10. Build Section 6 — Motivational Strip
11. Add dashboard state (tasks toggle, tip rotation)
12. Add toast triggers
13. Connect navigation from dashboard to modules

DO NOT rebuild Step 1 or Step 2 screens.
DO NOT change any existing code.
ONLY add Dashboard screen and related components.
=============================================================