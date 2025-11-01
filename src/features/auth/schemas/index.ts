import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Este campo é obrigatório." })
    .email("O e-mail fornecido não é válido."),
  password: z
    .string()
    .min(1, { message: "Este campo é obrigatório." }),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Este campo é obrigatório." })
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
      { message: "Digite seu nome completo (nome e sobrenome)." }
    ),
  email: z
    .string()
    .min(1, { message: "Este campo é obrigatório." })
    .email("O e-mail fornecido não é válido."),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .regex(/[a-zA-Z]/, { message: "A senha deve conter pelo menos uma letra." })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
    .regex(/[@#$!%*?&]/, { message: "A senha deve conter pelo menos um caractere especial." }),
  confirmPassword: z
    .string()
    .min(1, { message: "Este campo é obrigatório." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem.",
  })
