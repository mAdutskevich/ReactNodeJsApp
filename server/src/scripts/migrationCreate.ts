import path from 'path';
import fs from 'fs';
import { format } from 'date-fns';

const fileName = process.argv.slice(2)[0] || 'migration';
const extension = path.extname(fileName);

const migrationFile = `${format(new Date(), 'yyyyMMddHHmmss')}-${path.basename(
    fileName,
    extension,
)}.js`;
const migrationFilePath = path.resolve(__dirname, '../migrations', migrationFile);

const migrationTemplate = `'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    /**
     * @param queryInterface {import('sequelize').QueryInterface}
     * @param Sequelize {import('sequelize').Sequelize}
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        // migration code here...
    },

    /**
     * @param queryInterface {import('sequelize').QueryInterface}
     * @param Sequelize {import('sequelize').Sequelize}
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        // migration revert code here...
    },
};
`;

if (!fs.existsSync(migrationFilePath)) {
    fs.writeFile(
        migrationFilePath,
        migrationTemplate,
        { encoding: 'utf8' },
        (err: NodeJS.ErrnoException) => {
            if (err) {
                console.error('Failed to create migration', err);
                return;
            }

            console.warn(`Migration file "${migrationFile}" created.`);
        },
    );
}
