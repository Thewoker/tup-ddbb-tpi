"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

const formSchema = z.object({
    dni: z.string().min(8, { message: "El DNI debe tener al menos 8 caracteres." }),
    fechaNacimiento: z.date({
        required_error: "La fecha de nacimiento es requerida.",
    }),
    telefono: z.string().min(10, { message: "El teléfono debe tener al menos 10 dígitos." }),
    nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    apellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
    direccion: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
    experiencia: z.string().min(1, { message: "La experiencia es requerida." }),
    certificacion: z.string().min(2, { message: "La certificación debe tener al menos 2 caracteres." }),
})

export function AgregarArbitroForm() {
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dni: "",
            telefono: "",
            nombre: "",
            apellido: "",
            direccion: "",
            experiencia: "",
            certificacion: "",
        },
    })

    function onSubmit(values) {
        toast({
            title: "Árbitro agregado",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DNI</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el DNI" {...field} />
                            </FormControl>
                            <FormDescription>
                                Este es el número de identificación del árbitro.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fechaNacimiento"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Fecha de Nacimiento</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Seleccione una fecha</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Fecha de nacimiento del árbitro.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el teléfono" {...field} />
                            </FormControl>
                            <FormDescription>
                                Número de teléfono del árbitro.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el nombre" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apellido"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el apellido" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese la dirección" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="experiencia"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Experiencia</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese la experiencia" {...field} />
                            </FormControl>
                            <FormDescription>
                                Años de experiencia como árbitro.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="certificacion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Certificación</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese la certificación" {...field} />
                            </FormControl>
                            <FormDescription>
                                Certificaciones obtenidas como árbitro.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Agregar Árbitro</Button>
            </form>
        </Form>
    )
}

