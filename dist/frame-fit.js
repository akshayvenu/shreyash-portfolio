/* Scales every [data-frame] prototype embed to exactly fit its container width,
   so a 1440px-wide app is never cropped at any viewport.
   Below MOBILE_MAX the desktop app is unusable at scale, so the frame is
   replaced by a tap-to-open launch card that opens it full screen. */
(function () {
  if (window.__frameFitInstalled) return;
  window.__frameFitInstalled = true;

  var MOBILE_MAX = 760;

  function child(box) {
    for (var i = 0; i < box.children.length; i++) {
      var el = box.children[i];
      if (el.tagName === 'IFRAME' || el.tagName === 'DIV') return el;
    }
    return null;
  }

  /* Full-screen in-page viewer: the prototype stays in this document (a new tab
     would lose the preview host's authorization), pannable at a readable scale. */
  function openViewer(url) {
    var ov = document.createElement('div');
    ov.setAttribute('data-frame-viewer', '1');
    ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#14171A;display:flex;flex-direction:column;';

    var bar = document.createElement('div');
    bar.style.cssText = "flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 12px;background:#14171A;border-bottom:1px solid rgba(245,242,232,0.16);color:#F5F2E8;font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;";

    var label = document.createElement('span');
    label.textContent = 'Live prototype';
    label.style.cssText = 'color:#E8A33D;';

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;align-items:center;gap:8px;';

    var btnCss = "display:flex;align-items:center;min-height:40px;padding:0 14px;border:1px solid rgba(245,242,232,0.28);background:transparent;color:#F5F2E8;border-radius:2px;font:inherit;cursor:pointer;";
    var zoom = document.createElement('button');
    zoom.type = 'button';
    zoom.textContent = 'Fit width';
    zoom.style.cssText = btnCss;

    var close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Close ✕';
    close.style.cssText = btnCss + 'background:#E8A33D;color:#14171A;border-color:#E8A33D;';

    actions.appendChild(zoom);
    actions.appendChild(close);
    bar.appendChild(label);
    bar.appendChild(actions);

    var pane = document.createElement('div');
    pane.style.cssText = 'flex:1 1 auto;overflow:auto;-webkit-overflow-scrolling:touch;background:#0E1114;';

    var holder = document.createElement('div');
    holder.style.cssText = 'transform-origin:top left;';

    var frame = document.createElement('iframe');
    frame.src = url;
    frame.title = 'Live prototype';
    frame.style.cssText = 'width:1440px;height:1000px;border:none;display:block;max-width:none;';
    holder.appendChild(frame);
    pane.appendChild(holder);

    var fitMode = true;
    function apply() {
      var s = fitMode ? pane.clientWidth / 1440 : 0.62;
      holder.style.transform = 'scale(' + s + ')';
      holder.style.width = 1440 * s + 'px';
      holder.style.height = 1000 * s + 'px';
      zoom.textContent = fitMode ? 'Zoom in' : 'Fit width';
    }
    zoom.addEventListener('click', function () { fitMode = !fitMode; apply(); });

    function dismiss() {
      window.removeEventListener('resize', apply);
      document.body.style.overflow = ov.__prevOverflow || '';
      ov.remove();
    }
    close.addEventListener('click', dismiss);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { dismiss(); document.removeEventListener('keydown', esc); }
    });

    ov.appendChild(bar);
    ov.appendChild(pane);
    ov.__prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(ov);
    apply();
    window.addEventListener('resize', apply);
  }

  /* Resume links: render the PDF in an in-page overlay so it works both in a
     sandboxed preview and on a hosted domain. */
  function openPdf(url) {
    var ov = document.createElement('div');
    ov.setAttribute('data-pdf-viewer', '1');
    ov.style.cssText = 'position:fixed;inset:0;z-index:10000;background:#14171A;display:flex;flex-direction:column;';

    var bar = document.createElement('div');
    bar.style.cssText = "flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 12px;border-bottom:1px solid rgba(245,242,232,0.16);color:#F5F2E8;font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;";

    var label = document.createElement('span');
    label.textContent = 'Resume';
    label.style.cssText = 'color:#E8A33D;';

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;align-items:center;gap:8px;';
    var btnCss = "display:flex;align-items:center;min-height:40px;padding:0 14px;border:1px solid rgba(245,242,232,0.28);background:transparent;color:#F5F2E8;border-radius:2px;font:inherit;cursor:pointer;text-decoration:none;";

    var dl = document.createElement('a');
    dl.href = url;
    dl.setAttribute('download', '');
    dl.textContent = 'Download ↓';
    dl.style.cssText = btnCss;

    var close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Close ✕';
    close.style.cssText = btnCss + 'background:#E8A33D;color:#14171A;border-color:#E8A33D;';
    close.addEventListener('click', function () {
      document.body.style.overflow = ov.__prev || '';
      ov.remove();
    });

    actions.appendChild(dl);
    actions.appendChild(close);
    bar.appendChild(label);
    bar.appendChild(actions);

    var frame = document.createElement('iframe');
    frame.src = url;
    frame.title = 'Resume';
    frame.style.cssText = 'flex:1 1 auto;width:100%;border:none;background:#22262B;';

    ov.appendChild(bar);
    ov.appendChild(frame);
    ov.__prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(ov);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close.click(); document.removeEventListener('keydown', esc); }
    });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href$=".pdf"]');
    if (!a) return;
    if (a.hasAttribute('download') || a.closest('[data-pdf-viewer]')) return;
    if (document.querySelector('[data-pdf-viewer]')) return;
    e.preventDefault();
    openPdf(a.getAttribute('href'));
  });

  function buildCard(box, url) {
    var card = document.createElement('button');
    card.type = 'button';
    card.setAttribute('data-frame-card', '1');
    card.addEventListener('click', function () {
      /* Hosted: open the real build in its own tab. If the environment blocks
         it (sandboxed preview), fall back to the in-page viewer. */
      var w = null;
      try { w = window.open(url, '_blank', 'noopener'); } catch (e) { w = null; }
      if (!w) openViewer(url);
    });
    card.style.cssText = [
      'appearance:none', 'border:none', 'width:100%', 'text-align:left', 'cursor:pointer',
      'font:inherit',
      'display:flex', 'flex-direction:column', 'gap:14px',
      'padding:22px 20px 24px', 'background:#14171A', 'color:#F5F2E8',
      'border-radius:3px', 'text-decoration:none',
      'box-shadow:0 2px 3px rgba(0,0,0,0.2), 0 16px 36px -18px rgba(0,0,0,0.55)'
    ].join(';');

    var kicker = document.createElement('div');
    kicker.textContent = 'Live prototype';
    kicker.style.cssText = "font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#E8A33D;";

    var title = document.createElement('div');
    title.textContent = 'Built for a 1440px desktop';
    title.style.cssText = "font-family:'Archivo',sans-serif;font-size:21px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;";

    var note = document.createElement('div');
    note.textContent = 'The real, clickable build — too wide to read on a phone. Opens in its own tab, or view on a larger display.';
    note.style.cssText = 'font-size:14px;line-height:1.5;color:rgba(245,242,232,0.72);';

    var cta = document.createElement('span');
    cta.textContent = 'Open prototype →';
    cta.style.cssText = "align-self:flex-start;margin-top:2px;display:flex;align-items:center;min-height:44px;padding:0 18px;background:#E8A33D;color:#14171A;border-radius:2px;font-family:'JetBrains Mono',monospace;font-size:11.5px;font-weight:700;letter-spacing:0.11em;text-transform:uppercase;";

    card.appendChild(kicker);
    card.appendChild(title);
    card.appendChild(note);
    card.appendChild(cta);
    return card;
  }

  function mobilize(box) {
    var el = child(box);
    if (!el) return;
    if (!box.__card) {
      var url = el.tagName === 'IFRAME' ? el.getAttribute('src') : null;
      if (!url) return; // static mock — leave it to normal scaling
      box.__card = buildCard(box, url);
      box.appendChild(box.__card);
    }
    el.style.display = 'none';
    box.__card.style.display = 'flex';
    box.style.height = 'auto';
    box.style.overflow = 'visible';
    box.__mobile = true;
  }

  function fit(box) {
    var el = child(box);
    if (!el) return;

    if (window.innerWidth <= MOBILE_MAX && el.tagName === 'IFRAME') {
      mobilize(box);
      return;
    }
    if (box.__mobile) {
      el.style.display = 'block';
      if (box.__card) box.__card.style.display = 'none';
      box.__mobile = false;
      el.__fitScale = 0;
    }

    if (!el.dataset.fitW) {
      var w = parseFloat(el.style.width) || el.offsetWidth;
      var h = parseFloat(el.style.height) || el.offsetHeight;
      if (!w || !h) return;
      el.dataset.fitW = w;
      el.dataset.fitH = h;
    }
    var avail = box.clientWidth;
    if (!avail) return;
    var s = avail / parseFloat(el.dataset.fitW);
    if (Math.abs((el.__fitScale || 0) - s) < 0.0005) return;
    el.__fitScale = s;
    el.style.transformOrigin = 'top left';
    el.style.transform = 'scale(' + s + ')';
    box.style.height = Math.round(parseFloat(el.dataset.fitH) * s) + 'px';
    box.style.overflow = 'hidden';
  }

  var ro = window.ResizeObserver ? new ResizeObserver(function (entries) {
    entries.forEach(function (e) { fit(e.target); });
  }) : null;

  function scan() {
    document.querySelectorAll('[data-frame]').forEach(function (box) {
      fit(box);
      if (ro && !box.__fitObserved) { box.__fitObserved = true; ro.observe(box); }
    });
  }

  var mo = new MutationObserver(function () {
    clearTimeout(mo.__t);
    mo.__t = setTimeout(scan, 60);
  });

  function start() {
    scan();
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', scan);
    window.addEventListener('orientationchange', function () { setTimeout(scan, 200); });
    [100, 400, 1000, 2500].forEach(function (d) { setTimeout(scan, d); });
  }

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
})();
