The dashboard top sections are working perfectly.
Now complete the bottom half of the dashboard.

Replace the "Charts & Analytics Loading..." 
placeholder with the complete main content grid.

DO NOT rebuild anything above the placeholder.
ONLY replace the placeholder div with this content.

The placeholder is currently showing:
"📊 Charts & Analytics Loading..."
Replace ONLY that section with the following:

=============================================================
DASHBOARD MAIN CONTENT GRID
(Replace the placeholder section)
=============================================================

Add these imports at top of file if not already there:
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
  PieChart, Pie, Cell
} from 'recharts';

The main content grid goes below the stat cards row.
It fills ALL remaining height of the dashboard.

MAIN CONTENT WRAPPER:
  display: grid
  grid-template-columns: 1.2fr 0.9fr 0.9fr
  gap: 14px
  flex: 1
  overflow: hidden
  min-height: 0
  padding-bottom: 0

══ LEFT COLUMN (1.2fr) ══════════════════════════════════════

display: flex
flex-direction: column
gap: 12px
overflow: hidden
min-height: 0

── SCORE TREND CARD ─────────────────────────────────────────

Style:
  background: white
  border: 1px solid #E2E8F0
  border-radius: 20px
  padding: 16px 20px
  flex: 1.2
  overflow: hidden
  min-height: 0
  position: relative

Top border strip:
  position absolute, top 0, left 0, right 0
  height 3px, background #BD1313
  border-radius 20px 20px 0 0

HEADER ROW (display flex, justify space-between, align center):
  Left: "📊 Score Trend"
    font-family var(--font-display)
    font-size 15px, font-weight 700, color #0F172A

  Right: period selector pills
    const [period, setPeriod] = useState('7d')
    
    display flex, gap 4px
    ['7d','30d','All'].map(p => (
      <button
        onClick={() => setPeriod(p)}
        style={{
          background: period === p ? '#BD1313' : '#F1F5F9',
          color: period === p ? 'white' : '#94A3B8',
          border: 'none',
          borderRadius: 9999,
          padding: '4px 10px',
          fontSize: 11,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          transition: 'all 0.2s'
        }}>
        {p}
      </button>
    ))

RECHARTS (margin-top 12px):

const scoreAverage = [
  {test:"T1", score:62, average:74, date:"Mar 10"},
  {test:"T2", score:58, average:74, date:"Mar 11"},
  {test:"T3", score:71, average:74, date:"Mar 12"},
  {test:"T4", score:68, average:74, date:"Mar 13"},
  {test:"T5", score:74, average:74, date:"Mar 15"},
  {test:"T6", score:79, average:74, date:"Mar 17"},
  {test:"T7", score:74, average:74, date:"Mar 18"}
];

<ResponsiveContainer width="100%" height={140}>
  <AreaChart data={scoreAverage}
    margin={{top:5, right:5, bottom:0, left:-20}}>
    <defs>
      <linearGradient id="scoreGrad" x1="0" y1="0"
                      x2="0" y2="1">
        <stop offset="5%" stopColor="#BD1313"
              stopOpacity={0.15}/>
        <stop offset="95%" stopColor="#BD1313"
              stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="avgGrad" x1="0" y1="0"
                      x2="0" y2="1">
        <stop offset="5%" stopColor="#D97706"
              stopOpacity={0.08}/>
        <stop offset="95%" stopColor="#D97706"
              stopOpacity={0}/>
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3"
      stroke="#F8FAFF" vertical={false}/>
    <XAxis dataKey="test"
      tick={{fontSize:10, fill:'#94A3B8',
             fontFamily:'var(--font-body)'}}
      axisLine={false} tickLine={false}/>
    <YAxis domain={[40,100]}
      tick={{fontSize:10, fill:'#94A3B8',
             fontFamily:'var(--font-body)'}}
      axisLine={false} tickLine={false}/>
    <Tooltip
      contentStyle={{
        background:'#0F172A',
        border:'none',
        borderRadius:9999,
        padding:'6px 14px',
        fontFamily:'var(--font-body)'
      }}
      labelStyle={{color:'rgba(255,255,255,0.7)',
                  fontSize:10}}
      itemStyle={{color:'white', fontSize:12}}
    />
    <ReferenceLine y={74}
      stroke="#94A3B8"
      strokeDasharray="4 4"
      label={{
        value:'Avg 74%',
        position:'insideTopRight',
        fontSize:9,
        fill:'#94A3B8'
      }}/>
    <Area
      type="monotone"
      dataKey="score"
      stroke="#BD1313"
      strokeWidth={2.5}
      fill="url(#scoreGrad)"
      dot={{fill:'#BD1313', r:4, strokeWidth:0}}
      activeDot={{fill:'white', r:6,
                  stroke:'#BD1313', strokeWidth:2}}
      isAnimationActive={true}
      animationDuration={1200}
      animationEasing="ease-out"
    />
    <Area
      type="monotone"
      dataKey="average"
      stroke="#D97706"
      strokeWidth={1.5}
      fill="url(#avgGrad)"
      dot={false}
      strokeDasharray="5 5"
      isAnimationActive={true}
      animationDuration={1400}
    />
  </AreaChart>
</ResponsiveContainer>

MINI STATS ROW (below chart):
  display flex, gap 16px
  padding-top 8px, border-top 1px #F8FAFF
  margin-top 8px

  [
    {label:'Highest', value:'89%', color:'#16A34A'},
    {label:'Latest', value:'74%', color:'#BD1313'},
    {label:'Trend', value:'↑ Improving', color:'#16A34A'}
  ].map((s, i) => (
    <div style={{
      fontFamily:'var(--font-body)',
      fontSize:12
    }}>
      <span style={{color:'#94A3B8'}}>{s.label}: </span>
      <span style={{color:s.color, fontWeight:600}}>
        {s.value}
      </span>
    </div>
  ))

── TODAY'S TASKS CARD ───────────────────────────────────────

Style:
  background: white
  border: 1px solid #E2E8F0
  border-radius: 20px
  padding: 16px 20px
  flex: 1
  overflow: hidden
  min-height: 0
  position: relative

Top border: 3px #BD1313 (same as above)

HEADER ROW:
  Left: "📋 Today's Tasks" font-display 15px 700
  Right: badge showing completed/total
    background #FDF2F2, color #BD1313
    border 1px #F5BFBF, radius 9999px
    font-body 11px 600, padding 3px 10px
    "{completedCount}/{tasks.length}"

Progress bar (margin 8px 0):
  height 4px, background #F5BFBF, radius 9999px
  overflow hidden
  Fill div: width progressPercent%
    background #16A34A, height 100%
    transition width 400ms ease-out

TASK LIST:
  {tasks.map(task => (
    <div
      key={task.id}
      onClick={() => toggleTask(task.id)}
      style={{
        display:'flex', alignItems:'center',
        gap:10, padding:'8px 0',
        borderBottom:'1px solid #F8FAFF',
        cursor:'pointer',
        opacity: task.done ? 0.6 : 1,
        transition: 'opacity 200ms'
      }}>
      
      {/* Checkbox */}
      <div style={{
        width:18, height:18, borderRadius:5,
        flexShrink:0,
        background: task.done ? '#BD1313' : 'white',
        border: task.done
          ? '1.5px solid #BD1313'
          : '1.5px solid #CBD5E1',
        display:'flex', alignItems:'center',
        justifyContent:'center',
        transition:'all 200ms',
        fontSize:11, color:'white'
      }}>
        {task.done ? '✓' : ''}
      </div>
      
      {/* Text */}
      <div style={{flex:1, minWidth:0}}>
        <div style={{
          fontFamily:'var(--font-body)',
          fontSize:13, fontWeight:500,
          color: task.done ? '#94A3B8' : '#0F172A',
          textDecoration: task.done
            ? 'line-through' : 'none',
          overflow:'hidden',
          textOverflow:'ellipsis',
          whiteSpace:'nowrap'
        }}>{task.text}</div>
        <div style={{
          fontFamily:'var(--font-body)',
          fontSize:10, color:'#94A3B8',
          marginTop:1
        }}>⏱ ~{task.time}</div>
      </div>
      
      {/* Priority dot */}
      <div style={{
        width:8, height:8, borderRadius:'50%',
        flexShrink:0,
        background:
          task.priority==='high' ? '#DC2626'
          : task.priority==='medium' ? '#D97706'
          : '#16A34A'
      }}/>
    </div>
  ))}

══ CENTER COLUMN (0.9fr) ════════════════════════════════════

display: flex
flex-direction: column
gap: 12px
overflow: hidden
min-height: 0

── SUBJECT PERFORMANCE CARD ─────────────────────────────────

Style:
  background: white
  border: 1px solid #E2E8F0
  border-radius: 20px
  padding: 16px 20px
  flex: 1.2
  overflow: hidden
  position: relative

Top border: 3px #D97706

HEADER: "📚 Subject Performance"
  font-display 15px 700 #0F172A

TWO COLUMNS (margin-top 12px):
  display grid, grid-template-columns 1fr 1fr
  gap 12px, align-items center

  LEFT: PieChart donut

  const subjectData = [
    {subject:"Mathematics", short:"Mth", score:79},
    {subject:"English", short:"Eng", score:88},
    {subject:"Science", short:"Sci", score:65},
    {subject:"Aptitude", short:"Apt", score:52},
    {subject:"Programming", short:"Pro", score:71}
  ];
  const PIE_COLORS = [
    '#BD1313','#16A34A','#D97706',
    '#DC2626','#2563EB'
  ];

  <div style={{position:'relative', height:130}}>
    <ResponsiveContainer width="100%" height={130}>
      <PieChart>
        <Pie
          data={subjectData}
          dataKey="score"
          nameKey="subject"
          cx="50%" cy="50%"
          innerRadius={38}
          outerRadius={56}
          paddingAngle={3}
          isAnimationActive={true}
          animationDuration={1000}
          animationBegin={300}>
          {subjectData.map((entry, i) => (
            <Cell key={i} fill={PIE_COLORS[i]}/>
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background:'#0F172A', border:'none',
            borderRadius:8, padding:'6px 12px'
          }}
          itemStyle={{color:'white', fontSize:11,
                     fontFamily:'var(--font-body)'}}
        />
      </PieChart>
    </ResponsiveContainer>
    
    {/* Center label */}
    <div style={{
      position:'absolute',
      top:'50%', left:'50%',
      transform:'translate(-50%,-50%)',
      textAlign:'center',
      pointerEvents:'none'
    }}>
      <div style={{
        fontFamily:'var(--font-body)',
        fontSize:9, color:'#94A3B8',
        textTransform:'uppercase'
      }}>Avg</div>
      <div style={{
        fontFamily:'var(--font-display)',
        fontSize:18, fontWeight:800,
        color:'#0F172A', lineHeight:1.1
      }}>71%</div>
    </div>
  </div>

  RIGHT: Legend list
    {subjectData.map((s, i) => (
      <div style={{
        display:'flex', alignItems:'center',
        gap:8, marginBottom:6
      }}>
        <div style={{
          width:8, height:8, borderRadius:'50%',
          background:PIE_COLORS[i], flexShrink:0
        }}/>
        <span style={{
          fontFamily:'var(--font-body)',
          fontSize:11, color:'#475569', flex:1
        }}>{s.short}</span>
        <span style={{
          fontFamily:'var(--font-body)',
          fontSize:10, fontWeight:700,
          background:
            s.score>=75 ? '#DCFCE7'
            : s.score>=50 ? '#FEF3C7' : '#FEF2F2',
          color:
            s.score>=75 ? '#16A34A'
            : s.score>=50 ? '#D97706' : '#DC2626',
          padding:'1px 6px', borderRadius:4
        }}>{s.score}%</span>
      </div>
    ))}

── RESUME STRENGTH CARD ─────────────────────────────────────

Style:
  background: white
  border: 1px solid #E2E8F0
  border-radius: 20px
  padding: 16px 20px
  flex: 1
  overflow: hidden
  position: relative

Top border: 3px #BD1313

HEADER ROW:
  Left: "📄 Resume Strength" font-display 15px 700
  Right: "68%" badge
    bg #FDF2F2, color #BD1313, border #F5BFBF
    14px weight 700, radius 9999px, padding 3px 12px

TWO COLUMNS (margin-top 12px):
  display grid, grid-template-columns 80px 1fr
  gap 16px, align-items start

  LEFT: CircularProgress value=68 size=80

  RIGHT: Section bars
    const resumeSections = [
      {label:"Personal", value:100},
      {label:"Education", value:100},
      {label:"Experience", value:100},
      {label:"Skills", value:60},
      {label:"Projects", value:40},
      {label:"Summary", value:0}
    ];

    {resumeSections.map((s, i) => (
      <div key={i} style={{marginBottom:5}}>
        <div style={{
          display:'flex', justifyContent:'space-between',
          marginBottom:3
        }}>
          <span style={{
            fontFamily:'var(--font-body)',
            fontSize:10, color:'#475569'
          }}>{s.label}</span>
          <span style={{
            fontFamily:'var(--font-body)',
            fontSize:10, fontWeight:600,
            color: s.value===100 ? '#16A34A'
                  : s.value>0 ? '#BD1313'
                  : '#DC2626'
          }}>{s.value}%</span>
        </div>
        <div style={{
          height:3, background:'#F5BFBF',
          borderRadius:9999, overflow:'hidden'
        }}>
          <div style={{
            height:'100%', borderRadius:9999,
            width:`${s.value}%`,
            background:
              s.value===100 ? '#16A34A'
              : s.value>0 ? '#BD1313' : '#F5BFBF',
            transition:'width 0.8s ease-out'
          }}/>
        </div>
      </div>
    ))}

  "Complete Skills →" ghost link:
    color #BD1313, font-body 11px weight 500
    margin-top 8px, text-align right
    cursor pointer, display block
    onClick: setScreen('resume')

══ RIGHT COLUMN (0.9fr) ═════════════════════════════════════

display: flex
flex-direction: column
gap: 12px
overflow: hidden
min-height: 0

── LEADERBOARD CARD ─────────────────────────────────────────

Style:
  background: white
  border: 1px solid #E2E8F0
  border-radius: 20px
  padding: 16px 20px
  overflow: hidden
  position: relative

Top border: 3px #D97706

HEADER ROW:
  Left: "🏆 Leaderboard" font-display 15px 700
  Right: "This Week" badge
    bg #DCFCE7, color #16A34A, border #86EFAC
    11px weight 600, radius 9999px, padding 3px 10px

Podium illustration (margin 8px 0):
  <img
    src="https://i.ibb.co/93ZhMLjT/leaderboard-podium.png"
    height="56"
    style={{
      filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
      display:'block', margin:'8px auto'
    }}
  />

3 LEADERBOARD ROWS:
  const leaderboardData = [
    {rank:1, name:"Priya M.", avatar:"PM",
     score:94, isUser:false},
    {rank:2, name:"Arjun K.", avatar:"AK",
     score:91, isUser:false},
    {rank:3, name:"Rahul S.", avatar:"RS",
     score:88, isUser:true}
  ];

  {leaderboardData.map((item, i) => (
    <div style={{
      display:'flex', alignItems:'center',
      gap:10, padding:'8px 0',
      borderBottom:'1px solid #F8FAFF',
      borderLeft: item.isUser
        ? '2px solid #BD1313' : 'none',
      paddingLeft: item.isUser ? 8 : 0,
      background: item.isUser ? '#FFF8F8' : 'white',
      borderRadius: item.isUser ? '0 8px 8px 0' : 0
    }}>
      <span style={{fontSize:16, flexShrink:0}}>
        {i===0?'🥇':i===1?'🥈':'🥉'}
      </span>
      <div style={{
        width:30, height:30, borderRadius:'50%',
        background: item.isUser ? '#FDF2F2' : '#F1F5F9',
        display:'flex', alignItems:'center',
        justifyContent:'center',
        fontFamily:'var(--font-display)',
        fontSize:11, fontWeight:700,
        color: item.isUser ? '#BD1313' : '#475569',
        flexShrink:0
      }}>{item.avatar}</div>
      <div style={{flex:1}}>
        <span style={{
          fontFamily:'var(--font-body)',
          fontSize:12, fontWeight:600, color:'#0F172A'
        }}>{item.name}</span>
        {item.isUser && (
          <span style={{
            background:'#FDF2F2', color:'#BD1313',
            border:'1px solid #F5BFBF',
            fontSize:9, fontWeight:700,
            borderRadius:9999, padding:'1px 6px',
            marginLeft:6,
            fontFamily:'var(--font-body)'
          }}>YOU</span>
        )}
      </div>
      <span style={{
        fontFamily:'var(--font-display)',
        fontSize:13, fontWeight:700,
        color: i===0 ? '#D97706' : '#0F172A'
      }}>{item.score}%</span>
    </div>
  ))}

"View Full Leaderboard →" link:
  font-body 11px #BD1313 weight 500
  text-align center, display block
  margin-top 8px, cursor pointer

── SKILL GAP CARD ───────────────────────────────────────────

Style:
  background: linear-gradient(135deg, #FFF1F2, white)
  border: 1px solid #F5BFBF
  border-radius: 20px
  padding: 16px 20px
  overflow: hidden
  position: relative

Top border: 3px #DC2626

HEADER ROW:
  Left: "🎯 Skill Gap" font-display 15px 700
  Right: "For SWE Role"
    bg #F1F5F9, color #64748B, border #E2E8F0
    10px 600, radius 9999px, padding 3px 10px

const skillGapData = [
  "System Design",
  "DSA",
  "AWS / Cloud",
  "TypeScript"
];

{skillGapData.map((skill, i) => (
  <div style={{
    display:'flex', alignItems:'center',
    justifyContent:'space-between',
    padding:'6px 0',
    borderBottom:'1px solid #FFF1F2'
  }}>
    <div style={{
      display:'flex', alignItems:'center',
      gap:8,
      fontFamily:'var(--font-body)',
      fontSize:12, color:'#475569'
    }}>
      <span>⚠️</span>
      {skill}
    </div>
    <button
      onClick={() => setScreen('skills')}
      style={{
        background:'#FDF2F2', color:'#BD1313',
        border:'1px solid #F5BFBF',
        fontFamily:'var(--font-body)',
        fontSize:11, fontWeight:600,
        borderRadius:8, padding:'3px 10px',
        cursor:'pointer'
      }}>
      Add →
    </button>
  </div>
))}

── RECENT ACTIVITY CARD ─────────────────────────────────────

Style:
  background: white
  border: 1px solid #E2E8F0
  border-radius: 20px
  padding: 16px 20px
  flex: 1
  overflow: hidden
  position: relative

Top border: 3px #16A34A

HEADER: "⚡ Recent Activity" font-display 15px 700

INNER SCROLL (max-height 140px, margin-top 10px):
  overflow-y: auto
  scrollbar-width: thin
  scrollbar-color: #F5BFBF transparent

  const activityData = [
    {icon:"📝", bg:"#FFF1F2", title:"Math Test Complete",
     time:"2h ago", badge:"74%", variant:"warning"},
    {icon:"📄", bg:"#FFFBEB", title:"Resume Skills Updated",
     time:"Yesterday", badge:"68%", variant:"primary"},
    {icon:"🎤", bg:"#F0FDF4", title:"AI Interview Done",
     time:"2d ago", badge:"Practice", variant:"neutral"},
    {icon:"🏅", bg:"#FEFCE8", title:"Badge Unlocked!",
     time:"3d ago", badge:"New 🏅", variant:"warning"},
    {icon:"📊", bg:"#F0FDF4", title:"Report Reviewed",
     time:"4d ago", badge:"Done", variant:"success"}
  ];

  const getBadgeStyle = (variant) => ({
    background:
      variant==='primary' ? '#FDF2F2'
      : variant==='warning' ? '#FEF3C7'
      : variant==='success' ? '#DCFCE7'
      : '#F1F5F9',
    color:
      variant==='primary' ? '#BD1313'
      : variant==='warning' ? '#D97706'
      : variant==='success' ? '#16A34A'
      : '#475569',
    border: `1px solid ${
      variant==='primary' ? '#F5BFBF'
      : variant==='warning' ? '#FCD34D'
      : variant==='success' ? '#86EFAC'
      : '#E2E8F0'}`,
    fontSize:10, fontWeight:600,
    borderRadius:9999, padding:'2px 8px',
    whiteSpace:'nowrap',
    fontFamily:'var(--font-body)'
  });

  {activityData.map((item, i) => (
    <div style={{
      display:'flex', alignItems:'center',
      gap:10, padding:'7px 0',
      borderBottom:'1px solid #F8FAFF'
    }}>
      <div style={{
        width:32, height:32, borderRadius:10,
        background:item.bg, flexShrink:0,
        display:'flex', alignItems:'center',
        justifyContent:'center', fontSize:14
      }}>{item.icon}</div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{
          fontFamily:'var(--font-body)',
          fontSize:12, fontWeight:500,
          color:'#0F172A',
          overflow:'hidden', textOverflow:'ellipsis',
          whiteSpace:'nowrap'
        }}>{item.title}</div>
        <div style={{
          fontFamily:'var(--font-body)',
          fontSize:10, color:'#94A3B8', marginTop:1
        }}>{item.time}</div>
      </div>
      <span style={getBadgeStyle(item.variant)}>
        {item.badge}
      </span>
    </div>
  ))}

=============================================================
ACHIEVEMENTS ROW (below the 3-column grid)
=============================================================

Add below the main content grid,
before the motivational strip.

Style:
  background: white
  border: 1px solid #E2E8F0
  border-radius: 20px
  padding: 12px 20px
  flex-shrink: 0
  overflow: hidden

HEADER ROW:
  display flex, justify space-between, align center
  margin-bottom 10px

  Left: "🏅 Achievements" font-display 14px 700
  Right: "3/8 unlocked"
    bg #F1F5F9, color #64748B, border #E2E8F0
    11px weight 600, radius 9999px, padding 3px 10px

BADGES SCROLL:
  display flex, overflow-x auto, gap 10px
  scrollbar-width none
  -ms-overflow-style none
  padding-bottom 2px

  .achievements-scroll::-webkit-scrollbar {
    display: none
  }

  <img
    src="https://i.ibb.co/P0vh6SF/achievement-badges.png"
    height="40"
    style={{
      flexShrink:0,
      filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.08))'
    }}
  />

=============================================================
MOTIVATIONAL STRIP (very bottom, 40px)
=============================================================

Style:
  height: 40px
  flex-shrink: 0
  background: #FFFBEB
  border-top: 1px solid #FCD34D
  display: flex
  align-items: center
  padding: 0 20px
  gap: 10px

<img
  src="https://img.icons8.com/3d-fluency/100/light-on.png"
  width="20" height="20"
  style={{
    filter:'drop-shadow(0 1px 4px rgba(217,119,6,0.3))',
    flexShrink:0
  }}
/>

<span style={{
  fontFamily:'var(--font-body)',
  fontSize:12, fontWeight:500, color:'#D97706',
  opacity: tipVisible ? 1 : 0,
  transition:'opacity 300ms ease',
  whiteSpace:'nowrap', overflow:'hidden',
  textOverflow:'ellipsis'
}}>
  {motivationalTips[tipIndex]}
</span>

=============================================================
ALSO FIX THESE 3 ISSUES:
=============================================================

FIX 1 — Hero greeting text cut off:
  Change "morning, Rahul 👋" to
  "Good morning, Rahul 👋"
  Make font-size smaller if needed: 20px
  Or add overflow: visible to the container

FIX 2 — Test action card broken image:
  The bookmark-book URL may not be loading.
  Replace with this working URL:
  https://img.icons8.com/3d-fluency/100/open-book.png

FIX 3 — Profile stats row alignment:
  The numbers 12, 3, 8 appear disconnected
  from their labels.
  Make sure each stat is:
    display flex, flex-direction column
    align-items center
    Value: Syne 18px weight 800 #0F172A
    Label: Plus Jakarta Sans 10px #94A3B8 UPPERCASE
    Both centered under each other

=============================================================
CRITICAL: Dashboard layout structure must be:
=============================================================

<div style={{
  height: 'calc(100vh - 56px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 20px',
  gap: '12px',
  background: '#FAFAFA',
  backgroundImage: "url('https://i.ibb.co/GQM6xx2F/dot-grid-light.png')",
  backgroundRepeat: 'repeat',
  backgroundSize: '40px 40px'
}}>
  {/* Section 1: Hero Row - flex-shrink 0 */}
  {/* Section 2: Action Cards - flex-shrink 0 */}
  {/* Section 3: Stat Cards - flex-shrink 0 */}
  {/* Section 4: Main Grid - flex 1, overflow hidden */}
  {/* Section 5: Achievements - flex-shrink 0 */}
  {/* Section 6: Motivational Strip - flex-shrink 0 */}
</div>

Section 4 (main grid) must have:
  flex: 1
  overflow: hidden
  min-height: 0
  This makes it fill remaining space exactly

=============================================================