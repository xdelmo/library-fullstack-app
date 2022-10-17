import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add() {
  const [book, SetBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });
  console.log("🚀 ~ file: Add.jsx ~ line 11 ~ Add ~ book", book);

  // function to hadle change on inputs
  // only change input : book.property
  const handleChange = (e) => {
    SetBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // post method to send book variable to server
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="form">
      <h1>Add a New Book</h1>
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
          Add
        </button>
      </form>
    </div>
  );
}

export default Add;
