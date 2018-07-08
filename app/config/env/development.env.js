module.exports = {
    env: 'development',
    secret: 'S3cr3t',
    serverPort: 3000,
    dialect: 'mssql',
    database: 'Desafio-jz',
    username: 'DesafioAdmin',
    password: 'Picachu123',
    scheme: 'CAMILO',
    port: 3306,
    dbURL: 'jzd-dev-desafio.database.windows.net',
    host: '',
    define: {
        // prevent sequelize from pluralizing table names
        freezeTableName: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        // paranoid: true,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true
    }
};
