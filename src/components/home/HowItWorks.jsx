import { glass, sectionBorder } from "./glass";

const steps = [
  { number: "01", title: "Registra clientes", description: "Guarda el nombre, teléfono y datos de cada cliente prestamista." },
  { number: "02", title: "Crea el préstamo", description: "Define el monto y el plazo — 14 semanas fijas por préstamo." },
  { number: "03", title: "Registra cada pago", description: "Marca manualmente el pago semanal conforme lo recibas." },
  { number: "04", title: "Consulta el saldo", description: "Ve cuánto queda pendiente por cobrar en segundos." },
];

export function HowItWorks() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", ...sectionBorder }}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ marginBottom: "56px" }}>
          <p style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>Proceso</p>
          <h2 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Cómo funciona</h2>
          <p style={{ marginTop: "12px", color: "rgba(255,255,255,0.5)", fontSize: "1.05rem" }}>Organiza tus préstamos en pocos pasos.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.number} style={{ ...glass, padding: "28px" }}>
              <span style={{ color: "#4ade80", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", opacity: 0.8 }}>{step.number}</span>
              <h3 style={{ color: "white", fontSize: "1rem", fontWeight: 700, marginTop: "16px", marginBottom: "8px" }}>{step.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.6 }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
