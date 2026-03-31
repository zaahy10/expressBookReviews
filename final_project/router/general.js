const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username&&password){
        const existingUser = users.filter((user)=> user.username === username)
        if(existingUser.length===0){
            users.push({"username":req.body.username,"password":req.body.password});
            return res.status(201).json({message:"User Created successfully"})
        }
        else{
          return res.status(400).json({message:"Already exists"})
        }
    }
    else if(!username && !password){
      return res.status(400).json({message:"Bad request"})
    }
    else if(!username || !password){
      return res.status(400).json({message:"Check username and password"})
    }  
  });

// Get the book list available in the shop
public_users.get('/',async (req, res) => {
    await res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const ISBN = req.params.isbn;
    await res.send(books[ISBN])
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
    let isbn = req.params.isbn;
    if(books[isbn]){
        return res.status(200).send(JSON.stringify(books[isbn].reviews,null,4));
    }
    else{
        return res.status(404).send("No book found with ISBN "+isbn);
    }
});

module.exports.general = public_users;
