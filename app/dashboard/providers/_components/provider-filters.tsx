// dashboard/providers/_components/provider-filters.tsx
'use client'

import { PROVIDER_TYPES } from '@/lib/api/providers/providers'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Filter, Check, ChevronDown } from 'lucide-react'

interface Props {
  currentType: string
  onChangeType: (val: string) => void
  currentActif: 'all' | 'actif' | 'inactif'
  onChangeActif: (val: 'all' | 'actif' | 'inactif') => void
  noteMin?: number
  onChangeNoteMin?: (n: number) => void
  memberMin?: number
  onChangeMemberMin?: (n: number) => void
  onReset?: () => void
}

export function ProviderFilters({
  currentType,
  onChangeType,
  currentActif,
  onChangeActif,
  noteMin,
  onChangeNoteMin,
  memberMin,
  onChangeMemberMin,
  onReset,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" /> Filtres avancés <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2 space-y-4">
          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-muted-foreground">Statut</span>
              <div className="flex flex-col gap-1 mt-1">
                {(['all', 'actif', 'inactif'] as const).map((status) => (
                  <Button
                    key={status}
                    variant={currentActif === status ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onChangeActif(status)}
                    className="justify-start"
                  >
                    {currentActif === status && <Check className="w-4 h-4 mr-2" />} {status === 'all' ? 'Tous' : status}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium text-muted-foreground">Type</span>
              <div className="flex flex-col gap-1 mt-1 max-h-40 overflow-y-auto">
                {(['all', ...PROVIDER_TYPES] as const).map((type) => (
                  <Button
                    key={type}
                    variant={currentType === type ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onChangeType(type)}
                    className="justify-start"
                  >
                    {currentType === type && <Check className="w-4 h-4 mr-2" />} {type === 'all' ? 'Tous' : type}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium text-muted-foreground">Note minimale</span>
              <div className="flex gap-1 flex-wrap mt-1">
                {[0, 3.5, 4, 4.5].map((n) => (
                  <Button
                    key={n}
                    variant={noteMin === n ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onChangeNoteMin?.(n)}
                  >
                    {n === 0 ? 'Toutes' : `≥ ${n}`}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium text-muted-foreground">Membres min.</span>
              <div className="flex gap-1 flex-wrap mt-1">
                {[0, 2, 4, 6].map((n) => (
                  <Button
                    key={n}
                    variant={memberMin === n ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onChangeMemberMin?.(n)}
                  >
                    {n === 0 ? 'Tous' : `≥ ${n}`}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {onReset && (
            <Button variant="ghost" size="sm" className="w-full text-center" onClick={onReset}>
              Réinitialiser les filtres
            </Button>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}