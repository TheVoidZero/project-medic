//importamos erl modelo
import AccountsModels from "../models/AccountsModels.js"
//**Metodos para el CRUD **/

//Mostrar todos los registros
export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await AccountsModels.findAll()
        res.json(accounts)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Mostrar un registro
export const getAccount = async (req, res) => {
    try {
        const account = await AccountsModels.findAll({
            where: {
                email:req.params.email
            }
        })
        res.json(account[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear un registro
export const createAccount = async (req, res) => {
    try {
        await AccountsModels.create(req.body)
        res.json({
            "message": "Registro creado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar un registro
export const updateAccount = async (req, res) => {
    try {
        await AccountsModels.update(req.body, {
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
export const deleteAccount = async (req, res) => {
    try {
        await AccountsModels.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}