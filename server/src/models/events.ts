export default (sequelize: any, DataTypes: any) => {
    const events = sequelize.define('events', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        participantsMin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        participantsMax: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dateFrom: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateTo: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        // userCode: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
    });

    return events;
};