// cluster-sheet-details.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCluster } from "@/lib/api/clusters/clusters";
import { Cluster } from "@/types";
import { Building2, Download, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ClusterActivity } from "./cluster-activity";
import { ClusterManagers } from "./cluster-managers";
import { ClusterMap } from "./cluster-map";
import { ClusterRadar } from "./cluster-radar";

interface Props {
  clusterId: string | null;
  onClose: () => void;
}

export function ClusterSheetDetails({ clusterId, onClose }: Props) {
  const [cluster, setCluster] = useState<Cluster | null>(null);

  useEffect(() => {
    if (clusterId) {
      getCluster(clusterId).then(setCluster);
    } else {
      setCluster(null);
    }
  }, [clusterId]);

  if (!cluster) return null;

  const totalBuildings = cluster.buildings?.length || 0;
  const totalSpots =
    cluster.buildings?.reduce((acc, b) => acc + b.spots.length, 0) || 0;

  const handleCopyId = () => {
    navigator.clipboard.writeText(cluster.id);
    toast.success("ID copié dans le presse-papier");
  };

  return (
    <Sheet open={!!clusterId} onOpenChange={onClose}>
      <SheetContent
        side='right'
        className='w-full sm:max-w-[95vw] md:max-w-[85vw] lg:max-w-[35vw] px-4'>
        <SheetHeader>
          <SheetTitle className='text-xl text-bold flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Building2 className='w-5 h-5' />
              <span className='font-bold'>{cluster.name}</span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className='flex flex-col text-sm text-muted-foreground space-y-2'>
          <div className='flex items-center gap-2'>
            <p className='text-xs text-[var(--color-secondary)]'>
              ID du cluster:
            </p>
            <p
              className='font-mono text-sm cursor-pointer'
              onClick={handleCopyId}>
              {cluster.id}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-xs text-[var(--color-secondary)]'>Statut:</p>
            <p className='capitalize font-medium'>{cluster.status}</p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-xs text-[var(--color-secondary)]'>
              Nombre de bâtiments:
            </p>
            <p className='font-semibold'>{totalBuildings}</p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-xs text-[var(--color-secondary)]'>
              Nombre de spots:
            </p>
            <p className='font-semibold'>{totalSpots}</p>
          </div>
        </div>

        <Separator orientation='horizontal' />

        <div className='space-y-6'>
          <Tabs defaultValue='map' className='w-full'>
            <TabsList className='inline-flex justify-center mx-auto bg-muted text-muted-foreground h-7 items-center rounded-md p-0'>
              <TabsTrigger
                value='map'
                className='inline-flex items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-medium rounded-sm transition-all data-[state=active]:bg-transparent data-[state=active]:text-[var(--color-secondary)]'>
                Carte
              </TabsTrigger>
              <TabsTrigger
                value='radar'
                className='inline-flex items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-medium rounded-sm transition-all data-[state=active]:bg-transparent data-[state=active]:text-[var(--color-secondary)]'>
                Radar
              </TabsTrigger>
            </TabsList>
            <TabsContent value='map'>
              <ClusterMap cluster={cluster} />
            </TabsContent>
            <TabsContent value='radar'>
              <ClusterRadar clusterId={cluster.id} />
            </TabsContent>
          </Tabs>

          <Separator className='mx-4 m-2' orientation='horizontal' />

          <div className='flex justify-between'>
            <ClusterActivity clusterId={cluster.id} />
            <ClusterManagers managers={cluster.managers || []} />
          </div>

          <Separator className='mx-4 m-2' orientation='horizontal' />

          <div className='flex flex-col'>
            <Button variant='outline' className='border-secondary mb-1'>
              <Download className='w-4 h-4 mr-2' /> Exporter
            </Button>
            <Button variant='destructive' className='border-secondary'>
              <Trash2 className='w-4 h-4 mr-2' /> Supprimer
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
