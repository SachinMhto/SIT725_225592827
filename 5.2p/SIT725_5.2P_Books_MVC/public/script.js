async function loadBooks() {
  const status = document.getElementById('status');
  const booksList = document.getElementById('books-list');

  try {
    const response = await fetch('/api/books');

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const books = await response.json();
    status.textContent = `Loaded ${books.length} books.`;
    booksList.innerHTML = '';

    books.forEach((book) => {
      const bookCard = document.createElement('article');
      bookCard.className = 'book-card';
      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p>${book.summary}</p>
      `;
      booksList.appendChild(bookCard);
    });
  } catch (error) {
    status.textContent = 'Could not load books. Please try again.';
    booksList.innerHTML = '';
    console.error(error);
  }
}

window.addEventListener('load', loadBooks);
