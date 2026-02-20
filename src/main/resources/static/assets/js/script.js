document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize EmailJS
    emailjs.init("IScOIhbddC2ZWM2SP");

    const contactForm = document.getElementById('contactForm');
    const successMessageDiv = document.getElementById('success-message');
    const successTextSpan = document.getElementById('success-text');
    const errorMessageDiv = document.getElementById('error-message');
    const errorTextSpan = document.getElementById('error-text');
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // STOP page reload

            // Basic client-side validation
            if (!contactForm.checkValidity()) {
                 contactForm.reportValidity();
                 return;
            }

            // Reset UI messages
            if (successMessageDiv) successMessageDiv.style.display = 'none';
            if (errorMessageDiv) errorMessageDiv.style.display = 'none';
            
            // Show loading state
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Step A: Save to Aiven Database via Java backend
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
                    }).then(() => data); // Pass the backend 'data' forward
                } else {
                    throw new Error(data.message || 'Validation failed');
                }
            })
            .then((data) => {
                // SUCCESS: Show the message on the webpage as it was before
                if (successMessageDiv && successTextSpan) {
                    successTextSpan.textContent = "Done! Message sent and saved successfully.";
                    successMessageDiv.style.display = 'flex';
                }
                contactForm.reset(); 
                
                // Hide success message after 4 seconds
                setTimeout(() => {
                    if (successMessageDiv) successMessageDiv.style.display = 'none';
                }, 4000);
            })
            .catch(error => {
                // ERROR: Show error on the webpage as it was before
                console.error('Error:', error);
                if (errorMessageDiv && errorTextSpan) {
                    errorTextSpan.textContent = error.message || "An unexpected error occurred. Please try again.";
                    errorMessageDiv.style.display = 'flex';
                }
            })
            .finally(() => {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});

/* =========================================
   MOBILE MENU & NAVIGATION LOGIC
   ========================================= */
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

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar ul li a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
        if (currentPath === '/' && link.getAttribute('href') === '/home') {
            link.classList.add('active');
        }
    });
});