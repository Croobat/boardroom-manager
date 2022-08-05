import React, { useState } from 'react'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'

const testDb = [
  {
    id: 1,
    name: 'Tony',
    startDate: "2022-08-12",
    startTime: "11:22",
    endTime: "13:20"
  },
  {
    id: 2,
    name: 'Abby',
    startDate: "2022-08-07",
    startTime: "10:25",
    endTime: "12:22"
  },
]

function CrudApp() {
  const [db, setDb] = useState(testDb)

  const [dataToEdit, setdataToEdit] = useState(null)

  const createData = (data) => {
    // Uso la fecha como id único solo por simplicidad
    data.id = Date.now();
    setDb([...db, data]);
   }

  const updateData = (data) => {}

  const deleteData = (id) => {}

  return (
    <>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setdataToEdit}
      />
      <CrudTable data={db} setdataToEdit={setdataToEdit} deleteData={deleteData}/>
    </>
  )
}

export default CrudApp
