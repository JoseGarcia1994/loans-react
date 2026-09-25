export function ClientStatsCards({ clients }) {
  const total = clients.length;

  const withActiveLoan = clients.filter(c =>
    c.loans?.some(l => !l.is_completed && l.status === "active")
  ).length;

  const noLoans = clients.filter(c => !c.loans?.length).length;

  const goodPayers = clients.filter(c => {
    const payments = c.loans?.flatMap(l => l.payments ?? []) ?? [];
    if (payments.length === 0) return false;
    const paid = payments.filter(p => p.paid).length;
    return paid / payments.length >= 0.8;
  }).length;

  const stats = [
    { label: "Total clientes",      value: total,          color: "#4ade80",  icon: "👥" },
    { label: "Préstamo activo",     value: withActiveLoan, color: "#fb923c",  icon: "🟠" },
    { label: "Buenos pagadores",    value: goodPayers,     color: "#38bdf8",  icon: "✅" },
    { label: "Sin préstamos",       value: noLoans,        color: "rgba(255,255,255,0.4)", icon: "🆕" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: "14px", marginBottom: "28px" }}>
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.09)", borderRadius: "16px",
            padding: "18px 20px", transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = `${s.color}40`; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)"; }}
          onMouseOut={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", margin: 0 }}>
              {s.label}
            </p>
            <span style={{ fontSize: "0.9rem" }}>{s.icon}</span>
          </div>
          <p style={{ color: s.color, fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, margin: 0 }}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
