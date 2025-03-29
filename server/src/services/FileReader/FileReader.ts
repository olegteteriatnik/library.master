import { promises as fs } from 'fs';

export default class FileReader {
    public async readFile(filePath: string): Promise<string> {
        try {
            return  await fs.readFile(filePath, 'utf8');
        } catch (error: any) {
            throw new Error(`Error reading file: ${error.message}`)
        }
    }
}
