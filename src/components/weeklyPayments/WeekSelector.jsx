export function WeekSelector({ offset, weekInfo, goPrevWeek, goNextWeek, goToCurrentWeek, MIN_OFFSET = -18, MAX_OFFSET = 1 }) {
  const isCurrentWeek = offset === 0;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px", padding: "12px 16px",
      marginBottom: "20px", gap: "12px", flexWrap: "wrap",
    }}>
      {/* ← Anterior */}
      <button
        onClick={goPrevWeek}
        disabled={offset <= MIN_OFFSET}
        style={{
          background: offset <= MIN_OFFSET ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "10px", padding: "8px 14px",
          color: offset <= MIN_OFFSET ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
          cursor: offset <= MIN_OFFSET ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "0.82rem", fontWeight: 600,
          transition: "background 0.15s",
        }}
        onMouseOver={(e) => { if (offset > MIN_OFFSET) e.currentTarget.style.background = "rgba(255,255,255,0.11)"; }}
        onMouseOut={(e) => { e.currentTarget.style.background = offset <= MIN_OFFSET ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)"; }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Anterior
      </button>

      {/* Centro */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, justifyContent: "center" }}>
        {!isCurrentWeek && (
          <button
            onClick={goToCurrentWeek}
            style={{
              background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "8px", padding: "5px 12px",
              color: "#4ade80", fontSize: "0.72rem", fontWeight: 700,
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(74,222,128,0.16)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "rgba(74,222,128,0.1)")}
          >
            ↩ hoy
          </button>
        )}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: isCurrentWeek ? "#4ade80" : "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
            {isCurrentWeek ? "Semana actual" : offset < 0 ? `Hace ${Math.abs(offset)} sem` : `En ${offset} sem`}
          </p>
          {weekInfo?.start && weekInfo?.end && (
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", fontWeight: 500 }}>
              {weekInfo.start} → {weekInfo.end}
            </p>
          )}
        </div>
      </div>

      {/* Siguiente → */}
      <button
        onClick={goNextWeek}
        disabled={offset >= MAX_OFFSET}
        style={{
          background: offset >= MAX_OFFSET ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "10px", padding: "8px 14px",
          color: offset >= MAX_OFFSET ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
          cursor: offset >= MAX_OFFSET ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "0.82rem", fontWeight: 600,
          transition: "background 0.15s",
        }}
        onMouseOver={(e) => { if (offset < MAX_OFFSET) e.currentTarget.style.background = "rgba(255,255,255,0.11)"; }}
        onMouseOut={(e) => { e.currentTarget.style.background = offset >= MAX_OFFSET ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)"; }}
      >
        Siguiente
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
