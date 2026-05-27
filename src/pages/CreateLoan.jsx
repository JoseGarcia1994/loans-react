import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateLoan() {
  const navigate = useNavigate();

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
        throw new Error("Error creating loan");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Nuevo Prestamo
        </h1>

        <form
          onSubmit={createLoan}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre
            </label>

            <input
              type="text"
              name="name"
              placeholder="Nombre del cliente"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monto
            </label>

            <input
              type="number"
              name="amount"
              placeholder="5000"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
  );
}

export default CreateLoan;