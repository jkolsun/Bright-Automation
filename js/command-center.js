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

  /* ---- feature stage: desktop = scroll-swap the pinned phone; mobile =
         self-contained autoplay carousel (the pin can't keep the phone next
         to its dots on a small screen, so the dots looked "dead" — drive it
         on a timer instead, with tappable dots). ---- */
  var stage = document.querySelector('.ccc-feat');
  if (stage) {
    var steps = Array.prototype.slice.call(stage.querySelectorAll('.ccc-fstep'));
    var screens = stage.querySelectorAll('.ccc-feat-phone .ccc-screen');
    var dots = Array.prototype.slice.call(stage.querySelectorAll('.ccc-screendots i'));
    function activate(name, idx) {
      screens.forEach(function (s) { s.classList.toggle('show', s.getAttribute('data-screen') === name); });
      steps.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
    }
    var featMobile = matchMedia('(max-width: 880px)').matches;

    if (featMobile && steps.length) {
      var fi = 0, ftimer = null;
      function fgo(i) { fi = (i + steps.length) % steps.length; activate(steps[fi].getAttribute('data-screen'), fi); }
      function fstop() { if (ftimer) { clearInterval(ftimer); ftimer = null; } }
      function fplay() { if (reduce) return; fstop(); ftimer = setInterval(function () { fgo(fi + 1); }, 3000); }
      // dots become real controls
      dots.forEach(function (d, i) {
        d.style.cursor = 'pointer';
        d.setAttribute('role', 'button');
        d.addEventListener('click', function () { fstop(); fgo(i); fplay(); });
      });
      // pause while a finger is on the phone, resume shortly after
      var fphone = stage.querySelector('.ccc-feat-phone');
      if (fphone) {
        fphone.addEventListener('touchstart', fstop, { passive: true });
        fphone.addEventListener('touchend', function () { setTimeout(fplay, 1400); }, { passive: true });
      }
      // only animate while the section is actually on screen
      if ('IntersectionObserver' in window) {
        var fvis = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) { fplay(); } else { fstop(); } });
        }, { threshold: 0.25 });
        fvis.observe(stage);
      } else { fplay(); }
      fgo(0);
    } else if ('IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            var i = steps.indexOf(e.target);
            activate(e.target.getAttribute('data-screen'), i);
          }
        });
      }, { threshold: 0.01, rootMargin: '-45% 0px -45% 0px' });
      steps.forEach(function (s) { so.observe(s); });
      if (steps[0]) activate(steps[0].getAttribute('data-screen'), 0);
    } else if (steps[0]) {
      activate(steps[0].getAttribute('data-screen'), 0);
    }
  }

  /* ---- "on your home screen" 3-phone showcase: actually MOVE on mobile
         (was swipe-only). Auto-advances through the snapped phones, pausing
         while the user swipes. ---- */
  var showRow = document.querySelector('.ccc-show .row');
  if (showRow && !reduce) {
    var shots = showRow.querySelectorAll('.ccc-shot');
    var showNarrow = matchMedia('(max-width: 820px)').matches;
    if (showNarrow && shots.length > 1) {
      var si = 0, stimer = null, spaused = false;
      function sgo(i) {
        si = (i + shots.length) % shots.length;
        var t = shots[si];
        showRow.scrollTo({ left: t.offsetLeft - (showRow.clientWidth - t.clientWidth) / 2, behavior: 'smooth' });
      }
      function splay() { if (stimer) return; stimer = setInterval(function () { if (!spaused) sgo(si + 1); }, 3200); }
      function sstop() { if (stimer) { clearInterval(stimer); stimer = null; } }
      showRow.addEventListener('touchstart', function () { spaused = true; }, { passive: true });
      showRow.addEventListener('touchend', function () { setTimeout(function () { spaused = false; }, 2600); }, { passive: true });
      if ('IntersectionObserver' in window) {
        var svis = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) { splay(); } else { sstop(); } });
        }, { threshold: 0.3 });
        svis.observe(showRow);
      } else { splay(); }
    }
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
