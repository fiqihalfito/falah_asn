import { useEffect, useState } from "react";
import type { Route } from "./+types/selesai";
import { isRouteErrorResponse, Link, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";

export default function SelesaiPage({ loaderData, params }: Route.ComponentProps) {

    const [count, setCount] = useState(5);
    const fetcher = useFetcher();

    useEffect(() => {
        if (count <= 0) {
            return;
        }

        const timer = setTimeout(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [count]);

    // 🚀 auto upload jawaban di background
    useEffect(() => {
        const jawabanSetLocal = localStorage.getItem(params.sesiUjianId) || "[]";

        fetcher.submit(
            { jawabanSet: jawabanSetLocal },
            {
                action: `/app/ujian/submit/${params.sesiUjianId}`,
                method: "post",
            }
        );

    }, [params.sesiUjianId]);



    return (
        <div className="h-screen w-screen flex flex-col gap-y-4 justify-center items-center">
            {count !== 0 ? (
                <h6 className="text-6xl font-black">{count}</h6>
            ) : (
                <Button asChild size={"lg"}>
                    <Link to={`/app/peserta/hasil-ujian`} viewTransition={true}>
                        Lihat Hasil Ujian
                    </Link>
                </Button>
            )}

            <div className="flex flex-col gap-y-2 justify-center items-center">
                <h1 className="text-3xl font-bold">Ujian Telah Selesai</h1>
                <p className="text-muted-foreground">
                    {fetcher.state === "submitting"
                        ? "Sedang mengupload jawaban..."
                        : fetcher.data?.success
                            ? "Jawaban berhasil tersimpan"
                            : "Jawaban gagal disimpan"}
                </p>
                {/* <p>{JSON.stringify(fetcher.data)}</p> */}
            </div>
        </div>
    )
}

export function ErrorBoundary({
    error,
}: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        return (
            <>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </>
        );
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </div>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}