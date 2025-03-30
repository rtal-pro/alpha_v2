import { useMemo } from "react"
import { Cluster } from "@/types"

export function useFilteredClusters(clusters: Cluster[], search: string, status: string) {
  return useMemo(() => {
    return clusters.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (status ? c.status === status : true)
    )
  }, [clusters, search, status])
}
