/* app-popup.js — "The Bright Center is on the App Store" popup.
   Appears right after load. Close = quiet for 7 days; tapping the
   badge = quiet for 30 days (they've seen the store page). */
(function () {
  var KEY = 'ba_app_popup_dismissed_until';
  try {
    if (Date.now() < +(localStorage.getItem(KEY) || 0)) return;
  } catch (e) { /* storage blocked — just show */ }

  var pop = document.getElementById('appPopup');
  if (!pop) return;

  function dismiss(days) {
    try { localStorage.setItem(KEY, String(Date.now() + days * 864e5)); } catch (e) {}
    pop.classList.remove('show');
    setTimeout(function () { pop.hidden = true; }, 500);
  }

  setTimeout(function () {
    pop.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { pop.classList.add('show'); });
    });
  }, 400);

  var close = document.getElementById('appPopupClose');
  var badge = document.getElementById('appPopupBadge');
  if (close) close.addEventListener('click', function () { dismiss(7); });
  if (badge) badge.addEventListener('click', function () { dismiss(30); });
})();
