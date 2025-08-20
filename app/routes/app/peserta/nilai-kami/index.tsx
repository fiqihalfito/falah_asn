import { PageHeader } from "~/components/page-header"
import type { Route } from "./+types/index"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"

export async function loader({ request, params }: Route.LoaderArgs) {



    return {}
}

export default function NilaiKamiRoute({ }: Route.ComponentProps) {

    const title = "Nilai Kami"
    const desc = "Semoga penilaian anda dapat meningkatkan website ini bagi banyak orang"

    return (
        <div>
            <PageHeader title={title} desc={desc} />
            <div>
                <Link to={"https://forms.gle/tv6YiDpcii77ipc68"} target="_blank">
                    <Button size={"lg"} className="cursor-pointer bg-green-600 hover:bg-green-700">
                        Nilai Kami 🙏
                    </Button>
                </Link>
            </div>
        </div>
    )
}