import { createFileRoute } from '@tanstack/react-router'
import { AboutUs } from '#/components/sections/AboutUs'
import { FinalCta } from '#/components/sections/FinalCta'
import { Footer } from '#/components/sections/Footer'
import { Header } from '#/components/sections/Header'
import { Hero } from '#/components/sections/Hero'
import { MissionVision } from '#/components/sections/MissionVision'
import { Services } from '#/components/sections/Services'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <AboutUs />
      <MissionVision />
      <FinalCta />
      <Footer />
    </main>
  )
}
