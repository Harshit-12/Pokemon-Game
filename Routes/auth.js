const router = require("express").Router();
const { User } = require("../models/users");
// const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
router.post("/", async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error)
    //     req.status(400).send({ message: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    // console.log(user);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      //   console.log(password, user.password);
      //   console.log(match);
      if (match) {
        const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, {
          expiresIn: "7d",
        });
        // console.log(token);
        const response = {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token,
        };

        console.log(response);
        return res.json(response);
      } else {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }
    } else {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    return res.status(401).send({ message: "Invalid Email or Password" });
    console.log(error);
  }
});

// const validate = (data) => {
//   const schema = joi.object({
//     email: joi.string().email().required().label("email"),
//     password: joi.string().required().label("password"),
//   });
//   return schema.validate(data);
// };
module.exports = router;
