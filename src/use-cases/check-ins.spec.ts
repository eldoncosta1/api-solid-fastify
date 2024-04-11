import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckinsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id',
      title: 'Gym Name',
      description: '',
      phone: '',
      latitude: -9.3889133,
      longitude: -40.5159271,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -9.3889133,
      userLongitude: -40.5159271,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 3, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -9.3889133,
      userLongitude: -40.5159271,
    })

    const promise = sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -9.3889133,
      userLongitude: -40.5159271,
    })

    const expectedError = expect(promise).rejects
    await expectedError.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 3, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -9.3889133,
      userLongitude: -40.5159271,
    })

    vi.setSystemTime(new Date(2024, 3, 21, 8, 0, 0))
    const promise = sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -9.3889133,
      userLongitude: -40.5159271,
    })

    const expectedResolve = expect(promise).resolves
    await expectedResolve.toBeTruthy()
  })

  it('should be able to check in on distant gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      title: 'Gym Name 2',
      description: '',
      phone: '',
      latitude: new Decimal(-9.3858648),
      longitude: new Decimal(-40.4742992),
    })

    const promise = sut.execute({
      gymId: 'gym-02',
      userId: 'user-id',
      userLatitude: -9.3889133,
      userLongitude: -40.5159271,
    })

    const expectedError = expect(promise).rejects
    await expectedError.toBeInstanceOf(MaxDistanceError)
  })
})
