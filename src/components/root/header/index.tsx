"use client"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SlackLogoText } from "@/components/common/slack-logo-text"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

interface HeaderProps {
  isFixed?: boolean
}

export const Header = ({ isFixed }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "top-0 mx-auto py-4 px-6 flex justify-between items-center w-full transition-all duration-300 z-50",
      isFixed ? "fixed" : "sticky",
      isScrolled ? "translate-y-3 w-[97vw] bg-[#611F69] rounded-full shadow-lg border-3 border-purple-500" : "bg-[#611F69]"
    )}>
      <div className="flex items-center gap-3">
        <div>
          <Link href="/">
            <SlackLogoText width="130" height="40" labelColor="#fff" showLabel />
          </Link>
        </div>
        <div>
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex-wrap max-w-full">
              <NavigationMenuItem>
                <NavigationMenuTrigger className={"text-white"}>
                  Funcionalidades
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 w-full min-w-[270px] md:w-[400px] lg:w-[600px] lg:grid-cols-[1fr_1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                          href="/"
                        >
                          <div className="mb-2 text-lg font-medium sm:mt-4">
                            Slack
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            O Slack é uma plataforma de comunicação e colaboração voltada principalmente para equipes e ambientes de trabalho. Seu principal objetivo é facilitar a troca de informações e a organização do trabalho em grupo.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/" title="Canais">
                      Organize as equipes e o trabalho.
                    </ListItem>
                    <ListItem href="/" title="Slack Connect">
                      Trabalhe com parceiros externos.
                    </ListItem>
                    <ListItem href="/" title="Mensagens">
                      Converse com a sua equipe
                    </ListItem>
                    <ListItem href="/" title="Círculos">
                      Faça reuniões com áudio e vídeo.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger className={"text-white"}>
                  Soluções
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <div>
                      <p className="px-2 mb-2 font-semibold">
                        Por departamento
                      </p>
                      <ul className="m-0">
                        <ListItem
                          title="Engenharia"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Tecnologia da Informação"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Atendimento ao cliente"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Marketing"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Recursos Humanos"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Vendas"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Segurança"
                          href="/"
                          className="font-normal"
                        />
                      </ul>
                    </div>
                    <div>
                      <p className="px-2 mb-2 font-semibold">
                        Por setor
                      </p>
                      <ul className="m-0">
                        <ListItem
                          title="Tecnologia"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Mídia"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Pequenas empresas"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Serviços financeiros"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Saúde e ciências da vida"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Educação"
                          href="/"
                          className="font-normal"
                        />
                        <ListItem
                          title="Varejo"
                          href="/"
                          className="font-normal"
                        />
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger className={"text-white"}>
                  Recursos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 sm:w-[400px] md:w-[500px] lg:w-[600px]">
                    <ul>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Biblioteca de recursos
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Eventos
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Histórias de clientes
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Blog
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Certificação do Slack
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Novidades
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Desenvolvedores
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Comunidade
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Parceiros
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="text-base">
                              Slack Marketplace
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden lg:block">
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-white")}>
                  <Link href="/docs">
                    Preços
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <Link href="/account" className={cn("font-semibold", "text-white")}>
          Entrar
        </Link>
        <Link href="/account">
          <Button
            type="button"
            variant="outline"
            className={cn("h-12 bg-transparent uppercase hidden lg:flex", "text-white")}
          >
            Falar com vendas
          </Button>
        </Link>
        <Link href="/account">
          <Button
            type="button"
            variant="outline"
            className="hidden md:flex h-12 bg-primary hover:bg-primary uppercase text-white hover:text-white"
          >
            Começar
          </Button>
        </Link>
      </div>
    </header>
  )
}

const ListItem = ({
  title,
  children,
  href,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) => {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className={cn("text-base leading-none font-medium", className)}>{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-base leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}