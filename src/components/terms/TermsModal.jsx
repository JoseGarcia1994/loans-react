function TermsModal({ onClose, onAccept }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg relative">
        {/* Close */}
        <button
          onClick={onclose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Términos y Condiciones</h2>

        {/* CONTENT */}
        <div className="text-sm text-gray-700 space-y-4 max-h-[420px] overflow-y-auto pr-2">
          <section>
            <h3 className="font-semibold">1. Aceptación de los términos</h3>
            <p>
              Al utilizar esta plataforma, el usuario acepta estos Términos y
              Condiciones. Si no está de acuerdo, debe dejar de usar el
              servicio.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">2. Naturaleza de la plataforma</h3>
            <p>
              Esta aplicación es una herramienta de gestión de préstamos. NO
              somos una entidad financiera ni banco.
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
              La aplicación NO procesa pagos. Todos los pagos ocurren fuera del
              sistema.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">5. Confirmación de pagos</h3>
            <p>
              Los pagos marcados dentro del sistema solo representan un cambio
              de estado interno.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">6. Responsabilidad</h3>
            <p>
              No nos hacemos responsables de pagos no realizados ni disputas
              entre usuarios y clientes.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">7. Seguridad de cuenta</h3>
            <p>
              El usuario es responsable de mantener la seguridad de su cuenta.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">8. Uso indebido</h3>
            <p>
              El uso de la plataforma para fraude o actividades ilegales está
              prohibido.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">9. Cambios</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">
              10. No garantía de recuperación de dinero
            </h3>
            <p>
              La plataforma no garantiza la recuperación de dinero prestado
              entre usuarios y clientes.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">11. Responsabilidad de los datos</h3>
            <p>
              Toda la información registrada es responsabilidad del usuario que
              la ingresa.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">12. No asesoría financiera</h3>
            <p>La plataforma no ofrece asesoría financiera, legal ni fiscal.</p>
          </section>

          <section>
            <h3 className="font-semibold">13. Disponibilidad del servicio</h3>
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
              plataforma puede eliminar datos en casos de cierre de cuenta o
              mantenimiento.
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

        {/* ACCEPT BUTTON */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onAccept}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            Acepto
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;