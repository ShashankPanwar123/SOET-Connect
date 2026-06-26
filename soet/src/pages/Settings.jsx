import { useContext } from "react";

import {
  ThemeContext
} from "../context/ThemeContext";

function Settings() {

  const {
    theme,
    toggleTheme
  } = useContext(
    ThemeContext
  );

  return (
    <div className="container mt-5">

      <h2>
        Settings
      </h2>

      <p>
        Current Theme:
        {theme}
      </p>

      <button
        className="btn btn-primary"
        onClick={toggleTheme}
      >
        Change Theme
      </button>

    </div>
  );
}

export default Settings;