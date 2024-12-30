document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Gather form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form data
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.style.color = '#e74c3c';
            return;
        }

        try {
            // Send data to backend
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                formMessage.style.color = '#2ecc71';
                contactForm.reset();
            } else {
                formMessage.textContent = 'Failed to send your message. Please try again later.';
                formMessage.style.color = '#e74c3c';
            }
        } catch (error) {
            formMessage.textContent = 'An error occurred. Please try again.';
            formMessage.style.color = '#e74c3c';
        }
    });
});
