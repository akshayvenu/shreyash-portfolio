const __ReactNS = React;
const __mods = {};

__mods["Dashboard"] = (function () {
const { useState, useEffect } = __ReactNS;
const { ChevronRight } = LucideReact;
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } = Recharts;

interface DashboardProps {
  mockUser: any;
  StatCard: any;
  CircularProgress: any;
  showToast: (message: string) => void;
  setScreen: (screen: string) => void;
}

function Dashboard({ mockUser, StatCard, CircularProgress, showToast, setScreen }: DashboardProps) {
  // Period selector state
  const [period, setPeriod] = useState('7d');

  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete System Design module", time: "15 min", priority: "high", done: true },
    { id: 2, text: "Practice 5 DSA problems", time: "30 min", priority: "high", done: true },
    { id: 3, text: "Update resume skills section", time: "10 min", priority: "medium", done: true },
    { id: 4, text: "Schedule mock interview", time: "5 min", priority: "low", done: false }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  // Motivational tips rotation
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

  const [tipIndex, setTipIndex] = useState(0);
  const [tipVisible, setTipVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIndex((prev) => (prev + 1) % motivationalTips.length);
        setTipVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Chart data
  const scoreAverage = [
    { test: "T1", score: 62, average: 74, date: "Mar 10" },
    { test: "T2", score: 58, average: 74, date: "Mar 11" },
    { test: "T3", score: 71, average: 74, date: "Mar 12" },
    { test: "T4", score: 68, average: 74, date: "Mar 13" },
    { test: "T5", score: 74, average: 74, date: "Mar 15" },
    { test: "T6", score: 79, average: 74, date: "Mar 17" },
    { test: "T7", score: 74, average: 74, date: "Mar 18" }
  ];

  const subjectData = [
    { subject: "Mathematics", short: "Mth", score: 79 },
    { subject: "English", short: "Eng", score: 88 },
    { subject: "Science", short: "Sci", score: 65 },
    { subject: "Aptitude", short: "Apt", score: 52 },
    { subject: "Programming", short: "Pro", score: 71 }
  ];

  const PIE_COLORS = ['#BD1313', '#16A34A', '#D97706', '#DC2626', '#2563EB'];

  const resumeSections = [
    { label: "Personal", value: 100 },
    { label: "Education", value: 100 },
    { label: "Experience", value: 100 },
    { label: "Skills", value: 60 },
    { label: "Projects", value: 40 },
    { label: "Summary", value: 0 }
  ];

  const leaderboardData = [
    { rank: 1, name: "Priya M.", avatar: "PM", score: 94, isUser: false },
    { rank: 2, name: "Arjun K.", avatar: "AK", score: 91, isUser: false },
    { rank: 3, name: "Rahul S.", avatar: "RS", score: 88, isUser: true }
  ];

  const skillGapData = ["System Design", "DSA", "AWS / Cloud", "TypeScript"];

  const activityData = [
    { icon: "📝", bg: "#FFF1F2", title: "Math Test Complete", time: "2h ago", badge: "74%", variant: "warning" },
    { icon: "📄", bg: "#FFFBEB", title: "Resume Skills Updated", time: "Yesterday", badge: "68%", variant: "primary" },
    { icon: "🎤", bg: "#F0FDF4", title: "AI Interview Done", time: "2d ago", badge: "Practice", variant: "neutral" },
    { icon: "🏅", bg: "#FEFCE8", title: "Badge Unlocked!", time: "3d ago", badge: "New 🏅", variant: "warning" },
    { icon: "📊", bg: "#F0FDF4", title: "Report Reviewed", time: "4d ago", badge: "Done", variant: "success" }
  ];

  const getBadgeStyle = (variant: string) => ({
    background:
      variant === 'primary' ? '#FDF2F2'
        : variant === 'warning' ? '#FEF3C7'
          : variant === 'success' ? '#DCFCE7'
            : '#F1F5F9',
    color:
      variant === 'primary' ? '#BD1313'
        : variant === 'warning' ? '#D97706'
          : variant === 'success' ? '#16A34A'
            : '#475569',
    border: `1px solid ${variant === 'primary' ? '#F5BFBF'
      : variant === 'warning' ? '#FCD34D'
        : variant === 'success' ? '#86EFAC'
          : '#E2E8F0'}`,
    fontSize: 10,
    fontWeight: 600,
    borderRadius: 9999,
    padding: '2px 8px',
    whiteSpace: 'nowrap' as const,
    fontFamily: 'var(--font-body)'
  });

  return (
    <div style={{
      height: 'calc(100vh - 56px)',
      overflowY: 'auto',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 20px',
      gap: '12px',
      background: '#FAFAFA',
      backgroundImage: "url('https://i.ibb.co/GQM6xx2F/dot-grid-light.png')",
      backgroundRepeat: 'repeat',
      backgroundSize: '40px 40px'
    }}>
      {/* Section 1: Hero Row */}
      <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-[14px] h-[140px] flex-shrink-0">
        {/* Welcome Hero Card */}
        <div className="relative overflow-hidden rounded-[20px] p-5 cursor-default"
          style={{ background: 'linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)' }}>
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: 'url(https://i.ibb.co/GQM6xx2F/dot-grid-light.png)', backgroundRepeat: 'repeat', backgroundSize: '40px 40px' }} />
          <div className="absolute top-[-30px] right-[-30px] w-[180px] h-[180px] rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="absolute bottom-[-20px] left-[-20px] w-[120px] h-[120px] rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

          <div className="relative z-10 flex items-center justify-between h-full">
            <div className="flex flex-col justify-center">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
                Good morning, {mockUser.name.split(' ')[0]} 👋
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginBottom: '12px' }}>
                Tuesday, 18 March · <span style={{ color: 'rgba(255,255,255,0.7)' }}>{mockUser.daysToPlacement} days to placement season 🎯</span>
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-[5px] rounded-full text-white text-[11px] font-semibold"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>
                  🔥 {mockUser.streak} Day Streak
                </span>
                <span className="px-3 py-[5px] rounded-full text-white text-[11px] font-semibold"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>
                  📅 Mar 18, 2025
                </span>
              </div>
            </div>

            <div className="relative">
              <img src="https://i.ibb.co/0jsxwDhQ/dashboard-abstract.png" height="130" alt=""
                style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))', objectFit: 'contain', background: 'transparent' }} />
              <img src="https://img.icons8.com/3d-fluency/100/star.png" width="24" alt=""
                style={{ position: 'absolute', top: '10px', right: '140px', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))', background: 'transparent' }} />
              <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png" width="20" alt=""
                style={{ position: 'absolute', bottom: '20px', right: '150px', background: 'transparent' }} />
            </div>
          </div>
        </div>

        {/* XP Card */}
        <div className="relative overflow-hidden rounded-[20px] p-[18px]" style={{ background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', border: '1px solid #FCD34D' }}>
          <img src="https://img.icons8.com/3d-fluency/100/medal.png" width="56" alt=""
            style={{ position: 'absolute', top: '-8px', right: '12px', filter: 'drop-shadow(0 4px 12px rgba(217,119,6,0.3))', background: 'transparent' }} />
          <div className="relative z-10">
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
              ⚡ XP POINTS
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#D97706' }}>
              {mockUser.xp.toLocaleString()}
            </div>
            <span className="inline-block px-[10px] py-[3px] rounded-full text-white text-[11px] font-bold mt-1"
              style={{ background: '#D97706', fontFamily: 'var(--font-body)' }}>
              {mockUser.levelEmoji} {mockUser.level} · Lv.{mockUser.levelNumber}
            </span>
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#B45309', marginBottom: '4px' }}>
                {mockUser.nextLevelXP - mockUser.xp} XP to {mockUser.nextLevel}
              </div>
              <div style={{ height: '4px', background: 'rgba(217,119,6,0.2)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${(mockUser.xp / mockUser.nextLevelXP) * 100}%`, height: '100%', background: '#D97706', borderRadius: '9999px', transition: 'width 0.8s ease-out' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="relative overflow-hidden rounded-[20px] p-[18px]" style={{ background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-[3px] border-white"
              style={{ background: 'linear-gradient(135deg, #BD1313, #7A0D0D)', boxShadow: '0 4px 12px rgba(189,19,19,0.3)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: 'white' }}>
                {mockUser.avatar}
              </span>
            </div>
            <div className="flex-1">
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                {mockUser.name}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                {mockUser.college} · {mockUser.year}
              </div>
              <span className="inline-block px-[10px] py-[3px] rounded-full text-[11px] font-semibold mt-1"
                style={{ background: '#FDF2F2', color: '#BD1313', border: '1px solid #F5BFBF', fontFamily: 'var(--font-body)' }}>
                🎯 SWE Track
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0 mt-[14px] pt-3 border-t border-[#F1F5F9]">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #F1F5F9' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>12</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>TESTS</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid #F1F5F9' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>3</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>SESSIONS</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>8</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>SKILLS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Action Cards Row */}
      <div className="grid grid-cols-3 gap-[14px] h-[100px] flex-shrink-0">
        {/* Resume Action Card */}
        <div className="relative overflow-hidden rounded-[20px] p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1"
          onClick={() => { showToast("Opening Resume Builder 📄"); setTimeout(() => setScreen('resume'), 300); }}
          style={{ background: 'linear-gradient(135deg, #BD1313, #7A0D0D)', boxShadow: '0 4px 12px rgba(189,19,19,0.25)' }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 32px rgba(189,19,19,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(189,19,19,0.25)'}>
          <img src="https://img.icons8.com/3d-fluency/100/resume.png" width="56" height="56" alt=""
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))', flexShrink: 0, background: 'transparent', mixBlendMode: 'multiply' }} />
          <div className="flex-1 relative z-10">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'white' }}>Build Resume</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>68% complete</div>
            <div style={{ width: '120px', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', marginTop: '6px', overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: 'white', borderRadius: '9999px' }} />
            </div>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.6)" style={{ position: 'relative', zIndex: 10 }} />
        </div>

        {/* Test Action Card */}
        <div className="relative overflow-hidden rounded-[20px] p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1"
          onClick={() => { showToast("Opening Test Preparation 📝"); setTimeout(() => setScreen('tests'), 300); }}
          style={{ background: 'linear-gradient(135deg, #D97706, #B45309)', boxShadow: '0 4px 12px rgba(217,119,6,0.25)' }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 32px rgba(217,119,6,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(217,119,6,0.25)'}>
          <img src="https://img.icons8.com/3d-fluency/100/open-book.png" width="56" height="56" alt=""
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))', flexShrink: 0, background: 'transparent', mixBlendMode: 'multiply' }} />
          <div className="flex-1 relative z-10">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'white' }}>Practice Test</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Last score: 74%</div>
            <span className="inline-block px-2 py-[2px] rounded text-white text-[10px] font-bold mt-1"
              style={{ background: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>74%</span>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.6)" style={{ position: 'relative', zIndex: 10 }} />
        </div>

        {/* Interview Action Card */}
        <div className="relative overflow-hidden rounded-[20px] p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1"
          onClick={() => { showToast("Opening AI Interview 🎤"); setTimeout(() => setScreen('interview'), 300); }}
          style={{ background: 'linear-gradient(135deg, #16A34A, #15803D)', boxShadow: '0 4px 12px rgba(22,163,74,0.25)' }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 32px rgba(22,163,74,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(22,163,74,0.25)'}>
          <img src="https://img.icons8.com/3d-fluency/100/microphone.png" width="56" height="56" alt=""
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))', flexShrink: 0, background: 'transparent', mixBlendMode: 'multiply' }} />
          <div className="flex-1 relative z-10">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'white' }}>AI Interview</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>3 sessions done</div>
            <span className="inline-block px-2 py-[2px] rounded-full text-white text-[10px] font-semibold mt-1"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Practice Mode ✨</span>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.6)" style={{ position: 'relative', zIndex: 10 }} />
        </div>
      </div>

      {/* Achievements Row */}
      <div style={{height:110,flexShrink:0,background:'white',border:'1px solid #E2E8F0',borderRadius:20,padding:'12px 20px',overflow:'hidden'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700}}>🏅 Achievements</div>
          <div style={{background:'#F1F5F9',color:'#64748B',fontFamily:'var(--font-body)',fontSize:11,fontWeight:600,borderRadius:9999,padding:'2px 10px'}}>3/8 unlocked</div>
        </div>
        <div style={{display:'flex',gap:12,overflowX:'auto',scrollbarWidth:'none',msOverflowStyle:'none'}}>
          {[
            {name:'First Test',icon:'https://img.icons8.com/3d-fluency/100/medal.png',unlocked:true,color:'#D97706'},
            {name:'Resume Pro',icon:'https://img.icons8.com/3d-fluency/100/resume.png',unlocked:true,color:'#BD1313'},
            {name:'5 Day Streak',icon:'https://img.icons8.com/3d-fluency/100/fire-element.png',unlocked:true,color:'#DC2626'},
            {name:'Score 80%+',icon:'https://img.icons8.com/3d-fluency/100/goal.png',unlocked:false,color:'#94A3B8'},
            {name:'Perfect Score',icon:'https://img.icons8.com/3d-fluency/100/star.png',unlocked:false,color:'#94A3B8'},
            {name:'Interview Pro',icon:'https://img.icons8.com/3d-fluency/100/microphone.png',unlocked:false,color:'#94A3B8'},
            {name:'Subject Master',icon:'https://img.icons8.com/3d-fluency/100/book.png',unlocked:false,color:'#94A3B8'},
            {name:'Champion',icon:'https://img.icons8.com/3d-fluency/100/trophy.png',unlocked:false,color:'#94A3B8'}
          ].map((badge,i) => (
            <div key={`badge-${badge.name}`} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,flexShrink:0,width:64,cursor:'pointer'}}>
              <div style={{width:48,height:48,borderRadius:14,background:badge.unlocked?'white':'#F8FAFF',border:`2px ${badge.unlocked?'solid':'dashed'}`,borderColor:badge.unlocked?badge.color:'#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:badge.unlocked?`0 4px 12px ${badge.color}30`:'none',position:'relative'}}>
                <img src={badge.icon} width={28} height={28} style={{filter:badge.unlocked?'drop-shadow(0 2px 4px rgba(0,0,0,0.15))':'grayscale(100%) opacity(0.35)',background:'transparent'}}/>
                {!badge.unlocked && <div style={{position:'absolute',bottom:2,right:2,fontSize:10}}>🔒</div>}
              </div>
              <div style={{fontFamily:'var(--font-body)',fontSize:9,fontWeight:600,color:badge.unlocked?'#0F172A':'#94A3B8',textAlign:'center',lineHeight:1.2,width:'100%'}}>{badge.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Stat Cards Row */}
      <div className="grid grid-cols-5 gap-3 h-[90px] flex-shrink-0">
        <StatCard icon="https://img.icons8.com/3d-fluency/100/resume.png" value="68%" label="RESUME SCORE" trend="↑ 8%" trendPositive={true} accentColor="#BD1313" bgGradient="linear-gradient(135deg, #FFF1F2, white)" />
        <StatCard icon="https://img.icons8.com/3d-fluency/100/open-book.png" value="12" label="TESTS TAKEN" trend="↑ 3 this week" trendPositive={true} accentColor="#D97706" bgGradient="linear-gradient(135deg, #FFFBEB, white)" />
        <StatCard icon="https://img.icons8.com/3d-fluency/100/goal.png" value="74%" label="AVG SCORE" trend="↑ 5%" trendPositive={true} accentColor="#16A34A" bgGradient="linear-gradient(135deg, #F0FDF4, white)" />
        <StatCard icon="https://img.icons8.com/3d-fluency/100/microphone.png" value="3" label="AI SESSIONS" trend="New" trendPositive={true} accentColor="#2563EB" bgGradient="linear-gradient(135deg, #EFF6FF, white)" />
        <StatCard icon="https://img.icons8.com/3d-fluency/100/fire-element.png" value="7" label="DAY STREAK 🔥" trend="Best: 12" trendPositive={false} accentColor="#D97706" bgGradient="linear-gradient(135deg, #FFFBEB, white)" />
      </div>

      {/* Section 4: Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.9fr 0.9fr',
        gap: '14px',
        flex: 1,
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden', minHeight: 0 }}>
          {/* Score Trend Card */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '16px 20px',
            flex: 1.2,
            overflow: 'hidden',
            minHeight: 0,
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#BD1313', borderRadius: '20px 20px 0 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                📊 Score Trend
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['7d', '30d', 'All'].map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    style={{
                      background: period === p ? '#BD1313' : '#F1F5F9',
                      color: period === p ? 'white' : '#94A3B8',
                      border: 'none',
                      borderRadius: 9999,
                      padding: '4px 10px',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s'
                    }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={scoreAverage} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="scoreGrad-dashboard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BD1313" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#BD1313" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="avgGrad-dashboard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D97706" stopOpacity={0.08} />
                      <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="grid-dashboard" strokeDasharray="3 3" stroke="#F8FAFF" vertical={false} />
                  <XAxis key="xaxis-dashboard" dataKey="test" tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'var(--font-body)' }} axisLine={false} tickLine={false} />
                  <YAxis key="yaxis-dashboard" domain={[40, 100]} tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'var(--font-body)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#0F172A',
                      border: 'none',
                      borderRadius: 9999,
                      padding: '6px 14px',
                      fontFamily: 'var(--font-body)'
                    }}
                    labelStyle={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}
                    itemStyle={{ color: 'white', fontSize: 12 }}
                  />
                  <ReferenceLine key="refline-dashboard" y={74} stroke="#94A3B8" strokeDasharray="4 4" label={{ value: 'Avg 74%', position: 'insideTopRight', fontSize: 9, fill: '#94A3B8' }} />
                  <Area
                    key="area-score"
                    id="area-score-dashboard"
                    name="Score"
                    type="monotone"
                    dataKey="score"
                    stroke="#BD1313"
                    strokeWidth={2.5}
                    fill="url(#scoreGrad-dashboard)"
                    dot={{ fill: '#BD1313', r: 4, strokeWidth: 0 }}
                    activeDot={{ fill: 'white', r: 6, stroke: '#BD1313', strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={1200}
                    animationEasing="ease-out"
                  />
                  <Area
                    key="area-average"
                    id="area-average-dashboard"
                    name="Average"
                    type="monotone"
                    dataKey="average"
                    stroke="#D97706"
                    strokeWidth={1.5}
                    fill="url(#avgGrad-dashboard)"
                    dot={false}
                    strokeDasharray="5 5"
                    isAnimationActive={true}
                    animationDuration={1400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', gap: '16px', paddingTop: '8px', borderTop: '1px solid #F8FAFF', marginTop: '8px' }}>
              {[
                { label: 'Highest', value: '89%', color: '#16A34A' },
                { label: 'Latest', value: '74%', color: '#BD1313' },
                { label: 'Trend', value: '↑ Improving', color: '#16A34A' }
              ].map((s, i) => (
                <div key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 12 }}>
                  <span style={{ color: '#94A3B8' }}>{s.label}: </span>
                  <span style={{ color: s.color, fontWeight: 600 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Tasks Card */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '16px 20px',
            flex: 1,
            overflow: 'hidden',
            minHeight: 0,
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#BD1313', borderRadius: '20px 20px 0 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                📋 Today's Tasks
              </div>
              <span style={{
                background: '#FDF2F2',
                color: '#BD1313',
                border: '1px solid #F5BFBF',
                borderRadius: 9999,
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 10px'
              }}>
                {completedCount}/{tasks.length}
              </span>
            </div>

            <div style={{ height: '4px', background: '#F5BFBF', borderRadius: 9999, margin: '8px 0', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, background: '#16A34A', height: '100%', transition: 'width 400ms ease-out' }} />
            </div>

            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: '1px solid #F8FAFF',
                  cursor: 'pointer',
                  opacity: task.done ? 0.6 : 1,
                  transition: 'opacity 200ms'
                }}>
                <div style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  flexShrink: 0,
                  background: task.done ? '#BD1313' : 'white',
                  border: task.done ? '1.5px solid #BD1313' : '1.5px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 200ms',
                  fontSize: 11,
                  color: 'white'
                }}>
                  {task.done ? '✓' : ''}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 500,
                    color: task.done ? '#94A3B8' : '#0F172A',
                    textDecoration: task.done ? 'line-through' : 'none',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>{task.text}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#94A3B8', marginTop: 1 }}>
                    ⏱ ~{task.time}
                  </div>
                </div>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: task.priority === 'high' ? '#DC2626' : task.priority === 'medium' ? '#D97706' : '#16A34A'
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden', minHeight: 0 }}>
          {/* Subject Performance Card */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '16px 20px',
            flex: 1.2,
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#D97706', borderRadius: '20px 20px 0 0' }} />

            <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
              📚 Subject Performance
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
              <div style={{ position: 'relative', height: 130 }}>
                <ResponsiveContainer width="100%" height={130}>
                  <PieChart>
                    <Pie
                      data={subjectData}
                      dataKey="score"
                      nameKey="subject"
                      cx="50%"
                      cy="50%"
                      innerRadius={38}
                      outerRadius={56}
                      paddingAngle={3}
                      isAnimationActive={true}
                      animationDuration={1000}
                      animationBegin={300}>
                      {subjectData.map((entry, i) => (
                        <Cell key={`cell-${entry.subject}`} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: '#0F172A',
                        border: 'none',
                        borderRadius: 8,
                        padding: '6px 12px'
                      }}
                      itemStyle={{ color: 'white', fontSize: 11, fontFamily: 'var(--font-body)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, color: '#94A3B8', textTransform: 'uppercase' }}>Avg</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>71%</div>
                </div>
              </div>

              <div>
                {subjectData.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: PIE_COLORS[i], flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#475569', flex: 1 }}>{s.short}</span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 10,
                      fontWeight: 700,
                      background: s.score >= 75 ? '#DCFCE7' : s.score >= 50 ? '#FEF3C7' : '#FEF2F2',
                      color: s.score >= 75 ? '#16A34A' : s.score >= 50 ? '#D97706' : '#DC2626',
                      padding: '1px 6px',
                      borderRadius: 4
                    }}>{s.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resume Strength Card */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '16px 20px',
            flex: 1,
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#BD1313', borderRadius: '20px 20px 0 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                📄 Resume Strength
              </div>
              <span style={{
                background: '#FDF2F2',
                color: '#BD1313',
                border: '1px solid #F5BFBF',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 9999,
                padding: '3px 12px',
                fontFamily: 'var(--font-body)'
              }}>68%</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '16px', alignItems: 'start', marginTop: '12px' }}>
              <CircularProgress value={68} size={80} />

              <div>
                {resumeSections.map((s, i) => (
                  <div key={i} style={{ marginBottom: 5 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#475569' }}>{s.label}</span>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 10,
                        fontWeight: 600,
                        color: s.value === 100 ? '#16A34A' : s.value > 0 ? '#BD1313' : '#DC2626'
                      }}>{s.value}%</span>
                    </div>
                    <div style={{ height: 3, background: '#F5BFBF', borderRadius: 9999, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        borderRadius: 9999,
                        width: `${s.value}%`,
                        background: s.value === 100 ? '#16A34A' : s.value > 0 ? '#BD1313' : '#F5BFBF',
                        transition: 'width 0.8s ease-out'
                      }} />
                    </div>
                  </div>
                ))}
                <span
                  onClick={() => setScreen('resume')}
                  style={{
                    color: '#BD1313',
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 500,
                    marginTop: 8,
                    textAlign: 'right',
                    cursor: 'pointer',
                    display: 'block'
                  }}>
                  Complete Skills →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden', minHeight: 0 }}>
          {/* Leaderboard Card */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '16px 20px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#D97706', borderRadius: '20px 20px 0 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                🏆 Leaderboard
              </div>
              <span style={{
                background: '#DCFCE7',
                color: '#16A34A',
                border: '1px solid #86EFAC',
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 9999,
                padding: '3px 10px',
                fontFamily: 'var(--font-body)'
              }}>This Week</span>
            </div>

            <img
              src="https://i.ibb.co/93ZhMLjT/leaderboard-podium.png"
              height="56"
              alt=""
              style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))', display: 'block', margin: '8px auto' }}
            />

            {leaderboardData.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 0',
                borderBottom: '1px solid #F8FAFF',
                borderLeft: item.isUser ? '2px solid #BD1313' : 'none',
                paddingLeft: item.isUser ? 8 : 0,
                background: item.isUser ? '#FFF8F8' : 'white',
                borderRadius: item.isUser ? '0 8px 8px 0' : 0
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                </span>
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: item.isUser ? '#FDF2F2' : '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  fontWeight: 700,
                  color: item.isUser ? '#BD1313' : '#475569',
                  flexShrink: 0
                }}>{item.avatar}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{item.name}</span>
                  {item.isUser && (
                    <span style={{
                      background: '#FDF2F2',
                      color: '#BD1313',
                      border: '1px solid #F5BFBF',
                      fontSize: 9,
                      fontWeight: 700,
                      borderRadius: 9999,
                      padding: '1px 6px',
                      marginLeft: 6,
                      fontFamily: 'var(--font-body)'
                    }}>YOU</span>
                  )}
                </div>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: i === 0 ? '#D97706' : '#0F172A'
                }}>{item.score}%</span>
              </div>
            ))}

            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              color: '#BD1313',
              fontWeight: 500,
              textAlign: 'center',
              display: 'block',
              marginTop: 8,
              cursor: 'pointer'
            }}>View Full Leaderboard →</span>
          </div>

          {/* Skill Gap Card */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF1F2, white)',
            border: '1px solid #F5BFBF',
            borderRadius: '20px',
            padding: '16px 20px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#DC2626', borderRadius: '20px 20px 0 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                🎯 Skill Gap
              </div>
              <span style={{
                background: '#F1F5F9',
                color: '#64748B',
                border: '1px solid #E2E8F0',
                fontSize: 10,
                fontWeight: 600,
                borderRadius: 9999,
                padding: '3px 10px',
                fontFamily: 'var(--font-body)'
              }}>For SWE Role</span>
            </div>

            {skillGapData.map((skill, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: '1px solid #FFF1F2'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: '#475569'
                }}>
                  <span>⚠️</span>
                  {skill}
                </div>
                <button
                  onClick={() => setScreen('skills')}
                  style={{
                    background: '#FDF2F2',
                    color: '#BD1313',
                    border: '1px solid #F5BFBF',
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: '3px 10px',
                    cursor: 'pointer'
                  }}>
                  Add →
                </button>
              </div>
            ))}
          </div>

          {/* Recent Activity Card */}
          <div style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '16px 20px',
            flex: 1,
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#16A34A', borderRadius: '20px 20px 0 0' }} />

            <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
              ⚡ Recent Activity
            </div>

            <div style={{ maxHeight: 140, marginTop: 10, overflowY: 'auto' }} className="inner-scroll">
              {activityData.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 0',
                  borderBottom: '1px solid #F8FAFF'
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: item.bg,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14
                  }}>{item.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#0F172A',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>{item.title}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#94A3B8', marginTop: 1 }}>{item.time}</div>
                  </div>
                  <span style={getBadgeStyle(item.variant)}>{item.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Achievements Row */}
      <div style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        padding: '12px 20px',
        flexShrink: 0,
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
            🏅 Achievements
          </div>
          <span style={{
            background: '#F1F5F9',
            color: '#64748B',
            border: '1px solid #E2E8F0',
            fontSize: 11,
            fontWeight: 600,
            borderRadius: 9999,
            padding: '3px 10px',
            fontFamily: 'var(--font-body)'
          }}>3/8 unlocked</span>
        </div>
        <div className="achievements-scroll" style={{ display: 'flex', overflowX: 'auto', gap: 10, paddingBottom: 2, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <img
            src="https://i.ibb.co/P0vh6SF/achievement-badges.png"
            height="40"
            alt=""
            style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))' }}
          />
        </div>
      </div>

      {/* Section 6: Motivational Strip */}
      <div style={{
        height: 40,
        flexShrink: 0,
        background: '#FFFBEB',
        borderTop: '1px solid #FCD34D',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 10
      }}>
        <img
          src="https://img.icons8.com/3d-fluency/100/light-on.png"
          width="20"
          height="20"
          alt=""
          style={{ filter: 'drop-shadow(0 1px 4px rgba(217,119,6,0.3))', flexShrink: 0 }}
        />
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 500,
          color: '#D97706',
          opacity: tipVisible ? 1 : 0,
          transition: 'opacity 300ms ease',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {motivationalTips[tipIndex]}
        </span>
      </div>
    </div>
  );
}
return { Dashboard };
})();

__mods["Resume"] = (function () {
const { useState } = __ReactNS;
const { ChevronLeft, X, Upload, CheckCircle, Mail, Phone, MapPin, Plus, XCircle } = LucideReact;

interface ResumeProps {
  screen: string;
  setScreen: (screen: string) => void;
  CircularProgress: any;
  showToast: (message: string) => void;
  showXPToast: (message: string) => void;
}

// Resume Mock Data
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
    { id: 'sk_1', name: 'JavaScript', level: 'Expert' },
    { id: 'sk_2', name: 'React', level: 'Intermediate' },
    { id: 'sk_3', name: 'Python', level: 'Intermediate' },
    { id: 'sk_4', name: 'SQL', level: 'Intermediate' },
    { id: 'sk_5', name: 'Node.js', level: 'Beginner' },
    { id: 'sk_6', name: 'Git', level: 'Expert' }
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

const aiSuggestions = [
  { id: 1, type: 'missing', icon: '💡', title: 'Add certifications', detail: 'Certifications boost credibility by 40%', priority: 'high' },
  { id: 2, type: 'improve', icon: '💡', title: 'Expand project descriptions', detail: 'Add metrics and impact numbers', priority: 'high' },
  { id: 3, type: 'missing', icon: '💡', title: 'Add LinkedIn URL', detail: 'Increases profile visibility by 30%', priority: 'medium' },
  { id: 4, type: 'good', icon: '✅', title: 'Contact info complete', detail: 'Great — all basics are covered', priority: 'low' }
];

const resumeTemplates = [
  { id: 'classic', name: 'Classic', headerColor: '#BD1313', accent: '#BD1313' },
  { id: 'modern', name: 'Modern', headerColor: '#0F172A', accent: '#475569' },
  { id: 'minimal', name: 'Minimal', headerColor: '#E2E8F0', accent: '#94A3B8' },
  { id: 'bold', name: 'Bold', headerColor: '#D97706', accent: '#D97706' },
  { id: 'creative', name: 'Creative', headerColor: '#7C3AED', accent: '#7C3AED' },
  { id: 'executive', name: 'Executive', headerColor: '#1E293B', accent: '#334155' }
];

const suggestedSkills = [
  'JavaScript', 'Python', 'React', 'SQL',
  'Node.js', 'Communication', 'Leadership',
  'Problem Solving', 'Excel', 'Figma',
  'Git', 'Machine Learning', 'TypeScript',
  'System Design', 'AWS'
];

function Resume({ screen, setScreen, CircularProgress, showToast, showXPToast }: ResumeProps) {
  const [showNudgeBanner, setShowNudgeBanner] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>('classic');
  const [activeTab, setActiveTab] = useState('All');
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'complete'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('personal');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [addedSkills, setAddedSkills] = useState(resumeData.skills.map(s => s.name));
  const [skillInput, setSkillInput] = useState('');
  const [resumePersonal, setResumePersonal] = useState(resumeData.personalInfo);
  const [resumeSummary, setResumeSummary] = useState(resumeData.summary);

  const handleUpload = () => {
    setUploadState('uploading');
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('complete');
          setTimeout(() => {
            showToast("Resume uploaded successfully! ✓");
            showXPToast("+30 XP 🎉");
          }, 0);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleGenerateSummary = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setTimeout(() => showToast("AI summary generated! ✓"), 0);
    }, 1200);
  };

  const handleAddSkill = (skill: string) => {
    if (!addedSkills.includes(skill)) {
      setAddedSkills([...addedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setAddedSkills(addedSkills.filter(s => s !== skill));
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      handleAddSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  // Get active template
  const activeTemplate = resumeTemplates.find(t => t.id === (selectedTemplate || 'classic')) || resumeTemplates[0];

  // Screen 1: Resume Home
  if (screen === 'resume') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden screen-enter">
        {/* Section Header */}
        <div style={{
          height: '56px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#FFF1F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="https://img.icons8.com/3d-fluency/100/resume.png" width="22" height="22" alt="" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
                Resume Builder 📄
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
                Build a resume that gets you hired
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{
              background: '#F1F5F9',
              color: '#64748B',
              border: '1px solid #E2E8F0',
              fontSize: '11px',
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 9999,
              fontFamily: 'var(--font-body)'
            }}>Last edited: Today</span>
            <span style={{
              background: '#FDF2F2',
              color: '#BD1313',
              border: '1px solid #F5BFBF',
              fontSize: '11px',
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 9999,
              fontFamily: 'var(--font-body)'
            }}>68%</span>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
             className="inner-scroll">
          {/* Resume Strength Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #FFF1F2, white)',
            border: '1px solid #F5BFBF',
            borderRadius: '20px'
          }}>
            <CircularProgress value={68} size={80} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                Resume Strength
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                Add 2 more sections to reach 80%
              </div>
              <div style={{ height: '6px', background: '#F5BFBF', borderRadius: 9999, marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: '#BD1313', borderRadius: 9999, transition: 'width 0.8s ease-out' }} />
              </div>
            </div>
            <button style={{
              background: 'transparent',
              color: '#BD1313',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              padding: '8px 0'
            }}>
              View AI Tips →
            </button>
          </div>

          {/* Option Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {/* Start Fresh Card */}
            <div onClick={() => setScreen('resume-templates')}
                 style={{
                   background: 'white',
                   border: '1.5px solid #E2E8F0',
                   borderLeft: '3px solid #BD1313',
                   borderRadius: '20px',
                   padding: '20px',
                   cursor: 'pointer',
                   transition: 'all 0.2s'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-3px)';
                   e.currentTarget.style.boxShadow = '0 8px 24px rgba(189,19,19,0.1)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#FFF1F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src="https://img.icons8.com/3d-fluency/100/resume.png" width="28" height="28" alt=""
                     style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: '10px' }}>
                Start Fresh ✨
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                Build step-by-step with AI guidance
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#BD1313', marginTop: '14px' }}>
                Create Resume →
              </div>
            </div>

            {/* Upload Existing Card */}
            <div onClick={() => setScreen('resume-upload')}
                 style={{
                   background: 'linear-gradient(135deg, #FFFBEB, white)',
                   border: '1.5px solid #E2E8F0',
                   borderLeft: '3px solid #D97706',
                   borderRadius: '20px',
                   padding: '20px',
                   cursor: 'pointer',
                   transition: 'all 0.2s'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-3px)';
                   e.currentTarget.style.boxShadow = '0 8px 24px rgba(217,119,6,0.1)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#FFFBEB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src="https://img.icons8.com/3d-fluency/100/upload-to-cloud.png" width="28" height="28" alt=""
                     style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: '10px' }}>
                Upload Resume 📤
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                Upload PDF/DOC — we'll extract info
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#D97706', marginTop: '14px' }}>
                Upload File →
              </div>
            </div>
          </div>

          {/* AI Nudge Banner */}
          {showNudgeBanner && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: '#FDF2F2',
              border: '1px solid #F5BFBF',
              borderRadius: '12px'
            }}>
              <img src="https://img.icons8.com/3d-fluency/100/star.png" width="20" height="20" alt="" />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#BD1313',
                fontWeight: 500,
                flex: 1
              }}>
                Complete your Skills section to reach 80% strength
              </span>
              <XCircle size={16} color="#BD1313" style={{ cursor: 'pointer' }} onClick={() => setShowNudgeBanner(false)} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Screen 2: Template Selection
  if (screen === 'resume-templates') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden screen-enter">
        {/* Section Header */}
        <div style={{
          height: '56px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button onClick={() => setScreen('resume')} style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFF'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <ChevronLeft size={20} color="#475569" />
          </button>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
              Choose a Template 🎨
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
              Pick a style that fits your goal
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{
          height: '48px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '24px'
        }}>
          {['All', 'Simple', 'Creative', 'Professional'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                height: '48px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #BD1313' : '2px solid transparent',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                color: activeTab === tab ? '#BD1313' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.2s',
                padding: '0 4px'
              }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px 80px' }} className="inner-scroll">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {resumeTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template.id);
                  setTimeout(() => showToast("Template selected ✓"), 0);
                }}
                style={{
                  height: '160px',
                  background: 'white',
                  border: selectedTemplate === template.id ? '2px solid #BD1313' : '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  boxShadow: selectedTemplate === template.id ? '0 0 0 4px rgba(189,19,19,0.08)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedTemplate !== template.id) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(189,19,19,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTemplate !== template.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}>
                {/* Preview Area */}
                <div style={{ height: '70%', padding: '12px' }}>
                  <div style={{ height: '10px', background: template.headerColor, borderRadius: '4px 4px 0 0', marginBottom: '8px' }} />
                  <div style={{ height: '5px', width: '75%', background: '#E2E8F0', borderRadius: '3px', marginBottom: '4px' }} />
                  <div style={{ height: '4px', width: '55%', background: '#E2E8F0', borderRadius: '3px', marginBottom: '4px' }} />
                  <div style={{ height: '3px', width: '80%', background: '#F1F5F9', borderRadius: '3px', marginBottom: '3px' }} />
                  <div style={{ height: '3px', width: '60%', background: '#F1F5F9', borderRadius: '3px', marginBottom: '3px' }} />
                  <div style={{ height: '3px', width: '70%', background: '#F1F5F9', borderRadius: '3px' }} />
                </div>
                
                {/* Card Footer */}
                <div style={{ height: '30%', borderTop: '1px solid #E2E8F0', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: template.accent }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
                      {template.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#BD1313', fontWeight: 500 }}>
                    Preview
                  </span>
                </div>

                {/* Selected Checkmark */}
                {selectedTemplate === template.id && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#BD1313',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    animation: 'badgePop 300ms ease-out'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div style={{
          height: '64px',
          position: 'sticky',
          bottom: 0,
          background: 'white',
          borderTop: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div>
            {!selectedTemplate ? (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#94A3B8' }}>
                No template selected
              </span>
            ) : (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B' }}>
                Selected: <span style={{
                  background: '#FDF2F2',
                  color: '#BD1313',
                  border: '1px solid #F5BFBF',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: 9999,
                  marginLeft: '6px'
                }}>
                  {resumeTemplates.find(t => t.id === selectedTemplate)?.name}
                </span>
              </span>
            )}
          </div>
          <button
            onClick={() => selectedTemplate && setScreen('resume-method')}
            disabled={!selectedTemplate}
            style={{
              width: '180px',
              height: '44px',
              background: selectedTemplate ? '#BD1313' : '#F5BFBF',
              color: selectedTemplate ? 'white' : 'rgba(189,19,19,0.5)',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: selectedTemplate ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (selectedTemplate) {
                e.currentTarget.style.background = '#991010';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTemplate) {
                e.currentTarget.style.background = '#BD1313';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}>
            Use This Template →
          </button>
        </div>
      </div>
    );
  }

  // Screen 3: Build Method Choice
  if (screen === 'resume-method') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden screen-enter">
        {/* Section Header */}
        <div style={{
          height: '56px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button onClick={() => setScreen('resume-templates')} style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <ChevronLeft size={20} color="#475569" />
          </button>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
              How would you like to start?
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
              Choose your preferred method
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          gap: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Let's build your resume 🚀
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#64748B' }}>
              Choose how you want to get started
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '560px', width: '100%', marginTop: '16px' }}>
            {/* Start Fresh Card */}
            <div
              onClick={() => setScreen('resume-editor')}
              style={{
                background: 'white',
                border: '2px solid #E2E8F0',
                borderRadius: '20px',
                padding: '28px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid #BD1313';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(189,19,19,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid #E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <img src="https://img.icons8.com/3d-fluency/100/resume.png"
                   width="72" height="72" alt=""
                   style={{
                     filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))',
                     display: 'block',
                     margin: '0 auto 16px',
                     background: 'transparent'
                   }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                Create Manually ✏️
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', lineHeight: 1.6, marginBottom: '20px' }}>
                Build your resume step-by-step with AI guidance and suggestions
              </div>
              <button style={{
                width: '100%',
                height: '44px',
                background: '#BD1313',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Start Building →
              </button>
            </div>

            {/* Upload Card */}
            <div
              onClick={() => setScreen('resume-upload')}
              style={{
                background: 'white',
                border: '2px solid #E2E8F0',
                borderRadius: '20px',
                padding: '28px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid #D97706';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(217,119,6,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid #E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <img src="https://img.icons8.com/3d-fluency/100/upload-to-cloud.png"
                   width="72" height="72" alt=""
                   style={{
                     filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))',
                     display: 'block',
                     margin: '0 auto 16px',
                     background: 'transparent'
                   }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                Upload Existing 📤
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', lineHeight: 1.6, marginBottom: '20px' }}>
                Upload your existing resume PDF or DOC and we'll extract your information
              </div>
              <button style={{
                width: '100%',
                height: '44px',
                background: 'transparent',
                color: '#D97706',
                border: '1.5px solid #FCD34D',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#FFFBEB'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                Upload Resume →
              </button>
            </div>
          </div>

          {/* Recent Resumes Section */}
          <div style={{ maxWidth: '720px', width: '100%', marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Recent Resumes 📄</div>
              <div onClick={() => setScreen('resume-editor')} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#BD1313', cursor: 'pointer' }}>+ New Resume</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {id:'r1',name:'Software Engineer Resume',template:'Classic',strength:68,status:'draft',lastEdited:'Today',aiScore:72,color:'#BD1313'},
                {id:'r2',name:'Data Analyst Application',template:'Modern',strength:45,status:'draft',lastEdited:'Mar 15',aiScore:55,color:'#0F172A'},
                {id:'r3',name:'Internship Resume',template:'Minimal',strength:90,status:'completed',lastEdited:'Mar 10',aiScore:88,color:'#E2E8F0'}
              ].map(resume => (
                <div key={resume.id} onClick={() => setScreen('resume-complete')} style={{height:72,background:'white',border:'1px solid #E2E8F0',borderRadius:16,padding:'0 16px',display:'flex',alignItems:'center',gap:12,cursor:'pointer',transition:'all 0.2s'}}
                  onMouseEnter={(e) => {e.currentTarget.style.border='1px solid #F5BFBF';e.currentTarget.style.background='#FFF8F8';}}
                  onMouseLeave={(e) => {e.currentTarget.style.border='1px solid #E2E8F0';e.currentTarget.style.background='white';}}>
                  <div style={{width:4,height:48,borderRadius:'8px 0 0 8px',background:resume.color}}/>
                  <div style={{width:36,height:36,background:'#FDF2F2',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <img src="https://img.icons8.com/3d-fluency/100/resume.png" width={20} height={20} style={{background:'transparent'}}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:14,fontWeight:600,color:'#0F172A'}}>{resume.name}</div>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginTop:2}}>
                      <span style={{fontFamily:'var(--font-body)',fontSize:11,color:'#94A3B8'}}>{resume.template} · {resume.lastEdited}</span>
                      <span style={{background:'#F0FDF4',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:10,fontWeight:700,borderRadius:9999,padding:'2px 8px'}}>AI: {resume.aiScore}%</span>
                    </div>
                  </div>
                  <div style={{background:resume.status==='completed'?'#DCFCE7':'#FEF3C7',color:resume.status==='completed'?'#16A34A':'#D97706',fontFamily:'var(--font-body)',fontSize:11,fontWeight:700,borderRadius:9999,padding:'3px 8px'}}>
                    {resume.status==='completed'?'✓ Complete':'Draft'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Screen 4: Upload Resume
  if (screen === 'resume-upload') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden screen-enter">
        {/* Section Header */}
        <div style={{
          height: '56px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button onClick={() => setScreen('resume-method')} style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <ChevronLeft size={20} color="#475569" />
          </button>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
              Upload Your Resume 📤
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
              We'll extract your info automatically
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }} className="inner-scroll">
          <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
            {/* Upload Zone */}
            <div style={{
              height: '220px',
              border: '2px dashed #F5BFBF',
              borderRadius: '20px',
              background: '#FFF8F8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: uploadState === 'idle' ? 'pointer' : 'default',
              transition: 'all 0.2s',
              marginBottom: '16px'
            }}
            onClick={() => uploadState === 'idle' && handleUpload()}>
              {uploadState === 'idle' && (
                <>
                  <img src="https://img.icons8.com/3d-fluency/100/upload-to-cloud.png"
                       width="56" height="56" alt=""
                       style={{
                         filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
                         marginBottom: '12px',
                         background: 'transparent'
                       }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                    Drag & drop your resume here
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>
                    or click to browse files
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', marginBottom: '16px' }}>
                    Accepts: PDF, DOC, DOCX · Max 5MB
                  </div>
                  <button style={{
                    height: '40px',
                    width: '140px',
                    background: 'transparent',
                    color: '#BD1313',
                    border: '1.5px solid #F5BFBF',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Browse File
                  </button>
                </>
              )}

              {uploadState === 'uploading' && (
                <>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid #F5BFBF',
                    borderTop: '3px solid #BD1313',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                    marginBottom: '12px'
                  }} />
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#0F172A', marginBottom: '12px' }}>
                    Uploading your resume...
                  </div>
                  <div style={{ width: '200px', height: '4px', background: '#F5BFBF', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#BD1313', transition: 'width 100ms' }} />
                  </div>
                  {uploadProgress >= 60 && (
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8', marginTop: '8px' }}>
                      Extracting information...
                    </div>
                  )}
                </>
              )}

              {uploadState === 'complete' && (
                <>
                  <CheckCircle size={48} color="#16A34A" style={{ marginBottom: '12px', animation: 'badgePop 400ms ease-out' }} />
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: '#16A34A', marginBottom: '4px' }}>
                    Resume uploaded successfully! ✓
                  </div>
                  <span style={{
                    background: '#F0FDF4',
                    color: '#16A34A',
                    border: '1px solid #86EFAC',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 14px',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-body)'
                  }}>
                    resume_rahul.pdf
                  </span>
                </>
              )}
            </div>

            {/* AI Tip Strip */}
            {uploadState === 'complete' && (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  marginTop: '16px',
                  background: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  borderRadius: '12px'
                }}>
                  <img src="https://img.icons8.com/3d-fluency/100/light-on.png" width="20" height="20" alt="" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D97706', fontWeight: 500 }}>
                    ✨ We found 3 sections to improve in your resume
                  </span>
                </div>

                {/* Extracted Info Card */}
                <div style={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '20px',
                  padding: '20px',
                  marginTop: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                      Extracted Information
                    </div>
                    <span style={{
                      background: '#F1F5F9',
                      color: '#64748B',
                      border: '1px solid #E2E8F0',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: 9999,
                      fontFamily: 'var(--font-body)'
                    }}>Review and confirm</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '14px' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        NAME
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        Rahul Sharma
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        EMAIL
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        rahul@vit.edu
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        PHONE
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        +91 98765 43210
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        EXPERIENCE
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        Software Intern — TCS Digital
                      </div>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        EDUCATION
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        B.Tech CS — VIT Vellore — 2025
                      </div>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        SKILLS
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {['React', 'JavaScript', 'Python', 'SQL'].map(skill => (
                          <span key={skill} style={{
                            background: '#FDF2F2',
                            color: '#BD1313',
                            border: '1px solid #F5BFBF',
                            fontSize: '12px',
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: 9999,
                            fontFamily: 'var(--font-body)'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                  <button
                    onClick={() => {
                      setScreen('resume-editor');
                      setTimeout(() => showToast("Resume imported! Let's refine it 📄"), 0);
                    }}
                    style={{
                      width: '100%',
                      height: '48px',
                      background: '#BD1313',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                    Continue Editing →
                  </button>
                  <button
                    onClick={() => setScreen('resume-editor')}
                    style={{
                      width: '100%',
                      height: '44px',
                      background: 'transparent',
                      color: '#BD1313',
                      border: '1.5px solid #F5BFBF',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                    Start Fresh Instead
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Screen 5: Resume Editor (Split Screen)
  if (screen === 'resume-editor') {
    const resumeSections = [
      { label: 'Personal', value: 100 },
      { label: 'Education', value: 100 },
      { label: 'Experience', value: 100 },
      { label: 'Skills', value: 60 },
      { label: 'Projects', value: 40 },
      { label: 'Summary', value: resumeSummary ? 100 : 0 }
    ];

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      {/* Editor Header Bar */}
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'12px'}}>
        <button onClick={()=>setScreen('resume-method')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#475569"/></button>
        <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Resume Editor ✏️</div>
        <div style={{flex:1,maxWidth:'200px'}}>
          <div style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#94A3B8',marginBottom:'2px'}}>Strength: 68%</div>
          <div style={{height:'4px',background:'#F5BFBF',borderRadius:9999,overflow:'hidden'}}>
            <div style={{height:'100%',background:'#BD1313',width:'68%'}}/>
          </div>
        </div>
        <div style={{marginLeft:'auto',display:'flex',gap:'8px'}}>
          <button onClick={()=>setTimeout(()=>showToast("Resume saved ✓"),0)} style={{height:'36px',width:'80px',background:'transparent',border:'1.5px solid #F5BFBF',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'8px',cursor:'pointer'}}>Save</button>
          <button onClick={()=>setScreen('resume-complete')} style={{height:'36px',width:'100px',background:'#BD1313',color:'white',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,border:'none',borderRadius:'8px',cursor:'pointer'}}>Preview →</button>
        </div>
      </div>

      {/* Split Content */}
      <div style={{flex:1,display:'grid',gridTemplateColumns:'45% 55%',height:'100%',overflow:'hidden'}}>
        {/* Left Panel */}
        <div style={{borderRight:'1px solid #E2E8F0',display:'flex',flexDirection:'column'}}>
          {/* Section Tabs */}
          <div style={{height:'48px',flexShrink:0,background:'#FAFAFA',borderBottom:'1px solid #E2E8F0',display:'flex',overflowX:'auto',padding:'0 16px',gap:0}} className="inner-scroll">
            {['personal', 'education', 'experience', 'skills', 'projects', 'summary'].map(tab => (
              <button key={tab} onClick={()=>setActiveSection(tab)} style={{height:'48px',padding:'0 14px',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:500,whiteSpace:'nowrap',cursor:'pointer',borderBottom:'2px solid transparent',display:'flex',alignItems:'center',background:'none',border:'none',borderBottomColor:activeSection===tab?'#BD1313':'transparent',color:activeSection===tab?'#BD1313':'#94A3B8'}}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
            ))}
          </div>

          {/* Form Content */}
          <div style={{flex:1,overflowY:'auto',padding:'20px'}} className="inner-scroll">
            {/* Personal Info */}
            {activeSection==='personal'&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[{label:'FULL NAME',key:'fullName',col:1},{label:'PROFESSIONAL TITLE',key:'title',col:1},{label:'EMAIL ADDRESS',key:'email',col:1},{label:'PHONE NUMBER',key:'phone',col:1},{label:'LINKEDIN URL',key:'linkedin',col:1},{label:'PORTFOLIO URL',key:'portfolio',col:1,placeholder:'Optional'},{label:'CITY / LOCATION',key:'city',col:2}].map((field,i)=>(
                <div key={i} style={{gridColumn:field.col===2?'1 / -1':'auto'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>{field.label}</div>
                  <input type="text" value={(resumePersonal as any)[field.key]} onChange={(e)=>setResumePersonal({...resumePersonal,[field.key]:e.target.value})} placeholder={field.placeholder||''} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                </div>
              ))}
            </div>}

            {/* Education */}
            {activeSection==='education'&&<div>
              {resumeData.education.map((entry,i)=>(
                <div key={i} style={{background:'#FAFAFA',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'14px',marginBottom:'10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                  <div style={{gridColumn:'1 / -1'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>DEGREE / PROGRAM</div>
                    <input type="text" defaultValue={entry.degree} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>INSTITUTION</div>
                    <input type="text" defaultValue={entry.institution} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>YEAR OF GRADUATION</div>
                    <input type="text" defaultValue={entry.year} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>CGPA / GRADE</div>
                    <input type="text" defaultValue={entry.grade} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div style={{gridColumn:'1 / -1'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>LOCATION</div>
                    <input type="text" defaultValue={entry.location} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                </div>
              ))}
              <button style={{width:'100%',height:'44px',border:'2px dashed #F5BFBF',background:'#FFF8F8',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>+ Add Education</button>
            </div>}

            {/* Experience */}
            {activeSection==='experience'&&<div>
              {resumeData.experience.map((entry,i)=>(
                <div key={i} style={{background:'#FAFAFA',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'14px',marginBottom:'10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                  <div style={{gridColumn:'1 / -1'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>JOB TITLE</div>
                    <input type="text" defaultValue={entry.title} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>COMPANY</div>
                    <input type="text" defaultValue={entry.company} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>START DATE</div>
                    <input type="text" defaultValue={entry.startDate} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div style={{gridColumn:'1 / -1'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>DESCRIPTION</div>
                    <textarea defaultValue={entry.description} style={{minHeight:'100px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',resize:'none'}}/>
                  </div>
                </div>
              ))}
              <button style={{width:'100%',height:'44px',border:'2px dashed #F5BFBF',background:'#FFF8F8',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>+ Add Experience</button>
            </div>}

            {/* Skills */}
            {activeSection==='skills'&&<div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'4px'}}>Your Skills</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'12px'}}>Add skills relevant to your target role</div>

              <input type="text" value={skillInput} onChange={(e)=>setSkillInput(e.target.value)} onKeyDown={handleSkillInputKeyDown} placeholder="Type a skill and press Enter..." style={{height:'44px',width:'100%',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',fontFamily:'var(--font-body)',fontSize:'14px'}}/>

              <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginTop:'10px'}}>
                {addedSkills.map((skill,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:6,background:'#FDF2F2',border:'1px solid #F5BFBF',borderRadius:9999,padding:'4px 10px',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,color:'#BD1313'}}>
                    {skill}
                    <span onClick={()=>handleRemoveSkill(skill)} style={{cursor:'pointer',fontSize:14,lineHeight:1,color:'#BD1313'}}>×</span>
                  </div>
                ))}
              </div>

              <div style={{marginTop:'16px'}}>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8',marginBottom:'8px'}}>Suggested for your profile:</div>
                <div style={{display:'flex',overflowX:'auto',gap:'8px',paddingBottom:'4px'}} className="inner-scroll">
                  {suggestedSkills.filter(s=>!addedSkills.includes(s)).slice(0,10).map((skill,i)=>(
                    <div key={i} onClick={()=>handleAddSkill(skill)} style={{flexShrink:0,background:'#F1F5F9',border:'1px solid #E2E8F0',borderRadius:9999,padding:'4px 12px',fontFamily:'var(--font-body)',fontSize:11,fontWeight:600,color:'#475569',cursor:'pointer',whiteSpace:'nowrap'}}>{skill}</div>
                  ))}
                </div>
              </div>
            </div>}

            {/* Projects */}
            {activeSection==='projects'&&<div>
              {resumeData.projects.map((entry,i)=>(
                <div key={i} style={{background:'#FAFAFA',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'14px',marginBottom:'10px'}}>
                  <div style={{marginBottom:'10px'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>PROJECT NAME</div>
                    <input type="text" defaultValue={entry.name} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div style={{marginBottom:'10px'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>DESCRIPTION</div>
                    <textarea defaultValue={entry.description} style={{minHeight:'100px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',resize:'none'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>GITHUB / PROJECT URL</div>
                    <input type="text" defaultValue={entry.link} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                </div>
              ))}
              <button style={{width:'100%',height:'44px',border:'2px dashed #F5BFBF',background:'#FFF8F8',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>+ Add Project</button>
            </div>}

            {/* Summary */}
            {activeSection==='summary'&&<div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'4px'}}>Professional Summary</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'12px'}}>A powerful 3-4 line intro about yourself</div>

              <textarea value={resumeSummary} onChange={(e)=>setResumeSummary(e.target.value)} style={{minHeight:'120px',border:'1.5px solid #E2E8F0',borderRadius:'12px',padding:'14px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',lineHeight:1.6,resize:'none'}}/>

              <div style={{textAlign:'right',fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>{resumeSummary.length}/400</div>

              <button onClick={handleGenerateSummary} style={{width:'100%',height:'48px',marginTop:'12px',background:'#FDF2F2',border:'1px solid #F5BFBF',color:'#BD1313',borderRadius:'12px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
                <img src="https://img.icons8.com/3d-fluency/100/star.png" width="18" height="18" alt=""/>
                {generating?'Generating...':generated?'✨ Regenerate':'✨ Generate with AI'}
              </button>
            </div>}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div style={{overflowY:'auto',background:'#F8FAFF'}} className="inner-scroll">
          <div style={{margin:'16px',padding:'28px',background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',minHeight:'calc(100% - 32px)',boxShadow:'0 4px 16px rgba(0,0,0,0.06)'}}>
            {/* Resume Header */}
            <div style={{background:activeTemplate.headerColor,margin:'-28px -28px 20px',padding:'20px 28px',borderRadius:'16px 16px 0 0'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'white'}}>{resumePersonal.fullName}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'rgba(255,255,255,0.85)'}}>{resumePersonal.title}</div>
              <div style={{marginTop:'8px',display:'flex',gap:'16px',flexWrap:'wrap'}}>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📧 {resumePersonal.email}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📱 {resumePersonal.phone}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📍 {resumePersonal.city}</span>
              </div>
            </div>

            {/* Summary Section */}
            {resumeSummary&&<div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>SUMMARY</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569',lineHeight:1.6}}>{resumeSummary}</div>
            </div>}

            {/* Experience Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>EXPERIENCE</div>
              {resumeData.experience.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.title}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',marginTop:'2px'}}>{entry.company} · {entry.startDate} - {entry.endDate}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569',marginTop:'6px',lineHeight:1.5}}>{entry.description}</div>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>EDUCATION</div>
              {resumeData.education.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.degree}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B'}}>{entry.institution} · {entry.year} · {entry.grade}</div>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>SKILLS</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                {addedSkills.map((skill,i)=>(
                  <span key={i} style={{background:'#FDF2F2',border:'1px solid #F5BFBF',color:'#BD1313',borderRadius:9999,padding:'3px 10px',fontSize:11,fontWeight:600,fontFamily:'var(--font-body)'}}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>PROJECTS</div>
              {resumeData.projects.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.name}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569',marginTop:'4px'}}>{entry.description}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#BD1313',marginTop:'2px'}}>{entry.link}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 6: Resume Complete
  if (screen === 'resume-complete') {
    const resumeSections = [
      { label: 'Personal', value: 100 },
      { label: 'Education', value: 100 },
      { label: 'Experience', value: 100 },
      { label: 'Skills', value: 60 },
      { label: 'Projects', value: 40 },
      { label: 'Summary', value: resumeSummary ? 100 : 0 }
    ];

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      {/* Section Header */}
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'12px'}}>
        <button onClick={()=>setScreen('resume-editor')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#475569"/></button>
        <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Resume Preview 📄</div>
        <div style={{marginLeft:'auto'}}>
          <span style={{background:'#FDF2F2',color:'#BD1313',border:'1px solid #F5BFBF',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:700,borderRadius:9999,padding:'3px 12px'}}>Strength: 68%</span>
        </div>
      </div>

      {/* Content */}
      <div style={{flex:1,overflow:'hidden',padding:'16px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'60% 40%',gap:'16px',height:'100%'}}>
          {/* Left: Resume Preview Panel */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'20px',overflowY:'auto',padding:'28px',boxShadow:'0 4px 16px rgba(0,0,0,0.06)'}} className="inner-scroll">
            {/* Resume Header */}
            <div style={{background:activeTemplate.headerColor,margin:'-28px -28px 20px',padding:'20px 28px',borderRadius:'16px 16px 0 0'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'white'}}>{resumePersonal.fullName}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'rgba(255,255,255,0.85)'}}>{resumePersonal.title}</div>
              <div style={{marginTop:'8px',display:'flex',gap:'16px',flexWrap:'wrap'}}>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📧 {resumePersonal.email}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📱 {resumePersonal.phone}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📍 {resumePersonal.city}</span>
              </div>
            </div>

            {/* Summary Section */}
            {resumeSummary&&<div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>SUMMARY</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569',lineHeight:1.6}}>{resumeSummary}</div>
            </div>}

            {/* Experience Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>EXPERIENCE</div>
              {resumeData.experience.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.title}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',marginTop:'2px'}}>{entry.company} · {entry.startDate} - {entry.endDate}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569',marginTop:'6px',lineHeight:1.5}}>{entry.description}</div>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>EDUCATION</div>
              {resumeData.education.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.degree}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B'}}>{entry.institution} · {entry.year} · {entry.grade}</div>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>SKILLS</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                {addedSkills.map((skill,i)=>(
                  <span key={i} style={{background:'#FDF2F2',border:'1px solid #F5BFBF',color:'#BD1313',borderRadius:9999,padding:'3px 10px',fontSize:11,fontWeight:600,fontFamily:'var(--font-body)'}}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>PROJECTS</div>
              {resumeData.projects.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.name}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569',marginTop:'4px'}}>{entry.description}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#BD1313',marginTop:'2px'}}>{entry.link}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Suggestions Panel */}
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {/* Suggestions Card */}
            <div style={{flex:1,overflow:'hidden',background:'white',border:'1px solid #E2E8F0',borderRadius:'20px',padding:'20px',display:'flex',flexDirection:'column'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700}}>AI Suggestions ✨</div>
                <span style={{background:'#FDF2F2',color:'#BD1313',border:'1px solid #F5BFBF',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:700,borderRadius:9999,padding:'3px 12px'}}>68%</span>
              </div>

              {/* Strength Meter */}
              <div style={{marginTop:'12px',marginBottom:'12px'}}>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'6px'}}>Resume Strength — 68%</div>
                <div style={{height:'6px',background:'#F5BFBF',borderRadius:9999,overflow:'hidden'}}>
                  <div style={{height:'100%',background:'#BD1313',width:'68%'}}/>
                </div>
              </div>

              {/* Suggestions List */}
              <div style={{flex:1,overflowY:'auto',marginTop:'12px',maxHeight:'200px'}} className="inner-scroll">
                {aiSuggestions.map((item,i)=>(
                  <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',padding:'10px 0',borderBottom:'1px solid #F8FAFF'}}>
                    <span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,color:item.type==='good'?'#16A34A':'#0F172A'}}>{item.title}</div>
                      <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'#94A3B8',marginTop:2}}>{item.detail}</div>
                    </div>
                    {item.type!=='good'&&<span style={{fontFamily:'var(--font-body)',fontSize:11,fontWeight:600,color:'#BD1313',cursor:'pointer',flexShrink:0}}>Fix →</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Section Bars Card */}
            <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'20px',padding:'16px 20px'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,marginBottom:'10px'}}>Sections</div>
              {resumeSections.map((s,i)=>(
                <div key={i} style={{marginBottom:8}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                    <span style={{fontFamily:'var(--font-body)',fontSize:11,color:'#475569'}}>{s.label}</span>
                    <span style={{fontFamily:'var(--font-body)',fontSize:11,fontWeight:600,color:s.value===100?'#16A34A':s.value>0?'#BD1313':'#DC2626'}}>{s.value}%</span>
                  </div>
                  <div style={{height:4,background:'#F5BFBF',borderRadius:9999,overflow:'hidden'}}>
                    <div style={{height:'100%',borderRadius:9999,width:s.value+'%',background:s.value===100?'#16A34A':s.value>0?'#BD1313':'#F5BFBF',transition:'width 0.8s ease-out'}}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons Row */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px'}}>
              <button onClick={()=>setTimeout(()=>showToast("Resume downloaded! 📄"),0)} style={{height:'40px',background:'#BD1313',color:'white',border:'none',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'8px',cursor:'pointer'}}>⬇ Download PDF</button>
              <button onClick={()=>setScreen('resume-editor')} style={{height:'40px',background:'transparent',border:'1.5px solid #F5BFBF',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'8px',cursor:'pointer'}}>✏ Edit</button>
              <button onClick={()=>setTimeout(()=>showToast("Link copied! 🔗"),0)} style={{height:'40px',background:'transparent',border:'1.5px solid #E2E8F0',color:'#64748B',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'8px',cursor:'pointer'}}>🔗 Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  // Fallback
  return null;
}
return { Resume };
})();

__mods["TestsAll"] = (function () {
const React = __ReactNS;
const { useState, useEffect } = __ReactNS;
const { ChevronLeft, ChevronRight, Clock, Flag, CheckCircle, XCircle, AlertTriangle, Lightbulb, X } = LucideReact;

interface TestsProps {
  screen: string;
  setScreen: (screen: string) => void;
  CircularProgress: any;
  showToast: (message: string) => void;
  showXPToast: (message: string) => void;
}

const testModules = [
  {id:'math', name:'Mathematics', icon:'https://img.icons8.com/3d-fluency/100/calculator.png', color:'#BD1313', bg:'#FFF1F2', lastScore:79, totalTests:5},
  {id:'english', name:'English', icon:'https://img.icons8.com/3d-fluency/100/open-book.png', color:'#16A34A', bg:'#F0FDF4', lastScore:88, totalTests:3},
  {id:'aptitude', name:'Aptitude', icon:'https://img.icons8.com/3d-fluency/100/brain.png', color:'#D97706', bg:'#FFFBEB', lastScore:52, totalTests:4},
  {id:'programming', name:'Programming', icon:'https://img.icons8.com/3d-fluency/100/source-code.png', color:'#2563EB', bg:'#EFF6FF', lastScore:71, totalTests:2},
  {id:'science', name:'Science', icon:'https://img.icons8.com/3d-fluency/100/test-tube.png', color:'#7C3AED', bg:'#FAF5FF', lastScore:65, totalTests:3},
  {id:'gk', name:'General Knowledge', icon:'https://img.icons8.com/3d-fluency/100/globe.png', color:'#0891B2', bg:'#ECFEFF', lastScore:74, totalTests:1}
];

const testHistory = [
  {id:'t1', subject:'Mathematics', score:79, date:'Mar 17', duration:'28 min', totalQ:30, correct:24, incorrect:4, skipped:2},
  {id:'t2', subject:'English', score:88, date:'Mar 15', duration:'22 min', totalQ:25, correct:22, incorrect:2, skipped:1},
  {id:'t3', subject:'Aptitude', score:52, date:'Mar 13', duration:'35 min', totalQ:40, correct:21, incorrect:12, skipped:7},
  {id:'t4', subject:'Programming', score:71, date:'Mar 11', duration:'30 min', totalQ:25, correct:18, incorrect:5, skipped:2},
  {id:'t5', subject:'Science', score:65, date:'Mar 10', duration:'25 min', totalQ:30, correct:20, incorrect:7, skipped:3}
];

const sampleQuestions = [
  {id:1, subject:'Mathematics', question:'If a train travels 360 km in 4 hours, what is its average speed in km/h?', options:['80','90','100','120'], correct:1, difficulty:'easy', explanation:'Speed = Distance/Time = 360/4 = 90 km/h'},
  {id:2, subject:'Mathematics', question:'What is the value of 15% of 240?', options:['30','36','40','42'], correct:1, difficulty:'easy', explanation:'15% of 240 = (15/100) × 240 = 36'},
  {id:3, subject:'Mathematics', question:'A rectangle has length 12cm and width 8cm. What is its area?', options:['80 cm²','96 cm²','100 cm²','120 cm²'], correct:1, difficulty:'medium', explanation:'Area = length × width = 12 × 8 = 96 cm²'},
  {id:4, subject:'Mathematics', question:'If 3x + 7 = 22, what is the value of x?', options:['3','4','5','6'], correct:2, difficulty:'medium', explanation:'3x = 22 - 7 = 15, so x = 15/3 = 5'},
  {id:5, subject:'Mathematics', question:'What is the LCM of 12 and 18?', options:['24','36','48','72'], correct:1, difficulty:'medium', explanation:'LCM(12,18) = 36'},
  {id:6, subject:'Mathematics', question:'A circle has radius 7cm. What is its circumference? (π = 22/7)', options:['22 cm','44 cm','66 cm','88 cm'], correct:1, difficulty:'hard', explanation:'Circumference = 2πr = 2 × 22/7 × 7 = 44 cm'},
  {id:7, subject:'Mathematics', question:'If A = {1,2,3} and B = {2,3,4}, what is A∩B?', options:['{1,2,3,4}','{2,3}','{1,4}','{1,2,3}'], correct:1, difficulty:'hard', explanation:'Intersection contains elements in both sets: {2,3}'},
  {id:8, subject:'Mathematics', question:'What is the simple interest on ₹5000 at 8% per annum for 3 years?', options:['₹1000','₹1200','₹1500','₹2000'], correct:1, difficulty:'hard', explanation:'SI = (P × R × T)/100 = (5000 × 8 × 3)/100 = ₹1200'},
  {id:9, subject:'Mathematics', question:'Two numbers are in ratio 3:5. If their sum is 96, find the larger number.', options:['36','48','60','72'], correct:2, difficulty:'hard', explanation:'3x + 5x = 96, 8x = 96, x = 12. Larger = 5x = 60'},
  {id:10, subject:'Mathematics', question:'What is the probability of getting a head when a fair coin is tossed?', options:['1/4','1/3','1/2','2/3'], correct:2, difficulty:'easy', explanation:'P(Head) = 1/2 = 0.5'}
];

function Tests({ screen, setScreen, CircularProgress, showToast, showXPToast }: TestsProps) {
  const [config, setConfig] = useState({ subject: 'Mathematics', difficulty: 'mixed', questionCount: 10, timeLimit: 15, types: ['mcq'], passPercentage: 60 });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [flagged, setFlagged] = useState<number[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [testMode, setTestMode] = useState('subject');
  const [specificTopic, setSpecificTopic] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [questionSections, setQuestionSections] = useState([
    {type:'MCQ', count:5, enabled:true},
    {type:'True/False', count:2, enabled:true},
    {type:'Single Choice', count:0, enabled:false},
    {type:'Short Answer', count:0, enabled:false},
    {type:'Long Answer', count:0, enabled:false}
  ]);
  const [passPercentage, setPassPercentage] = useState(60);

  // Timer
  useEffect(() => {
    if (screen === 'tests-taking') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowSubmitModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [screen]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2,'0')}`;
  };

  const toggleFlag = () => {
    if (flagged.includes(currentQ)) {
      setFlagged(flagged.filter(i => i !== currentQ));
    } else {
      setFlagged([...flagged, currentQ]);
    }
  };

  const calculateScore = () => {
    const correct = Object.entries(answers).filter(([qIndex, ansIndex]) => sampleQuestions[parseInt(qIndex)]?.correct === ansIndex).length;
    return Math.round((correct / sampleQuestions.length) * 100);
  };

  const getCorrectCount = () => Object.entries(answers).filter(([qIndex, ansIndex]) => sampleQuestions[parseInt(qIndex)]?.correct === ansIndex).length;
  const getIncorrectCount = () => Object.entries(answers).filter(([qIndex, ansIndex]) => sampleQuestions[parseInt(qIndex)]?.correct !== ansIndex).length;
  const getSkippedCount = () => sampleQuestions.length - Object.keys(answers).length;

  const score = calculateScore();
  const correctCount = getCorrectCount();
  const incorrectCount = getIncorrectCount();
  const skippedCount = getSkippedCount();

  // ALL 7 SCREENS - Complete implementation
  
  // Screen 1 stays as is in the original Tests.tsx
  if (screen === 'tests') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter" style={{fontFamily: 'var(--font-body)'}}>
      <div style={{height:'56px', flexShrink:0, background:'white', borderBottom:'1px solid #E2E8F0', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <div style={{width:'36px', height:'36px', borderRadius:'10px', background:'#FFFBEB', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png" width="22" height="22" alt="" />
          </div>
          <div>
            <div style={{fontFamily:'var(--font-display)', fontSize:'20px', fontWeight:700, color:'#0F172A'}}>Test Preparation 📝</div>
            <div style={{fontFamily:'var(--font-body)', fontSize:'12px', color:'#94A3B8'}}>Practice. Analyze. Improve.</div>
          </div>
        </div>
        <div style={{display:'flex', gap:'8px'}}>
          <span style={{background:'#F1F5F9', color:'#64748B', border:'1px solid #E2E8F0', fontSize:'11px', fontWeight:600, padding:'4px 12px', borderRadius:9999}}>12 Tests</span>
          <span style={{background:'#FEF3C7', color:'#D97706', border:'1px solid #FCD34D', fontSize:'11px', fontWeight:600, padding:'4px 12px', borderRadius:9999}}>74% Avg</span>
        </div>
      </div>
      <div style={{flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', flexDirection:'column', gap:'16px'}} className="inner-scroll">
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
          {[{val:'12',label:'TESTS TAKEN',icon:'https://img.icons8.com/3d-fluency/100/bookmark-book.png',color:'#D97706',bg:'#FFFBEB'},{val:'74%',label:'AVG SCORE',icon:'https://img.icons8.com/3d-fluency/100/goal.png',color:'#16A34A',bg:'#F0FDF4'},{val:'88%',label:'BEST SCORE',icon:'https://img.icons8.com/3d-fluency/100/trophy.png',color:'#BD1313',bg:'#FFF1F2'},{val:'4.2h',label:'TOTAL TIME',icon:'https://img.icons8.com/3d-fluency/100/lightning-bolt.png',color:'#2563EB',bg:'#EFF6FF'}].map((stat,i)=>(
            <div key={i} style={{height:'80px',background:`linear-gradient(135deg, ${stat.bg}, white)`,border:'1px solid #E2E8F0',borderRadius:'16px',padding:'14px 16px',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:stat.color}}/>
              <img src={stat.icon} width="24" height="24" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'#0F172A',marginTop:'4px'}}>{stat.val}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8'}}>{stat.label}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setScreen('tests-create')} style={{width:'100%',height:'56px',background:'linear-gradient(135deg, #D97706, #B45309)',borderRadius:'16px',border:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',cursor:'pointer',boxShadow:'0 4px 16px rgba(217,119,6,0.3)'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(217,119,6,0.4)'}} onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 16px rgba(217,119,6,0.3)'}}>
          <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png" width="28" height="28" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',background:'transparent'}}/>
          <div style={{textAlign:'left'}}><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'white'}}>Create New Test +</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'rgba(255,255,255,0.75)'}}>AI generates questions for you</div></div>
        </button>
        <div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}><div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Practice by Subject 📚</div></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'12px'}}>
          {testModules.map(m=>(
            <div key={m.id} onClick={()=>{setConfig({...config,subject:m.name});setScreen('tests-create')}} style={{height:'90px',background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'14px 16px',cursor:'pointer',display:'flex',alignItems:'center',gap:'12px'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 20px rgba(0,0,0,0.08)';e.currentTarget.style.borderColor=m.color}} onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='#E2E8F0'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'12px',background:m.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><img src={m.icon} width="24" height="24" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/></div>
              <div style={{flex:1}}><div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{m.name}</div><div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'4px'}}><span style={{background:m.lastScore>=75?'#DCFCE7':m.lastScore>=50?'#FEF3C7':'#FEF2F2',color:m.lastScore>=75?'#16A34A':m.lastScore>=50?'#D97706':'#DC2626',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'2px 8px'}}>{m.lastScore}%</span><span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>· {m.totalTests} tests</span></div></div>
            </div>
          ))}
        </div></div>
        <div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}><div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Recent Tests 📋</div></div>
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {testHistory.map(t=>(
            <div key={t.id} onClick={()=>setScreen('tests-score')} style={{height:'64px',background:'white',border:'1px solid #E2E8F0',borderRadius:'14px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}} onMouseEnter={(e)=>{e.currentTarget.style.borderColor='#FCD34D';e.currentTarget.style.background='#FFFBEB'}} onMouseLeave={(e)=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.background='white'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',border:`2px solid ${t.score>=75?'#16A34A':t.score>=50?'#D97706':'#DC2626'}`,background:t.score>=75?'#DCFCE7':t.score>=50?'#FFFBEB':'#FEF2F2',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:'13px',fontWeight:800,color:t.score>=75?'#16A34A':t.score>=50?'#D97706':'#DC2626',flexShrink:0}}>{t.score}%</div>
              <div style={{flex:1}}><div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{t.subject}</div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>{t.date} · {t.duration} · {t.totalQ} questions</div></div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'4px'}}><div style={{display:'flex',gap:'6px'}}><span style={{background:'#DCFCE7',color:'#16A34A',fontSize:'10px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>✓{t.correct}</span><span style={{background:'#FEF2F2',color:'#DC2626',fontSize:'10px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>✗{t.incorrect}</span></div><ChevronRight size={16} color="#94A3B8"/></div>
            </div>
          ))}
        </div></div>
      </div>
    </div>;
  }

  // Screen 2: Create Test
  if (screen === 'tests-create') {
    const totalQuestions = questionSections.filter(s=>s.enabled).reduce((sum,s)=>sum+s.count,0);

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('tests')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Create Test 🎯</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Configure your practice test</div></div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'680px',margin:'0 auto',width:'100%',display:'flex',flexDirection:'column',gap:'20px'}}>

          {/* Test Mode Selector */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'10px'}}>Choose Test Mode</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
              {[
                {id:'subject',icon:'📚',title:'Subject Based',desc:'Choose from our subject library'},
                {id:'topic',icon:'🎯',title:'Topic Specific',desc:'Enter any specific topic'},
                {id:'jd',icon:'💼',title:'JD Assessment',desc:'Paste job description for targeted test',popular:true}
              ].map(mode => (
                <div key={mode.id} onClick={()=>setTestMode(mode.id)} style={{background:testMode===mode.id?'#FFFBEB':'white',border:testMode===mode.id?'2px solid #FCD34D':'1.5px solid #E2E8F0',borderRadius:14,padding:'14px 16px',cursor:'pointer',position:'relative',transition:'all 0.2s'}}>
                  {mode.popular && <div style={{position:'absolute',top:0,right:0,background:'#FEF3C7',color:'#D97706',fontFamily:'var(--font-body)',fontSize:10,fontWeight:700,borderRadius:'0 14px 0 10px',padding:'3px 8px'}}>Popular</div>}
                  <div style={{fontSize:32,marginBottom:8}}>{mode.icon}</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,color:'#0F172A',marginBottom:4}}>{mode.title}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#94A3B8',lineHeight:1.4}}>{mode.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Mode */}
          {testMode === 'subject' && (
            <>
              <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>SELECT SUBJECT</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'8px'}}>
                  {testModules.map(m=>(
                    <div key={m.id} onClick={()=>setConfig({...config,subject:m.name})} style={{height:'52px',background:config.subject===m.name?m.bg:'white',border:config.subject===m.name?`2px solid ${m.color}`:'1.5px solid #E2E8F0',borderRadius:'12px',padding:'8px 12px',display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
                      <img src={m.icon} width="20" height="20" alt=""/><span style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Specific Topic (Optional) */}
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Specific Topic (Optional)</div>
                <input value={specificTopic} onChange={(e)=>setSpecificTopic(e.target.value)} placeholder="e.g. Quadratic Equations, Probability..." style={{width:'100%',height:44,border:'1.5px solid #E2E8F0',borderRadius:12,padding:'0 16px',fontFamily:'var(--font-body)',fontSize:14,color:'#0F172A'}}/>
              </div>
            </>
          )}

          {/* Topic Mode */}
          {testMode === 'topic' && (
            <>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Enter Your Topic</div>
                <input value={specificTopic} onChange={(e)=>setSpecificTopic(e.target.value)} placeholder="e.g. Time and Work, Data Structures..." style={{width:'100%',height:48,border:'1.5px solid #E2E8F0',borderRadius:12,padding:'0 16px',fontFamily:'var(--font-body)',fontSize:15,color:'#0F172A',fontWeight:600}}/>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',marginBottom:'8px'}}>Suggested Topics</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {['Quadratic Equations','Probability','Binary Trees','Sorting Algorithms','Profit & Loss','Grammar'].map(topic => (
                    <div key={topic} onClick={()=>setSpecificTopic(topic)} style={{background:'#F1F5F9',border:'1px solid #E2E8F0',borderRadius:9999,padding:'6px 14px',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,color:'#475569',cursor:'pointer',transition:'all 0.2s'}}
                      onMouseEnter={(e)=>{e.currentTarget.style.background='#FFFBEB';e.currentTarget.style.borderColor='#FCD34D';e.currentTarget.style.color='#D97706';}}
                      onMouseLeave={(e)=>{e.currentTarget.style.background='#F1F5F9';e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.color='#475569';}}
                    >{topic}</div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* JD Mode */}
          {testMode === 'jd' && (
            <>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Paste Job Description</div>
                <textarea value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} placeholder="Paste the complete job description here. We will analyze requirements and generate targeted questions to assess your fit for this role..." style={{width:'100%',minHeight:120,border:'1.5px solid #E2E8F0',borderRadius:12,padding:12,fontFamily:'var(--font-body)',fontSize:14,color:'#0F172A',resize:'none',lineHeight:1.6}}/>
              </div>
              <button onClick={()=>setTimeout(()=>showToast("Analyzing JD... Generating questions! 🎯"),0)} style={{width:'100%',height:44,background:'linear-gradient(135deg, #D97706, #B45309)',color:'white',border:'none',borderRadius:12,fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,cursor:'pointer'}}>
                ✨ Analyze JD & Generate Questions
              </button>
            </>
          )}

          {/* Difficulty Level */}
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Difficulty Level</div>
          <div style={{display:'flex',gap:'8px'}}>
            {[{id:'beginner',label:'Beginner',color:'#16A34A',bg:'#DCFCE7'},{id:'intermediate',label:'Intermediate',color:'#D97706',bg:'#FEF3C7'},{id:'advanced',label:'Advanced',color:'#DC2626',bg:'#FEF2F2'},{id:'mixed',label:'Mixed',color:'#BD1313',bg:'#FDF2F2'}].map(d=>(
              <button key={d.id} onClick={()=>setConfig({...config,difficulty:d.id})} style={{flex:1,height:'40px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,border:config.difficulty===d.id?`1.5px solid ${d.color}`:'1.5px solid #E2E8F0',background:config.difficulty===d.id?d.bg:'white',color:config.difficulty===d.id?d.color:'#475569'}}>{d.label}</button>
            ))}
          </div></div>
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>DIFFICULTY LEVEL</div>
          <div style={{display:'flex',gap:'8px'}}>
            {['easy','medium','hard','mixed'].map(d=>(
              <button key={d} onClick={()=>setConfig({...config,difficulty:d})} style={{height:'40px',padding:'0 20px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,border:config.difficulty===d?(d==='easy'?'1.5px solid #16A34A':d==='medium'?'1.5px solid #D97706':d==='hard'?'1.5px solid #DC2626':'1.5px solid #BD1313'):'1.5px solid #E2E8F0',background:config.difficulty===d?(d==='easy'?'#DCFCE7':d==='medium'?'#FEF3C7':d==='hard'?'#FEF2F2':'#FDF2F2'):'white',color:config.difficulty===d?(d==='easy'?'#16A34A':d==='medium'?'#D97706':d==='hard'?'#DC2626':'#BD1313'):'#475569'}}>{d.charAt(0).toUpperCase()+d.slice(1)}</button>
            ))}
          </div></div>
          {/* Pass Percentage */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Pass Percentage</div>
            <div style={{display:'flex',gap:'8px'}}>
              {[40,50,60,70,80].map(p=>(
                <button key={p} onClick={()=>setConfig({...config,passPercentage:p})} style={{flex:1,height:'36px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,background:config.passPercentage===p?'#D97706':'#F1F5F9',color:config.passPercentage===p?'white':'#475569',border:config.passPercentage===p?'1.5px solid #D97706':'1.5px solid #E2E8F0'}}>{p}%</button>
              ))}
            </div>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'#64748B',marginTop:6}}>Students need to score {config.passPercentage}% to pass</div>
          </div>

          {/* Question Format Builder */}
          <div>
            <div style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:700,color:'#0F172A',marginBottom:4}}>Question Format</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'#94A3B8',marginBottom:12}}>Build your question distribution</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,color:'#D97706',marginBottom:8}}>Total: {totalQuestions} questions</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {questionSections.map((section,idx) => (
                <div key={section.type} style={{height:56,background:'white',border:'1px solid #E2E8F0',borderRadius:12,padding:'0 14px',display:'flex',alignItems:'center',gap:12}}>
                  <div onClick={()=>setQuestionSections(prev=>prev.map((s,i)=>i===idx?{...s,enabled:!s.enabled}:s))} style={{width:18,height:18,borderRadius:4,border:section.enabled?'2px solid #D97706':'2px solid #CBD5E1',background:section.enabled?'#D97706':'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
                    {section.enabled && <CheckCircle size={12} color="white"/>}
                  </div>
                  <div style={{flex:1,fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,color:section.enabled?'#0F172A':'#94A3B8'}}>{section.type}</div>
                  {section.enabled && (
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <button onClick={()=>section.count>0&&setQuestionSections(prev=>prev.map((s,i)=>i===idx?{...s,count:s.count-1}:s))} style={{width:24,height:24,borderRadius:'50%',background:'#F1F5F9',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:16,fontWeight:600,color:'#475569'}}>-</button>
                      <div style={{width:20,textAlign:'center',fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'#D97706'}}>{section.count}</div>
                      <button onClick={()=>section.count<7&&setQuestionSections(prev=>prev.map((s,i)=>i===idx?{...s,count:s.count+1}:s))} style={{width:24,height:24,borderRadius:'50%',background:'#F1F5F9',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:16,fontWeight:600,color:'#475569'}}>+</button>
                      <span style={{fontFamily:'var(--font-body)',fontSize:10,color:'#94A3B8'}}>Max 7</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Time Limit</div>
          <div style={{display:'flex',gap:'8px'}}>
            {[5,10,15,20,30].map(t=>(
              <button key={t} onClick={()=>setConfig({...config,timeLimit:t})} style={{height:'40px',padding:'0 16px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,background:config.timeLimit===t?'#D97706':'#F1F5F9',color:config.timeLimit===t?'white':'#475569',border:config.timeLimit===t?'1.5px solid #D97706':'1.5px solid #E2E8F0'}}>{t} min</button>
            ))}
          </div></div>
          <div style={{background:'linear-gradient(135deg, #FFFBEB, white)',border:'1px solid #FCD34D',borderRadius:'16px',padding:'16px 20px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#D97706',marginBottom:'12px'}}>Test Summary</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              {(() => {
                const totalQ = questionSections.filter(s => s.enabled).reduce((sum, s) => sum + s.count, 0);
                const modeDisplay = testMode === 'subject' ? {l: specificTopic ? 'TOPIC' : 'SUBJECT', v: specificTopic || config.subject} : testMode === 'topic' ? {l: 'TOPIC', v: specificTopic || 'General'} : {l: 'TYPE', v: 'JD-Based'};
                const diffDisplay = config.difficulty.charAt(0).toUpperCase() + config.difficulty.slice(1);
                return [{l: modeDisplay.l, v: modeDisplay.v}, {l: 'DIFFICULTY', v: diffDisplay}, {l: 'QUESTIONS', v: totalQ}, {l: 'PASS', v: `${passPercentage}%`}, {l: 'TIME', v: `${config.timeLimit} min`}];
              })().map((it, i) => (
                <div key={`summary-${it.l}`}><div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8'}}>{it.l}</div><div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{it.v}</div></div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:'12px',marginTop:'8px'}}>
            <button onClick={()=>setScreen('tests-preview')} style={{flex:1,height:'48px',background:'transparent',border:'1.5px solid #FCD34D',color:'#D97706',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Preview Questions</button>
            <button onClick={()=>setScreen('tests-preview')} style={{flex:1.5,height:'48px',background:'linear-gradient(135deg, #D97706, #B45309)',border:'none',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,borderRadius:'12px',cursor:'pointer'}}>Generate Test</button>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 3: Test Preview
  if (screen === 'tests-preview') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('tests-create')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Test Preview 👀</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Review before starting</div></div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'680px',margin:'0 auto',width:'100%'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px',padding:'16px 20px',background:'linear-gradient(135deg, #FFFBEB, white)',border:'1px solid #FCD34D',borderRadius:'16px',marginBottom:'16px'}}>
            <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png" width="48" height="48" alt="" style={{filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',background:'transparent'}}/>
            <div style={{flex:1}}><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Mathematics Test 📝</div>
            <div style={{display:'flex',gap:'8px',marginTop:'6px',flexWrap:'wrap'}}>
              {[{t:'10 Questions',c:'#D97706',bg:'#FFFBEB',b:'#FCD34D'},{t:'15 Minutes',c:'#BD1313',bg:'#FDF2F2',b:'#F5BFBF'},{t:'Mixed',c:'#2563EB',bg:'#EFF6FF',b:'#BFDBFE'},{t:'MCQ',c:'#16A34A',bg:'#F0FDF4',b:'#86EFAC'}].map((ch,i)=>(
                <span key={i} style={{background:ch.bg,color:ch.c,border:`1px solid ${ch.b}`,fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>{ch.t}</span>
              ))}
            </div></div>
          </div>
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'16px 20px',marginBottom:'16px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'12px'}}>Instructions 📋</div>
            {['Each correct answer earns 1 mark','No negative marking for wrong answers','You can skip and return to questions','Timer starts when you click Start Test','Results are shown immediately after submission'].map((ins,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',height:'32px'}}><div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#DCFCE7',display:'flex',alignItems:'center',justifyContent:'center'}}><CheckCircle size={12} color="#16A34A"/></div><span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569'}}>{ins}</span></div>
            ))}
          </div>
          <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'12px'}}>Sample Questions 👇</div>
          {sampleQuestions.slice(0,3).map((q,idx)=>(
            <div key={q.id} style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'14px',padding:'16px',marginBottom:'10px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                <span style={{background:'#FFFBEB',color:'#D97706',border:'1px solid #FCD34D',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>Q{idx+1}</span>
                <span style={{background:q.difficulty==='easy'?'#DCFCE7':q.difficulty==='medium'?'#FEF3C7':'#FEF2F2',color:q.difficulty==='easy'?'#16A34A':q.difficulty==='medium'?'#D97706':'#DC2626',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:600,borderRadius:9999,padding:'2px 8px'}}>{q.difficulty}</span>
              </div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',lineHeight:1.6,marginTop:'10px'}}>{q.question}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'6px',marginTop:'12px'}}>
                {q.options.map((opt,oi)=>(
                  <div key={oi} style={{background:'#F8FAFF',border:'1px solid #E2E8F0',borderRadius:'8px',padding:'8px 12px',display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'white',border:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:'#94A3B8'}}>{String.fromCharCode(65+oi)}</div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569'}}>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',textAlign:'center',marginTop:'8px'}}>+ 7 more questions</div>
          <button onClick={()=>{setScreen('tests-taking');showToast("Test started! Good luck 🍀");showXPToast("+50 XP 🎉");setTimeLeft(config.timeLimit*60);setAnswers({});setFlagged([]);setCurrentQ(0)}} style={{width:'100%',height:'56px',background:'linear-gradient(135deg, #D97706, #B45309)',borderRadius:'16px',border:'none',fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'white',cursor:'pointer',boxShadow:'0 8px 24px rgba(217,119,6,0.35)',marginTop:'16px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png" width="24" height="24" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.2))'}}/>Start Test — {config.timeLimit} Minutes
          </button>
        </div>
      </div>
    </div>;
  }

  // Screen 4: Test Taking
  if (screen === 'tests-taking') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Mathematics Test</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Stay focused and do your best!</div></div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'6px 14px'}}>
            <Clock size={16} color="#DC2626"/><span style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:800,color:'#DC2626'}}>{formatTime(timeLeft)}</span>
          </div>
          <button onClick={()=>setShowSubmitModal(true)} style={{background:'#FEF2F2',color:'#DC2626',border:'1px solid #FECACA',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,borderRadius:'8px',padding:'6px 14px',cursor:'pointer'}}>End Test</button>
        </div>
      </div>
      <div style={{height:'4px',background:'#E2E8F0',position:'relative'}}><div style={{position:'absolute',top:0,left:0,height:'100%',background:'#D97706',width:`${((currentQ+1)/sampleQuestions.length)*100}%`,transition:'width 0.3s'}}/></div>
      <div style={{flex:1,display:'flex',overflow:'hidden'}}>
        <div style={{flex:1,padding:'24px',overflowY:'auto',display:'flex',flexDirection:'column',alignItems:'center'}} className="inner-scroll">
          <div style={{width:'100%',maxWidth:'720px'}}>
            <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'20px',padding:'24px',boxShadow:'0 4px 16px rgba(0,0,0,0.06)',marginBottom:'20px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <span style={{background:'#FFFBEB',color:'#D97706',border:'1px solid #FCD34D',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:700,borderRadius:9999,padding:'4px 12px'}}>Question {currentQ+1} of {sampleQuestions.length}</span>
                <button onClick={toggleFlag} style={{background:flagged.includes(currentQ)?'#FEF3C7':'transparent',border:flagged.includes(currentQ)?'1px solid #FCD34D':'1px solid #E2E8F0',borderRadius:'8px',padding:'6px 12px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
                  <Flag size={14} color={flagged.includes(currentQ)?'#D97706':'#94A3B8'} fill={flagged.includes(currentQ)?'#D97706':'none'}/><span style={{fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,color:flagged.includes(currentQ)?'#D97706':'#94A3B8'}}>Flag</span>
                </button>
              </div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'20px',fontWeight:700,color:'#0F172A',lineHeight:1.5,marginBottom:'20px'}}>{sampleQuestions[currentQ].question}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {sampleQuestions[currentQ].options.map((opt,oi)=>(
                  <div key={oi} onClick={()=>setAnswers({...answers,[currentQ]:oi})} style={{background:answers[currentQ]===oi?'#FFFBEB':'white',border:answers[currentQ]===oi?'2px solid #D97706':'1.5px solid #E2E8F0',borderRadius:'12px',padding:'14px 16px',cursor:'pointer',display:'flex',alignItems:'center',gap:'12px',transition:'all 0.2s'}} onMouseEnter={(e)=>{if(answers[currentQ]!==oi){e.currentTarget.style.background='#F8FAFF';e.currentTarget.style.borderColor='#BFDBFE'}}} onMouseLeave={(e)=>{if(answers[currentQ]!==oi){e.currentTarget.style.background='white';e.currentTarget.style.borderColor='#E2E8F0'}}}>
                    <div style={{width:'28px',height:'28px',borderRadius:'50%',background:answers[currentQ]===oi?'#D97706':'white',border:answers[currentQ]===oi?'2px solid #D97706':'2px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:700,color:answers[currentQ]===oi?'white':'#94A3B8',flexShrink:0}}>{String.fromCharCode(65+oi)}</div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'15px',color:'#0F172A'}}>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',gap:'12px'}}>
              <button onClick={()=>{if(currentQ>0)setCurrentQ(currentQ-1)}} disabled={currentQ===0} style={{flex:0.8,height:'48px',background:currentQ===0?'#F1F5F9':'white',border:'1.5px solid #E2E8F0',color:currentQ===0?'#CBD5E1':'#475569',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:currentQ===0?'not-allowed':'pointer'}}>← Previous</button>
              <button onClick={()=>{if(currentQ<sampleQuestions.length-1)setCurrentQ(currentQ+1);else setShowSubmitModal(true)}} style={{flex:1,height:'48px',background:'linear-gradient(135deg, #D97706, #B45309)',border:'none',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,borderRadius:'12px',cursor:'pointer'}}>{currentQ<sampleQuestions.length-1?'Next →':'Submit Test'}</button>
            </div>
          </div>
        </div>
        <div style={{width:'260px',borderLeft:'1px solid #E2E8F0',padding:'20px 16px',overflowY:'auto',background:'#FAFAFA'}} className="inner-scroll">
          <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'12px'}}>QUESTION PALETTE</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5, 1fr)',gap:'8px'}}>
            {sampleQuestions.map((q,qi)=>(
              <button key={q.id} onClick={()=>setCurrentQ(qi)} style={{width:'40px',height:'40px',borderRadius:'8px',background:qi===currentQ?'#D97706':answers[qi]!==undefined?'#DCFCE7':'white',border:flagged.includes(qi)?'2px solid #D97706':'1px solid #E2E8F0',color:qi===currentQ?'white':answers[qi]!==undefined?'#16A34A':'#94A3B8',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:700,cursor:'pointer',position:'relative'}}>
                {qi+1}{flagged.includes(qi)&&<Flag size={8} color={qi===currentQ?'white':'#D97706'} fill={qi===currentQ?'white':'#D97706'} style={{position:'absolute',top:'2px',right:'2px'}}/>}
              </button>
            ))}
          </div>
          <div style={{marginTop:'16px',padding:'12px',background:'white',border:'1px solid #E2E8F0',borderRadius:'12px'}}>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',marginBottom:'8px'}}>PROGRESS</div>
            {[{l:'Answered',v:Object.keys(answers).length,c:'#16A34A'},{l:'Skipped',v:sampleQuestions.length-Object.keys(answers).length,c:'#94A3B8'},{l:'Flagged',v:flagged.length,c:'#D97706'}].map((s,si)=>(
              <div key={si} style={{display:'flex',justifyContent:'space-between',height:'28px',alignItems:'center',borderBottom:si<2?'1px solid #F1F5F9':'none'}}><span style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569'}}>{s.l}</span><span style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:800,color:s.c}}>{s.v}</span></div>
            ))}
          </div>
        </div>
      </div>
      {showSubmitModal&&<div style={{position:'fixed',inset:0,background:'rgba(15,23,42,0.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,backdropFilter:'blur(4px)'}} onClick={()=>setShowSubmitModal(false)}>
        <div onClick={(e)=>e.stopPropagation()} style={{background:'white',borderRadius:'20px',padding:'28px 32px',maxWidth:'480px',width:'90%',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'20px',fontWeight:700,color:'#0F172A'}}>Submit Test?</div>
            <button onClick={()=>setShowSubmitModal(false)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px'}}><X size={20} color="#94A3B8"/></button>
          </div>
          <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'#64748B',lineHeight:1.6,marginBottom:'20px'}}>You have answered <span style={{fontWeight:700,color:'#16A34A'}}>{Object.keys(answers).length}/{sampleQuestions.length}</span> questions. {sampleQuestions.length-Object.keys(answers).length>0&&`You still have ${sampleQuestions.length-Object.keys(answers).length} unanswered question(s).`}</div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <button onClick={()=>{setShowSubmitModal(false);setScreen('tests-score');showXPToast(score>=75?"+100 XP 🎉":"+50 XP")}} style={{width:'100%',height:'48px',background:'linear-gradient(135deg, #D97706, #B45309)',border:'none',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,borderRadius:'12px',cursor:'pointer'}}>Yes, Submit Test</button>
            <button onClick={()=>setShowSubmitModal(false)} style={{width:'100%',height:'44px',background:'transparent',border:'1.5px solid #E2E8F0',color:'#475569',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Continue Test</button>
          </div>
        </div>
      </div>}
    </div>;
  }

  // Screen 6: Score Overview
  if (screen === 'tests-score') {
    const passed = score >= config.passPercentage;
    const accuracy = Math.round((correctCount / sampleQuestions.length) * 100);
    const timeTaken = config.timeLimit - Math.floor(timeLeft / 60);
    const avgTimePerQ = Math.round(timeTaken * 60 / sampleQuestions.length);

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('tests')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Test Results 📊</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Mathematics · {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div></div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'32px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'1000px',margin:'0 auto',width:'100%'}}>

          {/* SECTION 1 — SCORE HERO */}
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <div style={{fontFamily:'Syne, var(--font-display)',fontSize:'64px',fontWeight:800,color:passed?'#16A34A':'#DC2626',lineHeight:1,marginBottom:'16px'}}>{score}%</div>
            <div style={{display:'inline-block',background:passed?'linear-gradient(135deg, #16A34A, #15803D)':'linear-gradient(135deg, #DC2626, #B91C1C)',color:'white',fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,borderRadius:9999,padding:'10px 32px',textTransform:'uppercase',letterSpacing:'1px',boxShadow:passed?'0 8px 24px rgba(22,163,74,0.25)':'0 8px 24px rgba(220,38,38,0.25)'}}>{passed?'PASSED ✓':'FAILED ✗'}</div>
          </div>

          {/* SECTION 2 — QUICK STATS */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'12px',marginBottom:'24px'}}>
            {[
              {label:'Accuracy',value:`${accuracy}%`,icon:'🎯',color:'#2563EB',bg:'#EFF6FF',border:'#BFDBFE'},
              {label:'Time Taken',value:`${timeTaken} min`,icon:'⏱️',color:'#D97706',bg:'#FFFBEB',border:'#FCD34D'},
              {label:'Questions',value:sampleQuestions.length,icon:'📝',color:'#7C3AED',bg:'#F5F3FF',border:'#DDD6FE'},
              {label:'Pass Threshold',value:`${config.passPercentage}%`,icon:'🎓',color:'#16A34A',bg:'#F0FDF4',border:'#86EFAC'}
            ].map((stat,i)=>(
              <div key={`stat-${stat.label}`} style={{background:'white',border:`1px solid ${stat.border}`,borderRadius:'16px',padding:'20px',textAlign:'center'}}>
                <div style={{fontSize:'28px',marginBottom:'8px'}}>{stat.icon}</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'#0F172A',marginBottom:'4px'}}>{stat.value}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#94A3B8',letterSpacing:'0.5px'}}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* SECTION 3 — ANSWER BREAKDOWN */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'12px',marginBottom:'24px'}}>
            {[
              {label:'Correct',value:correctCount,icon:CheckCircle,color:'#16A34A',bg:'#DCFCE7',border:'#86EFAC'},
              {label:'Wrong',value:incorrectCount,icon:XCircle,color:'#DC2626',bg:'#FEF2F2',border:'#FECACA'},
              {label:'Skipped',value:skippedCount,icon:AlertTriangle,color:'#94A3B8',bg:'#F1F5F9',border:'#E2E8F0'}
            ].map((item,i)=>{
              const Icon = item.icon;
              return <div key={`breakdown-${item.label}`} style={{background:item.bg,border:`2px solid ${item.border}`,borderRadius:'16px',padding:'24px',textAlign:'center'}}>
                <Icon size={32} color={item.color} style={{margin:'0 auto 12px'}}/>
                <div style={{fontFamily:'var(--font-display)',fontSize:'32px',fontWeight:800,color:item.color,marginBottom:'4px'}}>{item.value}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,color:item.color,textTransform:'uppercase',letterSpacing:'0.5px'}}>{item.label}</div>
              </div>
            })}
          </div>

          {/* SECTION 4 — RESULT SUMMARY */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'16px'}}>Result Summary</div>
            <div style={{display:'grid',gridTemplateColumns:'120px 1fr',gap:'12px 20px'}}>
              {[
                {label:'Subject',value:config.subject},
                {label:'Difficulty',value:config.difficulty.charAt(0).toUpperCase()+config.difficulty.slice(1)},
                {label:'Date',value:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})},
                {label:'Duration',value:`${timeTaken} minutes`},
                {label:'Score',value:`${score}%`},
                {label:'Result',value:passed?'PASSED':'FAILED',colored:true}
              ].map((row,i)=>(
                <React.Fragment key={`summary-row-${row.label}`}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#64748B'}}>{row.label}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:row.colored?700:600,color:row.colored?(passed?'#16A34A':'#DC2626'):'#0F172A'}}>{row.value}</div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* SECTION 5 — KEY METRICS */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Key Metrics</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'24px'}}>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Accuracy Rate</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'28px',fontWeight:800,color:'#0F172A'}}>{accuracy}%</div>
                <div style={{background:'#F1F5F9',borderRadius:'8px',height:'8px',marginTop:'12px',overflow:'hidden'}}>
                  <div style={{background:'linear-gradient(90deg, #2563EB, #1D4ED8)',height:'100%',width:`${accuracy}%`,transition:'width 0.5s ease'}}></div>
                </div>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Speed</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'28px',fontWeight:800,color:'#0F172A'}}>{avgTimePerQ}s<span style={{fontSize:'16px',color:'#94A3B8'}}>/Q</span></div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B',marginTop:'8px'}}>Average time per question</div>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Difficulty Breakdown</div>
                <div style={{display:'flex',gap:'6px',marginTop:'10px'}}>
                  {[{d:'Easy',c:'#16A34A',w:40},{d:'Medium',c:'#D97706',w:45},{d:'Hard',c:'#DC2626',w:15}].map(diff=>(
                    <div key={`diff-${diff.d}`} style={{flex:diff.w,height:'24px',background:diff.c,borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'10px',fontWeight:700}}>{diff.w}%</div>
                  ))}
                </div>
                <div style={{display:'flex',gap:'8px',marginTop:'8px',fontSize:'10px'}}>
                  {[{d:'Easy',c:'#16A34A'},{d:'Med',c:'#D97706'},{d:'Hard',c:'#DC2626'}].map(l=>(
                    <div key={`label-${l.d}`} style={{display:'flex',alignItems:'center',gap:'4px'}}><div style={{width:'8px',height:'8px',borderRadius:'50%',background:l.c}}></div><span style={{color:'#64748B',fontFamily:'var(--font-body)',fontSize:'10px'}}>{l.d}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6 — PERFORMANCE ANALYSIS */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}}>
            <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Key Strengths 💪</div>
                <span style={{background:'#DCFCE7',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 10px'}}>3</span>
              </div>
              {['Strong problem-solving approach','Accurate calculations','Good time management'].map((s,si)=>(
                <div key={`strength-${si}`} style={{display:'flex',alignItems:'flex-start',gap:'10px',marginBottom:'12px',padding:'12px',background:'#F0FDF4',borderRadius:'10px'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#16A34A',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:700}}>✓</div>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5,fontWeight:500}}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Areas to Improve 🎯</div>
                <span style={{background:'#FEF3C7',color:'#D97706',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 10px'}}>2</span>
              </div>
              {['Review geometry concepts','Practice set theory problems'].map((s,si)=>(
                <div key={`improve-${si}`} style={{display:'flex',alignItems:'flex-start',gap:'10px',marginBottom:'12px',padding:'12px',background:'#FFFBEB',borderRadius:'10px'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#D97706',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:700}}>→</div>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5,fontWeight:500}}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7 — SCORE VS THRESHOLD */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Score vs Pass Threshold</div>
            <div style={{display:'flex',gap:'16px',alignItems:'end'}}>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>Your Score</span>
                  <span style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:800,color:passed?'#16A34A':'#DC2626'}}>{score}%</span>
                </div>
                <div style={{background:'#F1F5F9',borderRadius:'10px',height:'40px',overflow:'hidden',position:'relative'}}>
                  <div style={{background:passed?'linear-gradient(90deg, #16A34A, #15803D)':'linear-gradient(90deg, #DC2626, #B91C1C)',height:'100%',width:`${score}%`,transition:'width 0.6s ease',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:'12px'}}>
                    <span style={{color:'white',fontSize:'14px',fontWeight:700}}>{score}%</span>
                  </div>
                </div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>Pass Mark</span>
                  <span style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:800,color:'#64748B'}}>{config.passPercentage}%</span>
                </div>
                <div style={{background:'#F1F5F9',borderRadius:'10px',height:'40px',overflow:'hidden',position:'relative'}}>
                  <div style={{background:'linear-gradient(90deg, #64748B, #475569)',height:'100%',width:`${config.passPercentage}%`,transition:'width 0.6s ease',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:'12px'}}>
                    <span style={{color:'white',fontSize:'14px',fontWeight:700}}>{config.passPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 8 — QUESTION REVIEW */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'16px'}}>Question Review</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(10, 1fr)',gap:'8px',marginBottom:'16px'}}>
              {sampleQuestions.map((q,qi)=>{
                const userAns=answers[qi];
                const isCorrect=userAns===q.correct;
                const isSkipped=userAns===undefined;
                return <div key={`q-indicator-${qi}`} style={{aspectRatio:'1',background:isSkipped?'#F1F5F9':isCorrect?'#DCFCE7':'#FEF2F2',border:`2px solid ${isSkipped?'#E2E8F0':isCorrect?'#16A34A':'#DC2626'}`,borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:700,color:isSkipped?'#94A3B8':isCorrect?'#16A34A':'#DC2626'}}>{qi+1}</div>
              })}
            </div>
            <button onClick={()=>setScreen('tests-review')} style={{width:'100%',height:'48px',background:'linear-gradient(135deg, #D97706, #B45309)',border:'none',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,borderRadius:'12px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>Review Answers <ChevronLeft size={18} style={{transform:'rotate(180deg)'}}/></button>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{display:'flex',gap:'12px'}}>
            <button onClick={()=>setScreen('tests-create')} style={{flex:1,height:'52px',background:'white',border:'1.5px solid #FCD34D',color:'#D97706',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Practice Again</button>
            <button onClick={()=>setScreen('tests')} style={{flex:1,height:'52px',background:'transparent',border:'1.5px solid #E2E8F0',color:'#94A3B8',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Back to Tests</button>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 7: Answer Review
  if (screen === 'tests-review') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('tests-score')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div style={{flex:1}}><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Answer Review 🔍</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Review all questions and answers</div></div>
        <div style={{display:'flex',gap:'6px'}}>
          {['all','correct','incorrect','skipped'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{height:'32px',padding:'0 12px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,background:filter===f?'#D97706':'#F1F5F9',color:filter===f?'white':'#64748B',border:'none'}}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'800px',margin:'0 auto',width:'100%',display:'flex',flexDirection:'column',gap:'16px'}}>
          {sampleQuestions.filter((q,qi)=>{
            if(filter==='all')return true;
            if(filter==='correct')return answers[qi]===q.correct;
            if(filter==='incorrect')return answers[qi]!==undefined&&answers[qi]!==q.correct;
            if(filter==='skipped')return answers[qi]===undefined;
            return true;
          }).map((q,qi)=>{
            const actualIndex=sampleQuestions.findIndex(sq=>sq.id===q.id);
            const userAns=answers[actualIndex];
            const isCorrect=userAns===q.correct;
            const isSkipped=userAns===undefined;
            return <div key={q.id} style={{background:'white',border:isSkipped?'1.5px solid #E2E8F0':isCorrect?'1.5px solid #86EFAC':'1.5px solid #FECACA',borderRadius:'20px',padding:'20px 24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
                <span style={{background:isSkipped?'#F1F5F9':isCorrect?'#DCFCE7':'#FEF2F2',color:isSkipped?'#94A3B8':isCorrect?'#16A34A':'#DC2626',border:`1px solid ${isSkipped?'#E2E8F0':isCorrect?'#86EFAC':'#FECACA'}`,fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 12px'}}>Q{actualIndex+1}</span>
                <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                  {isSkipped?<span style={{background:'#F1F5F9',color:'#94A3B8',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>Skipped</span>:isCorrect?<span style={{background:'#DCFCE7',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'3px 10px',display:'flex',alignItems:'center',gap:'4px'}}><CheckCircle size={12}/>Correct</span>:<span style={{background:'#FEF2F2',color:'#DC2626',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'3px 10px',display:'flex',alignItems:'center',gap:'4px'}}><XCircle size={12}/>Incorrect</span>}
                  <span style={{background:q.difficulty==='easy'?'#DCFCE7':q.difficulty==='medium'?'#FEF3C7':'#FEF2F2',color:q.difficulty==='easy'?'#16A34A':q.difficulty==='medium'?'#D97706':'#DC2626',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:600,borderRadius:9999,padding:'2px 8px'}}>{q.difficulty}</span>
                </div>
              </div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'15px',fontWeight:600,color:'#0F172A',lineHeight:1.6,marginBottom:'16px'}}>{q.question}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'14px'}}>
                {q.options.map((opt,oi)=>{
                  const isUserChoice=userAns===oi;
                  const isCorrectAns=q.correct===oi;
                  return <div key={oi} style={{background:isCorrectAns?'#DCFCE7':isUserChoice&&!isCorrect?'#FEF2F2':'#F8FAFF',border:isCorrectAns?'2px solid #16A34A':isUserChoice&&!isCorrect?'2px solid #DC2626':'1px solid #E2E8F0',borderRadius:'12px',padding:'12px 14px',display:'flex',alignItems:'center',gap:'12px'}}>
                    <div style={{width:'26px',height:'26px',borderRadius:'50%',background:isCorrectAns?'#16A34A':isUserChoice&&!isCorrect?'#DC2626':'white',border:isCorrectAns?'none':isUserChoice&&!isCorrect?'none':'2px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:700,color:isCorrectAns||isUserChoice&&!isCorrect?'white':'#94A3B8',flexShrink:0}}>{isCorrectAns?'✓':isUserChoice&&!isCorrect?'✗':String.fromCharCode(65+oi)}</div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',flex:1}}>{opt}</span>
                    {isCorrectAns&&<span style={{background:'#16A34A',color:'white',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>CORRECT</span>}
                    {isUserChoice&&!isCorrect&&<span style={{background:'#DC2626',color:'white',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>YOUR CHOICE</span>}
                  </div>
                })}
              </div>
              <div style={{background:isCorrect?'#F0FDF4':'#FFFBEB',border:`1px solid ${isCorrect?'#86EFAC':'#FCD34D'}`,borderRadius:'12px',padding:'12px 16px',display:'flex',gap:'10px'}}>
                <Lightbulb size={16} color={isCorrect?'#16A34A':'#D97706'} style={{flexShrink:0,marginTop:'2px'}}/>
                <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:isCorrect?'#16A34A':'#D97706',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'4px'}}>Explanation</div><div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569',lineHeight:1.5}}>{q.explanation}</div></div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>;
  }

  return null;
}

return { Tests };
})();

__mods["Interview"] = (function () {
const React = __ReactNS;
const { useState, useEffect } = __ReactNS;
const { ChevronLeft, ChevronRight, CheckCircle, Clock, Lightbulb, Briefcase, Mic, MicOff, Video, VideoOff, Upload } = LucideReact;

interface InterviewProps {
  screen: string;
  setScreen: (screen: string) => void;
  CircularProgress: any;
  showToast: (message: string) => void;
  showXPToast: (message: string) => void;
}

const interviewTypes = [
  {id:'hr', name:'HR Interview', icon:'https://img.icons8.com/3d-fluency/100/conference-call.png', color:'#16A34A', bg:'#F0FDF4', description:'Behavioral & personality questions', duration:'15-20 min', popular:true},
  {id:'technical', name:'Technical Interview', icon:'https://img.icons8.com/3d-fluency/100/source-code.png', color:'#2563EB', bg:'#EFF6FF', description:'DSA, system design & coding concepts', duration:'20-30 min', popular:false},
  {id:'managerial', name:'Managerial Round', icon:'https://img.icons8.com/3d-fluency/100/businessman.png', color:'#7C3AED', bg:'#FAF5FF', description:'Leadership & decision making', duration:'15-20 min', popular:false},
  {id:'resume', name:'Resume Walkthrough', icon:'https://img.icons8.com/3d-fluency/100/resume.png', color:'#BD1313', bg:'#FFF1F2', description:'Walk through your resume with AI', duration:'10-15 min', popular:false}
];

const interviewHistory = [
  {id:'i1', type:'HR Interview', date:'Mar 16', duration:'18 min', score:82, questions:8, feedback:'Good communication, improve STAR format'},
  {id:'i2', type:'Technical Interview', date:'Mar 14', duration:'24 min', score:68, questions:10, feedback:'Needs improvement on system design'},
  {id:'i3', type:'HR Interview', date:'Mar 10', duration:'15 min', score:75, questions:7, feedback:'Confident delivery, good answers'}
];

const hrQuestions = [
  {id:1, question:'Tell me about yourself.', hint:'Structure: Present → Past → Future', category:'Introduction', tips:['Keep it under 2 minutes','Focus on professional journey','End with why you want this role']},
  {id:2, question:'What are your greatest strengths?', hint:'Pick 2-3 relevant to the role', category:'Self Assessment', tips:['Use specific examples','Relate to job requirements','Be confident not arrogant']},
  {id:3, question:'Where do you see yourself in 5 years?', hint:'Show ambition aligned with company growth', category:'Career Goals', tips:['Research the company growth path','Show commitment to the role','Be realistic and specific']},
  {id:4, question:'Why do you want to work at our company?', hint:'Research the company before the interview', category:'Company Fit', tips:['Mention specific company achievements','Align personal values with company mission','Show genuine enthusiasm']},
  {id:5, question:'Describe a challenge you faced and how you overcame it.', hint:'Use STAR: Situation Task Action Result', category:'Behavioral', tips:['Choose a real professional challenge','Focus on your specific actions','Quantify the result if possible']},
  {id:6, question:'What is your biggest weakness?', hint:'Choose a real weakness with a growth story', category:'Self Assessment', tips:['Be honest but strategic','Show self-awareness','Always include improvement steps']},
  {id:7, question:'Why should we hire you?', hint:'Summarize your unique value proposition', category:'Closing', tips:['Connect skills to job requirements','Highlight unique strengths','Express genuine enthusiasm']},
  {id:8, question:'Do you have any questions for us?', hint:'Always have 2-3 thoughtful questions ready', category:'Closing', tips:['Ask about team culture','Ask about growth opportunities','Never ask about salary in first round']}
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
  strengths: ['Strong communication and clarity', 'Good use of specific examples', 'Confident and composed delivery', 'Well-structured answers'],
  improvements: ['Use STAR format more consistently', 'Add quantifiable results to answers', 'Research company-specific details more'],
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

function Interview({ screen, setScreen, CircularProgress, showToast, showXPToast }: InterviewProps) {
  const [setupConfig, setSetupConfig] = useState({ type: 'hr', role: 'Software Engineer', experience: 'fresher', questionCount: 8, focus: [] as string[] });
  const [sessionState, setSessionState] = useState({ currentQ: 0, phase: 'question', userAnswer: '', answers: [] as string[], sessionTime: 0, ariaMessage: '' });
  const [interviewMode, setInterviewMode] = useState('standard');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedResume, setSelectedResume] = useState('existing');
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [transcript, setTranscript] = useState<Array<{speaker:string,text:string}>>([]);

  useEffect(() => {
    if (screen === 'interview-session') {
      const timer = setInterval(() => {
        setSessionState(prev => ({ ...prev, sessionTime: prev.sessionTime + 1 }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [screen]);

  const formatSessionTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2,'0')}`;
  };

  // Screen 1: Interview Home
  if (screen === 'interview') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'#F0FDF4',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src="https://img.icons8.com/3d-fluency/100/microphone.png" width="22" height="22" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
          </div>
          <div>
            <div style={{fontFamily:'var(--font-display)',fontSize:'20px',fontWeight:700,color:'#0F172A'}}>AI Interview 🎤</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Practice with Aria — your AI interviewer</div>
          </div>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <span style={{background:'#F1F5F9',color:'#64748B',border:'1px solid #E2E8F0',fontSize:'11px',fontWeight:600,padding:'4px 12px',borderRadius:9999}}>3 Sessions</span>
          <span style={{background:'#DCFCE7',color:'#16A34A',border:'1px solid #86EFAC',fontSize:'11px',fontWeight:600,padding:'4px 12px',borderRadius:9999}}>82% Avg</span>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px',display:'flex',flexDirection:'column',gap:'16px'}} className="inner-scroll">
        {/* Aria Hero Card */}
        <div onClick={()=>setScreen('interview-setup')} style={{background:'linear-gradient(135deg, #16A34A, #15803D)',borderRadius:'20px',padding:'24px',display:'flex',alignItems:'center',gap:'24px',position:'relative',overflow:'hidden',cursor:'pointer',transition:'all 0.3s'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(22,163,74,0.35)'}} onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{position:'absolute',top:'-20px',right:'-20px',width:'120px',height:'120px',borderRadius:'50%',background:'rgba(255,255,255,0.06)'}}/>
          <div style={{position:'absolute',bottom:'-15px',left:'-15px',width:'80px',height:'80px',borderRadius:'50%',background:'rgba(255,255,255,0.04)'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="80" height="80" alt="" style={{filter:'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',borderRadius:'50%',border:'3px solid rgba(255,255,255,0.3)',background:'transparent'}}/>
            <div style={{position:'absolute',bottom:'-2px',right:'-2px',width:'14px',height:'14px',borderRadius:'50%',background:'#86EFAC',border:'2px solid white',animation:'pulse 2s infinite'}}/>
          </div>
          <div style={{flex:1,position:'relative',zIndex:1}}>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'rgba(255,255,255,0.7)',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'4px'}}>MEET ARIA 🤖</div>
            <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'white',marginBottom:'6px'}}>Your AI Interview Coach</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'rgba(255,255,255,0.75)',lineHeight:1.5,marginBottom:'12px'}}>Aria will ask you real interview questions, listen to your answers, and give you detailed feedback.</div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {['🎯 Real Questions','💬 Live Feedback','📊 Performance Score'].map((f,i)=>(
                <span key={i} style={{background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.2)',color:'white',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'4px 12px'}}>{f}</span>
              ))}
            </div>
          </div>
          <button onClick={()=>setScreen('interview-setup')} style={{position:'relative',zIndex:1,background:'white',color:'#16A34A',fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,borderRadius:'12px',border:'none',padding:'10px 20px',boxShadow:'0 4px 12px rgba(0,0,0,0.15)',cursor:'pointer'}}>Start Practice →</button>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'12px'}}>
          {[{val:'3',label:'SESSIONS',icon:'https://img.icons8.com/3d-fluency/100/microphone.png',color:'#16A34A',bg:'#F0FDF4'},{val:'75%',label:'AVG SCORE',icon:'https://img.icons8.com/3d-fluency/100/goal.png',color:'#D97706',bg:'#FFFBEB'},{val:'23',label:'QUESTIONS',icon:'https://img.icons8.com/3d-fluency/100/chat.png',color:'#2563EB',bg:'#EFF6FF'},{val:'82%',label:'BEST SCORE',icon:'https://img.icons8.com/3d-fluency/100/trophy.png',color:'#BD1313',bg:'#FFF1F2'}].map((s,i)=>(
            <div key={i} style={{height:'80px',background:`linear-gradient(135deg, ${s.bg}, white)`,border:'1px solid #E2E8F0',borderRadius:'16px',padding:'14px 16px',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:s.color}}/>
              <img src={s.icon} width="24" height="24" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'#0F172A',marginTop:'4px'}}>{s.val}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8'}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Interview Types */}
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Choose Interview Type 🎯</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'12px'}}>
            {interviewTypes.map(t=>(
              <div key={t.id} onClick={()=>{setSetupConfig({...setupConfig,type:t.id});setScreen('interview-setup')}} style={{height:'100px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'16px',padding:'16px',cursor:'pointer',display:'flex',alignItems:'center',gap:'14px',position:'relative'}} onMouseEnter={(e)=>{e.currentTarget.style.borderColor=t.color;e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'}} onMouseLeave={(e)=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                {t.popular&&<span style={{position:'absolute',top:'8px',right:'8px',background:'#FEF3C7',color:'#D97706',border:'1px solid #FCD34D',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:700,borderRadius:9999,padding:'2px 8px'}}>Popular</span>}
                <div style={{width:'44px',height:'44px',borderRadius:'12px',background:t.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <img src={t.icon} width="26" height="26" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
                </div>
                <div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:700,color:'#0F172A'}}>{t.name}</div>
                  <div style={{display:'flex',gap:'6px',marginTop:'4px',alignItems:'center'}}>
                    <span style={{background:'#F1F5F9',color:'#64748B',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:600,borderRadius:9999,padding:'2px 8px'}}>{t.duration}</span>
                  </div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8',marginTop:'2px'}}>{t.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Past Sessions 📋</div>
          </div>
          {interviewHistory.map(h=>(
            <div key={h.id} onClick={()=>setScreen('interview-feedback')} style={{height:'72px',background:'white',border:'1px solid #E2E8F0',borderRadius:'14px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer',marginBottom:'8px'}} onMouseEnter={(e)=>{e.currentTarget.style.borderColor='#86EFAC';e.currentTarget.style.background='#F0FDF4'}} onMouseLeave={(e)=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.background='white'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'50%',border:`2px solid ${h.score>=75?'#16A34A':'#D97706'}`,background:h.score>=75?'#DCFCE7':'#FEF3C7',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:800,color:h.score>=75?'#16A34A':'#D97706',flexShrink:0}}>{h.score}%</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{h.type}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>{h.date} · {h.duration} · {h.questions} questions</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B',fontStyle:'italic',marginTop:'2px'}}>{h.feedback}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>;
  }

  // Screen 2: Interview Setup
  if (screen === 'interview-setup') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('interview')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Setup Interview 🎤</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Configure your practice session</div></div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'640px',margin:'0 auto',width:'100%',display:'flex',flexDirection:'column',gap:'20px'}}>

          {/* SECTION 1 — INTERVIEW MODES */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>INTERVIEW MODE</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'10px'}}>
              {[
                {id:'standard',name:'Standard Interview',icon:'🎤',desc:'General questions',color:'#16A34A',bg:'#F0FDF4'},
                {id:'jd',name:'JD Based Interview',icon:'📋',desc:'Job description based',color:'#2563EB',bg:'#EFF6FF'},
                {id:'resume',name:'Resume Based Interview',icon:'📄',desc:'Resume walkthrough',color:'#7C3AED',bg:'#FAF5FF'}
              ].map(mode=>(
                <div key={mode.id} onClick={()=>setInterviewMode(mode.id)} style={{background:interviewMode===mode.id?mode.bg:'white',border:interviewMode===mode.id?`2px solid ${mode.color}`:'1.5px solid #E2E8F0',borderRadius:'14px',padding:'16px 14px',textAlign:'center',cursor:'pointer'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>{mode.icon}</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'13px',fontWeight:700,color:'#0F172A',marginBottom:'4px'}}>{mode.name}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>{mode.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2 — JD INPUT */}
          {interviewMode==='jd'&&<div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>JOB DESCRIPTION</div>
            <textarea value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} placeholder="Paste the job description here..." style={{width:'100%',minHeight:'160px',padding:'14px 16px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'12px',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',lineHeight:1.6,resize:'vertical'}}/>
            <div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'8px'}}>
              <Lightbulb size={14} color="#D97706"/>
              <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>Aria will analyze this JD and ask relevant questions</span>
            </div>
          </div>}

          {/* SECTION 3 — RESUME SELECTOR */}
          {interviewMode==='resume'&&<div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>RESUME</div>
            <div style={{display:'flex',gap:'10px'}}>
              <div onClick={()=>setSelectedResume('existing')} style={{flex:1,background:selectedResume==='existing'?'#F0FDF4':'white',border:selectedResume==='existing'?'2px solid #16A34A':'1.5px solid #E2E8F0',borderRadius:'12px',padding:'16px',cursor:'pointer'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,color:'#0F172A',marginBottom:'6px'}}>📄 Use Existing Resume</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Software Engineer Resume</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B',marginTop:'4px'}}>Last updated: Mar 15</div>
              </div>
              <div onClick={()=>setSelectedResume('upload')} style={{flex:1,background:selectedResume==='upload'?'#EFF6FF':'white',border:selectedResume==='upload'?'2px solid #2563EB':'1.5px solid #E2E8F0',borderRadius:'12px',padding:'16px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                <Upload size={24} color="#2563EB" style={{marginBottom:'8px'}}/>
                <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,color:'#0F172A'}}>Upload New Resume</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8',marginTop:'4px'}}>PDF or DOCX</div>
              </div>
            </div>
          </div>}

          {/* Type Selector */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>INTERVIEW TYPE</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'8px'}}>
              {interviewTypes.map(t=>(
                <div key={t.id} onClick={()=>setSetupConfig({...setupConfig,type:t.id})} style={{height:'56px',background:setupConfig.type===t.id?t.bg:'white',border:setupConfig.type===t.id?`2px solid ${t.color}`:'1.5px solid #E2E8F0',borderRadius:'12px',padding:'8px 14px',display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'8px',background:t.bg,display:'flex',alignItems:'center',justifyContent:'center'}}><img src={t.icon} width="18" height="18" alt=""/></div>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Role */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>TARGET ROLE</div>
            <div style={{position:'relative'}}>
              <Briefcase size={18} color="#94A3B8" style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
              <input type="text" value={setupConfig.role} onChange={(e)=>setSetupConfig({...setupConfig,role:e.target.value})} style={{width:'100%',height:'48px',paddingLeft:'44px',paddingRight:'14px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',fontFamily:'var(--font-body)',fontSize:'16px',color:'#0F172A'}} placeholder="Enter target role"/>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>EXPERIENCE LEVEL</div>
            <div style={{display:'flex',gap:'8px'}}>
              {[{val:'fresher',label:'🌱 Fresher'},{val:'1-2',label:'📈 1-2 Years'},{val:'3+',label:'💼 3+ Years'}].map(ex=>(
                <div key={ex.val} onClick={()=>setSetupConfig({...setupConfig,experience:ex.val})} style={{flex:1,height:'56px',background:setupConfig.experience===ex.val?'#F0FDF4':'white',border:setupConfig.experience===ex.val?'2px solid #16A34A':'1.5px solid #E2E8F0',borderRadius:'12px',padding:'8px 16px',textAlign:'center',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{ex.label}</div>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>NUMBER OF QUESTIONS</div>
            <div style={{display:'flex',gap:'8px'}}>
              {[5,8,10,12,15].map(c=>(
                <button key={c} onClick={()=>setSetupConfig({...setupConfig,questionCount:c})} style={{width:'40px',height:'40px',borderRadius:'10px',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,background:setupConfig.questionCount===c?'#16A34A':'#F1F5F9',color:setupConfig.questionCount===c?'white':'#475569',border:'none'}}>{c}</button>
              ))}
            </div>
          </div>

          {/* Session Preview */}
          <div style={{background:'linear-gradient(135deg, #F0FDF4, white)',border:'1px solid #86EFAC',borderRadius:'16px',padding:'16px 20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}}>
              <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="32" height="32" alt="" style={{borderRadius:'50%',filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'}}/>
              <div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#16A34A'}}>Aria is ready! 🎯</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              {[{l:'Type',v:interviewTypes.find(t=>t.id===setupConfig.type)?.name},{l:'Role',v:setupConfig.role},{l:'Questions',v:setupConfig.questionCount},{l:'Est. Duration',v:'~18 minutes'}].map((it,i)=>(
                <div key={i}><div style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#94A3B8'}}>{ it.l}</div><div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{it.v}</div></div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button onClick={()=>{setScreen('interview-session');showToast("Interview starting — take a breath! 🌿");showXPToast("+75 XP 🎉");setSessionState({currentQ:0,phase:'question',userAnswer:'',answers:[],sessionTime:0,ariaMessage:''});setTranscript([{speaker:'Aria',text:hrQuestions[0].question}])}} style={{width:'100%',height:'56px',background:'linear-gradient(135deg, #16A34A, #15803D)',borderRadius:'16px',border:'none',fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'white',cursor:'pointer',boxShadow:'0 8px 24px rgba(22,163,74,0.35)',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="28" height="28" alt="" style={{borderRadius:'50%',filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.2))'}}/>
            Start Interview with Aria
          </button>
        </div>
      </div>
    </div>;
  }

  // Screen 3: Interview Session (Google Meet Style)
  if (screen === 'interview-session') {
    const currentQuestion = hrQuestions[sessionState.currentQ];

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter" style={{background:'#0F172A'}}>
      {/* Session Top Bar */}
      <div style={{height:'56px',flexShrink:0,background:'#1E293B',borderBottom:'1px solid #334155',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#16A34A',animation:'pulse 2s ease-in-out infinite'}}/>
          <span style={{fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,color:'#16A34A'}}>Session Live</span>
        </div>
        <div style={{fontFamily:'var(--font-display)',fontSize:'20px',fontWeight:800,color:'white'}}>{formatSessionTime(sessionState.sessionTime)}</div>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{background:'rgba(16,185,129,0.15)',color:'#10B981',border:'1px solid rgba(16,185,129,0.3)',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:700,borderRadius:9999,padding:'4px 12px'}}>Q{sessionState.currentQ + 1} / {hrQuestions.length}</span>
          <button onClick={()=>{setScreen('interview-complete');setTimeout(()=>showToast("Session complete! Great job 🎉"),0)}} style={{background:'rgba(239,68,68,0.15)',color:'#EF4444',border:'1px solid rgba(239,68,68,0.3)',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,borderRadius:'8px',padding:'6px 14px',cursor:'pointer'}}>End Session</button>
        </div>
      </div>

      {/* Main Session Content - Google Meet Style */}
      <div style={{flex:1,display:'flex',overflow:'hidden',padding:'16px',gap:'16px'}}>
        {/* LEFT SIDE — SECTION 4: Question Panel */}
        <div style={{flex:1,background:'#1E293B',borderRadius:'16px',padding:'32px',overflowY:'auto',display:'flex',flexDirection:'column'}} className="inner-scroll">
          <div style={{maxWidth:'640px',margin:'0 auto',width:'100%'}}>
            {/* Aria Avatar */}
            <div style={{textAlign:'center',marginBottom:'24px'}}>
              <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="80" height="80" alt="" style={{borderRadius:'50%',border:'3px solid #10B981',filter:'drop-shadow(0 8px 24px rgba(16,185,129,0.4))',display:'block',margin:'0 auto 12px',background:'transparent'}}/>
              <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'white',marginBottom:'6px'}}>Aria</div>
              <span style={{background:'rgba(16,185,129,0.15)',color:'#10B981',border:'1px solid rgba(16,185,129,0.3)',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,borderRadius:9999,padding:'6px 16px',display:'inline-block'}}>🎤 Asking Question {sessionState.currentQ + 1}</span>
            </div>

            {/* Question Card */}
            <div style={{background:'#0F172A',border:'1px solid #334155',borderRadius:'20px',padding:'28px',marginBottom:'20px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <span style={{background:'rgba(16,185,129,0.15)',color:'#10B981',border:'1px solid rgba(16,185,129,0.3)',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 12px'}}>{currentQuestion?.category}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B'}}>Question {sessionState.currentQ + 1} of {hrQuestions.length}</span>
              </div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:700,color:'white',lineHeight:1.5,marginBottom:'16px'}}>{currentQuestion?.question}</div>
              <div style={{display:'flex',alignItems:'flex-start',gap:'10px',background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:'12px',padding:'12px 16px'}}>
                <Lightbulb size={18} color="#10B981" style={{flexShrink:0,marginTop:'2px'}}/>
                <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#94A3B8',lineHeight:1.5,fontStyle:'italic'}}>Hint: {currentQuestion?.hint}</span>
              </div>
            </div>

            {/* Answer Input */}
            <div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#64748B',letterSpacing:'0.5px'}}>YOUR ANSWER</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B'}}>{sessionState.userAnswer.length}/500</span>
              </div>
              <textarea value={sessionState.userAnswer} onChange={(e)=>{setSessionState({...sessionState,userAnswer:e.target.value});if(e.target.value.length>10){setTranscript(prev=>[...prev.filter(t=>t.speaker!=='You'),{speaker:'You',text:e.target.value}])}}} placeholder="Type your answer here..." style={{width:'100%',minHeight:'140px',padding:'16px',background:'#0F172A',border:'1.5px solid #334155',borderRadius:'12px',fontFamily:'var(--font-body)',fontSize:'14px',color:'white',lineHeight:1.6,resize:'none',outline:'none'}}/>

              {/* Action Buttons */}
              <div style={{display:'flex',gap:'12px',marginTop:'16px'}}>
                <button onClick={()=>{const newT=[...transcript,{speaker:'Aria',text:hrQuestions[(sessionState.currentQ+1)%hrQuestions.length].question}];if(sessionState.currentQ<hrQuestions.length-1){setSessionState({...sessionState,currentQ:sessionState.currentQ+1,userAnswer:'',phase:'question'});setTranscript(newT)}else{setScreen('interview-complete')}}} style={{flex:0.4,height:'48px',background:'transparent',border:'1.5px solid #334155',color:'#94A3B8',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Skip →</button>
                <button onClick={()=>{const newAnswers=[...sessionState.answers];newAnswers[sessionState.currentQ]=sessionState.userAnswer;const newT=[...transcript,{speaker:'Aria',text:ariaResponses[sessionState.currentQ%ariaResponses.length]}];setTranscript(newT);setSessionState({...sessionState,answers:newAnswers,phase:'aria-response'});setTimeout(()=>{const nextT=[...newT,{speaker:'Aria',text:sessionState.currentQ<hrQuestions.length-1?hrQuestions[sessionState.currentQ+1].question:'Thank you!'}];if(sessionState.currentQ<hrQuestions.length-1){setSessionState({...sessionState,currentQ:sessionState.currentQ+1,userAnswer:'',phase:'question',answers:newAnswers});setTranscript(nextT)}else{setScreen('interview-complete');setTimeout(()=>showToast("Session complete! Great job 🎉"),0)}},2000)}} style={{flex:1,height:'48px',background:'linear-gradient(135deg, #10B981, #059669)',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,border:'none',borderRadius:'12px',cursor:'pointer'}}>Submit Answer →</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Camera Preview & Transcript */}
        <div style={{width:'360px',display:'flex',flexDirection:'column',gap:'16px',flexShrink:0}}>
          {/* Camera Preview */}
          <div style={{background:'#1E293B',borderRadius:'16px',overflow:'hidden',position:'relative',aspectRatio:'4/3'}}>
            <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg, #1E293B, #0F172A)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{textAlign:'center'}}>
                <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'linear-gradient(135deg, #10B981, #059669)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}>
                  <span style={{fontFamily:'var(--font-display)',fontSize:'32px',fontWeight:800,color:'white'}}>R</span>
                </div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'white'}}>Rahul</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',marginTop:'4px'}}>{cameraOn?'Camera On':'Camera Off'}</div>
              </div>
            </div>

            {/* Camera/Mic Controls */}
            <div style={{position:'absolute',bottom:'12px',left:'50%',transform:'translateX(-50%)',display:'flex',gap:'8px'}}>
              <button onClick={()=>setMicOn(!micOn)} style={{width:'44px',height:'44px',borderRadius:'50%',background:micOn?'rgba(15,23,42,0.8)':'rgba(239,68,68,0.9)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(8px)'}}>
                {micOn?<Mic size={20} color="white"/>:<MicOff size={20} color="white"/>}
              </button>
              <button onClick={()=>setCameraOn(!cameraOn)} style={{width:'44px',height:'44px',borderRadius:'50%',background:cameraOn?'rgba(15,23,42,0.8)':'rgba(239,68,68,0.9)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(8px)'}}>
                {cameraOn?<Video size={20} color="white"/>:<VideoOff size={20} color="white"/>}
              </button>
            </div>
          </div>

          {/* SECTION 5 — Live Transcript */}
          <div style={{flex:1,background:'#1E293B',borderRadius:'16px',padding:'16px',overflowY:'auto'}} className="inner-scroll">
            <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,color:'white',marginBottom:'12px',display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#10B981',animation:'pulse 2s infinite'}}/>
              Live Transcript
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {transcript.map((t,i)=>(
                <div key={`transcript-${i}`}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:t.speaker==='Aria'?'#10B981':'#3B82F6',marginBottom:'4px'}}>{t.speaker}:</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#CBD5E1',lineHeight:1.5,paddingLeft:'12px',borderLeft:`2px solid ${t.speaker==='Aria'?'#10B981':'#3B82F6'}`}}>{t.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 4: Interview Complete (SECTION 6)
  if (screen === 'interview-complete') {
    const score = 82;
    const questionsAnswered = sessionState.answers.filter(a=>a).length;
    const duration = formatSessionTime(sessionState.sessionTime);
    const fullMarksCount = 3;

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter" style={{background:'white'}}>
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('interview')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Interview Complete 🎉</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>HR Interview · {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div></div>
      </div>

      <div style={{flex:1,overflowY:'auto',padding:'40px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'640px',width:'100%',margin:'0 auto'}}>

          {/* Big Score Display */}
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <div style={{fontFamily:'Syne, var(--font-display)',fontSize:'80px',fontWeight:800,color:'#16A34A',lineHeight:1,marginBottom:'16px'}}>{score}%</div>
            <div style={{display:'inline-block',background:'linear-gradient(135deg, #16A34A, #15803D)',color:'white',fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,borderRadius:9999,padding:'10px 32px',textTransform:'uppercase',letterSpacing:'1px',boxShadow:'0 8px 24px rgba(22,163,74,0.25)'}}>EXCELLENT PERFORMANCE ✓</div>
          </div>

          {/* Stats Cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'12px',marginBottom:'32px'}}>
            {[
              {label:'Questions',value:questionsAnswered,icon:'📝',color:'#2563EB',bg:'#EFF6FF',border:'#BFDBFE'},
              {label:'Duration',value:duration,icon:'⏱️',color:'#D97706',bg:'#FFFBEB',border:'#FCD34D'},
              {label:'Score',value:`${score}%`,icon:'⭐',color:'#16A34A',bg:'#F0FDF4',border:'#86EFAC'},
              {label:'Full Marks',value:fullMarksCount,icon:'💯',color:'#7C3AED',bg:'#F5F3FF',border:'#DDD6FE'}
            ].map((stat,i)=>(
              <div key={`complete-stat-${stat.label}`} style={{background:'white',border:`1px solid ${stat.border}`,borderRadius:'16px',padding:'20px',textAlign:'center'}}>
                <div style={{fontSize:'32px',marginBottom:'8px'}}>{stat.icon}</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:800,color:'#0F172A',marginBottom:'4px'}}>{stat.value}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#94A3B8',letterSpacing:'0.5px'}}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Aria Feedback */}
          <div style={{background:'linear-gradient(135deg, #F0FDF4, white)',border:'1px solid #86EFAC',borderRadius:'16px',padding:'20px 24px',marginBottom:'32px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
              <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="40" height="40" alt="" style={{borderRadius:'50%',border:'2px solid #16A34A'}}/>
              <div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Aria's Feedback</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B'}}>AI Interview Coach</div>
              </div>
            </div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'#475569',lineHeight:1.6}}>Great communication today! You structured your answers well using the STAR format and showed strong confidence. Your examples were specific and impactful. For improvement, try to add more quantifiable metrics to strengthen your responses.</div>
          </div>

          {/* XP Earned */}
          <div style={{background:'linear-gradient(135deg, #FFFBEB, white)',border:'1px solid #FCD34D',borderRadius:'16px',padding:'16px 20px',marginBottom:'24px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px'}}>
            <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png" width="32" height="32" alt="" style={{filter:'drop-shadow(0 2px 8px rgba(217,119,6,0.3))'}}/>
            <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'#D97706'}}>+75 XP Earned!</div>
          </div>

          {/* Action Buttons */}
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <button onClick={()=>setScreen('interview-feedback')} style={{width:'100%',height:'52px',background:'linear-gradient(135deg, #16A34A, #15803D)',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,border:'none',borderRadius:'12px',cursor:'pointer',boxShadow:'0 4px 16px rgba(22,163,74,0.25)'}}>View Detailed Feedback →</button>
            <button onClick={()=>{setSessionState({currentQ:0,phase:'question',userAnswer:'',answers:[],sessionTime:0,ariaMessage:''});setTranscript([]);setScreen('interview-setup')}} style={{width:'100%',height:'48px',background:'white',border:'1.5px solid #86EFAC',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Practice Again 🔄</button>
            <button onClick={()=>setScreen('dashboard')} style={{width:'100%',height:'44px',background:'transparent',border:'1.5px solid #E2E8F0',color:'#94A3B8',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 5: Interview Feedback - Detailed Report
  if (screen === 'interview-feedback') {
    const avgScore = 82;
    const questionsAsked = sessionState.answers.filter(a=>a).length;
    const strongAnswers = 5;
    const needsReview = 2;

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      {/* Section Header */}
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'12px'}}>
        <button onClick={()=>setScreen('interview-complete')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#475569"/></button>
        <div>
          <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Detailed Performance Report 📊</div>
          <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>HR Interview · {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{flex:1,overflowY:'auto',padding:'24px'}} className="inner-scroll">
        <div style={{maxWidth:'1000px',margin:'0 auto',width:'100%'}}>

          {/* SECTION 1 — PERFORMANCE OVERVIEW */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Performance Overview</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'16px'}}>
              {[
                {label:'Avg Score',value:`${avgScore}%`,icon:'⭐',color:'#16A34A',bg:'#F0FDF4',border:'#86EFAC'},
                {label:'Questions Asked',value:questionsAsked,icon:'📝',color:'#2563EB',bg:'#EFF6FF',border:'#BFDBFE'},
                {label:'Strong Answers',value:strongAnswers,icon:'✓',color:'#16A34A',bg:'#F0FDF4',border:'#86EFAC'},
                {label:'Needs Review',value:needsReview,icon:'⚠️',color:'#D97706',bg:'#FFFBEB',border:'#FCD34D'}
              ].map((stat,i)=>(
                <div key={`overview-${stat.label}`} style={{background:stat.bg,border:`1px solid ${stat.border}`,borderRadius:'14px',padding:'20px',textAlign:'center'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>{stat.icon}</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'28px',fontWeight:800,color:'#0F172A',marginBottom:'6px'}}>{stat.value}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#64748B',letterSpacing:'0.5px'}}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2 — SCORE BREAKDOWN */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Score Breakdown</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {sessionFeedback.questionScores.map((item,i)=>(
                <div key={`score-breakdown-${i}`} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{width:'100px',fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',flexShrink:0}}>Question {i+1}</div>
                  <div style={{flex:1,height:'32px',background:'#F1F5F9',borderRadius:'8px',overflow:'hidden',position:'relative'}}>
                    <div style={{height:'100%',width:`${item.score}%`,background:item.score>=80?'linear-gradient(90deg, #16A34A, #15803D)':item.score>=70?'linear-gradient(90deg, #D97706, #B45309)':'linear-gradient(90deg, #DC2626, #B91C1C)',transition:'width 0.5s ease',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:'12px'}}>
                      <span style={{color:'white',fontSize:'12px',fontWeight:700}}>{item.score}%</span>
                    </div>
                  </div>
                  <div style={{width:'60px',fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:800,color:item.score>=80?'#16A34A':item.score>=70?'#D97706':'#DC2626',textAlign:'right'}}>{item.score}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3 — AI FEEDBACK */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>AI Feedback</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px'}}>

              {/* Key Strengths */}
              <div style={{background:'#F0FDF4',border:'1px solid #86EFAC',borderRadius:'12px',padding:'20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#16A34A',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'16px'}}>✓</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>Key Strengths</div>
                </div>
                {sessionFeedback.strengths.slice(0,3).map((s,i)=>(
                  <div key={`strength-${i}`} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'10px'}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#16A34A',marginTop:'6px',flexShrink:0}}></div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5}}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Areas to Improve */}
              <div style={{background:'#FFFBEB',border:'1px solid #FCD34D',borderRadius:'12px',padding:'20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#D97706',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'16px'}}>↑</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>Areas to Improve</div>
                </div>
                {sessionFeedback.improvements.map((s,i)=>(
                  <div key={`improve-${i}`} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'10px'}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#D97706',marginTop:'6px',flexShrink:0}}></div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5}}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Concerns */}
              <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#DC2626',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'16px'}}>!</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>Concerns</div>
                </div>
                {['Limited use of quantifiable metrics','Could expand on examples more'].map((s,i)=>(
                  <div key={`concern-${i}`} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'10px'}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#DC2626',marginTop:'6px',flexShrink:0}}></div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5}}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4 — VIDEO ANALYSIS */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Video Analysis</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'16px'}}>
              {[
                {label:'Body Language',score:85,icon:'🤝',desc:'Excellent posture and gestures'},
                {label:'Voice Tone',score:78,icon:'🎤',desc:'Clear and professional'},
                {label:'Confidence',score:82,icon:'💪',desc:'Strong and steady'}
              ].map((metric,i)=>(
                <div key={`video-${metric.label}`} style={{background:'#F8FAFC',borderRadius:'12px',padding:'20px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
                    <div style={{fontSize:'28px'}}>{metric.icon}</div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:800,color:metric.score>=80?'#16A34A':'#D97706'}}>{metric.score}%</div>
                  </div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,color:'#0F172A',marginBottom:'6px'}}>{metric.label}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',lineHeight:1.4}}>{metric.desc}</div>
                  <div style={{height:'6px',background:'#E2E8F0',borderRadius:9999,overflow:'hidden',marginTop:'10px'}}>
                    <div style={{height:'100%',width:`${metric.score}%`,background:metric.score>=80?'#16A34A':'#D97706',transition:'width 0.5s ease'}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5 — FACIAL EXPRESSION ANALYSIS */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Facial Expression Analysis</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'16px'}}>
              {[
                {label:'Emotion Consistency',score:88,icon:'😊',color:'#16A34A'},
                {label:'Eye Contact',score:75,icon:'👁️',color:'#D97706'},
                {label:'Approachability',score:90,icon:'🤗',color:'#16A34A'}
              ].map((metric,i)=>(
                <div key={`facial-${metric.label}`} style={{textAlign:'center'}}>
                  <div style={{width:'80px',height:'80px',borderRadius:'50%',background:`linear-gradient(135deg, ${metric.color}15, ${metric.color}08)`,border:`3px solid ${metric.color}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}>
                    <span style={{fontSize:'36px'}}>{metric.icon}</span>
                  </div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:metric.color,marginBottom:'6px'}}>{metric.score}%</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6 — COMMUNICATION ANALYSIS */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Communication Analysis</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'20px'}}>
              {[
                {label:'Clarity',score:87,max:100,color:'#16A34A',desc:'Ideas expressed clearly'},
                {label:'Pace',score:72,max:100,color:'#D97706',desc:'Slightly fast at times'},
                {label:'Filler Words',score:15,max:100,color:'#16A34A',desc:'Minimal usage detected',inverted:true},
                {label:'Articulation',score:85,max:100,color:'#16A34A',desc:'Well-pronounced words'}
              ].map((metric,i)=>(
                <div key={`comm-${metric.label}`}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                    <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>{metric.label}</div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:800,color:metric.color}}>{metric.score}%</div>
                  </div>
                  <div style={{height:'10px',background:'#F1F5F9',borderRadius:9999,overflow:'hidden',marginBottom:'6px'}}>
                    <div style={{height:'100%',width:`${metric.score}%`,background:metric.color,transition:'width 0.5s ease'}}></div>
                  </div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B'}}>{metric.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7 — QUESTION REVIEW */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Question by Question Feedback</div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {sessionFeedback.questionScores.map((item,i)=>(
                <div key={`q-review-${i}`} style={{background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'20px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
                        <span style={{background:item.score>=80?'#DCFCE7':item.score>=70?'#FEF3C7':'#FEF2F2',color:item.score>=80?'#16A34A':item.score>=70?'#D97706':'#DC2626',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 10px'}}>Q{i+1}</span>
                        <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>{item.q}</div>
                      </div>
                      <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#64748B',lineHeight:1.6}}>
                        {i===0&&'Strong opening with clear structure. Consider adding more specific examples from your experience.'}
                        {i===1&&'Good identification of strengths. Link them more directly to the role requirements.'}
                        {i===2&&'Well-articulated career vision. Add specific milestones to make it more concrete.'}
                        {i===3&&'Needs more company-specific research. Mention recent achievements or values.'}
                        {i===4&&'Excellent STAR format usage. Great quantifiable results shared.'}
                        {i===5&&'Honest and self-aware. Good inclusion of growth steps taken.'}
                        {i===6&&'Strong closing. Summarized key points effectively.'}
                      </div>
                    </div>
                    <div style={{marginLeft:'16px',textAlign:'right'}}>
                      <div style={{fontFamily:'var(--font-display)',fontSize:'32px',fontWeight:800,color:item.score>=80?'#16A34A':item.score>=70?'#D97706':'#DC2626'}}>{item.score}%</div>
                      <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8',textTransform:'uppercase'}}>Score</div>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                    {item.score>=80?<span style={{background:'#DCFCE7',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>✓ Strong Answer</span>:<span style={{background:'#FEF3C7',color:'#D97706',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>⚠️ Room for Improvement</span>}
                    <span style={{background:'#EFF6FF',color:'#2563EB',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>Behavioral</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div style={{display:'flex',gap:'12px'}}>
            <button onClick={()=>{setSessionState({currentQ:0,phase:'question',userAnswer:'',answers:[],sessionTime:0,ariaMessage:''});setTranscript([]);setScreen('interview-setup')}} style={{flex:1,height:'52px',background:'linear-gradient(135deg, #16A34A, #15803D)',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,border:'none',borderRadius:'12px',cursor:'pointer',boxShadow:'0 4px 16px rgba(22,163,74,0.25)'}}>Practice Again 🔄</button>
            <button onClick={()=>setTimeout(()=>showToast("Report downloaded! 📄"),0)} style={{flex:1,height:'52px',background:'white',border:'1.5px solid #86EFAC',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Download Report 📄</button>
            <button onClick={()=>setTimeout(()=>showToast("Link copied! 🔗"),0)} style={{flex:0.8,height:'52px',background:'white',border:'1.5px solid #E2E8F0',color:'#64748B',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Share 🔗</button>
          </div>
        </div>
      </div>
    </div>;
  }

  return null;
}

return { Interview };
})();

const __App = (function () {
const { useState, useEffect, useRef } = __ReactNS;
const { LayoutDashboard, FileText, BookOpen, Mic, TrendingUp, Users, Settings, Search, Bell, ChevronLeft, Mail, Phone, Eye, EyeOff, Key, CheckCircle, XCircle, Info, AlertTriangle, MapPin, Check, X, ChevronRight, Plus, HelpCircle, ChevronDown, CreditCard, ShoppingCart, Download, Lock } = LucideReact;
const { Dashboard } = __mods["Dashboard"];
const { Resume } = __mods["Resume"];
const { Tests } = __mods["TestsAll"];
const { Interview } = __mods["Interview"];

// Recharts imports for dashboard
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } = Recharts;

// Mock User Data
const mockUser = {
  name: "Rahul Sharma",
  email: "rahul@vit.edu",
  college: "VIT Vellore",
  year: "Final Year",
  avatar: "RS",
  targetRole: "Software Engineer",
  xp: 2400,
  level: "Hustler",
  levelEmoji: "🔥",
  levelNumber: 3,
  nextLevel: "Elite",
  nextLevelXP: 3000,
  streak: 7,
  daysToPlacement: 92
};

// Dashboard Mock Data
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

const faqs = [
  {id:'faq-1', category:'Tests', q:'How do I create and take a practice test?', a:'Go to Test Preparation from the sidebar. Click Create New Test, choose your subject, difficulty, and question count, then click Start Test. You can review your answers and score immediately after submission.'},
  {id:'faq-2', category:'Tests', q:'Can I retake a test after completion?', a:'Yes! On the Score Overview screen, click Retake Test to practice the same configuration again. You can take unlimited tests on any subject.'},
  {id:'faq-3', category:'Resume', q:'How do I build my resume on EduVision?', a:'Go to Resume Builder from the sidebar. Choose a template, then fill in each section — Personal Info, Education, Experience, Skills, Projects, and Summary. Your resume strength score updates in real time as you add content.'},
  {id:'faq-4', category:'Resume', q:'Can I upload my existing resume?', a:'Yes! On the Resume Builder home screen, click Upload Resume. We support PDF and DOC formats up to 5MB. Our AI will extract your information automatically.'},
  {id:'faq-5', category:'Interview', q:'How does the AI Interview work?', a:'Aria, our AI interviewer, asks you real interview questions based on your target role. Type your answers, and Aria gives you immediate feedback. After the session, you receive a detailed score breakdown and improvement tips.'},
  {id:'faq-6', category:'Interview', q:'What types of interviews can I practice?', a:'EduVision offers HR Interviews, Technical Interviews, Managerial Round practice, and Resume Walkthrough sessions. Start with HR Interview if you are a fresher.'},
  {id:'faq-7', category:'XP', q:'How does the XP system work?', a:'You earn XP by completing activities: +10 for daily login, +50 for taking a test, +75 for an interview session, +100 bonus for scoring 75% or more, and +200 for a 7-day streak. Level up from Starter to Champion as you earn more XP.'},
  {id:'faq-8', category:'Account', q:'How do I change my target role?', a:'Go to Settings from the sidebar bottom, then update your Target Role field under the Account tab. Your personalized recommendations will update automatically.'}
];

const resumeSections = [
  {label:"Personal Info", value:100},
  {label:"Education", value:100},
  {label:"Experience", value:100},
  {label:"Skills", value:60},
  {label:"Projects", value:40},
  {label:"Summary", value:0}
];

const purchaseHistory = [
  {id:'ph1', date:'Mar 15, 2025', type:'Test Credits',
   credits:10, amount:441,
   status:'completed', method:'Razorpay'},
  {id:'ph2', date:'Mar 10, 2025', type:'Resume Credits',
   credits:5, amount:125,
   status:'completed', method:'Razorpay'},
  {id:'ph3', date:'Mar 5, 2025', type:'Interview Credits',
   credits:4, amount:396,
   status:'completed', method:'Razorpay'}
];

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface OnboardingData {
  targetRole: string;
  targetDomain: string;
  educationLevel: string;
  college: string;
  cgpa: string;
  cgpaType: 'cgpa' | 'percentage';
  timeline: string;
  intensity: string;
  selectedModules: string[];
}

// Dashboard Helper Components
const StatCard = ({ icon, value, label, trend, trendPositive, accentColor, bgGradient }: any) => {
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
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3, background: accentColor,
        borderRadius: '20px 20px 0 0'
      }}/>
      
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 6, marginTop: 4
      }}>
        <img src={icon} width="28" height="28" alt=""
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
      
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 22, fontWeight: 800,
        color: '#0F172A', lineHeight: 1.1
      }}>{displayValue}</div>
      
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 10, fontWeight: 600,
        color: '#94A3B8', textTransform: 'uppercase',
        letterSpacing: '0.8px', marginTop: 2
      }}>{label}</div>
    </div>
  );
};

const CircularProgress = ({ value, size = 80, strokeWidth = 7 }: any) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? '#16A34A' : value >= 50 ? '#BD1313' : '#DC2626';

  return (
    <div style={{
      position:'relative', width:size, height:size,
      display:'flex', alignItems:'center',
      justifyContent:'center'
    }}>
      <svg width={size} height={size} style={{transform:'rotate(-90deg)'}}>
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
        <div style={{
          fontFamily:'var(--font-display)',
          fontSize:16, fontWeight:800,
          color:'#0F172A', lineHeight:1
        }}>
          {value}%
        </div>
        <div style={{
          fontFamily:'var(--font-body)',
          fontSize:9, color:'#94A3B8',
          textTransform:'uppercase',
          letterSpacing:'0.5px'
        }}>
          Score
        </div>
      </div>
    </div>
  );
};

// Reusable Toggle Switch Component
const ToggleSwitch = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <div
    onClick={onChange}
    style={{
      width: 44,
      height: 24,
      borderRadius: 9999,
      background: value ? '#BD1313' : '#E2E8F0',
      position: 'relative',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'background 0.3s'
    }}>
    <div style={{
      position: 'absolute',
      top: 2,
      left: value ? 22 : 2,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: 'white',
      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      transition: 'left 0.3s'
    }}/>
  </div>
);

// Reusable Settings Row Component
const SettingsRow = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
  <div style={{
    background: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    padding: '0 16px',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  }}>
    <div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        fontWeight: 600,
        color: '#0F172A'
      }}>{title}</div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 1
      }}>{subtitle}</div>
    </div>
    {children}
  </div>
);

function App() {
  const [screen, setScreen] = useState(new URLSearchParams(location.search).get('screen') || 'dashboard');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeNav, setActiveNav] = useState('dashboard');
  
  // Onboarding state
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    targetRole: '',
    targetDomain: '',
    educationLevel: '',
    college: '',
    cgpa: '',
    cgpaType: 'cgpa',
    timeline: '',
    intensity: '',
    selectedModules: ['resume', 'tests']
  });
  const [showSkipModal, setShowSkipModal] = useState(false);
  
  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [emailSent, setEmailSent] = useState(false);

  // Dashboard state
  const [tasks, setTasks] = useState(todaysTasks);
  const [tipIndex, setTipIndex] = useState(0);
  const [tipVisible, setTipVisible] = useState(true);
  const [dashboardMounted, setDashboardMounted] = useState(false);

  // New screens state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {id:1, type:'xp', icon:'⚡', title:'You earned +50 XP!', body:'Completed Mathematics Test successfully', time:'2h ago', read:false},
    {id:2, type:'badge', icon:'🏅', title:'New badge unlocked!', body:'You earned the "First Test" badge', time:'3h ago', read:false},
    {id:3, type:'reminder', icon:'📋', title:'Daily reminder', body:'Complete your resume skills section', time:'5h ago', read:true},
    {id:4, type:'score', icon:'📊', title:'Score improved!', body:'Your avg score went from 68% to 74%', time:'Yesterday', read:true},
    {id:5, type:'streak', icon:'🔥', title:'7-day streak!', body:'Keep practicing — you are on fire!', time:'Yesterday', read:true},
    {id:6, type:'tip', icon:'💡', title:'Study tip', body:'Students who practice daily score 40% better', time:'2 days ago', read:true},
    {id:7, type:'resume', icon:'📄', title:'Resume tip', body:'Add projects to boost strength to 80%', time:'3 days ago', read:true},
    {id:8, type:'expert', icon:'👥', title:'Expert available', body:'Priya Mehta (Google SWE) has open slots', time:'4 days ago', read:true}
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({...n, read:true})));
  const markOneRead = (id: number) => setNotifications(prev => prev.map(n => n.id===id ? {...n, read:true} : n));
  const deleteNotification = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  const [settingsData, setSettingsData] = useState({
    notifications: {
      testReminders: true,
      dailyGoal: true,
      badgeAlerts: true,
      expertUpdates: false,
      weeklyReport: true,
      streakAlerts: true
    },
    appearance: {
      darkMode: false,
      compactView: false,
      animations: true,
      fontSize: 'medium'
    },
    privacy: {
      showOnLeaderboard: true,
      shareProgress: false,
      publicProfile: false
    }
  });

  const toggleSetting = (section: string, key: string) => {
    setSettingsData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [(prev as any)[section][key]]: !(prev as any)[section][key]
      }
    }));
  };

  const [activeSettingsTab, setActiveSettingsTab] = useState('account');
  const [activeHelpTab, setActiveHelpTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [faqFilter, setFaqFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketText, setTicketText] = useState('');
  const [profileTab, setProfileTab] = useState('overview');
  const [notifFilter, setNotifFilter] = useState('all');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showXPModal, setShowXPModal] = useState(false);

  // Credits & Billing state
  const [creditTab, setCreditTab] = useState('resume');
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [wallet, setWallet] = useState({
    resume: 5,
    tests: 4,
    interview: 4
  });

  // Credit Plans
  const creditPlans = {
    resume: [
      {id:'r1', credits:1, price:25, perCredit:25,
       label:'1 Resume Credit', tag:'Single credit',
       popular:false},
      {id:'r2', credits:10, price:225, perCredit:23,
       label:'10 Resume Credits', tag:'₹23 per credit',
       popular:false},
      {id:'r3', credits:50, price:1000, perCredit:20,
       label:'50 Resume Credits', tag:'₹20 per credit',
       popular:true}
    ],
    tests: [
      {id:'t1', credits:1, price:49, perCredit:49,
       label:'1 Test Credit', tag:'Single credit',
       popular:false},
      {id:'t2', credits:10, price:441, perCredit:44,
       label:'10 Test Credits', tag:'₹44 per credit',
       popular:false},
      {id:'t3', credits:50, price:1960, perCredit:39,
       label:'50 Test Credits', tag:'₹39 per credit',
       popular:true}
    ],
    interview: [
      {id:'i1', credits:1, price:99, perCredit:99,
       label:'1 Interview Credit', tag:'Single credit',
       popular:false},
      {id:'i2', credits:10, price:891, perCredit:89,
       label:'10 Interview Credits', tag:'₹89 per credit',
       popular:false},
      {id:'i3', credits:50, price:3960, perCredit:79,
       label:'50 Interview Credits', tag:'₹79 per credit',
       popular:true}
    ]
  };

  // Cart helper functions
  const addToCart = (plan: any, type: string) => {
    const existing = cart.find(item => item.id === plan.id);
    if (existing) {
      setCart(prev => prev.map(item =>
        item.id === plan.id
          ? {...item, qty: item.qty + 1}
          : item));
    } else {
      setCart(prev => [...prev, {
        ...plan, type, qty: 1
      }]);
    }
    setTimeout(() => showToast(
      plan.label + " added to cart! 🛒"), 0);
  };

  const removeFromCart = (id: string) =>
    setCart(prev => prev.filter(i => i.id !== id));

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.price * item.qty), 0);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty, 0);

  // Toast system - use counter to ensure unique IDs
  const toastCounterRef = useRef(0);
  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now() + toastCounterRef.current++;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const showXPToast = (message: string) => {
    const id = Date.now() + toastCounterRef.current++;
    setToasts(prev => [...prev, { id, message, type: 'info' }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  };

  // Dashboard task toggle
  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? {...t, done: !t.done} : t
    ));
    const task = tasks.find(t => t.id === id);
    if (task && !task.done) {
      showToast("Task completed! ✓");
      showXPToast("+20 XP 🎉");
    }
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  // Loading screen auto-transition
  useEffect(() => {
    if (screen === 'loading') {
      const timer = setTimeout(() => {
        setScreen('landing');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // OTP timer countdown
  useEffect(() => {
    if (screen === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [screen, otpTimer]);

  // Save onboarding data when plan-ready screen is reached
  useEffect(() => {
    if (screen === 'plan-ready') {
      localStorage.setItem('eduvision_onboarding', JSON.stringify({ complete: true, data: onboardingData }));
    }
  }, [screen, onboardingData]);

  // Dashboard mount effect
  useEffect(() => {
    if (screen === 'dashboard' && !dashboardMounted) {
      setDashboardMounted(true);
      setTimeout(() => {
        showToast("Welcome back, Rahul! 👋");
      }, 800);
      setTimeout(() => {
        showXPToast("+10 XP 🎉");
      }, 1500);
    }
  }, [screen, dashboardMounted]);

  // Motivational tip rotation
  useEffect(() => {
    if (screen === 'dashboard') {
      const interval = setInterval(() => {
        setTipVisible(false);
        setTimeout(() => {
          setTipIndex(i => (i + 1) % motivationalTips.length);
          setTipVisible(true);
        }, 300);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  // Password strength calculator
  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    if (pass.length < 4) return 1;
    if (pass.length < 6) return 2;
    if (pass.length < 8) return 3;
    return 4;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', '#DC2626', '#D97706', '#2563EB', '#16A34A'];

  // OTP input handler
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);
      
      // Auto-advance to next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Navigation
  const navigateToScreen = (newScreen: string, navItem?: string) => {
    setScreen(newScreen);
    if (navItem) setActiveNav(navItem);
    
    // Show module entry toasts (defer to avoid setState during render warnings)
    if (newScreen === 'resume') {
      setTimeout(() => showToast("Resume Builder — Let's get hired! 📄"), 0);
    }
  };

  // Toast Component
  const ToastContainer = () => (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? CheckCircle : 
                     toast.type === 'error' ? XCircle :
                     toast.type === 'warning' ? AlertTriangle : Info;
        const iconColor = toast.type === 'success' ? '#16A34A' : 
                          toast.type === 'error' ? '#DC2626' :
                          toast.type === 'warning' ? '#D97706' : '#BD1313';
        
        return (
          <div
            key={toast.id}
            className="bg-[#0F172A] text-white px-5 py-3 rounded-full flex items-center gap-3 shadow-lg min-w-[240px] justify-center"
            style={{ animation: 'toastEnter 350ms cubic-bezier(0.34,1.56,0.64,1) both' }}
          >
            <Icon size={16} color={iconColor} />
            <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );

  // LOADING SCREEN
  if (screen === 'loading') {
    return (
      <>
        <ToastContainer />
        <div className="w-screen h-screen overflow-hidden relative flex flex-col items-center justify-center"
             style={{ 
               background: 'linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)'
             }}>
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.06]" 
               style={{ 
                 backgroundImage: 'url(https://i.ibb.co/GQM6xx2F/dot-grid-light.png)',
                 backgroundRepeat: 'repeat',
                 backgroundSize: '40px 40px'
               }} />
          
          {/* Decorative circles */}
          <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full"
               style={{ background: 'rgba(255,255,255,0.04)' }} />
          <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full"
               style={{ background: 'rgba(255,255,255,0.03)' }} />
          
          {/* Floating icons */}
          <img src="https://img.icons8.com/3d-fluency/100/graduation-cap.png" alt=""
               className="absolute top-[15%] left-[15%] w-10 h-10 opacity-15"
               style={{ background: 'transparent' }} />
          <img src="https://img.icons8.com/3d-fluency/100/star.png" alt=""
               className="absolute top-[20%] right-[20%] w-8 h-8 opacity-15"
               style={{ background: 'transparent' }} />
          <img src="https://img.icons8.com/3d-fluency/100/rocket.png" alt=""
               className="absolute bottom-[20%] left-[20%] w-9 h-9 opacity-15"
               style={{ background: 'transparent' }} />
          <img src="https://img.icons8.com/3d-fluency/100/trophy.png" alt=""
               className="absolute bottom-[25%] right-[18%] w-9 h-9 opacity-15"
               style={{ background: 'transparent' }} />
          
          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            <img src="https://i.ibb.co/C3FG8VDW/app-icon.png" alt="EduVision" 
                 width="80" height="80"
                 style={{ 
                   filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.3))',
                   animation: 'fadeUp 600ms ease-out both'
                 }} />
            
            <div className="mt-4 flex items-baseline gap-1"
                 style={{ animation: 'fadeUp 600ms ease-out both 0.2s' }}>
              <span style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '40px', 
                fontWeight: 800,
                color: 'rgba(255,255,255,0.85)'
              }}>Edu</span>
              <span style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '40px', 
                fontWeight: 800,
                color: 'white'
              }}>Vision</span>
            </div>
            
            <p className="mt-2 text-white/65 text-base"
               style={{ 
                 fontFamily: 'var(--font-body)',
                 animation: 'fadeUp 600ms ease-out both 0.4s'
               }}>
              Your Career Growth Companion
            </p>
            
            <div className="mt-8 w-[200px] h-[3px] bg-white/15 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full"
                   style={{ 
                     animation: 'loadProgress 1.8s ease-out 0.2s both'
                   }} />
            </div>
          </div>
          
          {/* Footer */}
          <div className="absolute bottom-8 flex items-center gap-2">
            <span className="text-white/45 text-xs" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              Powered by
            </span>
            <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="AIVision21" 
                 height="16" className="opacity-45" />
          </div>
        </div>
      </>
    );
  }

  // LANDING SCREEN
  if (screen === 'landing') {
    return (
      <>
        <ToastContainer />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
               style={{ background: 'linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)' }}>
            
            {/* Background decorations */}
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.03)' }} />
              <div className="absolute inset-0 opacity-[0.06]" 
                   style={{ 
                     backgroundImage: 'url(https://i.ibb.co/GQM6xx2F/dot-grid-light.png)',
                     backgroundRepeat: 'repeat',
                     backgroundSize: '40px 40px'
                   }} />
              
              {/* Main content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 max-w-[480px] mx-auto text-center screen-enter">
                <div className="bg-white/15 border border-white/25 text-white text-xs font-semibold rounded-full px-4 py-[6px] mb-6"
                     style={{ fontFamily: 'var(--font-body)' }}>
                  🎓 AIVision21 Presents
                </div>
                
                <img src="https://i.ibb.co/xKMVbCjD/landing-hero.png" alt="Hero" 
                     width="280" height="200"
                     className="mb-6"
                     style={{ 
                       filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.3))',
                       background: 'transparent'
                     }} />
                
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-[28px]">🎓</span>
                  <span style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '36px', 
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.9)'
                  }}>Edu</span>
                  <span style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '36px', 
                    fontWeight: 800,
                    color: 'white'
                  }}>Vision</span>
                </div>
                
                <p className="text-white/75 text-base mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Your Career Growth Companion
                </p>
                
                <p className="text-white/60 text-sm leading-relaxed mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                  Practice tests, build your resume & ace interviews<br />
                  — all in one app built for students like you.
                </p>
                
                <div className="flex items-center gap-2 mb-8">
                  <div className="bg-white/12 border border-white/20 text-white text-xs font-semibold rounded-full px-[14px] py-[6px]"
                       style={{ fontFamily: 'var(--font-body)' }}>
                    📈 50K+ Students
                  </div>
                  <div className="bg-white/12 border border-white/20 text-white text-xs font-semibold rounded-full px-[14px] py-[6px]"
                       style={{ fontFamily: 'var(--font-body)' }}>
                    ⭐ 4.9 Rated
                  </div>
                  <div className="bg-white/12 border border-white/20 text-white text-xs font-semibold rounded-full px-[14px] py-[6px]"
                       style={{ fontFamily: 'var(--font-body)' }}>
                    🤖 AI Powered
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    navigateToScreen('signup');
                  }}
                  className="w-full h-[52px] bg-white rounded-xl text-[#BD1313] font-bold text-base mb-3 shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>
                  Get Started — It's Free →
                </button>
                
                <button 
                  onClick={() => {
                    navigateToScreen('login');
                  }}
                  className="w-full h-12 bg-white/12 border-[1.5px] border-white/30 text-white rounded-xl hover:bg-white/20 transition-all"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600 }}>
                  I Already Have an Account
                </button>
                
                <p className="text-white/50 text-[11px] mt-5" style={{ fontFamily: 'var(--font-body)' }}>
                  Trusted by students at IIT, VIT, BITS, DU & 200+ colleges
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // SIGNUP SCREEN
  if (screen === 'signup') {
    return (
      <>
        <ToastContainer />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
               style={{ background: 'linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)' }}>
            
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.03)' }} />
              <div className="absolute inset-0 opacity-[0.06]" 
                   style={{ 
                     backgroundImage: 'url(https://i.ibb.co/GQM6xx2F/dot-grid-light.png)',
                     backgroundRepeat: 'repeat',
                     backgroundSize: '40px 40px'
                   }} />
              
              <div className="relative z-10 h-full flex items-center justify-center px-6">
                <div className="bg-white rounded-[24px] w-full max-w-[480px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] screen-enter">
                  {/* Top bar */}
                  <div className="h-12 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between">
                    <button 
                      onClick={() => navigateToScreen('landing')}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#F8FAFF] rounded-lg transition-colors">
                      <ChevronLeft size={20} color="#475569" />
                    </button>
                    <div className="bg-[#FDF2F2] text-[#BD1313] text-xs font-semibold rounded-full px-3 py-1"
                         style={{ fontFamily: 'var(--font-body)' }}>
                      Step 1 of 2
                    </div>
                  </div>
                  
                  {/* Header */}
                  <div className="px-6 pt-6 pb-4">
                    <div className="bg-[#FDF2F2] border border-[#F5BFBF] text-[#BD1313] text-xs font-semibold rounded-full px-[14px] py-1 inline-block mb-3"
                         style={{ fontFamily: 'var(--font-body)' }}>
                      ✨ Join 50,000+ Students
                    </div>
                    <h2 style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: '26px', 
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '6px'
                    }}>Create Your Account</h2>
                    <p className="text-[#64748B] text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                      Start your placement journey today.
                    </p>
                  </div>
                  
                  {/* Form */}
                  <div className="px-6 pb-6">
                    <div className="flex gap-3 mb-[14px]">
                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                               style={{ fontFamily: 'var(--font-body)' }}>First Name</label>
                        <input type="text" placeholder="Rahul"
                               className="w-full h-12 px-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                               style={{ fontFamily: 'var(--font-body)' }} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                               style={{ fontFamily: 'var(--font-body)' }}>Last Name</label>
                        <input type="text" placeholder="Sharma"
                               className="w-full h-12 px-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                               style={{ fontFamily: 'var(--font-body)' }} />
                      </div>
                    </div>
                    
                    <div className="mb-[14px]">
                      <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                             style={{ fontFamily: 'var(--font-body)' }}>Email Address</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        <input type="email" placeholder="rahul@vit.edu"
                               className="w-full h-12 pl-11 pr-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                               style={{ fontFamily: 'var(--font-body)' }} />
                      </div>
                    </div>
                    
                    <div className="mb-[14px]">
                      <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                             style={{ fontFamily: 'var(--font-body)' }}>Phone Number</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        <input type="tel" placeholder="+91 98765 43210"
                               className="w-full h-12 pl-11 pr-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                               style={{ fontFamily: 'var(--font-body)' }} />
                      </div>
                    </div>
                    
                    <div className="mb-[14px]">
                      <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                             style={{ fontFamily: 'var(--font-body)' }}>Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Min. 8 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-12 px-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                          style={{ fontFamily: 'var(--font-body)' }} />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-[14px] top-1/2 -translate-y-1/2">
                          {showPassword ? <EyeOff size={18} className="text-[#94A3B8]" /> : <Eye size={18} className="text-[#94A3B8]" />}
                        </button>
                      </div>
                      {password && (
                        <div className="mt-2 flex items-center gap-1">
                          <div className="flex gap-1 flex-1">
                            {[1,2,3,4].map(i => (
                              <div key={`strength-${i}`} className="h-[3px] flex-1 rounded-full"
                                   style={{ background: i <= passwordStrength ? strengthColors[passwordStrength] : '#E2E8F0' }} />
                            ))}
                          </div>
                          <span className="text-xs ml-2"
                                style={{ color: strengthColors[passwordStrength], fontFamily: 'var(--font-body)' }}>
                            {strengthLabels[passwordStrength]}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-5">
                      <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                             style={{ fontFamily: 'var(--font-body)' }}>Confirm Password</label>
                      <div className="relative">
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Re-enter password"
                          className="w-full h-12 px-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                          style={{ fontFamily: 'var(--font-body)' }} />
                        <button 
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-[14px] top-1/2 -translate-y-1/2">
                          {showConfirmPassword ? <EyeOff size={18} className="text-[#94A3B8]" /> : <Eye size={18} className="text-[#94A3B8]" />}
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        showToast("Account created! Welcome 🎉");
                        setOtpTimer(30);
                        navigateToScreen('otp');
                      }}
                      className="w-full h-[52px] bg-[#BD1313] text-white rounded-xl hover:bg-[#991010] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(189,19,19,0.35)] active:scale-[0.97] transition-all"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>
                      Create My Account →
                    </button>
                    
                    <p className="text-center text-sm text-[#64748B] mt-4" style={{ fontFamily: 'var(--font-body)' }}>
                      Already have an account?{' '}
                      <button onClick={() => navigateToScreen('login')} 
                              className="text-[#BD1313] font-semibold hover:underline">
                        Login here
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // OTP VERIFICATION SCREEN
  if (screen === 'otp') {
    return (
      <>
        <ToastContainer />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
               style={{ background: 'linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)' }}>
            
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.03)' }} />
              <div className="absolute inset-0 opacity-[0.06]" 
                   style={{ 
                     backgroundImage: 'url(https://i.ibb.co/GQM6xx2F/dot-grid-light.png)',
                     backgroundRepeat: 'repeat',
                     backgroundSize: '40px 40px'
                   }} />
              
              <div className="relative z-10 h-full flex items-center justify-center px-6">
                <div className="bg-white rounded-[24px] w-full max-w-[440px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] screen-enter">
                  {/* Top bar */}
                  <div className="h-12 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between">
                    <button 
                      onClick={() => navigateToScreen('signup')}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#F8FAFF] rounded-lg transition-colors">
                      <ChevronLeft size={20} color="#475569" />
                    </button>
                    <div className="bg-[#FDF2F2] text-[#BD1313] text-xs font-semibold rounded-full px-3 py-1"
                         style={{ fontFamily: 'var(--font-body)' }}>
                      Step 2 of 2
                    </div>
                  </div>
                  
                  {/* Body */}
                  <div className="px-7 py-8 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center shadow-[0_8px_24px_rgba(189,19,19,0.35)]"
                         style={{ background: 'linear-gradient(135deg, #BD1313, #7A0D0D)' }}>
                      <Mail size={28} color="white" />
                    </div>
                    
                    <h2 style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: '26px', 
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '8px'
                    }}>Check Your Inbox</h2>
                    
                    <p className="text-[#64748B] text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                      We've sent a 4-digit code to
                    </p>
                    
                    <div className="bg-[#FDF2F2] border border-[#F5BFBF] text-[#BD1313] text-xs font-semibold rounded-full px-[14px] py-1 inline-block mb-5"
                         style={{ fontFamily: 'var(--font-body)' }}>
                      ra•••@vit.edu
                    </div>
                    
                    <p className="text-[#64748B] text-[13px] mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                      Code expires in <span className="text-[#BD1313] font-bold">{otpTimer}</span>s
                    </p>
                    
                    {/* OTP Inputs */}
                    <div className="flex gap-3 justify-center mb-5">
                      {[0,1,2,3].map(i => (
                        <input
                          key={`otp-input-${i}`}
                          id={`otp-${i}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={otpValues[i]}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="w-16 h-[68px] text-center border-2 border-[#E2E8F0] rounded-xl bg-[#FAFAFA] text-[#0F172A] focus:border-[#BD1313] focus:bg-white focus:shadow-[0_0_0_3px_rgba(189,19,19,0.1)] focus:scale-105 transition-all"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '28px',
                            fontWeight: 800
                          }}
                        />
                      ))}
                    </div>
                    
                    <p className="text-[#64748B] text-sm mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                      Didn't receive it?{' '}
                      <button 
                        onClick={() => {
                          if (otpTimer === 0) {
                            setOtpTimer(30);
                            showToast("Code resent successfully ✓");
                          }
                        }}
                        disabled={otpTimer > 0}
                        className={`font-semibold ${otpTimer === 0 ? 'text-[#BD1313] hover:underline' : 'text-[#94A3B8] cursor-not-allowed'}`}>
                        Resend Code
                      </button>
                    </p>
                    
                    <button 
                      onClick={() => {
                        showToast("Email verified ✓");
                        navigateToScreen('onboarding-1');
                      }}
                      className="w-full h-[52px] bg-[#BD1313] text-white rounded-xl hover:bg-[#991010] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(189,19,19,0.35)] active:scale-[0.97] transition-all"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>
                      Verify & Continue →
                    </button>
                    
                    <p className="text-[#94A3B8] text-xs mt-4 flex items-center justify-center gap-1" 
                       style={{ fontFamily: 'var(--font-body)' }}>
                      🔒 Your data is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // LOGIN SCREEN
  if (screen === 'login') {
    return (
      <>
        <ToastContainer />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
               style={{ background: 'linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)' }}>
            
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.03)' }} />
              <div className="absolute inset-0 opacity-[0.06]" 
                   style={{ 
                     backgroundImage: 'url(https://i.ibb.co/GQM6xx2F/dot-grid-light.png)',
                     backgroundRepeat: 'repeat',
                     backgroundSize: '40px 40px'
                   }} />
              
              <div className="relative z-10 h-full flex items-center justify-center px-6">
                <div className="bg-white rounded-[24px] w-full max-w-[480px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] screen-enter">
                  {/* Top bar */}
                  <div className="h-12 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between">
                    <button 
                      onClick={() => navigateToScreen('landing')}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#F8FAFF] rounded-lg transition-colors">
                      <ChevronLeft size={20} color="#475569" />
                    </button>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg">🎓</span>
                      <span style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: '18px', 
                        fontWeight: 800,
                        color: '#0F172A'
                      }}>Edu</span>
                      <span style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: '18px', 
                        fontWeight: 800,
                        color: '#BD1313'
                      }}>Vision</span>
                    </div>
                  </div>
                  
                  {/* Body */}
                  <div className="px-7 py-8">
                    <h2 style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: '28px', 
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '6px'
                    }}>Welcome back 👋</h2>
                    
                    <p className="text-[#64748B] text-sm mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                      Continue your career journey.
                    </p>
                    
                    {/* Google SSO button */}
                    <button className="w-full h-12 bg-white border-[1.5px] border-[#E2E8F0] rounded-xl flex items-center justify-center gap-[10px] hover:bg-[#F8FAFF] hover:border-[#CBD5E1] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all mb-5">
                      <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                        <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.59.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
                      </svg>
                      <span className="text-[#0F172A] text-[15px] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
                        Continue with Google
                      </span>
                    </button>
                    
                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                      <div className="flex-1 h-[1px] bg-[#E2E8F0]" />
                      <span className="text-[#94A3B8] text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                        or sign in with email
                      </span>
                      <div className="flex-1 h-[1px] bg-[#E2E8F0]" />
                    </div>
                    
                    <div className="mb-[14px]">
                      <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                             style={{ fontFamily: 'var(--font-body)' }}>Email Address</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        <input type="email" placeholder="rahul@vit.edu"
                               className="w-full h-12 pl-11 pr-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                               style={{ fontFamily: 'var(--font-body)' }} />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                             style={{ fontFamily: 'var(--font-body)' }}>Password</label>
                      <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Enter password"
                               className="w-full h-12 px-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                               style={{ fontFamily: 'var(--font-body)' }} />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-[14px] top-1/2 -translate-y-1/2">
                          {showPassword ? <EyeOff size={18} className="text-[#94A3B8]" /> : <Eye size={18} className="text-[#94A3B8]" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-[18px] h-[18px] rounded accent-[#BD1313]" />
                        <span className="text-[#475569] text-[13px]" style={{ fontFamily: 'var(--font-body)' }}>
                          Remember me
                        </span>
                      </label>
                      <button 
                        onClick={() => navigateToScreen('forgot-password')}
                        className="text-[#BD1313] text-[13px] font-semibold hover:underline"
                        style={{ fontFamily: 'var(--font-body)' }}>
                        Forgot password?
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => {
                        showToast(`Welcome back, ${mockUser.name.split(' ')[0]}! 👋`);
                        navigateToScreen('dashboard', 'dashboard');
                      }}
                      className="w-full h-[52px] bg-[#BD1313] text-white rounded-xl hover:bg-[#991010] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(189,19,19,0.35)] active:scale-[0.97] transition-all"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>
                      Login to EduVision →
                    </button>
                    
                    <p className="text-center text-sm text-[#64748B] mt-5" style={{ fontFamily: 'var(--font-body)' }}>
                      New to EduVision?{' '}
                      <button onClick={() => navigateToScreen('signup')} 
                              className="text-[#BD1313] font-semibold hover:underline">
                        Create free account
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // FORGOT PASSWORD SCREEN
  if (screen === 'forgot-password') {
    return (
      <>
        <ToastContainer />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
               style={{ background: 'linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)' }}>
            
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
                   style={{ background: 'rgba(255,255,255,0.03)' }} />
              <div className="absolute inset-0 opacity-[0.06]" 
                   style={{ 
                     backgroundImage: 'url(https://i.ibb.co/GQM6xx2F/dot-grid-light.png)',
                     backgroundRepeat: 'repeat',
                     backgroundSize: '40px 40px'
                   }} />
              
              <div className="relative z-10 h-full flex items-center justify-center px-6">
                <div className="bg-white rounded-[24px] w-full max-w-[440px] px-7 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] screen-enter">
                  {!emailSent ? (
                    <>
                      <button 
                        onClick={() => navigateToScreen('login')}
                        className="text-[#BD1313] text-sm font-semibold mb-2 hover:underline flex items-center gap-1"
                        style={{ fontFamily: 'var(--font-body)' }}>
                        ← Back to Login
                      </button>
                      
                      <div className="w-16 h-16 rounded-full mx-auto mt-2 mb-5 flex items-center justify-center border-2 border-[#F5BFBF]"
                           style={{ background: 'linear-gradient(135deg, #FDF2F2, #F5BFBF)' }}>
                        <Key size={28} color="#BD1313" />
                      </div>
                      
                      <h2 className="text-center mb-2" style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: '26px', 
                        fontWeight: 800,
                        color: '#0F172A'
                      }}>Reset Your Password</h2>
                      
                      <p className="text-center text-[#64748B] text-sm leading-relaxed mb-6" 
                         style={{ fontFamily: 'var(--font-body)' }}>
                        Enter your registered email and we'll send<br />
                        you a link to reset your password.
                      </p>
                      
                      <div className="mb-4">
                        <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                               style={{ fontFamily: 'var(--font-body)' }}>Email Address</label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                          <input type="email" placeholder="rahul@vit.edu"
                                 className="w-full h-12 pl-11 pr-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                                 style={{ fontFamily: 'var(--font-body)' }} />
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setEmailSent(true);
                        }}
                        className="w-full h-[52px] bg-[#BD1313] text-white rounded-xl hover:bg-[#991010] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(189,19,19,0.35)] active:scale-[0.97] transition-all"
                        style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>
                        Send Reset Link
                      </button>
                    </>
                  ) : (
                    <div style={{ animation: 'fadeUp 300ms ease-out' }}>
                      <div className="w-[72px] h-[72px] rounded-full mx-auto mb-5 flex items-center justify-center border-2 border-[#86EFAC] shadow-[0_0_0_12px_rgba(22,163,74,0.08)]"
                           style={{ background: 'linear-gradient(135deg, #DCFCE7, #BBF7D0)' }}>
                        <CheckCircle size={32} color="#16A34A" />
                      </div>
                      
                      <h2 className="text-center mb-2" style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: '26px', 
                        fontWeight: 800,
                        color: '#16A34A'
                      }}>Email Sent! ✅</h2>
                      
                      <p className="text-center text-[#64748B] text-sm leading-relaxed mb-6" 
                         style={{ fontFamily: 'var(--font-body)' }}>
                        A password reset link has been sent to your email.<br />
                        It expires in 15 minutes — check your inbox.
                      </p>
                      
                      <button 
                        onClick={() => {
                          setEmailSent(false);
                          navigateToScreen('login');
                        }}
                        className="w-full h-12 bg-transparent border-[1.5px] border-[#F5BFBF] text-[#BD1313] rounded-xl hover:bg-[#FDF2F2] transition-all mb-3"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600 }}>
                        Back to Login
                      </button>
                      
                      <button 
                        onClick={() => {
                          showToast("Reset link resent ✓");
                        }}
                        className="text-[#BD1313] text-sm font-semibold w-full hover:underline"
                        style={{ fontFamily: 'var(--font-body)' }}>
                        Didn't receive? Resend email
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ONBOARDING SCREENS
  // Skip Modal Component
  const SkipModal = () => {
    if (!showSkipModal) return null;

    return (
      <>
        <div className="fixed inset-0 bg-[rgba(15,23,42,0.5)] z-[200]" 
             style={{ backdropFilter: 'blur(4px)' }}
             onClick={() => setShowSkipModal(false)} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[20px] p-7 max-w-[400px] w-[90%] shadow-[0_20px_60px_rgba(0,0,0,0.18)] z-[201]"
             style={{ animation: 'scaleIn 250ms ease-out' }}>
          <style>{`
            @keyframes scaleIn {
              from { opacity: 0; transform: translate(-50%,-50%) scale(0.94); }
              to { opacity: 1; transform: translate(-50%,-50%) scale(1); }
            }
          `}</style>
          
          <h3 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '20px', 
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: '12px'
          }}>Skip setup?</h3>
          
          <p className="text-[#64748B] text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
            We'll use general settings for now.<br />
            You can personalize anytime from Settings.
          </p>
          
          <div className="flex flex-col gap-[10px]">
            <button 
              onClick={() => setShowSkipModal(false)}
              className="w-full h-12 bg-[#BD1313] text-white rounded-xl hover:bg-[#991010] transition-all"
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}>
              Continue Setup
            </button>
            <button 
              onClick={() => {
                setShowSkipModal(false);
                navigateToScreen('dashboard', 'dashboard');
              }}
              className="w-full h-11 bg-transparent border-[1.5px] border-[#F5BFBF] text-[#BD1313] rounded-xl hover:bg-[#FDF2F2] transition-all"
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}>
              Skip Setup
            </button>
          </div>
        </div>
      </>
    );
  };

  // Onboarding Shell Components
  const OnboardingTopBar = ({ step, onBack }: { step: number; onBack?: () => void }) => (
    <div className="h-14 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between flex-shrink-0">
      <div className="w-[80px]">
        {step > 1 && onBack && (
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center hover:bg-[#F8FAFF] rounded-lg transition-colors">
            <ChevronLeft size={20} color="#475569" />
          </button>
        )}
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-lg">🎓</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>Edu</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#BD1313' }}>Vision</span>
      </div>
      
      <button onClick={() => setShowSkipModal(true)} className="text-[#94A3B8] text-[13px] hover:text-[#BD1313] transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
        Skip for now
      </button>
    </div>
  );

  const OnboardingProgress = ({ step }: { step: number }) => {
    const progress = (step / 4) * 100;
    
    return (
      <div className="flex-shrink-0">
        <div className="w-full h-2 bg-[#F5BFBF]">
          <div className="h-full bg-[#BD1313] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-right pr-6 pt-[6px]">
          <span className="text-[#94A3B8] text-[11px] font-semibold uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-body)' }}>
            Step {step} of 4
          </span>
        </div>
      </div>
    );
  };

  // ONBOARDING STEP 1 - TARGET ROLE
  if (screen === 'onboarding-1') {
    const roles = [
      { emoji: '💻', name: 'Software Engineer', domain: 'Technology', bg: '#FFF1F2' },
      { emoji: '📊', name: 'Data Analyst', domain: 'Analytics', bg: '#FFFBEB' },
      { emoji: '🎨', name: 'UI/UX Designer', domain: 'Design', bg: '#FAF5FF' },
      { emoji: '📢', name: 'Marketing Manager', domain: 'Marketing', bg: '#FEF9C3' },
      { emoji: '🏦', name: 'Finance Analyst', domain: 'Finance', bg: '#F0FDF4' },
      { emoji: '👥', name: 'HR Manager', domain: 'Human Resources', bg: '#EFF6FF' },
      { emoji: '🛒', name: 'Business Development', domain: 'Sales & BD', bg: '#FFF1F2' },
      { emoji: '☁️', name: 'Cloud Engineer', domain: 'Technology', bg: '#EFF6FF' },
      { emoji: '🤖', name: 'ML / AI Engineer', domain: 'Technology', bg: '#FAF5FF' },
      { emoji: '📋', name: 'Product Manager', domain: 'Product', bg: '#FFFBEB' },
      { emoji: '🏥', name: 'Healthcare Admin', domain: 'Healthcare', bg: '#F0FDF4' },
      { emoji: '✏️', name: 'Content Creator', domain: 'Media', bg: '#FEF9C3' },
    ];

    return (
      <>
        <ToastContainer />
        <SkipModal />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.12)] bg-white screen-enter">
            <OnboardingTopBar step={1} />
            <OnboardingProgress step={1} />
            
            <div className="flex-1 overflow-y-auto inner-scroll flex flex-col items-center px-6 pt-6 pb-6 max-w-[640px] mx-auto w-full">
              <img src="https://i.ibb.co/8gCxmvv9/onboarding-step1.png" alt="" height="140"
                   className="mb-4 flex-shrink-0"
                   style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))' }} />
              
              <h2 className="text-center mb-2 flex-shrink-0" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: '#0F172A' }}>
                What's your career goal? 🎯
              </h2>
              <p className="text-center text-[#64748B] text-sm leading-relaxed mb-5 flex-shrink-0" style={{ fontFamily: 'var(--font-body)' }}>
                We'll personalize your entire experience<br />around your target role.
              </p>
              
              <div className="w-full grid grid-cols-2 gap-[10px] flex-shrink-0">
                {roles.map((role) => {
                  const isSelected = onboardingData.targetRole === role.name;
                  return (
                    <div key={role.name}
                         onClick={() => setOnboardingData({ ...onboardingData, targetRole: role.name, targetDomain: role.domain })}
                         className={`relative h-16 rounded-[14px] px-4 py-3 flex items-center gap-3 cursor-pointer transition-all ${
                           isSelected ? 'border-2 border-[#BD1313] bg-[#FDF2F2]' : 'border-[1.5px] border-[#E2E8F0] bg-white hover:border-[#F5BFBF] hover:bg-[#FFF8F8]'
                         }`}>
                      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0"
                           style={{ background: role.bg }}>
                        {role.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-[#0F172A] truncate" style={{ fontFamily: 'var(--font-body)' }}>
                          {role.name}
                        </div>
                        <div className="text-[11px] text-[#94A3B8]" style={{ fontFamily: 'var(--font-body)' }}>
                          {role.domain}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#BD1313] flex items-center justify-center"
                             style={{ animation: 'badgePop 300ms ease-out' }}>
                          <Check size={12} color="white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <button className="text-[#BD1313] text-[13px] font-medium mt-3 mb-4 hover:underline flex-shrink-0"
                      style={{ fontFamily: 'var(--font-body)' }}>
                + I don't see my role
              </button>
            </div>
            
            <div className="h-16 bg-white border-t border-[#E2E8F0] px-6 flex items-center justify-between flex-shrink-0">
              <div className="w-[120px]"></div>
              <button 
                disabled={!onboardingData.targetRole}
                onClick={() => navigateToScreen('onboarding-2')}
                className={`w-40 h-11 rounded-xl transition-all ${
                  onboardingData.targetRole 
                    ? 'bg-[#BD1313] text-white hover:bg-[#991010] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(189,19,19,0.35)]' 
                    : 'bg-[#F5BFBF] text-[rgba(189,19,19,0.5)] cursor-not-allowed'
                }`}
                style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700 }}>
                Continue →
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ONBOARDING STEP 2 - EDUCATION
  if (screen === 'onboarding-2') {
    const educationOptions = [
      { emoji: '🎓', name: 'Final Year Student', desc: 'Graduating this year' },
      { emoji: '📚', name: 'Pre-Final Year', desc: '1–2 years remaining' },
      { emoji: '🏫', name: 'Early College', desc: '2+ years remaining' },
      { emoji: '💼', name: 'Recently Graduated', desc: 'Looking for first job' },
    ];

    const colleges = ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'VIT Vellore', 'BITS Pilani', 'NIT Trichy', 'Delhi University', 'Pune University', 'Anna University', 'Amity University'];

    return (
      <>
        <ToastContainer />
        <SkipModal />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.12)] bg-white screen-enter">
            <OnboardingTopBar step={2} onBack={() => navigateToScreen('onboarding-1')} />
            <OnboardingProgress step={2} />
            
            <div className="flex-1 overflow-y-auto inner-scroll flex flex-col items-center px-6 pt-6 pb-6 max-w-[640px] mx-auto w-full">
              <img src="https://i.ibb.co/qYKp4FkW/onboarding-step2-education.png" alt="" height="120"
                   className="mb-4 flex-shrink-0"
                   style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))' }} />
              
              <h2 className="text-center mb-2 flex-shrink-0" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: '#0F172A' }}>
                Tell us about yourself 🎓
              </h2>
              <p className="text-center text-[#64748B] text-sm leading-relaxed mb-5 flex-shrink-0" style={{ fontFamily: 'var(--font-body)' }}>
                This helps us pace your preparation<br />to match your timeline.
              </p>
              
              <div className="w-full flex-shrink-0">
                <div className="mb-4">
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                         style={{ fontFamily: 'var(--font-body)' }}>Current Education</label>
                  <div className="flex flex-col gap-2">
                    {educationOptions.map((option) => {
                      const isSelected = onboardingData.educationLevel === option.name;
                      return (
                        <div key={option.name}
                             onClick={() => setOnboardingData({ ...onboardingData, educationLevel: option.name })}
                             className={`h-14 rounded-xl px-4 flex items-center gap-3 cursor-pointer transition-all ${
                               isSelected ? 'border-2 border-[#BD1313] bg-[#FDF2F2]' : 'border-[1.5px] border-[#E2E8F0] bg-white hover:border-[#F5BFBF]'
                             }`}>
                          <span className="text-xl">{option.emoji}</span>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: 'var(--font-body)' }}>
                              {option.name}
                            </div>
                            <div className="text-xs text-[#94A3B8]" style={{ fontFamily: 'var(--font-body)' }}>
                              {option.desc}
                            </div>
                          </div>
                          <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center ${
                            isSelected ? 'border-[#BD1313] bg-[#BD1313]' : 'border-[#CBD5E1]'
                          }`}>
                            {isSelected && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                         style={{ fontFamily: 'var(--font-body)' }}>
                    Your College / University <span className="text-[10px] normal-case bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded-full ml-1">Optional</span>
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <input type="text" placeholder="e.g. VIT Vellore, IIT Delhi"
                           value={onboardingData.college}
                           onChange={(e) => setOnboardingData({ ...onboardingData, college: e.target.value })}
                           className="w-full h-12 pl-11 pr-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                           style={{ fontFamily: 'var(--font-body)' }} />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                         style={{ fontFamily: 'var(--font-body)' }}>
                    Current CGPA / Percentage <span className="text-[10px] normal-case bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded-full ml-1">Optional</span>
                  </label>
                  <div className="flex gap-2 mb-2">
                    <button 
                      onClick={() => setOnboardingData({ ...onboardingData, cgpaType: 'cgpa' })}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        onboardingData.cgpaType === 'cgpa' 
                          ? 'bg-[#BD1313] text-white' 
                          : 'bg-white border-[1.5px] border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]'
                      }`}
                      style={{ fontFamily: 'var(--font-body)' }}>
                      CGPA
                    </button>
                    <button 
                      onClick={() => setOnboardingData({ ...onboardingData, cgpaType: 'percentage' })}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        onboardingData.cgpaType === 'percentage' 
                          ? 'bg-[#BD1313] text-white' 
                          : 'bg-white border-[1.5px] border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]'
                      }`}
                      style={{ fontFamily: 'var(--font-body)' }}>
                      Percentage
                    </button>
                  </div>
                  <input type="text" 
                         placeholder={onboardingData.cgpaType === 'cgpa' ? 'e.g. 7.8' : 'e.g. 75%'}
                         value={onboardingData.cgpa}
                         onChange={(e) => setOnboardingData({ ...onboardingData, cgpa: e.target.value })}
                         className="w-full h-12 px-[14px] bg-white border-[1.5px] border-[#E2E8F0] rounded-lg text-base text-[#0F172A] focus:border-[#BD1313] focus:outline-none focus:ring-[3px] focus:ring-[rgba(189,19,19,0.1)] transition-all"
                         style={{ fontFamily: 'var(--font-body)' }} />
                </div>
              </div>
            </div>
            
            <div className="h-16 bg-white border-t border-[#E2E8F0] px-6 flex items-center justify-between flex-shrink-0">
              <button 
                onClick={() => navigateToScreen('onboarding-1')}
                className="w-[120px] h-11 bg-transparent border-[1.5px] border-[#F5BFBF] text-[#BD1313] rounded-xl hover:bg-[#FDF2F2] transition-all"
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}>
                ← Back
              </button>
              <button 
                onClick={() => navigateToScreen('onboarding-3')}
                className="w-40 h-11 bg-[#BD1313] text-white rounded-xl hover:bg-[#991010] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(189,19,19,0.35)] transition-all"
                style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700 }}>
                Continue →
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ONBOARDING STEP 3 - TIMELINE
  if (screen === 'onboarding-3') {
    const timelineOptions = [
      { emoji: '📅', title: 'In 1 Month', desc: 'Urgent prep needed', bg: '#FEF2F2' },
      { emoji: '📅', title: 'In 3 Months', desc: 'Focused preparation', bg: '#FFF1F2' },
      { emoji: '📅', title: 'In 6 Months', desc: 'Steady and thorough', bg: '#FFFBEB' },
      { emoji: '📅', title: 'In 1 Year', desc: 'Long-term planning', bg: '#F0FDF4' },
      { emoji: '📅', title: 'Already Applying', desc: 'Need help right now', bg: '#FEF2F2' },
      { emoji: '📅', title: 'Just Exploring', desc: 'No pressure yet', bg: '#EFF6FF' },
    ];

    const intensityOptions = [
      { emoji: '⚡', title: '15–30 mins', desc: 'Quick daily sessions' },
      { emoji: '🎯', title: '30–60 mins', desc: 'Balanced preparation' },
      { emoji: '🔥', title: '1–2 hours', desc: 'Intensive mode' },
    ];

    return (
      <>
        <ToastContainer />
        <SkipModal />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.12)] bg-white screen-enter">
            <OnboardingTopBar step={3} onBack={() => navigateToScreen('onboarding-2')} />
            <OnboardingProgress step={3} />
            
            <div className="flex-1 overflow-y-auto inner-scroll flex flex-col items-center px-6 pt-6 pb-6 max-w-[640px] mx-auto w-full">
              <img src="https://i.ibb.co/jkzHk39r/onboarding-step3-timeline.png" alt="" height="120"
                   className="mb-4 flex-shrink-0"
                   style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))' }} />
              
              <h2 className="text-center mb-2 flex-shrink-0" style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
                When do you want to be placement-ready? 📅
              </h2>
              <p className="text-center text-[#64748B] text-sm leading-relaxed mb-5 flex-shrink-0" style={{ fontFamily: 'var(--font-body)' }}>
                We'll build a daily plan to get you there on time.
              </p>
              
              <div className="w-full flex-shrink-0">
                <div className="mb-5">
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                         style={{ fontFamily: 'var(--font-body)' }}>Target Placement Date</label>
                  <div className="grid grid-cols-2 gap-[10px]">
                    {timelineOptions.map((option) => {
                      const isSelected = onboardingData.timeline === option.title;
                      return (
                        <div key={option.title}
                             onClick={() => setOnboardingData({ ...onboardingData, timeline: option.title })}
                             className={`relative h-16 rounded-[14px] px-4 py-3 flex items-center gap-3 cursor-pointer transition-all ${
                               isSelected ? 'border-2 border-[#BD1313] bg-[#FDF2F2]' : 'border-[1.5px] border-[#E2E8F0] bg-white hover:border-[#F5BFBF]'
                             }`}>
                          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0"
                               style={{ background: option.bg }}>
                            {option.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-[#0F172A] truncate" style={{ fontFamily: 'var(--font-body)' }}>
                              {option.title}
                            </div>
                            <div className="text-xs text-[#94A3B8]" style={{ fontFamily: 'var(--font-body)' }}>
                              {option.desc}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#BD1313] flex items-center justify-center"
                                 style={{ animation: 'badgePop 300ms ease-out' }}>
                              <Check size={12} color="white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2"
                         style={{ fontFamily: 'var(--font-body)' }}>How Much Time Can You Give Daily?</label>
                  <div className="grid grid-cols-3 gap-[10px]">
                    {intensityOptions.map((option) => {
                      const isSelected = onboardingData.intensity === option.title;
                      return (
                        <div key={option.title}
                             onClick={() => setOnboardingData({ ...onboardingData, intensity: option.title })}
                             className={`h-[72px] rounded-[14px] p-[14px] text-center cursor-pointer transition-all ${
                               isSelected ? 'border-2 border-[#BD1313] bg-[#FDF2F2]' : 'border-[1.5px] border-[#E2E8F0] bg-white hover:border-[#F5BFBF]'
                             }`}>
                          <div className="text-2xl mb-[6px]">{option.emoji}</div>
                          <div className="text-[13px] font-semibold text-[#0F172A] mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                            {option.title}
                          </div>
                          <div className="text-[11px] text-[#94A3B8]" style={{ fontFamily: 'var(--font-body)' }}>
                            {option.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-16 bg-white border-t border-[#E2E8F0] px-6 flex items-center justify-between flex-shrink-0">
              <button 
                onClick={() => navigateToScreen('onboarding-2')}
                className="w-[120px] h-11 bg-transparent border-[1.5px] border-[#F5BFBF] text-[#BD1313] rounded-xl hover:bg-[#FDF2F2] transition-all"
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}>
                ← Back
              </button>
              <button 
                disabled={!onboardingData.timeline}
                onClick={() => navigateToScreen('onboarding-4')}
                className={`w-40 h-11 rounded-xl transition-all ${
                  onboardingData.timeline 
                    ? 'bg-[#BD1313] text-white hover:bg-[#991010] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(189,19,19,0.35)]' 
                    : 'bg-[#F5BFBF] text-[rgba(189,19,19,0.5)] cursor-not-allowed'
                }`}
                style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700 }}>
                Continue →
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ONBOARDING STEP 4 - MODULES
  if (screen === 'onboarding-4') {
    const modules = [
      { id: 'resume', emoji: '📄', name: 'Resume Builder', benefit: 'Stand out to recruiters', bg: '#FFF1F2', color: '#BD1313' },
      { id: 'tests', emoji: '📝', name: 'Test Preparation', benefit: 'Boost your aptitude scores', bg: '#FFFBEB', color: '#D97706' },
      { id: 'interview', emoji: '🎤', name: 'AI Interview', benefit: 'Practice without pressure', bg: '#F0FDF4', color: '#16A34A' },
      { id: 'skills', emoji: '📈', name: 'Skill Tracker', benefit: 'Know your strengths', bg: '#EFF6FF', color: '#2563EB' },
      { id: 'experts', emoji: '👥', name: 'Expert Network', benefit: 'Learn from the best', bg: '#FAF5FF', color: '#7C3AED' },
    ];

    const toggleModule = (moduleId: string) => {
      if (onboardingData.selectedModules.includes(moduleId)) {
        setOnboardingData({
          ...onboardingData,
          selectedModules: onboardingData.selectedModules.filter(m => m !== moduleId)
        });
      } else {
        setOnboardingData({
          ...onboardingData,
          selectedModules: [...onboardingData.selectedModules, moduleId]
        });
      }
    };

    const selectAll = () => {
      setOnboardingData({
        ...onboardingData,
        selectedModules: modules.map(m => m.id)
      });
    };

    return (
      <>
        <ToastContainer />
        <SkipModal />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.12)] bg-white screen-enter">
            <OnboardingTopBar step={4} onBack={() => navigateToScreen('onboarding-3')} />
            <OnboardingProgress step={4} />
            
            <div className="flex-1 overflow-y-auto inner-scroll flex flex-col items-center px-6 pt-6 pb-6 max-w-[640px] mx-auto w-full">
              <img src="https://i.ibb.co/8DCgjK5K/onboarding-step4-modules.png" alt="" height="120"
                   className="mb-4 flex-shrink-0"
                   style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))' }} />
              
              <h2 className="text-center mb-2 flex-shrink-0" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: '#0F172A' }}>
                What do you want to work on? 🚀
              </h2>
              <p className="text-center text-[#64748B] text-sm leading-relaxed mb-5 flex-shrink-0" style={{ fontFamily: 'var(--font-body)' }}>
                Select all that apply — you can always change<br />this later in Settings.
              </p>
              
              <div className="w-full mb-3 text-right flex-shrink-0">
                <button onClick={selectAll} className="text-[#BD1313] text-[13px] font-medium hover:underline"
                        style={{ fontFamily: 'var(--font-body)' }}>
                  Select all
                </button>
              </div>
              
              <div className="w-full flex flex-col gap-[10px] flex-shrink-0 mb-4">
                {modules.map((module) => {
                  const isSelected = onboardingData.selectedModules.includes(module.id);
                  return (
                    <div key={module.id}
                         onClick={() => toggleModule(module.id)}
                         className={`h-[72px] rounded-[14px] px-4 flex items-center gap-[14px] cursor-pointer transition-all ${
                           isSelected 
                             ? 'border-2 border-[#BD1313] border-l-[3px] bg-[rgba(189,19,19,0.02)]' 
                             : 'border-[1.5px] border-[#E2E8F0] bg-white hover:border-[#F5BFBF]'
                         }`}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[22px] flex-shrink-0"
                           style={{ background: module.bg }}>
                        {module.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: 'var(--font-body)' }}>
                          {module.name}
                        </div>
                        <div className="text-xs text-[#94A3B8]" style={{ fontFamily: 'var(--font-body)' }}>
                          {module.benefit}
                        </div>
                      </div>
                      <div className={`w-[22px] h-[22px] rounded-md border-[1.5px] flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-[#BD1313] border-[#BD1313]' 
                          : 'bg-white border-[#CBD5E1]'
                      }`}
                           style={isSelected ? { animation: 'pulse 200ms' } : {}}>
                        {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="h-16 bg-white border-t border-[#E2E8F0] px-6 flex items-center justify-between flex-shrink-0">
              <button 
                onClick={() => navigateToScreen('onboarding-3')}
                className="w-[120px] h-11 bg-transparent border-[1.5px] border-[#F5BFBF] text-[#BD1313] rounded-xl hover:bg-[#FDF2F2] transition-all"
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}>
                ← Back
              </button>
              <button 
                onClick={() => {
                  showToast("Setting up your plan... ✨", 'info');
                  setTimeout(() => navigateToScreen('plan-ready'), 300);
                }}
                className="w-auto px-6 h-11 bg-[#BD1313] text-white rounded-xl hover:bg-[#991010] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(189,19,19,0.35)] transition-all"
                style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700 }}>
                Set Up My Dashboard →
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // PLAN READY SCREEN
  if (screen === 'plan-ready') {
    const getModuleName = (id: string) => {
      const names: Record<string, string> = {
        resume: 'Resume Builder',
        tests: 'Test Preparation',
        interview: 'AI Interview',
        skills: 'Skill Tracker',
        experts: 'Expert Network'
      };
      return names[id] || id;
    };

    return (
      <>
        <ToastContainer />
        <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex shadow-[0_25px_80px_rgba(0,0,0,0.12)] bg-white screen-enter">
            <div className="flex-1 overflow-y-auto inner-scroll flex flex-col items-center px-6 py-10 max-w-[560px] mx-auto text-center">
              <img src="https://i.ibb.co/B5Z6kkw3/onboarding-ready.png" alt="" height="200"
                   className="mb-2 flex-shrink-0"
                   style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.15))' }} />
              
              <div className="w-[72px] h-[72px] rounded-full mx-auto mb-5 flex items-center justify-center border-2 border-[#86EFAC] shadow-[0_0_0_12px_rgba(22,163,74,0.08)] flex-shrink-0"
                   style={{ 
                     background: 'linear-gradient(135deg, #DCFCE7, #BBF7D0)',
                     animation: 'scaleSpring 600ms ease-out 200ms both'
                   }}>
                <CheckCircle size={32} color="#16A34A" />
              </div>
              
              <style>{`
                @keyframes scaleSpring {
                  0% { transform: scale(0.8); opacity: 0; }
                  60% { transform: scale(1.08); opacity: 1; }
                  80% { transform: scale(0.96); }
                  100% { transform: scale(1); }
                }
              `}</style>
              
              <h2 className="mb-2 flex-shrink-0" 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '28px', 
                    fontWeight: 800, 
                    color: '#0F172A',
                    animation: 'fadeUp 300ms ease-out 600ms both'
                  }}>
                Your personalized plan is ready! 🎉
              </h2>
              
              <p className="text-[#64748B] text-[15px] leading-relaxed mb-7 flex-shrink-0" 
                 style={{ 
                   fontFamily: 'var(--font-body)',
                   animation: 'fadeUp 300ms ease-out 700ms both'
                 }}>
                We've set everything up based on your goals.<br />Let's get started!
              </p>
              
              <div className="w-full max-w-[440px] bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] mb-5 flex-shrink-0"
                   style={{ animation: 'fadeUp 300ms ease-out 800ms both' }}>
                <div className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-[14px]"
                     style={{ fontFamily: 'var(--font-body)' }}>
                  Your Plan
                </div>
                
                <div className="space-y-3">
                  <div className="h-10 flex items-center gap-[10px] border-b border-[#F8FAFF]">
                    <span className="text-lg">🎯</span>
                    <span className="text-sm text-[#64748B]" style={{ fontFamily: 'var(--font-body)' }}>Target Role</span>
                    <span className="ml-auto bg-[#FDF2F2] text-[#BD1313] border border-[#F5BFBF] text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ fontFamily: 'var(--font-body)' }}>
                      {onboardingData.targetRole || 'Software Engineer'}
                    </span>
                  </div>
                  
                  <div className="h-10 flex items-center gap-[10px] border-b border-[#F8FAFF]">
                    <span className="text-lg">📅</span>
                    <span className="text-sm text-[#64748B]" style={{ fontFamily: 'var(--font-body)' }}>Ready By</span>
                    <span className="ml-auto bg-[#F1F5F9] text-[#475569] text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ fontFamily: 'var(--font-body)' }}>
                      {onboardingData.timeline || 'In 3 Months'}
                    </span>
                  </div>
                  
                  <div className="h-10 flex items-center gap-[10px] border-b border-[#F8FAFF]">
                    <span className="text-lg">⚡</span>
                    <span className="text-sm text-[#64748B]" style={{ fontFamily: 'var(--font-body)' }}>Daily Goal</span>
                    <span className="ml-auto bg-[#FEF3C7] text-[#D97706] border border-[#FCD34D] text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ fontFamily: 'var(--font-body)' }}>
                      {onboardingData.intensity || '30–60 mins'}
                    </span>
                  </div>
                  
                  <div className="h-10 flex items-center gap-[10px]">
                    <span className="text-lg">🎓</span>
                    <span className="text-sm text-[#64748B]" style={{ fontFamily: 'var(--font-body)' }}>College</span>
                    <span className="ml-auto text-sm text-[#64748B]" style={{ fontFamily: 'var(--font-body)' }}>
                      {onboardingData.college || 'VIT Vellore'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-[14px] pt-[14px] border-t border-[#E2E8F0]">
                  <div className="text-[11px] text-[#94A3B8] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    Active Modules:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {onboardingData.selectedModules.map(moduleId => (
                      <span key={moduleId} 
                            className="bg-[#FDF2F2] text-[#BD1313] border border-[#F5BFBF] text-xs font-semibold px-3 py-1 rounded-full"
                            style={{ fontFamily: 'var(--font-body)' }}>
                        {getModuleName(moduleId)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="w-full max-w-[440px] mb-7 flex-shrink-0"
                   style={{ animation: 'fadeUp 300ms ease-out 1000ms both' }}>
                <div className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-[10px] text-left"
                     style={{ fontFamily: 'var(--font-body)' }}>
                  Here's what we suggest first:
                </div>
                <div className="text-left space-y-2">
                  <div className="h-11 flex items-center gap-[10px] border-b border-[#F8FAFF]">
                    <span className="text-[#BD1313]">→</span>
                    <span className="text-[13px] text-[#475569]" style={{ fontFamily: 'var(--font-body)' }}>
                      Complete your resume — takes ~10 mins
                    </span>
                  </div>
                  <div className="h-11 flex items-center gap-[10px] border-b border-[#F8FAFF]">
                    <span className="text-[#BD1313]">→</span>
                    <span className="text-[13px] text-[#475569]" style={{ fontFamily: 'var(--font-body)' }}>
                      Take a diagnostic test — see where you stand
                    </span>
                  </div>
                  <div className="h-11 flex items-center gap-[10px]">
                    <span className="text-[#BD1313]">→</span>
                    <span className="text-[13px] text-[#475569]" style={{ fontFamily: 'var(--font-body)' }}>
                      Set up your skill profile
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  showToast("Welcome to EduVision! 🎉");
                  setTimeout(() => navigateToScreen('dashboard', 'dashboard'), 500);
                }}
                className="w-full max-w-[440px] h-[52px] bg-[#BD1313] text-white rounded-xl hover:bg-[#991010] hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(189,19,19,0.35)] active:scale-[0.97] transition-all flex-shrink-0"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: '16px', 
                  fontWeight: 700,
                  animation: 'fadeUp 300ms ease-out 1200ms both'
                }}>
                Go to My Dashboard →
              </button>
              
              <p className="text-[#94A3B8] text-xs mt-4 mb-6 flex-shrink-0" style={{ fontFamily: 'var(--font-body)' }}>
                You can update these preferences anytime in Settings
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // APP SHELL (Dashboard and other screens)

  // Settings Screen
  const SettingsScreen = () => {
    const [moduleToggles, setModuleToggles] = useState({
      'Resume Builder': true,
      'Test Preparation': true,
      'AI Interview': true,
      'Skill Tracker': true,
      'Expert Network': true
    });

    const settingsTabs = [
      {id:'account', label:'Account', desc:'Profile & personal info'},
      {id:'notifications', label:'Notifications', desc:'Alerts & reminders'},
      {id:'appearance', label:'Appearance', desc:'Theme & display'},
      {id:'privacy', label:'Privacy', desc:'Data & visibility'},
      {id:'modules', label:'Modules', desc:'Active modules'},
      {id:'credits', label:'Credits & Billing', desc:'Manage credits & payments'}
    ];

    const modules = [
      {name:'Resume Builder', desc:'Build and improve your resume', icon:'https://img.icons8.com/3d-fluency/100/resume.png', color:'#BD1313', bg:'#FFF1F2'},
      {name:'Test Preparation', desc:'Practice mock tests with AI', icon:'https://img.icons8.com/3d-fluency/100/bookmark-book.png', color:'#D97706', bg:'#FFFBEB'},
      {name:'AI Interview', desc:'Practice interviews with Aria', icon:'https://img.icons8.com/3d-fluency/100/microphone.png', color:'#16A34A', bg:'#F0FDF4'},
      {name:'Skill Tracker', desc:'Track skills and certifications', icon:'https://img.icons8.com/3d-fluency/100/bar-chart.png', color:'#2563EB', bg:'#EFF6FF'},
      {name:'Expert Network', desc:'Connect with industry mentors', icon:'https://img.icons8.com/3d-fluency/100/conference-call.png', color:'#7C3AED', bg:'#FAF5FF'}
    ];

    return (
      <div style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden', animation:'screenEnter 280ms ease-out both'}}>
        {/* Header */}
        <div style={{background:'white', borderBottom:'1px solid #E2E8F0', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:56, flexShrink:0}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <div style={{width:36, height:36, background:'#FDF2F2', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Settings size={20} color="#BD1313" />
            </div>
            <div>
              <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'#0F172A'}}>Settings ⚙️</div>
              <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>Manage your account and preferences</div>
            </div>
          </div>
          <button
            onClick={() => setTimeout(() => showToast("Settings saved ✓"), 0)}
            style={{background:'#BD1313', color:'white', border:'none', borderRadius:8, height:36, padding:'0 16px', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, cursor:'pointer'}}>
            Save Changes
          </button>
        </div>

        {/* Body */}
        <div style={{flex:1, display:'grid', gridTemplateColumns:'220px 1fr', overflow:'hidden'}}>
          {/* Left Nav */}
          <div style={{background:'#FAFAFA', borderRight:'1px solid #E2E8F0', overflowY:'auto', padding:'16px 12px'}}>
            {settingsTabs.map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveSettingsTab(tab.id)}
                style={{borderRadius:12, padding:'10px 12px', marginBottom:4, cursor:'pointer', display:'flex', alignItems:'center', gap:10, background:activeSettingsTab===tab.id?'white':'transparent', boxShadow:activeSettingsTab===tab.id?'0 2px 8px rgba(0,0,0,0.06)':'none', transition:'all 0.2s'}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:activeSettingsTab===tab.id?'#BD1313':'#0F172A'}}>{tab.label}</div>
                  <div style={{fontFamily:'var(--font-body)', fontSize:10, color:'#94A3B8'}}>{tab.desc}</div>
                </div>
              </div>
            ))}
            <div style={{height:1, background:'#E2E8F0', margin:'8px 0'}}/>
            <div onClick={() => navigateToScreen('help')} style={{borderRadius:12, padding:'10px 12px', marginBottom:4, cursor:'pointer', display:'flex', alignItems:'center', gap:10, transition:'all 0.2s'}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'#0F172A'}}>Help & Support</div>
                <div style={{fontFamily:'var(--font-body)', fontSize:10, color:'#94A3B8'}}>FAQs & contact</div>
              </div>
            </div>
            <div onClick={() => setShowLogoutModal(true)} style={{borderRadius:12, padding:'10px 12px', cursor:'pointer', display:'flex', alignItems:'center', gap:10, transition:'all 0.2s'}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'#DC2626'}}>Logout</div>
                <div style={{fontFamily:'var(--font-body)', fontSize:10, color:'#94A3B8'}}>Sign out of account</div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div style={{flex:1, overflowY:'auto', padding:'24px'}}>
            {activeSettingsTab === 'account' && (
              <>
                {/* Profile Card */}
                <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:20, padding:24, marginBottom:16}}>
                  <div style={{display:'flex', gap:16, alignItems:'center', marginBottom:20}}>
                    <div style={{width:72, height:72, background:'linear-gradient(135deg,#BD1313,#7A0D0D)', color:'white', borderRadius:'50%', border:'3px solid white', boxShadow:'0 4px 16px rgba(189,19,19,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:24, fontWeight:800}}>
                      RS
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'#0F172A'}}>Rahul Sharma</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:13, color:'#94A3B8'}}>rahul@vit.edu</div>
                      <div style={{background:'#FEF3C7', color:'#D97706', border:'1px solid #FCD34D', fontFamily:'var(--font-body)', fontSize:12, fontWeight:700, borderRadius:9999, padding:'4px 12px', display:'inline-block', marginTop:6}}>
                        🔥 Hustler · 2,400 XP
                      </div>
                      <div onClick={() => setTimeout(() => showToast("Photo upload coming soon!"), 0)} style={{fontFamily:'var(--font-body)', fontSize:12, color:'#BD1313', fontWeight:500, cursor:'pointer', display:'block', marginTop:6}}>
                        Change Photo →
                      </div>
                    </div>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
                    {['FULL NAME','EMAIL ADDRESS','PHONE NUMBER','COLLEGE','YEAR OF STUDY','TARGET ROLE'].map((label, i) => {
                      const values = ['Rahul Sharma','rahul@vit.edu','+91 98765 43210','VIT Vellore','Final Year','Software Engineer'];
                      return (
                        <div key={label}>
                          <div style={{fontFamily:'var(--font-body)', fontSize:10, textTransform:'uppercase', color:'#94A3B8', marginBottom:4}}>{label}</div>
                          <input
                            defaultValue={values[i]}
                            style={{height:44, width:'100%', padding:'0 12px', border:'1.5px solid #E2E8F0', borderRadius:8, fontFamily:'var(--font-body)', fontSize:14, color:'#0F172A', outline:'none', boxSizing:'border-box'}}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* XP Card */}
                <div style={{background:'#FFFBEB', border:'1px solid #FCD34D', borderRadius:20, padding:20, marginBottom:16}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:10, textTransform:'uppercase', color:'#D97706', marginBottom:4}}>⚡ XP & LEVEL</div>
                      <div style={{fontFamily:'var(--font-display)', fontSize:26, fontWeight:800, color:'#D97706'}}>2,400</div>
                    </div>
                    <img src="https://img.icons8.com/3d-fluency/100/medal.png" width={40} height={40} style={{background:'transparent'}} />
                  </div>
                  <div style={{background:'#D97706', color:'white', fontFamily:'var(--font-body)', fontSize:12, fontWeight:700, borderRadius:9999, padding:'3px 14px', display:'inline-block', marginTop:8}}>
                    🔥 Hustler · Level 3
                  </div>
                  <div style={{marginTop:10}}>
                    <div style={{fontFamily:'var(--font-body)', fontSize:11, color:'#B45309', marginBottom:5}}>600 XP to Elite</div>
                    <div style={{height:6, background:'rgba(217,119,6,0.2)', borderRadius:9999, overflow:'hidden'}}>
                      <div style={{height:'100%', background:'#D97706', width:'80%', borderRadius:9999}}/>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div style={{background:'#FFF1F2', border:'1px solid #FECACA', borderRadius:20, padding:20}}>
                  <div style={{fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, color:'#DC2626', marginBottom:12}}>⚠️ Danger Zone</div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:12, borderBottom:'1px solid #FEF2F2'}}>
                    <div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, color:'#0F172A'}}>Reset Progress</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>Clears all test history and XP</div>
                    </div>
                    <button onClick={() => setTimeout(() => showToast("Are you sure? This cannot be undone!"), 0)} style={{background:'white', border:'1.5px solid #FECACA', color:'#DC2626', fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, borderRadius:8, padding:'6px 14px', cursor:'pointer'}}>
                      Reset
                    </button>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:12}}>
                    <div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, color:'#0F172A'}}>Delete Account</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>Permanently delete account</div>
                    </div>
                    <button onClick={() => setTimeout(() => showToast("Contact support to delete account"), 0)} style={{background:'white', border:'1.5px solid #FECACA', color:'#DC2626', fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, borderRadius:8, padding:'6px 14px', cursor:'pointer'}}>
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeSettingsTab === 'notifications' && (
              <>
                <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#0F172A', marginBottom:16}}>Notification Preferences</div>
                <div style={{fontFamily:'var(--font-body)', fontSize:10, textTransform:'uppercase', color:'#94A3B8', marginBottom:8}}>LEARNING REMINDERS</div>
                <SettingsRow title="Test Reminders" subtitle="Daily practice reminders">
                  <ToggleSwitch value={settingsData.notifications.testReminders} onChange={() => toggleSetting('notifications','testReminders')} />
                </SettingsRow>
                <SettingsRow title="Daily Goal Alerts" subtitle="Goals and achievement alerts">
                  <ToggleSwitch value={settingsData.notifications.dailyGoal} onChange={() => toggleSetting('notifications','dailyGoal')} />
                </SettingsRow>
                <SettingsRow title="Streak Alerts" subtitle="Streak milestone celebrations">
                  <ToggleSwitch value={settingsData.notifications.streakAlerts} onChange={() => toggleSetting('notifications','streakAlerts')} />
                </SettingsRow>
                <div style={{fontFamily:'var(--font-body)', fontSize:10, textTransform:'uppercase', color:'#94A3B8', marginTop:16, marginBottom:8}}>ACHIEVEMENTS & PROGRESS</div>
                <SettingsRow title="Badge Alerts" subtitle="When you unlock new badges">
                  <ToggleSwitch value={settingsData.notifications.badgeAlerts} onChange={() => toggleSetting('notifications','badgeAlerts')} />
                </SettingsRow>
                <SettingsRow title="Weekly Report" subtitle="Weekly performance summary">
                  <ToggleSwitch value={settingsData.notifications.weeklyReport} onChange={() => toggleSetting('notifications','weeklyReport')} />
                </SettingsRow>
                <SettingsRow title="Expert Updates" subtitle="New expert sessions available">
                  <ToggleSwitch value={settingsData.notifications.expertUpdates} onChange={() => toggleSetting('notifications','expertUpdates')} />
                </SettingsRow>
              </>
            )}

            {activeSettingsTab === 'appearance' && (
              <>
                <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#0F172A', marginBottom:16}}>Display Preferences</div>
                <div style={{background:settingsData.appearance.darkMode?'#1E293B':'white', border:settingsData.appearance.darkMode?'1px solid #334155':'1px solid #E2E8F0', borderRadius:16, padding:20, marginBottom:12, display:'flex', alignItems:'center', gap:16, transition:'all 0.3s'}}>
                  <img src="https://img.icons8.com/3d-fluency/100/crescent-moon.png" width={40} height={40} style={{flexShrink:0, filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'}} />
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:settingsData.appearance.darkMode?'white':'#0F172A'}}>Dark Mode</div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:13, color:settingsData.appearance.darkMode?'#94A3B8':'#64748B'}}>Switch between light and dark theme</div>
                  </div>
                  <ToggleSwitch
                    value={settingsData.appearance.darkMode}
                    onChange={() => {
                      toggleSetting('appearance','darkMode');
                      setTimeout(() => showToast(settingsData.appearance.darkMode ? "Light mode enabled ☀️" : "Dark mode enabled 🌙"), 0);
                    }}
                  />
                </div>
                <SettingsRow title="Compact View" subtitle="Reduce spacing in lists and cards">
                  <ToggleSwitch value={settingsData.appearance.compactView} onChange={() => toggleSetting('appearance','compactView')} />
                </SettingsRow>
                <SettingsRow title="Animations" subtitle="Enable smooth transitions and effects">
                  <ToggleSwitch value={settingsData.appearance.animations} onChange={() => toggleSetting('appearance','animations')} />
                </SettingsRow>
                <div style={{marginTop:16}}>
                  <div style={{fontFamily:'var(--font-body)', fontSize:10, textTransform:'uppercase', color:'#94A3B8', marginBottom:8}}>TEXT SIZE</div>
                  <div style={{display:'flex', gap:8}}>
                    {['Small','Medium','Large'].map(size => (
                      <button
                        key={size}
                        onClick={() => setSettingsData({...settingsData, appearance:{...settingsData.appearance, fontSize:size.toLowerCase()}})}
                        style={{height:36, padding:'0 20px', borderRadius:9999, border:'none', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, background:settingsData.appearance.fontSize===size.toLowerCase()?'#BD1313':'#F1F5F9', color:settingsData.appearance.fontSize===size.toLowerCase()?'white':'#475569', transition:'all 0.2s'}}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeSettingsTab === 'privacy' && (
              <>
                <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#0F172A', marginBottom:16}}>Privacy Settings</div>
                <SettingsRow title="Show on Leaderboard" subtitle="Let others see your rank">
                  <ToggleSwitch value={settingsData.privacy.showOnLeaderboard} onChange={() => toggleSetting('privacy','showOnLeaderboard')} />
                </SettingsRow>
                <SettingsRow title="Share Progress" subtitle="Share achievements publicly">
                  <ToggleSwitch value={settingsData.privacy.shareProgress} onChange={() => toggleSetting('privacy','shareProgress')} />
                </SettingsRow>
                <SettingsRow title="Public Profile" subtitle="Anyone can view your profile">
                  <ToggleSwitch value={settingsData.privacy.publicProfile} onChange={() => toggleSetting('privacy','publicProfile')} />
                </SettingsRow>
                <div style={{fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, marginTop:20, marginBottom:12}}>Your Data</div>
                <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:12, height:52, padding:'0 16px', marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:600}}>Download My Data</div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>Get a copy of all your data</div>
                  </div>
                  <button onClick={() => setTimeout(() => showToast("Data export requested 📥"), 0)} style={{background:'transparent', border:'none', color:'#BD1313', fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, cursor:'pointer'}}>
                    Download →
                  </button>
                </div>
                <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:12, height:52, padding:'0 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:600}}>Clear Cache</div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>Free up space</div>
                  </div>
                  <button onClick={() => setTimeout(() => showToast("Cache cleared ✓"), 0)} style={{background:'transparent', border:'none', color:'#D97706', fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, cursor:'pointer'}}>
                    Clear →
                  </button>
                </div>
              </>
            )}

            {activeSettingsTab === 'modules' && (
              <>
                <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, marginBottom:4}}>Active Modules</div>
                <div style={{fontFamily:'var(--font-body)', fontSize:13, color:'#94A3B8', marginBottom:16}}>Toggle which modules appear in your sidebar</div>
                {modules.map(mod => (
                  <div key={mod.name} style={{background:'white', border:'1px solid #E2E8F0', borderRadius:14, padding:'0 16px', height:72, display:'flex', alignItems:'center', gap:14, marginBottom:8}}>
                    <div style={{width:40, height:40, borderRadius:12, background:mod.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                      <img src={mod.icon} width={22} height={22} style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}} />
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, color:'#0F172A'}}>{mod.name}</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>{mod.desc}</div>
                    </div>
                    <ToggleSwitch
                      value={moduleToggles[mod.name]}
                      onChange={() => setModuleToggles(prev => ({...prev, [mod.name]:!prev[mod.name]}))}
                    />
                  </div>
                ))}
              </>
            )}

            {activeSettingsTab === 'credits' && (
              <>
                <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, marginBottom:4}}>Credits & Billing</div>
                <div style={{fontFamily:'var(--font-body)', fontSize:13, color:'#94A3B8', marginBottom:16}}>Manage your credits, billing, and purchase history</div>

                <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:14, padding:20, marginBottom:12}}>
                  <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:16}}>
                    <div style={{width:48, height:48, borderRadius:12, background:'linear-gradient(135deg, #FDF2F2, #F5BFBF)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <CreditCard size={24} color="#BD1313" />
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, color:'#0F172A'}}>Credits & Billing Dashboard</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>View wallet, buy credits, and manage payments</div>
                    </div>
                  </div>

                  <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16}}>
                    <div style={{background:'#FFF1F2', border:'1px solid #F5BFBF', borderRadius:10, padding:12, textAlign:'center'}}>
                      <div style={{fontFamily:'Syne', fontSize:24, fontWeight:800, color:'#BD1313'}}>{wallet.resume}</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:11, color:'#94A3B8'}}>Resume</div>
                    </div>
                    <div style={{background:'#FFFBEB', border:'1px solid #FCD34D', borderRadius:10, padding:12, textAlign:'center'}}>
                      <div style={{fontFamily:'Syne', fontSize:24, fontWeight:800, color:'#D97706'}}>{wallet.tests}</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:11, color:'#94A3B8'}}>Tests</div>
                    </div>
                    <div style={{background:'#F0FDF4', border:'1px solid #86EFAC', borderRadius:10, padding:12, textAlign:'center'}}>
                      <div style={{fontFamily:'Syne', fontSize:24, fontWeight:800, color:'#16A34A'}}>{wallet.interview}</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:11, color:'#94A3B8'}}>Interview</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setScreen('credits')}
                    style={{
                      width:'100%', height:44,
                      background:'#BD1313', color:'white',
                      border:'none', borderRadius:12,
                      fontFamily:'Syne', fontSize:14, fontWeight:700,
                      cursor:'pointer'
                    }}>
                    Go to Credits & Billing →
                  </button>
                </div>

                <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:14, padding:'0 16px', height:64, display:'flex', alignItems:'center', gap:14}}>
                  <div style={{width:36, height:36, borderRadius:10, background:'#FFFBEB', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    💳
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:600}}>Payment Method</div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>Razorpay (Secure SSL)</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Help & Support Screen
  const HelpScreen = () => {
    const quickLinks = [
      {icon:'📝', label:'How to take a test', faqId:'faq-1'},
      {icon:'📄', label:'Build my resume', faqId:'faq-3'},
      {icon:'🎤', label:'AI Interview tips', faqId:'faq-5'},
      {icon:'💬', label:'Contact support', tab:'contact'}
    ];

    const filteredFaqs = faqs.filter(f => {
      const matchCat = faqFilter==='All' || f.category===faqFilter;
      const matchSearch = searchQuery==='' || f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    return (
      <div style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden', animation:'screenEnter 280ms ease-out both'}}>
        {/* Header */}
        <div style={{background:'white', borderBottom:'1px solid #E2E8F0', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:56}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <div style={{width:36, height:36, background:'#FDF2F2', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <HelpCircle size={20} color="#BD1313" />
            </div>
            <div>
              <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'#0F172A'}}>Help & Support 💬</div>
              <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>We are here to help you succeed</div>
            </div>
          </div>
          <button onClick={() => navigateToScreen('settings')} style={{background:'transparent', border:'none', fontFamily:'var(--font-body)', fontSize:13, color:'#94A3B8', fontWeight:500, cursor:'pointer'}}>
            ← Settings
          </button>
        </div>

        {/* Content */}
        <div style={{flex:1, overflowY:'auto', padding:'20px 24px'}}>
          <div style={{maxWidth:800, margin:'0 auto', width:'100%'}}>
            {/* Search Bar */}
            <div style={{background:'white', border:'1.5px solid #E2E8F0', borderRadius:14, padding:'14px 16px', display:'flex', alignItems:'center', gap:12, marginBottom:20, boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
              <Search size={20} color="#94A3B8" style={{flexShrink:0}} />
              <input
                type="text"
                placeholder="Search help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{flex:1, border:'none', outline:'none', fontFamily:'var(--font-body)', fontSize:15, color:'#0F172A'}}
              />
              {searchQuery && (
                <X size={18} color="#94A3B8" style={{cursor:'pointer'}} onClick={() => setSearchQuery('')} />
              )}
            </div>

            {/* Quick Links */}
            <div style={{fontFamily:'var(--font-display)', fontSize:14, fontWeight:700, marginBottom:10}}>Quick Help 🚀</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20}}>
              {quickLinks.map(link => (
                <div
                  key={link.label}
                  onClick={() => {
                    if (link.faqId) {
                      setExpandedFaq(link.faqId);
                      setActiveHelpTab('faq');
                    } else {
                      setActiveHelpTab('contact');
                    }
                  }}
                  style={{background:'white', border:'1px solid #E2E8F0', borderRadius:14, padding:12, textAlign:'center', cursor:'pointer', height:72, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', transition:'all 0.2s'}}
                  onMouseEnter={(e) => {e.currentTarget.style.border='1px solid #BD1313'; e.currentTarget.style.background='#FFF8F8';}}
                  onMouseLeave={(e) => {e.currentTarget.style.border='1px solid #E2E8F0'; e.currentTarget.style.background='white';}}>
                  <div style={{fontSize:24, marginBottom:6}}>{link.icon}</div>
                  <div style={{fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, color:'#0F172A'}}>{link.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{display:'flex', borderBottom:'1px solid #E2E8F0', marginBottom:16}}>
              {[{id:'faq',label:'FAQs'},{id:'contact',label:'Contact Us'},{id:'about',label:'About'}].map(tab => (
                <div
                  key={tab.id}
                  onClick={() => setActiveHelpTab(tab.id)}
                  style={{height:44, padding:'0 20px', display:'flex', alignItems:'center', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:14, fontWeight:500, color:activeHelpTab===tab.id?'#BD1313':'#94A3B8', borderBottom:activeHelpTab===tab.id?'2px solid #BD1313':'2px solid transparent', transition:'all 0.2s'}}>
                  {tab.label}
                </div>
              ))}
            </div>

            {/* FAQ Tab */}
            {activeHelpTab === 'faq' && (
              <>
                <div style={{display:'flex', gap:8, marginBottom:14, flexWrap:'wrap'}}>
                  {['All','Tests','Resume','Interview','XP','Account'].map(cat => (
                    <div
                      key={cat}
                      onClick={() => setFaqFilter(cat)}
                      style={{height:32, padding:'0 14px', borderRadius:9999, cursor:'pointer', display:'flex', alignItems:'center', fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, background:faqFilter===cat?'#BD1313':'#F1F5F9', color:faqFilter===cat?'white':'#475569', transition:'all 0.2s'}}>
                      {cat}
                    </div>
                  ))}
                </div>
                {filteredFaqs.length === 0 ? (
                  <div style={{textAlign:'center', padding:'40px 20px'}}>
                    <div style={{fontFamily:'var(--font-display)', fontSize:18, color:'#94A3B8'}}>No results found 🔍</div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:14, color:'#94A3B8', marginTop:4}}>Try a different search term</div>
                  </div>
                ) : filteredFaqs.map(faq => (
                  <div key={faq.id} style={{background:'white', border:'1px solid', borderColor:expandedFaq===faq.id?'#BD1313':'#E2E8F0', borderRadius:14, marginBottom:8, overflow:'hidden', transition:'all 0.2s'}}>
                    <div
                      onClick={() => setExpandedFaq(expandedFaq===faq.id?null:faq.id)}
                      style={{height:56, padding:'0 18px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
                      <div style={{display:'flex', alignItems:'center', flex:1}}>
                        <div style={{background:'#FDF2F2', color:'#BD1313', border:'1px solid #F5BFBF', fontFamily:'var(--font-body)', fontSize:10, fontWeight:700, borderRadius:9999, padding:'2px 8px', marginRight:10}}>
                          {faq.category}
                        </div>
                        <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, color:expandedFaq===faq.id?'#BD1313':'#0F172A'}}>
                          {faq.q}
                        </div>
                      </div>
                      <ChevronDown size={18} color="#94A3B8" style={{transform:expandedFaq===faq.id?'rotate(180deg)':'rotate(0deg)', transition:'transform 200ms'}} />
                    </div>
                    {expandedFaq === faq.id && (
                      <div style={{padding:'0 18px 16px', borderTop:'1px solid #F8FAFF', fontFamily:'var(--font-body)', fontSize:14, color:'#475569', lineHeight:1.7, animation:'fadeUp 200ms ease-out'}}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* Contact Tab */}
            {activeHelpTab === 'contact' && (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                {/* Left - Contact Form */}
                <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:20, padding:24}}>
                  <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, marginBottom:16}}>Send us a message</div>
                  {ticketSubmitted ? (
                    <div style={{textAlign:'center', padding:'20px 0'}}>
                      <CheckCircle size={48} color="#16A34A" style={{display:'block', margin:'0 auto'}} />
                      <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'#16A34A', marginTop:12}}>Message sent! ✓</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:14, color:'#64748B', marginTop:6}}>We will get back to you within 24 hours.</div>
                      <div onClick={() => setTicketSubmitted(false)} style={{fontFamily:'var(--font-body)', fontSize:13, color:'#BD1313', fontWeight:500, cursor:'pointer', marginTop:16, display:'block'}}>
                        Send Another
                      </div>
                    </div>
                  ) : (
                    <>
                      <select style={{height:48, marginBottom:12, width:'100%', border:'1.5px solid #E2E8F0', borderRadius:8, fontFamily:'var(--font-body)', fontSize:14, color:'#0F172A', padding:'0 12px'}}>
                        <option>General</option>
                        <option>Resume</option>
                        <option>Tests</option>
                        <option>Interview</option>
                        <option>XP & Account</option>
                        <option>Technical Issue</option>
                      </select>
                      <input defaultValue="Rahul Sharma" style={{height:44, marginBottom:12, width:'100%', border:'1.5px solid #E2E8F0', borderRadius:8, fontFamily:'var(--font-body)', fontSize:14, color:'#0F172A', padding:'0 12px', boxSizing:'border-box'}} />
                      <input defaultValue="rahul@vit.edu" style={{height:44, marginBottom:12, width:'100%', border:'1.5px solid #E2E8F0', borderRadius:8, fontFamily:'var(--font-body)', fontSize:14, color:'#0F172A', padding:'0 12px', boxSizing:'border-box'}} />
                      <textarea
                        placeholder="Tell us what is happening..."
                        value={ticketText}
                        onChange={(e) => setTicketText(e.target.value)}
                        style={{minHeight:100, marginBottom:12, width:'100%', border:'1.5px solid #E2E8F0', borderRadius:8, padding:12, fontFamily:'var(--font-body)', fontSize:14, resize:'none', boxSizing:'border-box'}}
                      />
                      <div style={{display:'flex', gap:8, marginBottom:16}}>
                        {['Low','Medium','High'].map(p => (
                          <div key={p} style={{height:32, borderRadius:9999, padding:'0 14px', display:'flex', alignItems:'center', fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, background:p==='Low'?'#DCFCE7':p==='Medium'?'#FEF3C7':'#FEF2F2', color:p==='Low'?'#16A34A':p==='Medium'?'#D97706':'#DC2626', cursor:'pointer'}}>
                            {p}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {setTicketSubmitted(true); setTimeout(() => showToast("Support ticket submitted ✓"), 0);}}
                        style={{width:'100%', height:48, background:'#BD1313', color:'white', border:'none', fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, borderRadius:12, cursor:'pointer'}}>
                        Send Message →
                      </button>
                    </>
                  )}
                </div>

                {/* Right - Contact Options */}
                <div style={{display:'flex', flexDirection:'column', gap:12}}>
                  {[
                    {icon:'https://img.icons8.com/3d-fluency/100/mail.png', bg:'#FFF1F2', title:'Email Support', detail:'support@aivision21.com', response:'Within 24 hours', color:'#16A34A'},
                    {icon:'https://img.icons8.com/3d-fluency/100/chat.png', bg:'#F0FDF4', title:'Live Chat', detail:'Chat with our team', response:'Usually within 1 hour', color:'#16A34A'},
                    {icon:'https://img.icons8.com/3d-fluency/100/conference-call.png', bg:'#EFF6FF', title:'Community Forum', detail:'50K+ students helping each other', response:'Always available', color:'#D97706'}
                  ].map((opt, i) => (
                    <div
                      key={`contact-${opt.title}`}
                      onClick={() => setTimeout(() => showToast(i===0?"Email copied! 📧":i===1?"Live chat coming soon!":"Community forum coming soon!"), 0)}
                      style={{background:'white', border:'1px solid #E2E8F0', borderRadius:16, padding:20, display:'flex', alignItems:'center', gap:14, cursor:'pointer', transition:'all 0.2s'}}
                      onMouseEnter={(e) => {e.currentTarget.style.border='1px solid #BD1313'; e.currentTarget.style.background='#FFF8F8';}}
                      onMouseLeave={(e) => {e.currentTarget.style.border='1px solid #E2E8F0'; e.currentTarget.style.background='white';}}>
                      <div style={{width:48, height:48, borderRadius:14, background:opt.bg, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <img src={opt.icon} width={28} height={28} />
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:'var(--font-body)', fontSize:15, fontWeight:700, color:'#0F172A'}}>{opt.title}</div>
                        <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8'}}>{opt.detail}</div>
                        <div style={{fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:opt.color}}>{opt.response}</div>
                      </div>
                      <ChevronRight size={16} color="#94A3B8" />
                    </div>
                  ))}
                  <div style={{background:'#FFFBEB', border:'1px solid #FCD34D', borderRadius:16, padding:'16px 20px'}}>
                    <div style={{fontFamily:'var(--font-body)', fontSize:13, fontWeight:700, color:'#D97706', marginBottom:8}}>🕐 Office Hours</div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#475569', lineHeight:1.8}}>
                      Monday – Friday: 9 AM – 6 PM IST<br/>
                      Saturday: 10 AM – 2 PM IST<br/>
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeHelpTab === 'about' && (
              <div style={{display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:16}}>
                <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:20, padding:24}}>
                  <img src="https://i.ibb.co/C3FG8VDW/app-icon.png" width={64} height={64} style={{borderRadius:16, marginBottom:12, filter:'drop-shadow(0 4px 16px rgba(189,19,19,0.3))', display:'block'}} />
                  <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:'#0F172A'}}>EduVision v1.0</div>
                  <div style={{fontFamily:'var(--font-body)', fontSize:13, color:'#94A3B8', marginTop:4, marginBottom:16}}>By AIVision21 · LearningVision Suite</div>
                  <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, color:'#BD1313', marginBottom:8}}>Your Career Growth Companion</div>
                  <div style={{fontFamily:'var(--font-body)', fontSize:14, color:'#475569', lineHeight:1.7, marginBottom:16}}>
                    EduVision is an AI-powered career preparation platform built for Indian college students. Practice tests, build your resume, and ace interviews with Aria — all in one place.
                  </div>
                  <div style={{background:'#F8FAFF', border:'1px solid #E2E8F0', borderRadius:12, padding:'14px 16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                    {[['Version','1.0.0'],['Updated','March 2025'],['Platform','Web App'],['Made in','India 🇮🇳']].map(([label,value]) => (
                      <div key={label}>
                        <div style={{fontFamily:'var(--font-body)', fontSize:11, color:'#94A3B8'}}>{label}</div>
                        <div style={{fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:'#0F172A'}}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:16, padding:20, textAlign:'center'}}>
                    <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" height={36} style={{display:'block', margin:'0 auto 12px'}} />
                    <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'#0F172A'}}>AIVision21</div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8', marginTop:4}}>Provides Insights. Exemplifies Learning.</div>
                    <div style={{height:1, background:'#E2E8F0', margin:'12px 0'}}/>
                    <div style={{display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap'}}>
                      {[{t:'30+ Years',c:'#BD1313',bg:'#FDF2F2'},{t:'21 Domains',c:'#2563EB',bg:'#EFF6FF'},{t:'AI Powered',c:'#16A34A',bg:'#F0FDF4'}].map(b => (
                        <div key={b.t} style={{background:b.bg, color:b.c, fontFamily:'var(--font-body)', fontSize:11, fontWeight:700, borderRadius:9999, padding:'4px 10px'}}>
                          {b.t}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:16, padding:'16px 20px', marginTop:12}}>
                    <div style={{fontFamily:'var(--font-body)', fontSize:11, textTransform:'uppercase', color:'#94A3B8', marginBottom:10}}>LINKS</div>
                    {['Privacy Policy','Terms of Service','Cookie Policy','Licenses'].map(link => (
                      <div
                        key={link}
                        onClick={() => setTimeout(() => showToast("Opening " + link + "..."), 0)}
                        style={{height:40, display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #F8FAFF', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, color:'#475569'}}>
                        {link}
                        <ChevronRight size={14} color="#94A3B8" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Profile Screen
  const XPStoreScreen = () => {
    const [xpBalance, setXpBalance] = useState(2400);
    const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
    const [storeFilter, setStoreFilter] = useState('All');

    const xpStoreItems = [
      {id:'shield',category:'Boosters',name:'Streak Shield 🛡️',desc:'Protect your daily streak once — miss a day without losing it',cost:500,icon:'https://img.icons8.com/3d-fluency/100/shield.png',color:'#2563EB',bg:'#EFF6FF',popular:true},
      {id:'xp-boost',category:'Boosters',name:'XP Boost Rocket 🚀',desc:'Double XP earned for the next 24 hours',cost:600,icon:'https://img.icons8.com/3d-fluency/100/rocket.png',color:'#BD1313',bg:'#FFF1F2',popular:true},
      {id:'leaderboard-boost',category:'Boosters',name:'Leaderboard Boost ⚡',desc:'Get 2x score multiplier on your next test',cost:600,icon:'https://img.icons8.com/3d-fluency/100/trophy.png',color:'#D97706',bg:'#FFFBEB',popular:false},
      {id:'template',category:'Templates',name:'Premium Resume Template ✨',desc:'Unlock exclusive Executive resume template',cost:800,icon:'https://img.icons8.com/3d-fluency/100/resume.png',color:'#7C3AED',bg:'#FAF5FF',popular:true},
      {id:'modern-template',category:'Templates',name:'Modern CV Template 🎨',desc:'Clean, modern design perfect for tech roles',cost:700,icon:'https://img.icons8.com/3d-fluency/100/document.png',color:'#2563EB',bg:'#EFF6FF',popular:false},
      {id:'ai-token',category:'AI Tools',name:'AI Feedback Token 🤖',desc:'Get extra AI-powered feedback on your interview answers',cost:300,icon:'https://img.icons8.com/3d-fluency/100/artificial-intelligence.png',color:'#16A34A',bg:'#F0FDF4',popular:false},
      {id:'ai-resume-review',category:'AI Tools',name:'AI Resume Review 📊',desc:'Detailed AI analysis of your resume with improvement tips',cost:400,icon:'https://img.icons8.com/3d-fluency/100/graph.png',color:'#16A34A',bg:'#F0FDF4',popular:false},
      {id:'badge-frame',category:'Profile Items',name:'Gold Profile Frame 🥇',desc:'Show off a premium gold frame around your profile avatar',cost:400,icon:'https://img.icons8.com/3d-fluency/100/medal.png',color:'#D97706',bg:'#FEFCE8',popular:false},
      {id:'profile-badge',category:'Profile Items',name:'Elite Badge 💎',desc:'Display exclusive elite status badge on your profile',cost:500,icon:'https://img.icons8.com/3d-fluency/100/badge.png',color:'#7C3AED',bg:'#FAF5FF',popular:false},
      {id:'certificate',category:'Rewards',name:'Achievement Certificate 🎓',desc:'Generate a shareable certificate of completion',cost:1200,icon:'https://img.icons8.com/3d-fluency/100/certificate.png',color:'#BD1313',bg:'#FFF1F2',popular:false},
      {id:'study-pack',category:'Rewards',name:'Study Material Pack 📚',desc:'Access premium aptitude and reasoning study guides',cost:900,icon:'https://img.icons8.com/3d-fluency/100/book.png',color:'#2563EB',bg:'#EFF6FF',popular:false},
      {id:'interview-tips',category:'Rewards',name:'Expert Interview Tips 💡',desc:'50+ expert tips for acing technical interviews',cost:350,icon:'https://img.icons8.com/3d-fluency/100/idea.png',color:'#D97706',bg:'#FFFBEB',popular:false}
    ];

    const categories = ['All','Boosters','Templates','AI Tools','Profile Items','Rewards'];
    const filteredItems = storeFilter==='All' ? xpStoreItems : xpStoreItems.filter(i => i.category===storeFilter);

    return (
      <div style={{display:'flex',flexDirection:'column',height:'100%',overflow:'hidden',animation:'screenEnter 280ms ease-out both'}}>
        <div style={{background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:56}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <ChevronLeft size={20} color="#475569" style={{cursor:'pointer'}} onClick={() => navigateToScreen('dashboard')} />
            <div style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700,color:'#0F172A'}}>XP Store 🛍️</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:13,color:'#94A3B8',marginLeft:8}}>Spend your XP on exclusive rewards</div>
          </div>
          <div style={{background:'linear-gradient(135deg, #D97706, #B45309)',color:'white',borderRadius:9999,padding:'6px 16px',fontFamily:'var(--font-body)',fontSize:13,fontWeight:700}}>
            ⚡ {xpBalance.toLocaleString()} XP Available
          </div>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}}>
          <div style={{background:'linear-gradient(135deg, #FFFBEB, #FEF3C7)',border:'1px solid #FCD34D',borderRadius:20,padding:20,marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:12}}>
              <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png" width={48} height={48} style={{background:'transparent'}}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--font-body)',fontSize:11,textTransform:'uppercase',color:'#D97706',marginBottom:4,letterSpacing:'0.5px'}}>⚡ XP Balance</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:32,fontWeight:800,color:'#D97706'}}>{xpBalance.toLocaleString()} XP</div>
              </div>
              <div onClick={() => setShowXPModal(true)} style={{fontFamily:'var(--font-body)',fontSize:12,color:'#D97706',fontWeight:600,cursor:'pointer'}}>How to earn more →</div>
            </div>
            <div style={{background:'rgba(217,119,6,0.1)',borderRadius:12,padding:'12px 14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                <span style={{fontFamily:'var(--font-body)',fontSize:11,color:'#B45309',fontWeight:600}}>Progress to Elite</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:11,color:'#B45309',fontWeight:700}}>600 XP to go</span>
              </div>
              <div style={{height:8,background:'rgba(217,119,6,0.2)',borderRadius:9999,overflow:'hidden'}}>
                <div style={{width:'80%',height:'100%',background:'#D97706',borderRadius:9999,transition:'width 0.5s ease'}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
                <span style={{fontFamily:'var(--font-body)',fontSize:10,color:'#B45309'}}>🔥 Hustler (Lv.3)</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:10,color:'#B45309'}}>💎 Elite (Lv.4)</span>
              </div>
            </div>
          </div>
          <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
            {categories.map(cat => (
              <div key={cat} onClick={() => setStoreFilter(cat)} style={{height:36,padding:'0 16px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,background:storeFilter===cat?'#D97706':'#F1F5F9',color:storeFilter===cat?'white':'#475569',transition:'all 0.2s',display:'flex',alignItems:'center',boxShadow:storeFilter===cat?'0 2px 8px rgba(217,119,6,0.25)':'none'}}>
                {cat}
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
            {filteredItems.map(item => (
              <div key={item.id} style={{background:'white',border:'1px solid #E2E8F0',borderRadius:20,padding:20,position:'relative',overflow:'hidden',transition:'all 0.2s',cursor:'pointer'}}
                onMouseEnter={(e) => {e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.1)';}}
                onMouseLeave={(e) => {e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
                {item.popular && <div style={{position:'absolute',top:0,right:0,background:'#D97706',color:'white',fontFamily:'var(--font-body)',fontSize:10,fontWeight:700,borderRadius:'0 20px 0 12px',padding:'4px 12px'}}>⭐ Popular</div>}
                {purchasedItems.includes(item.id) && <div style={{position:'absolute',top:0,left:0,background:'#DCFCE7',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:10,fontWeight:700,borderRadius:'20px 0 12px 0',padding:'4px 12px'}}>✓ Owned</div>}
                <div style={{display:'flex',gap:12,marginBottom:14}}>
                  <div style={{width:52,height:52,background:item.bg,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <img src={item.icon} width={30} height={30} style={{background:'transparent'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:10,textTransform:'uppercase',color:'#94A3B8'}}>{item.category}</div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:15,fontWeight:700,color:'#0F172A',marginTop:2}}>{item.name}</div>
                  </div>
                </div>
                <div style={{fontFamily:'var(--font-body)',fontSize:13,color:'#64748B',lineHeight:1.5,marginBottom:14}}>{item.desc}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{display:'flex',alignItems:'center',gap:4}}>
                    <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png" width={16} height={16} style={{background:'transparent'}}/>
                    <span style={{fontFamily:'var(--font-body)',fontSize:13,fontWeight:700,color:'#D97706'}}>{item.cost.toLocaleString()} XP</span>
                  </div>
                  <button onClick={() => {
                    if (purchasedItems.includes(item.id)) return;
                    if (xpBalance >= item.cost) {
                      setXpBalance(prev => prev - item.cost);
                      setPurchasedItems(prev => [...prev, item.id]);
                      setTimeout(() => showToast("Item Purchased! 🎉"), 0);
                      setTimeout(() => showXPToast("-" + item.cost + " XP"), 200);
                    } else {
                      setTimeout(() => showToast("Not enough XP! Need " + (item.cost - xpBalance) + " more XP"), 0);
                    }
                  }} style={{height:36,padding:'0 16px',borderRadius:9999,fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,border:'none',cursor:purchasedItems.includes(item.id)?'default':'pointer',background:purchasedItems.includes(item.id)?'#DCFCE7':xpBalance>=item.cost?item.color:'#F1F5F9',color:purchasedItems.includes(item.id)?'#16A34A':xpBalance>=item.cost?'white':'#94A3B8',transition:'all 0.2s',boxShadow:xpBalance>=item.cost&&!purchasedItems.includes(item.id)?'0 2px 8px rgba(0,0,0,0.1)':'none'}}>
                    {purchasedItems.includes(item.id) ? '✓ OWNED' : xpBalance >= item.cost ? 'Purchase' : 'Not enough XP'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:'linear-gradient(135deg, #FFF1F2, white)',border:'1px solid #F5BFBF',borderRadius:20,padding:20,display:'flex',alignItems:'center',gap:16,marginTop:24}}>
            <img src="https://img.icons8.com/3d-fluency/100/rocket.png" width={60} height={60} style={{background:'transparent'}}/>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:'#0F172A',marginBottom:4}}>Need more XP? 🚀</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:13,color:'#64748B',marginBottom:12}}>Complete tests, interviews and daily tasks to earn XP</div>
              <div style={{display:'flex',gap:10}}>
                <button onClick={() => navigateToScreen('tests')} style={{height:40,padding:'0 16px',background:'#BD1313',color:'white',border:'none',borderRadius:10,fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,cursor:'pointer'}}>Take a Test +50 XP</button>
                <button onClick={() => navigateToScreen('interview')} style={{height:40,padding:'0 16px',background:'white',color:'#BD1313',border:'1.5px solid #F5BFBF',borderRadius:10,fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,cursor:'pointer'}}>Do Interview +75 XP</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Credits & Billing Screen
  const CreditsScreen = () => {
    const trustBadges = [
      {icon:'⚡', title:'Instant Delivery',
       desc:'Credits added immediately after payment'},
      {icon:'🔒', title:'Secure Payments',
       desc:'SSL encrypted via Razorpay'},
      {icon:'♾️', title:'Never Expires',
       desc:'Your credits stay valid forever'},
      {icon:'🎯', title:'One-Time Payment',
       desc:'No subscriptions. Pay only what you need'}
    ];

    const walletCards = [
      {key:'resume', label:'Resume Builder',
       desc:'For professional resumes',
       icon:'https://img.icons8.com/3d-fluency/100/resume.png',
       color:'#BD1313', bg:'#FFF1F2',
       border:'#F5BFBF'},
      {key:'tests', label:'Test Assessments',
       desc:'For assessment tests',
       icon:'https://img.icons8.com/3d-fluency/100/bookmark-book.png',
       color:'#D97706', bg:'#FFFBEB',
       border:'#FCD34D'},
      {key:'interview', label:'AI Interview',
       desc:'For AI mock interviews',
       icon:'https://img.icons8.com/3d-fluency/100/microphone.png',
       color:'#16A34A', bg:'#F0FDF4',
       border:'#86EFAC'}
    ];

    const currentPlans = (creditPlans as any)[creditTab];
    const currentWallet = walletCards.find(w => w.key === creditTab);

    const tabLabels: Record<string, string> = {
      resume: 'Resume Builder',
      tests: 'Test Assessments',
      interview: 'AI Interview'
    };

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }} className="screen-enter">
        {/* HEADER */}
        <div style={{
          height: 56,
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: 36, height: 36,
              background: '#FDF2F2',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CreditCard size={20} color="#BD1313" />
            </div>
            <div>
              <div style={{
                fontFamily: 'Syne',
                fontSize: 20, fontWeight: 700,
                color: '#0F172A'
              }}>Credits & Billing 💳</div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12, color: '#94A3B8'
              }}>Manage credits and purchase history</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setShowCart(true)}
              style={{
                position: 'relative',
                background: 'white',
                border: '1.5px solid #E2E8F0',
                borderRadius: 10,
                padding: '8px 14px',
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1.5px solid #BD1313';
                e.currentTarget.style.background = '#FFF8F8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1.5px solid #E2E8F0';
                e.currentTarget.style.background = 'white';
              }}>
              <ShoppingCart size={18} color="#475569" />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13, fontWeight: 600,
                color: '#475569'
              }}>Cart</span>

              {cartCount > 0 && (
                <div style={{
                  position: 'absolute',
                  top: -1, right: -1,
                  background: '#BD1313',
                  color: 'white',
                  width: 18, height: 18,
                  borderRadius: '50%',
                  fontSize: 10, fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white'
                }}>{cartCount}</div>
              )}
            </button>

            <button
              onClick={() => {
                document.getElementById('purchase-history')?.scrollIntoView({behavior:'smooth'});
              }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13, fontWeight: 500,
                color: '#BD1313',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none'
              }}>Purchase History</button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px'
        }}>
          {/* TRUST BADGES */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {trustBadges.map((badge, i) => (
              <div key={i} style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: 14
              }}>
                <div style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  background: '#FDF2F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0
                }}>{badge.icon}</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12, fontWeight: 700,
                    color: '#0F172A'
                  }}>{badge.title}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11, color: '#94A3B8',
                    marginTop: 1
                  }}>{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* YOUR WALLET */}
          <div style={{
            fontFamily: 'Syne',
            fontSize: 16, fontWeight: 700,
            marginBottom: 12
          }}>Your Wallet 💰</div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 14,
            marginBottom: 24
          }}>
            {walletCards.map(card => (
              <div key={card.key} style={{
                background: 'white',
                border: `1.5px solid ${card.border}`,
                borderRadius: 20,
                padding: 20,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: card.color,
                  borderRadius: '20px 20px 0 0'
                }}></div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12
                }}>
                  <div style={{
                    width: 44, height: 44,
                    background: card.bg,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img src={card.icon} width={24} height={24}
                         style={{background:'transparent'}}/>
                  </div>

                  <div style={{
                    background: card.bg,
                    color: card.color,
                    fontFamily: 'var(--font-body)',
                    fontSize: 10, fontWeight: 700,
                    borderRadius: 9999,
                    padding: '3px 8px'
                  }}>Available</div>
                </div>

                <div style={{
                  fontFamily: 'Syne',
                  fontSize: 40, fontWeight: 800,
                  color: card.color,
                  lineHeight: 1
                }}>{(wallet as any)[card.key]}</div>

                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12, color: '#94A3B8',
                  marginTop: 2
                }}>credits</div>

                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11, color: '#94A3B8'
                }}>Available to use</div>

                <div style={{
                  fontFamily: 'Syne',
                  fontSize: 14, fontWeight: 700,
                  color: '#0F172A',
                  marginTop: 8
                }}>{card.label}</div>

                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11, color: '#94A3B8'
                }}>{card.desc}</div>

                <button
                  onClick={() => {
                    setCreditTab(card.key);
                    document.getElementById('buy-credits')?.scrollIntoView({behavior:'smooth'});
                  }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12, fontWeight: 600,
                    color: card.color,
                    cursor: 'pointer',
                    display: 'flex',
                    gap: 4,
                    alignItems: 'center',
                    marginTop: 10,
                    background: 'transparent',
                    border: 'none'
                  }}>Buy More →</button>
              </div>
            ))}
          </div>

          {/* TOTAL CREDITS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'linear-gradient(135deg, #FDF2F2, white)',
            border: '1px solid #F5BFBF',
            borderRadius: 12,
            padding: '10px 16px',
            marginBottom: 24
          }}>
            <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png"
                 width={20} height={20}
                 style={{background:'transparent'}}/>

            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13, color: '#475569'
            }}>Total Credits:</span>

            <span style={{
              fontFamily: 'Syne',
              fontSize: 16, fontWeight: 800,
              color: '#BD1313'
            }}>{wallet.resume + wallet.tests + wallet.interview} total credits</span>
          </div>

          {/* BUY CREDITS */}
          <div id="buy-credits" style={{ marginTop: 16 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 4
            }}>
              <div>
                <div style={{
                  fontFamily: 'Syne',
                  fontSize: 18, fontWeight: 700,
                  color: '#0F172A'
                }}>Buy Credits 🛒</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12, color: '#94A3B8',
                  marginTop: 2
                }}>One-time payment. No subscriptions. Credits never expire.</div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12, color: '#94A3B8'
                }}>Sort by:</span>

                <select style={{
                  height: 36,
                  padding: '0 12px',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 8,
                  fontFamily: 'var(--font-body)',
                  fontSize: 13, color: '#0F172A',
                  background: 'white'
                }}>
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Value</option>
                </select>
              </div>
            </div>

            {/* TABS */}
            <div style={{
              display: 'flex',
              gap: 0,
              marginBottom: 20,
              borderBottom: '1px solid #E2E8F0',
              marginTop: 16
            }}>
              {Object.entries(tabLabels).map(([key, label]) => (
                <div
                  key={key}
                  onClick={() => setCreditTab(key)}
                  style={{
                    height: 44,
                    padding: '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14, fontWeight: 500,
                    color: creditTab===key ? '#BD1313' : '#94A3B8',
                    borderBottom: creditTab===key
                      ? '2px solid #BD1313' : '2px solid transparent',
                    transition: 'all 0.2s'
                  }}>
                  {key==='resume' && (
                    <img src="https://img.icons8.com/3d-fluency/100/resume.png"
                         width={16} height={16}
                         style={{background:'transparent'}}/>
                  )}
                  {key==='tests' && (
                    <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png"
                         width={16} height={16}
                         style={{background:'transparent'}}/>
                  )}
                  {key==='interview' && (
                    <img src="https://img.icons8.com/3d-fluency/100/microphone.png"
                         width={16} height={16}
                         style={{background:'transparent'}}/>
                  )}
                  {label}
                  {creditTab===key && (
                    <span style={{
                      background:'#FDF2F2', color:'#BD1313',
                      fontFamily:'var(--font-body)',
                      fontSize:10, fontWeight:700,
                      borderRadius:9999, padding:'1px 6px'
                    }}>
                      {(wallet as any)[key]} left
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* PLANS GRID */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 16,
              marginBottom: 24
            }}>
              {currentPlans && currentPlans.map((plan: any, i: number) => {
                const features = plan.credits === 1
                  ? ["Single use credit", "Instant delivery", "Never expires", "Full feature access"]
                  : plan.credits === 10
                  ? [`${plan.credits} credits bundle`, "Save vs single credit", "Instant delivery", "Never expires", "Priority processing"]
                  : [`${plan.credits} credits bundle`, "Maximum savings", "Instant delivery", "Never expires", "Priority processing", "Bulk purchase discount"];

                return (
                  <div
                    key={plan.id}
                    style={{
                      background: plan.popular
                        ? `linear-gradient(145deg, ${currentWallet?.color}08, white)`
                        : 'white',
                      border: plan.popular
                        ? `2px solid ${currentWallet?.color}`
                        : '1px solid #E2E8F0',
                      borderRadius: 20,
                      padding: 24,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = `0 12px 32px ${currentWallet?.color}26`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                    {plan.popular && (
                      <div style={{
                        position: 'absolute',
                        top: 0, right: 0,
                        background: currentWallet?.color,
                        color: 'white',
                        fontFamily: 'Syne',
                        fontSize: 11, fontWeight: 700,
                        borderRadius: '0 20px 0 14px',
                        padding: '6px 14px'
                      }}>⭐ Best Value</div>
                    )}

                    <div style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      marginBottom: 16
                    }}>
                      <img src={currentWallet?.icon} width={20} height={20}
                           style={{background:'transparent'}}/>

                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 12, fontWeight: 600,
                        color: currentWallet?.color
                      }}>{tabLabels[creditTab]}</span>
                    </div>

                    <div style={{
                      fontFamily: 'Syne',
                      fontSize: 40, fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1,
                      marginBottom: 4
                    }}>₹{plan.price}</div>

                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15, fontWeight: 600,
                      color: '#0F172A',
                      marginBottom: 4
                    }}>{plan.label}</div>

                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13, color: '#94A3B8',
                      marginBottom: 16
                    }}>{plan.tag}</div>

                    <div style={{
                      height: 1,
                      background: '#F1F5F9',
                      marginBottom: 16
                    }}></div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      marginBottom: 20
                    }}>
                      {features.map((feature, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          gap: 8,
                          alignItems: 'center'
                        }}>
                          <CheckCircle size={14} color={plan.popular ? currentWallet?.color : '#16A34A'} />
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 13, color: '#475569'
                          }}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addToCart(plan, creditTab)}
                      style={{
                        width: '100%',
                        height: 48,
                        background: plan.popular ? currentWallet?.color : 'transparent',
                        color: plan.popular ? 'white' : currentWallet?.color,
                        border: plan.popular ? 'none' : `1.5px solid ${currentWallet?.color}`,
                        fontFamily: plan.popular ? 'Syne' : 'var(--font-body)',
                        fontSize: plan.popular ? 15 : 14,
                        fontWeight: plan.popular ? 700 : 600,
                        borderRadius: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        gap: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: plan.popular ? `0 8px 24px ${currentWallet?.color}40` : 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = plan.popular
                          ? `0 12px 32px ${currentWallet?.color}50`
                          : `0 4px 12px ${currentWallet?.color}26`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = plan.popular
                          ? `0 8px 24px ${currentWallet?.color}40`
                          : 'none';
                      }}>
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>

                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11, color: '#94A3B8',
                      textAlign: 'center',
                      marginTop: 8
                    }}>You have {(wallet as any)[creditTab]} credits left</div>
                  </div>
                );
              })}
            </div>

            {/* NEED HELP */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              marginBottom: 24
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13, color: '#64748B'
              }}>Need help?</span>
              <button
                onClick={() => setScreen('help')}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13, fontWeight: 600,
                  color: '#BD1313',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none'
                }}>Contact Support →</button>
            </div>
          </div>

          {/* PURCHASE HISTORY */}
          <div id="purchase-history">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12
            }}>
              <div style={{
                fontFamily: 'Syne',
                fontSize: 16, fontWeight: 700
              }}>Purchase History 📋</div>

              <button
                onClick={() => setTimeout(() =>
                  showToast("Downloading history... 📥"), 0)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13, fontWeight: 500,
                  color: '#BD1313',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none'
                }}>Download All</button>
            </div>

            {purchaseHistory.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <img src="https://img.icons8.com/3d-fluency/100/receipt.png"
                     width={64} height={64}
                     style={{display:'block', margin:'0 auto 12px',
                             background:'transparent'}}/>
                <div style={{
                  fontFamily: 'Syne',
                  fontSize: 18, color: '#94A3B8'
                }}>No purchases yet</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14, color: '#94A3B8',
                  marginTop: 4
                }}>Your purchase history will appear here</div>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                {purchaseHistory.map(purchase => {
                  const typeIcon = purchase.type.includes('Resume')
                    ? 'https://img.icons8.com/3d-fluency/100/resume.png'
                    : purchase.type.includes('Test')
                    ? 'https://img.icons8.com/3d-fluency/100/bookmark-book.png'
                    : 'https://img.icons8.com/3d-fluency/100/microphone.png';

                  const typeBg = purchase.type.includes('Resume')
                    ? '#FFF1F2'
                    : purchase.type.includes('Test')
                    ? '#FFFBEB'
                    : '#F0FDF4';

                  return (
                    <div key={purchase.id} style={{
                      background: 'white',
                      border: '1px solid #E2E8F0',
                      borderRadius: 14,
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14
                    }}>
                      <div style={{
                        width: 40, height: 40,
                        background: typeBg,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <img src={typeIcon} width={22} height={22}
                             style={{background:'transparent'}}/>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          gap: 8,
                          alignItems: 'center'
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 14, fontWeight: 600,
                            color: '#0F172A'
                          }}>{purchase.type}</span>

                          <span style={{
                            background: '#FDF2F2',
                            color: '#BD1313',
                            border: '1px solid #F5BFBF',
                            fontFamily: 'var(--font-body)',
                            fontSize: 11, fontWeight: 700,
                            borderRadius: 9999,
                            padding: '2px 8px'
                          }}>{purchase.credits} credits</span>
                        </div>

                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 11, color: '#94A3B8',
                          marginTop: 2
                        }}>{purchase.date} · {purchase.method}</div>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'center'
                      }}>
                        <div style={{
                          fontFamily: 'Syne',
                          fontSize: 16, fontWeight: 700,
                          color: '#0F172A'
                        }}>₹{purchase.amount}</div>

                        <div style={{
                          background: purchase.status === 'completed' ? '#DCFCE7' : '#FEF3C7',
                          color: purchase.status === 'completed' ? '#16A34A' : '#D97706',
                          border: purchase.status === 'completed' ? '1px solid #86EFAC' : '1px solid #FCD34D',
                          fontFamily: 'var(--font-body)',
                          fontSize: 11, fontWeight: 700,
                          borderRadius: 9999,
                          padding: '3px 10px'
                        }}>{purchase.status === 'completed' ? '✓ Completed' : 'Pending'}</div>

                        <Download
                          size={16}
                          color="#94A3B8"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setTimeout(() =>
                            showToast("Receipt downloaded! 📄"), 0)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProfileScreen = () => {
    const perfCards = [
      {icon:'https://img.icons8.com/3d-fluency/100/bookmark-book.png', val:'12', label:'Total Tests', color:'#D97706', bg:'#FFFBEB'},
      {icon:'https://img.icons8.com/3d-fluency/100/goal.png', val:'74%', label:'Avg Score', color:'#16A34A', bg:'#F0FDF4'},
      {icon:'https://img.icons8.com/3d-fluency/100/trophy.png', val:'88%', label:'Best Score', color:'#BD1313', bg:'#FFF1F2'},
      {icon:'https://img.icons8.com/3d-fluency/100/microphone.png', val:'3', label:'AI Sessions', color:'#2563EB', bg:'#EFF6FF'},
      {icon:'https://img.icons8.com/3d-fluency/100/resume.png', val:'68%', label:'Resume', color:'#BD1313', bg:'#FFF1F2'},
      {icon:'https://img.icons8.com/3d-fluency/100/lightning-bolt.png', val:'2,400', label:'XP Earned', color:'#D97706', bg:'#FFFBEB'}
    ];

    const subjects = [
      {name:'Mathematics', score:79},
      {name:'English', score:88},
      {name:'Science', score:65},
      {name:'Aptitude', score:52},
      {name:'Programming', score:71}
    ];

    const achievements = [
      {name:'First Test', icon:'https://img.icons8.com/3d-fluency/100/medal.png', date:'Mar 10', unlocked:true, border:'#FCD34D', condition:'Complete your first test'},
      {name:'Resume Started', icon:'https://img.icons8.com/3d-fluency/100/resume.png', date:'Mar 12', unlocked:true, border:'#F5BFBF', condition:'Start building your resume'},
      {name:'5 Day Streak', icon:'https://img.icons8.com/3d-fluency/100/fire-element.png', date:'Mar 14', unlocked:true, border:'#FCD34D', condition:'Practice for 5 days straight'},
      {name:'Score 80%+', icon:'https://img.icons8.com/3d-fluency/100/goal.png', date:null, unlocked:false, border:'#E2E8F0', condition:'Score 80% or more on any test'},
      {name:'Perfect Score', icon:'https://img.icons8.com/3d-fluency/100/star.png', date:null, unlocked:false, border:'#E2E8F0', condition:'Get 100% on any test'},
      {name:'Interview Pro', icon:'https://img.icons8.com/3d-fluency/100/microphone.png', date:null, unlocked:false, border:'#E2E8F0', condition:'Complete 5 AI interview sessions'},
      {name:'Subject Master', icon:'https://img.icons8.com/3d-fluency/100/book.png', date:null, unlocked:false, border:'#E2E8F0', condition:'Score 90%+ in any subject'},
      {name:'Champion', icon:'https://img.icons8.com/3d-fluency/100/trophy.png', date:null, unlocked:false, border:'#E2E8F0', condition:'Reach Champion level (5000 XP)'}
    ];

    const allActivity = [
      {icon:'📝', bg:'#FFF1F2', title:'Math Test Complete', time:'2h ago', badge:'74%', variant:'warning', screen:'tests'},
      {icon:'📄', bg:'#FFFBEB', title:'Resume Skills Updated', time:'Yesterday', badge:'68%', variant:'primary', screen:'resume'},
      {icon:'🎤', bg:'#F0FDF4', title:'AI Interview Done', time:'2 days ago', badge:'Practice', variant:'neutral', screen:'interview'},
      {icon:'🏅', bg:'#FEFCE8', title:'Badge Unlocked!', time:'3 days ago', badge:'New', variant:'warning', screen:'profile'},
      {icon:'📊', bg:'#F0FDF4', title:'Report Reviewed', time:'4 days ago', badge:'Done', variant:'success', screen:'tests'},
      {icon:'🌱', bg:'#F0FDF4', title:'Joined EduVision', time:'Mar 1', badge:'Welcome!', variant:'success', screen:'dashboard'},
      {icon:'🎯', bg:'#EFF6FF', title:'Set target role', time:'Mar 2', badge:'SWE', variant:'primary', screen:'settings'},
      {icon:'📄', bg:'#FFFBEB', title:'Resume Created', time:'Mar 3', badge:'Started', variant:'warning', screen:'resume'},
      {icon:'⚡', bg:'#FEFCE8', title:'Reached Rising Level', time:'Mar 5', badge:'Level Up!', variant:'warning', screen:'profile'}
    ];

    return (
      <div style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden', animation:'screenEnter 280ms ease-out both'}}>
        {/* Header */}
        <div style={{background:'white', borderBottom:'1px solid #E2E8F0', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:56}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <ChevronLeft size={20} color="#475569" style={{cursor:'pointer'}} onClick={() => navigateToScreen('dashboard')} />
            <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'#0F172A'}}>My Profile 👤</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button onClick={() => navigateToScreen('settings')} style={{background:'transparent', border:'1.5px solid #F5BFBF', color:'#BD1313', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, borderRadius:8, height:36, padding:'0 14px', cursor:'pointer'}}>
              Edit Profile
            </button>
            <button onClick={() => setTimeout(() => showToast("Profile link copied! 🔗"), 0)} style={{background:'transparent', border:'1.5px solid #E2E8F0', color:'#64748B', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, borderRadius:8, height:36, padding:'0 14px', cursor:'pointer'}}>
              Share Profile
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1, overflow:'hidden', display:'grid', gridTemplateColumns:'300px 1fr', height:'100%'}}>
          {/* Left Panel */}
          <div style={{borderRight:'1px solid #E2E8F0', overflowY:'auto', padding:'16px'}}>
            {/* Profile Card */}
            <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:20, padding:24, textAlign:'center', marginBottom:12}}>
              <div style={{width:80, height:80, background:'linear-gradient(135deg,#BD1313,#7A0D0D)', color:'white', borderRadius:'50%', border:'4px solid white', boxShadow:'0 8px 24px rgba(189,19,19,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, margin:'0 auto 12px'}}>
                RS
              </div>
              <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:'#0F172A'}}>Rahul Sharma</div>
              <div style={{fontFamily:'var(--font-body)', fontSize:13, color:'#64748B', marginTop:2}}>VIT Vellore · Final Year B.Tech CS</div>
              <div style={{background:'#FDF2F2', color:'#BD1313', border:'1px solid #F5BFBF', fontFamily:'var(--font-body)', fontSize:12, fontWeight:600, borderRadius:9999, padding:'4px 14px', display:'inline-block', marginTop:8}}>
                🎯 Software Engineer
              </div>
              <div style={{height:1, background:'#E2E8F0', margin:'16px 0'}}/>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                {[['12','TESTS'],['74%','AVG SCORE'],['3','SESSIONS'],['8','SKILLS']].map(([val,label]) => (
                  <div key={label} style={{background:'#FAFAFA', borderRadius:10, padding:10, textAlign:'center'}}>
                    <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'#0F172A'}}>{val}</div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:10, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.6px'}}>{label}</div>
                  </div>
                ))}
              </div>
              <div onClick={() => setTimeout(() => showToast("Photo upload coming soon!"), 0)} style={{fontFamily:'var(--font-body)', fontSize:12, color:'#BD1313', fontWeight:500, cursor:'pointer', marginTop:12, display:'block', textDecoration:'underline'}}>
                Change Profile Photo
              </div>
            </div>

            {/* XP Card */}
            <div style={{background:'linear-gradient(135deg,#FFFBEB,#FEF3C7)', border:'1px solid #FCD34D', borderRadius:16, padding:16, marginBottom:12}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <div style={{fontFamily:'var(--font-body)', fontSize:10, textTransform:'uppercase', color:'#D97706', marginBottom:2}}>⚡ XP POINTS</div>
                  <div style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:800, color:'#D97706'}}>2,400</div>
                </div>
                <img src="https://img.icons8.com/3d-fluency/100/medal.png" width={40} height={40} style={{filter:'drop-shadow(0 2px 8px rgba(217,119,6,0.2))', background:'transparent'}} />
              </div>
              <div style={{background:'#D97706', color:'white', fontFamily:'var(--font-body)', fontSize:12, fontWeight:700, borderRadius:9999, padding:'3px 14px', display:'inline-block', marginTop:8}}>
                🔥 Hustler · Level 3
              </div>
              <div style={{marginTop:10}}>
                <div style={{fontFamily:'var(--font-body)', fontSize:10, color:'#B45309', marginBottom:4}}>600 XP to Elite</div>
                <div style={{height:4, background:'rgba(217,119,6,0.2)', borderRadius:9999, overflow:'hidden'}}>
                  <div style={{height:'100%', background:'#D97706', width:'80%', borderRadius:9999}}/>
                </div>
              </div>
            </div>

            {/* Streak Card */}
            <div style={{background:'white', border:'1px solid #E2E8F0', borderRadius:16, padding:14, marginBottom:12, display:'flex', alignItems:'center', gap:12}}>
              <img src="https://img.icons8.com/3d-fluency/100/fire-element.png" width={40} height={40} style={{filter:'drop-shadow(0 2px 8px rgba(217,119,6,0.2))'}} />
              <div>
                <div style={{fontFamily:'var(--font-body)', fontSize:14, fontWeight:700, color:'#D97706'}}>7 Day Streak 🔥</div>
                <div style={{fontFamily:'var(--font-body)', fontSize:11, color:'#94A3B8', marginTop:2}}>3 more days for bonus XP!</div>
              </div>
            </div>

            <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#94A3B8', textAlign:'center', marginTop:4}}>Member since March 2025</div>
          </div>

          {/* Right Panel */}
          <div style={{flex:1, overflowY:'auto', padding:'20px'}}>
            {/* Profile Tabs */}
            <div style={{display:'flex', borderBottom:'1px solid #E2E8F0', marginBottom:16}}>
              {[{id:'overview',label:'Overview'},{id:'achievements',label:'Achievements'},{id:'activity',label:'Activity'}].map(tab => (
                <div
                  key={tab.id}
                  onClick={() => setProfileTab(tab.id)}
                  style={{height:44, padding:'0 20px', display:'flex', alignItems:'center', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:14, fontWeight:500, color:profileTab===tab.id?'#BD1313':'#94A3B8', borderBottom:profileTab===tab.id?'2px solid #BD1313':'2px solid transparent'}}>
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Overview Tab */}
            {profileTab === 'overview' && (
              <>
                <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:16}}>
                  {perfCards.map(card => (
                    <div key={card.label} style={{background:'white', border:'1px solid #E2E8F0', borderRadius:14, padding:'14px 16px', position:'relative', overflow:'hidden'}}>
                      <div style={{position:'absolute', top:0, left:0, right:0, height:3, background:card.color}}/>
                      <img src={card.icon} width={24} height={24} style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))', marginBottom:6}} />
                      <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:'#0F172A'}}>{card.val}</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:10, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.6px'}}>{card.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, marginBottom:12}}>Subject Performance 📚</div>
                {subjects.map(s => (
                  <div key={s.name} style={{display:'flex', alignItems:'center', gap:12, marginBottom:8}}>
                    <div style={{fontFamily:'var(--font-body)', fontSize:13, color:'#475569', width:100, flexShrink:0}}>{s.name}</div>
                    <div style={{flex:1, height:8, background:'#F1F5F9', borderRadius:9999, overflow:'hidden'}}>
                      <div style={{height:'100%', borderRadius:9999, width:s.score+'%', background:s.score>=75?'#16A34A':s.score>=50?'#D97706':'#DC2626', transition:'width 0.8s ease-out'}}/>
                    </div>
                    <div style={{fontFamily:'var(--font-body)', fontSize:13, fontWeight:700, width:36, textAlign:'right', color:s.score>=75?'#16A34A':s.score>=50?'#D97706':'#DC2626'}}>
                      {s.score}%
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Achievements Tab */}
            {profileTab === 'achievements' && (
              <>
                <div style={{marginBottom:16}}>
                  <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:700}}>Achievements 🏅</div>
                  <div style={{fontFamily:'var(--font-body)', fontSize:13, color:'#94A3B8'}}>3 of 8 unlocked</div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
                  {achievements.map(a => (
                    <div
                      key={a.name}
                      onClick={() => setTimeout(() => showToast(a.unlocked ? a.name + ' — Unlocked on ' + a.date : 'Unlock: ' + a.condition), 0)}
                      style={{background:a.unlocked?'white':'#F8FAFF', border:'1.5px solid', borderColor:a.unlocked?a.border:'#E2E8F0', borderStyle:a.unlocked?'solid':'dashed', borderRadius:16, padding:14, textAlign:'center', cursor:'pointer', position:'relative', height:100, transition:'all 0.2s'}}>
                      <img src={a.icon} width={36} height={36} style={{filter:a.unlocked?'drop-shadow(0 2px 8px rgba(0,0,0,0.1))':'grayscale(100%) opacity(0.35)', display:'block', margin:'0 auto 6px'}} />
                      <div style={{fontFamily:'var(--font-body)', fontSize:11, fontWeight:600, color:a.unlocked?'#0F172A':'#94A3B8'}}>{a.name}</div>
                      {a.unlocked && a.date && (
                        <div style={{fontFamily:'var(--font-body)', fontSize:10, color:'#94A3B8', marginTop:2}}>{a.date}</div>
                      )}
                      {!a.unlocked && (
                        <div style={{position:'absolute', bottom:6, right:8, fontSize:12}}>🔒</div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Activity Tab */}
            {profileTab === 'activity' && (
              <>
                <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, marginBottom:12}}>Activity History ⚡</div>
                {allActivity.map((item,i) => {
                  const badgeColors: Record<string, {bg:string,color:string}> = {
                    warning: {bg:'#FEF3C7',color:'#D97706'},
                    primary: {bg:'#FDF2F2',color:'#BD1313'},
                    neutral: {bg:'#F1F5F9',color:'#64748B'},
                    success: {bg:'#DCFCE7',color:'#16A34A'}
                  };
                  const badgeStyle = badgeColors[item.variant] || badgeColors.neutral;
                  return (
                    <div
                      key={`activity-${item.title}-${item.time}`}
                      onClick={() => navigateToScreen(item.screen)}
                      style={{display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid #F8FAFF', cursor:'pointer', transition:'all 0.15s'}}>
                      <div style={{width:36, height:36, borderRadius:10, background:item.bg, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16}}>
                        {item.icon}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:'var(--font-body)', fontSize:13, fontWeight:500, color:'#0F172A'}}>{item.title}</div>
                        <div style={{fontFamily:'var(--font-body)', fontSize:10, color:'#94A3B8', marginTop:1}}>{item.time}</div>
                      </div>
                      <div style={{background:badgeStyle.bg, color:badgeStyle.color, fontFamily:'var(--font-body)', fontSize:11, fontWeight:700, borderRadius:9999, padding:'3px 10px'}}>
                        {item.badge}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Sidebar = () => {
    const navItems = [
      { icon: LayoutDashboard, label: 'Dashboard', screen: 'dashboard', color: '#BD1313' },
      { icon: FileText, label: 'Resume Builder', screen: 'resume', color: '#BD1313' },
      { icon: BookOpen, label: 'Test Preparation', screen: 'tests', color: '#D97706' },
      { icon: Mic, label: 'AI Interview', screen: 'interview', color: '#16A34A' },
      { icon: TrendingUp, label: 'Skill Tracker', screen: 'skills', color: '#2563EB' },
      { icon: Users, label: 'Expert Network', screen: 'experts', color: '#7C3AED' },
    ];

    return (
      <div className="w-16 h-screen bg-white border-r border-[#E2E8F0] flex flex-col items-center py-4 flex-shrink-0"
           style={{ zIndex: 100 }}>
        {/* Logo */}
        <img src="https://img.icons8.com/3d-fluency/100/graduation-cap.png" alt="Logo" 
             width="32" height="32" className="mb-6"
             style={{ filter: 'drop-shadow(0 2px 8px rgba(189,19,19,0.3))' }} />
        
        {/* Nav items */}
        <div className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeNav === item.screen;
            const Icon = item.icon;
            
            return (
              <div key={item.screen} className="relative group">
                <button
                  onClick={() => {
                    setActiveNav(item.screen);
                    navigateToScreen(item.screen);
                  }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: isActive ? `${item.color}26` : 'transparent'
                  }}>
                  <Icon size={20} color={isActive ? item.color : '#94A3B8'} />
                </button>
                
                {/* Tooltip */}
                <div className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-[#0F172A] text-white text-xs px-3 py-[6px] rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
                     style={{ fontFamily: 'var(--font-body)', zIndex: 200 }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom */}
        <div className="mt-auto flex flex-col items-center gap-3">
          <div className="relative group">
            <button
              onClick={() => {
                setActiveNav('credits');
                navigateToScreen('credits');
              }}
              className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#F1F5F9] transition-all"
              style={{
                background: screen === 'credits' ? '#FDF2F2' : 'transparent'
              }}>
              <CreditCard size={20} color={screen === 'credits' ? '#BD1313' : '#94A3B8'} />
            </button>

            {/* Tooltip */}
            <div className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-[#0F172A] text-white text-xs px-3 py-[6px] rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
                 style={{ fontFamily: 'var(--font-body)', zIndex: 200 }}>
              Credits & Billing
            </div>
          </div>

          <button
            onClick={() => {
              setActiveNav('settings');
              navigateToScreen('settings');
            }}
            className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#F1F5F9] transition-all"
            style={{
              background: screen === 'settings' ? '#FDF2F2' : 'transparent'
            }}>
            <Settings size={20} color={screen === 'settings' ? '#BD1313' : '#94A3B8'} />
          </button>
          <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="AIVision21" 
               height="20" className="opacity-50 mb-1" />
          <span className="text-[#94A3B8] text-[9px]" style={{ fontFamily: 'var(--font-body)' }}>v1.0</span>
        </div>
      </div>
    );
  };

  const TopBar = () => {
    const pageTitles: Record<string, string> = {
      dashboard: 'Dashboard',
      resume: 'Resume Builder',
      tests: 'Test Preparation',
      interview: 'AI Interview',
      skills: 'Skill Tracker',
      experts: 'Expert Network'
    };

    return (
      <div className="h-14 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between flex-shrink-0">
        {/* Left - Page title */}
        <h1 className="text-[#0F172A]" 
            style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>
          {pageTitles[screen] || 'Dashboard'}
        </h1>
        
        {/* Center - Search */}
        <div className="w-[360px] h-9 bg-[#F8FAFF] border border-[#E2E8F0] rounded-full px-[14px] flex items-center gap-2 cursor-pointer">
          <Search size={16} color="#94A3B8" />
          <input 
            type="text" 
            placeholder="Search modules, tests, experts..."
            className="flex-1 bg-transparent text-[#94A3B8] text-[13px] outline-none"
            style={{ fontFamily: 'var(--font-body)' }} />
          <div className="bg-[#F1F5F9] text-[#94A3B8] text-[10px] px-[6px] py-[2px] rounded"
               style={{ fontFamily: 'var(--font-body)' }}>
            ⌘K
          </div>
        </div>
        
        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          {/* Bell */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F8FAFF] transition-colors">
            <Bell size={20} color="#475569" />
            {unreadCount > 0 && (
              <div
                className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#BD1313] text-white flex items-center justify-center border-2 border-white"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 9,
                  fontWeight: 800
                }}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </button>
          
          {/* XP Pill */}
          <div onClick={() => setShowXPModal(true)} className="px-[14px] py-[6px] rounded-full text-white text-xs font-bold cursor-pointer"
               style={{
                 background: 'linear-gradient(135deg, #D97706, #B45309)',
                 fontFamily: 'var(--font-body)'
               }}>
            ⚡ {mockUser.xp.toLocaleString()} XP
          </div>
          
          {/* Avatar */}
          <div
            onClick={() => navigateToScreen('profile')}
            className="relative w-9 h-9 rounded-full border-2 border-white flex items-center justify-center shadow-[0_2px_8px_rgba(189,19,19,0.3)] cursor-pointer transition-all hover:shadow-[0_0_0_3px_rgba(189,19,19,0.2)]"
            style={{ background: 'linear-gradient(135deg, #BD1313, #7A0D0D)' }}>
            <span className="text-white text-[13px]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              {mockUser.avatar}
            </span>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#16A34A] rounded-full border-2 border-white" />
          </div>
        </div>
      </div>
    );
  };

  // Dashboard or other screens
  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen flex items-center justify-center" style={{ background: '#F1F5F9' }}>
        <div className="w-full max-w-[1440px] h-screen rounded-[24px] overflow-hidden flex shadow-[0_25px_80px_rgba(0,0,0,0.12)] bg-white">
          <Sidebar />
          
          <div className="flex-1 flex flex-col h-screen overflow-hidden"
               style={{ 
                 background: '#FAFAFA',
                 backgroundImage: 'url(https://i.ibb.co/GQM6xx2F/dot-grid-light.png)',
                 backgroundRepeat: 'repeat',
                 backgroundSize: '40px 40px'
               }}>
            <TopBar />
            
            {/* Content area - Dashboard or Module Placeholder */}
            {screen === 'dashboard' ? (
              <Dashboard mockUser={mockUser} StatCard={StatCard} CircularProgress={CircularProgress} showToast={showToast} setScreen={setScreen} />
            ) : screen.startsWith('resume') ? (
              <Resume screen={screen} setScreen={setScreen} CircularProgress={CircularProgress} showToast={showToast} showXPToast={showXPToast} />
            ) : screen.startsWith('tests') ? (
              <Tests screen={screen} setScreen={setScreen} CircularProgress={CircularProgress} showToast={showToast} showXPToast={showXPToast} />
            ) : screen.startsWith('interview') ? (
              <Interview screen={screen} setScreen={setScreen} CircularProgress={CircularProgress} showToast={showToast} showXPToast={showXPToast} />
            ) : screen === 'settings' ? (
              <SettingsScreen />
            ) : screen === 'help' ? (
              <HelpScreen />
            ) : screen === 'credits' ? (
              <CreditsScreen />
            ) : screen === 'profile' ? (
              <ProfileScreen />
            ) : screen === 'xp-store' ? (
              <XPStoreScreen />
            ) : (
              <div className="flex-1 overflow-hidden flex items-center justify-center screen-enter">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                       style={{ background: 'linear-gradient(135deg, #FDF2F2, #F5BFBF)' }}>
                    <LayoutDashboard size={36} color="#BD1313" />
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: '8px'
                  }}>
                    Module Coming Soon
                  </h2>
                  <p className="text-[#64748B] text-sm max-w-md mx-auto"
                     style={{ fontFamily: 'var(--font-body)' }}>
                    This module will be built in the next steps. All screens are properly connected and ready!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowNotifications(false)}
            style={{position:'fixed', inset:0, background:'rgba(15,23,42,0.3)', backdropFilter:'blur(2px)', zIndex:300}}
          />

          {/* Panel */}
          <div style={{position:'fixed', top:0, right:0, width:380, height:'100vh', background:'white', boxShadow:'-8px 0 32px rgba(0,0,0,0.12)', zIndex:301, display:'flex', flexDirection:'column', overflow:'hidden'}}>
            {/* Panel Header */}
            <div style={{background:'white', borderBottom:'1px solid #E2E8F0', padding:'0 20px', display:'flex', alignItems:'center', justifyContent:'space-between', height:56}}>
              <div style={{display:'flex', gap:10, alignItems:'center'}}>
                <Bell size={20} color="#0F172A" />
                <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'#0F172A'}}>Notifications</div>
                {unreadCount > 0 && (
                  <div style={{background:'#BD1313', color:'white', fontFamily:'var(--font-body)', fontSize:11, fontWeight:800, borderRadius:9999, padding:'2px 8px', minWidth:20, textAlign:'center'}}>
                    {unreadCount}
                  </div>
                )}
              </div>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <div onClick={() => markAllRead()} style={{fontFamily:'var(--font-body)', fontSize:12, color:'#BD1313', fontWeight:500, cursor:'pointer'}}>
                  Mark all read
                </div>
                <X size={20} color="#475569" style={{cursor:'pointer'}} onClick={() => setShowNotifications(false)} />
              </div>
            </div>

            {/* Filter Tabs */}
            <div style={{background:'#FAFAFA', borderBottom:'1px solid #E2E8F0', display:'flex', padding:'0 12px', gap:4, height:48}}>
              {[{id:'all',label:'All'},{id:'unread',label:'Unread'},{id:'tests',label:'Tests'},{id:'resume',label:'Resume'}].map(tab => (
                <div
                  key={tab.id}
                  onClick={() => setNotifFilter(tab.id)}
                  style={{height:48, padding:'0 12px', display:'flex', alignItems:'center', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, fontWeight:500, color:notifFilter===tab.id?'#BD1313':'#94A3B8', borderBottom:notifFilter===tab.id?'2px solid #BD1313':'2px solid transparent'}}>
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Notifications List */}
            <div style={{flex:1, overflowY:'auto'}}>
              {(() => {
                const filteredNotifs = notifications.filter(n => {
                  if (notifFilter==='all') return true;
                  if (notifFilter==='unread') return !n.read;
                  if (notifFilter==='tests') return n.type==='score';
                  if (notifFilter==='resume') return n.type==='resume';
                  return true;
                });

                if (filteredNotifs.length === 0) {
                  return (
                    <div style={{textAlign:'center', padding:'40px 20px'}}>
                      <img src="https://img.icons8.com/3d-fluency/100/bell.png" width={64} height={64} style={{display:'block', margin:'0 auto 12px', filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'}} />
                      <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'#0F172A'}}>All caught up! 🎉</div>
                      <div style={{fontFamily:'var(--font-body)', fontSize:14, color:'#94A3B8', marginTop:4}}>No notifications here</div>
                    </div>
                  );
                }

                return filteredNotifs.map(n => {
                  const bgMap: Record<string, string> = {
                    xp:'#FFFBEB', badge:'#FEFCE8', reminder:'#FFF1F2', score:'#F0FDF4',
                    streak:'#FFFBEB', tip:'#EFF6FF', expert:'#FAF5FF', resume:'#FFF1F2'
                  };
                  const routeMap: Record<string, string> = {
                    score:'tests', resume:'resume', xp:'profile', badge:'profile',
                    streak:'profile', reminder:'dashboard', tip:'dashboard', expert:'dashboard'
                  };

                  return (
                    <div
                      key={n.id}
                      onClick={() => {
                        markOneRead(n.id);
                        setShowNotifications(false);
                        setTimeout(() => navigateToScreen(routeMap[n.type] || 'dashboard'), 300);
                      }}
                      style={{padding:'12px 20px', background:!n.read?'#FFFBEB':'white', borderBottom:'1px solid #F8FAFF', display:'flex', gap:12, alignItems:'flex-start', cursor:'pointer', transition:'background 0.2s'}}>
                      <div style={{width:40, height:40, borderRadius:12, background:bgMap[n.type]||'#F1F5F9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0}}>
                        {n.icon}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                          <div style={{fontFamily:'var(--font-body)', fontSize:13, fontWeight:600, color:!n.read?'#0F172A':'#475569'}}>{n.title}</div>
                          <div style={{fontFamily:'var(--font-body)', fontSize:10, color:'#94A3B8'}}>{n.time}</div>
                        </div>
                        <div style={{fontFamily:'var(--font-body)', fontSize:12, color:'#64748B', marginTop:2, lineHeight:1.4}}>{n.body}</div>
                      </div>
                      {!n.read && (
                        <div style={{width:8, height:8, borderRadius:'50%', background:'#BD1313', marginTop:4, flexShrink:0}}/>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            {/* Panel Footer */}
            <div style={{background:'white', borderTop:'1px solid #E2E8F0', padding:'0 20px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64}}>
              <div
                onClick={() => {setShowNotifications(false); setTimeout(() => navigateToScreen('settings'), 300);}}
                style={{fontFamily:'var(--font-body)', fontSize:13, color:'#64748B', cursor:'pointer'}}>
                Notification Settings
              </div>
              <div
                onClick={() => {setNotifications([]); setTimeout(() => showToast("All notifications cleared ✓"), 0);}}
                style={{fontFamily:'var(--font-body)', fontSize:13, color:'#DC2626', fontWeight:500, cursor:'pointer'}}>
                Clear All
              </div>
            </div>
          </div>
        </>
      )}

      {/* XP Modal */}
      {showXPModal && (
        <>
          <div onClick={() => setShowXPModal(false)} style={{position:'fixed',inset:0,background:'rgba(15,23,42,0.5)',backdropFilter:'blur(4px)',zIndex:400}}/>
          <div style={{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'white',borderRadius:24,width:560,maxHeight:'85vh',overflowY:'auto',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',zIndex:401,padding:0}}>
            <div style={{background:'linear-gradient(135deg, #D97706, #B45309)',borderRadius:'24px 24px 0 0',padding:'0 24px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png" width={28} height={28} style={{filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',background:'transparent'}}/>
                <div style={{fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:'white'}}>XP & Rewards</div>
              </div>
              <X size={20} color="white" style={{cursor:'pointer'}} onClick={() => setShowXPModal(false)}/>
            </div>
            <div style={{padding:24}}>
              <div style={{background:'linear-gradient(135deg, #FFFBEB, #FEF3C7)',border:'1px solid #FCD34D',borderRadius:20,padding:20,marginBottom:20,textAlign:'center'}}>
                <img src="https://img.icons8.com/3d-fluency/100/medal.png" width={56} height={56} style={{display:'block',margin:'0 auto 12px',background:'transparent'}}/>
                <div style={{fontFamily:'var(--font-display)',fontSize:24,fontWeight:800,color:'#D97706'}}>🔥 Hustler</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:14,color:'#B45309',marginTop:4}}>Level 3 · 2,400 XP</div>
                <div style={{marginTop:10}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#B45309',marginBottom:4}}>600 XP to Elite</div>
                  <div style={{height:6,background:'rgba(217,119,6,0.2)',borderRadius:9999,overflow:'hidden'}}>
                    <div style={{width:'80%',height:'100%',background:'#D97706',borderRadius:9999}}/>
                  </div>
                </div>
              </div>
              <div style={{marginBottom:20}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:700,marginBottom:12}}>How to Earn XP ⚡</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                  {[
                    {action:'Daily Login',xp:'+10 XP',icon:'🌅'},
                    {action:'Complete Task',xp:'+20 XP',icon:'✅'},
                    {action:'Take Any Test',xp:'+50 XP',icon:'📝'},
                    {action:'Interview Session',xp:'+75 XP',icon:'🎤'},
                    {action:'Score 75%+',xp:'+100 XP',icon:'🎯'},
                    {action:'7-Day Streak',xp:'+200 XP',icon:'🔥'}
                  ].map(item => (
                    <div key={item.action} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'white',border:'1px solid #E2E8F0',borderRadius:10}}>
                      <span style={{fontSize:18}}>{item.icon}</span>
                      <span style={{fontFamily:'var(--font-body)',fontSize:12,color:'#475569',flex:1}}>{item.action}</span>
                      <span style={{fontFamily:'var(--font-body)',fontSize:12,fontWeight:700,color:'#D97706'}}>{item.xp}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => {setShowXPModal(false);navigateToScreen('xp-store');}} style={{width:'100%',height:44,background:'#D97706',color:'white',border:'none',fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,borderRadius:12,cursor:'pointer'}}>
                View XP Store →
              </button>
            </div>
          </div>
        </>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowLogoutModal(false)}
            style={{position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', backdropFilter:'blur(4px)', zIndex:500}}
          />

          {/* Modal */}
          <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'white', borderRadius:20, padding:'32px 28px', maxWidth:380, width:'90%', boxShadow:'0 20px 60px rgba(0,0,0,0.2)', zIndex:501, textAlign:'center'}}>
            <img
              src="https://img.icons8.com/3d-fluency/100/exit.png"
              width={64}
              height={64}
              style={{filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.15))', background:'transparent', display:'block', margin:'0 auto 16px'}}
            />
            <div style={{fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'#0F172A', marginBottom:8}}>
              Logout of EduVision?
            </div>
            <div style={{fontFamily:'var(--font-body)', fontSize:14, color:'#64748B', lineHeight:1.6, marginBottom:24}}>
              You will need to sign in again to access your progress and continue your journey.
            </div>
            <button
              onClick={() => {
                setShowLogoutModal(false);
                navigateToScreen('landing');
                setTimeout(() => showToast("Logged out successfully 👋"), 0);
              }}
              style={{width:'100%', height:48, background:'#DC2626', color:'white', border:'none', fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, borderRadius:12, cursor:'pointer', marginBottom:10}}>
              Logout
            </button>
            <button
              onClick={() => setShowLogoutModal(false)}
              style={{width:'100%', height:44, background:'transparent', border:'1.5px solid #E2E8F0', color:'#475569', fontFamily:'var(--font-body)', fontSize:14, fontWeight:600, borderRadius:12, cursor:'pointer'}}>
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Cart Panel */}
      {showCart && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15,23,42,0.4)',
              backdropFilter: 'blur(2px)',
              zIndex: 300
            }}
          />

          {/* Cart Panel */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: 400,
            height: '100vh',
            background: 'white',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
            zIndex: 301,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Cart Header */}
            <div style={{
              height: 56,
              background: 'white',
              borderBottom: '1px solid #E2E8F0',
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <ShoppingCart size={20} color="#0F172A" />
                <span style={{
                  fontFamily: 'Syne',
                  fontSize: 18, fontWeight: 700
                }}>Your Cart</span>
                {cartCount > 0 && (
                  <span style={{
                    background: '#FDF2F2',
                    color: '#BD1313',
                    fontFamily: 'var(--font-body)',
                    fontSize: 12, fontWeight: 700,
                    borderRadius: 9999,
                    padding: '2px 10px'
                  }}>{cartCount} items</span>
                )}
              </div>

              <button
                onClick={() => setShowCart(false)}
                style={{
                  width: 32, height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                <X size={18} color="#94A3B8" />
              </button>
            </div>

            {/* Cart Body */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 20px'
            }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <img src="https://img.icons8.com/3d-fluency/100/shopping-cart.png"
                       width={80} height={80}
                       style={{display:'block',
                               margin:'0 auto 16px',
                               background:'transparent'}}/>
                  <div style={{
                    fontFamily: 'Syne',
                    fontSize: 18, fontWeight: 700,
                    color: '#0F172A',
                    marginTop: 8
                  }}>Your cart is empty</div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14, color: '#94A3B8',
                    marginTop: 4
                  }}>Add credits to get started</div>

                  <button
                    onClick={() => setShowCart(false)}
                    style={{
                      height: 44,
                      background: '#BD1313',
                      color: 'white',
                      fontFamily: 'Syne',
                      fontSize: 14, fontWeight: 700,
                      borderRadius: 12,
                      marginTop: 20,
                      padding: '0 24px',
                      border: 'none',
                      cursor: 'pointer'
                    }}>Browse Credits →</button>
                </div>
              ) : (
                cart.map(item => {
                  const itemIcon = item.type === 'resume'
                    ? 'https://img.icons8.com/3d-fluency/100/resume.png'
                    : item.type === 'tests'
                    ? 'https://img.icons8.com/3d-fluency/100/bookmark-book.png'
                    : 'https://img.icons8.com/3d-fluency/100/microphone.png';

                  const itemBg = item.type === 'resume'
                    ? '#FFF1F2'
                    : item.type === 'tests'
                    ? '#FFFBEB'
                    : '#F0FDF4';

                  return (
                    <div key={item.id} style={{
                      background: 'white',
                      border: '1px solid #E2E8F0',
                      borderRadius: 14,
                      padding: '14px 16px',
                      marginBottom: 10
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'center'
                      }}>
                        <div style={{
                          width: 36, height: 36,
                          background: itemBg,
                          borderRadius: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <img src={itemIcon} width={20} height={20}
                               style={{background:'transparent'}}/>
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 13, fontWeight: 600,
                            color: '#0F172A'
                          }}>{item.label}</div>
                          <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 11, color: '#94A3B8',
                            marginTop: 1
                          }}>₹{item.price} per pack</div>
                        </div>

                        <div style={{
                          display: 'flex',
                          gap: 8,
                          alignItems: 'center'
                        }}>
                          <button
                            onClick={() => {
                              if (item.qty <= 1)
                                removeFromCart(item.id);
                              else
                                setCart(prev => prev.map((i: any) =>
                                  i.id===item.id
                                    ? {...i, qty: i.qty-1}
                                    : i));
                            }}
                            style={{
                              width: 24, height: 24,
                              borderRadius: '50%',
                              background: '#F1F5F9',
                              border: 'none',
                              cursor: 'pointer',
                              fontFamily: 'var(--font-body)',
                              fontSize: 14, fontWeight: 600,
                              color: '#475569',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>-</button>

                          <span style={{
                            fontFamily: 'Syne',
                            fontSize: 14, fontWeight: 700,
                            minWidth: 20,
                            textAlign: 'center'
                          }}>{item.qty}</span>

                          <button
                            onClick={() => setCart(prev =>
                              prev.map((i: any) => i.id===item.id
                                ? {...i, qty: i.qty+1} : i))}
                            style={{
                              width: 24, height: 24,
                              borderRadius: '50%',
                              background: '#F1F5F9',
                              border: 'none',
                              cursor: 'pointer',
                              fontFamily: 'var(--font-body)',
                              fontSize: 14, fontWeight: 600,
                              color: '#475569',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>+</button>
                        </div>

                        <div style={{
                          fontFamily: 'Syne',
                          fontSize: 15, fontWeight: 700,
                          color: '#BD1313',
                          minWidth: 60,
                          textAlign: 'right'
                        }}>₹{item.price * item.qty}</div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 4
                          }}>
                          <X size={16} color="#DC2626" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div style={{
                background: 'white',
                borderTop: '1px solid #E2E8F0',
                padding: '16px 20px'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  marginBottom: 16
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13, color: '#475569'
                    }}>Subtotal</span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13, fontWeight: 600,
                      color: '#0F172A'
                    }}>₹{cartTotal}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13, color: '#475569'
                    }}>GST (18%)</span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13, fontWeight: 600,
                      color: '#0F172A'
                    }}>₹{Math.round(cartTotal * 0.18)}</span>
                  </div>

                  <div style={{
                    height: 1,
                    background: '#E2E8F0',
                    margin: '4px 0'
                  }}></div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontFamily: 'Syne',
                      fontSize: 16, fontWeight: 700,
                      color: '#0F172A'
                    }}>Total</span>
                    <span style={{
                      fontFamily: 'Syne',
                      fontSize: 18, fontWeight: 800,
                      color: '#BD1313'
                    }}>₹{Math.round(cartTotal * 1.18)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowCart(false);
                    setOrderSuccess(true);
                    // Update wallet with purchased credits
                    Object.keys(wallet).forEach(key => {
                      const typeItems = cart.filter(
                        (i: any) => i.type === key);
                      if (typeItems.length > 0) {
                        const totalCredits = typeItems
                          .reduce((sum: number, i: any) =>
                            sum + (i.credits * i.qty), 0);
                        setWallet(prev => ({
                          ...prev,
                          [key]: prev[key as keyof typeof prev] + totalCredits
                        }));
                      }
                    });
                    setCart([]);
                    setTimeout(() => showToast(
                      "Payment successful! Credits added 🎉"), 0);
                    setTimeout(() => showXPToast(
                      "+20 XP 🎉"), 200);
                  }}
                  style={{
                    width: '100%',
                    height: 52,
                    background: 'linear-gradient(135deg, #BD1313, #7A0D0D)',
                    color: 'white',
                    border: 'none',
                    fontFamily: 'Syne',
                    fontSize: 16, fontWeight: 700,
                    borderRadius: 12,
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(189,19,19,0.35)',
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    🔒 Pay ₹{Math.round(cartTotal * 1.18)}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.75)'
                  }}>via Razorpay</div>
                </button>

                <div style={{
                  display: 'flex',
                  gap: 6,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Lock size={12} color="#94A3B8" />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11, color: '#94A3B8'
                  }}>SSL encrypted · Powered by Razorpay</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Order Success Modal */}
      {orderSuccess && (
        <>
          {/* Backdrop */}
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 400
          }} />

          {/* Modal */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'white',
            borderRadius: 24,
            padding: '32px 28px',
            maxWidth: 420,
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            zIndex: 401,
            textAlign: 'center'
          }}>
            <img src="https://img.icons8.com/3d-fluency/100/ok.png"
                 width={80} height={80}
                 style={{
                   display:'block', margin:'0 auto 16px',
                   background:'transparent',
                   filter:'drop-shadow(0 4px 16px rgba(22,163,74,0.3))'
                 }}/>

            <div style={{
              fontFamily: 'Syne',
              fontSize: 26, fontWeight: 800,
              color: '#0F172A',
              marginBottom: 8
            }}>Payment Successful! 🎉</div>

            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14, color: '#64748B',
              lineHeight: 1.6,
              marginBottom: 20
            }}>Your credits have been added to your wallet and are ready to use immediately.</div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
              marginBottom: 24
            }}>
              {[
                {key:'resume', label:'Resume', icon:'https://img.icons8.com/3d-fluency/100/resume.png', color:'#BD1313', bg:'#FFF1F2', border:'#F5BFBF'},
                {key:'tests', label:'Test', icon:'https://img.icons8.com/3d-fluency/100/bookmark-book.png', color:'#D97706', bg:'#FFFBEB', border:'#FCD34D'},
                {key:'interview', label:'Interview', icon:'https://img.icons8.com/3d-fluency/100/microphone.png', color:'#16A34A', bg:'#F0FDF4', border:'#86EFAC'}
              ].map(card => (
                <div key={card.key} style={{
                  background: card.bg,
                  border: `1px solid ${card.border}`,
                  borderRadius: 9999,
                  padding: '6px 14px',
                  display: 'flex',
                  gap: 6,
                  alignItems: 'center'
                }}>
                  <img src={card.icon} width={14} height={14}
                       style={{background:'transparent'}}/>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12, fontWeight: 700,
                    color: card.color
                  }}>{(wallet as any)[card.key]} {card.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setOrderSuccess(false);
                setScreen('dashboard');
              }}
              style={{
                width: '100%',
                height: 48,
                background: '#BD1313',
                color: 'white',
                fontFamily: 'Syne',
                fontSize: 15, fontWeight: 700,
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                marginBottom: 10
              }}>Awesome! Let's get started →</button>

            <button
              onClick={() => setOrderSuccess(false)}
              style={{
                width: '100%',
                height: 40,
                background: 'transparent',
                color: '#94A3B8',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                border: 'none',
                cursor: 'pointer'
              }}>Stay on Billing</button>
          </div>
        </>
      )}
    </>
  );
}

return App;
})();
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(__App));
