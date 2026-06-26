import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import Download from "../download/Download";

const SinglePost = () => {
  const userData = JSON.parse(localStorage.getItem("USER"));
  const user = userData?.user;
  // console.log(user);
  const { id } = useParams();
  // console.log(id);

  const download_QR = () => {
    const canvas = document.querySelector("canvas");

    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.download = "image-qr.png";
    link.href = url;
    link.click();
  };

  const copyLink = (image_name) => {
    const downloadUrl = `${process.env.REACT_APP_API_URL}/posts/image/download/${image_name}`;
    navigator.clipboard.writeText(downloadUrl);
    alert("Link copied!");
  };

  function handleShareQR({ image_name }) {
    //   const URL =`${downloadQRUrl}/${image_name}`;
    const downloadQR = `${process.env.REACT_APP_API_URL}/posts/image/download/${image_name}`;

    //   return (
    //     <div>
    //       <QRCodeCanvas
    //         value={downloadUrl}
    //         size={200}
    //       />

    //       <p>{downloadUrl}</p>
    //     </div>
    //   );
  }

  const handleShareUrl = ({ image_name }) => {
    // const URL =`${downloadLink}/${image_name}`;
    const downloadLink = `${process.env.REACT_APP_API_URL}/posts/image/download/${image_name}`;
  };

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    const getPost = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts/post_details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          },
        );
        // console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log("ERR:", err);
      }
    };

    getPost();
  }, [id]);

  // if (!post)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        {/* <a href="https://www.example.com"> */}
        {post?.img && (
          <img
            src={`data:image/jpeg;base64,${post.img}`}
            alt=""
            //   className="w-full h-full object-cover"
            //   className="w-full max-h-[90vh] object-contain"
            className="mx-auto max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-cover"
          />
        )}
        {/* </a> */}

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold">Post Details</h1>

          <p className="mt-2 text-white/80">
            {new Date(post?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto -mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Author */}
          <div className="p-8 border-b">
            <div className="flex items-center gap-4">
              <img
                src={`data:image/jpeg;base64,${user?.profilePicture}`}
                alt=""
                className="w-14 h-14 rounded-full object-cover border"
              />

              <div>
                <h3 className="font-bold text-lg">{post?.user?.username}</h3>

                <p className="text-gray-500 text-sm">
                  Posted on {new Date(post?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {post?.desc}
            </p>
          </div>

          {/* Stats */}
          <div className="px-8 py-5 border-t border-b">
            <div className="flex justify-between items-center">
              <div className="flex gap-8">
                <button className="flex items-center gap-2 text-red-500 hover:scale-110 transition">
                  <Heart size={22} />
                  <span>{post?.likes?.length || 0}</span>
                </button>

                <button className="flex items-center gap-2 text-blue-500 hover:scale-110 transition">
                  <MessageCircle size={22} />
                  <span>{post?.comment || 0}</span>
                </button>

                <button
                  onClick={() => {
                    handleShareUrl(post?.desc);
                    copyLink(post?.desc);
                  }}
                  className="flex items-center gap-2 text-green-500 hover:scale-110 transition"
                >
                  <Share2 size={22} />
                  Share URL
                </button>

                {/* <button onClick={() => handleShareQR(post.desc)} className="flex items-center gap-2 text-green-500 hover:scale-110 transition">
                  <Share2 size={22} />
                  Share QR Code
                              </button> */}

                {/* <button
                  type="button"
                  onClick={() => handleShareQR(post?.desc)}
                > */}

                <Download image_name={post?.desc} />
                {/* <div>
                      Check QR
                    </div> */}
                {/* </Download> */}
                {/* </button> */}
                <button type="button" onClick={download_QR}>
                  Download QR Code
                </button>
              </div>

              <Bookmark
                className="cursor-pointer hover:scale-110 transition"
                size={22}
              />
            </div>
          </div>

          {/* Comments Area */}
          <div className="p-8">
            <h2 className="font-bold text-xl mb-6">Comments</h2>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="font-semibold">Username</p>

                <p className="text-gray-600 mt-1">Great post 👏</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="font-semibold">Another User</p>

                <p className="text-gray-600 mt-1">Amazing content 🔥</p>
              </div>
            </div>

            {/* Add Comment */}
            <div className="mt-8">
              <textarea
                placeholder="Write a comment..."
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                rows={4}
              />

              <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
