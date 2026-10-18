/* ---------- Everything artist-specific lives here. Swap this object to reuse the page for another artist. ---------- */
const ARTIST = window.ARTIST;
const ICONS = {
  spotify:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.62.62 0 0 1-.86.2c-2.35-1.43-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.21c3.81-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86Zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.65-6.8-2.13-9.98-1.17a.78.78 0 1 1-.45-1.5c3.64-1.1 8.16-.57 11.24 1.33.37.22.48.71.26 1.08Zm.1-2.83C14.7 8.94 9.37 8.76 6.3 9.7a.94.94 0 1 1-.54-1.8c3.53-1.07 9.42-.86 13.13 1.34a.94.94 0 0 1-.97 1.61Z"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24"><path d="M16.6 3c.3 2.1 1.6 3.6 3.6 3.8v3a7 7 0 0 1-3.6-1.1v6.1A5.8 5.8 0 1 1 10.8 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3h3Z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24"><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.1-3.3.1-5.1 1.9-5.2 5.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c.1 3.3 1.9 5.1 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.3-.1 5.1-1.9 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.1-3.3-1.9-5.1-5.2-5.2C14.7 3 14.4 3 12 3Zm0 1.6c2.4 0 2.6 0 3.6.1 2.4.1 3.6 1.3 3.7 3.7.1.9.1 1.2.1 3.6s0 2.6-.1 3.6c-.1 2.4-1.3 3.6-3.7 3.7-1 .1-1.2.1-3.6.1s-2.6 0-3.6-.1c-2.4-.1-3.6-1.3-3.7-3.7-.1-1-.1-1.2-.1-3.6s0-2.6.1-3.6c.1-2.4 1.3-3.6 3.7-3.7 1-.1 1.2-.1 3.6-.1Z"/></svg>',
  youtube:'<svg viewBox="0 0 24 24"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z"/></svg>',
  facebook:'<svg viewBox="0 0 24 24"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/></svg>'
};

const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString("en-ZA");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function render(){
  const a = ARTIST, r = a.release;
  $("artist").textContent = a.name;
  $("tagline").textContent = a.tagline;
  $("coverImg").src = a.cover;
  $("relTitle").textContent = r.title;

  $("tracks").innerHTML = r.tracks.map((x,i)=>
    `<li><span class="tn">${String(i+1).padStart(2,"0")}</span><span class="tt">${esc(x.t)}${x.with?`<small>${esc(x.with)}</small>`:""}</span><span class="bpm">${r.bpm} BPM</span></li>`).join("");

  $("socials").innerHTML = a.socials.map(s=>`
    <a class="link" href="${s.url}" target="_blank" rel="noopener">
      <span class="ic">${ICONS[s.id]||""}</span>
      <span class="lt"><b>${esc(s.label)}</b><span>${esc(s.handle)}</span></span>
      <span class="stat">${s.stat!=null?`<b>${fmt(s.stat)}</b><span>${esc(s.statLabel)}</span>`:`<span>${esc(s.statLabel)} &rarr;</span>`}</span>
    </a>`).join("");
  const tot = a.socials.reduce((n,s)=>n+(s.stat||0),0);
  $("total").innerHTML = `<span>Across socials</span><b>${fmt(tot)}</b>`;

  $("catalogue").innerHTML = a.catalogue.map(c=>
    `<a href="${c.url}" target="_blank" rel="noopener"><b>${esc(c.t)}</b><span>${esc(c.s)}</span></a>`).join("");
  $("asof").textContent = `Audience numbers as of ${a.statsAsOf}, from ${a.statsSource}.`;
  tick();
}

function tick(){
  const r = ARTIST.release, now = Date.now();
  const rel = Date.parse(r.releaseAt), pre = Date.parse(r.presaveOpens);
  const cta = $("cta"), dateStr = new Date(rel).toLocaleDateString("en-ZA",{weekday:"short",day:"numeric",month:"short",year:"numeric",timeZone:"Africa/Johannesburg"});
  if (now >= rel){
    $("ribbon").textContent = "Out now";
    $("relMeta").textContent = `${r.type} · Out now`;
    $("count").hidden = true;
    setCta(cta, r.listenUrl, "Listen now", "Streaming links coming in a moment");
    return;
  }
  const d = rel - now, days=Math.floor(d/864e5), h=Math.floor(d/36e5)%24, m=Math.floor(d/6e4)%60, s=Math.floor(d/1e3)%60;
  $("count").innerHTML = [[days,"days"],[h,"hrs"],[m,"min"],[s,"sec"]].map(([v,l])=>`<div><b>${String(v).padStart(2,"0")}</b><span>${l}</span></div>`).join("");
  $("relMeta").textContent = `${r.type} · Out ${dateStr}`;
  if (now >= pre){
    $("ribbon").textContent = "Pre-save open";
    setCta(cta, r.presaveUrl, "Pre-save The Detour", "Pre-save link going up shortly");
  } else {
    $("ribbon").textContent = "Coming 27 Nov";
    const p = new Date(pre).toLocaleDateString("en-ZA",{day:"numeric",month:"short",timeZone:"Africa/Johannesburg"});
    setCta(cta, "", "", `Pre-save opens ${p}`);
  }
}
function setCta(el, url, live, waiting){
  if (url){ el.href=url; el.target="_blank"; el.rel="noopener"; el.className="cta"; el.textContent=live; }
  else { el.removeAttribute("href"); el.className="cta off"; el.textContent=waiting; }
}

$("share").addEventListener("click", ()=>{
  const b=$("share"), url=location.href.split("#")[0];
  navigator.clipboard.writeText(url).then(()=>{b.textContent="Link copied"},()=>{b.textContent=url});
});

render();
setInterval(tick, 1000);
