import { isTokenValid, getToken, clearTokenAndRedirect, logoutUser } from './utils/auth.js';
import { initAddBookForm } from './add-book.js';

document.addEventListener('DOMContentLoaded', async () => {
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
    const searchInput = document.getElementById('searchInput');
    const pageSize = 10;
    const sortBy = 'title';

    let currentPage = 1;
    let modalLoaded = false;
    let searchTitle = '';

    async function fetchBooks(page = 1) {
        try {
            const url = searchTitle.trim()
                ? `/books/search?page=${page}&pageSize=${pageSize}&title=${encodeURIComponent(searchTitle)}`
                : `/books/list?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`;

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch books');

            const books = await response.json();
            const totalPages = Math.ceil(books.total / pageSize);

            renderBooks(books.items);
            document.getElementById('bookListStatus').textContent = 'Books List';
            currentPageSpan.textContent = `Page ${page}`;
            previousButton.disabled = page <= 1;
            nextButton.disabled = page >= totalPages;
        } catch (err) {
            const tableBody = document.getElementById('bookTableBody');
            tableBody.innerHTML = `<tr><td colspan="3" style="color:red">${err.message}</td></tr>`;
        }
    }

    searchInput?.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchTitle = searchInput.value.trim();
            currentPage = 1;
            await fetchBooks(currentPage);
        }
    });

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
            const titleLink = document.createElement('a');
            titleLink.href = `/book?id=${book.id}`;
            titleLink.textContent = book.title;
            titleLink.classList.add('book-link');
            titleLink.setAttribute('data-testid', `book-link-${book.id}`);
            title.appendChild(titleLink);

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

    previousButton.addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            await fetchBooks(currentPage);
        }
    });

    nextButton.addEventListener('click', async () => {
        currentPage++;
        await fetchBooks(currentPage);
    });

    logoutButton?.addEventListener('click', logoutUser);

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

        initAddBookForm(token, () => fetchBooks(currentPage));
    }

    await fetchBooks(currentPage);
});
