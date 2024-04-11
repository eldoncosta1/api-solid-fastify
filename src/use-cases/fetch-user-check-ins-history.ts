import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { Checkin } from '@prisma/client'

type FetchUserCheckInsUseCaseRequest = {
  userId: string
  page: number
}

type FetchUserCheckInsUseCaseResponse = {
  checkins: Checkin[]
}

export class FetchUserCheckInsUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
    const checkins = await this.checkinsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkins,
    }
  }
}
