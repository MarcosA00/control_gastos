import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import ExpensesList from './components/ExpensesList';
import Modal from './components/Modal';
import { getId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
// States
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [validBudget, setValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  );

  const [editSpent, setEditSpent] = useState({});

  const [filt, setFilt] = useState('');
  const [expensesFilt, setExpensesFilt] = useState([]);

// useEffect
  useEffect(() => {
    if(Object.keys(editSpent).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 500);
    }
  }, [editSpent]);

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    if(filt) {
      const expensesFilt =  expenses.filter(expense => expense.category === filt);

      setExpensesFilt(expensesFilt);
    }
  }, [filt]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;

    if(budgetLS > 0) {
      setValidBudget(true);
    }
  }, []);

// Funcionalidad

  const handleNewExpense = () => {
    setModal(true);
    setEditSpent({})

    setTimeout(() => {
      setAnimateModal(true);
    }, 500);
  }

  const saveExpense = expense => {
    if(expense.id) {
      const actualExpenses = expenses.map(expenseState => expenseState.id === expense.id ? expense : expenseState);

      setExpenses(actualExpenses);
      setEditSpent({});
    }else {
      expense.id =getId();
      expense.date = Date.now();
      setExpenses([ ...expenses, expense ]);
    }

    setAnimateModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const deleteExpense = id => {
    const actualExpenses = expenses.filter(expense => expense.id !== id);

    setExpenses(actualExpenses);
  }

  return (
    <div className={ modal ? 'fijar' : '' }>
      <Header 
        expenses = { expenses }
        setExpenses = { setExpenses }
        budget = { budget }
        setBudget = { setBudget }
        validBudget = { validBudget }
        setValidBudget = { setValidBudget }
      />

      {validBudget &&
        <div>
          <main>
            <Filter 
              filt = { filt }
              setFilt = { setFilt }
            />

            <ExpensesList
              expenses = { expenses }
              setEditSpent = { setEditSpent }
              deleteExpense = { deleteExpense }
              filt = { filt }
              expensesFilt = { expensesFilt }
            />
          </main>

          <div className='nuevo-gasto'>
            <img 
              src={ IconoNuevoGasto } 
              alt="Icono Nuevo Gasto"
              onClick={ handleNewExpense }
            />
          </div>
        </div>
      }
      
      { modal && <Modal
                   setModal = { setModal } 
                   animateModal = { animateModal }
                   setAnimateModal = { setAnimateModal }
                   saveExpense = { saveExpense }
                   editSpent = { editSpent }
                   setEditSpent = { setEditSpent }
                 /> }
    </div>
  )
}

export default App
