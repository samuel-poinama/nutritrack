

function handleError(error) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = error;
    errorMessageDiv.classList.remove('hidden');
} 