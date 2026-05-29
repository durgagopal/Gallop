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

    slides.forEach((slide) => {
        slide.addEventListener('error', function() {
            console.warn(`File pathway target omitted from directory files: ${this.src}`);
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

// ===== DODO PAYMENT OVERLAY IMPLEMENTATION LAYER =====
function openDodoOverlay() {
    if (typeof DodoPaymentsCheckout !== 'undefined') {
        DodoPaymentsCheckout.open({
            productId: "pdt_0NfnfmMMS89GfWqaXU8Pa",
            onSuccess: function(response) {
                // Routes directly to the custom thank you template page 
                window.location.href = "thank-you.html";
            }
        });
    } else {
        alert("Payment gateway configuration loading error. Check internet connection.");
    }
}
