import { type ExpensesApiRoutes } from '@server/app'
import { hc } from 'hono/client'
import { queryOptions } from "@tanstack/react-query";

const client = hc<ExpensesApiRoutes>('/')

export const api = client.api

async function getCurrentUser() {
    const res = await api.me.$get()
    if (!res.ok){
        throw new Error('Something went wrong')
    }
    return await res.json()
}

export const userQueryOptions = queryOptions({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,
    staleTime: Infinity
})