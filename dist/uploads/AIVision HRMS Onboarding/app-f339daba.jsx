// App root
const { useState: useStateApp } = React;

function App() {
  const [screen, setScreen] = useStateApp('list');
  const [role, setRole] = useStateApp('admin'); // 'admin' | 'super'
  const [toast, setToast] = useStateApp(null);

  function showToast(msg) { setToast(msg); }

  function handleRoleChange(r) {
    setRole(r);
    // Reset to appropriate detail view if currently on a detail screen
    if (screen === 'detail' && r === 'super') setScreen('superDetail');
    else if (screen === 'superDetail' && r === 'admin') setScreen('detail');
    else if (screen === 'onboarded' && r === 'admin') setScreen('detail');
  }

  const navProps = { role, onRoleChange: handleRoleChange };

  // Programmatic navigation hook for PPTX/PDF export.
  React.useEffect(() => {
    window.__goScreen = (s, r) => {
      if (r) setRole(r);
      setScreen(s);
    };
  }, []);

  return (
    <>
      {screen === 'list' && <ListView onOpenDetail={() => setScreen(role === 'super' ? 'superDetail' : 'detail')} {...navProps} />}
      {screen === 'detail' && <DetailView onBack={() => setScreen('list')} onViewAudit={() => setScreen('audit')} onToast={showToast} {...navProps} />}
      {screen === 'superDetail' && <SuperDetailView onBack={() => setScreen('list')} onViewAudit={() => setScreen('audit')} onToast={showToast} onApproved={() => setScreen('onboarded')} {...navProps} />}
      {screen === 'onboarded' && <OnboardedView onBack={() => setScreen('list')} onViewAudit={() => setScreen('audit')} onToast={showToast} {...navProps} />}
      {screen === 'audit' && <AuditView onBack={() => setScreen(role === 'super' ? 'superDetail' : 'detail')} {...navProps} />}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
