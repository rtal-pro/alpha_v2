"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createCluster } from "@/lib/api/clusters"
import { toast } from "sonner"

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  description: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  onSuccess?: () => void
}

export function ClusterCreateForm({ onSuccess }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "" },
  })

  const onSubmit = async (data: FormData) => {
    await createCluster(data)
    toast.success("Cluster créé avec succès")
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }: { field: import("react-hook-form").ControllerRenderProps<FormData, "name"> }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }: { field: import("react-hook-form").ControllerRenderProps<FormData, "description"> }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Créer</Button>
      </form>
    </Form>
  )
}
