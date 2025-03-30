"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface Props {
  clusterId: string
}

const sampleStats = [
  { label: "Tâches", value: Math.floor(Math.random() * 100) },
  { label: "Spots", value: Math.floor(Math.random() * 50) },
  { label: "Bâtiments", value: Math.floor(Math.random() * 20) },
  { label: "Managers", value: Math.floor(Math.random() * 10) },
  { label: "Alertes", value: Math.floor(Math.random() * 15) },
]

export function ClusterRadar({ clusterId }: Props) {
  return (
    <div className="bg-muted p-4 rounded">
      <h4 className="text-sm font-semibold mb-2">Statistiques</h4>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={sampleStats} outerRadius={90}>
          <PolarGrid stroke="#ccc" />
          <PolarAngleAxis dataKey="label" fontSize={12} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar dataKey="value" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}