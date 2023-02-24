const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// JWT authentication middleware
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = decodedToken.user;
        next();
    });
};

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/books', requireAuth, require('./routes/book'));

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
