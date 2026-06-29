// Accordéon Projects
function toggleProject(btn) {
    const card = btn.closest('.project-card');
    const isOpen = card.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// Carrousel de photos "About me" — avance d'une photo au clic, et tout seul automatiquement
function advanceAboutPhoto() {
    const wrap = document.getElementById('aboutPhoto');
    const slides = wrap.querySelectorAll('.about-photo-slide');
    const dots = wrap.querySelectorAll('.about-photo-dots .dot');
    let current = 0;
    slides.forEach((slide, i) => { if (slide.classList.contains('active')) current = i; });
    const next = (current + 1) % slides.length;
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    slides[next].classList.add('active');
    dots[next].classList.add('active');
}

let aboutPhotoTimer = setInterval(advanceAboutPhoto, 2500); // vitesse du défilement auto : 2.5s par photo

function advanceAboutPhotoManual() {
    advanceAboutPhoto();
    clearInterval(aboutPhotoTimer);
    aboutPhotoTimer = setInterval(advanceAboutPhoto, 2500);
}

// Theme toggle (clair par défaut, sauf préférence sauvegardée)
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') html.classList.remove('light');
else if (savedTheme === 'light') html.classList.add('light');
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
const words = ["Metabarcoding", "Bioinformatics", "Community Ecology", "Molecular Ecology", "Climate Change", "Biomonitoring"];
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

// Lightbox pour voir les posters (Communications) en grand — image ou PDF
function openLightbox(src) {
    const img = document.getElementById('lightbox-img');
    const pdf = document.getElementById('lightbox-pdf');
    if (src.toLowerCase().endsWith('.pdf')) {
        pdf.src = src;
        pdf.classList.add('show');
        img.classList.remove('show');
        img.src = '';
    } else {
        img.src = src;
        img.classList.add('show');
        pdf.classList.remove('show');
        pdf.src = '';
    }
    document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Affiche le nom dans la nav seulement après avoir dépassé la photo de couverture
const heroBanner = document.querySelector('.hero-banner');
const brandEl = document.querySelector('.brand');
const brandObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        brandEl.classList.toggle('visible', !entry.isIntersecting);
    });
}, { threshold: 0, rootMargin: '-64px 0px 0px 0px' });
if (heroBanner) brandObserver.observe(heroBanner);
