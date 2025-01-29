import { Hono } from 'hono'
import { kindeClient, sessionManager, getUser} from '../kinde.ts'
import {User} from "../db/schema/user.ts";

export const authRoutes = new Hono()
    .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c))
    return c.redirect(loginUrl.toString())
})
    .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c))
    return c.redirect(registerUrl.toString())
})
    .get("/callback", async (c) => {
        const url = new URL(c.req.url)
        await kindeClient.handleRedirectToApp(sessionManager(c), url)
        return c.redirect("/")
    })
    .get("/logout", async (c) => {
        const logoutUrl = await kindeClient.logout(sessionManager(c))
        return c.redirect(logoutUrl.toString())
    })
    .get("/me", getUser, async (c)=>{
        const user = c.var.user
        const findUser = await User.find({user_id: c.var.user.id})
        if ( findUser.length === 0){
            const user_db = new User({
                user_id: c.var.user.id,
            })
            await user_db.save()
        }
        return c.json({ user })
    })
    .get("/userRole", getUser, async (c)=>{
        const findUser = await User.find({user_id: c.var.user.id}, 'role')
        return c.json({ role: findUser[0].role })
    })
