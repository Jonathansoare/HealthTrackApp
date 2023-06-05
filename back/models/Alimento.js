const Sequelize = require('sequelize');
const db = require('./db');
const sequelize = require('./db');


const Alimento = db.define('Alimento', {
    idUser:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    alimento:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    data_age:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    calorias:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

// Criar a tabela 
Alimento.sync()

module.exports = Alimento