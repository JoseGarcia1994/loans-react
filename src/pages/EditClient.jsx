import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const emptyForm = {
  first_name: "",
  last_name: "",
  phone: "",
  address: "",
  notes: "",
};

function Icon({ children, className = "size-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function Field({ label, name, value, onChange, placeholder, required, icon }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-emerald-300">*</span>}
      </label>
      <div className="group flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#09131e] px-4 transition focus-within:border-emerald-300/60 focus-within:ring-4 focus-within:ring-emerald-300/[0.07]">
        <Icon className="size-5 shrink-0 text-slate-500 transition-colors group-focus-within:text-emerald-300">
          {icon}
        </Icon>
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
        />
      </div>
    </div>
  );
}

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyForm);
  const [loadingClient, setLoadingClient] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (!id) {
      setError("No se encontró el identificador del cliente.");
      setLoadingClient(false);
      return;
    }

    const fetchClient = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/client/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.detail ?? "No fue posible cargar el cliente.");
        }

        const client = data?.data ?? data;
        setFormData({
          first_name: client?.first_name ?? "",
          last_name: client?.last_name ?? "",
          phone: client?.phone ?? "",
          address: client?.address ?? "",
          notes: client?.notes ?? "",
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No fue posible cargar el cliente.",
        );
      } finally {
        setLoadingClient(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
    setSuccess("");
  };

  const updateClient = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/client/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.detail ?? "No fue posible actualizar el cliente.");
      }

      setSuccess("Cliente actualizado correctamente.");
      window.setTimeout(() => navigate("/clients"), 900);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible actualizar el cliente.",
      );
    } finally {
      setSaving(false);
    }
  };

  const fullName =
    `${formData.first_name} ${formData.last_name}`.trim() || "Cliente";
  const initials =
    `${formData.first_name?.[0] ?? ""}${formData.last_name?.[0] ?? ""}`.toUpperCase() ||
    "CL";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111c] px-5 py-10 text-white sm:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 size-[380px] rounded-full bg-emerald-400/[0.07] blur-[110px]" />
        <div className="absolute -right-24 -top-24 size-[440px] rounded-full bg-cyan-400/[0.06] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <Link
          to="/clients"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white/80"
        >
          <Icon className="size-4 transition-transform group-hover:-translate-x-1">
            <path d="m15 18-6-6 6-6" />
          </Icon>
          Volver a clientes
        </Link>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Cartera de clientes
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
            Editar cliente
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Mantén actualizada la información de contacto y las notas de tu
            cliente.
          </p>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0d1925]/90 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-br from-emerald-400/[0.11] via-transparent to-cyan-400/[0.05] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="absolute -bottom-24 -left-24 size-72 rounded-full border border-emerald-300/10" />
              <div className="absolute -bottom-12 -left-12 size-48 rounded-full border border-emerald-300/10" />

              <div className="relative flex h-full flex-col">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-xl font-bold text-emerald-300 shadow-[0_0_35px_rgba(52,211,153,0.12)]">
                  {loadingClient ? (
                    <span className="size-5 animate-spin rounded-full border-2 border-emerald-300/25 border-t-emerald-300" />
                  ) : (
                    initials
                  )}
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Perfil del cliente
                </p>
                <h2 className="mt-2 max-w-xs text-2xl font-semibold tracking-[-0.025em]">
                  {loadingClient ? "Cargando información..." : fullName}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                  Los cambios que realices se reflejarán en su perfil y en la
                  gestión de sus préstamos.
                </p>

                <div className="mt-9 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/10 p-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-slate-400">
                      <Icon className="size-4.5">
                        <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.9Z" />
                      </Icon>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Teléfono</p>
                      <p className="mt-0.5 truncate text-sm text-slate-300">
                        {formData.phone || "Sin teléfono registrado"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/10 p-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-slate-400">
                      <Icon className="size-4.5">
                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </Icon>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Dirección</p>
                      <p className="mt-0.5 truncate text-sm text-slate-300">
                        {formData.address || "Sin dirección registrada"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-3 text-xs leading-5 text-slate-500 lg:mt-auto">
                  <Icon className="size-4 shrink-0 text-emerald-300">
                    <path d="m5 12 4 4L19 6" />
                  </Icon>
                  Información sincronizada con la ficha del cliente.
                </div>
              </div>
            </aside>

            <div className="p-7 sm:p-10 lg:p-12">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Información personal
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">
                    Actualiza sus datos
                  </h2>
                </div>
                {id && (
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-400">
                    ID {id}
                  </span>
                )}
              </div>

              {loadingClient ? (
                <div className="space-y-5" aria-label="Cargando cliente">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item}>
                        <div className="mb-2 h-4 w-20 animate-pulse rounded bg-white/[0.06]" />
                        <div className="h-14 animate-pulse rounded-2xl bg-white/[0.04]" />
                      </div>
                    ))}
                  </div>
                  <div className="h-28 animate-pulse rounded-2xl bg-white/[0.04]" />
                </div>
              ) : (
                <form className="space-y-5" onSubmit={updateClient}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Nombre"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Nombre"
                      required
                      icon={
                        <>
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 21a8 8 0 0 1 16 0" />
                        </>
                      }
                    />
                    <Field
                      label="Apellido"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Apellido"
                      required
                      icon={
                        <>
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 21a8 8 0 0 1 16 0" />
                        </>
                      }
                    />
                    <Field
                      label="Teléfono"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ej. 555 123 4567"
                      icon={
                        <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.9Z" />
                      }
                    />
                    <Field
                      label="Dirección"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Calle, número, ciudad"
                      icon={
                        <>
                          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </>
                      }
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label
                        htmlFor="notes"
                        className="text-sm font-medium text-slate-300"
                      >
                        Notas
                      </label>
                      <span className="text-xs text-slate-600">
                        {formData.notes.length} caracteres
                      </span>
                    </div>
                    <div className="group flex min-h-28 gap-3 rounded-2xl border border-white/10 bg-[#09131e] p-4 transition focus-within:border-emerald-300/60 focus-within:ring-4 focus-within:ring-emerald-300/[0.07]">
                      <Icon className="mt-0.5 size-5 shrink-0 text-slate-500 transition-colors group-focus-within:text-emerald-300">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                        <path d="M14 2v6h6M8 13h8M8 17h5" />
                      </Icon>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Agrega información útil sobre el cliente..."
                        rows={4}
                        className="min-w-0 flex-1 resize-none bg-transparent text-sm leading-6 text-white outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {(error || success) && (
                    <div
                      className={`rounded-xl border px-4 py-3 text-sm ${
                        success
                          ? "border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-200"
                          : "border-rose-300/20 bg-rose-300/[0.08] text-rose-200"
                      }`}
                      role="status"
                    >
                      {success || error}
                    </div>
                  )}

                  <div className="grid gap-3 pt-1 sm:grid-cols-[0.72fr_1.28fr]">
                    <Link
                      to="/clients"
                      className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      Cancelar
                    </Link>
                    <button
                      type="submit"
                      disabled={saving}
                      className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 text-sm font-bold text-[#06221b] shadow-[0_14px_35px_rgba(52,211,153,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(52,211,153,0.26)] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {saving ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-[#06221b]/25 border-t-[#06221b]" />
                          Guardando cambios...
                        </>
                      ) : (
                        <>
                          Guardar cambios
                          <Icon className="size-4 transition-transform group-hover:translate-x-1">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </Icon>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
