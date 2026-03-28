const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const ISBN = req.params.isbn;
    res.send(books[ISBN])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let booksByAuthor = {}
  const author = req.params.author
  let i=1;
  for(let bookid in books){
      if(books[bookid].author === author ){
        booksByAuthor[i++] = books[bookid];
      }
    }
    return res.send(JSON.stringify(booksByAuthor))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let booksByTitle = {}
    const title = req.params.title
    let i=1;
    for(let bookid in books){
        if(books[bookid].title === title ){
          booksByTitle[i++] = books[bookid];
        }
      }
      return res.send(JSON.stringify(booksByTitle))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
