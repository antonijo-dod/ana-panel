import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { LoginComponent } from './login'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: RootComponent,
    notFoundComponent: () => {
        return (
            <div>
                <p>This is the notFoundComponent configured on root route</p>
                <Link to="/">Start Over</Link>
            </div>
        )
    },
})

function RootComponent() {

    // For demo purposes, redirect to login page

    return (<LoginComponent />)

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full'>
                <SidebarTrigger />
                <Outlet />
            </main>
            <ReactQueryDevtools buttonPosition="top-right" />
            <TanStackRouterDevtools />
        </SidebarProvider>
    )
}