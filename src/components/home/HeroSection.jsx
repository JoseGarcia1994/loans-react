import { glass, glassStrong } from "./glass";

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.15)" />
    <path d="M5 9.5l2.5 2.5 5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const mockupRows = [
  { name: "Juan Pérez", amount: "$250", initials: "J", color: "rgba(74,222,128,0.8)" },
  { name: "María López", amount: "$350", initials: "M", color: "rgba(56,189,248,0.8)" },
  { name: "Carlos García", amount: "$180", initials: "C", color: "rgba(167,139,250,0.8)" },
];

export function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6" style={{ paddingTop: "96px", paddingBottom: "112px", position: "relative", zIndex: 1 }}>
      <div className="grid lg:grid-cols-2 gap-20 items-center">

        {/* Left — Texto */}
        <div>
          <span
            className="inline-flex items-center gap-2 mb-6"
            style={{
              ...glass,
              borderRadius: "100px",
              color: "#86efac",
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "6px 14px", display: "inline-flex",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            Control de préstamos a 14 semanas
          </span>

          <h1 style={{ color: "white", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            Controla tus préstamos y pagos{" "}
            <span style={{
              background: "linear-gradient(90deg, #4ade80, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              en un solo lugar
            </span>
          </h1>

          <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "480px" }}>
            Lleva el registro de tus clientes, sus préstamos a 14 semanas y los pagos recibidos. Sin cobros, sin complicaciones — solo control total.
          </p>

          <ul style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Préstamos a 14 semanas bien organizados",
              "Registro manual de cada pago semanal",
              "Saldo pendiente actualizado automáticamente",
              "Historial completo por cada cliente",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3" style={{ marginTop: "2.5rem" }}>
            <a
              href="/register"
              className="inline-flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                color: "#052e16",
                padding: "14px 28px", borderRadius: "12px",
                fontWeight: 700, fontSize: "0.95rem",
                boxShadow: "0 8px 32px rgba(74,222,128,0.3)",
              }}
            >
              Crear cuenta gratis <ArrowRight />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2"
              style={{
                ...glass, borderRadius: "12px",
                color: "rgba(255,255,255,0.85)",
                padding: "14px 28px",
                fontWeight: 600, fontSize: "0.95rem",
                display: "inline-flex",
              }}
            >
              Ver demostración
            </a>
          </div>

          <p style={{ marginTop: "1.25rem", color: "rgba(255,255,255,0.35)", fontSize: "0.82rem" }}>
            🎉 Acceso gratuito durante la etapa de lanzamiento. Los primeros usuarios conservarán beneficios exclusivos.
          </p>
        </div>

        {/* Right — Dashboard mockup */}
        <div style={{ position: "relative", paddingTop: "40px", paddingBottom: "40px" }}>
          {/* Flotantes */}
          <div className="hidden md:flex flex-col" style={{ position: "absolute", top: "-8px", left: "-24px", ...glassStrong, borderRadius: "16px", padding: "14px 20px", zIndex: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Clientes</span>
            <span style={{ color: "white", fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.03em" }}>42</span>
          </div>
          <div className="hidden md:flex flex-col" style={{ position: "absolute", top: "72px", right: "-20px", ...glassStrong, borderRadius: "16px", padding: "14px 20px", zIndex: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Cobrado</span>
            <span style={{ color: "#4ade80", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>$12,500</span>
          </div>
          <div className="hidden md:flex flex-col" style={{ position: "absolute", bottom: "-8px", left: "32px", ...glassStrong, borderRadius: "16px", padding: "14px 20px", zIndex: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Pendiente</span>
            <span style={{ color: "#f87171", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>$31,000</span>
          </div>

          {/* Card principal */}
          <div style={{ ...glassStrong, borderRadius: "28px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.35)" }}>
            <div style={{ background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "14px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", opacity: 0.8 }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b", opacity: 0.8 }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#4ade80", opacity: 0.8 }} />
              <div style={{ marginLeft: "12px", height: "20px", width: "140px", background: "rgba(255,255,255,0.08)", borderRadius: "6px" }} />
            </div>

            <div style={{ padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h3 style={{ color: "white", fontSize: "1.05rem", fontWeight: 700 }}>Resumen General</h3>
                <span style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: "0.68rem", fontWeight: 700, padding: "4px 10px", borderRadius: "100px" }}>
                  ● En vivo
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: "14px", padding: "16px" }}>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Clientes</p>
                  <p style={{ color: "white", fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.03em" }}>42</p>
                </div>
                <div style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.15)", borderRadius: "14px", padding: "16px" }}>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Préstamos</p>
                  <p style={{ color: "white", fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.03em" }}>58</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {mockupRows.map((row) => (
                  <div key={row.name} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: `1px solid ${row.color}`, color: row.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700 }}>
                        {row.initials}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", fontWeight: 500 }}>{row.name}</span>
                    </div>
                    <span style={{ color: "white", fontSize: "0.92rem", fontWeight: 700 }}>{row.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
