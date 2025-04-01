// dashboard/providers/_components/tabs/tab-membres.tsx
'use client'

import { Provider } from '@/lib/api/providers/providers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Mail, Phone, Trash2, Pencil } from 'lucide-react'

interface Props {
  provider: Provider
}

const roleColorMap: Record<string, string> = {
  'Chef d’équipe': 'bg-violet-100 text-violet-700 border-violet-300',
  'Contrôleur qualité': 'bg-orange-100 text-orange-700 border-orange-300',
  'Responsable terrain': 'bg-blue-100 text-blue-700 border-blue-300',
  Technicien: 'bg-green-100 text-green-700 border-green-300',
  Agent: 'bg-gray-100 text-gray-700 border-gray-300',
  Intervenant: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  default: 'bg-muted text-muted-foreground border'
}

export function TabMembers({ provider }: Props) {
  const membresParRole = provider.membres.reduce<Record<string, typeof provider.membres>>(function (acc, member) {
    if (!acc[member.role]) acc[member.role] = []
    acc[member.role].push(member)
    return acc
  }, {})

  const handleEdit = (id: string) => {
    console.log('Edit membre', id)
  }

  const handleDelete = (id: string) => {
    console.log('Supprimer membre', id)
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {Object.keys(membresParRole).length === 0 ? (
        <div className="text-sm text-muted-foreground italic">
          Aucun membre enregistré pour ce prestataire.
        </div>
      ) : (
        <Accordion type="multiple" className="w-full gap-2">
          {Object.entries(membresParRole).map(([role, membres]) => (
            <AccordionItem value={role} key={role} className="border rounded-md gap-2 mt-2">
              <AccordionTrigger className="text-sm font-semibold px-4 py-2 bg-muted rounded-t-md">
                {role} ({membres.length})
              </AccordionTrigger>
              <AccordionContent className="space-y-3 px-4 pb-4">
                {membres.map((member) => (
                  <div
                    key={member.id}
                    className="border rounded-lg p-4 flex items-center justify-between gap-4 mt-2 bg-background hover:shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.nom} />
                        <AvatarFallback>
                          {member.prenom.charAt(0)}{member.nom.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {member.prenom} {member.nom}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" /> {member.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" /> {member.telephone}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        className={`text-xs px-2 py-1 rounded-full border font-medium ${roleColorMap[member.role] || roleColorMap.default}`}
                      >
                        {member.role}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-primary"
                          onClick={() => handleEdit(member.id)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
