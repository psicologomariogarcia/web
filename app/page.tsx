import Link from "next/link"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NewsletterForm } from "@/components/newsletter-form"
import { SiteFooter } from "@/components/site-footer"
import {
  Heart,
  GraduationCap,
  BookOpen,
  Brain,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* Hero Section - Split Layout */}
      <section className="relative w-full py-16 md:py-24 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit border">
                Psicólogo y divulgador
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
                Mario García
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary/80">
                PSICOTERAPIA Y DIVULGACIÓN
              </h2>
              <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>
                  ¿Por qué hacemos lo que hacemos? ¿Por qué sentimos lo que
                  sentimos?
                </p>
                <p>
                  ¿Qué sabemos acerca de la naturaleza humana? ¿Qué funciona y
                  qué no funciona si hablamos de un bienestar sostenible?
                </p>
                <p>¿Qué hace que la psicoterapia funcione?</p>
              </div>
              <p className="text-base md:text-lg font-medium text-foreground">
                Mi compromiso es divulgar y ejercer mi profesión desde el rigor
                que requiere esta hermosa disciplina.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link href="/contacto">Contáctame</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base border"
                >
                  <Link href="/blog">Leer blog</Link>
                </Button>
              </div>
            </div>
            {/* Right: Image */}
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src="/assets/divan.png"
                  alt="Mario García - Psicólogo y divulgador"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Topics Section - Light Background */}
      <section className="w-full py-16 md:py-20 px-6 sm:px-8 lg:px-12 bg-muted border-y border-border">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center max-w-4xl mx-auto">
            Puedo ayudarte en áreas de Psicoterapia y Psicología. A continuación
            se enumeran solo algunos de los temas en los que podemos trabajar.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold">Ansiedad</h3>
              <p className="text-muted-foreground">
                Estrategias para manejar y superar la ansiedad en diferentes
                contextos de la vida.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold">Fobias</h3>
              <p className="text-muted-foreground">
                Técnicas especializadas para enfrentar y superar fobias
                específicas.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold">Adicciones</h3>
              <p className="text-muted-foreground">
                Apoyo profesional en el proceso de recuperación y prevención de
                recaídas.
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button className="p-2 rounded-md border border-border hover:bg-accent transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-md border border-border hover:bg-accent transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* My Services Section - Image Left, Text Right */}
      <section className="w-full py-16 md:py-24 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-md overflow-hidden order-2 md:order-1">
              <Image
                src="/assets/mario.png"
                alt="Mario García trabajando"
                fill
                className="object-cover"
              />
            </div>
            {/* Right: Services List */}
            <div className="space-y-8 order-1 md:order-2">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Mis servicios
                </h2>
                <p className="text-lg text-muted-foreground">
                  Ofrezco servicios profesionales diseñados para apoyar tu
                  bienestar emocional y crecimiento personal, siempre desde el
                  rigor que requiere esta disciplina.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-1">
                      Psicoterapia
                    </h3>
                    <p className="text-muted-foreground">
                      Sesiones individuales personalizadas para abordar tus
                      necesidades específicas y acompañarte en tu proceso de
                      crecimiento personal.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-1">
                      Supervisión
                    </h3>
                    <p className="text-muted-foreground">
                      Acompañamiento profesional para psicólogos en formación y
                      práctica clínica, compartiendo conocimiento y experiencia.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-1">
                      Divulgación
                    </h3>
                    <p className="text-muted-foreground">
                      Newsletter y contenido educativo para comprender mejor la
                      psicología y el bienestar emocional, escapando de los
                      algoritmos de las redes sociales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="w-full py-16 md:py-24 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit border">
                <Sparkles className="h-3 w-3 mr-2" />
                Mi compromiso
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Rigor y divulgación en psicología
              </h2>
              <p className="text-lg text-muted-foreground">
                Mi trabajo se basa en el rigor científico y la experiencia
                clínica, combinando la práctica profesional con la divulgación
                accesible para todos.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Enfoque basado en evidencia científica y experiencia clínica
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Divulgación accesible que escapa de los algoritmos de redes
                    sociales
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Compromiso con el rigor que requiere esta hermosa disciplina
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Acompañamiento personalizado en tu proceso de crecimiento
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-md bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20 p-8 border border-primary/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md bg-primary/20 flex items-center justify-center border border-primary/20">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        Psicoterapia personalizada
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sesiones adaptadas a tus necesidades específicas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md bg-primary/20 flex items-center justify-center border border-primary/20">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Divulgación cercana</p>
                      <p className="text-sm text-muted-foreground">
                        Newsletter y contenido educativo accesible
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md bg-primary/20 flex items-center justify-center border border-primary/20">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Supervisión profesional</p>
                      <p className="text-sm text-muted-foreground">
                        Acompañamiento para psicólogos en formación
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 md:py-24 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            ¿Quieres conocerme mejor?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estoy aquí para acompañarte en tu proceso. Puedes contactarme para
            consultas sobre psicoterapia, supervisión o simplemente para
            conocerme mejor.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:psicologomariogarcia@gmail.com"
              className="flex items-center gap-2 text-lg hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              psicologomariogarcia@gmail.com
            </a>
            <a
              href="tel:690377563"
              className="flex items-center gap-2 text-lg hover:text-primary transition-colors"
            >
              <Phone className="h-5 w-5" />
              690 37 75 63
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="text-base">
              <Link href="/contacto">
                Contactar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base border"
            >
              <Link href="/blog">Leer artículos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 md:py-20 px-6 sm:px-8 lg:px-12 bg-muted/30">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Divulgación en mi newsletter
          </h2>
          <p className="text-muted-foreground">
            Tengo una newsletter en la que mando de vez en cuando ampliaciones
            de lo que cuento por redes sociales. Es algo más cercano. Me permite
            estar en contacto directo con la gente y escapar de los terribles
            algoritmos de las redes sociales. Es gratuita, puedes suscribirte y
            borrarte cuando quieras. ¡Espero verte dentro!
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
