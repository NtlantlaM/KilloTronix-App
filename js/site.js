(() => {
  const S = window.SITE || {};
  const R = S.release || {};
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => [...el.querySelectorAll(q)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = n => Number(n).toLocaleString("en-ZA");
  const sast = (d, o) => new Date(d).toLocaleDateString("en-ZA", Object.assign({ timeZone: "Africa/Johannesburg" }, o));

  /* ---------- header: solid once you scroll (always solid on pages without a video hero) ---------- */
  const head = $(".site-head");
  const hasHero = !!$(".hero");
  const onScroll = () => head && head.classList.toggle("solid", !hasHero || scrollY > 40);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const mb = $(".menu-btn");
  if (mb) {
    mb.addEventListener("click", () => {
      const open = document.documentElement.classList.toggle("menu-open");
      mb.setAttribute("aria-expanded", open);
    });
    $$(".nav a").forEach(a => a.addEventListener("click", () => document.documentElement.classList.remove("menu-open")));
  }

  /* ---------- release state: pre-save / listen buttons ---------- */
  const now = () => Date.now();
  const relT = Date.parse(R.releaseAt), preT = Date.parse(R.presaveOpens);
  function ctaState() {
    const t = now();
    if (t >= relT) return R.listenUrl ? { label: "Listen now", url: R.listenUrl } : { label: "Out now. Links landing shortly", url: "" };
    if (t >= preT) return R.presaveUrl ? { label: "Pre-save The Detour", url: R.presaveUrl } : { label: "Pre-save link going up shortly", url: "" };
    return { label: "Pre-save opens " + sast(preT, { day: "numeric", month: "short" }), url: "" };
  }
  function paintCtas() {
    const s = ctaState();
    $$("[data-cta]").forEach(a => {
      a.querySelector(".lbl").textContent = s.label;
      if (s.url) { a.href = s.url; a.target = "_blank"; a.rel = "noopener"; a.classList.remove("btn-wait"); a.classList.add("btn-primary"); a.removeAttribute("aria-disabled"); }
      else { a.removeAttribute("href"); a.classList.add("btn-wait"); a.classList.remove("btn-primary"); a.setAttribute("aria-disabled", "true"); }
    });
    $$("[data-release-status]").forEach(el => {
      el.textContent = now() >= relT ? "Out now" : now() >= preT ? "Pre-save open" : "Out " + sast(relT, { day: "numeric", month: "short" });
    });
  }
  paintCtas();

  /* ---------- countdown ---------- */
  const cds = $$("[data-countdown]");
  function tickCountdown() {
    const d = relT - now();
    cds.forEach(cd => {
      if (d <= 0) { cd.innerHTML = '<div><b>Out</b><span>now</span></div>'; return; }
      const v = [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60];
      const l = ["days", "hrs", "min", "sec"];
      if (!cd.children.length || cd.children.length !== 4) cd.innerHTML = l.map(x => `<div><b>00</b><span>${x}</span></div>`).join("");
      [...cd.querySelectorAll("b")].forEach((b, i) => {
        const s = String(v[i]).padStart(2, "0");
        if (b.textContent !== s) { b.textContent = s; if (!reduce) { b.classList.remove("tick"); void b.offsetWidth; b.classList.add("tick"); } }
      });
    });
  }
  if (cds.length) { tickCountdown(); setInterval(() => { tickCountdown(); paintCtas(); }, 1000); }

  /* ---------- stats from config ---------- */
  $$("[data-stat]").forEach(el => {
    const k = el.dataset.stat, v = (S.stats || {})[k];
    const host = el.closest("[data-stat-host]") || el;
    if (S.showStats === false || v == null) { el.closest("[data-stat-wrap]") ? el.closest("[data-stat-wrap]").hidden = true : (el.hidden = true); return; }
    el.dataset.count = v; el.textContent = reduce ? fmt(v) : "0";
  });
  const tot = $("[data-stat-total]");
  if (tot) {
    const v = Object.values(S.stats || {}).reduce((a, b) => a + (b || 0), 0);
    if (S.showStats === false) tot.closest("[data-stat-wrap]").hidden = true; else { tot.dataset.count = v; tot.textContent = reduce ? fmt(v) : "0"; }
  }
  $$("[data-stats-asof]").forEach(el => el.textContent = S.statsAsOf || "");
  if (S.showStats === false) $$("[data-stats-section]").forEach(el => el.hidden = true);

  /* ---------- config-driven links ---------- */
  $$("[data-link]").forEach(a => { const u = (S.links || {})[a.dataset.link]; if (u) a.href = u; });
  $$("[data-platform]").forEach(a => {
    const u = (R.platforms || {})[a.dataset.platform];
    if (u) { a.href = u; a.hidden = false; } else a.hidden = true;
  });
  const anyPlatform = Object.values(R.platforms || {}).some(Boolean);
  $$("[data-platforms-empty]").forEach(el => el.hidden = anyPlatform);
  $$("[data-yt-trailer]").forEach(a => { if (S.youtubeTrailerUrl) { a.href = S.youtubeTrailerUrl; a.hidden = false; } else a.hidden = true; });
  $$("[data-contact]").forEach(el => {
    if (S.bookingEmail) { el.innerHTML = `<a href="mailto:${S.bookingEmail}">${S.bookingEmail}</a>`; }
    else { el.innerHTML = `<a href="${(S.links || {}).instagram || "#"}" target="_blank" rel="noopener">DM @killotronix on Instagram</a>`; }
  });
  $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  /* ---------- reveal + count-up on scroll ---------- */
  const countUp = el => {
    const target = +el.dataset.count; if (isNaN(target)) return;
    if (reduce) { el.textContent = fmt(target); return; }
    const t0 = performance.now(), dur = 1400;
    const step = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(Math.round(target * e)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      $$("[data-count]", e.target).concat(e.target.dataset.count ? [e.target] : []).forEach(c => { if (!c.dataset.done) { c.dataset.done = 1; countUp(c); } });
      io.unobserve(e.target);
    }), { threshold: .15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal, [data-count-host]").forEach(el => io.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("in"));
    $$("[data-count]").forEach(countUp);
  }

  /* ---------- hero video: respect reduced motion ---------- */
  $$(".hero-media video").forEach(v => { if (reduce) { v.removeAttribute("autoplay"); v.pause(); } });

  /* ---------- cover tilt + light ---------- */
  if (!reduce && matchMedia("(hover:hover)").matches) {
    $$(".cover-tilt").forEach(w => {
      const c = $(".cover", w);
      w.addEventListener("mousemove", e => {
        const r = w.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.transform = `rotateY(${(x - .5) * 10}deg) rotateX(${(.5 - y) * 10}deg)`;
        c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
      });
      w.addEventListener("mouseleave", () => { c.style.transform = ""; });
    });
  }

  /* ---------- track previews ---------- */
  const audio = new Audio(); audio.preload = "none";
  let current = null;
  const tracks = $$(".track[data-src]");
  function stop() { if (current) { current.classList.remove("playing"); current.setAttribute("aria-pressed", "false"); $(".t-bar i", current).style.width = "0"; } current = null; }
  tracks.forEach((t, i) => t.addEventListener("click", () => {
    if (current === t) { audio.pause(); stop(); return; }
    stop(); current = t;
    audio.src = t.dataset.src; audio.currentTime = 0;
    audio.play().then(() => { t.classList.add("playing"); t.setAttribute("aria-pressed", "true"); }).catch(stop);
    $$("video").forEach(v => { if (!v.muted) v.pause(); });
  }));
  audio.addEventListener("timeupdate", () => { if (current && audio.duration) $(".t-bar i", current).style.width = (audio.currentTime / audio.duration * 100) + "%"; });
  audio.addEventListener("ended", () => {
    const i = tracks.indexOf(current); stop();
    if (i > -1 && i < tracks.length - 1) tracks[i + 1].click();   // roll into the next preview, like the EP would
  });

  /* ---------- click-to-play videos ---------- */
  $$(".video-frame").forEach(f => {
    const v = $("video", f), b = $(".play-overlay", f);
    if (!b) return;
    b.addEventListener("click", () => { f.classList.add("started"); v.controls = true; v.play(); audio.pause(); stop(); });
  });

  /* ---------- copy buttons ---------- */
  $$("[data-copy]").forEach(btn => btn.addEventListener("click", () => {
    const src = document.getElementById(btn.dataset.copy); if (!src) return;
    const done = () => { const o = btn.textContent; btn.textContent = "Copied"; setTimeout(() => btn.textContent = o, 1600); };
    navigator.clipboard ? navigator.clipboard.writeText(src.innerText.trim()).then(done, () => {}) : null;
  }));
})();
