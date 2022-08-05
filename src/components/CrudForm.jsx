import React from 'react'

function CrudForm() {
  const handleChange = (e) => {  }
  const handleSubmit = (e) => {  }
  const handleReset = (e) => {  }

  return (
    <div>
      <h3>Agregar</h3>
      <form>
        <input type="text" name="name" placeholder="Nombre" />
        <input type="datetime-local" name="startTime" />
        <input type="datetime-local" name="endTime" />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" />
      </form>
    </div>
  )
}

export default CrudForm
