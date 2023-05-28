const Sequelize = require('sequelize');
const db = require('./db');
const sequelize = require('./db');


const Imc = db.define('Imc', {
    idUser:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    imc:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    data_age:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    categoria:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

// Criar a tabela 
Imc.sync()

module.exports = Imc