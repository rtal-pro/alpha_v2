import { ClusterList } from "./_components/cluster-list"
import { CreateClusterDialog } from "./_components/cluster-create"

const clusters = [
  {
    id: "1",
    name: "Quartier Sud",
    label: "Résidentiel",
    status: "actif" as const,
    buildingCount: 3,
    spotCount: 25,
    upcomingTasks: 8,
    ownerName: "Claire Fontaine",
    buildings: [
      {
        id: "b1",
        name: "Bâtiment A",
        label: "Habitation",
        spotCount: 10,
      },
      {
        id: "b2",
        name: "Bâtiment B",
        label: "Copropriété",
        spotCount: 8,
      },
      {
        id: "b3",
        name: "Bâtiment C",
        label: "Services",
        spotCount: 7,
      },
    ],
  },
  {
    id: "2",
    name: "Parc Industriel Nord",
    label: "Industriel",
    status: "inactif" as const,
    buildingCount: 2,
    spotCount: 14,
    upcomingTasks: 3,
    ownerName: "Thierry Dumas",
    buildings: [
      {
        id: "b4",
        name: "Entrepôt 1",
        label: "Logistique",
        spotCount: 6,
      },
      {
        id: "b5",
        name: "Entrepôt 2",
        label: "Maintenance",
        spotCount: 8,
      },
    ],
  },
]

export default function ClusterPage() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clusters</h1>
        <CreateClusterDialog />
      </div>
      <ClusterList clusters={clusters} />
    </div>
  )
}
