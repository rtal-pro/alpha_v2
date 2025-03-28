"use client"

export function StatCards({ cluster }: { cluster: any }) {
  const stats = [
    { label: "Bâtiments", value: cluster.buildingCount },
    { label: "Spots", value: cluster.spotCount },
    { label: "Tâches à venir", value: cluster.upcomingTasks },
    { label: "Responsable", value: cluster.ownerName },
  ]

  return (
    <div className="mb-6 max-h-48 overflow-y-auto">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-[var(--color-secondary)] bg-[var(--color-muted)] p-3 flex flex-col items-start justify-between gap-1"
          >
            <p className="text-xs text-[var(--color-muted-foreground)] font-medium uppercase tracking-wide">
              {item.label}
            </p>
            <p className="text-lg font-semibold text-[var(--color-foreground)]">
              {item.value ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}