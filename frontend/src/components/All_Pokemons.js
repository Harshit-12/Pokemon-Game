import axios from "axios";
import React, { useEffect, useState, Navigate } from "react";
import { useNavigate } from "react-router-dom";
import Listitems from "./Listitems";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import Loader from "./Loader";

const AllPokemons = () => {
  const [isLoading, setisLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [isloggedIn, setisloggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    console.log(user);
    if (!user) {
      navigate("/login");
    }
    return async function getdata() {
      try {
        const res = await axios.get("pokemon");

        if (res.data.length > 0) {
          setPokemons([...res.data]);
        }
        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(pokemons);
  }, []);

  return (
    <div>
      {!isLoading && pokemons ? (
        <>
          <Navbar />
          <h1>All Pokemons</h1>
          <center>{/* <h3>Welcome {name}</h3> */}</center>

          {pokemons.map((item) => (
            <Listitems item={item} key={item._id}  />
          ))}
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default AllPokemons;
