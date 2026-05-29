// ===== GLOBAL CHECKOUT ROUTER FUNCTION =====
function launchDodoCheckout(event) {
    if (event) event.preventDefault();
    
    const btn = document.getElementById('dodo-checkout-btn');
    if (!btn) return;

    const productId = btn.getAttribute('data-dodo-product-id') || "pdt_0NfnfmMMS89GfWqaXU8Pa";
    const redirectUrl = btn.getAttribute('data-dodo-redirect-url') || "thank-you.html";
    
    // Resolve clean absolute address matching setup folders
    const absoluteRedirect = window.location.origin + window.location.pathname.replace('index.html', '') + redirectUrl;

    console.log("Attempting overlay initialization via Product ID:", productId);

    if (window.DodoPayments) {
        try {
            window.DodoPayments.open({
                productId: productId,
                redirectUrl: absoluteRedirect
            });
        } catch (error) {
            console.error("Dodo SDK execution failed. Redirecting to external storefront link:", error);
            window.open("https://gopala4.gumroad.com/l/gallop", "_blank");
        }
    } else {
        console.warn("Dodo SDK script asset not detected on runtime. Loading Gumroad backup option.");
        window.open("https://gopala4.gumroad.com/l/gallop", "_blank");
    }
}

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

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

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
