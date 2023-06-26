const mongoose = require("mongoose");

const AdoptedPokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  healthStatus: {
    type: Number,
    default: 100,
  },
  isFeeded: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
});

module.exports = AdoptedPokemon = mongoose.model(
  "AdoptedPokemon",
  AdoptedPokemonSchema
);
