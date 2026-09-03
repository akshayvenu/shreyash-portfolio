Continue building EduVision.
Read system guidelines fully before writing any code.
Do NOT rebuild Steps 1, 2, or 3 screens.
Only ADD Resume Builder screens.
All existing screens must remain intact.

=============================================================
STEP 4 — RESUME BUILDER MODULE
=============================================================

Build the complete Resume Builder module.
6 screens total.

Module color identity: #BD1313 / #FFF1F2
All headers use soft rose gradient background.

Update navigation:
  sidebar FileText icon → setScreen('resume')
  dashboard "Build Resume" card → setScreen('resume')
  'resume' → template selection → 'resume-templates'
  'resume-templates' → use template → 'resume-method'
  'resume-method' → start fresh → 'resume-editor'
  'resume-method' → upload → 'resume-upload'
  'resume-upload' → continue → 'resume-editor'
  'resume-editor' → done → 'resume-complete'
  'resume-complete' → edit → 'resume-editor'

=============================================================
RESUME MOCK DATA — ADD TO TOP OF FILE
=============================================================

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
    {id:'sk_1', name:'JavaScript', level:'Expert'},
    {id:'sk_2', name:'React', level:'Intermediate'},
    {id:'sk_3', name:'Python', level:'Intermediate'},
    {id:'sk_4', name:'SQL', level:'Intermediate'},
    {id:'sk_5', name:'Node.js', level:'Beginner'},
    {id:'sk_6', name:'Git', level:'Expert'}
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
  {id:1, type:'missing', icon:'💡',
   title:'Add certifications',
   detail:'Certifications boost credibility by 40%',
   priority:'high'},
  {id:2, type:'improve', icon:'💡',
   title:'Expand project descriptions',
   detail:'Add metrics and impact numbers',
   priority:'high'},
  {id:3, type:'missing', icon:'💡',
   title:'Add LinkedIn URL',
   detail:'Increases profile visibility by 30%',
   priority:'medium'},
  {id:4, type:'good', icon:'✅',
   title:'Contact info complete',
   detail:'Great — all basics are covered',
   priority:'low'}
];

const resumeTemplates = [
  {id:'classic', name:'Classic',
   headerColor:'#BD1313', accent:'#BD1313'},
  {id:'modern', name:'Modern',
   headerColor:'#0F172A', accent:'#475569'},
  {id:'minimal', name:'Minimal',
   headerColor:'#E2E8F0', accent:'#94A3B8'},
  {id:'bold', name:'Bold',
   headerColor:'#D97706', accent:'#D97706'},
  {id:'creative', name:'Creative',
   headerColor:'#7C3AED', accent:'#7C3AED'},
  {id:'executive', name:'Executive',
   headerColor:'#1E293B', accent:'#334155'}
];

const suggestedSkills = [
  'JavaScript','Python','React','SQL',
  'Node.js','Communication','Leadership',
  'Problem Solving','Excel','Figma',
  'Git','Machine Learning','TypeScript',
  'System Design','AWS'
];

=============================================================
SCREEN 1 — RESUME BUILDER HOME
=============================================================

screen: 'resume'
animation: screenEnter 280ms ease-out both

Active sidebar: FileText → #BD1313

SECTION HEADER (56px, flex-shrink 0):
  background: white
  border-bottom: 1px solid #E2E8F0
  padding: 0 24px
  display flex, align-items center
  justify-content space-between

  LEFT:
    Icon circle (36px, bg #FFF1F2):
      <img src="https://img.icons8.com/3d-fluency/100/resume.png"
           width="22" height="22"/>
    "Resume Builder 📄" Syne 20px weight 700 #0F172A
    "Build a resume that gets you hired"
    Plus Jakarta Sans 12px #94A3B8

  RIGHT (resume exists state):
    "Last edited: Today" neutral chip
    "68%" primary chip

CONTENT AREA (flex 1, overflow hidden, padding 24px):
  display flex, flex-direction column, gap 16px

── RESUME STRENGTH ROW ──────────────────────────────────────

display flex, align-items center
gap 20px, padding 16px 20px
background: linear-gradient(135deg, #FFF1F2, white)
border: 1px solid #F5BFBF
border-radius: 20px

LEFT: CircularProgress (80px, value=68)

CENTER:
  "Resume Strength" Syne 16px weight 700 #0F172A
  "Add 2 more sections to reach 80%"
  Plus Jakarta Sans 13px #64748B, margin-top 4px

  Progress bar (full width, margin-top 8px):
    height 6px, track #F5BFBF
    fill #BD1313, width 68%
    radius 9999px

RIGHT:
  "View AI Tips →" ghost button #BD1313
  onClick: scroll to AI suggestions

── OPTION CARDS ROW ─────────────────────────────────────────

display grid, grid-template-columns 1fr 1fr
gap 14px

START FRESH CARD:
  bg white, border 1.5px #E2E8F0
  border-radius 20px, padding 20px
  border-left 3px #BD1313
  cursor pointer, transition all 0.2s
  hover: translateY(-3px), shadow rgba(189,19,19,0.1)

  Top: icon circle (52px, bg #FFF1F2, border-radius 14px):
    <img src="https://img.icons8.com/3d-fluency/100/resume.png"
         width="28" height="28"
         style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.1))"/>

  Title: "Start Fresh ✨" Syne 16px weight 700 #0F172A
  mt 10px

  Description: "Build step-by-step with AI guidance"
  Plus Jakarta Sans 13px #64748B, mt 4px

  CTA: "Create Resume →" ghost button
  mt 14px, #BD1313 13px weight 600
  onClick: setScreen('resume-templates')

UPLOAD EXISTING CARD:
  Same structure
  border-left 3px #D97706
  bg linear-gradient(135deg, #FFFBEB, white)
  hover: shadow rgba(217,119,6,0.1)

  Icon circle (bg #FFFBEB):
    <img src="https://img.icons8.com/3d-fluency/100/upload-to-cloud.png"
         width="28" height="28"/>

  Title: "Upload Resume 📤" Syne 16px weight 700
  Description: "Upload PDF/DOC — we'll extract info"
  CTA: "Upload File →" ghost amber #D97706
  onClick: setScreen('resume-upload')

── AI NUDGE BANNER ──────────────────────────────────────────

display flex, align-items center
gap 12px, padding 12px 16px
background #FDF2F2, border 1px #F5BFBF
border-radius 12px

Left: Sparkles icon:
  <img src="https://img.icons8.com/3d-fluency/100/star.png"
       width="20" height="20"/>

Text: "Complete your Skills section to reach 80% strength"
Plus Jakarta Sans 13px #BD1313 weight 500, flex 1

Right: X dismiss button
  XCircle icon 16px #BD1313, cursor pointer
  onClick: hide banner (useState)

=============================================================
SCREEN 2 — TEMPLATE SELECTION
=============================================================

screen: 'resume-templates'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  Left: back arrow + "Choose a Template 🎨"
        "Pick a style that fits your goal" muted
  onClick back: setScreen('resume')

FILTER TABS ROW (48px, flex-shrink 0):
  background white, border-bottom 1px #E2E8F0
  padding 0 24px
  display flex, align-items flex-end, gap 24px

  4 tabs: [All] [Simple] [Creative] [Professional]
  
  const [activeTab, setActiveTab] = useState('All')
  
  Each tab (height 48px):
    Plus Jakarta Sans 14px weight 500
    Inactive: #94A3B8, no underline
    Active: #BD1313, border-bottom 2px #BD1313
    cursor pointer, transition all 200ms

TEMPLATE GRID (flex 1, overflow-y auto, padding 20px 24px):
  display grid
  grid-template-columns: repeat(3, 1fr)
  gap 14px
  padding-bottom 80px (space for sticky bar)

  const [selectedTemplate, setSelectedTemplate] = useState(null)

  Each TEMPLATE CARD (height 160px):
    bg white, border 1.5px #E2E8F0
    border-radius 16px, overflow hidden
    cursor pointer, transition all 0.2s
    position relative

    hover: translateY(-3px)
           shadow 0 8px 24px rgba(189,19,19,0.1)

    SELECTED:
      border 2px #BD1313
      shadow 0 0 0 4px rgba(189,19,19,0.08)

    PREVIEW AREA (top 70%, padding 12px):
      Header bar (height 10px, full width):
        background: template.headerColor
        border-radius 4px 4px 0 0
        margin-bottom 8px

      Text bars (simulate resume content):
        Bar 1: height 5px, width 75%, bg #E2E8F0
               border-radius 3px, mb 4px
        Bar 2: height 4px, width 55%, bg #E2E8F0
               border-radius 3px, mb 4px
        Bar 3: height 3px, width 80%, bg #F1F5F9
               border-radius 3px, mb 3px
        Bar 4: height 3px, width 60%, bg #F1F5F9
               border-radius 3px, mb 3px
        Bar 5: height 3px, width 70%, bg #F1F5F9
               border-radius 3px

    CARD FOOTER (bottom 30%):
      border-top 1px #E2E8F0, padding 8px 12px
      display flex, align-items center
      justify-content space-between

      Template name:
        Plus Jakarta Sans 12px weight 600 #0F172A
        Colored dot (6px): template.accent color
        display flex, gap 6px, align-items center

      "Preview" ghost link:
        Plus Jakarta Sans 11px #BD1313

    SELECTED CHECKMARK (absolute top-right):
      width 22px, height 22px, border-radius 50%
      bg #BD1313, color white
      display flex, align-items center
      justify-content center, font-size 12px
      position absolute, top 8px, right 8px
      animation: badgePop 300ms ease-out
      Only show when selected

  6 TEMPLATES from resumeTemplates mock data

STICKY BOTTOM BAR (64px, position sticky bottom):
  background white, border-top 1px #E2E8F0
  padding 0 24px
  display flex, align-items center
  justify-content space-between

  Left:
    If none selected:
      "No template selected" Plus Jakarta Sans 13px #94A3B8
    If selected:
      "Selected: " 13px #64748B +
      template name chip (primary style)

  Right: "Use This Template →" primary button
    height 44px, width 180px
    Disabled (bg #F5BFBF) if none selected
    onClick: setScreen('resume-method')

=============================================================
SCREEN 3 — BUILD METHOD CHOICE
=============================================================

screen: 'resume-method'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  Back arrow + "How would you like to start?"
  "Choose your preferred method" muted
  onClick back: setScreen('resume-templates')

CONTENT (flex 1, display flex, flex-direction column
         align-items center, justify-content center
         padding 40px 24px, gap 20px):

  Heading (text-center):
    "Let's build your resume 🚀"
    Syne 28px weight 800 #0F172A, mb 8px
    "Choose how you want to get started"
    Plus Jakarta Sans 15px #64748B

  TWO OPTION CARDS (max-width 560px, width 100%):
    display grid, grid-template-columns 1fr 1fr
    gap 16px, margin-top 16px

    START FRESH CARD:
      bg white, border 2px #E2E8F0
      border-radius 20px, padding 28px 24px
      text-align center, cursor pointer
      transition all 0.2s
      hover: border #BD1313, translateY(-4px)
             shadow 0 12px 32px rgba(189,19,19,0.12)

      Illustration (80px, margin auto):
        <img src="https://img.icons8.com/3d-fluency/100/resume.png"
             width="72" height="72"
             style="filter: drop-shadow(0 8px 20px rgba(0,0,0,0.15));
                    animation: float 3s ease-in-out infinite;
                    display: block; margin: 0 auto 16px"/>

      Title: "Create Manually ✏️"
        Syne 18px weight 700 #0F172A, mb 8px

      Description:
        "Build your resume step-by-step with AI guidance and suggestions"
        Plus Jakarta Sans 13px #64748B, line-height 1.6, mb 20px

      Button: "Start Building →"
        primary full width, height 44px
        onClick: setScreen('resume-editor')

    UPLOAD CARD:
      Same structure but amber accent
      hover: border #D97706
             shadow rgba(217,119,6,0.12)

      Illustration:
        <img src="https://img.icons8.com/3d-fluency/100/upload-to-cloud.png"
             width="72" height="72"
             style="filter: drop-shadow(0 8px 20px rgba(0,0,0,0.15));
                    animation: float 3.5s ease-in-out infinite;
                    display: block; margin: 0 auto 16px"/>

      Title: "Upload Existing 📤"
        Syne 18px weight 700 #0F172A

      Description:
        "Upload your existing resume PDF or DOC and we'll extract your information"
        Plus Jakarta Sans 13px #64748B

      Button: "Upload Resume →"
        secondary full width, height 44px
        border #FCD34D, color #D97706
        hover: bg #FFFBEB
        onClick: setScreen('resume-upload')

=============================================================
SCREEN 4 — UPLOAD RESUME
=============================================================

screen: 'resume-upload'
animation: screenEnter 280ms ease-out both

SECTION HEADER (56px):
  Back + "Upload Your Resume 📤"
  "We'll extract your info automatically" muted
  onClick back: setScreen('resume-method')

CONTENT (flex 1, overflow-y auto, padding 24px):
  max-width 640px, margin 0 auto, width 100%

  const [uploadState, setUploadState] =
    useState('idle')
    // 'idle' | 'uploading' | 'complete'
  const [uploadProgress, setUploadProgress] =
    useState(0)

── UPLOAD ZONE ──────────────────────────────────────────────

height 220px
border: 2px dashed #F5BFBF
border-radius: 20px
background: #FFF8F8
display flex, flex-direction column
align-items center, justify-content center
cursor pointer, transition all 0.2s
margin-bottom 16px

Drag hover: border #BD1313, bg #FEF2F2

IDLE STATE:
  <img src="https://img.icons8.com/3d-fluency/100/upload-to-cloud.png"
       width="56" height="56"
       style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
              animation: float 3s ease-in-out infinite;
              margin-bottom: 12px"/>

  "Drag & drop your resume here"
  Syne 16px weight 700 #0F172A, mb 4px

  "or click to browse files"
  Plus Jakarta Sans 13px #94A3B8, mb 8px

  "Accepts: PDF, DOC, DOCX · Max 5MB"
  Plus Jakarta Sans 11px #94A3B8, mb 16px

  "Browse File" secondary button (height 40px width 140px)
  onClick: simulate upload:
    setUploadState('uploading')
    Animate progress 0→100 over 2s
    Then: setUploadState('complete')
    showToast("Resume uploaded successfully! ✓")
    showXPToast("+30 XP 🎉")

UPLOADING STATE:
  Spinner (32px, border 3px, brand red top):
    animation spin 0.7s linear infinite
    margin-bottom 12px

  "Uploading your resume..."
  Plus Jakarta Sans 14px weight 500 #0F172A, mb 12px

  Progress bar (width 200px, height 4px):
    track #F5BFBF, fill #BD1313
    width: uploadProgress%, transition width 100ms
    border-radius 9999px

  "Extracting information..." (shows at 60%+):
    Plus Jakarta Sans 12px #94A3B8

COMPLETE STATE:
  CheckCircle icon (lucide) 48px #16A34A
  animation: badgePop 400ms ease-out
  margin-bottom 12px

  "Resume uploaded successfully! ✓"
  Plus Jakarta Sans 15px weight 600 #16A34A, mb 4px

  File chip: "resume_rahul.pdf"
  bg #F0FDF4, border #86EFAC, color #16A34A
  12px weight 600, radius 9999px, padding 4px 14px

── AI TIP STRIP (shows after upload) ────────────────────────

display flex, align-items center, gap 10px
padding 12px 16px, margin-top 16px
bg #FEF3C7, border 1px #FCD34D, radius 12px

<img src="https://img.icons8.com/3d-fluency/100/light-on.png"
     width="20" height="20"/>

"✨ We found 3 sections to improve in your resume"
Plus Jakarta Sans 13px #D97706 weight 500

── EXTRACTED INFO CARD (shows after upload) ─────────────────

bg white, border 1px #E2E8F0
border-radius 20px, padding 20px
margin-top 16px

HEADER ROW:
  "Extracted Information" Syne 15px weight 700
  "Review and confirm" neutral chip right

GRID (2 columns, gap 12px, margin-top 14px):
  Each field display:
    Label: 10px uppercase #94A3B8, mb 2px
    Value: Plus Jakarta Sans 14px weight 500 #0F172A
    bg #F8FAFF, border 1px #E2E8F0
    radius 8px, padding 8px 12px

  Name: "Rahul Sharma"
  Email: "rahul@vit.edu"
  Phone: "+91 98765 43210"
  Experience: "Software Intern — TCS Digital"
  Education: "B.Tech CS — VIT Vellore — 2025"
  Skills: chips row:
    ['React','JavaScript','Python','SQL']
    Each: primary chip style, 12px

── ACTION BUTTONS ───────────────────────────────────────────

display flex, flex-direction column, gap 10px
margin-top 20px

"Continue Editing →" primary button full width h48
  onClick: setScreen('resume-editor')
  showToast("Resume imported! Let's refine it 📄")

"Start Fresh Instead" secondary button full width h44
  onClick: setScreen('resume-editor')

=============================================================
SCREEN 5 — RESUME EDITOR (SPLIT SCREEN)
=============================================================

screen: 'resume-editor'
animation: screenEnter 280ms ease-out both

This is the main editor — SPLIT SCREEN layout.
LEFT 45%: Form sections with tabs
RIGHT 55%: Live resume preview

HEADER BAR (56px, flex-shrink 0):
  background white, border-bottom 1px #E2E8F0
  padding 0 24px
  display flex, align-items center, gap 12px

  Back arrow → setScreen('resume-method')
  "Resume Editor ✏️" Syne 16px weight 700

  Strength bar (flex 1, max-width 200px, margin 0 auto):
    "Strength: 68%" label left, 11px muted
    Progress bar: height 4px, track #F5BFBF, fill #BD1313

  Right buttons:
    "Save" secondary button h36 w80
      onClick: showToast("Resume saved ✓")
               showXPToast("+30 XP 🎉")
    "Preview →" primary button h36 w100
      onClick: setScreen('resume-complete')

SPLIT CONTENT (flex 1, overflow hidden):
  display grid, grid-template-columns 45% 55%
  height 100%

── LEFT PANEL — FORM ────────────────────────────────────────

border-right 1px #E2E8F0
display flex, flex-direction column
overflow hidden

SECTION TABS (48px, flex-shrink 0):
  background #FAFAFA, border-bottom 1px #E2E8F0
  display flex, overflow-x auto
  padding 0 16px, gap 0
  scrollbar-width none

  const [activeSection, setActiveSection] =
    useState('personal')

  Tabs: Personal | Education | Experience
        Skills | Projects | Summary

  Each tab (height 48px, padding 0 16px):
    Plus Jakarta Sans 13px weight 500
    white-space nowrap, cursor pointer
    border-bottom 2px transparent
    
    Active: color #BD1313, border-bottom #BD1313
    Inactive: color #94A3B8

FORM CONTENT (flex 1, overflow-y auto, padding 20px):
  scrollbar-width thin
  scrollbar-color #F5BFBF transparent

  PERSONAL INFO TAB:
    display grid, grid-template-columns 1fr 1fr
    gap 12px

    Input: "FULL NAME" value "Rahul Sharma"
    Input: "PROFESSIONAL TITLE" value "Software Engineer"
    Input: "EMAIL ADDRESS" with Mail icon
           value "rahul@vit.edu"
    Input: "PHONE NUMBER" with Phone icon
           value "+91 98765 43210"
    Input: "LINKEDIN URL"
           value "linkedin.com/in/rahulsharma"
    Input: "PORTFOLIO / WEBSITE" placeholder "Optional"
    Input: "CITY / LOCATION" col-span 2 (full width)
           value "Vellore, Tamil Nadu"

  EDUCATION TAB:
    Section title: "Education History"
    Syne 15px weight 700, mb 14px

    Entry cards (from resumeData.education):
      Each card: bg #FAFAFA, border 1px #E2E8F0
        border-radius 12px, padding 14px
        position relative, margin-bottom 10px

        Delete button (absolute top-right):
          X icon 16px #DC2626, cursor pointer

        2-column grid, gap 10px:
          Input: "DEGREE / PROGRAM"
                 value entry.degree
          Input: "INSTITUTION"
                 value entry.institution
          Input: "YEAR"
                 value entry.year
          Input: "CGPA / PERCENTAGE"
                 value entry.grade
          Input: "LOCATION" col-span 2
                 value entry.location

    ADD BUTTON:
      full width, height 44px
      border 2px dashed #F5BFBF
      bg #FFF8F8, color #BD1313
      border-radius 12px
      display flex, align-items center
      justify-content center, gap 8px
      cursor pointer
      "+ Add Education"
      Plus Jakarta Sans 13px weight 600 #BD1313
      hover: bg #FDF2F2, border #BD1313

  EXPERIENCE TAB:
    Same pattern as Education

    Entry cards (from resumeData.experience):
      2-column grid:
        Input: "JOB TITLE" value entry.title
        Input: "COMPANY" value entry.company
        Input: "START DATE" value entry.startDate
        
        END DATE + PRESENT CHECKBOX:
          Input: "END DATE" value entry.endDate
          Checkbox row: "Currently working here"
          If checked: disable end date input

        Textarea: "DESCRIPTION" (full width, col-span 2)
          minHeight 80px, value entry.description
          Character counter: "180/300" bottom-right
          Plus Jakarta Sans 11px #94A3B8

    "+ Add Experience" dashed button same style

  SKILLS TAB:
    Section: "Your Skills"
    Subtitle: "Add skills relevant to your target role"
    mb 14px

    TAG INPUT:
      full width, height 44px
      border 1.5px #E2E8F0, radius 8px
      placeholder "Type a skill and press Enter..."
      onKeyDown Enter: add tag chip

      const [skillInput, setSkillInput] = useState('')
      const [addedSkills, setAddedSkills] =
        useState(resumeData.skills.map(s => s.name))

    ADDED SKILLS (chips, flex-wrap, gap 8px, mt 10px):
      Each chip: bg #FDF2F2, text #BD1313
        border #F5BFBF, radius 9999px
        padding 4px 10px, 12px weight 600
        display flex, align-items center, gap 6px
        X button: ×, cursor pointer
          onClick: remove skill

    SUGGESTED SKILLS (mt 16px):
      "Suggested for your profile:" 11px muted mb 8px
      
      Horizontal scroll, no scrollbar:
        display flex, overflow-x auto, gap 8px
        scrollbar-width none
        padding-bottom 4px

        Each suggestion chip:
          bg #F1F5F9, color #475569, border #E2E8F0
          11px weight 600, radius 9999px
          padding 4px 12px, cursor pointer
          hover: bg #FDF2F2, color #BD1313
          onClick: add to addedSkills

        From suggestedSkills array (first 10)

  PROJECTS TAB:
    Same pattern as Experience entries

    Entry cards (from resumeData.projects):
      Input: "PROJECT NAME" value entry.name
      
      Tech stack tag input (same as skills):
        placeholder "Add technologies..."
        Show entry.techStack as chips
      
      Textarea: "DESCRIPTION"
        value entry.description, minHeight 70px
      
      Input: "PROJECT URL / GITHUB"
        value entry.link
        placeholder "Optional"

    "+ Add Project" dashed button

  SUMMARY TAB:
    Section: "Professional Summary"
    Subtitle: "A powerful 3-4 line intro about yourself"
    mb 14px

    Textarea (minHeight 120px, maxHeight 180px):
      value resumeData.summary
      placeholder "Write your professional summary here..."
      Character counter: "0/400" bottom-right

    AI GENERATE BUTTON (full width, height 48px, mt 12px):
      const [generating, setGenerating] = useState(false)
      const [generated, setGenerated] = useState(false)

      bg #FDF2F2, border 1px #F5BFBF, color #BD1313
      border-radius 12px
      display flex, align-items center
      justify-content center, gap 8px

      <img src="https://img.icons8.com/3d-fluency/100/star.png"
           width="18" height="18"/>

      {generating ? "Generating..." : generated ?
       "✨ Regenerate" : "✨ Generate with AI"}

      onClick:
        setGenerating(true)
        setTimeout(() => {
          setGenerating(false)
          setGenerated(true)
          showToast("AI summary generated! ✓")
        }, 1200)

      Loading: spinner + "Generating..."

── RIGHT PANEL — LIVE PREVIEW ───────────────────────────────

background #F8FAFF
overflow-y auto
scrollbar-width thin
scrollbar-color #F5BFBF transparent

PREVIEW WRAPPER (padding 20px):
  background white
  border: 1px solid #E2E8F0
  border-radius 16px
  margin 16px
  padding 28px
  min-height calc(100% - 32px)
  font-family: var(--font-body)
  box-shadow 0 4px 16px rgba(0,0,0,0.06)

  RESUME HEADER:
    background: resumeTemplates.find active template
                .headerColor
    margin -28px -28px 20px
    padding 20px 28px
    border-radius 16px 16px 0 0

    Name: Syne 22px weight 800 white
    "Rahul Sharma"

    Title: Plus Jakarta Sans 14px rgba(255,255,255,0.85)
    "Software Engineer"

    Contact row (mt 8px, display flex, gap 12px):
      "📧 rahul@vit.edu"
      "📱 +91 98765 43210"
      "📍 Vellore, TN"
      Each: Plus Jakarta Sans 11px rgba(255,255,255,0.75)

  SUMMARY SECTION:
    Section header: "SUMMARY"
      Plus Jakarta Sans 11px weight 700 #BD1313
      UPPERCASE, letter-spacing 1px
      border-bottom 1.5px #F5BFBF, pb 4px, mb 8px

    Paragraph: Plus Jakarta Sans 13px #475569
    line-height 1.6
    resumeData.summary text

  EXPERIENCE SECTION:
    "EXPERIENCE" header same style
    
    Each entry:
      Role: Plus Jakarta Sans 14px weight 600 #0F172A
      Company + dates: 12px #64748B, mt 2px
      Description: 12px #475569, mt 6px, line-height 1.5

  EDUCATION SECTION:
    "EDUCATION" header
    Degree: 14px weight 600 #0F172A
    Institution + year + grade: 12px #64748B

  SKILLS SECTION:
    "SKILLS" header
    Skills as chips:
      bg #FDF2F2, color #BD1313
      border #F5BFBF, radius 9999px
      11px weight 600, padding 3px 10px
      display flex, flex-wrap wrap, gap 6px

  PROJECTS SECTION:
    "PROJECTS" header
    Each: name bold + tech chips + description

=============================================================
SCREEN 6 — RESUME COMPLETE
=============================================================

screen: 'resume-complete'
animation: screenEnter 280ms ease-out both

CELEBRATORY BANNER (shows when strength >=80):
  bg #DCFCE7, border-bottom 1px #86EFAC
  padding 10px 24px
  display flex, align-items center, gap 8px
  "🎉 Your resume is interview-ready!"
  Plus Jakarta Sans 13px #16A34A weight 600
  flex-shrink 0

SECTION HEADER (56px):
  Back arrow + "Resume Preview 📄"
  Strength: "68%" badge right
  onClick back: setScreen('resume-editor')

CONTENT (flex 1, overflow hidden, padding 16px 24px):
  display grid, grid-template-columns 60% 40%
  gap 16px, height 100%

── LEFT: RESUME PREVIEW ─────────────────────────────────────

bg white, border 1px #E2E8F0
border-radius 20px, overflow-y auto
padding 28px
box-shadow 0 4px 16px rgba(0,0,0,0.06)

Same resume preview content as editor right panel
Full version, all sections visible

── RIGHT: AI SUGGESTIONS PANEL ──────────────────────────────

display flex, flex-direction column, gap 12px

SUGGESTIONS CARD:
  bg white, border 1px #E2E8F0
  border-radius 20px, padding 20px
  flex 1, overflow hidden

  HEADER ROW:
    "AI Suggestions ✨" Syne 15px weight 700
    "68%" badge primary right

  STRENGTH METER (margin-top 12px):
    "Resume Strength — 68%"
    Plus Jakarta Sans 11px uppercase #94A3B8, mb 6px
    Progress bar: h6px, track #F5BFBF
    fill: 68% #BD1313, animated

  SUGGESTIONS LIST (inner scroll, mt 12px):
    4 items from aiSuggestions
    Each (padding 10px 0, border-bottom #F8FAFF):
      display flex, gap 10px, align-items flex-start

      Icon: 18px emoji (💡 or ✅)
      
      Content:
        Title: 13px weight 600 #0F172A
        Detail: 12px #94A3B8, mt 2px
      
      "Fix →" ghost link right:
        Plus Jakarta Sans 11px #BD1313 weight 600
        cursor pointer

    type 'good' (✅): title in #16A34A

DOWNLOAD ROW (3 buttons):
  display grid, grid-template-columns 1fr 1fr 1fr
  gap 8px, margin-top 12px

  "⬇ Download PDF" primary h40
    bg #BD1313, Plus Jakarta Sans 13px white
    onClick: showToast("Resume downloaded! 📄")

  "✏ Edit" secondary h40
    onClick: setScreen('resume-editor')

  "🔗 Share" ghost h40
    onClick: showToast("Link copied! 🔗")

COMPLETION CELEBRATION (shows if strength >= 80):
  Below download row
  bg linear-gradient(135deg, #DCFCE7, #F0FDF4)
  border 1px #86EFAC, border-radius 16px
  padding 16px, text-align center

  <img src="https://i.ibb.co/WpP4kMkt/score-celebration.png"
       height="80"
       style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
              animation: float 3s ease-in-out infinite;
              display: block; margin: 0 auto 8px"/>

  "🎉 Resume is interview-ready!"
  Plus Jakarta Sans 13px #16A34A weight 600

=============================================================
RESUME STATE MANAGEMENT
=============================================================

const [resumeState, setResumeState] = useState({
  ...resumeData,
  selectedTemplate: 'classic',
  strength: 68,
  showNudgeBanner: true,
  uploadState: 'idle',
  uploadProgress: 0
});

const updateResumeSection = (section, data) => {
  setResumeState(prev => ({
    ...prev,
    [section]: data
  }));
  showToast(`${section} saved ✓`);
  showXPToast("+30 XP 🎉");
};

=============================================================
TOAST TRIGGERS FOR RESUME BUILDER
=============================================================

Enter resume module:
  showToast("Resume Builder — Let's get hired! 📄")

Template selected:
  showToast("Template selected ✓")

After upload complete:
  showToast("Resume uploaded successfully! ✓")
  showXPToast("+30 XP 🎉")

Section saved:
  showToast("Section saved ✓")
  showXPToast("+30 XP 🎉")

AI summary generated:
  showToast("AI summary generated! ✓")

Download clicked:
  showToast("Resume downloading... 📄")

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Split screen editor on desktop (45% / 55%)
✅ Live preview updates as user types (use state)
✅ All imgbb illustration URLs used correctly
✅ Icons8 3D Fluency URLs for all icons
✅ Float animations on all 3D illustrations
✅ Module color #BD1313 / #FFF1F2 throughout
✅ Section tabs switch content smoothly
✅ Tag input adds chips on Enter key
✅ Upload simulation: idle → uploading → complete
✅ AI generate button shows loading then fills textarea
✅ Strength meter shows 68% with circular progress
✅ AI suggestions panel shows 4 items
✅ Template grid shows 6 templates with CSS mockups
✅ Selected template shows checkmark badge
✅ Sticky bottom bar on template selection
✅ All toast notifications trigger correctly
✅ XP toasts trigger on key actions
✅ Primary color #BD1313 everywhere
✅ Fonts: Syne + Plus Jakarta Sans
✅ No full page scroll
✅ Device frame maintained

=============================================================
BUILD ORDER FOR STEP 4
=============================================================

1. Add resume mock data to top of file
2. Build Resume Home screen
3. Build Template Selection screen
4. Build Build Method Choice screen
5. Build Upload Resume screen
6. Build Resume Editor (split screen)
   - Left panel with section tabs
   - All 6 section forms
   - Right panel live preview
7. Build Resume Complete screen
8. Add resume state management
9. Add all navigation connections
10. Add toast triggers
11. Connect sidebar FileText icon
12. Connect dashboard action card

DO NOT rebuild Steps 1, 2, or 3 screens.
DO NOT change any existing code.
ONLY add Resume Builder screens.
=============================================================