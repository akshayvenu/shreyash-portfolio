=============================================================
SALESVISION — DIRECTOR PORTAL — BUILD PROMPT
=============================================================
Continue building SalesVision Director Portal.
Read the SalesVision Director Portal Design System v1.1 fully before writing any code.
Do NOT rebuild any screen's layout, structure, colors, typography, or
information architecture from Steps 1-12. This step touches ONLY motion,
timing, hover/press/focus feedback, and small moments of delight — every
change here should be invisible until you interact with something, then
feel obviously better. If a change here alters what a screen LOOKS like
at rest, it's out of scope for this step.

=============================================================
STEP 13 (BONUS) — MICRO-INTERACTION POLISH PASS
=============================================================

This is a different kind of step than 1-12: there's no new screen and no
new mock data. It's a pass through the ENTIRE app adding the small motion
details that separate "functionally complete" from "feels expensive."
Work through every section below, screen by screen, applying whichever
touches are relevant to what already exists — skip anything that doesn't
apply to a given screen rather than forcing it in.

Non-negotiable ground rule for this entire step: only animate `transform`,
`opacity`, and `filter` (never `width`/`height`/`padding`/`margin` — this
was a rule since Step 1's design tokens, it matters most right now).
Every animation added in this step must respect `prefers-reduced-motion:
reduce` by either shortening to near-zero or disabling entirely. Nothing
here should make any interaction SLOWER to complete — motion should feel
like confirmation, never like a delay the Director has to wait through.

=============================================================
A. GLOBAL MOTION REFINEMENTS (apply once, benefit every screen)
=============================================================

1. **Button press feedback, everywhere.** Every button in the app
   (primary/secondary/ghost/danger) should visibly compress on
   mousedown: `scale(0.97)`, 100ms, back to `scale(1)` on release —
   confirm this is actually wired on every button type, not just
   primary ones (it was specified from Step 1 onward, this is the
   audit-and-complete pass).

2. **Focus ring transition.** When focus moves via keyboard (Tab), the
   focus ring should fade in over 100ms rather than snapping instantly —
   makes keyboard navigation feel considered rather than jarring, while
   still meeting the ≥2px/≥3:1 contrast requirement already established.

3. **Tooltip fade delay.** Every tooltip in the app (chart tooltips,
   sidebar collapsed-state tooltips, icon-button aria-label tooltips if
   you're using visual tooltips alongside them) should wait ~150ms
   before appearing on hover (not on focus — focus should be instant, for
   accessibility) and fade in over 100ms. This prevents tooltip flicker
   when a cursor merely passes over something on its way elsewhere.

4. **Card hover lift, consistently timed.** Every clickable card
   (KPI-adjacent stat cards, lead cards, manager cards, department/team
   cards) uses `translateY(-2px)` + shadow increase — confirm the
   TIMING is identical everywhere: 150ms ease-out on hover-in, 200ms
   ease-in on hover-out (slightly slower to settle back down feels more
   natural than a symmetric transition).

5. **Skeleton shimmer, one shared component.** If any screen built its
   own bespoke loading skeleton instead of reusing a shared one, unify
   them now — same shimmer gradient, same 1.8s sweep, same corner radii
   matching the content they're replacing (a skeleton KPI card has the
   same 18px radius as the real KPI card, etc.).

6. **Number transitions on filter change, not just on mount.** KPI
   numerals currently count up from 0 on first load (Step 1). Extend
   this: when a filter change causes a KPI's value to change (e.g.
   switching Mapping's industry chip, or Team's manager-card filter),
   the numeral should smoothly TRANSITION from its old value to its new
   one over ~400ms, not just snap — reinforces that the whole screen
   responded to the filter, not just the table below it.

7. **Toast entrance/exit.** Toasts should slide up + fade in from the
   bottom (or top-center, per wherever Step 1 placed them) over 200ms,
   and fade out (not just disappear) over 150ms when dismissed —
   auto-dismiss timing (~3000ms) stays exactly as established.

8. **Chip/pill press bounce.** Filter chips and segmented-toggle pills
   (industry chips, manager chips, temperature tabs, period pills)
   should have a brief `scale(1.05)` overshoot on click before settling
   to `scale(1)` — 150ms total, spring-like easing
   (`cubic-bezier(0.34, 1.56, 0.64, 1)`) rather than the standard ease —
   this is the one spot in the whole app where a slight bounce is
   appropriate, since it's confirming a quick, low-stakes toggle.

=============================================================
B. NAVIGATION & SHELL POLISH
=============================================================

1. **Sidebar active-pill transition.** When the active nav item changes,
   the black pill shouldn't just jump — animate its position with a
   200ms ease transition if your implementation renders it as a single
   sliding element behind the icons/labels; if each item independently
   toggles its own background, at minimum crossfade the old/new
   backgrounds over 150ms rather than an instant swap.

2. **Sidebar collapse, label fade before width change.** When collapsing
   the sidebar (72px ↔ 240px), fade OUT the labels first (100ms), then
   animate the width (200ms), then fade IN labels last if re-expanding —
   sequencing it this way avoids the labels visibly squishing/wrapping
   mid-transition.

3. **Breadcrumb entrance.** Every breadcrumb (Lead Detail, Executive
   Profile, Department Detail, Team Detail) should fade in from a
   slightly-left position (`translateX(-8px)` → `0`, 200ms) on screen
   entry, arriving just slightly before the content below it — a ~40ms
   stagger is enough to feel intentional without being noticeable as a
   "sequence."

4. **Global filter strip's period-pill switch.** The active pill's white
   background + shadow should transition over 150ms when switching
   periods, not snap — same treatment as the segmented toggles elsewhere.

5. **Notification bell badge pulse.** The small red unread-dot on the
   notification bell should have a subtle one-time pulse animation
   (scale 1 → 1.15 → 1, 400ms) when it FIRST appears (i.e., when
   notifications.some(n => !n.read) becomes true) — not a looping/
   distracting pulse, just a one-shot draw-the-eye moment.

6. **Notification dropdown stagger.** When the notification dropdown
   opens, its 4 items fade/slide in with a ~30ms stagger between them
   rather than all appearing simultaneously — small, cheap, noticeable.

7. **Command Palette (Step 12) open animation.** Confirm it scales in
   from `scale(0.96)` + fades, 150ms — slightly faster than a standard
   modal (200ms), since a command palette should feel instantaneous, not
   ceremonial.

=============================================================
C. TABLES, CHARTS, AND DATA POLISH
=============================================================

1. **Table row entrance stagger on first load.** When a table's data
   first populates (screen mount, or immediately after a loading
   skeleton resolves), rows can fade/slide in with a small stagger
   (~20ms per row, capped at the first ~8 rows so a 50-row table doesn't
   take visibly long to finish) — do NOT restagger on every re-render,
   only on the transition from loading → loaded.

2. **Sortable column header chevron.** Confirm the chevron rotates
   smoothly (not just swaps icon) when toggling sort direction — 150ms
   rotate transform, matches the existing "chevron flips" requirement
   from Team (Step 4), extend the same treatment anywhere else a sort
   chevron exists.

3. **Chart tooltip follow.** The dark tooltip that appears on hovering a
   chart data point should track the cursor/point smoothly (no snapping
   between discrete positions) — if your chart library's default
   tooltip snaps, add a short transform transition (~80ms) to smooth it,
   short enough that it doesn't lag behind a fast-moving cursor.

4. **Sparkline hover reveal.** Team's per-executive sparkline (Step 4)
   and Executive Profile's enlarged trend chart (Step 7) should reveal a
   small dot at the exact hovered data point (currently just the
   tooltip) — the dot appears with a quick `scale(0)→scale(1)` pop
   (120ms) exactly where the cursor is, giving precise visual feedback
   about which day is being read.

5. **Progress bar / funnel bar re-animate on filter change.** Mapping's
   manager coverage bars and the Leads Board funnel bars currently
   animate 0→value on mount (Steps 2, 5). Extend this: when a filter
   changes their value (industry chip, manager chip), they should
   animate from their OLD width to the NEW width (not reset to 0 first)
   — a re-fill from zero every time you click a filter would feel
   sluggish on a screen you're actively exploring.

6. **Coverage/connect-rate badge color crossfade.** When a badge's tier
   changes color (e.g. a filtered view causes a percentage to cross the
   25%/50% threshold), crossfade the background/text color over 200ms
   rather than an instant color swap — subtle, but avoids a jarring flash.

=============================================================
D. FORMS, MODALS, AND FEEDBACK POLISH
=============================================================

1. **Input focus, not just border color.** Every text input's focus
   state (already border-color + shadow-ring per the design tokens)
   should transition both properties together over 120ms — confirm this
   is consistent across Sign-In, Settings' Profile form, Department
   Builder, and Create Manager modal inputs.

2. **Validation error entrance.** When an inline error message appears
   (Department Builder's combined error, Create Manager's per-field
   errors, Settings' profile validation), it should slide down + fade in
   (`translateY(-4px)` → `0`, 150ms) rather than instantly appearing —
   and the field's border should transition to red over the same
   duration, not snap.

3. **Modal open/close symmetry.** Confirm every modal (Department
   Builder, Create Manager, Discard Confirm, Sign Out All Confirm, Save
   View prompt) scales in AND scales back out on close (many
   implementations only animate the open) — closing should be `scale(1)
   → scale(0.96)` + fade, ~150ms, faster than the 300ms open, since
   dismissal should feel quicker than arrival.

4. **Backdrop blur transition.** The backdrop's `blur(4px)` and
   `rgba(0,0,0,0.5)` should fade in together with the modal (not appear
   instantly before the modal card does) — 200ms, matching the modal's
   own entrance timing.

5. **Toggle switch (Settings notifications, "Remember me") thumb
   spring.** The sliding circle should use a slightly springy easing
   (`cubic-bezier(0.34, 1.56, 0.64, 1)`) rather than linear/ease when
   toggling on/off — 200ms — small but this is one of the highest-touch
   interactions in the whole app (every Director will toggle something
   in Settings eventually) so it's worth the extra attention.

6. **Auto-generate password reveal (Create Manager modal).** When
   "Auto-generate" fills the password field, briefly highlight the
   field's background (a quick flash from a light tint back to white,
   ~400ms) so it's visually obvious something changed, in addition to
   the value itself changing — reinforces the already-required
   accessibility live-region announcement from Step 9.

=============================================================
E. SCREEN-SPECIFIC TOUCHES (small, targeted, non-structural)
=============================================================

DASHBOARD: hero KPI's sparkline should draw itself left-to-right on
  mount (stroke-dashoffset animation, ~600ms) rather than appearing
  fully drawn instantly, synced with the numeral's count-up.

MAPPING: the industry bar chart's bars should slightly darken on hover
  (not just show the tooltip) so it's clear which bar corresponds to
  the tooltip currently showing.

CALLS: sticky manager subtotal rows should gain a slightly stronger
  shadow (`elevation-2` instead of flat) only WHILE they're in their
  "stuck" state during scroll, reverting to flat once scrolled past —
  reinforces that they've detached from normal flow.

TEAM: the medal icon on rank #1 can have a very subtle continuous
  shimmer/shine sweep (a soft gradient pass every ~3s) — this is the
  ONE place in the whole app a subtle looping animation is appropriate,
  since it's celebratory, not a Loading or Alert state. Keep it faint.

LEADS BOARD: temperature tab switching should crossfade the card list
  (150ms fade-out old cards, 150ms fade-in new cards) rather than an
  instant swap, since the whole list changes at once.

LEAD DETAIL: timeline entries should fade/slide in from the left with a
  stagger (~60ms per entry) on screen mount, following the same vertical
  line downward — reads like the story unfolding.

EXECUTIVE PROFILE: the Connect Rate badge in the header can gently pulse
  once (same treatment as the notification dot) the first time the
  screen mounts for a given executive, drawing the eye to the single
  most important number on the page.

ORGANIZATION: department/team card 2x2 stat grids can stagger their 4
  values counting up (~50ms offset each) rather than all four ticking
  simultaneously — mirrors the KPI row's existing count-up but scoped
  to a smaller, denser grid.

REPORTS & MIS CENTRE: the "Generating…" spinner should crossfade with
  the "Download" label/icon (150ms) rather than an instant swap, and the
  new Download History row should slide down from the top with a brief
  highlight tint (fading to normal over ~800ms) so it's obvious THIS is
  the row that just appeared.

SETTINGS: switching between Profile/Notifications/Sessions tabs should
  crossfade the content panel (150ms) rather than an instant swap —
  matches the Leads Board's temperature-tab crossfade for consistency.

COMMAND PALETTE: the highlighted result row (via arrow keys) should
  transition its background over 100ms as you move between rows with
  the keyboard, not snap — this is a high-frequency interaction for
  power users, worth the polish.

=============================================================
CRITICAL REMINDERS
=============================================================

✅ Only `transform`, `opacity`, `filter` — no layout-triggering properties,
   this rule matters MORE in this step than any previous one
✅ Respect `prefers-reduced-motion: reduce` globally — shimmer/pulse/
   shine/stagger effects should be the FIRST things disabled under it;
   essential feedback (button press, focus ring) can shorten rather than
   fully disable, since some visual confirmation should remain
✅ Nothing in this step should make an interaction take longer to
   complete — motion is confirmation, never a gate
✅ Reuse existing easing curves from the Design System's motion tokens
   (`cubic-bezier(0,0,0.2,1)` for standard, the new spring curve above
   ONLY for toggles/chips/thumbs, never for layout-level transitions)
✅ Test every addition with keyboard navigation and a screen reader
   after adding it — a hover-triggered tooltip delay or a stagger
   animation must never introduce a NEW accessibility regression
✅ If in doubt whether a touch belongs in this step, ask: "does this
   change what the screen looks like at rest, or only how it responds to
   interaction?" If the former, it doesn't belong here.

=============================================================
BUILD ORDER
=============================================================

1. Work through Section A (global refinements) first — these have the
   widest blast radius and should be correct before layering
   screen-specific touches on top
2. Work through Section B (navigation/shell)
3. Work through Section C (tables/charts/data)
4. Work through Section D (forms/modals/feedback)
5. Work through Section E (screen-specific touches), one screen at a time
6. Do a full `prefers-reduced-motion: reduce` pass — toggle it on at the
   OS level and click through every screen, confirming shimmer/pulse/
   shine/bounce effects are gone or negligible, while essential feedback
   (focus rings, button press) still provides SOME confirmation
7. Do a final keyboard-only pass through the whole app one more time to
   confirm none of this step's additions introduced a focus trap, a
   missing focus-visible state, or a tooltip that blocks keyboard access

=============================================================
CLOSING GUARDRAILS
=============================================================

DO NOT change any screen's layout, color, typography, spacing, or
  information architecture — this step is motion and feedback only.
DO NOT add any looping/ambient animation anywhere except the two
  explicitly permitted spots (Team's rank-#1 shimmer, and even that
  should be faint and slow).
DO NOT let any animation added here slow down task completion — if a
  Director has to wait for an animation to finish before they can act,
  it's wrong; shorten it or remove it.
DO NOT skip the prefers-reduced-motion and keyboard-only re-passes at
  the end — they're listed last in Build Order but they are not optional.