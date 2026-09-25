import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { ClientCard } from "../components/clients/ClientCard";
import { ClientStatsCards } from "../components/clients/ClientStatsCards";
import { ClientSearchBar } from "../components/clients/ClientSearchBar";
import { DeleteClientModal } from "../components/clients/DeleteClientModal";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showSuccess, setShowSuccess] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/client/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClients(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/client/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setClients((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
      setShowSuccess("Cliente eliminado correctamente");
      setTimeout(() => setShowSuccess(""), 2500);
    } catch {
      alert("Error eliminando cliente");
    } finally {
      setLoadingDelete(false);
    }
  };

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.first_name?.toLowerCase().includes(q) ||
      c.last_name?.toLowerCase().includes(q) ||
      c.phone?.includes(q)
    );
  });

  return (
    <DashboardLayout activePath="/clients" title="Clientes" subtitle="Gestiona tu cartera de clientes y sus puntos">

      {/* Toast */}
      {showSuccess && (
        <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", backdropFilter: "blur(12px)", color: "#4ade80", padding: "12px 20px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", fontSize: "0.88rem", fontWeight: 600, zIndex: 100, display: "flex", alignItems: "center", gap: "8px" }}>
          ✓ {showSuccess}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
        <a
          href="/create-client"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #4ade80, #22d3ee)", color: "#052e16", padding: "9px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(74,222,128,0.28)" }}
        >
          + Nuevo cliente
        </a>
      </div>

      {/* Stats */}
      <ClientStatsCards clients={clients} />

      {/* Search */}
      <ClientSearchBar value={search} onChange={setSearch} />

      {/* List */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: "160px", background: "rgba(255,255,255,0.05)", borderRadius: "18px", animation: "pulse 1.5s ease-in-out infinite" }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 24px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "12px" }}>👥</div>
          <h3 style={{ color: "white", fontWeight: 700, fontSize: "1rem", marginBottom: "8px" }}>
            {search ? `Sin resultados para "${search}"` : "Sin clientes aún"}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem", marginBottom: "20px" }}>
            {search ? "Intenta con otro nombre o teléfono." : "Agrega tu primer cliente para empezar."}
          </p>
          {!search && (
            <a
              href="/create-client"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg, #4ade80, #22d3ee)", color: "#052e16", padding: "10px 20px", borderRadius: "10px", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}
            >
              + Nuevo cliente
            </a>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={(c) => { window.location.href = `/clients/edit/${c.id}`; }}
              onDelete={(c) => setDeleteTarget(c)}
            />
          ))}
        </div>
      )}

      {deleteTarget && (
        <DeleteClientModal
          client={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={loadingDelete}
        />
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
    </DashboardLayout>
  );
}
