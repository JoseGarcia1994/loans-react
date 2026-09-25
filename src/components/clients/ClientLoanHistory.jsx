const fmt = (n) => Number(n).toLocaleString("es-MX", { style: "currency", currency: "MXN" });
const fmtDate = (s) => {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
};

export function ClientLoanHistory({ loans = [] }) {
  if (loans.length === 0) {
    return (
      <div style={{ marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.82rem" }}>
        Sin préstamos registrados
      </div>
    );
  }

  const active  = loans.filter(l => !l.is_completed && l.status === "active");
  const closed  = loans.filter(l => l.is_completed || l.status !== "active");

  return (
    <div style={{ marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
      {active.length > 0 && (
        <Section title="Préstamo activo">
          {active.map((l, i) => <LoanRow key={l.id ?? i} loan={l} active />)}
        </Section>
      )}
      {closed.length > 0 && (
        <Section title={`Historial (${closed.length})`}>
          {closed.map((l, i) => <LoanRow key={l.id ?? i} loan={l} active={false} />)}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.63rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", margin: "0 0 8px" }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {children}
      </div>
    </div>
  );
}

function LoanRow({ loan, active }) {
  const payments     = loan.payments ?? [];
  const total        = payments.length;
  const paidCount    = payments.filter(p => p.paid).length;
  const unpaidCount  = total - paidCount;
  const progress     = total > 0 ? Math.round((paidCount / total) * 100) : 0;
  const pendingAmt   = payments.filter(p => !p.paid).reduce((s, p) => s + (p.payment_amount ?? 0), 0);

  const today        = new Date();
  today.setHours(0, 0, 0, 0);
  const missedCount  = payments.filter(p => {
    if (p.paid) return false;
    if (!p.payment_date) return false;
    const [y, m, d] = p.payment_date.split("-").map(Number);
    return new Date(y, m - 1, d) < today;
  }).length;

  const accentColor = active ? "#fb923c" : "#4ade80";
  const borderColor = active ? "rgba(251,146,60,0.22)" : "rgba(74,222,128,0.15)";
  const badgeLabel  = active ? "Activo" : "Completado";

  let behaviorBadge = null;
  if (!active && total > 0) {
    if (unpaidCount === 0)       behaviorBadge = { label: "Pagó todo",       color: "#4ade80", bg: "rgba(74,222,128,0.08)",   border: "rgba(74,222,128,0.2)" };
    else if (missedCount === 0)  behaviorBadge = { label: "Sin atrasos",     color: "#38bdf8", bg: "rgba(56,189,248,0.08)",   border: "rgba(56,189,248,0.2)" };
    else if (missedCount <= 2)   behaviorBadge = { label: `${missedCount} atraso${missedCount > 1 ? "s" : ""}`, color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.2)" };
    else                         behaviorBadge = { label: `${missedCount} atrasos`, color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)" };
  }
  if (active && missedCount > 0) {
    behaviorBadge = { label: `${missedCount} pago${missedCount > 1 ? "s" : ""} vencido${missedCount > 1 ? "s" : ""}`, color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)" };
  }

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${borderColor}`, borderRadius: "12px", padding: "12px 14px" }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px", gap: "8px" }}>
        <div>
          <span style={{ color: "white", fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            {fmt(loan.amount)}
          </span>
          {loan.total_weeks && (
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginLeft: "6px" }}>
              · {loan.total_weeks} sem
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span style={{ background: active ? "rgba(251,146,60,0.1)" : "rgba(74,222,128,0.08)", color: accentColor, border: `1px solid ${borderColor}`, fontSize: "0.67rem", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>
            {badgeLabel}
          </span>
          {behaviorBadge && (
            <span style={{ background: behaviorBadge.bg, color: behaviorBadge.color, border: `1px solid ${behaviorBadge.border}`, fontSize: "0.67rem", fontWeight: 700, padding: "2px 8px", borderRadius: "100px" }}>
              {behaviorBadge.label}
            </span>
          )}
        </div>
      </div>

      {/* Dates */}
      {(loan.start_date || loan.end_date) && (
        <div style={{ display: "flex", gap: "14px", marginBottom: "10px", flexWrap: "wrap" }}>
          {loan.start_date && (
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem" }}>
              📅 <span style={{ color: "rgba(255,255,255,0.55)" }}>{fmtDate(loan.start_date)}</span>
            </span>
          )}
          {loan.end_date && (
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem" }}>
              🏁 <span style={{ color: "rgba(255,255,255,0.55)" }}>{fmtDate(loan.end_date)}</span>
            </span>
          )}
        </div>
      )}

      {/* Payment progress */}
      {total > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>
              Pagos: <span style={{ color: accentColor, fontWeight: 700 }}>{paidCount}</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>/{total}</span>
            </span>
            {active && pendingAmt > 0 ? (
              <span style={{ color: "#fb923c", fontSize: "0.7rem", fontWeight: 600 }}>
                Saldo: {fmt(pendingAmt)}
              </span>
            ) : (
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>{progress}% pagado</span>
            )}
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`, borderRadius: "10px", transition: "width 0.4s ease" }} />
          </div>
          {/* Payment pips */}
          {total <= 14 && (
            <div style={{ display: "flex", gap: "3px", marginTop: "7px", flexWrap: "wrap" }}>
              {payments.map((p, i) => {
                const isLate = !p.paid && p.payment_date && (() => { const [y, m, d] = p.payment_date.split("-").map(Number); return new Date(y, m - 1, d) < new Date(new Date().setHours(0,0,0,0)); })();
                return (
                  <div key={i} title={`Pago ${i + 1}${p.paid ? " — pagado" : isLate ? " — vencido" : " — pendiente"}`} style={{
                    width: "14px", height: "14px", borderRadius: "3px",
                    background: p.paid ? "#4ade80" : isLate ? "#f87171" : "rgba(255,255,255,0.1)",
                    border: `1px solid ${p.paid ? "rgba(74,222,128,0.3)" : isLate ? "rgba(248,113,113,0.3)" : "rgba(255,255,255,0.12)"}`,
                    opacity: p.paid ? 1 : 0.85,
                  }} />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
