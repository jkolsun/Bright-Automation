/* app-popup.js — "The Bright Center is on the App Store" card.
   Lives bottom-left where the live-activity toast used to be.
   Always appears on load (no dismissal memory — it replaced an
   always-on element); the × hides it for this page view only. */
(function () {
  var pop = document.getElementById('appPopup');
  if (!pop) return;

  setTimeout(function () {
    pop.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { pop.classList.add('show'); });
    });
  }, 300);

  var close = document.getElementById('appPopupClose');
  if (close) close.addEventListener('click', function () {
    pop.classList.remove('show');
    setTimeout(function () { pop.hidden = true; }, 500);
  });
})();
