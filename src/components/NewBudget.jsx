import { useState } from "react";
import Message from "./Message";

function NewBudget({ 
  budget, 
  setBudget,
  setValidBudget
}) {
  const [message, setMessage] = useState('');

  const handleBudget = (e) => {
    e.preventDefault();

    if(budget <= 0) {
      setMessage('No es un presupuesto valido');

      return
    }

    setMessage('');
    setValidBudget(true);
    
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={ handleBudget }>
        <div className="campo">
          <label>Definir Presupuesto</label>

          <input 
            className="nuevo-presupuesto"
            type="number" 
            placeholder="Añade tu Presupuesto"
            value={ budget }
            onChange={ (e) => setBudget(e.target.value) }
          />
        </div>

        <input 
          className=""
          type="submit"
          value="Añadir"
        />

        { message && <Message tipo="error">{ message }</Message> }
      </form>
    </div>
  )
}

export default NewBudget;