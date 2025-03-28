"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

const lastTasks = [
  {
    id: 1,
    title: "Nettoyage Hall A",
    date: "2024-03-25",
    type: "Nettoyage",
    user: "Ali K.",
  },
  {
    id: 2,
    title: "Contrôle extincteurs",
    date: "2024-03-22",
    type: "Sécurité",
    user: "Fatou S.",
  },
  {
    id: 3,
    title: "Vérification éclairage B2",
    date: "2024-03-20",
    type: "Maintenance",
    user: "M. Diallo",
  },
];

export function ClusterActivity() {
  return (
    <ScrollArea className="h-48 w-full rounded-md border border-[var(--color-border)]">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-[var(--color-secondary)]">
          Activité récente
        </h3>
        <div className="max-h-48 overflow-y-auto pr-1">
          <ul className="space-y-2 text-sm">
            {lastTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-start justify-between border-b border-[var(--color-border)] pb-1"
              >
                <div>
                  <p className="font-medium text-[var(--color-foreground)]">
                    {task.title}
                  </p>
                  <p className="text-[var(--color-muted-foreground)] text-xs">
                    {task.type} • {task.date}
                  </p>
                </div>
                <span className="text-xs italic text-[var(--color-muted-foreground)]">
                  {task.user}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
}
