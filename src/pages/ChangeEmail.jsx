import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

function CheckIcon() {
  return (
    <Icon className="size-3.5">
      <path d="m5 12 4 4L19 6" />
    </Icon>
  );
}

export default function ChangeEmail() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/user/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((user) => {
        if (user?.email) {
          setCurrentEmail(user.email);
        }
      })
      .catch(() => {});
  }, []);

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearMessages();

    if (newEmail.trim().toLowerCase() === currentEmail.toLowerCase()) {
      setError("El nuevo correo debe ser diferente al correo actual.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/email`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            new_email: newEmail.trim(),
            password,
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail ?? "No fue posible actualizar el correo.");
      }

      setSuccess("Correo electrónico actualizado correctamente.");

      setTimeout(() => {
        window.location.href = "/access-preferences";
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible actualizar el correo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111c] px-5 py-10 text-white sm:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 size-[380px] rounded-full bg-emerald-400/[0.07] blur-[110px]" />
        <div className="absolute -right-24 -top-24 size-[440px] rounded-full bg-cyan-400/[0.06] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <Link
          to="/access-preferences"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white/80"
        >
          <Icon className="size-4 transition-transform group-hover:-translate-x-1">
            <path d="m15 18-6-6 6-6" />
          </Icon>
          Preferencias de ingreso
        </Link>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Mi perfil
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
            Cambiar correo electrónico
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Actualiza el correo con el que accedes a tu cuenta y recibes
            notificaciones importantes.
          </p>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0d1925]/90 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-br from-emerald-400/[0.11] via-transparent to-cyan-400/[0.05] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="absolute -bottom-24 -left-24 size-72 rounded-full border border-emerald-300/10" />
              <div className="absolute -bottom-12 -left-12 size-48 rounded-full border border-emerald-300/10" />

              <div className="relative flex h-full flex-col">
                <div className="mb-10 flex size-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300 shadow-[0_0_35px_rgba(52,211,153,0.12)]">
                  <Icon className="size-6">
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="m4 7 8 6 8-6" />
                  </Icon>
                </div>

                <h2 className="max-w-xs text-2xl font-semibold tracking-[-0.025em]">
                  Tu acceso, siempre bajo control.
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                  Verificaremos tu identidad antes de guardar el nuevo correo.
                  La sesión actual seguirá activa.
                </p>

                <div className="mt-9 space-y-4">
                  {[
                    "Confirmación protegida",
                    "Notificación inmediata",
                    "Tus datos siguen seguros",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
                        <CheckIcon />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/10 p-4 lg:mt-auto">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-slate-300">
                    <Icon className="size-4.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                      <path d="m9 12 2 2 4-4" />
                    </Icon>
                  </div>
                  <p className="text-xs leading-5 text-slate-400">
                    Cambio protegido con cifrado de extremo a extremo.
                  </p>
                </div>
              </div>
            </aside>

            <div className="p-7 sm:p-10 lg:p-12">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Paso único
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">
                    Ingresa tus nuevos datos
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-3 py-1.5 text-xs font-medium text-emerald-300">
                  Seguro
                </span>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Correo actual
                  </label>
                  <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 text-slate-400">
                    <Icon className="size-5 shrink-0 text-slate-500">
                      <rect x="3" y="5" width="18" height="14" rx="3" />
                      <path d="m4 7 8 6 8-6" />
                    </Icon>
                    <span className="min-w-0 flex-1 truncate text-sm">
                      {currentEmail || "Cargando correo..."}
                    </span>
                    <span className="flex size-6 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                      <CheckIcon />
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="new-email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Nuevo correo
                  </label>
                  <div className="group flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#09131e] px-4 transition focus-within:border-emerald-300/60 focus-within:ring-4 focus-within:ring-emerald-300/[0.07]">
                    <Icon className="size-5 shrink-0 text-slate-500 transition-colors group-focus-within:text-emerald-300">
                      <path d="M4 4h16v16H4z" />
                      <path d="m4 6 8 7 8-7" />
                    </Icon>
                    <input
                      id="new-email"
                      type="email"
                      value={newEmail}
                      onChange={(event) => {
                        setNewEmail(event.target.value);
                        clearMessages();
                      }}
                      placeholder="nombre@correo.com"
                      className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Te enviaremos una confirmación a esta dirección.
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-300"
                    >
                      Contraseña actual
                    </label>
                    <span className="text-xs text-slate-600">
                      Para confirmar tu identidad
                    </span>
                  </div>
                  <div className="group flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#09131e] px-4 transition focus-within:border-emerald-300/60 focus-within:ring-4 focus-within:ring-emerald-300/[0.07]">
                    <Icon className="size-5 shrink-0 text-slate-500 transition-colors group-focus-within:text-emerald-300">
                      <rect x="5" y="10" width="14" height="10" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" />
                    </Icon>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        clearMessages();
                      }}
                      placeholder="Ingresa tu contraseña"
                      className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-slate-300"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      <Icon className="size-5">
                        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </Icon>
                    </button>
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

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 text-sm font-bold text-[#06221b] shadow-[0_14px_35px_rgba(52,211,153,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(52,211,153,0.26)] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-[#06221b]/25 border-t-[#06221b]" />
                      Guardando cambio...
                    </>
                  ) : (
                    <>
                      Actualizar correo
                      <Icon className="size-4 transition-transform group-hover:translate-x-1">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </Icon>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-600">
          ¿Necesitas ayuda?{" "}
          <a href="#" className="text-slate-400 transition hover:text-white">
            Contacta a soporte
          </a>
        </p>
      </div>
    </main>
  );
}
