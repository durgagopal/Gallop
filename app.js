document.addEventListener("DOMContentLoaded", () => {
    // ===== DYNAMIC IMAGE LOOP CAROUSEL ENGINE (1.jpeg to 16.jpeg) =====
    const slides = document.querySelectorAll('.carousel .slide');
    let currentSlide = 0;
    const slideIntervalTime = 3500;

    function autoAdvanceSlides() {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Filter out missing files to avoid broken frames
    slides.forEach((slide) => {
        slide.addEventListener('error', function() {
            this.remove();
        });
    });

    setInterval(autoAdvanceSlides, slideIntervalTime);

    // ===== TESTIMONIAL ENGINE =====
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    setInterval(() => {
        if (testimonials.length <= 1) return;
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }, 5000);

    // ===== TRAINING TAB INTERACTIVE ENGINE =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // ===== SMOOTH SCROLL ROUTING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchorLink => {
        anchorLink.addEventListener('click', function(e) {
            const targetAnchorId = this.getAttribute('href');
            if (targetAnchorId.startsWith("#")) {
                const targetElementNode = document.querySelector(targetAnchorId);
                if (targetElementNode) {
                    e.preventDefault();
                    const navigationOffsetHeight = document.querySelector('nav').offsetHeight;
                    const computedTargetPosition = targetElementNode.offsetTop - navigationOffsetHeight;
                    window.scrollTo({
                        top: computedTargetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
