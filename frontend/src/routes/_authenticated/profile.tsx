import { createFileRoute } from '@tanstack/react-router'
import {userQueryOptions, userRoleQueryOptions} from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
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

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function getRole() {
    const { isPending, error, data } = useQuery(userRoleQueryOptions)
    if (isPending) return 'loading'
    if (error) return 'Error'
    return data.role
}

function Profile() {
    const { isPending, error, data } = useQuery(userQueryOptions)
    if (isPending) return 'loading'
    if (error) return 'Not logged in'

    const userRole = getRole()

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
                    Your role is {userRole}
                </div>
            </CardContent>
            <CardFooter>
                <a href="/api/logout">
                    <Button>
                        Logout
                    </Button>
                </a>
            </CardFooter>
        </Card>
    </>
  )
}
