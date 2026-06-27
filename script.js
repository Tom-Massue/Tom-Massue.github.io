// Accordéon Projects
function toggleProject(btn) {
    const card = btn.closest('.project-card');
    const isOpen = card.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Theme toggle
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;
if (localStorage.getItem('theme') === 'light') html.classList.add('light');
toggle.addEventListener('click', () => {
    html.classList.toggle('light');
    localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
});

// Année courante
document.getElementById('year').textContent = new Date().getFullYear();

// Navigation active au scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, { threshold: 0.2, rootMargin: "-30% 0px -50% 0px" });
sections.forEach(s => observer.observe(s));

// Rotateur de mots dans le hero
const words = ["Aquatic Entomology", "Metabarcoding", "Freshwater Biomonitoring", "Tropical Streams", "Bioinformatics"];
let i = 0;
const el = document.getElementById('rotator');
setInterval(() => {
    el.style.opacity = '0';
    setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.style.opacity = '1';
    }, 350);
}, 3200);

// Apparition en fondu au scroll (discrète, désactivée si JS échoue grâce au <noscript> dans index.html)
const revealTargets = document.querySelectorAll('.section, .hero-intro');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));
