import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/sidebar.css";
import "./styles/login.css";
import "./styles/dashboard.css";
import "./styles/chat.css";
import "./styles/notification.css";
import "./styles/modal.css";
import "./styles/responsive.css";
import "./styles/skeleton.css";

import App from "./App";

import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";

import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);