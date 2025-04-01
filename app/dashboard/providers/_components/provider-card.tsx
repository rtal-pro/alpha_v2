// dashboard/providers/_components/provider-card.tsx
'use client'

import { Provider } from '@/lib/api/providers/providers'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { motion } from 'framer-motion'
import { Eye, Pencil, Trash2, Star } from 'lucide-react'

interface Props {
  provider: Provider
  onSelect?: () => void
  index?: number
}

function getStatusStyle(status: boolean) {
  return status ? 'text-green-600 border-green-300' : 'text-muted-foreground border-muted';
}

export function ProviderCard({ provider, onSelect, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('button, svg, a')) return;
          onSelect?.();
        }}
        className="p-4 cursor-pointer hover:shadow-md relative flex flex-col gap-4 border-l-4 border-l-[var(--color-secondary)] rounded-lg border h-[350px] overflow-hidden transition-all duration-200"
      >
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">
              {provider.nom}
              <Badge
                variant="outline"
                className={`ml-4 capitalize bg-transparent ${getStatusStyle(provider.actif)}`}
              >
                {provider.actif ? 'Actif' : 'Inactif'}
              </Badge>
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{provider.type}</p>
            <p className="text-xs text-muted-foreground italic">
              Note : <span className="font-medium">{provider.note.toFixed(1)}</span> / 5
            </p>
          </div>

          <TooltipProvider>
            <div className="absolute top-2 right-2 flex gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Modifier</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Voir</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div>
            <strong>{provider.membres.length}</strong> membre(s)
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">{provider.note.toFixed(1)}</span>
          </div>
        </div>

        <ScrollArea className="max-h-[120px] mt-2 relative pr-1">
          <div className="flex flex-col gap-1 text-xs">
            {provider.membres.map((m) => (
              <div key={m.id} className="border p-2 rounded bg-muted/30">
                {m.prenom} {m.nom} – <span className="italic text-muted-foreground">{m.role}</span>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-auto flex items-center justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    // TODO: supprimer prestataire
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                </Button>
              </TooltipTrigger>
              <TooltipContent>Supprimer ce prestataire</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
}
