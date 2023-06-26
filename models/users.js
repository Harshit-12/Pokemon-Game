const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pokemonList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdoptedPokemon",
      unique : true,
    },
  ],
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = { User };
