document.addEventListener("DOMContentLoaded", () => {
    // ===== AUTOMATED BG CAROUSEL ENGINE =====
    const slides = document.querySelectorAll('.carousel .slide');
    let currentSlide = 0;
    const slideIntervalTime = 3500;

    function autoAdvanceSlides() {
        if (slides.length === 0) return;
        
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Handle missing files gracefully
    slides.forEach((slide) => {
        slide.addEventListener('error', function() {
            console.warn(`File target omitted from directory: ${this.src}`);
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

    // ===== TRAINING TAB SWITCHING IMPLEMENTATION =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active status from other buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Highlight current targets
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // ===== SMOOTH SCROLL ROUTING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchorLink => {
        anchorLink.addEventListener('click', function(e) {
            const targetAnchorId = this.getAttribute('href');
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
        });
    });
});
