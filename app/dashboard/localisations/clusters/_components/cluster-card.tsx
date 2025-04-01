"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cluster } from "@/types";
import { motion } from "framer-motion";
import { Archive, Building2, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { ClusterEditDialog } from "./cluster-edit-dialog";

interface Props {
  cluster: Cluster;
  onClick?: () => void;
  index?: number;
}

function getStatusStyle(status: string) {
  switch (status) {
    case "actif":
      return "text-[var(--color-secondary)] border-[var(--color-secondary)]";
    case "inactif":
      return "text-muted-foreground border-muted";
    case "archive":
      return "text-gray-500 border-gray-300";
    default:
      return "";
  }
}

export function ClusterCard({ cluster, onClick, index = 0 }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  const totalSpots =
    cluster.buildings?.reduce((sum, b) => sum + b.spots.length, 0) ?? 0;
  const buildings = cluster.buildings ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}>
      <Card
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("button, svg, a")) return;
          if (!editOpen) onClick?.();
        }}
        className='p-4 cursor-pointer hover:shadow-md relative flex flex-col gap-4 border-l-4 border-l-[var(--color-secondary)] h-[380px] transition-all duration-200'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-lg font-semibold mb-1 '>
              {cluster.name}

              <Badge
                variant='outline'
                className={`capitalize bg-transparent ${getStatusStyle(cluster.status)} ml-4`}>
                {cluster.status}
              </Badge>
            </h3>
            <p className='text-sm text-muted-foreground mb-1'>
              {cluster.localisation}
            </p>
            {cluster.responsable && (
              <p className='text-xs text-muted-foreground italic'>
                Responsable : {cluster.responsable?.name ?? "non défini"}
              </p>
            )}
          </div>

          <TooltipProvider>
            <div className='absolute top-2 right-2 flex gap-1'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditOpen(true);
                    }}>
                    <Pencil className='w-4 h-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Modifier</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' variant='ghost'>
                    <Eye className='w-4 h-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Voir le cluster</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <div>
            <strong>{buildings.length}</strong> bâtiment(s)
          </div>
          <div>
            <strong>{totalSpots}</strong> spot(s)
          </div>
          <div>
            <strong>{cluster.tasksCount}</strong> tâche(s)
          </div>
        </div>

        <ScrollArea className='max-h-[160px] mt-2 relative pr-1'>
          <div className='flex flex-col gap-2 pb-2'>
            {buildings.map((b) => {
              const taskCount = Math.floor(Math.random() * 10);
              return (
                <Button
                  key={b.id}
                  variant='outline'
                  size='sm'
                  className='text-xs px-3 py-1 flex items-center gap-2 border border-secondary whitespace-nowrap'
                  onClick={(e) => {
                    e.stopPropagation();
                    // future: open building modal
                  }}>
                  <Building2 className='w-3 h-3' />
                  <span>{b.name}</span>
                  <span className='text-muted-foreground'>
                    ({b.spots.length} spots / {taskCount} tâches)
                  </span>
                </Button>
              );
            })}
          </div>
        </ScrollArea>

        <div className='mt-auto flex items-center justify-end'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-xs hover:text-destructive'
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: archiver / supprimer cluster
                  }}>
                  <Archive className='w-4 h-4 mr-1' />
                  Archiver
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archiver ce cluster</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <ClusterEditDialog
          clusterId={cluster.id}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      </Card>
    </motion.div>
  );
}
