import { useState } from "react";

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

const glass = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "20px",
};

const glassStrong = {
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "24px",
};

const steps = [
  { number: "01", title: "Registra clientes", description: "Guarda el nombre, teléfono y datos de cada cliente prestamista." },
  { number: "02", title: "Crea el préstamo", description: "Define el monto y el plazo — 14 semanas fijas por préstamo." },
  { number: "03", title: "Registra cada pago", description: "Marca manualmente el pago semanal conforme lo recibas." },
  { number: "04", title: "Consulta el saldo", description: "Ve cuánto queda pendiente por cobrar en segundos." },
];

const benefits = [
  { icon: "⚡", title: "Ahorra tiempo", description: "Olvídate de las libretas. Toda la información de tus clientes y préstamos en un solo lugar." },
  { icon: "✓", title: "Cero errores de cálculo", description: "Los saldos pendientes se actualizan solos cada vez que registras un pago." },
  { icon: "◎", title: "Hecho para prestamistas", description: "Diseñado específicamente para quien presta a 14 semanas y necesita control claro y rápido." },
];

const upcoming = [
  { icon: "🔔", title: "Avisos automáticos", description: "Envía un mensaje al cliente un día antes de su fecha de cobro, sin que tengas que recordarlo." },
  { icon: "📊", title: "Historial por cliente", description: "Consulta todos los préstamos pasados y activos de cada cliente en un solo perfil." },
  { icon: "📁", title: "Administración avanzada", description: "Notas, documentos y seguimiento personalizado para cada cliente." },
];

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
        <span style={{
          color: "white", fontSize: "1.4rem", lineHeight: 1, flexShrink: 0,
          display: "inline-block",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
        }}>+</span>
      </div>
      {open && (
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.93rem", lineHeight: 1.7, marginTop: "12px" }}>{a}</p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2027 0%, #1a3a2a 30%, #0d3b4f 65%, #0f2027 100%)",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ── Orbs decorativos de fondo ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-100px", left: "-100px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "-120px",
          width: "450px", height: "450px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "30%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)",
        }} />
      </div>

      {/* ── Navbar ── */}
      <nav style={{
        ...glass,
        borderRadius: 0,
        borderLeft: "none", borderRight: "none", borderTop: "none",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "64px" }}>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "white" }}>
            Presta<span style={{ color: "#4ade80" }}>Control</span>
          </span>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", fontWeight: 500, padding: "8px 16px", borderRadius: "8px" }}
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              className="inline-flex items-center gap-2"
              style={{
                background: "rgba(74,222,128,0.9)",
                color: "#052e16",
                fontSize: "0.88rem", fontWeight: 700,
                padding: "8px 18px", borderRadius: "10px",
                backdropFilter: "blur(8px)",
              }}
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6" style={{ paddingTop: "96px", paddingBottom: "112px", position: "relative", zIndex: 1 }}>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <span
              className="inline-flex items-center gap-2 mb-6"
              style={{
                ...glass,
                borderRadius: "100px",
                color: "#86efac",
                fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "6px 14px",
                display: "inline-flex",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Control de préstamos a 14 semanas
            </span>

            <h1 style={{
              color: "white",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}>
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
                  ...glass,
                  borderRadius: "12px",
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
            {/* Floating — Clientes */}
            <div className="hidden md:flex flex-col" style={{
              position: "absolute", top: "-8px", left: "-24px",
              ...glassStrong, borderRadius: "16px",
              padding: "14px 20px", zIndex: 10,
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Clientes</span>
              <span style={{ color: "white", fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.03em" }}>42</span>
            </div>

            {/* Floating — Cobrado */}
            <div className="hidden md:flex flex-col" style={{
              position: "absolute", top: "72px", right: "-20px",
              ...glassStrong, borderRadius: "16px",
              padding: "14px 20px", zIndex: 10,
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Cobrado</span>
              <span style={{ color: "#4ade80", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>$12,500</span>
            </div>

            {/* Floating — Pendiente */}
            <div className="hidden md:flex flex-col" style={{
              position: "absolute", bottom: "-8px", left: "32px",
              ...glassStrong, borderRadius: "16px",
              padding: "14px 20px", zIndex: 10,
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Pendiente</span>
              <span style={{ color: "#f87171", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>$31,000</span>
            </div>

            {/* Main card */}
            <div style={{
              ...glassStrong,
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
            }}>
              {/* Browser bar */}
              <div style={{
                background: "rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                padding: "14px 20px", display: "flex", alignItems: "center", gap: "8px",
              }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", opacity: 0.8 }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b", opacity: 0.8 }} />
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#4ade80", opacity: 0.8 }} />
                <div style={{ marginLeft: "12px", height: "20px", width: "140px", background: "rgba(255,255,255,0.08)", borderRadius: "6px" }} />
              </div>

              <div style={{ padding: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                  <h3 style={{ color: "white", fontSize: "1.05rem", fontWeight: 700 }}>Resumen General</h3>
                  <span style={{
                    background: "rgba(74,222,128,0.15)",
                    border: "1px solid rgba(74,222,128,0.3)",
                    color: "#4ade80",
                    fontSize: "0.68rem", fontWeight: 700,
                    padding: "4px 10px", borderRadius: "100px",
                  }}>
                    ● En vivo
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  <div style={{
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.15)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Clientes</p>
                    <p style={{ color: "white", fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.03em" }}>42</p>
                  </div>
                  <div style={{
                    background: "rgba(56,189,248,0.1)",
                    border: "1px solid rgba(56,189,248,0.15)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Préstamos</p>
                    <p style={{ color: "white", fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.03em" }}>58</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { name: "Juan Pérez", amount: "$250", initials: "J", color: "rgba(74,222,128,0.8)" },
                    { name: "María López", amount: "$350", initials: "M", color: "rgba(56,189,248,0.8)" },
                    { name: "Carlos García", amount: "$180", initials: "C", color: "rgba(167,139,250,0.8)" },
                  ].map((row) => (
                    <div key={row.name} style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "10px", padding: "10px 14px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{
                          width: "30px", height: "30px", borderRadius: "50%",
                          background: "rgba(255,255,255,0.1)",
                          border: `1px solid ${row.color}`,
                          color: row.color,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.7rem", fontWeight: 700,
                        }}>
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

      {/* ── Cómo funciona ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "96px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
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

      {/* ── Video ── */}
      <section id="demo" className="max-w-5xl mx-auto px-6" style={{ padding: "96px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>Demo</p>
          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Mira cómo funciona</h2>
          <p style={{ marginTop: "12px", color: "rgba(255,255,255,0.5)", fontSize: "1.05rem" }}>Aprende a utilizar la plataforma en pocos minutos.</p>
        </div>
        <div style={{ ...glassStrong, borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.35)" }}>
          <video className="w-full" controls poster="/preview.jpg">
            <source src="/demo.mp4" type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </div>
      </section>

      {/* ── Beneficios ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "96px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>Beneficios</p>
            <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>¿Por qué usar nuestra plataforma?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} style={{ ...glassStrong, padding: "36px" }}>
                <div style={{
                  width: "48px", height: "48px",
                  background: "rgba(74,222,128,0.12)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: "14px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.2rem", marginBottom: "20px",
                }}>
                  {b.icon}
                </div>
                <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700, marginBottom: "10px" }}>{b.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.93rem", lineHeight: 1.7 }}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Próximamente ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "96px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{
              display: "inline-block",
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#a5b4fc",
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: "100px", marginBottom: "16px",
            }}>
              Próximamente
            </span>
            <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>Lo que viene</h2>
            <p style={{ marginTop: "12px", color: "rgba(255,255,255,0.45)", fontSize: "1.05rem", maxWidth: "500px", margin: "12px auto 0" }}>
              Seguimos trabajando para darte más herramientas que hagan tu trabajo aún más fácil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {upcoming.map((item) => (
              <div key={item.title} style={{
                background: "rgba(99,102,241,0.05)",
                border: "1px solid rgba(99,102,241,0.15)",
                borderRadius: "24px", padding: "36px",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  color: "#a5b4fc",
                  fontSize: "0.62rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "3px 10px", borderRadius: "100px",
                }}>
                  Próximamente
                </div>
                <div style={{
                  width: "48px", height: "48px",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "14px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem", marginBottom: "20px",
                }}>
                  {item.icon}
                </div>
                <h3 style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.93rem", lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "96px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
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

      {/* ── CTA Final ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 24px 96px" }}>
        <div className="max-w-7xl mx-auto">
          <div style={{
            background: "linear-gradient(135deg, rgba(74,222,128,0.15) 0%, rgba(56,189,248,0.1) 50%, rgba(99,102,241,0.12) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "28px",
            padding: "clamp(48px, 8vw, 80px) clamp(24px, 6vw, 64px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Orb interno */}
            <div style={{
              position: "absolute", top: "-80px", right: "-80px",
              width: "260px", height: "260px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: "-60px", left: "-60px",
              width: "220px", height: "220px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            <p style={{ color: "#86efac", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>Empieza hoy</p>
            <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Comienza a organizar tus préstamos hoy mismo
            </h2>
            <p style={{ marginTop: "16px", color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "480px", margin: "16px auto 0" }}>
              Registra tus clientes, crea préstamos a 14 semanas y lleva el control de cada pago sin esfuerzo.
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2"
              style={{
                marginTop: "36px",
                background: "linear-gradient(135deg, #4ade80, #22d3ee)",
                color: "#052e16",
                padding: "16px 36px", borderRadius: "14px",
                fontWeight: 700, fontSize: "1rem",
                boxShadow: "0 8px 40px rgba(74,222,128,0.35)",
                display: "inline-flex", alignItems: "center", gap: "8px",
              }}
            >
              Crear cuenta gratis <ArrowRight />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
