import {createLogger, format, transports} from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

const isProduction = process.env.NODE_ENV === 'production';

const loggerTransports = isProduction
    ? [
        new WinstonCloudwatch({
            logGroupName: process.env.CLOUDWATCH_LOG_GROUP || 'library-master',
            logStreamName: process.env.CLOUDWATCH_LOG_STREAM || 'main-stream',
            awsRegion: process.env.AWS_REGION || 'eu-north-1',
            jsonMessage: true,
        }),
    ]
    : [
        new transports.Console(),
    ];

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
    transports: loggerTransports,
});

export default logger;
