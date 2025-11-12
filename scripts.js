// scripts.js - SESNET Africa Global JavaScript
// Handles: Year Update, Hamburger Menu, Contact Form

document.addEventListener('DOMContentLoaded', function () {

    //  1. Auto-update current year 
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Hamburger Menu Menu Toggle 
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // 3. Contact Form Submission (contactus.html only) 
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        // Show loading
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending...';
        button.disabled = true;

        // Send via EmailJS
        emailjs.sendForm('service_rcroluq', 'template_kqwsdgg', form)
            .then(() => {
                const alert = document.getElementById('success-alert');
                if (alert) {
                    alert.classList.remove('d-none');
                    setTimeout(() => alert.classList.add('d-none'), 6000);
                }
                form.reset();
                button.innerHTML = originalText;
                button.disabled = false;
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                alert(`Failed to send: ${error.text || 'Please try again.'}\n\nContact: enquiries@sesnet-africa.com`);
                button.innerHTML = originalText;
                button.disabled = false;
            });
    });

});