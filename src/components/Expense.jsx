import { 
  LeadingActions, 
  SwipeableList, 
  SwipeableListItem, 
  SwipeAction, 
  TrailingActions 
} from "react-swipeable-list";
import 'react-swipeable-list/dist/styles.css';

import { formatDate } from "../helpers";

import IconSaving from '../img/icono_ahorro.svg'
import IconHouse from '../img/icono_casa.svg'
import IconFood from '../img/icono_comida.svg'
import IconExpense from '../img/icono_gastos.svg'
import IconRec from '../img/icono_ocio.svg'
import IconHealt from '../img/icono_salud.svg'
import IconSubs from '../img/icono_suscripciones.svg'

const dictionaryIcons = {
  Ahorro: IconSaving,
  Comida: IconFood,
  Casa: IconHouse,
  'Gastos Varios': IconExpense,
  Recreativos: IconRec,
  Salud: IconHealt,
  Suscripciones: IconSubs
}

function Expense({ 
                  expense, 
                  setEditSpent, 
                  deleteExpense 
                }) {
  const { id, name, amount, category, date } = expense;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={ () => setEditSpent(expense) }>
        Editar
      </SwipeAction>
    </LeadingActions> 
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={ () => deleteExpense(id) }
        destructive={ true }
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={ leadingActions() }
        trailingActions={ trailingActions() }
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img 
              src={ dictionaryIcons[category] } 
              alt={ 'Icono ' + { category } } 
            />

            <div className="descripcion-gasto">
              <p className="categoria">{ category }</p>
              <p className="nombre-gasto">{ name }</p>
              <p className="fecha-gasto">
                Agregado el: <span>{ formatDate(date) }</span>
              </p>
            </div>
          </div>

          <p className="cantidad-gasto">${ amount }</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense