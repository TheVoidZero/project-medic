import express from 'express'
import {createCita, deleteCita, getAllCitas, getCita, updateCita, getCitasByDoctorAndDate} from '../controllers/CitasController.js'
const router = express.Router()

router.get('/', getAllCitas)
router.get('/email/:email', getCita)
router.post('/', createCita)
router.put("/:id", updateCita)
router.delete('/:id', deleteCita)
router.get('/doctor/:doctor_seleccionado/dia/:dia_cita', getCitasByDoctorAndDate);

export default router
