import express from 'express'
import {createAccountDoctor, deleteAccountDoctor, getAllAccountsDoctors, getAccountDoctor, updateAccountDoctor} from '../controllers/AccountsDoctorsController.js'
const router = express.Router()

router.get('/', getAllAccountsDoctors)
router.get('/email/:email', getAccountDoctor)
router.post('/', createAccountDoctor)
router.put("/:id", updateAccountDoctor)
router.delete('/:id', deleteAccountDoctor)

export default router
