import { prisma } from '@/lib/prisma'
import { faker } from '@faker-js/faker'
import { Gym, Prisma } from '@prisma/client'

export async function createGym(
  data: Partial<Prisma.GymCreateInput> = {},
): Promise<Gym> {
  const gym = await prisma.gym.create({
    data: {
      title: faker.string.sample(10),
      description: faker.string.sample(10),
      phone: faker.phone.number(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...data,
    },
  })

  return gym
}
