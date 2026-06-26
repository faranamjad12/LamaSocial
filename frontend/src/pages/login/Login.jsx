import axios from "axios";
import "./login.css";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout.jsx";

// export default function Login() {
const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (data) => {
    // console.log(process.env.REACT_APP_API_URL);

    // e.preventDefault();

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        email: data.email,
        password: data.password,
      },
    );
    // console.log(res.data);
    localStorage.setItem("userToken", res.data.token);
    localStorage.setItem("USER", JSON.stringify(res.data));

    const user_Data = JSON.parse(localStorage.getItem("USER"));
    delete user_Data.token;
    delete user_Data.user.password;
    delete user_Data.user.coverPicture;
    delete user_Data.user.followers;
    delete user_Data.user.followings;
    delete user_Data.user.isAdmin;
    delete user_Data.user.desc;
    delete user_Data.user.city;
    delete user_Data.user.from;
    delete user_Data.user.relationship;
    delete user_Data.user.createdAt;
    delete user_Data.user.updatedAt;

    localStorage.setItem("USER", JSON.stringify(user_Data));

    login(
      localStorage.getItem("userToken"),
      JSON.parse(localStorage.getItem("USER")).user,
    );
    // console.log(userData);
    navigate("/home");
    // reset();
  };

  const handleClick = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("USER");
  };

  return (
    <AuthLayout
      children={
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="login">
            <div className="loginWrapper">
              <div className="loginLeft">
                <h3 className="loginLogo">Lamasocial</h3>
                <span className="loginDesc">
                  Connect with friends and the world around you on Lamasocial.
                </span>
              </div>

              <div className="loginRight">
                <div className="loginBox">
                  <input
                    placeholder="Email"
                    className="loginInput"
                    {...register("email")}
                  />
                  <input
                    placeholder="Password"
                    className="loginInput"
                    {...register("password")}
                  />
                  <button type="submit" className="loginButton">
                    Log In
                  </button>

                  <span className="loginForgot">Forgot Password?</span>

                  <button
                    type="button"
                    className="loginRegisterButton"
                    onClick={handleClick}
                  >
                    Create a New Account
                  </button>

                  {/* <Link to={""}>Create a New Account</Link> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    />
  );
};

export default Login;
