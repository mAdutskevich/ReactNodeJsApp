export default (sequelize: any, DataTypes: any) => {
    const users = sequelize.define('users', {
        name: {
            type: DataTypes.STRING,
        },
        surname: {
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    users.associate = (models: any) => {
        users.hasMany(models.events, {
            foreignKey: 'userCode',
            sourceKey: 'code',
            onDelete: 'cascade',
        });
    };

    return users;
};
