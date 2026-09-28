import { getInitials, getGreeting } from "../../utils/dashboardHelpers";

export function DashboardNavbar({
  title = "Dashboard",
  subtitle = "",
  userName = "",
}) {
  const initials = getInitials(userName);
  const greeting = getGreeting();
  const displayName = userName || "Usuario";

  return (
    <header
      className="dnav-header"
      style={{
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
        gap: "12px",
      }}
    >
      {/* Left — page title */}
      <div className="dnav-title-wrap" style={{ minWidth: 0 }}>
        <h1
          className="dnav-title"
          style={{
            color: "white",
            fontSize: "1rem",
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="dnav-subtitle"
            style={{
              color: "rgba(255,255,255,0.28)",
              fontSize: "0.75rem",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right */}
      <div
        className="dnav-right"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        {/* Divider */}
        <div
          className="dnav-divider"
          style={{
            width: "1px",
            height: "28px",
            background: "rgba(255,255,255,0.08)",
          }}
        />

        {/* User info */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="dnav-user-text" style={{ textAlign: "right" }}>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.68rem",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              {greeting}
            </p>
            <p
              style={{
                color: "white",
                fontSize: "0.85rem",
                fontWeight: 600,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {displayName}
            </p>
          </div>

          {/* Avatar with initials */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                boxShadow:
                  "0 0 0 2px rgba(74,222,128,0.25), 0 4px 12px rgba(0,0,0,0.3)",
                fontWeight: 800,
                fontSize: "0.78rem",
                color: "#052e16",
                letterSpacing: "0.02em",
              }}
            >
              {initials}
            </div>
            {/* Active Dot */}
            <div
              style={{
                position: "absolute",
                bottom: "1px",
                right: "1px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ade80",
                border: "2px solid rgba(15,32,39,0.9)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 385px) {
          .dnav-header {
            padding: 0 14px !important;
            gap: 8px !important;
          }
          .dnav-title {
            font-size: 0.85rem !important;
          }
          .dnav-divider {
            display: none !important;
          }
          .dnav-user-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
