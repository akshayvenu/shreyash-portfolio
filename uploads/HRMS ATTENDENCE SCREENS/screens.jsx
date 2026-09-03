// Today's Report screen + Detail Panel + Toast

const TodayScreen = ({ currentRole, openPerson, toast }) => {
  return (
    <div className="screen-enter" style={{ padding:24, fontFamily:'Poppins' }}>

      {/* HEADER */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
        <div>
          <h1 style={{
            fontFamily:'Poppins', fontSize:22, fontWeight:700,
            color:'#0F172A', margin:0, lineHeight:1.1
          }}>Today's Workforce Snapshot</h1>
          <div style={{ fontFamily:'Poppins', fontSize:13, color:'#64748B', marginTop:4 }}>
            Real-time view across all branches · {SUMMARY.totalEmployees.toLocaleString()} employees
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{
            width:8, height:8, borderRadius:'50%', background:'#16A34A',
            animation:'livePulse 1.6s ease-out infinite'
          }}></span>
          <span style={{ fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#16A34A',
            textTransform:'uppercase', letterSpacing:'0.6px' }}>Live · Updated 12s ago</span>
        </div>
      </div>

      {/* ROW 1 — STAT CARDS */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(5, 1fr)',
        gap:12, marginBottom:20
      }}>
        {STAT_CARDS.map(c => (
          <StatCard key={c.key} card={c} onClick={() => toast(`Showing ${c.label} breakdown`)} />
        ))}
      </div>

      {/* ROW 2 — Branch Overview + Workforce Status */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>

        {/* Branch overview */}
        <div style={{
          background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
          padding:20, boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>Branch Overview</div>
              <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>Today's attendance by branch</div>
            </div>
            <img src="https://img.icons8.com/pulsar-color/48/location.png" width="24" height="24" alt="" />
          </div>

          {BRANCHES.map(b => <BranchRow key={b.branch} row={b} />)}

          <div style={{
            marginTop:8, paddingTop:12, borderTop:'1px solid #F1F5F9',
            display:'flex', justifyContent:'space-between', alignItems:'center'
          }}>
            <span style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8',
              textTransform:'uppercase', letterSpacing:'0.6px', fontWeight:600 }}>Total Present</span>
            <span style={{ fontFamily:'Poppins', fontSize:14, fontWeight:700, color:'#BD1313' }}>
              634 / 847 (75%)
            </span>
          </div>
        </div>

        {/* Workforce status */}
        <div style={{
          background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
          padding:20, boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>Workforce Status</div>
              <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:2 }}>Real-time distribution across statuses</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{
                width:8, height:8, borderRadius:'50%', background:'#16A34A',
                animation:'livePulse 1.6s ease-out infinite'
              }}></span>
              <span style={{ fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#16A34A' }}>Live</span>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {STATUS_TILES.map(t => <StatusTile key={t.key} tile={t} />)}
          </div>
        </div>
      </div>

      {/* ROW 3 — Admin Overview + Upcoming Leaves */}
      <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16, marginBottom:20 }}>

        {/* Admin overview */}
        <div style={{
          background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
          padding:20, boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>Admin Overview</div>
              <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:2 }}>Click any admin to drill down into their tree</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <img src="https://img.icons8.com/pulsar-color/48/organization.png" width="24" height="24" alt="" />
              <span style={{ fontFamily:'Poppins', fontSize:12, fontWeight:600, color:'#475569' }}>5 Admins</span>
            </div>
          </div>

          {currentRole === 'superadmin' ? (
            <div>
              {ADMINS.map(a => (
                <PersonCard key={a.id} person={a}
                  onClick={() => { openPerson(a); toast(`Opening ${a.name}'s profile`); }} />
              ))}
            </div>
          ) : (
            <div style={{
              padding:'40px 20px', textAlign:'center',
              background:'#F8FAFC', borderRadius:10, border:'1px dashed #E2E8F0'
            }}>
              <Lock size={28} color="#94A3B8" />
              <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#475569', marginTop:10 }}>
                Access restricted
              </div>
              <div style={{ fontFamily:'Poppins', fontSize:12, color:'#94A3B8', marginTop:4 }}>
                Admin overview is visible to Super Admins only
              </div>
            </div>
          )}
        </div>

        {/* Upcoming leaves */}
        <div style={{
          background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
          padding:20, boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
            <div>
              <div style={{ fontFamily:'Poppins', fontSize:14, fontWeight:600, color:'#0F172A' }}>Upcoming Leaves</div>
              <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:2 }}>Approved & pending in the next 14 days</div>
            </div>
            <img src="https://img.icons8.com/pulsar-color/48/leave.png" width="24" height="24" alt="" />
          </div>

          {LEAVES.map((l, i) => <LeaveItem key={l.id} leave={l} last={i === LEAVES.length - 1} />)}

          <button onClick={() => toast('Opening full leave report')}
            style={{
              width:'100%', marginTop:14, height:36,
              background:'#F8FAFC', border:'1px solid #E2E8F0',
              borderRadius:8, cursor:'pointer',
              fontFamily:'Poppins', fontSize:12, fontWeight:600, color:'#475569'
            }}>View all leaves →</button>
        </div>
      </div>
    </div>
  );
};

// ---------- Generic placeholder for other screens ----------
const PlaceholderScreen = ({ screen }) => (
  <div className="screen-enter" style={{ padding:24, fontFamily:'Poppins' }}>
    <div style={{
      background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
      padding:'60px 40px', textAlign:'center',
      boxShadow:'0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)'
    }}>
      <div style={{
        width:64, height:64, borderRadius:16,
        background:'#FDF2F2', color:'#BD1313',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
        marginBottom:16
      }}>
        <ClipboardList size={28} color="#BD1313" />
      </div>
      <h2 style={{
        fontFamily:'Poppins', fontSize:20, fontWeight:700, color:'#0F172A', margin:0
      }}>{SCREEN_TITLES[screen]}</h2>
      <p style={{
        fontFamily:'Poppins', fontSize:13, color:'#64748B',
        marginTop:8, maxWidth:420, margin:'8px auto 0'
      }}>
        This screen will be built in Step 2. Today's Report is fully functional —
        try clicking any admin card to see the detail panel slide in.
      </p>
    </div>
  </div>
);

// ---------- Detail Panel ----------
const DetailPanel = ({ person, onClose, toast }) => {
  if (!person) return null;
  const r = getRoleStyle(person.role);
  return (
    <div style={{
      position:'fixed', top:56, right:0,
      width:420, height:'calc(100vh - 56px)',
      background:'#fff', borderLeft:'1px solid #E2E8F0',
      boxShadow:'-8px 0 32px rgba(15,23,42,0.12)',
      zIndex:200, display:'flex', flexDirection:'column',
      overflow:'hidden', fontFamily:'Poppins',
      animation:'slideInRight 280ms ease-out'
    }}>
      {/* Header */}
      <div style={{ padding:20, borderBottom:'1px solid #E2E8F0', position:'relative' }}>
        <button onClick={onClose}
          style={{
            position:'absolute', top:16, right:16,
            width:28, height:28, borderRadius:'50%',
            background:'#F1F5F9', border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:0
          }}>
          <X size={14} color="#475569" />
        </button>

        <Avatar role={person.role} initials={person.initials} size={64} />
        <div style={{ fontFamily:'Poppins', fontSize:18, fontWeight:700, color:'#0F172A', marginTop:12 }}>
          {person.name}
        </div>
        <div style={{ fontFamily:'Poppins', fontSize:13, color:'#64748B', marginTop:2 }}>
          {r.label} · {person.dept}
        </div>
        <div style={{ marginTop:10 }}>
          <StatusBadge status={person.status} large />
        </div>
      </div>

      {/* Body */}
      <div className="inner-scroll" style={{ flex:1, overflowY:'auto', padding:20 }}>

        <SectionTitle>Attendance Info</SectionTitle>
        <InfoRow label="Check In"  value={person.checkIn || '—'} />
        <InfoRow label="Check Out" value={person.checkOut || '—'} />
        <InfoRow label="Shift"     value={person.shift} />
        <InfoRow label="Branch"    value={person.branch} />
        <InfoRow label="Department" value={person.dept} />
        <InfoRow label="Employee ID" value={person.id} mono />

        <SectionTitle style={{ marginTop:24 }}>Team Summary</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:8 }}>
          <SmallStat label="Managers" value={person.managersCount} accent="#7C3AED" />
          <SmallStat label="Employees" value={person.employeesCount} accent="#16A34A" />
        </div>

        <SectionTitle style={{ marginTop:24 }}>Recent Activity</SectionTitle>
        <Timeline items={[
          { time:'09:02 AM', text:'Checked in at Mumbai HQ', type:'in' },
          { time:'09:18 AM', text:'Approved 2 leave requests', type:'action' },
          { time:'10:42 AM', text:'Joined daily standup meeting', type:'event' },
        ]} />
      </div>

      {/* Footer */}
      <div style={{ padding:16, borderTop:'1px solid #E2E8F0', display:'flex', gap:8 }}>
        <button onClick={() => toast('Drilling into ' + person.name + "'s team")}
          style={{
            flex:1, height:40,
            background:'#fff', border:'1px solid #E2E8F0', borderRadius:8,
            cursor:'pointer', fontFamily:'Poppins', fontSize:13, fontWeight:600, color:'#475569'
          }}>View Team</button>
        <button onClick={() => toast('Full profile coming in Step 2')}
          style={{
            flex:1, height:40,
            background:'#BD1313', border:'none', borderRadius:8,
            cursor:'pointer', color:'#fff',
            fontFamily:'Poppins', fontSize:13, fontWeight:600,
            boxShadow:'0 2px 8px rgba(189,19,19,0.25)'
          }}>View Full Profile</button>
      </div>
    </div>
  );
};

const SectionTitle = ({ children, style }) => (
  <div style={{
    fontFamily:'Poppins', fontSize:11, fontWeight:600, color:'#94A3B8',
    textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:8,
    ...style
  }}>{children}</div>
);

const InfoRow = ({ label, value, mono }) => (
  <div style={{
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'10px 0', borderBottom:'1px solid #F8FAFC'
  }}>
    <span style={{ fontFamily:'Poppins', fontSize:12, color:'#64748B' }}>{label}</span>
    <span style={{
      fontFamily: mono ? '"SF Mono", Menlo, monospace' : 'Poppins',
      fontSize: mono ? 12 : 13,
      fontWeight: 600, color:'#0F172A'
    }}>{value}</span>
  </div>
);

const SmallStat = ({ label, value, accent }) => (
  <div style={{
    border:'1px solid #E2E8F0', borderRadius:10,
    padding:'12px 14px', background:'#F8FAFC'
  }}>
    <div style={{ fontFamily:'Poppins', fontSize:22, fontWeight:700, color: accent, lineHeight:1 }}>{value}</div>
    <div style={{
      fontFamily:'Poppins', fontSize:10, fontWeight:600, color:'#94A3B8',
      textTransform:'uppercase', letterSpacing:'0.6px', marginTop:6
    }}>{label}</div>
  </div>
);

const Timeline = ({ items }) => (
  <div style={{ marginTop:8, position:'relative' }}>
    {items.map((it, i) => (
      <div key={i} style={{
        display:'flex', gap:12, paddingBottom:14, position:'relative'
      }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{
            width:10, height:10, borderRadius:'50%',
            background:'#BD1313', border:'2px solid #FDF2F2',
            zIndex:1, marginTop:4
          }}></div>
          {i < items.length - 1 && (
            <div style={{ flex:1, width:1, background:'#E2E8F0', marginTop:2 }}></div>
          )}
        </div>
        <div style={{ flex:1, paddingBottom:i < items.length - 1 ? 4 : 0 }}>
          <div style={{ fontFamily:'Poppins', fontSize:13, fontWeight:500, color:'#0F172A' }}>{it.text}</div>
          <div style={{ fontFamily:'Poppins', fontSize:11, color:'#94A3B8', marginTop:2 }}>{it.time}</div>
        </div>
      </div>
    ))}
  </div>
);

// ---------- Toast ----------
const Toast = ({ message }) => (
  <div style={{
    position:'fixed', top:72, left:'50%', transform:'translateX(-50%)',
    background:'#0F172A', color:'#fff',
    fontFamily:'Poppins', fontSize:13, fontWeight:500,
    borderRadius:9999, padding:'10px 18px',
    boxShadow:'0 8px 24px rgba(15,23,42,0.20)',
    zIndex:9999,
    animation:'toastEnter 300ms ease-out'
  }}>{message}</div>
);

Object.assign(window, { TodayScreen, PlaceholderScreen, DetailPanel, Toast });
