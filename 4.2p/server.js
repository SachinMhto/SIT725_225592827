require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movieCollectionDB';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

async function seedMovies() {
  const count = await Movie.countDocuments();

  if (count === 0) {
    await Movie.insertMany([
      { title: 'Interstellar', genre: 'Sci-Fi', releaseYear: 2014, rating: 8.6 },
      { title: 'Coco', genre: 'Animation', releaseYear: 2017, rating: 8.4 },
      { title: '3 Idiots', genre: 'Comedy/Drama', releaseYear: 2009, rating: 8.4 },
      { title: 'Spirited Away', genre: 'Fantasy', releaseYear: 2001, rating: 8.6 }
    ]);
    console.log('Sample movie data inserted into MongoDB.');
  }
}

app.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1, _id: -1 }).lean();

    res.render('index', {
      movies,
      message: req.query.message || ''
    });
  } catch (error) {
    res.status(500).send('Error loading movies from MongoDB.');
  }
});

app.post('/movies/add', async (req, res) => {
  try {
    const { title, genre, releaseYear, rating } = req.body;

    if (!title || !genre || !releaseYear || !rating) {
      return res.redirect('/?message=Please fill in all fields.');
    }

    const year = Number(releaseYear);
    const movieRating = Number(rating);

    if (Number.isNaN(year) || Number.isNaN(movieRating)) {
      return res.redirect('/?message=Release year and rating must be valid numbers.');
    }

    await Movie.create({
      title: title.trim(),
      genre: genre.trim(),
      releaseYear: year,
      rating: movieRating
    });

    res.redirect('/?message=Movie added successfully.');
  } catch (error) {
    res.redirect('/?message=Could not add movie.');
  }
});

app.post('/movies/delete/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/?message=Movie deleted successfully.');
  } catch (error) {
    res.redirect('/?message=Could not delete movie.');
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully.');

    await seedMovies();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

startServer();
