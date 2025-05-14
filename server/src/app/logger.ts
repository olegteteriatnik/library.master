import { createLogger, format } from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

const isProduction = process.env.NODE_ENV === 'production';

const logger = createLogger({
    level: 'info',
    silent: !isProduction,
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) => {
            const metaString = Object.keys(meta).length? JSON.stringify(meta, null, 2) : '';
            return `${timestamp} [${level.toUpperCase()}]: ${message}${metaString}`;
        }),
    ),
    transports: isProduction ?
        [new WinstonCloudwatch({
            logGroupName: '/library/master',
            logStreamName: 'main-stream',
            awsRegion: 'eu-north-1',
            jsonMessage: true,
        })]
        : [],
});

export default logger;
