import express from 'express'
const router = express.Router()
import { 
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile, 
    getUsers, 
    deleteUser,
    getUsersById,
    updateUser,
    createCompletionSubjects,
    getTopUsers
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
    .route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)
router.post('/login', authUser)
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router.get('/top', getTopUsers)
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUsersById)
    .put(protect, admin, updateUser)
router
    .route('/:id/subjects')
    .post(protect, createCompletionSubjects)

export default router