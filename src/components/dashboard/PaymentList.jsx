const formatCurrency = (amount) =>
  Number(amount).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getCurrentWeekRange = () => {
  const today = new Date();
  const day = today.getDay();
  const daysToMonday = day === 0 ? -6 : 1 - day;
  const start = new Date(today);
  start.setDate(today.getDate() + daysToMonday);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

export function PaymentList({ payments, loan }) {
  const sorted = [...payments].sort(
    (a, b) => a.payment_number - b.payment_number,
  );

  const totalDebt = sorted.reduce((s, p) => s + p.payment_amount, 0);
  const totalPaid = sorted
    .filter((p) => p.paid)
    .reduce((s, p) => s + p.payment_amount, 0);
  const remaining = totalDebt - totalPaid;
  const progress =
    totalDebt > 0 ? Math.round((totalPaid / totalDebt) * 100) : 0;

  const { start, end } = getCurrentWeekRange();
  const currentWeekId = sorted.find((p) => {
    const d = parseDate(p.payment_date);
    return d >= start && d <= end;
  })?.payment_id;

  return (
    <div
      style={{
        marginTop: "16px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "16px",
      }}
    >
      {/* Resumen financiero */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        {[
          {
            label: "Total a pagar",
            value: formatCurrency(totalDebt),
            color: "rgba(255,255,255,0.7)",
            border: "rgba(255,255,255,0.08)",
            bg: "rgba(255,255,255,0.03)",
          },
          {
            label: "Pagado",
            value: formatCurrency(totalPaid),
            color: "#4ade80",
            border: "rgba(74,222,128,0.2)",
            bg: "rgba(74,222,128,0.06)",
          },
          {
            label: "Restante",
            value: formatCurrency(remaining),
            color: "#f87171",
            border: "rgba(248,113,113,0.2)",
            bg: "rgba(248,113,113,0.06)",
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: item.bg,
              border: `1px solid ${item.border}`,
              borderRadius: "10px",
              padding: "10px 12px",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.68rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "4px",
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                color: item.color,
                fontSize: "0.92rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Barra de progreso */}
      <div style={{ marginBottom: "14px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.72rem",
              fontWeight: 600,
            }}
          >
            Progreso del préstamo
          </span>
          <span
            style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 700 }}
          >
            {progress}%
          </span>
        </div>
        <div
          style={{
            height: "5px",
            background: "rgba(255,255,255,0.07)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background:
                progress === 100
                  ? "#4ade80"
                  : "linear-gradient(90deg, #4ade80, #22d3ee)",
              borderRadius: "10px",
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {/* Header lista */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "8px",
          padding: "6px 12px",
          marginBottom: "4px",
        }}
      >
        {["Pago", "Fecha", "Monto", "Estado"].map((h) => (
          <span
            key={h}
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Lista de pagos */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          maxHeight: "260px",
          overflowY: "auto",
          paddingRight: "2px",
        }}
      >
        {sorted.map((payment) => {
          const isCurrentWeek = payment.payment_id === currentWeekId;
          const isPaid = payment.paid;

          return (
            <div
              key={payment.payment_id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "8px",
                alignItems: "center",
                padding: "9px 12px",
                borderRadius: "10px",
                background: isCurrentWeek
                  ? "rgba(56,189,248,0.08)"
                  : isPaid
                    ? "rgba(74,222,128,0.05)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  isCurrentWeek
                    ? "rgba(56,189,248,0.25)"
                    : isPaid
                      ? "rgba(74,222,128,0.12)"
                      : "rgba(255,255,255,0.05)"
                }`,
                transition: "background 0.15s",
              }}
            >
              {/* Número */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "7px" }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  #{payment.payment_number}
                </span>
                {isCurrentWeek && (
                  <span
                    style={{
                      background: "rgba(56,189,248,0.15)",
                      border: "1px solid rgba(56,189,248,0.3)",
                      color: "#38bdf8",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: "100px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Esta semana
                  </span>
                )}
              </div>

              {/* Fecha */}
              <span
                style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.78rem" }}
              >
                {payment.payment_date}
              </span>

              {/* Monto */}
              <span
                style={{
                  color: isPaid ? "#4ade80" : "rgba(255,255,255,0.55)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                }}
              >
                {formatCurrency(payment.payment_amount)}
              </span>

              {/* Estado */}
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: isPaid
                      ? "rgba(74,222,128,0.1)"
                      : "rgba(248,113,113,0.08)",
                    border: `1px solid ${isPaid ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.15)"}`,
                    color: isPaid ? "#4ade80" : "#f87171",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "100px",
                  }}
                >
                  {isPaid ? "✓ Pagado" : "Pendiente"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
