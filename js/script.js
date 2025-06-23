document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la navbar au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Gestion du formulaire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const spinner = submitBtn.querySelector('.loading-spinner');
            
            // Afficher le spinner
            submitText.classList.add('d-none');
            spinner.classList.remove('d-none');
            
            // Envoi du formulaire
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Message envoyé avec succès !');
                    contactForm.reset();
                } else {
                    throw new Error('Erreur réseau');
                }
            })
            .catch(error => {
                alert('Une erreur est survenue. Contactez-nous par WhatsApp.');
            })
            .finally(() => {
                submitText.classList.remove('d-none');
                spinner.classList.add('d-none');
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});