import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createGym } from '@/utils/test/create-gym'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a checkin', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    const gym = await createGym({
      latitude: -9.3889133,
      longitude: -40.5159271,
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/checkins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -9.3889133,
        longitude: -40.5159271,
      })

    expect(response.statusCode).toEqual(201)
  })
})
