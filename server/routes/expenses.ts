import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { getUser } from "../kinde.ts"

const expenseSchema = z.object({
    id: z.number().int().positive(),
    title: z.string(),
    amount: z.number().int().positive(),
})

type Expense = z.infer<typeof expenseSchema>

const postSchema = expenseSchema.omit({id: true})

const fakeExpenses: Expense[] = [
    {id: 1, title: 'Expense 1', amount: 1},
    {id: 2, title: 'Expense 2', amount: 10},
    {id: 3, title: 'Expense 3', amount: 100},
]

export const expensesRoutes = new Hono()
    .get('/', getUser, async (c)=>{
        return c.json({expenses: fakeExpenses})
    })
    .post('/', getUser, zValidator('json', postSchema) ,async (c)=>{
        const expense = c.req.valid('json')
        fakeExpenses.push({...expense, id:fakeExpenses.length + 1})
        c.status(201)
        return c.json(expense)
    })
    .get('/totalSpent', getUser, async (c)=>{
        const total = fakeExpenses.reduce((acc, cur) => acc + cur.amount, 0)
        return c.json({total})
    })
    .get('/:id{[0-9]+}', getUser, (c)=>{
        const id = c.req.param('id')
        return c.json({id: id})
    })
    .delete('/:id{[0-9]+}', getUser, (c)=>{
        const id = c.req.param('id')
        return c.json({id: id})
    })