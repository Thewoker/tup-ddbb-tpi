import CompitenForm from "@/components/CompitenForm";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Añadir Competencia
      </h1>
      <CompitenForm />
    </main>
  );
}