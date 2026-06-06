import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <PublicNavbar />
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contenido */}
          <div>
            <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Gestión de préstamos simplificada
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Controla tus préstamos y pagos en un solo lugar
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Lleva el registro de tus clientes, pagos semanales y saldos
              pendientes de forma fácil y organizada.
            </p>

            {/* Beneficios */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">
                  Clientes organizados en un solo lugar
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">
                  Registro rápido de pagos semanales
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">
                  Saldos actualizados automáticamente
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">
                  Historial completo de cada préstamo
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium text-center transition"
              >
                Crear cuenta
              </Link>

              <a
                href="#demo"
                className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-center transition"
              >
                Ver demostración
              </a>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              🎉 Acceso gratuito durante la etapa de lanzamiento. Los primeros
              usuarios conservarán beneficios exclusivos.
            </p>
          </div>

          {/* Mockup Dashboard */}
          <div className="relative">
            {/* Tarjeta principal */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="bg-gray-100 px-5 py-3 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>

              {/* Dashboard */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6">Resumen General</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Clientes</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Préstamos</p>
                    <p className="text-2xl font-bold">58</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                    <span>Juan Pérez</span>
                    <span className="font-semibold">$250</span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                    <span>María López</span>
                    <span className="font-semibold">$350</span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                    <span>Carlos García</span>
                    <span className="font-semibold">$180</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta flotante 1 */}
            <div className="hidden md:block absolute -top-6 -left-6 bg-white shadow-lg rounded-xl px-5 py-3">
              <p className="text-sm text-gray-500">Clientes</p>
              <p className="font-bold text-2xl">42</p>
            </div>

            {/* Tarjeta flotante 2 */}
            <div className="hidden md:block absolute top-24 -right-8 bg-white shadow-lg rounded-xl px-5 py-3">
              <p className="text-sm text-gray-500">Cobrado</p>
              <p className="font-bold text-green-600">$12,500</p>
            </div>

            {/* Tarjeta flotante 3 */}
            <div className="hidden md:block absolute -bottom-6 left-12 bg-white shadow-lg rounded-xl px-5 py-3">
              <p className="text-sm text-gray-500">Pendiente</p>
              <p className="font-bold text-red-500">$31,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section id="demo" className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <video className="w-full" controls poster="/preview.jpg">
            <source src="/demo.mp4" type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Cómo funciona</h2>

          <p className="mt-3 text-gray-600">
            Organiza tus préstamos en pocos pasos.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              number: "1",

              title: "Registra clientes",

              description: "Guarda la información de cada cliente.",
            },

            {
              number: "2",

              title: "Crea préstamos",

              description: "Define monto, fecha y duración.",
            },

            {
              number: "3",

              title: "Registra pagos",

              description: "Actualiza los pagos semanalmente.",
            },

            {
              number: "4",

              title: "Consulta saldos",

              description: "Visualiza lo pendiente en segundos.",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xl">
                {step.number}
              </div>

              <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>

              <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
