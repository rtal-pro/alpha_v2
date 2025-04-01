// dashboard/providers/_components/tabs/tab-stats.tsx
'use client'

import { Provider } from '@/lib/api/providers/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart2, CheckCircle, Clock, XCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface Props {
  provider: Provider
}

const mockStats = [
  { date: 'S1', done: 12, failed: 2, avgTime: 38 },
  { date: 'S2', done: 18, failed: 1, avgTime: 34 },
  { date: 'S3', done: 10, failed: 3, avgTime: 42 },
  { date: 'S4', done: 15, failed: 0, avgTime: 35 },
  { date: 'S5', done: 20, failed: 1, avgTime: 31 },
  { date: 'S6', done: 17, failed: 2, avgTime: 36 },
]

export function TabStats({ provider }: Props) {
  return (
    <div className="space-y-6">
      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" /> Tâches terminées
              </span>
              <span className="flex items-center gap-1 text-green-600 text-xs">
                <TrendingUp className="w-3 h-3" /> +8%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">122</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" /> Tâches échouées
              </span>
              <span className="flex items-center gap-1 text-destructive text-xs">
                <TrendingDown className="w-3 h-3" /> -12%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" /> Durée moyenne
              </span>
              <span className="flex items-center gap-1 text-yellow-600 text-xs">
                <TrendingDown className="w-3 h-3" /> -4min
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36min</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600" /> Taux de réussite
              </span>
              <span className="flex items-center gap-1 text-green-600 text-xs">
                <TrendingUp className="w-3 h-3" /> +2%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
          </CardContent>
        </Card>
      </div>

      {/* GRAPHIQUE 1 : Tâches */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Tâches réalisées par semaine</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="done" stroke="#22c55e" strokeWidth={2} name="Réussies" />
              <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} name="Échouées" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* GRAPHIQUE 2 : Temps moyen */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Durée moyenne des tâches (minutes)</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avgTime" stroke="#facc15" strokeWidth={2} name="Durée moyenne" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  )
}