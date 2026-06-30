/* ============================================================
   Client Command Center — page motion (vanilla; pairs with the
   site's GSAP/Lenis/AOS without fighting them).
   ============================================================ */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- scroll reveal ---- */
  var rises = document.querySelectorAll('.ccc .rise');
  if (rises.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      rises.forEach(function (el) { el.classList.add('in'); });
    } else {
      var ro = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
      rises.forEach(function (el) { ro.observe(el); });
    }
  }

  /* ---- count-up stats ---- */
  function animateCount(el) {
    var raw = el.getAttribute('data-count');
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var target = parseFloat(raw);
    if (isNaN(target)) return;
    if (reduce) { el.textContent = prefix + raw + suffix; return; }
    var dur = 1500, start = null;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      var out = (target % 1 !== 0) ? val.toFixed(1) : Math.round(val).toLocaleString();
      el.textContent = prefix + out + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---- pinned feature stage: swap the phone screen per active step ---- */
  var stage = document.querySelector('.ccc-feat');
  if (stage) {
    var steps = Array.prototype.slice.call(stage.querySelectorAll('.ccc-fstep'));
    var screens = stage.querySelectorAll('.ccc-feat-phone .ccc-screen');
    var dots = stage.querySelectorAll('.ccc-screendots i');
    function activate(name, idx) {
      screens.forEach(function (s) { s.classList.toggle('show', s.getAttribute('data-screen') === name); });
      steps.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
    }
    if ('IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            var i = steps.indexOf(e.target);
            activate(e.target.getAttribute('data-screen'), i);
          }
        });
      }, { threshold: 0.01, rootMargin: '-45% 0px -45% 0px' });
      steps.forEach(function (s) { so.observe(s); });
    }
    // first screen on
    if (steps[0]) activate(steps[0].getAttribute('data-screen'), 0);
  }

  /* ---- hero phone: gently rotate a couple of screens ---- */
  var heroPhone = document.querySelector('.ccc-hero-phone');
  if (heroPhone && !reduce) {
    var hs = heroPhone.querySelectorAll('.ccc-screen');
    if (hs.length > 1) {
      var hi = 0;
      setInterval(function () {
        hs[hi].classList.remove('show');
        hi = (hi + 1) % hs.length;
        hs[hi].classList.add('show');
      }, 3600);
    }
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.ccc-q').forEach(function (q) {
    var btn = q.querySelector('button');
    var ans = q.querySelector('.a');
    if (!btn || !ans) return;
    btn.addEventListener('click', function () {
      var open = q.classList.contains('open');
      document.querySelectorAll('.ccc-q.open').forEach(function (o) {
        if (o !== q) { o.classList.remove('open'); o.querySelector('.a').style.maxHeight = null; }
      });
      if (open) { q.classList.remove('open'); ans.style.maxHeight = null; }
      else { q.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    });
  });
})();
