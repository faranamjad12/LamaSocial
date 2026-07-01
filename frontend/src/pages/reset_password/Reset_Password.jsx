import React from "react";
import axios from "axios";
import "./reset_password.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import { toast } from "react-hot-toast";

// export default function Login() {
const Reset_Password = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // const { user, login } = useAuth();

  // const handleLogin = async (data) => {
  //   // console.log(process.env.REACT_APP_API_URL);

  //   // e.preventDefault();

  //   const res = await axios.post(
  //     `${process.env.REACT_APP_API_URL}/auth/login`,
  //     {
  //       email: data.email,
  //       password: data.password,
  //     },
  //   );
  //   // console.log(res.data);
  //   localStorage.setItem("userToken", res.data.token);
  //   localStorage.setItem("USER", JSON.stringify(res.data));

  //   const user_Data = JSON.parse(localStorage.getItem("USER"));
  //   delete user_Data.token;
  //   delete user_Data.user.password;
  //   delete user_Data.user.coverPicture;
  //   delete user_Data.user.followers;
  //   delete user_Data.user.followings;
  //   delete user_Data.user.isAdmin;
  //   delete user_Data.user.desc;
  //   delete user_Data.user.city;
  //   delete user_Data.user.from;
  //   delete user_Data.user.relationship;
  //   delete user_Data.user.createdAt;
  //   delete user_Data.user.updatedAt;

  //   localStorage.setItem("USER", JSON.stringify(user_Data));

  //   login(
  //     localStorage.getItem("userToken"),
  //     JSON.parse(localStorage.getItem("USER")).user,
  //   );
  //   // console.log(userData);
  //   navigate("/home");
  //   // reset();
  // };

  // const handleClick = () => {
  //   navigate("/register");
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("USER");
  // };

  const handleResetPassword = async (data) => {
    try {
      const email = localStorage.getItem("useremail");
      data.email = email;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/reset-password`,
        data,
      );
      //   console.log(response.data);
      if (response.data.status == true) {
        toast.success(response.data.message);
        // localStorage.setItem("usertoken", response.data.token);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Network error occurred");
      console.log("ERR:", error);
    }
  };

  return (
    <AuthLayout
      children={
        <form onSubmit={handleSubmit(handleResetPassword)}>
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
                  {/* <input
                    placeholder="Email"
                    className="loginInput"
                    {...register("email")}
                  /> */}
                  <p className="text-center text-xl">Reset Your Password?</p>
                  <br></br>
                  <p className="text-center text-lg">
                    Enter the OTP and your new Password
                  </p>
                  <input
                    // width="w-full"
                    // className={"w-full"}
                    type="text"
                    placeholder="Enter your given otp"
                    className="loginInput"
                    {...register("otp")}
                  />

                  <input
                    // width="w-full"
                    // className={"w-full"}
                    type="password"
                    placeholder="Enter your new password"
                    className="loginInput"
                    {...register("newPassword")}
                  />

                  <button type="submit" className="loginButton">
                    Reset Password
                  </button>

                  {/* <span className="loginForgot">
                    <Link to={"/forgot-password"}>Forgot Password?</Link>
                  </span> */}

                  {/* <button
                    type="button"
                    className="loginRegisterButton"
                    onClick={handleClick}
                  >
                    Create a New Account
                  </button> */}

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

export default Reset_Password;
