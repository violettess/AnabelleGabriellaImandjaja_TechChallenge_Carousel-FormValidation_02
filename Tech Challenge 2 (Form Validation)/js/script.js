document.addEventListener('DOMContentLoaded', function() {
    // Declare variables for form elements
    const form = document.querySelector('.form'); // Select the form element
    const successPopup = document.getElementById('popup__success'); // Select the success popup modal
    const closePopup = document.getElementById('popup__close'); // Select the close button inside the popup

    // ==== ERROR FUNCTIONS ==== //

    function showError(input, message) {
        input.textContent = message; // Change the text content to message argument
        input.style.display = 'block'; // Show the error message
    }

    function hideError(input) {
        input.textContent = ''; // Change the text content to nothing
        input.style.display = 'none'; // Hide the error message
    }


    // ==== VALIDATION FUNCTIONS ==== //

    const nameInput = document.getElementById('name'); // Select the name input field
    const nameError = document.getElementById('form__error--name'); // Select the name error message
    function validateName() {
        if (nameInput.value.trim() === '') { // Check if name field is empty
            showError(nameError, 'Name cannot be empty.'); // If empty, show error message
            return false; // Validate false
        } else {
            hideError(nameError); // Clear error message when field is filled
            return true; // Validate true
        }
    }

    const emailInput = document.getElementById('email'); // Select the email input field
    const emailError = document.getElementById('form__error--email'); // Select the email error message
    function validateEmail() {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Declare email format 
        if (!emailFormat.test(emailInput.value.trim())) { // Check if email is in the correct format
            showError(emailError, 'Please enter a valid email address.'); // If incorrect format, show error message
            return false; // Validate false
        } else {
            hideError(emailError); // Clear error message when email format is correct
            return true; // Validate true
        }
    }

    const genderError = document.getElementById('form__error--gender'); // Select the gender error message
    function validateGender() {
        const isChecked = document.querySelector('input[name="gender"]:checked'); // Select the checked radio button (male/female)

        if (!isChecked) {
            showError(genderError, 'Please select a gender.'); // If unchecked, show error message
            return false; // Validate false
        } else {
            hideError(genderError); // Clear error message when gender is checked
            return true; // Validate true
        }
    }

    const destinationSelect = document.getElementById('destination'); // Select the destination dropdown
    const destinationError = document.getElementById('form__error--destination'); // Select the destination error message
    function validateDestination() {
        if (destinationSelect.value === '') { // Check if a destination is picked
            showError(destinationError, 'Please select a destination.'); // If no destination is picked, show error message
            return false; // Validate false
        } else {
            hideError(destinationError); // Clear error message when destination is selected
            return true; // Validate true
        }
    }


    // ==== EVENT LISTENERS FUNCTIONS ==== //

    nameInput.addEventListener('input', function () { // Validate the name field whenever the user input
        validateName();
    });

    emailInput.addEventListener('input', function () { // Validate the email field whenever the user input
        validateEmail();
    });

    const genderInputs = document.querySelectorAll('input[name="gender"]'); // Validate the gender radio buttons whenever the user input
    genderInputs.forEach(function (input) {
        input.addEventListener('change', function () {
            validateGender();
        });
    });

    destinationSelect.addEventListener('change', function () { // Validate the destination dropdown whenever the user input
        validateDestination();
    });


    // ==== FORM SUBMISSIONS FUNCTIONS ==== //

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const isValid = validateName() & validateEmail() & validateGender() & validateDestination(); // Check validation

        if (isValid) {
            successPopup.style.display = 'block'; // If valid, show success pop-up
            form.reset(); // Clear all form fields
        }
    });

    closePopup.addEventListener('click', function () {
        successPopup.style.display = 'none'; // Close pop-up when Close button is clicked clicked
    });
});