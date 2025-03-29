document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        const { token } = await response.json();
        localStorage.setItem('token', token);
        window.location.href = '/';
    } catch (error) {
        const existingError = document.getElementById('error');

        if (existingError) {
            existingError.remove();
        }

        const errorElement = document.createElement('p');
        errorElement.id = 'error';
        errorElement.dataset.testid = 'login-error-message';
        errorElement.style.color = 'red';
        errorElement.textContent = error.message;

        const form = document.getElementById('loginForm');
        form.insertAdjacentElement('afterend', errorElement);
    }
});
