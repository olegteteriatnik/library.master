export function initAddBookForm(token, refreshBooks) {
    const form = document.getElementById('addBookForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('newTitle').value.trim();
        const author = document.getElementById('newAuthor').value.trim();
        const year = document.getElementById('newYear').value.trim();

        try {
            const response = await fetch('books/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, author, year: Number(year) }),
            });

            if (!response.ok) throw new Error('Failed to add book');

            const modal = document.getElementById('addBookModal');
            modal.classList.add('hidden');

            form.reset();
            refreshBooks();
        } catch (error) {
            alert(error.message);
        }
    });
}
