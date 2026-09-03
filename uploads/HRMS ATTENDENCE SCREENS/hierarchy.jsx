// Hierarchy screen + drill-down

const DrillBreadcrumbBar = ({ drillPath, drillBack, currentRole }) => {
  const admin = drillPath[0] ? ADMINS.find(a => a.id === drillPath[0]) : null;
  const manager = drillPath[1] ? MANAGERS.find(m => m.id === drillPath[1]) : null;
  const canViewCompany = currentRole === 'superadmin';

  const totalLabel = drillPath.length === 0 ? '847 total employees'
    : drillPath.length === 1 ? `${admin?.employeesCount || 0} employees in this org`
    : `${manager?.employeesCount || 0} employees in this team`;

  return (
    <div style={{
      height:48, background:'#fff', border:'1px solid #E2E8F0',
      borderRadius:12, padding:'0 18px',
      display:'flex', alignItems:'center', gap:8,
      marginBottom:16, fontFamily:'Poppins',
      boxShadow:'0 1px 4px rgba(15,23,42,0.04)'
    }}>
      <Network size={15} color="#94A3B8" />
      <span
        onClick={() => canViewCompany && drillPath.length > 0 && drillBack(0)}
        style={{
          fontSize:13, fontWeight:600,
          color: canViewCompany && drillPath.length > 0 ? '#BD1313' : '#0F172A',
          cursor: canViewCompany && drillPath.length > 0 ? 'pointer' : 'default'
        }}>Company</span>
      {admin && (
        <>
          <span style={{ color:'#CBD5E1', fontSize:13 }}>›</span>
          <span
            onClick={() => drillPath.length > 1 && drillBack(1)}
            style={{
              fontSize:13, fontWeight:600,
              color: drillPath.length > 1 ? '#BD1313' : '#0F172A',
              cursor: drillPath.length > 1 ? 'pointer' : 'default'
            }}>{admin.name}</span>
        </>
      )}
      {manager && (
        <>
          <span style={{ color:'#CBD5E1', fontSize:13 }}>›</span>
          <span style={{ fontSize:13, fontWeight:600, color:'#0F172A' }}>{manager.name}</span>
        </>
      )}

      <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:14 }}>
        <span style={{ fontSize:12, color:'#94A3B8' }}>{totalLabel}</span>
        <span style={{ width:1, height:18, background:'#E2E8F0' }}></span>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{
            width:8, height:8, borderRadius:'50%', background:'#16A34A',
            animation:'livePulse 1.6s ease-out infinite'
          }}></span>
          <span style={{ fontSize:11, fontWeight:600, color:'#16A34A' }}>Live</span>
        </div>
      </div>
    </div>
  );
};

const SummaryStrip = ({ drillPath, currentRole }) => {
  let cards;
  if (drillPath.length === 0) {
    cards = [
      { label:'Admins',       value:5,   icon:'organization',     color:'#0F172A' },
      { label:'Managers',     value:24,  icon:'groups',           color:'#0F172A' },
      { label:'Employees',    value:818, icon:'attendance-mark',  color:'#0F172A' },
      { label:'Present Today',value:634, icon:'time-card',        color:'#16A34A' },
    ];
  } else if (drillPath.length === 1) {
    const a = ADMINS.find(x => x.id === drillPath[0]);
    cards = [
      { label:'Managers',      value:a?.managersCount || 0,  icon:'groups',          color:'#0F172A' },
      { label:'Employees',     value:a?.employeesCount || 0, icon:'attendance-mark', color:'#0F172A' },
      { label:'Present Today', value:98,                     icon:'time-card',       color:'#16A34A' },
      { label:'On Leave',      value:6,                      icon:'leave',           color:'#7C3AED' },
    ];
  } else {
    const m = MANAGERS.find(x => x.id === drillPath[1]);
    cards = [
      { label:'Team Size', value:m?.employeesCount || 0,    icon:'groups',          color:'#0F172A' },
      { label:'Present',   value:m?.presentToday || 0,      icon:'time-card',       color:'#16A34A' },
      { label:'Late',      value:1,                          icon:'overtime',        color:'#D97706' },
      { label:'On Leave',  value:1,                          icon:'leave',           color:'#7C3AED' },
    ];
  }
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'repeat(4, 1fr)',
      gap:12, marginBottom:20
    }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
          padding:'14px 18px',
          display:'flex', alignItems:'center', gap:12,
          boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
        }}>
          <img src={`https://img.icons8.com/pulsar-color/48/${c.icon}.png`} width="32" height="32" alt="" />
          <div>
            <div style={{ fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#94A3B8',
              textTransform:'uppercase', letterSpacing:'0.6px' }}>{c.label}</div>
            <div style={{ fontFamily:'Poppins', fontSize:22, fontWeight:700, color:c.color, lineHeight:1.1, marginTop:4 }}>
              {c.value.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const HierarchyPersonCard = ({ person, kind, onDrill, onView }) => {
  const [hover, setHover] = React.useState(false);
  const r = getRoleStyle(person.role);
  const stripColor = r.bg;

  let stat1, stat2;
  if (kind === 'admin') {
    stat1 = { value: person.managersCount, label:'managers' };
    stat2 = { value: person.employeesCount, label:'employees' };
  } else if (kind === 'manager') {
    stat1 = { value: person.employeesCount, label:'employees' };
    stat2 = { value: person.presentToday, label:'present today' };
  } else {
    stat1 = { value: '9AM–6PM', label:'shift', isText:true };
    stat2 = { value: person.checkIn || '—', label:'check-in', isText:true };
  }

  const isDrillable = kind === 'admin' || kind === 'manager';

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => isDrillable ? onDrill(person) : onView(person)}
      style={{
        background:'#fff',
        border:`1px solid ${hover ? '#CBD5E1' : '#E2E8F0'}`,
        borderRadius:16, padding:'22px 20px 18px',
        cursor:'pointer', transition:'all .2s',
        position:'relative', overflow:'hidden',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover
          ? '0 4px 16px rgba(15,23,42,0.10)'
          : '0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)',
        fontFamily:'Poppins'
      }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:stripColor }}></div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
        <Avatar role={person.role} initials={person.initials} size={52} />
        <StatusBadge status={person.status} />
      </div>

      <div style={{ fontSize:15, fontWeight:700, color:'#0F172A' }}>{person.name}</div>
      <div style={{ fontSize:12, color:'#64748B', marginTop:2 }}>
        {kind === 'employee' ? person.designation : `${r.label} · ${person.dept}`}
      </div>
      <div style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>
        {kind === 'admin' ? person.branch : person.dept}
      </div>

      <div style={{ height:1, background:'#F1F5F9', margin:'14px 0 12px' }}></div>

      <div style={{ display:'flex', gap:12 }}>
        <div style={{ flex:1 }}>
          <div style={{
            fontSize: stat1.isText ? 13 : 16, fontWeight:700, color:'#0F172A', lineHeight:1
          }}>{stat1.value}</div>
          <div style={{ fontSize:10, color:'#94A3B8', marginTop:4,
            textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:600 }}>{stat1.label}</div>
        </div>
        <div style={{ width:1, background:'#F1F5F9' }}></div>
        <div style={{ flex:1 }}>
          <div style={{
            fontSize: stat2.isText ? 13 : 16, fontWeight:700, color:'#0F172A', lineHeight:1
          }}>{stat2.value}</div>
          <div style={{ fontSize:10, color:'#94A3B8', marginTop:4,
            textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:600 }}>{stat2.label}</div>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); isDrillable ? onDrill(person) : onView(person); }}
        style={{
          width:'100%', marginTop:14, height:34,
          background: isDrillable ? '#F1F5F9' : '#FDF2F2',
          color: isDrillable ? '#475569' : '#BD1313',
          border:'none', borderRadius:8, cursor:'pointer',
          fontFamily:'Poppins', fontSize:12, fontWeight:600,
          display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          transition:'background .2s'
        }}>
        {isDrillable ? <ChevronDown size={14} color="#475569" /> : <Users size={13} color="#BD1313" />}
        {kind === 'admin' ? 'View Team' : kind === 'manager' ? 'View Employees' : 'View Profile'}
      </button>
    </div>
  );
};

const RestrictedCard = () => (
  <div style={{
    background:'#FDF2F2', border:'1px solid #F5BFBF',
    borderRadius:12, padding:'40px 32px', textAlign:'center',
    fontFamily:'Poppins'
  }}>
    <div style={{
      width:56, height:56, borderRadius:14,
      background:'#fff', border:'1px solid #F5BFBF',
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      marginBottom:14
    }}>
      <Lock size={26} color="#BD1313" />
    </div>
    <div style={{ fontSize:14, fontWeight:600, color:'#BD1313' }}>
      Company-wide view is restricted to Super Admin
    </div>
    <div style={{ fontSize:13, color:'#64748B', marginTop:4 }}>
      You are viewing your branch data only.
    </div>
  </div>
);

const HierarchyScreen = ({ currentRole, drillPath, drillInto, drillBack, openPerson, toast }) => {
  const level = drillPath.length;
  const showRestricted = level === 0 && currentRole !== 'superadmin';

  let people = [];
  let kind = 'admin';
  let cols = 'repeat(3, 1fr)';
  if (level === 0) {
    people = ADMINS;
    kind = 'admin';
    cols = 'repeat(3, 1fr)';
  } else if (level === 1) {
    people = MANAGERS.filter(m => m.adminId === drillPath[0]);
    kind = 'manager';
    cols = 'repeat(3, 1fr)';
  } else {
    people = EMPLOYEES.filter(e => e.managerId === drillPath[1]);
    kind = 'employee';
    cols = 'repeat(4, 1fr)';
  }

  return (
    <div className="screen-enter" style={{ padding:24, fontFamily:'Poppins' }}>

      <DrillBreadcrumbBar drillPath={drillPath} drillBack={drillBack} currentRole={currentRole} />

      <SummaryStrip drillPath={drillPath} currentRole={currentRole} />

      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:14, padding:'0 4px'
      }}>
        <h2 style={{ margin:0, fontSize:14, fontWeight:600, color:'#0F172A' }}>
          {level === 0 ? 'Branch Admins' : level === 1 ? 'Managers in this org' : 'Team members'}
          <span style={{ color:'#94A3B8', fontWeight:500, marginLeft:8 }}>· {people.length}</span>
        </h2>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:11, color:'#94A3B8',
            textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:600 }}>
            Click any card to drill down
          </span>
          <ArrowRight size={12} color="#94A3B8" />
        </div>
      </div>

      {showRestricted ? <RestrictedCard /> : (
        <div style={{ display:'grid', gridTemplateColumns: cols, gap: kind === 'employee' ? 14 : 16 }}>
          {people.map(p => (
            <HierarchyPersonCard
              key={p.id} person={p} kind={kind}
              onDrill={(person) => { drillInto(person); toast('Drilled into ' + person.name + "'s team"); }}
              onView={openPerson} />
          ))}
        </div>
      )}
    </div>
  );
};

window.HierarchyScreen = HierarchyScreen;
