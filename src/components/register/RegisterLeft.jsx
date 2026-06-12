const steps = [
  { num: "01", title: "Crea tu cuenta", desc: "Solo necesitas tu nombre, correo y contraseña." },
  { num: "02", title: "Agrega tus clientes", desc: "Registra a cada persona a quien le prestas." },
  { num: "03", title: "Empieza a controlar", desc: "Crea préstamos a 14 semanas y registra cada pago." },
];

export function RegisterLeft() {
  return (
    <div className="register-left">
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

      {/* Centro */}
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
            Empieza hoy gratis
          </span>

          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "16px" }}>
            Tu cartera organizada{" "}
            <span style={{ background: "linear-gradient(90deg, #4ade80, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              desde el primer día
            </span>
          </h2>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", lineHeight: 1.7 }}>
            Crea tu cuenta en segundos y empieza a registrar tus préstamos a 14 semanas sin complicaciones.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {steps.map((s) => (
            <div key={s.num} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{
                flexShrink: 0, width: "32px", height: "32px", borderRadius: "8px",
                background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)",
                color: "#4ade80", fontSize: "0.72rem", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {s.num}
              </span>
              <div>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.93rem", fontWeight: 600, marginBottom: "2px" }}>{s.title}</p>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.83rem", lineHeight: 1.6 }}>{s.desc}</p>
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
