import PlayerForm from "@/components/PlayerForm";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Crear Jugador
      </h1>
      <PlayerForm />
    </main>
  );
}
