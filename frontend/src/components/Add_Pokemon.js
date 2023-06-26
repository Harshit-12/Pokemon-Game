import axios from "axios";
import React, { useState, useEffect } from "react";
// import DateTimePicker from "react-datetime-picker";
// import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../styles/Add.css";
import Navbar from "./Navbar";
// import Alert from "react-bootstrap/Alert";
const Add_Pokemon = () => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [breed, setBreed] = useState();
  const [age, setAge] = useState();
  const [healthStatus, setHealthStatus] = useState();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name,
      type,
      breed,
      age,
    };
    try {
      await axios.post("pokemon", data);
      alert("Pokemon Added Successfully");
      navigate("/");
    } catch (error) {
      alert(`${error.response.data.message}`);
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="bg">
        {/* <Header /> */}
        <div className="left_text">
          <h1>Add Pokemon</h1>
        </div>

        <div className="container">
          <form>
            <label for="name">Name </label>
            <input
              type="text"
              id="name"
              placeholder="Enter the Pokemon"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
            <label for="type">Type</label>
            <input
              value={type}
              placeholder="Enter Pokemon Type e.g. (Water, Fire, Grass etc.)"
              onChange={(e) => {
                setType(e.target.value);
              }}
              type="text"
              id="sdate"
              required
            />
            <br />
            <label for="breed">Breed</label>
            <input
              value={breed}
              placeholder="Enter Pokemon Breed e.g. (Azurill, Bonsly, Mantyke etc.)"
              onChange={(e) => {
                setBreed(e.target.value);
              }}
              type="text"
              id="edate"
              required
            />
            <label for="age">Age</label>
            <input
              value={age}
              placeholder="Enter Pokemon Age"
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="text"
              id="age"
              required
            />
            <button type="submit" onClick={submitHandler}>
              Add Pokemon
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add_Pokemon;
