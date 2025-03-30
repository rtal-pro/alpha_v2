"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Cluster } from "@/types"
import { getCluster } from "@/lib/api/clusters"
import { useEffect, useState } from "react"
import { ClusterMap } from "./cluster-map"
import { ClusterRadar } from "./cluster-radar"
import { ClusterManagers } from "./cluster-managers"
import { ClusterActivity } from "./cluster-activity"

interface Props {
  clusterId: string | null
  onClose: () => void
}

export function ClusterSheetDetails({ clusterId, onClose }: Props) {
  const [cluster, setCluster] = useState<Cluster | null>(null)

  useEffect(() => {
    if (clusterId) {
      getCluster(clusterId).then(setCluster)
    } else {
      setCluster(null)
    }
  }, [clusterId])

  if (!cluster) return null

  return (
    <Sheet open={!!clusterId} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-3xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Détail du cluster : {cluster.name}</SheetTitle>
        </SheetHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <ClusterMap cluster={cluster} />
            <ClusterRadar clusterId={cluster.id} />
          </div>
          <div className="space-y-4">
            <ClusterManagers managers={cluster.managers || []} />
            <ClusterActivity clusterId={cluster.id} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}