//importamos erl modelo
import AccountsDoctorsModels from "../models/AccountsDoctorsModels.js"
//**Metodos para el CRUD **/

//Mostrar todos los registros
export const getAllAccountsDoctors = async (req, res) => {
    try {
        const accountsDoctors = await AccountsDoctorsModels.findAll()
        res.json(accountsDoctors)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Mostrar un registro
export const getAccountDoctor = async (req, res) => {
    try {
        const accountDoctor = await AccountsDoctorsModels.findAll({
            where: {
                email:req.params.email
            }
        })
        res.json(accountDoctor[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear un registro
export const createAccountDoctor = async (req, res) => {
    try {
        await AccountsDoctorsModels.create(req.body)
        res.json({
            "message": "Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar un registro
export const updateAccountDoctor = async (req, res) => {
    try {
        await AccountsDoctorsModels.update(req.body, {
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
export const deleteAccountDoctor = async (req, res) => {
    try {
        await AccountsDoctorsModels.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}