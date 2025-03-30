import { isTokenValid, getToken, clearTokenAndRedirect } from './utils/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = getToken();
    if (!token || !isTokenValid(token)) {
        clearTokenAndRedirect();
        return;
    }

    document.body.style.display = 'block';

    const previousButton = document.getElementById('previousPageButton');
    const nextButton = document.getElementById('nextPageButton');
    const currentPageSpan = document.getElementById('currentPage');
    const addBookButton = document.getElementById('openAddBookModal');
    const logoutButton = document.getElementById('logoutButton');

    let currentPage = 1;
    const pageSize = 10;
    let modalLoaded = false;

    async function fetchBooks(page = 1) {
        try {
            const response = await fetch(`/books/list?page=${page}&pageSize=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch books');

            const books = await response.json();
            renderBooks(books.items);
            currentPageSpan.textContent = `Page ${page}`;
        } catch (err) {
            const tableBody = document.getElementById('bookTableBody');
            tableBody.innerHTML = `<tr><td colspan="3" style="color:red">${err.message}</td></tr>`;
        }
    }

    function renderBooks(books) {
        const tableBody = document.getElementById('bookTableBody');
        tableBody.innerHTML = '';

        if (!books.length) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 3;
            cell.style.color = 'red';
            cell.textContent = 'No books found';
            row.appendChild(cell);
            tableBody.appendChild(row);
            return;
        }

        books.forEach((book) => {
            const row = document.createElement('tr');

            const title = document.createElement('td');
            title.textContent = book.title;

            const author = document.createElement('td');
            author.textContent = book.author;

            const year = document.createElement('td');
            year.textContent = book.year;

            row.appendChild(title);
            row.appendChild(author);
            row.appendChild(year);

            tableBody.appendChild(row);
        });
    }

    previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchBooks(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        currentPage++;
        fetchBooks(currentPage);
    });

    logoutButton?.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    });

    addBookButton.addEventListener('click', async () => {
        if (!modalLoaded) {
            const res = await fetch('../pages/add-book.html');
            const html = await res.text();
            document.body.insertAdjacentHTML('beforeend', html);
            initModalLogic();
            modalLoaded = true;
        }

        const modal = document.getElementById('addBookModal');
        modal?.classList.remove('hidden');
    });

    function initModalLogic() {
        const modal = document.getElementById('addBookModal');
        const closeModalButton = document.getElementById('closeModal');

        closeModalButton.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    fetchBooks(currentPage);
});
