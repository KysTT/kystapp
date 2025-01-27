import { createFileRoute, Link } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

import { api } from '@/lib/api'

export const Route = createFileRoute(
  '/_authenticated/ExpensesTracker/createExpense',
)({
  component: CreateExpense,
})

function CreateExpense() {
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value })
      if (!res.ok) return toast('Bad request')
      form.reset()
      return toast('Expense has been created')
    },
  })
  return (
    <>
      <NavBar />
      <h2 className="max-w-md m-auto mb-4">Create expense</h2>
        <div className="p-2 gap-4 m-auto max-w-screen-md">
          <form
            className="grid max-w-md m-auto items-center gap-1.5"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <form.Field
              name="title"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Title is required'
                    : value.length < 3
                      ? 'Title must be at least 3 characters'
                      : undefined,
              }}
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>Title</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Grocery"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched &&
                    field.state.meta.errors.length ? (
                      <em>{field.state.meta.errors.join(', ')}</em>
                    ) : null}
                  </>
                )
              }}
            />
            <form.Field
              name="amount"
              validators={{
                onChange: ({ value }) =>
                  value <= 0 ? 'Amount must be a positive number' : undefined,
              }}
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>Amount</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      type="number"
                      placeholder="100"
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                    />
                    {field.state.meta.isTouched &&
                    field.state.meta.errors.length ? (
                      <em>{field.state.meta.errors.join(', ')}</em>
                    ) : null}
                  </>
                )
              }}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button className="mt-2 w-32" type="submit" disabled={!canSubmit}>
                  {isSubmitting ? '...' : 'Create expense'}
                </Button>
              )}
            />
          </form>
        </div>
        <Toaster />
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
