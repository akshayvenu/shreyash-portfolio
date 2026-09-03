// ============================================================
// PLACEHOLDER + TOAST + MAIN APP
// ============================================================
const { useState, useEffect } = React;

function LearningPlayerPlaceholder({ activeLesson, setScreen, showToast }) {
  const isVideo = activeLesson?.type === 'video';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100%', background: '#FDF8F4', padding: 24
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: 48,
        border: '1px solid #EEE8E3',
        textAlign: 'center', maxWidth: 480,
        boxShadow: '0 2px 8px rgba(26,26,46,0.06)'
      }}>
        <img
          src={isVideo
            ? 'https://img.icons8.com/pulsar-color/96/video.png'
            : 'https://img.icons8.com/pulsar-color/96/pdf.png'}
          width={64} height={64}
          alt=""
          style={{
            display: 'block', margin: '0 auto 16px',
            background: 'transparent'
          }}
        />
        <div style={{
          fontSize: 18, fontWeight: 600,
          color: '#1A1A2E', marginBottom: 8
        }}>{activeLesson?.title || 'Learning Player'}</div>
        <div style={{
          fontSize: 14, color: '#9898B0', marginBottom: 20
        }}>Full learning player coming in the next step.</div>
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'center'
        }}>
          <button
            onClick={() => setScreen('batch-detail')}
            style={{
              background: 'transparent',
              border: '1.5px solid #EEE8E3',
              color: '#4A4A68',
              height: 40, padding: '0 20px',
              borderRadius: 10, cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              fontFamily: "'Poppins', sans-serif"
            }}
          >← Back to Batch</button>
          <button
            onClick={() => {
              setTimeout(() => showToast('Lesson marked complete! ✓', 'success'), 0);
              setScreen('batch-detail');
            }}
            style={{
              background: '#BD1313', color: 'white',
              height: 40, padding: '0 20px',
              borderRadius: 10, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              fontFamily: "'Poppins', sans-serif"
            }}
          >Mark Complete</button>
        </div>
      </div>
    </div>
  );
}

function Placeholder({ label, setScreen }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100%', background: '#FDF8F4', padding: 24
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: 48,
        border: '1px solid #EEE8E3',
        textAlign: 'center', maxWidth: 400,
        boxShadow: '0 2px 8px rgba(26,26,46,0.06)'
      }}>
        <img
          src="https://img.icons8.com/pulsar-color/96/empty-box.png"
          width={80} height={80}
          alt=""
          style={{
            display: 'block', margin: '0 auto 16px',
            background: 'transparent', opacity: 0.6
          }}
        />
        <div style={{
          fontSize: 18, fontWeight: 600, color: '#1A1A2E', marginBottom: 8
        }}>
          {label}
        </div>
        <div style={{
          fontSize: 14, color: '#9898B0', marginBottom: 20
        }}>
          This screen is coming in the next step.
        </div>
        <button
          onClick={() => setScreen('dashboard')}
          style={{
            background: '#BD1313', color: 'white',
            fontSize: 13, fontWeight: 600,
            height: 40, padding: '0 20px',
            borderRadius: 10, border: 'none', cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  const { CheckCircle, AlertCircle, Info } = window.LucideIcons;
  const borderLeft =
    toast.type === 'success' ? '3px solid #16A34A' :
    toast.type === 'error'   ? '3px solid #DC2626' :
    toast.type === 'info'    ? '3px solid #2563EB' : 'none';
  return (
    <div style={{
      position: 'fixed', top: 20, left: '50%',
      transform: 'translateX(-50%)',
      background: '#1A1A2E', color: 'white',
      fontFamily: "'Poppins', sans-serif",
      fontSize: 13, fontWeight: 500,
      borderRadius: 9999, padding: '12px 20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
      zIndex: 9999,
      animation: 'toastEnter 300ms ease-out',
      display: 'flex', alignItems: 'center', gap: 8,
      whiteSpace: 'nowrap',
      borderLeft
    }}>
      {toast.type === 'success' && <CheckCircle size={15} color="#16A34A" />}
      {toast.type === 'error'   && <AlertCircle size={15} color="#DC2626" />}
      {toast.type === 'info'    && <Info size={15} color="#2563EB" />}
      {toast.message}
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [notifList, setNotifList] = useState(window.notifications);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  // Step 2 state
  const [activeLesson, setActiveLesson] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    'SEC-001': true, 'SEC-003': true, 'SEC-005': true
  });
  const [expandedChapters, setExpandedChapters] = useState({
    'CH-001': true
  });
  const [mlSearch, setMlSearch] = useState('');
  const [mlStatusFilter, setMlStatusFilter] = useState('All');

  // Step 3 state — Tests
  const [testAnswers, setTestAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testTimeLeft, setTestTimeLeft] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [testsFilter, setTestsFilter] = useState('All');

  // Step 4 state
  const [calMonth, setCalMonth] = useState(4);
  const [calYear, setCalYear]   = useState(2025);
  const [calSelectedDay, setCalSelectedDay] = useState(20);
  const [profileTab, setProfileTab] = useState('overview');

  // Step 5 state — Learning Player
  const [playerProgress, setPlayerProgress] = useState(0);
  const [playerPlaying, setPlayerPlaying]   = useState(false);
  const [playerSpeed, setPlayerSpeed]       = useState(1);
  const [playerMuted, setPlayerMuted]       = useState(false);
  const [playerVolume, setPlayerVolume]     = useState(80);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu]   = useState(false);

  // Step 5 state — Settings
  const [settingsTab, setSettingsTab] = useState('account');
  const [settingsForm] = useState(window.settingsData.profile);
  const [settingsNotifs, setSettingsNotifs] = useState(window.settingsData.notifications);
  const [settingsPrivacy, setSettingsPrivacy] = useState(window.settingsData.privacy);
  const [settingsAppearance, setSettingsAppearance] = useState(window.settingsData.appearance);

  // Step 6 state — TutorBot
  const [botMessages, setBotMessages] = useState(window.tutorBotInitialMessages);
  const [botInput, setBotInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [botMessageId, setBotMessageId] = useState(2);

  const toggleSection = (id) =>
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleChapter = (id) =>
    setExpandedChapters(prev => ({ ...prev, [id]: !prev[id] }));

  // Step 3 — score calculator & helpers
  const calculateScore = () => {
    let earned = 0, total = 0;
    window.testQuestions.forEach(q => {
      total += q.marks;
      if (testAnswers[q.id] === q.correct) earned += q.marks;
    });
    return { earned, total, pct: Math.round((earned / total) * 100) };
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
    setTestStarted(false);
    setScreen('test-results');
  };

  const resetTestState = () => {
    setTestAnswers({});
    setTestSubmitted(false);
    setCurrentQuestion(0);
    setTestStarted(false);
    setTestTimeLeft(null);
  };

  // Test timer
  useEffect(() => {
    if (!testStarted || testSubmitted || testTimeLeft === null) return;
    if (testTimeLeft <= 0) { handleSubmitTest(); return; }
    const t = setTimeout(() => setTestTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [testStarted, testSubmitted, testTimeLeft]);

  // Player auto-advance
  useEffect(() => {
    if (!playerPlaying || lessonComplete) return;
    const interval = setInterval(() => {
      setPlayerProgress(p => {
        if (p >= 100) {
          setPlayerPlaying(false);
          setLessonComplete(true);
          clearInterval(interval);
          return 100;
        }
        return p + 0.6;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [playerPlaying, lessonComplete]);

  // Reset player when activeLesson changes
  useEffect(() => {
    setPlayerProgress(0);
    setPlayerPlaying(false);
    setLessonComplete(false);
    setShowSpeedMenu(false);
  }, [activeLesson]);

  // Scroll reset for inner-scroll containers on screen change
  useEffect(() => {
    document.querySelectorAll('.inner-scroll').forEach(el => { el.scrollTop = 0; });
  }, [screen]);

  // Dynamic document title
  useEffect(() => {
    const titles = {
      'dashboard':       'Dashboard — LearningVision',
      'my-learning':     'My Learning — LearningVision',
      'batch-detail':    `${selectedBatch?.name || 'Batch'} — LearningVision`,
      'learning-player': `${activeLesson?.title || 'Lesson'} — LearningVision`,
      'tests':           'Tests — LearningVision',
      'test-active':     `${selectedTest?.title || 'Test'} — LearningVision`,
      'test-results':    'Results — LearningVision',
      'calendar':        'Calendar — LearningVision',
      'notifications':   'Notifications — LearningVision',
      'tutorbot':        'TutorBot AI — LearningVision',
      'profile':         'Profile — LearningVision',
      'analytics':       'Analytics — LearningVision',
      'settings':        'Settings — LearningVision'
    };
    document.title = titles[screen] || 'LearningVision';
  }, [screen, selectedBatch, activeLesson, selectedTest]);

  const showToast = (message, type = 'default') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const unreadCount = notifList.filter(n => !n.read).length;

  const renderScreen = () => {
    if (screen === 'dashboard') {
      return (
        <window.Dashboard
          setScreen={setScreen}
          setSelectedBatch={setSelectedBatch}
          showToast={showToast}
        />
      );
    }
    if (screen === 'my-learning') {
      return (
        <window.MyLearning
          setScreen={setScreen}
          setSelectedBatch={setSelectedBatch}
          mlSearch={mlSearch}
          setMlSearch={setMlSearch}
          mlStatusFilter={mlStatusFilter}
          setMlStatusFilter={setMlStatusFilter}
        />
      );
    }
    if (screen === 'batch-detail') {
      if (!selectedBatch) {
        setScreen('my-learning');
        return null;
      }
      return (
        <window.BatchDetail
          selectedBatch={selectedBatch}
          setScreen={setScreen}
          showToast={showToast}
          expandedSections={expandedSections}
          expandedChapters={expandedChapters}
          toggleSection={toggleSection}
          toggleChapter={toggleChapter}
          setExpandedSections={setExpandedSections}
          setExpandedChapters={setExpandedChapters}
          setActiveLesson={setActiveLesson}
        />
      );
    }
    if (screen === 'learning-player') {
      if (!activeLesson || !selectedBatch) {
        setScreen('my-learning');
        return null;
      }
      return (
        <window.LearningPlayerScreen
          activeLesson={activeLesson}
          setActiveLesson={setActiveLesson}
          selectedBatch={selectedBatch}
          setScreen={setScreen}
          showToast={showToast}
          playerProgress={playerProgress} setPlayerProgress={setPlayerProgress}
          playerPlaying={playerPlaying}   setPlayerPlaying={setPlayerPlaying}
          playerSpeed={playerSpeed}       setPlayerSpeed={setPlayerSpeed}
          playerMuted={playerMuted}       setPlayerMuted={setPlayerMuted}
          playerVolume={playerVolume}     setPlayerVolume={setPlayerVolume}
          lessonComplete={lessonComplete} setLessonComplete={setLessonComplete}
          showSpeedMenu={showSpeedMenu}   setShowSpeedMenu={setShowSpeedMenu}
        />
      );
    }
    if (screen === 'tests') {
      return (
        <window.TestsScreen
          setScreen={setScreen}
          setSelectedTest={setSelectedTest}
          testsFilter={testsFilter}
          setTestsFilter={setTestsFilter}
          resetTestState={resetTestState}
        />
      );
    }
    if (screen === 'test-results') {
      if (!selectedTest) {
        setScreen('tests');
        return null;
      }
      return (
        <window.TestResultsScreen
          selectedTest={selectedTest}
          setScreen={setScreen}
          showToast={showToast}
          testAnswers={testAnswers}
          testSubmitted={testSubmitted}
          calculateScore={calculateScore}
          resetTestState={resetTestState}
        />
      );
    }
    if (screen === 'calendar') {
      return (
        <window.CalendarScreen
          calMonth={calMonth} setCalMonth={setCalMonth}
          calYear={calYear} setCalYear={setCalYear}
          calSelectedDay={calSelectedDay} setCalSelectedDay={setCalSelectedDay}
        />
      );
    }
    if (screen === 'notifications') {
      return (
        <window.NotificationsScreen
          notifList2={notifList}
          setNotifList2={setNotifList}
          showToast={showToast}
        />
      );
    }
    if (screen === 'profile') {
      return (
        <window.ProfileScreen
          profileTab={profileTab}
          setProfileTab={setProfileTab}
          setScreen={setScreen}
          setSelectedBatch={setSelectedBatch}
          showToast={showToast}
        />
      );
    }
    if (screen === 'settings') {
      return (
        <window.SettingsScreen
          settingsTab={settingsTab}
          setSettingsTab={setSettingsTab}
          settingsForm={settingsForm}
          settingsNotifs={settingsNotifs}
          setSettingsNotifs={setSettingsNotifs}
          settingsAppearance={settingsAppearance}
          setSettingsAppearance={setSettingsAppearance}
          settingsPrivacy={settingsPrivacy}
          setSettingsPrivacy={setSettingsPrivacy}
          showToast={showToast}
        />
      );
    }
    if (screen === 'tutorbot') {
      return (
        <window.TutorBotScreen
          botMessages={botMessages} setBotMessages={setBotMessages}
          botInput={botInput} setBotInput={setBotInput}
          botTyping={botTyping} setBotTyping={setBotTyping}
          botMessageId={botMessageId} setBotMessageId={setBotMessageId}
          showToast={showToast}
        />
      );
    }
    if (screen === 'analytics') {
      return <window.AnalyticsScreen />;
    }
    return (
      <Placeholder
        label={window.screenLabels[screen] || 'Screen'}
        setScreen={setScreen}
      />
    );
  };

  // Full-screen override for test-active (no sidebar/topbar)
  if (screen === 'test-active') {
    if (!selectedTest) {
      setScreen('tests');
      return null;
    }
    return (
      <>
        <window.TestActiveScreen
          selectedTest={selectedTest}
          testStarted={testStarted}
          setTestStarted={setTestStarted}
          testAnswers={testAnswers}
          setTestAnswers={setTestAnswers}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          testTimeLeft={testTimeLeft}
          setTestTimeLeft={setTestTimeLeft}
          handleSubmitTest={handleSubmitTest}
          setScreen={setScreen}
        />
        <Toast toast={toast} />
      </>
    );
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh', width: '100vw',
      overflow: 'hidden',
      background: '#FDF8F4',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <window.Sidebar
        screen={screen}
        setScreen={setScreen}
        unreadCount={unreadCount}
      />

      <main
        data-screen-label={window.screenLabels[screen] || screen}
        style={{
          flex: 1, display: 'flex',
          flexDirection: 'column',
          minWidth: 0
        }}
      >
        <window.TopBar
          screen={screen}
          setScreen={setScreen}
          unreadCount={unreadCount}
          selectedBatch={selectedBatch}
          selectedTest={selectedTest}
        />
        <div
          key={screen}
          className="screen-enter"
          style={{
            marginLeft: 64,
            height: 'calc(100vh - 56px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            background: '#FDF8F4'
          }}
        >
          {renderScreen()}
        </div>
      </main>

      <Toast toast={toast} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
