// import { ContactsOutlined, MoreVert } from "@material-ui/icons";
// import "./post.css";
// import { Users } from "../../dummyData";
import react, { useState } from "react";
import axios from "axios";
import User from "../user/User";
import "./post.css";
import { MdDelete, MdEdit } from "react-icons/md";
// import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import tailwindcss from "tailwindcss";
import "../share/share.css";
import toast from "react-hot-toast";
import SinglePost from "../singlepost/SinglePost";
// import SinglePost from "../singlepost/singlepost";
// import toast from 'react-hot-toast';
// {
/* <SinglePost /> */
// }
// export default function

const Post = ({ post }) => {
  const { register, handleSubmit, reset } = useForm();

  const userData = JSON.parse(localStorage.getItem("USER"));
  const user = userData?.user;
  // console.log(user._id);
  // return null;

  const [file, setFile] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const handleFileChange = (e) => {
  //     setFile(e.target.files[0]);
  //   };

  const handleUpdate = async (data) => {
    // e.preventDefault();
    // console.log(data);
    // return null;
    // Submit data to your Express API here

    const file1 = file;
    let img = "";
    if (file1) {
      img = await new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
          //  const base64String = reader.result.split(",")[1];
          //   setProfileImageBase64(base64String);
        };

        reader.readAsDataURL(file1);
      });
    }

    // console.log(data);
    // console.log("IMG:", img);
    // console.log("Update Form submitted");

    try {
      const newData = {
        userId: user?._id,
        desc: data.desc,
        // img,
        likes: [],
      };
      // console.log(post._id);

      if (file1) {
        newData.img = img;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/posts/${post?._id}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      if (response.status === 200) {
        // console.log(response.data);
        window.location.replace("/home");
      }
    } catch (error) {
      console.log("ERR:", error);
    }

    setShowUpdateModal(false);
  };

  const handleDelete = async () =>{
     
      // e.preventDefault();
      // console.log(user?._id);
      // Submit data to your Express API here
      try {
        //   const data = {
        //     userId: user?._id,
        //   };

        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/posts/delete/${post?._id}`,
          // {
          //   data,
          //   // : { userId: user?._id }
          // },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          },
        );

        if (response.status === 200) {
          // console.log(response.data);

          // Dismiss the active toast immediately
          // toast.dismiss(toastId);

          // Execute your destructive action here
          toast.success("Post successfully deleted!");

          

          window.location.replace("/home");
        }
      } catch (error) {
        console.log("ERR:", error);
      }

      setShowDeleteModal(false);
    };

  const showConfirmationAlert = (toastId) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            background: "#fff",
            padding: "16px",
          }}
        >
          <div className="flex-1/2">
            <p style={{ margin: 0, fontWeight: "bold", color: "#1a202c" }}>
              Are you absolutely sure?
            </p>
            <p
              style={{
                margin: "4px 0 12px 0",
                fontSize: "14px",
                color: "#4a5568",
              }}
            >
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
              {/* Cancel Button */}
              <button
                onClick={() => toast.dismiss(t.id)}
                type="button"
                style={{
                  background: "#edf2f7",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              {/* Action / Confirm Button */}
              <button
                onClick={() => {
                  handleDelete(t.id);
                }}
                style={{
                  background: "#e53e3e",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keeps the alert open until the user makes a choice
      },
    );

    return (
      <button
        type="button"
        onClick={() => {
          showConfirmationAlert;
        }}
      >
        Delete
      </button>
    );
  };

  // console.log("Post prop:", post);

  // console.log(post);
  // const user = Users.filter(u=>u.id===1)
  // console.log(user[0].username)

  // Like Functionality with useState Hook
  // toast.success("Hello World");
  // console.log(User);
  // return null;

  // const User = await axios.get("/api/users/6a14a8197ebf8c962a9cc158")
  // console.log(res.data)

  const [like, setLike] = useState(post?.likes || 0);
  const [isLiked, setIsLiked] = useState(true);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    setLike(isLiked ? like + 1 : like - 1);
    setIsLiked(!isLiked);
  };
  // console.log(post);
  // return null;
  // <div>{ <pre>{JSON.stringify(post, null, 2)}</pre> }</div>;
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
             <User /> 
            {/* <img
                        className="postProfileImg"
                        src={User.filter((u)=>u._id === post.userId)[0].profilePicture}
                        alt=""
                    /> */}
            {/* <span className="postUserName">{Users.filter((u)=>u.id === post.userId)[0].username}</span> */}
            <span className="postDate">
              {new Date(post?.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="postTopRight">
            <button
              type="button"
              onClick={() => {
                setShowUpdateModal(true);
              }}
            >
              Update <MdEdit />
            </button>

            {showUpdateModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <div className="flex items-center gap-3 justify-between">
                    <h2>Update Data</h2>
                    <button
                      type="button"
                      onClick={() => setShowUpdateModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(handleUpdate)}>
                    <div className="share">
                      <div className="shareWrapper">
                        <div className="shareTop">
                          {user?.profilePicture && (
                            <img
                              className="shareProfileImg"
                              src={`data:image/jpeg;base64,${user?.profilePicture}`}
                              alt=""
                            />
                          )}
                          <input
                            placeholder={`What's in your mind, ${user?.username}?`}
                            className="shareInput"
                            {...register("desc")}
                          />
                        </div>

                        <hr className="shareHr" />
                        <div className="shareBottom">
                          <div className="shareOptions">
                            <div className="shareOption">
                              <PermMedia
                                htmlColor="tomato"
                                className="shareIcon"
                              />
                              <label htmlFor="file_del" className="shareOption">
                                <span className="shareOptionText">
                                  Photo or Video
                                </span>
                              </label>
                              <input
                                id="file_del"
                                // name="image"
                                className="shareOptionText"
                                type="file"
                                // accept=".png,.jpg,.jpeg"
                                accept="image/*"
                                // placeholder="Photo or Video"
                                style={{ display: "none" }}
                                // onChange={handleFileChange}
                                onChange={(e) => setFile(e.target.files[0])}
                                // {...register("image")}
                                // {...register("image")}
                              />

                              {/* {file && (
                      <div>
                        <p>Selected: {file.name}</p>
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          width="200"
                        />
                      </div>
                    )} */}

                              {/* <img className="shareOptionText" src={`data:image/jpeg;base64,${user.profilePicture}`} alt="" />   */}
                            </div>
                            <div className="shareOption">
                              <Label htmlColor="blue" className="shareIcon" />
                              <span className="shareOptionText">Tag</span>
                            </div>
                            <div className="shareOption">
                              <Room htmlColor="green" className="shareIcon" />
                              <span className="shareOptionText">Location</span>
                            </div>
                            <div className="shareOption">
                              <EmojiEmotions
                                htmlColor="goldenrod"
                                className="shareIcon"
                              />
                              <span className="shareOptionText">Feelings</span>
                            </div>
                          </div>
                          <button
                            type="submit"
                            onClick={() => {
                              setShowUpdateModal(true);
                            }}
                            className="shareButton"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <br></br>

            <button
              type="button"
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              Delete <MdDelete />
            </button>

            {showDeleteModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <div className="flex items-center gap-3 justify-between">
                    {/* <h2>Delete Data</h2> */}
                    <button type="button" onClick={showConfirmationAlert}>
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                  </div>

                  {/* <form onSubmit={handleSubmit(handleDelete)}>
                    <div className="share">
                      <div className="shareWrapper">
                        <div className="shareTop">
                          <img
                            className="shareProfileImg"
                            src={`data:image/jpeg;base64,${user.profilePicture}`}
                            alt=""
                          />
                          <input
                            placeholder={`What's in your mind, ${user.username}?`}
                            className="shareInput"
                            {...register("desc")}
                          />
                        </div>
                        <hr className="shareHr" />
                        <div className="shareBottom">
                          <div className="shareOptions">
                            <div className="shareOption">
                              <PermMedia
                                htmlColor="tomato"
                                className="shareIcon"
                              />
                              <label htmlFor="file" className="shareOption">
                                <span className="shareOptionText">
                                  Photo or Video
                                </span>
                              </label>
                              <input
                                id="file"
                                // name="image"
                                className="shareOptionText"
                                type="file"
                                // accept=".png,.jpg,.jpeg"
                                accept="image/*"
                                // placeholder="Photo or Video"
                                style={{ display: "none" }}
                                // onChange={handleFileChange}
                                onChange={(e) => setFile(e.target.files[0])}
                                // {...register("image")}
                                // {...register("image")}
                              />

                              

                              <img className="shareOptionText" src={`data:image/jpeg;base64,${user.profilePicture}`} alt="" />  
                            </div>
                            <div className="shareOption">
                              <Label htmlColor="blue" className="shareIcon" />
                              <span className="shareOptionText">Tag</span>
                            </div>
                            <div className="shareOption">
                              <Room htmlColor="green" className="shareIcon" />
                              <span className="shareOptionText">Location</span>
                            </div>
                            <div className="shareOption">
                              <EmojiEmotions
                                htmlColor="goldenrod"
                                className="shareIcon"
                              />
                              <span className="shareOptionText">Feelings</span>
                            </div>
                          </div>
                          <button
                            type="submit"
                            onClick={() => setShowDeleteModal(true)}
                            className="shareButton"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </form> */}
                </div>
              </div>
            )}

            {/* <button
              type="button"
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              Delete <MdDelete />
            </button> */}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {/* <img className="postImg" src={PF + post?.img} alt="" /> */}
          {/* <Link to={`${process.env.REACT_APP_UI_UR}/posts/post/${post?._id}`}> */}
          {/* <SinglePost image_name={post?.desc}> */}

          <Link to={`/post/${post?._id}`}>
            <img
              className="postImg"
              src={`data:image/jpeg;base64,${post?.img}`}
              alt=""
            />
          </Link>

          {/* <img
              className="postImg"
              src={`data:image/jpeg;base64,${post?.img}`}
              alt=""
            /> */}

          {/* {console.log(post?._id)} */}
          {/* </SinglePost> */}
          {/* </Link> */}
          {/* <img className="postImg" src={post.img} alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}/like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}/heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
// export default showConfirmationAlert;
