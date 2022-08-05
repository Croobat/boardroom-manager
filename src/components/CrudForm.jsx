import { useState, useEffect } from 'react'

const initialForm = {
  id: null,
  name: '',
  startDate: '',
  startTime: '',
  endTime: '',
}

function CrudForm({ createData, updateData, dataToEdit, setDataToEdit }) {
  const [form, setForm] = useState({ initialForm })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check empty fields
    if (!form.name || !form.startDate || !form.startTime || !form.endTime) {
      alert("Datos incompletos");
      return;
    }

    // Check older date

    // Check 2 hours range

    // Check occupied time

    // Check empty schedule
    if(form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    // Reset form
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h2>Agregar</h2>
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
        />
        <input
          type='time'
          name='startTime'
          onChange={handleChange}
          value={form.startTime}
        />
        <input
          type='time'
          name='endTime'
          onChange={handleChange}
          value={form.endTime}
        />
        <input type='submit' value='Enviar' />
        <input type='reset' value='Limpiar' onClick={handleReset} />
      </form>
    </div>
  )
}

export default CrudForm
