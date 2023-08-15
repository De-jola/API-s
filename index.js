const express = require("express");
const bookApp = express();
bookApp.use(express.json());
//Database
const database = require("./database");

bookApp.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route               /is
Description         Get book on ISBN
Access              Public
Parameter           isbn
Methods             GET 
*/

bookApp.get("/is/:isbn", (req, res) => {
  const getBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }
  return res.json({ book: getBook });
});

/*
Route               /c
Description         Get book on category
Access              Public
Parameter           category
Methods             GET 
*/
bookApp.get("/c/:category", (req, res) => {
  const getBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );
  if (getBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }
  return res.json({ book: getBook });
});

/*
Route               /lang
Description         Get book on language
Access              Public
Parameter           language
Methods             GET 
*/
bookApp.get("/lang/:language", (req, res) => {
  const getBook = database.books.filter(
    (book) => book.language === req.params.language
  );
  if (getBook.length === 0) {
    return res.json({
      error: `No books found for ${req.params.language} language`,
    });
  }
  return res.json({ book: getBook });
});

/*
Route               /authors
Description         Get all authors
Access              Public
Parameter           none
Methods             GET 
*/
bookApp.get("/authors", (req, res) => {
  return res.json({ authors: database.author });
});

/*
Route               /author/book
Description         Get author based on isbn
Access              Public
Parameter           isbn
Methods             GET 
*/

bookApp.get("/author/book/:isbn", (req, res) => {
  const getAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );
  if (getAuthor.length === 0) {
    return res.json({
      error: `No authors found for the book of${req.params.isbn}`,
    });
  }
  return res.json({ author: getAuthor });
});

/*
Route               /author
Description         Get author on id
Access              Public
Parameter           id
Methods             GET 
*/
bookApp.get("/author/:id", (req, res) => {
  const getAuthor = database.author.filter(
    (author) => author.id === parseInt(req.params.id)
  );
  if (getAuthor.length === 0) {
    return res.json({ error: `No authors with id of ${req.params.id} ` });
  }
  return res.json({ author: getAuthor });
});

/*
Route               /publications
Description         Get all publications
Access              Public
Parameter           none
Methods             GET 
*/
bookApp.get("/publications", (req, res) => {
  return res.json({ publications: database.publication });
});

/*
Route               /publications
Description         Get all publications based 
                    on name
Access              Public
Parameter           name
Methods             GET 
*/
bookApp.get("/publications/:name", (req, res) => {
  const getPublication = database.publication.filter(
    (publication) => publication.name === req.params.name
  );
  if (getPublication.length === 0) {
    return res.json({
      error: `No publication for the name of ${req.params.name}`,
    });
  }
  return res.json({ publication: getPublication });
});

/*
Route               /publications/book
Description         Get all publications based 
                    on isbn
Access              Public
Parameter           isbn
Methods             GET 
*/
bookApp.get("/publications/book/:isbn", (req, res) => {
  const getPublication = database.publication.filter((publication) =>
    publication.books.includes(req.params.isbn)
  );
  if (getPublication.length === 0) {
    return res.json({
      error: `No publication found for the isbn of ${req.params.isbn}`,
    });
  }
  return res.json({ publication: getPublication });
});

bookApp.listen(3000, () => {
  console.log("Server is up and running");
});
