import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/ui/Alert";
import Input from "../components/ui/Input";

function EditLoan() {
  const { id } = useParams();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLoan();
  }, []);

  const fetchLoan = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/loans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setFormData({
        name: data.name,
        amount: data.amount,
        date: data.date,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateLoan = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/loans/${id}`, {
        method: "PUT",
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
      alert("Error updating loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Editar Prestamo
        </h1>

        {error && <Alert type="error" message={error} />}

        <form onSubmit={updateLoan} className="space-y-5">
          <Input
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Monto"
            type="number"
            name="amount"
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
            {loading ? "Actualizando..." : "Actualizar Prestamo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditLoan;
