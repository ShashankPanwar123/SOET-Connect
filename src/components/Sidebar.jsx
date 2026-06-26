import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import "../styles/sidebar.css";

function Sidebar() {

  const { user } =
    useContext(AuthContext);

  return (

    <div className="sidebar">

      <h3>SOET Connect</h3>

      {user?.role === "student" && (
        <>
          <Link to="/student-dashboard">
            Dashboard
          </Link>

          <Link to="/notice-board">
            Notice Board
          </Link>

          <Link to="/chat">
            AI Chatbot
          </Link>

          <Link to="/profile">
            Profile
          </Link>
        </>
      )}

      {user?.role === "faculty" && (
        <>
          <Link to="/faculty-dashboard">
            Dashboard
          </Link>

          <Link to="/notice-board">
            Manage Notices
          </Link>

          <Link to="/profile">
            Profile
          </Link>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <Link to="/admin-dashboard">
            Dashboard
          </Link>

          <Link to="/users">
            Users
          </Link>

          <Link to="/reports">
            Reports
          </Link>

          <Link to="/settings">
            Settings
          </Link>
        </>
      )}

    </div>

  );
}

export default Sidebar;