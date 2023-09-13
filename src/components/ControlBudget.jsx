import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'

function ControlBudget({ 
                        expenses,
                        setExpenses,
                        budget,
                        setBudget,
                        setValidBudget
                      }) {
  const [percentage, setPercentage] = useState(0);
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    const totalSpent = expenses.reduce((total, spent) => spent.amount + total, 0);

    const totalAvailable = budget - totalSpent;

    // Calcular porcentaje gastado.
    const newPersentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);

    setSpent(totalSpent);
    setAvailable(totalAvailable);

    setTimeout(() => {
      setPercentage(newPersentage);
    }, 1000);
  }, [expenses])

  const formatAmount = amount => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }

  const handleResetApp = () => {
    const result = confirm('¿Deseas reiniciar el presupuesto y los gastos?');

    if(result) {
      setExpenses([]);
      setBudget(0);
      setValidBudget(false);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar 
          value={ percentage }
          styles={ buildStyles({
            pathColor: percentage >= 40 && percentage < 70 
                       ? '#55B21F'
                       : percentage >= 70 && percentage < 100
                       ? '#F0C802' 
                       : percentage >= 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: percentage >= 40 && percentage < 70 
                       ? '#55B21F'
                       : percentage >= 70 && percentage < 100
                       ? '#F0C802' 
                       : percentage >= 100 ? '#DC2626' : '#3B82F6'
          }) }
          text={ `${percentage}% Gastado` }
        />
      </div>

      <div className="contenido-presupuesto">
          <button
            className="reset-app"
            type="button"
            onClick={ handleResetApp }
          >
            Resetear App
          </button>

          <p>
            <span>Presupuesto: </span> { formatAmount(Number(budget)) } 
          </p>

          <p className={ `${percentage >= 100 
                            ? 'negativo' 
                            : percentage >= 70 && percentage < 100 
                            ? 'precaucion'
                            : percentage >= 40 && percentage < 70
                            ? 'nice' 
                            : ''
                       }` }>
            <span>Disponible: </span> { formatAmount(Number(available)) } 
          </p>

          <p className={ `${percentage > 100 
                            ? 'negativo' 
                            : percentage >= 70 && percentage < 100 
                            ? 'precaucion' 
                            : percentage >= 40 && percentage < 70
                            ? 'nice'
                            : ''
                       }` }>
            <span>Gastado: </span> { formatAmount(Number(spent)) } 
          </p>
      </div>
    </div>
  )
}

export default ControlBudget;