import { LoginForm } from "~/components/login-form";
import type { Route } from "./+types/login";
import { GalleryVerticalEndIcon } from "lucide-react";
import { getSessionUser } from "~/services/auth/auth.server";
import { Link, redirect } from "react-router";



export async function action({ request, context }: Route.ActionArgs) {
    // TODO: implement action logic
}

export async function loader({ context, request }: Route.LoaderArgs) {

    const user = await getSessionUser(request)

    if (user) {
        return redirect(`/app/${user.role}`)
    }

    return null
}

export default function LoginPage({ actionData, loaderData }: Route.ComponentProps) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEndIcon className="size-4" />
                        </div>
                        Falah ASN.
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src="/login3.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
