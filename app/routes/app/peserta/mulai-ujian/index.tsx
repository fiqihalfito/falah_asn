import { PageHeader } from "~/components/page-header"
import type { Route } from "./+types/index"
import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { getRunningEvent } from "~/services/ujian/ujian"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

export async function loader({ request, params }: Route.LoaderArgs) {

    const runningEvent = await getRunningEvent()

    return { runningEvent }
}

export default function MulaiUjianPage({ loaderData }: Route.ComponentProps) {

    const title = "Mulai Ujian"
    const desc = "Silahkan pilih ujian yang ingin diikuti"

    const { runningEvent } = loaderData

    return (
        <div>
            <PageHeader title={title} desc={desc} />
            <div>
                {runningEvent.map((event, i) => (
                    <Card key={i} className="@container/card">
                        <CardHeader>
                            <CardTitle>{event.namaEvent}</CardTitle>
                            {/* <CardDescription>Card Description</CardDescription> */}
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        {/* <CardContent>
                            <p>Card Content</p>
                        </CardContent> */}
                        <CardFooter>
                            <Button asChild>
                                <Link to={`/app/peserta/mulai-ujian/${event.eventId}/rule`}>
                                    Masuk
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

            </div>
        </div>
    )
}