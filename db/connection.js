const Sequelize = require("sequelize")

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/index.db',
    dialectOptions: {
        timeout: 30000 // 30 segundos
      }
})

module.exports = sequelize