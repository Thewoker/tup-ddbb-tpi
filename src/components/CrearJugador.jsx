"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  dni: z.string().min(2, {
    message: "DNI must be at least 2 characters.",
  }),
  telefono: z.string().min(2, {
    message: "Telefono must be at least 2 characters.",
  }),
  fechaNacimiento: z.date({
    message: "Fecha de Nacimiento tiene que ser valida",
  }),
  foto: z.string().url({
    message: "Tiene que ser un URL",
  }),
  numSocio: z.string().min(1, {
    message: "Numero de socio no puede estar vacío",
  }),
  categoria: z.string().min(2, {
    message: "Categoria",
  }),
  direccion: z.string().min(2, {
    message: "Direccion",
  }),
});

export default function CrearJugador() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      lastname: "",
      categoria: "",
      dni: "",
      numSocio: "",
      direccion: "",
    },
  });

  function onSubmit(values) {
    toast({
      title: "Jugador Agregado",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(values, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Diego" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Barrios" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display lastname.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dni</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="43200220"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display DNI.
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
              <FormLabel>Telefono</FormLabel>
              <FormControl>
                <Input placeholder="telefono" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display Telefono.
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
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input placeholder="categoria" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display Categoria.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="foto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <FormControl>
                <Input placeholder="Agregar URL" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display Foto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numSocio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de Socio</FormLabel>
              <FormControl>
                <Input placeholder="Numero de socio" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display Numero de socio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direccion</FormLabel>
              <FormControl>
                <Input placeholder="Direccion" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display Direccion.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
