import axios from 'axios';
import dotenv from 'dotenv';
import config from './config';
import { Secret as SecretInterface } from '../../params/interfaces/Secret';
import { handleError } from '../../src/utils/handleError';

dotenv.config();

function getEnvVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is missing`);
    }
    return value;
}

export async function getSecret(key: keyof typeof config) {
    const HCP_CLIENT_ID = getEnvVariable('HCP_CLIENT_ID');
    const HCP_CLIENT_SECRET = getEnvVariable('HCP_CLIENT_SECRET');
    const HCP_AUTH_URL = getEnvVariable('HCP_AUTH_URL');
    const HCP_API_BASE_URL = getEnvVariable('HCP_API_BASE_URL');
    const HCP_AUDIENCE = getEnvVariable('HCP_AUDIENCE');

    if (!HCP_CLIENT_ID) {
        throw new Error('HCP_CLIENT_ID is missing in environment variables');
    }

    if (!HCP_CLIENT_SECRET) {
        throw new Error('HCP_CLIENT_SECRET is missing in environment variables');
    }

    if (!HCP_AUTH_URL) {
        throw new Error('HCP_AUTH_URL is missing in environment variables');
    }

    if (!HCP_API_BASE_URL) {
        throw new Error('HCP_API_BASE_URL is missing in environment variables');
    }

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

        const secretData = secretResponse.data.secrets.find((secret: SecretInterface) => secret.name === key);
        const secretValue = JSON.parse(secretData.static_version.value);

        if (!secretData) {
            new Error(`Secret "${key}" not found`);
        }

        return secretValue;
    } catch (err) {
        const { message } = handleError(err, `Error fetching secret "${config[key]}"`);
        console.error(message);
        throw err;
    }
}
