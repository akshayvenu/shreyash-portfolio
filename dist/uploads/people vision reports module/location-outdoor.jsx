// Location Report + Outdoor & Travel screens

const attendanceColor = (pct) => pct >= 80 ? '#16A34A' : pct >= 60 ? '#D97706' : '#DC2626';
const attendanceLightBg = (pct) => pct >= 80 ? '#DCFCE7' : pct >= 60 ? '#FEF3C7' : '#FEF2F2';

// ───────────────────────── shared bits ─────────────────────────

const LO_PillToggle = ({ options, value, onChange }) => (
  <div style={{ display:'flex', gap:6 }}>
    {options.map(o => {
      const active = o.value === value;
      return (
        <button key={o.value} onClick={() => onChange(o.value)}
          style={{
            height:36, padding:'0 16px', borderRadius:9999,
            cursor:'pointer', fontFamily:'Poppins', fontSize:13, fontWeight:600,
            background: active ? '#BD1313' : '#fff',
            color: active ? '#fff' : '#475569',
            border: active ? '1px solid #BD1313' : '1px solid #E2E8F0',
            transition:'all 0.18s ease',
            boxShadow: active ? '0 2px 8px rgba(189,19,19,0.20)' : 'none'
          }}>
          {o.label}
        </button>
      );
    })}
  </div>
);

const LO_SummaryCard = ({ icon, label, value }) => (
  <div style={{
    background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
    padding:'16px 20px', display:'flex', alignItems:'center', gap:14,
    boxShadow:'0 1px 4px rgba(15,23,42,0.06)'
  }}>
    <img src={`https://img.icons8.com/pulsar-color/48/${icon}.png`} width="32" height="32" alt="" />
    <div>
      <div style={{ fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#94A3B8',
        textTransform:'uppercase', letterSpacing:'0.6px' }}>{label}</div>
      <div style={{ fontFamily:'Poppins', fontSize:24, fontWeight:700, color:'#0F172A', lineHeight:1.1, marginTop:2 }}>
        {value.toLocaleString()}
      </div>
    </div>
  </div>
);

// ───────────────────────── LOCATION REPORT ─────────────────────

const LocationRestricted = ({ setCurrentRole, toast }) => (
  <div className="screen-enter" style={{ padding:24, fontFamily:'Poppins' }}>
    <div style={{
      background:'#fff', border:'1px solid #E2E8F0', borderRadius:16,
      padding:'60px 40px', textAlign:'center', marginTop:20,
      boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
    }}>
      <div style={{
        width:72, height:72, borderRadius:18, background:'#FDF2F2',
        display:'inline-flex', alignItems:'center', justifyContent:'center'
      }}>
        <Lock size={32} color="#BD1313" />
      </div>
      <div style={{ fontFamily:'Poppins', fontSize:20, fontWeight:700, color:'#0F172A', marginTop:16 }}>
        Location Report — Super Admin Only
      </div>
      <div style={{ fontFamily:'Poppins', fontSize:14, color:'#64748B',
        marginTop:8, maxWidth:440, margin:'8px auto 0', lineHeight:1.55 }}>
        This report is restricted to Super Admin access only. Switch to Super Admin
        view to see branch, state, and country-level workforce data.
      </div>
      <button onClick={() => { setCurrentRole('superadmin'); toast('Switched to Super Admin view'); }}
        style={{
          marginTop:24, background:'#BD1313', color:'#fff', border:'none',
          fontFamily:'Poppins', fontSize:13, fontWeight:600,
          borderRadius:8, padding:'10px 24px', cursor:'pointer',
          boxShadow:'0 2px 8px rgba(189,19,19,0.25)'
        }}>
        Switch to Super Admin
      </button>
    </div>
  </div>
);

const BranchCardLO = ({ b, onClick }) => {
  const [hover, setHover] = React.useState(false);
  const pct = Math.round((b.present / b.total) * 100);
  const c = attendanceColor(pct);
  const lightBg = attendanceLightBg(pct);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background:'#fff', border:'1px solid '+(hover ? '#CBD5E1' : '#E2E8F0'),
        borderRadius:16, padding:20, cursor:'pointer',
        position:'relative', overflow:'hidden',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover
          ? '0 4px 16px rgba(15,23,42,0.10)'
          : '0 1px 4px rgba(15,23,42,0.06)',
        transition:'all 0.2s ease'
      }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:c }}></div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
        <div>
          <div style={{ fontFamily:'Poppins', fontSize:15, fontWeight:700, color:'#0F172A' }}>{b.branch}</div>
          <div style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B', marginTop:2 }}>
            {b.city}, {b.state}
          </div>
        </div>
        <div style={{
          background:lightBg, color:c, fontFamily:'Poppins', fontSize:13, fontWeight:700,
          borderRadius:9999, padding:'4px 10px'
        }}>{pct}%</div>
      </div>

      <div style={{ height:1, background:'#F1F5F9', marginBottom:14 }}></div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        <Cell label="TOTAL"   value={b.total}   color="#0F172A" />
        <Cell label="PRESENT" value={b.present} color="#16A34A" />
        <Cell label="ON LEAVE" value={b.onLeave} color="#7C3AED" />
        <Cell label="NOT IN"  value={b.notIn}   color="#DC2626" />
      </div>

      <div style={{ marginTop:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
          <span style={{ fontFamily:'Poppins', fontSize:11, color:'#64748B' }}>Attendance Rate</span>
          <span style={{ fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#0F172A' }}>{pct}%</span>
        </div>
        <div style={{ height:6, background:'#F1F5F9', borderRadius:9999, overflow:'hidden' }}>
          <div style={{ width:pct+'%', height:'100%', background:c, borderRadius:9999 }}></div>
        </div>
      </div>

      <div style={{
        display:'flex', gap:8, marginTop:12, paddingTop:12,
        borderTop:'1px solid #F8FAFC'
      }}>
        <Chip bg="#ECFEFF" color="#0891B2">{b.outdoor} Outdoor</Chip>
        <Chip bg="#DCFCE7" color="#16A34A">{b.wfh} WFH</Chip>
      </div>
    </div>
  );
};

const Cell = ({ label, value, color }) => (
  <div style={{ background:'#F8FAFC', borderRadius:8, padding:'8px 10px' }}>
    <div style={{ fontFamily:'Poppins', fontSize:10, fontWeight:600, color:'#94A3B8',
      textTransform:'uppercase', letterSpacing:'0.6px' }}>{label}</div>
    <div style={{ fontFamily:'Poppins', fontSize:16, fontWeight:700, color, marginTop:2 }}>{value}</div>
  </div>
);

const Chip = ({ bg, color, children }) => (
  <span style={{
    background:bg, color, fontFamily:'Poppins', fontSize:10, fontWeight:600,
    borderRadius:6, padding:'3px 8px'
  }}>{children}</span>
);

const StateCardLO = ({ s, toast }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => toast(`Drilling into ${s.state}`)}
      style={{
        background:'#fff', border:'1px solid '+(hover ? '#CBD5E1' : '#E2E8F0'),
        borderRadius:16, padding:24, cursor:'pointer',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover
          ? '0 4px 16px rgba(15,23,42,0.10)'
          : '0 1px 4px rgba(15,23,42,0.06)',
        transition:'all 0.2s ease'
      }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ fontFamily:'Poppins', fontSize:16, fontWeight:700, color:'#0F172A' }}>{s.state}</div>
          <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>{s.country}</div>
        </div>
        <div style={{
          background:'#EFF6FF', color:'#2563EB', fontFamily:'Poppins',
          fontSize:11, fontWeight:600, borderRadius:9999, padding:'3px 10px'
        }}>{s.branchCount} branch{s.branchCount > 1 ? 'es' : ''}</div>
      </div>

      <div style={{ display:'flex', gap:24, marginTop:16, marginBottom:16 }}>
        <BigStat value={s.total} label="employees" color="#0F172A" />
        <BigStat value={s.present} label="present" color="#16A34A" />
        <BigStat value={s.onLeave} label="on leave" color="#7C3AED" />
      </div>

      <div style={{ paddingTop:12, borderTop:'1px solid #F1F5F9' }}>
        <div style={{ fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#94A3B8',
          textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:8 }}>
          Branches in this state
        </div>
        {s.branches.map(br => (
          <div key={br.branch} style={{
            display:'flex', justifyContent:'space-between',
            padding:'6px 0', alignItems:'center'
          }}>
            <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:500, color:'#0F172A' }}>{br.branch}</span>
            <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#16A34A' }}>{br.present} present</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BigStat = ({ value, label, color }) => (
  <div>
    <div style={{ fontFamily:'Poppins', fontSize:22, fontWeight:700, color, lineHeight:1 }}>{value}</div>
    <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:2 }}>{label}</div>
  </div>
);

const CountryView = () => {
  const c = COUNTRY;
  const overallPct = ((c.present / c.total) * 100).toFixed(1);

  return (
    <div style={{ maxWidth:780, margin:'0 auto' }}>
      <div style={{
        background:'#fff', border:'1px solid #E2E8F0', borderRadius:16,
        padding:32, boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
      }}>
        <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:24 }}>
          <div style={{ fontSize:48, lineHeight:1 }}>{c.flag}</div>
          <div>
            <div style={{ fontFamily:'Poppins', fontSize:24, fontWeight:700, color:'#0F172A', lineHeight:1.1 }}>{c.name}</div>
            <div style={{ fontFamily:'Poppins', fontSize:13, color:'#94A3B8', marginTop:2 }}>{c.region}</div>
            <div style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B', marginTop:4 }}>
              {c.branches} branches · {c.states} states · {c.cities} cities
            </div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:24 }}>
          <CountryStat label="Total Employees" value={c.total} color="#0F172A" />
          <CountryStat label="Present Today" value={c.present} color="#16A34A" />
          <CountryStat label="On Leave" value={c.onLeave} color="#7C3AED" />
          <CountryStat label="Not In" value={c.notIn} color="#DC2626" />
        </div>

        {/* state breakdown table */}
        <div style={{ border:'1px solid #E2E8F0', borderRadius:12, overflow:'hidden' }}>
          <div style={{
            display:'grid', gridTemplateColumns:'1.4fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr',
            background:'#F8FAFC', padding:'10px 16px',
            fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#94A3B8',
            textTransform:'uppercase', letterSpacing:'0.6px',
            borderBottom:'1px solid #E2E8F0'
          }}>
            <div>State</div><div>Branches</div><div>Total</div>
            <div>Present</div><div>On Leave</div><div style={{ textAlign:'right' }}>Attendance</div>
          </div>
          {STATES.map((s, i) => {
            const pct = Math.round((s.present / s.total) * 100);
            const ac = attendanceColor(pct);
            const ab = attendanceLightBg(pct);
            return (
              <div key={s.state} style={{
                display:'grid', gridTemplateColumns:'1.4fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr',
                padding:'12px 16px', alignItems:'center',
                background: i % 2 === 0 ? '#fff' : '#FAFAFA',
                fontFamily:'Poppins', fontSize:13, color:'#0F172A',
                borderBottom: i < STATES.length-1 ? '1px solid #F1F5F9' : 'none'
              }}>
                <div style={{ fontWeight:600 }}>{s.state}</div>
                <div>{s.branchCount}</div>
                <div>{s.total}</div>
                <div style={{ color:'#16A34A', fontWeight:600 }}>{s.present}</div>
                <div style={{ color:'#7C3AED', fontWeight:600 }}>{s.onLeave}</div>
                <div style={{ textAlign:'right' }}>
                  <span style={{
                    background:ab, color:ac, fontFamily:'Poppins', fontSize:12, fontWeight:700,
                    borderRadius:9999, padding:'3px 10px'
                  }}>{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop:24, paddingTop:24, borderTop:'1px solid #F1F5F9' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div>
              <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>
                Overall Company Attendance
              </div>
              <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>
                {c.present} of {c.total.toLocaleString()} employees present
              </div>
            </div>
            <div style={{ fontFamily:'Poppins', fontSize:18, fontWeight:700, color:'#BD1313' }}>{overallPct}%</div>
          </div>
          <div style={{ height:10, background:'#F1F5F9', borderRadius:9999, marginTop:10, overflow:'hidden' }}>
            <div style={{
              width:overallPct+'%', height:'100%',
              background:'linear-gradient(90deg, #BD1313, #991010)',
              borderRadius:9999
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CountryStat = ({ label, value, color }) => (
  <div style={{ background:'#F8FAFC', borderRadius:10, padding:12 }}>
    <div style={{ fontFamily:'Poppins', fontSize:10, fontWeight:600, color:'#94A3B8',
      textTransform:'uppercase', letterSpacing:'0.6px' }}>{label}</div>
    <div style={{ fontFamily:'Poppins', fontSize:20, fontWeight:700, color, marginTop:4 }}>
      {value.toLocaleString()}
    </div>
  </div>
);

const LocationScreen = ({ currentRole, setCurrentRole, locationView, setLocationView, toast }) => {
  if (currentRole !== 'superadmin') {
    return <LocationRestricted setCurrentRole={setCurrentRole} toast={toast} />;
  }

  return (
    <div className="screen-enter" style={{ padding:24, fontFamily:'Poppins' }}>

      {/* View toggle + last updated */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <LO_PillToggle
          value={locationView}
          onChange={setLocationView}
          options={[
            { value:'branch',  label:'Branch View'  },
            { value:'state',   label:'State View'   },
            { value:'country', label:'Country View' },
          ]}
        />
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{
            width:8, height:8, borderRadius:'50%', background:'#16A34A',
            animation:'livePulse 1.6s ease-out infinite'
          }}></span>
          <span style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8' }}>Last updated: 09:42 AM</span>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:20 }}>
        <LO_SummaryCard icon="location"     label="Total Branches"  value={5} />
        <LO_SummaryCard icon="groups"       label="Total Employees" value={847} />
        <LO_SummaryCard icon="organization" label="States Covered"  value={4} />
        <LO_SummaryCard icon="dashboard"    label="Countries"       value={1} />
      </div>

      {/* View content */}
      {locationView === 'branch' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
          {BRANCHES.map(b => (
            <BranchCardLO key={b.branch} b={b}
              onClick={() => toast(`Branch detail for ${b.branch} coming soon`)} />
          ))}
        </div>
      )}

      {locationView === 'state' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:16 }}>
          {STATES.map(s => <StateCardLO key={s.state} s={s} toast={toast} />)}
        </div>
      )}

      {locationView === 'country' && <CountryView />}
    </div>
  );
};

// ───────────────────────── OUTDOOR & TRAVEL ─────────────────────

const OutdoorPersonRow = ({ p, last, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding:'14px 20px',
        borderBottom: last ? 'none' : '1px solid #F1F5F9',
        display:'flex', gap:12, alignItems:'center', cursor:'pointer',
        background: hover ? '#F8FAFC' : '#fff',
        transition:'background 0.15s ease'
      }}>
      <Avatar role={p.role} initials={p.initials} size={40} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{p.name}</div>
        <div style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B', marginTop:2 }}>
          {p.designation} · {p.dept}
        </div>
      </div>
      <div style={{ minWidth:140 }}>
        <div style={{ fontFamily:'Poppins', fontSize:12, fontWeight:500, color:'#475569' }}>{p.purpose}</div>
        <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:2 }}>{p.destination}</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
        <StatusBadge status={p.status} />
        <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8' }}>{p.date}</div>
      </div>
    </div>
  );
};

const StatusBreakdownBar = ({ label, count, total, color }) => {
  const pct = (count / total) * 100;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
      <span style={{ width:10, height:10, borderRadius:'50%', background:color, flexShrink:0 }}></span>
      <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:500, color:'#475569', minWidth:130 }}>{label}</span>
      <div style={{ flex:1, height:6, background:'#F1F5F9', borderRadius:9999, overflow:'hidden' }}>
        <div style={{ width:pct+'%', height:'100%', background:color, borderRadius:9999 }}></div>
      </div>
      <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:700, color:'#0F172A', minWidth:24, textAlign:'right' }}>{count}</span>
    </div>
  );
};

const ReturnItem = ({ r, last }) => (
  <div style={{
    display:'flex', gap:10, alignItems:'center', padding:'10px 0',
    borderBottom: last ? 'none' : '1px solid #F8FAFC'
  }}>
    <Avatar role={r.role} initials={r.initials} size={32} />
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#0F172A' }}>{r.name}</div>
      <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:1 }}>{r.type}</div>
    </div>
    <span style={{
      background: r.today ? '#DCFCE7' : '#F1F5F9',
      color: r.today ? '#16A34A' : '#475569',
      fontFamily:'Poppins', fontSize:11, fontWeight:600,
      borderRadius:6, padding:'3px 8px'
    }}>{r.date}</span>
  </div>
);

const OutdoorScreen = ({ outdoorFilter, setOutdoorFilter, search, setSearch, openPerson, toast }) => {
  const filtered = OUTDOOR_PEOPLE.filter(p => {
    if (outdoorFilter !== 'all' && p.status !== outdoorFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalOutside = SUMMARY.outdoor + SUMMARY.wfh + SUMMARY.travelling + SUMMARY.atEvent;
  const todayReturning = RETURNING_SOON.filter(r => r.today).length;

  const summaryCards = [
    { key:'outdoor',    value:38, label:'Outdoor',         icon:'tent',                 strip:'#0891B2', trend:'up',   delta:'2%' },
    { key:'wfh',        value:67, label:'Work From Home',  icon:'home-office',          strip:'#16A34A', trend:'up',   delta:'5%' },
    { key:'travelling', value:14, label:'Travelling',      icon:'airplane-mode-on',     strip:'#D97706', trend:'flat', delta:'0%' },
    { key:'atEvent',    value:11, label:'At Event',        icon:'calendar',             strip:'#7C3AED', trend:'flat', delta:'0%' },
  ];

  return (
    <div className="screen-enter" style={{ padding:24, fontFamily:'Poppins' }}>

      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:20 }}>
        {summaryCards.map(c => (
          <StatCard key={c.key} card={c}
            onClick={() => { setOutdoorFilter(c.key); toast(`Filtered by ${c.label}`); }} />
        ))}
      </div>

      {/* Filter bar */}
      <div style={{
        height:52, background:'#fff', border:'1px solid #E2E8F0',
        borderRadius:12, padding:'0 16px', display:'flex', alignItems:'center',
        gap:12, marginBottom:20,
        boxShadow:'0 1px 4px rgba(15,23,42,0.06)'
      }}>
        <div style={{ display:'flex', gap:6 }}>
          {[
            { value:'all',        label:'All' },
            { value:'outdoor',    label:'Outdoor' },
            { value:'wfh',        label:'WFH' },
            { value:'travelling', label:'Travelling' },
            { value:'atEvent',    label:'At Event' },
          ].map(f => {
            const active = outdoorFilter === f.value;
            return (
              <button key={f.value} onClick={() => setOutdoorFilter(f.value)}
                style={{
                  height:30, padding:'0 14px', borderRadius:9999, cursor:'pointer',
                  fontFamily:'Poppins', fontSize:12, fontWeight:600,
                  background: active ? '#BD1313' : '#F1F5F9',
                  color: active ? '#fff' : '#475569',
                  border:'none',
                  transition:'all 0.15s ease',
                  boxShadow: active ? '0 2px 6px rgba(189,19,19,0.20)' : 'none'
                }}>
                {f.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
          <div style={{ position:'relative' }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              style={{
                height:36, width:220, border:'1px solid #E2E8F0',
                borderRadius:8, padding:'0 12px 0 34px', fontFamily:'Poppins',
                fontSize:13, background:'#F8FAFC', color:'#0F172A', outline:'none'
              }} />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position:'absolute', left:11, top:11 }}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <button onClick={() => toast('Exporting outdoor report...')}
            style={{
              height:36, background:'#fff', border:'1px solid #E2E8F0',
              borderRadius:8, padding:'0 14px', cursor:'pointer',
              display:'flex', alignItems:'center', gap:6,
              fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#475569'
            }}>
            <Download size={14} color="#475569" />
            Export
          </button>
        </div>
      </div>

      {/* Two-column */}
      <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16 }}>

        {/* List */}
        <div style={{
          background:'#fff', border:'1px solid #E2E8F0', borderRadius:16,
          overflow:'hidden',
          boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
        }}>
          <div style={{
            padding:'16px 20px', borderBottom:'1px solid #E2E8F0',
            display:'flex', justifyContent:'space-between', alignItems:'center'
          }}>
            <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>
              People Outside Office
            </div>
            <span style={{
              background:'#FEF3C7', color:'#D97706',
              fontFamily:'Poppins', fontSize:12, fontWeight:600,
              borderRadius:9999, padding:'3px 10px'
            }}>
              {filtered.length} {filtered.length === 1 ? 'person' : 'people'}
            </span>
          </div>

          {filtered.length > 0 ? (
            filtered.map((p, i) => (
              <OutdoorPersonRow key={p.id} p={p} last={i === filtered.length - 1}
                onClick={() => { openPerson(p); toast(`Opening ${p.name}'s profile`); }} />
            ))
          ) : (
            <div style={{ padding:'48px 20px', textAlign:'center' }}>
              <div style={{
                width:48, height:48, borderRadius:12, background:'#F8FAFC',
                display:'inline-flex', alignItems:'center', justifyContent:'center'
              }}>
                <Users size={20} color="#94A3B8" />
              </div>
              <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#475569', marginTop:10 }}>
                No matches
              </div>
              <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:4 }}>
                Try a different filter or search term
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Status breakdown */}
          <div style={{
            background:'#fff', border:'1px solid #E2E8F0', borderRadius:16,
            padding:20,
            boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
          }}>
            <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A', marginBottom:16 }}>
              Status Breakdown
            </div>
            <StatusBreakdownBar label="Work From Home" count={67} total={totalOutside} color="#16A34A" />
            <StatusBreakdownBar label="Outdoor"        count={38} total={totalOutside} color="#0891B2" />
            <StatusBreakdownBar label="Travelling"     count={14} total={totalOutside} color="#D97706" />
            <StatusBreakdownBar label="At Event"       count={11} total={totalOutside} color="#7C3AED" />
            <div style={{
              display:'flex', justifyContent:'space-between',
              marginTop:8, paddingTop:12, borderTop:'1px solid #F1F5F9'
            }}>
              <span style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>Total outside office</span>
              <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:700, color:'#0F172A' }}>
                {totalOutside} people
              </span>
            </div>
          </div>

          {/* Returning soon */}
          <div style={{
            background:'#fff', border:'1px solid #E2E8F0', borderRadius:16,
            padding:20,
            boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
          }}>
            <div style={{
              display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14
            }}>
              <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>
                Returning Soon
              </div>
              <span style={{
                background:'#EFF6FF', color:'#2563EB',
                fontFamily:'Poppins', fontSize:11, fontWeight:600,
                borderRadius:9999, padding:'3px 10px'
              }}>This week</span>
            </div>

            {RETURNING_SOON.map((r, i) => (
              <ReturnItem key={r.id} r={r} last={i === RETURNING_SOON.length - 1} />
            ))}

            <div style={{
              marginTop:12, background:'#DCFCE7', borderRadius:10,
              padding:'10px 14px', display:'flex', gap:8, alignItems:'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
              <span style={{ fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#16A34A' }}>
                {todayReturning} {todayReturning === 1 ? 'person' : 'people'} returning today
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LocationScreen, OutdoorScreen });
