"use client";
import { Cluster } from "@/types"
import { ClusterCard } from "./cluster-card"

interface Props {
  clusters: Cluster[]
  onSelect: (id: string) => void
}

export function ClusterCardsGrid({ clusters, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-4">
      {clusters.map((cluster) => (
        <ClusterCard key={cluster.id} cluster={cluster} onClick={() => onSelect(cluster.id)} />
      ))}
    </div>
  )
}