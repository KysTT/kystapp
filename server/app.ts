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

// run built
app.get('*', serveStatic({root: './frontend/dist'}))
app.get('*', serveStatic({root: './frontend/dist/index.html'}))

export default app
export type ApiRoutes = typeof ApiRoutes