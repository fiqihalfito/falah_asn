import { Form, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { BookOpenCheckIcon, TimerIcon } from "lucide-react";
import type { FormEvent } from "react";
import { useSubmitUjian } from "~/hooks/use-submitUjian";
import { useCountdownNavigate } from "~/hooks/use-countdown-navigate";
import { cn } from "~/lib/utils";

type UjianHeaderProp = {
    sesiUjianId: string,
    startTime: Date,
    namaPeserta?: string | null
}

const DURATION_SEC = 60 * 100; //100 menit

export function UjianHeader({ sesiUjianId, startTime, namaPeserta }: UjianHeaderProp) {

    // const submitUjian = useSubmitUjian(sesiUjianId);
    const navigate = useNavigate()
    const { left, isFinished } = useCountdownNavigate({
        startTime,
        durationSec: DURATION_SEC, // 5 menit
        targetPath: `/app/ujian/selesai/${sesiUjianId}`,
        // finishDelayMs: 2000,
        onFinish: () => console.log("waktu habis")

    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // submitUjian()
        navigate(`/app/ujian/selesai/${sesiUjianId}`)
    }

    const mm = String(Math.floor(left / 60)).padStart(2, "0");
    const ss = String(left % 60).padStart(2, "0");

    return (
        <div className="h-20 bg-white px-8 flex items-center justify-between border-b">
            <div>
                <h1 className="font-semibold flex items-center gap-x-3 text-xl">
                    <BookOpenCheckIcon />
                    Falah ASN
                </h1>
            </div>
            <div className="flex items-center gap-x-10">
                <div className="flex gap-x-2 items-center">
                    <TimerIcon />
                    <span className={cn(
                        left <= 600 && "text-red-500 font-bold"
                    )}>{mm}:{ss}</span>
                </div>
                <span>{Boolean(namaPeserta) ? namaPeserta : "Peserta"}</span>
                <Form onSubmit={handleSubmit}>
                    <Button size={"lg"} className="text-base cursor-pointer" type="submit">
                        Submit Ujian
                    </Button>
                </Form>

            </div>

        </div>
    )
}