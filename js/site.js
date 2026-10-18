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
  // Local testing only: http://localhost:8000/?now=2026-10-30T19:00 previews the site at that moment.
  const qNow = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) && new URLSearchParams(location.search).get("now");
  const shift = qNow ? Date.parse(qNow + (qNow.length <= 16 ? ":00+02:00" : "")) - Date.now() : 0;
  const now = () => Date.now() + shift;
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
  /* ---------- drop schedule: masks, locked previews/videos, timeline, next drop ---------- */
  const hm = t => new Date(t).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Johannesburg" });
  const when = t => sast(t, { weekday: "short", day: "numeric", month: "short" }) + " · " + hm(t);
  const left = ms => {
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
    return d ? `${d}d ${h}h ${m}m` : h ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
  };
  function tickDrops() {
    const t = now();
    $$("[data-mask-until]").forEach(el => {
      const open = t >= Date.parse(el.dataset.maskUntil);
      if (open && !el.dataset.shown) { el.textContent = el.dataset.real; el.dataset.shown = 1; el.classList.add("unmasked"); }
      el.classList.toggle("masked", !open);
    });
    // tracks
    const lockedTracks = $$(".track[data-unlock]").filter(b => t < Date.parse(b.dataset.unlock));
    $$(".track[data-unlock]").forEach(b => {
      const u = Date.parse(b.dataset.unlock), locked = t < u, w = $("[data-when]", b);
      b.classList.toggle("locked", locked);
      b.setAttribute("aria-disabled", locked);
      if (w) w.textContent = locked ? (b === lockedTracks[0] ? `Unlocks in ${left(u - t)}` : `Unlocks ${when(u)}`) : "";
      b.classList.toggle("is-next", locked && b === lockedTracks[0]);
    });
    // videos
    $$(".video-frame[data-unlock]").forEach(f => {
      const u = Date.parse(f.dataset.unlock), v = $("video", f);
      const locked = !!f.dataset.unlock && t < u;
      f.classList.toggle("locked", locked);
      if (locked) { $("[data-when-label]", f).textContent = "Premieres " + when(u); $("[data-when]", f).textContent = "in " + left(u - t); }
      else if (v && v.dataset.src && !v.getAttribute("src")) v.src = v.dataset.src;
    });
    // timeline
    $$("[data-timeline]").forEach(ol => {
      const items = $$(".drop", ol); let nextI = -1;
      items.forEach((li, i) => {
        const at = Date.parse(li.dataset.at), done = t >= at;
        if (!done && nextI < 0) nextI = i;
        li.classList.toggle("done", done); li.classList.toggle("next", i === nextI);
        const ds = $("[data-date]", li); if (ds && !ds.textContent) ds.textContent = when(at);
        $("[data-pill]", li).textContent = done ? "Dropped" : i === nextI ? "Next" : "Coming";
        $("[data-drop-cd]", li).textContent = i === nextI ? "in " + left(at - t) : "";
      });
      const p = nextI < 0 ? 1 : nextI === 0 ? 0 : (nextI - .5) / (items.length - 1);
      ol.style.setProperty("--p", p);
    });
    // next-drop chips (hero + links page)
    const firstTl = $("[data-timeline]");
    $$("[data-next-drop]").forEach(a => {
      const txt = $(".nd-txt", a); if (!txt) return;
      const next = firstTl && $(".drop.next", firstTl);
      if (next) { txt.textContent = `Next: ${$("h3", next).textContent} · in ${left(Date.parse(next.dataset.at) - t)}`; }
      else if (!firstTl) {
        const d = (window.SITE_DROPS || []).find(x => Date.parse(x.at) > t);
        const label = d && (t < Date.parse(d.until) ? d.masked : d.title);
        txt.textContent = d ? `${label} · in ${left(Date.parse(d.at) - t)}` : "The Detour is out now";
      } else txt.textContent = "The Detour is out now";
    });
  }
  tickDrops();
  setInterval(() => { tickCountdown(); paintCtas(); tickDrops(); }, 1000);
  if (cds.length) tickCountdown();

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
    if (t.classList.contains("locked")) { t.classList.remove("nudge"); void t.offsetWidth; t.classList.add("nudge"); return; }
    if (current === t) { audio.pause(); stop(); return; }
    stop(); current = t;
    audio.src = t.dataset.src; audio.currentTime = 0;
    audio.play().then(() => { t.classList.add("playing"); t.setAttribute("aria-pressed", "true"); }).catch(stop);
    $$("video").forEach(v => { if (!v.muted) v.pause(); });
  }));
  audio.addEventListener("timeupdate", () => { if (current && audio.duration) $(".t-bar i", current).style.width = (audio.currentTime / audio.duration * 100) + "%"; });
  audio.addEventListener("ended", () => {
    const i = tracks.indexOf(current); stop();
    const nx = tracks.slice(i + 1).find(x => !x.classList.contains("locked"));
    if (nx) nx.click();   // roll into the next preview, like the EP would
  });

  /* ---------- click-to-play videos ---------- */
  $$(".video-frame").forEach(f => {
    const v = $("video", f), b = $(".play-overlay", f);
    if (!b) return;
    b.addEventListener("click", () => {
      if (f.classList.contains("locked")) return;
      if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src;
      f.classList.add("started"); v.controls = true; v.play(); audio.pause(); stop();
    });
  });

  /* ---------- artist hero: flowing waveform lines ---------- */
  $$("canvas.waves").forEach(cv => {
    const ctx = cv.getContext("2d"); let w = 0, h = 0, dpr = Math.min(2, devicePixelRatio || 1), t0 = performance.now(), raf = 0, visible = true;
    const size = () => { const r = cv.getBoundingClientRect(); w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const lines = Array.from({ length: 14 }, (_, i) => ({ amp: 18 + i * 5.5, freq: .0016 + i * .00011, speed: .00022 + i * .000018, off: i * .9, y: .42 + i * .022 }));
    const draw = now => {
      const t = (now - t0);
      ctx.clearRect(0, 0, w, h);
      lines.forEach((l, i) => {
        const a = i / lines.length, warm = i % 3 !== 2;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const env = Math.sin(Math.PI * x / w);                                  // calm at the edges
          const beat = 1 + .35 * Math.pow(Math.max(0, Math.sin(t * .00602)), 8);   // ~115 BPM pulse
          const y = h * l.y + env * beat * (Math.sin(x * l.freq + t * l.speed + l.off) * l.amp + Math.sin(x * l.freq * 2.3 - t * l.speed * 1.7) * l.amp * .35);
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = warm ? `rgba(224,122,53,${.06 + a * .22})` : `rgba(143,169,168,${.05 + a * .12})`;
        ctx.lineWidth = i === lines.length - 4 ? 2 : 1;
        ctx.stroke();
      });
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    size(); addEventListener("resize", () => { size(); if (reduce) draw(performance.now()); });
    if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } }).observe(cv);
    draw(performance.now());
  });

  /* ---------- mailing list ---------- */
  $$("[data-newsletter]").forEach(form => {
    const msg = $(".nl-msg", form), btn = $("button[type=submit]", form);
    const say = (t, ok) => { msg.textContent = t; msg.className = "nl-msg " + (ok ? "ok" : "err"); };
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const email = form.querySelector("[name=email]").value.trim();
      const name = form.querySelector("[name=name]").value.trim();
      if (form.querySelector("[name=company]").value) return;                       // bot
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return say("That email doesn't look right. Check it and try again.");
      if (!form.querySelector("[type=checkbox]").checked) return say("Tick the box so we're allowed to email you.");
      const cfg = S.newsletter || {};
      if (!cfg.action) return say("Sign-ups open in the next few days. Follow @killotronix on Instagram until then.", false);
      const fd = new FormData();
      fd.append(cfg.emailField || "EMAIL", email);
      if (name) fd.append(cfg.nameField || "FNAME", name);
      Object.entries(cfg.extra || {}).forEach(([k, v]) => fd.append(k, v));
      btn.disabled = true; $(".lbl", btn).textContent = "Joining…";
      try {
        await fetch(cfg.action, { method: "POST", mode: "no-cors", body: fd });
        form.classList.add("joined");
        say(`You're on the list${name ? ", " + name : ""}. Check your inbox to confirm, then you'll hear from us when the next track unlocks.`, true);
      } catch (_) {
        say("Couldn't reach the mailing list just now. Try again in a minute.");
      } finally { btn.disabled = false; $(".lbl", btn).textContent = "Join the list"; }
    });
  });

  /* ---------- copy buttons ---------- */
  $$("[data-copy]").forEach(btn => btn.addEventListener("click", () => {
    const src = document.getElementById(btn.dataset.copy); if (!src) return;
    const done = () => { const o = btn.textContent; btn.textContent = "Copied"; setTimeout(() => btn.textContent = o, 1600); };
    navigator.clipboard ? navigator.clipboard.writeText(src.innerText.trim()).then(done, () => {}) : null;
  }));
})();
