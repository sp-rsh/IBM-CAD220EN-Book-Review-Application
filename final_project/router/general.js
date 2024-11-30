const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


//Function to check if the book exists
const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

/* part 1, improved in part 10
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here part 1
  // return res.status(300).json(books);
  //return res.status(300).send(JSON.stringify(books,null,10));
});
*/

// Get the book list available in the shop  //part 10:
public_users.get('/',function (req, res) {
  let allbooks = new Promise((resolve,reject) => {
    try{
      resolve(books);
    }
    catch(err){
      reject(err);
    }
  })
  allbooks.then(
    (data) => {
      return res.status(300).json(data);
    },
    (err) =>{
      return res.status(400).send("Data is not found!");
    }
  )

  
});


/* improved in part 11
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let book = books[isbn];
  return res.status(300).json(book);
 });*/

 // part 11
 public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let book = books[isbn];

  let allbooks = new Promise((resolve,reject) => {
    try{
      resolve(book);
    }
    catch(err){
      reject(err);
    }
  });

  allbooks.then(
    (data) => {
      return res.status(300).json(data);
    },
    (err) =>{
      return res.status(400).send("Data is not found!");
    });

 });

  
/* improved in part 12
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const Author = req.params.author; 
  for(let key in books){
    if(books[key].author === Author){
      return res.status(300).json(books[key]);
    }
  }
  return res.status(400).json({message:"your author doesnt exist!"});
});
*/

//part 12 
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const Author = req.params.author; 


  let getAuthor = new Promise((resolve,reject) => {
    try{
      let bookInfo; 
      for(let key in books){
        if(books[key].author === Author){
          bookInfo = books[key];
        }
      }
      resolve(bookInfo);
    }
    catch(err){
      reject(err);
    }
  });

  getAuthor.then(
    (data) => {
      return res.status(300).json(data);
    },
    (err) =>{
      return res.status(400).send("Data is not found!");
    });

});

/* improved in part 13
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const Title = req.params.title; 
  for(let key in books){
    if(books[key].title === Title){
      return res.status(300).json(books[key]);
    }
  }
  return res.status(400).json({message: "your title doesnt exist!"});
});
*/

//part 13:
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const Title = req.params.title;
  let getTitle = new Promise((resolve,reject) => {
    try{
      let titleInfo; 
      for(let key in books){
        if(books[key].title === Title){
          titleInfo= books[key];
        }
      }
      resolve(titleInfo);
    }
    catch(err){
      reject(err);
    }
  });

  getTitle.then(
    (data) => {
      return res.status(300).json(data);
    },
    (err) =>{
      return res.status(400).send("Data is not found!");
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; 
  const reviews=books[isbn]['reviews'];
    
      return res.status(300).json(reviews);
});

module.exports.general = public_users;
