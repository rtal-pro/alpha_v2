// dashboard/providers/_components/provider-header.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function ProviderHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold tracking-tight">Prestataires</h2>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Nouveau prestataire
      </Button>
    </div>
  )
}