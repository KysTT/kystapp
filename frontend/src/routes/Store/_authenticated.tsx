import {createFileRoute, Outlet} from '@tanstack/react-router'
import {userQueryOptions} from "@/lib/api.ts"

const Login = () =>{
    return (
        <div>
            You have to login first
            <br/>
            <a href="/api/login">Login</a>
        </div>
    )
}

const Component = () => {
    const { user } = Route.useRouteContext()
    if (!user) {
        return <Login />
    }
    return <Outlet />
}

export const Route = createFileRoute('/Store/_authenticated')({
    beforeLoad: async ({ context }) => {
        const queryClient = context.queryClient
        try{
            return await queryClient.fetchQuery(userQueryOptions)
        } catch(error) {
            return {user: null}
        }
    },
    component: Component
})

