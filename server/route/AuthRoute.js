import express from 'express'
import { SignUp, bodyCheck, login } from '../Controller/AuthController.js'

const router = express.Router()

router.post('/register/',bodyCheck,SignUp)
router.post('/login/',bodyCheck,login)




export default router