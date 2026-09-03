;(function(){

const { useState, useMemo, useEffect, useRef } = React;

/* ── ICONS ──────────────────────────────────────────────── */
const Icon = {
  grid: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  users: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  checkSquare: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  dollar: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  file: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  clock: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  logout: () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  search: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chevron: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  exit: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  warn: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  cal: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  arrow: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  filter: () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
};

/* ── DATA ───────────────────────────────────────────────── */
const EMPLOYEES = [
  { id: 'AIV-2024-0089', name: 'Priya Malhotra', initials: 'PM', color: '#BD1313',
    desig: 'Senior Product Designer', dept: 'Design & Product',
    exitType: 'Resignation', phase: 'Phase 2 Clearance', clearance: 60, lastDay: 'May 31, 2025', daysLeft: 28, email: 'priya.malhotra@aivision21.com' },
  { id: 'AIV-2024-0102', name: 'Kiran Desai', initials: 'KD', color: '#0369A1',
    desig: 'Backend Developer', dept: 'Engineering',
    exitType: 'Resignation', phase: 'Phase 2 Clearance', clearance: 60, lastDay: 'Jun 15, 2025', daysLeft: 18, email: 'kiran.desai@aivision21.com' },
  { id: 'AIV-2023-0071', name: 'Meera Joshi', initials: 'MJ', color: '#7C3AED',
    desig: 'Marketing Analyst', dept: 'Marketing',
    exitType: 'Contract End', phase: 'Phase 3 Settlement', clearance: 100, lastDay: 'May 30, 2025', daysLeft: 2, email: 'meera.joshi@aivision21.com' },
  { id: 'AIV-2024-0118', name: 'Sameer Rao', initials: 'SR', color: '#059669',
    desig: 'Sales Executive', dept: 'Sales',
    exitType: 'Termination', phase: 'Phase 1 Initiation', clearance: 0, lastDay: 'May 28, 2025', daysLeft: 0, email: 'sameer.rao@aivision21.com' },
  { id: 'AIV-2022-0045', name: 'Pooja Sharma', initials: 'PS', color: '#D97706',
    desig: 'Finance Executive', dept: 'Finance',
    exitType: 'Retirement', phase: 'Phase 5 Completed', clearance: 100, lastDay: 'Apr 30, 2025', daysLeft: null, email: 'pooja.sharma@aivision21.com' },
];

const EXIT_TYPES = {
  Resignation:    { bg:'#FEF3C7', fg:'#D97706', bd:'#FCD34D', dot:'#D97706', desc:'Employee-initiated' },
  Termination:    { bg:'#FEF2F2', fg:'#DC2626', bd:'#FECACA', dot:'#DC2626', desc:'Company-initiated' },
  Retirement:     { bg:'#FAF5FF', fg:'#7C3AED', bd:'#DDD6FE', dot:'#7C3AED', desc:'Superannuation' },
  'Contract End': { bg:'#EFF6FF', fg:'#2563EB', bd:'#BFDBFE', dot:'#2563EB', desc:'Fixed-term completion' },
  'Internship End':{bg:'#DCFCE7', fg:'#16A34A', bd:'#86EFAC', dot:'#16A34A', desc:'Internship close' },
};

const PHASES = {
  'Phase 1 Initiation': { bg:'#FDF2F2', fg:'#BD1313', bd:'#F5BFBF', fill:'#BD1313' },
  'Phase 2 Clearance':  { bg:'#FEF3C7', fg:'#D97706', bd:'#FCD34D', fill:'#D97706' },
  'Phase 3 Settlement': { bg:'#EFF6FF', fg:'#2563EB', bd:'#BFDBFE', fill:'#2563EB' },
  'Phase 4 Dispatch':   { bg:'#FAF5FF', fg:'#7C3AED', bd:'#DDD6FE', fill:'#7C3AED' },
  'Phase 5 Completed':  { bg:'#DCFCE7', fg:'#16A34A', bd:'#86EFAC', fill:'#16A34A' },
};

/* ── SIDEBAR ────────────────────────────────────────────── */
function Sidebar({ active, setActive }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: Icon.grid },
    { id: 'cases', label: 'Active Cases', icon: Icon.users },
    { id: 'clearance', label: 'Clearance', icon: Icon.checkSquare },
    { id: 'settle', label: 'Settlements', icon: Icon.dollar },
    { id: 'docs', label: 'Documents', icon: Icon.file },
    { id: 'audit', label: 'Audit Logs', icon: Icon.clock },
  ];
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="AIVision" onError={(e)=>{ e.target.style.display='none'; }} />
        <div className="sub">AIVision HRMS</div>
      </div>
      <div className="sb-div" />
      <div className="sb-label">Offboarding</div>
      <nav className="sb-nav">
        {items.map(it => (
          <div key={it.id}
               className={'sb-item ' + (active===it.id ? 'active':'')}
               onClick={()=> setActive(it.id)}>
            <it.icon />
            <span>{it.label}</span>
          </div>
        ))}
      </nav>
      <div className="sb-bottom">
        <div className="sb-div" />
        <div className="sb-me">
          <div className="sb-avatar">RK</div>
          <div className="info">
            <div className="name">Ravi Kumar</div>
            <div className="role">HR Manager</div>
          </div>
          <button className="sb-logout" title="Logout"><Icon.logout /></button>
        </div>
      </div>
    </aside>
  );
}

/* ── KPI ROW ────────────────────────────────────────────── */
function KpiRow() {
  const kpis = [
    { label: 'Active Cases',         value: 4, sub: 'Currently in pipeline', dot: '#FFFFFF' },
    { label: 'Pending Clearance',    value: 2, sub: 'Needs attention',       dot: '#D97706' },
    { label: 'Awaiting Settlement',  value: 1, sub: 'F&F pending',           dot: '#3B82F6' },
    { label: 'Completed This Month', value: 2, sub: 'Successfully closed',   dot: '#16A34A' },
  ];
  return (
    <div className="kpi-row">
      {kpis.map((k,i) => (
        <div key={k.label} className="kpi anim-scalein" style={{ animationDelay: `${i*60}ms` }}>
          <div className="kpi-label">{k.label}</div>
          <div className="kpi-value">{k.value}</div>
          <div className="kpi-sub"><span className="dot" style={{ background: k.dot }}/> {k.sub}</div>
        </div>
      ))}
    </div>
  );
}

/* ── TABLE ──────────────────────────────────────────────── */
function CasesTable({ onOpenInitiate }) {
  const [q, setQ] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('All Phases');
  const [openSel, setOpenSel] = useState(false);
  const selRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (selRef.current && !selRef.current.contains(e.target)) setOpenSel(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const phaseOptions = ['All Phases', ...Object.keys(PHASES)];

  const rows = useMemo(() => EMPLOYEES.filter(r => {
    if (q.trim()){
      const t = q.toLowerCase();
      if (!(r.name.toLowerCase().includes(t) || r.id.toLowerCase().includes(t) || r.dept.toLowerCase().includes(t))) return false;
    }
    if (phaseFilter !== 'All Phases' && r.phase !== phaseFilter) return false;
    return true;
  }), [q, phaseFilter]);

  return (
    <div className="card anim-scalein" style={{ animationDelay:'200ms' }}>
      <div className="card-head">
        <div>
          <h2 className="card-title">Active Offboarding Cases</h2>
          <div className="card-sub">4 employees in exit pipeline</div>
        </div>
        <div className="actions">
          <div className="search-input">
            <Icon.search />
            <input placeholder="Search employees…" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <div className="select" ref={selRef}>
            <div className="select-trigger" onClick={()=>setOpenSel(v=>!v)}>
              <Icon.filter />
              <span>{phaseFilter}</span>
              <Icon.chevron />
            </div>
            {openSel && (
              <div className="select-menu">
                {phaseOptions.map(p => (
                  <div key={p}
                       className={'select-item ' + (p===phaseFilter ? 'active':'')}
                       onClick={()=>{ setPhaseFilter(p); setOpenSel(false); }}>
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <table className="cases">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Exit Type</th>
            <th>Phase</th>
            <th>Clearance</th>
            <th>Last Working Day</th>
            <th style={{ textAlign:'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => {
            const exit = EXIT_TYPES[r.exitType] || EXIT_TYPES['Resignation'];
            const phase = PHASES[r.phase];
            const fillColor = r.clearance === 100 ? '#16A34A' : phase.fill;
            // day chip
            let chip = null;
            if (r.phase === 'Phase 5 Completed') {
              chip = <span className="pill" style={{ background:'#DCFCE7', color:'#16A34A', borderColor:'#86EFAC', fontSize:'10px' }}>Completed</span>;
            } else if (r.daysLeft === 0) {
              chip = <span className="day-chip" style={{ background:'#FEF2F2', color:'#DC2626' }}>Today</span>;
            } else if (r.daysLeft <= 7) {
              chip = <span className="day-chip" style={{ background:'#FEF3C7', color:'#D97706' }}>{r.daysLeft} days</span>;
            } else {
              chip = <span className="day-chip" style={{ background:'#F1F5F9', color:'#64748B', fontWeight: 500 }}>{r.daysLeft} days</span>;
            }
            return (
              <tr key={r.id}>
                <td>
                  <div className="emp">
                    <div className="av" style={{ background: r.color }}>{r.initials}</div>
                    <div>
                      <div className="name">{r.name}</div>
                      <div className="desig">{r.desig}</div>
                      <div className="eid mono">{r.id}</div>
                    </div>
                  </div>
                </td>
                <td>{r.dept}</td>
                <td>
                  <span className="pill" style={{ background: exit.bg, color: exit.fg, borderColor: exit.bd }}>
                    {r.exitType}
                  </span>
                </td>
                <td>
                  <span className="pill" style={{ background: phase.bg, color: phase.fg, borderColor: phase.bd }}>
                    {r.phase}
                  </span>
                </td>
                <td>
                  <div className="progress-row">
                    <span className="progress"><i style={{ width: `${r.clearance}%`, background: fillColor }} /></span>
                    <span className="progress-label">{r.clearance}%</span>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize:'12px', color:'#64748B' }}>{r.lastDay}</div>
                  {chip}
                </td>
                <td style={{ textAlign:'right' }}>
                  <button className="view-btn">View <Icon.arrow /></button>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr><td colSpan="7" style={{ textAlign:'center', padding:'40px', color:'#94A3B8' }}>No cases match your filters.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ── INITIATE EXIT MODAL ────────────────────────────────── */
function InitiateModal({ onClose, onSuccess }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [exitType, setExitType] = useState(null);
  const [lastDate, setLastDate] = useState('');

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const t = query.toLowerCase();
    // demo: include a couple of non-offboarding candidates to feel real
    const pool = [
      ...EMPLOYEES.filter(e => e.phase !== 'Phase 5 Completed'),
      { id: 'AIV-2023-0044', name: 'Priyanka Reddy', initials: 'PR', color:'#0EA5E9', desig: 'QA Engineer', dept: 'Engineering' },
      { id: 'AIV-2024-0156', name: 'Arjun Verma', initials: 'AV', color:'#EA580C', desig: 'Account Manager', dept: 'Sales' },
    ];
    return pool.filter(e => e.name.toLowerCase().includes(t) || e.id.toLowerCase().includes(t) || (e.email||'').toLowerCase().includes(t)).slice(0, 6);
  }, [query]);

  const showResults = query.trim().length >= 2 && !selected;

  // pre-select handling: if user types "priya" and not selected, we let them click. spec asks to "pre-fill priya data" — we satisfy by showing her at top of results.
  // and once selected — set defaults for her.
  useEffect(() => {
    if (selected && selected.name === 'Priya Malhotra') {
      setExitType(prev => prev || 'Resignation');
      setLastDate(prev => prev || '2025-05-31');
    }
  }, [selected]);

  const canProceed = !!(selected && exitType && lastDate);

  return (
    <div className="overlay" onMouseDown={(e)=>{ if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-illu"><Icon.exit /></div>
        <h2>Initiate Employee Exit</h2>
        <div className="desc">Search for the employee to begin the exit process</div>

        <div className="field">
          <div className="field-label">Employee Name or ID</div>
          <div className="input">
            <Icon.search className="lead" />
            <input
              placeholder="Search by name, employee ID, or email…"
              value={query}
              onChange={(e)=>{ setQuery(e.target.value); if (selected) setSelected(null); }}
              autoFocus
            />
          </div>

          {showResults && results.length > 0 && (
            <div className="results">
              {results.map(r => (
                <div key={r.id} className="result-row" onClick={()=>{ setSelected(r); setQuery(r.name); }}>
                  <div className="av av-sm" style={{ background: r.color }}>{r.initials}</div>
                  <div>
                    <div className="name">{r.name}</div>
                    <div className="desig">{r.desig}</div>
                  </div>
                  <span className="dept-chip">{r.dept}</span>
                </div>
              ))}
            </div>
          )}
          {showResults && results.length === 0 && (
            <div className="results">
              <div style={{ padding:'18px', textAlign:'center', color:'#94A3B8', fontSize:'13px' }}>
                No matching employees.
              </div>
            </div>
          )}
        </div>

        {selected && (
          <div className="selected-emp">
            <div className="av" style={{ background: selected.color }}>{selected.initials}</div>
            <div>
              <div className="name">{selected.name}</div>
              <div className="desig">{selected.desig} <span className="mono" style={{ color:'#94A3B8' }}>· {selected.id}</span></div>
            </div>
            <span className="dept-chip" style={{ marginLeft:'auto', marginRight:'10px' }}>{selected.dept}</span>
            <div className="check"><Icon.check /></div>
          </div>
        )}

        <div className="field">
          <div className="field-label">Exit Type</div>
          <div className="exit-grid">
            {['Resignation','Termination','Contract End','Retirement'].map(t => {
              const conf = EXIT_TYPES[t];
              const sel = exitType === t;
              return (
                <div key={t}
                     className={'exit-opt ' + (sel ? 'selected':'')}
                     onClick={()=> setExitType(t)}
                     style={ sel ? { borderColor: conf.bd, background: conf.bg } : null }>
                  <div className="head">
                    <span className="opt-dot" style={{ background: conf.dot }} />
                    <span className="label" style={ sel ? { color: conf.fg } : null }>{t}</span>
                  </div>
                  <div className="desc">{conf.desc}</div>
                  <div className="check" style={{ background: conf.fg, color: 'white' }}><Icon.check /></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="field">
          <div className="field-label">Last Working Date</div>
          <div className="input">
            <Icon.cal className="lead" />
            <input type="date" value={lastDate} onChange={e=>setLastDate(e.target.value)} />
          </div>
        </div>

        <div className="warning">
          <Icon.warn />
          <div>
            This action will notify all department heads and begin the formal exit process. This cannot be undone.
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-cta" disabled={!canProceed} onClick={()=> canProceed && onSuccess(selected)}>
            Proceed to Exit Form <Icon.arrow />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── APP ────────────────────────────────────────────────── */
function DashboardScreen({ nav }){
  const [active, setActive] = useState('dashboard');
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && modal) setModal(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal]);

  return (
    <div className="shell">
      <div className="deco-glow" />
      <Sidebar active={active} setActive={setActive} />

      <main className="main">
        <div className="topbar anim-fadeup">
          <div>
            <h1>Offboarding Dashboard</h1>
            <div className="sub">May 2025 · 4 active cases</div>
          </div>
          <button className="btn-primary" onClick={()=>setModal(true)}>
            <Icon.plus /> Initiate Exit
          </button>
        </div>

        <KpiRow />

        <div className="chips-row">
          <div className="chip">
            <Icon.clock style={{ width:14, height:14, color:'rgba(255,255,255,0.5)' }} />
            Avg. Exit Duration:<strong>28 days</strong>
          </div>
          <div className="chip">
            <span className="dot" style={{ background:'#DC2626' }} />
            Overdue Items:<strong style={{ color:'#FECACA' }}>1</strong>
          </div>
        </div>

        <CasesTable onOpenInitiate={() => setModal(true)} />
      </main>

      {modal && (
        <InitiateModal
          onClose={()=>setModal(false)}
          onSuccess={(emp)=>{
            setModal(false);
            setToast(`Exit initiated for ${emp.name}. Opening exit form…`);
            setTimeout(()=>{ setToast(null); nav('initiation'); }, 900);
          }}
        />
      )}

      {toast && (
        <div className="toast">
          <span className="ok"><Icon.check /></span>
          {toast}
        </div>
      )}
    </div>
  );
}

window.DashboardScreen = DashboardScreen;

})();
