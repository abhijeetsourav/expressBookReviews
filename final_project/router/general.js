const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
  // res.json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  let author = req.params.author;

  const matchingBooks = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author.toLowerCase()
  );

  if (matchingBooks.length > 0) {
    return res.json(matchingBooks); // Send the matching books as the response
  } else {
    return res
      .status(404)
      .json({ message: "No books found by the given author" }); // Handle no matches
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  let title = req.params.title;

  const matchingBooks = Object.values(books).filter(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  if (matchingBooks.length > 0) {
    return res.json(matchingBooks); // Send the matching books as the response
  } else {
    return res
      .status(404)
      .json({ message: "No books found by the given author" }); // Handle no matches
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
