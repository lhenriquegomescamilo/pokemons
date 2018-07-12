module.exports = (sequelize, DataTypes) => {
    const Pokemon = sequelize.define('Pokemon', {
        tipo: DataTypes.STRING,
        treinador: DataTypes.STRING,
        nivel: DataTypes.INTEGER
    }, {});
    Pokemon.associate = function (models) {
        // associations can be defined here
    };
    return Pokemon;
};