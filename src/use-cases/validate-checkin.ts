import { ICheckInsRepository } from '@/repositories/check-ins-repository'
import { Checkin } from '@prisma/client'
import dayjs from 'dayjs'
import { LateCheckinValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type ValidateCheckInUseCaseRequest = {
  checkinId: string
}

type ValidateCheckInUseCaseResponse = {
  checkIn: Checkin
}

export class ValidateCheckInUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    checkinId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkinsRepository.findById(checkinId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new LateCheckinValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkinsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
