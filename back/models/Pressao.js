const Sequelize = require('sequelize');
const db = require('./db');
const sequelize = require('./db');


const Pressao = db.define('pressao', {
    idUser:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    pressao:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    data_age:{
        type:Sequelize.STRING,
        allowNull:false,
    },
});

// Criar a tabela 
Pressao.sync()

module.exports = Pressao