// Shared components
const { useState, useEffect, useMemo, useRef } = React;

const LOGO = 'https://i.ibb.co/s9CvkVdd/aivision21-logo.png';

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconChevL = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconChevR = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function Avatar({ initials, color, size = 38 }) {
  const cls = size === 56 ? 'avatar avatar-56' : size === 34 ? 'avatar avatar-34' : size === 24 ? 'avatar avatar-24' : 'avatar avatar-38';
  return <div className={cls} style={{ background: color }}>{initials}</div>;
}

function Badge({ status }) {
  if (status === 'not_started') return <span className="dash-mute">—</span>;
  return (
    <span className={`badge ${status}`}>
      {status !== 'not_required' && <span className="dot" />}
      {status.replace('_', ' ')}
    </span>
  );
}

function KycDot({ status }) {
  const letterMap = { aadhar: 'A', pan: 'P', bank: 'B', dl: 'D' };
  return (status, letter) => {};
}

function KycDots({ kyc }) {
  const letters = { aadhar: 'A', pan: 'P', bank: 'B', dl: 'D' };
  return (
    <div className="kyc-row">
      {Object.entries(letters).map(([k, l]) => (
        <span key={k} className={`kyc-dot ${kyc[k]}`} title={`${k}: ${kyc[k]}`}>{l}</span>
      ))}
    </div>
  );
}

function TopNav({ crumb, onBack, showBack, role, onRoleChange }) {
  const user = role === 'super' ? AIV.SUPER_HR : AIV.HR_ADMIN;
  return (
    <div className="topnav">
      <div className="topnav-left">
        <img src={LOGO} alt="AIVision" className="topnav-logo" />
        <div className="topnav-divider"></div>
        {showBack && (
          <button className="topnav-back" onClick={onBack}>
            <IconArrowLeft /> Back
          </button>
        )}
        <div className="topnav-crumb">
          {crumb.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep">/</span>}
              <span className={i === 0 ? 'b1' : 'b2'}>{c}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="topnav-right">
        {onRoleChange && (
          <div className="role-switch">
            <button className={`role-opt ${role === 'admin' ? 'active' : ''}`} onClick={() => onRoleChange('admin')}>HR Admin</button>
            <button className={`role-opt ${role === 'super' ? 'active' : ''}`} onClick={() => onRoleChange('super')}>Super HR</button>
          </div>
        )}
        <div className="topnav-user">
          <div className="n">{user.name}</div>
          <div className="r">{user.role}</div>
        </div>
        <Avatar initials={user.initials} color={user.color} size={34} />
      </div>
    </div>
  );
}

function Shell({ children }) {
  return (
    <div className="shell">
      <div className="shell-grid"></div>
      <div className="shell-deco-1"></div>
      <div className="shell-deco-2"></div>
      <div className="shell-content">{children}</div>
    </div>
  );
}

function Toast({ message, onDone }) {
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setClosing(true), 3200);
    const t2 = setTimeout(() => onDone && onDone(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className={`toast ${closing ? 'closing' : ''}`}>
      <span className="dot-success"></span>{message}
    </div>
  );
}

Object.assign(window, { Avatar, Badge, KycDots, TopNav, Shell, Toast,
  IconSearch, IconArrowLeft, IconArrowRight, IconChevL, IconChevR, IconDownload, IconClose, IconCheck, LOGO });
