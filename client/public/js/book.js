import { isTokenValid, getToken, clearTokenAndRedirect } from './utils/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
        clearTokenAndRedirect();
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    if (!bookId) {
        document.body.innerHTML = '<p style="color: red;">Book ID is missing.</p>';
        return;
    }

    fetch(`/books/get?id=${bookId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            if (!res.ok) throw new Error('Book not found');
            return res.json();
        })
        .then((book) => {
            document.body.style.display = 'block';

            document.querySelector('[data-testid="book-title"]').textContent = book.title;
            document.getElementById('book-author').textContent = `Author: ${book.author}`;
            document.getElementById('book-year').textContent = `Year: ${book.year}`;
            document.getElementById('book-availability').textContent = `Available: ${book.isAvailable ? 'Yes' : 'No'}`;
        })
        .catch((err) => {
            document.body.style.display = 'block';
            document.body.innerHTML = `<p data-testid="book-error" style="color: red; text-align:center; margin-top:2rem;">${err.message}</p>`;
        });

    document.getElementById('backToList').addEventListener('click', () => {
        window.location.href = '/';
    });

    document.getElementById('logoutButton')?.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    });
});
