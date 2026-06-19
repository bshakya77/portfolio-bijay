import { Header } from '@/app/components/header'
import { HeroSection } from '@/app/components/hero-section'
import { AboutSection } from '@/app/components/about-section'
import { ExperienceSection } from '@/app/components/experience-section'
import { EducationSection } from '@/app/components/education-section'
import { ProjectsSection } from '@/app/components/projects-section'
import { SkillsSection } from '@/app/components/skills-section'
import { CertificationsSection } from '@/app/components/certifications-section'
import { ContactSection } from '@/app/components/contact-section'
import { Footer } from '@/app/components/footer'
import { ScrollToTop } from '@/app/components/scroll-to-top'

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
