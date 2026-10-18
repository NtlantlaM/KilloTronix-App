# KilloTronix · Official site

Static artist site for KilloTronix. Design rules: sharp rectangles (record-sleeve feel), one accent colour, no glows, self-hosted fonts (fonts/) and Phosphor icons (css/icons.css) and The Detour EP (out 27 Nov 2026). Plain HTML/CSS/JS, no framework, hosts free on GitHub Pages.

## Pages
| Page | What's on it |
|---|---|
| `index.html` | Artist home: name + moving wall of record sleeves, full-bleed The Detour band, selected releases, collaborator type band, Spotify player, about statement, mailing list |
| `music.html` | Full discography (originals, collaborations, remixes) with The Detour featured |
| `the-detour.html` | Release page: road-loop hero, countdown, locked previews, timeline, trailer, mailing list |
| `videos.html` | Lovers Sun Set trailer and the EP sampler |
| `about.html` | Bio, facts, collaborators, bookings contact |
| `press.html` | Press kit: copyable bios, release facts, artwork and loop downloads |
| `links.html` | Link-in-bio page for Instagram/TikTok |
| `privacy.html` | Mailing-list privacy notice (POPIA) |
| `404.html` | "Wrong turn" page |

## Drop schedule
Track titles, each track's preview, the trailer and the EP sampler unlock automatically on their drop dates
(same dates as the social posts). Dates live in `tools/build.py` (`TITLES_AT`, `TRACKS`, `TRAILER_AT`, `SAMPLER_AT`, `DROPS`).
Change a date there, run `python3 tools/build.py`, commit, push.
Test a future date locally: `http://localhost:8000/?now=2026-10-30T19:00` (only works on localhost).
Note: locking is visual. The preview files are in this public repo, so a determined person could find them early.

## Mailing list
Fill `newsletter.action` in `js/site.config.js` with your MailerLite or Mailchimp embedded-form URL (instructions in the file).
Until then the form collects nothing and tells people sign-ups open soon.

## Weekly updates: edit `js/site.config.js` only
- `release.presaveUrl`: Symphonic pre-save link (button goes live automatically from 13 Nov)
- `release.listenUrl` + `release.platforms`: links for release day (button flips to "Listen now" on 27 Nov)
- `youtubeTrailerUrl`: YouTube trailer link once it's live
- `bookingEmail`: bookings/press email (blank = "DM on Instagram")
- `stats`, `statsAsOf`, `showStats`: audience numbers

No rebuild needed for config changes. Commit and push.

## Discography
Releases live in `DISCO` in `tools/build.py` (title, artists, Spotify link, cover hash). Add new ones at the top of their group and rebuild.

## Changing page content
Pages are generated from `tools/build.py` (shared header/footer, bio, tracklist, catalogue).
Edit it, then run `python3 tools/build.py` from the repo root.

## Host on GitHub Pages
Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.
Custom domain: `killotronix.co.za` (set by the `CNAME` file). Bio link: `https://killotronix.co.za/links.html`.

## Run locally
`python3 -m http.server` then open http://localhost:8000
