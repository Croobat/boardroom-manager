import React from 'react'

function TableRow({ el, setDataToEdit, deleteData }) {
  let { id, name, startDate, startTime, endTime } = el

  function edit(el,id) {
    setDataToEdit(el)
    deleteData(id, true)
  }

  return (
    <tr>
      <td>{el.name}</td>
      <td>{el.startDate}</td>
      <td>{el.startTime}</td>
      <td>{el.endTime}</td>
      <td>
        {/* <button onClick={"setDataToEdit(el); deleteData(id, true)"}> Editar </button> */}
        <button onClick={() => edit(el,id)}> Editar </button>
        <button onClick={() => deleteData(id)}> Eliminar </button>
      </td>
    </tr>
  )
}

export default TableRow
