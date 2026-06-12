const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="8" fill="rgba(74,222,128,0.15)" />
    <path d="M4.5 8.5l2 2 4-4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const perks = [
  { title: "Control total de tus préstamos", desc: "Registra clientes y préstamos a 14 semanas desde un solo lugar." },
  { title: "Sin errores de cálculo", desc: "Los saldos pendientes se actualizan solos con cada pago registrado." },
  { title: "Acceso desde cualquier lugar", desc: "Funciona en tu celular o computadora, sin instalar nada." },
];

export function LoginLeft() {
  return (
    <div className="login-left">
      {/* Orbs */}
      <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.02em", color: "white" }}>
            Presta<span style={{ color: "#4ade80" }}>Control</span>
          </span>
        </a>
      </div>

      {/* Frase + beneficios */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "48px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
            color: "#86efac", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "5px 12px", borderRadius: "100px", marginBottom: "20px",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            Plataforma para prestamistas
          </span>

          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "16px" }}>
            Todo el control de tus préstamos{" "}
            <span style={{ background: "linear-gradient(90deg, #4ade80, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              en tus manos
            </span>
          </h2>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", lineHeight: 1.7 }}>
            Organiza clientes, registra pagos semanales y consulta saldos — sin libretas, sin errores.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {perks.map((p) => (
            <div key={p.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ marginTop: "2px" }}><CheckIcon /></div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.93rem", fontWeight: 600, marginBottom: "2px" }}>{p.title}</p>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.83rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", position: "relative", zIndex: 1 }}>
        © 2026 PrestaControl · Todos los derechos reservados
      </p>
    </div>
  );
}
