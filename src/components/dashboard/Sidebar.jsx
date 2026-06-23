import { Link } from "react-router-dom";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <rect
          x="1"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="11"
          y="1"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="1"
          y="11"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="11"
          y="11"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    href: "/clients",
    label: "Nuevo Cliente",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />

        <path
          d="M3.5 15c.8-2.4 3-3.75 5.5-3.75S13.7 12.6 14.5 15"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M14.5 3.5v4M12.5 5.5h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/create-loan",
    label: "Nuevo Préstamo",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M9 6v6M6 9h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/weekly-payments",
    label: "Cobranza Semanal",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <rect
          x="1.5"
          y="3"
          width="15"
          height="13.5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M5.25 1.5v3M12.75 1.5v3M1.5 7.5h15"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

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
    <>
      <style>{`
        .sidebar-float {
          position: fixed;
          top: 16px;
          left: 16px;
          bottom: 16px;
          width: ${w};
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          z-index: 30;
          box-shadow: 0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: width 0.25s ease;
          overflow: hidden;
        }
        .sb-label {
          opacity: ${collapsed ? 0 : 1};
          max-width: ${collapsed ? "0px" : "140px"};
          overflow: hidden;
          white-space: nowrap;
          transition: opacity 0.2s, max-width 0.25s;
        }
        .sb-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
          color: rgba(255,255,255,0.38);
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid transparent;
        }
        .sb-nav-item:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
        }
        .sb-nav-item.active {
          background: rgba(74,222,128,0.12);
          border-color: rgba(74,222,128,0.2);
          color: #4ade80;
          box-shadow: 0 0 12px rgba(74,222,128,0.08);
        }
        @media (max-width: 768px) { .sidebar-float { display: none; } }
      `}</style>

      <div className="sidebar-float">
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
              }`}
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
    </>
  );
}
