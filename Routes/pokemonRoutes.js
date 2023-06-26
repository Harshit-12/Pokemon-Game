const express = require("express");
const pokemon = require("../models/pokemon");
const adoptedPokemons = require("../models/adoptedPokemons");
const { User } = require("../models/users");
const mongoose = require("mongoose");
const db = mongoose.connection;
// const { User } = require("../models/users");
const router = express.Router();

// @route GET /pokemon
// @description All pokemons
// @acess PUBLIC
router.get("/", async (req, res) => {
  try {
    const Allpokemons = await pokemon.find();
    return res.json(Allpokemons);
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});


// @route GET /pokemon/adoptedPokemons
// @description Adopted Pokemons
// @acess PUBLIC
router.get("/adoptedPokemons", async (req, res) => {
  try {
    const Adoptedpokemons = await adoptedPokemons.find();
    return res.json(Adoptedpokemons);
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});

// @route POST pokemon/myPokemons
// @description My Pokemons
// @acess PUBLIC

router.post("/myPokemons", async (req, res) => {
  try {
    // console.log("pooookemon");
    console.log("request body", req.body);
    const uid = req.body.uid;
    const userData = await User.findOne({ _id: uid });
    // console.log(userData);
    const myPokemons = userData.pokemonList;
    console.log(myPokemons);
    return res.json(myPokemons);
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});


// @route POST pokemon/gwtMyPokemons
// @description Get My Pokemons
// @acess PUBLIC
router.post("/getMyPokemons", async (req, res) => {
  try {
    const id = req.body.currId;
    const result = await adoptedPokemons.findOne(
      { _id: id }
    )
    // console.log(result);
    return res.json(result)
  } catch (error) {
    console.log(error);
  }
  
});

// @route POST pokemon/feed
// @description Feed Pokemons
// @acess PUBLIC
router.put("/feed", async (req, res) => {
  try {
    const adoptId = req.body.currId;
    const alreadyFeeded = await adoptedPokemons.findOne({
      $and:[{_id: adoptId},{isFeeded:true}]
    });
    if (alreadyFeeded)
    {
       return res.status(409).send({ message: "Pokemon Already Feeded" });
    }

    await adoptedPokemons.updateOne(
      { _id: adoptId },
      {
        $set: {
          isFeeded: true,
        },
      }
    )
    res.status(200).send({msg : "Feeded"})
  } catch (error) {
    console.log(error);
  }
})

// @route POST /pokemon
// @description Add pokemon
// @acess PUBLIC
router.post("/", async (req, res) => {
  var { name, type, breed, age,  } = req.body;
  try {
    const newPokemon = new pokemon({
      name,
      type,
      breed,
      age,
    });

    const pokemonName = await pokemon.findOne({
      name:req.body.name
    })
    if (pokemonName)
    {
       return res.status(409).send({ message: "Pokemon Already Added" });
    }
    console.log(newPokemon);
    await newPokemon.save();

    return res.json({ msg: "Data Saved succesfully" });
    console.log("Data Saved succesfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
});


// @route POST pokemon/adopt
// @description Adopt Pokemons
// @acess PUBLIC
router.post("/adopt", async (req, res) => {
  var { name, type, breed, age, healthStatus, uid } = req.body;
  try {
    // console.log(req.body.uid);
    const pokemonName= await adoptedPokemons.findOne(
      {$and: [{name: req.body.name},{owner: req.body.uid}]});
    if (pokemonName)
    {
      return res.status(409).send({ message: "Pokemon Already Adopted" });
    }
    const owner = req.body.uid;
    const newAdoptedPokemons = new adoptedPokemons({
      name,
      type,
      breed,
      age,
      healthStatus,
      owner,
    });
    const result = await newAdoptedPokemons.save();
     await User.updateOne(
          { _id: uid },
          {
            $push: {
              pokemonList: result._id,
            },
          }
        );
       
    console.log(result);
    return res.json({ msg: "Pokemon Adopted Succesfully" });
    console.log("Pokemon Adopted Succesfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
