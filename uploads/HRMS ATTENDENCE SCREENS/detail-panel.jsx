// Full Person Detail Panel — replaces the placeholder in screens.jsx

const PanelInfoRow = ({ label, value, custom }) => (
  <div style={{
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'9px 0', borderBottom:'1px solid #F8FAFC'
  }}>
    <span style={{ fontFamily:'Poppins', fontSize:12, fontWeight:500, color:'#64748B' }}>{label}</span>
    {custom || <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{value}</span>}
  </div>
);

const PanelSection = ({ title, children, style }) => (
  <div style={{ padding:'18px 20px', borderBottom:'1px solid #F1F5F9', ...style }}>
    <div style={{
      fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#94A3B8',
      textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:10
    }}>{title}</div>
    {children}
  </div>
);

const ProfileTab = ({ person }) => {
  const isEmployee = person.role === 'employee';
  const reportingTo = isEmployee
    ? (MANAGERS.find(m => m.id === person.managerId)?.name || '—')
    : person.role === 'manager'
      ? (ADMINS.find(a => a.id === person.adminId)?.name || '—')
      : person.role === 'admin' ? 'Rajesh Kumar (Super Admin)' : '—';

  return (
    <div>
      <PanelSection title="Attendance Info">
        <PanelInfoRow label="Check In"  value={person.checkIn || '—'} />
        <PanelInfoRow label="Check Out" value={person.checkOut || '—'} />
        <PanelInfoRow label="Status" custom={<StatusBadge status={person.status} />} />
        <PanelInfoRow label="Shift" value={person.shift || 'General (9AM–6PM)'} />
      </PanelSection>

      <PanelSection title="Personal Details">
        <PanelInfoRow label="Employee ID"  value={person.id} />
        <PanelInfoRow label="Department"   value={person.dept} />
        <PanelInfoRow label="Branch"       value={person.branch || 'Mumbai HQ'} />
        <PanelInfoRow label="Reporting To" value={reportingTo} />
      </PanelSection>

      {isEmployee && person.leavesTotal && (
        <PanelSection title="Leave Balance">
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8
          }}>
            <span style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>Used</span>
            <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>
              {person.leavesUsed} / {person.leavesTotal} days
            </span>
          </div>
          <div style={{ height:6, background:'#F1F5F9', borderRadius:9999, overflow:'hidden' }}>
            <div style={{
              width: `${(person.leavesUsed / person.leavesTotal) * 100}%`,
              height:'100%', background:'#BD1313', borderRadius:9999, transition:'width .4s'
            }}></div>
          </div>
          <div style={{
            marginTop:10, display:'flex', justifyContent:'space-between', alignItems:'center'
          }}>
            <span style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>Remaining</span>
            <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#16A34A' }}>
              {person.leavesTotal - person.leavesUsed} leaves
            </span>
          </div>
        </PanelSection>
      )}

      <PanelSection title="Quick Stats" style={{ borderBottom:'none' }}>
        <div style={{ display:'flex', gap:8 }}>
          {[
            { label:'Days Present', sub:'this month', value:'18' },
            { label:'Avg Check-in', sub:'this month', value:'9:04' },
            { label:'Late Count',   sub:'this month', value:'2' },
          ].map((s, i) => (
            <div key={i} style={{
              flex:1, background:'#F8FAFC', borderRadius:10,
              padding:'10px 12px', border:'1px solid #F1F5F9'
            }}>
              <div style={{ fontFamily:'Poppins', fontSize:18, fontWeight:700, color:'#0F172A', lineHeight:1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily:'Poppins', fontSize:10, fontWeight:600, color:'#94A3B8',
                textTransform:'uppercase', letterSpacing:'0.5px', marginTop:6 }}>{s.label}</div>
              <div style={{ fontFamily:'Poppins', fontSize:10, color:'#CBD5E1', marginTop:1 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </PanelSection>
    </div>
  );
};

const TeamMiniRow = ({ p, last }) => (
  <div style={{
    display:'flex', alignItems:'center', gap:10,
    padding:'10px 0', borderBottom: last ? 'none' : '1px solid #F8FAFC'
  }}>
    <Avatar role={p.role} initials={p.initials} size={32} />
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{p.name}</div>
      <div style={{ fontFamily:'Poppins', fontSize:11, color:'#64748B', marginTop:1 }}>
        {p.designation || p.dept}
      </div>
    </div>
    <StatusBadge status={p.status} />
  </div>
);

const TeamTab = ({ person, toast }) => {
  if (person.role === 'admin') {
    const sampleManagers = MANAGERS.slice(0, 3);
    return (
      <div>
        <PanelSection title={`My Managers (${person.managersCount})`}>
          {sampleManagers.map((m, i) => <TeamMiniRow key={m.id} p={m} last={i === sampleManagers.length - 1} />)}
          <button onClick={() => toast('Showing all managers')}
            style={{
              marginTop:10, background:'transparent', border:'none',
              fontFamily:'Poppins', fontSize:12, fontWeight:600, color:'#BD1313',
              cursor:'pointer', padding:0
            }}>View all {person.managersCount} →</button>
        </PanelSection>

        <PanelSection title={`My Employees (${person.employeesCount})`} style={{ borderBottom:'none' }}>
          {[
            { dept:'Frontend Engineering', count:45 },
            { dept:'Backend Engineering',  count:38 },
            { dept:'QA & Testing',         count:41 },
          ].map((d, i) => (
            <div key={i} style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'10px 0', borderBottom: i < 2 ? '1px solid #F8FAFC' : 'none'
            }}>
              <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:500, color:'#0F172A' }}>{d.dept}</span>
              <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:700, color:'#BD1313' }}>{d.count}</span>
            </div>
          ))}
        </PanelSection>
      </div>
    );
  }

  // manager
  const team = EMPLOYEES.filter(e => e.managerId === person.id);
  return (
    <PanelSection title={`My Team (${person.employeesCount})`} style={{ borderBottom:'none' }}>
      {team.map((e, i) => <TeamMiniRow key={e.id} p={e} last={i === team.length - 1} />)}
    </PanelSection>
  );
};

const ActivityTab = ({ person }) => {
  const events = [
    { time:'09:01 AM', text:'Checked In at ' + (person.branch || 'Mumbai HQ'), color:'#16A34A' },
    { time:'09:14 AM', text:'Opened Daily Report dashboard',                    color:'#64748B' },
    { time:'10:32 AM', text:'Submitted code review on PR #482',                 color:'#2563EB' },
    { time:'11:45 AM', text:'Marked task "Refactor auth flow" complete',         color:'#16A34A' },
    { time:'01:00 PM', text:'Break started',                                     color:'#D97706' },
  ];
  return (
    <div style={{ padding:'20px' }}>
      {events.map((e, i) => (
        <div key={i} style={{ display:'flex', gap:14, paddingBottom:i < events.length - 1 ? 16 : 0 }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
            <div style={{
              width:10, height:10, borderRadius:'50%', background:e.color,
              border:`2px solid ${e.color}22`, marginTop:5
            }}></div>
            {i < events.length - 1 && <div style={{ flex:1, width:1, background:'#E2E8F0', marginTop:3 }}></div>}
          </div>
          <div style={{ flex:1, paddingBottom:i < events.length - 1 ? 6 : 0 }}>
            <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{e.text}</div>
            <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:2 }}>{e.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DetailPanelV2 = ({ person, onClose, toast }) => {
  const [tab, setTab] = React.useState('profile');
  React.useEffect(() => { setTab('profile'); }, [person?.id]);

  if (!person) return null;
  const r = getRoleStyle(person.role);
  const showTeam = person.role === 'admin' || person.role === 'manager';
  const teamCount = person.role === 'admin'
    ? person.managersCount
    : person.role === 'manager' ? person.employeesCount : 0;

  return (
    <div style={{
      position:'fixed', top:64, right:0,
      width:420, height:'calc(100vh - 64px)',
      background:'#fff', borderLeft:'1px solid #E2E8F0',
      boxShadow:'-8px 0 32px rgba(15,23,42,0.12)',
      zIndex:200, display:'flex', flexDirection:'column',
      overflow:'hidden', fontFamily:'Poppins',
      animation:'slideInRight 280ms ease-out'
    }}>

      {/* HERO */}
      <div style={{
        padding:'24px 22px 20px',
        background: r.grad, color:'#fff', position:'relative'
      }}>
        <button onClick={onClose}
          onMouseEnter={(e) => e.currentTarget.style.background='rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.background='rgba(255,255,255,0.2)'}
          style={{
            position:'absolute', top:14, right:14,
            width:30, height:30, borderRadius:'50%',
            background:'rgba(255,255,255,0.2)', border:'none',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', padding:0, transition:'background .2s'
          }}>
          <X size={14} color="#fff" />
        </button>

        <div style={{
          width:72, height:72, borderRadius:'50%',
          background:'rgba(255,255,255,0.25)',
          border:'3px solid rgba(255,255,255,0.85)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontWeight:700, fontSize:24, marginBottom:14
        }}>{person.initials}</div>

        <div style={{ fontSize:18, fontWeight:700, color:'#fff' }}>{person.name}</div>
        <div style={{ marginTop:6, display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <span style={{
            background:'rgba(255,255,255,0.22)', color:'#fff',
            fontSize:11, fontWeight:600,
            borderRadius:9999, padding:'3px 10px',
            border:'1px solid rgba(255,255,255,0.25)'
          }}>{r.label}</span>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.85)' }}>{person.dept}</span>
        </div>
        <div style={{ fontSize:11, color:'rgba(255,255,255,0.75)', marginTop:6 }}>{person.id}</div>
      </div>

      {/* TABS */}
      <div style={{
        display:'flex', height:44, background:'#fff',
        borderBottom:'1px solid #E2E8F0', padding:'0 12px',
        flexShrink:0
      }}>
        {[
          { key:'profile',  label:'Profile' },
          showTeam ? { key:'team', label:'Team', count:teamCount } : null,
          { key:'activity', label:'Activity' },
        ].filter(Boolean).map(t => {
          const active = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                height:44, padding:'0 16px', border:'none', background:'transparent',
                fontFamily:'Poppins', fontSize:13, fontWeight:600,
                color: active ? '#BD1313' : '#94A3B8',
                borderBottom: active ? '2px solid #BD1313' : '2px solid transparent',
                cursor:'pointer', display:'flex', alignItems:'center', gap:6,
                transition:'color .15s'
              }}>
              {t.label}
              {t.count != null && (
                <span style={{
                  background: active ? '#BD1313' : '#E2E8F0',
                  color: active ? '#fff' : '#475569',
                  fontSize:10, fontWeight:700,
                  borderRadius:9999, padding:'1px 6px'
                }}>{t.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* BODY */}
      <div className="inner-scroll" style={{ flex:1, overflowY:'auto' }}>
        {tab === 'profile' && <ProfileTab person={person} />}
        {tab === 'team'    && <TeamTab person={person} toast={toast} />}
        {tab === 'activity'&& <ActivityTab person={person} />}
      </div>

      {/* FOOTER */}
      <div style={{
        padding:'14px 18px', borderTop:'1px solid #E2E8F0',
        display:'flex', gap:8, flexShrink:0
      }}>
        <button onClick={() => toast('Messaging coming soon')}
          style={{
            flex:1, height:38,
            background:'#F1F5F9', color:'#475569', border:'none', borderRadius:8,
            fontFamily:'Poppins', fontSize:13, fontWeight:600, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:6
          }}>
          <MessageSquare size={14} color="#475569" /> Message
        </button>
        <button onClick={() => toast('Full profile module coming soon')}
          onMouseEnter={(e) => e.currentTarget.style.background='#991010'}
          onMouseLeave={(e) => e.currentTarget.style.background='#BD1313'}
          style={{
            flex:2, height:38,
            background:'#BD1313', color:'#fff', border:'none', borderRadius:8,
            fontFamily:'Poppins', fontSize:13, fontWeight:600, cursor:'pointer',
            boxShadow:'0 2px 8px rgba(189,19,19,0.20)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:6,
            transition:'background .15s'
          }}>
          <ExternalLink size={14} color="#fff" /> Full Profile
        </button>
      </div>
    </div>
  );
};

window.DetailPanelV2 = DetailPanelV2;
