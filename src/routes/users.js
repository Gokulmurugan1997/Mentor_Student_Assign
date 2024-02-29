import express from "express"
import UserController from "../controller/user.js"
const router = express.Router()

router.get('/',UserController.getMentor)
router.get('/', UserController.getStudent)
router.post('/creatementor', UserController.createMentor)
router.post('/createstudent', UserController.createStudent)
router.put('/assignmentor/:id', UserController.assignMentor)
router.get('/:id', UserController.getStudentbyID)
router.put('/assignstudent/:id', UserController.assignStudent)
export default router
