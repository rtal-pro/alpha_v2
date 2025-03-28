"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pencil, Users } from "lucide-react"

interface ClusterData {
  id: string
  name: string
  label?: string
  description?: string
  status?: "actif" | "inactif"
  managers?: string[]
}

export function EditClusterDialog({ cluster }: { cluster: ClusterData }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(cluster.name)
  const [label, setLabel] = useState(cluster.label ?? "")
  const [description, setDescription] = useState(cluster.description ?? "")
  const [status, setStatus] = useState(cluster.status === "actif")
  const [managers, setManagers] = useState<string[]>(cluster.managers ?? [])

  const handleSave = () => {
    const updated = {
      id: cluster.id,
      name,
      label,
      description,
      status: status ? "actif" : "inactif",
      managers,
    }
    console.log("✏️ Cluster modifié :", updated)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="w-4 h-4 mr-1" /> Modifier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-[var(--color-card)]">
        <DialogHeader>
          <DialogTitle className="text-lg text-[var(--color-primary)]">
            Modifier le cluster
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="label">Label</Label>
            <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="status">Statut</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{status ? "Actif" : "Inactif"}</span>
              <Switch id="status" checked={status} onCheckedChange={setStatus} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Responsables</Label>
            <ScrollArea className="h-24 border rounded-md p-2">
              <div className="flex flex-wrap gap-2">
                {mockUsers.map((u) => (
                  <Badge
                    key={u.id}
                    variant={managers.includes(u.id) ? "default" : "outline"}
                    onClick={() => toggleManager(u.id)}
                    className="cursor-pointer"
                  >
                    <Users className="w-3 h-3 mr-1" /> {u.name}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Button onClick={handleSave} className="w-full mt-2">
            Sauvegarder les modifications
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  function toggleManager(id: string) {
    setManagers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }
}

const mockUsers = [
  { id: "u1", name: "Claire F." },
  { id: "u2", name: "Dylan M." },
  { id: "u3", name: "Fatou S." },
  { id: "u4", name: "Nora K." },
]
