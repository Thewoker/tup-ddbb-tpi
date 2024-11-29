import ParticipaEnTorneoForm from "@/components/ParticipaEnTorneoForm";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Añadir Participante
      </h1>
      <ParticipaEnTorneoForm />
    </main>
  );
}
