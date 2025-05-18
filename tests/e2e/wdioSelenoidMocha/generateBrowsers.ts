import fs from 'fs';
import path from 'path';

const chromeVersion = process.env.CHROME_VERSION || '118.0';
const browsersPath = path.join(__dirname, 'browsers.json');

const config = {
    chrome: {
        default: chromeVersion,
        versions: {
            [chromeVersion]: {
                image: `selenoid/vnc:chrome_${chromeVersion}`,
                port: '4444',
                path: '/',
                tmpfs: { '/tmp': 'size=512m' },
                env: ['TZ=UTC']
            }
        }
    }
};

fs.writeFileSync(browsersPath, JSON.stringify(config,  null, 2));
console.log(`browsers.json generated for Chrome ${chromeVersion}`);
