import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Store,
  LayoutDashboard,
  BookOpen,
  Github,
  ArrowRight,
  Code2,
  Layers,
  Atom,
  Paintbrush,
  Component,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-full p-10 lg:px-20">
      <span className="text-4xl font-bold">MG Psicología</span>
    </div>
  )
}
