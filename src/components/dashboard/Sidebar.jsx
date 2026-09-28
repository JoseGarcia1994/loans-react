import { Link } from "react-router-dom";
import { navItems } from "../../utils/navConfig";
import "./Sidebar.css";

export function Sidebar({
  activePath = "/dashboard",
  collapsed = false,
  onToggle,
}) {
  const setCollapsed = onToggle;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const w = collapsed ? "68px" : "220px";

  return (
    <div
      className="sidebar-float"
      style={{
        "--sb-width": w,
        "--sb-label-opacity": collapsed ? 0 : 1,
        "--sb-label-maxw": collapsed ? "0px" : "140px",
        "--sb-nested-margin": collapsed ? "0" : "18px",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "18px 14px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        {!collapsed && (
          <span
            style={{
              fontWeight: 800,
              fontSize: "0.95rem",
              letterSpacing: "-0.02em",
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            Presta<span style={{ color: "#4ade80" }}>Control</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "9px",
            padding: "6px",
            cursor: "pointer",
            color: "rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginLeft: collapsed ? "auto" : 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            {collapsed ? (
              <path
                d="M2 6h8M6 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M10 6H2M6 2L2 6l4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "12px 8px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          overflowY: "auto",
        }}
      >
        {!collapsed && (
          <p
            style={{
              color: "rgba(255,255,255,0.16)",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "4px 6px 6px",
            }}
          >
            Menú
          </p>
        )}
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`sb-nav-item ${
              activePath === item.href ? "active" : ""
            } ${item.nested ? "nested" : ""}`}
            title={collapsed ? item.label : ""}
          >
            <span style={{ flexShrink: 0 }}>{item.icon}</span>

            <span className="sb-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div
        style={{
          padding: "10px 8px 14px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <button
          onClick={handleLogout}
          className="sb-nav-item"
          style={{
            width: "100%",
            border: "1px solid transparent",
            background: "none",
            textAlign: "left",
          }}
        >
          <span style={{ flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
              <path
                d="M6.75 15.75H3.75a1.5 1.5 0 0 1-1.5-1.5V3.75a1.5 1.5 0 0 1 1.5-1.5h3M12 12.75 15.75 9 12 5.25M15.75 9H6.75"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="sb-label">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}
