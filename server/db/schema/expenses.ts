import mongoose from 'mongoose'

const ExpensesSchema = new mongoose.Schema({
    expense_id:{type: Number, required: true, default: 1},
    from:      {type: String, required: true},
    user_id:   {type: String, required: true},
    title:     {type: String, required: true},
    amount:    {type: Number, required: true},
})

export const Expenses = mongoose.model('Expenses', ExpensesSchema)