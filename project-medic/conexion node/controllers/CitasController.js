//importamos erl modelo
import CitasModels from "../models/CitasModels.js"
//**Metodos para el CRUD **/

//Mostrar todos los registros
export const getAllCitas = async (req, res) => {
    try {
        const citas = await CitasModels.findAll()
        res.json(citas)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Mostrar un registro
export const getCita = async (req, res) => {
    try {
        const accounts = await CitasModels.findAll({
            where: {
                email:req.params.email
            }
        })
        res.json(accounts)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getCitasByDoctorAndDate = async (req, res) => {
    try {
        const accounts = await CitasModels.findAll({
            where: {
                doctor_seleccionado: req.params.doctor_seleccionado,
                dia_cita: req.params.dia_cita
            }
        });
        res.json(accounts); // Devolvemos todos los registros que coinciden
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Crear un registro
export const createCita = async (req, res) => {
    try {
        await CitasModels.create(req.body)
        res.json({
            "message": "Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar un registro
export const updateCita = async (req, res) => {
    try {
        await CitasModels.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({
            "message": "Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Eiminar un registro
export const deleteCita = async (req, res) => {
    try {
        await CitasModels.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}