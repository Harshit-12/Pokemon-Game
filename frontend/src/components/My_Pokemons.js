import axios from "axios";
import React, { useEffect, useState, Navigate } from "react";
import { useNavigate } from "react-router-dom";
import MyListItems from "./MyListItems";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import Loader from "./Loader";

const My_Pokemons = () => {
  const [isLoading, setisLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    // console.log(user);
    if (!user) {
      navigate("/login");
    }
    return async function getdata() {
      try {
        const data = localStorage.getItem("userInfo");
        const jData = JSON.parse(data);
        const uid = jData._id;
        const userdata = {
          uid,
        };
        console.log(userdata);
        const res = await axios.post("pokemon/myPokemons", userdata);
        console.log(res.data);
        console.log("hiiii");
        var temp = [];
        for (var i = 0; i < res.data.length; i++)
        {
          const currId = res.data[i];
          const data = {
            currId,
          }
          const result = await axios.post("pokemon/getMyPokemons", data);
          console.log(result.data);
          temp.push(result.data);
          // console.log(temp, result.data);
        }
        console.log("temp ", temp);
        setPokemons(temp);
        
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
          <h1>My Pokemons</h1>

          {pokemons && pokemons.map((item) => (
            <MyListItems item={item} key={item._id} />
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

export default My_Pokemons;
