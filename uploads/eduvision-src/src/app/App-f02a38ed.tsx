import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Mic,
  TrendingUp,
  Users,
  Settings,
  Search,
  Bell,
  ChevronLeft,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Key,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  MapPin,
  Check,
  X,
  ChevronRight,
  Plus,
  HelpCircle,
  ChevronDown,
  CreditCard,
  ShoppingCart,
  Download,
  Lock
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Resume } from './components/Resume';
import { Tests } from './components/TestsAll';
import { Interview } from './components/Interview';

// Recharts imports for dashboard
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

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

export default function App() {
  const [screen, setScreen] = useState('loading');
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
