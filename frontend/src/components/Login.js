import React from "react";
import { useState } from "react";
import "../styles/AuthStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./userStyles.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  // const [data, setdata] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  // const handleChange = ({ currentTarget: input }) => {
  //   setdata({ ...data, [input.name]: input.value });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = { email, password };
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.post(
        "api/auth",
        formdata,
        config
      );
      // alert(res.data.message);
      console.log(res);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      alert("Login Successful");

      navigate("/");
      // setLoginUser(res.data); // unclear where this function comes from
      // Navigate("/"); // unclear where this function comes from
    } catch (error) {
       alert(`${error.response.data.message}`);
      console.log(error);
    }
  };

  return (
    <div className="login_box">
      <div className="login_form">
        <div className="lleft">
          <form className="login_form_container" onSubmit={handleSubmit}>
            <h2> Welcome Back </h2>

            <input
              type="email" // corrected typo from "enail" to "email"
              placeholder="Enter your Email"
              name="email"
              value={email}
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="linput"
            />
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={password}
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="linput"
            />
            <button type="submit" className="submit_btn">
              Login
            </button>
          </form>
        </div>
        <div className="lright">
          <h2>Pokenmon Adoption App</h2>
          <Link to="/signup">
            <button type="button" className="reg_btn">
              New Here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
