import { hitungSkorUjian, submitUjian } from "~/services/ujian/ujian";
import type { Route } from "./+types/submit";
import { redirect } from "react-router";
import type { JawabanSetClient } from "~/lib/constants/soal";
import { saveHasilUjian } from "~/services/hasil-ujian/hasil-ujian";
import { getSessionUser } from "~/services/auth/auth.server";

export async function action({ request, params }: Route.ActionArgs) {

    const user = await getSessionUser(request)
    const formData = await request.formData()
    const jawabanSet = String(formData.get("jawabanSet"))

    try {
        const sesiUjianData = await submitUjian(params.sesiUjianId, jawabanSet)
        const parsedjawabanSet = jawabanSet ? JSON.parse(jawabanSet) as JawabanSetClient[] : []
        const soalSet = sesiUjianData[0].soalSet ? JSON.parse(sesiUjianData[0].soalSet) as string[] : []

        const skorUjian = await hitungSkorUjian(parsedjawabanSet, soalSet)

        await saveHasilUjian(user?.email!, sesiUjianData[0].eventId!, params.sesiUjianId, skorUjian)
        // return redirect(`/app/ujian/selesai/${params.sesiUjianId}`)
        return { success: true }
    } catch (error) {
        // throw new Error("Submit Jawaban Error, harap hubungi admin", { cause: error })
        return { success: false, error: error }
    }

}