import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import IconButton from "@mui/material/IconButton";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import "./style.css";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    alert("User Logged Out Successfully");
    navigate("/login");
  };
  return (
    <div className="nav">
      <div className="nav-left">
        <Link to="/">
          <div className="btn nav-item">All Pokemons</div>
        </Link>
        <Link to="/addPokemon">
          <div className="btn nav-item">Add Pokemons</div>
        </Link>
        <Link to="/myPokemons">
          <div className="btn nav-item">My Pokemons</div>
        </Link>
      </div>
      <div className="nav-right">
        <div className="btn nav-item" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}
