import { exec } from 'child_process';
import { promisify } from 'util';
import config from './config';

const execAsync = promisify(exec);

export async function getSecret(key: keyof typeof config) {
    try {
        const { stdout } =  await execAsync(
            `hcp vault-secrets secrets open --app LibraryMaster ${config[key]}`
        );

        const lines = stdout.split('\n');
        const valueLine = lines.find(line => line.trim().startsWith('Value:'));

        if (!valueLine) {
            throw new Error('Could not find "Value:" in command output');
        }

        const jsonString = valueLine.replace('Value:', '').trim();

        return JSON.parse(jsonString);
    } catch (err: any) {
        console.error(`Error fetching secret "${config[key]}`, err.message);
        throw err;
    }
}
