import axios from "axios";
import React, { useEffect, useState } from "react";

const User = () => {
  const userData = JSON.parse(localStorage.getItem("USER"));
  // console.log("USER:", userData);
  // return(null);
  const userId = userData?.user;
  // console.log(userId?._id);
  const [user, setUser] = useState(null);

  useEffect(() => {

    if (!userId?._id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${userId._id}`,
        );

        setUser(res.data);
      } catch (err) {
        console.error(err);
      };

      fetchUser();
    }
  }, [userId?._id]);
  // console.log(user);
  return (
    <>
    {userId?.profilePicture && (
      <img
        className="postProfileImg"
        src={`data:image/jpeg;base64,${userId.profilePicture}`}
        alt=""
      />
    )}
  </>
  );
};

export default User;
