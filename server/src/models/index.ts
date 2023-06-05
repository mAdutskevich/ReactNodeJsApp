import fs from 'fs';
import * as path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from 'config/dbConfig';
import { IDbConfig } from 'interfaces';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dataBaseConfig = dbConfig[env as keyof IDbConfig];
const db: any = {};

const sequelize = new Sequelize(
    dataBaseConfig.database,
    dataBaseConfig.username,
    dataBaseConfig.password,
    dataBaseConfig,
);

fs.readdirSync(__dirname)
    .filter((file: string) => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach(async (file) => {
        const model = await import(path.join(__dirname, file));
        const modelDefault = model.default(sequelize, DataTypes);
        db[modelDefault.name] = modelDefault;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
