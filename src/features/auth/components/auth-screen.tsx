"use client"
import { useState } from "react"
import Link from "next/link"
import { SignInFlow } from "../types"
import { SignInCard } from "./sign-in-card"
import { SignUpCard } from "./sign-up-card"
import { SlackLogoText } from "@/components/common/slack-logo-text"

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn")

  return (
    <div className="w-full h-full mx-auto md:w-xl lg:w-3xl flex flex-col">
      <div className="pt-7 w-full flex justify-center">
        <Link href="/">
          <SlackLogoText width="160" height="50" labelColor="#000" showLabel />
        </Link>
      </div>
      <div className="w-full md:h-auto flex flex-1 justify-center items-center">
        {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
      </div>
    </div>
  )
}
