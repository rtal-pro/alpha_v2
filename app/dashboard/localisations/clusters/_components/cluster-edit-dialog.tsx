"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ClusterEditForm } from "./cluster-edit-form"

interface Props {
  clusterId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClusterEditDialog({ clusterId, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le cluster</DialogTitle>
        </DialogHeader>
        <ClusterEditForm clusterId={clusterId} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}