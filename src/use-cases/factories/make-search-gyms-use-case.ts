import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymUseCase } from '../search-gyms'

export function makeSarchGymsUseCase() {
  const gymsRepoitory = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepoitory)

  return useCase
}
