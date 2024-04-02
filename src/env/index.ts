import 'dotenv/config'

import { z } from 'zod'

const NODE_ENV = ['dev', 'test', 'production'] as const

const envSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables:', _env.error.format())

  throw new Error('Invalid environment variales.')
}

export const env = _env.data
