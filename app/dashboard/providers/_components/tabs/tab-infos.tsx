// dashboard/providers/_components/tabs/tab-infos.tsx
'use client'

import { Provider } from '@/lib/api/providers/providers'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, Star } from 'lucide-react'

interface Props {
  provider: Provider
}

export function TabInfos({ provider }: Props) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Informations générales
            <Badge variant={provider.actif ? 'default' : 'destructive'}>
              {provider.actif ? 'Actif' : 'Inactif'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Type de prestation :</span>{' '}
            <strong>{provider.type}</strong>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{provider.note.toFixed(1)} / 5</span>
          </div>
          <div>
            <span className="text-muted-foreground">Nombre de membres :</span>{' '}
            <strong>{provider.membres.length}</strong>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact principal</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          {provider.membres.length > 0 ? (
            <div>
              <div className="font-medium">
                {provider.membres[0].prenom} {provider.membres[0].nom}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" /> {provider.membres[0].email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" /> {provider.membres[0].telephone}
              </div>
              <div className="text-xs text-muted-foreground">Rôle : {provider.membres[0].role}</div>
            </div>
          ) : (
            <div className="text-muted-foreground italic">Aucun membre assigné pour l’instant.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
