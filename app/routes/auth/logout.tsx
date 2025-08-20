import { destroySession } from "~/services/auth/auth.server";
import type { Route } from "./+types/logout";
import { redirect } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {

    const headers = await destroySession(request);
    return redirect("/auth/login", { headers });
}