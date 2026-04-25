import { injectable } from 'inversify';
import { Pool } from 'pg';
import IDatabaseConfig from '../params/interfaces/IDatabaseConfig';

@injectable()
export class Database {
    private pool: Pool | null = null;

    public async connect(): Promise<Pool> {
        if (this.pool) return this.pool;

        const user = process.env.DB_USER;
        const host = process.env.DB_HOST;
        const database = process.env.DB_NAME;
        const password = process.env.DB_PASSWORD;

        if (!user || !host || !database || !password) {
            throw new Error('Database environment variables are missing in .env file');
        }

        const config: IDatabaseConfig = {
            user,
            host,
            database,
            password,
            port: 5432,
            // ssl: { rejectUnauthorized: false },
        };

        this.pool = new Pool(config);
        console.log('Database pool configured');
        return this.pool;
    }
}
