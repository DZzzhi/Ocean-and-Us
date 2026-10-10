const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const header = $('.site-header');
const menuToggle = $('.menu-toggle');
const menu = $('.nav-menu');
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
menuToggle?.addEventListener('click', () => {
  const open = menu?.classList.toggle('open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(open));
});
$$('.nav-menu a').forEach(link => link.addEventListener('click', () => {
  menu?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  $$('.reveal').forEach(el => observer.observe(el));
} else { $$('.reveal').forEach(el => el.classList.add('visible')); }
const cursor = $('.cursor-glow');
if (cursor && window.matchMedia('(pointer:fine)').matches) {
  cursor.classList.add('active');
  window.addEventListener('pointermove', event => { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; }, { passive: true });
  $$('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}
