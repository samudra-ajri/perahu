import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const subjectSchema = mongoose.Schema({
    name: { type: String, required: true },
    completed: { type: [String], required: true},
    poinCompleted: {type: Number, required: true, default: 0}
}, {
    timestamps: true
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    klp: {
        type: String,
        required: true
    },
    subjects: [subjectSchema],
    subjectsExtra: [String],
    subjectsMemory: [String],
    poin: {
        type: Number,
        required: true,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User