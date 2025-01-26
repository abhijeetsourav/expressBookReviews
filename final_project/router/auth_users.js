const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  const regex = /^[a-zA-Z0-9]{3,15}$/;
  return regex.test(username);
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  return Boolean(
    users.filter((user) => {
      return user.username === username && user.password === password;
    })
  );
};
regd_users.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      return res
        .status(400)
        .json({ message: "Invalid username. Please check the format." });
    }
    const user = users.find((user) => user.username === username);

    if (user) {
      return res.status(404).json({ message: "User already exists!" });
    } else {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    }
  }

  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

//only registered users can login
regd_users.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    // Store access token and username in session
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;

  if (books[isbn]) {
    books[isbn]["reviews"][req.session.authorization.username] =
      req.query.review;
  } else {
    return res.status(400).json({ message: "book not found" });
  }

  return res.status(200).json({ message: "review added successfully" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
