// Top Bar — full width, role switcher inline (no sidebar)

const TopBar = ({ screen, currentRole, setCurrentRole, dateFilter, setDateFilter,
                  selectedBranch, setSelectedBranch, drillPath, setScreen, setDrillPath, toast }) => {
  const title = SCREEN_TITLES[screen] || 'Reports';
  const r = getRoleStyle(currentRole);
  return (
    <header style={{
      height:64, background:'#fff',
      borderBottom:'1px solid #E2E8F0',
      padding:'0 28px',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      boxShadow:'0 1px 4px rgba(15,23,42,0.06)',
      flexShrink:0,
      fontFamily:'Poppins'
    }}>
      {/* LEFT — module crumb + title + breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:12, minWidth:0 }}>
        <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png" height="22" alt="AIVision21" style={{ display:'block' }} />
        <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
          <span style={{ fontSize:13, fontWeight:500, color:'#94A3B8' }}>PeopleVision</span>
          <span style={{ color:'#CBD5E1', fontSize:13 }}>›</span>
          <span style={{ fontSize:13, fontWeight:500, color:'#BD1313', cursor:'pointer' }}
            onClick={() => toast('Reports module')}>Reports</span>
          <span style={{ color:'#CBD5E1', fontSize:13 }}>›</span>
          <span style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>{title}</span>
          {drillPath && drillPath.length > 0 && drillPath.map((p, i) => (
            <React.Fragment key={i}>
              <span style={{ color:'#CBD5E1', fontSize:13 }}>›</span>
              <span style={{
                fontSize:13, fontWeight:500,
                color: i === drillPath.length - 1 ? '#0F172A' : '#BD1313',
                cursor: i === drillPath.length - 1 ? 'default' : 'pointer'
              }}>{p}</span>
            </React.Fragment>
          ))}
        </div>
        {screen === 'live' && (
          <div style={{ display:'flex', gap:6, alignItems:'center', marginLeft:8 }}>
            <span style={{
              width:8, height:8, borderRadius:'50%', background:'#16A34A',
              animation:'livePulse 1.6s ease-out infinite'
            }}></span>
            <span style={{ fontSize:12, fontWeight:600, color:'#16A34A' }}>Live</span>
          </div>
        )}
      </div>

      {/* RIGHT — filters, role switcher, user */}
      <div style={{ display:'flex', gap:12, alignItems:'center' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', lineHeight:1.2, marginRight:4 }}>
          <div style={{ fontSize:12, fontWeight:500, color:'#475569' }}>Mon, 28 April 2025</div>
          <div style={{ fontSize:11, color:'#94A3B8', marginTop:1 }}>09:42 AM IST</div>
        </div>

        <div style={{ height:24, width:1, background:'#E2E8F0' }}></div>

        <div style={{ display:'flex', gap:4, alignItems:'center' }}>
          <Calendar size={14} color="#64748B" />
          {[
            { key:'today', label:'Today' },
            { key:'week',  label:'Week' },
            { key:'month', label:'Month' },
          ].map(d => {
            const active = dateFilter === d.key;
            return (
              <button key={d.key} onClick={() => setDateFilter(d.key)}
                style={{
                  height:28, padding:'0 12px', borderRadius:9999,
                  border:'none', cursor:'pointer',
                  fontFamily:'Poppins', fontSize:12, fontWeight:600,
                  background: active ? '#BD1313' : '#F1F5F9',
                  color: active ? '#fff' : '#475569',
                  transition:'all .2s', whiteSpace:'nowrap'
                }}>{d.label}</button>
            );
          })}
        </div>

        <div style={{ height:24, width:1, background:'#E2E8F0' }}></div>

        {currentRole === 'superadmin' && (
          <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}
            style={{
              height:32, padding:'0 28px 0 10px', borderRadius:8,
              border:'1px solid #E2E8F0', background:'#fff',
              fontFamily:'Poppins', fontSize:12, fontWeight:500, color:'#475569',
              cursor:'pointer', outline:'none', appearance:'none',
              backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748B\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'/></svg>")',
              backgroundRepeat:'no-repeat', backgroundPosition:'right 8px center'
            }}>
            <option>All Branches</option>
            <option>Mumbai HQ</option>
            <option>Delhi Branch</option>
            <option>Bangalore Office</option>
            <option>Chennai Hub</option>
            <option>Pune Office</option>
          </select>
        )}

        {/* Role switcher (demo) */}
        <div style={{
          display:'flex', alignItems:'center', gap:6,
          background:'#F8FAFC', border:'1px solid #E2E8F0',
          borderRadius:9999, padding:3
        }}>
          <span style={{
            fontSize:10, fontWeight:600, color:'#94A3B8',
            textTransform:'uppercase', letterSpacing:'0.6px',
            padding:'0 8px 0 6px'
          }}>View as</span>
          {[
            { key:'superadmin', label:'Super' },
            { key:'admin',      label:'Admin' },
            { key:'manager',    label:'Manager' },
          ].map(rr => {
            const active = currentRole === rr.key;
            return (
              <button key={rr.key} onClick={() => setCurrentRole(rr.key)}
                style={{
                  height:24, padding:'0 10px', borderRadius:9999,
                  border:'none', cursor:'pointer',
                  fontFamily:'Poppins', fontSize:11, fontWeight:600,
                  background: active ? '#BD1313' : 'transparent',
                  color: active ? '#fff' : '#64748B',
                  transition:'all .2s'
                }}>{rr.label}</button>
            );
          })}
        </div>

        <button onClick={() => toast('No new notifications')}
          style={{
            width:32, height:32, borderRadius:8,
            background:'#F8FAFC', border:'1px solid #E2E8F0',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', position:'relative', padding:0
          }}>
          <Bell size={16} color="#475569" />
          <span style={{
            position:'absolute', top:5, right:5,
            width:7, height:7, borderRadius:'50%',
            background:'#BD1313', border:'1.5px solid #fff'
          }}></span>
        </button>

        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{
            width:34, height:34, borderRadius:'50%',
            background:'linear-gradient(135deg, #BD1313, #7A0D0D)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', fontWeight:700, fontSize:12, cursor:'pointer'
          }}>{CURRENT_USER.initials}</div>
          <div style={{ lineHeight:1.2 }}>
            <div style={{ fontSize:12, fontWeight:600, color:'#0F172A' }}>{CURRENT_USER.name}</div>
            <span style={{
              display:'inline-block', background:r.bg, color:'#fff',
              fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px',
              borderRadius:9999, padding:'1px 6px', marginTop:2
            }}>{r.label}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// ---------- Tab nav strip (replaces sidebar) ----------
const ReportTabs = ({ screen, setScreen, currentRole }) => {
  const tabs = [
    { key:'today',       label:"Today's Report",     icon: LayoutDashboard, group:'Overview' },
    { key:'live',        label:'Live Status',        icon: Activity,        group:'Overview',   badge:'LIVE' },
    { key:'attendance',  label:'Attendance',         icon: ClipboardList,   group:'Attendance' },
    { key:'leaves',      label:'Leaves',             icon: CalendarOff,     group:'Attendance' },
    { key:'late-absent', label:'Late & Absent',      icon: AlertTriangle,   group:'Attendance' },
    { key:'hierarchy',   label:'Hierarchy',          icon: Network,         group:'Workforce'  },
    { key:'location',    label:'Location',           icon: MapPin,          group:'Workforce',  locked: currentRole !== 'superadmin' },
    { key:'outdoor',     label:'Outdoor & Travel',   icon: Briefcase,       group:'Workforce'  },
    { key:'trends',      label:'Trends',             icon: TrendingUp,      group:'Analytics'  },
    { key:'export',      label:'Export',             icon: Download,        group:'Analytics'  },
  ];
  return (
    <div style={{
      height:48, background:'#fff',
      borderBottom:'1px solid #E2E8F0',
      padding:'0 28px',
      display:'flex', alignItems:'center', gap:4,
      flexShrink:0, overflowX:'auto', whiteSpace:'nowrap',
      fontFamily:'Poppins'
    }}>
      {tabs.map(t => {
        const active = screen === t.key;
        const Ic = t.icon;
        return (
          <button key={t.key}
            onClick={() => !t.locked && setScreen(t.key)}
            disabled={t.locked}
            style={{
              height:32, padding:'0 12px', borderRadius:8,
              border:'none', background: active ? '#FDF2F2' : 'transparent',
              cursor: t.locked ? 'not-allowed' : 'pointer',
              fontFamily:'Poppins', fontSize:12, fontWeight: active ? 600 : 500,
              color: active ? '#BD1313' : (t.locked ? '#CBD5E1' : '#475569'),
              display:'flex', alignItems:'center', gap:8,
              transition:'all .15s',
              opacity: t.locked ? 0.6 : 1,
              borderBottom: active ? '2px solid #BD1313' : '2px solid transparent',
              borderRadius:0,
              alignSelf:'stretch', marginTop:8
            }}
            onMouseEnter={(e) => { if (!active && !t.locked) e.currentTarget.style.color = '#0F172A'; }}
            onMouseLeave={(e) => { if (!active && !t.locked) e.currentTarget.style.color = '#475569'; }}>
            <Ic size={14} color={active ? '#BD1313' : (t.locked ? '#CBD5E1' : '#64748B')} />
            <span>{t.label}</span>
            {t.badge && (
              <span style={{
                background:'#16A34A', color:'#fff', fontSize:9, fontWeight:700,
                borderRadius:9999, padding:'1px 6px', letterSpacing:'0.5px'
              }}>{t.badge}</span>
            )}
            {t.locked && <Lock size={11} color="#CBD5E1" />}
          </button>
        );
      })}
    </div>
  );
};

Object.assign(window, { TopBar, ReportTabs });
