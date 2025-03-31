"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MultiSelect } from "@/components/ui/multi-select"
import TiptapEditor from "@/components/ui/tiptap-editor"
// import { updateClusterById, getClusterById } from "@/lib/api/clusters"
import { Cluster } from "@/types"

// Schéma de validation
const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  description: z.string().optional(),
  localisation: z.string().optional(),
  couleur: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Couleur invalide").optional(),
  statut: z.enum(["actif", "inactif", "archive"]),
  tag: z.string().optional(),
  clientId: z.string().min(1, "Client requis"),
  buildingIds: z.array(z.string()).optional(),
  responsable: z.string().min(1, "Responsable requis"),
})

type FormData = z.infer<typeof schema>

interface Props {
  clusterId: string
  onSuccess?: () => void
  clients: { id: string; name: string }[]
  users: { id: string; name: string }[]
  buildings: { id: string; name: string }[]
  initialData: Cluster
}

export function ClusterEditForm({
  clusterId,
  onSuccess,
  clients,
  users,
  buildings,
  initialData,
}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      localisation: initialData.localisation || "",
      couleur: initialData.couleur || "#A1A1A1",
      statut: initialData.status || "actif",
      tag: initialData.tag || "",
      clientId: initialData.clientId || "",
      buildingIds: initialData.buildings?.map((b) => b.id) || [],
      responsable: initialData.responsableId || "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: FormData) => {
    await updateClusterById(clusterId, data)
    toast.success("Cluster mis à jour avec succès")
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl mx-auto px-4 md:px-0"
      >
        <Card>
          <CardHeader>
            <CardDescription className="text-[var(--color-secondary)]">
              Modifier les informations du cluster
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Nom</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-[var(--color-secondary)]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="statut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Statut</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[var(--color-secondary)]">
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="actif">Actif</SelectItem>
                        <SelectItem value="inactif">Inactif</SelectItem>
                        <SelectItem value="archive">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Description</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Décrivez le cluster..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="localisation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Localisation</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-[var(--color-secondary)]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="couleur"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Couleur</FormLabel>
                    <FormControl>
                      <Input
                        type="color"
                        {...field}
                        className="h-10 w-16 border-[var(--color-secondary)]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Tag</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-[var(--color-secondary)]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Client</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[var(--color-secondary)]">
                          <SelectValue placeholder="Client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="responsable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Responsable</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[var(--color-secondary)]">
                          <SelectValue placeholder="Responsable" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="buildingIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Bâtiments liés</FormLabel>
                  <MultiSelect
                    options={buildings.map((b) => ({ label: b.name, value: b.id }))}
                    values={field.value || []}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full md:w-auto bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary)/90]"
            disabled={isSubmitting}
          >
            💾 Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Form>
  )
}
