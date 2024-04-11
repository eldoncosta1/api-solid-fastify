import { ICheckInsRepository } from '@/repositories/check-ins-repository'

type GetUserMetricsUseCaseRequest = {
  userId: string
}

type GetUserMetricsUseCaseResponse = {
  checkinsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkinsCount = await this.checkinsRepository.countByUserId(userId)

    return {
      checkinsCount,
    }
  }
}
