import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepoitory = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepoitory)

  return useCase
}
