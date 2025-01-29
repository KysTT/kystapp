import {createFileRoute, Link} from '@tanstack/react-router'
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    addProductToCart,
    api,
    removeProductFromCart,
    subtractProductFromCart,
    userRoleQueryOptions
} from "@/lib/api.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {Skeleton} from "@/components/ui/skeleton"
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";
import {Trash, PlusIcon, MinusIcon} from "lucide-react";

async function getCart() {
    const res = await api.store['cart'].$get()
    if (!res.ok) {
        throw new Error('Something went wrong')
    }
    return await res.json()
}

export const Route = createFileRoute('/Store/_authenticated/cart')({
    component: RouteComponent,
})

function getRole() {
    const {isPending, error, data} = useQuery(userRoleQueryOptions)
    if (isPending) return 'loading'
    if (error) return 'Error'
    return data.role
}

function RouteComponent() {
    const userRole = getRole()
    if (userRole === "admin") {
        return (
            <>
                <NavBarAdmin/>
                <RenderCart/>
            </>
        )
    }
    return (
        <>
            <NavBarUser/>
            <RenderCart/>
        </>
    )
}

function RenderCart() {
    const {isPending, error, data} = useQuery({
        queryKey: ['getCart'],
        queryFn: getCart,
    })
    if (error) return 'Error'
    return (
        <>
            <div className="p-2 gap-4 m-auto max-w-screen-md">
                <Table className="m-auto max-w-screen-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isPending
                            ? Array(3).fill(0).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Skeleton className="h-5"/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5"/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5"/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5"/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5"/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5"/>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5"/>
                                    </TableCell>
                                </TableRow>
                            )) : data.map(({ product, quantity }) => (
                                <TableRow>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        <SubtractQuantityButton json={[product.product_id, quantity]}/>
                                        {quantity}
                                        <AddQuantityButton json={[product.product_id, quantity, product.stock]}/>
                                    </TableCell>
                                    <TableCell>{product.price * quantity}</TableCell>
                                    <TableCell>
                                        <DeleteProductFromCartButton json={product.product_id}/>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

function DeleteProductFromCartButton(product_id: { json: number }) {
    const mutation = useMutation({
        mutationFn: removeProductFromCart,
        onError: () => {
            return toast('Failed to remove product from cart')
        },
        onSuccess: () => {
            return toast('Successfully removed')
        },
    })

    return (
        <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate(product_id)}
            variant="outline"
            size="icon"
            className="w-6 h-6"
        >
            <Trash/>
        </Button>
    )
}

function SubtractQuantityButton(input: { json: any[] }) {
    const product_id = input.json[0]
    const quantity = input.json[1]
    const mutation = useMutation({
        mutationFn: subtractProductFromCart,
        onError: () => {
            return toast('Failed')
        },
        onSuccess: () => {
            return toast("Success")
        },
    })
    return (
        <>
            <Button
                disabled={Number(quantity) === 1}
                onClick={() => mutation.mutate({json: product_id})}
                variant="ghost"
                size="icon"
                className="w-6 h-6 mr-2"
            >
                <MinusIcon/>
            </Button>
        </>
    )
}

function AddQuantityButton(input: { json: any[] }) {
    const product_id = input.json[0]
    const quantity = input.json[1]
    const stock = input.json[2]
    const mutation = useMutation({
        mutationFn: addProductToCart,
        onError: () => {
            return toast('Failed to add to cart')
        },
        onSuccess: () => {
            return toast("Successfully added product")
        },
    })
    return (
        <>
            <Button
                disabled={quantity === stock}
                onClick={() => mutation.mutate({json: product_id})}
                variant="ghost"
                size="icon"
                className="w-6 h-6 ml-2"
            >
                <PlusIcon/>
            </Button>
        </>
    )
}

function NavBarAdmin() {
    return (
        <>
            <div className="p-2 flex gap-4 mb-2">
                <Link to="/Store" className="[&.active]:font-bold">
                    Store
                </Link>
                <Link to="/Store/cart" className="[&.active]:font-bold">
                    Cart
                </Link>
                <Link to="/Store/createProduct" className="[&.active]:font-bold">
                    Create Product
                </Link>
            </div>
        </>
    )
}

function NavBarUser() {
    return (
        <>
            <div className="p-2 flex gap-4 mb-2">
                <Link to="/Store" className="[&.active]:font-bold">
                    Store
                </Link>
                <Link to="/Store/cart" className="[&.active]:font-bold">
                    Cart
                </Link>
            </div>
        </>
    )
}