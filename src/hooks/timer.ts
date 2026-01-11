import { useState, useEffect } from "react";

export function useTimer(initialTime: number = 60 * 25) {
    const [time, setTime] = useState(initialTime); // 剩餘時間
    const [isStart, setIsStart] = useState(false); // 是否開始

    // Start 按鈕點擊
    const toggleStart = () => {
        if (time === 0) return alert("Time is up!");
        console.log(`Set isStart to ${!isStart}`)
        setIsStart(!isStart);
    };

    // 倒計時
    useEffect(() => {
        if (!isStart) return;

        const timer = setInterval(() => {
            setTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isStart]);

    // + timer
    const addTime = () => {
        setTime((prev) => prev + 60 * 5);
    };

    // - timer
    const subTime = () => {
        setTime((prev) => {
            if (prev < 60 * 5) return 0;
            return prev - 60 * 5;
        });
    };

    return {
        time,
        isStart,
        toggleStart,
        setTime,
        addTime,
        subTime
    };
}