const router = require('express').Router();
const Book = require('../models/book');

// Get all books for a user
router.get('/', async (req, res) => {
    const userId = req.user;
    try {
        const books = await Book.find({ user: userId });
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a book for a user
router.post('/', async (req, res) => {
    const userId = req.user;
    const { title, authors, description, image, link } = req.body;
    try {
        const newBook = new Book({ user: userId, title, authors, description, image, link });
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove a book for a user
router.delete('/:id', async (req, res) => {
    const userId = req.user;
    const { id } = req.params;
    try {
        const book = await Book.findOne({ user: userId, _id: id });
        if (!book) {
            return res.status(400).json({ error: 'Book not found' });
        }
        await book.remove();
        res.json({ message: 'Book removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
