"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ClusterCreateForm } from "./cluster-create-form"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClusterCreateDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un cluster</DialogTitle>
        </DialogHeader>
        <ClusterCreateForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
