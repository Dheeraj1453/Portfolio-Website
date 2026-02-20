// 1. Initialize EmailJS
(function() {
    emailjs.init("LEm-A_eAa8rPTgJhMwfmo"); 
})();

document.addEventListener('DOMContentLoaded', () => {
    
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

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            //  Save to Aiven Database via Java
            fetch('/contact/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {

                    // Send the email via EmailJS
                    return emailjs.send("service_vi34ifr", "template_qr471yr", {
                        from_name: formData.name,
                        reply_to: formData.email,
                        subject: formData.subject,
                        message: formData.message
                    });
                } else {
                    throw new Error("DB Save Failed");
                }
            })
            .then(() => {
                alert("Success! Message saved to DB and Email sent.");
                contactForm.reset();
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            })
            .finally(() => {
                submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
            });
        });
    }
});