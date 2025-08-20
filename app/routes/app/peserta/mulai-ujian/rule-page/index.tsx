import { PageHeader } from "~/components/page-header";
import type { Route } from "./+types/index";
import { Button } from "~/components/ui/button";
import { Link, useSearchParams } from "react-router";
import { Badge } from "~/components/ui/badge";
import { AlertTriangleIcon, ClockIcon, FileTextIcon, LaptopIcon, LockIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function RulePage({ params }: Route.ComponentProps) {

    const title = "Panduan Pelaksanaan Simulasi Seleksi Kompetensi Dasar (SKD) CPNS"
    const desc = "Bacalah dengan teliti sebelum memulai ujian"

    const [searchParams] = useSearchParams();
    const isUserJoinThisEvent = Boolean(searchParams.get("isUserJoinThisEvent"))

    return (
        <div>
            <PageHeader title={title} desc={desc} />
            <div className="flex flex-col gap-y-4 w-2/3 mx-auto">

                {/* Main Rules Card */}
                <Card className="mb-8 shadow-lg border-2 bg-white">
                    {/* <CardHeader className="bg-slate-800 text-white rounded-t-lg">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <FileTextIcon className="h-6 w-6" />
                            Aturan Utama Pelaksanaan Ujian
                        </CardTitle>
                        <CardDescription className="text-slate-200">
                            Ketentuan yang wajib dipatuhi selama pelaksanaan ujian SKD
                        </CardDescription>
                    </CardHeader> */}
                    <CardContent className="p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Duration */}
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                                <div className="bg-blue-500 p-2 rounded-full">
                                    <ClockIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-1">Durasi Tes</h3>
                                    <p className="text-slate-600">
                                        Waktu pengerjaan tes adalah <span className="font-bold text-blue-600">100 menit</span>
                                    </p>
                                </div>
                            </div>

                            {/* Number of Questions */}
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
                                <div className="bg-green-500 p-2 rounded-full">
                                    <FileTextIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-1">Jumlah Soal</h3>
                                    <p className="text-slate-600">
                                        Total soal yang harus dikerjakan adalah <span className="font-bold text-green-600">110 butir</span>
                                    </p>
                                </div>
                            </div>

                            {/* Device Requirements */}
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 border border-purple-200">
                                <div className="bg-purple-500 p-2 rounded-full">
                                    <LaptopIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-1">Perangkat Ujian</h3>
                                    <p className="text-slate-600">
                                        Pelaksanaan ujian hanya dapat dilakukan di{" "}
                                        <span className="font-bold text-purple-600">Laptop atau Komputer Desktop</span> menggunakan peramban
                                        yang telah ditentukan
                                    </p>
                                </div>
                            </div>

                            {/* Restrictions */}
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
                                <div className="bg-red-500 p-2 rounded-full">
                                    <LockIcon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-1">Larangan Berpindah</h3>
                                    <p className="text-slate-600">
                                        Selama ujian berlangsung, peserta{" "}
                                        <span className="font-bold text-red-600">dilarang mengganti perangkat ke HP atau Laptop lain</span> karena jawaban hanya tersimpan di 1 perangkat
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information */}
                <Card className="mb-8 border-amber-200 bg-amber-50">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <AlertTriangleIcon className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-amber-800 mb-3">Informasi Penting</h3>
                                <div className="space-y-2 text-slate-700">
                                    <p>
                                        • <strong>Pastikan koneksi internet Anda stabil</strong> selama pelaksanaan ujian
                                    </p>
                                    <p>
                                        • <strong>Mohon tidak berbuat curang agar dipermudah urusan ke depannya</strong>
                                    </p>
                                    <p>• Ujian akan dimulai secara otomatis setelah Anda menekan tombol "Mulai"</p>
                                    <p>• Tidak ada jeda istirahat selama pelaksanaan ujian</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {isUserJoinThisEvent && (
                    <Badge variant="destructive" className="mx-auto">
                        Anda sudah mengikuti ujian ini, silahkan lihat nilai anda
                    </Badge>
                )}
                <Button asChild className="bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-700 h-16 text-xl font-semibold" size={"lg"}>
                    <Link to={`/app/peserta/mulai-ujian/${params.eventId}/init`}>
                        Mulai Ujian
                    </Link>
                </Button>
            </div>
        </div>
    )
}