Continue building EduVision.
Read system guidelines fully before writing any code.
Do NOT rebuild any existing screens.
Only ADD these 4 screens:
  1. Settings
  2. Help & Support
  3. Profile Page
  4. Notifications Panel

All existing screens must remain intact.
Every single button must be functional.
No dead buttons anywhere.

=============================================================
STATE — ADD AT TOP OF FILE IF NOT PRESENT
=============================================================

const [showNotifications, setShowNotifications] =
  useState(false);

const [notifications, setNotifications] = useState([
  {id:1, type:'xp', icon:'⚡',
   title:'You earned +50 XP!',
   body:'Completed Mathematics Test successfully',
   time:'2h ago', read:false},
  {id:2, type:'badge', icon:'🏅',
   title:'New badge unlocked!',
   body:'You earned the "First Test" badge',
   time:'3h ago', read:false},
  {id:3, type:'reminder', icon:'📋',
   title:'Daily reminder',
   body:'Complete your resume skills section',
   time:'5h ago', read:true},
  {id:4, type:'score', icon:'📊',
   title:'Score improved!',
   body:'Your avg score went from 68% to 74%',
   time:'Yesterday', read:true},
  {id:5, type:'streak', icon:'🔥',
   title:'7-day streak!',
   body:'Keep practicing — you are on fire!',
   time:'Yesterday', read:true},
  {id:6, type:'tip', icon:'💡',
   title:'Study tip',
   body:'Students who practice daily score 40% better',
   time:'2 days ago', read:true},
  {id:7, type:'resume', icon:'📄',
   title:'Resume tip',
   body:'Add projects to boost strength to 80%',
   time:'3 days ago', read:true},
  {id:8, type:'expert', icon:'👥',
   title:'Expert available',
   body:'Priya Mehta (Google SWE) has open slots',
   time:'4 days ago', read:true}
]);

const unreadCount =
  notifications.filter(n => !n.read).length;

const markAllRead = () =>
  setNotifications(prev =>
    prev.map(n => ({...n, read:true})));

const markOneRead = (id) =>
  setNotifications(prev =>
    prev.map(n => n.id===id ? {...n, read:true} : n));

const deleteNotification = (id) =>
  setNotifications(prev =>
    prev.filter(n => n.id !== id));

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

const toggleSetting = (section, key) =>
  setSettingsData(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]: !prev[section][key]
    }
  }));

const [activeSettingsTab, setActiveSettingsTab] =
  useState('account');

const [activeHelpTab, setActiveHelpTab] =
  useState('faq');

const [expandedFaq, setExpandedFaq] =
  useState(null);

const [faqFilter, setFaqFilter] =
  useState('All');

const [searchQuery, setSearchQuery] =
  useState('');

const [ticketSubmitted, setTicketSubmitted] =
  useState(false);

const [ticketText, setTicketText] =
  useState('');

const [profileTab, setProfileTab] =
  useState('overview');

const [notifFilter, setNotifFilter] =
  useState('all');

const [showLogoutModal, setShowLogoutModal] =
  useState(false);

=============================================================
FAQ DATA — ADD AT TOP OF FILE
=============================================================

const faqs = [
  {id:'faq-1', category:'Tests',
   q:'How do I create and take a practice test?',
   a:'Go to Test Preparation from the sidebar. Click Create New Test, choose your subject, difficulty, and question count, then click Start Test. You can review your answers and score immediately after submission.'},
  {id:'faq-2', category:'Tests',
   q:'Can I retake a test after completion?',
   a:'Yes! On the Score Overview screen, click Retake Test to practice the same configuration again. You can take unlimited tests on any subject.'},
  {id:'faq-3', category:'Resume',
   q:'How do I build my resume on EduVision?',
   a:'Go to Resume Builder from the sidebar. Choose a template, then fill in each section — Personal Info, Education, Experience, Skills, Projects, and Summary. Your resume strength score updates in real time as you add content.'},
  {id:'faq-4', category:'Resume',
   q:'Can I upload my existing resume?',
   a:'Yes! On the Resume Builder home screen, click Upload Resume. We support PDF and DOC formats up to 5MB. Our AI will extract your information automatically.'},
  {id:'faq-5', category:'Interview',
   q:'How does the AI Interview work?',
   a:'Aria, our AI interviewer, asks you real interview questions based on your target role. Type your answers, and Aria gives you immediate feedback. After the session, you receive a detailed score breakdown and improvement tips.'},
  {id:'faq-6', category:'Interview',
   q:'What types of interviews can I practice?',
   a:'EduVision offers HR Interviews, Technical Interviews, Managerial Round practice, and Resume Walkthrough sessions. Start with HR Interview if you are a fresher.'},
  {id:'faq-7', category:'XP',
   q:'How does the XP system work?',
   a:'You earn XP by completing activities: +10 for daily login, +50 for taking a test, +75 for an interview session, +100 bonus for scoring 75% or more, and +200 for a 7-day streak. Level up from Starter to Champion as you earn more XP.'},
  {id:'faq-8', category:'Account',
   q:'How do I change my target role?',
   a:'Go to Settings from the sidebar bottom, then update your Target Role field under the Account tab. Your personalized recommendations will update automatically.'}
];

=============================================================
UPDATE TOP BAR — WIRE BELL + AVATAR
=============================================================

Find the existing top bar bell icon button.
Replace its onClick with:
  onClick: () => setShowNotifications(true)

Add notification badge on bell:
  position: relative on the button

  Unread badge (only when unreadCount > 0):
    position: absolute
    top: 4px, right: 4px
    width: 16px, height: 16px
    borderRadius: '50%'
    background: '#BD1313'
    color: 'white'
    fontSize: 9, fontWeight: 800
    fontFamily: 'var(--font-body)'
    display: 'flex', alignItems: 'center'
    justifyContent: 'center'
    border: '2px solid white'
    "{unreadCount > 9 ? '9+' : unreadCount}"

Find the existing avatar circle in top bar.
Add onClick: () => setScreen('profile')
Add cursor: 'pointer'
Add transition: 'all 0.2s'
Hover: boxShadow '0 0 0 3px rgba(189,19,19,0.2)'

=============================================================
UPDATE SIDEBAR — WIRE SETTINGS ICON
=============================================================

Find the Settings icon at the bottom of the sidebar.
Replace its onClick with: () => setScreen('settings')

Show active state when screen === 'settings':
  bg: '#FDF2F2', icon color: '#BD1313'

=============================================================
REUSABLE TOGGLE SWITCH COMPONENT
=============================================================

Build this component — used in Settings throughout:

const ToggleSwitch = ({ value, onChange }) => (
  <div
    onClick={onChange}
    style={{
      width: 44, height: 24,
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
      width: 20, height: 20,
      borderRadius: '50%',
      background: 'white',
      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      transition: 'left 0.3s'
    }}/>
  </div>
);

=============================================================
REUSABLE SETTINGS ROW COMPONENT
=============================================================

const SettingsRow = ({
  title, subtitle, children
}) => (
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
        fontSize: 14, fontWeight: 600,
        color: '#0F172A'
      }}>{title}</div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 12, color: '#94A3B8',
        marginTop: 1
      }}>{subtitle}</div>
    </div>
    {children}
  </div>
);

=============================================================
SCREEN 1 — SETTINGS
=============================================================

screen: 'settings'
animation: screenEnter 280ms ease-out both

FULL STRUCTURE:
  display: flex
  flexDirection: column
  height: '100%'
  overflow: 'hidden'

HEADER (56px, flex-shrink 0):
  background: white
  borderBottom: '1px solid #E2E8F0'
  padding: '0 24px'
  display: flex, alignItems: center
  justifyContent: space-between

  LEFT (display flex, gap 12px, align center):
    Icon circle (36px, bg #FDF2F2, radius 10px,
                 display flex, center):
      Settings icon lucide 20px #BD1313

    div:
      "Settings ⚙️"
      Syne 20px weight 700 #0F172A
      "Manage your account and preferences"
      Plus Jakarta Sans 12px #94A3B8

  RIGHT:
    "Save Changes" button:
      bg: '#BD1313', color: 'white'
      border: 'none', borderRadius: 8
      height: 36, padding: '0 16px'
      fontFamily: 'var(--font-body)'
      fontSize: 13, fontWeight: 600
      cursor: 'pointer'
      onClick: () => setTimeout(() =>
        showToast("Settings saved ✓"), 0)

BODY (flex 1, display grid, overflow hidden):
  gridTemplateColumns: '220px 1fr'

LEFT NAV (220px, bg #FAFAFA,
           borderRight '1px solid #E2E8F0',
           overflowY auto, padding '16px 12px'):

  const settingsTabs = [
    {id:'account', label:'Account',
     desc:'Profile & personal info'},
    {id:'notifications', label:'Notifications',
     desc:'Alerts & reminders'},
    {id:'appearance', label:'Appearance',
     desc:'Theme & display'},
    {id:'privacy', label:'Privacy',
     desc:'Data & visibility'},
    {id:'modules', label:'Modules',
     desc:'Active modules'}
  ];

  {settingsTabs.map(tab => (
    <div
      onClick={() => setActiveSettingsTab(tab.id)}
      style={{
        borderRadius: 12,
        padding: '10px 12px',
        marginBottom: 4,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: activeSettingsTab === tab.id
          ? 'white' : 'transparent',
        boxShadow: activeSettingsTab === tab.id
          ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.2s'
      }}>
      <div style={{flex:1}}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13, fontWeight: 600,
          color: activeSettingsTab === tab.id
            ? '#BD1313' : '#0F172A'
        }}>{tab.label}</div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10, color: '#94A3B8'
        }}>{tab.desc}</div>
      </div>
    </div>
  ))}

  Divider (1px #E2E8F0, my 8px)

  Help link:
    Same nav item style
    label: "Help & Support"
    desc: "FAQs & contact"
    onClick: () => setScreen('help')

  Logout link:
    Same style but color #DC2626
    label: "Logout"
    desc: "Sign out of account"
    onClick: () => setShowLogoutModal(true)

SETTINGS CONTENT
(flex 1, overflowY auto, padding '24px'):

── ACCOUNT TAB ──────────────────────────────────────────────

{activeSettingsTab === 'account' && (
  <>
    PROFILE CARD:
      bg white, border 1px #E2E8F0
      borderRadius 20px, padding 24px
      marginBottom 16px

      TOP ROW (display flex, gap 16px, align center, mb 20px):
        Avatar (72px circle):
          bg: 'linear-gradient(135deg,#BD1313,#7A0D0D)'
          color white, Syne 24px weight 800
          borderRadius '50%', border '3px solid white'
          boxShadow '0 4px 16px rgba(189,19,19,0.3)'
          width 72px, height 72px
          display flex, center
          "RS"

        Right div:
          "Rahul Sharma" Syne 20px weight 700 #0F172A
          "rahul@vit.edu" font-body 13px #94A3B8

          "🔥 Hustler · 2,400 XP" chip:
            bg #FEF3C7, color #D97706, border #FCD34D
            font-body 12px weight 700, radius 9999px
            padding '4px 12px', display inline-block
            marginTop 6px

          "Change Photo →" link:
            font-body 12px #BD1313 weight 500
            cursor pointer, display block, marginTop 6px
            onClick: () => setTimeout(() =>
              showToast("Photo upload coming soon!"), 0)

      FORM GRID (display grid,
                  gridTemplateColumns '1fr 1fr', gap 14px):

        Each field div:
          Label: font-body 10px uppercase #94A3B8, mb 4px
          Input:
            height 44px, width '100%', padding '0 12px'
            border '1.5px solid #E2E8F0', borderRadius 8px
            fontFamily 'var(--font-body)', fontSize 14px
            color '#0F172A', outline 'none'
            boxSizing 'border-box'
            onFocus: border #BD1313, shadow brand glow

        Fields:
          "FULL NAME" / defaultValue "Rahul Sharma"
          "EMAIL ADDRESS" / defaultValue "rahul@vit.edu"
          "PHONE NUMBER" / defaultValue "+91 98765 43210"
          "COLLEGE" / defaultValue "VIT Vellore"
          "YEAR OF STUDY" / defaultValue "Final Year"
          "TARGET ROLE" / defaultValue "Software Engineer"

    XP CARD (bg #FFFBEB, border #FCD34D,
              borderRadius 20px, padding 20px, mb 16px):

      Row (display flex, justify space-between, align center):
        Left:
          "⚡ XP & LEVEL"
          font-body 10px uppercase #D97706, mb 4px
          "2,400" Syne 26px weight 800 #D97706

        Right: Medal img (40px, float animation)

      Level badge (mt 8px, display inline-block):
        "🔥 Hustler · Level 3"
        bg #D97706, color white
        font-body 12px weight 700, radius 9999px
        padding '3px 14px'

      Progress (mt 10px):
        "600 XP to Elite"
        font-body 11px #B45309, mb 5px
        Bar: h6px, track rgba(217,119,6,0.2)
          fill #D97706 at 80%, radius 9999px

    DANGER ZONE (bg #FFF1F2, border #FECACA,
                  borderRadius 20px, padding 20px):

      "⚠️ Danger Zone" Syne 15px weight 700 #DC2626, mb 12px

      Row 1 (display flex, justify space-between, align center,
               pb 12px, borderBottom '1px solid #FEF2F2'):
        Left:
          "Reset Progress" font-body 14px weight 600 #0F172A
          "Clears all test history and XP"
          font-body 12px #94A3B8
        Button "Reset":
          bg white, border '1.5px solid #FECACA'
          color #DC2626, font-body 12px weight 600
          radius 8px, padding '6px 14px', cursor pointer
          onClick: () => setTimeout(() =>
            showToast("Are you sure? This cannot be undone!"), 0)

      Row 2 (display flex, justify space-between, align center,
               pt 12px):
        "Delete Account" + "Permanently delete account"
        Button "Delete":
          same style as Reset
          onClick: () => setTimeout(() =>
            showToast("Contact support to delete account"), 0)
  </>
)}

── NOTIFICATIONS TAB ────────────────────────────────────────

{activeSettingsTab === 'notifications' && (
  <>
    "Notification Preferences"
    Syne 16px weight 700 #0F172A, mb 16px

    GROUP LABEL (mb 8px):
      "LEARNING REMINDERS"
      font-body 10px uppercase #94A3B8

    <SettingsRow
      title="Test Reminders"
      subtitle="Daily practice reminders">
      <ToggleSwitch
        value={settingsData.notifications.testReminders}
        onChange={() => toggleSetting('notifications','testReminders')}
      />
    </SettingsRow>

    <SettingsRow
      title="Daily Goal Alerts"
      subtitle="Goals and achievement alerts">
      <ToggleSwitch
        value={settingsData.notifications.dailyGoal}
        onChange={() => toggleSetting('notifications','dailyGoal')}
      />
    </SettingsRow>

    <SettingsRow
      title="Streak Alerts"
      subtitle="Streak milestone celebrations">
      <ToggleSwitch
        value={settingsData.notifications.streakAlerts}
        onChange={() => toggleSetting('notifications','streakAlerts')}
      />
    </SettingsRow>

    GROUP LABEL (mt 16px, mb 8px):
      "ACHIEVEMENTS & PROGRESS"

    <SettingsRow
      title="Badge Alerts"
      subtitle="When you unlock new badges">
      <ToggleSwitch
        value={settingsData.notifications.badgeAlerts}
        onChange={() => toggleSetting('notifications','badgeAlerts')}
      />
    </SettingsRow>

    <SettingsRow
      title="Weekly Report"
      subtitle="Weekly performance summary">
      <ToggleSwitch
        value={settingsData.notifications.weeklyReport}
        onChange={() => toggleSetting('notifications','weeklyReport')}
      />
    </SettingsRow>

    <SettingsRow
      title="Expert Updates"
      subtitle="New expert sessions available">
      <ToggleSwitch
        value={settingsData.notifications.expertUpdates}
        onChange={() => toggleSetting('notifications','expertUpdates')}
      />
    </SettingsRow>
  </>
)}

── APPEARANCE TAB ───────────────────────────────────────────

{activeSettingsTab === 'appearance' && (
  <>
    "Display Preferences"
    Syne 16px weight 700 #0F172A, mb 16px

    DARK MODE CARD (special larger card):
      bg: settingsData.appearance.darkMode
        ? '#1E293B' : 'white'
      border: settingsData.appearance.darkMode
        ? '1px solid #334155' : '1px solid #E2E8F0'
      borderRadius 16px, padding 20px, mb 12px
      display flex, alignItems center, gap 16px
      transition 'all 0.3s'

      <img
        src="https://img.icons8.com/3d-fluency/100/crescent-moon.png"
        width={40} height={40}
        style={{flexShrink:0,
                filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'}}
      />

      div (flex 1):
        "Dark Mode"
        Syne 16px weight 700
        color: settingsData.appearance.darkMode
          ? 'white' : '#0F172A'
        "Switch between light and dark theme"
        font-body 13px
        color: settingsData.appearance.darkMode
          ? '#94A3B8' : '#64748B'

      <ToggleSwitch
        value={settingsData.appearance.darkMode}
        onChange={() => {
          toggleSetting('appearance','darkMode');
          setTimeout(() => showToast(
            settingsData.appearance.darkMode
              ? "Light mode enabled ☀️"
              : "Dark mode enabled 🌙"
          ), 0);
        }}
      />

    <SettingsRow
      title="Compact View"
      subtitle="Reduce spacing in lists and cards">
      <ToggleSwitch
        value={settingsData.appearance.compactView}
        onChange={() => toggleSetting('appearance','compactView')}
      />
    </SettingsRow>

    <SettingsRow
      title="Animations"
      subtitle="Enable smooth transitions and effects">
      <ToggleSwitch
        value={settingsData.appearance.animations}
        onChange={() => toggleSetting('appearance','animations')}
      />
    </SettingsRow>

    FONT SIZE (mt 16px):
      "TEXT SIZE" font-body 10px uppercase #94A3B8, mb 8px

      display flex, gap 8px
      {['Small','Medium','Large'].map(size => (
        <button
          onClick={() => setSettingsData({
            ...settingsData,
            appearance: {
              ...settingsData.appearance,
              fontSize: size.toLowerCase()
            }
          })}
          style={{
            height: 36, padding: '0 20px',
            borderRadius: 9999,
            border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 13, fontWeight: 600,
            background:
              settingsData.appearance.fontSize
                === size.toLowerCase()
                ? '#BD1313' : '#F1F5F9',
            color:
              settingsData.appearance.fontSize
                === size.toLowerCase()
                ? 'white' : '#475569',
            transition: 'all 0.2s'
          }}>
          {size}
        </button>
      ))}
  </>
)}

── PRIVACY TAB ──────────────────────────────────────────────

{activeSettingsTab === 'privacy' && (
  <>
    "Privacy Settings"
    Syne 16px weight 700 #0F172A, mb 16px

    <SettingsRow
      title="Show on Leaderboard"
      subtitle="Let others see your rank">
      <ToggleSwitch
        value={settingsData.privacy.showOnLeaderboard}
        onChange={() =>
          toggleSetting('privacy','showOnLeaderboard')}
      />
    </SettingsRow>

    <SettingsRow
      title="Share Progress"
      subtitle="Share achievements publicly">
      <ToggleSwitch
        value={settingsData.privacy.shareProgress}
        onChange={() =>
          toggleSetting('privacy','shareProgress')}
      />
    </SettingsRow>

    <SettingsRow
      title="Public Profile"
      subtitle="Anyone can view your profile">
      <ToggleSwitch
        value={settingsData.privacy.publicProfile}
        onChange={() =>
          toggleSetting('privacy','publicProfile')}
      />
    </SettingsRow>

    "Your Data" Syne 15px weight 700, mt 20px, mb 12px

    ROW: Download My Data
      bg white, border 1px #E2E8F0, radius 12px
      h52, padding '0 16px', mb 8px
      display flex, justify space-between, align center
      Left: "Download My Data" 14px weight 600
            "Get a copy of all your data" 12px #94A3B8
      Button: "Download →" ghost #BD1313 12px weight 600
        cursor pointer
        onClick: () => setTimeout(() =>
          showToast("Data export requested 📥"), 0)

    ROW: Clear Cache
      Same style
      "Clear Cache" + "Free up space"
      Button: "Clear →" ghost #D97706
        onClick: () => setTimeout(() =>
          showToast("Cache cleared ✓"), 0)
  </>
)}

── MODULES TAB ──────────────────────────────────────────────

{activeSettingsTab === 'modules' && (
  <>
    "Active Modules" Syne 16px weight 700, mb 4px
    "Toggle which modules appear in your sidebar"
    font-body 13px #94A3B8, mb 16px

    const modules = [
      {name:'Resume Builder',
       desc:'Build and improve your resume',
       icon:'https://img.icons8.com/3d-fluency/100/resume.png',
       color:'#BD1313', bg:'#FFF1F2'},
      {name:'Test Preparation',
       desc:'Practice mock tests with AI',
       icon:'https://img.icons8.com/3d-fluency/100/bookmark-book.png',
       color:'#D97706', bg:'#FFFBEB'},
      {name:'AI Interview',
       desc:'Practice interviews with Aria',
       icon:'https://img.icons8.com/3d-fluency/100/microphone.png',
       color:'#16A34A', bg:'#F0FDF4'},
      {name:'Skill Tracker',
       desc:'Track skills and certifications',
       icon:'https://img.icons8.com/3d-fluency/100/bar-chart.png',
       color:'#2563EB', bg:'#EFF6FF'},
      {name:'Expert Network',
       desc:'Connect with industry mentors',
       icon:'https://img.icons8.com/3d-fluency/100/conference-call.png',
       color:'#7C3AED', bg:'#FAF5FF'}
    ];

    const [moduleToggles, setModuleToggles] =
      useState({
        'Resume Builder': true,
        'Test Preparation': true,
        'AI Interview': true,
        'Skill Tracker': true,
        'Expert Network': true
      });

    {modules.map(mod => (
      <div style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: 14, padding: '0 16px',
        height: 72, display: 'flex',
        alignItems: 'center', gap: 14,
        marginBottom: 8
      }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: 12,
          background: mod.bg,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <img src={mod.icon} width={22} height={22}
               style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:14, fontWeight:600, color:'#0F172A'
          }}>{mod.name}</div>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:12, color:'#94A3B8'
          }}>{mod.desc}</div>
        </div>
        <ToggleSwitch
          value={moduleToggles[mod.name]}
          onChange={() => setModuleToggles(prev => ({
            ...prev,
            [mod.name]: !prev[mod.name]
          }))}
        />
      </div>
    ))}
  </>
)}

── LOGOUT MODAL ─────────────────────────────────────────────

{showLogoutModal && (
  <>
    Backdrop:
      position fixed, inset 0
      bg rgba(15,23,42,0.5)
      backdropFilter blur(4px)
      zIndex 500
      onClick: () => setShowLogoutModal(false)

    Modal card:
      position fixed, top '50%', left '50%'
      transform 'translate(-50%,-50%)'
      bg white, borderRadius 20px
      padding 32px 28px
      maxWidth 380px, width '90%'
      boxShadow '0 20px 60px rgba(0,0,0,0.2)'
      zIndex 501, textAlign center

      <img
        src="https://img.icons8.com/3d-fluency/100/exit.png"
        width={64} height={64}
        style={{
          filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
          animation:'float 3s ease-in-out infinite',
          display:'block', margin:'0 auto 16px'
        }}
      />

      "Logout of EduVision?"
      Syne 22px weight 800 #0F172A, mb 8px

      "You will need to sign in again to access
       your progress and continue your journey."
      font-body 14px #64748B, lineHeight 1.6, mb 24px

      Logout button (full width h48, mb 10px):
        bg #DC2626, color white, border none
        Syne 15px weight 700, borderRadius 12px
        cursor pointer
        onClick: () => {
          setShowLogoutModal(false);
          setScreen('landing');
          setTimeout(() =>
            showToast("Logged out successfully 👋"), 0);
        }

      Cancel button (full width h44):
        bg transparent
        border '1.5px solid #E2E8F0', color '#475569'
        font-body 14px weight 600, borderRadius 12px
        cursor pointer
        onClick: () => setShowLogoutModal(false)
  </>
)}

=============================================================
SCREEN 2 — HELP & SUPPORT
=============================================================

screen: 'help'
animation: screenEnter 280ms ease-out both

STRUCTURE:
  display flex, flexDirection column
  height '100%', overflow hidden

HEADER (56px):
  bg white, borderBottom '1px solid #E2E8F0'
  padding '0 24px'
  display flex, alignItems center
  justifyContent space-between

  LEFT (display flex, gap 12px, align center):
    Icon circle (36px, bg #FDF2F2, radius 10px):
      HelpCircle icon lucide 20px #BD1313

    div:
      "Help & Support 💬" Syne 20px weight 700 #0F172A
      "We are here to help you succeed"
      font-body 12px #94A3B8

  RIGHT: "← Settings" ghost button:
    font-body 13px #94A3B8 weight 500
    cursor pointer
    onClick: () => setScreen('settings')

CONTENT (flex 1, overflowY auto, padding '20px 24px'):
  maxWidth 800px, margin '0 auto', width '100%'

  SEARCH BAR:
    bg white, border '1.5px solid #E2E8F0'
    borderRadius 14px, padding '14px 16px'
    display flex, alignItems center, gap 12px
    mb 20px
    boxShadow '0 2px 8px rgba(0,0,0,0.06)'

    Search icon lucide 20px #94A3B8, flexShrink 0

    Input:
      flex 1, border none, outline none
      fontFamily 'var(--font-body)'
      fontSize 15px, color '#0F172A'
      placeholder "Search help topics..."
      value {searchQuery}
      onChange: (e) => setSearchQuery(e.target.value)

    {searchQuery && (
      X icon lucide 18px #94A3B8
      cursor pointer
      onClick: () => setSearchQuery('')
    )}

  QUICK LINKS:
    "Quick Help 🚀" Syne 14px weight 700, mb 10px

    display grid, gridTemplateColumns 'repeat(4,1fr)'
    gap 10px, mb 20px

    const quickLinks = [
      {icon:'📝', label:'How to take a test',
       faqId:'faq-1'},
      {icon:'📄', label:'Build my resume',
       faqId:'faq-3'},
      {icon:'🎤', label:'AI Interview tips',
       faqId:'faq-5'},
      {icon:'💬', label:'Contact support',
       tab:'contact'}
    ];

    {quickLinks.map(link => (
      <div
        onClick={() => {
          if (link.faqId) {
            setExpandedFaq(link.faqId);
            setActiveHelpTab('faq');
          } else {
            setActiveHelpTab('contact');
          }
        }}
        style={{
          bg: 'white', border: '1px solid #E2E8F0',
          borderRadius: 14, padding: 12,
          textAlign: 'center', cursor: 'pointer',
          height: 72, display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        onMouseEnter: border #BD1313, bg #FFF8F8
      >
        <div style={{fontSize:24, mb:6}}>{link.icon}</div>
        <div style={{
          fontFamily:'var(--font-body)',
          fontSize:12, fontWeight:600, color:'#0F172A'
        }}>{link.label}</div>
      </div>
    ))}

  TABS:
    display flex, borderBottom '1px solid #E2E8F0', mb 16px

    {['faq','contact','about'].map((tab, i) => {
      const labels = ['FAQs','Contact Us','About'];
      return (
        <div
          onClick={() => setActiveHelpTab(tab)}
          style={{
            height: 44, padding: '0 20px',
            display: 'flex', alignItems: 'center',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 14, fontWeight: 500,
            color: activeHelpTab===tab ? '#BD1313' : '#94A3B8',
            borderBottom: activeHelpTab===tab
              ? '2px solid #BD1313' : '2px solid transparent',
            transition: 'all 0.2s'
          }}>
          {labels[i]}
        </div>
      );
    })}

── FAQ TAB ───────────────────────────────────────────────────

{activeHelpTab === 'faq' && (
  <>
    CATEGORY FILTER:
      display flex, gap 8px, mb 14px, flexWrap wrap

      {['All','Tests','Resume','Interview','XP','Account']
        .map(cat => (
        <div
          onClick={() => setFaqFilter(cat)}
          style={{
            height: 32, padding: '0 14px',
            borderRadius: 9999, cursor: 'pointer',
            display: 'flex', alignItems: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: 12, fontWeight: 600,
            background: faqFilter===cat ? '#BD1313' : '#F1F5F9',
            color: faqFilter===cat ? 'white' : '#475569',
            transition: 'all 0.2s'
          }}>
          {cat}
        </div>
      ))}

    FAQ ACCORDION:
      Filter by category AND searchQuery

      const filteredFaqs = faqs.filter(f => {
        const matchCat = faqFilter==='All'
          || f.category===faqFilter;
        const matchSearch = searchQuery===''
          || f.q.toLowerCase()
              .includes(searchQuery.toLowerCase())
          || f.a.toLowerCase()
              .includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
      });

      {filteredFaqs.length === 0 ? (
        Empty state:
          text center, padding 40px 20px
          "No results found 🔍"
          Syne 18px #94A3B8
          "Try a different search term"
          font-body 14px #94A3B8, mt 4px
      ) : filteredFaqs.map(faq => (
        <div style={{
          background: 'white',
          border: '1px solid',
          borderColor: expandedFaq===faq.id
            ? '#BD1313' : '#E2E8F0',
          borderRadius: 14, marginBottom: 8,
          overflow: 'hidden', transition: 'all 0.2s'
        }}>
          QUESTION ROW (h56, padding '0 18px', cursor pointer,
                         display flex, align center,
                         justify space-between, gap 12px):
            onClick: () => setExpandedFaq(
              expandedFaq===faq.id ? null : faq.id)

            Left:
              Category badge:
                bg #FDF2F2, color #BD1313, border #F5BFBF
                font-body 10px weight 700, radius 9999px
                padding '2px 8px', marginRight 10px
                {faq.category}

              Question: font-body 14px weight 600
                color: expandedFaq===faq.id
                  ? '#BD1313' : '#0F172A'

            Right: ChevronDown lucide 18px #94A3B8
              transform: expandedFaq===faq.id
                ? 'rotate(180deg)' : 'rotate(0deg)'
              transition 'transform 200ms'

          {expandedFaq === faq.id && (
            ANSWER:
              padding '0 18px 16px'
              borderTop '1px solid #F8FAFF'
              font-body 14px #475569 lineHeight 1.7
              animation fadeUp 200ms ease-out
              {faq.a}
          )}
        </div>
      ))}
  </>
)}

── CONTACT TAB ──────────────────────────────────────────────

{activeHelpTab === 'contact' && (
  display grid, gridTemplateColumns '1fr 1fr', gap 16px

  LEFT — Contact Form:
    bg white, border 1px #E2E8F0
    borderRadius 20px, padding 24px

    "Send us a message"
    Syne 16px weight 700, mb 16px

    {ticketSubmitted ? (
      SUCCESS STATE (textAlign center, padding '20px 0'):
        CheckCircle icon lucide 48px #16A34A

        "Message sent! ✓"
        Syne 18px weight 700 #16A34A, mt 12px

        "We will get back to you within 24 hours."
        font-body 14px #64748B, mt 6px

        "Send Another" link:
          font-body 13px #BD1313 weight 500
          cursor pointer, mt 16px, display block
          onClick: () => setTicketSubmitted(false)
    ) : (
      FORM:
        Select (h48, mb 12px, full width):
          border '1.5px solid #E2E8F0', radius 8px
          font-body 14px #0F172A, padding '0 12px'
          Options: General, Resume, Tests,
                   Interview, XP & Account,
                   Technical Issue

        Input "NAME" h44 mb 12px
          defaultValue "Rahul Sharma"

        Input "EMAIL" h44 mb 12px
          defaultValue "rahul@vit.edu"

        Textarea (minHeight 100px, mb 12px, full width):
          border '1.5px solid #E2E8F0', radius 8px
          padding 12px, font-body 14px, resize none
          placeholder "Tell us what is happening..."
          value {ticketText}
          onChange: (e) => setTicketText(e.target.value)

        Priority row (display flex, gap 8px, mb 16px):
          ['Low','Medium','High'].map(p => (
            pill h32, radius 9999px
            selected: Low=green, Medium=amber, High=red
          ))

        Submit button (full width h48):
          bg #BD1313, color white, border none
          Syne 15px weight 700, radius 12px, cursor pointer
          "Send Message →"
          onClick: () => {
            setTicketSubmitted(true);
            setTimeout(() =>
              showToast("Support ticket submitted ✓"), 0);
          }
    )}

  RIGHT — Contact Options:
    display flex, flexDirection column, gap 12px

    3 CONTACT CARDS:
      Each (bg white, border 1px #E2E8F0,
            borderRadius 16px, padding 20px,
            display flex, alignItems center, gap 14px,
            cursor pointer, transition all 0.2s,
            hover: border #BD1313, bg #FFF8F8):

        Icon circle (48px, radius 14px, bg, center):
          img 28px

        Content (flex 1):
          Title font-body 15px weight 700 #0F172A
          Details font-body 12px #94A3B8
          Response: font-body 11px weight 600 #16A34A

        ChevronRight lucide 16px #94A3B8

      Card 1 — Email:
        bg #FFF1F2
        <img icons8 email/>
        "Email Support"
        "support@aivision21.com"
        "Within 24 hours"
        onClick: () => setTimeout(() =>
          showToast("Email copied! 📧"), 0)

      Card 2 — Live Chat:
        bg #F0FDF4
        <img icons8 chat/>
        "Live Chat"
        "Chat with our team"
        "Usually within 1 hour"
        onClick: () => setTimeout(() =>
          showToast("Live chat coming soon!"), 0)

      Card 3 — Community:
        bg #EFF6FF
        <img icons8 conference-call/>
        "Community Forum"
        "50K+ students helping each other"
        "Always available" color #D97706
        onClick: () => setTimeout(() =>
          showToast("Community forum coming soon!"), 0)

    OFFICE HOURS CARD:
      bg #FFFBEB, border #FCD34D
      borderRadius 16px, padding 16px 20px

      "🕐 Office Hours"
      font-body 13px weight 700 #D97706, mb 8px

      font-body 12px #475569, lineHeight 1.8:
      "Monday – Friday: 9 AM – 6 PM IST"
      "Saturday: 10 AM – 2 PM IST"
      "Sunday: Closed"
)}

── ABOUT TAB ────────────────────────────────────────────────

{activeHelpTab === 'about' && (
  display grid, gridTemplateColumns '1.2fr 0.8fr', gap 16px

  LEFT:
    bg white, border 1px #E2E8F0
    borderRadius 20px, padding 24px

    <img
      src="https://i.ibb.co/C3FG8VDW/app-icon.png"
      width={64} height={64}
      style={{borderRadius:16, marginBottom:12,
              filter:'drop-shadow(0 4px 16px rgba(189,19,19,0.3))',
              display:'block'}}
    />

    "EduVision v1.0" Syne 20px weight 800 #0F172A
    "By AIVision21 · LearningVision Suite"
    font-body 13px #94A3B8, mt 4px, mb 16px

    "Your Career Growth Companion"
    font-body 14px weight 600 #BD1313, mb 8px

    font-body 14px #475569 lineHeight 1.7, mb 16px:
    "EduVision is an AI-powered career preparation
     platform built for Indian college students.
     Practice tests, build your resume, and ace
     interviews with Aria — all in one place."

    VERSION INFO (bg #F8FAFF, border 1px #E2E8F0,
                   radius 12px, padding '14px 16px'):
      display grid, gridTemplateColumns '1fr 1fr', gap 8px

      const versionInfo = [
        ['Version','1.0.0'],
        ['Updated','March 2025'],
        ['Platform','Web App'],
        ['Made in','India 🇮🇳']
      ];
      {versionInfo.map(([label, value]) => (
        <div>
          <div style={{font-body 11px #94A3B8}}>{label}</div>
          <div style={{font-body 13px weight 600 #0F172A}}>
            {value}
          </div>
        </div>
      ))}

  RIGHT:
    AIVISION21 CARD:
      bg white, border 1px #E2E8F0
      borderRadius 16px, padding 20px, textAlign center

      <img
        src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png"
        height={36}
        style={{display:'block', margin:'0 auto 12px'}}
      />

      "AIVision21" Syne 18px weight 800 #0F172A
      "Provides Insights. Exemplifies Learning."
      font-body 12px #94A3B8, mt 4px

      Divider, my 12px

      display flex, gap 6px, justifyContent center
      flexWrap wrap:
        "30+ Years" bg #FDF2F2 color #BD1313
        "21 Domains" bg #EFF6FF color #2563EB
        "AI Powered" bg #F0FDF4 color #16A34A
        Each: font-body 11px weight 700
              radius 9999px, padding '4px 10px'

    LINKS CARD (mt 12px):
      bg white, border 1px #E2E8F0
      borderRadius 16px, padding '16px 20px'

      "LINKS" font-body 11px uppercase #94A3B8, mb 10px

      {['Privacy Policy','Terms of Service',
         'Cookie Policy','Licenses'].map(link => (
        <div
          onClick={() => setTimeout(() =>
            showToast("Opening " + link + "..."), 0)}
          style={{
            height:40, display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            borderBottom:'1px solid #F8FAFF',
            cursor:'pointer',
            fontFamily:'var(--font-body)',
            fontSize:13, color:'#475569'
          }}>
          {link}
          ChevronRight lucide 14px #94A3B8
        </div>
      ))}
)}

=============================================================
SCREEN 3 — PROFILE PAGE
=============================================================

screen: 'profile'
animation: screenEnter 280ms ease-out both

STRUCTURE:
  display flex, flexDirection column
  height '100%', overflow hidden

HEADER (56px):
  bg white, borderBottom '1px solid #E2E8F0'
  padding '0 24px'
  display flex, alignItems center
  justifyContent space-between

  LEFT (display flex, gap 12px, align center):
    ChevronLeft lucide 20px #475569 cursor pointer
      onClick: () => setScreen('dashboard')
    "My Profile 👤" Syne 20px weight 700 #0F172A

  RIGHT (display flex, gap 8px):
    "Edit Profile" button:
      bg transparent, border '1.5px solid #F5BFBF'
      color '#BD1313', font-body 13px weight 600
      borderRadius 8px, h36, padding '0 14px'
      cursor pointer
      onClick: () => setScreen('settings')

    "Share Profile" button:
      bg transparent, border '1.5px solid #E2E8F0'
      color '#64748B', font-body 13px weight 600
      borderRadius 8px, h36, padding '0 14px'
      cursor pointer
      onClick: () => setTimeout(() =>
        showToast("Profile link copied! 🔗"), 0)

CONTENT (flex 1, overflow hidden):
  display grid, gridTemplateColumns '300px 1fr'
  height '100%'

LEFT PANEL (300px, borderRight '1px solid #E2E8F0',
             overflowY auto, padding '16px'):

  PROFILE CARD:
    bg white, border 1px #E2E8F0
    borderRadius 20px, padding 24px
    textAlign center, mb 12px

    Avatar (80px circle, mx auto, mb 12px):
      bg 'linear-gradient(135deg,#BD1313,#7A0D0D)'
      color white, Syne 28px weight 800
      borderRadius '50%', border '4px solid white'
      boxShadow '0 8px 24px rgba(189,19,19,0.3)'
      width 80px, height 80px, display flex, center
      "RS"

    "Rahul Sharma" Syne 20px weight 800 #0F172A
    "VIT Vellore · Final Year B.Tech CS"
    font-body 13px #64748B, mt 2px

    Target chip (mt 8px):
      bg #FDF2F2, color #BD1313, border #F5BFBF
      font-body 12px weight 600, radius 9999px
      padding '4px 14px', display inline-block
      "🎯 Software Engineer"

    Divider mt 16px mb 12px, h1px bg #E2E8F0

    STATS GRID (display grid,
                 gridTemplateColumns '1fr 1fr', gap 8px):
      {[
        ['12','TESTS'],
        ['74%','AVG SCORE'],
        ['3','SESSIONS'],
        ['8','SKILLS']
      ].map(([val, label]) => (
        <div style={{
          background:'#FAFAFA', borderRadius:10,
          padding:10, textAlign:'center'
        }}>
          <div style={{
            fontFamily:'var(--font-display)',
            fontSize:18, fontWeight:800, color:'#0F172A'
          }}>{val}</div>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:10, color:'#94A3B8',
            textTransform:'uppercase',
            letterSpacing:'0.6px'
          }}>{label}</div>
        </div>
      ))}

    "Change Profile Photo" link:
      font-body 12px #BD1313 weight 500
      cursor pointer, mt 12px, display block
      textDecoration underline
      onClick: () => setTimeout(() =>
        showToast("Photo upload coming soon!"), 0)

  XP CARD (bg linear-gradient(135deg,#FFFBEB,#FEF3C7),
            border #FCD34D, radius 16px,
            padding 16px, mb 12px):

    Row (display flex, justify space-between, align center):
      Left:
        "⚡ XP POINTS"
        font-body 10px uppercase #D97706, mb 2px
        "2,400" Syne 24px weight 800 #D97706

      <img
        src="https://img.icons8.com/3d-fluency/100/medal.png"
        width={40} height={40}
        style={{
          filter:'drop-shadow(0 2px 8px rgba(217,119,6,0.2))',
          animation:'float 3s ease-in-out infinite'
        }}
      />

    "🔥 Hustler · Level 3" badge (mt 8px):
      bg #D97706, color white
      font-body 12px weight 700, radius 9999px
      padding '3px 14px', display inline-block

    Progress (mt 10px):
      "600 XP to Elite" font-body 10px #B45309, mb 4px
      h4px bar, 80% fill #D97706

  STREAK CARD (bg white, border #E2E8F0,
                radius 16px, padding 14px, mb 12px):
    display flex, alignItems center, gap 12px

    <img
      src="https://img.icons8.com/3d-fluency/100/fire-element.png"
      width={40} height={40}
      style={{filter:'drop-shadow(0 2px 8px rgba(217,119,6,0.2))'}}
    />

    div:
      "7 Day Streak 🔥"
      font-body 14px weight 700 #D97706
      "3 more days for bonus XP!"
      font-body 11px #94A3B8, mt 2px

  "Member since March 2025"
  font-body 12px #94A3B8, textAlign center, mt 4px

RIGHT PANEL (flex 1, overflowY auto, padding '20px'):

  PROFILE TABS:
    display flex, borderBottom '1px solid #E2E8F0', mb 16px

    {['overview','achievements','activity'].map((tab,i) => {
      const labels = ['Overview','Achievements','Activity'];
      return (
        <div
          onClick={() => setProfileTab(tab)}
          style={{
            height:44, padding:'0 20px',
            display:'flex', alignItems:'center',
            cursor:'pointer',
            fontFamily:'var(--font-body)',
            fontSize:14, fontWeight:500,
            color: profileTab===tab ? '#BD1313' : '#94A3B8',
            borderBottom: profileTab===tab
              ? '2px solid #BD1313' : '2px solid transparent'
          }}>
          {labels[i]}
        </div>
      );
    })}

── OVERVIEW TAB ─────────────────────────────────────────────

{profileTab === 'overview' && (
  <>
    PERFORMANCE GRID (display grid,
                       gridTemplateColumns 'repeat(3,1fr)',
                       gap 12px, mb 16px):

      const perfCards = [
        {icon:'https://img.icons8.com/3d-fluency/100/bookmark-book.png',
         val:'12', label:'Total Tests', color:'#D97706',
         bg:'#FFFBEB'},
        {icon:'https://img.icons8.com/3d-fluency/100/goal.png',
         val:'74%', label:'Avg Score', color:'#16A34A',
         bg:'#F0FDF4'},
        {icon:'https://img.icons8.com/3d-fluency/100/trophy.png',
         val:'88%', label:'Best Score', color:'#BD1313',
         bg:'#FFF1F2'},
        {icon:'https://img.icons8.com/3d-fluency/100/microphone.png',
         val:'3', label:'AI Sessions', color:'#2563EB',
         bg:'#EFF6FF'},
        {icon:'https://img.icons8.com/3d-fluency/100/resume.png',
         val:'68%', label:'Resume', color:'#BD1313',
         bg:'#FFF1F2'},
        {icon:'https://img.icons8.com/3d-fluency/100/lightning-bolt.png',
         val:'2,400', label:'XP Earned', color:'#D97706',
         bg:'#FFFBEB'}
      ];

      {perfCards.map(card => (
        <div style={{
          background: 'white',
          border: '1px solid #E2E8F0',
          borderRadius: 14, padding: '14px 16px',
          position: 'relative', overflow: 'hidden'
        }}>
          Top strip: 3px colored, absolute top 0

          <img src={card.icon} width={24} height={24}
               style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))',
                       marginBottom:6}}/>

          <div style={{
            fontFamily:'var(--font-display)',
            fontSize:20, fontWeight:800, color:'#0F172A'
          }}>{card.val}</div>

          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:10, color:'#94A3B8',
            textTransform:'uppercase', letterSpacing:'0.6px'
          }}>{card.label}</div>
        </div>
      ))}

    SUBJECT PERFORMANCE:
      "Subject Performance 📚" Syne 15px weight 700, mb 12px

      const subjects = [
        {name:'Mathematics', score:79},
        {name:'English', score:88},
        {name:'Science', score:65},
        {name:'Aptitude', score:52},
        {name:'Programming', score:71}
      ];

      {subjects.map(s => (
        <div style={{
          display:'flex', alignItems:'center',
          gap:12, marginBottom:8
        }}>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:13, color:'#475569',
            width:100, flexShrink:0
          }}>{s.name}</div>

          <div style={{
            flex:1, height:8, background:'#F1F5F9',
            borderRadius:9999, overflow:'hidden'
          }}>
            <div style={{
              height:'100%', borderRadius:9999,
              width: s.score+'%',
              background: s.score>=75 ? '#16A34A'
                : s.score>=50 ? '#D97706' : '#DC2626',
              transition:'width 0.8s ease-out'
            }}/>
          </div>

          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:13, fontWeight:700,
            width:36, textAlign:'right',
            color: s.score>=75 ? '#16A34A'
              : s.score>=50 ? '#D97706' : '#DC2626'
          }}>{s.score}%</div>
        </div>
      ))}
  </>
)}

── ACHIEVEMENTS TAB ─────────────────────────────────────────

{profileTab === 'achievements' && (
  <>
    "Achievements 🏅" Syne 16px weight 700
    "3 of 8 unlocked" font-body 13px #94A3B8, mb 16px

    display grid, gridTemplateColumns 'repeat(4,1fr)'
    gap 12px

    const achievements = [
      {name:'First Test', icon:'https://img.icons8.com/3d-fluency/100/medal.png',
       date:'Mar 10', unlocked:true, border:'#FCD34D',
       condition:'Complete your first test'},
      {name:'Resume Started', icon:'https://img.icons8.com/3d-fluency/100/resume.png',
       date:'Mar 12', unlocked:true, border:'#F5BFBF',
       condition:'Start building your resume'},
      {name:'5 Day Streak', icon:'https://img.icons8.com/3d-fluency/100/fire-element.png',
       date:'Mar 14', unlocked:true, border:'#FCD34D',
       condition:'Practice for 5 days straight'},
      {name:'Score 80%+', icon:'https://img.icons8.com/3d-fluency/100/goal.png',
       date:null, unlocked:false, border:'#E2E8F0',
       condition:'Score 80% or more on any test'},
      {name:'Perfect Score', icon:'https://img.icons8.com/3d-fluency/100/star.png',
       date:null, unlocked:false, border:'#E2E8F0',
       condition:'Get 100% on any test'},
      {name:'Interview Pro', icon:'https://img.icons8.com/3d-fluency/100/microphone.png',
       date:null, unlocked:false, border:'#E2E8F0',
       condition:'Complete 5 AI interview sessions'},
      {name:'Subject Master', icon:'https://img.icons8.com/3d-fluency/100/book.png',
       date:null, unlocked:false, border:'#E2E8F0',
       condition:'Score 90%+ in any subject'},
      {name:'Champion', icon:'https://img.icons8.com/3d-fluency/100/trophy.png',
       date:null, unlocked:false, border:'#E2E8F0',
       condition:'Reach Champion level (5000 XP)'}
    ];

    {achievements.map((a, i) => (
      <div
        onClick={() => setTimeout(() =>
          showToast(a.unlocked
            ? a.name + ' — Unlocked on ' + a.date
            : 'Unlock: ' + a.condition), 0)}
        style={{
          background: a.unlocked ? 'white' : '#F8FAFF',
          border: '1.5px solid',
          borderColor: a.unlocked ? a.border : '#E2E8F0',
          borderStyle: a.unlocked ? 'solid' : 'dashed',
          borderRadius: 16, padding: 14,
          textAlign: 'center', cursor: 'pointer',
          position: 'relative',
          height: 100,
          transition: 'all 0.2s'
        }}>
        <img
          src={a.icon} width={36} height={36}
          style={{
            filter: a.unlocked
              ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
              : 'grayscale(100%) opacity(0.35)',
            display: 'block',
            margin: '0 auto 6px'
          }}
        />

        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 11, fontWeight: 600,
          color: a.unlocked ? '#0F172A' : '#94A3B8'
        }}>{a.name}</div>

        {a.unlocked && a.date && (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10, color: '#94A3B8', marginTop: 2
          }}>{a.date}</div>
        )}

        {!a.unlocked && (
          <div style={{
            position: 'absolute', bottom: 6, right: 8,
            fontSize: 12
          }}>🔒</div>
        )}
      </div>
    ))}
  </>
)}

── ACTIVITY TAB ─────────────────────────────────────────────

{profileTab === 'activity' && (
  <>
    "Activity History ⚡" Syne 16px weight 700, mb 12px

    const allActivity = [
      {icon:'📝', bg:'#FFF1F2', title:'Math Test Complete',
       time:'2h ago', badge:'74%', variant:'warning',
       screen:'tests'},
      {icon:'📄', bg:'#FFFBEB', title:'Resume Skills Updated',
       time:'Yesterday', badge:'68%', variant:'primary',
       screen:'resume'},
      {icon:'🎤', bg:'#F0FDF4', title:'AI Interview Done',
       time:'2 days ago', badge:'Practice', variant:'neutral',
       screen:'interview'},
      {icon:'🏅', bg:'#FEFCE8', title:'Badge Unlocked!',
       time:'3 days ago', badge:'New', variant:'warning',
       screen:'profile'},
      {icon:'📊', bg:'#F0FDF4', title:'Report Reviewed',
       time:'4 days ago', badge:'Done', variant:'success',
       screen:'tests'},
      {icon:'🌱', bg:'#F0FDF4', title:'Joined EduVision',
       time:'Mar 1', badge:'Welcome!', variant:'success',
       screen:'dashboard'},
      {icon:'🎯', bg:'#EFF6FF', title:'Set target role',
       time:'Mar 2', badge:'SWE', variant:'primary',
       screen:'settings'},
      {icon:'📄', bg:'#FFFBEB', title:'Resume Created',
       time:'Mar 3', badge:'Started', variant:'warning',
       screen:'resume'},
      {icon:'⚡', bg:'#FEFCE8', title:'Reached Rising Level',
       time:'Mar 5', badge:'Level Up!', variant:'warning',
       screen:'profile'}
    ];

    {allActivity.map((item, i) => (
      <div
        onClick={() => setScreen(item.screen)}
        style={{
          display: 'flex', alignItems: 'center',
          gap: 12, padding: '10px 0',
          borderBottom: '1px solid #F8FAFF',
          cursor: 'pointer',
          transition: 'all 0.15s'
        }}>

        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: item.bg, flexShrink: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 16
        }}>{item.icon}</div>

        <div style={{flex:1}}>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:13, fontWeight:500, color:'#0F172A'
          }}>{item.title}</div>
          <div style={{
            fontFamily:'var(--font-body)',
            fontSize:10, color:'#94A3B8', marginTop:1
          }}>{item.time}</div>
        </div>

        Badge chip matching variant
      </div>
    ))}
  </>
)}

=============================================================
NOTIFICATIONS SLIDE-IN PANEL
=============================================================

This is NOT a screen. It overlays on top of everything.
Controlled by showNotifications state boolean.

Render this OUTSIDE all screen conditionals.
At the very bottom of the main return, before closing tag.

{showNotifications && (
  <>
    BACKDROP:
      position: 'fixed', inset: 0
      background: 'rgba(15,23,42,0.3)'
      backdropFilter: 'blur(2px)'
      zIndex: 300
      onClick: () => setShowNotifications(false)

    PANEL:
      position: 'fixed'
      top: 0, right: 0
      width: 380, height: '100vh'
      background: 'white'
      boxShadow: '-8px 0 32px rgba(0,0,0,0.12)'
      zIndex: 301
      display: 'flex', flexDirection: 'column'
      overflow: 'hidden'

      PANEL HEADER (56px):
        bg white, borderBottom '1px solid #E2E8F0'
        padding '0 20px'
        display flex, alignItems center
        justifyContent space-between

        LEFT (display flex, gap 10px, align center):
          Bell icon lucide 20px #0F172A

          "Notifications" Syne 18px weight 700 #0F172A

          {unreadCount > 0 && (
            <div style={{
              background: '#BD1313', color: 'white',
              fontFamily: 'var(--font-body)',
              fontSize: 11, fontWeight: 800,
              borderRadius: 9999, padding: '2px 8px',
              minWidth: 20, textAlign: 'center'
            }}>{unreadCount}</div>
          )}

        RIGHT (display flex, gap 8px, align center):
          "Mark all read":
            font-body 12px #BD1313 weight 500
            cursor pointer
            onClick: () => markAllRead()

          X button:
            cursor pointer
            onClick: () => setShowNotifications(false)
            X icon lucide 20px #475569

      FILTER TABS (48px):
        bg #FAFAFA, borderBottom '1px solid #E2E8F0'
        display flex, padding '0 12px', gap 4px

        {[
          {id:'all', label:'All'},
          {id:'unread', label:'Unread'},
          {id:'tests', label:'Tests'},
          {id:'resume', label:'Resume'}
        ].map(tab => (
          <div
            onClick={() => setNotifFilter(tab.id)}
            style={{
              height: 48, padding: '0 12px',
              display: 'flex', alignItems: 'center',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: 13, fontWeight: 500,
              color: notifFilter===tab.id ? '#BD1313' : '#94A3B8',
              borderBottom: notifFilter===tab.id
                ? '2px solid #BD1313' : '2px solid transparent'
            }}>
            {tab.label}
          </div>
        ))}

      NOTIFICATIONS LIST (flex 1, overflowY auto):

        const filteredNotifs = notifications.filter(n => {
          if (notifFilter==='all') return true;
          if (notifFilter==='unread') return !n.read;
          if (notifFilter==='tests') return n.type==='score';
          if (notifFilter==='resume') return n.type==='resume';
          return true;
        });

        {filteredNotifs.length === 0 ? (
          Empty state (textAlign center, padding '40px 20px'):
            <img
              src="https://img.icons8.com/3d-fluency/100/bell.png"
              width={64} height={64}
              style={{display:'block', margin:'0 auto 12px',
                      filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'}}
            />
            "All caught up! 🎉" Syne 18px weight 700 #0F172A
            "No notifications here" font-body 14px #94A3B8 mt 4px
        ) : (
          {filteredNotifs.map(n => (
            <div
              onClick={() => {
                markOneRead(n.id);
                setShowNotifications(false);
                const routeMap = {
                  score: 'tests', resume: 'resume',
                  xp: 'profile', badge: 'profile',
                  streak: 'profile', reminder: 'dashboard',
                  tip: 'dashboard', expert: 'dashboard'
                };
                setTimeout(() =>
                  setScreen(routeMap[n.type] || 'dashboard'), 300);
              }}
              style={{
                padding: '12px 20px',
                background: !n.read ? '#FFFBEB' : 'white',
                borderBottom: '1px solid #F8FAFF',
                display: 'flex', gap: 12,
                alignItems: 'flex-start',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}>

              Icon circle (40px, radius 12px):
                const bgMap = {
                  xp:'#FFFBEB', badge:'#FEFCE8',
                  reminder:'#FFF1F2', score:'#F0FDF4',
                  streak:'#FFFBEB', tip:'#EFF6FF',
                  expert:'#FAF5FF', resume:'#FFF1F2'
                };
                bg: bgMap[n.type] || '#F1F5F9'
                emoji 18px centered: {n.icon}

              Content (flex 1):
                Title row (display flex, justify space-between):
                  Title: font-body 13px weight 600
                    color: !n.read ? '#0F172A' : '#475569'
                  Time: font-body 10px #94A3B8

                Body: font-body 12px #64748B, mt 2px
                  lineHeight 1.4

              Right:
                {!n.read && (
                  <div style={{
                    width:8, height:8, borderRadius:'50%',
                    background:'#BD1313', marginTop:4,
                    flexShrink:0
                  }}/>
                )}
            </div>
          ))}
        )}

      PANEL FOOTER (64px):
        bg white, borderTop '1px solid #E2E8F0'
        padding '0 20px'
        display flex, alignItems center
        justifyContent space-between

        "Notification Settings":
          font-body 13px #64748B, cursor pointer
          onClick: () => {
            setShowNotifications(false);
            setTimeout(() => setScreen('settings'), 300);
          }

        "Clear All":
          font-body 13px #DC2626 weight 500
          cursor pointer
          onClick: () => {
            setNotifications([]);
            setTimeout(() =>
              showToast("All notifications cleared ✓"), 0);
          }
  </>
)}

=============================================================
EVERY BUTTON MUST WORK — FINAL CHECKLIST
=============================================================

Settings:
  ✅ Save Changes → toast
  ✅ All 5 tab nav items switch content
  ✅ Help & Support nav → setScreen('help')
  ✅ Logout nav → showLogoutModal = true
  ✅ Change Photo → toast
  ✅ All toggles toggle state (live update)
  ✅ Dark mode toggle → toast message
  ✅ Font size pills → update state
  ✅ Module toggles → toggle state
  ✅ Reset → toast warning
  ✅ Delete → toast
  ✅ Download Data → toast
  ✅ Clear Cache → toast
  ✅ Logout modal: Logout → landing + toast
  ✅ Logout modal: Cancel → close modal

Help:
  ✅ Back to Settings → setScreen('settings')
  ✅ Search filters FAQs live
  ✅ Clear search → X button clears input
  ✅ All quick link cards → expand FAQ or switch tab
  ✅ All 3 tabs switch content
  ✅ Category chips filter FAQs
  ✅ Each FAQ row expands/collapses
  ✅ Contact form submit → success state + toast
  ✅ Send Another → reset form
  ✅ Email card → toast
  ✅ Live Chat card → toast
  ✅ Community card → toast
  ✅ All 4 link rows → toast
  ✅ About tab version info shown

Profile:
  ✅ Back arrow → dashboard
  ✅ Edit Profile → settings
  ✅ Share Profile → toast
  ✅ All 3 tabs switch content
  ✅ Change Photo → toast
  ✅ All 6 performance cards visible
  ✅ All 5 subject bars show correct scores
  ✅ Achievement cards → toast with condition
  ✅ Activity rows → navigate to relevant screen
  ✅ Locked achievements show 🔒

Notifications:
  ✅ Bell icon in top bar → open panel
  ✅ Unread count badge on bell icon
  ✅ Mark all read → clears unread dots
  ✅ X button → close panel
  ✅ Backdrop click → close panel
  ✅ All 4 filter tabs filter correctly
  ✅ Each notification → mark read + navigate
  ✅ Unread dot disappears after click
  ✅ Notification Settings → settings + close
  ✅ Clear All → empty list + toast
  ✅ Empty state shows when no notifications

=============================================================
CRITICAL REMINDERS
=============================================================

✅ ALL showToast calls wrapped in setTimeout(..., 0)

✅ Notifications panel renders OUTSIDE screen
   conditionals — it overlays everything

✅ Panel uses position fixed not relative

✅ showLogoutModal state controls logout modal

✅ Logout confirmed → setScreen('landing')

✅ Settings left nav has 5 tabs + Help + Logout

✅ FAQ search works live as user types

✅ Toggle switches have smooth CSS transition

✅ Achievement locked icons are grayscale

✅ All imgbb and Icons8 URLs exactly as specified

✅ No full page scroll on any screen

✅ Device frame maintained throughout

✅ Primary color #BD1313 everywhere

✅ Fonts Syne + Plus Jakarta Sans only

=============================================================
BUILD ORDER
=============================================================

1. Add all state at top of file
2. Add FAQ data
3. Update top bar bell + avatar
4. Update sidebar settings icon
5. Build ToggleSwitch component
6. Build SettingsRow component
7. Build Settings screen (5 tabs + modals)
8. Build Help & Support (3 tabs)
9. Build Profile Page (3 tabs)
10. Build Notifications panel (overlay)
11. Wire every button
12. Test all flows

DO NOT rebuild existing screens.
DO NOT change working code.
ONLY add these 4 screens.
=============================================================