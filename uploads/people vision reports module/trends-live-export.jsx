// Step 5: Trends & Analytics, Live Status, Export Reports

// =================== TRENDS DATA ===================
const TRENDS_KPIS = {
  attendance: [
    { value:'634',     label:'Avg Daily Present',  icon:'attendance-mark', trend:'up',   delta:'3%' },
    { value:'9:08 AM', label:'Avg Check-in Time',  icon:'time-card',       trend:'down', delta:'2 min later' },
    { value:'Tuesday', label:'Peak Attendance Day',icon:'groups',          trend:'flat', delta:'—' },
    { value:'Sunday',  label:'Lowest Attendance',  icon:'dashboard',       trend:'flat', delta:'—' },
  ],
  punctuality: [
    { value:'77.7%',   label:'On-Time Rate',       icon:'time-card',       trend:'up',   delta:'2.1%' },
    { value:'18 min',  label:'Avg Late Duration',  icon:'overtime',        trend:'down', delta:'3 min' },
    { value:'12',      label:'Habitual Latecomers',icon:'groups',          trend:'up',   delta:'2' },
    { value:'423',     label:'Perfect Attendance', icon:'attendance-mark', trend:'up',   delta:'5%' },
  ],
  leaves: [
    { value:'247',     label:'Total Leaves Taken', icon:'leave',           trend:'up',   delta:'12%' },
    { value:'2.3 d',   label:'Avg Leave Duration', icon:'time-card',       trend:'flat', delta:'—' },
    { value:'December',label:'Peak Leave Month',   icon:'dashboard',       trend:'flat', delta:'—' },
    { value:'85.7%',   label:'Approval Rate',      icon:'attendance-mark', trend:'up',   delta:'1.2%' },
  ],
  workforce: [
    { value:'847',     label:'Total Headcount',    icon:'groups',          trend:'up',   delta:'23' },
    { value:'67',      label:'Remote Workers',     icon:'home-office',     trend:'up',   delta:'8%' },
    { value:'52',      label:'Field Force',        icon:'tent',            trend:'down', delta:'3%' },
    { value:'2.1%',    label:'Turnover (est.)',    icon:'organization',    trend:'down', delta:'0.3%' },
  ],
};

const TRENDS_INSIGHTS = {
  attendance: [
    { type:'up',   title:'Tuesday consistently highest', detail:'Average 621 employees present' },
    { type:'warn', title:'Weekend attendance drops 70%', detail:'Avg 178 present Sat–Sun' },
    { type:'info', title:'Mumbai HQ leads attendance',   detail:'75% daily attendance rate' },
  ],
  punctuality: [
    { type:'up',   title:'On-time rate improved 2.1%',   detail:'vs last week\u2019s 75.6%' },
    { type:'warn', title:'Thursday most late arrivals',  detail:'51 late employees on avg' },
    { type:'info', title:'12 habitual latecomers flagged', detail:'3+ late instances this month' },
  ],
  leaves: [
    { type:'up',   title:'Approval rate at 85.7%',       detail:'Up from 84.5% last month' },
    { type:'warn', title:'December peak leave season',   detail:'58 leaves — plan coverage' },
    { type:'info', title:'Sick leave up 14% vs last yr', detail:'Monitor wellness programs' },
  ],
  workforce: [
    { type:'up',   title:'Remote work up 8% this month', detail:'67 employees WFH regularly' },
    { type:'warn', title:'Field force down 3%',          detail:'52 outdoor workers this week' },
    { type:'info', title:'Headcount grew by 23',         detail:'New hires onboarded in Apr' },
  ],
};

const DEPT_PERFORMANCE = [
  { rank:1, name:'Design & Product',     rate:89.2 },
  { rank:2, name:'Finance & HR',         rate:87.5 },
  { rank:3, name:'Frontend Engineering', rate:84.1 },
  { rank:4, name:'QA & Testing',         rate:82.6 },
  { rank:5, name:'Backend Engineering',  rate:81.3 },
];

const CHECKIN_DIST = [
  { label:'Before 8 AM',   count:47,  color:'#7C3AED', peak:false },
  { label:'8:00 – 8:59',   count:123, color:'#2563EB', peak:false },
  { label:'9:00 – 9:14',   count:312, color:'#16A34A', peak:true  },
  { label:'9:15 – 9:29',   count:156, color:'#16A34A', peak:false },
  { label:'9:30 – 9:59',   count:89,  color:'#D97706', peak:false },
  { label:'10:00 +',       count:43,  color:'#DC2626', peak:false },
];

const HEATMAP = [
  [87,91,89,85,82,42,6],
  [86,88,90,83,80,38,5],
  [85,87,88,82,79,40,7],
  [84,86,87,84,81,41,5],
];

// =================== LIVE FEED DATA ===================
const LIVE_FEED = [
  { time:'09:42 AM', name:'Kavita Rao',   role:'admin',    action:'Checked In',   dept:'Finance & HR',         initials:'KR' },
  { time:'09:40 AM', name:'Meera Reddy',  role:'employee', action:'Started WFH',  dept:'QA & Testing',         initials:'MR' },
  { time:'09:38 AM', name:'Deepak Singh', role:'employee', action:'Marked Late',  dept:'Operations',           initials:'DS' },
  { time:'09:35 AM', name:'Pooja Nair',   role:'employee', action:'Went Outdoor', dept:'Finance & HR',         initials:'PN' },
  { time:'09:32 AM', name:'Sneha Iyer',   role:'admin',    action:'Checked In',   dept:'Design & Product',     initials:'SI' },
  { time:'09:28 AM', name:'Rohan Shetty', role:'employee', action:'Checked In',   dept:'Marketing',            initials:'RS' },
  { time:'09:25 AM', name:'Karan Patel',  role:'manager',  action:'Started WFH',  dept:'QA & Testing',         initials:'KP' },
  { time:'09:22 AM', name:'Priya Das',    role:'employee', action:'Started WFH',  dept:'Marketing',            initials:'PD' },
  { time:'09:20 AM', name:'Karan Patel',  role:'manager',  action:'Checked In',   dept:'QA & Testing',         initials:'KP' },
  { time:'09:18 AM', name:'Ravi Kumar',   role:'employee', action:'Went Outdoor', dept:'Engineering',          initials:'RK' },
  { time:'09:15 AM', name:'Diya Mehta',   role:'employee', action:'Checked In',   dept:'Frontend Engineering', initials:'DM' },
  { time:'09:12 AM', name:'Anita Verma',  role:'manager',  action:'Went Outdoor', dept:'Backend Engineering',  initials:'AV' },
  { time:'09:08 AM', name:'Rahul Desai',  role:'manager',  action:'Checked In',   dept:'Frontend Engineering', initials:'RD' },
  { time:'09:05 AM', name:'Nikhil Joshi', role:'employee', action:'Marked Late',  dept:'Frontend Engineering', initials:'NJ' },
  { time:'09:01 AM', name:'Aarav Shah',   role:'employee', action:'Checked In',   dept:'Frontend Engineering', initials:'AS' },
];

const RECENT_CHECKINS = [
  { name:'Kavita Rao',   role:'admin',    dept:'Finance & HR',          time:'09:42 AM', initials:'KR' },
  { name:'Sneha Iyer',   role:'admin',    dept:'Design & Product',      time:'09:32 AM', initials:'SI' },
  { name:'Rohan Shetty', role:'employee', dept:'Marketing',             time:'09:28 AM', initials:'RS' },
  { name:'Karan Patel',  role:'manager',  dept:'QA & Testing',          time:'09:20 AM', initials:'KP' },
  { name:'Diya Mehta',   role:'employee', dept:'Frontend Engineering',  time:'09:15 AM', initials:'DM' },
  { name:'Rahul Desai',  role:'manager',  dept:'Frontend Engineering',  time:'09:08 AM', initials:'RD' },
  { name:'Aarav Shah',   role:'employee', dept:'Frontend Engineering',  time:'09:01 AM', initials:'AS' },
  { name:'Priya Sharma', role:'admin',    dept:'Engineering',           time:'09:02 AM', initials:'PS' },
];

const ACTION_BADGE = {
  'Checked In':   { bg:'#DCFCE7', color:'#16A34A' },
  'Checked Out':  { bg:'#EFF6FF', color:'#2563EB' },
  'Went Outdoor': { bg:'#ECFEFF', color:'#0891B2' },
  'Started WFH':  { bg:'#F0FDF4', color:'#16A34A' },
  'Marked Late':  { bg:'#FEF3C7', color:'#D97706' },
};

// =================== EXPORT DATA ===================
const EXPORT_CATEGORIES = [
  { id:'attendance', icon:'attendance-mark', strip:'#16A34A', tag:'Most Popular',
    name:'Attendance Report', desc:'Complete attendance data for all employees',
    includes:['Daily check-in / out times','Status breakdown','Branch-wise data','Late arrivals'] },
  { id:'leave', icon:'leave', strip:'#7C3AED', tag:null,
    name:'Leave Report', desc:'Leave history, balances and approvals',
    includes:['Leave by type','Approval status','Department summary','Balance overview'] },
  { id:'hierarchy', icon:'organization', strip:'#2563EB', tag:null,
    name:'Hierarchy Report', desc:'Org structure and reporting chains',
    includes:['Admin → Manager → Employee tree','Role distribution','Team sizes'] },
  { id:'outdoor', icon:'tent', strip:'#0891B2', tag:null,
    name:'Outdoor & Travel', desc:'Field force and travel data',
    includes:['Outdoor employees','Destinations','WFH list','Event attendance'] },
  { id:'location', icon:'location', strip:'#BD1313', tag:'Super Admin',
    name:'Location Report', desc:'Branch, city, state and country breakdown',
    includes:['Branch-wise attendance','State summary','City distribution'] },
];

const RECENT_EXPORTS = [
  { name:'Attendance Report - Apr', format:'CSV',  date:'Apr 27, 09:30 AM', by:'Rajesh Kumar' },
  { name:'Leave Report - Apr',      format:'XLSX', date:'Apr 25, 02:15 PM', by:'Rajesh Kumar' },
  { name:'Hierarchy Report',        format:'PDF',  date:'Apr 22, 11:00 AM', by:'Priya Sharma' },
  { name:'Outdoor & Travel - W3',   format:'CSV',  date:'Apr 18, 04:30 PM', by:'Rajesh Kumar' },
  { name:'Location Report - Apr',   format:'PDF',  date:'Apr 15, 10:00 AM', by:'Rajesh Kumar' },
];

const FORMAT_BADGE = {
  CSV:  { bg:'#DCFCE7', color:'#16A34A' },
  XLSX: { bg:'#EFF6FF', color:'#2563EB' },
  PDF:  { bg:'#FEF2F2', color:'#DC2626' },
};

// =================== TRENDS HELPERS ===================
const KPICard = ({ k }) => {
  const trendBg = k.trend === 'flat' ? '#F1F5F9' : k.trend === 'up' ? '#DCFCE7' : '#FEF2F2';
  const trendColor = k.trend === 'flat' ? '#64748B' : k.trend === 'up' ? '#16A34A' : '#DC2626';
  const arrow = k.trend === 'flat' ? '·' : k.trend === 'up' ? '↑' : '↓';
  return (
    <div style={{
      background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
      padding:'14px 18px', height:90,
      display:'flex', alignItems:'center', gap:14,
      boxShadow:'0 1px 4px rgba(15,23,42,0.06)'
    }}>
      <img src={`https://img.icons8.com/pulsar-color/48/${k.icon}.png`} width="32" height="32" alt="" />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:22, fontWeight:700, color:'#0F172A', lineHeight:1.1 }}>{k.value}</div>
        <div style={{
          fontSize:10, fontWeight:600, color:'#94A3B8',
          textTransform:'uppercase', letterSpacing:'0.6px', marginTop:4
        }}>{k.label}</div>
      </div>
      <span style={{
        background:trendBg, color:trendColor,
        fontSize:11, fontWeight:600,
        borderRadius:9999, padding:'3px 8px',
        whiteSpace:'nowrap'
      }}>{arrow} {k.delta}</span>
    </div>
  );
};

// SVG line+area chart for Attendance
const AttendanceChart = () => {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const present = [608,621,615,598,589,312,45];
  const late    = [38,42,35,51,45,18,8];
  const absent  = [201,184,197,198,213,517,794];
  const max = 847;
  const W = 600, H = 200, PT = 20, PB = 30, PL = 36, PR = 12;
  const xs = days.map((_, i) => PL + (i * (W - PL - PR)) / (days.length - 1));
  const yOf = (v) => PT + (1 - v / max) * (H - PT - PB);
  const toPath = (arr) => arr.map((v,i) => `${i===0?'M':'L'}${xs[i]} ${yOf(v)}`).join(' ');
  const toArea = (arr) => `${toPath(arr)} L${xs[xs.length-1]} ${H - PB} L${xs[0]} ${H - PB} Z`;
  const grid = [0,0.25,0.5,0.75,1];
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="200" style={{ overflow:'visible' }}>
        {grid.map((g,i) => (
          <line key={i} x1={PL} x2={W - PR}
                y1={PT + g*(H-PT-PB)} y2={PT + g*(H-PT-PB)}
                stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
        ))}
        <path d={toArea(absent)}  fill="rgba(220,38,38,0.06)"  stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d={toArea(late)}    fill="rgba(217,119,6,0.10)"  stroke="#D97706" strokeWidth="2" />
        <path d={toArea(present)} fill="rgba(189,19,19,0.10)"  stroke="#BD1313" strokeWidth="2.5" />
        {present.map((v,i) => (
          <circle key={i} cx={xs[i]} cy={yOf(v)} r="4" fill="#fff" stroke="#BD1313" strokeWidth="2">
            <title>{days[i]} · Present {v}</title>
          </circle>
        ))}
        {days.map((d,i) => (
          <text key={d} x={xs[i]} y={H - 8} textAnchor="middle"
                fontSize="11" fontFamily="Poppins" fontWeight="500" fill="#94A3B8">{d}</text>
        ))}
        {[0,200,400,600,800].map(v => (
          <text key={v} x={PL - 6} y={yOf(v) + 3} textAnchor="end"
                fontSize="10" fontFamily="Poppins" fill="#94A3B8">{v}</text>
        ))}
      </svg>
      <ChartLegend items={[
        { color:'#BD1313', label:'Present' },
        { color:'#D97706', label:'Late' },
        { color:'#DC2626', label:'Absent', dashed:true },
      ]} />
    </div>
  );
};

const PunctualityChart = () => {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const onTime = [570,579,580,547,544,294,37];
  const late   = [38,42,35,51,45,18,8];
  const max = 621;
  return (
    <div>
      <div style={{ display:'flex', alignItems:'flex-end', gap:14, height:200, padding:'12px 8px 8px', borderLeft:'1px solid #F1F5F9', borderBottom:'1px solid #F1F5F9' }}>
        {days.map((d,i) => (
          <div key={d} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:160 }}>
              <div title={`On-Time ${onTime[i]}`} style={{
                width:18, height:`${(onTime[i]/max)*160}px`,
                background:'#16A34A', borderRadius:'4px 4px 0 0',
                transition:'height .4s'
              }}></div>
              <div title={`Late ${late[i]}`} style={{
                width:18, height:`${(late[i]/max)*160}px`,
                background:'#D97706', borderRadius:'4px 4px 0 0',
                transition:'height .4s'
              }}></div>
            </div>
            <div style={{ fontSize:11, color:'#94A3B8', fontWeight:500 }}>{d}</div>
          </div>
        ))}
      </div>
      <ChartLegend items={[
        { color:'#16A34A', label:'On-Time' },
        { color:'#D97706', label:'Late' },
      ]} />
    </div>
  );
};

const LeavesChart = () => {
  const months = [
    { m:'Nov', annual:12, sick:8,  casual:6,  other:3 },
    { m:'Dec', annual:28, sick:14, casual:9,  other:7 },
    { m:'Jan', annual:8,  sick:18, casual:5,  other:4 },
    { m:'Feb', annual:10, sick:12, casual:7,  other:3 },
    { m:'Mar', annual:14, sick:9,  casual:8,  other:5 },
    { m:'Apr', annual:18, sick:14, casual:11, other:4 },
  ];
  return (
    <div>
      <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'8px 0' }}>
        {months.map(row => {
          const total = row.annual + row.sick + row.casual + row.other;
          return (
            <div key={row.m} style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ minWidth:32, fontSize:12, fontWeight:600, color:'#475569' }}>{row.m}</div>
              <div style={{ flex:1, height:16, borderRadius:9999, overflow:'hidden', display:'flex', background:'#F8FAFC' }}>
                <div style={{ width:`${(row.annual/total)*100}%`, background:'#2563EB' }} title={`Annual ${row.annual}`}></div>
                <div style={{ width:`${(row.sick/total)*100}%`,   background:'#DC2626' }} title={`Sick ${row.sick}`}></div>
                <div style={{ width:`${(row.casual/total)*100}%`, background:'#D97706' }} title={`Casual ${row.casual}`}></div>
                <div style={{ width:`${(row.other/total)*100}%`,  background:'#7C3AED' }} title={`Other ${row.other}`}></div>
              </div>
              <div style={{ minWidth:32, fontSize:13, fontWeight:700, color:'#0F172A', textAlign:'right' }}>{total}</div>
            </div>
          );
        })}
      </div>
      <ChartLegend items={[
        { color:'#2563EB', label:'Annual' },
        { color:'#DC2626', label:'Sick' },
        { color:'#D97706', label:'Casual' },
        { color:'#7C3AED', label:'Other' },
      ]} />
    </div>
  );
};

const WorkforceChart = () => {
  const weeks = ['W1','W2','W3','W4','W5','W6','W7'];
  const office = [580,575,590,570,565,580,568];
  const remote = [52,58,55,62,67,61,67];
  const field  = [45,42,48,38,52,41,52];
  const max = 700;
  const W = 600, H = 180, PT = 16, PB = 26, PL = 36, PR = 12;
  const xs = weeks.map((_, i) => PL + (i * (W - PL - PR)) / (weeks.length - 1));
  const yOf = (v) => PT + (1 - v / max) * (H - PT - PB);
  const toPath = (arr) => arr.map((v,i) => `${i===0?'M':'L'}${xs[i]} ${yOf(v)}`).join(' ');
  const toArea = (arr) => `${toPath(arr)} L${xs[xs.length-1]} ${H - PB} L${xs[0]} ${H - PB} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="180">
        {[0,0.25,0.5,0.75,1].map((g,i) => (
          <line key={i} x1={PL} x2={W - PR}
                y1={PT + g*(H-PT-PB)} y2={PT + g*(H-PT-PB)}
                stroke="#F1F5F9" strokeDasharray="3 3" />
        ))}
        <path d={toArea(office)} fill="rgba(189,19,19,0.15)" stroke="#BD1313" strokeWidth="2" />
        <path d={toArea(remote)} fill="rgba(22,163,74,0.18)" stroke="#16A34A" strokeWidth="2" />
        <path d={toArea(field)}  fill="rgba(8,145,178,0.18)" stroke="#0891B2" strokeWidth="2" />
        {weeks.map((w,i) => (
          <text key={w} x={xs[i]} y={H - 8} textAnchor="middle"
                fontSize="11" fontFamily="Poppins" fontWeight="500" fill="#94A3B8">{w}</text>
        ))}
        {[0,175,350,525,700].map(v => (
          <text key={v} x={PL - 6} y={yOf(v) + 3} textAnchor="end"
                fontSize="10" fontFamily="Poppins" fill="#94A3B8">{v}</text>
        ))}
      </svg>
      <ChartLegend items={[
        { color:'#BD1313', label:'Office' },
        { color:'#16A34A', label:'Remote' },
        { color:'#0891B2', label:'Field' },
      ]} />
    </div>
  );
};

const ChartLegend = ({ items }) => (
  <div style={{ display:'flex', gap:18, marginTop:14, flexWrap:'wrap' }}>
    {items.map(it => (
      <div key={it.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
        <span style={{
          width:10, height:10, borderRadius:'50%',
          background:it.dashed ? 'transparent' : it.color,
          border: it.dashed ? `2px dashed ${it.color}` : 'none'
        }}></span>
        <span style={{ fontSize:12, color:'#475569', fontWeight:500 }}>{it.label}</span>
      </div>
    ))}
  </div>
);

const InsightItem = ({ ins }) => {
  const cfg = {
    up:   { bg:'#DCFCE7', color:'#16A34A', icon:'↗' },
    warn: { bg:'#FEF3C7', color:'#D97706', icon:'!' },
    info: { bg:'#EFF6FF', color:'#2563EB', icon:'ⓘ' },
  }[ins.type];
  return (
    <div style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:14 }}>
      <div style={{
        width:32, height:32, borderRadius:'50%',
        background:cfg.bg, color:cfg.color,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:14, fontWeight:700, flexShrink:0
      }}>{cfg.icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:600, color:'#0F172A' }}>{ins.title}</div>
        <div style={{ fontSize:12, color:'#64748B', marginTop:3, lineHeight:1.4 }}>{ins.detail}</div>
      </div>
    </div>
  );
};

const heatmapColor = (v) => {
  if (v >= 85) return '#16A34A';
  if (v >= 75) return '#4ADE80';
  if (v >= 60) return '#FCD34D';
  return '#FCA5A5';
};

// =================== TRENDS SCREEN ===================
function TrendsScreen({ trendsTab, setTrendsTab, trendsPeriod, setTrendsPeriod, toast }) {
  const tabs = [
    { id:'attendance', label:'Attendance' },
    { id:'punctuality', label:'Punctuality' },
    { id:'leaves', label:'Leaves' },
    { id:'workforce', label:'Workforce' },
  ];
  const periods = [
    { id:'week', label:'This Week' },
    { id:'month', label:'This Month' },
    { id:'quarter', label:'This Quarter' },
  ];
  const titles = {
    attendance:  { t:'Daily Attendance Trend',     s:'Present vs Late vs Absent over time' },
    punctuality: { t:'Punctuality Overview',       s:'On-time vs Late arrivals by day' },
    leaves:      { t:'Monthly Leave Pattern',      s:'Leave volume by type over period' },
    workforce:   { t:'Workforce Composition',      s:'Office, Remote, and Field presence' },
  };
  const Chart = ({
    attendance: AttendanceChart, punctuality: PunctualityChart,
    leaves: LeavesChart, workforce: WorkforceChart
  })[trendsTab];

  return (
    <div className="screen-enter" style={{ padding:24 }}>
      {/* Tabs + period */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, gap:12, flexWrap:'wrap' }}>
        <div style={{ display:'flex', gap:8 }}>
          {tabs.map(t => {
            const active = trendsTab === t.id;
            return (
              <button key={t.id} onClick={() => setTrendsTab(t.id)} style={{
                height:36, padding:'0 18px', borderRadius:8,
                border: active ? 'none' : '1px solid #E2E8F0',
                background: active ? '#BD1313' : '#fff',
                color: active ? '#fff' : '#475569',
                fontSize:13, fontWeight:600, cursor:'pointer',
                boxShadow: active ? '0 2px 8px rgba(189,19,19,0.20)' : 'none',
                transition:'all .2s'
              }}>{t.label}</button>
            );
          })}
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {periods.map(p => {
            const active = trendsPeriod === p.id;
            return (
              <button key={p.id} onClick={() => setTrendsPeriod(p.id)} style={{
                height:32, padding:'0 14px', borderRadius:9999,
                border: active ? 'none' : '1px solid #E2E8F0',
                background: active ? '#0F172A' : '#fff',
                color: active ? '#fff' : '#475569',
                fontSize:12, fontWeight:600, cursor:'pointer'
              }}>{p.label}</button>
            );
          })}
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
        {TRENDS_KPIS[trendsTab].map((k,i) => <KPICard key={i} k={k} />)}
      </div>

      {/* Main chart + side */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:16 }}>
        {/* Chart card */}
        <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, padding:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:'#0F172A' }}>{titles[trendsTab].t}</div>
              <div style={{ fontSize:12, color:'#94A3B8', marginTop:3 }}>{titles[trendsTab].s}</div>
            </div>
            <button onClick={() => toast('Chart downloaded as PNG')}
              style={{
                width:32, height:32, borderRadius:'50%',
                background:'#F8FAFC', border:'1px solid #E2E8F0',
                cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'
              }}>
              <Download size={14} color="#64748B" />
            </button>
          </div>
          <Chart />
        </div>

        {/* Side cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
            <div style={{
              fontSize:11, fontWeight:700, color:'#94A3B8',
              textTransform:'uppercase', letterSpacing:'0.8px', marginBottom:14
            }}>Key Insights</div>
            {TRENDS_INSIGHTS[trendsTab].map((ins,i) => <InsightItem key={i} ins={ins} />)}
          </div>
          <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
            <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>Dept Performance</div>
            <div style={{ fontSize:12, color:'#94A3B8', marginTop:2, marginBottom:14 }}>By attendance rate</div>
            {DEPT_PERFORMANCE.map((d,i) => {
              const rateColor = d.rate >= 85 ? '#16A34A' : d.rate >= 75 ? '#D97706' : '#DC2626';
              const rankBg = d.rank === 1 ? '#BD1313' : d.rank === 2 ? '#D97706' : d.rank === 3 ? '#2563EB' : '#F1F5F9';
              const rankColor = d.rank <= 3 ? '#fff' : '#64748B';
              return (
                <div key={d.rank} style={{
                  display:'flex', gap:10, alignItems:'center',
                  padding:'8px 0',
                  borderBottom: i === DEPT_PERFORMANCE.length-1 ? 'none' : '1px solid #F8FAFC'
                }}>
                  <div style={{
                    width:26, height:26, borderRadius:'50%',
                    background:rankBg, color:rankColor,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:12, fontWeight:700
                  }}>{d.rank}</div>
                  <div style={{ flex:1, fontSize:13, fontWeight:600, color:'#0F172A' }}>{d.name}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:rateColor }}>{d.rate}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
        {/* Check-in distribution */}
        <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>Check-in Time Distribution</div>
          <div style={{ fontSize:12, color:'#94A3B8', marginTop:2, marginBottom:14 }}>When employees arrive</div>
          {CHECKIN_DIST.map(slot => {
            const pct = (slot.count / 312) * 100;
            return (
              <div key={slot.label} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <div style={{ minWidth:96, fontSize:12, color:'#475569', display:'flex', alignItems:'center', gap:4 }}>
                  {slot.label}{slot.peak && <span style={{ color:'#D97706' }}>★</span>}
                </div>
                <div style={{ flex:1, height:8, background:'#F8FAFC', borderRadius:9999, overflow:'hidden' }}>
                  <div style={{ width:`${pct}%`, height:'100%', background:slot.color, borderRadius:9999, transition:'width .4s' }}></div>
                </div>
                <div style={{ minWidth:30, fontSize:12, fontWeight:700, color:'#0F172A', textAlign:'right' }}>{slot.count}</div>
              </div>
            );
          })}
        </div>

        {/* Leave balance */}
        <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>Leave Balance</div>
          <div style={{ fontSize:12, color:'#94A3B8', marginTop:2, marginBottom:14 }}>Company average remaining</div>
          {[
            { type:'Annual',  used:8.2, total:24, color:'#2563EB' },
            { type:'Sick',    used:3.1, total:12, color:'#DC2626' },
            { type:'Casual',  used:4.7, total:12, color:'#D97706' },
          ].map((lb,i) => {
            const pct = (lb.used / lb.total) * 100;
            return (
              <div key={lb.type} style={{
                display:'flex', alignItems:'center', gap:14,
                padding:'10px 0',
                borderBottom: i === 2 ? 'none' : '1px solid #F8FAFC'
              }}>
                <div style={{ width:48, height:48, position:'relative', flexShrink:0 }}>
                  <div style={{
                    width:48, height:48, borderRadius:'50%',
                    background:`conic-gradient(${lb.color} ${pct*3.6}deg, #F1F5F9 ${pct*3.6}deg)`
                  }}></div>
                  <div style={{
                    position:'absolute', inset:5, borderRadius:'50%', background:'#fff',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, fontWeight:700, color:'#0F172A'
                  }}>{lb.used}</div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'#0F172A' }}>{lb.type} Leave</div>
                  <div style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>{lb.used} used / {lb.total} total</div>
                  <div style={{ height:4, background:'#F1F5F9', borderRadius:9999, marginTop:6, overflow:'hidden' }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:lb.color, borderRadius:9999 }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Heatmap */}
        <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>Attendance Heatmap</div>
          <div style={{ fontSize:12, color:'#94A3B8', marginTop:2, marginBottom:14 }}>Last 4 weeks by day</div>
          <div style={{ display:'grid', gridTemplateColumns:'24px repeat(7,1fr)', gap:4, marginBottom:6 }}>
            <div></div>
            {['M','T','W','T','F','S','S'].map((d,i) => (
              <div key={i} style={{ fontSize:10, fontWeight:700, color:'#94A3B8', textAlign:'center' }}>{d}</div>
            ))}
          </div>
          {HEATMAP.map((wk,wi) => (
            <div key={wi} style={{ display:'grid', gridTemplateColumns:'24px repeat(7,1fr)', gap:4, marginBottom:4 }}>
              <div style={{ fontSize:10, color:'#94A3B8', display:'flex', alignItems:'center' }}>W{wi+1}</div>
              {wk.map((v,di) => (
                <div key={di} title={`${v}% · ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][di]}`} style={{
                  aspectRatio:'1', borderRadius:6, background:heatmapColor(v),
                  cursor:'pointer', transition:'transform .15s'
                }}></div>
              ))}
            </div>
          ))}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:14 }}>
            <span style={{ fontSize:10, color:'#94A3B8' }}>Low</span>
            {['#FCA5A5','#FCD34D','#4ADE80','#16A34A'].map(c => (
              <div key={c} style={{ width:14, height:14, borderRadius:3, background:c }}></div>
            ))}
            <span style={{ fontSize:10, color:'#94A3B8' }}>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== LIVE STATUS SCREEN ===================
function LiveStatusScreen({ toast }) {
  const [countdown, setCountdown] = React.useState(42);
  React.useEffect(() => {
    const t = setInterval(() => {
      setCountdown(c => c <= 1 ? 60 : c - 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const tiles1 = [
    { key:'checkedIn',    label:'Checked In',     count:612, color:'#16A34A', icon:'attendance-mark' },
    { key:'checkedOut',   label:'Checked Out',    count:89,  color:'#2563EB', icon:'time-card' },
    { key:'notCheckedIn', label:'Not Checked In', count:94,  color:'#DC2626', icon:'attendance-mark' },
    { key:'onLeave',      label:'On Leave',       count:52,  color:'#7C3AED', icon:'leave' },
    { key:'late',         label:'Late Today',     count:43,  color:'#D97706', icon:'overtime' },
  ];
  const tiles2 = [
    { key:'wfh',         label:'Work From Home', count:67,  color:'#16A34A', icon:'home-office' },
    { key:'outdoor',     label:'Outdoor',        count:38,  color:'#0891B2', icon:'tent' },
    { key:'travelling',  label:'Travelling',     count:14,  color:'#D97706', icon:'airplane-mode-on' },
    { key:'atEvent',     label:'At Event',       count:11,  color:'#7C3AED', icon:'calendar' },
    { key:'total',       label:'Total Workforce',count:847, color:'#BD1313', icon:'groups' },
  ];

  const renderTile = (t) => (
    <div key={t.key} style={{
      background:'#fff', border:'1px solid #E2E8F0', borderRadius:12,
      padding:'14px 18px', height:100, position:'relative', overflow:'hidden',
      boxShadow:'0 1px 4px rgba(15,23,42,0.06)'
    }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:t.color }}></div>
      <div style={{
        position:'absolute', top:14, right:14, width:8, height:8,
        borderRadius:'50%', background:'#16A34A', animation:'pulse 2s infinite'
      }}></div>
      <img src={`https://img.icons8.com/pulsar-color/48/${t.icon}.png`} width="26" height="26" alt="" style={{ marginTop:4 }} />
      <div style={{ fontSize:24, fontWeight:700, color:'#0F172A', marginTop:6, lineHeight:1 }}>{t.count}</div>
      <div style={{ fontSize:10, fontWeight:700, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'0.6px', marginTop:4 }}>{t.label}</div>
    </div>
  );

  return (
    <div className="screen-enter" style={{ padding:24 }}>
      {/* Live header banner */}
      <div style={{
        background:'linear-gradient(135deg,#0F172A 0%,#1E293B 100%)',
        borderRadius:16, padding:'20px 24px', marginBottom:20,
        display:'flex', justifyContent:'space-between', alignItems:'center', gap:16,
        boxShadow:'0 4px 16px rgba(15,23,42,0.20)'
      }}>
        <div>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <span style={{
              width:12, height:12, borderRadius:'50%', background:'#16A34A',
              animation:'livePulse 1.5s infinite ease-in-out'
            }}></span>
            <span style={{ fontSize:12, fontWeight:700, color:'#16A34A', letterSpacing:1 }}>LIVE</span>
          </div>
          <div style={{ fontSize:18, fontWeight:700, color:'#F1F5F9', marginTop:8 }}>
            Real-Time Workforce Status
          </div>
          <div style={{ fontSize:12, color:'#94A3B8', marginTop:4 }}>
            Updated every 60 seconds · Apr 28, 2025 · 09:42 AM IST
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:13, fontWeight:500, color:'#94A3B8' }}>
            Auto-refresh in: <span style={{ color:'#F1F5F9', fontWeight:700 }}>{countdown}s</span>
          </div>
          <div style={{ width:160, height:5, background:'rgba(255,255,255,0.1)', borderRadius:9999, marginTop:8, overflow:'hidden' }}>
            <div style={{
              width:`${(countdown/60)*100}%`, height:'100%',
              background:'#16A34A', borderRadius:9999,
              transition:'width 1s linear'
            }}></div>
          </div>
          <button onClick={() => { setCountdown(60); toast('Live data refreshed'); }} style={{
            height:32, padding:'0 14px', marginTop:10,
            background:'rgba(255,255,255,0.1)', color:'#F1F5F9',
            border:'1px solid rgba(255,255,255,0.2)',
            borderRadius:8, cursor:'pointer',
            display:'inline-flex', alignItems:'center', gap:6,
            fontSize:12, fontWeight:600
          }}>↻ Refresh Now</button>
        </div>
      </div>

      {/* Stat tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:12 }}>
        {tiles1.map(renderTile)}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:20 }}>
        {tiles2.map(renderTile)}
      </div>

      {/* Three-col layout */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:16 }}>
        {/* Activity feed */}
        <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, overflow:'hidden' }}>
          <div style={{
            padding:'14px 20px', borderBottom:'1px solid #E2E8F0',
            display:'flex', justifyContent:'space-between', alignItems:'center'
          }}>
            <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>Live Activity Feed</div>
            <div style={{
              background:'#DCFCE7', color:'#16A34A',
              fontSize:11, fontWeight:700, borderRadius:9999, padding:'3px 10px',
              display:'inline-flex', alignItems:'center', gap:5
            }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#16A34A', animation:'pulse 2s infinite' }}></span>
              Live
            </div>
          </div>
          <div className="inner-scroll" style={{ maxHeight:420, overflowY:'auto' }}>
            {LIVE_FEED.map((it,i) => {
              const ab = ACTION_BADGE[it.action] || { bg:'#F1F5F9', color:'#64748B' };
              return (
                <div key={i} style={{
                  display:'flex', gap:12, alignItems:'center',
                  padding:'12px 20px', borderBottom: i === LIVE_FEED.length-1 ? 'none' : '1px solid #F8FAFC'
                }}>
                  <Avatar role={it.role} initials={it.initials} size={36} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
                      <span style={{ fontSize:13, fontWeight:600, color:'#0F172A' }}>{it.name}</span>
                      <span style={{
                        background:ab.bg, color:ab.color,
                        fontSize:11, fontWeight:600,
                        borderRadius:6, padding:'2px 8px'
                      }}>{it.action}</span>
                    </div>
                    <div style={{ fontSize:11, color:'#94A3B8', marginTop:3 }}>{it.dept}</div>
                  </div>
                  <div style={{ fontSize:11, fontWeight:600, color:'#94A3B8' }}>{it.time}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Branch live status */}
        <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#0F172A', marginBottom:16 }}>Branch Status</div>
          {BRANCHES.map((b,i) => {
            const pct = Math.round((b.present/b.total)*100);
            const dotColor = pct >= 75 ? '#16A34A' : pct >= 65 ? '#D97706' : '#DC2626';
            return (
              <div key={b.branch} style={{
                paddingBottom:14, marginBottom:14,
                borderBottom: i === BRANCHES.length-1 ? 'none' : '1px solid #F8FAFC'
              }}>
                <div style={{ fontSize:13, fontWeight:600, color:'#0F172A' }}>{b.branch}</div>
                <div style={{ fontSize:11, color:'#94A3B8', marginTop:2 }}>{b.city}, {b.state}</div>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
                  <span style={{
                    width:8, height:8, borderRadius:'50%', background:dotColor,
                    animation:'pulse 2s infinite'
                  }}></span>
                  <span style={{ fontSize:12, fontWeight:500, color:'#475569' }}>{b.present} present · {pct}%</span>
                </div>
                <div style={{ height:4, background:'#F1F5F9', borderRadius:9999, marginTop:8, overflow:'hidden' }}>
                  <div style={{ width:`${pct}%`, height:'100%', background:'#BD1313', borderRadius:9999 }}></div>
                </div>
                <div style={{ fontSize:11, color:'#94A3B8', marginTop:6, textAlign:'right' }}>{b.present} / {b.total}</div>
              </div>
            );
          })}
        </div>

        {/* Recent check-ins */}
        <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, padding:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>Recent Check-ins</div>
          <div style={{ fontSize:12, color:'#94A3B8', marginTop:2, marginBottom:14 }}>Last 30 minutes</div>
          {RECENT_CHECKINS.map((r,i) => (
            <div key={i} style={{ display:'flex', gap:10, alignItems:'center', marginBottom:10 }}>
              <Avatar role={r.role} initials={r.initials} size={32} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:'#0F172A' }}>{r.name}</div>
                <div style={{ fontSize:11, color:'#94A3B8', marginTop:1 }}>{r.dept}</div>
              </div>
              <div style={{ fontSize:11, fontWeight:600, color:'#16A34A' }}>{r.time}</div>
            </div>
          ))}
          <div style={{ borderTop:'1px solid #F1F5F9', marginTop:14, paddingTop:14 }}>
            <div style={{ fontSize:12, fontWeight:600, color:'#DC2626', marginBottom:8 }}>Still Pending</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {['Rohan Gupta','Kavya Reddy','Manoj Sharma'].map(n => (
                <span key={n} style={{
                  background:'#FEF2F2', color:'#DC2626',
                  fontSize:11, fontWeight:600,
                  borderRadius:9999, padding:'4px 10px'
                }}>{n}</span>
              ))}
            </div>
            <div style={{ fontSize:11, color:'#94A3B8', marginTop:6 }}>+ 91 more</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== EXPORT REPORTS SCREEN ===================
function ExportScreen({ exportCategory, setExportCategory, exportFormat, setExportFormat, currentRole, toast }) {
  const [includes, setIncludes] = React.useState({ employee:true, attendance:true, balance:false });
  const [dateRange, setDateRange] = React.useState('Today');
  const [branch, setBranch] = React.useState('All Branches');
  const [dept, setDept] = React.useState('All Departments');

  const selectedCat = EXPORT_CATEGORIES.find(c => c.id === exportCategory);
  const selectedFmtBadge = FORMAT_BADGE[exportFormat.toUpperCase()];

  return (
    <div className="screen-enter" style={{ padding:24 }}>
      {/* Header */}
      <div style={{
        background:'#fff', border:'1px solid #E2E8F0', borderRadius:16,
        padding:'24px 28px', marginBottom:20,
        display:'flex', justifyContent:'space-between', alignItems:'center'
      }}>
        <div>
          <div style={{ fontSize:18, fontWeight:700, color:'#0F172A' }}>Export Reports</div>
          <div style={{ fontSize:13, color:'#64748B', marginTop:4 }}>Download detailed reports in your preferred format</div>
        </div>
        <img src="https://img.icons8.com/pulsar-color/48/organization.png" width="48" height="48" alt="" />
      </div>

      {/* Format selector */}
      <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:20, flexWrap:'wrap' }}>
        <div style={{ fontSize:13, fontWeight:600, color:'#475569', marginRight:4 }}>Export Format:</div>
        <div style={{ display:'flex', gap:10 }}>
          {[
            { id:'csv',  label:'CSV',          sub:'Comma values' },
            { id:'xlsx', label:'Excel (XLSX)', sub:'Spreadsheet' },
            { id:'pdf',  label:'PDF',          sub:'Document' },
          ].map(f => {
            const active = exportFormat === f.id;
            return (
              <button key={f.id} onClick={() => setExportFormat(f.id)} style={{
                width:130, height:60, borderRadius:12, cursor:'pointer',
                border: active ? '1px solid #BD1313' : '1px solid #E2E8F0',
                background: active ? '#BD1313' : '#fff',
                color: active ? '#fff' : '#475569',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                boxShadow: active ? '0 4px 12px rgba(189,19,19,0.20)' : 'none',
                transition:'all .2s'
              }}>
                <div style={{ fontSize:12, fontWeight:700 }}>{f.label}</div>
                <div style={{ fontSize:10, fontWeight:500, opacity:0.85, marginTop:2 }}>{f.sub}</div>
              </button>
            );
          })}
        </div>
        <div style={{
          fontSize:11, color:'#94A3B8', maxWidth:280,
          marginLeft:'auto', textAlign:'right', lineHeight:1.5
        }}>
          All exports are scoped to your current date filter and role access
        </div>
      </div>

      {/* Category grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:20 }}>
        {EXPORT_CATEGORIES.map(cat => {
          const selected = exportCategory === cat.id;
          const locked = cat.id === 'location' && currentRole !== 'superadmin';
          return (
            <div key={cat.id} onClick={() => {
              if (locked) { toast('Location Report is restricted to Super Admin'); return; }
              setExportCategory(cat.id);
            }} style={{
              background: selected ? '#FDF2F2' : '#fff',
              border: selected ? '2px solid #BD1313' : '1px solid #E2E8F0',
              borderRadius:16, padding:20,
              cursor: locked ? 'not-allowed' : 'pointer',
              position:'relative', overflow:'hidden',
              transition:'all .2s',
              opacity: locked ? 0.6 : 1
            }}
            onMouseEnter={(e) => { if (!locked && !selected) { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,23,42,0.10)'; } }}
            onMouseLeave={(e) => { if (!locked && !selected) { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; } }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:cat.strip }}></div>
              {cat.tag && (
                <span style={{
                  position:'absolute', top:12, right:12,
                  background: cat.tag === 'Most Popular' ? '#FEF3C7' : '#FDF2F2',
                  color: cat.tag === 'Most Popular' ? '#D97706' : '#BD1313',
                  fontSize:10, fontWeight:700,
                  borderRadius:9999, padding:'2px 8px'
                }}>{cat.tag}</span>
              )}
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                <img src={`https://img.icons8.com/pulsar-color/48/${cat.icon}.png`} width="36" height="36" alt="" />
                {selected && (
                  <span style={{
                    color:'#BD1313', fontSize:18, fontWeight:700,
                    marginLeft:'auto'
                  }}>✓</span>
                )}
              </div>
              <div style={{ fontSize:15, fontWeight:700, color:'#0F172A' }}>{cat.name}</div>
              <div style={{ fontSize:12, color:'#64748B', marginTop:4, lineHeight:1.5 }}>{cat.desc}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:12 }}>
                {cat.includes.map(inc => (
                  <div key={inc} style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ width:4, height:4, borderRadius:'50%', background:'#BD1313' }}></span>
                    <span style={{ fontSize:11, color:'#475569' }}>{inc}</span>
                  </div>
                ))}
              </div>
              {locked && (
                <div style={{
                  position:'absolute', inset:0,
                  background:'rgba(241,245,249,0.85)',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6
                }}>
                  <Lock size={20} color="#64748B" />
                  <div style={{ fontSize:12, fontWeight:700, color:'#475569' }}>Super Admin Only</div>
                </div>
              )}
            </div>
          );
        })}

        {/* Custom card */}
        <div onClick={() => toast('Custom reports coming soon')} style={{
          background:'linear-gradient(135deg,#F8FAFC,#F1F5F9)',
          border:'2px dashed #CBD5E1', borderRadius:16, padding:20,
          cursor:'pointer', textAlign:'center',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'
        }}>
          <div style={{
            width:36, height:36, borderRadius:'50%', background:'#E2E8F0',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#64748B', fontSize:24, fontWeight:300, marginBottom:10
          }}>+</div>
          <div style={{ fontSize:14, fontWeight:600, color:'#475569' }}>Custom Report</div>
          <div style={{ fontSize:12, color:'#94A3B8', marginTop:4 }}>Select specific fields and filters</div>
          <span style={{
            background:'#fff', color:'#94A3B8',
            fontSize:10, fontWeight:700,
            borderRadius:9999, padding:'2px 10px',
            border:'1px solid #E2E8F0',
            marginTop:10
          }}>COMING SOON</span>
        </div>
      </div>

      {/* Config + summary */}
      <div style={{
        background:'#fff', border:'1px solid #E2E8F0', borderRadius:16,
        padding:24, display:'flex', gap:24, alignItems:'flex-start',
        marginBottom:20, flexWrap:'wrap'
      }}>
        <div style={{ flex:'1 1 380px', minWidth:320 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#0F172A', marginBottom:16 }}>Report Options</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:6 }}>Date Range</div>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={selectStyle}>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:6 }}>Branch</div>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                disabled={currentRole !== 'superadmin'}
                style={{...selectStyle, opacity: currentRole !== 'superadmin' ? 0.5 : 1}}>
                <option>All Branches</option>
                <option>Mumbai HQ</option>
                <option>Delhi Branch</option>
                <option>Bangalore Office</option>
                <option>Chennai Hub</option>
                <option>Pune Office</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:6 }}>Department</div>
              <select value={dept} onChange={e => setDept(e.target.value)} style={selectStyle}>
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Operations</option>
                <option>Marketing</option>
                <option>Design & Product</option>
                <option>Finance & HR</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:6 }}>Include</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {[
                  { k:'employee',   l:'Employee Details' },
                  { k:'attendance', l:'Attendance Data' },
                  { k:'balance',    l:'Leave Balance' },
                ].map(opt => (
                  <label key={opt.k} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:13, color:'#475569' }}>
                    <input
                      type="checkbox"
                      checked={includes[opt.k]}
                      onChange={e => setIncludes(s => ({ ...s, [opt.k]: e.target.checked }))}
                      style={{ accentColor:'#BD1313', width:15, height:15, cursor:'pointer' }}
                    />
                    {opt.l}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          width:300, background:'#F8FAFC', borderRadius:12, padding:20,
          border:'1px solid #E2E8F0'
        }}>
          <div style={{ fontSize:13, fontWeight:600, color:'#0F172A', marginBottom:14 }}>Export Summary</div>
          {[
            { k:'Report Type', v: selectedCat ? selectedCat.name : '—' },
            { k:'Format', v: exportFormat.toUpperCase(), badge:true },
            { k:'Date Range', v: dateRange },
            { k:'Branch', v: branch },
            { k:'Est. Rows', v:'~847 employees' },
            { k:'Est. File Size', v:'~124 KB' },
          ].map((row,i) => (
            <div key={row.k} style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'8px 0',
              borderBottom: i === 5 ? 'none' : '1px solid #F1F5F9'
            }}>
              <div style={{ fontSize:12, color:'#64748B' }}>{row.k}</div>
              {row.badge ? (
                <span style={{
                  background: selectedFmtBadge.bg, color: selectedFmtBadge.color,
                  fontSize:11, fontWeight:700,
                  borderRadius:6, padding:'2px 8px'
                }}>{row.v}</span>
              ) : (
                <div style={{ fontSize:12, fontWeight:600, color:'#0F172A', textAlign:'right', maxWidth:160 }}>{row.v}</div>
              )}
            </div>
          ))}
          <button onClick={() => toast(`Preparing ${exportFormat.toUpperCase()} report…`)} style={{
            width:'100%', height:44, marginTop:16,
            background:'#BD1313', color:'#fff', border:'none',
            borderRadius:10, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            fontSize:14, fontWeight:700,
            boxShadow:'0 4px 12px rgba(189,19,19,0.25)'
          }}>
            <Download size={16} color="#fff" />
            Download Report
          </button>
          <div style={{ fontSize:10, color:'#94A3B8', textAlign:'center', marginTop:10, lineHeight:1.5 }}>
            Reports are generated securely and scoped to your access level
          </div>
        </div>
      </div>

      {/* Recent exports */}
      <div style={{ background:'#fff', border:'1px solid #E2E8F0', borderRadius:16, overflow:'hidden' }}>
        <div style={{
          padding:'14px 20px', borderBottom:'1px solid #E2E8F0',
          display:'flex', justifyContent:'space-between', alignItems:'center'
        }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>Recent Exports</div>
          <div style={{ fontSize:12, color:'#94A3B8' }}>Last 5 exports</div>
        </div>
        <div>
          <div style={{
            display:'grid',
            gridTemplateColumns:'2fr 100px 1.5fr 1.4fr 110px 80px',
            background:'#F8FAFC', height:44, alignItems:'center',
            padding:'0 20px', borderBottom:'1px solid #E2E8F0'
          }}>
            {['Report Name','Format','Date','Generated By','Status','Actions'].map(h => (
              <div key={h} style={{
                fontSize:11, fontWeight:700, color:'#64748B',
                textTransform:'uppercase', letterSpacing:'0.6px'
              }}>{h}</div>
            ))}
          </div>
          {RECENT_EXPORTS.map((r,i) => {
            const fb = FORMAT_BADGE[r.format];
            return (
              <div key={i} style={{
                display:'grid',
                gridTemplateColumns:'2fr 100px 1.5fr 1.4fr 110px 80px',
                height:52, alignItems:'center',
                padding:'0 20px',
                borderBottom: i === RECENT_EXPORTS.length-1 ? 'none' : '1px solid #F1F5F9',
                fontSize:13, color:'#0F172A'
              }}>
                <div style={{ fontWeight:600 }}>{r.name}</div>
                <div>
                  <span style={{
                    background:fb.bg, color:fb.color,
                    fontSize:11, fontWeight:700,
                    borderRadius:6, padding:'2px 8px'
                  }}>{r.format}</span>
                </div>
                <div style={{ fontSize:12, color:'#64748B' }}>{r.date}</div>
                <div style={{ fontSize:12, color:'#475569' }}>{r.by}</div>
                <div>
                  <span style={{
                    background:'#DCFCE7', color:'#16A34A',
                    fontSize:11, fontWeight:700,
                    borderRadius:6, padding:'3px 9px',
                    display:'inline-flex', alignItems:'center', gap:4
                  }}>
                    <span style={{ width:5, height:5, borderRadius:'50%', background:'#16A34A' }}></span>
                    Completed
                  </span>
                </div>
                <div>
                  <button onClick={() => toast(`Downloading ${r.name}`)} style={{
                    width:30, height:30, borderRadius:8,
                    background:'#F8FAFC', border:'1px solid #E2E8F0',
                    cursor:'pointer',
                    display:'inline-flex', alignItems:'center', justifyContent:'center'
                  }}>
                    <Download size={14} color="#64748B" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const selectStyle = {
  width:'100%', height:36,
  border:'1px solid #E2E8F0', borderRadius:8,
  padding:'0 10px',
  fontFamily:'Poppins', fontSize:13, color:'#0F172A',
  background:'#fff', cursor:'pointer', outline:'none'
};

Object.assign(window, { TrendsScreen, LiveStatusScreen, ExportScreen });
