export default interface IDatabaseConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
    ssl: { rejectUnauthorized: boolean };
}
