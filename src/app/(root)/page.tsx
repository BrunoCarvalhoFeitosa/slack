import { Header } from "@/components/root/header"
import { HeroSection } from "@/components/root/sections/hero-section"
import { AboutSection } from "@/components/root/sections/about-section"
import { TestimonialSection } from "@/components/root/sections/testimonial-section"
import { CallToActionSection } from "@/components/root/sections/call-to-action-section"
import { Footer } from "@/components/root/footer"

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <TestimonialSection />
      <CallToActionSection />
      <Footer />
    </div>
  )
}

export default HomePage
