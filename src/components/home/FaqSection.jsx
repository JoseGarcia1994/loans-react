import { useState } from "react";
import { glass, sectionBorder } from "./glass";

const faqs = [
  { q: "¿Necesito instalar algo?", a: "No. Todo funciona desde tu navegador, en cualquier dispositivo." },
  { q: "¿Puedo usarlo desde mi celular?", a: "Sí. La plataforma es totalmente compatible con móviles." },
  { q: "¿Solo funciona con préstamos a 14 semanas?", a: "Sí, por ahora el sistema está optimizado para el modelo de 14 semanas. En el futuro se podrán configurar plazos personalizados según las necesidades de cada prestamista." },
  { q: "¿La plataforma hace cobros o procesa pagos?", a: "No. PrestaControl es únicamente una herramienta de registro y control. Tú gestionas los cobros, nosotros te ayudamos a llevar el orden." },
  { q: "¿Mis datos están seguros?", a: "Sí. La información se almacena de forma segura y solo tú tienes acceso a ella." },
  { q: "¿La plataforma es gratuita?", a: "Sí. Actualmente está en etapa de lanzamiento y es completamente gratuita. Los primeros usuarios conservarán beneficios exclusivos." },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        ...glass,
        padding: "20px 24px",
        cursor: "pointer",
        marginBottom: "8px",
        transition: "background 0.2s",
        background: open ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", fontWeight: 500 }}>{q}</span>
        <span style={{ color: "white", fontSize: "1.4rem", lineHeight: 1, flexShrink: 0, display: "inline-block", transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
          +
        </span>
      </div>
      {open && (
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.93rem", lineHeight: 1.7, marginTop: "12px" }}>{a}</p>
      )}
    </div>
  );
}

export function FaqSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", ...sectionBorder }}>
      <div className="max-w-3xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>FAQ</p>
          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Preguntas frecuentes</h2>
        </div>
        <div>
          {faqs.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
