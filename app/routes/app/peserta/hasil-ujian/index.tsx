import { PageHeader } from "~/components/page-header";
import type { Route } from "./+types/index";
import { getListEventPernahTerlibat } from "~/services/hasil-ujian/hasil-ujian";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { getSessionUser } from "~/services/auth/auth.server";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = await getSessionUser(request)
    const listEvent = await getListEventPernahTerlibat(user?.email!)

    return { listEvent }
}

export default function HasilUjianRoute({ loaderData, matches }: Route.ComponentProps) {

    const { listEvent } = loaderData

    const title = "Hasil Ujian"
    const desc = "Berikut adalah hasil ujian"

    return (
        <div>
            <PageHeader title={title} desc={desc} />
            <div>
                {listEvent.map((sesiEvent, i) => (
                    <Card key={i} className="@container/card">
                        <CardHeader>
                            <CardTitle>{sesiEvent.event?.namaEvent}</CardTitle>
                            {/* <CardDescription>Card Description</CardDescription> */}
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        {/* <CardContent>
                            <p>Card Content</p>
                        </CardContent> */}
                        <CardFooter>
                            <Button asChild>
                                <Link to={`/app/peserta/hasil-ujian/${sesiEvent.eventId}`}>
                                    Lihat Nilai
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                {listEvent.length === 0 && (
                    <div> Anda belum melakukan ujian </div>
                )}
            </div>
        </div>
    )
}