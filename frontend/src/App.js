import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Add_Pokemon from "./components/Add_Pokemon";
import All_Pokemons from "./components/All_Pokemons";
import My_Pokemons from "./components/My_Pokemons";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<All_Pokemons />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addPokemon" element={<Add_Pokemon />} />
          <Route path="/myPokemons" element={<My_Pokemons />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
