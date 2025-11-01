// scripts.js - SESNET Africa Global JavaScript
// Includes: Year Update + Contact Form + Future Features

document.addEventListener('DOMContentLoaded', function () {

    // === 1. Auto-update current year ===
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // === 2. Contact Form Submission ===
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