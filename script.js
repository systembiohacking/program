// Fade-in on scroll — minimal, respects reduced motion
(function () {
  'use strict';

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var elements = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    elements.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger siblings within the same parent subtly
          var parent = entry.target.parentElement;
          var siblings = parent
            ? Array.prototype.filter.call(parent.children, function (c) {
                return c.classList.contains('reveal');
              })
            : [];
          var index = siblings.indexOf(entry.target);
          var delay = Math.min(index, 4) * 80;
          entry.target.style.transitionDelay = delay + 'ms';
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
