import FileReader from './services/FileReader/FileReader';
import * as readline from 'readline';

const fileReader = new FileReader();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Input path to file: ', async (filePath) => {
    try {
        const content = await fileReader.readFile(filePath);
        console.log('File data: ', content);
    } catch (error: any) {
        console.error('Error by file reading: ', error.message);
    } finally {
        rl.close();
    }
});
