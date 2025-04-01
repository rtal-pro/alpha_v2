// app/api/providers/route.ts
import { NextResponse } from 'next/server'
import { faker } from '@faker-js/faker'

import { PROVIDER_TYPES } from '@/lib/constants/provider-types'
import { MEMBER_ROLES } from '@/lib/constants/menber-roles'

export async function GET() {
  const providers = Array.from({ length: 20 }).map(() => {
    const nombreMembres = faker.number.int({ min: 2, max: 8 })

    const membres = Array.from({ length: nombreMembres }).map(() => ({
      id: faker.string.uuid(),
      nom: faker.person.firstName(),
      prenom: faker.person.lastName(),
      role: faker.helpers.arrayElement(MEMBER_ROLES),
      actif: faker.datatype.boolean(),
      email: faker.internet.email(),
      telephone: faker.phone.number(),
      avatar: faker.image.avatar(),
    }))

    return {
      id: faker.string.uuid(),
      nom: faker.company.name(),
      type: faker.helpers.arrayElement(PROVIDER_TYPES),
      actif: faker.datatype.boolean(),
      note: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 2 }),
      membres,
    }
  })

  return NextResponse.json(providers)
}
