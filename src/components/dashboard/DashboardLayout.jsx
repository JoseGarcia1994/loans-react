import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardNavbar } from "./DashboardNavbar";

const decodeJwtName = () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return "";

    const payload = JSON.parse(atob(token.split(".")[1]));

    const fullName =
      `${payload.first_name ?? ""} ${payload.last_name ?? ""}`.trim();

    return fullName || payload.sub || "";
  } catch {
    return "";
  }
};

export function DashboardLayout({ children, activePath = "/dashboard", title = "Dashboard", subtitle = ""}) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarW = collapsed ? "100px" : "252px";
  const userName = decodeJwtName();
  return (
    <>
      <style>{`
        .dash-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f2027 0%, #1a3a2a 30%, #0d3b4f 65%, #0f2027 100%);
          position: relative;
          overflow-x: hidden;
        }
        .dash-orbs {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .dash-main {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
          z-index: 1;
          transition: margin-left 0.25s ease;
        }
        .dash-content {
          flex: 1;
          padding: 28px 28px 40px;
        }
        /* Mobile */
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: rgba(13,17,23,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 10px 0 18px;
          z-index: 50;
          justify-content: space-around;
        }
        .mob-item {
          display: flex; flex-direction: column;
          align-items: center; gap: 3px;
          color: rgba(255,255,255,0.3);
          font-size: 0.6rem; font-weight: 600;
          text-decoration: none; padding: 0 14px;
          transition: color 0.15s;
        }
        .mob-item.active { color: #4ade80; }
        @media (max-width: 768px) {
          .dash-main { margin-left: 0 !important; }
          .mobile-bottom-nav { display: flex; }
          .dash-content { padding: 20px 16px 80px; }
        }
      `}</style>

      <div className="dash-bg">
        {/* Orbs */}
        <div className="dash-orbs">
          <div style={{ position: "absolute", top: "-80px", left: "-60px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.14) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", top: "35%", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "5%", left: "38%", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)" }} />
        </div>

        {/* Sidebar flotante */}
        <Sidebar activePath={activePath} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        {/* Contenido principal — margin-left reactivo al estado del sidebar */}
        <div className="dash-main" style={{ marginLeft: sidebarW }}>
          <DashboardNavbar title={title} subtitle={subtitle} userName={userName} />
          <div className="dash-content">
            {children}
          </div>
        </div>
      </div>

      {/* Bottom nav móvil */}
      <nav className="mobile-bottom-nav">
        {[
          { href: "/dashboard", label: "Inicio", icon: <svg width="19" height="19" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="11" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="1" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/></svg> },
          { href: "/create-loan", label: "Nuevo", icon: <svg width="19" height="19" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.6"/><path d="M9 6v6M6 9h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
          { href: "/weekly-payments", label: "Cobranza", icon: <svg width="19" height="19" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="3" width="15" height="13.5" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M5.25 1.5v3M12.75 1.5v3M1.5 7.5h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
        ].map((item) => (
          <a key={item.href} href={item.href} className={`mob-item ${activePath === item.href ? "active" : ""}`}>
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );
}
