# Shanmuganathan Raman — Personal Academic Website

Modern static site for Prof. Shanmuganathan Raman (CVIG Lab, IIT Gandhinagar).
No build step, no dependencies — plain HTML + one CSS file. Upload the folder
contents to your web host (e.g., `people.iitgn.ac.in/~shanmuga/`) and it works.

## Files

| File             | Purpose                                              |
|------------------|------------------------------------------------------|
| `index.html`     | Home — profile, news, education, experience          |
| `about.html`     | Narrative bio with JSON-LD Person schema             |
| `teaching.html`  | Term-by-term course record                           |
| `publications.html` | Selected highlights, publications, and granted patents |
| `outreach.html`     | Collaborations, invited talks, internships, and service |
| `research.html`     | Redirect to `publications.html` (kept for old links)   |
| `interests.html` | Personal interests                                   |
| `team.html`      | CVIG Lab — current members and alumni                |
| `style.css`      | Entire design system (light + dark mode)             |

Also place **`shanmuga.jpg`** (square, ~400×400px, compressed — e.g.
[squoosh.app](https://squoosh.app), aim for under 60 KB) in the same folder
for the home-page portrait. If absent, a styled "SR" monogram shows instead.
Existing resources (`Data/*.pdf`, old per-course pages) keep working if those
files remain at their original paths.

## How to update common things

**Add a news item (home page).** In `index.html`, find
`<div class="news-list">` and copy one block:

```html
<div class="news-item"><span class="news-date">Jul 2026</span>
<p>Your news text here.</p></div>
```

Newest goes on top. Keep 5–8 items; delete old ones.

**Add a publication (research page).** Find the right `<ol>` (journals or
conferences) in `research.html` and add at the **top**:

```html
<li><p>Authors, “Title”, Venue, Year.</p></li>
```

Numbering and the year badge update automatically (badges are added by a
small script at the bottom of the page that reads the last year in each entry).

**Update Recent Highlights (research page).** Edit the six `hl-card` blocks
near the top — change the venue line and title to your latest papers.

**Add a current PhD student (team page).** Copy a `member-card` block inside
`<div class="member-grid">`; change the initials in `avatar`, the name,
programme line, and the fellowship/co-supervisor line. To use a real photo,
replace `<div class="avatar">XX</div>` with
`<img class="avatar" src="photos/name.jpg" alt="Name" loading="lazy">`.

**Move a graduated PhD student to alumni.** Delete their `member-card`,
add a numbered `<li>` at the top of the Past Students list with the
**Dr.** prefix, thesis title, and defence date (match the existing format).

**Add a semester (teaching page).** Add above the previous newest:

```html
<h2>Semester II 2026-27</h2>
<p>COURSE-CODE Course Name (audience)</p>
```

## Design notes

- Colors, fonts, spacing all live in `:root` variables at the top of
  `style.css`. Change `--accent` / `--accent-2` / `--accent-hot` to retheme.
- Dark mode follows the visitor's OS setting automatically
  (`prefers-color-scheme`); its palette is at the bottom of `style.css`.
- Fonts load from Google Fonts. To self-host, download Quicksand, Nunito,
  and Red Hat Mono, place them in `fonts/`, and swap the `<link>` in each
  page head for `@font-face` rules in the CSS.
- Each page has its own meta description, Open Graph tags (link previews),
  and favicon. `index.html` and `about.html` carry JSON-LD structured data —
  update the `jobTitle` there if your role changes.

## Suggested next step

If updates become frequent, move publications/students/news into JSON or
YAML files and regenerate pages with a ~100-line Python script (the same
idea as jemdoc, but keeping this design). Happy to set that up.

## Hosting & HTTPS (important)

If the browser shows *"…has configured their web site improperly / has not
connected"*, that is a **TLS certificate problem on the server**, not in these
files. Check that:

- The certificate's name (CN/SAN) **exactly matches the host** you load,
  including the sub‑domain. A wildcard like `*.iitgn.ac.in` does **not** cover a
  third‑level host such as `shanmuga.people.iitgn.ac.in`; that host needs its
  own certificate (or use the path form `people.iitgn.ac.in/~shanmuga/`, which
  is covered by the `people.iitgn.ac.in` certificate).
- The certificate is **not expired** and is issued by a trusted CA (not
  self‑signed).
- The full **intermediate chain** is installed.

The IIT Gandhinagar web/IT team manages this certificate.

### What the files already do for security
- All links use **HTTPS** (no mixed content).
- Every new‑tab link uses `rel="noopener noreferrer"`.
- **No inline JavaScript** — behaviour lives in `app.js`, so a strict
  Content‑Security‑Policy works. A good policy to set on the server:
  `default-src 'self'; img-src 'self' data:; style-src 'self' fonts.googleapis.com; font-src fonts.gstatic.com; script-src 'self'`.
  (The two `application/ld+json` blocks on `index.html`/`about.html` are data,
  not executable code; if you enable a strict policy you can keep them by adding
  their hashes, or drop them — they only aid search engines.)
- Recommended response headers: `Strict-Transport-Security`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
