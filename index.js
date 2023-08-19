const express = require("express");
const bodyParser = require("body-parser");
const bookApp = express();
bookApp.use(express.json());
bookApp.use(bodyParser.urlencoded({ extended: true }));
bookApp.use(bodyParser.json());
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

//POST

/*
Route               /book/new
Description         Add new books
Access              Public
Parameter           none
Methods             POST
*/

bookApp.post("/book/new", (req, res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({ updatedBook: database.books });
});

/*
Route               /authors/new
Description         Add new authors
Access              Public
Parameter           none
Methods             POST
*/

bookApp.post("/author/new", (req, res) => {
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json({ updatedAuthor: database.author });
});

/*
Route               /publication/new
Description         Add new authors
Access              Public
Parameter           none
Methods             POST
*/
bookApp.post("/publication/new", (req, res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json({ updatedPublication: database.publication });
});
/*
Route               /publication/update/book
Description         Update/add new publication
Access              Public
Parameter           isbn
Methods             PUT
*/

bookApp.put("/publication/update/book/:isbn", (req, res) => {
  //Update publication database
  database.publication.forEach((pub) => {
    if (pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });
  //Update the book database

  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publications = req.body.pubId;
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publication,
    message: "Successfully updated publications",
  });
});

bookApp.listen(3000, () => {
  console.log("Server is up and running");
});
