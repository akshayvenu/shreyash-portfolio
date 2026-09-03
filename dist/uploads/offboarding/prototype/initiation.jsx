;(function(){

const { useState, useEffect, useMemo } = React;

/* ICONS */
const Ic = {
  info: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  warn: (p) => <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  lock: (p) => <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  check: (p) => <svg {...p} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  checkCircle: (p) => <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  arrow: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  back: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  file: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  wallet: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4z"/></svg>,
  monitor: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  building: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  briefcase: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  okBig: (p) => <svg {...p} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
};

/* TOP NAV */
function TopNav(){
  return (
    <div className="topnav">
      <div className="nav-left">
        <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="AIVision" onError={(e)=>e.target.style.display='none'} />
        <div className="divider" />
        <div className="title">AIVision HRMS<span className="crumb"> / Offboarding</span></div>
      </div>
      <div className="nav-right">
        <div className="who">
          <div className="name">Ravi Kumar</div>
          <div className="role">HR Manager</div>
        </div>
        <div className="av-rk">RK</div>
      </div>
    </div>
  );
}

/* STEPPER */
function Stepper(){
  const steps = ['Initiation','Clearance','Settlement','Dispatch','Completed'];
  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className={'step ' + (i===0 ? 'active' : '')}>
            <div className="circle">{i+1}</div>
            <div className="lbl">{s}</div>
          </div>
          {i < steps.length - 1 && <div className="connector" />}
        </React.Fragment>
      ))}
    </div>
  );
}

/* CHECKBOX */
function Check({ checked, disabled, onClick }){
  const cls = 'cbox ' + (disabled ? 'disabled ' : '') + (checked ? 'checked' : '');
  return (
    <div className={cls} onClick={()=>{ if (!disabled && onClick) onClick(); }} role="checkbox" aria-checked={checked}>
      {checked && <Ic.check />}
    </div>
  );
}

/* SUCCESS MODAL */
function SuccessModal({ onGo }){
  const confettiColors = ['#BD1313','#FBBF24','#3B82F6','#16A34A','#A855F7','#F97316','#EC4899','#06B6D4','#FACC15','#EF4444'];
  const confetti = useMemo(() => {
    return new Array(18).fill(0).map((_,i) => ({
      left: 4 + Math.random() * 92,
      delay: Math.random() * 0.35,
      color: confettiColors[i % confettiColors.length],
      shape: i % 3,
      duration: 1.3 + Math.random() * 0.8,
    }));
  }, []);

  return (
    <div className="overlay">
      <div className="modal">
        {confetti.map((c, i) => (
          <div key={i} className="confetti"
               style={{
                 left: c.left + '%',
                 background: c.color,
                 animationDelay: c.delay + 's',
                 animationDuration: c.duration + 's',
                 borderRadius: c.shape === 0 ? '50%' : (c.shape === 1 ? '2px' : '0'),
                 width: c.shape === 0 ? '8px' : '8px',
                 height: c.shape === 0 ? '8px' : '14px',
               }} />
        ))}
        <div className="ok-illu"><Ic.okBig /></div>
        <h2>Exit Process Initiated!</h2>
        <div className="desc">Priya Malhotra's offboarding has been initiated successfully.</div>

        <div className="info-box">
          <div className="row"><span className="k">Employee ID</span><span className="v mono">AIV-2024-0089</span></div>
          <div className="row"><span className="k">Last Working Day</span><span className="v">May 31, 2025</span></div>
          <div className="row"><span className="k">Departments Notified</span><span className="v">Accounts, IT, Admin, PM</span></div>
        </div>

        <div className="note-list">
          <div className="ln"><Ic.check style={{ color:'#16A34A' }} /> All department heads notified via email</div>
          <div className="ln"><Ic.check style={{ color:'#16A34A' }} /> Audit log entry created</div>
          <div className="ln"><Ic.check style={{ color:'#16A34A' }} /> Clearance tracker activated</div>
        </div>

        <button className="modal-cta" onClick={onGo}>
          Go to Clearance Tracker <Ic.arrow />
        </button>
      </div>
    </div>
  );
}

/* APP */
function InitiationScreen({ nav }){
  const [locked, setLocked] = useState(false);
  const [docs, setDocs] = useState({
    'TMPL-001': true,
    'TMPL-002': true,
    'TMPL-003': true,
    'TMPL-004': true,
    'TMPL-005': false, // disabled
  });
  const [form, setForm] = useState({
    resignDate: '2025-04-28',
    lastDay: '2025-05-31',
    notice: '30 days',
    noticeStatus: 'Serving Notice',
    reason: 'Personal reasons — pursuing higher education.',
    reportingMgr: 'Arjun Nair',
    handoverTo: 'Rohit Mehra',
    deptHead: 'Arjun Nair — VP Product',
    handoverDeadline: '2025-05-25',
    bank: 'XXXX XXXX 4521',
    bankName: 'HDFC Bank',
    ifsc: 'HDFC0001234',
    paymentMode: 'Bank Transfer (NEFT)',
  });
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);

  const onField = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleLockClick = () => { if (!locked) setLocked(true); };

  const initiate = () => {
    if (!locked) return;
    setSuccess(true);
  };

  return (
    <div className="shell">
      <div className="deco-glow" />
      <TopNav />

      <div className="card-wrap">
        <div className={'card ' + (locked ? 'locked' : '')}>
          {/* card top */}
          <div className="card-top">
            <div className="l">
              <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="" onError={(e)=>e.target.style.display='none'} />
              <div className="t">AIVision HRMS · Offboarding</div>
            </div>
            <div className="r">
              <span className="lbl">Need help?</span>
              <span className="em">hr@aivision21.co</span>
            </div>
          </div>

          <Stepper />

          <div className="body">
            {/* Employee Banner */}
            <div className="emp-banner">
              <div className="av">PM</div>
              <div className="info">
                <div className="name">Priya Malhotra</div>
                <div className="desig">Senior Product Designer · Design & Product</div>
                <div className="eid mono">AIV-2024-0089</div>
              </div>
              <div className="chips">
                <span className="pill" style={{ background:'#FEF3C7', color:'#D97706', borderColor:'#FCD34D' }}>Resignation</span>
                <span className="pill" style={{ background:'#F1F5F9', color:'#64748B', borderColor:'#E2E8F0' }}>4 yrs 2 mos tenure</span>
              </div>
            </div>

            {/* EXIT DETAILS */}
            <div className="section">
              <div className="sec-label">Exit Details</div>
              <div className="grid2">
                <div className="fld">
                  <div className="lbl">Resignation Date</div>
                  <input className="inp" type="date" value={form.resignDate} onChange={onField('resignDate')} />
                </div>
                <div className="fld">
                  <div className="lbl">Last Working Date</div>
                  <input className="inp" type="date" value={form.lastDay} onChange={onField('lastDay')} />
                </div>
                <div className="fld">
                  <div className="lbl">Notice Period</div>
                  <select className="sel" value={form.notice} onChange={onField('notice')}>
                    <option>30 days</option>
                    <option>60 days</option>
                    <option>90 days</option>
                    <option>Waived</option>
                  </select>
                </div>
                <div className="fld">
                  <div className="lbl">Notice Status</div>
                  <select className="sel" value={form.noticeStatus} onChange={onField('noticeStatus')}>
                    <option>Serving Notice</option>
                    <option>Notice Waived</option>
                    <option>Notice Buy-out</option>
                  </select>
                </div>
                <div className="fld" style={{ gridColumn:'1 / -1' }}>
                  <div className="lbl">Reason for Exit</div>
                  <textarea className="inp" value={form.reason} onChange={onField('reason')}
                    placeholder="Brief reason for exit (optional — not included in documents)" />
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* REPORTING & HANDOVER */}
            <div className="section">
              <div className="sec-label">Reporting & Handover</div>
              <div className="grid2">
                <div className="fld">
                  <div className="lbl">Reporting Manager</div>
                  <input className="inp" readOnly value={form.reportingMgr} />
                </div>
                <div className="fld">
                  <div className="lbl">Handover To</div>
                  <input className="inp" value={form.handoverTo} placeholder="Assign handover person" onChange={onField('handoverTo')} />
                </div>
                <div className="fld">
                  <div className="lbl">Department Head</div>
                  <input className="inp" readOnly value={form.deptHead} />
                </div>
                <div className="fld">
                  <div className="lbl">Handover Deadline</div>
                  <input className="inp" type="date" value={form.handoverDeadline} onChange={onField('handoverDeadline')} />
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* SETTLEMENT & BANKING */}
            <div className="section">
              <div className="sec-label">Settlement & Banking</div>
              <div className="grid2">
                <div className="fld">
                  <div className="lbl">Bank Account</div>
                  <input className="inp mono" readOnly value={form.bank} />
                </div>
                <div className="fld">
                  <div className="lbl">Bank Name</div>
                  <input className="inp" readOnly value={form.bankName} />
                </div>
                <div className="fld">
                  <div className="lbl">IFSC Code</div>
                  <input className="inp mono" readOnly value={form.ifsc} />
                </div>
                <div className="fld">
                  <div className="lbl">Payment Mode</div>
                  <select className="sel" value={form.paymentMode} onChange={onField('paymentMode')}>
                    <option>Bank Transfer (NEFT)</option>
                    <option>Cheque</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>

              <div className="info-blue">
                <Ic.info />
                <div>Settlement will be processed on <strong>June 10, 2025</strong> as per company policy.</div>
              </div>
            </div>

            <div className="divider" />

            {/* DOCUMENTS */}
            <div className="section">
              <div className="sec-label">Documents to Generate</div>
              <div style={{ fontSize:13, color:'#64748B', marginTop:'-6px', marginBottom:12 }}>
                The following documents will be generated upon approval:
              </div>

              {[
                { id: 'TMPL-001', name: 'Acceptance of Resignation' },
                { id: 'TMPL-002', name: 'Relieving Letter' },
                { id: 'TMPL-003', name: 'Experience Certificate' },
                { id: 'TMPL-004', name: 'F&F Settlement Statement' },
                { id: 'TMPL-005', name: 'Internship Completion Letter', disabled: true },
              ].map(d => (
                <div key={d.id} className={'doc-row ' + (d.disabled ? 'disabled' : '')}>
                  <Check
                    checked={!!docs[d.id]}
                    disabled={d.disabled || locked}
                    onClick={() => setDocs(prev => ({ ...prev, [d.id]: !prev[d.id] }))}
                  />
                  <div className={'doc-icon ' + (d.disabled ? 'gray' : '')}><Ic.file /></div>
                  <div>
                    <div className="doc-name">{d.name}</div>
                    <div className="doc-id mono">{d.id}</div>
                  </div>
                  {d.disabled && <div className="small">Not applicable</div>}
                </div>
              ))}
            </div>

            <div className="divider" />

            {/* DEPARTMENT CLEARANCE */}
            <div className="section">
              <div className="sec-label">Department Clearance Required</div>
              <div style={{ fontSize:13, color:'#64748B', marginTop:'-6px', marginBottom:12 }}>
                Clearance requests will be automatically dispatched to the following departments on initiation:
              </div>
              <div className="dept-row">
                <span className="dept-chip" style={{ background:'#FEF3C7', color:'#D97706', borderColor:'#FCD34D' }}>
                  <Ic.wallet /> Accounts
                </span>
                <span className="dept-chip" style={{ background:'#EFF6FF', color:'#2563EB', borderColor:'#BFDBFE' }}>
                  <Ic.monitor /> IT & Systems
                </span>
                <span className="dept-chip" style={{ background:'#FAF5FF', color:'#7C3AED', borderColor:'#DDD6FE' }}>
                  <Ic.building /> Admin
                </span>
                <span className="dept-chip" style={{ background:'#DCFCE7', color:'#16A34A', borderColor:'#86EFAC' }}>
                  <Ic.briefcase /> Project Manager
                </span>
              </div>
            </div>

            <div style={{ height: 24 }} />

            {/* LOCK SECTION */}
            <div className="warn">
              <Ic.warn />
              <div>Once locked, this form cannot be edited. All department heads will be notified automatically.</div>
            </div>

            <div className="lock-row">
              <span className="lk-icon"><Ic.lock /></span>
              <span className="lk-text">Lock form to proceed</span>
              <div className={'toggle ' + (locked ? 'on' : '')} onClick={() => !locked && setLocked(true)} role="switch" aria-checked={locked} />
            </div>

            <button
              className={'lock-cta ' + (locked ? 'locked' : 'unlocked')}
              onClick={handleLockClick}
              disabled={locked}
            >
              {locked
                ? (<><Ic.checkCircle /> Form Locked</>)
                : (<><Ic.lock /> Lock Form & Initiate Exit Process</>)
              }
            </button>
          </div>

          {/* footer */}
          <div className="foot">
            <button className="ghost" onClick={() => nav('dashboard')}>
              <Ic.back /> Back to Dashboard
            </button>
            <div style={{ display:'flex', gap:10 }}>
              <button className="btn btn-secondary" onClick={() => { setToast('Draft saved.'); setTimeout(()=>setToast(null), 2200); }}>
                Save Draft
              </button>
              <button className="btn btn-primary" disabled={!locked} onClick={initiate}>
                Initiate Exit Process <Ic.arrow />
              </button>
            </div>
          </div>
        </div>
      </div>

      {success && <SuccessModal onGo={()=>{ setSuccess(false); nav('clearance'); }} />}

      {toast && (
        <div className="toast"><Ic.check style={{ color:'#86EFAC' }} /> {toast}</div>
      )}
    </div>
  );
}

window.InitiationScreen = InitiationScreen;

})();
