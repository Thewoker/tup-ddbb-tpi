"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    idCancha: z.string().min(1, { message: "El ID de la cancha es requerido." }),
    nombreCancha: z.string().min(2, { message: "El nombre de la cancha debe tener al menos 2 caracteres." }),
    direccion: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
})

export function AgregarCanchaForm() {
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            idCancha: "",
            nombreCancha: "",
            direccion: "",
        },
    })

    function onSubmit(values) {
        toast({
            title: "Cancha agregada",
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
                    name="idCancha"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID de la Cancha</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el ID de la cancha" {...field} />
                            </FormControl>
                            <FormDescription>
                                Este es el identificador único de la cancha.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombreCancha"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de la Cancha</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese el nombre de la cancha" {...field} />
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
                                <Input placeholder="Ingrese la dirección de la cancha" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Agregar Cancha</Button>
            </form>
        </Form>
    )
}

