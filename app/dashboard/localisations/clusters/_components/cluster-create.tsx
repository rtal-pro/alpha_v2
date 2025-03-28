"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Users } from "lucide-react";
import { useState } from "react";

export function CreateClusterDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [status, setStatus] = useState(true); // actif par défaut
  const [description, setDescription] = useState("");
  const [managers, setManagers] = useState<string[]>([]);

  const handleCreate = () => {
    const cluster = {
      name,
      label,
      status: status ? "actif" : "inactif",
      description,
      managers,
    };
    console.log("📦 Nouveau cluster :", cluster);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-[3px] relative rounded-lg">
          {/* Animated Border */}
          <div
            className="absolute inset-0 rounded-lg bg-gradient-to-l from-[var(--color-special-button)] to-[var(--color-secondary)] animate-shimmer"
            style={{ backgroundSize: "200% 100%" }}
          />

          {/* Inner Button */}
          <div className="relative px-6 py-2 bg-[var(--color-background)] rounded-[6px] text-[var(--color-foreground)] font-medium transition duration-200 hover:bg-transparent flex items-center gap-2">
            <Plus className="w-4 h-4 text-[var(--color-primary)]" />
            Créer un cluster
          </div>
        </button>
        {/* <Button variant="default" size="sm" className="sm:max-w-lg bg-[var(--color-card)] border border-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-card)] hover:text-[var(--color-background)]">
          <Plus className="w-4 h-4 mr-1 text-[var(--color-primary)] " /> Nouveau Cluster
        </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-[var(--color-card)]">
        <DialogHeader>
          <DialogTitle className="text-lg text-[var(--color-primary)]">
            Créer un nouveau cluster
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="name">Nom du cluster</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: Zone Nord A"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="ex: zone-prioritaire"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Détails supplémentaires (facultatif)..."
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="status">Statut</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {status ? "Actif" : "Inactif"}
              </span>
              <Switch
                id="status"
                checked={status}
                onCheckedChange={setStatus}
              />
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

          <Button onClick={handleCreate} className="w-full mt-2">
            Créer le cluster
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  function toggleManager(id: string) {
    setManagers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }
}

const mockUsers = [
  { id: "u1", name: "Claire F." },
  { id: "u2", name: "Dylan M." },
  { id: "u3", name: "Fatou S." },
  { id: "u4", name: "Nora K." },
];
