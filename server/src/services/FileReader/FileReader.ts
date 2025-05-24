import { promises as fs } from 'fs';
import { handleError } from '../../utils/handleError';

export default class FileReader {
    public async readFile(filePath: string): Promise<string> {
        try {
            return  await fs.readFile(filePath, 'utf8');
        } catch (error) {
            const { message } = handleError(error, 'Error reading file');
            throw new Error(message);
        }
    }
}
