import * as fs from 'fs';

export default class FileReader {
    public readFile(filePath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err: any, data: any) => {
                if (err) {
                    reject(new Error(`Error reading file: ${err.message}`));
                } else {
                    resolve(data);
                }
            });
        });
    }
}
