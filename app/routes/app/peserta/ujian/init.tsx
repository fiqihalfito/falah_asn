import { redirect } from "react-router";
import type { Route } from "./+types/init";
import { hasCurrentEventDone, initSesiUjian } from "~/services/ujian/ujian";
import { getSessionUser } from "~/services/auth/auth.server";
import { getRandomizedSoalSetIds } from "~/services/soal/soal";

export async function loader({ request, params }: Route.LoaderArgs) {

    const user = await getSessionUser(request)
    // make a random string

    const isUserJoinThisEvent = await hasCurrentEventDone(user?.email!, params.eventId)
    if (isUserJoinThisEvent) {
        const referer = request.headers.get("Referer") ?? "/";
        const redirectUrl = new URL(referer);
        redirectUrl.searchParams.set("isUserJoinThisEvent", "true");
        return redirect(redirectUrl.toString())
    }

    const soalSet = await getRandomizedSoalSetIds()
    const stringifiedSoalSet = JSON.stringify(soalSet)
    const sesiUjianId = await initSesiUjian(params.eventId, user?.email!, stringifiedSoalSet);
    return redirect(`/app/ujian/sesi/${sesiUjianId}/soal/1`)
}
