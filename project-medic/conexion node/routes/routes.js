import express from 'express'
import {createAccount, deleteAccount, getAllAccounts, getAccount, updateAccount} from '../controllers/AccountsController.js'
const router = express.Router()

router.get('/', getAllAccounts)
router.get('/email/:email', getAccount)
router.post('/', createAccount)
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount)

export default router
