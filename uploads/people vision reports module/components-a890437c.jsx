// Reusable components

const StatusBadge = ({ status, large }) => {
  const s = getStatusStyle(status);
  return (
    <span style={{
      display:'inline-flex', gap:6, alignItems:'center',
      background:s.bg, color:s.color, border:`1px solid ${s.border}`,
      borderRadius:6, padding: large ? '5px 10px' : '3px 8px',
      fontFamily:'Poppins', fontSize: large ? 12 : 11, fontWeight:600,
      whiteSpace:'nowrap'
    }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:s.dot, display:'inline-block' }}></span>
      {s.label}
    </span>
  );
};

const RolePill = ({ role, dark }) => {
  const r = getRoleStyle(role);
  if (dark) {
    return <span style={{
      display:'inline-block', background:r.bg, color:r.color,
      fontFamily:'Poppins', fontSize:10, fontWeight:600,
      borderRadius:9999, padding:'2px 8px', marginTop:2
    }}>{r.label}</span>;
  }
  return <span style={{
    display:'inline-block', background:r.soft, color:r.softColor,
    fontFamily:'Poppins', fontSize:10, fontWeight:600,
    borderRadius:9999, padding:'1px 7px'
  }}>{r.label}</span>;
};

const Avatar = ({ role, initials, size = 40 }) => {
  const r = getRoleStyle(role);
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%',
      background:r.grad, color:'#fff',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:'Poppins', fontWeight:700,
      fontSize: size <= 32 ? 12 : size <= 40 ? 14 : size <= 48 ? 16 : 20,
      flexShrink:0,
      boxShadow:'0 2px 6px rgba(15,23,42,0.12)'
    }}>{initials}</div>
  );
};

const StatCard = ({ card, onClick }) => {
  const [hover, setHover] = React.useState(false);
  const trendUp = card.trend === 'up';
  const trendFlat = card.trend === 'flat';
  const trendBg = trendFlat ? '#F1F5F9' : trendUp ? '#DCFCE7' : '#FEF2F2';
  const trendColor = trendFlat ? '#64748B' : trendUp ? '#16A34A' : '#DC2626';
  const trendArrow = trendFlat ? '·' : trendUp ? '↑' : '↓';
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
        padding:'16px 20px', height:110, position:'relative',
        overflow:'hidden', cursor:'pointer',
        transition:'transform .2s, box-shadow .2s, border-color .2s',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 4px 16px rgba(15,23,42,0.10)' : '0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)',
        borderColor: hover ? '#CBD5E1' : '#E2E8F0'
      }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:card.strip }}></div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
        <img src={`https://img.icons8.com/pulsar-color/48/${card.icon}.png`}
             width="28" height="28" alt="" style={{ display:'block' }} />
        <span style={{
          background:trendBg, color:trendColor,
          fontFamily:'Poppins', fontSize:11, fontWeight:600,
          borderRadius:9999, padding:'2px 7px',
          display:'inline-flex', alignItems:'center', gap:2
        }}>{trendArrow} {card.delta}</span>
      </div>
      <div style={{ fontFamily:'Poppins', fontSize:28, fontWeight:700, color:'#0F172A', lineHeight:1 }}>
        {card.value.toLocaleString()}
      </div>
      <div style={{
        fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#94A3B8',
        textTransform:'uppercase', letterSpacing:'0.6px', marginTop:6
      }}>{card.label}</div>
    </div>
  );
};

const StatusTile = ({ tile }) => {
  const s = getStatusStyle(tile.key);
  return (
    <div style={{
      background:s.bg, border:`1px solid ${s.border}`,
      borderRadius:10, padding:'10px 12px',
      display:'flex', alignItems:'center', gap:10
    }}>
      <span style={{ width:8, height:8, borderRadius:'50%', background:s.dot, flexShrink:0 }}></span>
      <span style={{ fontFamily:'Poppins', fontSize:12, fontWeight:500, color:s.color, flex:1 }}>{tile.label}</span>
      <span style={{ fontFamily:'Poppins', fontSize:14, fontWeight:700, color:s.color }}>{tile.count}</span>
    </div>
  );
};

const BranchRow = ({ row }) => {
  const pct = Math.round((row.present / row.total) * 100);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
      <div style={{ minWidth:130 }}>
        <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{row.branch}</div>
        <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:1 }}>{row.city}</div>
      </div>
      <div style={{ flex:1, height:6, background:'#F1F5F9', borderRadius:9999, overflow:'hidden' }}>
        <div style={{ width:`${pct}%`, height:'100%', background:'#BD1313', borderRadius:9999, transition:'width .4s ease' }}></div>
      </div>
      <div style={{ display:'flex', alignItems:'baseline', gap:4, minWidth:64, justifyContent:'flex-end' }}>
        <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:700, color:'#0F172A' }}>{row.present}</span>
        <span style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8' }}>/ {row.total}</span>
      </div>
      <div style={{ minWidth:36, textAlign:'right' }}>
        <span style={{ fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#475569' }}>{pct}%</span>
      </div>
    </div>
  );
};

const PersonCard = ({ person, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background:'#fff', border:`1px solid ${hover ? '#CBD5E1' : '#E2E8F0'}`,
        borderRadius:12, padding:'14px 16px', marginBottom:8,
        cursor:'pointer', transition:'all .2s',
        boxShadow: hover ? '0 4px 16px rgba(15,23,42,0.08)' : 'none',
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        display:'flex', alignItems:'center', gap:12
      }}>
      <Avatar role={person.role} initials={person.initials} size={40} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>{person.name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:3, flexWrap:'wrap' }}>
          <RolePill role={person.role} />
          <span style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>· {person.dept} · {person.branch}</span>
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
        <StatusBadge status={person.status} />
        <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', whiteSpace:'nowrap' }}>
          ↳ {person.managersCount} mgrs · {person.employeesCount} staff
        </div>
      </div>
      <ChevronRight size={16} color="#94A3B8" />
    </div>
  );
};

const LeaveItem = ({ leave, last }) => {
  const statusBg = leave.status === 'approved' ? '#DCFCE7' : '#FEF3C7';
  const statusColor = leave.status === 'approved' ? '#16A34A' : '#D97706';
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:10,
      padding:'10px 0', borderBottom: last ? 'none' : '1px solid #F1F5F9'
    }}>
      <Avatar role={leave.role} initials={leave.initials} size={32} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{leave.name}</div>
        <div style={{ fontFamily:'Poppins', fontSize:11, color:'#64748B', marginTop:1 }}>
          {leave.type} · {leave.dept}
        </div>
      </div>
      <div style={{ textAlign:'right' }}>
        <div style={{ fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#475569' }}>
          {leave.from === leave.to ? leave.from : `${leave.from} – ${leave.to}`}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:3, justifyContent:'flex-end' }}>
          <span style={{ fontFamily:'Poppins', fontSize:10, color:'#94A3B8' }}>{leave.days} {leave.days === 1 ? 'day' : 'days'}</span>
          <span style={{
            background:statusBg, color:statusColor,
            fontFamily:'Poppins', fontSize:10, fontWeight:600,
            borderRadius:9999, padding:'1px 7px', textTransform:'capitalize'
          }}>{leave.status}</span>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, {
  StatusBadge, RolePill, Avatar, StatCard, StatusTile, BranchRow, PersonCard, LeaveItem
});
