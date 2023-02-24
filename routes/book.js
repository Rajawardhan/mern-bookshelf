const router = require('express').Router();
const axios = require('axios');
const Book = require('../models/book');
const requireAuth = require('../middleware/requireAuth');

// Search for books using the Google Books API
router.get('/search', requireAuth, async (req, res) => {
    const { q } = req.query;
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
    const books = data.items.map(item => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        image: item.volumeInfo.imageLinks.thumbnail,
        link: item.volumeInfo.infoLink
    }));
    res.json(books);
});

// Get all books for a user
router.get('/', requireAuth, async (req, res) => {
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
router.post('/', requireAuth, async (req, res) => {
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

// Update a book for a user
router.put('/:id', requireAuth, async (req, res) => {
    const userId = req.user;
    const { id } = req.params;
    const { title, authors, description, image, link } = req.body;
    try {
        const book = await Book.findOne({ user: userId, _id: id });
        if (!book) {
            return res.status(400).json({ error: 'Book not found' });
        }
        book.title = title;
        book.authors = authors;
        book.description = description;
        book.image = image;
        book.link = link;
        const savedBook = await book.save();
        res.json(savedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove a book for a user
router.delete('/:id', requireAuth, async (req, res) => {
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
