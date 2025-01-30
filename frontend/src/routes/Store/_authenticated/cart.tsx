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
import {useState} from "react";

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
    const [cart , setCart] = useState([])

    const subtractMutation = useMutation({
        mutationFn: subtractProductFromCart,
        onError: () => {
            return toast('Failed')
        },
        onSuccess: (data) => {
            setCart(data)
        },
    })

    const addMutation = useMutation({
        mutationFn: addProductToCart,
        onError: () => {
            return toast('Failed')
        },
        onSuccess: (data) => {
            setCart(data)
        },
    })

    const deleteMutation = useMutation({
        mutationFn: removeProductFromCart,
        onError: () => {
            return toast('Failed to remove product from cart')
        },
        onSuccess: (data) => {
            setCart(data)
        },
    })

    const {isPending, error, data} = useQuery({
        queryKey: ['getCart'],
        queryFn: getCart,
    })
    if (error) return 'Error'
    if (cart.length === 0) {
        if ( !isPending) {
            setCart(data)

        }
    }
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
                            )) : cart.map(({ product, quantity }, index) => (
                                <TableRow key={index}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        <Button
                                            disabled={quantity === 1}
                                            onClick={() => subtractMutation.mutate({json: product.product_id})}
                                            variant="ghost"
                                            size="icon"
                                            className="w-6 h-6 mr-2"
                                        >
                                            <MinusIcon/>
                                        </Button>
                                        {quantity}
                                        <Button
                                            key={index}
                                            disabled={quantity === product.stock}
                                            onClick={() => {
                                                addMutation.mutate({json: product.product_id})

                                            }}
                                            variant="ghost"
                                            size="icon"
                                            className="w-6 h-6 ml-2"
                                        >
                                            <PlusIcon/>
                                        </Button>
                                    </TableCell>
                                    <TableCell>{product.price * quantity}</TableCell>
                                    <TableCell>
                                        <Button
                                            disabled={deleteMutation.isPending}
                                            onClick={() => {
                                                deleteMutation.mutate({json: product.product_id})
                                            }}
                                            variant="ghost"
                                            size="icon"
                                            className="w-8 h-8"
                                        >
                                            <Trash/>
                                        </Button>
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

// function CheckoutButton(input: { json: any[] }) {
//
// }

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
                <Link to="/Store/editProduct" className="[&.active]:font-bold">
                    Edit Product
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