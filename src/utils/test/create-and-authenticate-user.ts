import { ROLES } from '@/http/middlewares/verify-user-role'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role?: (typeof ROLES)[number],
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      role,
    },
  })

  await request(app.server).post('/users').send({})

  const authResponse = await request(app.server).post('/sessions').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
