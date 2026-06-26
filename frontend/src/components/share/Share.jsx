import { useForm } from "react-hook-form";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";

export default function Share() {
  const userData = JSON.parse(localStorage.getItem("USER"));
  const user = userData?.user;
  const { register, handleSubmit, reset } = useForm();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRegister = async (data) => {
    //getting profile picture file and converting to base64
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
    // console.log("IMG:", img);
    try {
      const newData = {
        userId: user._id,
        desc: data.desc,
        img,
        likes: [],
      };

      console.log(newData);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/create`,
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
  };
  return (
    // <div>hey, it's share</div>
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={`data:image/jpeg;base64,${user?.profilePicture}`}
              alt=""
            />
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
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <label htmlFor="file" className="shareOption">
                  <span className="shareOptionText">Photo or Video</span>
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
                <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button type="submit" className="shareButton">
              Share
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
