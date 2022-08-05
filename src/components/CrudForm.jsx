import { useState, useEffect } from 'react'

const initialForm = {
  id: null,
  name: "",
  startTime: null,
  endTime: null
}

function CrudForm() {
  const [form, setform] = useState({ initialForm })
  const handleChange = (e) => {  }
  const handleSubmit = (e) => {  }
  const handleReset = (e) => {  }

  return (
    <div>
      <h3>Agregar</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={form.name} />
        <input type="datetime-local" name="startTime" onChange={handleChange} value={form.startTime} />
        <input type="datetime-local" name="endTime" onChange={handleChange} value={form.endTime} />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  )
}

export default CrudForm
