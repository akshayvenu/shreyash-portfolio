// Attendance + Leaves + Late & Absent screens

const { useState: useState4, useMemo: useMemo4 } = React;

// ============ Shared bits ============

const FilterSelect = ({ value, onChange, options, width }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} style={{
    height:32, fontFamily:'Poppins', fontSize:12, fontWeight:500,
    border:'1px solid #E2E8F0', borderRadius:8, padding:'0 28px 0 12px',
    background:'#FFFFFF url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%2710%27 viewBox=%270 0 10 10%27><path d=%27M2 4l3 3 3-3%27 stroke=%27%2364748B%27 stroke-width=%271.5%27 fill=%27none%27 stroke-linecap=%27round%27/></svg>") no-repeat right 10px center',
    color:'#0F172A', cursor:'pointer', appearance:'none',
    minWidth: width || 140, outline:'none'
  }}>
    {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
  </select>
);

const PillRow = ({ value, onChange, options }) => (
  <div style={{ display:'flex', gap:6 }}>
    {options.map((o) => {
      const active = value === o.v;
      return (
        <button key={o.v} onClick={() => onChange(o.v)} style={{
          height:30, padding:'0 12px', borderRadius:9999, border:'none',
          background: active ? '#BD1313' : '#F1F5F9',
          color: active ? '#FFFFFF' : '#475569',
          fontFamily:'Poppins', fontSize:12, fontWeight:600, cursor:'pointer',
          transition:'all 0.18s'
        }}>{o.l}</button>
      );
    })}
  </div>
);

const SearchInput = ({ value, onChange, placeholder }) => (
  <div style={{ position:'relative' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position:'absolute', left:12, top:11 }}>
      <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
    </svg>
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{
      height:36, width:240, border:'1px solid #E2E8F0', borderRadius:8,
      padding:'0 12px 0 34px', fontFamily:'Poppins', fontSize:13, fontWeight:400,
      background:'#F8FAFC', color:'#0F172A', outline:'none'
    }} />
  </div>
);

const ExportBtn = ({ onClick, label }) => (
  <button onClick={onClick} style={{
    height:36, padding:'0 14px', display:'inline-flex', alignItems:'center', gap:8,
    background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:8,
    fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#475569', cursor:'pointer'
  }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    {label || 'Export CSV'}
  </button>
);

const HBar = ({ label, count, total, color, leftWidth }) => {
  const pct = total ? Math.min(100, (count / total) * 100) : 0;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
      <div style={{ minWidth: leftWidth || 120, fontFamily:'Poppins', fontSize:12, fontWeight:500, color:'#475569' }}>{label}</div>
      <div style={{ flex:1, height:8, background:'#F1F5F9', borderRadius:9999, overflow:'hidden' }}>
        <div style={{ width: pct + '%', height:'100%', background: color, borderRadius:9999, transition:'width 0.4s' }} />
      </div>
      <div style={{ minWidth:30, textAlign:'right', fontFamily:'Poppins', fontSize:12, fontWeight:700, color:'#0F172A' }}>{count}</div>
    </div>
  );
};

const TrendBars = ({ data, valueKey, color, max }) => {
  const [hover, setHover] = useState4(null);
  const m = max || Math.max(...data.map((d) => d[valueKey]));
  return (
    <div>
      <div style={{ display:'flex', gap:8, alignItems:'flex-end', height:96, padding:'0 4px' }}>
        {data.map((d, i) => {
          const h = Math.max(4, (d[valueKey] / m) * 88);
          return (
            <div key={d.day} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6, position:'relative' }}
                 onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              {hover === i && (
                <div style={{
                  position:'absolute', bottom: h + 18, left:'50%', transform:'translateX(-50%)',
                  background:'#0F172A', color:'#FFFFFF', fontFamily:'Poppins', fontSize:11, fontWeight:600,
                  borderRadius:6, padding:'3px 8px', whiteSpace:'nowrap',
                  boxShadow:'0 4px 12px rgba(15,23,42,0.20)'
                }}>{d[valueKey]}</div>
              )}
              <div style={{
                width:'100%', maxWidth:28, height: h,
                background: color, borderRadius:'4px 4px 0 0',
                opacity: hover === i ? 1 : 0.92, transition:'opacity 0.15s'
              }} />
              <div style={{ fontFamily:'Poppins', fontSize:10, fontWeight:600, color:'#94A3B8', letterSpacing:0.5, textTransform:'uppercase' }}>{d.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Pagination = ({ total, shown }) => (
  <div style={{
    padding:'12px 16px', background:'#F8FAFC', borderTop:'1px solid #E2E8F0',
    display:'flex', justifyContent:'space-between', alignItems:'center'
  }}>
    <div style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>
      Showing {shown} of {total.toLocaleString()} employees
    </div>
    <div style={{ display:'flex', gap:4 }}>
      {['‹', '1', '2', '3', '…', '›'].map((p, i) => {
        const active = p === '1';
        return (
          <button key={i} style={{
            width:28, height:28, borderRadius:6, border: active ? 'none' : '1px solid #E2E8F0',
            background: active ? '#BD1313' : '#FFFFFF',
            color: active ? '#FFFFFF' : '#475569',
            fontFamily:'Poppins', fontSize:12, fontWeight:600, cursor:'pointer'
          }}>{p}</button>
        );
      })}
    </div>
  </div>
);

const KpiStrip = ({ cards, columns }) => (
  <div style={{ display:'grid', gridTemplateColumns:`repeat(${columns || 5}, 1fr)`, gap:12, marginBottom:20 }}>
    {cards.map((c, i) => (
      <div key={i} style={{
        position:'relative', overflow:'hidden',
        background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:12,
        padding:'16px 20px', height:110, cursor:'pointer',
        transition:'transform 0.2s, box-shadow 0.2s'
      }} onMouseEnter={(e) => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(15,23,42,0.10)'; }}
         onMouseLeave={(e) => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background: c.strip }} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <img src={`https://img.icons8.com/pulsar-color/48/${c.icon}.png`} width="28" height="28" alt=""
               onError={(e) => { e.target.style.display='none'; }} />
          {c.trend && (
            <span style={{
              background: c.trendDir === 'up' ? '#DCFCE7' : c.trendDir === 'down' ? '#FEF2F2' : '#F1F5F9',
              color: c.trendDir === 'up' ? '#16A34A' : c.trendDir === 'down' ? '#DC2626' : '#64748B',
              fontFamily:'Poppins', fontSize:11, fontWeight:600,
              borderRadius:9999, padding:'2px 8px'
            }}>{c.trendDir === 'up' ? '↑' : c.trendDir === 'down' ? '↓' : '–'} {c.trend}</span>
          )}
        </div>
        <div style={{ fontFamily:'Poppins', fontSize:28, fontWeight:700, color: c.valueColor || '#0F172A', lineHeight:1 }}>{c.value}</div>
        <div style={{ fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#94A3B8', textTransform:'uppercase', letterSpacing:0.6, marginTop:4 }}>{c.label}</div>
      </div>
    ))}
  </div>
);

// ============ ATTENDANCE REPORT ============

const AttendanceScreen = ({ currentRole, openPerson, toast }) => {
  const [search, setSearch] = useState4('');
  const [statusF, setStatusF] = useState4('all');
  const [branchF, setBranchF] = useState4('all');
  const [dateR, setDateR] = useState4('today');

  const rows = useMemo4(() => ATTENDANCE_ROWS.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusF !== 'all' && r.status !== statusF) return false;
    if (branchF !== 'all' && r.branch !== branchF) return false;
    return true;
  }), [search, statusF, branchF]);

  const kpis = [
    { label:'Total Employees', value:'847', icon:'groups', strip:'#64748B', trend:'0%', trendDir:'flat' },
    { label:'Present Today',   value:'701', icon:'attendance-mark', strip:'#16A34A', trend:'4%', trendDir:'up', valueColor:'#16A34A' },
    { label:'On Time',         value:'658', icon:'time-card', strip:'#2563EB', trend:'2%', trendDir:'up', valueColor:'#2563EB' },
    { label:'Late Arrivals',   value:'43',  icon:'overtime', strip:'#D97706', trend:'1%', trendDir:'up', valueColor:'#D97706' },
    { label:'Absent',          value:'146', icon:'leave',    strip:'#DC2626', trend:'3%', trendDir:'down', valueColor:'#DC2626' },
  ];

  return (
    <div className="screen-enter" style={{ padding:24, fontFamily:'Poppins' }}>
      <KpiStrip cards={kpis} columns={5} />

      {/* Filter bar */}
      <div style={{
        background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:12,
        height:52, padding:'0 16px', display:'flex', alignItems:'center', gap:12, marginBottom:20
      }}>
        <PillRow value={dateR} onChange={setDateR} options={[
          {v:'today', l:'Today'}, {v:'week', l:'This Week'}, {v:'month', l:'This Month'}, {v:'custom', l:'Custom'}
        ]} />
        <div style={{ width:1, height:24, background:'#E2E8F0' }} />
        <FilterSelect value={statusF} onChange={setStatusF} options={[
          {v:'all', l:'All Status'}, {v:'checkedIn', l:'Checked In'}, {v:'checkedOut', l:'Checked Out'},
          {v:'late', l:'Late'}, {v:'onLeave', l:'On Leave'}, {v:'notCheckedIn', l:'Not Checked In'},
          {v:'outdoor', l:'Outdoor'}, {v:'wfh', l:'WFH'}, {v:'travelling', l:'Travelling'}, {v:'atEvent', l:'At Event'}
        ]} />
        {currentRole === 'superadmin' && (
          <FilterSelect value={branchF} onChange={setBranchF} options={[
            {v:'all', l:'All Branches'}, {v:'Mumbai HQ', l:'Mumbai HQ'}, {v:'Delhi Branch', l:'Delhi Branch'},
            {v:'Bangalore Office', l:'Bangalore Office'}, {v:'Chennai Hub', l:'Chennai Hub'}, {v:'Pune Office', l:'Pune Office'}
          ]} />
        )}
        <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search employee..." />
          <ExportBtn onClick={() => toast('Exporting attendance report…')} />
        </div>
      </div>

      {/* Two-col */}
      <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16 }}>
        {/* TABLE */}
        <div style={{ background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:16, overflow:'hidden' }}>
          <div style={{
            height:44, background:'#F8FAFC', borderBottom:'1px solid #E2E8F0',
            display:'grid', gridTemplateColumns:'2fr 1.4fr 1fr 1fr 1.2fr 1fr 60px',
            alignItems:'center', padding:'0 16px',
            fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#64748B',
            textTransform:'uppercase', letterSpacing:0.6
          }}>
            <div>Employee</div><div>Department</div><div>Check In</div><div>Check Out</div>
            <div>Status</div><div>Shift</div><div style={{ textAlign:'right' }}>Actions</div>
          </div>
          <div className="inner-scroll" style={{ maxHeight: 480, overflowY:'auto' }}>
            {rows.length === 0 && (
              <div style={{ padding:'48px 16px', textAlign:'center', color:'#94A3B8', fontSize:13 }}>
                No employees match your filters.
              </div>
            )}
            {rows.map((r) => (
              <div key={r.id} onClick={() => openPerson(r)} style={{
                height:48, display:'grid',
                gridTemplateColumns:'2fr 1.4fr 1fr 1fr 1.2fr 1fr 60px',
                alignItems:'center', padding:'0 16px',
                borderBottom:'1px solid #F1F5F9', cursor:'pointer',
                transition:'background 0.15s'
              }} onMouseEnter={(e) => e.currentTarget.style.background='#F8FAFC'}
                 onMouseLeave={(e) => e.currentTarget.style.background='#FFFFFF'}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <Avatar role={r.role} initials={r.initials} size={32} />
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.name}</div>
                    <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8' }}>{r.id}</div>
                  </div>
                </div>
                <div style={{ fontFamily:'Poppins', fontSize:13, color:'#475569', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.dept}</div>
                <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight: r.checkIn ? 600 : 400, color: r.checkIn ? '#0F172A' : '#94A3B8' }}>{r.checkIn || '—'}</div>
                <div style={{ fontFamily:'Poppins', fontSize:13, color: r.checkOut ? '#475569' : '#94A3B8' }}>{r.checkOut || '—'}</div>
                <div><StatusBadge status={r.status} /></div>
                <div style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>{r.shift}</div>
                <div style={{ textAlign:'right' }}>
                  <button onClick={(e) => { e.stopPropagation(); openPerson(r); }} style={{
                    width:28, height:28, borderRadius:6, border:'none',
                    background:'#F1F5F9', color:'#94A3B8', cursor:'pointer',
                    display:'inline-flex', alignItems:'center', justifyContent:'center'
                  }} onMouseEnter={(e) => { e.currentTarget.style.background='#FDF2F2'; e.currentTarget.style.color='#BD1313'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.background='#F1F5F9'; e.currentTarget.style.color='#94A3B8'; }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination total={847} shown={rows.length} />
        </div>

        {/* RIGHT col */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>Today's Breakdown</div>
              <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>By attendance status</div>
            </div>
            {ATTENDANCE_BREAKDOWN.map((b) => (
              <HBar key={b.label} label={b.label} count={b.count} total={847} color={b.color} />
            ))}
            <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:6 }}>Total: 847 employees</div>
          </div>
          <div style={{ background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
              <div>
                <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>Weekly Trend</div>
                <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>Last 7 days · Present</div>
              </div>
              <span style={{
                background:'#FDF2F2', color:'#BD1313', fontFamily:'Poppins', fontSize:11, fontWeight:600,
                borderRadius:9999, padding:'2px 8px'
              }}>Avg 484/day</span>
            </div>
            <TrendBars data={WEEKLY_TREND} valueKey="present" color="#BD1313" />
            <div style={{ display:'flex', gap:14, marginTop:12, alignItems:'center' }}>
              <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                <div style={{ width:8, height:8, borderRadius:9999, background:'#BD1313' }} />
                <span style={{ fontFamily:'Poppins', fontSize:11, color:'#64748B' }}>Present</span>
              </div>
              <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                <div style={{ width:8, height:8, borderRadius:9999, background:'#D97706' }} />
                <span style={{ fontFamily:'Poppins', fontSize:11, color:'#64748B' }}>Late tracked separately</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ LEAVE REPORT ============

const LeavesScreen = ({ currentRole, openPerson, toast }) => {
  const [typeF, setTypeF] = useState4('all');
  const [statusF, setStatusF] = useState4('all');
  const [deptF, setDeptF] = useState4('all');
  const [dateR, setDateR] = useState4('month');

  const rows = useMemo4(() => LEAVE_ROWS.filter((r) => {
    if (typeF !== 'all' && r.type !== typeF) return false;
    if (statusF !== 'all' && r.status !== statusF) return false;
    if (deptF !== 'all' && r.dept !== deptF) return false;
    return true;
  }), [typeF, statusF, deptF]);

  const kpis = [
    { label:'Total On Leave',    value:'52', icon:'leave',           strip:'#7C3AED', valueColor:'#7C3AED' },
    { label:'Approved Leaves',   value:'47', icon:'attendance-mark', strip:'#16A34A', valueColor:'#16A34A' },
    { label:'Pending Approval',  value:'8',  icon:'overtime',        strip:'#D97706', valueColor:'#D97706' },
    { label:'Upcoming (7 days)', value:'23', icon:'time-card',       strip:'#2563EB', valueColor:'#2563EB' },
  ];

  return (
    <div className="screen-enter" style={{ padding:24, fontFamily:'Poppins' }}>
      <KpiStrip cards={kpis} columns={4} />

      <div style={{
        background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:12,
        height:52, padding:'0 16px', display:'flex', alignItems:'center', gap:10, marginBottom:20
      }}>
        <FilterSelect value={typeF} onChange={setTypeF} options={[
          {v:'all', l:'All Types'},
          {v:'Annual Leave', l:'Annual Leave'}, {v:'Sick Leave', l:'Sick Leave'},
          {v:'Casual Leave', l:'Casual Leave'}, {v:'Maternity Leave', l:'Maternity Leave'},
          {v:'Emergency Leave', l:'Emergency Leave'}
        ]} />
        <FilterSelect value={statusF} onChange={setStatusF} options={[
          {v:'all', l:'All Status'}, {v:'approved', l:'Approved'}, {v:'pending', l:'Pending'}, {v:'rejected', l:'Rejected'}
        ]} />
        <FilterSelect value={deptF} onChange={setDeptF} options={[
          {v:'all', l:'All Departments'},
          {v:'Frontend Engineering', l:'Frontend Engineering'},
          {v:'Backend Engineering', l:'Backend Engineering'},
          {v:'Engineering', l:'Engineering'},
          {v:'Operations', l:'Operations'},
          {v:'Marketing', l:'Marketing'},
          {v:'Design & Product', l:'Design & Product'},
          {v:'Finance & HR', l:'Finance & HR'},
          {v:'QA & Testing', l:'QA & Testing'}
        ]} />
        <div style={{ width:1, height:24, background:'#E2E8F0' }} />
        <PillRow value={dateR} onChange={setDateR} options={[
          {v:'today', l:'Today'}, {v:'week', l:'This Week'}, {v:'month', l:'This Month'}
        ]} />
        <div style={{ marginLeft:'auto' }}>
          <ExportBtn onClick={() => toast('Exporting leave report…')} />
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16 }}>
        <div style={{ background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:16, overflow:'hidden' }}>
          <div style={{
            height:44, background:'#F8FAFC', borderBottom:'1px solid #E2E8F0',
            display:'grid', gridTemplateColumns:'2fr 1.4fr 0.8fr 0.8fr 0.6fr 1.2fr 1.2fr 80px',
            alignItems:'center', padding:'0 16px',
            fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#64748B',
            textTransform:'uppercase', letterSpacing:0.6
          }}>
            <div>Employee</div><div>Leave Type</div><div>From</div><div>To</div>
            <div>Days</div><div>Dept</div><div>Status</div><div style={{ textAlign:'right' }}>Actions</div>
          </div>
          <div className="inner-scroll" style={{ maxHeight: 480, overflowY:'auto' }}>
            {rows.length === 0 && (
              <div style={{ padding:'48px 16px', textAlign:'center', color:'#94A3B8', fontSize:13 }}>
                No leave records match your filters.
              </div>
            )}
            {rows.map((r) => {
              const tb = LEAVE_TYPE_BADGE[r.type] || { bg:'#F1F5F9', color:'#64748B' };
              const sb = r.status === 'approved'
                ? { bg:'#DCFCE7', color:'#16A34A', border:'#86EFAC', dot:'#16A34A', label:'Approved' }
                : r.status === 'pending'
                ? { bg:'#FEF3C7', color:'#D97706', border:'#FCD34D', dot:'#D97706', label:'Pending' }
                : { bg:'#FEF2F2', color:'#DC2626', border:'#FECACA', dot:'#DC2626', label:'Rejected' };
              return (
                <div key={r.id} onClick={() => openPerson({ ...r, role:r.role, designation:r.dept })} style={{
                  height:48, display:'grid',
                  gridTemplateColumns:'2fr 1.4fr 0.8fr 0.8fr 0.6fr 1.2fr 1.2fr 80px',
                  alignItems:'center', padding:'0 16px',
                  borderBottom:'1px solid #F1F5F9', cursor:'pointer'
                }} onMouseEnter={(e) => e.currentTarget.style.background='#F8FAFC'}
                   onMouseLeave={(e) => e.currentTarget.style.background='#FFFFFF'}>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <Avatar role={r.role} initials={r.initials} size={32} />
                    <div>
                      <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{r.name}</div>
                      <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8' }}>{r.empId}</div>
                    </div>
                  </div>
                  <div>
                    <span style={{
                      background: tb.bg, color: tb.color, fontFamily:'Poppins', fontSize:11, fontWeight:600,
                      borderRadius:6, padding:'3px 8px', whiteSpace:'nowrap'
                    }}>{r.type}</span>
                  </div>
                  <div style={{ fontFamily:'Poppins', fontSize:13, color:'#475569' }}>{r.from}</div>
                  <div style={{ fontFamily:'Poppins', fontSize:13, color:'#475569' }}>{r.to}</div>
                  <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:700, color:'#0F172A' }}>{r.days}d</div>
                  <div style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.dept}</div>
                  <div>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:5,
                      background: sb.bg, color: sb.color, border:`1px solid ${sb.border}`,
                      fontFamily:'Poppins', fontSize:11, fontWeight:600,
                      borderRadius:6, padding:'3px 8px'
                    }}>
                      <span style={{ width:5, height:5, borderRadius:9999, background: sb.dot }} />
                      {sb.label}
                    </span>
                  </div>
                  <div style={{ display:'flex', gap:6, justifyContent:'flex-end' }}>
                    {r.status === 'pending' && (
                      <button onClick={(e) => { e.stopPropagation(); toast('Leave approved'); }} style={{
                        width:28, height:28, borderRadius:6, border:'none',
                        background:'#DCFCE7', color:'#16A34A', cursor:'pointer',
                        display:'inline-flex', alignItems:'center', justifyContent:'center'
                      }} title="Approve">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </button>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); openPerson({ ...r, role:r.role }); }} style={{
                      width:28, height:28, borderRadius:6, border:'none',
                      background:'#F1F5F9', color:'#94A3B8', cursor:'pointer',
                      display:'inline-flex', alignItems:'center', justifyContent:'center'
                    }} title="View">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination total={52} shown={rows.length} />
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>Leave by Type</div>
              <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>Currently active</div>
            </div>
            {LEAVE_TYPE_BREAKDOWN.map((b) => (
              <HBar key={b.type} label={b.type} count={b.count} total={52} color={b.color} leftWidth={130} />
            ))}
            <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:6 }}>Total: 52 employees on leave</div>
          </div>
          <div style={{ background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>Dept Leave Summary</div>
              <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>Past 30 days</div>
            </div>
            {DEPT_LEAVE_SUMMARY.map((d) => {
              const pct = (d.count / 52) * 100;
              return (
                <div key={d.dept} style={{ display:'flex', alignItems:'center', gap:12, paddingTop:8, paddingBottom:8, borderBottom:'1px solid #F8FAFC' }}>
                  <div style={{ flex:1, fontFamily:'Poppins', fontSize:13, fontWeight:500, color:'#0F172A' }}>{d.dept}</div>
                  <div style={{ width:90, height:4, background:'#F1F5F9', borderRadius:9999, overflow:'hidden' }}>
                    <div style={{ width: pct + '%', height:'100%', background:'#BD1313' }} />
                  </div>
                  <div style={{
                    minWidth:38, textAlign:'center',
                    background:'#FDF2F2', color:'#BD1313',
                    fontFamily:'Poppins', fontSize:12, fontWeight:700,
                    borderRadius:9999, padding:'2px 10px'
                  }}>{d.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ LATE & ABSENT ============

const LateAbsentScreen = ({ currentRole, openPerson, toast }) => {
  const [view, setView] = useState4('late');
  const [search, setSearch] = useState4('');
  const [branchF, setBranchF] = useState4('all');
  const [deptToggle, setDeptToggle] = useState4('late');

  const lateRows = useMemo4(() => LATE_ROWS.filter((r) =>
    !search || r.name.toLowerCase().includes(search.toLowerCase())
  ), [search]);
  const absentRows = useMemo4(() => ABSENT_ROWS.filter((r) =>
    !search || r.name.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  const kpis = [
    { label:'Late Today',     value:'43',   icon:'overtime',        strip:'#D97706', valueColor:'#D97706' },
    { label:'Avg Late By',    value:'18m',  icon:'time-card',       strip:'#D97706', valueColor:'#D97706' },
    { label:'Absent Today',   value:'94',   icon:'attendance-mark', strip:'#DC2626', valueColor:'#DC2626' },
    { label:'Habitual Late',  value:'12',   icon:'groups',          strip:'#BD1313', valueColor:'#BD1313' },
  ];

  const formatLateBy = (m) => {
    if (m >= 60) return `${Math.floor(m/60)}h ${m%60}m`;
    return `${m}m`;
  };
  const lateByColor = (m) => m >= 60 ? '#DC2626' : m >= 30 ? '#D97706' : '#475569';

  const deptData = deptToggle === 'late' ? DEPT_LATE_BREAKDOWN : DEPT_ABSENT_BREAKDOWN;
  const deptColor = deptToggle === 'late' ? '#D97706' : '#DC2626';
  const deptTotal = deptData.reduce((s, d) => s + d.count, 0);

  return (
    <div className="screen-enter" style={{ padding:24, fontFamily:'Poppins' }}>
      <KpiStrip cards={kpis} columns={4} />

      {/* View toggle + search row */}
      <div style={{
        display:'flex', alignItems:'center', gap:12, marginBottom:20
      }}>
        <div style={{ display:'flex', gap:6 }}>
          {[
            { v:'late',   l:'Late Arrivals' },
            { v:'absent', l:'Absent / Not Checked In' },
          ].map((o) => {
            const active = view === o.v;
            return (
              <button key={o.v} onClick={() => setView(o.v)} style={{
                height:36, padding:'0 18px', borderRadius:9999,
                border: active ? 'none' : '1px solid #E2E8F0',
                background: active ? '#BD1313' : '#FFFFFF',
                color: active ? '#FFFFFF' : '#475569',
                fontFamily:'Poppins', fontSize:13, fontWeight:600, cursor:'pointer',
                transition:'all 0.18s'
              }}>{o.l}</button>
            );
          })}
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search employee..." />
          {currentRole === 'superadmin' && (
            <FilterSelect value={branchF} onChange={setBranchF} options={[
              {v:'all', l:'All Branches'}, {v:'Mumbai HQ', l:'Mumbai HQ'}, {v:'Delhi Branch', l:'Delhi Branch'},
              {v:'Bangalore Office', l:'Bangalore Office'}, {v:'Chennai Hub', l:'Chennai Hub'}, {v:'Pune Office', l:'Pune Office'}
            ]} />
          )}
          <ExportBtn onClick={() => toast(`Exporting ${view === 'late' ? 'late' : 'absent'} report…`)} />
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16 }}>
        {/* TABLE */}
        <div style={{ background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:16, overflow:'hidden' }}>
          {view === 'late' ? (
            <>
              <div style={{
                height:44, background:'#F8FAFC', borderBottom:'1px solid #E2E8F0',
                display:'grid', gridTemplateColumns:'2fr 1.4fr 1fr 1fr 1fr 1.4fr 70px',
                alignItems:'center', padding:'0 16px',
                fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#64748B',
                textTransform:'uppercase', letterSpacing:0.6
              }}>
                <div>Employee</div><div>Dept</div><div>Check In</div><div>Late By</div>
                <div>Shift</div><div>Occurrences</div><div style={{ textAlign:'right' }}>Actions</div>
              </div>
              <div className="inner-scroll" style={{ maxHeight: 520, overflowY:'auto' }}>
                {lateRows.map((r) => {
                  const habitual = r.occurrences >= 3;
                  return (
                    <div key={r.id} onClick={() => openPerson(r)} style={{
                      height:52, display:'grid',
                      gridTemplateColumns:'2fr 1.4fr 1fr 1fr 1fr 1.4fr 70px',
                      alignItems:'center', padding:'0 16px',
                      borderBottom:'1px solid #F1F5F9', cursor:'pointer'
                    }} onMouseEnter={(e) => e.currentTarget.style.background='#F8FAFC'}
                       onMouseLeave={(e) => e.currentTarget.style.background='#FFFFFF'}>
                      <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                        <Avatar role={r.role} initials={r.initials} size={32} />
                        <div>
                          <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{r.name}</div>
                          <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8' }}>{r.id}</div>
                        </div>
                      </div>
                      <div style={{ fontFamily:'Poppins', fontSize:13, color:'#475569', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.dept}</div>
                      <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{r.checkIn}</div>
                      <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:700, color: lateByColor(r.lateMin) }}>{formatLateBy(r.lateMin)}</div>
                      <div style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>{r.shift}</div>
                      <div>
                        <span style={{
                          display:'inline-flex', alignItems:'center', gap:4,
                          background: habitual ? '#FEF2F2' : '#FEF3C7',
                          color: habitual ? '#DC2626' : '#D97706',
                          fontFamily:'Poppins', fontSize:11, fontWeight:600,
                          borderRadius:9999, padding:'2px 8px'
                        }}>
                          {habitual && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                          {r.occurrences}× this month
                        </span>
                      </div>
                      <div style={{ display:'flex', gap:6, justifyContent:'flex-end' }}>
                        <button onClick={(e) => { e.stopPropagation(); openPerson(r); }} style={{
                          width:28, height:28, borderRadius:6, border:'none',
                          background:'#F1F5F9', color:'#94A3B8', cursor:'pointer',
                          display:'inline-flex', alignItems:'center', justifyContent:'center'
                        }} title="View">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); toast('Reminder sent to ' + r.name); }} style={{
                          width:28, height:28, borderRadius:6, border:'none',
                          background:'#FDF2F2', color:'#BD1313', cursor:'pointer',
                          display:'inline-flex', alignItems:'center', justifyContent:'center'
                        }} title="Send reminder">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div style={{
                height:44, background:'#F8FAFC', borderBottom:'1px solid #E2E8F0',
                display:'grid', gridTemplateColumns:'2fr 1.4fr 1.2fr 1fr 1.4fr 110px',
                alignItems:'center', padding:'0 16px',
                fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#64748B',
                textTransform:'uppercase', letterSpacing:0.6
              }}>
                <div>Employee</div><div>Dept</div><div>Status</div><div>Shift</div>
                <div>Last Seen</div><div style={{ textAlign:'right' }}>Contact</div>
              </div>
              <div className="inner-scroll" style={{ maxHeight: 520, overflowY:'auto' }}>
                {absentRows.map((r) => (
                  <div key={r.id} onClick={() => openPerson(r)} style={{
                    height:52, display:'grid',
                    gridTemplateColumns:'2fr 1.4fr 1.2fr 1fr 1.4fr 110px',
                    alignItems:'center', padding:'0 16px',
                    borderBottom:'1px solid #F1F5F9', cursor:'pointer'
                  }} onMouseEnter={(e) => e.currentTarget.style.background='#F8FAFC'}
                     onMouseLeave={(e) => e.currentTarget.style.background='#FFFFFF'}>
                    <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                      <Avatar role={r.role} initials={r.initials} size={32} />
                      <div>
                        <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{r.name}</div>
                        <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8' }}>{r.id}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily:'Poppins', fontSize:13, color:'#475569', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.dept}</div>
                    <div><StatusBadge status={r.status} /></div>
                    <div style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>{r.shift}</div>
                    <div style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>{r.lastSeen}</div>
                    <div style={{ textAlign:'right' }}>
                      <button onClick={(e) => { e.stopPropagation(); toast('Alert sent to ' + r.name); }} style={{
                        height:26, padding:'0 12px', borderRadius:6, border:'none',
                        background:'#FEF2F2', color:'#DC2626',
                        fontFamily:'Poppins', fontSize:11, fontWeight:600, cursor:'pointer',
                        display:'inline-flex', alignItems:'center', gap:5
                      }} title="Send alert">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                        Send Alert
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* RIGHT col */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
              <div>
                <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>Late Trend</div>
                <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>This week</div>
              </div>
              <span style={{
                background:'#FEF3C7', color:'#D97706', fontFamily:'Poppins', fontSize:11, fontWeight:600,
                borderRadius:9999, padding:'2px 8px'
              }}>Avg 34/day</span>
            </div>
            <TrendBars data={WEEKLY_TREND} valueKey="late" color="#D97706" max={51} />
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:12 }}>
              <span style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8' }}>Highest: Thu · 51 late</span>
              <span style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8' }}>Avg: 34 per day</span>
            </div>
          </div>

          <div style={{ background:'#FFFFFF', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
              <div>
                <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>By Department</div>
                <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>{deptToggle === 'late' ? 'Late arrivals today' : 'Absent today'}</div>
              </div>
              <div style={{ display:'flex', gap:4 }}>
                {[{v:'late', l:'Late'}, {v:'absent', l:'Absent'}].map((o) => {
                  const active = deptToggle === o.v;
                  return (
                    <button key={o.v} onClick={() => setDeptToggle(o.v)} style={{
                      height:26, padding:'0 10px', borderRadius:9999, border:'none',
                      background: active ? (o.v === 'late' ? '#FEF3C7' : '#FEF2F2') : '#F1F5F9',
                      color: active ? (o.v === 'late' ? '#D97706' : '#DC2626') : '#94A3B8',
                      fontFamily:'Poppins', fontSize:11, fontWeight:600, cursor:'pointer'
                    }}>{o.l}</button>
                  );
                })}
              </div>
            </div>
            {deptData.map((d) => (
              <HBar key={d.dept} label={d.dept} count={d.count} total={deptTotal} color={deptColor} leftWidth={120} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AttendanceScreen, LeavesScreen, LateAbsentScreen });
