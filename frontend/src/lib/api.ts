import { type ApiRoutes } from '@server/app'
import { hc } from 'hono/client'
import { queryOptions } from "@tanstack/react-query";

const client = hc<ApiRoutes>('/')

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

export async function addProductToCart(product_id: {json: any}) {
    const res = await api.store["addToCart"].$post(product_id)
    if (!res.ok){
        throw new Error('Something went wrong')
    }
}

export async function subtractProductFromCart(product_id: {json: any}) {
    const res = await api.store["subtractFromCart"].$post(product_id)
    if (!res.ok){
        throw new Error('Something went wrong')
    }
}

export async function removeProductFromCart(product_id: any) {
    const res = await api.store["removeFromCart"].$post(product_id)
    if (!res.ok){
        throw new Error('Something went wrong')
    }
}