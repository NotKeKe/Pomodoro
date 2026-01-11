import { type Dispatch, type SetStateAction } from "react";

export const timerMode = [
    { label: 'Pomodoro', seconds: 60 * 25 },
    { label: 'Short Break', seconds: 60 * 5 },
    { label: 'Long Break', seconds: 60 * 15 },
];

export function useActiveMode(toMode: string, setActiveMode: Dispatch<SetStateAction<string>>, setTime: Dispatch<SetStateAction<number>>, toggleStart: () => void) {
    const toggleMode = () => {
        // 改變當前 mode
        setActiveMode(toMode);

        // 停止 Timer
        toggleStart()

        // 改變當前 Timer 時間
        setTime(timerMode.find((mode) => mode.label === toMode)?.seconds || 0);
    };

    return toggleMode
}