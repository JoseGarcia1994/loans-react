import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/ui/Alert";
import Input from "../components/ui/Input";

function RegisterPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    terms_accepted: false,
  });

  const [loading, setLoading] = useState(false);

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
      setError("You must accept terms and conditions");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        const msg =
          errorData.detail?.[0]?.msg ||
          errorData.detail ||
          "Error creating account";

        // Remove "Value error,"
        setError(msg.replace("Value error,", "").trim());

        return;
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Crear Cuenta</h1>

        {success && (
          <Alert type="success" message="Cuenta creada correctamente" />
        )}

        {error && <Alert type="error" message={error} />}

        <form onSubmit={registerUser} className="space-y-5">
          <Input
            label="Nombre"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <Input
            label="Apellido"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="terms_accepted"
              checked={formData.terms_accepted}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  terms_accepted: e.target.checked,
                })
              }
              className="mt-1"
            />

            <label className="text-sm text-gray-600">
              Acepto los{" "}
              <span
                onClick={() => setShowTerms(true)}
                className="text-blue-600 underline cursor-pointer"
              >
                términos y condiciones
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.terms_accepted}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Creando..." : "Crear Cuenta"}
          </button>
        </form>

        {showTerms && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg relative">
              {/* Cerrar */}
              <button
                onClick={() => setShowTerms(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold mb-4">Términos y Condiciones</h2>

              {/* CONTENIDO */}
              <div className="text-sm text-gray-700 space-y-4 max-h-[420px] overflow-y-auto pr-2">
                <section>
                  <h3 className="font-semibold">
                    1. Aceptación de los términos
                  </h3>
                  <p>
                    Al utilizar esta plataforma, el usuario acepta estos
                    Términos y Condiciones. Si no está de acuerdo, debe dejar de
                    usar el servicio.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">
                    2. Naturaleza de la plataforma
                  </h3>
                  <p>
                    Esta aplicación es una herramienta de gestión de préstamos.
                    NO somos una entidad financiera ni banco.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">3. Uso del sistema</h3>
                  <p>
                    El usuario es responsable de registrar correctamente la
                    información de sus préstamos y clientes.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">4. Registro de pagos</h3>
                  <p>
                    La aplicación NO procesa pagos. Todos los pagos ocurren
                    fuera del sistema.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">5. Confirmación de pagos</h3>
                  <p>
                    Los pagos marcados dentro del sistema solo representan un
                    cambio de estado interno.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">6. Responsabilidad</h3>
                  <p>
                    No nos hacemos responsables de pagos no realizados ni
                    disputas entre usuarios y clientes.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">7. Seguridad de cuenta</h3>
                  <p>
                    El usuario es responsable de mantener la seguridad de su
                    cuenta.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">8. Uso indebido</h3>
                  <p>
                    El uso de la plataforma para fraude o actividades ilegales
                    está prohibido.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">9. Cambios</h3>
                  <p>
                    Nos reservamos el derecho de modificar estos términos en
                    cualquier momento.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">
                    10. No garantía de recuperación de dinero
                  </h3>
                  <p>
                    La plataforma no garantiza la recuperación de dinero
                    prestado entre usuarios y clientes.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">
                    11. Responsabilidad de los datos
                  </h3>
                  <p>
                    Toda la información registrada es responsabilidad del
                    usuario que la ingresa.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">12. No asesoría financiera</h3>
                  <p>
                    La plataforma no ofrece asesoría financiera, legal ni
                    fiscal.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">
                    13. Disponibilidad del servicio
                  </h3>
                  <p>
                    No garantizamos que el servicio esté disponible de forma
                    ininterrumpida.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">
                    14. Respaldo y eliminación de datos
                  </h3>
                  <p>
                    El usuario es responsable de respaldar su información. La
                    plataforma puede eliminar datos en casos de cierre de cuenta
                    o mantenimiento.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold">15. Uso de la plataforma</h3>
                  <p>
                    El sistema está diseñado para uso administrativo personal de
                    gestión de préstamos.
                  </p>
                </section>

                <p className="text-xs text-gray-500 pt-3">
                  Última actualización: Junio 2026
                </p>
              </div>

              {/* BOTÓN ACEPTAR */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      terms_accepted: true,
                    });
                    setShowTerms(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                >
                  Acepto
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
