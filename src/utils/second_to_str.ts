export function secondToString(second: number): string {
    const hour = Math.floor(second / 3600);
    const min = Math.floor((second % 3600) / 60);
    const sec = second % 60;

    const hourStr = hour.toString().padStart(2, '0');
    const minStr = min.toString().padStart(2, '0');
    const secStr = sec.toString().padStart(2, '0');

    return `${hourStr}:${minStr}:${secStr}`;
}