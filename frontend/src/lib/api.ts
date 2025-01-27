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

async function getCurrentUserRole() {
    const res = await api.userRole.$get()
    if (!res.ok){
        throw new Error('Something went wrong')
    }
    return await res.json()
}

export const userRoleQueryOptions = queryOptions({
    queryKey: ['getCurrentUserRole'],
    queryFn: getCurrentUserRole,
    staleTime: Infinity
})

export async function deleteExpense({ id }: { id: number }) {
    const res = await api.expenses[":id{[0-9]+}"].$delete({param: {id: id.toString()}})
    if (!res.ok){
        throw new Error('Something went wrong')
    }
}