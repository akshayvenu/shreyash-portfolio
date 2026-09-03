;(function(){

const { useState, useMemo } = React;

const Ic = {
  check: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  checkBold: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  download: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  back: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  x: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

const STEPS = ['Initiation','Clearance','Settlement','Dispatch','Completed'];

function Stepper(){
  return (
    <div className="stepper">
      {STEPS.map((s, i) => (
        <React.Fragment key={s}>
          <div className="step">
            <div className="circle"><Ic.checkBold /></div>
            <div className="lbl">{s}</div>
          </div>
          {i < STEPS.length - 1 && <div className="connector" />}
        </React.Fragment>
      ))}
    </div>
  );
}

/* AUDIT ENTRIES */
const ENTRIES = [
  { id: 1, date: 'Apr 28', time: '11:32 AM', type: 'hr',     source: 'HR Manager',    sourceMono: 'HR_MANAGER',
    title: 'Exit Initiated',
    note: 'Resignation received from Priya Malhotra. Exit process formally initiated.',
    by: 'Ravi Kumar', role: 'HR Manager', avatar: 'RK', avatarBg: '#BD1313' },
  { id: 2, date: 'Apr 28', time: '11:35 AM', type: 'system', source: 'System (Auto)', sourceMono: 'SYS_AUTO',
    title: 'Department Notifications Dispatched',
    note: 'Auto-notifications sent to: IT & Systems, Accounts, Admin, Project Manager, and Reporting Manager.',
    by: 'System (Auto)', role: 'Automated', avatar: 'SY', avatarBg: '#2563EB' },
  { id: 3, date: 'Apr 30', time: '09:15 AM', type: 'dept',   source: 'IT & Systems',  sourceMono: 'IT_SYSTEMS',
    title: 'IT & Systems Clearance Completed',
    note: 'All 5 IT items cleared. Laptop returned, access revoked, data backup completed.',
    by: 'Suresh', role: 'IT Admin', avatar: 'SU', avatarBg: '#0369A1' },
  { id: 4, date: 'Apr 30', time: '02:30 PM', type: 'dept',   source: 'Admin',         sourceMono: 'ADMIN_TEAM',
    title: 'Admin Clearance Completed',
    note: 'ID card, parking access, and desk clearance confirmed by Admin team.',
    by: 'Admin Team', role: '', avatar: 'AT', avatarBg: '#7C3AED' },
  { id: 5, date: 'May 1',  time: '10:00 AM', type: 'dept',   source: 'Project Manager', sourceMono: 'PROJECT_MGR',
    title: 'Project Manager Clearance Completed',
    note: 'Handover, knowledge transfer, and client transition sign-off received.',
    by: 'Arjun Nair', role: 'VP Product', avatar: 'AN', avatarBg: '#16A34A' },
  { id: 6, date: 'May 5',  time: '03:00 PM', type: 'dept',   source: 'Accounts',      sourceMono: 'ACCOUNTS',
    title: 'Accounts Clearance Completed',
    note: 'All 4 items cleared. Vouchers received and verified by Accounts team.',
    by: 'Accounts Team', role: '', avatar: 'AC', avatarBg: '#D97706' },
  { id: 7, date: 'May 5',  time: '04:15 PM', type: 'system', source: 'System (Auto)', sourceMono: 'SYS_AUTO',
    title: 'F&F Settlement Calculated',
    note: 'Net payable: ₹2,79,038. Payment scheduled June 10, 2025 via NEFT to HDFC XXXX 4521.',
    by: 'System (Auto)', role: 'Automated', avatar: 'SY', avatarBg: '#2563EB' },
  { id: 8, date: 'May 5',  time: '04:30 PM', type: 'hr',     source: 'HR Manager',    sourceMono: 'HR_MANAGER',
    title: 'Documents Approved & Dispatched',
    note: '4 documents dispatched to priya.malhotra@gmail.com. Employee record updated to Terminated.',
    by: 'Ravi Kumar', role: 'HR Manager', avatar: 'RK', avatarBg: '#BD1313' },
];

const TYPE_COLORS = {
  hr:     { color: '#BD1313', bg: '#FDF2F2', border: '#F5BFBF' },
  system: { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  dept:   { color: '#16A34A', bg: '#DCFCE7', border: '#86EFAC' },
};

/* MASTER RECORD MODAL */
function MasterRecordModal({ onClose }){
  return (
    <div className="overlay" onMouseDown={(e)=>{ if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="mh">
          <div>
            <div className="t">Offboarding Master Record</div>
            <div className="s mono">AIV-2024-0089 · Priya Malhotra</div>
          </div>
          <button className="x" onClick={onClose}><Ic.x /></button>
        </div>

        <div className="mb">
          {/* SECTION 1 — Employee */}
          <div className="ms">
            <div className="ms-label">Employee Details</div>
            <div className="ms-grid">
              <div><div className="ms-k">Name</div><div className="ms-v">Priya Malhotra</div></div>
              <div><div className="ms-k">Designation</div><div className="ms-v">Senior Product Designer</div></div>
              <div><div className="ms-k">Department</div><div className="ms-v">Design & Product</div></div>
              <div><div className="ms-k">Employee ID</div><div className="ms-v mono">AIV-2024-0089</div></div>
              <div><div className="ms-k">Joined</div><div className="ms-v">March 14, 2021</div></div>
              <div><div className="ms-k">Tenure</div><div className="ms-v">4 yrs 2 mos</div></div>
            </div>
          </div>

          {/* SECTION 2 — Exit */}
          <div className="ms">
            <div className="ms-label">Exit Details</div>
            <div className="ms-grid">
              <div><div className="ms-k">Exit Type</div><div className="ms-v">Resignation</div></div>
              <div><div className="ms-k">Resignation Date</div><div className="ms-v">Apr 28, 2025</div></div>
              <div><div className="ms-k">Last Working Day</div><div className="ms-v">May 31, 2025</div></div>
              <div><div className="ms-k">Notice Period</div><div className="ms-v">30 days · Serving</div></div>
              <div><div className="ms-k">Handover To</div><div className="ms-v">Rohit Mehra</div></div>
              <div><div className="ms-k">Reporting Manager</div><div className="ms-v">Arjun Nair — VP Product</div></div>
              <div className="ms-full"><div className="ms-k">Reason</div><div className="ms-v" style={{ fontWeight: 500 }}>Personal reasons — pursuing higher education.</div></div>
            </div>
          </div>

          {/* SECTION 3 — Clearance */}
          <div className="ms">
            <div className="ms-label">Clearance Summary</div>
            <div className="clr-row">
              <div>
                <div className="nm">IT &amp; Systems</div>
                <div className="meta">5 items · cleared by Suresh</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div className="badge">Cleared</div>
                <div className="meta">May 1, 2025</div>
              </div>
            </div>
            <div className="clr-row">
              <div>
                <div className="nm">Admin</div>
                <div className="meta">3 items · cleared by Admin Team</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div className="badge">Cleared</div>
                <div className="meta">Apr 30, 2025</div>
              </div>
            </div>
            <div className="clr-row">
              <div>
                <div className="nm">Project Manager</div>
                <div className="meta">3 items · cleared by Arjun Nair</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div className="badge">Cleared</div>
                <div className="meta">May 1, 2025</div>
              </div>
            </div>
            <div className="clr-row">
              <div>
                <div className="nm">Accounts</div>
                <div className="meta">4 items · cleared by Accounts Team</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div className="badge">Cleared</div>
                <div className="meta">May 5, 2025</div>
              </div>
            </div>
            <div className="clr-overall">
              <Ic.checkBold /> Overall clearance: <strong>100%</strong> · completed May 5, 2025
            </div>
          </div>

          {/* SECTION 4 — F&F */}
          <div className="ms">
            <div className="ms-label">F&F Summary</div>
            <div className="ms-grid">
              <div><div className="ms-k">Gross Earnings</div><div className="ms-v" style={{ color:'#16A34A' }}>₹2,96,538</div></div>
              <div><div className="ms-k">Deductions</div><div className="ms-v" style={{ color:'#DC2626' }}>−₹17,500</div></div>
              <div><div className="ms-k">Net Payable</div><div className="ms-v" style={{ fontSize: 15 }}>₹2,79,038</div></div>
              <div><div className="ms-k">Payment Date</div><div className="ms-v">June 10, 2025</div></div>
              <div><div className="ms-k">Payment Mode</div><div className="ms-v">Bank Transfer (NEFT)</div></div>
              <div><div className="ms-k">Bank Details</div><div className="ms-v">HDFC · <span className="mono">XXXX 4521</span></div></div>
            </div>
          </div>

          {/* SECTION 5 — Documents */}
          <div className="ms">
            <div className="ms-label">Documents Dispatched</div>
            <div className="doc-row">
              <span className="tmpl">TMPL-001</span>
              <div className="nm">Acceptance of Resignation</div>
              <span className="dt">May 5, 2025</span>
            </div>
            <div className="doc-row">
              <span className="tmpl">TMPL-002</span>
              <div className="nm">Relieving Letter</div>
              <span className="dt">May 5, 2025</span>
            </div>
            <div className="doc-row">
              <span className="tmpl">TMPL-003</span>
              <div className="nm">Experience Certificate</div>
              <span className="dt">May 5, 2025</span>
            </div>
            <div className="doc-row">
              <span className="tmpl">TMPL-004</span>
              <div className="nm">F&F Settlement Statement</div>
              <span className="dt">May 5, 2025</span>
            </div>
            <div className="deliv">
              Delivered to: <strong>priya.malhotra@gmail.com</strong>
            </div>
          </div>
        </div>

        <div className="mf">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary"><Ic.download /> Download Full Record PDF</button>
        </div>
      </div>
    </div>
  );
}

/* APP */
function AuditScreen({ nav }){
  const [filter, setFilter] = useState('all');
  const [showMaster, setShowMaster] = useState(false);
  const [toast, setToast] = useState(null);

  const filterDef = [
    { id: 'all',     label: 'All Actions' },
    { id: 'hr',      label: 'HR Actions' },
    { id: 'system',  label: 'System' },
    { id: 'dept',    label: 'Departments' },
  ];

  const counts = useMemo(() => ({
    all:     ENTRIES.length,
    hr:      ENTRIES.filter(e => e.type === 'hr').length,
    system:  ENTRIES.filter(e => e.type === 'system').length,
    dept:    ENTRIES.filter(e => e.type === 'dept').length,
  }), []);

  const entries = useMemo(() => {
    if (filter === 'all') return ENTRIES;
    return ENTRIES.filter(e => e.type === filter);
  }, [filter]);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2400); };

  return (
    <div className="shell">
      <div className="deco-glow" />

      {/* TOP NAV */}
      <div className="topnav">
        <div className="nav-left">
          <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="AIVision" onError={(e)=>e.target.style.display='none'} />
          <div className="divider" />
          <div className="title">AIVision HRMS<span className="crumb"> / Audit Log</span></div>
        </div>
        <div className="nav-right">
          <div className="who">
            <div className="name">Ravi Kumar</div>
            <div className="role">HR Manager</div>
          </div>
          <div className="av-rk">RK</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="card-top">
            <div className="l">
              <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="" onError={(e)=>e.target.style.display='none'} />
              <div className="t">AIVision HRMS · Completion Audit Log</div>
            </div>
            <div className="r">
              <span className="lbl">Need help?</span>
              <span className="em">hr@aivision21.co</span>
            </div>
          </div>

          <Stepper />

          {/* COMPLETION BANNER */}
          <div className="complete-banner">
            <Ic.checkBold />
            <span>Offboarding for Priya Malhotra completed on May 5, 2025.</span>
          </div>

          {/* MASTER RECORD BANNER */}
          <div className="mr-banner">
            <div className="mr-top">
              <div className="mr-avatar">PM</div>
              <div className="mr-info">
                <div className="mr-name">Priya Malhotra</div>
                <div className="mr-desig">Senior Product Designer · Design & Product</div>
                <div className="mr-id mono">AIV-2024-0089</div>
              </div>
              <div className="mr-chips">
                <span className="pill" style={{ background:'#F1F5F9', color:'#64748B', borderColor:'#E2E8F0' }}>
                  <span style={{ width: 6, height: 6, borderRadius:'50%', background:'#64748B' }} />
                  Terminated
                </span>
                <span className="pill" style={{ background:'#FEF3C7', color:'#D97706', borderColor:'#FCD34D' }}>
                  Resignation
                </span>
                <span className="pill-stack">
                  <span className="k">Last day</span>
                  <span className="v">May 31, 2025</span>
                </span>
              </div>
            </div>

            <div className="mr-summary-chips">
              <span className="sum-chip" style={{ background:'#F1F5F9', color:'#475569', borderColor:'#E2E8F0' }}>
                Tenure: <strong style={{ marginLeft: 4 }}>4 yrs 2 mos</strong>
              </span>
              <span className="sum-chip" style={{ background:'#DCFCE7', color:'#16A34A', borderColor:'#86EFAC' }}>
                F&amp;F: <strong style={{ marginLeft: 4 }}>₹2,79,038</strong>
              </span>
              <span className="sum-chip" style={{ background:'#EFF6FF', color:'#2563EB', borderColor:'#BFDBFE' }}>
                Docs: <strong style={{ marginLeft: 4 }}>4 dispatched</strong>
              </span>
              <span className="sum-chip" style={{ background:'#DCFCE7', color:'#16A34A', borderColor:'#86EFAC' }}>
                Clearance: <strong style={{ marginLeft: 4 }}>100%</strong>
              </span>
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="stats">
            <div className="stat">
              <div className="lbl">Exit Initiated</div>
              <div className="val">Apr 28, 2025</div>
            </div>
            <div className="stat">
              <div className="lbl">Clearance Completed</div>
              <div className="val">May 5, 2025</div>
            </div>
            <div className="stat">
              <div className="lbl">Documents Dispatched</div>
              <div className="val">May 5, 2025</div>
            </div>
            <div className="stat">
              <div className="lbl">Total Days</div>
              <div className="val red">7 days</div>
            </div>
          </div>

          {/* ACTION BAR */}
          <div className="actionbar">
            <div className="filters">
              {filterDef.map(f => (
                <button key={f.id}
                        className={'filt ' + (filter === f.id ? 'active' : '')}
                        onClick={() => setFilter(f.id)}>
                  {f.label}
                  <span className="count">{counts[f.id]}</span>
                </button>
              ))}
            </div>
            <div className="spacer" />
            <button className="pdf-btn" onClick={() => showToast('Audit PDF downloaded.')}>
              <Ic.download /> Download Audit PDF
            </button>
            <button className="ghost-link" onClick={() => setShowMaster(true)}>
              View Master Record →
            </button>
          </div>

          {/* TIMELINE */}
          <div className="timeline" key={filter}>
            {entries.map((e, i) => {
              const c = TYPE_COLORS[e.type];
              return (
                <div key={e.id} className="entry" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="e-left">
                    <div className="e-bar" style={{ background: c.color }} />
                    <div className="e-dot" style={{ background: c.color }} />
                  </div>
                  <div className="e-date">
                    <div className="d">{e.date}</div>
                    <div className="t">{e.time}</div>
                  </div>
                  <div className="e-content">
                    <div className="e-top">
                      <span className="pill" style={{ background: c.bg, color: c.color, borderColor: c.border }}>
                        {e.source}
                      </span>
                      <span className="e-source">{e.sourceMono}</span>
                    </div>
                    <div className="e-title">{e.title}</div>
                    <div className="e-note">{e.note}</div>
                    <div className="e-by">
                      <span className="av" style={{ background: e.avatarBg }}>{e.avatar}</span>
                      by <strong style={{ color: '#475569', fontWeight: 500 }}>{e.by}</strong>
                      {e.role && <> <span>({e.role})</span></>}
                    </div>
                  </div>
                </div>
              );
            })}
            {entries.length === 0 && (
              <div style={{ padding: 40, textAlign:'center', color:'#94A3B8', fontSize:13 }}>
                No matching actions.
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="foot">
            <button className="foot-ghost" onClick={() => nav('dashboard')}>
              <Ic.back /> Back to Dashboard
            </button>
            <div className="closed-pill">
              <Ic.checkBold /> Case Closed
            </div>
          </div>
        </div>
      </div>

      {showMaster && <MasterRecordModal onClose={() => setShowMaster(false)} />}

      {toast && (
        <div className="toast"><Ic.check style={{ color:'#86EFAC' }} /> {toast}</div>
      )}
    </div>
  );
}

window.AuditScreen = AuditScreen;

})();
