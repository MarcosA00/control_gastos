import Expense from "./Expense";

function ExpensesList({ 
                       expenses, 
                       setEditSpent, 
                       deleteExpense,
                       filt,
                       expensesFilt
                     }) {
  return (
    <div className="listado-gastos contenedor">
      

      { filt ? (
          <div>
            <h2>{ expensesFilt.length ? 'Gastos' : 'Sin Gastos en Esta Categoria' }</h2>

            {expensesFilt.map(expense => (
              <Expense 
                key = { expense.id }
                expense = { expense }
                setEditSpent = { setEditSpent }
                deleteExpense = { deleteExpense }
              />
            ))}
          </div>
        ) : (
          <div>
            <h2>{ expenses.length ? 'Gastos' : 'Sin Gastos' }</h2>

            {expenses.map(expense => (
              <Expense 
                key = { expense.id }
                expense = { expense }
                setEditSpent = { setEditSpent }
                deleteExpense = { deleteExpense }
              />
            ))}
          </div>
        )
      }    
    </div>
  )
}

export default ExpensesList;