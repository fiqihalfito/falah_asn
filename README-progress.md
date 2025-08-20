# Falah ASN V2 - Recent Edits

## Google Auth Strategy

https://github.com/sergiodxa/remix-auth/discussions/111
https://github.com/coji/remix-auth-google

don't forget install this too:\
`npm i -D remix-auth-oauth2`

-   first create a web application in Google Cloud Console
-   get the client ID and secret
-   [documentation to console](https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred)
    -   client ID : 653363395413-4egkmc4dtc30tbstnvstaiq1nb7bspse.apps.googleusercontent.com
    -   client secret : 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
-   setup /services/auth/auth.server.ts
-   generate SESSION_SECRET di .env untuk auth.server.ts
-   set GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET di .env
-   set REDIRECT_URL_GOOGLE_CALLBACK untuk cek antara yang disini dan redirect callback yang terdaftar di Google Cloud Console
-   setup routes

## Setup Drizzle ORM and Database

view this url if error:\
https://www.answeroverflow.com/m/1204982079402807426

## CLoudflare Workers

jika ada error \
`Dynamic require of "events" is not supported`
atau semacamnya, tambahkan di wrangler.jsonc\
`"compatibility_flags": ["nodejs_compat"]`

## Mode Production Local

berikut script package.json untuk menjalankan mode production local:

```ts
"scripts": {
        "build": "react-router build",
        "dev": "react-router dev",
        "start:local": "dotenv -e .env -e .env.production -o -- react-router-serve ./build/server/index.js",
        "start": "react-router-serve ./build/server/index.js",
        "typecheck": "react-router typegen && tsc"
    }
```

`"start:local": "dotenv -e .env -e .env.production -o -- react-router-serve ./build/server/index.js",`

-   `dotenv` : library dotenv-cli untuk mengambil nilai dari .env apapun selama dilokal, kalau di tempat hosting tidak perlu. set .env di tempat hosting
-   `-e [file .env]` : -e untuk mengarahkan file .env mana yang dipakai
-   `-o` : karena ada multiple file .env, maka minta override kalau ada key yang sama.
-   `--` : untuk memisahkan perintah yang berbeda biar ga disangka parameter dari perintahnya dotenv.

## Logout Auth

di file auth.server.ts, seperti halnya saveSession yang outputnya berupa Header, maka kita buat fungsi destroySession yang juga outputnya berupa Header untuk destroy session. Perbarui filenya dari repo coji.

`https://github.com/coji/remix-auth-google`

berikut tambahan kode destroy sessionnya di auth.server.ts:

```typescript
// app/services/auth/auth.server.ts
export const destroySession = async (request: Request) => {
    let session = await getSession(request)
    return new Headers({
        "Set-Cookie": await sessionStorage.destroySession(session),
    })
}
```

```typescript
// app/routes/auth/logout.tsx
import {
    destroySession,
    getSession,
    sessionStorage,
} from "~/services/auth/auth.server"
import type { Route } from "./+types/logout"
import { redirect } from "react-router"

export async function loader({ request, params }: Route.LoaderArgs) {
    const headers = await destroySession(request)
    return redirect("/auth/login", { headers })
}
```

## Routing React Router v7

untuk kepentingan routing seperti Layout, Route, Prefix, Index. Semua component filenya wajib pakai `export default`\
kalau tidak pakai, maka routingnya tidak terbaca.

## Data Loading React Router v7

Untuk url misalnya :\
`/ujian/:sesiUjianId/soal/:soalId` \
maka parent route tidak akan rerender, hanya route dengan segment berubah bakal rerender misalnya :soalId. Kalau :sesiUjianIdnya berubah maka akan rerender juga.\

simplenya gini, kalau url segmentnya tetap maka tidak akan refetch, kalau segment berubah maka segment itu akan panggil loader lagi

> There are three cases where Remix will reload all of your routes:
>
> -   After an action (forms, useSubmit, fetcher.submit)
> -   If the url search params change (any loader could use them)
> -   The user clicks a link to the exact same URL they are already at (this will also replace the current entry in the history stack)

file route dengan tanda $[filename], tidak ada pengaruh apa apa. itu dari pribadi ingin menandakan kalau route itu ada loader dan butuh dynamic param.

## Optimal pencarian Array pakai Map

🔍 Singkatnya:

```ts
new Map([
  [key1, value1],
  [key2, value2],
  ...
]);
```

Sama seperti:

```ts
const m = new Map()
m.set(key1, value1)
m.set(key2, value2)
// ...
```

## Client Rendering RR7

Menerapkan Client Loader akan mengubah Component Route menjadi Client Side Rendering
