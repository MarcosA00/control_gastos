import ControlBudget from "./ControlBudget";
import NewBudget from "./NewBudget";

function Header({
  expenses,
  setExpenses,
  budget, 
  setBudget, 
  validBudget, 
  setValidBudget
}) {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      { validBudget ? (
        <ControlBudget 
          expenses = { expenses }
          setExpenses = { setExpenses }
          budget = { budget }
          setBudget = { setBudget }
          setValidBudget = { setValidBudget }
        />
      ) : (
        <NewBudget 
          budget = { budget }
          setBudget = { setBudget }
          setValidBudget = { setValidBudget }
        />
      ) }
    </header>
  )
}

export default Header;