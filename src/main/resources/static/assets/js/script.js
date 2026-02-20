document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize EmailJS
    emailjs.init("IScOIhbddC2ZWM2SP");

    /* HAMBURGER LOGIC */
    const menuBtn = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('fa-times');
            navbar.classList.toggle('nav-toggle');
        });
        window.addEventListener('scroll', () => {
            menuBtn.classList.remove('fa-times');
            navbar.classList.remove('nav-toggle');
        });
    }

    /* FORM LOGIC */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const messageBox = document.querySelector('.res'); // The container for on-page messages

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // UI State: Sending
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            if (messageBox) messageBox.innerHTML = '';

            // Step A: Save to Aiven Database
            fetch('/contact/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Step B: Send the email via EmailJS
                    return emailjs.send("service_vi34ifr", "template_qr471yr", {
                        from_name: formData.name,
                        reply_to: formData.email,
                        subject: formData.subject,
                        message: formData.message
                    });
                } else {
                    throw new Error("Database Save Failed");
                }
            })
            .then(() => {
                // SUCCESS: Update page text instead of alert
                if (messageBox) {
                    messageBox.innerHTML = `<p style="color: #00eeff; padding: 10px; font-size: 1.6rem;">
                        <i class="fas fa-check-circle"></i> Success! Message sent successfully.
                    </p>`;
                }
                contactForm.reset();
            })
            .catch(error => {
                // ERROR: Update page text instead of alert
                console.error("Error:", error);
                if (messageBox) {
                    messageBox.innerHTML = `<p style="color: #ff4d4d; padding: 10px; font-size: 1.6rem;">
                        <i class="fas fa-exclamation-triangle"></i> Failed to send. Please try again.
                    </p>`;
                }
            })
            .finally(() => {
                submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;

                // Clear the message after 6 seconds
                setTimeout(() => {
                    if (messageBox) messageBox.innerHTML = '';
                }, 6000);
            });
        });
    }
});