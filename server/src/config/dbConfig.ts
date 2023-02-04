import { IDbConfig } from '../interfaces/IDbConfig';

const dbConfig: IDbConfig = {
    development: {
        username: 'root',
        password: '123',
        database: 'eventizer_dev',
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3308
    }
};

export default dbConfig;
