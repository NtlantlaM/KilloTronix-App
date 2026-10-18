# KilloTronix · Official site

Static artist site for KilloTronix and The Detour EP (out 27 Nov 2026). Plain HTML/CSS/JS, no framework, hosts free on GitHub Pages.

## Pages
| Page | What's on it |
|---|---|
| `index.html` | Animated road-loop hero, live countdown, pre-save button, track previews, trailer, audience stats, catalogue |
| `music.html` | The Detour: previews, release facts, store links (appear on release day), discography |
| `videos.html` | Lovers Sun Set trailer and the EP sampler |
| `about.html` | Bio, facts, collaborators, bookings contact |
| `press.html` | Press kit: copyable bios, release facts, artwork and loop downloads |
| `links.html` | Link-in-bio page for Instagram/TikTok |
| `404.html` | "Wrong turn" page |

## Weekly updates: edit `js/site.config.js` only
- `release.presaveUrl`: Symphonic pre-save link (button goes live automatically from 13 Nov)
- `release.listenUrl` + `release.platforms`: links for release day (button flips to "Listen now" on 27 Nov)
- `youtubeTrailerUrl`: YouTube trailer link once it's live
- `bookingEmail`: bookings/press email (blank = "DM on Instagram")
- `stats`, `statsAsOf`, `showStats`: audience numbers

No rebuild needed for config changes. Commit and push.

## Changing page content
Pages are generated from `tools/build.py` (shared header/footer, bio, tracklist, catalogue).
Edit it, then run `python3 tools/build.py` from the repo root.

## Host on GitHub Pages
Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.
Custom domain: `killotronix.co.za` (set by the `CNAME` file). Bio link: `https://killotronix.co.za/links.html`.

## Run locally
`python3 -m http.server` then open http://localhost:8000
