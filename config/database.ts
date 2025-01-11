import { Pool } from 'pg';
import { getSecret } from './vault';
import DbData from '../params/interfaces/DbData';

class Database {
    private static instance: Pool | null = null;

    public static async getInstance(): Promise<Pool> {
        if (!Database.instance) {
            try {
                const dbData: DbData = await getSecret('database');
                Database.instance = new Pool({
                    user: dbData.username,
                    host: dbData.host,
                    database: 'library-db',
                    password: dbData.password,
                    port: 5432,
                    ssl: {
                        rejectUnauthorized: false,
                    },
                });
                console.log('Database pool configured');
            } catch (error: any) {
                console.error('Error configuring database: ', error.message);
                throw error;
            }
        }
        return Database.instance;
    }
}

export default Database;
