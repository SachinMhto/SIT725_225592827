const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

const recipes = [
  {
    title: "Pasta",
    image: "images/recipe1.jpg",
    ingredients: "Pasta, tomato sauce, cheese",
    description: "A tasty pasta recipe that is easy to make.",
  },
  {
    title: "Burger",
    image: "images/recipe2.jpg",
    ingredients: "Bun, patty, lettuce, cheese",
    description: "A delicious homemade burger for lunch or dinner.",
  },
  {
    title: "Salad",
    image: "images/recipe3.jpg",
    ingredients: "Lettuce, tomato, cucumber, dressing",
    description: "A healthy and fresh salad for any time of the day.",
  },
];

app.get("/api/recipes", (req, res) => {
  res.json({ statusCode: 200, data: recipes, message: "Success" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
