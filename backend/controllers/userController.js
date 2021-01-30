import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import dateValidation from '../utils/dateValidation.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            klp: user.klp,
            subjects: user.subjects,
            subjectsExtra: user.subjectsExtra,
            subjectsMemory: user.subjectsMemory,
            poin: user.poin,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, klp, yearBirth, monthBirth, dayBirth, isAdmin } = req.body

    const userExists = await User.findOne({ email })
    
    if (userExists) {
        res.status(404)
        throw new Error('User already exists')
    } 
    
    if (!dateValidation(yearBirth, monthBirth, dayBirth)) {
        res.status(400)
        throw new Error('Invalid user data')
    }

    const user = await User.create({
        name,
        email,
        password,
        birthdate: new Date(Date.UTC(Number(yearBirth), Number(monthBirth)-1, Number(dayBirth))),
        klp,
        isAdmin
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            klp: user.klp,
            subjects: user.subjects,
            subjectsExtra: user.subjectsExtra,
            subjectsMemory: user.subjectsMemory,
            poin: user.poin,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            klp: user.klp,
            subjects: user.subjects,
            subjectsExtra: user.subjectsExtra,
            subjectsMemory: user.subjectsMemory,
            poin: user.poin,
            isAdmin: user.isAdmin,
            subjects: user.subjects
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.klp = req.body.klp || user.klp

        const yearBirth = req.body.yearBirth || new Date(user.birthdate).getFullYear()
        const monthBirth = req.body.monthBirth-1 || new Date(user.birthdate).getMonth()
        const dayBirth = req.body.dayBirth || new Date(user.birthdate).getDate()

        if (req.body.yearBirth || req.body.monthBirth || req.body.dayBirth) {
            if (dateValidation(yearBirth, monthBirth, dayBirth)) {
                user.birthdate = new Date(Date.UTC(Number(yearBirth), Number(monthBirth), Number(dayBirth)))
            } else {
                res.status(400)
                throw new Error('Invalid birthdate')
            }
        } 

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            birthdate: updatedUser.birthdate,
            klp: updatedUser.klp,
            subjects: updatedUser.subjects,
            subjectsExtra: user.subjectsExtra,
            subjectsMemory: user.subjectsMemory,
            poin: updatedUser.poin,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.klp = req.body.klp || user.klp
        user.isAdmin = req.body.isAdmin
        user.isActive = req.body.isActive

        const yearBirth = req.body.yearBirth || new Date(user.birthdate).getFullYear()
        const monthBirth = req.body.monthBirth-1 || new Date(user.birthdate).getMonth()
        const dayBirth = req.body.dayBirth || new Date(user.birthdate).getDate()

        if (req.body.yearBirth || req.body.monthBirth || req.body.dayBirth) {
            if (dateValidation(yearBirth, monthBirth, dayBirth)) {
                user.birthdate = new Date(Date.UTC(Number(yearBirth), Number(monthBirth), Number(dayBirth)))
            } else {
                res.status(400)
                throw new Error('Invalid birthdate')
            }
            
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            birthdate: updatedUser.birthdate,
            klp: updatedUser.klp,
            subjects: updatedUser.subjects,
            subjectsExtra: user.subjectsExtra,
            subjectsMemory: user.subjectsMemory,
            poin: updatedUser.poin,
            isAdmin: updatedUser.isAdmin,
            isActive: updatedUser.isActive
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get top ranked user
// @route   GET /api/users/top
// @access  Public
const getTopUsers = asyncHandler(async (req, res) => {
    const products = await User.find({}).sort({ poin: -1 }).limit(5)
  
    res.json(products)
})

// @desc    Create new completion subjects
// @route   POST /api/users/:id/subjects
// @access  Private
const createCompletionSubjects = asyncHandler(async (req, res) => {
    const { name, completed } = req.body

    const user = await User.findById(req.params.id)

    if (user) {
        const completion = {
            name,
            completed,
            poinCompleted: completed.length
        }
        
        let i = 0
        let foundSubject = false

        while (i < user.subjects.length && !foundSubject) {
            if (user.subjects[i].name === completion.name) {
                user.subjects[i].completed = completion.completed || []
                user.subjects[i].poinCompleted = user.subjects[i].completed.length
                foundSubject = true
            }
            
            i++
        }
        
        if (!foundSubject) user.subjects.push(completion)

        user.poin = 
            user.subjectsExtra.length + 
            user.subjectsSurat.length +
            user.subjectsDoa.length +
            user.subjectsDalil.length + 
            user.subjects.reduce((acc, subject) => acc + subject.poinCompleted, 0)

        await user.save()

        res.status(201).json({ message: 'Subjects updated' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Create new completion extra subjects
// @route   POST /api/users/:id/subjects-extra
// @access  Private
const createCompletionSubjectsExtra = asyncHandler(async (req, res) => {
    const { type, subjects } = req.body // type: extra or memory

    if (!subjects) {
        res.status(404)
        throw new Error("'subject' is equired")
    }

    if (type === 'extra' || type === 'surat' || type === 'doa' || type === 'dalil') {
        const user = await User.findById(req.params.id)

        if (user) {
            if (type === 'extra' && user.subjectsExtra) {
                user.subjectsExtra = subjects
            } else if (type === 'surat' && user.subjectsSurat) {
                user.subjectsSurat = subjects
            } else if (type === 'doa' && user.subjectsDoa) {
                user.subjectsDoa = subjects
            } else if (type === 'dalil' && user.subjectsDalil) {
                user.subjectsDalil = subjects
            } else {
                res.status(400)
                throw new Error('Subject already reviewed')
            }
            
            user.poin = 
                user.subjectsExtra.length + 
                user.subjectsSurat.length +
                user.subjectsDoa.length +
                user.subjectsDalil.length + 
                user.subjects.reduce((acc, subject) => acc + subject.poinCompleted, 0)

            await user.save()

            res.status(201).json({ message: 'Subjects updated' })
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    } else {
        res.status(404)
        throw new Error("'type' is supposed to be extra, surat, doa or dalil")
    }
})

export { 
    authUser, 
    registerUser, 
    getUserProfile, 
    updateUserProfile, 
    getUsers, 
    deleteUser, 
    getUsersById, 
    updateUser, 
    createCompletionSubjects,
    createCompletionSubjectsExtra,
    getTopUsers
}
