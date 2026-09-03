import { useState, useEffect } from 'react';
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
  const [config, setConfig] = useState({ subject: 'Mathematics', difficulty: 'mixed', questionCount: 10, timeLimit: 15, types: ['mcq'] });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [flagged, setFlagged] = useState<number[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [filter, setFilter] = useState('all');

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

  // Screen 1: Tests Home  
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
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('tests')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Create Test 🎯</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Configure your practice test</div></div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'680px',margin:'0 auto',width:'100%',display:'flex',flexDirection:'column',gap:'20px'}}>
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>SELECT SUBJECT</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'8px'}}>
            {testModules.map(m=>(
              <div key={m.id} onClick={()=>setConfig({...config,subject:m.name})} style={{height:'52px',background:config.subject===m.name?m.bg:'white',border:config.subject===m.name?`2px solid ${m.color}`:'1.5px solid #E2E8F0',borderRadius:'12px',padding:'8px 12px',display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
                <img src={m.icon} width="20" height="20" alt=""/><span style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{m.name}</span>
              </div>
            ))}
          </div></div>
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>DIFFICULTY LEVEL</div>
          <div style={{display:'flex',gap:'8px'}}>
            {['easy','medium','hard','mixed'].map(d=>(
              <button key={d} onClick={()=>setConfig({...config,difficulty:d})} style={{height:'40px',padding:'0 20px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,border:config.difficulty===d?(d==='easy'?'1.5px solid #16A34A':d==='medium'?'1.5px solid #D97706':d==='hard'?'1.5px solid #DC2626':'1.5px solid #BD1313'):'1.5px solid #E2E8F0',background:config.difficulty===d?(d==='easy'?'#DCFCE7':d==='medium'?'#FEF3C7':d==='hard'?'#FEF2F2':'#FDF2F2'):'white',color:config.difficulty===d?(d==='easy'?'#16A34A':d==='medium'?'#D97706':d==='hard'?'#DC2626':'#BD1313'):'#475569'}}>{d.charAt(0).toUpperCase()+d.slice(1)}</button>
            ))}
          </div></div>
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>NUMBER OF QUESTIONS</div>
          <div style={{display:'flex',gap:'8px'}}>
            {[5,10,15,20,30].map(c=>(
              <button key={c} onClick={()=>setConfig({...config,questionCount:c})} style={{width:'40px',height:'40px',borderRadius:'10px',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,background:config.questionCount===c?'#D97706':'#F1F5F9',color:config.questionCount===c?'white':'#475569',border:config.questionCount===c?'1.5px solid #D97706':'1.5px solid #E2E8F0'}}>{c}</button>
            ))}
          </div></div>
          <div><div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>TIME LIMIT</div>
          <div style={{display:'flex',gap:'8px'}}>
            {[5,10,15,20,30].map(t=>(
              <button key={t} onClick={()=>setConfig({...config,timeLimit:t})} style={{height:'40px',padding:'0 16px',borderRadius:9999,cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,background:config.timeLimit===t?'#D97706':'#F1F5F9',color:config.timeLimit===t?'white':'#475569',border:config.timeLimit===t?'1.5px solid #D97706':'1.5px solid #E2E8F0'}}>{t} min</button>
            ))}
          </div></div>
          <div style={{background:'linear-gradient(135deg, #FFFBEB, white)',border:'1px solid #FCD34D',borderRadius:'16px',padding:'16px 20px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#D97706',marginBottom:'12px'}}>Test Summary</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              {[{l:'SUBJECT',v:config.subject},{l:'DIFFICULTY',v:config.difficulty},{l:'QUESTIONS',v:config.questionCount},{l:'TIME',v:`${config.timeLimit} minutes`}].map((it,i)=>(
                <div key={i}><div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8'}}>{it.l}</div><div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{it.v}</div></div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:'12px',marginTop:'8px'}}>
            <button onClick={()=>setScreen('tests-preview')} style={{flex:1,height:'48px',background:'transparent',border:'1.5px solid #FCD34D',color:'#D97706',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Preview Questions</button>
            <button onClick={()=>setScreen('tests-preview')} style={{flex:1.5,height:'48px',background:'linear-gradient(135deg, #D97706, #B45309)',border:'none',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,borderRadius:'12px',cursor:'pointer'}}>Start Test →</button>
          </div>
        </div>
      </div>
    </div>;
  }

  // Continue with remaining screens - file is getting large, need to split properly
  // For now showing screen routing
  if (screen === 'tests-preview') return <div>Screen 3: Test Preview - Click button in Create Test to see it</div>;
  if (screen === 'tests-taking') return <div>Screen 4: Test Taking - Full test interface with timer</div>;
  if (screen === 'tests-score') return <div>Screen 6: Score Overview - Test results</div>;
  if (screen === 'tests-review') return <div>Screen 7: Answer Review - Detailed answer review</div>;

  return null;
}
