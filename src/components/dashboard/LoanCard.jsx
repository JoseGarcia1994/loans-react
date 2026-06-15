import { useState } from "react";
import { PaymentList } from "./PaymentList";

function DeleteModal({ onClose, onConfirm, loading }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "relative",
        background: "rgba(13,17,23,0.97)",
        border: "1px solid rgba(248,113,113,0.2)",
        borderRadius: "20px", padding: "28px",
        width: "100%", maxWidth: "340px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
      }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8.5 4h3M3 6h14M5.5 6l.75 10.5h7.5L14.5 6" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ color: "white", fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}>¿Eliminar préstamo?</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.87rem", lineHeight: 1.6, marginBottom: "24px" }}>
          Esta acción no se puede deshacer. El préstamo y todos sus pagos serán eliminados permanentemente.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={loading} style={{ flex: 1, background: loading ? "rgba(248,113,113,0.3)" : "rgba(248,113,113,0.9)", border: "none", borderRadius: "10px", padding: "11px", color: "white", fontWeight: 700, fontSize: "0.88rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            {loading ? (
              <><span style={{ width: "12px", height: "12px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Eliminando...</>
            ) : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentPips({ payments }) {
  if (!payments?.length) return null;
  const paid = payments.filter((p) => p.paid).length;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
        {payments.map((p, i) => (
          <div key={i} style={{ width: "10px", height: "10px", borderRadius: "3px", background: p.paid ? "#4ade80" : "rgba(255,255,255,0.1)", transition: "background 0.2s" }} title={p.paid ? "Pagado" : "Pendiente"} />
        ))}
      </div>
      <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>{paid}/{payments.length}</span>
    </div>
  );
}

export function LoanCard({ loan, fetchLoans, deleteLoan, editLoan, setShowSuccess }) {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const paidCount = loan.payments?.filter((p) => p.paid).length ?? 0;
  const totalCount = loan.payments?.length ?? 0;
  const progress = totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;
  const weeklyPayment = (loan.amount / 10).toFixed(2);

  const statusConfig = progress === 100
    ? { label: "Completado", bg: "rgba(74,222,128,0.1)", color: "#4ade80", border: "rgba(74,222,128,0.2)" }
    : progress > 0
      ? { label: "En curso", bg: "rgba(251,146,60,0.1)", color: "#fb923c", border: "rgba(251,146,60,0.2)" }
      : { label: "Activo", bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "rgba(255,255,255,0.1)" };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      await deleteLoan(loan.id);
      setShowDeleteModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
        onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
        onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        {/* Barra de progreso */}
        <div style={{ height: "2px", background: "rgba(255,255,255,0.06)" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: progress === 100 ? "#4ade80" : "linear-gradient(90deg, #4ade80, #22d3ee)", transition: "width 0.4s ease" }} />
        </div>

        <div style={{ padding: "16px 18px" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80", fontWeight: 800, fontSize: "0.88rem", flexShrink: 0 }}>
                {loan.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 style={{ color: "white", fontSize: "0.95rem", fontWeight: 700, margin: 0 }}>{loan.name}</h2>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", margin: 0 }}>{loan.date}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ background: statusConfig.bg, color: statusConfig.color, border: `1px solid ${statusConfig.border}`, fontSize: "0.7rem", fontWeight: 600, padding: "3px 9px", borderRadius: "100px" }}>
                {statusConfig.label}
              </span>
              <span style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontWeight: 700, fontSize: "0.9rem", padding: "4px 10px", borderRadius: "8px" }}>
                ${loan.amount}
              </span>
              <button onClick={() => editLoan(loan)} title="Editar"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "rgba(255,255,255,0.35)", display: "flex", transition: "all 0.15s" }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(56,189,248,0.12)"; e.currentTarget.style.color = "#38bdf8"; e.currentTarget.style.borderColor = "rgba(56,189,248,0.2)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M9.5 2.5a1.5 1.5 0 0 1 2.121 2.121L4.5 11.75l-2.75.75.75-2.75L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </button>
              <button onClick={() => setShowDeleteModal(true)} title="Eliminar"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "rgba(255,255,255,0.35)", display: "flex", transition: "all 0.15s" }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(248,113,113,0.12)"; e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(248,113,113,0.2)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M5.5 2.5h3M1.75 4h10.5M3.5 4l.75 7.5h5.5L10.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Info */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "12px" }}>
            {[
              { label: "Pago semanal", value: `$${weeklyPayment}` },
              { label: "Plazo", value: "14 semanas" },
              { label: "Progreso", value: `${progress}%` },
            ].map((info) => (
              <span key={info.label} style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>
                <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{info.label}:</span> {info.value}
              </span>
            ))}
          </div>

          {/* Pips + botón */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <PaymentPips payments={loan.payments} />
            <button
              onClick={() => setOpen(!open)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", padding: "5px 10px", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", transition: "background 0.15s" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            >
              {open ? "Ocultar" : "Ver pagos"}
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Pagos expandidos */}
          {open && <PaymentList payments={loan.payments ?? []} loan={loan} />}
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModal onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} loading={loadingDelete} />
      )}
    </>
  );
}
