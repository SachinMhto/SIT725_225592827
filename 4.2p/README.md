# Movie Collection Manager - MongoDB Version

This is a simple Node.js project built with Express, EJS and MongoDB using Mongoose.
It demonstrates server-side functions and database integration for a university task.

## Features
- Add a movie
- View all movies from MongoDB
- Delete a movie
- Data persists in MongoDB
- Server-side logic handled with Express

## Fields Used
- title
- genre
- releaseYear
- rating

## How to Run
1. Open the project folder in VS Code or terminal.
2. Install packages:
   npm install
3. Create a `.env` file and copy from `.env.example`
4. Make sure MongoDB is running locally or replace `MONGODB_URI` with your MongoDB Atlas connection string.
5. Start the server:
   npm start
6. Open in browser:
   http://localhost:3000

## Example .env
MONGODB_URI=mongodb://127.0.0.1:27017/movieCollectionDB
PORT=3000

## Notes
- This is different from a basic prac because it uses its own movie fields and sample data.
- The frontend submits forms to the server.
- The server stores and fetches data from MongoDB.
