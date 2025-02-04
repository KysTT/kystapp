import { createFileRoute } from '@tanstack/react-router'
import {changeUserRole, userQueryOptions, userRoleQueryOptions} from '@/lib/api'
import {useMutation, useQuery} from '@tanstack/react-query'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button} from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {toast} from "sonner";
import {useState} from "react";

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
    const [role, setRole] = useState("")
    let newRole = false
    const { isPending, error, data } = useQuery(userQueryOptions)
    if (isPending) return 'loading'
    if (error) return 'Not logged in'

    const { isPending: isPendingRole, error: errorRole, data: dataRole } = useQuery(userRoleQueryOptions)

    if (!isPendingRole && !errorRole) if (!role || newRole) {
        newRole = false
        setRole(dataRole)
    }

    const changeRoleMutation = useMutation({
        mutationFn: changeUserRole,
        onError: () => {
            return toast('Failed')
        },
        onSuccess: (data) => {
            setRole(data)
            newRole = true
            return toast('Success')
        },
    })

    return (
    <>
        <Card className="w-fit m-auto">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-2">
                        Hello {data.user.given_name}
                        <Avatar>
                            <AvatarFallback>{data.user.given_name[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    Your role is {role}
                </div>
                <div>
                    <Button
                        className="mt-4"
                        variant="outline"
                        disabled={changeRoleMutation.isPending}
                        onClick={() => changeRoleMutation.mutate()}
                    >
                        Change role
                    </Button>
                </div>
            </CardContent>
            <CardFooter>

                <a href="/api/logout">
                    <Button >
                        Logout
                    </Button>
                </a>
            </CardFooter>
        </Card>
    </>
  )
}
//
// function UserRole(){
//     const [role, setRole] = useState("")
//
//     const { isPending, error, data: data1 } = useQuery(userRoleQueryOptions)
//
//     if (isPending) return 'loading'
//     if (error) return 'Error'
//     if (!role) setRole(data1)
//
//     const changeRoleMutation = useMutation({
//         mutationFn: changeUserRole,
//         onError: () => {
//             return toast('Failed')
//         },
//         onSuccess: (data) => {
//             setRole(data)
//             return toast('Success')
//         },
//     })
//
//     return (
//         <div>
//             <div>
//                 Your role is {role}
//             </div>
//             <div>
//                 <Button
//                     className="mt-4"
//                     disabled={changeRoleMutation.isPending}
//                     onClick={() => changeRoleMutation.mutate()}
//                 >
//                     Change role
//                 </Button>
//             </div>
//         </div>
//     )
// }