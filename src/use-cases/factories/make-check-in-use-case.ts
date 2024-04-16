import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckinUseCase() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const gymsRepoitory = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkinsRepository, gymsRepoitory)

  return useCase
}
