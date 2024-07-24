import {Sequelize} from 'sequelize'

//Realiza la conexion con la base de datos, se debe de aghegar la base de datos creada por xampp
const db = new Sequelize('base_de_gatos', 'root','',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db