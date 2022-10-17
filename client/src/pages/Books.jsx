import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// use axios which allow to make an api request using react app
function Books() {
  const [books, SetBooks] = useState([]);

  useEffect(() => {
    // async function to fetch all books from http://localhost:8800/books
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res);
        SetBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  // async function to delete book with id from http://localhost:8800/books
  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Bookshop</h1>
      {/* BOOKS */}
      <div className="books">
        {/* BOOK */}
        {books.map((book) => (
          <div key={book.id} className="book">
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new Book</Link>
      </button>
    </div>
  );
}

export default Books;
