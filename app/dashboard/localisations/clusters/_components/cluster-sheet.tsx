"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ClusterActivity } from "./cluster-activity";
import { StatCards } from "./cluster-cards";
import { ClusterViewTabs } from "./cluster-view-tabs";

export function SheetClusterDetails({ cluster }: { cluster: any }) {
  const [view, setView] = useState<"chart" | "map">("chart");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Détails
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col overflow-hidden max-h-screen pl-1 pr-2"
      >
        <ScrollArea className="flex-1 min-h-0">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-[var(--color-primary)]">
              {cluster.name}
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-2 text-[var(--color-muted-foreground)]">
              <Badge variant="secondary">{cluster.label}</Badge>
              <span className="text-xs">
                Dernière mise à jour : 22 mars 2024
              </span>
              <span className="text-xs">Cluster ID: {cluster.id}</span>
            </SheetDescription>
          </SheetHeader>

          <ClusterViewTabs
            view={view}
            onChange={setView}
            clusterId={cluster.id}
          />
          <StatCards cluster={cluster} />
          <ClusterActivity/>
          {/* <ClusterManagers /> */}
          <div className="border-t border-[var(--color-border)] pt-3 mt-3 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full border-[var(--color-secondary)]"
            >
              Exporter
            </Button>
            <Button
              variant="outline"
              className="w-full border-[var(--color-secondary)]"
            >
              Modifier
            </Button>
            <Button variant="destructive" className="w-full">
              Supprimer
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
