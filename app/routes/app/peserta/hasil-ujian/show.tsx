import { PageHeader } from "~/components/page-header";
import type { Route } from "./+types/show";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { getHasilUjian } from "~/services/hasil-ujian/hasil-ujian";
import { AMBANG_BATAS } from "~/lib/constants/soal";
import { Badge } from "~/components/ui/badge";

export async function loader({ request, params }: Route.LoaderArgs) {

    const listNilai = await getHasilUjian(params.eventId)

    const newListNilai = groupNilaiByUser(listNilai)

    return { newListNilai }
}

export default function ShowHasilUjianRoute({ loaderData }: Route.ComponentProps) {

    const title = "Hasil Ujian"
    const desc = "ranking"
    const { newListNilai } = loaderData

    return (
        <div>
            <PageHeader title={title} desc={desc} />
            <div>
                {newListNilai.length === 0 ? (
                    <div className="text-center">Belum ada peserta</div>
                ) : (
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">#</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead className="text-center">TWK</TableHead>
                                <TableHead className="text-center">TIU</TableHead>
                                <TableHead className="text-center">TKP</TableHead>
                                {/* <TableHead>Total</TableHead> */}
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {newListNilai.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className=" font-medium">{i + 1}</TableCell>
                                    {/* <TableCell className="font-medium">INV001</TableCell> */}
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell className="text-center">{row.skor["twk"]}</TableCell>
                                    <TableCell className="text-center">{row.skor["tiu"]}</TableCell>
                                    <TableCell className="text-center">{row.skor["tkp"]}</TableCell>
                                    <TableCell className="text-right">
                                        {cekKelulusan(row.skor) ? (
                                            <Badge className="bg-green-600 rounded-full">
                                                Lulus
                                            </Badge>
                                        ) : (
                                            <Badge variant={"destructive"} className="rounded-full">
                                                Belum lulus
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                )}

            </div>
        </div>
    )
}

function groupNilaiByUser(listNilai: Awaited<ReturnType<typeof getHasilUjian>>) {
    const hasil: Record<string, {
        eventId: string;
        sesiUjianId: string;
        email: string;
        name: string | null;
        waktuSelesai: string | null;
        skor: Record<string, number>;
    }> = {};

    for (const row of listNilai) {
        if (!hasil[row.sesiUjianId]) {
            hasil[row.sesiUjianId] = {
                eventId: row.eventId,
                sesiUjianId: row.sesiUjianId,
                email: row.email,
                name: row.user.name,
                waktuSelesai: row.waktuSelesai,
                skor: {}
            };
        }
        hasil[row.sesiUjianId].skor[row.tipe] = row.skor;
    }

    return Object.values(hasil);
}

function cekKelulusan(skor: Record<string, number>): boolean {
    return Object.entries(AMBANG_BATAS).every(([tipe, batasNilai]) => {
        return (skor[tipe] ?? 0) >= batasNilai;
    });
}