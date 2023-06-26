const router = require("express").Router();
const mongoose = require("mongoose");
const pokemon = require("../models/pokemon");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");


// @route POST /api/users
// @description Create New User
// @acess PUBLIC
router.post("/", async (req, res) => {
  try {
    const { name, email} = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "User already exist" });
    }
    const salt = bcrypt.genSalt(Number(process.env.SALT));
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name,
      email,
      password,
    });
    console.log(newUser);
    console.log("hi");
    const result= await newUser.save();
    console.log(result.data);
    res.status(200).send({ message: "User created successfully." });
    console.log("Registration Successfull");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "User Already Exist" });
  }
});


// @route GET /api/users
// @description Get All User Details
// @acess PUBLIC
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server Error" });
  }
});


// @route PUT /api/users
// @description Update User's Pokemon Lisst
// @acess PUBLIC
router.put("/", async (req, res) => {
  // var pid = req.params.id;
  const { uid, pid } = req.body;
  console.log(pid, uid);
  console.log("hi");
  try {
    const pmid = new mongoose.Types.ObjectId(pid);
    console.log(pmid);
    const doc = await User.findOne({
      pokemonList: pmid,
    });
    if (doc) {
      console.log("Exists");
      return res.status(400).send("Already Exists");
    } else {
      try {
        await User.updateOne(
          { _id: uid },
          {
            $push: {
              pokemonList: pmid,
            },
          }
        );
        return res.status(200).send("Added Successfully");
      } catch (error) {
        console.log(error);
      }
    }
    
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
