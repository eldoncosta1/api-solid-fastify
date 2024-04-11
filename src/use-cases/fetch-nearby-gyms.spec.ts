import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    const nearLatitude = faker.location.latitude()
    const nearLongitude = faker.location.longitude()
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: nearLatitude,
      longitude: nearLongitude,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -9.500949,
      longitude: 40.183763,
    })

    const { gyms } = await sut.execute({
      userLatitude: nearLatitude,
      userLongitude: nearLongitude,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
