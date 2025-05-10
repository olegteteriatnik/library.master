import { injectable } from 'inversify';
import { Pool } from 'pg';
import { getSecret } from './vault';
import DbData from '../params/interfaces/DbData';
import IDatabaseConfig from '../params/interfaces/IDatabaseConfig';

@injectable()
export class Database {
    private pool: Pool | null = null;

    public async connect(): Promise<Pool> {
        if (this.pool) return this.pool;

        const dbData: DbData = await getSecret('database');

        const config: IDatabaseConfig = {
            user: dbData.username,
            host: dbData.host,
            database: 'library-db',
            password: dbData.password,
            port: 5432,
            ssl: { rejectUnauthorized: false },
        };

        this.pool = new Pool(config);
        console.log('Database pool configured');
        return this.pool;
    }
}
