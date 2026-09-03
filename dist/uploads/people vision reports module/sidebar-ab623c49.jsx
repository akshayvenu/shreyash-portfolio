// Sidebar component

const NavItem = ({ icon: IconComp, label, screen, active, onClick, badge, locked }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        height:40, borderRadius:8, padding:'0 12px', marginBottom:2,
        display:'flex', alignItems:'center', gap:10, cursor:'pointer',
        transition:'background .2s, color .2s',
        background: active ? '#1E293B' : (hover ? 'rgba(255,255,255,0.05)' : 'transparent'),
        borderLeft: active ? '2px solid #BD1313' : '2px solid transparent',
        paddingLeft: active ? 10 : 12,
        position:'relative'
      }}>
      <IconComp size={16} color={active ? '#BD1313' : (hover ? '#94A3B8' : '#64748B')} />
      <span style={{
        fontFamily:'Poppins', fontSize:13,
        fontWeight: active ? 600 : 500,
        color: active ? '#F1F5F9' : (hover ? '#CBD5E1' : '#94A3B8'),
        flex:1
      }}>{label}</span>
      {badge && (
        <span style={{
          background:'#16A34A', color:'#fff',
          fontFamily:'Poppins', fontSize:9, fontWeight:700,
          borderRadius:9999, padding:'1px 6px', letterSpacing:'0.5px'
        }}>{badge}</span>
      )}
      {locked && <Lock size={12} color="#475569" />}
    </div>
  );
};

const SectionLabel = ({ children }) => (
  <div style={{
    fontFamily:'Poppins', fontSize:10, fontWeight:600, color:'#475569',
    textTransform:'uppercase', letterSpacing:'1px',
    padding:'12px 8px 6px'
  }}>{children}</div>
);

const Sidebar = ({ screen, setScreen, currentRole, setCurrentRole }) => {
  const r = getRoleStyle(currentRole);
  return (
    <aside style={{
      width:240, height:'100vh', background:'#0F172A',
      borderRight:'1px solid #1E293B',
      position:'fixed', left:0, top:0, zIndex:100,
      display:'flex', flexDirection:'column',
      fontFamily:'Poppins'
    }}>
      {/* TOP */}
      <div style={{ padding:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
          <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" height="24" alt="AIVision21"
               style={{ opacity:0.9, display:'block' }} />
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:'#F1F5F9', lineHeight:1.1 }}>PeopleVision</div>
            <div style={{ fontSize:10, fontWeight:500, color:'#64748B', marginTop:2, letterSpacing:'0.4px' }}>Reports</div>
          </div>
        </div>
        <div style={{ height:1, background:'#1E293B', margin:'12px 0' }}></div>

        {/* Current user card */}
        <div style={{
          background:'rgba(255,255,255,0.05)', borderRadius:10,
          padding:'10px 12px', display:'flex', alignItems:'center', gap:10
        }}>
          <div style={{
            width:32, height:32, borderRadius:'50%',
            background:'linear-gradient(135deg, #BD1313, #7A0D0D)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', fontWeight:700, fontSize:12, flexShrink:0
          }}>{CURRENT_USER.initials}</div>
          <div style={{ minWidth:0, flex:1 }}>
            <div style={{ fontSize:13, fontWeight:600, color:'#F1F5F9', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
              {CURRENT_USER.name}
            </div>
            <span style={{
              display:'inline-block', background:r.bg, color:'#fff',
              fontSize:10, fontWeight:600,
              borderRadius:9999, padding:'2px 8px', marginTop:2
            }}>{r.label}</span>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="inner-scroll" style={{ flex:1, padding:'0 8px', overflowY:'auto' }}>
        <SectionLabel>Overview</SectionLabel>
        <NavItem icon={LayoutDashboard} label="Today's Report" screen="today"
                 active={screen==='today'} onClick={() => setScreen('today')} />
        <NavItem icon={Activity} label="Live Status" screen="live" badge="LIVE"
                 active={screen==='live'} onClick={() => setScreen('live')} />

        <SectionLabel>Attendance</SectionLabel>
        <NavItem icon={ClipboardList} label="Attendance Report"
                 active={screen==='attendance'} onClick={() => setScreen('attendance')} />
        <NavItem icon={CalendarOff} label="Leave Report"
                 active={screen==='leaves'} onClick={() => setScreen('leaves')} />
        <NavItem icon={AlertTriangle} label="Late & Absent"
                 active={screen==='late-absent'} onClick={() => setScreen('late-absent')} />

        <SectionLabel>Workforce</SectionLabel>
        <NavItem icon={Network} label="Hierarchy View"
                 active={screen==='hierarchy'} onClick={() => setScreen('hierarchy')} />
        <NavItem icon={MapPin} label="Location Report"
                 locked={currentRole !== 'superadmin'}
                 active={screen==='location'} onClick={() => setScreen('location')} />
        <NavItem icon={Briefcase} label="Outdoor & Travel"
                 active={screen==='outdoor'} onClick={() => setScreen('outdoor')} />

        <SectionLabel>Analytics</SectionLabel>
        <NavItem icon={TrendingUp} label="Trends"
                 active={screen==='trends'} onClick={() => setScreen('trends')} />
        <NavItem icon={Download} label="Export Reports"
                 active={screen==='export'} onClick={() => setScreen('export')} />
      </nav>

      {/* BOTTOM */}
      <div style={{ padding:'12px 8px' }}>
        <div style={{ height:1, background:'#1E293B', marginBottom:12 }}></div>

        <div style={{
          fontSize:10, fontWeight:600, color:'#475569',
          textTransform:'uppercase', letterSpacing:'1px',
          padding:'0 8px', marginBottom:6
        }}>View As</div>

        <div style={{ display:'flex', gap:4, padding:'0 4px' }}>
          {[
            { key:'superadmin', label:'Super Admin' },
            { key:'admin',      label:'Admin' },
            { key:'manager',    label:'Manager' },
          ].map(r => {
            const active = currentRole === r.key;
            return (
              <button key={r.key} onClick={() => setCurrentRole(r.key)}
                style={{
                  height:26, padding:'0 8px', borderRadius:9999,
                  border:'none', cursor:'pointer',
                  fontFamily:'Poppins', fontSize:10, fontWeight:600,
                  background: active ? '#BD1313' : 'rgba(255,255,255,0.06)',
                  color: active ? '#fff' : '#94A3B8',
                  transition:'all .2s', flex:1, whiteSpace:'nowrap'
                }}>{r.label}</button>
            );
          })}
        </div>

        <div onClick={() => window.__toast && window.__toast('Settings coming soon')}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          style={{
            height:40, display:'flex', alignItems:'center', gap:10,
            cursor:'pointer', borderRadius:8, padding:'0 12px', marginTop:8,
            transition:'background .2s'
          }}>
          <Settings size={16} color="#64748B" />
          <span style={{ fontSize:13, fontWeight:500, color:'#94A3B8' }}>Settings</span>
        </div>
      </div>
    </aside>
  );
};

window.Sidebar = Sidebar;
