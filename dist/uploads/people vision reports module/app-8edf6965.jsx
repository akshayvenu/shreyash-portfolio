// Main App — sidebar removed; Step 2 wires hierarchy + drill-down + new detail panel

const { useState, useCallback, useEffect } = React;

function App() {
  const [screen, setScreen] = useState('today');
  const [currentRole, setCurrentRole] = useState('superadmin');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [drillPath, setDrillPath] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [dateFilter, setDateFilter] = useState('today');
  const [locationView, setLocationView] = useState('branch');
  const [outdoorFilter, setOutdoorFilter] = useState('all');
  const [outdoorSearch, setOutdoorSearch] = useState('');
  const [trendsTab, setTrendsTab] = useState('attendance');
  const [trendsPeriod, setTrendsPeriod] = useState('week');
  const [exportCategory, setExportCategory] = useState('attendance');
  const [exportFormat, setExportFormat] = useState('csv');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    setShowToast(true);
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => setShowToast(false), 2400);
  }, []);
  window.__toast = toast;

  const openPerson = (p) => setSelectedPerson(p);
  const drillInto = (p) => setDrillPath(prev => [...prev, p.id]);
  const drillBack = (i) => setDrillPath(prev => prev.slice(0, i));

  // Role-based default drill path
  useEffect(() => {
    if (screen === 'hierarchy') {
      if (currentRole === 'admin' && drillPath.length === 0) {
        setDrillPath(['ADM-001']);
      } else if (currentRole === 'manager' && drillPath.length < 2) {
        setDrillPath(['ADM-001', 'MGR-001']);
      }
    }
  }, [screen, currentRole]);

  const handleSetScreen = (s) => {
    setScreen(s);
    setSelectedPerson(null);
    if (s !== 'hierarchy') setDrillPath([]);
  };

  const handleSetRole = (r) => {
    setCurrentRole(r);
    setDrillPath([]);
    toast('Switched to ' + getRoleStyle(r).label + ' view');
  };

  const drillBreadcrumb = (() => {
    if (screen !== 'hierarchy' || drillPath.length === 0) return [];
    const out = [];
    const a = ADMINS.find(x => x.id === drillPath[0]);
    if (a) out.push(a.name);
    if (drillPath[1]) {
      const m = MANAGERS.find(x => x.id === drillPath[1]);
      if (m) out.push(m.name);
    }
    return out;
  })();

  return (
    <div style={{
      width:'100vw', height:'100vh', overflow:'hidden',
      background:'#F1F5F9', fontFamily:'Poppins',
      color:'#0F172A', display:'flex', flexDirection:'column'
    }} data-screen-label={`PeopleVision · ${SCREEN_TITLES[screen]}`}>

      <TopBar
        screen={screen}
        currentRole={currentRole}
        setCurrentRole={handleSetRole}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        drillPath={drillBreadcrumb}
        setScreen={setScreen}
        setDrillPath={setDrillPath}
        toast={toast}
      />

      <ReportTabs screen={screen} setScreen={handleSetScreen} currentRole={currentRole} />

      <main className="inner-scroll" style={{
        flex:1, overflowY:'auto', background:'#F1F5F9',
        marginRight: selectedPerson ? 420 : 0,
        transition:'margin-right 280ms ease-out'
      }}>
        {screen === 'today' && <TodayScreen currentRole={currentRole} openPerson={openPerson} toast={toast} />}
        {screen === 'hierarchy' && (
          <HierarchyScreen
            currentRole={currentRole}
            drillPath={drillPath}
            drillInto={drillInto}
            drillBack={drillBack}
            openPerson={openPerson}
            toast={toast} />
        )}
        {screen === 'location' && (
          <LocationScreen
            currentRole={currentRole}
            setCurrentRole={handleSetRole}
            locationView={locationView}
            setLocationView={setLocationView}
            toast={toast} />
        )}
        {screen === 'outdoor' && (
          <OutdoorScreen
            outdoorFilter={outdoorFilter}
            setOutdoorFilter={setOutdoorFilter}
            search={outdoorSearch}
            setSearch={setOutdoorSearch}
            openPerson={openPerson}
            toast={toast} />
        )}
        {screen === 'attendance' && (
          <AttendanceScreen currentRole={currentRole} openPerson={openPerson} toast={toast} />
        )}
        {screen === 'leaves' && (
          <LeavesScreen currentRole={currentRole} openPerson={openPerson} toast={toast} />
        )}
        {screen === 'late-absent' && (
          <LateAbsentScreen currentRole={currentRole} openPerson={openPerson} toast={toast} />
        )}
        {screen === 'trends' && (
          <TrendsScreen
            trendsTab={trendsTab} setTrendsTab={setTrendsTab}
            trendsPeriod={trendsPeriod} setTrendsPeriod={setTrendsPeriod}
            toast={toast} />
        )}
        {screen === 'live' && <LiveStatusScreen toast={toast} />}
        {screen === 'export' && (
          <ExportScreen
            exportCategory={exportCategory} setExportCategory={setExportCategory}
            exportFormat={exportFormat} setExportFormat={setExportFormat}
            currentRole={currentRole} toast={toast} />
        )}
        {!['today','hierarchy','location','outdoor','attendance','leaves','late-absent','trends','live','export'].includes(screen) && <PlaceholderScreen screen={screen} />}
      </main>

      {selectedPerson && (
        <DetailPanelV2 person={selectedPerson} onClose={() => setSelectedPerson(null)} toast={toast} />
      )}

      {showToast && <Toast message={toastMsg} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
