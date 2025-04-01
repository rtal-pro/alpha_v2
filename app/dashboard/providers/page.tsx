// dashboard/providers/page.tsx
"use client";

import { getAllProviders, Provider } from "@/lib/api/providers/providers";
import { useEffect, useState } from "react";
import { ProviderDetailsPanel } from "./_components/provider-details-panel";
import { ProviderHeader } from "./_components/provider-header";
import { ProviderList } from "./_components/provider-list";

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterActif, setFilterActif] = useState<"all" | "actif" | "inactif">(
    "all"
  );
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );

  useEffect(() => {
    getAllProviders().then(setProviders);
  }, []);

  return (
    <div className=' pl-4 pr-4 flex flex-col h-[calc(100vh-5rem)]'>
      <ProviderHeader />
      <div className='flex flex-col lg:flex-row gap-6  '>
        <ProviderList
          search={search}
          setSearch={setSearch}
          filterType={filterType}
          setFilterType={setFilterType}
          filterActif={filterActif}
          setFilterActif={setFilterActif}
          providers={providers}
          onSelect={setSelectedProvider}
        />
        <ProviderDetailsPanel provider={selectedProvider} />
      </div>
    </div>
  );
}
