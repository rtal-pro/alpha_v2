// /lib/api/providers.ts — MOCK VERSION
import { faker } from '@faker-js/faker'

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
  'Vérification légale',
  'Autre',
] as const

export const MEMBER_ROLES = [
  'Technicien',
  'Agent',
  'Intervenant',
  'Remplaçant',
  'Stagiaire',
  'Chef d’équipe',
  'Coordinateur',
  'Responsable terrain',
  'Contrôleur qualité',
  'Contrôleur sécurité',
  'Contrôleur général',
  'Référent secteur',
  'Auditeur externe',
  'Prestataire maître',
] as const

export type ProviderType = (typeof PROVIDER_TYPES)[number]
export type MemberRole = (typeof MEMBER_ROLES)[number]

export interface ProviderMember {
  id: string
  nom: string
  prenom: string
  role: MemberRole
  actif: boolean
  email: string
  telephone: string
  avatar: string
}

export interface Provider {
  id: string
  nom: string
  type: ProviderType
  actif: boolean
  note: number
  membres: ProviderMember[]
}

const generateMember = (): ProviderMember => ({
  id: faker.string.uuid(),
  nom: faker.person.firstName(),
  prenom: faker.person.lastName(),
  role: faker.helpers.arrayElement(MEMBER_ROLES),
  actif: faker.datatype.boolean(),
  email: faker.internet.email(),
  telephone: faker.phone.number({ style: "national" }),
  avatar: faker.image.avatarGitHub(),
})

const generateProvider = (): Provider => {
  const membres = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => generateMember())

  return {
    id: faker.string.uuid(),
    nom: faker.company.name(),
    type: faker.helpers.arrayElement(PROVIDER_TYPES),
    actif: faker.datatype.boolean(),
    note: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 2 }),
    membres,
  }
}

const FAKE_PROVIDERS: Provider[] = Array.from({ length: 25 }).map(() => generateProvider())

export async function getAllProviders(): Promise<Provider[]> {
  return FAKE_PROVIDERS
}

export async function getProvider(id: string): Promise<Provider | undefined> {
  return FAKE_PROVIDERS.find((p) => p.id === id)
}

export async function createProvider(data: Partial<Provider>): Promise<Provider> {
  const newProvider: Provider = {
    id: faker.string.uuid(),
    nom: data.nom ?? 'Nouveau prestataire',
    type: data.type ?? 'Autre',
    actif: true,
    note: 4.5,
    membres: [],
  }
  FAKE_PROVIDERS.unshift(newProvider)
  return newProvider
}

export async function updateProvider(id: string, data: Partial<Provider>): Promise<Provider | undefined> {
  const index = FAKE_PROVIDERS.findIndex((p) => p.id === id)
  if (index !== -1) {
    FAKE_PROVIDERS[index] = {
      ...FAKE_PROVIDERS[index],
      ...data,
    }
    return FAKE_PROVIDERS[index]
  }
  return undefined
}
