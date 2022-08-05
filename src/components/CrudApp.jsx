import React, { useState } from 'react'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'

const testDb = [
  {
    id: 1,
    name: 'Tony',
    startTime: new Date(2022, 8, 5, 11, 22),
    endTime: new Date(2022, 8, 5, 13, 20),
  },
  {
    id: 2,
    name: 'Abby',
    startTime: new Date(2022, 8, 7, 10, 22),
    endTime: new Date(2022, 8, 7, 12, 22),
  },
  {
    id: 3,
    name: 'Tania',
    startTime: new Date(2022, 8, 5, 8, 22),
    endTime: new Date(2022, 8, 7, 10, 22),
  },
]

function CrudApp() {
  const [db, setdb] = useState(testDb)
  return (
    <>
      <h1>CRUD App</h1>
      <CrudForm />
      <CrudTable data={db} />
    </>
  )
}

export default CrudApp
