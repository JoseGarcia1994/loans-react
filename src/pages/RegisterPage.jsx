import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/ui/Alert";
import Input from "../components/ui/Input";

function RegisterPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Creando..." : "Crear Cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
