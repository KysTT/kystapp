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
import { useQuery, useMutation } from '@tanstack/react-query'
import { api, deleteExpense } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import {useState} from "react";

export const Route = createFileRoute(
  '/ExpensesTracker/_authenticated/expenses',
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
  const [expenses, setExpenses] = useState([])
  const { isPending, error, data } = useQuery({
    queryKey: ['getAllExpenses'],
    queryFn: getAllExpenses,
  })
  if (error) return 'Error'

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      return toast(`Failed to delete expense`)
    },
    onSuccess: (data) => {
      setExpenses(data)
      return toast(`Successfully deleted expense`)
    },
  })

  if (expenses.length === 0) {
    if ( !isPending) {
      if (data.length !==0){
        setExpenses(data)
      }
    }
  }

  return (
    <>
      <NavBar />
      <div className="p-2 gap-4 m-auto max-w-screen-sm">
        <Table className="border-2 m-auto">
          <TableCaption>A list of your expenses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-5">Id</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead></TableHead>
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
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5" />
                </TableCell>
              </TableRow>
            ) : (
                expenses.map(({ amount, expense_id, date, title }, index) => (
                <TableRow key={index}>
                  <TableCell>{expense_id}</TableCell>
                  <TableCell className="w-40">{date}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell className="w-32">{amount}</TableCell>
                  <TableCell className="w-5">
                    <Button
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate({expense_id})}
                        variant="outline"
                        size="icon"
                    >
                      <Trash />
                    </Button>
                  </TableCell>
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
