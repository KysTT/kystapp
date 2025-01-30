import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { getUser } from "../kinde.ts"
import { Expenses } from '../db/schema/expenses'

const expenseSchema = z.object({
    id: z.string(),
    title: z.string(),
    amount: z.number().int().positive(),
    date: z.string(),
})

const postSchema = expenseSchema.omit({id: true})

export const expensesRoutes = new Hono()
    .get('/', getUser, async (c)=>{
        const expenses = await Expenses.find({user_id: c.var.user.id})
        return c.json(expenses)
    })
    .post('/', getUser, zValidator('json', postSchema), async (c)=>{
        const data = c.req.valid('json')
        let new_expense_id = 1
        const get_expense_id = await Expenses.find({},'expense_id').sort({ expense_id: -1 }).limit(1)
        if (get_expense_id.length !== 0){
            new_expense_id = get_expense_id[0].expense_id + 1
        }
        const expense = new Expenses({
            expense_id: new_expense_id,
            date: data.date,
            user_id: c.var.user.id,
            title: data.title,
            amount: data.amount,
        })
        try{
            await expense.save()
            c.status(201)
        }catch(err){
            c.status(401)
        }
        return c.json(expense)
    })
    .get('/totalSpent', getUser, async (c)=>{
        const expenses = await Expenses.find({user_id: c.var.user.id})
        const total = expenses.reduce((acc, cur) => acc + cur.amount, 0)
        return c.json({total})
    })
    .delete('/:id{[0-9]+}', getUser, async (c)=>{
        const id = Number(c.req.param('id'))
        await Expenses.findOneAndDelete({expense_id: id, user_id: c.var.user.id})
        const expenses = await Expenses.find({user_id: c.var.user.id})
        return c.json(expenses)
    })