import { FastifyReply, FastifyRequest } from 'fastify'

export const ROLES = ['ADMIN', 'MEMBER'] as const

export function verifyUserRole(roleToVerify: (typeof ROLES)[number]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify)
      return reply.status(401).send({ message: 'UNAUTHORIZED' })
  }
}
