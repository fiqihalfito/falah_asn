// import { getSessionUser } from "~/services/auth/auth.server";
import type { Route } from "./+types/$sesiUjianId";
import { getSesiUjian } from "~/services/ujian/ujian";
import { data, Outlet, type ShouldRevalidateFunctionArgs } from "react-router";
import { UjianHeader } from "~/components/ujian/header";
import { getSoalBySoalSetIds } from "~/services/soal/soal";
import type { SoalUnitPartial } from "~/lib/constants/soal";
import { CircleFadingArrowUpIcon } from "lucide-react";
import { getSessionUser } from "~/services/auth/auth.server";

export function shouldRevalidate(
    arg: ShouldRevalidateFunctionArgs,
) {
    return arg.currentParams.sesiUjianId !== arg.nextParams.sesiUjianId
}

export async function loader({ request, params }: Route.LoaderArgs) {

    const user = await getSessionUser(request)

    const sesiUjian = await getSesiUjian(params.sesiUjianId)
    if (sesiUjian.length === 0) {
        throw data("anda belum memilih sesi ujian, silahkan daftar", { status: 404 })
    }

    const soalSet: string[] = JSON.parse(sesiUjian[0].soalSet)
    const soalpack = await getSoalBySoalSetIds(soalSet)

    return { sesiUjian, soalpack, soalSet, user }
}


export type SoalOutletContextType = {
    soalpack: Map<string, SoalUnitPartial>,
    soalSet: string[]
}

export default function SesiUjianRoute({ loaderData }: Route.ComponentProps) {

    const { sesiUjian, soalpack, soalSet, user } = loaderData

    // pakai map karena query Where In Array khawatir bakal random urutannya
    const soalPackMap = new Map(soalpack.map(soalUnit => [soalUnit.soalId, soalUnit]))



    return (
        <div className="bg-neutral-200/25 flex flex-col h-screen relative">
            <UjianHeader sesiUjianId={sesiUjian[0].sesiUjianId} startTime={new Date(sesiUjian[0].startTime)} namaPeserta={user?.name} />
            <div className="flex-1 overflow-auto">
                <Outlet context={{
                    soalpack: soalPackMap,
                    soalSet: soalSet,
                } satisfies SoalOutletContextType} />
            </div>
        </div>

    )
}

