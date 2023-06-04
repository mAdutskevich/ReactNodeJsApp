import { Dialect } from 'sequelize';

export interface IDbConfigItem {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    port: number;
}
