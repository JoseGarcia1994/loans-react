const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function CtaSection() {
  return (
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
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />

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
  );
}
