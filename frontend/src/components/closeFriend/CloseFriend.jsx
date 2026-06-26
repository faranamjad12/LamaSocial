import "./closeFriend.css";

const CloseFriend=({ index, user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={PF + "/person/" + `${index+1}.jpeg`}
        alt=""
      />
      {/* src={PF + `/person/` + `${key}.jpeg`} alt="" /> */}
      {/*  user.profilePicture} alt="" /> */}
      <span className="sidebarFriendName">{user?.username}</span>
    </li>
  );
}

export default CloseFriend;