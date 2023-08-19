const books = [
  {
    ISBN: "12345Book",
    title: "Luthiana",
    pubDate: "2021-05-08",
    language: "en",
    numPage: 250,
    author: [1, 2],
    publications: [1],
    category: ["fantasy", "novel", "thriller"],
  },
  {
    ISBN: "445gtexr",
    title: "Believers",
    pubDate: "2019-07-28",
    language: "en",
    numPage: 300,
    author: [3],
    publications: [2],
    category: ["true story", "novel", "inspirational"],
  },
];
const author = [
  {
    id: 1,
    name: "Harvey King",
    books: ["12345Book", "Tales by sunrise"],
  },
  {
    id: 2,
    name: "Stacy Burking",
    books: ["12345Book"],
  },
  {
    id: 3,
    name: "Kim Taehyung",
    books: ["445gtexr", "Tales by sunrise"],
  },
];

const publication = [
  {
    id: 1,
    name: "writex",
    books: ["12345Book"],
  },
  {
    id: 2,
    name: "booksandall",
    books: ["Tales by sunrise", "445gtexr"],
  },
  {
    id: 3,
    name: "bookies",
    books: [],
  },
];

module.exports = { books, author, publication };
