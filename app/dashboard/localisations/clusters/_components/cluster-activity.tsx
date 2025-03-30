"use client"

import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Clock } from "lucide-react"

interface ActivityItem {
  id: string
  label: string
  type: "task" | "alert" | "log"
  date: string
}

const mockActivity: ActivityItem[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `activity-${i}`,
  label: [
    "Tâche planifiée",
    "Alerte résolue",
    "Inspection effectuée",
    "Nouvel utilisateur ajouté",
    "Mise à jour du bâtiment",
  ][i % 5],
  type: ["task", "alert", "log"][i % 3] as "task" | "alert" | "log",
  date: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
}))

export function ClusterActivity({ clusterId }: { clusterId: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">Activité récente</h4>
      <ul className="space-y-3">
        {mockActivity.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <Clock className="w-4 h-4 mt-1 text-muted-foreground" />
            <div>
              <p className="text-sm leading-snug">{item.label}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(item.date), { addSuffix: true, locale: fr })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
