import { redirect } from 'react-router'
import { authenticator, saveSession } from '~/services/auth/auth.server'
import type { Route } from './+types/google-callback'

export async function loader({ request }: Route.LoaderArgs) {
    const user = await authenticator.authenticate('google', request)
    const headers = await saveSession(request, user)

    const role = user.role
    return redirect(`/app/${role}`, { headers })
}