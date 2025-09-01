
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Hospital, Home, CalendarPlus, FlaskConical, Users, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../auth-provider";
import { Button } from "../ui/button";

const menuItems = [
  { href: "/", label: "Início", icon: Home, admin: false },
  { href: "/agendamentos", label: "Agendamentos", icon: CalendarPlus, admin: false },
  { href: "/exames", label: "Exames", icon: FlaskConical, admin: false },
  { href: "/medicos", label: "Corpo Clínico", icon: Users, admin: false },
  { href: "/localizacao", label: "Localização", icon: MapPin, admin: false },
  { href: "/admin/aprovacoes", label: "Aprovações", icon: ShieldCheck, admin: true },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, userData } = useAuth();

  const visibleMenuItems = menuItems.filter(item => {
    if (!user) return false;
    if (item.admin) {
      return userData?.isAdmin;
    }
    return true;
  });

  return (
    <Sidebar>
       <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary">
             <Hospital className="h-6 w-6" />
          </Button>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <h2 className="font-semibold text-lg leading-tight">Alta</h2>
            <p className="text-xs text-muted-foreground">Centro Médico</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {visibleMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
