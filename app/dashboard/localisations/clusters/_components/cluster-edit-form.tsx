"use client"

import { useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { getCluster, updateCluster } from "@/lib/api/clusters"
import { toast } from "sonner"

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  description: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  clusterId: string
  onSuccess?: () => void
}

export function ClusterEditForm({ clusterId, onSuccess }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "" },
  })

  useEffect(() => {
    getCluster(clusterId).then((data) => {
      if (data) form.reset({ name: data.name, description: data.description })
    })
  }, [clusterId, form])

  const onSubmit = async (data: FormData) => {
    await updateCluster(clusterId, data)
    toast.success("Cluster mis à jour")
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }: { field: { value: string | undefined; onChange: (value: string) => void } }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Enregistrer</Button>
      </form>
    </Form>
  )
}
