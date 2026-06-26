import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const ShareImage = ({ image_name }) => {
  const downloadUrl = `${process.env.REACT_APP_API_URL}/posts/image/download/${image_name}`;

  const copyLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    alert("Link copied!");
  };

  const Download_Image = async (image_name) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/image/download/${image_name}`
        // ?t=${Date.now()}
        ,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      //
      // const url = window.URL.createObjectURL(res.data);

      // const a = document.createElement("a");
      // a.href = url;
      // a.download = `${image_name}.jpg`;

      // document.body.appendChild(a);
      // a.click();
      // a.remove();

      // window.URL.revokeObjectURL(url);
      //

      //
// console.log("Blob received:", res.data);

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    // IMPORTANT: give proper filename
    link.download = image_name.replace(/\.$/, "") + ".jpg";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // console.log("Download triggered");
      //

    } catch (err) {
      // console.log("ERR:", err);
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="font-bold text-xl mb-4">Share Image</h2>

      <QRCodeCanvas value={downloadUrl} size={220} />

      <div className="mt-4">
        <input
          readOnly
          value={downloadUrl}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={copyLink}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Copy Link
        </button>

        {/* <a
          href={downloadUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          onclick={
            (e) => {
            e.preventDefault();
            Download_Image(image_name);
            }
          }
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Download Image
        </a> */}

        <button
          type="button"
          onClick={() => Download_Image(image_name)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default ShareImage;
