export interface SearchBooksParams {
    page?: number;
    pageSize?: number;
    title?: string;
    author?: string;
    year?: number;
    isAvailable?: boolean;
}
