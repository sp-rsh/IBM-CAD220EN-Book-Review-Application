const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
  return (user.username === username && user.password === password)
});
if(validusers.length > 0){
  return true;
} else {
  return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  const all_book_reviews = books[req.params.isbn]["reviews"];
  const registered_user = req.body.username; 
  const book_review = req.query.reviews;

 if(all_book_reviews.hasOwnProperty(registered_user)){
    all_book_reviews[registered_user] = book_review; 
 }
 else{
    all_book_reviews[registered_user] = book_review; 
 }

  return res.status(300).json({message: "book review is added"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {

  const all_book_reviews = books[req.params.isbn]["reviews"];
  const registered_user = req.body.username; 
  const book_review = req.query.reviews;

 if(all_book_reviews.hasOwnProperty(registered_user)){
    delete all_book_reviews[registered_user]; 
    return res.status(300).json({message: "review is deleted"});
 }
 else{
    return res.status(300).json({message: "no review can be found"});
 }



});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
