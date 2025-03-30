"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ClusterFiltersProps {
  search: string
  status: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function ClusterFilters({ search, status, onSearchChange, onStatusChange }: ClusterFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Input
        placeholder="Rechercher un cluster..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-64"
      />
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrer par statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="actif">Actif</SelectItem>
          <SelectItem value="inactif">Inactif</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
