"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const managers = [
  { id: "u1", name: "Claire F.", email: "claire@example.com", avatarUrl: "" },
  { id: "u2", name: "Dylan M.", email: "dylan@example.com", avatarUrl: "" },
  { id: "u3", name: "Nora K.", email: "nora@example.com", avatarUrl: "" },
  { id: "u4", name: "Jean B.", email: "jean@example.com", avatarUrl: "" },
  { id: "u5", name: "Salim Z.", email: "salim@example.com", avatarUrl: "" },
]

export function ClusterManagers() {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2 text-[var(--color-secondary)]">Utilisateurs assignés</h3>
      <ScrollArea className="h-48 w-full rounded-md border border-[var(--color-border)] p-2">
        {managers.map((user) => (
          <div key={user.id} className="flex items-center gap-3 py-1 border-b border-[var(--color-border)] last:border-b-0">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm leading-none text-[var(--color-foreground)]">{user.name}</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">{user.email}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
