;(function(){

const { useState, useMemo } = React;

const Ic = {
  check: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  checkBold: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  clock: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  bell: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  arrow: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  back: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  octWarn: (p) => <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  triWarn: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  plus: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
};

/* STEPPER (Initiation done, Clearance active) */
function Stepper(){
  const steps = [
    { label: 'Initiation', state: 'done' },
    { label: 'Clearance',  state: 'active' },
    { label: 'Settlement', state: 'upcoming' },
    { label: 'Dispatch',   state: 'upcoming' },
    { label: 'Completed',  state: 'upcoming' },
  ];
  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <React.Fragment key={s.label}>
          <div className={'step ' + s.state}>
            <div className="circle">
              {s.state === 'done' ? <Ic.checkBold /> : i + 1}
            </div>
            <div className="lbl">{s.label}</div>
          </div>
          {i < steps.length - 1 && (
            <div className={'connector ' + (s.state === 'done' ? 'done' : '')} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* INITIAL DATA */
const initialDepts = {
  accounts: {
    label: 'Accounts',
    full: 'Accounts Department',
    color: '#D97706',
    items: [
      { id: 'A1', name: 'Invoices (Physical)',                   status: 'cleared', date: 'Apr 28, 2025' },
      { id: 'A2', name: 'Invoice / Collection / Outstanding Data', status: 'cleared', date: 'Apr 29, 2025' },
      { id: 'A3', name: 'Petty Cash Statement & Vouchers',
        status: 'pending', due: 'Due: May 5, 2025',  sub: 'Awaiting physical vouchers' },
      { id: 'A4', name: 'Tour Expenses Statement & Vouchers',
        status: 'pending', due: 'Due: May 10, 2025', sub: 'Trip report outstanding' },
    ],
  },
  it: {
    label: 'IT & Systems',
    full: 'IT & Systems Department',
    color: '#2563EB',
    items: [
      { id: 'I1', name: 'Laptop Return',              status: 'cleared', date: 'Apr 30, 2025' },
      { id: 'I2', name: 'Access Cards & Keys',         status: 'cleared', date: 'Apr 30, 2025' },
      { id: 'I3', name: 'Email Account Deactivation',  status: 'cleared', date: 'May 1, 2025' },
      { id: 'I4', name: 'Software Licenses Revoked',   status: 'cleared', date: 'May 1, 2025' },
      { id: 'I5', name: 'Data Backup Completed',       status: 'cleared', date: 'May 1, 2025' },
    ],
    completedOn: 'May 1, 2025',
  },
  admin: {
    label: 'Admin',
    full: 'Admin Department',
    color: '#7C3AED',
    items: [
      { id: 'AD1', name: 'ID Card Return',         status: 'cleared', date: 'Apr 30, 2025' },
      { id: 'AD2', name: 'Parking Access Revoked', status: 'cleared', date: 'Apr 30, 2025' },
      { id: 'AD3', name: 'Locker / Desk Cleared',  status: 'cleared', date: 'May 1, 2025' },
    ],
    completedOn: 'May 1, 2025',
  },
  pm: {
    label: 'Project Manager',
    full: 'Project Manager Clearance',
    color: '#16A34A',
    items: [
      { id: 'P1', name: 'Project Handover Completed',   status: 'cleared', date: 'Apr 29, 2025' },
      { id: 'P2', name: 'Knowledge Transfer Done',       status: 'cleared', date: 'Apr 30, 2025' },
      { id: 'P3', name: 'Client Transition Sign-off',    status: 'cleared', date: 'May 1, 2025' },
    ],
    completedOn: 'May 1, 2025',
  },
};

function isDeptCleared(d){ return d.items.every(it => it.status === 'cleared'); }

/* ITEM ROW */
function ItemRow({ it, onMark, justCleared }){
  const cleared = it.status === 'cleared';
  return (
    <div className={'item ' + (justCleared ? 'justCleared' : '')}>
      <div className={'item-icon ' + (cleared ? 'ok' : 'pending')}>
        {cleared ? <Ic.check /> : <Ic.clock />}
      </div>
      <div className="item-mid">
        <div className="item-name">{it.name}</div>
        {!cleared && it.sub && <div className="item-note">{it.sub}</div>}
      </div>
      <div className={'item-date ' + (cleared ? '' : 'amber')}>
        {cleared ? it.date : it.due}
      </div>
      <div className="item-right">
        {cleared ? (
          <span className="pill" style={{ background:'#DCFCE7', color:'#16A34A', borderColor:'#86EFAC' }}>
            <Ic.check style={{ marginRight: 4 }} /> Cleared
          </span>
        ) : (
          <>
            <span className="pill" style={{ background:'#FEF3C7', color:'#D97706', borderColor:'#FCD34D' }}>Pending</span>
            <button className="mark-btn" onClick={onMark}>Mark Cleared</button>
          </>
        )}
      </div>
    </div>
  );
}

/* MARK MODAL */
function MarkModal({ item, onClose, onConfirm }){
  const today = new Date().toISOString().slice(0, 10);
  const [dateCleared, setDateCleared] = useState(today);
  const [clearedBy, setClearedBy]   = useState('');
  const [notes, setNotes]           = useState('');
  const [received, setReceived]     = useState(false);

  // last working day = 2025-05-31; warn if after
  const showWarn = dateCleared > '2025-05-31';

  const canConfirm = clearedBy.trim().length > 0;

  return (
    <div className="overlay" onMouseDown={(e)=>{ if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <h2>Mark Item as Cleared</h2>
        <div className="mh-sub">{item.name}</div>

        <div className="fld">
          <div className="lbl">Date Cleared</div>
          <input className="inp" type="date" value={dateCleared} onChange={e=>setDateCleared(e.target.value)} />
        </div>

        <div className="fld">
          <div className="lbl">Cleared By</div>
          <input className="inp" value={clearedBy} onChange={e=>setClearedBy(e.target.value)} placeholder="Name of person who cleared" />
        </div>

        <div className="fld">
          <div className="lbl">Notes</div>
          <textarea className="inp" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Optional confirmation notes" />
        </div>

        <div className="toggle-row">
          <div className={'toggle ' + (received ? 'on' : '')} onClick={()=>setReceived(v=>!v)} role="switch" aria-checked={received} />
          <div className="toggle-text">Mark document as physically received</div>
        </div>

        {showWarn && (
          <div className="amber-warn">
            <Ic.triWarn />
            <div>This item is being cleared after the last working date (May 31, 2025).</div>
          </div>
        )}

        <div className="modal-foot">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-success" disabled={!canConfirm} onClick={()=> canConfirm && onConfirm({
            dateCleared, clearedBy, notes, received,
          })} style={ !canConfirm ? { background:'#A7F3D0', boxShadow:'none', cursor:'not-allowed' } : null }>
            <Ic.check /> Confirm Clearance
          </button>
        </div>
      </div>
    </div>
  );
}

/* APP */
function ClearanceScreen({ nav }){
  const [depts, setDepts]   = useState(initialDepts);
  const [activeTab, setTab] = useState('accounts');
  const [modalItem, setModalItem] = useState(null);
  const [justClearedId, setJustClearedId] = useState(null);
  const [toast, setToast] = useState(null);

  const order = ['accounts','it','admin','pm'];

  const totalDepts = order.length;
  const clearedDepts = order.filter(k => isDeptCleared(depts[k])).length;
  const progress = (clearedDepts / totalDepts) * 100;
  const allCleared = clearedDepts === totalDepts;

  const confirmMark = (deptKey, itemId, info) => {
    setDepts(prev => {
      const next = { ...prev };
      const d = { ...next[deptKey] };
      d.items = d.items.map(it => it.id === itemId ? {
        ...it,
        status: 'cleared',
        date: new Date(info.dateCleared).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }),
      } : it);
      // if newly all cleared, set completedOn
      if (d.items.every(it => it.status === 'cleared')) {
        d.completedOn = new Date(info.dateCleared).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
      }
      next[deptKey] = d;
      return next;
    });
    setJustClearedId(itemId);
    setModalItem(null);
    setTimeout(()=> setJustClearedId(null), 800);
    setToast(`Item cleared: ${info.clearedBy ? 'by ' + info.clearedBy : ''}`);
    setTimeout(()=> setToast(null), 2400);
  };

  const current = depts[activeTab];
  const currentCleared = isDeptCleared(current);

  return (
    <div className="shell">
      <div className="deco-glow" />

      {/* TOP NAV */}
      <div className="topnav">
        <div className="nav-left">
          <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="AIVision" onError={(e)=>e.target.style.display='none'} />
          <div className="divider" />
          <div className="title">AIVision HRMS<span className="crumb"> / Clearance</span></div>
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
          {/* card top */}
          <div className="card-top">
            <div className="l">
              <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="" onError={(e)=>e.target.style.display='none'} />
              <div className="t">AIVision HRMS · Clearance Tracker</div>
            </div>
            <div className="r">
              <span className="lbl">Need help?</span>
              <span className="em">hr@aivision21.co</span>
            </div>
          </div>

          <Stepper />

          {/* SUMMARY */}
          <div className="summary">
            <div className="sum-emp">
              <div className="av">PM</div>
              <div>
                <div className="name">Priya Malhotra</div>
                <div className="desig">Senior Product Designer · May 31, 2025</div>
                <span className="pill" style={{ background:'#FEF3C7', color:'#D97706', borderColor:'#FCD34D', marginTop: 4 }}>Resignation</span>
              </div>
            </div>
            <div className="sum-mid">
              <div className="label">Overall Clearance</div>
              <div className="prog-shell">
                <div className="prog-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="progress-text">{clearedDepts} of {totalDepts} departments cleared</div>
            </div>
            <div className="sum-right">
              <button className="btn btn-secondary" onClick={() => { setToast('Reminder sent to pending departments.'); setTimeout(()=>setToast(null), 2400); }}>
                <Ic.bell /> Notify Pending Depts
              </button>
              <div className="has-tip">
                <button className="btn btn-primary" disabled={!allCleared}
                        onClick={() => allCleared && nav('settlement')}>
                  Proceed to Settlement <Ic.arrow />
                </button>
                {!allCleared && <div className="tip">Accounts clearance pending</div>}
              </div>
            </div>
          </div>

          {/* BLOCKING BANNER */}
          <div className="block-wrap">
            <div className={'block ' + (allCleared ? 'hide' : '')}>
              <Ic.octWarn />
              <div>
                <strong>Accounts clearance is pending</strong> — {depts.accounts.items.filter(i => i.status !== 'cleared').length} of {depts.accounts.items.length} items outstanding.
                Settlement cannot be processed until all departments clear.
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="tabbar">
            {order.map(k => {
              const d = depts[k];
              const cleared = isDeptCleared(d);
              const active = activeTab === k;
              return (
                <div key={k}
                     className={'tab ' + (active ? 'active' : '')}
                     style={ active ? { color: d.color, borderBottomColor: d.color } : null }
                     onClick={() => setTab(k)}>
                  <span className="dot" style={{ background: d.color }} />
                  {d.label}
                  <span className="tab-badge" style={ cleared
                    ? { background:'#DCFCE7', color:'#16A34A' }
                    : { background:'#FEF3C7', color:'#D97706' }}>
                    {cleared ? 'Cleared' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* TAB CONTENT */}
          <div className="tab-content" key={activeTab}>
            <div className="dept-head">
              <h3>{current.full}</h3>
              <span className="pill" style={ currentCleared
                ? { background:'#DCFCE7', color:'#16A34A', borderColor:'#86EFAC' }
                : { background:'#FEF3C7', color:'#D97706', borderColor:'#FCD34D' }}>
                {currentCleared ? 'Cleared' : 'Pending'}
              </span>
            </div>
            <div className="dept-sub">
              Completed {current.items.filter(i => i.status==='cleared').length} of {current.items.length} items
            </div>

            <div className="items">
              {current.items.map(it => (
                <ItemRow key={it.id} it={it}
                  justCleared={justClearedId === it.id}
                  onMark={() => setModalItem({ ...it, _dept: activeTab })} />
              ))}
            </div>

            {currentCleared && (
              <div className="done-summary">
                <Ic.checkBold />
                {current.full.replace(' Department','').replace(' Clearance','')} clearance completed on {current.completedOn}.
                <span className="extra">All {current.items.length} items cleared.</span>
              </div>
            )}

            {!currentCleared && activeTab === 'accounts' && (
              <div className="dept-actions">
                <button className="ghost"><Ic.plus /> Add Clearance Item</button>
                <button className="btn btn-secondary" style={{ height: 36 }} onClick={()=>{ setToast('Reminder sent to Accounts.'); setTimeout(()=>setToast(null), 2400); }}>
                  <Ic.bell /> Send Reminder to Accounts
                </button>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="foot">
            <button className="foot-ghost" onClick={() => nav('initiation')}>
              <Ic.back /> Back to Initiation
            </button>
            <div className="has-tip">
              <button className="btn btn-primary" disabled={!allCleared}
                      onClick={() => allCleared && nav('settlement')}>
                Proceed to Settlement <Ic.arrow />
              </button>
              {!allCleared && <div className="tip">Accounts clearance pending</div>}
            </div>
          </div>
        </div>
      </div>

      {modalItem && (
        <MarkModal
          item={modalItem}
          onClose={() => setModalItem(null)}
          onConfirm={(info) => confirmMark(modalItem._dept, modalItem.id, info)}
        />
      )}

      {toast && (
        <div className="toast"><Ic.check style={{ color:'#86EFAC' }} /> {toast}</div>
      )}
    </div>
  );
}

window.ClearanceScreen = ClearanceScreen;

})();
