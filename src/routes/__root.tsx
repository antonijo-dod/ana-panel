import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


const RootLayout = () => (
    <SidebarProvider>
        <AppSidebar />
        <main>
            <SidebarTrigger />
            <Outlet />
        </main>
        <TanStackRouterDevtools />
    </SidebarProvider>
)

export const Route = createRootRoute({ component: RootLayout })