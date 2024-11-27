import { AgregarArbitroForm } from "@/components/AgregarArbitroForm";
import { AgregarCanchaForm } from "@/components/AgregarCancha"
import { AgregarEquipoForm } from "@/components/AgregarEquipo"
import { AgregarJugadorForm } from "@/components/AgregarJugador";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <h1 className="text-4xl font-bold mb-8">Gestión de Torneos de Fútbol</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Agregar Árbitro</h2>
                    <AgregarArbitroForm />
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Agregar Cancha</h2>
                    <AgregarCanchaForm />
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Agregar Equipo</h2>
                    <AgregarEquipoForm />
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Agregar Jugador</h2>
                    <AgregarJugadorForm />
                </section>
            </div>
        </main>
    )
}

