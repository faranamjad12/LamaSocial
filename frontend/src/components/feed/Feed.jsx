// import { Posts } from "../../dummyData";
// import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import User from "../user/User";

// import dotenv from "dotenv";
// dotenv.config();

export default function Feed({ posts }) {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/posts/6a14a8197ebf8c962a9cc158`,
  //     );

  //     setPosts(res.data);
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <div className="feed">
      {/* <input type="text" onChange={e=>setText(e.target.value)} /> */}
      <div className="feedWrapper">
        <Share />
        {posts.map((p, i) => {
          return(
          // <>
            <div key={i}>
              <Post post={p} />
            </div>
          // </>
        )})}
        {/* <Post post={posts} /> */}
      </div>
    </div>
  );
}
