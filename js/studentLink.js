document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const submitButton = document.querySelector('button[type="submit"]');

    // Disable submit button initially
    submitButton.disabled = true;

    // Function to check if all required files are selected
    function checkFilesSelected() {
        let allFilesSelected = true;
        fileInputs.forEach(input => {
            if (!input.files.length) {
                allFilesSelected = false;
            }
        });
        return allFilesSelected;
    }

    // Enable submit button if all required files are selected
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (checkFilesSelected()) {
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
            }
        });
    });

    // Prevent form submission if not all required files are selected
    form.addEventListener('submit', function(event) {
        if (!checkFilesSelected()) {
            event.preventDefault();
            alert('Please select all required documents before submitting.');
        } else {
            // Simulate successful upload and display a success message
            event.preventDefault(); // Prevent actual form submission
            alert('Your documents have been uploaded successfully.');
        }
    });
});