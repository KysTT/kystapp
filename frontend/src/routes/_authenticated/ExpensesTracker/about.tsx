import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/ExpensesTracker/about')({
  component: ExpensesTrackerAbout,
})

function ExpensesTrackerAbout() {
  return (
    <>
      <NavBar />
      <div className="p-2 gap-4 m-auto">Hello from About!</div>
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
        <Link to="/ExpensesTracker/about" className="[&.active]:font-bold">
          ExpensesTrackerAbout
        </Link>
      </div>
    </>
  )
}
