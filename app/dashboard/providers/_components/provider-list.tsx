// dashboard/providers/_components/provider-list.tsx
"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Provider } from "@/lib/api/providers/providers";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ProviderCard } from "./provider-card";
import { ProviderFilters } from "./provider-filters";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  filterType: string;
  setFilterType: (v: string) => void;
  filterActif: "all" | "actif" | "inactif";
  setFilterActif: (v: "all" | "actif" | "inactif") => void;
  providers: Provider[];
  onSelect: (p: Provider) => void;
}

export function ProviderList({
  search,
  setSearch,
  filterType,
  setFilterType,
  filterActif,
  setFilterActif,
  providers,
  onSelect,
}: Props) {
  const isLoading = false; // à remplacer par un vrai état plus tard
  const [noteMin, setNoteMin] = useState(0);
  const [memberMin, setMemberMin] = useState(0);

  const filtered = providers.filter((p) => {
    return p.note >= noteMin && p.membres.length >= memberMin;
  });

  const handleReset = () => {
    setFilterType("all");
    setFilterActif("all");
    setNoteMin(0);
    setMemberMin(0);
  };

  return (
    <div className='w-full lg:w-1/2 space-y-4 flex flex-col h-max-[80%]'>
      <div className='flex flex-col flex-1 md:flex-row md:items-center justify-between gap-4'>
        <Input
          placeholder='🔍 Rechercher un prestataire'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='max-w-sm'
        />
        <ProviderFilters
          currentType={filterType}
          onChangeType={setFilterType}
          currentActif={filterActif}
          onChangeActif={setFilterActif}
          noteMin={noteMin}
          onChangeNoteMin={setNoteMin}
          memberMin={memberMin}
          onChangeMemberMin={setMemberMin}
          onReset={handleReset}
        />
      </div>

      <ScrollArea className='flex flex-col pr-2'>
        {isLoading ?
          <div className='flex justify-center items-center h-32'>
            <Loader2 className='animate-spin w-6 h-6 text-muted-foreground' />
          </div>
        : filtered.length === 0 ?
          <div className='text-sm text-muted-foreground text-center py-8'>
            Aucun prestataire ne correspond à vos critères.
          </div>
        : <div className='grid md:grid-cols-1 gap-4 h-[80vh] '>
            <AnimatePresence mode='popLayout'>
              {filtered.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}>
                  <ProviderCard
                    provider={provider}
                    onSelect={() => onSelect(provider)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        }
      </ScrollArea>
    </div>
  );
}
