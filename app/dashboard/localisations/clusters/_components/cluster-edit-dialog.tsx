"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAllClusters } from "@/lib/api/clusters/clusters";
import { useEffect, useState } from "react";
import { ClusterEditForm } from "./cluster-edit-form";

const fakeClients = [
  { id: "client-1", name: "Client A" },
  { id: "client-2", name: "Client B" },
];

const fakeUsers = [
  { id: "u1", name: "Sophie Martin" },
  { id: "u2", name: "Thomas Dupont" },
];

const fakeBuildings = [
  { id: "b1", name: "Bâtiment A" },
  { id: "b2", name: "Bâtiment B" },
  { id: "b3", name: "Entrepôt C" },
];

interface Props {
  clusterId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClusterEditDialog({ clusterId, open, onOpenChange }: Props) {
  const [cluster, setCluster] = useState<any | null>(null);

  useEffect(() => {
    if (open) {
      getAllClusters().then((clusters) => {
        const match = clusters.find((c) => c.id === clusterId);
        setCluster(match);
      });
    }
  }, [clusterId, open]);

  if (!cluster) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Modifier le cluster</DialogTitle>
        </DialogHeader>
        <ClusterEditForm
          clusterId={clusterId}
          initialData={cluster}
          clients={fakeClients}
          users={fakeUsers}
          buildings={fakeBuildings}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
