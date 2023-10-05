export const BACKEND_URL = String(import.meta.env.VITE_BACKEND_URL);
export const getStatus = (status: number) => {
    if (status === 0) {
        return '準備中'
    } else if (status == 1) {
        return '完了'
    } else {
        return 'キャンセル'
    }
}