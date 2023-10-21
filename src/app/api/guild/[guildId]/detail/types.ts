import { z } from "zod"

export const UpdateGuildDetail = z.object({
  name: z.string().optional(),
  icon: z.string().optional(),
  nickname: z.string().optional(),
})

export type UpdateGuildDetail = z.infer<typeof UpdateGuildDetail>
