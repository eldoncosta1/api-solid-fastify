import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    const nearLatitude = faker.location.latitude()
    const nearLongitude = faker.location.longitude()

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: faker.string.sample(10),
        phone: faker.phone.number(),
        latitude: nearLatitude,
        longitude: nearLongitude,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: faker.string.sample(10),
        phone: faker.phone.number(),
        latitude: -9.500949,
        longitude: 40.183763,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: nearLatitude,
        longitude: nearLongitude,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym',
      }),
    ])
  })
})
