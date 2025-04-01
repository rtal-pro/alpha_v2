"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import TiptapEditor from "@/components/ui/tiptap-editor";
import { createCluster } from "@/lib/api/clusters/clusters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// 🔹 Données simulées
const fakeBuildings = [
  { id: "b1", name: "Bâtiment A - Paris 11e" },
  { id: "b2", name: "Bâtiment B - Lyon Part-Dieu" },
  { id: "b3", name: "Entrepôt C - Marseille" },
];

const fakeUsers = [
  { id: "u1", name: "Sophie Martin" },
  { id: "u2", name: "Thomas Dupont" },
  { id: "u3", name: "Fatou Ndiaye" },
];

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  description: z.string().optional(),
  localisation: z.string().optional(),
  couleur: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6})$/, "Couleur invalide")
    .optional(),
  statut: z.enum(["actif", "inactif", "archive"]),
  tag: z.string().optional(),
  clientId: z.string().min(1, "Client requis"),
  buildingIds: z.array(z.string()).optional(),
  responsable: z.string().min(1, "Responsable requis"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
  clients?: { id: string; name: string }[];
  users?: { id: string; name: string }[];
}

export function ClusterCreateForm({
  onSuccess,
  clients = [],
  users = fakeUsers,
}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      localisation: "",
      couleur: "#A1A1A1",
      statut: "actif",
      tag: "",
      clientId: clients[0]?.id || "",
      buildingIds: [],
      responsable: users[0]?.id || "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    await createCluster(data);
    toast.success("Cluster créé avec succès");
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-8 max-w-4xl mx-auto px-4 md:px-0'>
        <Card>
          <CardHeader>
            <CardDescription className='text-[var(--color-secondary)]'>
              Définissez les informations principales du cluster.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[var(--color-primary)]'>
                      Nom du cluster
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className=' focus-visible:ring-[var(--color-secondary)]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name='statut'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[var(--color-primary)]'>
                      Statut
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className=' focus:ring-[var(--color-secondary)]'>
                          <SelectValue placeholder='Statut' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='actif'>Actif</SelectItem>
                        <SelectItem value='inactif'>Inactif</SelectItem>
                        <SelectItem value='archive'>Archivé</SelectItem>
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[var(--color-primary)]'>
                    Description
                  </FormLabel>
                  <FormControl>
                    <TiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='Décrivez le cluster, ses objectifs, contraintes, etc.'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={control}
                name='localisation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[var(--color-primary)]'>
                      Localisation
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ex: Paris 11e'
                        {...field}
                        className=' focus-visible:ring-[var(--color-secondary)]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='couleur'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[var(--color-primary)]'>
                      Couleur
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='color'
                        {...field}
                        className='h-10 w-16 p-1 '
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <FormField
              control={control}
              name='tag'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[var(--color-primary)]'>
                    Tag
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Ex: zone nord'
                      {...field}
                      className=' focus-visible:ring-[var(--color-secondary)]'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={control}
                name='clientId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[var(--color-primary)]'>
                      Client
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className=' focus:ring-[var(--color-secondary)]'>
                          <SelectValue placeholder='Client' />
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
                name='responsable'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[var(--color-primary)]'>
                      Responsable
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className=' focus:ring-[var(--color-secondary)]'>
                          <SelectValue placeholder='Responsable' />
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
              name='buildingIds'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[var(--color-primary)]'>
                    Bâtiments liés
                  </FormLabel>
                  <MultiSelect
                    options={fakeBuildings.map((b) => ({
                      label: b.name,
                      value: b.id,
                    }))}
                    values={field.value || []}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className='flex justify-end'>
          <Button
            type='submit'
            className='w-full md:w-auto bg-transparent text-[var(--color-primary)] border-1 border-[var(--color-secondary)]'
            disabled={isSubmitting}>
            🚀 Créer le cluster
          </Button>
        </div>
      </form>
    </Form>
  );
}
