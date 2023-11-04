import { z } from "zod"

const ResultSchema = z.object({
  enemy: z.string().min(1),
  enemyScore: z.number(),
  score: z.number(),
  date: z.string().datetime(),
})

export const CreateResultSchema = z.object({
  guildId: z.string().min(1),
  result: ResultSchema,
})

export const UpdateResultSchema = z.object({
  guildId: z.string().min(1),
  prev: ResultSchema,
  next: ResultSchema,
})
