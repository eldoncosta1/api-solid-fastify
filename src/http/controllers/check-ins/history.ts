import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkinHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkinHistoryQuerySchema.parse(request.query)

  const createGymUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkins } = await createGymUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkins,
  })
}
