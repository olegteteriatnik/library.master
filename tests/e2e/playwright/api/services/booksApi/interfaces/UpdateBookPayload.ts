export interface UpdateBookPayload {
    id: number;
    title?: string;
    author?: string;
    year?: number;
    isAvailable?: boolean;
}
