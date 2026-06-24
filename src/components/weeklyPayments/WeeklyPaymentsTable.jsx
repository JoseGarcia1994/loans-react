const formatCurrency = (amount) =>
  Number(amount).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

export function WeeklyPaymentsTable({ payments, markAsPaid }) {
  if (!payments.length) return null;

  return (
    <div
      className="hidden md:block"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        {["Cliente", "Pago", "Fecha", "Cobro", "Estado", "Acción"].map((h) => (
          <span
            key={h}
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div>
        {payments.map((payment, i) => (
          <div
            key={payment.payment_id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom:
                i < payments.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
              background: payment.paid
                ? "rgba(74,222,128,0.03)"
                : "transparent",
              transition: "background 0.15s",
            }}
            onMouseOver={(e) => {
              if (!payment.paid)
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = payment.paid
                ? "rgba(74,222,128,0.03)"
                : "transparent";
            }}
          >
            {/* Client */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9px",
                  flexShrink: 0,
                  background: payment.paid
                    ? "rgba(74,222,128,0.12)"
                    : "rgba(255,255,255,0.07)",
                  border: `1px solid ${
                    payment.paid
                      ? "rgba(74,222,128,0.2)"
                      : "rgba(255,255,255,0.1)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: payment.paid ? "#4ade80" : "rgba(255,255,255,0.5)",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                }}
              >
                {payment.client_name?.charAt(0).toUpperCase() ?? "?"}
              </div>

              <span
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                }}
              >
                {payment.client_name}
              </span>
            </div>

            {/* Payment # */}
            <span
              style={{ color: "#38bdf8", fontSize: "0.82rem", fontWeight: 600 }}
            >
              Pago #{payment.payment_number}
            </span>

            {/* Date */}
            <span
              style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }}
            >
              {payment.payment_date}
            </span>

            {/* Charge */}
            <span
              style={{
                color: payment.paid ? "#4ade80" : "rgba(255,255,255,0.75)",
                fontWeight: 700,
                fontSize: "0.88rem",
              }}
            >
              {formatCurrency(payment.payment_amount)}
            </span>

            {/* Status */}
            <span
              style={{
                color: payment.paid ? "#4ade80" : "#fb923c",
                fontSize: "0.82rem",
                fontWeight: 600,
              }}
            >
              {payment.paid ? "Pagado" : "Pendiente"}
            </span>

            {/* Action */}
            <div>
              {payment.paid ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.2)",
                    color: "#4ade80",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "100px",
                  }}
                >
                  ✓ Pagado
                </span>
              ) : (
                <button
                  onClick={() => markAsPaid(payment.payment_id)}
                  style={{
                    background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    cursor: "pointer",
                    color: "#052e16",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    boxShadow: "0 4px 12px rgba(74,222,128,0.2)",
                    transition: "opacity 0.15s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Pagar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
