document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('campForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    // List of fields to exclude from required validation
    const excludedFields = ['arrivalFlight', 'arrivalTransfer', 'departureFlight', 'departureTransfer'];

    // Add custom error messages and highlight labels
    inputs.forEach(input => {
        // Skip validation for excluded fields
        if (excludedFields.includes(input.name)) {
            input.removeAttribute('required'); // Ensure these fields are not marked as required
            return;
        }

        input.addEventListener('invalid', function (e) {
            e.preventDefault(); // Prevent browser's default error messages

            const label = input.closest('.form-group').querySelector('label');
            label.classList.add('error-label'); // Highlight the label in red

            const errorMessage = input.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                if (input.validity.valueMissing) {
                    errorMessage.textContent = 'This field is required';
                } else if (input.validity.typeMismatch && input.type === 'email') {
                    errorMessage.textContent = 'Please enter a valid email address';
                }
            }
        });

        // Clear error styles when input changes
        input.addEventListener('input', function () {
            const label = input.closest('.form-group').querySelector('label');
            label.classList.remove('error-label'); // Remove the red highlight

            const errorMessage = input.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.textContent = '';
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Check for invalid inputs
        const invalidInputs = Array.from(inputs).filter(input => !input.checkValidity());

        if (invalidInputs.length > 0) {
            // Scroll to the first invalid input
            invalidInputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Display a general error message
            const errorBox = document.getElementById('errorBox');
            errorBox.textContent = 'Please fill out all required fields!';
            errorBox.style.display = 'block';

            return; // Stop form submission
        }

        // If all fields are valid, hide the error box and submit the form
        const errorBox = document.getElementById('errorBox');
        errorBox.style.display = 'none';

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Here you would typically send the data to your server
        console.log('Form submitted with data:', data);

        // Show success message
        alert('Registration submitted successfully!');

        // Optionally reset the form
        form.reset();
    });
});


// Smooth scroll for navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Button click event
document.getElementById('learnMoreBtn').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
});
