// cluster-list-layout.tsx
"use client";

import { getAllClusters } from "@/lib/api/clusters/clusters";
import { Cluster } from "@/types";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ClusterCardsGrid } from "./cluster-cards-grid";
import { ClusterCreateDialog } from "./cluster-create-dialog";
import { ClusterFilters } from "./cluster-filters";
import { ClusterSheetDetails } from "./cluster-sheet-details";

export default function ClusterListLayout() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [filtered, setFiltered] = useState<Cluster[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    getAllClusters().then(setClusters);
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const result = clusters.filter((c) => {
      const matchName = c.name.toLowerCase().includes(lower);
      const matchStatus = status !== "all" ? c.status === status : true;
      return matchName && matchStatus;
    });
    setFiltered(result);
  }, [clusters, search, status]);

  return (
    <div className='p-6 space-y-4'>
      <div className='flex items-center justify-between'>
        <ClusterFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        {/* BOUTON OUVERTURE DE MODALE */}
        <button
          onClick={() => setCreateOpen(true)}
          className='p-[3px] relative rounded-lg'>
          {/* Animated Border */}
          <div
            className='absolute inset-0 rounded-lg bg-gradient-to-l from-[var(--color-special-button)] to-[var(--color-secondary)] animate-shimmer'
            style={{ backgroundSize: "200% 100%" }}
          />

          {/* Inner Button */}
          <div className='relative px-6 py-2 bg-[var(--color-background)] rounded-[6px] text-[var(--color-foreground)] font-medium transition duration-200 hover:bg-transparent flex items-center gap-2'>
            <Plus className='w-4 h-4 text-[var(--color-primary)]' />
            Créer un cluster
          </div>
        </button>
      </div>

      {/* GRILLE DES CLUSTERS */}
      <ClusterCardsGrid
        clusters={filtered}
        onSelect={(id) => setSelectedId(id)}
      />

      {/* MODALE DE CRÉATION */}
      <ClusterCreateDialog open={createOpen} onOpenChange={setCreateOpen} />

      {/* FICHE DÉTAIL DU CLUSTER */}
      <ClusterSheetDetails
        clusterId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
