import Link from "next/link"
import {
  Calendar,
  Store,
  BookOpen,
  Home,
  LayoutDashboard,
  Settings,
  Link as LinkIcon,
  Brain,
  GraduationCap,
} from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ThemeSelector } from "./theme-selector"
import { ModeToggle } from "./mode-toggle"

// Menu items - reusing the same items from the sidebar
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: BookOpen,
  },
  {
    title: "Servicios",
    url: "/servicios",
    icon: Store,
  },
  {
    title: "Recursos",
    url: "/recursos",
    icon: Brain,
  },
  {
    title: "Academia online",
    url: "/academia-online",
    icon: BookOpen,
  },
  {
    title: "Panel interno (mínimo)",
    url: "/panel-interno-minimo",
    icon: BookOpen,
  }
  
]

export function SiteNavbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-10 flex h-14 justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList>
            {items.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.url} passHref>
                    <span className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          {/* <ThemeSelector /> */}
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
