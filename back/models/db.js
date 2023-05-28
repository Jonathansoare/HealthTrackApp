const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    "testes",
    "root",
    "90351222", 
    {
    host:"localhost",
    dialect:"mysql"
});
try {
    sequelize.authenticate().then(() => {
        console.log('conectado com o banco de dados.');
     }).catch((error) => {
        console.error('nao conseguiu conecta com o banco de dados.');
     });
} catch (error) {
    console.log(error)
}


module.exports = sequelize;