import { useState } from "react";
import { ClientLoanHistory } from "./ClientLoanHistory";

function getReliability(loans = []) {
  const allPayments = loans.flatMap(l => l.payments ?? []);
  const total = allPayments.length;
  if (total === 0) return null;
  const paid = allPayments.filter(p => p.paid).length;
  const ratio = paid / total;
  if (ratio >= 0.95) return { label: "Excelente pagador", color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)" };
  if (ratio >= 0.75) return { label: "Buen pagador",      color: "#38bdf8", bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.2)" };
  if (ratio >= 0.5)  return { label: "Pagador regular",   color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)" };
  return               { label: "Con atrasos",            color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" };
}

export function ClientCard({ client, onEdit, onDelete }) {
  const [showHistory, setShowHistory] = useState(false);

  const loans = client.loans ?? [];
  const totalLoans     = loans.length;
  const activeLoans    = loans.filter(l => !l.is_completed && l.status === "active");
  const completedLoans = loans.filter(l => l.is_completed);
  const hasActiveLoan  = activeLoans.length > 0;
  const reliability    = getReliability(completedLoans);

  const allPayments  = loans.flatMap(l => l.payments ?? []);
  const paidCount    = allPayments.filter(p => p.paid).length;
  const payRatio     = allPayments.length > 0 ? Math.round((paidCount / allPayments.length) * 100) : null;

  const topBarColor = hasActiveLoan
    ? "linear-gradient(90deg, #fb923c, #fbbf24)"
    : reliability?.color
      ? `linear-gradient(90deg, ${reliability.color}, ${reliability.color}88)`
      : "rgba(255,255,255,0.06)";

  return (
    <div style={{
      background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.09)", borderRadius: "18px",
      overflow: "hidden", transition: "border-color 0.2s, box-shadow 0.2s",
    }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
      onMouseOut={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Status bar */}
      <div style={{ height: "2px", background: "rgba(255,255,255,0.05)" }}>
        <div style={{ height: "100%", width: totalLoans > 0 ? "100%" : "0%", background: topBarColor }} />
      </div>

      <div style={{ padding: "18px 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
              background: hasActiveLoan ? "rgba(251,146,60,0.12)" : "rgba(255,255,255,0.07)",
              border: `1px solid ${hasActiveLoan ? "rgba(251,146,60,0.25)" : "rgba(255,255,255,0.1)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: hasActiveLoan ? "#fb923c" : "rgba(255,255,255,0.6)",
              fontWeight: 800, fontSize: "1.05rem",
            }}>
              {client.first_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ color: "white", fontSize: "0.95rem", fontWeight: 700, margin: 0 }}>
                {client.first_name} {client.last_name}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", margin: "2px 0 0" }}>
                {client.phone ? `📱 ${client.phone}` : "Sin teléfono"}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {hasActiveLoan && (
              <span style={{
                background: "rgba(251,146,60,0.1)", color: "#fb923c",
                border: "1px solid rgba(251,146,60,0.25)",
                fontSize: "0.68rem", fontWeight: 700,
                padding: "3px 8px", borderRadius: "100px",
                display: "flex", alignItems: "center", gap: "4px",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#fb923c", display: "inline-block" }} />
                Activo
              </span>
            )}

            <button onClick={() => onEdit(client)} title="Editar"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "rgba(255,255,255,0.35)", display: "flex", transition: "all 0.15s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(56,189,248,0.12)"; e.currentTarget.style.color = "#38bdf8"; e.currentTarget.style.borderColor = "rgba(56,189,248,0.2)"; }}
              onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M9.5 2.5a1.5 1.5 0 0 1 2.121 2.121L4.5 11.75l-2.75.75.75-2.75L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
            </button>

            <button onClick={() => onDelete(client)} title="Eliminar"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "rgba(255,255,255,0.35)", display: "flex", transition: "all 0.15s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(248,113,113,0.12)"; e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(248,113,113,0.2)"; }}
              onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 2.5h3M1.75 4h10.5M3.5 4l.75 7.5h5.5L10.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "14px" }}>
          {[
            { label: "Préstamos",   value: totalLoans,            color: "#38bdf8" },
            { label: "Completados", value: completedLoans.length, color: "#4ade80" },
            { label: "Pagos OK",    value: payRatio !== null ? `${payRatio}%` : "—", color: payRatio === null ? "rgba(255,255,255,0.3)" : payRatio >= 90 ? "#4ade80" : payRatio >= 70 ? "#38bdf8" : payRatio >= 50 ? "#fbbf24" : "#f87171" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "10px 12px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.63rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                {stat.label}
              </p>
              <p style={{ color: stat.color, fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Footer: reliability + history button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          {/* Reliability badge or empty client note */}
          {reliability ? (
            <span style={{
              background: reliability.bg, border: `1px solid ${reliability.border}`,
              color: reliability.color, fontSize: "0.72rem", fontWeight: 600,
              padding: "4px 10px", borderRadius: "8px",
            }}>
              {reliability.label}
            </span>
          ) : (
            <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.72rem" }}>
              Sin historial de pagos
            </span>
          )}

          {totalLoans > 0 && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                background: showHistory ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${showHistory ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.09)"}`,
                borderRadius: "8px", padding: "5px 12px",
                cursor: "pointer",
                color: showHistory ? "#818cf8" : "rgba(255,255,255,0.45)",
                fontSize: "0.75rem", fontWeight: 600,
                display: "flex", alignItems: "center", gap: "4px",
                transition: "all 0.15s",
              }}
            >
              Historial
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                style={{ transform: showHistory ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Address / notes */}
        {(client.address || client.notes) && (
          <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {client.address && (
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", margin: 0 }}>
                📍 <span style={{ color: "rgba(255,255,255,0.55)" }}>{client.address}</span>
              </p>
            )}
            {client.notes && (
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", margin: 0 }}>
                📝 <span style={{ color: "rgba(255,255,255,0.55)" }}>{client.notes}</span>
              </p>
            )}
          </div>
        )}

        {/* Loan history */}
        {showHistory && <ClientLoanHistory loans={loans} />}
      </div>
    </div>
  );
}
