"use client"
import { useRef } from "react"
import { useVideoVisibility } from "@/app/hooks/useVideoVisibility"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Link from "next/link"
import { AgentForceIcon } from "../../icons/agent-force"
import { CollaborationIcon } from "../../icons/collaboration"
import { IaIcon } from "../../icons/ia"
import { IntegrationsIcon } from "../../icons/integrations"
import { ManagementIcon } from "../../icons/management"
import { MoveRightIcon } from "lucide-react"

export const AboutSection = () => {
  const sectionCollaborationRef = useRef<HTMLDivElement | null>(null)
  const videoCollaborationRef = useRef<HTMLVideoElement | null>(null)
  const sectionManagementRef = useRef<HTMLDivElement | null>(null)
  const videoManagementRef = useRef<HTMLVideoElement | null>(null)
  const sectionIntegrationRef = useRef<HTMLDivElement | null>(null)
  const videoIntegrationRef = useRef<HTMLVideoElement | null>(null)
  const sectionIaRef = useRef<HTMLDivElement | null>(null)
  const videoIaRef = useRef<HTMLVideoElement | null>(null)
  const sectionAgentForceRef = useRef<HTMLDivElement | null>(null)
  const videoAgentForce = useRef<HTMLVideoElement | null>(null)

  useVideoVisibility(videoCollaborationRef)
  useVideoVisibility(videoManagementRef)
  useVideoVisibility(videoIntegrationRef)
  useVideoVisibility(videoIaRef)
  useVideoVisibility(videoAgentForce)

  const handleScrollTo = (ref: React.RefObject<Element | null>, offset = 195) => {
    if (ref.current) {
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="w-full md:-mt-52 overflow-hidden">
      <div className="w-full pt-10 md:pt-64 rounded-bg bg-gray-100" />
      <div className="px-5 pb-22 w-full bg-gray-100">
        <div className="xl:mb-28">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            Reúna pessoas, projetos, apps e agentes de IA.
          </h2>
          <div className="mt-5 flex justify-center">
            <Carousel
              className="w-full"
              plugins={[Autoplay({ delay: 3000 })]}
              opts={{ loop: true, align: "center" }}
            >
              <CarouselContent>
                <CarouselItem
                  className="flex justify-center md:basis-1/3 xl:basis-1/5 cursor-pointer"
                  onClick={() => handleScrollTo(sectionCollaborationRef)}
                >
                  <div className="-translate-x-1 flex items-center gap-x-1">
                    <CollaborationIcon width="30" height="30" />
                    <span className="font-bold md:text-[13px] lg:text-[14px] uppercase">
                      Colaboração
                    </span>
                  </div>
                </CarouselItem>
                <CarouselItem
                  className="flex justify-center md:basis-1/3 xl:basis-1/5 cursor-pointer"
                  onClick={() => handleScrollTo(sectionManagementRef)}
                >
                  <div className="-translate-x-1 flex items-center gap-x-1">
                    <ManagementIcon width="30" height="30" />
                    <span className="font-bold md:text-[13px] lg:text-[14px] uppercase">
                      Gerenciamento de projetos
                    </span>
                  </div>
                </CarouselItem>
                <CarouselItem
                  className="flex justify-center md:basis-1/3 xl:basis-1/5 cursor-pointer"
                  onClick={() => handleScrollTo(sectionIntegrationRef)}
                >
                  <div className="-translate-x-1 flex items-center gap-x-1">
                    <IntegrationsIcon width="30" height="30" />
                    <span className="font-bold md:text-[13px] lg:text-[14px] uppercase">
                      Integrações
                    </span>
                  </div>
                </CarouselItem>
                <CarouselItem
                  className="flex justify-center md:basis-1/3 xl:basis-1/5 cursor-pointer"
                  onClick={() => handleScrollTo(sectionIaRef)}
                >
                  <div className="-translate-x-1 flex items-center gap-x-1">
                    <IaIcon width="30" height="30" />
                    <span className="font-bold md:text-[13px] lg:text-[14px] uppercase">
                      IA do Slack
                    </span>
                  </div>
                </CarouselItem>
                <CarouselItem
                  className="flex justify-center md:basis-1/3 xl:basis-1/5 cursor-pointer"
                  onClick={() => handleScrollTo(sectionAgentForceRef)}
                >
                  <div className="-translate-x-1 flex items-center gap-x-1">
                    <AgentForceIcon width="30" height="30" />
                    <span className="font-bold md:text-[13px] lg:text-[14px] uppercase">
                      AgentForce
                    </span>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div ref={sectionCollaborationRef} className="mt-20 flex flex-col xl:flex-row gap-16">
          <div className="xl:pl-3 flex-1">
            <div className="-translate-x-1 flex items-center gap-x-1">
              <CollaborationIcon width="30" height="30" />
              <span className="font-bold md:text-base uppercase">
                Colaboração
              </span>
            </div>
            <h3 className="my-3 text-xl font-bold">
              Comunique de mil e uma formas em um só lugar.
            </h3>
            <p className="mb-2">
              O Slack foi criado para conectar pessoas e informações. Você conversa. Você colabora. Você convida organizações externas para participar.
            </p>
            <p className="mb-2">
              Tudo acontece em canais organizados, onde mensagens, arquivos e ferramentas se reúnem para facilitar o trabalho em equipe — de qualquer lugar, a qualquer momento.
            </p>
            <p className="mb-2">
              Além disso, com integrações inteligentes e automações simples, o Slack reduz o retrabalho e mantém todos alinhados, acelerando decisões e tornando a colaboração mais eficiente.
            </p>
            <p>
              <strong className="text-3xl text-purple-900">80%</strong> das empresas da Fortune 100 usam o Slack Connect para colaborar com parceiros e clientes.
            </p>
          </div>
          <div className="relative mx-auto w-[92%] xl:w-[45%]">
            <div className="relative z-[1] lg:-translate-y-12 lg:-translate-x-12 rounded-md overflow-hidden">
              <video ref={videoCollaborationRef} className="w-full" autoPlay={true} muted>
                <source src="./root/videos/about-video-01.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-5 -right-5 md:-bottom-8 md:-right-8 lg:top-0 lg:right-0 w-3/4 h-full bg-purple-500 rounded-md" />
          </div>
        </div>
        <div ref={sectionManagementRef} className="mt-20 xl:mt-40 flex flex-col xl:flex-row gap-16">
          <div className="xl:pl-3 flex-1 xl:order-2">
            <div className="-translate-x-1 flex items-center gap-x-1">
              <ManagementIcon width="30" height="30" />
              <span className="font-bold md:text-base uppercase">
                Gerenciamento de projetos
              </span>
            </div>
            <h3 className="my-3 text-xl font-bold">
              Gerencie projetos e faça o trabalho com mais rapidez.
            </h3>
            <p className="mb-2">
              Priorize tarefas, compartilhe ideias e mantenha todos em sintonia. O Slack reúne todas as partes do seu projeto, do início ao fim.
            </p>
            <p className="mb-2">
              Com canais organizados por equipe, projeto ou tópico, todas as conversas e arquivos ficam em um só lugar — acessíveis e pesquisáveis sempre que você precisar. Isso elimina o vai e vem de e-mails e reduz o retrabalho, mantendo o foco no que realmente importa.
            </p>
            <p className="mb-2">
              Além disso, com integrações nativas e personalizadas, o Slack conecta suas ferramentas favoritas, como Google Drive, Trello e Asana, centralizando fluxos de trabalho e automatizando tarefas repetitivas. Assim, sua equipe ganha tempo para colaborar com mais eficiência e criatividade.
            </p>
            <p>
              <strong className="text-3xl text-purple-900">47%</strong> de aumento na produtividade de equipes que usam o Slack.
            </p>
          </div>
          <div className="relative mx-auto w-[92%] xl:w-[45%] xl:order-1">
            <div className="relative z-[1] lg:-translate-y-12 lg:translate-x-12 rounded-md overflow-hidden">
              <video ref={videoManagementRef} className="w-full" autoPlay={true} muted>
                <source src="./root/videos/about-video-02.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-5 -right-5 md:-bottom-8 md:left-auto md:-right-8 lg:top-0 lg:left-0 w-3/4 h-full bg-primary/90 rounded-md" />
          </div>
        </div>
        <div ref={sectionIntegrationRef} className="mt-20 xl:mt-40 flex flex-col xl:flex-row gap-16">
          <div className="xl:pl-3 flex-1">
            <div className="-translate-x-1 flex items-center gap-x-1">
              <IntegrationsIcon width="30" height="30" />
              <span className="font-bold md:text-base uppercase">
                Integrações
              </span>
            </div>
            <h3 className="my-3 text-xl font-bold">
              Aproveite as ferramentas que você já usa.
            </h3>
            <p className="mb-2">
              Automatize tarefas do dia a dia e economize o tempo da equipe com mais de 2.600 apps integrados ao Slack.
            </p>
            <p className="mb-2">
              Do envio de atualizações automáticas à gestão de projetos e atendimentos, o Slack conecta seus fluxos de trabalho em um só lugar, sem precisar alternar entre plataformas.
            </p>
            <p className="mb-2">
              Com bots personalizados, notificações inteligentes e atalhos práticos, sua equipe ganha agilidade e foca no que realmente importa: resolver problemas e gerar resultados.
            </p>
            <p>
              <strong className="text-3xl text-purple-900">35%</strong> de aumento na economia de tempo devido à automação para usuários do Slack.
            </p>
          </div>
          <div className="relative mx-auto w-[92%] xl:w-[45%]">
            <div className="relative z-[1] lg:-translate-y-12 lg:-translate-x-12 rounded-md overflow-hidden">
              <video ref={videoIntegrationRef} className="w-full" autoPlay={true} muted>
                <source src="./root/videos/about-video-03.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-5 -right-5 md:-bottom-8 md:-right-8 lg:top-0 lg:right-0 w-3/4 h-full bg-purple-500 rounded-md" />
          </div>
        </div>
        <div ref={sectionIaRef} className="mt-20 xl:mt-40 flex flex-col xl:flex-row gap-16">
          <div className="xl:pl-3 flex-1 xl:order-2">
            <div className="-translate-x-1 flex items-center gap-x-1">
              <IaIcon width="30" height="30" />
              <span className="font-bold md:text-base uppercase">
                IA do Slack
              </span>
            </div>
            <h3 className="my-3 text-xl font-bold">
              Faça mais com uma IA integrada ao trabalho.
            </h3>
            <p className="mb-2">
              Pesquise instantaneamente toda a história da empresa, fique em dia com as conversas e receba destaques diários das mensagens perdidas.
            </p>
            <p className="mb-2">
              A IA do Slack entende o contexto das conversas e ajuda você a encontrar informações relevantes em segundos, mesmo em canais movimentados ou com grande volume de dados.
            </p>
            <p className="mb-2">
              Ela resume tópicos, sugere ações e permite que você tome decisões com base nas informações certas, economizando tempo e aumentando a produtividade da equipe.
            </p>
            <p>
              <strong className="text-3xl text-purple-900">97 min</strong> é o tempo médio que os usuários podem economizar semanalmente com a IA do Slack.
            </p>
          </div>
          <div className="relative mx-auto w-[92%] xl:w-[45%] xl:order-1">
            <div className="relative z-[1] lg:-translate-y-12 lg:translate-x-12 rounded-md overflow-hidden">
              <video ref={videoIaRef} className="w-full" autoPlay={true} muted>
                <source src="./root/videos/about-video-04.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-5 -right-5 md:-bottom-8 md:left-auto md:-right-8 lg:top-0 lg:left-0 w-3/4 h-full bg-primary/90 rounded-md" />
          </div>
        </div>
        <div ref={sectionAgentForceRef} className="mt-20 py-10 px-6 flex flex-col lg:flex-row gap-16 bg-gradient-to-b from-blue-200 to-white rounded-xl shadow-xl">
          <div className="flex-1">
            <div className="-translate-x-1 flex items-center gap-x-1">
              <AgentForceIcon width="30" height="30" />
              <span className="font-bold md:text-base uppercase">
                AgentForce no Slack
              </span>
            </div>
            <h3 className="my-3 text-xl font-bold">
              Existe um agente de IA para todos no Slack.
            </h3>
            <p className="mb-2">
              Atualize propostas de vendas, defina lembretes para a equipe, resolva problemas de TI e faça muito mais com os agentes de IA no Slack.
            </p>
            <p className="mb-2">
              Cada equipe pode criar ou personalizar seus próprios agentes para automatizar tarefas específicas, responder perguntas frequentes e acelerar fluxos de trabalho com inteligência.
            </p>
            <p className="mb-5">
              Seja no suporte ao cliente, nas operações internas ou na comunicação entre áreas, os agentes de IA tornam o trabalho mais fluido, proativo e conectado ao que realmente importa.
            </p>
            <Link className="flex items-center gap-x-2 font-semibold text-blue-500" href="https://slack.com/intl/pt-br/ai-agents">
              Saiba mais
              <MoveRightIcon className="size-5" />
            </Link>
          </div>
          <div className="relative mx-auto w-full lg:w-2/4">
            <div className="rounded-md overflow-hidden">
              <video ref={videoAgentForce} className="w-full" autoPlay={true} muted>
                <source src="./root/videos/about-video-05.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
