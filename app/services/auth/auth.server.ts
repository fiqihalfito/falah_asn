// app/services/auth.server.ts
import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from '@coji/remix-auth-google'
import { createCookieSessionStorage } from 'react-router'
import { addUser, getUserByEmail } from '../user/user'
import type { user } from 'database/schema'
import { request } from 'http'


export type SessionUser = typeof user.$inferSelect

let SESSION_KEY = 'user'
export const sessionStorage = createCookieSessionStorage<{
    [SESSION_KEY]: SessionUser
}>({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === 'production',
    },
})

export const getSession = async (request: Request) => {
    return await sessionStorage.getSession(request.headers.get('Cookie'))
}

export const getSessionUser = async (request: Request) => {
    const session = await getSession(request)
    return session?.get(SESSION_KEY)
}

export const saveSession = async (request: Request, user: SessionUser) => {
    const session = await getSession(request)
    session.set(SESSION_KEY, user)
    return new Headers({
        'Set-Cookie': await sessionStorage.commitSession(session),
    })
}

export const destroySession = async (request: Request) => {
    let session = await getSession(request);
    return new Headers({
        'Set-Cookie': await sessionStorage.destroySession(session),
    })
}

const googleStrategy = new GoogleStrategy(
    {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // redirectUri digunakan untuk pencocokan callback antara ini dengan yang didaftarkan di Google Cloud Console
        redirectURI: process.env.REDIRECT_URL_GOOGLE_CALLBACK!,
    },
    async ({ tokens }) => {
        // Get the user data from your DB or API using the tokens and profile
        // this token is used to fetch user data once 1x, after that, user data is stored in the session
        const profile = await GoogleStrategy.userProfile(tokens)
        // selesai urusan dengan token

        // get user data from DB first
        try {

            const user = await getUserByEmail(profile.emails[0].value)

            // if user not found, create a new user
            if (user.length > 0) {
                return user[0]
            }

            const displayName = profile.displayName || profile.emails[0].value
            const email = profile.emails[0].value
            const role = "peserta"

            const newUser = await addUser({
                email: email,
                name: displayName,
                role: role
            })

            return newUser[0]
        } catch (error) {
            throw new Error("Auth Gagal connect ke database")
        }




    }
)

export const authenticator = new Authenticator<SessionUser>()
authenticator.use(googleStrategy)