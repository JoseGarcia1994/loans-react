import { sectionBorder } from "./glass";

const upcoming = [
  { icon: "🔔", title: "Avisos automáticos", description: "Envía un mensaje al cliente un día antes de su fecha de cobro, sin que tengas que recordarlo." },
  { icon: "📊", title: "Historial por cliente", description: "Consulta todos los préstamos pasados y activos de cada cliente en un solo perfil." },
  { icon: "📁", title: "Administración avanzada", description: "Notas, documentos y seguimiento personalizado para cada cliente." },
];

export function Upcoming() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "96px 0", ...sectionBorder }}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ display: "inline-block", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px", marginBottom: "16px" }}>
            Próximamente
          </span>
          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Lo que viene</h2>
          <p style={{ marginTop: "12px", color: "rgba(255,255,255,0.45)", fontSize: "1.05rem", maxWidth: "500px", margin: "12px auto 0" }}>
            Seguimos trabajando para darte más herramientas que hagan tu trabajo aún más fácil.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {upcoming.map((item) => (
            <div key={item.title} style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "24px", padding: "36px", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "100px" }}>
                Próximamente
              </div>
              <div style={{ width: "48px", height: "48px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "20px" }}>
                {item.icon}
              </div>
              <h3 style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.93rem", lineHeight: 1.7 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
