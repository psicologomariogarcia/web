"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Facebook, Instagram } from "lucide-react"

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email subscription here
    console.log("Subscribed:", email)
    setEmail("")
    setPrivacyAccepted(false)
  }

  const featuredPages = [
    { name: "Inicio", href: "/" },
    { name: "Quién soy", href: "/quien-soy" },
    { name: "Psicoterapia", href: "/psicoterapia" },
    { name: "Mindfulness", href: "/mindfulness" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
    { name: "Cursos", href: "/cursos" },
  ]

  return (
    <footer className="w-full">
      {/* Main Footer Section - Dark Blue Background */}
      <div className="w-full bg-primary text-primary-foreground py-12 md:py-16 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column - Personal Branding & Newsletter */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  MARIO GARCÍA
                </h3>
                <p className="text-primary-foreground/90">
                  Psicología y Autoconocimiento.
                </p>
              </div>
              <div className="space-y-4">
                <p className="font-semibold text-lg">
                  ¡SUSCRÍBETE A LA NEWSLETTER!
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="E-mail*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white text-foreground placeholder:text-muted-foreground"
                  />
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      required
                      className="mt-1 h-4 w-4"
                    />
                    <label
                      htmlFor="privacy"
                      className="text-sm text-primary-foreground/90"
                    >
                      He leído, entiendo y acepto la política de privacidad
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Enviar
                  </Button>
                </form>
              </div>
            </div>

            {/* Middle Column - Featured Pages */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold">
                PÁGINAS DESTACADAS
              </h3>
              <ul className="space-y-2">
                {featuredPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Contact */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold">CONTACTO</h3>
              <div className="space-y-2 text-primary-foreground/90">
                <div className="flex items-start gap-2">
                  <span>-</span>
                  <div>
                    <span>Correo: </span>
                    <a
                      href="mailto:psicologomariogarcia@gmail.com"
                      className="hover:text-primary-foreground transition-colors"
                    >
                      psicologomariogarcia@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span>-</span>
                  <div>
                    <span>Tlf: </span>
                    <a
                      href="tel:690377563"
                      className="hover:text-primary-foreground transition-colors"
                    >
                      690 37 75 63
                    </a>
                    <span className="text-sm"> (llamada o Whatsapp)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section - Black Background */}
      <div className="w-full bg-black text-white py-4 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left Side - Copyright & Legal Links */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm">
              <span>© 2025 - Psicólogo Mario García</span>
              <div className="flex items-center gap-2">
                <span className="hidden md:inline">|</span>
                <Link
                  href="/aviso-legal"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Aviso legal
                </Link>
                <span>|</span>
                <Link
                  href="/politica-privacidad"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Política de Privacidad
                </Link>
                <span>|</span>
                <Link
                  href="/politica-cookies"
                  className="hover:text-primary-foreground/80 transition-colors"
                >
                  Política de Cookies
                </Link>
              </div>
            </div>

            {/* Right Side - Social Media Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
