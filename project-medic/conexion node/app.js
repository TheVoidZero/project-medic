// main.js
import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import AccountsRoutes from './routes/routes.js';
import CitasRoutes from './routes/citasRoutes.js';
import DoctorsRoutes from './routes/doctorsRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/cuentas', AccountsRoutes);
app.use('/citas', CitasRoutes);
app.use('/cuentas_doctores', DoctorsRoutes);

try {
    db.authenticate();
    console.log("Conexion exitosa a la DB");
} catch (error) {
    console.log(`El error de la conexion es: ${error}`);
}

app.listen(8000, () => {
    console.log('server UP running in http://localhost:8000/');
});