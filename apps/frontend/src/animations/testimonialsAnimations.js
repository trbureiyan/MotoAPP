import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateTestimonialsSection(root) {
  if (!root) return;

  const q = gsap.utils.selector(root);
  const headingItems = q('.testimonials-kicker, .testimonials-title, .testimonials-divider');
  const cards = q('.carousel-item');
  const metrics = q('.metric-cell');

  gsap.set([...headingItems, ...cards, ...metrics], {
    autoAlpha: 0,
    y: 28,
  });

  const timeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: root,
      start: 'top 72%',
      once: true,
    },
  });

  timeline
    .to(headingItems, {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.1,
    })
    .to(cards, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
    }, '-=0.25')
    .to(metrics, {
      autoAlpha: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.1,
    }, '-=0.2');
}

export function animateMetricValue(element, target, { duration = 1.7 } = {}) {
  if (!element) return;

  const value = { current: 0 };

  gsap.to(value, {
    current: target,
    duration,
    ease: 'power2.out',
    snap: { current: 1 },
    scrollTrigger: {
      trigger: element,
      start: 'top 86%',
      once: true,
    },
    onUpdate: () => {
      element.textContent = String(Math.floor(value.current));
    },
  });
}
