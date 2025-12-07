const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Simple test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'DMS backend is running ✅' });
});

// Start server
const PORT = process.env.PORT || 5000;

const authMiddleware = require('./middleware/auth');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized!', user: req.user });
});

const documentRoutes = require('./routes/documents');
app.use('/uploads', express.static('uploads')); // allow file access
app.use('/api/documents', documentRoutes);


app.use(cors({
  origin: "http://localhost:4200",
  methods: "GET,POST,PUT,DELETE"
}));
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/documents', require('./routes/documents'));


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB Connection Error:', err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
