import {createFileRoute, Link} from '@tanstack/react-router'
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    addProductToCart,
    api,
    removeProductFromCart,
    subtractProductFromCart,
    userRoleQueryOptions,
    checkout
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
    console.log('getting cart')
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
    if (!isPending && !error) return data
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
    let afterDelete = false, newData = false

    const subtractMutation = useMutation({
        mutationFn: subtractProductFromCart,
        onError: () => {
            return toast('Failed')
        },
        onSuccess: (data) => {
            setCart(data)
            newData = true
        },
    })

    const addMutation = useMutation({
        mutationFn: addProductToCart,
        onError: () => {
            return toast('Failed')
        },
        onSuccess: (data) => {
            setCart(data)
            newData = true
        },
    })

    const deleteMutation = useMutation({
        mutationFn: removeProductFromCart,
        onError: () => {
            return toast('Failed to remove product from cart')
        },
        onSuccess: (data) => {
            setCart(data)
            newData = true
            afterDelete = true
        },
    })

    const checkoutMutation = useMutation({
        mutationFn: checkout,
        onError: () => {
            return toast('Failed to checkout')
        },
        onSuccess: (data) => {
            setCart(data)
            newData = true
            return toast('Checkout successful')
        },
    })

    const {isPending, error, data} = useQuery({
        queryKey: ['getCart'],
        queryFn: getCart,
    })
    if (error) return 'Error'

    if ( !isPending ) {
        if (data.length !== 0 && cart.length === 0) {
            newData = true
        }
    }

    if (newData){
        if ( cart.length === 0 && afterDelete) {
            setCart([])
            afterDelete = false
        }
        if ( !isPending ) {
            if ( data.length !== 0 ) {
                newData = false
                setCart(data)
                console.log('set data')
            }
        }
        newData = false
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
                                            disabled={quantity <= 1}
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
                                            disabled={quantity >= product.stock}
                                            onClick={() => addMutation.mutate({json: product.product_id})}
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
                                )
                            )
                        }
                    </TableBody>
                </Table>
                <div className="mt-4">
                    {cart.length !== 0? (
                        <Button
                            disabled={checkoutMutation.isPending}
                            onClick={() => {
                                checkoutMutation.mutate({json: cart})
                            }}
                        >
                            Checkout
                        </Button>
                    ):(<></>)}
                </div>
            </div>
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