// lib/constants/provider-types.ts

export const PROVIDER_TYPES = [
  'Nettoyage',
  'Plomberie',
  'Électricité',
  'Sécurité',
  'Espaces verts',
  'Voirie',
  'Vérification incendie',
  'Maintenance ascenseurs',
  'Climatisation / Chauffage',
  'Dératisation',
  'Gestion des déchets',
  'Contrôle d’accès',
  'Signalisation',
  'Vérification légale (registres, extincteurs)',
  'Autre'
] as const

export type ProviderType = (typeof PROVIDER_TYPES)[number]
