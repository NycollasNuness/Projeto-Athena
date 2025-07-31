import { Home, BarChart3, Settings, HelpCircle, BookOpen } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Tela inicial", url: "/", icon: Home },
  { title: "Revisar", url: "/revisar", icon: BookOpen },
  { title: "Estatísticas", url: "/estatisticas", icon: BarChart3 },
  { title: "Config.", url: "/configuracoes", icon: Settings },
  { title: "Ajuda", url: "/ajuda", icon: HelpCircle },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const isCollapsed = state === "collapsed"

  const getNavClasses = (isActive: boolean) =>
    isActive 
      ? "bg-study-peach text-study-peach-foreground font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar className="data-[state=collapsed]:w-0 data-[state=expanded]:w-64 transition-all duration-300 overflow-hidden" collapsible="icon">
      <SidebarContent className={`bg-background border-r border-border ${isCollapsed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground tracking-wider whitespace-nowrap">
            ATHENA
          </h1>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`w-full justify-start rounded-xl p-3 ${getNavClasses(isActive)}`}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm whitespace-nowrap">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom section with user info */}
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-study-cyan flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-study-cyan-foreground">U</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">Sair</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">Conta</span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}