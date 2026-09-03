=============================================================
NurtureSync — Complete System Guidelines
Product: NurtureSync
Research: "Emotionally Adaptive UI/UX for Menstrual Cycle Tracking"
Author: Shreyash Patekar, KJ Somaiya Institute of Management
Version: 1.0 — Mobile App Build
Last Updated: June 2025
=============================================================

=============================================================
CRITICAL — READ BEFORE GENERATING ANYTHING
=============================================================

This is a MOBILE-FIRST application.
Primary experience = mobile (375px–430px)
Secondary = tablet responsive adaptation

NurtureSync is NOT a period calendar app.
It is an EMOTIONALLY ADAPTIVE menstrual wellness app.
The interface must FEEL different based on the user's
current cycle phase. Colors, tone, microcopy, and
card density all shift with the phase.

DESIGN PHILOSOPHY (from research findings):
  — Confirmative, not catastrophizing
  — Individualised, not average-based
  — Low friction always
  — Privacy-first, never mandatory disclosure
  — Support what it cannot treat
  — Strengths before weaknesses
  — Celebrate small wins, never shame

FEEL: Calm · Warm · Empathetic · Soft · Trustworthy
NOT: Clinical, alarming, pink-overloaded, infantilising

UI REFERENCE: 4 prototype screens from Fig. 2 of paper:
  A — Emotion logging + mood trend + insight card
  B — Cause-tagging of triggers
  C — Contextual coping suggestions
  D — Privacy & Safety / Safe Mode controls

ICONS: Icons8 3D Fluency ONLY (URLs listed below)
NO custom illustrations needed — icons + color do the work.

=============================================================
ICONS8 3D FLUENCY — ALL ICON URLs
=============================================================

Always add to every icon img tag:
  style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.12))"

On hero/featured icons add float animation:
  style="animation: float 3s ease-in-out infinite; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15))"

EMOTION / MOOD ICONS:
Heart (wellness):
  https://img.icons8.com/3d-fluency/100/like.png

Brain / Mind:
  https://img.icons8.com/3d-fluency/100/brain.png

Meditation / Calm:
  https://img.icons8.com/3d-fluency/100/meditation.png

Diary / Journal:
  https://img.icons8.com/3d-fluency/100/diary.png

Pencil / Write:
  https://img.icons8.com/3d-fluency/100/pencil.png

CYCLE / HEALTH ICONS:
Calendar:
  https://img.icons8.com/3d-fluency/100/calendar.png

Moon (luteal/rest):
  https://img.icons8.com/3d-fluency/100/full-moon.png

Sun (follicular/energy):
  https://img.icons8.com/3d-fluency/100/sun.png

Flower (ovulation):
  https://img.icons8.com/3d-fluency/100/cherry-blossom.png

Snowflake / Rain (menstrual):
  https://img.icons8.com/3d-fluency/100/rain.png

COPING TOOL ICONS:
Breathing / Wind:
  https://img.icons8.com/3d-fluency/100/wind.png

Music / Headphones:
  https://img.icons8.com/3d-fluency/100/headphones.png

Yoga / Stretch:
  https://img.icons8.com/3d-fluency/100/yoga.png

Tea / Rest:
  https://img.icons8.com/3d-fluency/100/tea.png

Walking:
  https://img.icons8.com/3d-fluency/100/walking.png

PRIVACY / SAFETY ICONS:
Shield / Safe:
  https://img.icons8.com/3d-fluency/100/shield.png

Lock:
  https://img.icons8.com/3d-fluency/100/lock.png

Eye (visibility):
  https://img.icons8.com/3d-fluency/100/eye.png

Privacy:
  https://img.icons8.com/3d-fluency/100/private.png

INSIGHT / ANALYTICS ICONS:
Chart / Trend:
  https://img.icons8.com/3d-fluency/100/combo-chart.png

Sparkle / Insight:
  https://img.icons8.com/3d-fluency/100/sparkles.png

Star:
  https://img.icons8.com/3d-fluency/100/star.png

Trophy / Streak:
  https://img.icons8.com/3d-fluency/100/trophy.png

Fire / Streak:
  https://img.icons8.com/3d-fluency/100/fire-element.png

Lightning / Energy:
  https://img.icons8.com/3d-fluency/100/lightning-bolt.png

NAVIGATION ICONS (use Lucide React — NOT Icons8 for nav):
  Home:         <Home />
  Calendar:     <CalendarDays />
  Activity:     <Activity />
  Shield:       <ShieldCheck />
  User:         <User />
  Settings:     <Settings />
  ChevronRight: <ChevronRight />
  Plus:         <Plus />
  Check:        <Check />
  X:            <X />
  ArrowLeft:    <ArrowLeft />

=============================================================
BRAND & IDENTITY
=============================================================

App Name:     NurtureSync
Tagline:      "With you, every day of your cycle."
Research By:  Shreyash Patekar
Institution:  KJ Somaiya Institute of Management, Mumbai

LOGO TREATMENT (in app top bar):
  "Nurture" (#6666C6 or phase color) +
  "Sync"    (#26215C)
  Font: DM Serif Display, 22px, weight 400
  + small cherry blossom icon left of text (20px)

IN BOTTOM NAV:
  App name hidden — icon only nav

ON SPLASH / ONBOARDING:
  Large cherry blossom icon (80px float animation)
  + "NurtureSync" display text centered
  + tagline below in body font, muted

PHASE IDENTITY (the core brand shift):
  Each cycle phase has its own color, icon,
  label, and microcopy tone.
  THIS IS THE MOST IMPORTANT DESIGN FEATURE.
  See Phase Color System below.

=============================================================
PHASE COLOR SYSTEM — CORE OF THE APP
=============================================================

The entire app UI shifts based on current cycle phase.
This is grounded in Finding B of the research paper:
"Phase-specific emotional fingerprints."

━━ MENSTRUAL PHASE (Days 1–5) ━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Label:          "Rest & Restore"
  Icon:           https://img.icons8.com/3d-fluency/100/rain.png
  Emotion:        Overwhelm, fatigue, depletion

  PRIMARY:        #9B6FA0  (muted mauve)
  PRIMARY LIGHT:  #F5EEF7
  PRIMARY BORDER: #D9BEE0
  ACCENT:         #C49DC9
  GRADIENT:       linear-gradient(145deg, #7A4F80, #9B6FA0, #B88DC0)

  MICROCOPY TONE: Soft, validating, no asks
  Example insight: "Day 2 tends to feel heavy. That's real.
                    You don't have to explain it."
  Check-in ask:   1 question max
  CTA label:      "I'm here"  (not "Log Now")
  Coping focus:   Rest, warmth, breathing, heat pad

━━ FOLLICULAR PHASE (Days 6–13) ━━━━━━━━━━━━━━━━━━━━━━━━━

  Label:          "Rise & Build"
  Icon:           https://img.icons8.com/3d-fluency/100/sun.png
  Emotion:        Clarity, uplift, motivation, calm

  PRIMARY:        #E07B54  (warm terracotta)
  PRIMARY LIGHT:  #FDF0EB
  PRIMARY BORDER: #F2C4AE
  ACCENT:         #E89A7A
  GRADIENT:       linear-gradient(145deg, #C45E38, #E07B54, #EDA07E)

  MICROCOPY TONE: Energising, affirming, action-ready
  Example insight: "You're in your rise phase. This is a great
                    time to plan, create, and move."
  Check-in ask:   3–5 questions, full depth OK
  CTA label:      "Let's go"
  Coping focus:   Movement, journaling, planning, learning

━━ OVULATION PHASE (~Day 14) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Label:          "Peak & Connect"
  Icon:           https://img.icons8.com/3d-fluency/100/cherry-blossom.png
  Emotion:        Social, paradox (strong + emotional)

  PRIMARY:        #6666C6  (periwinkle — brand anchor)
  PRIMARY LIGHT:  #EEEDFE
  PRIMARY BORDER: #CECBF6
  ACCENT:         #AFA9EC
  GRADIENT:       linear-gradient(145deg, #3C3489, #6666C6, #8A85D4)

  MICROCOPY TONE: Warm, connecting, celebratory
  Example insight: "You may feel both strong and emotional
                    today — that's not a contradiction."
  Check-in ask:   2–3 questions
  CTA label:      "Check in"
  Coping focus:   Social connection, creative expression

━━ LUTEAL PHASE (Days 15+) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Label:          "Reflect & Ride"
  Icon:           https://img.icons8.com/3d-fluency/100/full-moon.png
  Emotion:        Bimodal — calm OR storm (SD = 2.4, highest variability)

  PRIMARY:        #4A90A4  (teal-slate)
  PRIMARY LIGHT:  #EAF4F7
  PRIMARY BORDER: #A8D4DC
  ACCENT:         #7AB3C0
  GRADIENT:       linear-gradient(145deg, #2E6E82, #4A90A4, #6FAFBF)

  MICROCOPY TONE: Non-prescriptive, curious, non-alarming
  Example insight: "Some days the luteal phase is calm.
                    Some days it isn't. Both are valid."
  Check-in ask:   1–3 questions, user chooses depth
  CTA label:      "How are you?"
  Coping focus:   Stress separation, grounding, self-compassion

━━ PHASE RULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Every gradient card, hero banner, phase badge,
  and primary CTA uses the current phase's gradient.
  The bottom navigation and card borders shift to
  the phase's PRIMARY color as the accent.
  White cards and muted backgrounds remain constant.
  Phase color is NEVER used in alarm or error states —
  use #DC2626 red exclusively for errors.

=============================================================
NEUTRAL COLOR SYSTEM (NEVER DEVIATE)
=============================================================

PAGE BG:          #FAFAFA
CARD BG:          #FFFFFF
OUTER BG:         #F1EFF8  (very faint purple tint)
TEXT PRIMARY:     #1A1A2E
TEXT SECONDARY:   #4A4A6A
TEXT MUTED:       #7A7A9A
TEXT HINT:        #A8A8C0
BORDER:           #E8E6F0
BORDER STRONG:    #CECBF6

SUCCESS:          #16A34A
SUCCESS LIGHT:    #DCFCE7
SUCCESS BORDER:   #86EFAC

WARNING:          #D97706
WARNING LIGHT:    #FEF3C7
WARNING BORDER:   #FCD34D

ERROR:            #DC2626
ERROR LIGHT:      #FEF2F2
ERROR BORDER:     #FECACA

SAFE MODE:
  Green:          #059669
  Green Light:    #D1FAE5
  Green Border:   #6EE7B7

CRISIS BANNER:    #7C3AED (purple — calm, not alarming red)
CRISIS LIGHT:     #F5F3FF

=============================================================
TYPOGRAPHY
=============================================================

FONTS (load via Google Fonts):
  @import url('https://fonts.googleapis.com/css2?
    family=DM+Serif+Display:ital@0;1&
    family=Plus+Jakarta+Sans:wght@400;500;600;700&
    display=swap');

CSS VARIABLES:
  --font-display: 'DM Serif Display', serif;
  --font-body:    'Plus Jakarta Sans', sans-serif;

NEVER USE: Inter, Roboto, Arial, system-ui, Nunito

SCALE:
  Display:        DM Serif Display 32px weight 400 (italic ok)
  Page Title:     DM Serif Display 24px weight 400
  Section Title:  Plus Jakarta Sans 18px weight 700
  Card Title:     Plus Jakarta Sans 16px weight 600
  Body:           Plus Jakarta Sans 14px weight 400
  Small:          Plus Jakarta Sans 13px weight 400
  Label:          Plus Jakarta Sans 11px weight 600
                  UPPERCASE letter-spacing 1px
  Button:         Plus Jakarta Sans 15px weight 600
  Input:          Plus Jakarta Sans 16px weight 400
                  (16px minimum — prevents iOS zoom)
  Insight text:   Plus Jakarta Sans 13px weight 400
                  line-height 1.6 (breathable)
  Phase label:    Plus Jakarta Sans 11px weight 700
                  UPPERCASE letter-spacing 1.5px

SECTION HEADERS ALWAYS INCLUDE EMOJI:
  "How are you feeling? 🌿"
  "What triggered this? 🏷"
  "For you, right now ✨"
  "Your cycle today 🌙"
  "This week's mood 📈"
  "Privacy & Safety 🔒"
  "Your patterns 🔍"
  "Today's insight 💡"
  "Coping tools 🌬"
  "Partner sharing 💬"

=============================================================
SPACING SYSTEM — 8PT GRID
=============================================================

  4px   icon gaps, tight inline
  8px   within component
  12px  compact card padding
  16px  standard padding
  20px  section separation
  24px  major sections, screen padding
  32px  page-level spacing
  48px  large section gaps

NEVER USE: 5, 7, 9, 11, 13px

FIXED HEIGHTS:
  Status bar area:    44px (safe area top)
  Top bar:            56px
  Bottom nav:         72px (safe area bottom)
  Phase banner:       96px
  Mood selector row:  80px
  Stat card:          88px
  Action card:        100px
  Coping card:        80px
  Check-in card:      auto (min 120px)
  Input height:       52px
  Button height:      52px mobile / 48px compact

=============================================================
BORDER RADIUS
=============================================================

  Tags / chips:       6px
  Inputs:             12px
  Buttons:            14px
  Cards:              20px
  Large cards:        24px
  Bottom sheet:       24px top corners only
  Bottom nav:         0 (full width)
  Phase banner:       20px
  Mood bubbles:       50% (circle)
  Avatars:            50%
  App container:      0 (full screen mobile)
  Pills:              9999px

=============================================================
SHADOWS
=============================================================

  Card default:         0 2px 10px rgba(102,102,198,0.06)
  Card hover:           0 8px 24px rgba(102,102,198,0.14)
  Phase card:           0 12px 32px [phase-color at 0.25 opacity]
  Modal / Sheet:        0 -4px 30px rgba(0,0,0,0.14)
  Button primary:       0 4px 14px [phase-color at 0.30 opacity]
  Input focus:          0 0 0 3px [phase-color at 0.15 opacity]
  Mood bubble active:   0 4px 12px [phase-color at 0.35 opacity]
  Bottom nav:           0 -1px 0 #E8E6F0

=============================================================
LAYOUT — NON-NEGOTIABLE RULES
=============================================================

RULE 1: MOBILE FIRST, FULL SCREEN
  Primary layout = 375px–430px
  NO web column centering
  Full viewport width always
  Safe area insets respected (top 44px, bottom 34px)

RULE 2: ONE SCREEN = ONE JOB
  Each screen answers one question for the user.
  No multi-purpose screens.
  Example:
    Home → "What's my phase today + quick mood log?"
    Log → "How am I feeling right now?"
    Cope → "What can help me right now?"
    Calendar → "What does my cycle look like?"
    Insights → "What patterns am I building?"
    Privacy → "How is my data protected?"

RULE 3: BOTTOM NAVIGATION ALWAYS VISIBLE
  5 tabs: Home | Log | Cope | Calendar | Me
  Never hidden, never hamburger
  Active tab uses current phase PRIMARY color
  Icon + label (10px) always shown

RULE 4: INNER SCROLL ONLY
  Each screen scrolls internally
  Bottom nav and top bar NEVER scroll away
  overflow: hidden on screen wrapper
  overflow-y: auto on content area

RULE 5: PHASE BANNER ON HOME
  Always the first element under the top bar
  Shows current phase name, icon, day count,
  phase gradient background
  Height: 96px, full width, rounded bottom corners 20px

RULE 6: NO CLINICAL LANGUAGE EVER
  NEVER: "Symptoms", "Disorder", "Abnormal", "Irregular"
  USE:   "How you feel", "Your pattern", "Your body", "Today"
  NEVER: Red as phase color (red = errors ONLY)
  NEVER: Alarm tone in insight cards

APP SHELL STRUCTURE:
  FULL SCREEN (375–430px wide)
    STATUS BAR SAFE AREA (44px, transparent)
    TOP BAR (56px)
      [Phase-colored left accent strip 3px]
      [App name logo left]
      [Streak pill center-right]
      [Avatar right]
    SCREEN CONTENT (calc 100vh - 56px - 72px)
      [Scrollable inner content]
    BOTTOM NAVIGATION (72px fixed)

=============================================================
TOP BAR SPEC
=============================================================

  Height:           56px
  Background:       white
  Border-bottom:    1px solid #E8E6F0
  Padding:          0 20px
  Display:          flex, align-center, space-between
  Left accent:      3px strip of current phase PRIMARY color
                    (position absolute, left 0, top 0, bottom 0)

  LEFT:
    Cherry blossom icon 18px + "NurtureSync"
    DM Serif Display 18px #1A1A2E

  CENTER: (only on home screen)
    Phase pill:
      background: phase PRIMARY LIGHT
      border: 1px phase PRIMARY BORDER
      color: phase PRIMARY
      text: current phase label
      11px weight 700 uppercase
      padding: 4px 12px, radius 9999px

  RIGHT:
    Streak pill:
      bg: #FEF3C7, color: #D97706, border: #FCD34D
      "🔥 7" — 12px weight 700, radius 9999px, padding 4px 10px
    Avatar circle 34px:
      bg: phase gradient
      initials "SP" — DM Serif Display 13px white
      Safe Mode indicator: green dot bottom-right (if active)

=============================================================
BOTTOM NAVIGATION SPEC
=============================================================

  Height:           72px (includes safe area bottom ~34px)
  Background:       white
  Border-top:       1px solid #E8E6F0
  Box-shadow:       0 -1px 0 #E8E6F0
  Display:          flex, 5 equal columns

  TABS (left to right):
    1. Home         icon: <Home /> 22px
    2. Log          icon: <PenLine /> 22px
    3. Cope         icon: <Sparkles /> 22px  [CENTER — slightly larger 26px]
    4. Calendar     icon: <CalendarDays /> 22px
    5. Me           icon: <User /> 22px

  EACH TAB:
    Display: flex column, align center, justify center
    Gap: 3px
    Icon + label 10px weight 600 uppercase letter-spacing 0.5px

  INACTIVE:
    Icon color: #A8A8C0
    Label color: #A8A8C0
    Background: transparent

  ACTIVE:
    Icon color: current phase PRIMARY
    Label color: current phase PRIMARY
    Background: transparent
    Top border: 2px solid current phase PRIMARY (top of tab)

  CENTER TAB (Cope) extra treatment:
    Icon container: 48px circle
    Background: current phase PRIMARY
    Icon: white 24px
    Lifted: margin-top -12px
    Box-shadow: 0 4px 14px phase color 0.35

=============================================================
COMPONENTS
=============================================================

PRIMARY BUTTON:
  Background:   current phase GRADIENT
  Color:        white
  Height:       52px
  Padding:      0 24px
  Border-radius: 14px
  Font:         Plus Jakarta Sans 15px weight 600
  Hover/Press:  scale(0.97), shadow 0 6px 20px phase 0.30
  Disabled:     bg #E8E6F0, text #A8A8C0
  Loading:      spinner 16px white + "Just a moment..."
  Full width on mobile always

SECONDARY BUTTON:
  Background:   transparent
  Border:       1.5px solid current phase PRIMARY BORDER
  Color:        current phase PRIMARY
  Height:       52px, radius 14px
  Font:         Plus Jakarta Sans 15px weight 600
  Hover:        bg phase PRIMARY LIGHT

GHOST BUTTON:
  Background:   transparent, no border
  Color:        current phase PRIMARY
  Height:       40px, radius 10px
  Font:         14px weight 500

DANGER BUTTON:
  Background:   #DC2626, color white
  ONLY for: Delete account, Remove data actions

INPUT:
  Height:       52px
  Padding:      0 16px
  Background:   white
  Border:       1.5px solid #E8E6F0
  Border-radius: 12px
  Font:         Plus Jakarta Sans 16px #1A1A2E
  Label above:  11px uppercase #7A7A9A letter-spacing 1px
  Focus:        border phase PRIMARY,
                shadow 0 0 0 3px phase PRIMARY 0.12
  Error:        border #DC2626, bg #FEF2F2
  Success:      border #16A34A
  Disabled:     bg #F8F8FC, text #A8A8C0

PHASE BANNER CARD:
  Background:   current phase GRADIENT
  Height:       96px, width 100%
  Border-radius: 0 0 24px 24px (rounded bottom only)
  Padding:      16px 20px
  Layout:       flex, space-between, align-center
  Left:
    Phase icon  40px (float animation)
    Phase label 11px white uppercase letter-spacing 1.5px
    Phase name  18px white DM Serif Display
    "Day 3 of 5" — 12px white 0.7 opacity
  Right:
    Cycle ring progress SVG 60px
    Days to next phase muted text

MOOD BUBBLE SELECTOR:
  5 circles in a row
  Each: 52px diameter, border-radius 50%
  Labels below: 9px, centered
  INACTIVE: bg #F1EFF8, border 1.5px #E8E6F0
  ACTIVE:   bg phase PRIMARY, border phase PRIMARY
            shadow 0 4px 12px phase 0.35
            scale(1.15) transform
  Mood labels (left to right):
    "Very low" | "Low" | "Okay" | "Good" | "Great"
  Mood emoji displayed inside bubble when selected
  Tap animation: spring scale 1.0 → 1.2 → 1.15

INSIGHT CARD (non-alarming):
  Background:   phase PRIMARY LIGHT
  Border:       1px phase PRIMARY BORDER
  Border-radius: 16px
  Padding:      14px 16px
  Left stripe:  3px solid phase PRIMARY, height 100%, radius 3px
  Icon:         sparkles 20px phase PRIMARY (top left)
  Label:        "✨ Today's insight" 11px uppercase phase PRIMARY
  Text:         13px #1A1A2E line-height 1.6
  NEVER uses alarming language (see microcopy rules)

TRIGGER TAG CHIP:
  Height:       34px
  Padding:      0 14px
  Border-radius: 9999px
  Font:         Plus Jakarta Sans 13px weight 500

  INACTIVE: bg white, border 1.5px #E8E6F0, text #4A4A6A
  SELECTED: bg phase PRIMARY, border phase PRIMARY, text white
  Tap animation: scale 0.95 → 1.0 spring

COPING CARD:
  Background:   white
  Border:       1px #E8E6F0
  Border-radius: 16px
  Padding:      16px
  Height:       80px min
  Layout:       flex, align-center, gap 14px
  Left:
    Icon container 44px circle, bg phase PRIMARY LIGHT
    Icon8 3D icon 28px
  Center:
    Title 14px weight 600 #1A1A2E
    Subtitle 12px #7A7A9A (duration + benefit)
  Right:
    "Start →" ghost button or
    Phase PRIMARY right-arrow icon

TOGGLE ROW:
  Layout:       flex, space-between, align-center
  Padding:      14px 0
  Border-bottom: 0.5px solid #F1EFF8
  Label:        14px weight 500 #1A1A2E
  Sublabel:     12px #7A7A9A
  Toggle pill:  44px × 24px, border-radius 12px
    ON:  bg phase PRIMARY (or #059669 for safe mode)
    OFF: bg #E8E6F0
    Dot: white 18px circle, spring transition

SAFE MODE BADGE (active state):
  Background:   #D1FAE5
  Border:       1px #6EE7B7
  Border-radius: 12px
  Padding:      12px 16px
  Icon:         shield 20px #059669
  Text:         "Safe Mode is ON" 14px weight 600 #065F46
  Subtext:      12px #047857 "App shows as 'Wellness'"

BADGE / CHIP:
  Padding:      4px 10px, radius 9999px, 12px weight 600
  Phase:        bg phase PRIMARY LIGHT, text phase PRIMARY
  Success:      bg #DCFCE7, text #16A34A, border #86EFAC
  Warning:      bg #FEF3C7, text #D97706, border #FCD34D
  Error:        bg #FEF2F2, text #DC2626, border #FECACA
  Neutral:      bg #F1F5F9, text #475569, border #E2E8F0
  Crisis:       bg #F5F3FF, text #7C3AED, border #DDD6FE

PROGRESS BAR:
  Track:        #E8E6F0
  Fill:         phase PRIMARY (default)
              ≥80%: #16A34A | 50-79%: phase | <50%: #D97706
  Animate from 0% on mount: 800ms ease-out
  Heights:      4px compact / 6px standard / 8px prominent
  Border-radius: 9999px

CIRCULAR PROGRESS (cycle ring):
  SVG stroke animation on mount
  Track: #E8E6F0
  Fill: current phase PRIMARY
  Center: day number + "day" label
  Size: 60px on banner / 80px on detail screens

EMPTY STATE:
  Always: Icons8 icon (64px float) + title + description + CTA
  Title: encouraging, never negative
  Background: phase PRIMARY LIGHT
  Example: "Nothing logged yet today 🌿
            Tap below to check in — it takes 30 seconds."

TOAST:
  Fixed top-center, bg #1A1A2E, text white
  Pill shape radius 9999px
  Entry: toastEnter 350ms spring, auto-dismiss 3s
  Mood saved toast: bg phase gradient, "Logged 🌿 +1 streak"
  Crisis toast: bg #7C3AED, white, always top

BOTTOM SHEET (for detail views):
  Slides up from bottom
  Border-radius 24px top corners only
  Background white
  Handle bar: 40px × 4px, bg #E8E6F0, centered, margin 12px auto
  Overlay: rgba(0,0,0,0.40) behind

=============================================================
ANIMATIONS — DEFINE ALL IN GLOBAL CSS
=============================================================

@keyframes screenEnter {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-7px); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-10px) rotate(2deg); }
}

@keyframes spring {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.18); }
  70%  { transform: scale(0.95); }
  100% { transform: scale(1.08); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.08); opacity: 0.85; }
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes toastEnter {
  from { opacity: 0; transform: translateX(-50%) translateY(-50px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes circleDraw {
  from { stroke-dashoffset: 283; }
  to   { stroke-dashoffset: var(--circle-offset); }
}

@keyframes moodSelect {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.20); }
  100% { transform: scale(1.15); }
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

@keyframes tagPop {
  0%   { transform: scale(1); }
  40%  { transform: scale(0.94); }
  100% { transform: scale(1); }
}

.screen-enter {
  animation: screenEnter 250ms ease-out both;
}

.skeleton {
  background: linear-gradient(
    90deg,
    #F1EFF8 25%, #E8E6F0 50%,
    #F1EFF8 75%, #F1EFF8 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s linear infinite;
}

.inner-scroll {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #CECBF6 transparent;
  -webkit-overflow-scrolling: touch;
}
.inner-scroll::-webkit-scrollbar { width: 3px; }
.inner-scroll::-webkit-scrollbar-thumb {
  background: #CECBF6;
  border-radius: 9999px;
}

ANIMATION RULES:
  Every screen switch:        screenEnter 250ms
  Mood bubble tap:            moodSelect spring
  Tag chip tap:               tagPop 150ms
  Progress bars:              fill from 0% on mount
  Circular ring:              circleDraw on mount
  Coping card:                fadeUp staggered 60ms each
  Icons8 hero icons:          float always
  Bottom sheet open:          slideUp 300ms ease-out
  Phase transition:           phase colors crossfade 400ms
  Only animate: opacity, transform, filter
  NEVER animate: width, height, top, left, padding, margin

=============================================================
STREAK & ENGAGEMENT SYSTEM
=============================================================

STREAK LOGIC (grounded in Finding D — retention):
  Daily check-in = streak maintained
  No shame if missed — just "Welcome back 🌿"
  Streak shown as fire pill in top bar
  Only 1 question minimum to maintain streak
  (research: short = retained, long = dropped out)

STREAK GAINS (show toast on action):
  Daily check-in (1 question): streak +1, "Logged 🌿"
  Full mood log (all fields):  "+1 full log ✨"
  Used a coping tool:          "Self-care noted 💛"
  7-day streak:                "One week strong 🔥"
  Partner share sent:          "Connection made 💬"

LEVEL SYSTEM (gentle, non-gamey):
  1–6 days:   "Just starting 🌱"
  7–13 days:  "Finding your rhythm 🌿"
  14–20 days: "One cycle in 🌸"
  21–27 days: "In tune 🌙"
  28+ days:   "Cycle aware ✨"

These are shown ONLY on the Me / Profile screen.
NEVER shown as pressure or countdown.
Always framed as awareness, not achievement.

=============================================================
MOCK DATA — CURRENT USER
=============================================================

USER:
  name:           "Priya"
  initials:       "PS"
  age:            23
  cycleDay:       3
  cycleLength:    28
  currentPhase:   "Menstrual"
  phaseDay:       3
  phaseTotalDays: 5
  nextPhase:      "Follicular"
  daysToNext:     2
  streak:         7
  totalLogs:      14
  safeModeOn:     true
  partnerShareOn: false
  persona:        "Sufferer"  (P001 type — moderate symptoms)

WELLBEING HISTORY (last 7 days):
  [
    {day:"Mon", emotional:5.2, physical:4.0, energy:2.8},
    {day:"Tue", emotional:4.8, physical:4.0, energy:2.6},
    {day:"Wed", emotional:5.0, physical:4.5, energy:3.0},
    {day:"Thu", emotional:6.2, physical:5.8, energy:5.0},
    {day:"Fri", emotional:7.0, physical:6.8, energy:6.2},
    {day:"Sat", emotional:7.8, physical:7.5, energy:7.0},
    {day:"Sun", emotional:8.0, physical:8.2, energy:7.8},
  ]

MOOD LOG HISTORY (last 5 entries):
  [
    {date:"Today",     mood:2, phase:"Menstrual",  triggers:["Cramps","Fatigue"]},
    {date:"Yesterday", mood:2, phase:"Menstrual",  triggers:["Cramps","Work stress"]},
    {date:"2d ago",    mood:3, phase:"Luteal",     triggers:["Anxiety","Poor sleep"]},
    {date:"3d ago",    mood:4, phase:"Luteal",     triggers:["Stress"]},
    {date:"4d ago",    mood:4, phase:"Luteal",     triggers:["Mood swings"]},
  ]

TRIGGER OPTIONS (for cause-tagging):
  Row 1: "Cramps" | "Fatigue" | "Work stress"
  Row 2: "Poor sleep" | "Bloating" | "Headache"
  Row 3: "Anxiety" | "Mood swings" | "Social stress"
  Row 4: "Appetite" | "Body image" | "No reason"

COPING TOOLS (contextual to Menstrual phase):
  [
    {
      id: "breathe",
      icon: "https://img.icons8.com/3d-fluency/100/wind.png",
      title: "4-7-8 Breathing",
      subtitle: "2 min · Calms nervous system",
      phase: ["Menstrual","Luteal"],
      type: "breathe"
    },
    {
      id: "tea",
      icon: "https://img.icons8.com/3d-fluency/100/tea.png",
      title: "Warm drink + rest",
      subtitle: "5 min · Soothes physical discomfort",
      phase: ["Menstrual"],
      type: "rest"
    },
    {
      id: "journal",
      icon: "https://img.icons8.com/3d-fluency/100/diary.png",
      title: "Quick journal",
      subtitle: "3 min · Name what you feel",
      phase: ["Menstrual","Luteal","Ovulation"],
      type: "write"
    },
    {
      id: "music",
      icon: "https://img.icons8.com/3d-fluency/100/headphones.png",
      title: "Calming playlist",
      subtitle: "Open · Low-stimulation audio",
      phase: ["Menstrual","Luteal"],
      type: "music"
    },
    {
      id: "walk",
      icon: "https://img.icons8.com/3d-fluency/100/walking.png",
      title: "Gentle walk",
      subtitle: "10 min · Light movement helps",
      phase: ["Follicular","Ovulation"],
      type: "move"
    },
    {
      id: "yoga",
      icon: "https://img.icons8.com/3d-fluency/100/yoga.png",
      title: "Yoga stretch",
      subtitle: "7 min · Eases cramp discomfort",
      phase: ["Menstrual","Follicular"],
      type: "move"
    }
  ]

CYCLE CALENDAR DATA (current month):
  menstrualDays:  [1,2,3,4,5]
  follicularDays: [6,7,8,9,10,11,12,13]
  ovulationDays:  [14,15]
  lutealDays:     [16,17,18,19,20,21,22,23,24,25,26,27,28]
  loggedDays:     [1,2,3]
  todayDay:       3

PHASE INSIGHTS (by phase):
  Menstrual: [
    "Day 3 tends to feel heavy for many. That's real, not weakness.",
    "Your energy trough is expected here — rest is productive.",
    "Brain fog you feel isn't a loss of ability. It's a signal."
  ]
  Follicular: [
    "You're in your rise phase. A great time to plan and create.",
    "Energy is climbing — your body is building momentum.",
    "Clarity tends to peak here. Use it if you can."
  ]
  Ovulation: [
    "You may feel both strong and emotional today — both are real.",
    "Social connection tends to feel easier this phase.",
    "Your peak phase. Notice what feels different."
  ]
  Luteal: [
    "Some luteal days are calm. Some aren't. Both are valid.",
    "Outside stress matters more here than hormones alone.",
    "If things feel harder, it may be life, not your cycle."
  ]

PERSONAS (from research Table IV):
  Warrior:           minimal symptoms, planning focus
  Sufferer:          severe pain/mood volatility (Priya's persona)
  Curious Tracker:   stress-reactive, wants separation
  Irregular Cycler:  unpredictable cycles, needs reassurance
  Sensitive Resp.:   mental-health vulnerable, minimal friction

=============================================================
SCREEN LIST — ALL 9 SCREENS
=============================================================

SCREEN 1: Splash / Loading
  Single centered layout, cherry blossom icon float,
  app name, tagline, phase color gradient bg

SCREEN 2: Onboarding (4 steps)
  Step 1 — Welcome + name input
  Step 2 — Cycle day + last period date
  Step 3 — Cycle regularity + persona detection
  Step 4 — Safe Mode setup + privacy intro

SCREEN 3: Home / Dashboard
  Phase banner (adaptive gradient)
  Quick mood check-in card (1 question)
  Today's insight card
  Streak + wellbeing summary
  Jump to: Log | Cope | Calendar quick links

SCREEN 4: Emotion Log (Fig. 2A + 2B)
  Mood bubble selector (5 moods)
  Cause-tag chips (all trigger options)
  Open note field (optional)
  Mood trend mini chart (last 7 days)
  Non-alarming insight card below

SCREEN 5: Coping Tools (Fig. 2C)
  Phase-matched tool cards (filtered by current phase)
  Category filter pills (All | Rest | Breathe | Move | Write)
  Each card: icon + title + duration + Start button
  Bottom: "Not what you need?" link

SCREEN 6: Cycle Calendar
  Month calendar with phase color bands
  Logged days with mood dot overlay
  Phase prediction strip below calendar
  Tapping a day: bottom sheet with that day's log

SCREEN 7: Insights & Trends
  Wellbeing area chart (last 30 days)
  Phase comparison cards (your highs/lows per phase)
  Stress vs cycle separator (Finding C)
  Personal pattern cards (detected patterns)

SCREEN 8: Privacy & Safety (Fig. 2D)
  Safe Mode toggle (ON badge when active)
  Disguised icon option
  Data encryption status
  Partner sharing controls
  PIN / biometric lock
  Crisis pathway (calm, non-alarming)

SCREEN 9: Me / Profile
  Avatar + name + streak level
  Persona badge
  Cycle history summary
  Settings: notifications, cycle length, export data
  About NurtureSync + research credit

=============================================================
MICROCOPY RULES — NON-NEGOTIABLE
=============================================================

NEVER USE:            USE INSTEAD:
"Symptoms"            "How you feel"
"Disorder"            "Your pattern"
"Abnormal"            "Different from usual"
"PMS"                 "Luteal phase feelings"
"Failed to log"       "Missed today — welcome back 🌿"
"Error"               "Something went wrong — try again"
"Invalid"             "Let's try that again"
"You must"            "When you're ready"
"Incomplete"          "You can always add more later"
"Track your period"   "Understand your cycle"
"Mood disorder"       [NEVER used in app]

INSIGHT CARD RULES:
  — Always confirmative, never predictive alarm
  — Never says "you WILL feel X"
  — Always says "tends to" or "may feel"
  — Never diagnoses or implies diagnosis
  — Always ends with agency: "— that's real" or "— both are valid"

EMPTY STATE COPY:
  Log screen empty: "Nothing logged today yet 🌿
                     One tap is all it takes."
  Cope empty:       "Tools matched to your phase will appear here.
                     Log a mood to get started."
  Calendar empty:   "Your cycle story will build here
                     as you log each day."

CTA LABEL RULES:
  Phase-adaptive CTA labels (see Phase Color System above)
  NEVER: "Submit", "Save", "Continue", "Next", "Done"
  USE:   "I'm here" | "Log it" | "Let's go" | "That's me" |
          "Start" | "Try this" | "Add a note"

=============================================================
PHASE-ADAPTIVE UI BEHAVIOUR SUMMARY
=============================================================

When currentPhase === "Menstrual":
  Primary color:    #9B6FA0 (mauve)
  Banner gradient:  mauve gradient
  Check-in:         1 question only
  Coping cards:     Rest + Breathe first
  Insight tone:     Validating, no action required
  CTA label:        "I'm here"
  Density:          Low — more whitespace, fewer cards

When currentPhase === "Follicular":
  Primary color:    #E07B54 (terracotta)
  Banner gradient:  terracotta gradient
  Check-in:         Up to 5 questions
  Coping cards:     Move + Write + Plan first
  Insight tone:     Energising, action-inviting
  CTA label:        "Let's go"
  Density:          Medium-high — more content, active layout

When currentPhase === "Ovulation":
  Primary color:    #6666C6 (periwinkle — brand anchor)
  Banner gradient:  periwinkle gradient
  Check-in:         2–3 questions
  Coping cards:     Connect + Create first
  Insight tone:     Warm, relational, celebratory
  CTA label:        "Check in"
  Density:          Medium

When currentPhase === "Luteal":
  Primary color:    #4A90A4 (teal-slate)
  Banner gradient:  teal-slate gradient
  Check-in:         1–3 user-chosen
  Coping cards:     Grounding + Breathe + Journal first
  Insight tone:     Non-prescriptive, neutral, curious
  CTA label:        "How are you?"
  Density:          Low-medium — no pressure

=============================================================
PRIVACY & SAFE MODE SPEC
=============================================================

Grounded in Finding D: 80% refused libido question.
Privacy is the highest priority in this app.

SAFE MODE (when ON):
  — App icon on phone shows as "Wellness" (plain circle icon)
  — App name shows as "Wellness" in recents
  — Top bar shows "Wellness" instead of "NurtureSync"
  — All cycle/phase language replaced with neutral terms
    ("Daily check-in" instead of "Cycle day 3")
  — Green online dot on avatar = Safe Mode indicator
  — Settings > Privacy shows "Safe Mode is ON" green badge

DATA PRINCIPLES (always shown in Privacy screen):
  — All data stored on-device by default
  — No data sold or shared without explicit consent
  — Libido, body image, notes: never required, always optional
  — Export: user can export or delete all data at any time
  — Partner share: user writes their own words, not raw data

CRISIS PATHWAY (Finding E — mental health):
  — Triggered ONLY when user selects lowest mood (1/5) twice
    in 72 hours OR manually taps "I need support" link
  — Shows calm purple banner, NOT red alarm
  — Text: "You don't have to figure this out alone."
  — Link: iCall India (iCall.tiss.edu) +
          Vandrevala Foundation helpline
  — Never mandatory, always dismissible
  — Never says "crisis" or "emergency" in the UI

=============================================================
PARTNER SHARING SPEC
=============================================================

Grounded in Finding F: communication gap —
no participant discussed cycle with partner.

WHAT IT IS:
  User writes a short statement in their own words:
  "What [phase] feels like for me this cycle."
  This is then shared (if user chooses) via
  WhatsApp / text / copy-paste.

WHAT IT IS NOT:
  — NOT raw data export
  — NOT automatic sharing
  — NOT synced account
  — NOT a couples feature (can share with anyone)

UI:
  Located in Me screen and Privacy screen
  Toggle: "Optional partner sharing" OFF by default
  When on: shows "Write my message" button
  Message composer: bottom sheet, user types freely
  Share via: native share sheet

=============================================================
CHARTS & DATA VIZ SPEC
=============================================================

ALL CHARTS: Recharts only
isAnimationActive={true}
animationDuration={1000}
animationEasing="ease-out"
No axis lines, no tick lines
Subtle horizontal grid only (#F1EFF8)

TOOLTIP:
  bg #1A1A2E, text white
  radius 9999px, padding 6px 14px
  font Plus Jakarta Sans 12px

MOOD TREND MINI CHART (Log screen):
  Type: AreaChart
  Height: 80px, no axes labels
  7 data points (last 7 days)
  Area fill: phase PRIMARY at 0.15 opacity
  Line: phase PRIMARY 2px

WELLBEING CHART (Insights screen):
  Type: AreaChart with 3 lines
  Height: 160px
  Line 1 Emotional:  phase PRIMARY
  Line 2 Physical:   #16A34A
  Line 3 Energy:     #D97706
  Period toggle: [7d] [30d] [Cycle]

PHASE COMPARISON (Insights screen):
  Type: grouped bar or radar
  Shows user's own averages per phase
  NOT population averages

=============================================================
REACT COMPONENT STRUCTURE
=============================================================

Each screen is a self-contained React component.
State managed with useState / useContext.
Phase context available globally via PhaseContext.

GLOBAL STATE (PhaseContext):
  currentPhase: "Menstrual" | "Follicular" | "Ovulation" | "Luteal"
  phaseColor:   (derived from currentPhase)
  phaseGradient:(derived from currentPhase)
  cycleDay:     number
  safeModeOn:   boolean
  streak:       number

FOLDER STRUCTURE (conceptual):
  /components
    PhaseContext.jsx
    BottomNav.jsx
    TopBar.jsx
    PhaseBanner.jsx
    InsightCard.jsx
    MoodSelector.jsx
    TriggerTags.jsx
    CopingCard.jsx
    ToggleRow.jsx
    CircularProgress.jsx
    Toast.jsx
  /screens
    SplashScreen.jsx
    OnboardingScreen.jsx
    HomeScreen.jsx
    LogScreen.jsx
    CopeScreen.jsx
    CalendarScreen.jsx
    InsightsScreen.jsx
    PrivacyScreen.jsx
    MeScreen.jsx

=============================================================
PROMPT TEMPLATE FOR EACH SCREEN BUILD
=============================================================

When building each screen, start every prompt with:

"Using the NurtureSync System Guidelines:
 Current phase: [Menstrual / Follicular / Ovulation / Luteal]
 Build: [Screen Name]
 Safe Mode: [ON / OFF]
 [Additional screen-specific instructions below]"

=============================================================
ACCESSIBILITY
=============================================================

  Never remove focus outlines
  Custom focus: 3px solid phase PRIMARY at 0.4 opacity
  All icon buttons: aria-label required
  Progress bars: role="progressbar" + aria values
  Mood bubbles: aria-label "Rate mood as [label]"
  Modals/Sheets: role="dialog" + aria-modal + focus trap
  Toasts: role="alert" + aria-live="polite"
  Color never the only indicator of state
  Minimum tap target: 44×44px always
  Crisis links: role="link" + descriptive aria-label

=============================================================
PERFORMANCE
=============================================================

  Animate only: opacity, transform, filter
  Import Lucide icons individually
  Lazy load below-fold chart libraries
  Recharts: animationDuration 800ms on mobile
  Phase color transitions: CSS custom property swap
  No heavy illustrations — Icons8 CDN only
  will-change: transform on bottom sheet and modals

=============================================================
END OF SYSTEM GUIDELINES
=============================================================
PRODUCT:      NurtureSync
RESEARCH:     Shreyash Patekar — KJ Somaiya, Mumbai
PHASE COLORS: Menstrual #9B6FA0 | Follicular #E07B54
              Ovulation #6666C6 | Luteal #4A90A4
FONTS:        DM Serif Display + Plus Jakarta Sans
LAYOUT:       Mobile-first, full screen
ICONS:        Icons8 3D Fluency CDN
FEEL:         Calm · Warm · Empathetic · Private
SCREENS:      9 total (Splash, Onboarding, Home, Log,
              Cope, Calendar, Insights, Privacy, Me)
100% READY TO BUILD — USE THIS FILE FOR ALL PROMPTS
=============================================================
