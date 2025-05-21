import axios from 'axios';

class HttpHelper {
    public isAxiosErrorWithStatus(error: unknown, statusCode: number): boolean {
        return (
            axios.isAxiosError(error) &&
            typeof error.response?.status === 'number' &&
            error.response.status === statusCode
        );
    }
}

export default new HttpHelper();
