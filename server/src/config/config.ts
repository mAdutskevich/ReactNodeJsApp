import * as path from 'path';
import { config } from 'dotenv';

const root = path.resolve(__dirname, '../../');

config()

const appConfig = {
    PROTOCOL: process.env.PROTOCOL,
    PORT: process.env.PORT || 80,
    JWT_CERT_PATH: path.join(root, process.env.JWT_SECRET_CERT_PATH as string),
    JWT_PUBLIC_CERT_PATH: path.join(root, process.env.JWT_PUBLIC_CERT_PATH as string),
    JWT_REFRESH_CERT_PATH: path.join(root, process.env.JWT_REFRESH_SECRET_CERT_PATH as string),
    JWT_REFRESH_PUBLIC_CERT_PATH: path.join(root, process.env.JWT_REFRESH_PUBLIC_CERT_PATH as string),
    TOKEN_LIFETIME: 5,
    REFRESH_TOKEN_LIFETIME: 30,
};

export default appConfig;