import { Hono } from 'hono'
import { serveStatic } from "hono/bun";
import { expensesRoutes } from "./routes/expenses"
import { storeRoutes } from "./routes/store"
import { authRoutes } from "./routes/auth"
import { connectDB } from "./db/connectDB"

const app = new Hono()

connectDB()

const ApiRoutes =  app.basePath('/api')
    .route('/expenses', expensesRoutes)
    .route('/', authRoutes)
    .route('/store', storeRoutes)

app.use('*', serveStatic({root: './frontend/dist/',}))
app.notFound((c)=>{
    return c.redirect('/')
})

export default app
export type ApiRoutes = typeof ApiRoutes