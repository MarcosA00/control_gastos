import { useState, useEffect } from "react"

function Filter({ filt, setFilt }) {
  return (
    <div className="filtros sombra contenedor">
      <form >
        <div className="campo">
          <label>Filtrar Gastos</label>

          <select
            value={ filt }
            onChange={ e => setFilt(e.target.value) }
          >
            <option value="">Todos los Gastos</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos Varios">Gastos Varios</option>
            <option value="Recreativos">Recreativos</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filter;