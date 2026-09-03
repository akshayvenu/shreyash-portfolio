// KYC Review Popup — single doc + multi-doc review
const { useState: useStateK } = React;

function KycMockDoc({ docKey }) {
  if (docKey === 'aadhar') {
    return (
      <div className="kyc-doc-mock aadhar">
        <div className="kyc-doc-mock-header">
          <div className="kyc-doc-mock-title">Government of India</div>
          <div className="kyc-doc-mock-emblem">🇮🇳</div>
        </div>
        <div className="kyc-doc-mock-photo">AM</div>
        <div className="kyc-doc-mock-line">Name</div>
        <div className="kyc-doc-mock-value">Arjun Mehta</div>
        <div className="kyc-doc-mock-line">DOB / Gender</div>
        <div className="kyc-doc-mock-value">01/01/1995 · Male</div>
        <div className="kyc-doc-mock-line">Aadhaar Number</div>
        <div className="kyc-doc-mock-value">XXXX XXXX 4321</div>
        <div className="kyc-doc-mock-watermark">UIDAI</div>
      </div>
    );
  }
  if (docKey === 'pan') {
    return (
      <div className="kyc-doc-mock pan">
        <div className="kyc-doc-mock-header">
          <div className="kyc-doc-mock-title">Income Tax Department</div>
          <div className="kyc-doc-mock-emblem">🏛</div>
        </div>
        <div className="kyc-doc-mock-photo">AM</div>
        <div className="kyc-doc-mock-line">Permanent Account Number</div>
        <div className="kyc-doc-mock-value">ABCPM1234Z</div>
        <div className="kyc-doc-mock-line">Name</div>
        <div className="kyc-doc-mock-value">ARJUN MEHTA</div>
        <div className="kyc-doc-mock-line">Date of Birth</div>
        <div className="kyc-doc-mock-value">01/01/1995</div>
        <div className="kyc-doc-mock-watermark">PAN INDIA</div>
      </div>
    );
  }
  if (docKey === 'bank') {
    return (
      <div className="kyc-doc-mock bank">
        <div className="kyc-doc-mock-header">
          <div className="kyc-doc-mock-title">AIVision Bank · Cancelled Cheque</div>
          <div className="kyc-doc-mock-emblem">🏦</div>
        </div>
        <div className="kyc-doc-mock-line">Account Holder</div>
        <div className="kyc-doc-mock-value">Arjun Mehta</div>
        <div className="kyc-doc-mock-line">Account No</div>
        <div className="kyc-doc-mock-value">XXXX XXXX 9876</div>
        <div className="kyc-doc-mock-line">IFSC</div>
        <div className="kyc-doc-mock-value">AIVB0001234</div>
        <div className="kyc-doc-mock-line">Branch</div>
        <div className="kyc-doc-mock-value">Mumbai BKC</div>
        <div className="kyc-doc-mock-watermark">CANCELLED</div>
      </div>
    );
  }
  return (
    <div className="kyc-doc-mock">
      <div className="kyc-doc-mock-header">
        <div className="kyc-doc-mock-title">Document Preview</div>
        <div className="kyc-doc-mock-emblem">📄</div>
      </div>
      <div style={{ padding: 40, textAlign: 'center', color: 'rgba(0,0,0,0.5)' }}>No preview available</div>
    </div>
  );
}

function DocBlock({ docKey }) {
  const m = AIV.KYC_DOC_DATA[docKey];
  return (
    <div className="doc-block" id={`doc-${docKey}`}>
      <div className="doc-block-header">
        <img src={m.icon} alt="" className="doc-block-icon" />
        <div>
          <div className="doc-block-name">{m.name}</div>
          <div className="doc-block-sub">Uploaded 28 Apr 2025 · 2.4 MB · PDF</div>
        </div>
        <span className="badge verified" style={{ marginLeft: 'auto' }}><span className="dot"></span>HR Verified</span>
      </div>
      <div className="doc-block-grid">
        <KycMockDoc docKey={docKey} />
        <div className="kyc-fields-card">
          <h4>Extracted Details</h4>
          {m.fields.length === 0 ? (
            <div style={{ fontSize: 12, color: 'var(--text-hint)', padding: 8 }}>Not required for this candidate.</div>
          ) : m.fields.map(([k, v]) => (
            <div className="kyc-fields-row" key={k}>
              <div className="kyc-fields-label">{k}</div>
              <div className="kyc-fields-value">{v}</div>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: 10, background: 'var(--green-light)', borderRadius: 8, fontSize: 11, color: 'var(--green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>
            Auto-extracted via OCR · Match score 98%
          </div>
        </div>
      </div>
    </div>
  );
}

function KycPopup({ docKey, onClose, onAction }) {
  const m = AIV.KYC_DOC_DATA[docKey];
  const [showReject, setShowReject] = useStateK(false);
  const [reason, setReason] = useStateK('');
  return (
    <div className="kyc-popup-overlay" onClick={onClose}>
      <div className="kyc-popup" onClick={(e) => e.stopPropagation()}>
        <div className="kyc-popup-header">
          <div className="kyc-popup-header-left">
            <img src={m.icon} className="kyc-popup-header-icon" alt="" />
            <div>
              <div className="kyc-popup-title">{m.name} Verification</div>
              <div className="kyc-popup-sub">Review document details before approving</div>
            </div>
          </div>
          <button className="panel-close" onClick={onClose}><IconClose /></button>
        </div>
        <div className="kyc-popup-body">
          <div>
            <KycMockDoc docKey={docKey} />
            <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text-hint)', textAlign: 'center' }}>
              Uploaded 28 Apr 2025 · 2.4 MB · PDF
            </div>
          </div>
          <div className="kyc-fields-card">
            <h4>Extracted Details</h4>
            {m.fields.map(([k, v]) => (
              <div className="kyc-fields-row" key={k}>
                <div className="kyc-fields-label">{k}</div>
                <div className="kyc-fields-value">{v}</div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: 10, background: 'var(--green-light)', borderRadius: 8, fontSize: 11, color: 'var(--green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>
              Auto-extracted via OCR · Match score 98%
            </div>
          </div>
        </div>
        {showReject && (
          <div className="reject-bar">
            <textarea className="textarea" placeholder="Reason for rejection (will be sent back to HR Admin)…"
              value={reason} onChange={e => setReason(e.target.value)} autoFocus />
          </div>
        )}
        <div className="kyc-popup-footer">
          <div className="kyc-popup-footer-left">
            {showReject ? 'Add a reason to send back to HR Admin.' : 'All fields verified against onboarding record.'}
          </div>
          <div className="kyc-popup-footer-right">
            {showReject ? (
              <>
                <button className="btn-secondary" style={{ height: 44 }} onClick={() => setShowReject(false)}>Cancel</button>
                <button className="btn-reject" disabled={!reason.trim()} onClick={() => onAction('rejected', reason)}>Send back to HR</button>
              </>
            ) : (
              <>
                <button className="btn-reject" onClick={() => setShowReject(true)}>Reject</button>
                <button className="btn-verify" onClick={() => onAction('verified')}>
                  <IconCheck /> Approve Document
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// === Multi-doc Final Approval popup ===
function FinalApprovalPopup({ onClose, onApproveAll, onReject }) {
  const docKeys = ['aadhar', 'pan', 'bank', 'dl'].filter(k => AIV.KYC_DOC_DATA[k].fields.length > 0);
  const [active, setActive] = useStateK(docKeys[0]);
  const [showReject, setShowReject] = useStateK(false);
  const [reason, setReason] = useStateK('');
  const [submitting, setSubmitting] = useStateK(false);

  function approve() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); onApproveAll(); }, 1400);
  }

  function rejectAll() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); onReject(reason); }, 1000);
  }

  return (
    <div className="kyc-popup-overlay" onClick={onClose}>
      <div className="kyc-popup wide" onClick={(e) => e.stopPropagation()}>
        <div className="kyc-popup-header">
          <div className="kyc-popup-header-left">
            <img src="https://img.icons8.com/3d-fluency/200/security-shield-green.png" className="kyc-popup-header-icon" alt="" />
            <div>
              <div className="kyc-popup-title">Final Approval — Arjun Mehta</div>
              <div className="kyc-popup-sub">Review all KYC documents below before granting final approval</div>
            </div>
          </div>
          <button className="panel-close" onClick={onClose}><IconClose /></button>
        </div>

        <div className="doc-tabs">
          {docKeys.map(k => (
            <button key={k} className={`doc-tab ${active === k ? 'active' : ''}`} onClick={() => {
              setActive(k);
              setTimeout(() => {
                const el = document.getElementById(`doc-${k}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 0);
            }}>
              <img src={AIV.KYC_DOC_DATA[k].icon} alt="" />
              {AIV.KYC_DOC_DATA[k].name}
              <span className="dot-success"></span>
            </button>
          ))}
        </div>

        <div className="kyc-popup-body multi" onScroll={(e) => {
          // Update active tab as user scrolls
          const container = e.currentTarget;
          for (const k of docKeys) {
            const el = document.getElementById(`doc-${k}`);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();
            if (rect.top - cRect.top >= -50 && rect.top - cRect.top < 200) {
              setActive(k); break;
            }
          }
        }}>
          {docKeys.map(k => <DocBlock key={k} docKey={k} />)}
          <div className="approval-summary">
            <div className="approval-summary-icon">✓</div>
            <div>
              <div className="approval-summary-title">All {docKeys.length} documents verified by HR Admin</div>
              <div className="approval-summary-sub">Ravi Kumar · 28 Apr 2025 · OCR match score 98%</div>
            </div>
          </div>
        </div>

        {showReject && (
          <div className="reject-bar">
            <textarea className="textarea" placeholder="Reason — explain why approval is being denied (will be sent to HR Admin)…"
              value={reason} onChange={e => setReason(e.target.value)} autoFocus />
          </div>
        )}

        <div className="kyc-popup-footer">
          <div className="kyc-popup-footer-left">
            {showReject ? 'Add a reason — this will be sent back to HR Admin.' : 'All KYC verified · Offer accepted · Ready for final approval'}
          </div>
          <div className="kyc-popup-footer-right">
            {showReject ? (
              <>
                <button className="btn-secondary" style={{ height: 44 }} onClick={() => setShowReject(false)} disabled={submitting}>Cancel</button>
                <button className="btn-reject" disabled={!reason.trim() || submitting} onClick={rejectAll}>
                  {submitting ? <><div className="spinner" style={{ borderTopColor: 'var(--red)' }}></div>Rejecting…</> : 'Send back to HR'}
                </button>
              </>
            ) : (
              <>
                <button className="btn-reject" onClick={() => setShowReject(true)} disabled={submitting}>Reject</button>
                <button className="btn-verify" onClick={approve} disabled={submitting}>
                  {submitting ? <><div className="spinner"></div>Approving…</> : <><IconCheck /> Final Approval</>}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

window.KycPopup = KycPopup;
window.FinalApprovalPopup = FinalApprovalPopup;
