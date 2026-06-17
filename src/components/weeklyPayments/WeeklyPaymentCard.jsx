const formatCurrency = (amount) =>
  Number(amount).toLocaleString("es-MX", { style: "currency", currency: "MXN" });

export function WeeklyPaymentCard({ payment, markAsPaid }) {
  return (
    <div style={{
      background: payment.paid ? "rgba(74,222,128,0.05)" : "rgba(255,255,255,0.05)",
      border: `1px solid ${payment.paid ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.08)"}`,
      borderRadius: "14px",
      overflow: "hidden",
    }}>
      {/* Barra de estado */}
      <div style={{ height: "2px", background: payment.paid ? "#4ade80" : "rgba(255,255,255,0.06)" }} />

      <div style={{ padding: "14px 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
              background: payment.paid ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.07)",
              border: `1px solid ${payment.paid ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.1)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: payment.paid ? "#4ade80" : "rgba(255,255,255,0.5)",
              fontWeight: 800, fontSize: "0.82rem",
            }}>
              {payment.loan_name?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div>
              <p style={{ color: "white", fontSize: "0.9rem", fontWeight: 700, margin: 0 }}>
                {payment.loan_name}
              </p>
              <p style={{ color: "#38bdf8", fontSize: "0.72rem", fontWeight: 600, margin: 0 }}>
                Pago #{payment.payment_number}
              </p>
            </div>
          </div>

          {/* Badge estado */}
          {payment.paid ? (
            <span style={{
              background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)",
              color: "#4ade80", fontSize: "0.7rem", fontWeight: 700,
              padding: "3px 9px", borderRadius: "100px",
            }}>
              ✓ Pagado
            </span>
          ) : (
            <span style={{
              background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)",
              color: "#fb923c", fontSize: "0.7rem", fontWeight: 700,
              padding: "3px 9px", borderRadius: "100px",
            }}>
              Pendiente
            </span>
          )}
        </div>

        {/* Info + acción */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Fecha:</span>{" "}
              {payment.payment_date}
            </span>
            <span style={{ color: payment.paid ? "#4ade80" : "rgba(255,255,255,0.75)", fontSize: "0.88rem", fontWeight: 700 }}>
              {formatCurrency(payment.payment_amount)}
            </span>
          </div>

          {payment.paid ? (
            <div style={{
              background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.15)",
              borderRadius: "8px", padding: "6px 14px",
              color: "#4ade80", fontSize: "0.78rem", fontWeight: 700,
            }}>
              ✓ Cobrado
            </div>
          ) : (
            <button
              onClick={() => markAsPaid(payment.payment_id)}
              style={{
                background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                border: "none", borderRadius: "8px",
                padding: "7px 16px", cursor: "pointer",
                color: "#052e16", fontSize: "0.78rem", fontWeight: 700,
                boxShadow: "0 4px 12px rgba(74,222,128,0.2)",
                transition: "opacity 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Cobrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
