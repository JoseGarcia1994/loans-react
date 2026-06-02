import Layout from "../components/Layout";

function Profile() {
  return (
    <Layout>
      <div
        className="
          max-w-2xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-sm
          p-8
        "
      >
        <h1 className="text-3xl font-bold mb-6">
          Mi Perfil
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">
              Nombre
            </p>

            <p className="font-medium">
              José García
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Correo
            </p>

            <p className="font-medium">
              jose@email.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;