import { IGymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

type SearchGymUseCaseRequest = {
  query: string
  page: number
}

type SearchGymUseCaseResponse = {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
