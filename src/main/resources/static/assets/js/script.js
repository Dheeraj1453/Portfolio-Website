document.addEventListener('DOMContentLoaded', function() {
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

            // Reset messages
            successMessageDiv.style.display = 'none';
            errorMessageDiv.style.display = 'none';
            
            // Show loading state
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Gather data into a JS Object
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Send data via AJAX to backend
            fetch('/contact/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add CSRF header here if Spring Security is enabled later
                },
                body: JSON.stringify(formData) // Convert JS Object to JSON string
            })
            .then(response => response.json()) // Parse JSON response from server
            .then(data => {
                if (data.success) {

                    // Success
                    successTextSpan.textContent = data.message;
                    successMessageDiv.style.display = 'flex';
                    contactForm.reset(); // Clear form
                    
                    // Hide success message after 3 seconds
                    setTimeout(() => {
                         successMessageDiv.style.display = 'none';
                    }, 3000);
                } else {
                    // Validation error from server
                    throw new Error(data.message || 'Validation failed');
                }
            })
            .catch(error => {
                // Network or Server Error
                console.error('Error:', error);
                errorTextSpan.textContent = error.message || "An unexpected error occurred. Please try again.";
                errorMessageDiv.style.display = 'flex';
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
   MOBILE MENU 
   ========================================= */
const menuBtn = document.getElementById('menu');
const navbar = document.querySelector('.navbar');

if (menuBtn && navbar) {
    
    //Toggle menu on click
    menuBtn.addEventListener('click', () => {
        // Changes the hamburger icon to an 'X'
        menuBtn.classList.toggle('fa-times');
        // Toggles the visibility of the menu
        navbar.classList.toggle('nav-toggle');
    });

    // Close menu when scrolling 
    window.addEventListener('scroll', () => {
        menuBtn.classList.remove('fa-times');
        navbar.classList.remove('nav-toggle');
    });
}

/* =========================================
   MOBILE MENU 
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar ul li a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Remove active class from everyone first
        link.classList.remove('active');

        // Check if the link's href matches the current URL path
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
        
        // Special case for root "/" to light up "Home"
        if (currentPath === '/' && link.getAttribute('href') === '/home') {
            link.classList.add('active');
        }
    });
});