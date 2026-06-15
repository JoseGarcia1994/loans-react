import { useState } from "react";

import Input from "../components/ui/Input";
import Alert from "../components/ui/Alert";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8000/user/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: currentPassword,
            new_password: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }

      setSuccess("Contraseña actualizada correctamente");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className="
          max-w-xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-sm
          p-8
        "
      >
        <h1 className="text-3xl font-bold mb-6">
          Cambiar Contraseña
        </h1>

        {error && (
          <Alert
            type="error"
            message={error}
          />
        )}

        {success && (
          <Alert
            type="success"
            message={success}
          />
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Contraseña actual"
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            required
          />

          <Input
            label="Nueva contraseña"
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            required
          />

          <Input
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-xl
              font-medium
              hover:bg-blue-700
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Guardando..."
              : "Guardar Contraseña"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ChangePassword;