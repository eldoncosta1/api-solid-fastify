import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepoitory = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepoitory)

  return useCase
}
