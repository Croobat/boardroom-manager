import React from 'react'
import TableRow from './TableRow'

function Table({ data, setDataToEdit, deleteData }) {
  return (
    <div>
      <h2 className='tableTitle'>Reuniones pendientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora de inicio</th>
            <th>Hora de fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan='3'>Sin reuniones</td>
            </tr>
          ) : (
            data.map((el) => (
              <TableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
