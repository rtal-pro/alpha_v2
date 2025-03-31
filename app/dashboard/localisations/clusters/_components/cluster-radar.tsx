"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

interface Props {
  clusterId: string;
}

// Exemple : tâches par type de prestation (réalisées vs à venir)
const prestationTypes = [
  "Nettoyage",
  "Sécurité",
  "Maintenance",
  "Espaces verts",
  "Accueil",
  "Gestion des déchets",
  "Technique",
  "Autres",
];

const sampleStats = prestationTypes.map((label) => ({
  label,
  effectuees: Math.floor(Math.random() * 40),
  aVenir: Math.floor(Math.random() * 30),
}));

export function ClusterRadar({}: Props) {
  return (
    <div className='h-96 rounded overflow-hidden'>
      <h4 className='text-sm font-semibold pt-1 pl-1'>
        Répartition des tâches par type
      </h4>
      <ResponsiveContainer width='100%' height={250}>
        <RadarChart data={sampleStats} outerRadius={90} className='mt-5'>
          <PolarGrid stroke='#ccc' />
          <PolarAngleAxis dataKey='label' fontSize={11} />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 60]}
            tick={{ fontSize: 10 }}
          />

          <Radar
            name='Tâches effectuées'
            dataKey='effectuees'
            stroke='var(--color-secondary)'
            fill='var(--color-secondary)'
            fillOpacity={0.4}
          />

          <Radar
            name='Tâches à venir'
            dataKey='aVenir'
            stroke='#dc2626'
            fill='#f87171'
            fillOpacity={0.3}
          />

          <Legend wrapperStyle={{ fontSize: 12 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
