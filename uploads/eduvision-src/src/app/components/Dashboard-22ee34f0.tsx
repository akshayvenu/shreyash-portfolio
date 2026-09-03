import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
  PieChart, Pie, Cell
} from 'recharts';

interface DashboardProps {
  mockUser: any;
  StatCard: any;
  CircularProgress: any;
  showToast: (message: string) => void;
  setScreen: (screen: string) => void;
}

export function Dashboard({ mockUser, StatCard, CircularProgress, showToast, setScreen }: DashboardProps) {
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