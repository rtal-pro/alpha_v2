// dashboard/providers/_components/provider-details-panel.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Provider } from "@/lib/api/providers/providers";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart, History, Info, Users } from "lucide-react";
import { TabHistory } from "./tabs/tab-history";
import { TabInfos } from "./tabs/tab-infos";
import { TabMembers } from "./tabs/tab-members";
import { TabStats } from "./tabs/tab-stats";

interface Props {
  provider: Provider | null;
}

export function ProviderDetailsPanel({ provider }: Props) {
  return (
    <div className='flex flex-col w-full max-h-screen overflow-hidden'>
      <AnimatePresence mode='wait'>
        {provider ? (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25 }}
            className='border rounded-lg p-6 flex flex-col h-full  overflow-hidden'
          >
            <div className='mb-4'>
              <h3 className='text-lg font-semibold leading-tight mb-1'>
                {provider.nom}
              </h3>
              <div className='text-sm text-muted-foreground mb-1'>
                Type : <span className='font-medium'>{provider.type}</span>
              </div>
              <Badge variant={provider.actif ? "default" : "destructive"}>
                {provider.actif ? "Actif" : "Inactif"}
              </Badge>
            </div>

            <Tabs defaultValue='infos' className='w-full flex-1 flex flex-col overflow-hidden'>
              <TabsList className='grid grid-cols-4'>
                <TabsTrigger value='infos'>
                  <Info className='w-4 h-4 mr-1' /> Infos
                </TabsTrigger>
                <TabsTrigger value='membres'>
                  <Users className='w-4 h-4 mr-1' /> Membres
                </TabsTrigger>
                <TabsTrigger value='historique'>
                  <History className='w-4 h-4 mr-1' /> Historique
                </TabsTrigger>
                <TabsTrigger value='stats'>
                  <BarChart className='w-4 h-4 mr-1' /> Statistiques
                </TabsTrigger>
              </TabsList>

              <TabsContent value='infos' className='flex-1 overflow-hidden'>
                <ScrollArea className='h-[80%] pr-2'>
                  <TabInfos provider={provider} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value='membres' className='flex-1 h-max-[85%]'>
                <ScrollArea className='h-full' >
                  <TabMembers provider={provider} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value='historique' className='flex-1 overflow-hidden'>
                <ScrollArea className='h-full pr-2'>
                  <TabHistory provider={provider} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value='stats' className='flex-1 overflow-hidden'>
                <ScrollArea className='h-full pr-2'>
                  <TabStats provider={provider} />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </motion.div>
        ) : (
          <motion.div
            key='empty'
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25 }}
            className='text-sm text-muted-foreground border rounded-lg p-6 h-full flex items-center justify-center'
          >
            Sélectionnez un prestataire dans la liste pour voir les détails.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
