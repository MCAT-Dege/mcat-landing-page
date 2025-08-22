// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    initBackgroundAnimations();
    initFormAnimations();
    initWaitlistForms();
    initSmoothScrolling();
});

function initBackgroundAnimations() {
    // Create floating shapes
    const shapesContainer = document.getElementById('floating-shapes');
    const shapes = [];
    
    // Generate multiple floating shapes
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        
        // Random size and position
        const size = Math.random() * 60 + 20;
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        
        shapesContainer.appendChild(shape);
        shapes.push(shape);
    }

    // Animate floating shapes
    anime({
        targets: shapes,
        translateX: function() {
            return anime.random(-100, 100);
        },
        translateY: function() {
            return anime.random(-100, 100);
        },
        scale: function() {
            return anime.random(0.5, 1.5);
        },
        rotate: function() {
            return anime.random(0, 360);
        },
        opacity: function() {
            return anime.random(0.1, 0.6);
        },
        duration: function() {
            return anime.random(3000, 8000);
        },
        delay: function() {
            return anime.random(0, 2000);
        },
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // DNA Helix rotation animation
    anime({
        targets: '.dna-helix',
        rotateY: 360,
        duration: 10000,
        loop: true,
        easing: 'linear'
    });

    // DNA bases pulsing
    anime({
        targets: '.dna-base',
        scaleX: [1, 1.3, 1],
        opacity: [0.3, 0.8, 0.3],
        duration: 2000,
        delay: function(el, i) {
            return i * 200;
        },
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // Grid overlay subtle animation
    anime({
        targets: '.grid-overlay',
        opacity: [0.3, 0.7, 0.3],
        duration: 5000,
        loop: true,
        easing: 'easeInOutSine'
    });
}

function initFormAnimations() {
    // Animate form container entrance
    anime({
        targets: '.form-container',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutCubic',
        delay: 300
    });

    // Animate hero section elements
    anime({
        targets: '.hero-section > *',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutCubic',
        delay: anime.stagger(100, {start: 400})
    });

    // Animate features
    anime({
        targets: '.feature',
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 500,
        easing: 'easeOutCubic',
        delay: anime.stagger(150, {start: 800})
    });
}

// Enhanced input focus animations
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            anime({
                targets: this,
                translateY: -2,
                scale: 1.02,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        input.addEventListener('blur', function() {
            anime({
                targets: this,
                translateY: 0,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Mouse movement parallax effect
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        anime({
            targets: shape,
            translateX: x,
            translateY: y,
            duration: 1000,
            easing: 'easeOutQuart'
        });
    });
});

function initContentAnimations() {
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const storyCards = document.querySelectorAll('.story-card');
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    [...featureCards, ...storyCards, document.querySelector('.cta-section')].forEach(el => {
        if (el) {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        }
    });
    
    // Add hover animations for interactive elements
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card.querySelector('.feature-icon'),
                scale: [1, 1.1],
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card.querySelector('.feature-icon'),
                scale: [1.1, 1],
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Add click animations for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Button press animation
            anime({
                targets: button,
                scale: [1, 0.95],
                duration: 150,
                easing: 'easeOutCubic',
                complete: () => {
                    anime({
                        targets: button,
                        scale: [0.95, 1],
                        duration: 150,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });
    });
}

function initWaitlistForms() {
    const forms = [
        { id: 'waitlistForm', messageId: 'formMessage' },
        { id: 'footerWaitlistForm', messageId: 'footerFormMessage' }
    ];

    forms.forEach(form => {
        const formElement = document.getElementById(form.id);
        const messageElement = document.getElementById(form.messageId);

        if (formElement) {
            formElement.addEventListener('submit', function (e) {
                e.preventDefault();
                handleWaitlistSubmission(formElement, messageElement);
            });
        }
    });
}

// Handle waitlist form submission
async function handleWaitlistSubmission(formElement, messageElement) {
    const formData = new FormData(formElement);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    
    // Basic validation
    if (!name) {
        showMessage(messageElement, 'Please enter your full name.', 'error');
        return;
    }
    
    if (!email) {
        showMessage(messageElement, 'Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage(messageElement, 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    showMessage(messageElement, 'Submitting...', 'loading');
    
    // Execute reCAPTCHA v3
    const formId = formElement.id;
    const recaptchaResponse = await executeRecaptcha(formId);
    
    if (!recaptchaResponse) {
        showMessage(messageElement, 'reCAPTCHA verification failed. Please try again.', 'error');
        return;
    }
    
    try {
        // Submit to API
        const response = await submitWaitlistData(name, email, recaptchaResponse);
        
        // Handle API response
        const result = handleAPIResponse(response);
        
        if (result.success) {
            // Show success message
            showMessage(messageElement, result.message || 'Thank you! Redirecting to confirmation page...', 'success');
            
            // Reset reCAPTCHA after successful submission
            resetRecaptcha(formId);
            
            // Track successful submission
            trackEvent('waitlist_signup', { name, email });
            
            // Redirect to thank you page with API response data
            setTimeout(() => {
                const params = new URLSearchParams({
                    status: result.success.toString(),
                    message: encodeURIComponent(result.message || 'Successfully subscribed to newsletter'),
                    name: encodeURIComponent(name)
                });
                window.location.href = `/thank-you.html?${params.toString()}`;
            }, 2000);
        } else {
            showMessage(messageElement, result.message || 'Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Waitlist submission error:', error);
        showMessage(messageElement, 'Network error. Please check your connection and try again.', 'error');
    }
}

async function submitWaitlistData(name, email, recaptchaResponse) {
    const apiEndpoint = 'https://admin.mcatedge.com/api/v1/newsletter-subscribe';

    try {
        const bot = 'bot';
        const bot_capture = null;

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                bot: bot,
                bot_capture: bot_capture,
                captcha: recaptchaResponse
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        throw error;
    }
}

async function executeRecaptcha(formId) {
    try {
        const response = await grecaptcha.execute('6LcYr60rAAAAAHqHNM9-Aldd44dXPcjZl8JVphsC', { action: 'submit' });


        if (formId === 'waitlistForm') {
            document.getElementById('g-recaptcha-response').value = response;
        } else if (formId === 'footerWaitlistForm') {
            document.getElementById('footerGRecaptchaResponse').value = response;
        }

        return response;
    } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        return null;
    }
}


function getRecaptchaResponse(formId) {
    if (formId === 'waitlistForm') {
        return document.getElementById('g-recaptcha-response').value;
    } else if (formId === 'footerWaitlistForm') {
        return document.getElementById('footerGRecaptchaResponse').value;
    }
    return '';
}


function resetRecaptcha(formId) {

}




function handleAPIResponse(response) {

    if (response.status !== undefined) {
        return {
            success: response.status === true,
            message: response.message || 'Operation completed'
        };
    }


    if (response.success !== undefined) {
        return response;
    }


    if (response.message) {
        return {
            success: true,
            message: response.message
        };
    }


    return {
        success: true,
        message: 'Successfully subscribed to newsletter'
    };
}


function showMessage(messageElement, message, type) {
    if (!messageElement) return;

    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;


    if (type === 'success') {
        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.className = 'form-message';
        }, 8000);
    }


    if (type === 'loading') {
        setTimeout(() => {
            if (messageElement.textContent === 'Submitting...') {
                messageElement.textContent = '';
                messageElement.className = 'form-message';
            }
        }, 10000);
    }
}


function isValidEmail(email) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function trackEvent(eventName, eventData) {

    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }


    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }


    console.log('Event tracked:', eventName, eventData);
}


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}




document.addEventListener('DOMContentLoaded', function () {

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        option.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });


});


window.MCATEdge = {
    submitWaitlist: submitWaitlistData,
    trackEvent: trackEvent,
    isValidEmail: isValidEmail
};

// Add ripple animation CSS
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addRippleStyles();
    initBackgroundAnimations();
    initFormAnimations();
    initContentAnimations();
    initWaitlistForms();
    initSmoothScrolling();
    
    // Add scroll-triggered parallax for content sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.feature-card, .story-card');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
});
