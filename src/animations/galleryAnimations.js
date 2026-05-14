import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateGalleryPage(root) {
  if (!root) return undefined;

  const q = gsap.utils.selector(root);
  const headerItems = q('.gallery-page-back, .gallery-page-kicker, .gallery-page-title, .gallery-page-divider, .gallery-page-copy');
  const cards = q('.gallery-page-grid .gallery-item');
  const cleanups = [];

  gsap.set(headerItems, {
    autoAlpha: 0,
    y: 28,
  });

  gsap.set(cards, {
    autoAlpha: 0,
    y: 42,
    scale: 0.94,
    rotateX: 8,
    transformPerspective: 900,
    transformOrigin: '50% 80%',
  });

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to(headerItems, {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.09,
    })
    .to(cards, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: {
        amount: 0.75,
        from: 'start',
      },
    }, '-=0.2');

  cards.forEach((card) => {
    const image = card.querySelector('img');
    const overlay = card.querySelector('.gallery-item-overlay');
    const label = card.querySelector('.gallery-item-label');

    const onEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.015,
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(image, {
        scale: 1.1,
        filter: 'grayscale(0%) contrast(1.05)',
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.fromTo(label, {
        y: 10,
        autoAlpha: 0,
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(image, {
        scale: 1,
        filter: 'grayscale(20%) contrast(1)',
        duration: 0.45,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf([card, image, overlay, label]);
    });
  });

  ScrollTrigger.batch(cards, {
    start: 'top 86%',
    once: true,
    onEnter: batch => gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.65,
      stagger: 0.08,
      ease: 'power3.out',
    }),
  });

  return () => {
    cleanups.forEach(cleanup => cleanup());
  };
}
