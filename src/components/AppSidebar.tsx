import { Home, BarChart3, Settings, HelpCircle, BookOpen, User } from "lucide-react"
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

        {/* Bottom section with account link */}
        <div className="mt-auto p-4 border-t border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                className={`w-full justify-start rounded-xl p-3 ${getNavClasses(location.pathname === '/conta')}`}
              >
                <NavLink to="/conta" className="flex items-center gap-3">
                  <User className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm whitespace-nowrap">Conta</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}