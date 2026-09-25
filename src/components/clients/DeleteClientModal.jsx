export function DeleteClientModal({ client, onClose, onConfirm, loading }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "relative", background: "rgba(13,17,23,0.97)",
        border: "1px solid rgba(248,113,113,0.2)", borderRadius: "20px",
        padding: "28px", width: "100%", maxWidth: "340px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
      }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8.5 4h3M3 6h14M5.5 6l.75 10.5h7.5L14.5 6" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ color: "white", fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}>¿Eliminar cliente?</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.87rem", lineHeight: 1.6, marginBottom: "24px" }}>
          Se eliminará a <strong style={{ color: "white" }}>{client?.first_name} {client?.last_name}</strong> y todos sus préstamos permanentemente.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={loading} style={{ flex: 1, background: loading ? "rgba(248,113,113,0.3)" : "rgba(248,113,113,0.9)", border: "none", borderRadius: "10px", padding: "11px", color: "white", fontWeight: 700, fontSize: "0.88rem", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}