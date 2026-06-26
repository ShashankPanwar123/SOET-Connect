import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import ThemeToggle from "./ThemeToggle";
import NotificationBell from "./NotificationBell";

import "../styles/navbar.css";

function Navbar() {

  const { logout } =
    useContext(AuthContext);

  return (
    <nav className="navbar-custom">

      <div>
        <Link
          to="/"
          className="logo"
        >
          SOET Connect
        </Link>
      </div>

      <div className="navbar-right">

        <NotificationBell count={5} />

        <ThemeToggle />

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;