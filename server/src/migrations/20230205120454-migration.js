'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('users', 'password', {
            type: DataTypes.STRING,
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('users', 'password', {
            type: DataTypes.STRING,
            allowNull: false,
        });
    },
};
