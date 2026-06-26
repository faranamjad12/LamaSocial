import { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const userData = JSON.parse(localStorage.getItem("USER"));
  const user = userData?.user;
  // console.log(user?._id);
  // console.log(user._id);
  //     return null;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/post/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  // const res = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/posts`,
  //       {
  //         userId: "6a14a8197ebf8c962a9cc158",
  //       },
  //     );

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed posts={posts} />
        <Rightbar />
      </div>
    </>
  );
}
