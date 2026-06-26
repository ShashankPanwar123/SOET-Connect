const CARD_THEMES = {
  "Total Students": { icon: "🎓", gradient: "linear-gradient(135deg, #4f46e5, #6366f1)", light: "rgba(79,70,229,0.08)" },
  "Total Faculty":  { icon: "📚", gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)", light: "rgba(14,165,233,0.08)" },
  "Total Active Notices": { icon: "📢", gradient: "linear-gradient(135deg, #10b981, #34d399)", light: "rgba(16,185,129,0.08)" },
  // Fallback
  default: { icon: "📊", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)", light: "rgba(245,158,11,0.08)" },
};

function AnalyticsCard({ title, value }) {
  const theme = CARD_THEMES[title] || CARD_THEMES.default;

  return (
    <div
      className="analytics-card"
      style={{ background: theme.light, borderColor: "transparent", textAlign: "left", padding: "24px" }}
    >
      <div style={{
        width: "48px", height: "48px",
        borderRadius: "12px",
        background: theme.gradient,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px",
        marginBottom: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}>
        {theme.icon}
      </div>
      <p style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", marginBottom: "6px" }}>
        {title}
      </p>
      <h2 style={{ fontSize: "38px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-1.5px" }}>
        {value}
      </h2>
    </div>
  );
}

export default AnalyticsCard;