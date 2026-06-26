import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "72px", marginBottom: "16px" }}>🚫</div>
      <h1 style={{ color: "white", fontSize: "2.5rem", fontWeight: "800", marginBottom: "12px" }}>
        Access Denied
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "400px", marginBottom: "36px", lineHeight: "1.7" }}>
        You do not have permission to access this page. Please return to your dashboard.
      </p>
      <Link
        to="/"
        style={{
          background: "linear-gradient(135deg, #4f46e5, #6366f1)",
          color: "white",
          padding: "12px 32px",
          borderRadius: "10px",
          fontWeight: "600",
          fontSize: "15px",
          boxShadow: "0 4px 20px rgba(79,70,229,0.4)",
          display: "inline-block",
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default AccessDenied;