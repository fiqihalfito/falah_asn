import { getSessionUser } from "~/services/auth/auth.server";
import type { Route } from "./+types/index";
import { Outlet, redirect } from "react-router";



export async function loader({ request }: Route.LoaderArgs) {

    const user = await getSessionUser(request)

    if (!user) {
        return redirect("/auth/login")
    }

    const url = new URL(request.url);
    if (url.pathname === "/app" || url.pathname === "/app/") {
        return redirect(`/app/${user.role}`);
    }

    return { user }
}

// just for master outlet
export default function AppOutlet({ }: Route.ComponentProps) {

    return (
        <Outlet />
    )
}