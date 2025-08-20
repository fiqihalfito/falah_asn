import type { Route } from "./+types/index";

export async function loader({ request, params }: Route.LoaderArgs) {



    return {}
}

export default function DashboardPeserta({ }: Route.ComponentProps) {



    return (
        <div>
            <h1>Peserta dashboard</h1>
        </div>
    )
}