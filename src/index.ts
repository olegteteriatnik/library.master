import FileReader from './services/FileReader/FileReader';
import * as readline from 'readline';

const fileReader = new FileReader();
const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

userInput.question('Input path to file: ', async (filePath) => {
    try {
        if (!filePath.trim()) {
            console.error('Error: You did not provide a file path.');
        } else if (!filePath.includes('/') && !filePath.includes('\\')) {
            console.error('Error: provided value is not a valid path.')
        } else {
            const content = await fileReader.readFile(filePath);
            console.log('File data: ', content);
        }
    } catch (error: any) {
        if (error.message.includes('ENOENT')) {
            console.error(`Error: File not found at path ${filePath}.`)
        } else {
            console.error('Error by file reading: ', error.message);
        }
    } finally {
        userInput.close();
    }
});
