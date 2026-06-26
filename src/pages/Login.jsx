import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";

import "../styles/login.css";

function Login() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      email: "",
      password: "",
      role: "student"
    });

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await authService.login(
            form
          );

        login(
          response.token,
          response.user
        );

        if (
          response.user.role ===
          "student"
        ) {
          navigate(
            "/student-dashboard"
          );
        }
        else if (
          response.user.role ===
          "faculty"
        ) {
          navigate(
            "/faculty-dashboard"
          );
        }
        else {
          navigate(
            "/admin-dashboard"
          );
        }

      } catch {

        alert(
          "Invalid Credentials"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="login-container">

      <form
        className="login-card"
        onSubmit={submitHandler}
      >

        <h2>Login</h2>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <select
          className="form-select mb-3"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value
            })
          }
        >

          <option value="student">
            Student
          </option>

          <option value="faculty">
            Faculty
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button
          className="btn btn-primary w-100"
        >
          {
            loading
              ? "Loading..."
              : "Login"
          }
        </button>

      </form>
    </div>
  );
}

export default Login;