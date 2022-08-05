import React from 'react'

function CrudTableRow({ el }) {
  return (
    <tr>
      <td>{el.name}</td>
      <td>{el.startTime.toDateString()}</td>
      <td>{el.startTime.toTimeString().slice(0, 8)}</td>
      <td>{el.endTime.toTimeString().slice(0, 8)}</td>
      <td>
        <button>Editar</button>
        <button>Eliminar</button>
      </td>
    </tr>
  )
}

export default CrudTableRow
