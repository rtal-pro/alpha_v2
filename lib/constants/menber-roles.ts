export const MEMBER_ROLES = [
  // Opérationnels
  'Technicien',
  'Agent',
  'Intervenant',
  'Remplaçant',
  'Stagiaire',

  // Supervisés
  'Chef d’équipe',
  'Coordinateur',
  'Responsable terrain',

  // Contrôle
  'Contrôleur qualité',
  'Contrôleur sécurité',
  'Contrôleur général',
  'Référent secteur',
  'Auditeur externe',

  // Global
  'Prestataire maître',
] as const

export type MemberRole = (typeof MEMBER_ROLES)[number]
