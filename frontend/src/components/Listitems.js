import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import "../styles/style2.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Listitems = ({ item }) => {
  const { name, type, breed, age, healthStatus } = item;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState();
  const user = localStorage.getItem("userInfo");
  const currUser = JSON.parse(user);
  const uid = currUser._id;
  console.log(name);
  const handleOpen = () => {
    setOpen(true);
  };

  const adoptHandle = async () => {
    
    try {
      const user = localStorage.getItem("userInfo");
        const jData = JSON.parse(user);
      const uid = jData._id;
      
      const data = {
        name,
        type,
        breed,
        age,
        healthStatus,
        uid,
      };
      // console.log(data);
      const res = await axios.post("pokemon/adopt", data);
      // console.log(res.data.message);
      alert("Pokemon Adopted Successfully");
    } catch (error) {
      alert(`${error.response.data.message}`);
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className="column">
        <div className="card">
          <h3>{name} </h3>
          <p>Pokoem Type : {type}</p>
          <p>Pokemon Breed : {breed}</p>
          <p>Pokoem Age : {age}</p>
         <button type="submit" onClick={adoptHandle}>
            Adopt Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listitems;
