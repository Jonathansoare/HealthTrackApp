const Sequelize = require('sequelize');
const db = require('./db');
const sequelize = require('./db');


const Atividade = db.define('Atividade', {
    idUser:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    atividade:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    data_age:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    time:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

// Criar a tabela 
Atividade.sync()

module.exports = Atividade