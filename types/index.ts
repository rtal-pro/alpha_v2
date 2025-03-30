export type UserRole =
  | "manager"
  | "opérateur"
  | "technicien"
  | "chef de site"
  | "superviseur"
  | "auditeur"
  | "prestataire"
  | "interne"

export interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
  avatarUrl: string
  phone?: string
}

export interface Spot {
  id: string
  name: string
  gps: string
  type: string
  status: "actif" | "inactif"
  accessLevel: "public" | "restreint" | "sécurisé"
  qrCodeUrl: string
  notes?: string
}

export interface Building {
  id: string
  name: string
  address: string
  gps: string
  spots: Spot[]
  surface: number
  etages: number
  responsable: User
  type: "bureaux" | "industriel" | "résidentiel"
  anneeConstruction: number
  certifications?: string[]
}

export interface Cluster {
  id: string
  name: string
  description?: string
  status: "actif" | "inactif"
  buildingsCount: number
  tasksCount: number
  buildings?: Building[]
  managers?: User[]
  localisation?: string
  secteur?: string
  tags?: string[]
  superficieTotale?: number
  risquesIdentifiés?: string[]
  createdAt: string
  updatedAt: string
}
