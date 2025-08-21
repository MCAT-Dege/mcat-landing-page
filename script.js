document.addEventListener('DOMContentLoaded', function () {
    initApp();
});

function initApp() {
    initWaitlistForms();
    initSmoothScrolling();
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

async function handleWaitlistSubmission(formElement, messageElement) {
    const formData = new FormData(formElement);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();

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

    showMessage(messageElement, 'Submitting...', 'loading');

    const formId = formElement.id;
    const recaptchaResponse = await executeRecaptcha(formId);

    if (!recaptchaResponse) {
        showMessage(messageElement, 'reCAPTCHA verification failed. Please try again.', 'error');
        return;
    }

    try {
        const response = await submitWaitlistData(name, email, recaptchaResponse);

        const result = handleAPIResponse(response);

        if (result.success) {
            showMessage(messageElement, result.message || 'Thank you! Redirecting to confirmation page...', 'success');

            resetRecaptcha(formId);

            trackEvent('waitlist_signup', { name, email });

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
