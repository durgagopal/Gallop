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

    // ===== FIX: RE-ENGINEERED TAB SYSTEM WORKING ON CLICK =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetedTabId = button.getAttribute('data-tab');

            // Deactivate all steps
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate chosen target nodes explicitly
            button.classList.add('active');
            const targetNode = document.getElementById(targetedTabId);
            if (targetNode) {
                targetNode.classList.add('active');
            }
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
