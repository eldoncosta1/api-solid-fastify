import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createGym } from '@/utils/test/create-gym'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Checkin Validate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a checkin', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    const user = await prisma.user.findFirstOrThrow()

    const gym = await createGym({
      latitude: -9.3889133,
      longitude: -40.5159271,
    })

    let checkin = await prisma.checkin.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/checkins/${checkin.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkin = await prisma.checkin.findUniqueOrThrow({
      where: {
        id: checkin.id,
      },
    })

    expect(checkin.validated_at).toEqual(expect.any(Date))
  })
})
