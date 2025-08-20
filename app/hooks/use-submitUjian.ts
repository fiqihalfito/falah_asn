import { useSubmit } from "react-router"


export function useSubmitUjian(sesiUjianId: string) {
    const submit = useSubmit()

    return () => {
        const jawabanSetLocal = localStorage.getItem(sesiUjianId) || "[]";
        submit({ jawabanSet: jawabanSetLocal }, {
            action: `/app/ujian/submit/${sesiUjianId}`,
            method: "post",
        });

    };
}