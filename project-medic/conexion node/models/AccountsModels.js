//importamos la conexion de DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const AccountModel = db.define('cuentas', {
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    fecha_de_nacimiento: { type: DataTypes.STRING },
    numero_de_telefono: { type: DataTypes.STRING },
    genero: { type: DataTypes.STRING },
    curp: { type: DataTypes.STRING },
    tipo_de_sangre: { type: DataTypes.STRING },
    enfermedades_cronicas: { type: DataTypes.STRING },
    isMenor: { type: DataTypes.BOOLEAN },
    isActive: { type: DataTypes.BOOLEAN },
    nombre: {type: DataTypes.STRING},
    tipo_de_cuenta: {type: DataTypes.STRING}
});

export default AccountModel;