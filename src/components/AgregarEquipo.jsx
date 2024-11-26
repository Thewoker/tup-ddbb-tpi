"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    numPero: z.string().min(1, { message: "El número de equipo es requerido." }),
    dniResponsable: z.string().min(8, { message: "El DNI del responsable debe tener al menos 8 caracteres." }),
    categoria: z.string().min(1, { message: "La categoría es requerida." }),
    nombre: z.string().min(2, { message: "El nombre del equipo debe tener al menos 2 caracteres." }),
    division: z.string().min(1, { message: "La división es requerida." }),
})

export function AgregarEquipoForm() {
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            numPero: "",
            dniResponsable: "",
            categoria: "",
            nombre: "",
            division: "",
        },
    })

    function onSubmit(values) {
        toast({
            title: "Equipo agregado",
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
                    name="numPero"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número de Equipo</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el número de equipo" {...field} />
                            </FormControl>
                            <FormDescription>
                                Este es el identificador único del equipo.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dniResponsable"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DNI del Responsable</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el DNI del responsable" {...field} />
                            </FormControl>
                            <FormDescription>
                                DNI del responsable del equipo.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoria"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoría</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione una categoría" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="infantil">Infantil</SelectItem>
                                    <SelectItem value="juvenil">Juvenil</SelectItem>
                                    <SelectItem value="adulto">Adulto</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Equipo</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el nombre del equipo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>División</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder
                                            ="Seleccione una división" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="primera">Primera</SelectItem>
                                    <SelectItem value="segunda">Segunda</SelectItem>
                                    <SelectItem value="tercera">Tercera</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Agregar Equipo</Button>
            </form>
        </Form>
    )
}

