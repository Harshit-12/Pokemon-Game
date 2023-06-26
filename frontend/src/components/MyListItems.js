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

const MyListItem = ({ item }) => {
    const { name, type, breed, age, healthStatus } = item;
    const currId= item._id;
    const navigate = useNavigate();
  const [open, setOpen] = React.useState();
  const user = localStorage.getItem("userInfo");
  const currUser = JSON.parse(user);
  const uid = currUser._id;
  console.log(name);
  const handleOpen = () => {
    setOpen(true);
  };

  const HandleFeed = async () => {
    
    try {
      const data = {
        currId, 
      };
      console.log(data);
      const res = await axios.put("pokemon/feed", data);
      alert("Pokemon Feeded Successfully");
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
          <p>Pokemon Health Status : {healthStatus} </p>
          <button type="submit" onClick={HandleFeed}>
           Feed Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyListItem;
