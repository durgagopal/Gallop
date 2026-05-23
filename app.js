document.addEventListener("DOMContentLoaded", () => {
    
    // ===== AUTOMATED BG CAROUSEL ENGINE =====
    const slides = document.querySelectorAll('.carousel .slide');
    let currentSlide = 0;
    const slideIntervalTime = 3500; // 3.5 seconds cadence rotation

    function autoAdvanceSlides() {
        if (slides.length === 0) return;
        
        // Clear out current activation markers
        slides[currentSlide].classList.remove('active');
        
        // Safe mathematical incremental cycle index loop boundary check
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Apply activation class token values
        slides[currentSlide].classList.add('active');
    }

    // Initialize auto shifting cycle instance
    setInterval(autoAdvanceSlides, slideIntervalTime);


    // ===== TESTIMONIAL CYCLIC TRANSITION ENGINE =====
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    const testimonialIntervalTime = 5000; // 5 seconds static focus timeline

    function rotateTestimonials() {
        if (testimonials.length <= 1) return;
        
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }

    setInterval(rotateTestimonials, testimonialIntervalTime);


    // ===== INTERACTIVE TRAINING PROGRAM TAB SYSTEM RUNTIME =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetedTabId = button.getAttribute('data-tab');

            // Strip active tags from all selectors inside the matching structural elements
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Append active states to the clicked tab element context triggers
            button.classList.add('active');
            const targetedDomNode = document.getElementById(targetedTabId);
            if (targetedDomNode) {
                targetedDomNode.classList.add('active');
            }
        });
    });


    // ===== SMOOTH ANCHOR INTERCEPT SYSTEM SCROLL MATRIX =====
    document.querySelectorAll('a[href^="#"]').forEach(anchorLink => {
        anchorLink.addEventListener('click', function(e) {
            const targetAnchorId = this.getAttribute('href');
            const targetElementNode = document.querySelector(targetAnchorId);
            
            if (targetElementNode) {
                e.preventDefault();
                
                // Account dynamically for sticky header collision risks
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
