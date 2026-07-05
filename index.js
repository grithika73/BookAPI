const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// GET
app.get("/books", (req, res) => {
  res.json(books);
});

// POST
app.post("/books", (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(book);
  res.json(book);
});

// PUT
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = req.body.title;
  book.author = req.body.author;

  res.json(book);
});

// DELETE
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);

  res.json({ message: "Book deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
