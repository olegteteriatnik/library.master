import express from 'express';
import readline from 'readline';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../../config/swaggerConfig';
import Database from '../../config/database';
import authRoutes from '../routes/AuthRoutes';
import libraryRoutes from '../routes/LibraryRoutes';
import FileReader from '../services/FileReader/FileReader';
import { initializeSecretKey } from '../services/AuthService/AuthService';

async function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;
    const baseApiUrl = process.env.BASE_API_URL || `http://localhost:${port}`;

    swaggerConfig.definition!.servers = [
        {
            url: baseApiUrl,
            description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Local server',
        },
    ];


    const swaggerSpec = swaggerJSDoc({
        ...swaggerConfig,
        securityDefinitions: {
            BearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
    });

    try {
        console.log('Initializing AuthService...');
        await initializeSecretKey();
        console.log('AuthService initialized successfully.');

        app.use('/library-master-api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        app.use(express.json());
        app.use('/', authRoutes);
        app.use('/books', libraryRoutes);

        const pool = await Database.getInstance();

        pool.query('SELECT NOW()', (err: any, res: any) => {
            if (err) {
                console.error('Error connecting to the database:', err.message);
                process.exit(1);
            } else {
                console.log('Database connected:', res.rows);

                app.listen(port, () => {
                    console.log(`Server is running on http://localhost: ${port}`);
                });
            }
        });
    } catch (error: any) {
        console.error('Failed to start server: ', error.message);
        process.exit(1);
    }
}

function askQuestion(query: string): Promise<string> {
    const userInput = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        userInput.question(query, (answer) => {
            resolve(answer);
            userInput.close();
        });
    });
}

async function startFileReader() {
    const fileReader = new FileReader();
    const filePath = await askQuestion('Input path to file: ');

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
    }
}

export { startServer, startFileReader };
