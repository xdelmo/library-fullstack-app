import express from "express";
import mysql from "mysql";
import cors from "cors";

// create an express application
const app = express();

// env variables
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "library",
  // host: process.env.MYSQL_HOST,
  // user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE,
});

// using JSON file from any client to Express
app.use(express.json());
// Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
app.use(cors());

// get from all db ("/")
app.get("/", (req, res) => {
  res.json("Hello this is the backends");
});

app.get("/books", (req, res) => {
  // query to get all book from books table
  const q = "SELECT * FROM books";
  // query on db and error message
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

// function to insert tuple into the db from the body client
app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `description`,`cover`, `price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Book has been created successfully");
  });
});

// function to delete tuple into the db from the body client
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.json("Book has been deleted successfully");
  });
});

// function to update tuple into the db from the body client
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.json("Book has been updated successfully");
  });
});

// app listens to 8800 port
app.listen(8800, () => {
  console.log("Connected to backend!");
});
