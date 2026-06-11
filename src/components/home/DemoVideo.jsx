import { glassStrong } from "./glass";

export function DemoVideo() {
  return (
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
  );
}
