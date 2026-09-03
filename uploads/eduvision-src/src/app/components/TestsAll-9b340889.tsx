import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Flag, CheckCircle, XCircle, AlertTriangle, Lightbulb, X } from 'lucide-react';

interface TestsProps {
  screen: string;
  setScreen: (screen: string) => void;
  CircularProgress: any;
  showToast: (message: string) => void;
  showXPToast: (message: string) => void;
}

const testModules = [
  {id:'math', name:'Mathematics', icon:'https://img.icons8.com/3d-fluency/100/calculator.png', color:'#BD1313', bg:'#FFF1F2', lastScore:79, totalTests:5},
  {id:'english', name:'English', icon:'https://img.icons8.com/3d-fluency/100/open-book.png', color:'#16A34A', bg:'#F0FDF4', lastScore:88, totalTests:3},
  {id:'aptitude', name:'Aptitude', icon:'https://img.icons8.com/3d-fluency/100/brain.png', color:'#D97706', bg:'#FFFBEB', lastScore:52, totalTests:4},
  {id:'programming', name:'Programming', icon:'https://img.icons8.com/3d-fluency/100/source-code.png', color:'#2563EB', bg:'#EFF6FF', lastScore:71, totalTests:2},
  {id:'science', name:'Science', icon:'https://img.icons8.com/3d-fluency/100/test-tube.png', color:'#7C3AED', bg:'#FAF5FF', lastScore:65, totalTests:3},
  {id:'gk', name:'General Knowledge', icon:'https://img.icons8.com/3d-fluency/100/globe.png', color:'#0891B2', bg:'#ECFEFF', lastScore:74, totalTests:1}
];

const testHistory = [
  {id:'t1', subject:'Mathematics', score:79, date:'Mar 17', duration:'28 min', totalQ:30, correct:24, incorrect:4, skipped:2},
  {id:'t2', subject:'English', score:88, date:'Mar 15', duration:'22 min', totalQ:25, correct:22, incorrect:2, skipped:1},
  {id:'t3', subject:'Aptitude', score:52, date:'Mar 13', duration:'35 min', totalQ:40, correct:21, incorrect:12, skipped:7},
  {id:'t4', subject:'Programming', score:71, date:'Mar 11', duration:'30 min', totalQ:25, correct:18, incorrect:5, skipped:2},
  {id:'t5', subject:'Science', score:65, date:'Mar 10', duration:'25 min', totalQ:30, correct:20, incorrect:7, skipped:3}
];

const sampleQuestions = [
  {id:1, subject:'Mathematics', question:'If a train travels 360 km in 4 hours, what is its average speed in km/h?', options:['80','90','100','120'], correct:1, difficulty:'easy', explanation:'Speed = Distance/Time = 360/4 = 90 km/h'},
  {id:2, subject:'Mathematics', question:'What is the value of 15% of 240?', options:['30','36','40','42'], correct:1, difficulty:'easy', explanation:'15% of 240 = (15/100) × 240 = 36'},
  {id:3, subject:'Mathematics', question:'A rectangle has length 12cm and width 8cm. What is its area?', options:['80 cm²','96 cm²','100 cm²','120 cm²'], correct:1, difficulty:'medium', explanation:'Area = length × width = 12 × 8 = 96 cm²'},
  {id:4, subject:'Mathematics', question:'If 3x + 7 = 22, what is the value of x?', options:['3','4','5','6'], correct:2, difficulty:'medium', explanation:'3x = 22 - 7 = 15, so x = 15/3 = 5'},
  {id:5, subject:'Mathematics', question:'What is the LCM of 12 and 18?', options:['24','36','48','72'], correct:1, difficulty:'medium', explanation:'LCM(12,18) = 36'},
  {id:6, subject:'Mathematics', question:'A circle has radius 7cm. What is its circumference? (π = 22/7)', options:['22 cm','44 cm','66 cm','88 cm'], correct:1, difficulty:'hard', explanation:'Circumference = 2πr = 2 × 22/7 × 7 = 44 cm'},
  {id:7, subject:'Mathematics', question:'If A = {1,2,3} and B = {2,3,4}, what is A∩B?', options:['{1,2,3,4}','{2,3}','{1,4}','{1,2,3}'], correct:1, difficulty:'hard', explanation:'Intersection contains elements in both sets: {2,3}'},
  {id:8, subject:'Mathematics', question:'What is the simple interest on ₹5000 at 8% per annum for 3 years?', options:['₹1000','₹1200','₹1500','₹2000'], correct:1, difficulty:'hard', explanation:'SI = (P × R × T)/100 = (5000 × 8 × 3)/100 = ₹1200'},
  {id:9, subject:'Mathematics', question:'Two numbers are in ratio 3:5. If their sum is 96, find the larger number.', options:['36','48','60','72'], correct:2, difficulty:'hard', explanation:'3x + 5x = 96, 8x = 96, x = 12. Larger = 5x = 60'},
  {id:10, subject:'Mathematics', question:'What is the probability of getting a head when a fair coin is tossed?', options:['1/4','1/3','1/2','2/3'], correct:2, difficulty:'easy', explanation:'P(Head) = 1/2 = 0.5'}
];

export function Tests({ screen, setScreen, CircularProgress, showToast, showXPToast }: TestsProps) {
  const [config, setConfig] = useState({ subject: 'Mathematics', difficulty: 'mixed', questionCount: 10, timeLimit: 15, types: ['mcq'], passPercentage: 60 });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [flagged, setFlagged] = useState<number[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [testMode, setTestMode] = useState('subject');
  const [specificTopic, setSpecificTopic] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [questionSections, setQuestionSections] = useState([
    {type:'MCQ', count:5, enabled:true},
    {type:'True/False', count:2, enabled:true},
    {type:'Single Choice', count:0, enabled:false},
    {type:'Short Answer', count:0, enabled:false},
    {type:'Long Answer', count:0, enabled:false}
  ]);
  const [passPercentage, setPassPercentage] = useState(60);

  // Timer
  useEffect(() => {
    if (screen === 'tests-taking') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowSubmitModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [screen]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2,'0')}`;
  };

  const toggleFlag = () => {
    if (flagged.includes(currentQ)) {
      setFlagged(flagged.filter(i => i !== currentQ));
    } else {
      setFlagged([...flagged, currentQ]);
    }
  };

  const calculateScore = () => {
    const correct = Object.entries(answers).filter(([qIndex, ansIndex]) => sampleQuestions[parseInt(qIndex)]?.correct === ansIndex).length;
    return Math.round((correct / sampleQuestions.length) * 100);
  };

  const getCorrectCount = () => Object.entries(answers).filter(([qIndex, ansIndex]) => sampleQuestions[parseInt(qIndex)]?.correct === ansIndex).length;
  const getIncorrectCount = () => Object.entries(answers).filter(([qIndex, ansIndex]) => sampleQuestions[parseInt(qIndex)]?.correct !== ansIndex).length;
  const getSkippedCount = () => sampleQuestions.length - Object.keys(answers).length;

  const score = calculateScore();
  const correctCount = getCorrectCount();
  const incorrectCount = getIncorrectCount();
  const skippedCount = getSkippedCount();

  // ALL 7 SCREENS - Complete implementation
  
  // Screen 1 stays as is in the original Tests.tsx
  if (screen === 'tests') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter" style={{fontFamily: 'var(--font-body)'}}>
      <div style={{height:'56px', flexShrink:0, background:'white', borderBottom:'1px solid #E2E8F0', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <div style={{width:'36px', height:'36px', borderRadius:'10px', background:'#FFFBEB', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png" width="22" height="22" alt="" />
          </div>
          <div>
            <div style={{fontFamily:'var(--font-display)', fontSize:'20px', fontWeight:700, color:'#0F172A'}}>Test Preparation 📝</div>
            <div style={{fontFamily:'var(--font-body)', fontSize:'12px', color:'#94A3B8'}}>Practice. Analyze. Improve.</div>
          </div>
        </div>
        <div style={{display:'flex', gap:'8px'}}>
          <span style={{background:'#F1F5F9', color:'#64748B', border:'1px solid #E2E8F0', fontSize:'11px', fontWeight:600, padding:'4px 12px', borderRadius:9999}}>12 Tests</span>
          <span style={{background:'#FEF3C7', color:'#D97706', border:'1px solid #FCD34D', fontSize:'11px', fontWeight:600, padding:'4px 12px', borderRadius:9999}}>74% Avg</span>
        </div>
      </div>
      <div style={{flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', flexDirection:'column', gap:'16px'}} className="inner-scroll">
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
          {[{val:'12',label:'TESTS TAKEN',icon:'https://img.icons8.com/3d-fluency/100/bookmark-book.png',color:'#D97706',bg:'#FFFBEB'},{val:'74%',label:'AVG SCORE',icon:'https://img.icons8.com/3d-fluency/100/goal.png',color:'#16A34A',bg:'#F0FDF4'},{val:'88%',label:'BEST SCORE',icon:'https://img.icons8.com/3d-fluency/100/trophy.png',color:'#BD1313',bg:'#FFF1F2'},{val:'4.2h',label:'TOTAL TIME',icon:'https://img.icons8.com/3d-fluency/100/lightning-bolt.png',color:'#2563EB',bg:'#EFF6FF'}].map((stat,i)=>(
            <div key={i} style={{height:'80px',background:`linear-gradient(135deg, ${stat.bg}, white)`,border:'1px solid #E2E8F0',borderRadius:'16px',padding:'14px 16px',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:stat.color}}/>
              <img src={stat.icon} width="24" height="24" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'#0F172A',marginTop:'4px'}}>{stat.val}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8'}}>{stat.label}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setScreen('tests-create')} style={{width:'100%',height:'56px',background:'linear-gradient(135deg, #D97706, #B45309)',borderRadius:'16px',border:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',cursor:'pointer',boxShadow:'0 4px 16px rgba(217,119,6,0.3)'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(217,119,6,0.4)'}} onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 16px rgba(217,119,6,0.3)'}}>
          <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png" width="28" height="28" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',background:'transparent'}}/>
          <div style={{textAlign:'left'}}><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'white'}}>Create New Test +</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'rgba(255,255,255,0.75)'}}>AI generates questions for you</div></div>
        </button>
        <div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}><div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Practice by Subject 📚</div></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'12px'}}>
          {testModules.map(m=>(
            <div key={m.id} onClick={()=>{setConfig({...config,subject:m.name});setScreen('tests-create')}} style={{height:'90px',background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'14px 16px',cursor:'pointer',display:'flex',alignItems:'center',gap:'12px'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 20px rgba(0,0,0,0.08)';e.currentTarget.style.borderColor=m.color}} onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='#E2E8F0'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'12px',background:m.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><img src={m.icon} width="24" height="24" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/></div>
              <div style={{flex:1}}><div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{m.name}</div><div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'4px'}}><span style={{background:m.lastScore>=75?'#DCFCE7':m.lastScore>=50?'#FEF3C7':'#FEF2F2',color:m.lastScore>=75?'#16A34A':m.lastScore>=50?'#D97706':'#DC2626',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'2px 8px'}}>{m.lastScore}%</span><span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>· {m.totalTests} tests</span></div></div>
            </div>
          ))}
        </div></div>
        <div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}><div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Recent Tests 📋</div></div>
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {testHistory.map(t=>(
            <div key={t.id} onClick={()=>setScreen('tests-score')} style={{height:'64px',background:'white',border:'1px solid #E2E8F0',borderRadius:'14px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer'}} onMouseEnter={(e)=>{e.currentTarget.style.borderColor='#FCD34D';e.currentTarget.style.background='#FFFBEB'}} onMouseLeave={(e)=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.background='white'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',border:`2px solid ${t.score>=75?'#16A34A':t.score>=50?'#D97706':'#DC2626'}`,background:t.score>=75?'#DCFCE7':t.score>=50?'#FFFBEB':'#FEF2F2',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:'13px',fontWeight:800,color:t.score>=75?'#16A34A':t.score>=50?'#D97706':'#DC2626',flexShrink:0}}>{t.score}%</div>
              <div style={{flex:1}}><div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{t.subject}</div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>{t.date} · {t.duration} · {t.totalQ} questions</div></div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'4px'}}><div style={{display:'flex',gap:'6px'}}><span style={{background:'#DCFCE7',color:'#16A34A',fontSize:'10px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>✓{t.correct}</span><span style={{background:'#FEF2F2',color:'#DC2626',fontSize:'10px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>✗{t.incorrect}</span></div><ChevronRight size={16} color="#94A3B8"/></div>
            </div>
          ))}
        </div></div>
      </div>
    </div>;
  }

  // Screen 2: Create Test
  if (screen === 'tests-create') {
    const totalQuestions = questionSections.filter(s=>s.enabled).reduce((sum,s)=>sum+s.count,0);

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('tests')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Create Test 🎯</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Configure your practice test</div></div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'680px',margin:'0 auto',width:'100%',display:'flex',flexDirection:'column',gap:'20px'}}>

          {/* Test Mode Selector */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'10px'}}>Choose Test Mode</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
              {[
                {id:'subject',icon:'📚',title:'Subject Based',desc:'Choose from our subject library'},
                {id:'topic',icon:'🎯',title:'Topic Specific',desc:'Enter any specific topic'},
                {id:'jd',icon:'💼',title:'JD Assessment',desc:'Paste job description for targeted test',popular:true}
              ].map(mode => (
                <div key={mode.id} onClick={()=>setTestMode(mode.id)} style={{background:testMode===mode.id?'#FFFBEB':'white',border:testMode===mode.id?'2px solid #FCD34D':'1.5px solid #E2E8F0',borderRadius:14,padding:'14px 16px',cursor:'pointer',position:'relative',transition:'all 0.2s'}}>
                  {mode.popular && <div style={{position:'absolute',top:0,right:0,background:'#FEF3C7',color:'#D97706',fontFamily:'var(--font-body)',fontSize:10,fontWeight:700,borderRadius:'0 14px 0 10px',padding:'3px 8px'}}>Popular</div>}
                  <div style={{fontSize:32,marginBottom:8}}>{mode.icon}</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,color:'#0F172A',marginBottom:4}}>{mode.title}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#94A3B8',lineHeight:1.4}}>{mode.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Mode */}
          {testMode === 'subject' && (
            <>
              <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>SELECT SUBJECT</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'8px'}}>
                  {testModules.map(m=>(
                    <div key={m.id} onClick={()=>setConfig({...config,subject:m.name})} style={{height:'52px',background:config.subject===m.name?m.bg:'white',border:config.subject===m.name?`2px solid ${m.color}`:'1.5px solid #E2E8F0',borderRadius:'12px',padding:'8px 12px',display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
                      <img src={m.icon} width="20" height="20" alt=""/><span style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Specific Topic (Optional) */}
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Specific Topic (Optional)</div>
                <input value={specificTopic} onChange={(e)=>setSpecificTopic(e.target.value)} placeholder="e.g. Quadratic Equations, Probability..." style={{width:'100%',height:44,border:'1.5px solid #E2E8F0',borderRadius:12,padding:'0 16px',fontFamily:'var(--font-body)',fontSize:14,color:'#0F172A'}}/>
              </div>
            </>
          )}

          {/* Topic Mode */}
          {testMode === 'topic' && (
            <>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Enter Your Topic</div>
                <input value={specificTopic} onChange={(e)=>setSpecificTopic(e.target.value)} placeholder="e.g. Time and Work, Data Structures..." style={{width:'100%',height:48,border:'1.5px solid #E2E8F0',borderRadius:12,padding:'0 16px',fontFamily:'var(--font-body)',fontSize:15,color:'#0F172A',fontWeight:600}}/>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',marginBottom:'8px'}}>Suggested Topics</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {['Quadratic Equations','Probability','Binary Trees','Sorting Algorithms','Profit & Loss','Grammar'].map(topic => (
                    <div key={topic} onClick={()=>setSpecificTopic(topic)} style={{background:'#F1F5F9',border:'1px solid #E2E8F0',borderRadius:9999,padding:'6px 14px',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,color:'#475569',cursor:'pointer',transition:'all 0.2s'}}
                      onMouseEnter={(e)=>{e.currentTarget.style.background='#FFFBEB';e.currentTarget.style.borderColor='#FCD34D';e.currentTarget.style.color='#D97706';}}
                      onMouseLeave={(e)=>{e.currentTarget.style.background='#F1F5F9';e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.color='#475569';}}
                    >{topic}</div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* JD Mode */}
          {testMode === 'jd' && (
            <>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Paste Job Description</div>
                <textarea value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} placeholder="Paste the complete job description here. We will analyze requirements and generate targeted questions to assess your fit for this role..." style={{width:'100%',minHeight:120,border:'1.5px solid #E2E8F0',borderRadius:12,padding:12,fontFamily:'var(--font-body)',fontSize:14,color:'#0F172A',resize:'none',lineHeight:1.6}}/>
              </div>
              <button onClick={()=>setTimeout(()=>showToast("Analyzing JD... Generating questions! 🎯"),0)} style={{width:'100%',height:44,background:'linear-gradient(135deg, #D97706, #B45309)',color:'white',border:'none',borderRadius:12,fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,cursor:'pointer'}}>
                ✨ Analyze JD & Generate Questions
              </button>
            </>
          )}

          {/* Difficulty Level */}
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Difficulty Level</div>
          <div style={{display:'flex',gap:'8px'}}>
            {[{id:'beginner',label:'Beginner',color:'#16A34A',bg:'#DCFCE7'},{id:'intermediate',label:'Intermediate',color:'#D97706',bg:'#FEF3C7'},{id:'advanced',label:'Advanced',color:'#DC2626',bg:'#FEF2F2'},{id:'mixed',label:'Mixed',color:'#BD1313',bg:'#FDF2F2'}].map(d=>(
              <button key={d.id} onClick={()=>setConfig({...config,difficulty:d.id})} style={{flex:1,height:'40px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,border:config.difficulty===d.id?`1.5px solid ${d.color}`:'1.5px solid #E2E8F0',background:config.difficulty===d.id?d.bg:'white',color:config.difficulty===d.id?d.color:'#475569'}}>{d.label}</button>
            ))}
          </div></div>
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>DIFFICULTY LEVEL</div>
          <div style={{display:'flex',gap:'8px'}}>
            {['easy','medium','hard','mixed'].map(d=>(
              <button key={d} onClick={()=>setConfig({...config,difficulty:d})} style={{height:'40px',padding:'0 20px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,border:config.difficulty===d?(d==='easy'?'1.5px solid #16A34A':d==='medium'?'1.5px solid #D97706':d==='hard'?'1.5px solid #DC2626':'1.5px solid #BD1313'):'1.5px solid #E2E8F0',background:config.difficulty===d?(d==='easy'?'#DCFCE7':d==='medium'?'#FEF3C7':d==='hard'?'#FEF2F2':'#FDF2F2'):'white',color:config.difficulty===d?(d==='easy'?'#16A34A':d==='medium'?'#D97706':d==='hard'?'#DC2626':'#BD1313'):'#475569'}}>{d.charAt(0).toUpperCase()+d.slice(1)}</button>
            ))}
          </div></div>
          {/* Pass Percentage */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Pass Percentage</div>
            <div style={{display:'flex',gap:'8px'}}>
              {[40,50,60,70,80].map(p=>(
                <button key={p} onClick={()=>setConfig({...config,passPercentage:p})} style={{flex:1,height:'36px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,background:config.passPercentage===p?'#D97706':'#F1F5F9',color:config.passPercentage===p?'white':'#475569',border:config.passPercentage===p?'1.5px solid #D97706':'1.5px solid #E2E8F0'}}>{p}%</button>
              ))}
            </div>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'#64748B',marginTop:6}}>Students need to score {config.passPercentage}% to pass</div>
          </div>

          {/* Question Format Builder */}
          <div>
            <div style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:700,color:'#0F172A',marginBottom:4}}>Question Format</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'#94A3B8',marginBottom:12}}>Build your question distribution</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,color:'#D97706',marginBottom:8}}>Total: {totalQuestions} questions</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {questionSections.map((section,idx) => (
                <div key={section.type} style={{height:56,background:'white',border:'1px solid #E2E8F0',borderRadius:12,padding:'0 14px',display:'flex',alignItems:'center',gap:12}}>
                  <div onClick={()=>setQuestionSections(prev=>prev.map((s,i)=>i===idx?{...s,enabled:!s.enabled}:s))} style={{width:18,height:18,borderRadius:4,border:section.enabled?'2px solid #D97706':'2px solid #CBD5E1',background:section.enabled?'#D97706':'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
                    {section.enabled && <CheckCircle size={12} color="white"/>}
                  </div>
                  <div style={{flex:1,fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,color:section.enabled?'#0F172A':'#94A3B8'}}>{section.type}</div>
                  {section.enabled && (
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <button onClick={()=>section.count>0&&setQuestionSections(prev=>prev.map((s,i)=>i===idx?{...s,count:s.count-1}:s))} style={{width:24,height:24,borderRadius:'50%',background:'#F1F5F9',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:16,fontWeight:600,color:'#475569'}}>-</button>
                      <div style={{width:20,textAlign:'center',fontFamily:'var(--font-display)',fontSize:16,fontWeight:700,color:'#D97706'}}>{section.count}</div>
                      <button onClick={()=>section.count<7&&setQuestionSections(prev=>prev.map((s,i)=>i===idx?{...s,count:s.count+1}:s))} style={{width:24,height:24,borderRadius:'50%',background:'#F1F5F9',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:16,fontWeight:600,color:'#475569'}}>+</button>
                      <span style={{fontFamily:'var(--font-body)',fontSize:10,color:'#94A3B8'}}>Max 7</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>Time Limit</div>
          <div style={{display:'flex',gap:'8px'}}>
            {[5,10,15,20,30].map(t=>(
              <button key={t} onClick={()=>setConfig({...config,timeLimit:t})} style={{height:'40px',padding:'0 16px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,background:config.timeLimit===t?'#D97706':'#F1F5F9',color:config.timeLimit===t?'white':'#475569',border:config.timeLimit===t?'1.5px solid #D97706':'1.5px solid #E2E8F0'}}>{t} min</button>
            ))}
          </div></div>
          <div style={{background:'linear-gradient(135deg, #FFFBEB, white)',border:'1px solid #FCD34D',borderRadius:'16px',padding:'16px 20px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#D97706',marginBottom:'12px'}}>Test Summary</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              {(() => {
                const totalQ = questionSections.filter(s => s.enabled).reduce((sum, s) => sum + s.count, 0);
                const modeDisplay = testMode === 'subject' ? {l: specificTopic ? 'TOPIC' : 'SUBJECT', v: specificTopic || config.subject} : testMode === 'topic' ? {l: 'TOPIC', v: specificTopic || 'General'} : {l: 'TYPE', v: 'JD-Based'};
                const diffDisplay = config.difficulty.charAt(0).toUpperCase() + config.difficulty.slice(1);
                return [{l: modeDisplay.l, v: modeDisplay.v}, {l: 'DIFFICULTY', v: diffDisplay}, {l: 'QUESTIONS', v: totalQ}, {l: 'PASS', v: `${passPercentage}%`}, {l: 'TIME', v: `${config.timeLimit} min`}];
              })().map((it, i) => (
                <div key={`summary-${it.l}`}><div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8'}}>{it.l}</div><div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{it.v}</div></div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:'12px',marginTop:'8px'}}>
            <button onClick={()=>setScreen('tests-preview')} style={{flex:1,height:'48px',background:'transparent',border:'1.5px solid #FCD34D',color:'#D97706',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Preview Questions</button>
            <button onClick={()=>setScreen('tests-preview')} style={{flex:1.5,height:'48px',background:'linear-gradient(135deg, #D97706, #B45309)',border:'none',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,borderRadius:'12px',cursor:'pointer'}}>Generate Test</button>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 3: Test Preview
  if (screen === 'tests-preview') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('tests-create')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Test Preview 👀</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Review before starting</div></div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'680px',margin:'0 auto',width:'100%'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px',padding:'16px 20px',background:'linear-gradient(135deg, #FFFBEB, white)',border:'1px solid #FCD34D',borderRadius:'16px',marginBottom:'16px'}}>
            <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png" width="48" height="48" alt="" style={{filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',background:'transparent'}}/>
            <div style={{flex:1}}><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Mathematics Test 📝</div>
            <div style={{display:'flex',gap:'8px',marginTop:'6px',flexWrap:'wrap'}}>
              {[{t:'10 Questions',c:'#D97706',bg:'#FFFBEB',b:'#FCD34D'},{t:'15 Minutes',c:'#BD1313',bg:'#FDF2F2',b:'#F5BFBF'},{t:'Mixed',c:'#2563EB',bg:'#EFF6FF',b:'#BFDBFE'},{t:'MCQ',c:'#16A34A',bg:'#F0FDF4',b:'#86EFAC'}].map((ch,i)=>(
                <span key={i} style={{background:ch.bg,color:ch.c,border:`1px solid ${ch.b}`,fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>{ch.t}</span>
              ))}
            </div></div>
          </div>
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'16px 20px',marginBottom:'16px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'12px'}}>Instructions 📋</div>
            {['Each correct answer earns 1 mark','No negative marking for wrong answers','You can skip and return to questions','Timer starts when you click Start Test','Results are shown immediately after submission'].map((ins,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',height:'32px'}}><div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#DCFCE7',display:'flex',alignItems:'center',justifyContent:'center'}}><CheckCircle size={12} color="#16A34A"/></div><span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569'}}>{ins}</span></div>
            ))}
          </div>
          <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'12px'}}>Sample Questions 👇</div>
          {sampleQuestions.slice(0,3).map((q,idx)=>(
            <div key={q.id} style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'14px',padding:'16px',marginBottom:'10px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                <span style={{background:'#FFFBEB',color:'#D97706',border:'1px solid #FCD34D',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>Q{idx+1}</span>
                <span style={{background:q.difficulty==='easy'?'#DCFCE7':q.difficulty==='medium'?'#FEF3C7':'#FEF2F2',color:q.difficulty==='easy'?'#16A34A':q.difficulty==='medium'?'#D97706':'#DC2626',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:600,borderRadius:9999,padding:'2px 8px'}}>{q.difficulty}</span>
              </div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',lineHeight:1.6,marginTop:'10px'}}>{q.question}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'6px',marginTop:'12px'}}>
                {q.options.map((opt,oi)=>(
                  <div key={oi} style={{background:'#F8FAFF',border:'1px solid #E2E8F0',borderRadius:'8px',padding:'8px 12px',display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'white',border:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:'#94A3B8'}}>{String.fromCharCode(65+oi)}</div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569'}}>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',textAlign:'center',marginTop:'8px'}}>+ 7 more questions</div>
          <button onClick={()=>{setScreen('tests-taking');showToast("Test started! Good luck 🍀");showXPToast("+50 XP 🎉");setTimeLeft(config.timeLimit*60);setAnswers({});setFlagged([]);setCurrentQ(0)}} style={{width:'100%',height:'56px',background:'linear-gradient(135deg, #D97706, #B45309)',borderRadius:'16px',border:'none',fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'white',cursor:'pointer',boxShadow:'0 8px 24px rgba(217,119,6,0.35)',marginTop:'16px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <img src="https://img.icons8.com/3d-fluency/100/bookmark-book.png" width="24" height="24" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.2))'}}/>Start Test — {config.timeLimit} Minutes
          </button>
        </div>
      </div>
    </div>;
  }

  // Screen 4: Test Taking
  if (screen === 'tests-taking') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Mathematics Test</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Stay focused and do your best!</div></div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'6px 14px'}}>
            <Clock size={16} color="#DC2626"/><span style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:800,color:'#DC2626'}}>{formatTime(timeLeft)}</span>
          </div>
          <button onClick={()=>setShowSubmitModal(true)} style={{background:'#FEF2F2',color:'#DC2626',border:'1px solid #FECACA',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,borderRadius:'8px',padding:'6px 14px',cursor:'pointer'}}>End Test</button>
        </div>
      </div>
      <div style={{height:'4px',background:'#E2E8F0',position:'relative'}}><div style={{position:'absolute',top:0,left:0,height:'100%',background:'#D97706',width:`${((currentQ+1)/sampleQuestions.length)*100}%`,transition:'width 0.3s'}}/></div>
      <div style={{flex:1,display:'flex',overflow:'hidden'}}>
        <div style={{flex:1,padding:'24px',overflowY:'auto',display:'flex',flexDirection:'column',alignItems:'center'}} className="inner-scroll">
          <div style={{width:'100%',maxWidth:'720px'}}>
            <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'20px',padding:'24px',boxShadow:'0 4px 16px rgba(0,0,0,0.06)',marginBottom:'20px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <span style={{background:'#FFFBEB',color:'#D97706',border:'1px solid #FCD34D',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:700,borderRadius:9999,padding:'4px 12px'}}>Question {currentQ+1} of {sampleQuestions.length}</span>
                <button onClick={toggleFlag} style={{background:flagged.includes(currentQ)?'#FEF3C7':'transparent',border:flagged.includes(currentQ)?'1px solid #FCD34D':'1px solid #E2E8F0',borderRadius:'8px',padding:'6px 12px',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
                  <Flag size={14} color={flagged.includes(currentQ)?'#D97706':'#94A3B8'} fill={flagged.includes(currentQ)?'#D97706':'none'}/><span style={{fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,color:flagged.includes(currentQ)?'#D97706':'#94A3B8'}}>Flag</span>
                </button>
              </div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'20px',fontWeight:700,color:'#0F172A',lineHeight:1.5,marginBottom:'20px'}}>{sampleQuestions[currentQ].question}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {sampleQuestions[currentQ].options.map((opt,oi)=>(
                  <div key={oi} onClick={()=>setAnswers({...answers,[currentQ]:oi})} style={{background:answers[currentQ]===oi?'#FFFBEB':'white',border:answers[currentQ]===oi?'2px solid #D97706':'1.5px solid #E2E8F0',borderRadius:'12px',padding:'14px 16px',cursor:'pointer',display:'flex',alignItems:'center',gap:'12px',transition:'all 0.2s'}} onMouseEnter={(e)=>{if(answers[currentQ]!==oi){e.currentTarget.style.background='#F8FAFF';e.currentTarget.style.borderColor='#BFDBFE'}}} onMouseLeave={(e)=>{if(answers[currentQ]!==oi){e.currentTarget.style.background='white';e.currentTarget.style.borderColor='#E2E8F0'}}}>
                    <div style={{width:'28px',height:'28px',borderRadius:'50%',background:answers[currentQ]===oi?'#D97706':'white',border:answers[currentQ]===oi?'2px solid #D97706':'2px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:700,color:answers[currentQ]===oi?'white':'#94A3B8',flexShrink:0}}>{String.fromCharCode(65+oi)}</div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'15px',color:'#0F172A'}}>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',gap:'12px'}}>
              <button onClick={()=>{if(currentQ>0)setCurrentQ(currentQ-1)}} disabled={currentQ===0} style={{flex:0.8,height:'48px',background:currentQ===0?'#F1F5F9':'white',border:'1.5px solid #E2E8F0',color:currentQ===0?'#CBD5E1':'#475569',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:currentQ===0?'not-allowed':'pointer'}}>← Previous</button>
              <button onClick={()=>{if(currentQ<sampleQuestions.length-1)setCurrentQ(currentQ+1);else setShowSubmitModal(true)}} style={{flex:1,height:'48px',background:'linear-gradient(135deg, #D97706, #B45309)',border:'none',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,borderRadius:'12px',cursor:'pointer'}}>{currentQ<sampleQuestions.length-1?'Next →':'Submit Test'}</button>
            </div>
          </div>
        </div>
        <div style={{width:'260px',borderLeft:'1px solid #E2E8F0',padding:'20px 16px',overflowY:'auto',background:'#FAFAFA'}} className="inner-scroll">
          <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'12px'}}>QUESTION PALETTE</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5, 1fr)',gap:'8px'}}>
            {sampleQuestions.map((q,qi)=>(
              <button key={q.id} onClick={()=>setCurrentQ(qi)} style={{width:'40px',height:'40px',borderRadius:'8px',background:qi===currentQ?'#D97706':answers[qi]!==undefined?'#DCFCE7':'white',border:flagged.includes(qi)?'2px solid #D97706':'1px solid #E2E8F0',color:qi===currentQ?'white':answers[qi]!==undefined?'#16A34A':'#94A3B8',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:700,cursor:'pointer',position:'relative'}}>
                {qi+1}{flagged.includes(qi)&&<Flag size={8} color={qi===currentQ?'white':'#D97706'} fill={qi===currentQ?'white':'#D97706'} style={{position:'absolute',top:'2px',right:'2px'}}/>}
              </button>
            ))}
          </div>
          <div style={{marginTop:'16px',padding:'12px',background:'white',border:'1px solid #E2E8F0',borderRadius:'12px'}}>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',marginBottom:'8px'}}>PROGRESS</div>
            {[{l:'Answered',v:Object.keys(answers).length,c:'#16A34A'},{l:'Skipped',v:sampleQuestions.length-Object.keys(answers).length,c:'#94A3B8'},{l:'Flagged',v:flagged.length,c:'#D97706'}].map((s,si)=>(
              <div key={si} style={{display:'flex',justifyContent:'space-between',height:'28px',alignItems:'center',borderBottom:si<2?'1px solid #F1F5F9':'none'}}><span style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569'}}>{s.l}</span><span style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:800,color:s.c}}>{s.v}</span></div>
            ))}
          </div>
        </div>
      </div>
      {showSubmitModal&&<div style={{position:'fixed',inset:0,background:'rgba(15,23,42,0.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,backdropFilter:'blur(4px)'}} onClick={()=>setShowSubmitModal(false)}>
        <div onClick={(e)=>e.stopPropagation()} style={{background:'white',borderRadius:'20px',padding:'28px 32px',maxWidth:'480px',width:'90%',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'20px',fontWeight:700,color:'#0F172A'}}>Submit Test?</div>
            <button onClick={()=>setShowSubmitModal(false)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px'}}><X size={20} color="#94A3B8"/></button>
          </div>
          <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'#64748B',lineHeight:1.6,marginBottom:'20px'}}>You have answered <span style={{fontWeight:700,color:'#16A34A'}}>{Object.keys(answers).length}/{sampleQuestions.length}</span> questions. {sampleQuestions.length-Object.keys(answers).length>0&&`You still have ${sampleQuestions.length-Object.keys(answers).length} unanswered question(s).`}</div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <button onClick={()=>{setShowSubmitModal(false);setScreen('tests-score');showXPToast(score>=75?"+100 XP 🎉":"+50 XP")}} style={{width:'100%',height:'48px',background:'linear-gradient(135deg, #D97706, #B45309)',border:'none',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,borderRadius:'12px',cursor:'pointer'}}>Yes, Submit Test</button>
            <button onClick={()=>setShowSubmitModal(false)} style={{width:'100%',height:'44px',background:'transparent',border:'1.5px solid #E2E8F0',color:'#475569',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Continue Test</button>
          </div>
        </div>
      </div>}
    </div>;
  }

  // Screen 6: Score Overview
  if (screen === 'tests-score') {
    const passed = score >= config.passPercentage;
    const accuracy = Math.round((correctCount / sampleQuestions.length) * 100);
    const timeTaken = config.timeLimit - Math.floor(timeLeft / 60);
    const avgTimePerQ = Math.round(timeTaken * 60 / sampleQuestions.length);

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('tests')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Test Results 📊</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Mathematics · {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div></div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'32px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'1000px',margin:'0 auto',width:'100%'}}>

          {/* SECTION 1 — SCORE HERO */}
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <div style={{fontFamily:'Syne, var(--font-display)',fontSize:'64px',fontWeight:800,color:passed?'#16A34A':'#DC2626',lineHeight:1,marginBottom:'16px'}}>{score}%</div>
            <div style={{display:'inline-block',background:passed?'linear-gradient(135deg, #16A34A, #15803D)':'linear-gradient(135deg, #DC2626, #B91C1C)',color:'white',fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,borderRadius:9999,padding:'10px 32px',textTransform:'uppercase',letterSpacing:'1px',boxShadow:passed?'0 8px 24px rgba(22,163,74,0.25)':'0 8px 24px rgba(220,38,38,0.25)'}}>{passed?'PASSED ✓':'FAILED ✗'}</div>
          </div>

          {/* SECTION 2 — QUICK STATS */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'12px',marginBottom:'24px'}}>
            {[
              {label:'Accuracy',value:`${accuracy}%`,icon:'🎯',color:'#2563EB',bg:'#EFF6FF',border:'#BFDBFE'},
              {label:'Time Taken',value:`${timeTaken} min`,icon:'⏱️',color:'#D97706',bg:'#FFFBEB',border:'#FCD34D'},
              {label:'Questions',value:sampleQuestions.length,icon:'📝',color:'#7C3AED',bg:'#F5F3FF',border:'#DDD6FE'},
              {label:'Pass Threshold',value:`${config.passPercentage}%`,icon:'🎓',color:'#16A34A',bg:'#F0FDF4',border:'#86EFAC'}
            ].map((stat,i)=>(
              <div key={`stat-${stat.label}`} style={{background:'white',border:`1px solid ${stat.border}`,borderRadius:'16px',padding:'20px',textAlign:'center'}}>
                <div style={{fontSize:'28px',marginBottom:'8px'}}>{stat.icon}</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'#0F172A',marginBottom:'4px'}}>{stat.value}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#94A3B8',letterSpacing:'0.5px'}}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* SECTION 3 — ANSWER BREAKDOWN */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'12px',marginBottom:'24px'}}>
            {[
              {label:'Correct',value:correctCount,icon:CheckCircle,color:'#16A34A',bg:'#DCFCE7',border:'#86EFAC'},
              {label:'Wrong',value:incorrectCount,icon:XCircle,color:'#DC2626',bg:'#FEF2F2',border:'#FECACA'},
              {label:'Skipped',value:skippedCount,icon:AlertTriangle,color:'#94A3B8',bg:'#F1F5F9',border:'#E2E8F0'}
            ].map((item,i)=>{
              const Icon = item.icon;
              return <div key={`breakdown-${item.label}`} style={{background:item.bg,border:`2px solid ${item.border}`,borderRadius:'16px',padding:'24px',textAlign:'center'}}>
                <Icon size={32} color={item.color} style={{margin:'0 auto 12px'}}/>
                <div style={{fontFamily:'var(--font-display)',fontSize:'32px',fontWeight:800,color:item.color,marginBottom:'4px'}}>{item.value}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,color:item.color,textTransform:'uppercase',letterSpacing:'0.5px'}}>{item.label}</div>
              </div>
            })}
          </div>

          {/* SECTION 4 — RESULT SUMMARY */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'16px'}}>Result Summary</div>
            <div style={{display:'grid',gridTemplateColumns:'120px 1fr',gap:'12px 20px'}}>
              {[
                {label:'Subject',value:config.subject},
                {label:'Difficulty',value:config.difficulty.charAt(0).toUpperCase()+config.difficulty.slice(1)},
                {label:'Date',value:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})},
                {label:'Duration',value:`${timeTaken} minutes`},
                {label:'Score',value:`${score}%`},
                {label:'Result',value:passed?'PASSED':'FAILED',colored:true}
              ].map((row,i)=>(
                <React.Fragment key={`summary-row-${row.label}`}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#64748B'}}>{row.label}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:row.colored?700:600,color:row.colored?(passed?'#16A34A':'#DC2626'):'#0F172A'}}>{row.value}</div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* SECTION 5 — KEY METRICS */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Key Metrics</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'24px'}}>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Accuracy Rate</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'28px',fontWeight:800,color:'#0F172A'}}>{accuracy}%</div>
                <div style={{background:'#F1F5F9',borderRadius:'8px',height:'8px',marginTop:'12px',overflow:'hidden'}}>
                  <div style={{background:'linear-gradient(90deg, #2563EB, #1D4ED8)',height:'100%',width:`${accuracy}%`,transition:'width 0.5s ease'}}></div>
                </div>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Speed</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'28px',fontWeight:800,color:'#0F172A'}}>{avgTimePerQ}s<span style={{fontSize:'16px',color:'#94A3B8'}}>/Q</span></div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B',marginTop:'8px'}}>Average time per question</div>
              </div>
              <div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Difficulty Breakdown</div>
                <div style={{display:'flex',gap:'6px',marginTop:'10px'}}>
                  {[{d:'Easy',c:'#16A34A',w:40},{d:'Medium',c:'#D97706',w:45},{d:'Hard',c:'#DC2626',w:15}].map(diff=>(
                    <div key={`diff-${diff.d}`} style={{flex:diff.w,height:'24px',background:diff.c,borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'10px',fontWeight:700}}>{diff.w}%</div>
                  ))}
                </div>
                <div style={{display:'flex',gap:'8px',marginTop:'8px',fontSize:'10px'}}>
                  {[{d:'Easy',c:'#16A34A'},{d:'Med',c:'#D97706'},{d:'Hard',c:'#DC2626'}].map(l=>(
                    <div key={`label-${l.d}`} style={{display:'flex',alignItems:'center',gap:'4px'}}><div style={{width:'8px',height:'8px',borderRadius:'50%',background:l.c}}></div><span style={{color:'#64748B',fontFamily:'var(--font-body)',fontSize:'10px'}}>{l.d}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6 — PERFORMANCE ANALYSIS */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}}>
            <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Key Strengths 💪</div>
                <span style={{background:'#DCFCE7',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 10px'}}>3</span>
              </div>
              {['Strong problem-solving approach','Accurate calculations','Good time management'].map((s,si)=>(
                <div key={`strength-${si}`} style={{display:'flex',alignItems:'flex-start',gap:'10px',marginBottom:'12px',padding:'12px',background:'#F0FDF4',borderRadius:'10px'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#16A34A',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:700}}>✓</div>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5,fontWeight:500}}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Areas to Improve 🎯</div>
                <span style={{background:'#FEF3C7',color:'#D97706',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 10px'}}>2</span>
              </div>
              {['Review geometry concepts','Practice set theory problems'].map((s,si)=>(
                <div key={`improve-${si}`} style={{display:'flex',alignItems:'flex-start',gap:'10px',marginBottom:'12px',padding:'12px',background:'#FFFBEB',borderRadius:'10px'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#D97706',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'12px',fontWeight:700}}>→</div>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5,fontWeight:500}}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7 — SCORE VS THRESHOLD */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Score vs Pass Threshold</div>
            <div style={{display:'flex',gap:'16px',alignItems:'end'}}>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>Your Score</span>
                  <span style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:800,color:passed?'#16A34A':'#DC2626'}}>{score}%</span>
                </div>
                <div style={{background:'#F1F5F9',borderRadius:'10px',height:'40px',overflow:'hidden',position:'relative'}}>
                  <div style={{background:passed?'linear-gradient(90deg, #16A34A, #15803D)':'linear-gradient(90deg, #DC2626, #B91C1C)',height:'100%',width:`${score}%`,transition:'width 0.6s ease',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:'12px'}}>
                    <span style={{color:'white',fontSize:'14px',fontWeight:700}}>{score}%</span>
                  </div>
                </div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>Pass Mark</span>
                  <span style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:800,color:'#64748B'}}>{config.passPercentage}%</span>
                </div>
                <div style={{background:'#F1F5F9',borderRadius:'10px',height:'40px',overflow:'hidden',position:'relative'}}>
                  <div style={{background:'linear-gradient(90deg, #64748B, #475569)',height:'100%',width:`${config.passPercentage}%`,transition:'width 0.6s ease',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:'12px'}}>
                    <span style={{color:'white',fontSize:'14px',fontWeight:700}}>{config.passPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 8 — QUESTION REVIEW */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'16px'}}>Question Review</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(10, 1fr)',gap:'8px',marginBottom:'16px'}}>
              {sampleQuestions.map((q,qi)=>{
                const userAns=answers[qi];
                const isCorrect=userAns===q.correct;
                const isSkipped=userAns===undefined;
                return <div key={`q-indicator-${qi}`} style={{aspectRatio:'1',background:isSkipped?'#F1F5F9':isCorrect?'#DCFCE7':'#FEF2F2',border:`2px solid ${isSkipped?'#E2E8F0':isCorrect?'#16A34A':'#DC2626'}`,borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:700,color:isSkipped?'#94A3B8':isCorrect?'#16A34A':'#DC2626'}}>{qi+1}</div>
              })}
            </div>
            <button onClick={()=>setScreen('tests-review')} style={{width:'100%',height:'48px',background:'linear-gradient(135deg, #D97706, #B45309)',border:'none',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,borderRadius:'12px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>Review Answers <ChevronLeft size={18} style={{transform:'rotate(180deg)'}}/></button>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{display:'flex',gap:'12px'}}>
            <button onClick={()=>setScreen('tests-create')} style={{flex:1,height:'52px',background:'white',border:'1.5px solid #FCD34D',color:'#D97706',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Practice Again</button>
            <button onClick={()=>setScreen('tests')} style={{flex:1,height:'52px',background:'transparent',border:'1.5px solid #E2E8F0',color:'#94A3B8',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Back to Tests</button>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 7: Answer Review
  if (screen === 'tests-review') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('tests-score')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div style={{flex:1}}><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Answer Review 🔍</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Review all questions and answers</div></div>
        <div style={{display:'flex',gap:'6px'}}>
          {['all','correct','incorrect','skipped'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{height:'32px',padding:'0 12px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,background:filter===f?'#D97706':'#F1F5F9',color:filter===f?'white':'#64748B',border:'none'}}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'800px',margin:'0 auto',width:'100%',display:'flex',flexDirection:'column',gap:'16px'}}>
          {sampleQuestions.filter((q,qi)=>{
            if(filter==='all')return true;
            if(filter==='correct')return answers[qi]===q.correct;
            if(filter==='incorrect')return answers[qi]!==undefined&&answers[qi]!==q.correct;
            if(filter==='skipped')return answers[qi]===undefined;
            return true;
          }).map((q,qi)=>{
            const actualIndex=sampleQuestions.findIndex(sq=>sq.id===q.id);
            const userAns=answers[actualIndex];
            const isCorrect=userAns===q.correct;
            const isSkipped=userAns===undefined;
            return <div key={q.id} style={{background:'white',border:isSkipped?'1.5px solid #E2E8F0':isCorrect?'1.5px solid #86EFAC':'1.5px solid #FECACA',borderRadius:'20px',padding:'20px 24px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
                <span style={{background:isSkipped?'#F1F5F9':isCorrect?'#DCFCE7':'#FEF2F2',color:isSkipped?'#94A3B8':isCorrect?'#16A34A':'#DC2626',border:`1px solid ${isSkipped?'#E2E8F0':isCorrect?'#86EFAC':'#FECACA'}`,fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 12px'}}>Q{actualIndex+1}</span>
                <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                  {isSkipped?<span style={{background:'#F1F5F9',color:'#94A3B8',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>Skipped</span>:isCorrect?<span style={{background:'#DCFCE7',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'3px 10px',display:'flex',alignItems:'center',gap:'4px'}}><CheckCircle size={12}/>Correct</span>:<span style={{background:'#FEF2F2',color:'#DC2626',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'3px 10px',display:'flex',alignItems:'center',gap:'4px'}}><XCircle size={12}/>Incorrect</span>}
                  <span style={{background:q.difficulty==='easy'?'#DCFCE7':q.difficulty==='medium'?'#FEF3C7':'#FEF2F2',color:q.difficulty==='easy'?'#16A34A':q.difficulty==='medium'?'#D97706':'#DC2626',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:600,borderRadius:9999,padding:'2px 8px'}}>{q.difficulty}</span>
                </div>
              </div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'15px',fontWeight:600,color:'#0F172A',lineHeight:1.6,marginBottom:'16px'}}>{q.question}</div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'14px'}}>
                {q.options.map((opt,oi)=>{
                  const isUserChoice=userAns===oi;
                  const isCorrectAns=q.correct===oi;
                  return <div key={oi} style={{background:isCorrectAns?'#DCFCE7':isUserChoice&&!isCorrect?'#FEF2F2':'#F8FAFF',border:isCorrectAns?'2px solid #16A34A':isUserChoice&&!isCorrect?'2px solid #DC2626':'1px solid #E2E8F0',borderRadius:'12px',padding:'12px 14px',display:'flex',alignItems:'center',gap:'12px'}}>
                    <div style={{width:'26px',height:'26px',borderRadius:'50%',background:isCorrectAns?'#16A34A':isUserChoice&&!isCorrect?'#DC2626':'white',border:isCorrectAns?'none':isUserChoice&&!isCorrect?'none':'2px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:700,color:isCorrectAns||isUserChoice&&!isCorrect?'white':'#94A3B8',flexShrink:0}}>{isCorrectAns?'✓':isUserChoice&&!isCorrect?'✗':String.fromCharCode(65+oi)}</div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',flex:1}}>{opt}</span>
                    {isCorrectAns&&<span style={{background:'#16A34A',color:'white',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>CORRECT</span>}
                    {isUserChoice&&!isCorrect&&<span style={{background:'#DC2626',color:'white',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:700,borderRadius:'6px',padding:'2px 8px'}}>YOUR CHOICE</span>}
                  </div>
                })}
              </div>
              <div style={{background:isCorrect?'#F0FDF4':'#FFFBEB',border:`1px solid ${isCorrect?'#86EFAC':'#FCD34D'}`,borderRadius:'12px',padding:'12px 16px',display:'flex',gap:'10px'}}>
                <Lightbulb size={16} color={isCorrect?'#16A34A':'#D97706'} style={{flexShrink:0,marginTop:'2px'}}/>
                <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:isCorrect?'#16A34A':'#D97706',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'4px'}}>Explanation</div><div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569',lineHeight:1.5}}>{q.explanation}</div></div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>;
  }

  return null;
}
