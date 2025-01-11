import { startServer, startFileReader } from './server';

async function main() {
    const mode = process.argv[2] || 'server';

    if (mode === 'server') {
        console.log('Starting server...');
        await startServer();
    } else if (mode === 'fileReader') {
        console.log('Starting FileReader...');
        await startFileReader();
    } else {
        console.error('Invalid mode. Use "server" or "fileReader".');
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('Error in main: ', error.message);
    process.exit(1);
});
