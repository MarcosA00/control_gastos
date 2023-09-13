import { useState, useEffect, forwardRef } from "react"
import Message from "./Message";
import CerrarBtn from '../img/cerrar.svg'

function Modal({ setModal, 
                 animateModal, 
                 setAnimateModal, 
                 saveExpense,
                 editSpent,
                 setEditSpent
              }) {
// States
  const [message, setMessage] = useState('');

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');

// useStates
  useEffect(() => {
    if(Object.keys(editSpent).length > 0) {
      setName(editSpent.name);
      setAmount(editSpent.amount);
      setCategory(editSpent.category);
      setDate(editSpent.date);
      setId(editSpent.id);
    }
  }, [])

// Funcionalidad
  const hideModal = () => {
    setAnimateModal(false);
    setEditSpent({});

    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const handleSubmit = e => {
    e.preventDefault();

    if([ name, amount, category ].includes('') || name === 0) {
      setMessage('Todos los campos son Obligatorios');

      setTimeout(() => {
        setMessage('');
      }, 3000);

      return
    }

      saveExpense({ name, amount, category, date, id });
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
          src={ CerrarBtn } 
          alt="Cerrar modal" 
          onClick={ hideModal }
        />
      </div>

      <form 
        className={ `formulario ${animateModal ? "animar" : "cerrar"}` }
        onSubmit={ handleSubmit }
      >
        <legend>{ editSpent.name ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>

        { message && <Message tipo="error">{ message }</Message> }

        <div className="campo">
          <label htmlFor="name">Nombre del Gasto</label>

          <input 
            id="name"
            type="text" 
            placeholder="Añade el Nombre del Gasto"
            value={ name }
            onChange={ e => setName(e.target.value) }
          />
        </div>

        <div className="campo">
          <label htmlFor="amount">Cantidad</label>

          <input 
            id="amount"
            type="number" 
            placeholder="Añade la Cantidad del Gasto  ej. 300"
            value={ amount }
            onChange={ e => setAmount(Number(e.target.value)) }
          />
        </div>

        <div className="campo">
          <label htmlFor="category">Categoría</label>

          <select 
            id="category"
            value={ category }
            onChange={ e => setCategory(e.target.value) }
          >
            <option value="">-- Seleccionar --</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos Varios">Gastos Varios</option>
            <option value="Recreativos">Recreativos</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>

        <input 
          type="submit"
          value={ editSpent.name ? 'Guardar Cambios' : 'Añadir Gasto' }
        />
      </form>
    </div>
  )
}

export default Modal;