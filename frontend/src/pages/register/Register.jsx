import { useForm } from "react-hook-form";
import "./register.css";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const { register, handleSubmit, reset } = useForm();

  // const [profileImageBase64, setProfileImageBase64] = useState("");

  // const [coverImageBase64, setCoverImageBase64] = useState("");

  // const handleProfilePictureChange = (data) => {
  //   const file = data.profilePicture;

  //   if (!file) return;

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     const base64String = reader.result.split(",")[1];
  //     console.log("BASE64:", base64String);
  //     setProfileImageBase64(base64String);
  //   };

  //   reader.readAsDataURL(file);
  // };

  // const handleCoverPictureChange = (data) => {
  //   const file = data.coverPicture;

  //   if (!file) return;

  //   const reader = new FileReader();
  //   // const reader = data.coverPicture;
  //   reader.onload = () => {
  //     const base64String = reader.result.split(",")[1];
  //     setCoverImageBase64(base64String);
  //   };

  //   reader.readAsDataURL(file);
  // };

  const handleRegister = async (data) => {
    //getting profile picture file and converting to base64
    const file = data.profilePicture[0];
    let profilePicture = "";
    if (file) {
      profilePicture = await new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
          //  const base64String = reader.result.split(",")[1];
          //   setProfileImageBase64(base64String);
        };

        reader.readAsDataURL(file);
      });
    }

    const file1 = data.coverPicture[0];
    let coverPicture = "";
    if (file1) {
      coverPicture = await new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
          // const base64String = reader.result.split(",")[1];
          // setCoverImageBase64(base64String);
        };

        reader.readAsDataURL(file1);
      });
    }

    // console.log("COVER:", coverPicture);

    try {
      const newData = {
        username: data.username,
        email: data.email,
        password: data.password,
        profilePicture,
        coverPicture,
        desc: data.desc,
        city: data.city,
        from: data.from,
      };

      // console.log(newData);
      // REACT_APP_API_URL=process.env.REACT_APP_API_URL
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        newData,
      );

      if (response.status === 200) {
        // console.log(response.data);
        window.location.replace("/login");
      }
    } catch (error) {
      console.log("ERR:", error);
    }

    // console.log(data);
    //  return null;
    // reset();
  };

  const login = () => {
    window.location.replace("/login");
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
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
                // name="username"
                placeholder="Username"
                className="loginInput"
                {...register("username")}
              />
              <input
                // name="email"
                type="email"
                placeholder="Email"
                className="loginInput"
                {...register("email")}
              />
              <input
                // name="password"
                placeholder="Password"
                className="loginInput"
                {...register("password")}
              />
              <input
                // name="password_again"
                placeholder="Password Again"
                className="loginInput"
                {...register("password_again")}
              />
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                // name="profilePicture"
                // placeholder="Profile Picture"
                className="loginInput"
                type="file"
                accept="image/*"
                // onChange={handleProfilePictureChange}
                {...register("profilePicture")}
              />
              <label htmlFor="coverPicture">Cover Picture</label>
              <input
                name="coverPicture"
                // placeholder="Cover Picture"
                className="loginInput"
                type="file"
                accept="image/*"
                // onChange={handleCoverPictureChange}
                {...register("coverPicture")}
              />
              <input
                // name="desc"
                placeholder="Description"
                className="loginInput"
                {...register("desc")}
              />
              <input
                // name="city"
                placeholder="City"
                className="loginInput"
                {...register("city")}
              />
              <input
                // name="from"
                placeholder="From"
                className="loginInput"
                {...register("from")}
              />
              <button type="submit" className="loginButton">
                Sign Up
              </button>
              <button
                onClick={login}
                type="button"
                className="loginRegisterButton"
              >
                Login into Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
