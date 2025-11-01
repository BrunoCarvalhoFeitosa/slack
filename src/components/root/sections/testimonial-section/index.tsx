"use client"
import Image from "next/image"
import { VerifiedIcon } from "../../icons/verified"
import { TbBrandWindowsFilled, TbBrandTiktokFilled, TbBrandTinderFilled, TbBrandSnapchatFilled, TbBrandYoutubeFilled, TbBrandBitbucketFilled, TbBrandDiscordFilled, TbBrandOperaFilled, TbBrandPaypalFilled, TbBrandPinterestFilled, TbBrandStripeFilled, TbBrandWhatsappFilled, TbBrandAppleFilled, TbBrandFacebookFilled, TbBrandKickFilled, TbBrandGithubFilled, TbBrandSpotifyFilled, TbBrandVimeoFilled, TbBrandXFilled, TbBrandAngularFilled, TbBrandGoogleFilled, TbBrandNetflix, TbBrandDribbbleFilled, TbBrandGitlab, TbBrandFlutter, TbBrandFigma, TbBrandEnvato, TbBrandPatreonFilled, TbBrandSwift, TbBrandVscode, TbBrandTumblrFilled } from "react-icons/tb"

export const TestimonialSection = () => {
  return (
    <section className="py-20 px-5 bg-gray-200 overflow-x-hidden">
      <div className="flex flex-col gap-y-7">
        <h4 className="md:mx-auto md:max-w-lg lg:max-w-xl text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          As empresas mais inovadoras operam os negócios no Slack.
        </h4>
        <div className="w-full animate-marquee">
          <div className="w-full flex items-center md:gap-x-1 lg:gap-x-3">
            <TbBrandWindowsFilled className="size-7" />
            <TbBrandVscode className="size-7 fill-black" />
            <TbBrandTinderFilled className="size-7" />
            <TbBrandTiktokFilled className="size-7" />
            <TbBrandSnapchatFilled className="size-7" />
            <TbBrandYoutubeFilled className="size-7" />
            <TbBrandBitbucketFilled className="size-7" />
            <TbBrandDiscordFilled className="size-7" />
            <TbBrandOperaFilled className="size-7" />
            <TbBrandPaypalFilled className="size-7" />
            <TbBrandPinterestFilled className="size-7" />
            <TbBrandStripeFilled className="size-7" />
            <TbBrandWhatsappFilled className="size-7" />
            <TbBrandAppleFilled className="hidden lg:block size-7" />
            <TbBrandFacebookFilled className="hidden lg:block size-7" />
            <TbBrandGithubFilled className="hidden lg:block size-7" />
            <TbBrandKickFilled className="hidden lg:block size-7" />
            <TbBrandSpotifyFilled className="hidden lg:block size-7" />
            <TbBrandVimeoFilled className="hidden lg:block size-7" />
            <TbBrandXFilled className="hidden md:block size-7" />
            <TbBrandAngularFilled className="hidden md:block size-7" />
            <TbBrandGoogleFilled className="hidden md:block size-7" />
            <TbBrandNetflix className="hidden md:block size-7 fill-black" />
            <TbBrandDribbbleFilled className="hidden md:block size-7 fill-black" />
            <TbBrandGitlab className="hidden md:block size-7 fill-black" />
            <TbBrandFlutter className="hidden md:block size-7 fill-black" />
            <TbBrandFigma className="hidden md:block size-7 fill-black" />
            <TbBrandEnvato className="hidden md:block size-7 fill-black" />
            <TbBrandPatreonFilled className="hidden md:block size-7" />
            <TbBrandSwift className="hidden md:block size-7 fill-black" />
            <TbBrandTumblrFilled className="hidden md:block size-7" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        <div className="bg-purple-400 border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base">
            O Slack revolucionou a forma como nossa equipe de DevOps se comunica. As integrações com GitHub e Jenkins tornaram os processos mais ágeis e transparentes. Não é só um chat — é nossa central de operações.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <div className="grayscale-100">
              <Image
                width={80}
                height={80}
                className="size-12 rounded-full border-2 border-dashed border-black"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="User image"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-medium">
                Richard Nelson
                <VerifiedIcon width="15" height="15" fill="#000" />
              </div>
              <p className="m-0 leading-3">CTO</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-300 border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base">
            Como startup, precisamos de velocidade, organização e estabilidade. O Slack nos deu exatamente isso. Com canais bem definidos, conseguimos manter todos alinhados, mesmo trabalhando de forma remota.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <div className="grayscale-100">
              <Image
                width={80}
                height={80}
                className="size-12 rounded-full border-2 border-dashed border-black"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="User image"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-medium">
                Ava Johnson
                <VerifiedIcon width="15" height="15" fill="#000" /> 
              </div>
              <p className="m-0 leading-3">Product Manager</p>
              </div>
          </div>
        </div>
        <div className="bg-purple-400 border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base">
            Usamos o Slack para promover uma cultura mais conectada e colaborativa entre os colaboradores. Os canais de reconhecimento e bate-papo informal fizeram toda a diferença no engajamento da equipe, todas as perguntas são respondidas pela IA.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <div className="grayscale-100">
              <Image
                width={80}
                height={80}
                className="size-12 rounded-full border-2 border-dashed border-black"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
                alt="User image"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-medium">
                Liam Carter
                <VerifiedIcon width="15" height="15" fill="#000" />
              </div>
              <p className="m-0 leading-3">Human Resources</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-300 border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base">
            Com o Slack, conseguimos centralizar todas as conversas por projeto em um só lugar. Isso diminuiu retrabalho e facilitou muito a gestão de tarefas e deadlines, toda a equipe está integrada, organizada e adaptada.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <div className="grayscale-100">
              <Image
                width={80}
                height={80}
                className="size-12 rounded-full border-2 border-dashed border-black"
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60"
                alt="User image"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-medium">
                Hernan Vidal
                <VerifiedIcon width="15" height="15" fill="#000" />
              </div>
              <p className="m-0 leading-3">Engineering Lead</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-400 border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base">
            O Slack foi essencial para manter a produtividade da equipe durante a transição para o modelo híbrido. Mesmo com parte do time no escritório e parte em home office, a comunicação flui de forma natural e integrada.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <div className="grayscale-100">
              <Image
                width={80}
                height={80}
                className="size-12 rounded-full border-2 border-dashed border-black"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop"
                alt="User image"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-medium">
                Nanda Patel
                <VerifiedIcon width="15" height="15" fill="#000" />
              </div>
              <p className="m-0 leading-3">Scrum Master</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-300 border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
          <p className="text-base">
            Usamos o Slack na nossa pós-graduação e foi incrível. Criamos canais por disciplina, trocamos materiais, fizemos calls e até formamos grupos de estudo. É uma sala de aula digital — só que mais prática.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <div className="grayscale-100">
              <Image
                width={80}
                height={80}
                className="size-12 rounded-full border-2 border-dashed border-black"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png"
                alt="User image"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-medium">
                Oliver Brooks
                <VerifiedIcon width="15" height="15" fill="#000" />
              </div>
              <p className="m-0 leading-3">Marketing Director</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
