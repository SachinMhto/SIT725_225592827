const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      required: true,
      trim: true
    },
    releaseYear: {
      type: Number,
      required: true,
      min: 1900,
      max: 2100
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Movie', movieSchema);
