const mongoose = require("mongoose");
require("dotenv").config();

// const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
      await mongoose.connect(
        "mongodb+srv://harshitcoder7:code123@cluster0.ikpyqsx.mongodb.net/?retryWrites=true&w=majority",
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        }
      );
      
    console.log("DB connected...");
  } catch (err) {
    console.error(err.message);
    console.log("1111");
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;