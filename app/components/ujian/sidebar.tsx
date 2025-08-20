import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router";
import type { JawabanSetClient, SoalUnitPartial } from "~/lib/constants/soal";
import { CheckCircle2Icon } from "lucide-react";


export interface SidebarUjianProp {
    noSoal: number,
    sesiUjianId: string,
    semuaJawabanClient: JawabanSetClient[],
    soalpack: Map<string, SoalUnitPartial>
}

export default function SidebarUjian({ noSoal, sesiUjianId, semuaJawabanClient, soalpack }: SidebarUjianProp) {

    const answeredSet = new Set(semuaJawabanClient.map(a => a.sId));



    return (
        <div className="bg-white border-l flex flex-col px-8 pb-20">

            <h1 className="text-xl font-medium my-8">Pertanyaan</h1>
            <div className="grid grid-cols-5 gap-4 ">
                {Array.from(soalpack, ([soalId, soalUnit], i) => {

                    const sudahDijawab = answeredSet.has(soalId);

                    return (
                        <NavLink key={i} to={`/app/ujian/sesi/${sesiUjianId}/soal/${i + 1}`}>
                            <Button className={cn("size-12 cursor-pointer border hover:bg-emerald-600 hover:text-white relative",
                                noSoal === (i + 1) && "bg-blue-600 text-white")}
                                variant={"secondary"}>
                                {/* centang jika sudah diisi */}
                                {sudahDijawab && (
                                    <CheckCircle2Icon className="absolute -top-1.5 -right-1.5 h-5 w-5 fill-green-500 text-white" />
                                )}

                                {i + 1}
                            </Button>
                        </NavLink>
                    )

                })}
            </div>

        </div>
    )
}