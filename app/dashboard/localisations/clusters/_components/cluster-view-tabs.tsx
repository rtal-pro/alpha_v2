"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts"
import dynamic from "next/dynamic"

const ClusterMap = dynamic(() => import("./cluster-map"), { ssr: false })

interface Props {
  view: "chart" | "map"
  onChange: (v: "chart" | "map") => void
  clusterId: string
}

const radarData = [
  { service: "Nettoyage", tasks: 24 },
  { service: "Maintenance", tasks: 18 },
  { service: "Sécurité", tasks: 12 },
  { service: "Jardinage", tasks: 6 },
]

export function ClusterViewTabs({ view, onChange, clusterId }: Props) {
  return (
    <div className="mt-2">
      <div className="flex justify-center mb-4">
        <div role="tablist" className="inline-flex bg-[var(--color-muted)] rounded-md">
          <button
            onClick={() => onChange("chart")}
            className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${view === "chart" ? "bg-[var(--color-background)] shadow text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)]"}`}
          >
            Chart
          </button>
          <button
            onClick={() => onChange("map")}
            className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${view === "map" ? "bg-[var(--color-background)] shadow text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)]"}`}
          >
            Map
          </button>
        </div>
      </div>

      <div className="w-full h-72 mb-6">
        {view === "chart" ? (
          <Card className="h-full border border-[var(--color-border)] bg-[var(--color-card)]">
            <CardHeader><CardTitle className="text-[var(--color-secondary)]">Tâches par service</CardTitle></CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="service" />
                  <PolarRadiusAxis />
                  <Radar dataKey="tasks" stroke="var(--color-secondary)" fill="var(--color-secondary)" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full overflow-hidden border border-[var(--color-border)]">
            <CardHeader><CardTitle className="text-[var(--color-secondary)]">Localisation</CardTitle></CardHeader>
            <CardContent className="h-60">
              <ClusterMap clusterId={clusterId} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
