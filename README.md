# KilloTronix · Link page

All-in-one link page for KilloTronix: The Detour EP countdown and tracklist, pre-save / listen button, social profiles with audience numbers, and the Spotify catalogue.

Plain HTML, CSS and JS. No build step.

## Update the page
Everything artist-specific is in `artist.config.js`:
- `release.presaveUrl`: paste the Symphonic pre-save link (button goes live from 13 Nov)
- `release.listenUrl`: paste the Spotify album link (button switches to "Listen now" on 27 Nov)
- `socials[].stat`: follower counts (set to `null` to hide a number)
- `statsAsOf`: date the counts were taken

## Host on GitHub Pages
Settings → Pages → Source: Deploy from a branch → `main` / root → Save.
The site goes live at `https://<user>.github.io/<repo>/`.

## Run locally
`python3 -m http.server` in this folder, then open http://localhost:8000.
