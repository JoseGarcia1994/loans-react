const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 18) return "Buenas tardes";
  return "Buenas noches";
};

export function DashboardNavbar({ title = "Dashboard", subtitle = "", userName = "" }) {
  const initials = getInitials(userName);
  const greeting = getGreeting();
  const displayName = userName || "Usuario";

  return (
    <header style={{
      height: "64px",
      background: "rgba(255,255,255,0.03)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>

      {/* Izquierda — título de la página */}
      <div>
        <h1 style={{ color: "white", fontSize: "1rem", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.75rem", margin: 0 }}>{subtitle}</p>
        )}
      </div>

      {/* Derecha */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {/* Botón nuevo préstamo */}
        <a
          href="/create-loan"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "linear-gradient(135deg, #4ade80, #22d3ee)",
            color: "#052e16", padding: "7px 14px", borderRadius: "9px",
            fontWeight: 700, fontSize: "0.82rem", textDecoration: "none",
            boxShadow: "0 4px 16px rgba(74,222,128,0.28)",
            transition: "opacity 0.15s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Nuevo préstamo
        </a>

        {/* Divisor */}
        <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.08)" }} />

        {/* User info */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", margin: 0, letterSpacing: "0.02em" }}>
              {greeting}
            </p>
            <p style={{ color: "white", fontSize: "0.85rem", fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>
              {displayName}
            </p>
          </div>

          {/* Avatar con iniciales */}
          <div style={{ position: "relative" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, #4ade80, #22d3ee)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
              boxShadow: "0 0 0 2px rgba(74,222,128,0.25), 0 4px 12px rgba(0,0,0,0.3)",
              fontWeight: 800, fontSize: "0.78rem", color: "#052e16",
              letterSpacing: "0.02em",
            }}>
              {initials}
            </div>
            {/* Dot activo */}
            <div style={{
              position: "absolute", bottom: "1px", right: "1px",
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#4ade80",
              border: "2px solid rgba(15,32,39,0.9)",
            }} />
          </div>
        </div>
      </div>
    </header>
  );
}
