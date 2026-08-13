document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.site-loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader?.classList.add('hidden'), 450);
  });

  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuToggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const updateActiveLink = () => {
    const marker = window.scrollY + window.innerHeight * 0.32;
    let current = 'home';
    for (const section of sections) {
      if (section.offsetTop <= marker) current = section.id;
    }
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const form = document.querySelector('#contactForm');
  const status = document.querySelector('#formStatus');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (status) status.textContent = 'Thank you. Your enquiry has been prepared — please contact Msanii Records directly to confirm the booking.';
    form.reset();
  });
});
