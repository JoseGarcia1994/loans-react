const terms = [
  {
    title: "1. Aceptación de los términos",
    body: "Al utilizar esta plataforma, el usuario acepta estos Términos y Condiciones. Si no está de acuerdo, debe dejar de usar el servicio.",
  },
  {
    title: "2. Naturaleza de la plataforma",
    body: "Esta aplicación es una herramienta de gestión de préstamos. NO somos una entidad financiera ni banco.",
  },
  {
    title: "3. Uso del sistema",
    body: "El usuario es responsable de registrar correctamente la información de sus préstamos y clientes.",
  },
  {
    title: "4. Registro de pagos",
    body: "La aplicación NO procesa pagos. Todos los pagos ocurren fuera del sistema.",
  },
  {
    title: "5. Confirmación de pagos",
    body: "Los pagos marcados dentro del sistema solo representan un cambio de estado interno.",
  },
  {
    title: "6. Responsabilidad",
    body: "No nos hacemos responsables de pagos no realizados ni disputas entre usuarios y clientes.",
  },
  {
    title: "7. Seguridad de cuenta",
    body: "El usuario es responsable de mantener la seguridad de su cuenta.",
  },
  {
    title: "8. Uso indebido",
    body: "El uso de la plataforma para fraude o actividades ilegales está prohibido.",
  },
  {
    title: "9. Cambios",
    body: "Nos reservamos el derecho de modificar estos términos en cualquier momento.",
  },
  {
    title: "10. No garantía de recuperación de dinero",
    body: "La plataforma no garantiza la recuperación de dinero prestado entre usuarios y clientes.",
  },
  {
    title: "11. Responsabilidad de los datos",
    body: "Toda la información registrada es responsabilidad del usuario que la ingresa.",
  },
  {
    title: "12. No asesoría financiera",
    body: "La plataforma no ofrece asesoría financiera, legal ni fiscal.",
  },
  {
    title: "13. Disponibilidad del servicio",
    body: "No garantizamos que el servicio esté disponible de forma ininterrumpida.",
  },
  {
    title: "14. Respaldo y eliminación de datos",
    body: "El usuario es responsable de respaldar su información. La plataforma puede eliminar datos en casos de cierre de cuenta o mantenimiento.",
  },
  {
    title: "15. Uso de la plataforma",
    body: "El sistema está diseñado para uso administrativo personal de gestión de préstamos.",
  },
  {
    title: "16. Cancelación de cuenta",
    body: "Puedes eliminar tu cuenta en cualquier momento. Al hacerlo, todos tus datos serán eliminados de forma permanente e irreversible.",
  },
];

export function TermsModal({ onClose, onAccept }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "rgba(13,17,23,0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          animation: "fadeIn 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                color: "white",
                fontSize: "1.1rem",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Términos y Condiciones
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.75rem",
                marginTop: "4px",
              }}
            >
              Última actualización: Junio 2026
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              cursor: "pointer",
              color: "rgba(255,255,255,0.45)",
              fontSize: "0.85rem",
              lineHeight: 1,
              padding: "6px 10px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div
          style={{
            padding: "20px 28px",
            maxHeight: "400px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {terms.map((item) => (
            <div
              key={item.title}
              style={{
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Botones */}
        <div
          style={{
            padding: "20px 28px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "12px",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Cerrar
          </button>
          <button
            onClick={onAccept}
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #4ade80, #22d3ee)",
              border: "none",
              borderRadius: "12px",
              padding: "12px",
              color: "#052e16",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(74,222,128,0.25)",
            }}
          >
            Aceptar términos
          </button>
        </div>
      </div>
    </div>
  );
}
