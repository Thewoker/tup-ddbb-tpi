'use client'

import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Mi Aplicación
          </Link>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link href="/" className="hover:text-blue-200 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center hover:text-blue-200 transition-colors">
                    Personas <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/dashboard/CrearUsuario" className="w-full">Crear Usuario</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/CrearArbitro" className="w-full">Crear Árbitro</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/CrearJugador" className="w-full">Crear Jugador</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center hover:text-blue-200 transition-colors">
                    Infraestructura <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/dashboard/CrearCancha" className="w-full">Crear Cancha</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/CrearEquipo" className="w-full">Crear Equipo</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/CrearTorneo" className="w-full">Crear Torneo</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center hover:text-blue-200 transition-colors">
                    Eventos <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/dashboard/CrearEncuentro" className="w-full">Crear Encuentro</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/arbitraje" className="w-full">Crear Arbitraje</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/Competencia" className="w-full">Crear Competencia</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center hover:text-blue-200 transition-colors">
                    Participaciones <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/dashboard/ParticipaTorneo" className="w-full">Crear Participa en Torneo</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/ParticipaPartido" className="w-full">Crear Participa en Partido</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

