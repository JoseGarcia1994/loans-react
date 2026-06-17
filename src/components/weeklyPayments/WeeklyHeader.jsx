const formatCurrency = (amount) =>
  Number(amount).toLocaleString("es-MX", { style: "currency", currency: "MXN" });

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-MX", {
    day: "numeric", month: "short", year: "numeric",
  });
};

export function WeeklyHeader({ weekInfo, payments }) {
  const totalWeekly = payments.reduce((s, p) => s + p.payment_amount, 0);
  const paid = payments.filter((p) => p.paid).reduce((s, p) => s + p.payment_amount, 0);
  const pending = totalWeekly - paid;
  const paidCount = payments.filter((p) => p.paid).length;

  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ marginBottom: "20px" }}>
        <p style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>
          Cobranza Semanal
        </p>
        <h2 style={{ color: "white", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
          {weekInfo.start
            ? `${formatDate(weekInfo.start)} → ${formatDate(weekInfo.end)}`
            : "Cargando semana..."}
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
        {[
          { label: "Total a cobrar", value: formatCurrency(totalWeekly), color: "rgba(255,255,255,0.8)", border: "rgba(255,255,255,0.08)", bg: "rgba(255,255,255,0.04)", icon: "💰" },
          { label: "Cobrado", value: formatCurrency(paid), color: "#4ade80", border: "rgba(74,222,128,0.2)", bg: "rgba(74,222,128,0.06)", icon: "✓" },
          { label: "Pendiente", value: formatCurrency(pending), color: "#f87171", border: "rgba(248,113,113,0.2)", bg: "rgba(248,113,113,0.06)", icon: "⏳" },
          { label: "Cobrados", value: `${paidCount} / ${payments.length}`, color: "#38bdf8", border: "rgba(56,189,248,0.2)", bg: "rgba(56,189,248,0.06)", icon: "📋" },
        ].map((card) => (
          <div key={card.label} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: "14px", padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {card.label}
              </p>
              <span style={{ fontSize: "0.85rem" }}>{card.icon}</span>
            </div>
            <p style={{ color: card.color, fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
