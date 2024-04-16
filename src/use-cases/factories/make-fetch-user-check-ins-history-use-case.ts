import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsUseCase(checkinsRepository)

  return useCase
}
