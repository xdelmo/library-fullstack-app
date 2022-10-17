import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, SetBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  // function to hadle change on inputs
  // only change input : book.property
  const handleChange = (e) => {
    SetBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // post method to send book variable to server
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Update the book</h1>
      <form>
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
          required
        />
        <input
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="description"
          required
        />
        <input
          type="text"
          placeholder="Cover"
          onChange={handleChange}
          name="cover"
        />
        <input
          type="number"
          placeholder="Price"
          onChange={handleChange}
          name="price"
          required
        />
        <button className="formButton" onClick={handleClick}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
