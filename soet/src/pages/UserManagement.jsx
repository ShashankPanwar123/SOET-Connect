import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import userService from "../services/userService";
import UserTable from "../components/UserTable";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Registration form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name.trim() || !email.trim() || !password.trim()) {
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
      setRegistering(true);
      await userService.createUser(formData);
      alert("User registered successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "student",
      });
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to register user. Make sure user email is unique.");
    } finally {
      setRegistering(false);
    }
  };

  // Perform client-side searching and filtering
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <h2>User Management Console</h2>

          <div className="row mt-4">
            {/* Registration Form Component */}
            <div className="col-md-4">
              <div className="dashboard-card">
                <h4>Register New User</h4>
                <form onSubmit={handleRegisterUser} className="mt-3">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., John Doe"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@soet.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min 6 characters"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={registering}>
                    {registering ? "Registering..." : "Register User"}
                  </button>
                </form>
              </div>
            </div>

            {/* Registered Users Table */}
            <div className="col-md-8">
              <div className="dashboard-card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>Registered Users</h4>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ width: "200px" }}
                    />
                    <select
                      className="form-select form-select-sm"
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      style={{ width: "120px" }}
                    >
                      <option value="all">All Roles</option>
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <UserTable users={filteredUsers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManagement;