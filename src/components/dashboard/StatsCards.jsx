const cards = [
  {
    key: "active_loans",
    label: "Préstamos activos",
    accentColor: "#4ade80",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <path d="M9 1.5L16.5 5.25V9c0 3.75-3 7.125-7.5 8.25C4.5 16.125 1.5 12.75 1.5 9V5.25Z" stroke="#4ade80" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "total_lent",
    label: "Capital activo",
    prefix: "$",
    accentColor: "#38bdf8",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="4.5" width="15" height="10.5" rx="2" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="9" cy="9.75" r="1.5" stroke="#38bdf8" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    key: "pending_payments",
    label: "Pagos pendientes",
    accentColor: "#fb923c",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="#fb923c" strokeWidth="1.5" />
        <path d="M9 5.25v4.5l2.25 2.25" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "pending_amount",
    label: "Monto pendiente",
    prefix: "$",
    accentColor: "#f87171",
    icon: (
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="#f87171" strokeWidth="1.5" />
        <path d="M9 5.25v4.5M9 12.375h.008" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function StatsCards({ stats }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "14px", marginBottom: "28px" }}>
      {cards.map((card) => (
        <div key={card.key} style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          transition: "border-color 0.2s",
        }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = `${card.accentColor}30`)}
          onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.76rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {card.label}
            </p>
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: `${card.accentColor}14`, border: `1px solid ${card.accentColor}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {card.icon}
            </div>
          </div>
          <p style={{ color: card.accentColor, fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {card.prefix || ""}{stats?.[card.key] ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}
