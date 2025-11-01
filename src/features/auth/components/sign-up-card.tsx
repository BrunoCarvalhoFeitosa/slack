"use client"
import { useState } from "react"
import { SignInFlow } from "../types"
import { registerSchema } from "../schemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuthActions } from "@convex-dev/auth/react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc"
import { CircleAlertIcon, EyeIcon, EyeOffIcon } from "lucide-react"

interface SignInCardProps {
  setState: (state: SignInFlow) => void
}

export const SignUpCard = ({ setState }: SignInCardProps) => {
  const [isPending, setIdPending] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmationPassword, setShowConfirmationPassword] = useState<boolean>(false)
  const [passwordStrength, setPasswordStrength] = useState<number>(0)
  const [confirmPasswordStrength, setConfirmPasswordStrength] = useState<number>(0)
  const { signIn } = useAuthActions()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmationPassword = () => {
    setShowConfirmationPassword(!showConfirmationPassword)
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 15
    if (/[A-Z]/.test(password)) strength += 15
    if (/[0-9]/.test(password)) strength += 15
    if (/[@$!%*?&]/.test(password)) strength += 30
    return strength
  }

  const getPasswordLevel = (strength: number) => {
    if (strength < 30) return 1
    if (strength < 50) return 2
    if (strength < 75) return 3
    return 4
  }

  const handleProviderSignUp = (value: "google") => {
    signIn(value)
  }

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    if (values.password !== values.confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    setIdPending(true)
    
    signIn("password", {
      name: values.name,
      email: values.email,
      password: values.password,
      flow: "signUp"
    }).catch((error) => {
      console.error("Error while sign in with password", error)
      setError("Ooops, algo deu errado.")
    }).finally(() => {
      setIdPending(false)
    })
  }

  return (
    <Card className="px-5 pb-0 w-full shadow-none border-none rounded-none">
      <CardHeader className="px-0 flex flex-col justify-center items-center">
        <CardTitle className="text-2xl md:text-4xl xl:text-5xl font-bold text-black">
          Insira seu e-mail para entrar
        </CardTitle>
        <CardDescription className="text-base text-black">
          Ou escolha outra forma de entrar.
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="md:mx-auto md:w-3/4 px-2 py-4 flex items-center gap-x-1 bg-destructive/15 rounded-md">
          <CircleAlertIcon className="size-4 text-destructive" />
          <p className="text-sm text-destructive">
            {error}
          </p>
        </div>
      )}
      <CardContent className="px-0 md:mx-auto md:w-3/4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="off"
                      maxLength={80}
                      placeholder="Nome completo"
                      className="h-12 placeholder:text-base"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="off"
                      maxLength={120}
                      placeholder="nome@work-email.com"
                      className="h-12 placeholder:text-base"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        maxLength={80}
                        placeholder="senha"
                        className="pr-14 h-12 placeholder:text-base"
                        disabled={isPending}
                        onChange={(e) => {
                          field.onChange(e)
                          setPasswordStrength(calculatePasswordStrength(e.target.value))
                        }}
                      />
                      {field.value && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-[3px]">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`w-[6px] h-[5px] transition-all ${
                                getPasswordLevel(passwordStrength) >= level
                                  ? passwordStrength < 40
                                    ? "bg-red-500"
                                    : passwordStrength < 70
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                  : "bg-gray-300 dark:bg-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer hover:bg-transparent"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <EyeIcon className="size-6 text-gray-300" />
                        ) : (
                          <EyeOffIcon className="size-6 text-gray-300" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        type={showConfirmationPassword ? "text" : "password"}
                        autoComplete="off"
                        maxLength={80}
                        placeholder="confirme a senha"
                        className="pr-14 h-12 placeholder:text-base"
                        disabled={isPending}
                        onChange={(e) => {
                          field.onChange(e)
                          setConfirmPasswordStrength(calculatePasswordStrength(e.target.value))
                        }}
                      />
                      {field.value && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-[3px]">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`w-[6px] h-[5px] transition-all ${
                                getPasswordLevel(confirmPasswordStrength) >= level
                                  ? confirmPasswordStrength < 40
                                    ? "bg-red-500"
                                    : confirmPasswordStrength < 70
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                  : "bg-gray-300 dark:bg-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute top-2/4 -translate-y-2/4 right-3 cursor-pointer hover:bg-transparent"
                        onClick={handleShowConfirmationPassword}
                      >
                        {showConfirmationPassword ? (
                          <EyeIcon className="size-6 text-gray-300" />
                        ) : (
                          <EyeOffIcon className="size-6 text-gray-300" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
              <Button
                type="submit"
                className="w-full h-12 text-lg bg-primary"
                disabled={isPending}
              >
                Entrar com e-mail
              </Button>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="w-full flex justify-center items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-black">ou entre com</span>
                <Separator className="flex-1" />
              </div>
              <div className="flex justify-center">
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => handleProviderSignUp("google")}
                >
                  <FcGoogle className="size-6" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-1">
              Já tem uma conta?
              <Button
                type="button"
                variant="ghost"
                className="p-0 font-medium text-base hover:bg-transparent text-blue-500 hover:text-blue-600 underline"
                onClick={() => setState("signIn")}
              >
                Entre agora mesmo
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
