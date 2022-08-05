import React from 'react'

function CrudTable() {
  return (
    <div>
      <h3>Tabla de datos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Hora de inicio</th>
            <th>Hora de fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tony</td>
            <td>2022 8 5 11 22</td>
            <td>2022 8 5 13 20</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable
