import CreacionCuentos from "../components/CreacionCuentos";

export default function CreacionCuentosView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-amber-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-pink-200 p-8">
        <h1 className="text-5xl font-extrabold text-center text-rose-800 mb-8 tracking-tight">
          Creación de Cuentos Mágicos
        </h1>
        <p className="text-center text-gray-600 text-lg mb-10">
          Elige tus personajes, lugares y acciones para crear historias únicas y divertidas.
        </p>
        <CreacionCuentos />
      </div>
    </div>
  );
}
