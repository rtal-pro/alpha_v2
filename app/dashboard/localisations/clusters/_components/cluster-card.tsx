// cluster-card.tsx
"use client"

import { Cluster } from "@/types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Building2 } from "lucide-react"
import { useState } from "react"
import { ClusterEditDialog } from "./cluster-edit-dialog"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Props {
  cluster: Cluster
  onClick?: () => void
  index?: number
}

export function ClusterCard({ cluster, onClick, index = 0 }: Props) {
  const [editOpen, setEditOpen] = useState(false)

  const totalSpots = cluster.buildings?.reduce((sum, b) => sum + b.spots.length, 0) ?? 0
  const buildings = cluster.buildings ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card
        onClick={onClick}
        className="p-4 cursor-pointer hover:shadow-md relative flex flex-col gap-4 border-l-4 border-l-[var(--color-secondary)] h-[360px]"
      >
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">{cluster.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{cluster.localisation}</p>
          </div>
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                setEditOpen(true)
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div><strong>{buildings.length}</strong> bâtiment(s)</div>
          <div><strong>{totalSpots}</strong> spot(s)</div>
          <div><strong>{cluster.tasksCount}</strong> tâche(s)</div>
        </div>

        <ScrollArea className="max-h-[160px] mt-2">
          <div className="flex flex-wrap gap-2 pr-2">
            {buildings.map((b) => {
              const taskCount = Math.floor(Math.random() * 10)
              return (
                <Button
                  key={b.id}
                  variant="outline"
                  size="sm"
                  className="text-xs px-3 py-1 flex items-center gap-2 border border-secondary whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation()
                    // TODO: Naviguer vers le bâtiment en question ou afficher modal ?
                  }}
                >
                  <Building2 className="w-3 h-3" />
                  <span>{b.name}</span>
                  <span className="text-muted-foreground">
                    ({b.spots.length} spots / {taskCount} tâches)
                  </span>
                </Button>
              )
            })}
          </div>
        </ScrollArea>

        <div className="mt-auto">
          <Badge variant={cluster.status === "actif" ? "default" : "secondary"}>{cluster.status}</Badge>
        </div>

        <ClusterEditDialog clusterId={cluster.id} open={editOpen} onOpenChange={setEditOpen} />
      </Card>
    </motion.div>
  )
}
