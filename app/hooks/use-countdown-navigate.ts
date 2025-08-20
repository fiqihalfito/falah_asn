import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

interface CountdownOptions {
    startTime: Date;          // waktu mulai (dari DB)
    durationSec: number;      // durasi countdown
    targetPath: string;       // ke mana navigate setelah habis
    finishDelayMs?: number;   // jeda setelah 00:00
    onFinish?: () => void;    // callback opsional
}

export function useCountdownNavigate({
    startTime,
    durationSec,
    targetPath,
    finishDelayMs = 2000, // default 2 detik
    onFinish,
}: CountdownOptions) {
    const navigate = useNavigate();
    const [left, setLeft] = useState(durationSec);
    const [isFinished, setIsFinished] = useState(false);

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        const endAt = startTime.getTime() + durationSec * 1000;

        const tick = () => {
            const msLeft = Math.max(0, endAt - Date.now());
            const secLeft = Math.ceil(msLeft / 1000);
            setLeft(secLeft);

            if (secLeft <= 0 && !isFinished) {
                setIsFinished(true);
                if (intervalRef.current) {
                    window.clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }
        };

        tick();
        intervalRef.current = window.setInterval(tick, 250);

        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, [startTime, durationSec, isFinished]);

    // Delay navigate ketika sudah habis
    useEffect(() => {
        if (!isFinished) return;

        const timer = window.setTimeout(() => {
            if (onFinish) onFinish();
            navigate(targetPath);
        }, finishDelayMs);

        return () => window.clearTimeout(timer);
    }, [isFinished, finishDelayMs, navigate, targetPath, onFinish]);

    return { left, isFinished };
}
