import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/ui/Alert";
import Input from "../components/ui/Input";

function CreateLoan() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createLoan = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          amount: Number(formData.amount),
          date: formData.date,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        setError(errorData.detail[0].msg);

        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error creating loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Nuevo Prestamo
          </h1>

          {error && <Alert type="error" message={error} />}

          <form onSubmit={createLoan} className="space-y-5">
            <Input
              label="Nombre"
              type="text"
              name="name"
              placeholder="Nombre del cliente"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Monto"
              type="number"
              name="amount"
              placeholder="5000"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <Input
              label="Fecha"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold disabled:bg-blue-300"
            >
              {loading ? "Creando..." : "Crear Prestamo"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateLoan;
