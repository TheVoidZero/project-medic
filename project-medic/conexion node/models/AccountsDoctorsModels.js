//importamos la conexion de DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const AccountDoctorModel = db.define('cuentas_doctores', {
    nombre: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    especialidad: { type: DataTypes.STRING },
    tipo_de_cuenta: {type: DataTypes.STRING}
});

export default AccountDoctorModel;