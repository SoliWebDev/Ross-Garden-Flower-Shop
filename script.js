document.addEventListener('DOMContentLoaded', () => {
    
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            const isExpanded = mainNav.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
        });

        
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileNavToggle.setAttribute('aria-expanded', false);
                }
            });
        });
    }

    const heroSlider = document.querySelector('.hero-slider');
    const sliderItems = document.querySelectorAll('.hero-slider .slider-item');
    const prevArrow = document.querySelector('.hero-section .slider-arrow.prev');
    const nextArrow = document.querySelector('.hero-section .slider-arrow.next');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let autoSlideInterval;

    if (heroSlider && sliderItems.length > 0) {
       
        sliderItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDotsContainer.appendChild(dot);
        });
        const sliderDots = document.querySelectorAll('.slider-dots .dot');

        function updateSlider() {
            heroSlider.style.transform = `translateX(${-currentSlide * 100}%)`;
            sliderDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
            resetAutoSlide();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % sliderItems.length;
            updateSlider();
            resetAutoSlide();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
            updateSlider();
            resetAutoSlide();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000); 
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        prevArrow.addEventListener('click', prevSlide);
        nextArrow.addEventListener('click', nextSlide);

        
        updateSlider();
        startAutoSlide();
    }

    
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-slider .testimonial-item');
    const testPrevArrow = document.querySelector('.testimonials-section .testimonial-arrow.prev');
    const testNextArrow = document.querySelector('.testimonials-section .testimonial-arrow.next');
    let currentTestimonial = 0;
    let autoTestimonialInterval;

    if (testimonialSlider && testimonialItems.length > 0) {
        function showTestimonial(index) {
            testimonialItems.forEach((item, i) => {
                if (i === currentTestimonial) {
                    item.classList.add('active');
                    item.classList.remove('leaving'); 
                } else {
                    
                    if (item.classList.contains('active')) {
                         item.classList.add('leaving');
                    }
                    item.classList.remove('active');
                }
            });
            
            setTimeout(() => {
                testimonialItems.forEach(item => item.classList.remove('leaving'));
            }, 600); 
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
            resetAutoTestimonial();
        }

        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonial);
            resetAutoTestimonial();
        }

        function startAutoTestimonial() {
            autoTestimonialInterval = setInterval(nextTestimonial, 7000); // Change every 7 seconds
        }

        function resetAutoTestimonial() {
            clearInterval(autoTestimonialInterval);
            startAutoTestimonial();
        }

        testPrevArrow.addEventListener('click', prevTestimonial);
        testNextArrow.addEventListener('click', nextTestimonial);

        // Initial setup
        testimonialItems[currentTestimonial].classList.add('active');
        startAutoTestimonial();
    }


    // ---------------- Add to Cart Button (Placeholder) ----------------
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            alert(`Product ${productId} added to cart! (This is a frontend placeholder.)`);
            // In a real application, you'd send an AJAX request to your backend
            // e.g., fetch('/api/cart/add', { ... })
        });
    });
});
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


