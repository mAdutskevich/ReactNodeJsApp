import fs from 'fs';
import appConfig from 'config/config';

const mySqlConfigRaw = fs.readFileSync(appConfig.MYSQL_CONFIG_PATH);
const dbConfig = JSON.parse(mySqlConfigRaw.toString());

export default dbConfig;
