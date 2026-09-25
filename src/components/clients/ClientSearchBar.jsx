export function ClientSearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <span style={{
        position: "absolute", left: "14px", top: "50%",
        transform: "translateY(-50%)", fontSize: "0.85rem", pointerEvents: "none",
      }}>
        🔍
      </span>
      <input
        type="text"
        placeholder="Buscar por nombre o teléfono..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", height: "48px", borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)", color: "white",
          padding: "0 14px 0 40px", outline: "none",
          fontSize: "0.92rem", boxSizing: "border-box",
        }}
      />
    </div>
  );
}