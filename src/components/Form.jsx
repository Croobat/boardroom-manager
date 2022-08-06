import { useState, useEffect } from 'react'

const initialForm = {
  id: null,
  name: '',
  startDate: '',
  startTime: '',
  endTime: '',
}

function Form({ createData, updateData, dataToEdit, setDataToEdit, checkOverlap }) {
  const [form, setForm] = useState({ initialForm })

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check empty fields
    if (!form.name || !form.startDate || !form.startTime || !form.endTime) {
      alert('Datos incompletos')
      return
    }

    // Check older date
    let today = new Date();
    let inputDate = document.getElementById('inputDate').value;
    let inputStartTime = document.getElementById('inputStartTime').value;
    let inputStartHours = parseInt(inputStartTime.substring(0,2), 10)
    let inputStartMins = parseInt(inputStartTime.substring(3,5), 10)

    console.log([new Date(inputDate).getTime() + 94400000, today.getTime()])

    if (new Date(inputDate).getTime() + 94400000 < today.getTime()) {
      alert('Introduzca fecha futura')
      return
    } else if (new Date(inputDate).getDay() + 1 == today.getDay()) {
      if (inputStartHours * 60 + inputStartMins < today.getHours() * 60 + today.getMinutes()) {
         alert('Introduzca hora futura')
         return
      }
    }

    // Check 2 hours range
    let inputEndTime = document.getElementById('inputEndTime').value;
    let inputEndHours = parseInt(inputEndTime.substring(0,2), 10)
    let inputEndMins = parseInt(inputEndTime.substring(3,5), 10)
    let maxTimeRange = 2 * 60 //Maximum time range in minutes
    let timeDiff = Math.abs((inputEndHours * 60 + inputEndMins) - (inputStartHours * 60 + inputStartMins))

    if (timeDiff > maxTimeRange) {
      alert(`No se permiten reuniones mayores a ${maxTimeRange / 60} horas`)
      return
    }

    // Check empty schedule
    if (form.id === null) {
      createData(form)
    } else {
      updateData(form)
    }

    // Confirm overlaps
    checkOverlap(form)

    // Reset form
    handleReset()
  }

  const handleReset = (e) => {
    setForm(initialForm)
    setDataToEdit(null)
  }

  return (
    <div>
      <h2 className='formTitle'>{dataToEdit ? "Editar entrada" : "Agregar entrada"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Nombre'
          onChange={handleChange}
          value={form.name}
        />
        <input
          type='date'
          name='startDate'
          onChange={handleChange}
          value={form.startDate}
          id='inputDate'
        />
        <input
          type='time'
          name='startTime'
          onChange={handleChange}
          value={form.startTime}
          id='inputStartTime'
        />
        <input
          type='time'
          name='endTime'
          onChange={handleChange}
          value={form.endTime}
          id='inputEndTime'
        />
        <div className='buttons'>
          <input type='submit' value='Enviar' />
          <input type='reset' value='Limpiar' onClick={handleReset} />
        </div>
      </form>
    </div>
  )
}

export default Form
