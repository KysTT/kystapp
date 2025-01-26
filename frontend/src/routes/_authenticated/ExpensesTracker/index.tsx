import {createFileRoute, Link } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export const Route = createFileRoute('/_authenticated/ExpensesTracker/')({
  component: ExpensesTrackerIndex,
})

async function getTotalSpent() {
  const res = await api.expenses['totalSpent'].$get()
  if (!res.ok) {
    throw new Error('Something went wrong')
  }
  return await res.json()
}

function ExpensesTrackerIndex() {
  const { isPending, error, data } = useQuery({
    queryKey: ['getTotalSpent'],
    queryFn: getTotalSpent,
  })
  if (error) return 'Error'

  return (
    <>
      <NavBar />

      <div className="p-2 gap-4 m-auto max-w-screen-md">
        <Card className="max-w-md m-auto">
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>Total amount you've spent</CardDescription>
          </CardHeader>
          <CardContent>{isPending ? '...' : data.total}</CardContent>
        </Card>
      </div>
    </>
  )
}

function NavBar() {
  return (
    <>
      <div className="p-2 flex gap-4 mb-2">
        <Link to="/ExpensesTracker" className="[&.active]:font-bold">
          ExpensesTrackerIndex
        </Link>
        <Link to="/ExpensesTracker/about" className="[&.active]:font-bold">
          ExpensesTrackerAbout
        </Link>
        <Link to="/ExpensesTracker/expenses" className="[&.active]:font-bold">
          ShowExpenses
        </Link>
        <Link to="/ExpensesTracker/createExpense" className="[&.active]:font-bold">
          createExpense
        </Link>
      </div>
    </>
  )
}
