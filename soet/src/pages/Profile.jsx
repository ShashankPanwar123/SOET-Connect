import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ROLE_COLORS = {
  student: { bg: "rgba(16,185,129,0.1)", text: "#10b981", label: "Student" },
  faculty: { bg: "rgba(79,70,229,0.1)", text: "#4f46e5", label: "Faculty" },
  admin:   { bg: "rgba(239,68,68,0.1)",  text: "#ef4444", label: "Administrator" },
};

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const roleStyle = ROLE_COLORS[user?.role] || ROLE_COLORS.student;
  const initials = user?.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "??";

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <h2>My Profile</h2>

          <div className="dashboard-card" style={{ maxWidth: "520px" }}>
            {/* Avatar */}
            <div style={{
              width: "80px", height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4f46e5, #38bdf8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "28px", fontWeight: "800",
              marginBottom: "20px",
            }}>
              {initials}
            </div>

            <h3 style={{ marginBottom: "4px", fontSize: "22px" }}>{user?.name || "—"}</h3>
            <p style={{ color: "#64748b", marginBottom: "16px" }}>{user?.email}</p>

            <span style={{
              background: roleStyle.bg,
              color: roleStyle.text,
              padding: "6px 14px",
              borderRadius: "20px",
              fontWeight: "600",
              fontSize: "13px",
              textTransform: "capitalize",
            }}>
              {roleStyle.label}
            </span>

            <hr style={{ margin: "24px 0", borderColor: "#e2e8f0" }} />

            <div style={{ display: "grid", gap: "12px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1, background: "#f8fafc", borderRadius: "10px", padding: "14px" }}>
                  <p style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Full Name</p>
                  <p style={{ fontWeight: "600", color: "#1e293b" }}>{user?.name}</p>
                </div>
                <div style={{ flex: 1, background: "#f8fafc", borderRadius: "10px", padding: "14px" }}>
                  <p style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Role</p>
                  <p style={{ fontWeight: "600", color: "#1e293b", textTransform: "capitalize" }}>{user?.role}</p>
                </div>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px" }}>
                <p style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Email</p>
                <p style={{ fontWeight: "600", color: "#1e293b" }}>{user?.email}</p>
              </div>
            </div>

            <button className="btn btn-danger mt-4 w-100" onClick={logout}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;