/* Site behaviour, kept external so the pages contain no inline JS
   (compatible with a strict Content-Security-Policy such as
   "script-src 'self'"). */
document.addEventListener('DOMContentLoaded', function () {

  /* Portrait: show an "SR" monogram if the photo is missing/fails,
     without relying on an inline onerror handler. */
  document.querySelectorAll('img.portrait').forEach(function (img) {
    function fallback() {
      var d = document.createElement('div');
      d.className = 'portrait-fallback';
      d.textContent = 'SR';
      if (img.parentNode) { img.replaceWith(d); }
    }
    if (img.complete) {
      if (img.naturalWidth === 0) { fallback(); }
    } else {
      img.addEventListener('error', fallback);
      img.addEventListener('load', function () {
        if (img.naturalWidth === 0) { fallback(); }
      });
    }
  });

  /* Publication year badges — research page only (it has #publications). */
  if (document.getElementById('publications')) {
    document.querySelectorAll('.prose ol > li').forEach(function (li) {
      var m = li.textContent.match(/\b(19|20)\d{2}\b(?![\s\S]*\b(19|20)\d{2}\b)/);
      if (m) {
        var b = document.createElement('span');
        b.className = 'yr';
        b.textContent = m[0];
        li.appendChild(b);
      }
    });
  }
});
