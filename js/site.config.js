/* =====================================================================
   SITE CONFIG: the only file you need to edit week to week.
   Paste links between the quotes. Leave "" for anything not ready yet;
   the site shows a sensible waiting state instead of a broken link.
   ===================================================================== */
window.SITE = {
  artist: "KilloTronix",

  release: {
    title: "The Detour",
    presaveOpens: "2026-11-13T00:00:00+02:00",   // pre-save button goes live from this moment
    releaseAt:   "2026-11-27T00:00:00+02:00",     // countdown target; button flips to "Listen now"
    presaveUrl:  "",   // Symphonic pre-save / smart link (needed by 13 Nov)
    listenUrl:   "",   // smart link or Spotify album link (needed by 27 Nov)
    platforms: {       // fill after release; empty ones are hidden
      spotify: "", appleMusic: "", youtubeMusic: "", deezer: "", tidal: "", amazonMusic: ""
    }
  },

  // YouTube trailer link once it's live (scheduled 19 Oct 18:00). Shown as a button on the Videos page.
  youtubeTrailerUrl: "",

  // Mailing list. Paste your provider's form action URL to switch sign-ups on.
  //  MailerLite: Forms → Embedded form → HTML code → copy the <form action="..."> URL
  //              emailField: "fields[email]", nameField: "fields[name]", extra: { "ml-submit": "1", "anticsrf": "true" }
  //  Mailchimp:  Audience → Signup forms → Embedded → copy the <form action="..."> URL
  //              emailField: "EMAIL", nameField: "FNAME", extra: {}
  // Until action is filled, the form explains sign-ups open soon and collects nothing.
  newsletter: {
    action: "",
    emailField: "fields[email]",
    nameField: "fields[name]",
    extra: { "ml-submit": "1", "anticsrf": "true" }
  },

  // Bookings & press contact. Leave "" to send people to Instagram DMs instead.
  bookingEmail: "",

  // Audience numbers. Set showStats:false to hide every number on the site,
  // or set a single stat to null to hide just that one.
  showStats: true,
  statsAsOf: "17 Oct 2026",
  stats: { tiktok: 538, instagram: 777, facebook: 234, youtube: 12 },

  links: {
    spotify:   "https://open.spotify.com/artist/75e0TZuFyubg5tTEPraGZJ",
    tiktok:    "https://www.tiktok.com/@killotronix",
    instagram: "https://www.instagram.com/killotronix/",
    youtube:   "https://www.youtube.com/channel/UCVjBrcWtjk5tYX1POQ_gtgw",
    facebook:  "https://www.facebook.com/2000215676735437"
  }
};
