import { Hono } from 'hono'
import { serveStatic } from "hono/bun";
import { expensesRoutes } from "./routes/expenses"
import { authRoutes } from "./routes/auth"
import { connectDB } from "./db/connectDB"

const app = new Hono()

connectDB()

const expensesApiRoutes =  app.basePath('/api').route('/expenses', expensesRoutes).route('/', authRoutes)

// when building
app.get('*', serveStatic({root: './frontend/dist'}))
app.get('*', serveStatic({root: './frontend/dist/index.html'}))

export default app
export type ExpensesApiRoutes = typeof expensesApiRoutes