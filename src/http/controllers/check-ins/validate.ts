import { makeValidateCheckinUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckinPramsSchema = z.object({
    checkinId: z.string().uuid(),
  })

  const { checkinId } = validateCheckinPramsSchema.parse(request.params)

  const validateCheckinUseCase = makeValidateCheckinUseCase()

  await validateCheckinUseCase.execute({
    checkinId,
  })

  return reply.status(204).send()
}
