import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login(form);
      login(response.token, response.user);

      if (response.user.role === "student") {
        navigate("/student-dashboard");
      } else if (response.user.role === "faculty") {
        navigate("/faculty-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      alert("Invalid Credentials. Please check your email, password, and role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={submitHandler}>

        <div className="login-brand">
          <span className="brand-icon">🎓</span>
          <h2>SOET Connect</h2>
          <p className="subtitle">AI-Powered College Portal — Sign in to continue</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="you@college.edu"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Login As</label>
          <select
            name="role"
            className="form-select"
            value={form.role}
            onChange={handleChange}
          >
            <option value="student">🎓 Student</option>
            <option value="faculty">📚 Faculty</option>
            <option value="admin">⚙️ Administrator</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Signing in...
            </span>
          ) : (
            "Sign In →"
          )}
        </button>

      </form>
    </div>
  );
}

export default Login;