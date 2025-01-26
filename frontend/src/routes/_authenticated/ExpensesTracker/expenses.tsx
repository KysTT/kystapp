import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export const Route = createFileRoute(
  '/_authenticated/ExpensesTracker/expenses',
)({
  component: Expenses,
})

async function getAllExpenses() {
  const res = await api.expenses.$get()
  if (!res.ok) {
    throw new Error('Something went wrong')
  }
  return await res.json()
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ['getAllExpenses'],
    queryFn: getAllExpenses,
  })
  if (error) return 'Error'
  return (
    <>
      <NavBar />
      <div className="p-2 gap-4 m-auto max-w-screen-md">
      <Table className="border-2 m-auto">
        <TableCaption>A list of your expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-5">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell>
                <Skeleton className="h-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5" />
              </TableCell>
            </TableRow>
          ) : (
            data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
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
        <Link
          to="/ExpensesTracker/createExpense"
          className="[&.active]:font-bold"
        >
          createExpense
        </Link>
      </div>
    </>
  )
}
