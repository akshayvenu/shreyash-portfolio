import { useState } from 'react';
import { ChevronLeft, X, Upload, CheckCircle, Mail, Phone, MapPin, Plus, XCircle } from 'lucide-react';

interface ResumeProps {
  screen: string;
  setScreen: (screen: string) => void;
  CircularProgress: any;
  showToast: (message: string) => void;
  showXPToast: (message: string) => void;
}

// Resume Mock Data
const resumeData = {
  templateId: 'classic',
  strength: 68,
  personalInfo: {
    fullName: 'Rahul Sharma',
    title: 'Software Engineer',
    email: 'rahul@vit.edu',
    phone: '+91 98765 43210',
    linkedin: 'linkedin.com/in/rahulsharma',
    portfolio: '',
    city: 'Vellore, Tamil Nadu'
  },
  education: [{
    id: 'edu_1',
    degree: 'B.Tech Computer Science',
    institution: 'VIT Vellore',
    year: '2025',
    grade: '7.8 CGPA',
    location: 'Vellore, TN'
  }],
  experience: [{
    id: 'exp_1',
    title: 'Software Development Intern',
    company: 'TCS Digital',
    startDate: 'June 2024',
    endDate: 'August 2024',
    isPresent: false,
    description: 'Developed RESTful APIs using Node.js and Express. Worked on React frontend features. Collaborated in agile team of 8 engineers.'
  }],
  skills: [
    { id: 'sk_1', name: 'JavaScript', level: 'Expert' },
    { id: 'sk_2', name: 'React', level: 'Intermediate' },
    { id: 'sk_3', name: 'Python', level: 'Intermediate' },
    { id: 'sk_4', name: 'SQL', level: 'Intermediate' },
    { id: 'sk_5', name: 'Node.js', level: 'Beginner' },
    { id: 'sk_6', name: 'Git', level: 'Expert' }
  ],
  projects: [{
    id: 'prj_1',
    name: 'Student Portal App',
    techStack: ['React', 'Node.js', 'MongoDB'],
    description: 'Built a full-stack portal for 500+ students to track attendance and grades. Reduced manual effort by 60%.',
    link: 'github.com/rahul/student-portal'
  }],
  summary: 'Results-driven CS student at VIT Vellore with hands-on experience in full-stack development. Proficient in React, Python, and SQL. Seeking a software engineering role to apply technical skills and drive impactful solutions.'
};

const aiSuggestions = [
  { id: 1, type: 'missing', icon: '💡', title: 'Add certifications', detail: 'Certifications boost credibility by 40%', priority: 'high' },
  { id: 2, type: 'improve', icon: '💡', title: 'Expand project descriptions', detail: 'Add metrics and impact numbers', priority: 'high' },
  { id: 3, type: 'missing', icon: '💡', title: 'Add LinkedIn URL', detail: 'Increases profile visibility by 30%', priority: 'medium' },
  { id: 4, type: 'good', icon: '✅', title: 'Contact info complete', detail: 'Great — all basics are covered', priority: 'low' }
];

const resumeTemplates = [
  { id: 'classic', name: 'Classic', headerColor: '#BD1313', accent: '#BD1313' },
  { id: 'modern', name: 'Modern', headerColor: '#0F172A', accent: '#475569' },
  { id: 'minimal', name: 'Minimal', headerColor: '#E2E8F0', accent: '#94A3B8' },
  { id: 'bold', name: 'Bold', headerColor: '#D97706', accent: '#D97706' },
  { id: 'creative', name: 'Creative', headerColor: '#7C3AED', accent: '#7C3AED' },
  { id: 'executive', name: 'Executive', headerColor: '#1E293B', accent: '#334155' }
];

const suggestedSkills = [
  'JavaScript', 'Python', 'React', 'SQL',
  'Node.js', 'Communication', 'Leadership',
  'Problem Solving', 'Excel', 'Figma',
  'Git', 'Machine Learning', 'TypeScript',
  'System Design', 'AWS'
];

export function Resume({ screen, setScreen, CircularProgress, showToast, showXPToast }: ResumeProps) {
  const [showNudgeBanner, setShowNudgeBanner] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>('classic');
  const [activeTab, setActiveTab] = useState('All');
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'complete'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('personal');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [addedSkills, setAddedSkills] = useState(resumeData.skills.map(s => s.name));
  const [skillInput, setSkillInput] = useState('');
  const [resumePersonal, setResumePersonal] = useState(resumeData.personalInfo);
  const [resumeSummary, setResumeSummary] = useState(resumeData.summary);

  const handleUpload = () => {
    setUploadState('uploading');
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('complete');
          setTimeout(() => {
            showToast("Resume uploaded successfully! ✓");
            showXPToast("+30 XP 🎉");
          }, 0);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleGenerateSummary = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setTimeout(() => showToast("AI summary generated! ✓"), 0);
    }, 1200);
  };

  const handleAddSkill = (skill: string) => {
    if (!addedSkills.includes(skill)) {
      setAddedSkills([...addedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setAddedSkills(addedSkills.filter(s => s !== skill));
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      handleAddSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  // Get active template
  const activeTemplate = resumeTemplates.find(t => t.id === (selectedTemplate || 'classic')) || resumeTemplates[0];

  // Screen 1: Resume Home
  if (screen === 'resume') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden screen-enter">
        {/* Section Header */}
        <div style={{
          height: '56px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#FFF1F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="https://img.icons8.com/3d-fluency/100/resume.png" width="22" height="22" alt="" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
                Resume Builder 📄
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
                Build a resume that gets you hired
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{
              background: '#F1F5F9',
              color: '#64748B',
              border: '1px solid #E2E8F0',
              fontSize: '11px',
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 9999,
              fontFamily: 'var(--font-body)'
            }}>Last edited: Today</span>
            <span style={{
              background: '#FDF2F2',
              color: '#BD1313',
              border: '1px solid #F5BFBF',
              fontSize: '11px',
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 9999,
              fontFamily: 'var(--font-body)'
            }}>68%</span>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
             className="inner-scroll">
          {/* Resume Strength Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #FFF1F2, white)',
            border: '1px solid #F5BFBF',
            borderRadius: '20px'
          }}>
            <CircularProgress value={68} size={80} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                Resume Strength
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                Add 2 more sections to reach 80%
              </div>
              <div style={{ height: '6px', background: '#F5BFBF', borderRadius: 9999, marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: '#BD1313', borderRadius: 9999, transition: 'width 0.8s ease-out' }} />
              </div>
            </div>
            <button style={{
              background: 'transparent',
              color: '#BD1313',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              padding: '8px 0'
            }}>
              View AI Tips →
            </button>
          </div>

          {/* Option Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {/* Start Fresh Card */}
            <div onClick={() => setScreen('resume-templates')}
                 style={{
                   background: 'white',
                   border: '1.5px solid #E2E8F0',
                   borderLeft: '3px solid #BD1313',
                   borderRadius: '20px',
                   padding: '20px',
                   cursor: 'pointer',
                   transition: 'all 0.2s'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-3px)';
                   e.currentTarget.style.boxShadow = '0 8px 24px rgba(189,19,19,0.1)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#FFF1F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src="https://img.icons8.com/3d-fluency/100/resume.png" width="28" height="28" alt=""
                     style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: '10px' }}>
                Start Fresh ✨
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                Build step-by-step with AI guidance
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#BD1313', marginTop: '14px' }}>
                Create Resume →
              </div>
            </div>

            {/* Upload Existing Card */}
            <div onClick={() => setScreen('resume-upload')}
                 style={{
                   background: 'linear-gradient(135deg, #FFFBEB, white)',
                   border: '1.5px solid #E2E8F0',
                   borderLeft: '3px solid #D97706',
                   borderRadius: '20px',
                   padding: '20px',
                   cursor: 'pointer',
                   transition: 'all 0.2s'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-3px)';
                   e.currentTarget.style.boxShadow = '0 8px 24px rgba(217,119,6,0.1)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#FFFBEB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src="https://img.icons8.com/3d-fluency/100/upload-to-cloud.png" width="28" height="28" alt=""
                     style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: '10px' }}>
                Upload Resume 📤
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                Upload PDF/DOC — we'll extract info
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#D97706', marginTop: '14px' }}>
                Upload File →
              </div>
            </div>
          </div>

          {/* AI Nudge Banner */}
          {showNudgeBanner && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: '#FDF2F2',
              border: '1px solid #F5BFBF',
              borderRadius: '12px'
            }}>
              <img src="https://img.icons8.com/3d-fluency/100/star.png" width="20" height="20" alt="" />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#BD1313',
                fontWeight: 500,
                flex: 1
              }}>
                Complete your Skills section to reach 80% strength
              </span>
              <XCircle size={16} color="#BD1313" style={{ cursor: 'pointer' }} onClick={() => setShowNudgeBanner(false)} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Screen 2: Template Selection
  if (screen === 'resume-templates') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden screen-enter">
        {/* Section Header */}
        <div style={{
          height: '56px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button onClick={() => setScreen('resume')} style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFF'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <ChevronLeft size={20} color="#475569" />
          </button>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
              Choose a Template 🎨
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
              Pick a style that fits your goal
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{
          height: '48px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '24px'
        }}>
          {['All', 'Simple', 'Creative', 'Professional'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                height: '48px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #BD1313' : '2px solid transparent',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                color: activeTab === tab ? '#BD1313' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.2s',
                padding: '0 4px'
              }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px 80px' }} className="inner-scroll">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {resumeTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template.id);
                  setTimeout(() => showToast("Template selected ✓"), 0);
                }}
                style={{
                  height: '160px',
                  background: 'white',
                  border: selectedTemplate === template.id ? '2px solid #BD1313' : '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  boxShadow: selectedTemplate === template.id ? '0 0 0 4px rgba(189,19,19,0.08)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedTemplate !== template.id) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(189,19,19,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTemplate !== template.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}>
                {/* Preview Area */}
                <div style={{ height: '70%', padding: '12px' }}>
                  <div style={{ height: '10px', background: template.headerColor, borderRadius: '4px 4px 0 0', marginBottom: '8px' }} />
                  <div style={{ height: '5px', width: '75%', background: '#E2E8F0', borderRadius: '3px', marginBottom: '4px' }} />
                  <div style={{ height: '4px', width: '55%', background: '#E2E8F0', borderRadius: '3px', marginBottom: '4px' }} />
                  <div style={{ height: '3px', width: '80%', background: '#F1F5F9', borderRadius: '3px', marginBottom: '3px' }} />
                  <div style={{ height: '3px', width: '60%', background: '#F1F5F9', borderRadius: '3px', marginBottom: '3px' }} />
                  <div style={{ height: '3px', width: '70%', background: '#F1F5F9', borderRadius: '3px' }} />
                </div>
                
                {/* Card Footer */}
                <div style={{ height: '30%', borderTop: '1px solid #E2E8F0', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: template.accent }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
                      {template.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#BD1313', fontWeight: 500 }}>
                    Preview
                  </span>
                </div>

                {/* Selected Checkmark */}
                {selectedTemplate === template.id && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#BD1313',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    animation: 'badgePop 300ms ease-out'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div style={{
          height: '64px',
          position: 'sticky',
          bottom: 0,
          background: 'white',
          borderTop: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div>
            {!selectedTemplate ? (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#94A3B8' }}>
                No template selected
              </span>
            ) : (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B' }}>
                Selected: <span style={{
                  background: '#FDF2F2',
                  color: '#BD1313',
                  border: '1px solid #F5BFBF',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: 9999,
                  marginLeft: '6px'
                }}>
                  {resumeTemplates.find(t => t.id === selectedTemplate)?.name}
                </span>
              </span>
            )}
          </div>
          <button
            onClick={() => selectedTemplate && setScreen('resume-method')}
            disabled={!selectedTemplate}
            style={{
              width: '180px',
              height: '44px',
              background: selectedTemplate ? '#BD1313' : '#F5BFBF',
              color: selectedTemplate ? 'white' : 'rgba(189,19,19,0.5)',
              border: 'none',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: selectedTemplate ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (selectedTemplate) {
                e.currentTarget.style.background = '#991010';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTemplate) {
                e.currentTarget.style.background = '#BD1313';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}>
            Use This Template →
          </button>
        </div>
      </div>
    );
  }

  // Screen 3: Build Method Choice
  if (screen === 'resume-method') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden screen-enter">
        {/* Section Header */}
        <div style={{
          height: '56px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button onClick={() => setScreen('resume-templates')} style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <ChevronLeft size={20} color="#475569" />
          </button>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
              How would you like to start?
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
              Choose your preferred method
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          gap: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Let's build your resume 🚀
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#64748B' }}>
              Choose how you want to get started
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '560px', width: '100%', marginTop: '16px' }}>
            {/* Start Fresh Card */}
            <div
              onClick={() => setScreen('resume-editor')}
              style={{
                background: 'white',
                border: '2px solid #E2E8F0',
                borderRadius: '20px',
                padding: '28px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid #BD1313';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(189,19,19,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid #E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <img src="https://img.icons8.com/3d-fluency/100/resume.png"
                   width="72" height="72" alt=""
                   style={{
                     filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))',
                     display: 'block',
                     margin: '0 auto 16px',
                     background: 'transparent'
                   }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                Create Manually ✏️
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', lineHeight: 1.6, marginBottom: '20px' }}>
                Build your resume step-by-step with AI guidance and suggestions
              </div>
              <button style={{
                width: '100%',
                height: '44px',
                background: '#BD1313',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Start Building →
              </button>
            </div>

            {/* Upload Card */}
            <div
              onClick={() => setScreen('resume-upload')}
              style={{
                background: 'white',
                border: '2px solid #E2E8F0',
                borderRadius: '20px',
                padding: '28px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '2px solid #D97706';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(217,119,6,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '2px solid #E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <img src="https://img.icons8.com/3d-fluency/100/upload-to-cloud.png"
                   width="72" height="72" alt=""
                   style={{
                     filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))',
                     display: 'block',
                     margin: '0 auto 16px',
                     background: 'transparent'
                   }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                Upload Existing 📤
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#64748B', lineHeight: 1.6, marginBottom: '20px' }}>
                Upload your existing resume PDF or DOC and we'll extract your information
              </div>
              <button style={{
                width: '100%',
                height: '44px',
                background: 'transparent',
                color: '#D97706',
                border: '1.5px solid #FCD34D',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#FFFBEB'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                Upload Resume →
              </button>
            </div>
          </div>

          {/* Recent Resumes Section */}
          <div style={{ maxWidth: '720px', width: '100%', marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Recent Resumes 📄</div>
              <div onClick={() => setScreen('resume-editor')} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#BD1313', cursor: 'pointer' }}>+ New Resume</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {id:'r1',name:'Software Engineer Resume',template:'Classic',strength:68,status:'draft',lastEdited:'Today',aiScore:72,color:'#BD1313'},
                {id:'r2',name:'Data Analyst Application',template:'Modern',strength:45,status:'draft',lastEdited:'Mar 15',aiScore:55,color:'#0F172A'},
                {id:'r3',name:'Internship Resume',template:'Minimal',strength:90,status:'completed',lastEdited:'Mar 10',aiScore:88,color:'#E2E8F0'}
              ].map(resume => (
                <div key={resume.id} onClick={() => setScreen('resume-complete')} style={{height:72,background:'white',border:'1px solid #E2E8F0',borderRadius:16,padding:'0 16px',display:'flex',alignItems:'center',gap:12,cursor:'pointer',transition:'all 0.2s'}}
                  onMouseEnter={(e) => {e.currentTarget.style.border='1px solid #F5BFBF';e.currentTarget.style.background='#FFF8F8';}}
                  onMouseLeave={(e) => {e.currentTarget.style.border='1px solid #E2E8F0';e.currentTarget.style.background='white';}}>
                  <div style={{width:4,height:48,borderRadius:'8px 0 0 8px',background:resume.color}}/>
                  <div style={{width:36,height:36,background:'#FDF2F2',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <img src="https://img.icons8.com/3d-fluency/100/resume.png" width={20} height={20} style={{background:'transparent'}}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:14,fontWeight:600,color:'#0F172A'}}>{resume.name}</div>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginTop:2}}>
                      <span style={{fontFamily:'var(--font-body)',fontSize:11,color:'#94A3B8'}}>{resume.template} · {resume.lastEdited}</span>
                      <span style={{background:'#F0FDF4',color:'#16A34A',fontFamily:'var(--font-body)',fontSize:10,fontWeight:700,borderRadius:9999,padding:'2px 8px'}}>AI: {resume.aiScore}%</span>
                    </div>
                  </div>
                  <div style={{background:resume.status==='completed'?'#DCFCE7':'#FEF3C7',color:resume.status==='completed'?'#16A34A':'#D97706',fontFamily:'var(--font-body)',fontSize:11,fontWeight:700,borderRadius:9999,padding:'3px 8px'}}>
                    {resume.status==='completed'?'✓ Complete':'Draft'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Screen 4: Upload Resume
  if (screen === 'resume-upload') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden screen-enter">
        {/* Section Header */}
        <div style={{
          height: '56px',
          flexShrink: 0,
          background: 'white',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button onClick={() => setScreen('resume-method')} style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <ChevronLeft size={20} color="#475569" />
          </button>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>
              Upload Your Resume 📤
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
              We'll extract your info automatically
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }} className="inner-scroll">
          <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
            {/* Upload Zone */}
            <div style={{
              height: '220px',
              border: '2px dashed #F5BFBF',
              borderRadius: '20px',
              background: '#FFF8F8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: uploadState === 'idle' ? 'pointer' : 'default',
              transition: 'all 0.2s',
              marginBottom: '16px'
            }}
            onClick={() => uploadState === 'idle' && handleUpload()}>
              {uploadState === 'idle' && (
                <>
                  <img src="https://img.icons8.com/3d-fluency/100/upload-to-cloud.png"
                       width="56" height="56" alt=""
                       style={{
                         filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
                         marginBottom: '12px',
                         background: 'transparent'
                       }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                    Drag & drop your resume here
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>
                    or click to browse files
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', marginBottom: '16px' }}>
                    Accepts: PDF, DOC, DOCX · Max 5MB
                  </div>
                  <button style={{
                    height: '40px',
                    width: '140px',
                    background: 'transparent',
                    color: '#BD1313',
                    border: '1.5px solid #F5BFBF',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Browse File
                  </button>
                </>
              )}

              {uploadState === 'uploading' && (
                <>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid #F5BFBF',
                    borderTop: '3px solid #BD1313',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                    marginBottom: '12px'
                  }} />
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#0F172A', marginBottom: '12px' }}>
                    Uploading your resume...
                  </div>
                  <div style={{ width: '200px', height: '4px', background: '#F5BFBF', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#BD1313', transition: 'width 100ms' }} />
                  </div>
                  {uploadProgress >= 60 && (
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8', marginTop: '8px' }}>
                      Extracting information...
                    </div>
                  )}
                </>
              )}

              {uploadState === 'complete' && (
                <>
                  <CheckCircle size={48} color="#16A34A" style={{ marginBottom: '12px', animation: 'badgePop 400ms ease-out' }} />
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: '#16A34A', marginBottom: '4px' }}>
                    Resume uploaded successfully! ✓
                  </div>
                  <span style={{
                    background: '#F0FDF4',
                    color: '#16A34A',
                    border: '1px solid #86EFAC',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 14px',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-body)'
                  }}>
                    resume_rahul.pdf
                  </span>
                </>
              )}
            </div>

            {/* AI Tip Strip */}
            {uploadState === 'complete' && (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  marginTop: '16px',
                  background: '#FEF3C7',
                  border: '1px solid #FCD34D',
                  borderRadius: '12px'
                }}>
                  <img src="https://img.icons8.com/3d-fluency/100/light-on.png" width="20" height="20" alt="" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D97706', fontWeight: 500 }}>
                    ✨ We found 3 sections to improve in your resume
                  </span>
                </div>

                {/* Extracted Info Card */}
                <div style={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '20px',
                  padding: '20px',
                  marginTop: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                      Extracted Information
                    </div>
                    <span style={{
                      background: '#F1F5F9',
                      color: '#64748B',
                      border: '1px solid #E2E8F0',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: 9999,
                      fontFamily: 'var(--font-body)'
                    }}>Review and confirm</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '14px' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        NAME
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        Rahul Sharma
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        EMAIL
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        rahul@vit.edu
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        PHONE
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        +91 98765 43210
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        EXPERIENCE
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        Software Intern — TCS Digital
                      </div>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        EDUCATION
                      </div>
                      <div style={{
                        background: '#F8FAFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0F172A'
                      }}>
                        B.Tech CS — VIT Vellore — 2025
                      </div>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '2px' }}>
                        SKILLS
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {['React', 'JavaScript', 'Python', 'SQL'].map(skill => (
                          <span key={skill} style={{
                            background: '#FDF2F2',
                            color: '#BD1313',
                            border: '1px solid #F5BFBF',
                            fontSize: '12px',
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: 9999,
                            fontFamily: 'var(--font-body)'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                  <button
                    onClick={() => {
                      setScreen('resume-editor');
                      setTimeout(() => showToast("Resume imported! Let's refine it 📄"), 0);
                    }}
                    style={{
                      width: '100%',
                      height: '48px',
                      background: '#BD1313',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                    Continue Editing →
                  </button>
                  <button
                    onClick={() => setScreen('resume-editor')}
                    style={{
                      width: '100%',
                      height: '44px',
                      background: 'transparent',
                      color: '#BD1313',
                      border: '1.5px solid #F5BFBF',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                    Start Fresh Instead
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Screen 5: Resume Editor (Split Screen)
  if (screen === 'resume-editor') {
    const resumeSections = [
      { label: 'Personal', value: 100 },
      { label: 'Education', value: 100 },
      { label: 'Experience', value: 100 },
      { label: 'Skills', value: 60 },
      { label: 'Projects', value: 40 },
      { label: 'Summary', value: resumeSummary ? 100 : 0 }
    ];

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      {/* Editor Header Bar */}
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'12px'}}>
        <button onClick={()=>setScreen('resume-method')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#475569"/></button>
        <div style={{fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,color:'#0F172A'}}>Resume Editor ✏️</div>
        <div style={{flex:1,maxWidth:'200px'}}>
          <div style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#94A3B8',marginBottom:'2px'}}>Strength: 68%</div>
          <div style={{height:'4px',background:'#F5BFBF',borderRadius:9999,overflow:'hidden'}}>
            <div style={{height:'100%',background:'#BD1313',width:'68%'}}/>
          </div>
        </div>
        <div style={{marginLeft:'auto',display:'flex',gap:'8px'}}>
          <button onClick={()=>setTimeout(()=>showToast("Resume saved ✓"),0)} style={{height:'36px',width:'80px',background:'transparent',border:'1.5px solid #F5BFBF',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'8px',cursor:'pointer'}}>Save</button>
          <button onClick={()=>setScreen('resume-complete')} style={{height:'36px',width:'100px',background:'#BD1313',color:'white',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,border:'none',borderRadius:'8px',cursor:'pointer'}}>Preview →</button>
        </div>
      </div>

      {/* Split Content */}
      <div style={{flex:1,display:'grid',gridTemplateColumns:'45% 55%',height:'100%',overflow:'hidden'}}>
        {/* Left Panel */}
        <div style={{borderRight:'1px solid #E2E8F0',display:'flex',flexDirection:'column'}}>
          {/* Section Tabs */}
          <div style={{height:'48px',flexShrink:0,background:'#FAFAFA',borderBottom:'1px solid #E2E8F0',display:'flex',overflowX:'auto',padding:'0 16px',gap:0}} className="inner-scroll">
            {['personal', 'education', 'experience', 'skills', 'projects', 'summary'].map(tab => (
              <button key={tab} onClick={()=>setActiveSection(tab)} style={{height:'48px',padding:'0 14px',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:500,whiteSpace:'nowrap',cursor:'pointer',borderBottom:'2px solid transparent',display:'flex',alignItems:'center',background:'none',border:'none',borderBottomColor:activeSection===tab?'#BD1313':'transparent',color:activeSection===tab?'#BD1313':'#94A3B8'}}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
            ))}
          </div>

          {/* Form Content */}
          <div style={{flex:1,overflowY:'auto',padding:'20px'}} className="inner-scroll">
            {/* Personal Info */}
            {activeSection==='personal'&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[{label:'FULL NAME',key:'fullName',col:1},{label:'PROFESSIONAL TITLE',key:'title',col:1},{label:'EMAIL ADDRESS',key:'email',col:1},{label:'PHONE NUMBER',key:'phone',col:1},{label:'LINKEDIN URL',key:'linkedin',col:1},{label:'PORTFOLIO URL',key:'portfolio',col:1,placeholder:'Optional'},{label:'CITY / LOCATION',key:'city',col:2}].map((field,i)=>(
                <div key={i} style={{gridColumn:field.col===2?'1 / -1':'auto'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>{field.label}</div>
                  <input type="text" value={(resumePersonal as any)[field.key]} onChange={(e)=>setResumePersonal({...resumePersonal,[field.key]:e.target.value})} placeholder={field.placeholder||''} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                </div>
              ))}
            </div>}

            {/* Education */}
            {activeSection==='education'&&<div>
              {resumeData.education.map((entry,i)=>(
                <div key={i} style={{background:'#FAFAFA',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'14px',marginBottom:'10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                  <div style={{gridColumn:'1 / -1'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>DEGREE / PROGRAM</div>
                    <input type="text" defaultValue={entry.degree} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>INSTITUTION</div>
                    <input type="text" defaultValue={entry.institution} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>YEAR OF GRADUATION</div>
                    <input type="text" defaultValue={entry.year} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>CGPA / GRADE</div>
                    <input type="text" defaultValue={entry.grade} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div style={{gridColumn:'1 / -1'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>LOCATION</div>
                    <input type="text" defaultValue={entry.location} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                </div>
              ))}
              <button style={{width:'100%',height:'44px',border:'2px dashed #F5BFBF',background:'#FFF8F8',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>+ Add Education</button>
            </div>}

            {/* Experience */}
            {activeSection==='experience'&&<div>
              {resumeData.experience.map((entry,i)=>(
                <div key={i} style={{background:'#FAFAFA',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'14px',marginBottom:'10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                  <div style={{gridColumn:'1 / -1'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>JOB TITLE</div>
                    <input type="text" defaultValue={entry.title} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>COMPANY</div>
                    <input type="text" defaultValue={entry.company} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>START DATE</div>
                    <input type="text" defaultValue={entry.startDate} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div style={{gridColumn:'1 / -1'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>DESCRIPTION</div>
                    <textarea defaultValue={entry.description} style={{minHeight:'100px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',resize:'none'}}/>
                  </div>
                </div>
              ))}
              <button style={{width:'100%',height:'44px',border:'2px dashed #F5BFBF',background:'#FFF8F8',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>+ Add Experience</button>
            </div>}

            {/* Skills */}
            {activeSection==='skills'&&<div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'4px'}}>Your Skills</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'12px'}}>Add skills relevant to your target role</div>

              <input type="text" value={skillInput} onChange={(e)=>setSkillInput(e.target.value)} onKeyDown={handleSkillInputKeyDown} placeholder="Type a skill and press Enter..." style={{height:'44px',width:'100%',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',fontFamily:'var(--font-body)',fontSize:'14px'}}/>

              <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginTop:'10px'}}>
                {addedSkills.map((skill,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:6,background:'#FDF2F2',border:'1px solid #F5BFBF',borderRadius:9999,padding:'4px 10px',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,color:'#BD1313'}}>
                    {skill}
                    <span onClick={()=>handleRemoveSkill(skill)} style={{cursor:'pointer',fontSize:14,lineHeight:1,color:'#BD1313'}}>×</span>
                  </div>
                ))}
              </div>

              <div style={{marginTop:'16px'}}>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8',marginBottom:'8px'}}>Suggested for your profile:</div>
                <div style={{display:'flex',overflowX:'auto',gap:'8px',paddingBottom:'4px'}} className="inner-scroll">
                  {suggestedSkills.filter(s=>!addedSkills.includes(s)).slice(0,10).map((skill,i)=>(
                    <div key={i} onClick={()=>handleAddSkill(skill)} style={{flexShrink:0,background:'#F1F5F9',border:'1px solid #E2E8F0',borderRadius:9999,padding:'4px 12px',fontFamily:'var(--font-body)',fontSize:11,fontWeight:600,color:'#475569',cursor:'pointer',whiteSpace:'nowrap'}}>{skill}</div>
                  ))}
                </div>
              </div>
            </div>}

            {/* Projects */}
            {activeSection==='projects'&&<div>
              {resumeData.projects.map((entry,i)=>(
                <div key={i} style={{background:'#FAFAFA',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'14px',marginBottom:'10px'}}>
                  <div style={{marginBottom:'10px'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>PROJECT NAME</div>
                    <input type="text" defaultValue={entry.name} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                  <div style={{marginBottom:'10px'}}>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>DESCRIPTION</div>
                    <textarea defaultValue={entry.description} style={{minHeight:'100px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A',resize:'none'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'10px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'4px'}}>GITHUB / PROJECT URL</div>
                    <input type="text" defaultValue={entry.link} style={{height:'44px',background:'white',border:'1.5px solid #E2E8F0',borderRadius:'8px',padding:'0 12px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',color:'#0F172A'}}/>
                  </div>
                </div>
              ))}
              <button style={{width:'100%',height:'44px',border:'2px dashed #F5BFBF',background:'#FFF8F8',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'12px',cursor:'pointer'}}>+ Add Project</button>
            </div>}

            {/* Summary */}
            {activeSection==='summary'&&<div>
              <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700,marginBottom:'4px'}}>Professional Summary</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#94A3B8',marginBottom:'12px'}}>A powerful 3-4 line intro about yourself</div>

              <textarea value={resumeSummary} onChange={(e)=>setResumeSummary(e.target.value)} style={{minHeight:'120px',border:'1.5px solid #E2E8F0',borderRadius:'12px',padding:'14px',width:'100%',fontFamily:'var(--font-body)',fontSize:'14px',lineHeight:1.6,resize:'none'}}/>

              <div style={{textAlign:'right',fontFamily:'var(--font-body)',fontSize:'11px',color:'#94A3B8'}}>{resumeSummary.length}/400</div>

              <button onClick={handleGenerateSummary} style={{width:'100%',height:'48px',marginTop:'12px',background:'#FDF2F2',border:'1px solid #F5BFBF',color:'#BD1313',borderRadius:'12px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
                <img src="https://img.icons8.com/3d-fluency/100/star.png" width="18" height="18" alt=""/>
                {generating?'Generating...':generated?'✨ Regenerate':'✨ Generate with AI'}
              </button>
            </div>}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div style={{overflowY:'auto',background:'#F8FAFF'}} className="inner-scroll">
          <div style={{margin:'16px',padding:'28px',background:'white',border:'1px solid #E2E8F0',borderRadius:'16px',minHeight:'calc(100% - 32px)',boxShadow:'0 4px 16px rgba(0,0,0,0.06)'}}>
            {/* Resume Header */}
            <div style={{background:activeTemplate.headerColor,margin:'-28px -28px 20px',padding:'20px 28px',borderRadius:'16px 16px 0 0'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'white'}}>{resumePersonal.fullName}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'rgba(255,255,255,0.85)'}}>{resumePersonal.title}</div>
              <div style={{marginTop:'8px',display:'flex',gap:'16px',flexWrap:'wrap'}}>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📧 {resumePersonal.email}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📱 {resumePersonal.phone}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📍 {resumePersonal.city}</span>
              </div>
            </div>

            {/* Summary Section */}
            {resumeSummary&&<div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>SUMMARY</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569',lineHeight:1.6}}>{resumeSummary}</div>
            </div>}

            {/* Experience Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>EXPERIENCE</div>
              {resumeData.experience.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.title}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',marginTop:'2px'}}>{entry.company} · {entry.startDate} - {entry.endDate}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569',marginTop:'6px',lineHeight:1.5}}>{entry.description}</div>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>EDUCATION</div>
              {resumeData.education.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.degree}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B'}}>{entry.institution} · {entry.year} · {entry.grade}</div>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>SKILLS</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                {addedSkills.map((skill,i)=>(
                  <span key={i} style={{background:'#FDF2F2',border:'1px solid #F5BFBF',color:'#BD1313',borderRadius:9999,padding:'3px 10px',fontSize:11,fontWeight:600,fontFamily:'var(--font-body)'}}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>PROJECTS</div>
              {resumeData.projects.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.name}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569',marginTop:'4px'}}>{entry.description}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#BD1313',marginTop:'2px'}}>{entry.link}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  // Screen 6: Resume Complete
  if (screen === 'resume-complete') {
    const resumeSections = [
      { label: 'Personal', value: 100 },
      { label: 'Education', value: 100 },
      { label: 'Experience', value: 100 },
      { label: 'Skills', value: 60 },
      { label: 'Projects', value: 40 },
      { label: 'Summary', value: resumeSummary ? 100 : 0 }
    ];

    return <div className="flex-1 flex flex-col overflow-hidden screen-enter">
      {/* Section Header */}
      <div style={{height:'56px',flexShrink:0,background:'white',borderBottom:'1px solid #E2E8F0',padding:'0 24px',display:'flex',alignItems:'center',gap:'12px'}}>
        <button onClick={()=>setScreen('resume-editor')} style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center'}}><ChevronLeft size={20} color="#475569"/></button>
        <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,color:'#0F172A'}}>Resume Preview 📄</div>
        <div style={{marginLeft:'auto'}}>
          <span style={{background:'#FDF2F2',color:'#BD1313',border:'1px solid #F5BFBF',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:700,borderRadius:9999,padding:'3px 12px'}}>Strength: 68%</span>
        </div>
      </div>

      {/* Content */}
      <div style={{flex:1,overflow:'hidden',padding:'16px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'60% 40%',gap:'16px',height:'100%'}}>
          {/* Left: Resume Preview Panel */}
          <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'20px',overflowY:'auto',padding:'28px',boxShadow:'0 4px 16px rgba(0,0,0,0.06)'}} className="inner-scroll">
            {/* Resume Header */}
            <div style={{background:activeTemplate.headerColor,margin:'-28px -28px 20px',padding:'20px 28px',borderRadius:'16px 16px 0 0'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:800,color:'white'}}>{resumePersonal.fullName}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'rgba(255,255,255,0.85)'}}>{resumePersonal.title}</div>
              <div style={{marginTop:'8px',display:'flex',gap:'16px',flexWrap:'wrap'}}>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📧 {resumePersonal.email}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📱 {resumePersonal.phone}</span>
                <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'rgba(255,255,255,0.75)'}}>📍 {resumePersonal.city}</span>
              </div>
            </div>

            {/* Summary Section */}
            {resumeSummary&&<div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>SUMMARY</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#475569',lineHeight:1.6}}>{resumeSummary}</div>
            </div>}

            {/* Experience Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>EXPERIENCE</div>
              {resumeData.experience.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.title}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B',marginTop:'2px'}}>{entry.company} · {entry.startDate} - {entry.endDate}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569',marginTop:'6px',lineHeight:1.5}}>{entry.description}</div>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>EDUCATION</div>
              {resumeData.education.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.degree}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#64748B'}}>{entry.institution} · {entry.year} · {entry.grade}</div>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>SKILLS</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                {addedSkills.map((skill,i)=>(
                  <span key={i} style={{background:'#FDF2F2',border:'1px solid #F5BFBF',color:'#BD1313',borderRadius:9999,padding:'3px 10px',fontSize:11,fontWeight:600,fontFamily:'var(--font-body)'}}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div>
              <div style={{fontFamily:'var(--font-body)',fontSize:'11px',fontWeight:700,color:activeTemplate.accent,textTransform:'uppercase',letterSpacing:'1px',borderBottom:`1.5px solid ${activeTemplate.accent}33`,paddingBottom:'4px',marginBottom:'8px'}}>PROJECTS</div>
              {resumeData.projects.map((entry,i)=>(
                <div key={i} style={{marginBottom:'12px'}}>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{entry.name}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#475569',marginTop:'4px'}}>{entry.description}</div>
                  <div style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#BD1313',marginTop:'2px'}}>{entry.link}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Suggestions Panel */}
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {/* Suggestions Card */}
            <div style={{flex:1,overflow:'hidden',background:'white',border:'1px solid #E2E8F0',borderRadius:'20px',padding:'20px',display:'flex',flexDirection:'column'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'15px',fontWeight:700}}>AI Suggestions ✨</div>
                <span style={{background:'#FDF2F2',color:'#BD1313',border:'1px solid #F5BFBF',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:700,borderRadius:9999,padding:'3px 12px'}}>68%</span>
              </div>

              {/* Strength Meter */}
              <div style={{marginTop:'12px',marginBottom:'12px'}}>
                <div style={{fontFamily:'var(--font-body)',fontSize:'11px',textTransform:'uppercase',color:'#94A3B8',marginBottom:'6px'}}>Resume Strength — 68%</div>
                <div style={{height:'6px',background:'#F5BFBF',borderRadius:9999,overflow:'hidden'}}>
                  <div style={{height:'100%',background:'#BD1313',width:'68%'}}/>
                </div>
              </div>

              {/* Suggestions List */}
              <div style={{flex:1,overflowY:'auto',marginTop:'12px',maxHeight:'200px'}} className="inner-scroll">
                {aiSuggestions.map((item,i)=>(
                  <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',padding:'10px 0',borderBottom:'1px solid #F8FAFF'}}>
                    <span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,color:item.type==='good'?'#16A34A':'#0F172A'}}>{item.title}</div>
                      <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'#94A3B8',marginTop:2}}>{item.detail}</div>
                    </div>
                    {item.type!=='good'&&<span style={{fontFamily:'var(--font-body)',fontSize:11,fontWeight:600,color:'#BD1313',cursor:'pointer',flexShrink:0}}>Fix →</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Section Bars Card */}
            <div style={{background:'white',border:'1px solid #E2E8F0',borderRadius:'20px',padding:'16px 20px'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,marginBottom:'10px'}}>Sections</div>
              {resumeSections.map((s,i)=>(
                <div key={i} style={{marginBottom:8}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                    <span style={{fontFamily:'var(--font-body)',fontSize:11,color:'#475569'}}>{s.label}</span>
                    <span style={{fontFamily:'var(--font-body)',fontSize:11,fontWeight:600,color:s.value===100?'#16A34A':s.value>0?'#BD1313':'#DC2626'}}>{s.value}%</span>
                  </div>
                  <div style={{height:4,background:'#F5BFBF',borderRadius:9999,overflow:'hidden'}}>
                    <div style={{height:'100%',borderRadius:9999,width:s.value+'%',background:s.value===100?'#16A34A':s.value>0?'#BD1313':'#F5BFBF',transition:'width 0.8s ease-out'}}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons Row */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px'}}>
              <button onClick={()=>setTimeout(()=>showToast("Resume downloaded! 📄"),0)} style={{height:'40px',background:'#BD1313',color:'white',border:'none',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'8px',cursor:'pointer'}}>⬇ Download PDF</button>
              <button onClick={()=>setScreen('resume-editor')} style={{height:'40px',background:'transparent',border:'1.5px solid #F5BFBF',color:'#BD1313',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'8px',cursor:'pointer'}}>✏ Edit</button>
              <button onClick={()=>setTimeout(()=>showToast("Link copied! 🔗"),0)} style={{height:'40px',background:'transparent',border:'1.5px solid #E2E8F0',color:'#64748B',fontFamily:'var(--font-body)',fontSize:'13px',fontWeight:600,borderRadius:'8px',cursor:'pointer'}}>🔗 Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  // Fallback
  return null;
}