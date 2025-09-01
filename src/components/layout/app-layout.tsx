
"use client";

import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AuthMenu } from "../auth-menu";
import { useAuth } from "../auth-provider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const publicRoutes = ["/login", "/cadastro"];

export function AppLayout({ children }: { children: ReactNode }) {
  const { user, loading, userData } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      return; 
    }

    const isPublicRoute = publicRoutes.includes(pathname);

    if (user) {
      // User is logged in
      if (userData) { // userData is loaded
        if (userData.status === 'pending' || userData.status === 'rejected') {
          router.replace("/login?error=pending_approval");
        } else if (isPublicRoute) {
          router.replace("/");
        }
      }
      // If userData is not yet loaded, the loading screen will show, which is correct.
    } else {
      // User is not logged in
      if (!isPublicRoute) {
        router.replace("/login");
      }
    }
  }, [user, userData, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user && userData?.status === 'approved') {
    return (
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
            <SidebarTrigger className="sm:group-data-[state=expanded]:-rotate-180" />
            <div className="w-full flex-1" />
            <AuthMenu />
          </header>
          <main className="flex-1 p-4 pt-0 sm:p-6 sm:pt-0">
            {children}
          </main>
        </div>
      </SidebarProvider>
    );
  }
  
  if (publicRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  // Fallback loader for edge cases (e.g., user is logged out, user status is pending/rejected)
  // This screen will be shown briefly before the useEffect redirects.
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
