// /lib/api/clusters.ts — MOCK VERSION
import { faker } from "@faker-js/faker";

// TYPES
export type UserRole =
  | "manager"
  | "opérateur"
  | "technicien"
  | "chef de site"
  | "superviseur"
  | "auditeur"
  | "prestataire"
  | "interne";

export interface Spot {
  id: string;
  name: string;
  gps: string;
  type: string;
  status: "actif" | "inactif";
  accessLevel: "public" | "restreint" | "sécurisé";
  qrCodeUrl: string;
  notes?: string;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  gps: string;
  spots: Spot[];
  surface: number;
  etages: number;
  responsable: User;
  type: "bureaux" | "industriel" | "résidentiel";
  anneeConstruction: number;
  certifications?: string[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  phone?: string;
}

export interface Cluster {
  id: string;
  name: string;
  description?: string;
  status: "actif" | "inactif";
  buildingsCount: number;
  tasksCount: number;
  buildings?: Building[];
  managers?: User[];
  createdAt: string;
  updatedAt: string;
  localisation?: string;
  secteur?: string;
  tags?: string[];
  superficieTotale?: number;
  risquesIdentifiés?: string[];
}

function generateFrenchClusterCoordinates(): [number, number] {
  const lat = faker.number.float({ min: 43.0, max: 49.5, fractionDigits: 5 });
  const lng = faker.number.float({ min: -1.5, max: 7.5, fractionDigits: 5 });
  return [lat, lng];
}

function generateNearbyGps(baseLat: number, baseLng: number): string {
  const latOffset = faker.number.float({
    min: -0.02,
    max: 0.02,
    fractionDigits: 5,
  });
  const lngOffset = faker.number.float({
    min: -0.02,
    max: 0.02,
    fractionDigits: 5,
  });
  return `${(baseLat + latOffset).toFixed(5)},${(baseLng + lngOffset).toFixed(5)}`;
}

function generateUser(role: UserRole): User {
  return {
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    role,
    avatarUrl: faker.image.avatar(),
    phone: faker.phone.number({ style: "national" }),
  };
}

function generateSpots(count: number): Spot[] {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.location.streetAddress(),
    gps: generateNearbyGps(
      faker.number.float({ min: 43.0, max: 49.5, fractionDigits: 5 }),
      faker.number.float({ min: -1.5, max: 7.5, fractionDigits: 5 })
    ),
    type: faker.helpers.arrayElement(["nettoyage", "sécurité", "technique"]),
    status: faker.helpers.arrayElement(["actif", "inactif"]),
    accessLevel: faker.helpers.arrayElement([
      "public",
      "restreint",
      "sécurisé",
    ]),
    qrCodeUrl: faker.image.url(),
    notes: faker.lorem.sentence(),
  }));
}

function generateBuildings(
  count: number,
  center: [number, number]
): Building[] {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    gps: generateNearbyGps(center[0], center[1]),
    surface: faker.number.int({ min: 100, max: 1000 }),
    etages: faker.number.int({ min: 1, max: 12 }),
    responsable: generateUser(
      faker.helpers.arrayElement(["technicien", "chef de site", "prestataire"])
    ),
    type: faker.helpers.arrayElement(["bureaux", "industriel", "résidentiel"]),
    anneeConstruction: faker.date.past({ years: 50 }).getFullYear(),
    certifications: faker.helpers.arrayElements(["HQE", "BREEAM", "LEED"], {
      min: 0,
      max: 2,
    }),
    spots: generateSpots(faker.number.int({ min: 3, max: 8 })),
  }));
}

function generateClusters(count: number): Cluster[] {
  const center = generateFrenchClusterCoordinates();

  return Array.from({ length: count }).map(() => {
    const buildings = generateBuildings(
      faker.number.int({ min: 2, max: 5 }),
      center
    );
    return {
      id: faker.string.uuid(),
      name: faker.location.city() + " - " + faker.color.human(),
      description: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(["actif", "inactif"]),
      buildingsCount: buildings.length,
      tasksCount: faker.number.int({ min: 3, max: 50 }),
      buildings,
      managers: Array.from(
        { length: faker.number.int({ min: 1, max: 3 }) },
        () =>
          generateUser(
            faker.helpers.arrayElement([
              "manager",
              "superviseur",
              "auditeur",
              "interne",
            ])
          )
      ),
      localisation: faker.location.city(),
      secteur: faker.helpers.arrayElement([
        "tertiaire",
        "logistique",
        "résidentiel",
        "hospitalier",
      ]),
      tags: faker.helpers.arrayElements(
        ["prioritaire", "à surveiller", "historique", "nouveau client"],
        { min: 0, max: 3 }
      ),
      superficieTotale: buildings.reduce((sum, b) => sum + b.surface, 0),
      risquesIdentifiés: faker.helpers.arrayElements(
        ["amiante", "inondation", "sécurité incendie", "accès limité"],
        { min: 0, max: 2 }
      ),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };
  });
}

const FAKE_CLUSTERS: Cluster[] = generateClusters(42);

export async function createCluster(data: Partial<Cluster>) {
  const newCluster: Cluster = {
    id: faker.string.uuid(),
    name: data.name ?? "Nouveau cluster",
    description: data.description ?? "",
    status: "actif",
    buildingsCount: 0,
    tasksCount: 0,
    buildings: [],
    managers: [],
    localisation: "",
    secteur: "",
    tags: [],
    superficieTotale: 0,
    risquesIdentifiés: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  FAKE_CLUSTERS.unshift(newCluster);
  return newCluster;
}

export async function updateCluster(id: string, data: Partial<Cluster>) {
  const index = FAKE_CLUSTERS.findIndex((c) => c.id === id);
  if (index !== -1) {
    FAKE_CLUSTERS[index] = {
      ...FAKE_CLUSTERS[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
  }
  return FAKE_CLUSTERS[index];
}

export async function getCluster(id: string) {
  return FAKE_CLUSTERS.find((c) => c.id === id) ?? null;
}

export async function getAllClusters() {
  return FAKE_CLUSTERS;
}
