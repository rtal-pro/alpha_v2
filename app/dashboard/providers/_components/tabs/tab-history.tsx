// dashboard/providers/_components/tabs/tab-history.tsx
'use client'

import { Provider } from '@/lib/api/providers/providers'
import { Timeline, TimelineItem } from '@/components/ui/timeline'
import { Badge } from '@/components/ui/badge'

interface Props {
  provider: Provider
}

// Simulation d’un historique d’interventions
const historyMock = [
  {
    id: '1',
    date: '2024-03-01',
    title: 'Intervention nettoyage',
    status: 'terminée',
    duration: '32min',
  },
  {
    id: '2',
    date: '2024-02-27',
    title: 'Inspection extincteurs',
    status: 'échouée',
    duration: '0min',
  },
  {
    id: '3',
    date: '2024-02-25',
    title: 'Maintenance ascenseur',
    status: 'terminée',
    duration: '48min',
  },
  {
    id: '4',
    date: '2024-02-23',
    title: 'Signalisation dégradée',
    status: 'en cours',
    duration: '-',
  },
]

export function TabHistory({ provider }: Props) {
  return (
    <Timeline>
      {historyMock.map((item) => (
        <TimelineItem
          key={item.id}
          status={item.status as 'terminée' | 'échouée' | 'en cours'}
          title={item.title}
          date={item.date}
          duration={item.duration}
        >
          <Badge
            variant={
              item.status === 'terminée'
                ? 'default'
                : item.status === 'échouée'
                ? 'destructive'
                : 'secondary'
            }
          >
            {item.status}
          </Badge>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
