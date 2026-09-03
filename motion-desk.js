// Motion system — Editorial Designer's Desk
// Real Motion engine (motion/dom), driving the existing DC markup.
import * as M from "https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm";
const { animate, inView, scroll, stagger } = M;
// Motion's cross-device hover gesture; fall back to pointer events on older builds
const hover = M.hover || ((el, fn) => {
  let off;
  el.addEventListener("pointerenter", (e) => { if (e.pointerType !== "touch") off = fn(el); });
  el.addEventListener("pointerleave", () => { if (off) { off(); off = null; } });
});

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!REDUCED) {
  /* ---------- TOKENS ---------- */
  const T = {
    micro:   { duration: 0.11, ease: [0.22, 0.61, 0.36, 1] },
    rigid:   { duration: 0.09, ease: "easeOut" },
    paper:   { type: "spring", stiffness: 380, damping: 30, mass: 0.7 },
    settle:  { type: "spring", stiffness: 260, damping: 22, mass: 0.9 },
    impact:  { type: "spring", stiffness: 620, damping: 26, mass: 0.6 },
    ink:     { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
    reveal:  { duration: 0.42, ease: [0.16, 0.84, 0.34, 1] },
  };
  // React re-serializes inline styles ("top: -21px"), so never substring-match the
  // style attribute — read the parsed declaration instead.
  const pick = (root, test) => [...root.querySelectorAll("[data-artifact]")].find(test);
  const isTab   = (el) => el.style.top === "-21px" && el.style.borderRadius.startsWith("3px 3px");
  const isCoil  = (el) => el.style.justifyContent === "space-between" && el.style.display === "flex";
  const isTape  = (el) => /repeating-linear-gradient\(90deg, ?rgba\(214, ?196, ?150/.test(el.style.backgroundImage || el.style.background || "");
  const isBack  = (el) => el.style.zIndex === "-1";
  const rotOf = (el) => {
    const m = (el.getAttribute("style") || "").match(/rotate\((-?[\d.]+)deg\)/);
    return m ? parseFloat(m[1]) : 0;
  };
  // The DC runtime re-renders the template after mount, replacing nodes and
  // discarding any inline styles JS set. So: track what we've wired, and rescan
  // whenever the tree changes.
  const wired = new WeakSet();
  const hoverWired = new WeakSet();
  // never wire an element the responsive rules have hidden — it would never
  // receive an intersection callback and would sit at opacity 0 if revealed later
  const off = (el) => !el.offsetParent && getComputedStyle(el).display === "none";
  const fresh = (el) => (off(el) || wired.has(el) ? false : (wired.add(el), true));

  const start = () => {
    /* ---------- STAMP: impact then settle ---------- */
    document.querySelectorAll('[data-anim="stamp"]').forEach((el) => {
      if (!fresh(el)) return;
      const r = rotOf(el);
      el.style.opacity = "0";
      inView(el, () => {
        animate(el, { opacity: [0, 1], scale: [1.28, 1], rotate: [r - 2.5, r] }, T.impact);
        animate(el, { filter: ["blur(3px)", "blur(0px)"] }, { duration: 0.16 });
      }, { amount: 0.4 });
    });

    /* ---------- INK: highlighter draws left to right ---------- */
    document.querySelectorAll('[data-anim="ink"]').forEach((el) => {
      if (!fresh(el)) return;
      el.style.backgroundSize = "0% 100%";
      inView(el, () => animate(el, { backgroundSize: "100% 100%" }, { ...T.ink, delay: 0.09 }), { amount: 0.6 });
    });

    /* ---------- ARTIFACTS: settle onto the sheet, staggered ---------- */
    // Keyed on the ARTIFACT, not its sheet: the runtime re-creates these children,
    // and a sheet-level key would let a fresh node be zeroed by a rescan whose
    // reveal callback had already fired and unobserved.
    document.querySelectorAll("section, header").forEach((sheet) => {
      const arts = [...sheet.querySelectorAll(':scope > [data-artifact]')]
        .filter((a) => !off(a) && fresh(a));
      if (!arts.length) return;
      arts.forEach((a, i) => {
        const r = rotOf(a);
        const settle = () => animate(a, { opacity: [0, 1], y: [-7, 0], rotate: [r * 1.7, r] },
          { ...T.settle, delay: stagger(0.045)(i, arts.length) });
        const box = a.getBoundingClientRect();
        // already on screen: animate from its current painted state, never pre-hide
        if (box.top < innerHeight && box.bottom > 0) { settle(); return; }
        a.style.opacity = "0";
        const stop = inView(a, () => { settle(); }, { amount: 0.15 });
        // safety net: nothing stays hidden because a trigger was missed
        setTimeout(() => {
          if (a.style.opacity === "0" && getComputedStyle(a).opacity === "0") {
            const b = a.getBoundingClientRect();
            if (b.top < innerHeight && b.bottom > 0) { stop && stop(); settle(); }
            else a.style.opacity = "";
          }
        }, 700);
      });
    });

    /* ---------- PAPER: hover the sheet, its hardware follows ---------- */
    document.querySelectorAll("header, section, a[href$='.dc.html']").forEach((card) => {
      if (!fresh(card)) return;
      const clip = card.querySelector("[data-clip]");
      const tab  = pick(card, isTab);
      if (!clip && !tab) return;
      const cr = clip ? rotOf(clip) : 0, tr = tab ? rotOf(tab) : 0;
      // Motion owns the tab's transform now, so drop the CSS hover that fought it
      if (tab) { tab.style.transition = "box-shadow 150ms"; }
      hover(card, () => {
        if (clip) animate(clip, { y: -1.5, rotate: [cr, cr] }, T.rigid);   // metal: rigid, minimal
        if (tab)  animate(tab, { y: -3, rotate: [tr, tr] }, T.micro);      // tab: follows the paper
        return () => {
          if (clip) animate(clip, { y: 0, rotate: [cr, cr] }, T.rigid);
          if (tab)  animate(tab, { y: 0, rotate: [tr, tr] }, T.micro);
        };
      });
    });

    /* ---------- SPIRAL + TAPE: attached, so they move with their sheet ---------- */
    document.querySelectorAll("header, section").forEach((sheet) => {
      if (hoverWired.has(sheet)) return;
      hoverWired.add(sheet);
      const tape = pick(sheet, isTape);
      const coil = pick(sheet, isCoil);
      if (!tape && !coil) return;
      const tpr = tape ? rotOf(tape) : 0, cor = coil ? rotOf(coil) : 0;
      hover(sheet, () => {
        if (tape) animate(tape, { rotate: [tpr, tpr + 0.5], y: -1 }, T.micro);
        if (coil) animate(coil, { y: -1, rotate: [cor, cor] }, T.rigid);
        return () => {
          if (tape) animate(tape, { rotate: tpr, y: 0 }, T.micro);
          if (coil) animate(coil, { y: 0, rotate: [cor, cor] }, T.rigid);
        };
      });
    });

    /* ---------- SCROLL-LINKED: shallow depth on backing scraps only ---------- */
    [...document.querySelectorAll("[data-artifact]")].filter(isBack).forEach((el) => {
      if (!fresh(el)) return;
      const r = rotOf(el);
      scroll(animate(el, { y: [10, -10], rotate: [r, r] }, { ease: "linear" }), {
        target: el,
        offset: ["start end", "end start"],
      });
    });
  };

  let t;
  const rescan = () => { clearTimeout(t); t = setTimeout(start, 140); };
  rescan();
  new MutationObserver(rescan).observe(document.documentElement, { childList: true, subtree: true });
  addEventListener("resize", rescan);
}
