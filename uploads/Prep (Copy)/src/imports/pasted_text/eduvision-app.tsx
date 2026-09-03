Build the complete EduVision application starting with 
the Loading Screen, Authentication Flow, and App Shell.

Read the system guidelines fully before writing any code.
Use ALL illustration URLs from the guidelines exactly as specified.
Use ALL colors, fonts, and component specs from the guidelines.

=============================================================
TECH STACK
=============================================================

- React 18, functional components + hooks only
- Tailwind CSS + CSS variables for tokens
- lucide-react for icons (import individually)
- Recharts for all charts
- Google Fonts: Syne + Plus Jakarta Sans
- All screens in ONE file, useState for navigation
- No routing library, no backend, no API
- All data = mock JSON defined at top of file

=============================================================
GLOBAL SETUP — DO THIS FIRST
=============================================================

STEP 1: Add Google Fonts import at top of CSS:
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

STEP 2: Add CSS variables:
:root {
  --font-display: 'Syne', serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --brand: #BD1313;
  --brand-hover: #991010;
  --brand-deep: #7A0D0D;
  --brand-light: #FDF2F2;
  --brand-border: #F5BFBF;
  --success: #16A34A;
  --warning: #D97706;
  --error: #DC2626;
  --page-bg: #FAFAFA;
  --card-bg: #FFFFFF;
  --outer-bg: #F1F5F9;
  --text-1: #0F172A;
  --text-2: #475569;
  --text-3: #64748B;
  --text-4: #94A3B8;
  --border: #E2E8F0;
}

STEP 3: Add ALL animation keyframes:
@keyframes screenEnter {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.12); opacity: 0.8; }
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes toastEnter {
  from { opacity: 0; transform: translateX(-50%) translateY(-60px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes confettiFall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
}
@keyframes countUp {
  from { opacity: 0.3; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
@keyframes badgePop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
}
.screen-enter {
  animation: screenEnter 280ms ease-out both;
}
.inner-scroll {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #F5BFBF transparent;
}
.inner-scroll::-webkit-scrollbar { width: 4px; }
.inner-scroll::-webkit-scrollbar-thumb {
  background: #F5BFBF;
  border-radius: 9999px;
}

STEP 4: Define mock data at top of file:
const mockUser = {
  name: "Rahul Sharma",
  email: "rahul@vit.edu",
  college: "VIT Vellore",
  year: "Final Year",
  avatar: "RS",
  targetRole: "Software Engineer",
  xp: 2400,
  level: "Hustler",
  levelEmoji: "🔥",
  levelNumber: 3,
  nextLevel: "Elite",
  nextLevelXP: 3000,
  streak: 7,
  daysToPlacement: 92
};

=============================================================
SCREEN 1 — LOADING / SPLASH SCREEN
=============================================================

Show for 2 seconds on app first load.
Then auto-transition to Landing screen.

FULL SCREEN:
  width: 100vw, height: 100vh
  background: linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)
  display: flex, flex-direction: column
  align-items: center, justify-content: center
  overflow: hidden
  position: relative

BACKGROUND TEXTURE:
  background-image: url('https://i.ibb.co/GQM6xx2F/dot-grid-light.png')
  background-repeat: repeat
  background-size: 40px 40px
  opacity of texture layer: 0.06

DECORATIVE BACKGROUND CIRCLES:
  Circle 1 (top right):
    position absolute, top -100px, right -100px
    width 400px, height 400px, border-radius 50%
    background rgba(255,255,255,0.04)
  Circle 2 (bottom left):
    position absolute, bottom -80px, left -80px
    width 300px, height 300px, border-radius 50%
    background rgba(255,255,255,0.03)

FLOATING BACKGROUND DECORATIONS:
  Top-left: graduation cap icon (40px, opacity 0.15)
    https://img.icons8.com/3d-fluency/100/graduation-cap.png
    animation: floatSlow 4s ease-in-out infinite

  Top-right: star icon (32px, opacity 0.15)
    https://img.icons8.com/3d-fluency/100/star.png
    animation: float 3.5s ease-in-out infinite delay 0.5s

  Bottom-left: rocket icon (36px, opacity 0.15)
    https://img.icons8.com/3d-fluency/100/rocket.png
    animation: float 5s ease-in-out infinite delay 1s

  Bottom-right: trophy icon (36px, opacity 0.15)
    https://img.icons8.com/3d-fluency/100/trophy.png
    animation: floatSlow 4.5s ease-in-out infinite delay 0.3s

CENTER CONTENT:
  App icon (80px x 80px):
    <img src="https://i.ibb.co/C3FG8VDW/app-icon.png"
         width="80" height="80"
         style="filter: drop-shadow(0 12px 32px rgba(0,0,0,0.3));
                animation: fadeUp 600ms ease-out both"/>

  App name (below icon, margin-top 16px):
    "Edu" + "Vision" in Syne 40px weight 800
    "Edu": rgba(255,255,255,0.85)
    "Vision": white
    animation: fadeUp 600ms ease-out both delay 200ms

  Tagline (below name, margin-top 8px):
    "Your Career Growth Companion"
    Plus Jakarta Sans 16px weight 400
    rgba(255,255,255,0.65)
    animation: fadeUp 600ms ease-out both delay 400ms

  Loading bar (below tagline, margin-top 32px):
    width: 200px, height: 3px
    background: rgba(255,255,255,0.15)
    border-radius: 9999px
    overflow: hidden
    
    Fill bar inside:
      height: 100%, border-radius: 9999px
      background: white
      animation: fills from 0% to 100% width
      duration: 1.8s ease-out
      starts after 200ms delay

BOTTOM:
  position absolute, bottom 32px
  "Powered by AIVision21" 
  Plus Jakarta Sans 12px weight 500
  rgba(255,255,255,0.45)
  AIVision21 logo beside text:
    <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png"
         height="16" style="opacity: 0.45"/>

AUTO TRANSITION:
  After 2500ms: fade out loading screen
  Transition to Landing screen
  Use: opacity 0 transition 500ms then switch screen

=============================================================
SCREEN 2 — LANDING / SPLASH
=============================================================

This is the first screen users see after loading.
Full screen, no scroll.
animation: screenEnter 280ms ease-out both on mount

OUTER WRAPPER:
  width: 100vw, height: 100vh
  background: #F1F5F9
  display: flex, align-items: center, justify-content: center

APP CONTAINER (rounded device frame):
  width: 100%, max-width: 1440px
  height: 100vh
  border-radius: 24px
  overflow: hidden
  box-shadow: 0 25px 80px rgba(0,0,0,0.12)
  display: flex

NOTE: On first auth screens (Landing, Login, Signup, OTP)
      there is NO sidebar shown yet.
      The app container fills full width.

FULL SCREEN BACKGROUND:
  background: linear-gradient(145deg, #7A0D0D 0%, #BD1313 55%, #D94040 100%)
  position: relative, overflow: hidden

BACKGROUND DECORATIONS:
  Large circle top-right:
    width 600px, height 600px, border-radius 50%
    background rgba(255,255,255,0.04)
    position absolute, top -150px, right -150px

  Medium circle bottom-left:
    width 400px, height 400px
    background rgba(255,255,255,0.03)
    position absolute, bottom -100px, left -100px

  Dot grid texture overlay:
    background-image: url('https://i.ibb.co/GQM6xx2F/dot-grid-light.png')
    opacity: 0.06, position absolute, inset 0

MAIN CONTENT (centered, max-width 480px, padding 40px 24px):
  position: relative, z-index: 10
  display: flex, flex-direction: column
  align-items: center, text-align: center

  TOP BADGE:
    "🎓 AIVision21 Presents"
    bg: rgba(255,255,255,0.15)
    border: 1px rgba(255,255,255,0.25)
    color: white, font: 12px weight 600
    border-radius: 9999px, padding: 6px 16px
    margin-bottom: 24px

  HERO ILLUSTRATION:
    <img src="https://i.ibb.co/xKMVbCjD/landing-hero.png"
         width="280" height="200"
         style="filter: drop-shadow(0 16px 40px rgba(0,0,0,0.3));
                animation: float 3s ease-in-out infinite;
                margin-bottom: 24px"/>

  APP LOGO:
    🎓 emoji (28px) + "Edu" + "Vision" in Syne 36px weight 800
    "Edu": rgba(255,255,255,0.9)
    "Vision": white
    margin-bottom: 12px

  TAGLINE:
    "Your Career Growth Companion"
    Plus Jakarta Sans 16px rgba(255,255,255,0.75)
    margin-bottom: 8px

  SUBTITLE:
    "Practice tests, build your resume & ace interviews"
    "— all in one app built for students like you."
    Plus Jakarta Sans 14px rgba(255,255,255,0.6)
    line-height: 1.6, margin-bottom: 32px

  TRUST BADGES ROW (3 pills):
    ["📈 50K+ Students"] ["⭐ 4.9 Rated"] ["🤖 AI Powered"]
    Each: bg rgba(255,255,255,0.12), border rgba(255,255,255,0.2)
    color white, 12px weight 600, radius 9999px, padding 6px 14px
    display flex, gap 8px, margin-bottom: 32px

  BUTTONS:
    Button 1 (Primary):
      "Get Started — It's Free →"
      bg white, color #BD1313
      width 100%, height 52px, radius 12px
      font: Syne 16px weight 700
      shadow: 0 8px 24px rgba(0,0,0,0.2)
      hover: translateY(-2px), shadow increase
      onClick: navigate to Signup screen
      margin-bottom: 12px

    Button 2 (Secondary):
      "I Already Have an Account"
      bg rgba(255,255,255,0.12)
      border: 1.5px rgba(255,255,255,0.3)
      color white, width 100%, height 48px, radius 12px
      font: Plus Jakarta Sans 15px weight 600
      hover: bg rgba(255,255,255,0.20)
      onClick: navigate to Login screen

  FOOTER TEXT:
    "Trusted by students at IIT, VIT, BITS, DU & 200+ colleges"
    11px rgba(255,255,255,0.5), margin-top 20px

=============================================================
SCREEN 3 — SIGNUP
=============================================================

Full screen, no scroll.
No sidebar (auth screen).
animation: screenEnter 280ms ease-out both on mount

OUTER: same full-screen red gradient as landing

CENTER CARD:
  bg white, border-radius 24px
  width 100%, max-width 480px
  margin: auto, padding 0
  box-shadow: 0 20px 60px rgba(0,0,0,0.25)
  overflow: hidden

CARD TOP BAR (48px):
  bg white, border-bottom 1px #E2E8F0
  padding 0 24px
  display flex, align-center, space-between
  
  Left: back arrow button (ghost, goes to Landing)
        ChevronLeft icon, 20px #475569
  Right: "Step 1 of 2" chip
         bg #FDF2F2, text #BD1313, 12px weight 600
         radius 9999px, padding 4px 12px

CARD HEADER (padding 24px 24px 16px):
  Badge pill: "✨ Join 50,000+ Students"
    bg #FDF2F2, text #BD1313, border #F5BFBF
    12px weight 600, radius 9999px, padding 4px 14px
    margin-bottom: 12px

  Title: "Create Your Account"
    Syne 26px weight 800 #0F172A
    margin-bottom: 6px

  Subtitle: "Start your placement journey today."
    Plus Jakarta Sans 14px #64748B

CARD BODY (padding 0 24px 24px):
  Form fields with gap 14px between each:

  ROW 1 (2 columns gap 12px):
    Input: "FIRST NAME" placeholder "Rahul"
    Input: "LAST NAME" placeholder "Sharma"

  ROW 2:
    Input: "EMAIL ADDRESS" placeholder "rahul@vit.edu"
    Left icon: Mail (lucide) 18px #94A3B8

  ROW 3:
    Input: "PHONE NUMBER" placeholder "+91 98765 43210"
    Left icon: Phone (lucide) 18px #94A3B8

  ROW 4:
    Input type password: "PASSWORD" placeholder "Min. 8 characters"
    Right icon: Eye toggle (lucide Eye/EyeOff) 18px
    
    PASSWORD STRENGTH METER (below input):
      4 bars in a row, gap 4px, height 3px each
      Bars fill based on password length:
        1 bar: #DC2626 (weak)
        2 bars: #D97706 (fair)
        3 bars: #2563EB (good)
        4 bars: #16A34A (strong)
      Strength label right: "Weak/Fair/Good/Strong"
      Plus Jakarta Sans 12px colored to match

  ROW 5:
    Input type password: "CONFIRM PASSWORD"
    Right icon: Eye toggle
    Error below if mismatch: "Passwords don't match" #DC2626 12px

  PRIMARY BUTTON (margin-top 20px):
    "Create My Account →"
    Full width, height 52px
    bg #BD1313, text white, Syne 16px weight 700
    radius 12px
    Disabled until all fields valid
    onClick: navigate to OTP screen

  FOOTER TEXT:
    "Already have an account?"
    Plus Jakarta Sans 14px #64748B
    + "Login here" link in #BD1313 weight 600
    onClick login link: navigate to Login
    text-align center, margin-top 16px

=============================================================
SCREEN 4 — OTP VERIFICATION
=============================================================

Full screen, no scroll.
No sidebar (auth screen).
animation: screenEnter 280ms ease-out both

OUTER: same red gradient background

CENTER CARD:
  bg white, radius 24px, max-width 440px
  margin auto, padding 0
  box-shadow 0 20px 60px rgba(0,0,0,0.25)

CARD TOP BAR (48px):
  Left: back arrow → goes to Signup
  Right: "Step 2 of 2" chip (brand style)

CARD BODY (padding 32px 28px):
  Icon circle (top center):
    width 64px, height 64px, border-radius 50%
    bg linear-gradient(135deg, #BD1313, #7A0D0D)
    Mail icon (lucide) 28px white centered
    shadow: 0 8px 24px rgba(189,19,19,0.35)
    margin: 0 auto 20px

  Title: "Check Your Inbox"
    Syne 26px weight 800 #0F172A, text-align center

  Subtitle: "We've sent a 4-digit code to"
    Plus Jakarta Sans 14px #64748B, text-align center

  Email pill:
    "ra•••@vit.edu"
    bg #FDF2F2, text #BD1313, border #F5BFBF
    12px weight 600, radius 9999px
    padding 4px 14px, margin 8px auto 20px
    display inline-block

  TIMER LINE:
    "Code expires in " + countdown number bold #BD1313 + "s"
    Plus Jakarta Sans 13px #64748B, text-align center
    Countdown: starts 30, counts down to 0
    At 0: "Code expired. Resend →" link in #BD1313

  OTP INPUT BOXES (4 boxes, margin-top 24px):
    Display: flex, gap 12px, justify-content center

    Each box:
      width 64px, height 68px
      border: 2px solid #E2E8F0
      border-radius 12px
      font: Syne 28px weight 800 #0F172A
      text-align center
      bg #FAFAFA
      
      Focus state:
        border: 2px #BD1313
        bg white
        shadow: 0 0 0 3px rgba(189,19,19,0.10)
        transform: scale(1.05)
      
      Filled state:
        border: 2px #BD1313
        bg #FDF2F2
        color #BD1313
      
      Auto-advance: when digit typed focus moves to next
      Backspace: if empty focus moves to previous
      inputMode: "numeric"
      maxLength: 1

  Resend section (margin-top 20px):
    "Didn't receive it? " + "Resend Code" link
    Resend disabled during countdown (muted)
    After 0s: enabled, onClick resets timer to 30

  PRIMARY BUTTON (margin-top 24px):
    "Verify & Continue →"
    Full width, height 52px
    bg #BD1313, text white, Syne 16px weight 700
    Any 4 digits = valid
    onClick: navigate to Onboarding Step 1

  Security note (margin-top 16px):
    "🔒 Your data is encrypted and secure"
    Plus Jakarta Sans 12px #94A3B8, text-align center

=============================================================
SCREEN 5 — LOGIN
=============================================================

Full screen, no scroll.
No sidebar (auth screen).
animation: screenEnter 280ms ease-out both

OUTER: same red gradient background

CENTER CARD:
  bg white, radius 24px, max-width 480px
  margin auto, padding 0
  box-shadow: 0 20px 60px rgba(0,0,0,0.25)

CARD TOP BAR (48px):
  Left: back arrow → goes to Landing
  Center: 🎓 "EduVision" logo (Syne 18px, Edu dark + Vision red)

CARD BODY (padding 32px 28px):
  Title: "Welcome back 👋"
    Syne 28px weight 800 #0F172A
    margin-bottom 6px

  Subtitle: "Continue your career journey."
    Plus Jakarta Sans 14px #64748B
    margin-bottom 24px

  GOOGLE SSO BUTTON:
    Full width, height 48px, radius 12px
    bg white, border 1.5px #E2E8F0
    display flex, align-center, justify-center, gap 10px
    Google "G" colored SVG icon (18px)
    "Continue with Google" Plus Jakarta Sans 15px weight 600 #0F172A
    hover: bg #F8FAFF, border #CBD5E1
    shadow: 0 2px 8px rgba(0,0,0,0.06)

  DIVIDER (margin 20px 0):
    line — "or sign in with email" — line
    lines: 1px #E2E8F0
    text: 12px #94A3B8 Plus Jakarta Sans

  Input: "EMAIL ADDRESS" with Mail icon left
  Input: "PASSWORD" type password with Eye toggle right
  (gap 14px between)

  REMEMBER + FORGOT ROW (margin-top 12px):
    Left: checkbox (18px brand style) + "Remember me" 13px #475569
    Right: "Forgot password?" ghost link 13px #BD1313 weight 600
           onClick: navigate to Forgot Password

  ERROR STATE (show below password if wrong):
    bg #FEF2F2, border 1px #FECACA, radius 8px
    padding 10px 14px, margin-top 12px
    "❌ Incorrect email or password. Try again."
    12px #DC2626

  PRIMARY BUTTON (margin-top 20px):
    "Login to EduVision →"
    Full width, height 52px
    bg #BD1313, text white, Syne 16px weight 700
    onClick: navigate to Dashboard (skip onboarding for returning user)

  FOOTER TEXT (margin-top 20px, center):
    "New to EduVision? " + "Create free account" link #BD1313 weight 600
    onClick: navigate to Signup

=============================================================
SCREEN 6 — FORGOT PASSWORD
=============================================================

Full screen, no scroll.
animation: screenEnter 280ms ease-out both

OUTER: same red gradient background

CENTER CARD:
  bg white, radius 24px, max-width 440px
  margin auto, padding 32px 28px
  box-shadow: 0 20px 60px rgba(0,0,0,0.25)

DEFAULT STATE:

  Back link (top):
    "← Back to Login" ghost #BD1313
    onClick: navigate to Login

  Key icon circle (center, margin-top 8px):
    width 64px, height 64px, radius 50%
    bg linear-gradient(135deg, #FDF2F2, #F5BFBF)
    border 2px #F5BFBF
    Key icon (lucide) 28px #BD1313 centered
    margin 0 auto 20px

  Title: "Reset Your Password"
    Syne 26px weight 800 #0F172A, center

  Subtitle:
    "Enter your registered email and we'll send"
    "you a link to reset your password."
    Plus Jakarta Sans 14px #64748B, center, line-height 1.6
    margin-bottom 24px

  Input: "EMAIL ADDRESS" full width with Mail icon

  PRIMARY BUTTON (margin-top 16px):
    "Send Reset Link"
    Full width, height 52px
    bg #BD1313, text white, Syne 16px weight 700
    onClick: show Success State below

SUCCESS STATE (replace default state):
  animation: fadeUp 300ms ease-out

  Large checkmark circle (center):
    width 72px, height 72px, radius 50%
    bg linear-gradient(135deg, #DCFCE7, #BBF7D0)
    border 2px #86EFAC
    CheckCircle icon (lucide) 32px #16A34A centered
    shadow: 0 0 0 12px rgba(22,163,74,0.08)
    margin 0 auto 20px

  Title: "Email Sent! ✅"
    Syne 26px weight 800 #16A34A, center

  Message:
    "A password reset link has been sent to your email."
    "It expires in 15 minutes — check your inbox."
    Plus Jakarta Sans 14px #64748B, center, line-height 1.6
    margin-bottom 24px

  Secondary button: "Back to Login" full width
  Ghost link: "Didn't receive? Resend email"
  Both centered, margin-top 12px

=============================================================
APP SHELL — BUILD THIS STRUCTURE
=============================================================

After auth is complete (Login or Signup+OTP),
the main app shell appears. Build this shell now
even though inner screen content comes in Step 3.

OUTER WRAPPER:
  width: 100vw, height: 100vh
  background: #F1F5F9
  display: flex, align-items: center
  justify-content: center

APP CONTAINER:
  width: 100%, max-width: 1440px, height: 100vh
  border-radius: 24px, overflow: hidden
  box-shadow: 0 25px 80px rgba(0,0,0,0.12)
  display: flex, background: white

SIDEBAR (always visible, 64px wide):
  width: 64px, height: 100vh
  background: white
  border-right: 1px solid #E2E8F0
  display: flex, flex-direction: column
  align-items: center
  padding: 16px 0
  z-index: 100
  flex-shrink: 0

  TOP — Logo mark:
    <img src="https://img.icons8.com/3d-fluency/100/graduation-cap.png"
         width="32" height="32"
         style="filter: drop-shadow(0 2px 8px rgba(189,19,19,0.3));
                margin-bottom: 24px"/>

  NAVIGATION ITEMS (flex-1 area, gap 4px):
    Build 6 nav items:

    Each nav item wrapper:
      width: 48px, height: 48px
      border-radius: 12px, cursor: pointer
      display: flex, align-items: center, justify-content: center
      position: relative
      transition: all 0.2s ease

    ACTIVE state (current screen):
      background: [module accent color] at 15% opacity
      icon: [module accent color] 20px

    INACTIVE state:
      background: transparent
      icon: #94A3B8 20px

    HOVER state:
      background: #F1F5F9
      icon: #475569
      transform: scale(1.1)
      Show tooltip (absolute left 60px):
        bg #0F172A, text white, 12px
        border-radius 8px, padding 6px 12px
        white-space: nowrap
        z-index: 200

    6 NAV ITEMS:
      1. LayoutDashboard icon → "Dashboard" tooltip → accent #BD1313
         onClick: setScreen('dashboard')
      2. FileText icon → "Resume Builder" tooltip → accent #BD1313
         onClick: setScreen('resume')
      3. BookOpen icon → "Test Preparation" tooltip → accent #D97706
         onClick: setScreen('tests')
      4. Mic icon → "AI Interview" tooltip → accent #16A34A
         onClick: setScreen('interview')
      5. TrendingUp icon → "Skill Tracker" tooltip → accent #2563EB
         onClick: setScreen('skills')
      6. Users icon → "Expert Network" tooltip → accent #7C3AED
         onClick: setScreen('experts')

  BOTTOM (margin-top auto):
    Settings icon (20px #94A3B8)
      onClick: setScreen('settings')
    
    AIVision21 logo (margin-top 12px):
      <img src="https://i.ibb.co/s9CvkVdd/aivision21-logo.png"
           height="20"
           style="opacity: 0.5; margin-bottom: 4px"/>
    
    "v1.0" text: 9px #94A3B8 center

MAIN CONTENT AREA:
  flex: 1, display: flex, flex-direction: column
  height: 100vh, overflow: hidden
  background: #FAFAFA
  background-image: url('https://i.ibb.co/GQM6xx2F/dot-grid-light.png')
  background-repeat: repeat
  background-size: 40px 40px

TOP BAR (56px, fixed inside main content):
  height: 56px, flex-shrink: 0
  background: white
  border-bottom: 1px solid #E2E8F0
  padding: 0 24px
  display: flex, align-items: center
  justify-content: space-between

  LEFT: Current page title
    Syne 16px weight 700 #0F172A
    Changes based on active screen

  CENTER: Search bar
    width: 360px, height: 36px
    background: #F8FAFF, border: 1px #E2E8F0
    border-radius: 9999px
    display: flex, align-items: center
    padding: 0 14px, gap: 8px
    Search icon (lucide) 16px #94A3B8
    "Search modules, tests, experts..." 13px #94A3B8
    "⌘K" pill: bg #F1F5F9, text #94A3B8, 10px, radius 4px, padding 2px 6px
    cursor: pointer (not functional yet)

  RIGHT: flex row gap 12px align-center

    Bell button (36x36, radius 8px):
      Bell icon (lucide) 20px #475569
      position relative
      Red notification dot (8px, bg #BD1313):
        position absolute, top 6px, right 6px
        border-radius 50%, border 2px white
        animation: pulse 2s ease-in-out infinite

    XP Pill:
      background: linear-gradient(135deg, #D97706, #B45309)
      color: white, font: Plus Jakarta Sans 12px weight 700
      padding: 6px 14px, border-radius: 9999px
      "⚡ 2,400 XP"
      cursor: pointer

    Avatar circle (36px):
      width: 36px, height: 36px, border-radius: 50%
      background: linear-gradient(135deg, #BD1313, #7A0D0D)
      color: white, font: Syne 13px weight 800
      display: flex, align-items: center, justify-content: center
      "RS"
      border: 2px solid white
      box-shadow: 0 2px 8px rgba(189,19,19,0.3)
      position: relative
      
      Online dot (8px green):
        position absolute, bottom 0, right 0
        bg #16A34A, border 2px white, border-radius 50%

SCREEN CONTENT AREA:
  flex: 1, overflow: hidden
  height: calc(100vh - 56px)
  Show placeholder for now:
    "Dashboard coming in Step 3"
    centered, Syne 20px #94A3B8

=============================================================
TOAST NOTIFICATION SYSTEM
=============================================================

Build a global toast system:

const [toasts, setToasts] = useState([]);

const showToast = (message, type = 'success') => {
  const id = Date.now();
  setToasts(prev => [...prev, { id, message, type }]);
  setTimeout(() => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, 3000);
};

TOAST RENDER (fixed top center):
  position: fixed, top: 16px, left: 50%
  transform: translateX(-50%), z-index: 9999

  Each toast:
    background: #0F172A, color: white
    padding: 12px 20px, border-radius: 9999px
    display: flex, align-items: center, gap: 10px
    font: Plus Jakarta Sans 14px weight 500
    box-shadow: 0 8px 24px rgba(0,0,0,0.16)
    animation: toastEnter 350ms cubic-bezier(0.34,1.56,0.64,1) both
    min-width: 240px

  Type icons:
    success: CheckCircle (lucide) 16px #16A34A
    error: XCircle (lucide) 16px #DC2626
    info: Info (lucide) 16px #BD1313
    warning: AlertTriangle (lucide) 16px #D97706

SPECIAL XP TOAST:
  position: fixed, top: 16px, right: 16px
  background: linear-gradient(135deg, #D97706, #B45309)
  color: white, font: Plus Jakarta Sans 13px weight 700
  padding: 10px 18px, border-radius: 9999px
  animation: same toastEnter
  "⚡ +50 XP 🎉"

TRIGGER TOASTS:
  After signup: showToast("Account created! Welcome 🎉")
  After OTP: showToast("Email verified ✓")
  After login: showToast("Welcome back, Rahul! 👋")
  After reset email: showToast("Reset link sent to your email ✓")

=============================================================
SCREEN NAVIGATION STATE
=============================================================

const [screen, setScreen] = useState('loading');

NAVIGATION FLOW:
  'loading' → auto after 2.5s → 'landing'
  'landing' → "Get Started" → 'signup'
  'landing' → "Already have account" → 'login'
  'signup' → "Create Account" → 'otp'
  'otp' → "Verify" → 'onboarding' (Step 2 will build this)
  'login' → "Login" → 'dashboard' (Step 3 will build this)
  'login' → "Forgot password" → 'forgot-password'
  'forgot-password' → "Back" → 'login'
  'signup' → "Login here" → 'login'

For now show placeholder screens for:
  'onboarding' → "Onboarding coming in Step 2"
  'dashboard' → "Dashboard coming in Step 3"

=============================================================
CRITICAL REMINDERS
=============================================================

MUST VERIFY BEFORE SUBMITTING:

✅ Primary color is #BD1313 everywhere (not blue)
✅ Fonts are Syne (headings) + Plus Jakarta Sans (body)
✅ App container has border-radius: 24px (device frame)
✅ Outer background is #F1F5F9
✅ All illustration img tags use imgbb URLs from guidelines
✅ Landing hero illustration shows with float animation
✅ Loading screen shows for 2.5s then auto-transitions
✅ Sidebar is 64px wide, icon-only, always visible
✅ Top bar has XP pill + avatar + search + bell
✅ All auth cards are centered on red gradient bg
✅ All inputs have 16px minimum font size
✅ All buttons have hover + active + disabled states
✅ Toast system is functional
✅ Screen transitions use screenEnter animation
✅ No full page scroll on any screen
✅ No placeholder/broken image — all URLs from guidelines

=============================================================
BUILD ORDER FOR THIS STEP
=============================================================

1. Global CSS (fonts, variables, animations)
2. Mock data at top of file
3. Toast system component
4. Loading Screen
5. Landing Screen
6. Signup Screen
7. OTP Verification Screen
8. Login Screen
9. Forgot Password Screen
10. App Shell (sidebar + top bar + content area)
11. Screen navigation state connecting all screens
12. Toast triggers on key actions

BUILD ALL OF THE ABOVE NOW.
DO NOT skip any screen.
DO NOT use placeholder colors.
USE EXACT URLs from system guidelines.
=============================================================