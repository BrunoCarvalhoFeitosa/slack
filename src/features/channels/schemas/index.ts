import { z } from "zod"

export const createChannelSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Este campo é obrigatório." })
})

export const updateChannelSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Este campo é obrigatório." })
})
