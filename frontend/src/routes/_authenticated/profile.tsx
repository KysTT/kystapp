import { createFileRoute } from '@tanstack/react-router'
import { userQueryOptions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions)
  if (isPending) return 'loading'
  if (error) return 'Not logged in'

  return (
    <>
      <p>hello {data.user.given_name}</p>
      <a href="/api/logout">Logout</a>
    </>
  )
}
