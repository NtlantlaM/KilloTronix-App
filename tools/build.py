"""Builds the static pages from shared parts.
Run from the repo root:  python3 tools/build.py
Edit links/dates/numbers in js/site.config.js instead — no rebuild needed for those."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_NAME = "KilloTronix"
BASE = "https://killotronix.co.za"
DESC = "KilloTronix: producer and audio engineer from Gauteng, South Africa. New deep house EP The Detour out 27 November 2026."

ICON = {
 "spotify":'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.62.62 0 0 1-.86.2c-2.35-1.43-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.21c3.81-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86Zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.650-6.8-2.13-9.98-1.17a.78.78 0 1 1-.45-1.5c3.64-1.1 8.16-.57 11.240 1.33.37.22.48.71.26 1.08Zm.1-2.83C14.7 8.94 9.37 8.760 6.3 9.7a.94.94 0 1 1-.54-1.8c3.53-1.07 9.42-.86 13.13 1.34a.94.94 0 0 1-.97 1.61Z"/></svg>',
 "tiktok":'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 3c.3 2.1 1.6 3.6 3.6 3.8v3a7 7 0 0 1-3.6-1.1v6.1A5.8 5.8 0 1 1 10.8 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3h3Z"/></svg>',
 "instagram":'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.1-3.3.1-5.1 1.9-5.2 5.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c.1 3.3 1.9 5.1 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.3-.1 5.1-1.9 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.1-3.3-1.9-5.1-5.2-5.2C14.7 3 14.4 3 12 3Zm0 1.6c2.4 0 2.6 0 3.6.1 2.4.1 3.6 1.3 3.7 3.7.1.9.1 1.2.1 3.6s0 2.6-.1 3.6c-.1 2.4-1.3 3.6-3.7 3.7-1 .1-1.2.1-3.6.1s-2.6 0-3.6-.1c-2.4-.1-3.6-1.3-3.7-3.7-.1-1-.1-1.2-.1-3.6s0-2.6.1-3.6c.1-2.4 1.3-3.6 3.7-3.7 1-.1 1.2-.1 3.6-.1Z"/></svg>',
 "youtube":'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z"/></svg>',
 "facebook":'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/></svg>',
 "play":'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
 "pause":'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
 "arrow":'<svg class="arr" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M8 7h9v9"/></svg>',
 "down":'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 4h2v10.2l3.6-3.6 1.4 1.4-6 6-6-6 1.4-1.4 3.6 3.6z M5 19h14v2H5z"/></svg>',
}
# fix accidental digits in the spotify path above
ICON["spotify"] = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.62.62 0 0 1-.86.2c-2.35-1.43-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.21c3.81-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86Zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.65-6.8-2.13-9.98-1.17a.78.78 0 1 1-.45-1.5c3.64-1.1 8.16-.57 11.24 1.33.37.22.48.71.26 1.08Zm.1-2.83C14.7 8.94 9.37 8.76 6.3 9.7a.94.94 0 1 1-.54-1.8c3.53-1.07 9.42-.86 13.13 1.34a.94.94 0 0 1-.97 1.61Z"/></svg>'

TRACKS = [
 ("01", "Lovers Sun Set", "", "01-lovers-sun-set"),
 ("02", "Magic", "with Thab De Soul", "02-magic"),
 ("03", "Phephe Phi", "", "03-phephe-phi"),
 ("04", "Making Love To Me", "", "04-making-love-to-me"),
 ("05", "Free Your Mind", "", "05-free-your-mind"),
]
CATALOGUE = [
 ("Single", "Woza La", "with Thab De Soul, Native Tribe & Da Q-Bic", "https://open.spotify.com/album/1gEAhJ2TRSvhFYs6A6sz5i"),
 ("Single", "Umoya Wami", "with Thab De Soul & Pinochet", "https://open.spotify.com/album/3CmCVAeoaSilbS0JOdQa1r"),
 ("Single", "Fortunes", "with Native Tribe & Thab De Soul", "https://open.spotify.com/album/2safWIYPPhIZCIJVEpGtiz"),
 ("Single", "Magagala", "KilloTronix", "https://open.spotify.com/album/0L8cOf515FVFBfLpOGT80i"),
 ("Remix", "Izinyanda", "Arabic Piano & KilloTronix Remix", "https://open.spotify.com/album/4MzD19XmGP1ZbzyGrCJJ8X"),
 ("Remix", "Nguva", "Thab De Soul & KilloTronix Remix", "https://open.spotify.com/track/71ghZ7yu2ORo0lG1PrUPCT"),
]
SOCIALS = [("spotify","Spotify"),("instagram","Instagram"),("tiktok","TikTok"),("youtube","YouTube"),("facebook","Facebook")]
NAV = [("index.html","Home"),("music.html","Music"),("videos.html","Videos"),("about.html","About"),("press.html","Press")]

def head(title, desc=DESC, og="img/og.jpg", path=""):
    full = f"{title} · {SITE_NAME}" if title else f"{SITE_NAME} · The Detour EP"
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{full}</title>
<meta name="description" content="{desc}">
<meta property="og:site_name" content="{SITE_NAME}">
<meta property="og:title" content="{full}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{BASE}/{og}">
<meta property="og:url" content="{BASE}/{path}">
<link rel="canonical" href="{BASE}/{path}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b0d0f">
<link rel="icon" href="img/the-detour-cover.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap">
<link rel="stylesheet" href="css/site.css">
<script>document.documentElement.classList.add("js")</script>
</head>
<body>
'''

def header(active):
    links = "".join(f'<a href="{h}"{" aria-current=\"page\"" if h==active else ""}>{t}</a>' for h,t in NAV)
    return f'''<header class="site-head">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="KilloTronix home"><i></i>KilloTronix</a>
    <button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span></button>
    <nav class="nav" id="nav" aria-label="Main">{links}<a class="btn btn-wait btn-sm" data-cta aria-disabled="true"><span class="lbl">Pre-save</span></a></nav>
  </div>
</header>
'''

def socials_row():
    return '<div class="socials">' + "".join(f'<a data-link="{k}" href="#" target="_blank" rel="noopener" aria-label="{n}">{ICON[k]}</a>' for k,n in SOCIALS) + '</div>'

def footer():
    return f'''<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <p class="foot-big">Take the<br><span style="color:var(--dusk)">detour.</span></p>
        <p class="muted" style="margin:0 0 18px">The Detour EP · <span data-release-status>Out 27 Nov</span></p>
        {socials_row()}
      </div>
      <div><h4>Site</h4><ul>{"".join(f'<li><a href="{h}">{t}</a></li>' for h,t in NAV)}<li><a href="links.html">All links</a></li></ul></div>
      <div><h4>Listen</h4><ul><li><a data-link="spotify" href="#" target="_blank" rel="noopener">Spotify</a></li><li><a data-link="youtube" href="#" target="_blank" rel="noopener">YouTube</a></li><li><a href="music.html#discography">Discography</a></li></ul></div>
      <div><h4>Bookings &amp; press</h4><ul><li data-contact>DM @killotronix on Instagram</li><li><a href="press.html">Press kit</a></li></ul></div>
    </div>
    <div class="foot-base"><span>© <span data-year>2026</span> KilloTronix. All rights reserved.</span><span>Gauteng, South Africa</span></div>
  </div>
</footer>
<script src="js/site.config.js"></script>
<script src="js/site.js"></script>
</body>
</html>
'''

def cta_buttons(extra=""):
    return f'''<div class="hero-ctas">
      <a class="btn btn-wait" data-cta aria-disabled="true"><span class="lbl">Pre-save opens 13 Nov</span></a>
      {extra}
    </div>'''

def player():
    rows = "".join(f'''
      <button class="track" type="button" data-src="audio/{f}.mp3" aria-pressed="false" aria-label="Play 30-second preview of {t}">
        <span class="pbtn"><span class="i-play">{ICON["play"]}</span><span class="i-pause">{ICON["pause"]}</span></span>
        <span class="t-main"><span class="t-title"><span class="n">{n}</span>{t}</span>{f'<span class="t-sub">{w}</span>' if w else ''}<span class="t-bar"><i></i></span></span>
        <span class="t-side"><span class="eq"><i></i><i></i><i></i><i></i></span>115 BPM</span>
      </button>''' for n,t,w,f in TRACKS)
    return f'<div class="player">{rows}</div><p class="player-note">30-second previews. Full tracks on 27 November.</p>'

def ep_block(heading="The EP", lead=True):
    return f'''<div class="ep">
      <div class="cover-tilt reveal"><div class="cover"><img src="img/the-detour-cover.jpg" alt="The Detour EP cover: a winding road lit orange at dusk through a misty pine forest" loading="lazy" width="1080" height="1080"><span class="tag" data-release-status>Out 27 Nov</span></div></div>
      <div class="reveal d1" style="display:flex;flex-direction:column;gap:22px;min-width:0">
        <p class="eyebrow"><b>EP</b> · 5 tracks · Deep house · 115 BPM</p>
        <h2>{heading}</h2>
        {'<p class="lede">Five deep house tracks, all at 115 BPM. A change of road from the sound KilloTronix usually makes, and the first release built around it.</p>' if lead else ''}
        {player()}
      </div>
    </div>'''

def stats_section():
    cards = "".join(f'''<a class="stat" data-link="{k}" href="#" target="_blank" rel="noopener" data-stat-wrap>
        <span class="top">{n}{ICON[k]}</span><b data-stat="{k}">0</b><span class="l">{l}</span></a>''' for k,n,l in [("tiktok","TikTok","followers"),("instagram","Instagram","followers"),("facebook","Facebook","followers"),("youtube","YouTube","subscribers")])
    return f'''<section data-stats-section>
  <div class="wrap">
    <div class="sec-head reveal"><div><p class="eyebrow">Follow the journey</p><h2>On the road with us</h2></div>
      <p class="muted" style="margin:0" data-stat-wrap>Combined <b data-stat-total style="color:var(--chalk);font-family:var(--mono)">0</b> · as of <span data-stats-asof></span></p></div>
    <div class="stats reveal d1" data-count-host>{cards}</div>
  </div>
</section>'''

def catalogue_section(id_=""):
    cards = "".join(f'''<a class="card reveal{" d"+str(i%3) if i%3 else ""}" href="{u}" target="_blank" rel="noopener">{ICON["arrow"]}<span class="k">{k}</span><h3>{t}</h3><span class="w">{w}</span></a>''' for i,(k,t,w,u) in enumerate(CATALOGUE))
    return f'''<section{f' id="{id_}"' if id_ else ''}>
  <div class="wrap">
    <div class="sec-head reveal"><div><p class="eyebrow">Catalogue</p><h2>Where the road began</h2></div>
      <a class="btn btn-ghost" data-link="spotify" href="#" target="_blank" rel="noopener">{ICON["spotify"]}All music on Spotify</a></div>
    <div class="cards">{cards}</div>
  </div>
</section>'''

def video_frame(src, poster, label, ratio_class=""):
    return f'''<div class="video-frame {ratio_class}"><video src="{src}" poster="{poster}" preload="none" playsinline></video>
      <button class="play-overlay" type="button" aria-label="Play {label}"><span>{ICON["play"]}</span></button></div>'''

MARQUEE_ITEMS = ["The Detour","Out 27.11.2026","Deep house","115 BPM","Lovers Sun Set","Magic","Phephe Phi","Making Love To Me","Free Your Mind"]
def marquee():
    one = "".join(f"<span>{x}<em>✦</em></span>" for x in MARQUEE_ITEMS)
    return f'<div class="marquee" aria-hidden="true"><div class="marquee-track">{one}{one}</div></div>'

JSONLD = '''<script type="application/ld+json">
{"@context":"https://schema.org","@type":"MusicGroup","name":"KilloTronix","genre":["Deep house","House"],
 "foundingLocation":{"@type":"Place","name":"Gauteng, South Africa"},
 "sameAs":["https://open.spotify.com/artist/75e0TZuFyubg5tTEPraGZJ","https://www.instagram.com/killotronix/","https://www.tiktok.com/@killotronix","https://www.youtube.com/channel/UCVjBrcWtjk5tYX1POQ_gtgw"],
 "album":{"@type":"MusicAlbum","name":"The Detour","albumReleaseType":"https://schema.org/EPRelease","datePublished":"2026-11-27","numTracks":5,
  "track":[{"@type":"MusicRecording","name":"Lovers Sun Set"},{"@type":"MusicRecording","name":"Magic","byArtist":[{"@type":"MusicGroup","name":"KilloTronix"},{"@type":"MusicGroup","name":"Thab De Soul"}]},{"@type":"MusicRecording","name":"Phephe Phi"},{"@type":"MusicRecording","name":"Making Love To Me"},{"@type":"MusicRecording","name":"Free Your Mind"}]}}
</script>'''

BIO_SHORT = "KilloTronix is a producer and audio engineer from Gauteng, South Africa. His new EP, The Detour, is five deep house tracks at 115 BPM, out 27 November 2026, with Thab De Soul featuring on Magic."
BIO_LONG = [
 "KilloTronix is a producer and audio engineer from Gauteng, South Africa.",
 "His catalogue runs through collaborations with Thab De Soul, Native Tribe, Pinochet and Arabic Piano, on records like Woza La, Umoya Wami, Fortunes and the solo cut Magagala, plus remixes of Izinyanda and Nguva.",
 "The Detour is a deliberate change of road. Five deep house tracks, all at 115 BPM, a step away from the genre he usually produces. Magic reunites him with frequent collaborator Thab De Soul. The EP is out on 27 November 2026, with pre-saves opening on 13 November.",
]

# ---------------------------------------------------------------- pages
def page_index():
    return head("") + header("index.html") + f'''<main>
<section class="hero" style="padding:0">
  <div class="hero-media" aria-hidden="true">
    <video class="wide" src="media/hero-wide.mp4" poster="img/hero-wide.jpg" autoplay muted loop playsinline preload="auto"></video>
    <video class="sq" src="media/hero-square.mp4" poster="img/hero-square.jpg" autoplay muted loop playsinline preload="auto"></video>
  </div>
  <div class="wrap">
    <p class="eyebrow fade-up d1"><b>New EP</b> · KilloTronix · Deep house</p>
    <h1><span class="line"><span>The</span></span><span class="line"><span>Detour</span></span></h1>
    <p class="lede fade-up d2">Five deep house tracks at 115 BPM. Out Friday, 27 November 2026.</p>
    <div class="countdown fade-up d3" data-countdown aria-label="Countdown to release"></div>
    <div class="fade-up d4">{cta_buttons('<a class="btn btn-ghost" href="videos.html">'+ICON["play"]+'Watch the trailer</a>')}</div>
  </div>
  <a class="scroll-cue" href="#ep">Scroll</a>
</section>
{marquee()}
<section id="ep"><div class="wrap">{ep_block()}</div></section>
<div class="road" aria-hidden="true"></div>
<section>
  <div class="wrap">
    <div class="sec-head reveal"><div><p class="eyebrow">Trailer · Lovers Sun Set</p><h2>Press play on the drive</h2></div>
      <a class="btn btn-ghost" href="videos.html">All videos</a></div>
    <div class="reveal d1">{video_frame("media/trailer-lovers-sun-set.mp4","img/trailer-poster.jpg","The Detour trailer")}</div>
  </div>
</section>
{stats_section()}
{catalogue_section()}
</main>
{JSONLD}
''' + footer()

def page_music():
    plats = [("spotify","Spotify"),("appleMusic","Apple Music"),("youtubeMusic","YouTube Music"),("deezer","Deezer"),("tidal","TIDAL"),("amazonMusic","Amazon Music")]
    pl = "".join(f'<a class="chip" data-platform="{k}" href="#" target="_blank" rel="noopener" hidden>{n}</a>' for k,n in plats)
    return head("Music", "The Detour EP by KilloTronix: tracklist, previews and release details. Plus the full KilloTronix catalogue.", path="music.html") + header("music.html") + f'''<main>
<header class="page-hero"><div class="wrap">
  <p class="eyebrow fade-up"><b>Music</b> · The Detour EP</p>
  <h1 class="reveal">The Detour</h1>
  <p class="lede reveal d1">Out 27 November 2026. Play the previews, then pre-save so it lands in your library on release day.</p>
  <div class="reveal d2">{cta_buttons()}</div>
</div></header>
<section style="padding-top:20px"><div class="wrap">{ep_block("Tracklist", lead=False)}</div></section>
<section style="padding-top:0"><div class="wrap">
  <dl class="facts reveal">
    <div><dt>Release date</dt><dd>Fri 27 Nov 2026</dd></div>
    <div><dt>Pre-save</dt><dd>From 13 Nov 2026</dd></div>
    <div><dt>Format</dt><dd>EP · 5 tracks</dd></div>
    <div><dt>Genre</dt><dd>Deep house</dd></div>
    <div><dt>Tempo</dt><dd>115 BPM</dd></div>
    <div><dt>Featuring</dt><dd>Thab De Soul (Magic)</dd></div>
    <div><dt>Distribution</dt><dd>Symphonic</dd></div>
  </dl>
  <div class="reveal" style="margin-top:36px;display:flex;flex-direction:column;gap:14px">
    <p class="eyebrow">Listen on</p>
    <div class="chips">{pl}<span class="muted" data-platforms-empty>Store links appear here on release day. Until then, follow KilloTronix on <a data-link="spotify" href="#" target="_blank" rel="noopener">Spotify</a>.</span></div>
  </div>
</div></section>
<div class="road" aria-hidden="true"></div>
{catalogue_section("discography")}
</main>
{JSONLD}
''' + footer()

def page_videos():
    return head("Videos", "The Detour EP trailer and visuals by KilloTronix.", path="videos.html") + header("videos.html") + f'''<main>
<header class="page-hero"><div class="wrap">
  <p class="eyebrow fade-up"><b>Videos</b> · The Detour</p>
  <h1 class="reveal">Watch</h1>
  <p class="lede reveal d1">The trailer and the EP sampler. Sound on.</p>
</div></header>
<section style="padding-top:10px"><div class="wrap">
  <div class="video-grid">
    <div class="reveal">{video_frame("media/trailer-lovers-sun-set.mp4","img/trailer-poster.jpg","The Detour trailer, Lovers Sun Set")}
      <div class="cap"><span><b>The Detour (Trailer)</b> · Lovers Sun Set</span><span>16:9 · 0:25</span></div></div>
    <div class="reveal d1 vert">{video_frame("media/ep-sampler-9x16.mp4","img/sampler-poster.jpg","The Detour EP sampler")}
      <div class="cap"><span><b>EP sampler</b> · all five tracks</span><span>9:16 · 0:25</span></div></div>
  </div>
  <div class="reveal" style="margin-top:40px;display:flex;gap:12px;flex-wrap:wrap">
    <a class="btn btn-primary" data-yt-trailer href="#" target="_blank" rel="noopener" hidden>{ICON["youtube"]}Watch on YouTube</a>
    <a class="btn btn-ghost" data-link="youtube" href="#" target="_blank" rel="noopener">{ICON["youtube"]}Subscribe on YouTube</a>
    <a class="btn btn-ghost" data-link="tiktok" href="#" target="_blank" rel="noopener">{ICON["tiktok"]}More clips on TikTok</a>
  </div>
</div></section>
</main>
''' + footer()

def page_about():
    paras = "".join(f"<p>{p}</p>" for p in BIO_LONG)
    collab = ["Thab De Soul","Native Tribe","Da Q-Bic","Pinochet","Arabic Piano","Melodic Tee","Lord FonQue","Dj DIHNO","InQfive"]
    return head("About", "About KilloTronix, producer and audio engineer from Gauteng, South Africa.", path="about.html") + header("about.html") + f'''<main>
<header class="page-hero"><div class="wrap">
  <p class="eyebrow fade-up"><b>About</b> · Gauteng, South Africa</p>
  <h1 class="reveal">KilloTronix</h1>
</div></header>
<section style="padding-top:10px"><div class="wrap split">
  <div class="cover-tilt reveal"><div class="cover"><img src="img/artwork-notext-thumb.jpg" alt="The Detour artwork without text: a road at dusk" loading="lazy" width="600" height="600"></div></div>
  <div class="prose reveal d1">{paras}
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:28px"><a class="btn btn-primary" href="music.html">Hear The Detour</a><a class="btn btn-ghost" href="press.html">Press kit</a></div>
  </div>
</div></section>
<section style="padding-top:0"><div class="wrap">
  <dl class="facts reveal">
    <div><dt>Based in</dt><dd>Gauteng, South Africa</dd></div>
    <div><dt>Roles</dt><dd>Producer · Audio engineer</dd></div>
    <div><dt>Latest</dt><dd>The Detour EP (2026)</dd></div>
    <div><dt>Distribution</dt><dd>Symphonic</dd></div>
  </dl>
  <div class="reveal" style="margin-top:44px;display:flex;flex-direction:column;gap:14px">
    <p class="eyebrow">Collaborators</p>
    <div class="chips">{"".join(f'<span class="chip">{c}</span>' for c in collab)}</div>
  </div>
  <div class="reveal" style="margin-top:44px;display:flex;flex-direction:column;gap:10px">
    <p class="eyebrow">Bookings &amp; press</p>
    <p style="font-size:20px;margin:0" data-contact>DM @killotronix on Instagram</p>
  </div>
</div></section>
</main>
''' + footer()

def page_press():
    paras = "".join(f"<p>{p}</p>" for p in BIO_LONG)
    assets = [
      ("press/KilloTronix_TheDetour_Cover.jpg","img/the-detour-cover.jpg","EP cover","JPG · 1400px"),
      ("press/KilloTronix_TheDetour_Artwork_NoText.jpg","img/artwork-notext-thumb.jpg","Artwork, no text","JPG · 1400px"),
      ("press/KilloTronix_TheDetour_Loop_16x9.mp4","img/hero-wide.jpg","Road loop (silent)","MP4 · 16:9 · 24s"),
    ]
    a = "".join(f'<a class="asset reveal" href="{h}" download><img src="{t}" alt="" loading="lazy"><div><span>{n}<br><small>{m}</small></span>{ICON["down"].replace("<svg","<svg width=\"20\" height=\"20\" fill=\"currentColor\"")}</div></a>' for h,t,n,m in assets)
    return head("Press kit", "KilloTronix press kit: bios, release facts and downloadable artwork for The Detour EP.", path="press.html") + header("press.html") + f'''<main>
<header class="page-hero"><div class="wrap">
  <p class="eyebrow fade-up"><b>Press kit</b> · The Detour EP</p>
  <h1 class="reveal">Press</h1>
  <p class="lede reveal d1">Everything a blog, radio show or promoter needs. Copy the bio, download the artwork, get in touch.</p>
</div></header>
<section style="padding-top:10px"><div class="wrap" style="display:flex;flex-direction:column;gap:18px">
  <div class="copybox reveal"><div class="head"><p class="eyebrow">Short bio · 1 line</p><button class="copy-btn" type="button" data-copy="bio-short">Copy</button></div><p id="bio-short">{BIO_SHORT}</p></div>
  <div class="copybox reveal"><div class="head"><p class="eyebrow">Full bio</p><button class="copy-btn" type="button" data-copy="bio-long">Copy</button></div><div id="bio-long" style="display:flex;flex-direction:column;gap:12px">{paras}</div></div>
</div></section>
<section style="padding-top:0"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">Release facts</p><h2>The Detour</h2></div></div>
  <dl class="facts reveal">
    <div><dt>Artist</dt><dd>KilloTronix</dd></div>
    <div><dt>Title</dt><dd>The Detour (EP)</dd></div>
    <div><dt>Release</dt><dd>Fri 27 Nov 2026</dd></div>
    <div><dt>Pre-save</dt><dd>From 13 Nov 2026</dd></div>
    <div><dt>Genre</dt><dd>Deep house · 115 BPM</dd></div>
    <div><dt>Distribution</dt><dd>Symphonic</dd></div>
  </dl>
  <ol class="reveal" style="margin:28px 0 0;padding-left:22px;display:flex;flex-direction:column;gap:6px;font-size:17px">
    {"".join(f"<li>{t}{(' <span class=muted>('+w+')</span>') if w else ''}</li>" for n,t,w,f in TRACKS)}
  </ol>
</div></section>
<section style="padding-top:0"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">Downloads</p><h2>Artwork &amp; visuals</h2></div></div>
  <div class="assets">{a}</div>
  <p class="muted reveal" style="margin-top:18px">Press photos and full-track promo links on request.</p>
  <div class="reveal" style="margin-top:36px;display:flex;flex-direction:column;gap:10px"><p class="eyebrow">Contact</p><p style="font-size:20px;margin:0" data-contact>DM @killotronix on Instagram</p></div>
</div></section>
</main>
''' + footer()

def page_links():
    rows = "".join(f'''<a class="lnk" data-link="{k}" href="#" target="_blank" rel="noopener"><span class="ic">{ICON[k]}</span><span><b>{n}</b><span>{h}</span></span>{f'<span class="num" data-stat-wrap><b data-stat="{k}">0</b><small>{l}</small></span>' if l else '<span class="num"><small>Artist page</small></span>'}</a>'''
        for k,n,h,l in [("spotify","Spotify","KilloTronix",""),("tiktok","TikTok","@killotronix","followers"),("instagram","Instagram","@killotronix","followers"),("youtube","YouTube","KilloTronix","subscribers"),("facebook","Facebook","KilloTronix","followers")])
    return head("Links", "All KilloTronix links in one place: The Detour pre-save, socials and music.", path="links.html") + header("") + f'''<main class="links-page" data-count-host>
  <div class="cover-tilt fade-up"><div class="cover"><img src="img/the-detour-cover.jpg" alt="The Detour EP cover" width="1080" height="1080"><span class="tag" data-release-status>Out 27 Nov</span></div></div>
  <div class="countdown" data-countdown aria-label="Countdown to release" style="justify-content:space-between"></div>
  <a class="lnk feature" data-cta aria-disabled="true"><span class="ic">{ICON["play"]}</span><span><b class="lbl">Pre-save opens 13 Nov</b><span>The Detour EP · 27 Nov</span></span><span></span></a>
  <a class="lnk" href="music.html"><span class="ic">{ICON["play"]}</span><span><b>Play the previews</b><span>All five tracks, 30 seconds each</span></span><span></span></a>
  <a class="lnk" href="videos.html"><span class="ic">{ICON["youtube"]}</span><span><b>Watch the trailer</b><span>Lovers Sun Set</span></span><span></span></a>
  {rows}
  <p class="muted" style="text-align:center;font-size:13px;margin:8px 0 0">Numbers as of <span data-stats-asof></span></p>
</main>
<script src="js/site.config.js"></script>
<script src="js/site.js"></script>
</body></html>
'''

def page_404():
    return head("Wrong turn", "Page not found.") + header("") + f'''<main>
<header class="page-hero" style="min-height:70vh;display:flex;align-items:center"><div class="wrap">
  <p class="eyebrow fade-up"><b>404</b> · Page not found</p>
  <h1 class="reveal">Wrong turn</h1>
  <p class="lede reveal d1">This road doesn't go anywhere. Head back and take the detour instead.</p>
  <div class="reveal d2" style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-primary" href="index.html">Back home</a><a class="btn btn-ghost" href="music.html">Play the EP</a></div>
</div></header>
</main>
''' + footer()

PAGES = {"index.html":page_index,"music.html":page_music,"videos.html":page_videos,"about.html":page_about,"press.html":page_press,"links.html":page_links,"404.html":page_404}
if __name__ == "__main__":
    for name, fn in PAGES.items():
        (ROOT / name).write_text(fn(), encoding="utf-8")
        print("built", name)
