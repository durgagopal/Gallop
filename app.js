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

// ===== INITIALIZE DODO SDK ON PAGE LOAD =====
document.addEventListener("DOMContentLoaded", () => {
    // Check if CDN loaded correctly
    if (typeof DodoPaymentsCheckout !== 'undefined') {
        DodoPaymentsCheckout.DodoPayments.Initialize({
            mode: "test", // Switch to 'live' when your academy goes live
            displayType: "overlay"
        });
    } else {
        console.error("Dodo Payments CDN script failed to initialize onto page window.");
    }
    
    // ... rest of your existing DOMContentLoaded code (tabs, carousel, etc.) ...
});

// ===== UPDATED DODO PAYMENT OVERLAY FLOW =====
function openDodoOverlay() {
    if (typeof DodoPaymentsCheckout !== 'undefined') {
        try {
            // Generates the checkout link using your exact Product ID via Dodo's routing structure
            DodoPaymentsCheckout.DodoPayments.Checkout.open({
                checkoutUrl: "https://checkout.dodopayments.com/buy/pdt_0NfnfmMMS89GfWqaXU8Pa"
            });
        } catch (error) {
            console.error("Checkout modal launch failure:", error);
            alert("Unable to open the secure payment view. Please try again.");
        }
    } else {
        alert("Payment gateway configuration loading error. Check internet connection.");
    }
}
