"use client"
import { SlackLogoText } from "@/components/common/slack-logo-text"
import Link from "next/link"
import { FaLinkedinIn, FaFacebookSquare, FaYoutube, FaTiktok } from "react-icons/fa"
import { PiInstagramLogoFill } from "react-icons/pi"

  export const Footer = () => {
    return (
      <footer className="p-10 w-full">
        <div className="pb-8 w-full flex justify-end items-center gap-x-2 border-b">
          <div className="flex items-center gap-x-2">
            <Link href="https://www.instagram.com/slackhq">
              <PiInstagramLogoFill className="size-6 text-black" />
            </Link>
            <Link href="https://www.facebook.com/slackhq">
              <FaFacebookSquare className="size-5 text-black" />
            </Link>
            <Link href="https://www.youtube.com/channel/UCY3YECgeBcLCzIrFLP4gblw">
              <FaYoutube className="size-6 text-black" />
            </Link>
          </div>
        </div>
        <div className="mt-10 w-full flex flex-col lg:flex-row">
          <div className="w-full flex flex-col md:flex-row justify-between gap-12 lg:gap-20">
            <div className="flex md:hidden xl:flex flex-col items-center lg:items-start text-center lg:text-left">
              <h6 className="text-base font-semibold">
                Produto
              </h6>
              <ul className="mt-3 flex flex-col gap-y-2">
                <li>
                  Assistir à demonstração
                </li>
                <li>
                  Preços
                </li>
                <li>
                  Pago vs. gratuito
                </li>
                <li>
                  Acessibilidade
                </li>
                <li>
                  Versões em destaque
                </li>
                <li>
                  Log de alterações
                </li>
                <li>
                  Status
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h6 className="text-base font-semibold">
                Funcionalidades
              </h6>
              <ul className="mt-3 flex flex-col gap-y-2">
                <li>
                  Canais
                </li>
                <li>
                  Slack Connect
                </li>
                <li>
                  Mensagens
                </li>
                <li>
                  Círculos
                </li>
                <li>
                  Canvas
                </li>
                <li>
                  Apps e integrações
                </li>
                <li>
                  Ver todos recursos
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h6 className="text-base font-semibold">
                Soluções
              </h6>
              <ul className="mt-3 flex flex-col gap-y-2">
                <li>
                  Engenharia
                </li>
                <li>
                  Tecnologia da Informação
                </li>
                <li>
                  Atendimento ao cliente
                </li>
                <li>
                  Vendas
                </li>
                <li>
                  Gerenciamento de projetos
                </li>
                <li>
                  Marketing
                </li>
                <li>
                  Serviços financeiros
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h6 className="text-base font-semibold">
                Recursos
              </h6>
              <ul className="mt-3 flex flex-col gap-y-2">
                <li>
                  Central de ajuda
                </li>
                <li>
                  Novidades
                </li>
                <li>
                  Biblioteca de recursos
                </li>
                <li>
                  Blog do Slack
                </li>
                <li>
                  Comunidade
                </li>
                <li>
                  Parceiros
                </li>
                <li>
                  Desenvolvedores
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h6 className="text-base font-semibold">
                Empresa
              </h6>
              <ul className="mt-3 flex flex-col gap-y-2">
                <li>
                  Sobre nós
                </li>
                <li>
                  Carreiras
                </li>
                <li>
                  Notícias
                </li>
                <li>
                  Kit de mídia
                </li>
                <li>
                  Central da marca
                </li>
                <li>
                  Loja de produtos
                </li>
                <li>
                  Fale conosco
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }