import { glassStrong, sectionBorder } from "./glass";

const benefits = [
  { icon: "⚡", title: "Ahorra tiempo", description: "Olvídate de las libretas. Toda la información de tus clientes y préstamos en un solo lugar." },
  { icon: "✓", title: "Cero errores de cálculo", description: "Los saldos pendientes se actualizan solos cada vez que registras un pago." },
  { icon: "◎", title: "Hecho para prestamistas", description: "Diseñado específicamente para quien presta a 14 semanas y necesita control claro y rápido." },
];

export function Benefits() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", ...sectionBorder }}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>Beneficios</p>
          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>¿Por qué usar nuestra plataforma?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {benefits.map((b) => (
            <div key={b.title} style={{ ...glassStrong, padding: "36px" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "20px" }}>
                {b.icon}
              </div>
              <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700, marginBottom: "10px" }}>{b.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.93rem", lineHeight: 1.7 }}>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
