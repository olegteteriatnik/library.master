import axios from 'axios';
import dotenv from 'dotenv';
import { Secret } from '../../params/interfaces/Secret';

dotenv.config();

function getEnvVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is missing`);
    }
    return value;
}

export async function getSecret(key: string) {
    const HCP_CLIENT_ID = getEnvVariable('HCP_CLIENT_ID');
    const HCP_CLIENT_SECRET = getEnvVariable('HCP_CLIENT_SECRET');
    const HCP_AUTH_URL = getEnvVariable('HCP_AUTH_URL');
    const HCP_API_BASE_URL = getEnvVariable('HCP_API_BASE_URL');
    const HCP_AUDIENCE = getEnvVariable('HCP_AUDIENCE');

    try {
        const tokenResponse = await axios.post(
            HCP_AUTH_URL,
            new URLSearchParams({
                client_id: HCP_CLIENT_ID,
                client_secret: HCP_CLIENT_SECRET,
                grant_type: 'client_credentials',
                audience: HCP_AUDIENCE,
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }
        );

        const HCP_API_TOKEN = tokenResponse.data.access_token;

        if (!HCP_API_TOKEN) {
            new Error('Failed to retrieve API token');
        }

        const secretResponse = await axios.get(
            HCP_API_BASE_URL,
            {
                headers: {
                    Authorization: `Bearer ${HCP_API_TOKEN}`,
                },
            }
        );

        const secretData = secretResponse.data.secrets.find((secret: Secret) => secret.name === key);
        const secretValue = JSON.parse(secretData.static_version.value);

        if (!secretData) {
            new Error(`Secret "${key}" not found`);
        }

        return secretValue;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error fetching secret "${key}":`, err.message);
        } else {
            console.error(`Unknown error fetching secret "${key}":`, err);
        }
        throw err;
    }
}
