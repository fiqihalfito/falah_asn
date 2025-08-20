import type { Route } from "./+types/tes-loader";

export async function loader({ request, params }: Route.LoaderArgs) {

    console.log("server loader");

    return "output server loader"
}

export async function clientLoader({ request, params, serverLoader }: Route.ClientLoaderArgs) {

    console.log("client loader");
    const serverLoaderData = await serverLoader()

    // return "output client loader"
    return { serverLoaderData, client: "output client" }
}

export default function ComponentName({ loaderData }: Route.ComponentProps) {

    const data = loaderData
    console.log("component output", data);


    return (
        <div>
            <p>{JSON.stringify(data)}</p>
        </div>
    )
}