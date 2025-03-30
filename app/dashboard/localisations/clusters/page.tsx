// app/localisations/clusters/page.tsx

import { Suspense } from "react"
import ClusterListLayout from "./_components/cluster-list-layout"

export default function ClusterPage() {
  return (
    <main className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Clusters</h1>
      <p className="text-muted-foreground text-sm">
        Liste des clusters avec visualisation, gestion, et fiches détaillées.
      </p>

      <Suspense fallback={<p>Chargement des clusters...</p>}>
        <ClusterListLayout />
      </Suspense>
    </main>
  )
}
