// ===== NAVIGATION TOGGLE (Mobile) =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== IMAGE CAROUSEL =====
const slides = document.querySelectorAll('.carousel .slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');
let currentSlide = 0;
let carouselInterval;

// Create dots
slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.carousel-dots .dot')[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.carousel-dots .dot')[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });

function resetInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 4000);
}

// Auto-advance every 4 seconds
carouselInterval = setInterval(nextSlide, 4000);

// ===== TESTIMONIAL ROTATION =====
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

setInterval(() => {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}, 5000);

// ===== TRAINING TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        // Activate clicked tab
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
    });
});

// ===== SMOOTH SCROLL for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPos = target.offsetTop - navHeight;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});
