import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddEdit.css";

import Footer from "./Footer";

const initialState = {
  name: "",
  email: "",
  number: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, number } = state;
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data);
    if (response.status === 200) {
      window.confirm("User added succesfuly");
    }
  };

  const updateUser = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/user/${id}`, data);
    if (response.status === 200) {
      window.confirm("User updated succesfuly");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("aded");
    if (!name || !email || !number) {
      window.confirm("Please provide value into each input field");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="container">
      <div style={{ marginTop: "100px", width: "400px" }}>
        <form
          action=""
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="Enter Name ..."
            type="text"
            onChange={handleInputChange}
            value={name}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            placeholder="Enter Email ..."
            type="text"
            onChange={handleInputChange}
            value={email}
          />
          <label htmlFor="number">Number</label>
          <input
            id="number"
            name="number"
            placeholder="Enter Contact ..."
            type="number"
            onChange={handleInputChange}
            value={number}
          />
          <input type="submit" value={id ? "Update" : "Add"} />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddEdit;
