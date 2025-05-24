import path from 'path';
import express from 'express';
import readline from 'readline';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../../config/swaggerConfig';
import container from '../container/applicationContainer';
import Types from '../../params/constants/types';
import { Database } from '../../config/database';
import authRoutes from '../routes/AuthRoutes';
import libraryRoutes from '../routes/LibraryRoutes';
import FileReader from '../services/FileReader/FileReader';
import { initializeSecretKey } from '../services/AuthService/authSecretInit';
import { initializeObservers } from './observers';
import { handleError } from '../utils/handleError';

async function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;
    const baseApiUrl = process.env.BASE_API_URL || `http://localhost:${port}`;
    const clientPath = path.join(process.cwd(), 'client/public');

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
        initializeObservers();
        console.log('AuthService initialized successfully.');

        app.use('/library-master-api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        app.use(express.json());

        app.use('/', authRoutes);
        app.use('/books', libraryRoutes);

        app.use('/', express.static(clientPath));

        app.get('/login', (req, res) => {
            res.sendFile(path.join(clientPath, 'pages', 'login.html'));
        });

        app.get('/book', (req, res) => {
            res.sendFile(path.join(clientPath, 'pages', 'book.html'));
        });

        app.get(/^\/(?!books).*/, (req, res) => {
            res.sendFile(path.join(clientPath, 'pages', 'index.html'));
        });

        const db = container.get<Database>(Types.Database);
        const pool = await db.connect();

        try {
            const result = await pool.query('SELECT NOW()');
            console.log('Database connected:', result.rows);
            app.listen(port, () => {
                console.log(`Server is running`);
            });
        } catch (err) {
            const { message } = handleError(err, 'Error connecting to the database');
            console.error(message);
            process.exit(1);
        }
    } catch (error) {
        const { message } = handleError(error, 'Failed to start server');
        console.error(message);
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
    } catch (error) {
        const { message } = handleError(error, 'Error reading file');
        console.error(message);
    }
}

export { startServer, startFileReader };
