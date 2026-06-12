import { useState } from "react";
import { TermsModal } from "../terms/TermsModal";

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "13px 16px",
  color: "white",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
};

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.78rem",
          fontWeight: 600,
          marginBottom: "8px",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(74,222,128,0.45)";
          e.target.style.background = "rgba(74,222,128,0.04)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255,255,255,0.08)";
          e.target.style.background = "rgba(255,255,255,0.04)";
        }}
      />
    </div>
  );
}

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    terms_accepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.terms_accepted) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        const msg =
          errorData.detail?.[0]?.msg ||
          errorData.detail ||
          "Error al crear la cuenta.";
        setError(msg.replace("Value error,", "").trim());
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setError("Error al crear la cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 1,
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        {/* Logo móvil */}
        <div
          className="register-mobile-logo"
          style={{
            display: "none",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.4rem",
                letterSpacing: "-0.03em",
                color: "white",
              }}
            >
              Presta
              <span style={{ color: "#4ade80" }}>Control</span>
            </span>
          </a>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              color: "white",
              fontSize: "1.7rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "8px",
            }}
          >
            Crea tu cuenta
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "0.9rem",
            }}
          >
            Empieza a controlar tus préstamos hoy mismo
          </p>
        </div>

        {/* Éxito */}
        {success && (
          <div
            style={{
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.25)",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                color: "#4ade80",
                fontSize: "0.88rem",
                fontWeight: 500,
              }}
            >
              ✓ ¡Cuenta creada! Redirigiendo...
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.2)",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                color: "#f87171",
                fontSize: "0.88rem",
                fontWeight: 500,
              }}
            >
              ⚠ {error}
            </span>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={registerUser}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <Field
              label="Nombre"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Juan"
            />
            <Field
              label="Apellido"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Pérez"
            />
          </div>

          <Field
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
          />

          <div>
            <label
              style={{
                display: "block",
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.78rem",
                fontWeight: 600,
                marginBottom: "8px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                required
                style={{ ...inputStyle, paddingRight: "52px" }}
                onFocus={(e) => {
                  e.target.style.borderColor =
                    "rgba(74,222,128,0.45)";
                  e.target.style.background =
                    "rgba(74,222,128,0.04)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor =
                    "rgba(255,255,255,0.08)";
                  e.target.style.background =
                    "rgba(255,255,255,0.04)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.28)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  padding: 0,
                }}
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {/* Términos */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "14px 16px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
            }}
          >
            <input
              type="checkbox"
              checked={formData.terms_accepted}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  terms_accepted: e.target.checked,
                })
              }
              style={{
                marginTop: "2px",
                accentColor: "#4ade80",
                width: "16px",
                height: "16px",
                flexShrink: 0,
                cursor: "pointer",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.85rem",
                lineHeight: 1.5,
              }}
            >
              Acepto los{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#4ade80",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                términos y condiciones
              </button>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.terms_accepted}
            style={{
              marginTop: "4px",
              width: "100%",
              background:
                loading || !formData.terms_accepted
                  ? "rgba(74,222,128,0.3)"
                  : "linear-gradient(135deg, #4ade80, #22d3ee)",
              color: "#052e16",
              padding: "14px",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "0.97rem",
              border: "none",
              cursor:
                loading || !formData.terms_accepted
                  ? "not-allowed"
                  : "pointer",
              boxShadow:
                loading || !formData.terms_accepted
                  ? "none"
                  : "0 8px 24px rgba(74,222,128,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "opacity 0.2s",
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    border: "2px solid rgba(5,46,20,0.4)",
                    borderTopColor: "#052e16",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Creando cuenta...
              </>
            ) : (
              "Crear cuenta →"
            )}
          </button>
        </form>

        {/* Divisor */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "22px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.75rem",
            }}
          >
            o
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.06)",
            }}
          />
        </div>

        <a
          href="/login"
          style={{
            display: "block",
            textAlign: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "13px",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 600,
            fontSize: "0.93rem",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor =
              "rgba(255,255,255,0.14)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor =
              "rgba(255,255,255,0.08)";
          }}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </a>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          <a
            href="/"
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.78rem",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.color =
                "rgba(255,255,255,0.5)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.color =
                "rgba(255,255,255,0.2)")
            }
          >
            ← Volver al inicio
          </a>
        </p>
      </div>

      {showTerms && (
        <TermsModal
          onClose={() => setShowTerms(false)}
          onAccept={() => {
            setFormData({ ...formData, terms_accepted: true });
            setShowTerms(false);
          }}
        />
      )}
    </>
  );
}