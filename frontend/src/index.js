import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";
import AuthContext from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Toaster
      toastOptions={{
        style: {
          maxWidth: "500px",
        },
      }}
      containerStyle={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>,
  document.getElementById("root"),
);
