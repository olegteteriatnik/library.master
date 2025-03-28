import { Options } from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3000';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library Master API',
            version: '1.0.0',
            description: 'API Documentation for Library Master',
        },
        servers: [
            {
                url: BASE_API_URL,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./server/src/routes/*.ts'],
};

export default swaggerOptions;
