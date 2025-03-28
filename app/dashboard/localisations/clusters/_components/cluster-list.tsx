"use client";
import { SheetClusterDetails } from "./cluster-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Cluster {
  id: string;
  name: string;
  label?: string;
  status?: "actif" | "inactif";
  buildingCount: number;
  spotCount: number;
  ownerName?: string;
  upcomingTasks?: number;
  buildings?: {
    id: string;
    name: string;
    label?: string;
    spotCount: number;
  }[];
}

interface ClusterListProps {
  clusters: Cluster[];
}

export function ClusterFilters({
  onFilter,
}: {
  onFilter: (filters: any) => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    onFilter({ search, status });
  }, [search, status]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-end gap-4 mb-6 w-full">
      <div className="flex flex-col gap-1">
        <Label htmlFor="status">Statut</Label>
        <div className="flex gap-2">
          <Badge
            variant={status === "actif" ? "default" : "outline"}
            onClick={() => setStatus("actif")}
            className="cursor-pointer"
          >
            Actif
          </Badge>
          <Badge
            variant={status === "inactif" ? "default" : "outline"}
            onClick={() => setStatus("inactif")}
            className="cursor-pointer"
          >
            Inactif
          </Badge>
          <Badge
            variant={!status ? "default" : "outline"}
            onClick={() => setStatus(null)}
            className="cursor-pointer"
          >
            Tous
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full lg:w-1/3">
        <Label htmlFor="search">Rechercher</Label>
        <Input
          id="search"
          placeholder="Nom, bâtiment, spot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

function ClusterCard({ cluster }: { cluster: Cluster }) {
  const statusColor =
    cluster.status === "actif" ? "text-green-500" : "text-red-500";

  return (
    <Card
      key={cluster.id}
      className="hover:shadow-md transition border relative"
    >
      <div className="absolute top-2 right-2">
        <Circle className={cn("w-4 h-4", statusColor)} fill="currentColor" />
      </div>
      <div className="flex justify-between items-start p-4 gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-primary mb-1">
              {cluster.name}
            </CardTitle>
            <SheetClusterDetails cluster={cluster} />
          </div>
          {cluster.label && (
            <Badge variant="secondary" className="mb-2">
              {cluster.label}
            </Badge>
          )}
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>{cluster.buildingCount}</strong> bâtiments
            </p>
            <p>
              <strong>{cluster.spotCount}</strong> spots
            </p>
            <p>
              <strong>{cluster.upcomingTasks ?? 0}</strong> tâches programmées
            </p>
            <p>
              Responsable :{" "}
              <span className="font-medium">
                {cluster.ownerName ?? "Non défini"}
              </span>
            </p>
          </div>
        </div>
        <div className="w-1/2 space-y-2">
          {cluster.buildings?.length ?
            <div>
              <p className="text-sm font-semibold mb-1 text-secondary-foreground">
                Bâtiments :
              </p>
              <div className="flex flex-col gap-2">
                {cluster.buildings.map((b) => (
                  <Link key={b.id} href={`/buildings/${b.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between border-[1.5px]"
                      style={{
                        borderColor: "var(--color-secondary)",
                        color: "var(--color-secondary)",
                      }}
                    >
                      <span>{b.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {b.spotCount} spots – {b.label}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          : <p className="text-sm text-muted-foreground italic">
              Aucun bâtiment.
            </p>
          }
        </div>
      </div>
    </Card>
  );
}

export function ClusterList({ clusters }: ClusterListProps) {
  const [filtered, setFiltered] = useState(clusters);

  const handleFilter = ({
    search,
    status,
  }: {
    search: string;
    status: string | null;
  }) => {
    let result = [...clusters];
    if (search) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status) {
      result = result.filter((c) => c.status === status);
    }
    setFiltered(result);
  };

  return (
    <div>
      <ClusterFilters onFilter={handleFilter} />
      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filtered.map((cluster) => (
            <ClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
