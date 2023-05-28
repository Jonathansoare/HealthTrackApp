const Sequelize = require('sequelize');
const db = require('./db');
const sequelize = require('./db');


const Peso = db.define('pesos', {
    idUser:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    peso:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    data_age:{
        type:Sequelize.STRING,
        allowNull:false,
    },
});

// Criar a tabela 
Peso.sync()

module.exports = Peso