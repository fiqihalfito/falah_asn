
import { AppSidebar } from "~/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar"
import { LogoutButton } from "~/components/logout-button"
import { Outlet, useMatches } from "react-router"
import type { SessionUser } from "~/services/auth/auth.server"
import type { Role } from "~/lib/constants/roles"


export default function SidebarHeadbarLayout() {



    // get role user from /app segment, using matches
    const matches = useMatches()
    // id /app segment is "routes/app/index"
    const appSegmentLoaderData = matches.find(match => match.id === "routes/app/index")?.loaderData as { user: SessionUser }
    const userData = appSegmentLoaderData.user
    const role = userData.role as Role


    return (
        <SidebarProvider>
            <AppSidebar role={role} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        {/* <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Applicationx
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb> */}
                    </div>
                    <LogoutButton />
                </header>
                {/* <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                    </div>
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div> */}
                <div className="flex flex-1 flex-col gap-4 p-8">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
