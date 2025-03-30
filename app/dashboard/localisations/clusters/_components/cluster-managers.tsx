"use client"

import { User } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Props {
  managers: User[]
}

export function ClusterManagers({ managers }: Props) {
  if (!managers.length) return <p className="text-sm text-muted-foreground">Aucun manager assigné.</p>

  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">Responsables du cluster</h4>
      <div className="space-y-3">
        {managers.map((user) => (
          <div key={user.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.fullName} />
              <AvatarFallback>{user.fullName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium leading-none">{user.fullName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant="secondary">{user.role}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
