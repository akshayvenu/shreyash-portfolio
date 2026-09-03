Continue building EduVision. 
Read system guidelines fully before writing any code.
Do NOT rebuild Step 1 screens — only ADD new screens.
All existing screens from Step 1 must remain intact.

=============================================================
STEP 2 — ONBOARDING FLOW
=============================================================

Build the complete 4-step onboarding flow
plus the Plan Ready celebration screen.

This flow triggers after OTP verification
for first-time users only.

Update screen navigation:
  'otp' verify → 'onboarding-1'
  'onboarding-1' continue → 'onboarding-2'
  'onboarding-2' continue → 'onboarding-3'
  'onboarding-3' continue → 'onboarding-4'
  'onboarding-4' continue → 'plan-ready'
  'plan-ready' → 'dashboard'

=============================================================
ONBOARDING SHELL — APPLIES TO ALL 4 STEPS
=============================================================

Full screen, no scroll.
No sidebar (not logged into main app yet).
animation: screenEnter 280ms ease-out both on every step.

OUTER WRAPPER:
  width: 100vw, height: 100vh
  background: #F1F5F9
  display: flex, align-items: center
  justify-content: center

APP CONTAINER:
  width: 100%, max-width: 1440px, height: 100vh
  border-radius: 24px, overflow: hidden
  box-shadow: 0 25px 80px rgba(0,0,0,0.12)
  background: white
  display: flex, flex-direction: column

TOP BAR (56px):
  background: white
  border-bottom: 1px solid #E2E8F0
  padding: 0 24px
  display: flex, align-items: center
  justify-content: space-between
  flex-shrink: 0

  LEFT:
    Back arrow button (Steps 2,3,4 only):
      ChevronLeft icon 20px #475569
      ghost button style
      onClick: go to previous step
    Step 1 has NO back button

  CENTER:
    🎓 "Edu" + "Vision" logo
    Syne 18px weight 800
    "Edu" #0F172A + "Vision" #BD1313

  RIGHT:
    "Skip for now" ghost link
    Plus Jakarta Sans 13px #94A3B8
    onClick: show skip confirmation modal

PROGRESS BAR (8px height, full width, NO dots):
  Track: #F5BFBF, border-radius: 0
  Fill: #BD1313
  Transition: width 500ms ease-out
  
  Step 1: width 25%
  Step 2: width 50%
  Step 3: width 75%
  Step 4: width 100%

STEP COUNTER (below progress bar):
  text-align right, padding-right 24px
  padding-top 6px
  "Step X of 4"
  Plus Jakarta Sans 11px weight 600
  #94A3B8, UPPERCASE, letter-spacing 0.8px

CONTENT AREA:
  flex: 1, overflow: hidden
  display: flex, flex-direction: column
  align-items: center
  padding: 32px 24px 0
  max-width: 640px
  margin: 0 auto
  width: 100%

BOTTOM BAR (64px):
  background: white
  border-top: 1px solid #E2E8F0
  padding: 0 24px
  display: flex, align-items: center
  justify-content: space-between
  flex-shrink: 0

  LEFT: "← Back" secondary button
    width: 120px, height: 44px
    Disabled/hidden on Step 1

  RIGHT: "Continue →" primary button
    width: 160px, height: 44px
    bg: #BD1313, text white, Syne 15px weight 700
    Disabled (bg #F5BFBF) until selection made

=============================================================
ONBOARDING STEP 1 — TARGET ROLE
=============================================================

screen: 'onboarding-1'

ILLUSTRATION (top of content area):
  <img src="https://i.ibb.co/8gCxmvv9/onboarding-step1.png"
       height="140"
       style="filter: drop-shadow(0 8px 24px rgba(0,0,0,0.12));
              animation: float 3s ease-in-out infinite;
              margin-bottom: 20px"/>

HEADING:
  "What's your career goal? 🎯"
  Syne 26px weight 800 #0F172A
  text-align center, margin-bottom 8px

SUBHEADING:
  "We'll personalize your entire experience"
  "around your target role."
  Plus Jakarta Sans 14px #64748B
  text-align center, line-height 1.6
  margin-bottom 24px

ROLE GRID (scrollable inner, max-height 320px):
  display: grid, grid-template-columns: repeat(2, 1fr)
  gap: 10px, width: 100%
  overflow-y: auto (inner scroll)
  padding-right: 4px (scrollbar space)

  12 ROLE CARDS:
  Each card (height 64px):
    bg white, border 1.5px #E2E8F0
    border-radius 14px, padding 12px 16px
    display flex, align-items center, gap 12px
    cursor pointer, transition all 0.2s

    Left: emoji in colored circle (36px):
      border-radius 10px
      emoji: 18px centered

    Right:
      Role name: Plus Jakarta Sans 14px weight 600 #0F172A
      Domain: Plus Jakarta Sans 11px #94A3B8

    UNSELECTED hover:
      border-color #F5BFBF, bg #FFF8F8

    SELECTED state:
      border 2px #BD1313, bg #FDF2F2
      Checkmark circle (20px, bg #BD1313, white check)
        absolute top-right: top 8px, right 8px
      animation: badgePop 300ms ease-out

  THE 12 ROLES:
    💻 Software Engineer      "Technology"      circle bg #FFF1F2
    📊 Data Analyst           "Analytics"       circle bg #FFFBEB
    🎨 UI/UX Designer         "Design"          circle bg #FAF5FF
    📢 Marketing Manager      "Marketing"       circle bg #FEF9C3
    🏦 Finance Analyst        "Finance"         circle bg #F0FDF4
    👥 HR Manager             "Human Resources" circle bg #EFF6FF
    🛒 Business Development   "Sales & BD"      circle bg #FFF1F2
    ☁️ Cloud Engineer          "Technology"      circle bg #EFF6FF
    🤖 ML / AI Engineer       "Technology"      circle bg #FAF5FF
    📋 Product Manager        "Product"         circle bg #FFFBEB
    🏥 Healthcare Admin       "Healthcare"      circle bg #F0FDF4
    ✏️ Content Creator         "Media"           circle bg #FEF9C3

  Below grid:
    "+ I don't see my role" ghost link
    Plus Jakarta Sans 13px #BD1313 weight 500
    text-align center, margin-top 12px

BOTTOM BAR:
  Back button: hidden (Step 1)
  Continue: disabled until role selected
  "Continue →" → goes to onboarding-2

=============================================================
ONBOARDING STEP 2 — EDUCATION
=============================================================

screen: 'onboarding-2'

ILLUSTRATION:
  <img src="https://i.ibb.co/qYKp4FkW/onboarding-step2-education.png"
       height="120"
       style="filter: drop-shadow(0 8px 24px rgba(0,0,0,0.12));
              animation: float 3.5s ease-in-out infinite;
              margin-bottom: 20px"/>

HEADING:
  "Tell us about yourself 🎓"
  Syne 26px weight 800 #0F172A, center

SUBHEADING:
  "This helps us pace your preparation"
  "to match your timeline."
  Plus Jakarta Sans 14px #64748B, center
  margin-bottom 24px

CONTENT (vertical stack, gap 16px, width 100%):

  SECTION: Education Level
    Label: "CURRENT EDUCATION"
    Plus Jakarta Sans 11px weight 600 #94A3B8
    UPPERCASE, letter-spacing 0.8px
    margin-bottom 8px

    4 option cards (full width, gap 8px):
      Each card (height 56px):
        bg white, border 1.5px #E2E8F0
        border-radius 12px, padding 0 16px
        display flex, align-items center, gap 12px
        cursor pointer

        Left: emoji (20px)
        Center: option name (14px weight 600 #0F172A)
                description (12px #94A3B8)
        Right: radio circle (18px)
               unselected: border 1.5px #CBD5E1
               selected: bg #BD1313 border #BD1313
                         white dot inside

        SELECTED: border 2px #BD1313, bg #FDF2F2

      OPTIONS:
        🎓 "Final Year Student"    "Graduating this year"
        📚 "Pre-Final Year"        "1–2 years remaining"
        🏫 "Early College"         "2+ years remaining"
        💼 "Recently Graduated"    "Looking for first job"

  SECTION: College Name
    Label: "YOUR COLLEGE / UNIVERSITY"
    Input field (height 48px):
      placeholder: "e.g. VIT Vellore, IIT Delhi"
      Left icon: MapPin (lucide) 18px #94A3B8
      Optional tag beside label: "Optional" neutral chip
    
    Suggestions dropdown (shows as user types):
      bg white, border 1px #E2E8F0
      border-radius 12px, shadow modal
      max 5 suggestions
      Each: 44px height, padding 0 16px
      hover: bg #FDF2F2
      
      Suggestions list:
        IIT Bombay, IIT Delhi, IIT Madras,
        VIT Vellore, BITS Pilani, NIT Trichy,
        Delhi University, Pune University,
        Anna University, Amity University

  SECTION: CGPA
    Label: "CURRENT CGPA / PERCENTAGE"
    Two pills first: [CGPA] [Percentage]
      Active pill: bg #BD1313 white text
      Inactive: bg white, border #E2E8F0, text #475569
    
    Input below (height 48px):
      CGPA mode: placeholder "e.g. 7.8" (0-10)
      Percentage mode: placeholder "e.g. 75%" (0-100)
      Optional

BOTTOM BAR:
  Back: "← Back" → onboarding-1
  Continue: always enabled (fields optional)
  "Continue →" → onboarding-3

=============================================================
ONBOARDING STEP 3 — TIMELINE
=============================================================

screen: 'onboarding-3'

ILLUSTRATION:
  <img src="https://i.ibb.co/jkzHk39r/onboarding-step3-timeline.png"
       height="120"
       style="filter: drop-shadow(0 8px 24px rgba(0,0,0,0.12));
              animation: float 4s ease-in-out infinite;
              margin-bottom: 20px"/>

HEADING:
  "When do you want to be placement-ready? 📅"
  Syne 24px weight 800 #0F172A, center

SUBHEADING:
  "We'll build a daily plan to get you there on time."
  Plus Jakarta Sans 14px #64748B, center
  margin-bottom 24px

CONTENT (width 100%):

  SECTION: Placement Timeline
    Label: "TARGET PLACEMENT DATE"
    11px uppercase #94A3B8, margin-bottom 8px

    6 option cards (2-column grid, gap 10px):
      Each card (height 64px):
        bg white, border 1.5px #E2E8F0
        border-radius 14px, padding 12px 16px
        display flex, align-items center, gap 12px
        cursor pointer

        Left: calendar emoji in colored circle (36px)
        Right:
          Title: 14px weight 600 #0F172A
          Subtitle: 12px #94A3B8

        SELECTED: border 2px #BD1313, bg #FDF2F2
                  checkmark top-right

      OPTIONS:
        📅 "In 1 Month"        "Urgent prep needed"       circle bg #FEF2F2
        📅 "In 3 Months"       "Focused preparation"      circle bg #FFF1F2
        📅 "In 6 Months"       "Steady and thorough"      circle bg #FFFBEB
        📅 "In 1 Year"         "Long-term planning"       circle bg #F0FDF4
        📅 "Already Applying"  "Need help right now"      circle bg #FEF2F2
        📅 "Just Exploring"    "No pressure yet"          circle bg #EFF6FF

  SECTION: Daily Intensity (margin-top 20px):
    Label: "HOW MUCH TIME CAN YOU GIVE DAILY?"
    11px uppercase #94A3B8, margin-bottom 8px

    3 cards side by side (gap 10px):
      Each card (height 72px):
        bg white, border 1.5px #E2E8F0
        border-radius 14px, padding 14px
        text-align center, cursor pointer

        Top: emoji (24px)
        Title: 13px weight 600 #0F172A margin-top 6px
        Subtitle: 11px #94A3B8

        SELECTED: border 2px #BD1313, bg #FDF2F2

      OPTIONS:
        ⚡ "15–30 mins"   "Quick daily sessions"
        🎯 "30–60 mins"  "Balanced preparation"
        🔥 "1–2 hours"   "Intensive mode"

BOTTOM BAR:
  Back: "← Back" → onboarding-2
  Continue: disabled until timeline selected
  "Continue →" → onboarding-4

=============================================================
ONBOARDING STEP 4 — MODULES
=============================================================

screen: 'onboarding-4'

ILLUSTRATION:
  <img src="https://i.ibb.co/8DCgjK5K/onboarding-step4-modules.png"
       height="120"
       style="filter: drop-shadow(0 8px 24px rgba(0,0,0,0.12));
              animation: float 3s ease-in-out infinite;
              margin-bottom: 20px"/>

HEADING:
  "What do you want to work on? 🚀"
  Syne 26px weight 800 #0F172A, center

SUBHEADING:
  "Select all that apply — you can always change"
  "this later in Settings."
  Plus Jakarta Sans 14px #64748B, center
  margin-bottom 24px

"Select all" ghost link (right-aligned above list):
  "Select all" in #BD1313 13px weight 500
  onClick: selects all 5 modules

MODULE CARDS (5 cards, full width, gap 10px):
  Each MODULE CARD (height 72px):
    bg white, border 1.5px #E2E8F0
    border-radius 14px, padding 0 16px
    display flex, align-items center, gap 14px
    cursor pointer, transition all 0.2s

    LEFT: colored icon circle (40px, border-radius 12px):
      Icon: relevant emoji or Icons8 icon (22px)

    CENTER (flex 1):
      Module name: Plus Jakarta Sans 15px weight 600 #0F172A
      Benefit: Plus Jakarta Sans 12px #94A3B8

    RIGHT: checkbox (22px):
      Unchecked: border 1.5px #CBD5E1, bg white, radius 6px
      Checked: bg #BD1313, border #BD1313
               white checkmark centered
               animation: pulse 200ms

    SELECTED card:
      border 2px #BD1313
      bg very subtle: rgba(189,19,19,0.02)
      border-left 3px #BD1313

  5 MODULES:
    📄 Resume Builder
       circle bg #FFF1F2, icon color #BD1313
       "Stand out to recruiters"
       DEFAULT: pre-selected

    📝 Test Preparation
       circle bg #FFFBEB, icon color #D97706
       "Boost your aptitude scores"
       DEFAULT: pre-selected

    🎤 AI Interview
       circle bg #F0FDF4, icon color #16A34A
       "Practice without pressure"

    📈 Skill Tracker
       circle bg #EFF6FF, icon color #2563EB
       "Know your strengths"

    👥 Expert Network
       circle bg #FAF5FF, icon color #7C3AED
       "Learn from the best"

BOTTOM BAR:
  Back: "← Back" → onboarding-3
  Continue: "Set Up My Dashboard →"
    Always enabled (2 pre-selected)
    bg #BD1313, Syne 15px weight 700
    onClick: navigate to 'plan-ready'

=============================================================
SKIP CONFIRMATION MODAL
=============================================================

Triggered by "Skip for now" on any step.

BACKDROP:
  position fixed, inset 0
  bg rgba(15,23,42,0.5)
  backdrop-filter blur(4px)
  z-index 200

MODAL CARD:
  position fixed, top 50%, left 50%
  transform translate(-50%, -50%)
  bg white, border-radius 20px
  padding 28px, max-width 400px, width 90%
  box-shadow 0 20px 60px rgba(0,0,0,0.18)
  animation: scaleIn 250ms ease-out
  z-index 201

  @keyframes scaleIn {
    from { opacity: 0; transform: translate(-50%,-50%) scale(0.94); }
    to { opacity: 1; transform: translate(-50%,-50%) scale(1); }
  }

  Title: "Skip setup?" Syne 20px weight 700 #0F172A
  Message:
    "We'll use general settings for now."
    "You can personalize anytime from Settings."
    Plus Jakarta Sans 14px #64748B, line-height 1.6
    margin: 12px 0 24px

  Buttons (gap 10px):
    "Continue Setup" primary full width height 48px
    "Skip Setup" secondary full width height 44px
      onClick skip: navigate to 'dashboard'

=============================================================
PLAN READY SCREEN
=============================================================

screen: 'plan-ready'
animation: screenEnter 280ms ease-out both

OUTER WRAPPER + APP CONTAINER: same as onboarding shell
No sidebar, no top bar — full content area

FULL CONTENT:
  display flex, flex-direction column
  align-items center, justify-content center
  padding 40px 24px
  background white
  max-width 560px, margin 0 auto
  height 100%
  text-align center

CELEBRATION SEQUENCE (orchestrated with setTimeout):
  T+0ms: screen fades in
  T+200ms: success circle appears (scaleSpring)
  T+600ms: heading fades up
  T+800ms: summary card fades up
  T+1000ms: module chips stagger in
  T+1200ms: CTA button slides up

  @keyframes scaleSpring {
    0% { transform: scale(0.8); opacity: 0; }
    60% { transform: scale(1.08); opacity: 1; }
    80% { transform: scale(0.96); }
    100% { transform: scale(1); }
  }

CELEBRATION ILLUSTRATION:
  <img src="https://i.ibb.co/B5Z6kkw3/onboarding-ready.png"
       height="200"
       style="filter: drop-shadow(0 12px 32px rgba(0,0,0,0.15));
              animation: float 3s ease-in-out infinite;
              margin-bottom: 8px"/>

SUCCESS CIRCLE (below illustration):
  width 72px, height 72px, border-radius 50%
  bg linear-gradient(135deg, #DCFCE7, #BBF7D0)
  border 2px #86EFAC
  CheckCircle icon (lucide) 32px #16A34A centered
  shadow 0 0 0 12px rgba(22,163,74,0.08)
  margin 0 auto 20px
  animation scaleSpring 600ms ease-out

HEADING (animation: fadeUp 300ms delay 600ms):
  "Your personalized plan is ready! 🎉"
  Syne 28px weight 800 #0F172A
  margin-bottom 8px

SUBHEADING (animation: fadeUp 300ms delay 700ms):
  "We've set everything up based on your goals."
  "Let's get started!"
  Plus Jakarta Sans 15px #64748B, line-height 1.6
  margin-bottom 28px

PLAN SUMMARY CARD (animation: fadeUp 300ms delay 800ms):
  bg white, border 1px #E2E8F0
  border-radius 20px, padding 20px
  width 100%, max-width 440px
  box-shadow 0 4px 16px rgba(0,0,0,0.06)

  Label: "YOUR PLAN" 10px uppercase #94A3B8 weight 600
  margin-bottom 14px

  4 summary rows (each 40px, border-bottom #F8FAFF):
    display flex, align-items center, gap 10px

    Row 1: 🎯 "Target Role" → selected role badge (primary chip)
    Row 2: 📅 "Ready By" → selected timeline badge (neutral chip)
    Row 3: ⚡ "Daily Goal" → selected intensity badge (warning chip)
    Row 4: 🎓 "College" → "VIT Vellore" (plain text muted)

  Module chips row (margin-top 14px):
    "Active Modules:" 11px muted, margin-bottom 8px
    Chips for each selected module:
      bg #FDF2F2, text #BD1313, border #F5BFBF
      12px weight 600, radius 9999px
      padding 4px 12px, gap 6px
      display flex, flex-wrap wrap

WHAT'S NEXT (animation: fadeUp 300ms delay 1000ms):
  margin-top 20px, width 100%, max-width 440px

  Label: "HERE'S WHAT WE SUGGEST FIRST:"
  10px uppercase #94A3B8, margin-bottom 10px

  3 suggestion rows (each 44px, border-bottom #F8FAFF):
    display flex, align-items center, gap 10px
    "→" arrow #BD1313 + suggestion text 13px #475569

    1. "→ Complete your resume — takes ~10 mins"
    2. "→ Take a diagnostic test — see where you stand"
    3. "→ Set up your skill profile"

CTA BUTTON (animation: fadeUp 300ms delay 1200ms):
  "Go to My Dashboard →"
  Primary button, full width, height 52px
  bg #BD1313, Syne 16px weight 700 white
  border-radius 12px
  margin-top 28px
  onClick: navigate to 'dashboard'
  
  Hover: translateY(-3px)
         shadow 0 12px 32px rgba(189,19,19,0.35)

FOOTER NOTE (margin-top 16px):
  "You can update these preferences anytime in Settings"
  Plus Jakarta Sans 12px #94A3B8, center

=============================================================
ONBOARDING STATE MANAGEMENT
=============================================================

const [onboardingData, setOnboardingData] = useState({
  targetRole: '',
  targetDomain: '',
  educationLevel: '',
  college: '',
  cgpa: '',
  timeline: '',
  intensity: '',
  selectedModules: ['resume', 'tests']
});

Update state as user makes selections:
  Step 1: setOnboardingData({...onboardingData, targetRole: selected})
  Step 2: setOnboardingData({...onboardingData, educationLevel: selected, college: value})
  Step 3: setOnboardingData({...onboardingData, timeline: selected, intensity: selected})
  Step 4: toggle modules in selectedModules array

Plan Ready screen reads from onboardingData to show:
  Target role chip
  Timeline chip
  Intensity chip
  Selected module chips

Store in localStorage after plan-ready:
  localStorage.setItem('eduvision_onboarding',
    JSON.stringify({ complete: true, data: onboardingData }))

=============================================================
TOAST TRIGGERS FOR ONBOARDING
=============================================================

On each step completion:
  Step 1 → Step 2: no toast (silent progress)
  Step 2 → Step 3: no toast (silent progress)
  Step 3 → Step 4: no toast (silent progress)
  Step 4 → Plan Ready: showToast("Setting up your plan... ✨", 'info')
  Plan Ready → Dashboard: showToast("Welcome to EduVision! 🎉")
                           + showXPToast("+10 XP 🎉") (daily login bonus)

=============================================================
CRITICAL REMINDERS
=============================================================

✅ All onboarding screens use full-screen layout
✅ No sidebar on onboarding screens
✅ Progress bar fills smoothly on each step
✅ All illustrations use exact imgbb URLs
✅ Float animation on all illustrations
✅ Step counter shows "Step X of 4"
✅ Back button hidden on Step 1
✅ Continue disabled until selection made
✅ Resume Builder + Tests pre-selected on Step 4
✅ Plan Ready screen has orchestrated animation sequence
✅ Skip modal appears on "Skip for now" click
✅ onboardingData persisted to localStorage
✅ Primary color #BD1313 everywhere
✅ Fonts: Syne headings + Plus Jakarta Sans body
✅ All screens screenEnter animation on mount
✅ No full page scroll on any screen
✅ Device frame (border-radius 24px) on app container

=============================================================
BUILD ORDER FOR STEP 2
=============================================================

1. Add onboardingData state
2. Update screen navigation for all onboarding routes
3. Build onboarding shell (shared top bar + progress + bottom bar)
4. Build Onboarding Step 1 — Target Role
5. Build Onboarding Step 2 — Education
6. Build Onboarding Step 3 — Timeline
7. Build Onboarding Step 4 — Modules
8. Build Skip Confirmation Modal
9. Build Plan Ready Screen with animation sequence
10. Add localStorage persistence
11. Add toast triggers
12. Verify all illustrations load correctly

DO NOT rebuild Step 1 screens.
DO NOT change any existing code from Step 1.
ONLY add new screens and update navigation state.
=============================================================