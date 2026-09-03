import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Lightbulb, Briefcase, Mic, MicOff, Video, VideoOff, Upload } from 'lucide-react';

interface InterviewProps {
  screen: string;
  setScreen: (screen: string) => void;
  CircularProgress: any;
  showToast: (message: string) => void;
  showXPToast: (message: string) => void;
}

const interviewTypes = [
  {id:'hr', name:'HR Interview', icon:'https://img.icons8.com/3d-fluency/100/conference-call.png', color:'#16A34A', bg:'#F0FDF4', description:'Behavioral & personality questions', duration:'15-20 min', popular:true},
  {id:'technical', name:'Technical Interview', icon:'https://img.icons8.com/3d-fluency/100/source-code.png', color:'#2563EB', bg:'#EFF6FF', description:'DSA, system design & coding concepts', duration:'20-30 min', popular:false},
  {id:'managerial', name:'Managerial Round', icon:'https://img.icons8.com/3d-fluency/100/businessman.png', color:'#7C3AED', bg:'#FAF5FF', description:'Leadership & decision making', duration:'15-20 min', popular:false},
  {id:'resume', name:'Resume Walkthrough', icon:'https://img.icons8.com/3d-fluency/100/resume.png', color:'#BD1313', bg:'#FFF1F2', description:'Walk through your resume with AI', duration:'10-15 min', popular:false}
];

const interviewHistory = [
  {id:'i1', type:'HR Interview', date:'Mar 16', duration:'18 min', score:82, questions:8, feedback:'Good communication, improve STAR format'},
  {id:'i2', type:'Technical Interview', date:'Mar 14', duration:'24 min', score:68, questions:10, feedback:'Needs improvement on system design'},
  {id:'i3', type:'HR Interview', date:'Mar 10', duration:'15 min', score:75, questions:7, feedback:'Confident delivery, good answers'}
];

const hrQuestions = [
  {id:1, question:'Tell me about yourself.', hint:'Structure: Present → Past → Future', category:'Introduction', tips:['Keep it under 2 minutes','Focus on professional journey','End with why you want this role']},
  {id:2, question:'What are your greatest strengths?', hint:'Pick 2-3 relevant to the role', category:'Self Assessment', tips:['Use specific examples','Relate to job requirements','Be confident not arrogant']},
  {id:3, question:'Where do you see yourself in 5 years?', hint:'Show ambition aligned with company growth', category:'Career Goals', tips:['Research the company growth path','Show commitment to the role','Be realistic and specific']},
  {id:4, question:'Why do you want to work at our company?', hint:'Research the company before the interview', category:'Company Fit', tips:['Mention specific company achievements','Align personal values with company mission','Show genuine enthusiasm']},
  {id:5, question:'Describe a challenge you faced and how you overcame it.', hint:'Use STAR: Situation Task Action Result', category:'Behavioral', tips:['Choose a real professional challenge','Focus on your specific actions','Quantify the result if possible']},
  {id:6, question:'What is your biggest weakness?', hint:'Choose a real weakness with a growth story', category:'Self Assessment', tips:['Be honest but strategic','Show self-awareness','Always include improvement steps']},
  {id:7, question:'Why should we hire you?', hint:'Summarize your unique value proposition', category:'Closing', tips:['Connect skills to job requirements','Highlight unique strengths','Express genuine enthusiasm']},
  {id:8, question:'Do you have any questions for us?', hint:'Always have 2-3 thoughtful questions ready', category:'Closing', tips:['Ask about team culture','Ask about growth opportunities','Never ask about salary in first round']}
];

const ariaResponses = [
  "Great answer! You structured that well. Let's move to the next question.",
  "Good points. Try to add a specific example next time to strengthen your answer.",
  "I like your enthusiasm! Remember to use the STAR format for behavioral questions.",
  "That's a solid response. Your confidence is coming through clearly.",
  "Nice! You covered the key points. Let's continue with the next question."
];

const sessionFeedback = {
  overallScore: 82,
  duration: '18 min 30s',
  questionsAnswered: 7,
  strengths: ['Strong communication and clarity', 'Good use of specific examples', 'Confident and composed delivery', 'Well-structured answers'],
  improvements: ['Use STAR format more consistently', 'Add quantifiable results to answers', 'Research company-specific details more'],
  questionScores: [
    {q:'Tell me about yourself', score:88},
    {q:'Greatest strengths', score:85},
    {q:'5 year plan', score:78},
    {q:'Why our company', score:72},
    {q:'Challenge faced', score:90},
    {q:'Biggest weakness', score:75},
    {q:'Why hire you', score:85}
  ]
};

export function Interview({ screen, setScreen, CircularProgress, showToast, showXPToast }: InterviewProps) {
  const [setupConfig, setSetupConfig] = useState({ type: 'hr', role: 'Software Engineer', experience: 'fresher', questionCount: 8, focus: [] as string[] });
  const [sessionState, setSessionState] = useState({ currentQ: 0, phase: 'question', userAnswer: '', answers: [] as string[], sessionTime: 0, ariaMessage: '' });
  const [interviewMode, setInterviewMode] = useState('standard');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedResume, setSelectedResume] = useState('existing');
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [transcript, setTranscript] = useState<Array<{speaker:string,text:string}>>([]);

  useEffect(() => {
    if (screen === 'interview-session') {
      const timer = setInterval(() => {
        setSessionState(prev => ({ ...prev, sessionTime: prev.sessionTime + 1 }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [screen]);

  const formatSessionTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2,'0')}`;
  };

  // Screen 1: Interview Home
  if (screen === 'interview') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'#F0FDF4',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src="https://img.icons8.com/3d-fluency/100/microphone.png" width="22" height="22" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
          </div>
          <div>
            <div style={{fontFamily:'var(--font-display)',fontSize:'20px',fontWeight:700,color:'#0F172A'}}>AI Interview 🎤</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Practice with Aria — your AI interviewer</div>
          </div>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <span style={{background:'#F1F5F9',color:'#64748B',border:'1px solid #E2E8F0',fontSize:'11px',fontWeight:600,padding:'4px 12px',borderRadius:9999}}>3 Sessions</span>
          <span style={{background:'#DCFCE7',color:'#16A34A',border:'1px solid #86EFAC',fontSize:'11px',fontWeight:600,padding:'4px 12px',borderRadius:9999}}>82% Avg</span>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px',display:'flex',flexDirection:'column',gap:'16px'}} className="inner-scroll">
        {/* Aria Hero Card */}
        <div onClick={()=>setScreen('interview-setup')} style={{background:'linear-gradient(135deg, #16A34A, #15803D)',borderRadius:'20px',padding:'24px',display:'flex',alignItems:'center',gap:'24px',position:'relative',overflow:'hidden',cursor:'pointer',transition:'all 0.3s'}} onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(22,163,74,0.35)'}} onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{position:'absolute',top:'-20px',right:'-20px',width:'120px',height:'120px',borderRadius:'50%',background:'rgba(255,255,255,0.06)'}}/>
          <div style={{position:'absolute',bottom:'-15px',left:'-15px',width:'80px',height:'80px',borderRadius:'50%',background:'rgba(255,255,255,0.04)'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="80" height="80" alt="" style={{filter:'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',borderRadius:'50%',border:'3px solid rgba(255,255,255,0.3)',background:'transparent'}}/>
            <div style={{position:'absolute',bottom:'-2px',right:'-2px',width:'14px',height:'14px',borderRadius:'50%',background:'#86EFAC',border:'2px solid white',animation:'pulse 2s infinite'}}/>
          </div>
          <div style={{flex:1,position:'relative',zIndex:1}}>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'rgba(255,255,255,0.7)',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'4px'}}>MEET ARIA 🤖</div>
            <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'white',marginBottom:'6px'}}>Your AI Interview Coach</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'rgba(255,255,255,0.75)',lineHeight:1.5,marginBottom:'12px'}}>Aria will ask you real interview questions, listen to your answers, and give you detailed feedback.</div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {['🎯 Real Questions','💬 Live Feedback','📊 Performance Score'].map((f,i)=>(
                <span key={i} style={{background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.2)',color:'white',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'4px 12px'}}>{f}</span>
              ))}
            </div>
          </div>
          <button onClick={()=>setScreen('interview-setup')} style={{position:'relative',zIndex:1,background:'white',color:'#16A34A',fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,borderRadius:'12px',border:'none',padding:'10px 20px',boxShadow:'0 4px 12px rgba(0,0,0,0.15)',cursor:'pointer'}}>Start Practice →</button>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'12px'}}>
          {[{val:'3',label:'SESSIONS',icon:'https://img.icons8.com/3d-fluency/100/microphone.png',color:'#16A34A',bg:'#F0FDF4'},{val:'75%',label:'AVG SCORE',icon:'https://img.icons8.com/3d-fluency/100/goal.png',color:'#D97706',bg:'#FFFBEB'},{val:'23',label:'QUESTIONS',icon:'https://img.icons8.com/3d-fluency/100/chat.png',color:'#2563EB',bg:'#EFF6FF'},{val:'82%',label:'BEST SCORE',icon:'https://img.icons8.com/3d-fluency/100/trophy.png',color:'#BD1313',bg:'#FFF1F2'}].map((s,i)=>(
            <div key={i} style={{height:'80px',background:`linear-gradient(135deg, ${s.bg}, white)`,border:'1px solid #E2E8F0',borderRadius:'16px',padding:'14px 16px',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:s.color}}/>
              <img src={s.icon} width="24" height="24" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'#0F172A',marginTop:'4px'}}>{s.val}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8'}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Interview Types */}
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Choose Interview Type 🎯</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'12px'}}>
            {interviewTypes.map(t=>(
              <div key={t.id} onClick={()=>{setSetupConfig({...setupConfig,type:t.id});setScreen('interview-setup')}} style={{height:'100px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'16px',padding:'16px',cursor:'pointer',display:'flex',alignItems:'center',gap:'14px',position:'relative'}} onMouseEnter={(e)=>{e.currentTarget.style.borderColor=t.color;e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'}} onMouseLeave={(e)=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                {t.popular&&<span style={{position:'absolute',top:'8px',right:'8px',background:'#FEF3C7',color:'#D97706',border:'1px solid #FCD34D',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:700,borderRadius:9999,padding:'2px 8px'}}>Popular</span>}
                <div style={{width:'44px',height:'44px',borderRadius:'12px',background:t.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <img src={t.icon} width="26" height="26" alt="" style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'}}/>
                </div>
                <div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:700,color:'#0F172A'}}>{t.name}</div>
                  <div style={{display:'flex',gap:'6px',marginTop:'4px',alignItems:'center'}}>
                    <span style={{background:'#F1F5F9',color:'#64748B',fontFamily:'var(--font-body)',fontSize:'10px',fontWeight:600,borderRadius:9999,padding:'2px 8px'}}>{t.duration}</span>
                  </div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8',marginTop:'2px'}}>{t.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Past Sessions 📋</div>
          </div>
          {interviewHistory.map(h=>(
            <div key={h.id} onClick={()=>setScreen('interview-feedback')} style={{height:'72px',background:'white',border:'1px solid #E2E8F0',borderRadius:'14px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer',marginBottom:'8px'}} onMouseEnter={(e)=>{e.currentTarget.style.borderColor='#86EFAC';e.currentTarget.style.background='#F0FDF4'}} onMouseLeave={(e)=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.background='white'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'50%',border:`2px solid ${h.score>=75?'#16A34A':'#D97706'}`,background:h.score>=75?'#DCFCE7':'#FEF3C7',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:800,color:h.score>=75?'#16A34A':'#D97706',flexShrink:0}}>{h.score}%</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{h.type}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>{h.date} · {h.duration} · {h.questions} questions</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B',fontStyle:'italic',marginTop:'2px'}}>{h.feedback}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>;
  }

  // Screen 2: Interview Setup
  if (screen === 'interview-setup') {
    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('interview')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Setup Interview 🎤</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Configure your practice session</div></div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'20px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'640px',margin:'0 auto',width:'100%',display:'flex',flexDirection:'column',gap:'20px'}}>

          {/* SECTION 1 — INTERVIEW MODES */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>INTERVIEW MODE</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'10px'}}>
              {[
                {id:'standard',name:'Standard Interview',icon:'🎤',desc:'General questions',color:'#16A34A',bg:'#F0FDF4'},
                {id:'jd',name:'JD Based Interview',icon:'📋',desc:'Job description based',color:'#2563EB',bg:'#EFF6FF'},
                {id:'resume',name:'Resume Based Interview',icon:'📄',desc:'Resume walkthrough',color:'#7C3AED',bg:'#FAF5FF'}
              ].map(mode=>(
                <div key={mode.id} onClick={()=>setInterviewMode(mode.id)} style={{background:interviewMode===mode.id?mode.bg:'white',border:interviewMode===mode.id?`2px solid ${mode.color}`:'1.5px solid #E2E8F0',borderRadius:'14px',padding:'16px 14px',textAlign:'center',cursor:'pointer'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>{mode.icon}</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'13px',fontWeight:700,color:'#0F172A',marginBottom:'4px'}}>{mode.name}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>{mode.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2 — JD INPUT */}
          {interviewMode==='jd'&&<div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>JOB DESCRIPTION</div>
            <textarea value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} placeholder="Paste the job description here..." style={{width:'100%',minHeight:'160px',padding:'14px 16px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'12px',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',lineHeight:1.6,resize:'vertical'}}/>
            <div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'8px'}}>
              <Lightbulb size={14} color="#D97706"/>
              <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>Aria will analyze this JD and ask relevant questions</span>
            </div>
          </div>}

          {/* SECTION 3 — RESUME SELECTOR */}
          {interviewMode==='resume'&&<div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>RESUME</div>
            <div style={{display:'flex',gap:'10px'}}>
              <div onClick={()=>setSelectedResume('existing')} style={{flex:1,background:selectedResume==='existing'?'#F0FDF4':'white',border:selectedResume==='existing'?'2px solid #16A34A':'1.5px solid #E2E8F0',borderRadius:'12px',padding:'16px',cursor:'pointer'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,color:'#0F172A',marginBottom:'6px'}}>📄 Use Existing Resume</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>Software Engineer Resume</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B',marginTop:'4px'}}>Last updated: Mar 15</div>
              </div>
              <div onClick={()=>setSelectedResume('upload')} style={{flex:1,background:selectedResume==='upload'?'#EFF6FF':'white',border:selectedResume==='upload'?'2px solid #2563EB':'1.5px solid #E2E8F0',borderRadius:'12px',padding:'16px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                <Upload size={24} color="#2563EB" style={{marginBottom:'8px'}}/>
                <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,color:'#0F172A'}}>Upload New Resume</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8',marginTop:'4px'}}>PDF or DOCX</div>
              </div>
            </div>
          </div>}

          {/* Type Selector */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>INTERVIEW TYPE</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'8px'}}>
              {interviewTypes.map(t=>(
                <div key={t.id} onClick={()=>setSetupConfig({...setupConfig,type:t.id})} style={{height:'56px',background:setupConfig.type===t.id?t.bg:'white',border:setupConfig.type===t.id?`2px solid ${t.color}`:'1.5px solid #E2E8F0',borderRadius:'12px',padding:'8px 14px',display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'8px',background:t.bg,display:'flex',alignItems:'center',justifyContent:'center'}}><img src={t.icon} width="18" height="18" alt=""/></div>
                  <span style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Role */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>TARGET ROLE</div>
            <div style={{position:'relative'}}>
              <Briefcase size={18} color="#94A3B8" style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
              <input type="text" value={setupConfig.role} onChange={(e)=>setSetupConfig({...setupConfig,role:e.target.value})} style={{width:'100%',height:'48px',paddingLeft:'44px',paddingRight:'14px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',fontFamily:'var(--font-body)',fontSize:'16px',color:'#0F172A'}} placeholder="Enter target role"/>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>EXPERIENCE LEVEL</div>
            <div style={{display:'flex',gap:'8px'}}>
              {[{val:'fresher',label:'🌱 Fresher'},{val:'1-2',label:'📈 1-2 Years'},{val:'3+',label:'💼 3+ Years'}].map(ex=>(
                <div key={ex.val} onClick={()=>setSetupConfig({...setupConfig,experience:ex.val})} style={{flex:1,height:'56px',background:setupConfig.experience===ex.val?'#F0FDF4':'white',border:setupConfig.experience===ex.val?'2px solid #16A34A':'1.5px solid #E2E8F0',borderRadius:'12px',padding:'8px 16px',textAlign:'center',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{ex.label}</div>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'8px'}}>NUMBER OF QUESTIONS</div>
            <div style={{display:'flex',gap:'8px'}}>
              {[5,8,10,12,15].map(c=>(
                <button key={c} onClick={()=>setSetupConfig({...setupConfig,questionCount:c})} style={{width:'40px',height:'40px',borderRadius:'10px',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,background:setupConfig.questionCount===c?'#16A34A':'#F1F5F9',color:setupConfig.questionCount===c?'white':'#475569',border:'none'}}>{c}</button>
              ))}
            </div>
          </div>

          {/* Session Preview */}
          <div style={{background:'linear-gradient(135deg, #F0FDF4, white)',border:'1px solid #86EFAC',borderRadius:'16px',padding:'16px 20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}}>
              <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="32" height="32" alt="" style={{borderRadius:'50%',filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'}}/>
              <div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#16A34A'}}>Aria is ready! 🎯</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              {[{l:'Type',v:interviewTypes.find(t=>t.id===setupConfig.type)?.name},{l:'Role',v:setupConfig.role},{l:'Questions',v:setupConfig.questionCount},{l:'Est. Duration',v:'~18 minutes'}].map((it,i)=>(
                <div key={i}><div style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#94A3B8'}}>{ it.l}</div><div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{it.v}</div></div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button onClick={()=>{setScreen('interview-session');showToast("Interview starting — take a breath! 🌿");showXPToast("+75 XP 🎉");setSessionState({currentQ:0,phase:'question',userAnswer:'',answers:[],sessionTime:0,ariaMessage:''});setTranscript([{speaker:'Aria',text:hrQuestions[0].question}])}} style={{width:'100%',height:'56px',background:'linear-gradient(135deg, #16A34A, #15803D)',borderRadius:'16px',border:'none',fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'white',cursor:'pointer',boxShadow:'0 8px 24px rgba(22,163,74,0.35)',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="28" height="28" alt="" style={{borderRadius:'50%',filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.2))'}}/>
            Start Interview with Aria
          </button>
        </div>
      </div>
    </div>;
  }

  // Screen 3: Interview Session (Google Meet Style)
  if (screen === 'interview-session') {
    const currentQuestion = hrQuestions[sessionState.currentQ];

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter" style={{background:'#0F172A'}}>
      {/* Session Top Bar */}
      <div style={{height:'56px',flexShrink:0,background:'#1E293B',borderBottom:'1px solid #334155',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#16A34A',animation:'pulse 2s ease-in-out infinite'}}/>
          <span style={{fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,color:'#16A34A'}}>Session Live</span>
        </div>
        <div style={{fontFamily:'var(--font-display)',fontSize:'20px',fontWeight:800,color:'white'}}>{formatSessionTime(sessionState.sessionTime)}</div>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{background:'rgba(16,185,129,0.15)',color:'#10B981',border:'1px solid rgba(16,185,129,0.3)',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:700,borderRadius:9999,padding:'4px 12px'}}>Q{sessionState.currentQ + 1} / {hrQuestions.length}</span>
          <button onClick={()=>{setScreen('interview-complete');setTimeout(()=>showToast("Session complete! Great job 🎉"),0)}} style={{background:'rgba(239,68,68,0.15)',color:'#EF4444',border:'1px solid rgba(239,68,68,0.3)',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,borderRadius:'8px',padding:'6px 14px',cursor:'pointer'}}>End Session</button>
        </div>
      </div>

      {/* Main Session Content - Google Meet Style */}
      <div style={{flex:1,display:'flex',overflow:'hidden',padding:'16px',gap:'16px'}}>
        {/* LEFT SIDE — SECTION 4: Question Panel */}
        <div style={{flex:1,background:'#1E293B',borderRadius:'16px',padding:'32px',overflowY:'auto',display:'flex',flexDirection:'column'}} className="inner-scroll">
          <div style={{maxWidth:'640px',margin:'0 auto',width:'100%'}}>
            {/* Aria Avatar */}
            <div style={{textAlign:'center',marginBottom:'24px'}}>
              <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="80" height="80" alt="" style={{borderRadius:'50%',border:'3px solid #10B981',filter:'drop-shadow(0 8px 24px rgba(16,185,129,0.4))',display:'block',margin:'0 auto 12px',background:'transparent'}}/>
              <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'white',marginBottom:'6px'}}>Aria</div>
              <span style={{background:'rgba(16,185,129,0.15)',color:'#10B981',border:'1px solid rgba(16,185,129,0.3)',fontFamily:'var(--font-body)',fontSize:'12px',fontWeight:600,borderRadius:9999,padding:'6px 16px',display:'inline-block'}}>🎤 Asking Question {sessionState.currentQ + 1}</span>
            </div>

            {/* Question Card */}
            <div style={{background:'#0F172A',border:'1px solid #334155',borderRadius:'20px',padding:'28px',marginBottom:'20px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <span style={{background:'rgba(16,185,129,0.15)',color:'#10B981',border:'1px solid rgba(16,185,129,0.3)',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 12px'}}>{currentQuestion?.category}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B'}}>Question {sessionState.currentQ + 1} of {hrQuestions.length}</span>
              </div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:700,color:'white',lineHeight:1.5,marginBottom:'16px'}}>{currentQuestion?.question}</div>
              <div style={{display:'flex',alignItems:'flex-start',gap:'10px',background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:'12px',padding:'12px 16px'}}>
                <Lightbulb size={18} color="#10B981" style={{flexShrink:0,marginTop:'2px'}}/>
                <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#94A3B8',lineHeight:1.5,fontStyle:'italic'}}>Hint: {currentQuestion?.hint}</span>
              </div>
            </div>

            {/* Answer Input */}
            <div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#64748B',letterSpacing:'0.5px'}}>YOUR ANSWER</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B'}}>{sessionState.userAnswer.length}/500</span>
              </div>
              <textarea value={sessionState.userAnswer} onChange={(e)=>{setSessionState({...sessionState,userAnswer:e.target.value});if(e.target.value.length>10){setTranscript(prev=>[...prev.filter(t=>t.speaker!=='You'),{speaker:'You',text:e.target.value}])}}} placeholder="Type your answer here..." style={{width:'100%',minHeight:'140px',padding:'16px',background:'#0F172A',border:'1.5px solid #334155',borderRadius:'12px',fontFamily:'var(--font-body)',fontSize:'14px',color:'white',lineHeight:1.6,resize:'none',outline:'none'}}/>

              {/* Action Buttons */}
              <div style={{display:'flex',gap:'12px',marginTop:'16px'}}>
                <button onClick={()=>{const newT=[...transcript,{speaker:'Aria',text:hrQuestions[(sessionState.currentQ+1)%hrQuestions.length].question}];if(sessionState.currentQ<hrQuestions.length-1){setSessionState({...sessionState,currentQ:sessionState.currentQ+1,userAnswer:'',phase:'question'});setTranscript(newT)}else{setScreen('interview-complete')}}} style={{flex:0.4,height:'48px',background:'transparent',border:'1.5px solid #334155',color:'#94A3B8',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Skip →</button>
                <button onClick={()=>{const newAnswers=[...sessionState.answers];newAnswers[sessionState.currentQ]=sessionState.userAnswer;const newT=[...transcript,{speaker:'Aria',text:ariaResponses[sessionState.currentQ%ariaResponses.length]}];setTranscript(newT);setSessionState({...sessionState,answers:newAnswers,phase:'aria-response'});setTimeout(()=>{const nextT=[...newT,{speaker:'Aria',text:sessionState.currentQ<hrQuestions.length-1?hrQuestions[sessionState.currentQ+1].question:'Thank you!'}];if(sessionState.currentQ<hrQuestions.length-1){setSessionState({...sessionState,currentQ:sessionState.currentQ+1,userAnswer:'',phase:'question',answers:newAnswers});setTranscript(nextT)}else{setScreen('interview-complete');setTimeout(()=>showToast("Session complete! Great job 🎉"),0)}},2000)}} style={{flex:1,height:'48px',background:'linear-gradient(135deg, #10B981, #059669)',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,border:'none',borderRadius:'12px',cursor:'pointer'}}>Submit Answer →</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Camera Preview & Transcript */}
        <div style={{width:'360px',display:'flex',flexDirection:'column',gap:'16px',flexShrink:0}}>
          {/* Camera Preview */}
          <div style={{background:'#1E293B',borderRadius:'16px',overflow:'hidden',position:'relative',aspectRatio:'4/3'}}>
            <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg, #1E293B, #0F172A)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{textAlign:'center'}}>
                <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'linear-gradient(135deg, #10B981, #059669)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}>
                  <span style={{fontFamily:'var(--font-display)',fontSize:'32px',fontWeight:800,color:'white'}}>R</span>
                </div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'white'}}>Rahul</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',marginTop:'4px'}}>{cameraOn?'Camera On':'Camera Off'}</div>
              </div>
            </div>

            {/* Camera/Mic Controls */}
            <div style={{position:'absolute',bottom:'12px',left:'50%',transform:'translateX(-50%)',display:'flex',gap:'8px'}}>
              <button onClick={()=>setMicOn(!micOn)} style={{width:'44px',height:'44px',borderRadius:'50%',background:micOn?'rgba(15,23,42,0.8)':'rgba(239,68,68,0.9)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(8px)'}}>
                {micOn?<Mic size={20} color="white"/>:<MicOff size={20} color="white"/>}
              </button>
              <button onClick={()=>setCameraOn(!cameraOn)} style={{width:'44px',height:'44px',borderRadius:'50%',background:cameraOn?'rgba(15,23,42,0.8)':'rgba(239,68,68,0.9)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(8px)'}}>
                {cameraOn?<Video size={20} color="white"/>:<VideoOff size={20} color="white"/>}
              </button>
            </div>
          </div>

          {/* SECTION 5 — Live Transcript */}
          <div style={{flex:1,background:'#1E293B',borderRadius:'16px',padding:'16px',overflowY:'auto'}} className="inner-scroll">
            <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,color:'white',marginBottom:'12px',display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#10B981',animation:'pulse 2s infinite'}}/>
              Live Transcript
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {transcript.map((t,i)=>(
                <div key={`transcript-${i}`}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:t.speaker==='Aria'?'#10B981':'#3B82F6',marginBottom:'4px'}}>{t.speaker}:</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#CBD5E1',lineHeight:1.5,paddingLeft:'12px',borderLeft:`2px solid ${t.speaker==='Aria'?'#10B981':'#3B82F6'}`}}>{t.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 4: Interview Complete (SECTION 6)
  if (screen === 'interview-complete') {
    const score = 82;
    const questionsAnswered = sessionState.answers.filter(a=>a).length;
    const duration = formatSessionTime(sessionState.sessionTime);
    const fullMarksCount = 3;

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter" style={{background:'white'}}>
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'16px'}}>
        <button onClick={()=>setScreen('interview')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#64748B"/></button>
        <div><div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Interview Complete 🎉</div><div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>HR Interview · {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div></div>
      </div>

      <div style={{flex:1,overflowY:'auto',padding:'40px 24px'}} className="inner-scroll">
        <div style={{maxWidth:'640px',width:'100%',margin:'0 auto'}}>

          {/* Big Score Display */}
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <div style={{fontFamily:'Syne, var(--font-display)',fontSize:'80px',fontWeight:800,color:'#16A34A',lineHeight:1,marginBottom:'16px'}}>{score}%</div>
            <div style={{display:'inline-block',background:'linear-gradient(135deg, #16A34A, #15803D)',color:'white',fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,borderRadius:9999,padding:'10px 32px',textTransform:'uppercase',letterSpacing:'1px',boxShadow:'0 8px 24px rgba(22,163,74,0.25)'}}>EXCELLENT PERFORMANCE ✓</div>
          </div>

          {/* Stats Cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'12px',marginBottom:'32px'}}>
            {[
              {label:'Questions',value:questionsAnswered,icon:'📝',color:'#2563EB',bg:'#EFF6FF',border:'#BFDBFE'},
              {label:'Duration',value:duration,icon:'⏱️',color:'#D97706',bg:'#FFFBEB',border:'#FCD34D'},
              {label:'Score',value:`${score}%`,icon:'⭐',color:'#16A34A',bg:'#F0FDF4',border:'#86EFAC'},
              {label:'Full Marks',value:fullMarksCount,icon:'💯',color:'#7C3AED',bg:'#F5F3FF',border:'#DDD6FE'}
            ].map((stat,i)=>(
              <div key={`complete-stat-${stat.label}`} style={{background:'white',border:`1px solid ${stat.border}`,borderRadius:'16px',padding:'20px',textAlign:'center'}}>
                <div style={{fontSize:'32px',marginBottom:'8px'}}>{stat.icon}</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:800,color:'#0F172A',marginBottom:'4px'}}>{stat.value}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#94A3B8',letterSpacing:'0.5px'}}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Aria Feedback */}
          <div style={{background:'linear-gradient(135deg, #F0FDF4, white)',border:'1px solid #86EFAC',borderRadius:'16px',padding:'20px 24px',marginBottom:'32px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
              <img src="https://i.ibb.co/8DT43N37/aria-avatar.png" width="40" height="40" alt="" style={{borderRadius:'50%',border:'2px solid #16A34A'}}/>
              <div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Aria's Feedback</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#64748B'}}>AI Interview Coach</div>
              </div>
            </div>
            <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'#475569',lineHeight:1.6}}>Great communication today! You structured your answers well using the STAR format and showed strong confidence. Your examples were specific and impactful. For improvement, try to add more quantifiable metrics to strengthen your responses.</div>
          </div>

          {/* XP Earned */}
          <div style={{background:'linear-gradient(135deg, #FFFBEB, white)',border:'1px solid #FCD34D',borderRadius:'16px',padding:'16px 20px',marginBottom:'24px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px'}}>
            <img src="https://img.icons8.com/3d-fluency/100/lightning-bolt.png" width="32" height="32" alt="" style={{filter:'drop-shadow(0 2px 8px rgba(217,119,6,0.3))'}}/>
            <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'#D97706'}}>+75 XP Earned!</div>
          </div>

          {/* Action Buttons */}
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <button onClick={()=>setScreen('interview-feedback')} style={{width:'100%',height:'52px',background:'linear-gradient(135deg, #16A34A, #15803D)',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,border:'none',borderRadius:'12px',cursor:'pointer',boxShadow:'0 4px 16px rgba(22,163,74,0.25)'}}>View Detailed Feedback →</button>
            <button onClick={()=>{setSessionState({currentQ:0,phase:'question',userAnswer:'',answers:[],sessionTime:0,ariaMessage:''});setTranscript([]);setScreen('interview-setup')}} style={{width:'100%',height:'48px',background:'white',border:'1.5px solid #86EFAC',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Practice Again 🔄</button>
            <button onClick={()=>setScreen('dashboard')} style={{width:'100%',height:'44px',background:'transparent',border:'1.5px solid #E2E8F0',color:'#94A3B8',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 5: Interview Feedback - Detailed Report
  if (screen === 'interview-feedback') {
    const avgScore = 82;
    const questionsAsked = sessionState.answers.filter(a=>a).length;
    const strongAnswers = 5;
    const needsReview = 2;

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      {/* Section Header */}
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'12px'}}>
        <button onClick={()=>setScreen('interview-complete')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#475569"/></button>
        <div>
          <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Detailed Performance Report 📊</div>
          <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8'}}>HR Interview · {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{flex:1,overflowY:'auto',padding:'24px'}} className="inner-scroll">
        <div style={{maxWidth:'1000px',margin:'0 auto',width:'100%'}}>

          {/* SECTION 1 — PERFORMANCE OVERVIEW */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Performance Overview</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'16px'}}>
              {[
                {label:'Avg Score',value:`${avgScore}%`,icon:'⭐',color:'#16A34A',bg:'#F0FDF4',border:'#86EFAC'},
                {label:'Questions Asked',value:questionsAsked,icon:'📝',color:'#2563EB',bg:'#EFF6FF',border:'#BFDBFE'},
                {label:'Strong Answers',value:strongAnswers,icon:'✓',color:'#16A34A',bg:'#F0FDF4',border:'#86EFAC'},
                {label:'Needs Review',value:needsReview,icon:'⚠️',color:'#D97706',bg:'#FFFBEB',border:'#FCD34D'}
              ].map((stat,i)=>(
                <div key={`overview-${stat.label}`} style={{background:stat.bg,border:`1px solid ${stat.border}`,borderRadius:'14px',padding:'20px',textAlign:'center'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>{stat.icon}</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'28px',fontWeight:800,color:'#0F172A',marginBottom:'6px'}}>{stat.value}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#64748B',letterSpacing:'0.5px'}}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2 — SCORE BREAKDOWN */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Score Breakdown</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {sessionFeedback.questionScores.map((item,i)=>(
                <div key={`score-breakdown-${i}`} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{width:'100px',fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',flexShrink:0}}>Question {i+1}</div>
                  <div style={{flex:1,height:'32px',background:'#F1F5F9',borderRadius:'8px',overflow:'hidden',position:'relative'}}>
                    <div style={{height:'100%',width:`${item.score}%`,background:item.score>=80?'linear-gradient(90deg, #16A34A, #15803D)':item.score>=70?'linear-gradient(90deg, #D97706, #B45309)':'linear-gradient(90deg, #DC2626, #B91C1C)',transition:'width 0.5s ease',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:'12px'}}>
                      <span style={{color:'white',fontSize:'12px',fontWeight:700}}>{item.score}%</span>
                    </div>
                  </div>
                  <div style={{width:'60px',fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:800,color:item.score>=80?'#16A34A':item.score>=70?'#D97706':'#DC2626',textAlign:'right'}}>{item.score}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3 — AI FEEDBACK */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>AI Feedback</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px'}}>

              {/* Key Strengths */}
              <div style={{background:'#F0FDF4',border:'1px solid #86EFAC',borderRadius:'12px',padding:'20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#16A34A',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'16px'}}>✓</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>Key Strengths</div>
                </div>
                {sessionFeedback.strengths.slice(0,3).map((s,i)=>(
                  <div key={`strength-${i}`} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'10px'}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#16A34A',marginTop:'6px',flexShrink:0}}></div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5}}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Areas to Improve */}
              <div style={{background:'#FFFBEB',border:'1px solid #FCD34D',borderRadius:'12px',padding:'20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#D97706',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'16px'}}>↑</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>Areas to Improve</div>
                </div>
                {sessionFeedback.improvements.map((s,i)=>(
                  <div key={`improve-${i}`} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'10px'}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#D97706',marginTop:'6px',flexShrink:0}}></div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5}}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Concerns */}
              <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'14px'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#DC2626',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'16px'}}>!</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>Concerns</div>
                </div>
                {['Limited use of quantifiable metrics','Could expand on examples more'].map((s,i)=>(
                  <div key={`concern-${i}`} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'10px'}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#DC2626',marginTop:'6px',flexShrink:0}}></div>
                    <span style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#0F172A',lineHeight:1.5}}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4 — VIDEO ANALYSIS */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Video Analysis</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'16px'}}>
              {[
                {label:'Body Language',score:85,icon:'🤝',desc:'Excellent posture and gestures'},
                {label:'Voice Tone',score:78,icon:'🎤',desc:'Clear and professional'},
                {label:'Confidence',score:82,icon:'💪',desc:'Strong and steady'}
              ].map((metric,i)=>(
                <div key={`video-${metric.label}`} style={{background:'#F8FAFC',borderRadius:'12px',padding:'20px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
                    <div style={{fontSize:'28px'}}>{metric.icon}</div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:800,color:metric.score>=80?'#16A34A':'#D97706'}}>{metric.score}%</div>
                  </div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,color:'#0F172A',marginBottom:'6px'}}>{metric.label}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',lineHeight:1.4}}>{metric.desc}</div>
                  <div style={{height:'6px',background:'#E2E8F0',borderRadius:9999,overflow:'hidden',marginTop:'10px'}}>
                    <div style={{height:'100%',width:`${metric.score}%`,background:metric.score>=80?'#16A34A':'#D97706',transition:'width 0.5s ease'}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5 — FACIAL EXPRESSION ANALYSIS */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Facial Expression Analysis</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'16px'}}>
              {[
                {label:'Emotion Consistency',score:88,icon:'😊',color:'#16A34A'},
                {label:'Eye Contact',score:75,icon:'👁️',color:'#D97706'},
                {label:'Approachability',score:90,icon:'🤗',color:'#16A34A'}
              ].map((metric,i)=>(
                <div key={`facial-${metric.label}`} style={{textAlign:'center'}}>
                  <div style={{width:'80px',height:'80px',borderRadius:'50%',background:`linear-gradient(135deg, ${metric.color}15, ${metric.color}08)`,border:`3px solid ${metric.color}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}>
                    <span style={{fontSize:'36px'}}>{metric.icon}</span>
                  </div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:metric.color,marginBottom:'6px'}}>{metric.score}%</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,color:'#0F172A'}}>{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6 — COMMUNICATION ANALYSIS */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Communication Analysis</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'20px'}}>
              {[
                {label:'Clarity',score:87,max:100,color:'#16A34A',desc:'Ideas expressed clearly'},
                {label:'Pace',score:72,max:100,color:'#D97706',desc:'Slightly fast at times'},
                {label:'Filler Words',score:15,max:100,color:'#16A34A',desc:'Minimal usage detected',inverted:true},
                {label:'Articulation',score:85,max:100,color:'#16A34A',desc:'Well-pronounced words'}
              ].map((metric,i)=>(
                <div key={`comm-${metric.label}`}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                    <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>{metric.label}</div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:800,color:metric.color}}>{metric.score}%</div>
                  </div>
                  <div style={{height:'10px',background:'#F1F5F9',borderRadius:9999,overflow:'hidden',marginBottom:'6px'}}>
                    <div style={{height:'100%',width:`${metric.score}%`,background:metric.color,transition:'width 0.5s ease'}}></div>
                  </div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B'}}>{metric.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7 — QUESTION REVIEW */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'20px'}}>Question by Question Feedback</div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {sessionFeedback.questionScores.map((item,i)=>(
                <div key={`q-review-${i}`} style={{background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'20px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
                        <span style={{background:item.score>=80?'#DCFCE7':item.score>=70?'#FEF3C7':'#FEF2F2',color:item.score>=80?'#16A34A':item.score>=70?'#D97706':'#DC2626',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,borderRadius:9999,padding:'4px 10px'}}>Q{i+1}</span>
                        <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,color:'#0F172A'}}>{item.q}</div>
                      </div>
                      <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#64748B',lineHeight:1.6}}>
                        {i===0&&'Strong opening with clear structure. Consider adding more specific examples from your experience.'}
                        {i===1&&'Good identification of strengths. Link them more directly to the role requirements.'}
                        {i===2&&'Well-articulated career vision. Add specific milestones to make it more concrete.'}
                        {i===3&&'Needs more company-specific research. Mention recent achievements or values.'}
                        {i===4&&'Excellent STAR format usage. Great quantifiable results shared.'}
                        {i===5&&'Honest and self-aware. Good inclusion of growth steps taken.'}
                        {i===6&&'Strong closing. Summarized key points effectively.'}
                      </div>
                    </div>
                    <div style={{marginLeft:'16px',textAlign:'right'}}>
                      <div style={{fontFamily:'var(--font-display)',fontSize:'32px',fontWeight:800,color:item.score>=80?'#16A34A':item.score>=70?'#D97706':'#DC2626'}}>{item.score}%</div>
                      <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8',textTransform:'uppercase'}}>Score</div>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                    {item.score>=80?<span style={{background:'#DCFCE7',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>✓ Strong Answer</span>:<span style={{background:'#FEF3C7',color:'#D97706',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>⚠️ Room for Improvement</span>}
                    <span style={{background:'#EFF6FF',color:'#2563EB',fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:600,borderRadius:9999,padding:'3px 10px'}}>Behavioral</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div style={{display:'flex',gap:'12px'}}>
            <button onClick={()=>{setSessionState({currentQ:0,phase:'question',userAnswer:'',answers:[],sessionTime:0,ariaMessage:''});setTranscript([]);setScreen('interview-setup')}} style={{flex:1,height:'52px',background:'linear-gradient(135deg, #16A34A, #15803D)',color:'white',fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,border:'none',borderRadius:'12px',cursor:'pointer',boxShadow:'0 4px 16px rgba(22,163,74,0.25)'}}>Practice Again 🔄</button>
            <button onClick={()=>setTimeout(()=>showToast("Report downloaded! 📄"),0)} style={{flex:1,height:'52px',background:'white',border:'1.5px solid #86EFAC',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Download Report 📄</button>
            <button onClick={()=>setTimeout(()=>showToast("Link copied! 🔗"),0)} style={{flex:0.8,height:'52px',background:'white',border:'1.5px solid #E2E8F0',color:'#64748B',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>Share 🔗</button>
          </div>
        </div>
      </div>
    </div>;
  }

  return null;
}
