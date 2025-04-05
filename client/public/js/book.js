import { isTokenValid, getToken, clearTokenAndRedirect, logoutUser } from './utils/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
        clearTokenAndRedirect();
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');
    const confirmModal = document.getElementById('confirmModal');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');
    const logoutButton = document.getElementById('logoutButton');

    let currentBook;

    const fetchAndRenderBook = () => {
        fetch(`/books/get?id=${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error('Book not found');
                return response.json();
            })
            .then((book) => {
                currentBook = book;
                document.body.style.display = 'block';
                renderBookDetails(book);

                const editButton = document.getElementById('editButton');
                if (editButton) {
                    editButton.addEventListener('click', () => renderEditableForm(book));
                }
            })
            .catch((err) => {
                document.body.style.display = 'block';
                document.body.innerHTML = `<p data-testid="book-error" style="color: red; text-align:center; margin-top:2rem;">${err.message}</p>`;
            });
    };

    const renderBookDetails = (book) => {
        const info = document.getElementById('book-info');
        const editActions = document.querySelector('.edit-actions');

        if (editActions) editActions.style.display = 'flex';

        info.innerHTML = `
            <h2 id="book-title" data-testid="book-title">${book.title}</h2>
            <p id="book-author" data-testid="book-author">Author: ${book.author}</p>
            <p id="book-year" data-testid="book-year">Year: ${book.year}</p>
            <p id="book-availability" data-testid="book-availability">Available: ${book.isAvailable ? 'Yes' : 'No'}</p>
        `;
    };

    const renderEditableForm = (book) => {
        const info = document.getElementById('book-info');
        const editActions = document.querySelector('.edit-actions');
        editActions.style.display = 'none';

        info.innerHTML = `
        <form id="editBookForm" class="book-edit-form">
            <label>Title:
                <input type="text" name="title" value="${book.title}" required />
            </label>
            <label>Author:
                <input type="text" name="author" value="${book.author}" required />
            </label>
            <label>Year:
                <input type="number" name="year" value="${book.year}" required />
            </label>
            <label>Available:
                <select name="isAvailable">
                    <option value="true" ${book.isAvailable ? 'selected' : ''}>Yes</option>
                    <option value="false" ${!book.isAvailable ? 'selected' : ''}>No</option>
                </select>
            </label>
            <div class="form-actions">
                <button type="submit" id="saveButton" data-testid="save-book-button">Save</button>
                <button type="button" id="cancelButton">Cancel</button>
            </div>
        </form>
    `;

        document.getElementById('editBookForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const form = event.target;
            const payload = {
                id: Number(bookId),
                title: form.title.value.trim(),
                author: form.author.value.trim(),
                year: Number(form.year.value),
                isAvailable: form.isAvailable.value === 'true',
            };

            try {
                const response = await fetch('/books/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) throw new Error('Failed to update book');
                fetchAndRenderBook();
            } catch (error) {
                alert(error.message);
            }
        });

        document.getElementById('cancelButton').addEventListener('click', () => {
            renderBookDetails(book);
            editActions.style.display = 'flex';
        });
    };

    document.getElementById('deleteButton')?.addEventListener('click', () => {
        confirmModal.classList.remove('hidden');
    });

    confirmYes?.addEventListener('click', async () => {
        confirmModal.classList.add('hidden');
        try {
            const response = await fetch(`/books/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: Number(bookId) }),
            });

            if (!response.ok) throw new Error('Failed to delete book');

            function showToast(message) {
                const toast = document.getElementById('toast');
                toast.textContent = message;
                toast.classList.remove('hidden');
                toast.classList.add('show');

                setTimeout(() => {
                    toast.classList.remove('show');
                    toast.classList.add('hidden');
                    window.location.href = '/';
                }, 1500);
            }

            showToast('Book deleted');
        } catch (err) {
            alert(err.message);
        }
    });

    confirmNo?.addEventListener('click', () => {
        confirmModal.classList.add('hidden');
    });

    document.getElementById('backToList').addEventListener('click', () => {
        window.location.href = '/';
    });

    logoutButton?.addEventListener('click', logoutUser);

    fetchAndRenderBook();
});
