import { useContext } from "react";

import {
  ThemeContext
} from "../context/ThemeContext";

function ThemeToggle() {

  const {
    theme,
    toggleTheme
  } = useContext(
    ThemeContext
  );

  return (
    <button
      className="btn btn-light"
      onClick={toggleTheme}
    >
      {
        theme === "light"
        ? "🌙 Dark"
        : "☀️ Light"
      }
    </button>
  );
}

export default ThemeToggle;