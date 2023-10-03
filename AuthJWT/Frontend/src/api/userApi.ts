export const BACKEND_URL = String(import.meta.env.VITE_BACKEND_URL);
export const changeTime = (item: string) => {
    const datetime = new Date(item);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1; 
    const day = datetime.getDate(); 

    const hours = datetime.getUTCHours(); 
    const minutes = datetime.getUTCMinutes();
    const time = `${year}/${month}/${day}` + ` ${hours}:${minutes > 9 ? minutes: `${0}${minutes}`}`;
    return time;
}
export const getStatus = (status: number) => {
    if (status === 0) {
        return '準備中'
    } else if (status == 1) {
        return '完了'
    } else {
        return 'キャンセル'
    }
}