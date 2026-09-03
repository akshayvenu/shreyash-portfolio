;(function(){

const { useState, useMemo } = React;

/* ICONS */
const Ic = {
  check: (p) => <svg {...p} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  checkBold: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  checkBig: (p) => <svg {...p} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  send: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  download: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  eye: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  arrow: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  back: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  warn: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  x: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

/* STEPPER */
function Stepper(){
  const steps = [
    { label: 'Initiation', state: 'done' },
    { label: 'Clearance',  state: 'done' },
    { label: 'Settlement', state: 'active' },
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
            <div className={'connector ' + (steps[i].state === 'done' ? 'done' : '')} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* Variable highlight helper */
const V = ({ children }) => <span className="vr">{children}</span>;

/* DOCUMENT CONTENTS */
const docs = [
  {
    id: 'TMPL-001',
    type: 'Acceptance of Resignation',
    preview: (
      <>
        <p>To,<br/>Priya Malhotra<br/>Senior Product Designer, Design & Product</p>
        <p><strong>Subject: Acceptance of Resignation</strong></p>
        <p>Dear Priya,</p>
        <p>This letter confirms receipt and acceptance of your resignation dated <V>April 28, 2025</V>. Your last working day with AIVision21 will be <V>May 31, 2025</V>.</p>
        <p>We thank you for your valuable contributions over <V>4 years 2 months</V> with us. We wish you the very best in your future endeavours.</p>
      </>
    ),
    full: (
      <>
        <p>To,<br/>Priya Malhotra<br/>Senior Product Designer, Design & Product<br/>Employee ID: AIV-2024-0089</p>
        <p><strong>Subject: Acceptance of Resignation</strong></p>
        <p>Dear Priya,</p>
        <p>This letter confirms receipt and acceptance of your resignation dated <strong>April 28, 2025</strong>. As mutually agreed, your last working day with AIVision21 will be <strong>May 31, 2025</strong>.</p>
        <p>We acknowledge your decision and respect the personal reasons stated in your resignation. During your notice period, please ensure timely handover of all responsibilities, projects, and assets to your reporting manager.</p>
        <p>We sincerely thank you for your valuable contributions over <strong>4 years and 2 months</strong> with us. Your work has positively impacted our team and the products you've helped build.</p>
        <p>We wish you the very best in your future endeavours.</p>
      </>
    ),
  },
  {
    id: 'TMPL-002',
    type: 'Relieving Letter',
    preview: (
      <>
        <p><strong>Date: <V>May 31, 2025</V></strong></p>
        <p>To Whom It May Concern,</p>
        <p>This is to certify that <V>Priya Malhotra</V> (Employee ID <V>AIV-2024-0089</V>) has been relieved from her duties as <V>Senior Product Designer</V> at AIVision21 effective <V>May 31, 2025</V>.</p>
        <p>At the time of leaving, she had no pending dues, no outstanding company assets, and a satisfactory clearance from all departments.</p>
      </>
    ),
    full: (
      <>
        <p><strong>Date: May 31, 2025</strong></p>
        <p>To Whom It May Concern,</p>
        <p>This is to certify that <strong>Priya Malhotra</strong> (Employee ID <strong>AIV-2024-0089</strong>) has been relieved from her duties as <strong>Senior Product Designer</strong>, Design & Product at AIVision21 effective <strong>May 31, 2025</strong>.</p>
        <p>She joined the organisation on <strong>March 14, 2021</strong> and served the company for a tenure of <strong>4 years and 2 months</strong>. At the time of leaving, she had completed all formal exit procedures with no pending dues, no outstanding company assets, and a satisfactory clearance from all relevant departments.</p>
        <p>We hereby release her from all her obligations to the company. We wish her the best in her future endeavours.</p>
      </>
    ),
  },
  {
    id: 'TMPL-003',
    type: 'Experience Certificate',
    preview: (
      <>
        <p><strong>Experience Certificate</strong></p>
        <p>This is to certify that <V>Priya Malhotra</V> was employed with AIVision21 from <V>March 14, 2021</V> to <V>May 31, 2025</V>, serving the company for a total of <V>4 years 2 months</V>.</p>
        <p>During her tenure, she held the position of <V>Senior Product Designer</V> in the Design & Product team and was responsible for leading design across several flagship products.</p>
      </>
    ),
    full: (
      <>
        <p><strong>Experience Certificate</strong></p>
        <p>This is to certify that <strong>Ms. Priya Malhotra</strong> was employed with AIVision21 Pvt. Ltd. from <strong>March 14, 2021</strong> to <strong>May 31, 2025</strong>, serving the company for a total tenure of <strong>4 years and 2 months</strong>.</p>
        <p>During her tenure, she held the position of <strong>Senior Product Designer</strong> in the Design & Product team and was responsible for leading design across several flagship products. We found her to be hardworking, sincere, and capable of taking on significant responsibilities.</p>
        <p>Her overall conduct and performance during the tenure were satisfactory. We wish her great success in all her future endeavours.</p>
      </>
    ),
  },
  {
    id: 'TMPL-004',
    type: 'F&F Settlement Statement',
    preview: (
      <>
        <p><strong>Final Settlement — <V>AIV-2024-0089</V></strong></p>
        <p>The following amounts have been computed as full and final settlement for <V>Priya Malhotra</V>, payable on <V>June 10, 2025</V>.</p>
        <table className="doc4-table">
          <thead><tr><th>Item</th><th className="r">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td>Pro-rata Salary</td><td className="r">1,50,000</td></tr>
            <tr><td>Leave Encashment</td><td className="r">60,000</td></tr>
            <tr><td>Gratuity</td><td className="r">86,538</td></tr>
            <tr><td>Less: Deductions</td><td className="r">−17,500</td></tr>
            <tr><td><strong>Net Payable</strong></td><td className="r"><strong>₹2,79,038</strong></td></tr>
          </tbody>
        </table>
      </>
    ),
    full: (
      <>
        <p><strong>Final Settlement Statement — AIV-2024-0089</strong></p>
        <p>The following amounts have been computed as full and final settlement for <strong>Priya Malhotra</strong>, payable on <strong>June 10, 2025</strong> via NEFT to HDFC Bank, account ending 4521.</p>
        <p><strong>Earnings</strong></p>
        <table className="doc4-table">
          <thead><tr><th>Item</th><th>Calculation</th><th className="r">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td>Pro-rata Salary</td><td>31 days × ₹5,000</td><td className="r">1,50,000</td></tr>
            <tr><td>Leave Encashment</td><td>12 days × ₹5,000</td><td className="r">60,000</td></tr>
            <tr><td>Gratuity</td><td>4y 2m × ₹20,833</td><td className="r">86,538</td></tr>
            <tr><td>Bonus / Incentive</td><td>—</td><td className="r">0</td></tr>
            <tr><td><strong>Gross Earnings</strong></td><td></td><td className="r"><strong>2,96,538</strong></td></tr>
          </tbody>
        </table>
        <p><strong>Deductions</strong></p>
        <table className="doc4-table">
          <tbody>
            <tr><td>Loan Recovery</td><td>Outstanding balance</td><td className="r">15,000</td></tr>
            <tr><td>Notice Period Buy-out</td><td>Waived</td><td className="r">0</td></tr>
            <tr><td>Other Deductions</td><td>Miscellaneous</td><td className="r">2,500</td></tr>
            <tr><td><strong>Total Deductions</strong></td><td></td><td className="r"><strong>17,500</strong></td></tr>
          </tbody>
        </table>
        <p style={{ marginTop: 16, fontSize: 14 }}><strong>Net Payable: ₹2,79,038</strong></p>
      </>
    ),
  },
];

/* DOC PREVIEW MODAL */
function DocPreviewModal({ doc, onClose }){
  return (
    <div className="overlay" onMouseDown={(e)=>{ if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal doc-modal">
        <div className="dm-head">
          <div className="t mono">{doc.id} · <span style={{ fontFamily:'Poppins', color:'#475569', fontWeight: 500 }}>{doc.type}</span></div>
          <div className="r">
            <button className="dl"><Ic.download /> Download</button>
            <button className="x" onClick={onClose}><Ic.x /></button>
          </div>
        </div>
        <div className="dm-body">
          <div className="letter-head">
            <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="AIVision" onError={(e)=>e.target.style.display='none'} />
            <div>
              <div className="co">AIVision21 Pvt. Ltd.</div>
              <div className="addr">Plot 14, Cyber Hub, Gurugram, Haryana 122002, India · hr@aivision21.co</div>
            </div>
          </div>
          <div className="date-line">Date: {doc.id === 'TMPL-001' ? 'April 28, 2025' : 'May 31, 2025'}</div>
          <div style={{ marginTop: 16 }}>
            {doc.full}
          </div>
          <div className="sig">
            <div className="line" />
            <div className="nm">Ravi Kumar</div>
            <div className="ro">Manager — Human Resources</div>
            <div className="co">AIVision21</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* DISPATCH CONFIRM MODAL */
function DispatchModal({ onClose, onDone }){
  const [val, setVal] = useState('');
  const [phase, setPhase] = useState('confirm'); // confirm | loading | success

  const ok = val.trim() === 'CONFIRM';

  const handleConfirm = () => {
    if (!ok) return;
    setPhase('loading');
    setTimeout(() => setPhase('success'), 1500);
  };

  return (
    <div className="overlay" onMouseDown={(e)=>{ if (e.target === e.currentTarget && phase !== 'loading') onClose(); }}>
      <div className="modal conf-modal">
        {phase !== 'success' && (
          <>
            <h2><Ic.warn style={{ color:'#DC2626' }} /> Confirm Dispatch</h2>
            <div className="desc">You are about to:</div>
            <ul className="bullets">
              <li>Dispatch 4 official documents to <strong style={{ color:'#0F172A' }}>priya.malhotra@gmail.com</strong></li>
              <li>Mark <strong style={{ color:'#0F172A' }}>Priya Malhotra</strong> as Terminated in the HR system</li>
              <li>Process F&amp;F payment of <strong style={{ color:'#0F172A' }}>₹2,79,038</strong> on June 10, 2025</li>
              <li>Close this offboarding case permanently</li>
            </ul>

            <div className="fld">
              <div className="lbl">Type CONFIRM to proceed</div>
              <input
                className={'inp ' + (ok ? 'ok' : '')}
                value={val}
                onChange={e=>setVal(e.target.value)}
                placeholder="CONFIRM"
                autoFocus
              />
            </div>

            <div className="row">
              <button className="btn btn-secondary" onClick={onClose} disabled={phase==='loading'}>Cancel</button>
              <button className="btn btn-confirm" disabled={!ok || phase==='loading'} onClick={handleConfirm}>
                {phase === 'loading'
                  ? (<><span className="spinner" /> Dispatching…</>)
                  : 'Confirm Dispatch'}
              </button>
            </div>
          </>
        )}

        {phase === 'success' && (
          <div className="succ-modal">
            <div className="succ-illu"><Ic.checkBig /></div>
            <h2>Documents Dispatched Successfully!</h2>
            <div className="desc">Priya Malhotra has been offboarded. All documents sent to <span style={{ color:'#BD1313', fontWeight: 600 }}>priya.malhotra@gmail.com</span>.</div>
            <div className="status-pill">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#64748B' }} />
              Employee Status: Terminated
            </div>
            <div className="checks">
              <div className="ln"><Ic.check style={{ color:'#16A34A' }} /> Email sent to priya.malhotra@gmail.com</div>
              <div className="ln"><Ic.check style={{ color:'#16A34A' }} /> Employee record updated to Terminated</div>
              <div className="ln"><Ic.check style={{ color:'#16A34A' }} /> Audit log entry created</div>
            </div>
            <button className="go-btn" onClick={onDone}>View Audit Log <Ic.arrow /></button>
          </div>
        )}
      </div>
    </div>
  );
}

/* APP */
function SettlementScreen({ nav }){
  const [previewDoc, setPreviewDoc] = useState(null);
  const [showDispatch, setShowDispatch] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2400); };

  return (
    <div className="shell">
      <div className="deco-glow" />

      <div className="topnav">
        <div className="nav-left">
          <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" alt="AIVision" onError={(e)=>e.target.style.display='none'} />
          <div className="divider" />
          <div className="title">AIVision HRMS<span className="crumb"> / Settlement</span></div>
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
              <div className="t">AIVision HRMS · F&amp;F Settlement</div>
            </div>
            <div className="r">
              <span className="lbl">Need help?</span>
              <span className="em">hr@aivision21.co</span>
            </div>
          </div>

          <Stepper />

          {/* EMPLOYEE BANNER */}
          <div className="banner-wrap">
            <div className="emp-banner">
              <div className="av">PM</div>
              <div className="info">
                <div className="name">Priya Malhotra</div>
                <div className="desig">Senior Product Designer · Design & Product</div>
                <div className="eid mono">AIV-2024-0089 · Last day May 31, 2025</div>
              </div>
              <div className="rt">
                <div className="pill" style={{ background:'#DCFCE7', color:'#16A34A', borderColor:'#86EFAC' }}>
                  <Ic.check style={{ marginRight: 2 }} /> All Cleared
                </div>
                <div className="stamp">Accounts cleared May 5 · IT May 1 · Admin Apr 30 · PM May 1</div>
              </div>
            </div>
          </div>

          <div className="body">
            {/* FINANCIAL */}
            <div className="sec-label">Full & Final Settlement</div>

            <div className="fin-grid">
              <div>
                <div className="fin-block">
                  <div className="fin-title">Earnings</div>
                  <div className="fin-table">
                    <table className="amt">
                      <thead>
                        <tr><th>Item</th><th>Calculation</th><th className="r">Amount</th></tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="item">Pro-rata Salary</td>
                          <td className="calc">31 days × ₹5,000/day</td>
                          <td className="amount">₹1,50,000</td>
                        </tr>
                        <tr>
                          <td className="item">Leave Encashment</td>
                          <td className="calc">12 days × ₹5,000/day</td>
                          <td className="amount">₹60,000</td>
                        </tr>
                        <tr>
                          <td className="item">Gratuity</td>
                          <td className="calc">4y 2m × ₹20,833</td>
                          <td className="amount">₹86,538</td>
                        </tr>
                        <tr>
                          <td className="item">Bonus / Incentive</td>
                          <td className="calc">—</td>
                          <td className="amount muted">₹0</td>
                        </tr>
                        <tr>
                          <td className="item">Other Earnings</td>
                          <td className="calc">—</td>
                          <td className="amount muted">₹0</td>
                        </tr>
                        <tr className="sub earn">
                          <td>Total Earnings</td>
                          <td></td>
                          <td style={{ textAlign:'right' }}>₹2,96,538</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="fin-block">
                  <div className="fin-title">Deductions</div>
                  <div className="fin-table">
                    <table className="amt">
                      <thead>
                        <tr><th>Item</th><th>Reason</th><th className="r">Amount</th></tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="item">Loan Recovery</td>
                          <td className="calc">Outstanding balance</td>
                          <td className="amount">₹15,000</td>
                        </tr>
                        <tr>
                          <td className="item">Notice Period Buy-out</td>
                          <td className="calc">Waived</td>
                          <td className="amount muted">₹0</td>
                        </tr>
                        <tr>
                          <td className="item">Other Deductions</td>
                          <td className="calc">Miscellaneous</td>
                          <td className="amount">₹2,500</td>
                        </tr>
                        <tr className="sub ded">
                          <td>Total Deductions</td>
                          <td></td>
                          <td style={{ textAlign:'right' }}>₹17,500</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* NET PAYABLE */}
              <div>
                <div className="netcard">
                  <h4>Net Payable</h4>
                  <div className="row">
                    <span className="k">Gross Earnings</span>
                    <span className="v green">₹2,96,538</span>
                  </div>
                  <div className="row">
                    <span className="k">Total Deductions</span>
                    <span className="v red">−₹17,500</span>
                  </div>
                  <div className="nd" />
                  <div className="big">₹2,79,038</div>
                  <div className="big-lbl">Net F&amp;F Payable</div>

                  <div className="pay-details">
                    <div>
                      <div className="k">Payment Mode</div>
                      <div className="v">Bank Transfer (NEFT)</div>
                    </div>
                    <div>
                      <div className="k">Payment Date</div>
                      <div className="v">June 10, 2025</div>
                    </div>
                    <div className="full">
                      <div className="k">Bank Account</div>
                      <div className="v mono">XXXX XXXX 4521</div>
                    </div>
                    <div className="full">
                      <div className="k">Bank</div>
                      <div className="v">HDFC Bank · <span className="mono">HDFC0001234</span></div>
                    </div>
                  </div>

                  <button className="ghost-link" onClick={()=>showToast('Edit mode coming soon')}>
                    Edit Settlement →
                  </button>
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* DOCUMENTS */}
            <div className="sec-label">Documents to Dispatch</div>
            <div style={{ fontSize: 13, color:'#64748B', marginTop:'-6px', marginBottom: 16 }}>
              Review each document before final dispatch:
            </div>

            <div className="doc-list">
              {docs.map((d, i) => (
                <div key={d.id} className="doc-card" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="dc-head">
                    <div className="l">
                      <span className="tmpl">{d.id}</span>
                      <span className="type">{d.type}</span>
                    </div>
                    <button className="pv" onClick={()=>setPreviewDoc(d)}>
                      <Ic.eye /> Preview
                    </button>
                  </div>
                  <div className="dc-body">
                    {d.preview}
                  </div>
                  <div className="dc-foot">
                    <div className="lbl">Full document</div>
                    <div className="right">
                      <button onClick={()=>setPreviewDoc(d)}>Preview <Ic.arrow /></button>
                      <button onClick={()=>showToast(`Downloaded ${d.id}.pdf`)}>Download <Ic.download /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* APPROVE & DISPATCH */}
            <div className="approve">
              <h3>Approve &amp; Dispatch</h3>
              <div className="sub">Once approved, all documents will be dispatched to Priya Malhotra via email and the employee record will be marked as Terminated.</div>

              <div className="check-list">
                <div className="ln"><span className="ico"><Ic.check /></span><span className="txt">All departments cleared</span></div>
                <div className="ln"><span className="ico"><Ic.check /></span><span className="txt">F&amp;F settlement calculated — <strong style={{ fontWeight: 600 }}>₹2,79,038 net payable</strong></span></div>
                <div className="ln"><span className="ico"><Ic.check /></span><span className="txt">4 documents ready for dispatch</span></div>
                <div className="ln"><span className="ico"><Ic.check /></span><span className="txt">Payment scheduled for June 10, 2025</span></div>
              </div>

              <div className="email-prev">
                <div className="lbl">Email will be sent to</div>
                <div className="name">Priya Malhotra</div>
                <div className="email">priya.malhotra@gmail.com</div>
                <div className="subj">Subject: Your Relieving &amp; F&amp;F Documents — AIVision21</div>
                <div className="body">Dear Priya, Please find attached your official documents from AIVision21 covering acceptance of resignation, relieving, experience certification, and the full &amp; final settlement statement…</div>
              </div>

              <div className="danger-info">
                <Ic.warn />
                <div>This action is <strong>irreversible</strong>. The employee record will be permanently marked as Terminated upon dispatch.</div>
              </div>

              <div className="dispatch-row">
                <button className="btn btn-secondary save" onClick={()=>showToast('Saved. You can return to this case from the dashboard.')}>
                  Save &amp; Review Later
                </button>
                <button className="btn btn-danger go" onClick={()=>setShowDispatch(true)}>
                  <Ic.send /> Approve &amp; Dispatch
                </button>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="foot">
            <button className="foot-ghost" onClick={()=> nav('clearance')}>
              <Ic.back /> Back to Clearance
            </button>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>
              Case <span className="mono">AIV-2024-0089</span> · Phase 3 Settlement
            </div>
          </div>
        </div>
      </div>

      {previewDoc && <DocPreviewModal doc={previewDoc} onClose={()=>setPreviewDoc(null)} />}
      {showDispatch && (
        <DispatchModal
          onClose={()=>setShowDispatch(false)}
          onDone={()=>{ setShowDispatch(false); nav('audit'); }}
        />
      )}

      {toast && (
        <div className="toast"><Ic.check style={{ color:'#86EFAC' }} /> {toast}</div>
      )}
    </div>
  );
}

window.SettlementScreen = SettlementScreen;

})();
