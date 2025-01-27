import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    id:        {type: Number, primaryKey: true, autoIncrement: true},
    user_id:   {type: String, unique: true, required: true},
    role :     {type: String, default: 'user'}
})

export const User = mongoose.model('User', UserSchema)