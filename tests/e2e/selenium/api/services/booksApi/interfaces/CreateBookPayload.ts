export interface CreateBookPayload {
    title: string;
    author: string;
    year: number;
    isAvailable?: boolean;
}
