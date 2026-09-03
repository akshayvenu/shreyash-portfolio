// Detail View + Slide Panel (HR Admin role)
const { useState: useStateD, useEffect: useEffectD } = React;
function StepperPipeline({ stage, kycComplete, approval, onboarded }) {
  // stage: 'offer' | 'kyc' | 'approval' | 'onboarded' | 'done'
  const stages = [
    { k: 'offer', label: 'Offer Letter' },
    { k: 'kyc', label: 'KYC' },
    { k: 'approval', label: 'Approval' },
    { k: 'onboarded', label: 'Onboarded' },
  ];
  const order = ['offer', 'kyc', 'approval', 'onboarded', 'done'];
  const curIdx = order.indexOf(stage);
  return (
    <div className="stepper">
      {stages.map((s, i) => {
        const status = i < curIdx ? 'done' : i === curIdx ? 'active' : 'upcoming';
        const isLast = i === stages.length - 1;
        return (
          <React.Fragment key={s.k}>
            <div className="step">
              <div className={`step-circle ${status}`}>
                {status === 'done' ? <IconCheck /> : i + 1}
              </div>
              <div className={`step-label ${status}`}>{s.label}</div>
            </div>
            {!isLast && <div className={`connector ${i < curIdx ? 'done-active' : ''}`}></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function KycDocsCard({ kyc, onVerify, reviewMode }) {
  const docs = [
    { key: 'aadhar', name: 'Aadhaar', desc: 'Government ID' },
    { key: 'pan', name: 'PAN', desc: 'Tax Document' },
    { key: 'bank', name: 'Bank Details', desc: 'Account Verification' },
    { key: 'dl', name: 'Driving Licence', desc: 'Identity Proof' },
  ];
  const completed = Object.values(kyc).filter(v => v === 'verified' || v === 'not_required').length;
  return (
    <div className="right-card">
      <div className="section-header">
        <div>
          <div className="section-title">KYC Documents</div>
          <div className="section-subtitle">
            {reviewMode ? 'Click any document to review HR Admin\u2019s verification' : 'Click any document to review & verify'}
          </div>
        </div>
        <span className="badge pending"><span className="dot"></span>{completed} of 4 complete</span>
      </div>
      <div style={{ marginTop: 16 }}>
        {docs.map(d => {
          const status = kyc[d.key];
          // In reviewMode, any non-empty doc is clickable. Otherwise only pending docs.
          const clickable = onVerify && (reviewMode ? status !== 'not_required' : status === 'pending');
          const btnLabel = reviewMode
            ? (status === 'verified' ? 'Review' : status === 'rejected' ? 'View' : 'Verify')
            : (status === 'pending' ? 'Verify' : 'View');
          return (
            <div
              className={`kyc-doc-row ${clickable ? 'clickable' : ''}`}
              key={d.key}
              onClick={clickable ? () => onVerify(d.key) : undefined}
            >
              <div className="kyc-doc-left">
                <img src={AIV.KYC_DOC_DATA[d.key].icon} alt="" className="kyc-doc-icon" />
                <div>
                  <div className="kyc-doc-name">{d.name}</div>
                  <div className="kyc-doc-desc">{d.desc}</div>
                </div>
              </div>
              <div className="kyc-doc-right">
                <Badge status={status} />
                {status !== 'not_started' && status !== 'not_required' && (
                  <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); onVerify && onVerify(d.key); }}>
                    {btnLabel}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusHistoryCard({ onViewAudit, history }) {
  const list = history || AIV.STATUS_HISTORY;
  return (
    <div className="right-card">
      <div className="section-header">
        <div>
          <div className="section-title">Status History</div>
          <div className="section-subtitle">Recent updates to this profile</div>
        </div>
        <span className="badge sent"><span className="dot"></span>{list.length} events</span>
      </div>
      <div style={{ marginTop: 12 }}>
        {list.map((h, i) => (
          <div className="history-row" key={i}>
            <div className="history-marker">
              <div className="bar"></div>
              <div className="dot"></div>
            </div>
            <div className="history-content">
              <span className="history-stage-pill">{h.stage}</span>
              {h.note ? (
                <div className="history-transition" style={{ marginTop: 6 }}>
                  <span className="change-note">{h.note}</span>
                </div>
              ) : (
                <div className="history-transition">
                  <span className={`mini-pill ${h.from === 'pending' ? 'old' : 'gray'}`}>{(h.from||'').replace('_', ' ')}</span>
                  <span className="arrow">→</span>
                  <span className={`mini-pill ${h.to === 'verified' || h.to === 'approved' || h.to === 'completed' ? 'new-green' : 'new-blue'}`}>{(h.to||'').replace('_', ' ')}</span>
                </div>
              )}
              <div className="history-meta">{h.actor} · {h.when}</div>
            </div>
          </div>
        ))}
      </div>
      <a className="audit-link" href="#" onClick={(e) => { e.preventDefault(); onViewAudit(); }}>View Full Audit Trail →</a>
    </div>
  );
}

function ProfileCard({ person, detail, onUpdate, hideUpdate }) {
  return (
    <div className="profile-card">
      <Avatar initials={person.initials} color={person.color} size={56} />
      <div className="profile-name">{person.name}</div>
      <div className="profile-role">{person.role}</div>
      <div className="profile-dept">{person.dept}</div>
      <div className="id-label">Employee ID</div>
      <div className="id-badge">{person.id}</div>
      <div className="divider"></div>
      <div className="info-row"><span className="info-label">Email</span><span className="info-value email">{detail.email}</span></div>
      <div className="info-row"><span className="info-label">Phone</span><span className="info-value">{detail.phone}</span></div>
      <div className="info-row"><span className="info-label">Joining</span><span className="info-value">{detail.joining}</span></div>
      <div className="info-row"><span className="info-label">Location</span><span className="info-value">{detail.location}</span></div>
      <div className="info-row"><span className="info-label">Reporting</span><span className="info-value" style={{ maxWidth: 180 }}>{detail.reporting}</span></div>
      <div className="info-row"><span className="info-label">CTC</span><span className="info-value ctc">{detail.ctc}</span></div>
      {!hideUpdate && (<><div className="divider"></div><button className="btn-primary btn-update-full" onClick={onUpdate}>Update Status</button></>)}
    </div>
  );
}

function UpdatePanel({ person, onClose, onSubmitDone }) {
  const [closing, setClosing] = useStateD(false);
  const [stage, setStage] = useStateD(null);
  const [doc, setDoc] = useStateD(null);
  const [newStatus, setNewStatus] = useStateD(null);
  const [comment, setComment] = useStateD('');
  const [error, setError] = useStateD('');
  const [submitting, setSubmitting] = useStateD(false);

  function close() { setClosing(true); setTimeout(() => onClose(), 300); }

  function getCurrentStatus() {
    if (!stage) return null;
    if (stage === 'kyc') return doc ? person.kyc[doc] : null;
    if (stage === 'offer_letter') return person.offer;
    if (stage === 'approval') return person.approval;
    if (stage === 'onboarded') return person.onboarded;
  }

  const canSubmit = stage && newStatus && (stage !== 'kyc' || doc);

  function handleSubmit() {
    if (!canSubmit) return;
    if (newStatus === 'rejected' && !comment.trim()) { setError('Please add a comment for rejection'); return; }
    setError(''); setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false); setClosing(true);
      setTimeout(() => { onClose(); onSubmitDone(); }, 300);
    }, 1500);
  }

  const statusOptions = stage ? AIV.STATUS_OPTIONS[stage] : [];
  const currentStatus = getCurrentStatus();

  return (
    <>
      <div className={`overlay ${closing ? 'closing' : ''}`} onClick={close}></div>
      <div className={`slide-panel ${closing ? 'closing' : ''}`}>
        <div className="panel-header">
          <div className="panel-title">Update Onboarding Status</div>
          <div className="panel-subtitle">{person.name} · {person.id}</div>
          <button className="panel-close" onClick={close}><IconClose /></button>
        </div>
        <div className="panel-body">
          <div className="panel-section">
            <div className="panel-label">Stage</div>
            <div className="stage-grid">
              {Object.entries(AIV.STAGE_META).map(([k, m]) => (
                <button key={k} className={`stage-card ${stage === k ? 'selected' : ''}`}
                  onClick={() => { setStage(k); setNewStatus(null); setDoc(null); setError(''); }}>
                  <div className="stage-card-check"><IconCheck /></div>
                  <img src={m.icon} alt="" className="stage-card-icon" />
                  <div className="stage-name">{m.label}</div>
                  <div className="stage-desc">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {stage === 'kyc' && (
            <div className="panel-section">
              <div className="panel-label">Document</div>
              <div className="doc-row">
                {Object.entries(AIV.KYC_DOC_DATA).map(([k, m]) => (
                  <button key={k} className={`doc-card ${doc === k ? 'selected' : ''}`}
                    onClick={() => { setDoc(k); setNewStatus(null); }}>
                    <div className="doc-name">{m.name}</div>
                    <Badge status={person.kyc[k]} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {stage && (stage !== 'kyc' || doc) && (
            <div className="panel-section">
              <div className="panel-label">New Status</div>
              <div className="panel-helper">Select a status to apply</div>
              <div className="status-pills">
                {statusOptions.map(s => (
                  <button key={s} className={`status-pill ${newStatus === s ? `selected ${s}` : ''}`}
                    onClick={() => { setNewStatus(s); setError(''); }}>
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="panel-section">
            <div className="panel-label">Comments</div>
            <textarea className={`textarea ${newStatus === 'rejected' && !comment.trim() && error ? 'error' : ''}`}
              placeholder="Add a comment or note…"
              value={comment} onChange={e => { setComment(e.target.value); setError(''); }} />
            <div className={`helper-text ${newStatus === 'rejected' ? 'error' : ''}`}>
              {newStatus === 'rejected' ? 'Comment is required for rejection' : 'Required when status is Rejected'}
            </div>
            {error && <div className="error-msg">{error}</div>}
          </div>

          {stage && newStatus && (
            <div className="panel-section">
              <div className="panel-label">Preview</div>
              <div className="preview-box">
                <div className="preview-row">
                  <span className="preview-label">Stage</span>
                  <span className="preview-value"><span className="history-stage-pill">{stage}</span></span>
                </div>
                {stage === 'kyc' && doc && (
                  <div className="preview-row">
                    <span className="preview-label">Document</span>
                    <span className="preview-value"><span className="history-stage-pill">{doc}</span></span>
                  </div>
                )}
                <div className="preview-row">
                  <span className="preview-label">Current</span>
                  <span className="preview-value"><Badge status={currentStatus || 'not_started'} /></span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">New</span>
                  <span className="preview-value"><Badge status={newStatus} /></span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="panel-footer">
          <button className="btn-secondary" onClick={close} disabled={submitting}>Cancel</button>
          <button className="btn-primary" disabled={!canSubmit || submitting} onClick={handleSubmit}>
            {submitting ? <><div className="spinner"></div>Please wait…</> : 'Update Status'}
          </button>
        </div>
      </div>
    </>
  );
}

// ============== HR ADMIN DETAIL VIEW ==============
function DetailView({ onBack, onViewAudit, onToast, role, onRoleChange }) {
  const [panelOpen, setPanelOpen] = useStateD(false);
  const [kycPopup, setKycPopup] = useStateD(null);
  const [kycState, setKycState] = useStateD({ aadhar: 'verified', pan: 'pending', bank: 'pending', dl: 'not_required' });
  const person = AIV.PEOPLE.find(p => p.id === 'AIV-2025-0142');
  const personWithKyc = { ...person, kyc: kycState };

  function handleKycAction(status) {
    setKycState(prev => ({ ...prev, [kycPopup]: status }));
    setKycPopup(null);
    onToast(`${AIV.KYC_DOC_DATA[kycPopup].name} ${status === 'verified' ? 'verified' : 'rejected'} successfully`);
  }

  return (
    <Shell>
      <TopNav crumb={['AIVision HRMS', 'Onboarding', 'Arjun Mehta']} showBack onBack={onBack} role={role} onRoleChange={onRoleChange} />
      <div className="main">
        <div className="detail-grid">
          <ProfileCard person={person} detail={AIV.ARJUN_DETAIL} onUpdate={() => setPanelOpen(true)} />
          <div>
            <div className="right-card">
              <div className="section-title">Onboarding Pipeline</div>
              <div className="section-subtitle">Current progress across all stages</div>
              <StepperPipeline stage="kyc" />
            </div>
            <KycDocsCard kyc={kycState} onVerify={(k) => setKycPopup(k)} />
            <StatusHistoryCard onViewAudit={onViewAudit} />
          </div>
        </div>
      </div>
      {panelOpen && <UpdatePanel person={personWithKyc} onClose={() => setPanelOpen(false)} onSubmitDone={() => onToast('Status updated successfully')} />}
      {kycPopup && <KycPopup docKey={kycPopup} onClose={() => setKycPopup(null)} onAction={handleKycAction} />}
    </Shell>
  );
}

// ============== SUPER HR DETAIL VIEW ==============
function SuperDetailView({ onBack, onViewAudit, onToast, role, onRoleChange, onApproved }) {
  const [approving, setApproving] = useStateD(false);
  const [approved, setApproved] = useStateD(false);
  const [kycPopup, setKycPopup] = useStateD(null);
  const [finalPopup, setFinalPopup] = useStateD(false);
  const [kycState, setKycState] = useStateD({ aadhar: 'verified', pan: 'verified', bank: 'verified', dl: 'not_required' });
  const person = AIV.PEOPLE.find(p => p.id === 'AIV-2025-0142');

  function handleKycAction(status, reason) {
    setKycState(prev => ({ ...prev, [kycPopup]: status }));
    const docName = AIV.KYC_DOC_DATA[kycPopup].name;
    setKycPopup(null);
    onToast(status === 'verified'
      ? `${docName} re-verified by Super HR`
      : `${docName} sent back to HR Admin · "${(reason||'').slice(0,40)}${(reason||'').length>40?'…':''}"`);
  }

  function handleApproveAll() {
    setFinalPopup(false);
    setApproved(true);
    onToast('Final approval granted · Candidate ready for onboarding');
    setTimeout(() => onApproved(), 1200);
  }

  function handleFinalReject(reason) {
    setFinalPopup(false);
    onToast(`Approval declined · sent back to HR Admin: "${reason.slice(0,40)}${reason.length>40?'…':''}"`);
  }

  return (
    <Shell>
      <TopNav crumb={['AIVision HRMS', 'Onboarding', 'Arjun Mehta']} showBack onBack={onBack} role={role} onRoleChange={onRoleChange} />
      <div className="main">
        <div className="detail-grid">
          <ProfileCard person={person} detail={AIV.ARJUN_DETAIL} hideUpdate />
          <div>
            <div className="right-card">
              <div className="section-title">Onboarding Pipeline</div>
              <div className="section-subtitle">Awaiting Super HR approval</div>
              <StepperPipeline stage={approved ? 'onboarded' : 'approval'} />
              <div className={`approval-card ${approved ? 'approved' : 'clickable'}`}
                onClick={!approved ? () => setFinalPopup(true) : undefined}
                role={!approved ? 'button' : undefined}
                tabIndex={!approved ? 0 : undefined}>
                <div className="approval-msg">
                  <img src={approved ? 'https://img.icons8.com/3d-fluency/200/ok.png' : 'https://img.icons8.com/3d-fluency/200/security-shield-green.png'} className="approval-icon" alt="" />
                  <div className="approval-text-wrap">
                    <div className="approval-text">
                      {approved ? 'Approved by Super HR' : 'Awaiting Final Approval'}
                    </div>
                    <div className="approval-sub">
                      {approved ? 'Candidate is ready to be onboarded' : 'KYC complete · Offer accepted · Ready for review'}
                    </div>
                    {!approved && (
                      <div className="approval-cta">
                        Review all documents & approve <IconArrowRight />
                      </div>
                    )}
                  </div>
                </div>
                {!approved && (
                  <div className="approval-actions">
                    <button className="btn-reject-sm" onClick={(e) => { e.stopPropagation(); setFinalPopup(true); }}>Review</button>
                    <button className="btn-approve" onClick={(e) => { e.stopPropagation(); setFinalPopup(true); }}>
                      <IconCheck /> Final Approval
                    </button>
                  </div>
                )}
              </div>
            </div>
            <KycDocsCard kyc={kycState} onVerify={(k) => setKycPopup(k)} reviewMode />
            <StatusHistoryCard onViewAudit={onViewAudit} history={AIV.SUPER_HR_HISTORY} />
          </div>
        </div>
      </div>
      {kycPopup && <KycPopup docKey={kycPopup} onClose={() => setKycPopup(null)} onAction={handleKycAction} />}
      {finalPopup && <FinalApprovalPopup onClose={() => setFinalPopup(false)} onApproveAll={handleApproveAll} onReject={handleFinalReject} />}
    </Shell>
  );
}

// ============== ONBOARDED VIEW ==============
function OnboardedView({ onBack, onViewAudit, onToast, role, onRoleChange }) {
  const [emailSent, setEmailSent] = useStateD(false);
  const [sending, setSending] = useStateD(false);
  const person = AIV.PEOPLE.find(p => p.id === 'AIV-2025-0142');
  const fullKyc = { aadhar: 'verified', pan: 'verified', bank: 'verified', dl: 'not_required' };

  function sendEmail() {
    setSending(true);
    setTimeout(() => {
      setSending(false); setEmailSent(true);
      onToast('Welcome email sent to ' + AIV.ARJUN_DETAIL.email);
    }, 1400);
  }

  return (
    <Shell>
      <TopNav crumb={['AIVision HRMS', 'Onboarding', 'Arjun Mehta']} showBack onBack={onBack} role={role} onRoleChange={onRoleChange} />
      <div className="main">
        <div className="onboarded-banner">
          <div className="onboarded-banner-icon"><IconCheck /></div>
          <div>
            <h3>Arjun Mehta has been onboarded</h3>
            <p>All stages complete · Approved 28 Apr 2025 by Priya Sharma · Joining 1 May 2025</p>
          </div>
        </div>
        <div className="detail-grid">
          <ProfileCard person={person} detail={AIV.ARJUN_DETAIL} hideUpdate />
          <div>
            <div className="right-card">
              <div className="section-title">Onboarding Pipeline</div>
              <div className="section-subtitle">All stages successfully completed</div>
              <StepperPipeline stage="done" />
            </div>
            <div className="email-card" style={{ marginTop: 20 }}>
              <div className="section-header">
                <div>
                  <div className="section-title">Welcome Email</div>
                  <div className="section-subtitle">Send joining instructions to the new hire</div>
                </div>
                <span className={`badge ${emailSent ? 'completed' : 'pending'}`}><span className="dot"></span>{emailSent ? 'Sent' : 'Pending'}</span>
              </div>
              <div className="email-preview">
                <div className="email-row"><span className="lbl">From</span><span className="val">hr@aivision21.com</span></div>
                <div className="email-row"><span className="lbl">To</span><span className="val">{AIV.ARJUN_DETAIL.email}</span></div>
                <div className="email-row"><span className="lbl">Subject</span><span className="val subj">Welcome to AIVision, Arjun! 🎉 Your onboarding details</span></div>
                <div className="email-body">{`Hi Arjun,

Welcome aboard! We're thrilled to have you join AIVision as Senior Software Engineer.

Your joining date is 1 May 2025 at our Mumbai HQ. Please find attached your offer letter, joining kit, and Day 1 checklist.

You'll receive your laptop and access credentials on your first day. Reach out to hr@aivision21.com for any questions.

Looking forward to working with you!
— Priya Sharma, VP Engineering`}</div>
                <div className="email-attach"><IconDownload /> Offer_Letter_AIV-2025-0142.pdf · 240 KB</div>
              </div>
              <button className={`btn-send-email ${emailSent ? 'sent' : ''}`} onClick={sendEmail} disabled={sending || emailSent}>
                {sending ? <><div className="spinner"></div>Sending…</> :
                 emailSent ? <><IconCheck /> Email Sent at 12:02 PM</> :
                 <>📧 Send Welcome Email</>}
              </button>
            </div>
            <StatusHistoryCard onViewAudit={onViewAudit} history={AIV.ONBOARDED_HISTORY} />
          </div>
        </div>
      </div>
    </Shell>
  );
}

window.DetailView = DetailView;
window.SuperDetailView = SuperDetailView;
window.OnboardedView = OnboardedView;
