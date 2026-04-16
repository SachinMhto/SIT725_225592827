const booksService = require('../services/books.service');

function getAllBooks(req, res) {
  const books = booksService.getAllBooks();
  res.status(200).json(books);
}

function getBookById(req, res) {
  const { id } = req.params;
  const book = booksService.getBookById(id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  return res.status(200).json(book);
}

module.exports = {
  getAllBooks,
  getBookById
};
