const Sequelize = require('sequelize');
const db = require('./db');
const sequelize = require('./db');


const User = db.define('users', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,     
        unique:true   
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    data_age:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    altura:{
        type:Sequelize.STRING,
        allowNull:false
    },
    img:{
        type:Sequelize.STRING,
        allowNull:true,
    }
});

// Criar a tabela 
User.sync() 

module.exports = User