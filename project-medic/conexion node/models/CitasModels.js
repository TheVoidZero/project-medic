//importamos la conexion de DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const AccountModel = db.define('citas', {
    email: { type: DataTypes.STRING },
    doctor_seleccionado: { type: DataTypes.STRING },
    dia_cita: { type: DataTypes.STRING },
    hora_cita: { type: DataTypes.STRING },
    razon_cita: { type: DataTypes.STRING },
    especialidad: { type: DataTypes.STRING },
});

export default AccountModel;