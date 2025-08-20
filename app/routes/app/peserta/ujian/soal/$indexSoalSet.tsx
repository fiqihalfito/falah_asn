import { ScrollArea } from "~/components/ui/scroll-area";
import type { Route } from "./+types/$indexSoalSet";
import DisplaySoal from "~/components/ujian/display-ujian";
import SidebarUjian from "~/components/ujian/sidebar";
import { useOutletContext } from "react-router";
import type { SoalOutletContextType } from "../$sesiUjianId";
import type { JawabanSetClient } from "~/lib/constants/soal";

// Client Loader akan mengubah Component Route menjadi Client Side Rendering
export async function clientLoader({ request, params, context }: Route.ClientLoaderArgs) {


    // nanti tambah pencegahan param idsoal dibawah 1 dan lebih dari 110 soal
    // getJawabanClient(params.sesiUjianId, )




    return {}
}

export async function clientAction({ params, request }: Route.ClientActionArgs) {
    // await new Promise((res) => setTimeout(res, 3000));
    const formData = await request.formData();
    const updateAnswer = String(formData.get("jawabanTerpilih"))
    const soalId = String(formData.get("soalId"))

    simpanJawabanClient(params.sesiUjianId, soalId, updateAnswer)


}


export default function IndexSoalSet({ matches, params }: Route.ComponentProps) {

    const { sesiUjianId, indexSoalSet } = params
    const { soalpack, soalSet } = useOutletContext<SoalOutletContextType>()



    const currectSoalId = soalSet[Number(indexSoalSet) - 1]
    const currectSoalUnit = soalpack.get(currectSoalId)
    const semuaJawabanClient = getSemuaJawabanClient(sesiUjianId)
    const currentJawabanClient = getJawabanClient(currectSoalId, semuaJawabanClient)
    // const currentJawaban = "o1"



    return (
        <div className="flex flex-row h-full">
            <ScrollArea className="flex-1">
                <DisplaySoal key={Number(indexSoalSet) + 1} sesiUjianId={sesiUjianId} soalUnit={currectSoalUnit!} noSoal={Number(indexSoalSet)} LSjawaban={currentJawabanClient} />
            </ScrollArea>
            <ScrollArea>
                <SidebarUjian noSoal={Number(params.indexSoalSet)} sesiUjianId={params.sesiUjianId} semuaJawabanClient={semuaJawabanClient} soalpack={soalpack} />
            </ScrollArea>
        </div>
    )
}



function simpanJawabanClient(sesiUjianId: string, soalId: string, jawaban: string) {

    const savedJawabanSet = localStorage.getItem(sesiUjianId)
    const jawabanSet = savedJawabanSet ? JSON.parse(savedJawabanSet) as JawabanSetClient[] : []

    const index = jawabanSet.findIndex((o) => o.sId === soalId)
    if (index >= 0) {
        jawabanSet[index] = {
            sId: soalId,
            j: jawaban
        }
    } else {
        jawabanSet.push({
            sId: soalId,
            j: jawaban
        })
    }

    localStorage.setItem(sesiUjianId, JSON.stringify(jawabanSet))
}

function getJawabanClient(soalId: string, semuaJawabanClient: JawabanSetClient[]) {
    // const jawabanSet = localStorage.getItem(sesiUjianId)
    // const parsedJawabanSet = jawabanSet ? JSON.parse(jawabanSet) as JawabanSetClient[] : []
    const jawaban = semuaJawabanClient.find((o) => o.sId === soalId)
    return jawaban?.j

}

function getSemuaJawabanClient(sesiUjianId: string) {
    const jawabanSet = localStorage.getItem(sesiUjianId)
    const parsedJawabanSet = jawabanSet ? JSON.parse(jawabanSet) as JawabanSetClient[] : []
    return parsedJawabanSet
}

