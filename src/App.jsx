import React, { useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'
// import Moment from 'moment'
// import { extendedMoment } from 'moment-range'

const testDb = [
  {
    id: 1,
    name: 'Tony',
    startDate: '2022-08-12',
    startTime: '11:22',
    endTime: '13:20',
  },
  {
    id: 2,
    name: 'Abby',
    startDate: '2022-08-07',
    startTime: '10:25',
    endTime: '12:22',
  },
]

function App() {
  const [db, setDb] = useState(testDb)

  const [dataToEdit, setDataToEdit] = useState(null)

  const createData = (data) => {
    // Uso la fecha como id único solo por simplicidad
    data.id = Date.now()
    setDb([...db, data])
  }

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el))
    setDb(newData)
  }

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `Confirmar eliminación de registro con id '${id}'.`
    )

    if (isDelete) {
      let newData = db.filter((el) => el.id !== id)
      setDb(newData)
    } else {
      return
    }
  }

  const checkOverlap = (data, id) => {
    db.forEach(appointment => {
      if (data.startDate == appointment.startDate) {
        if ((data.startTime <= appointment.endTime) && (data.endTime >= appointment.startTime)) {
          // console.log('overlap')
          alert('Horario ocupado')
          let newData = db.filter((el) => el.id !== id)
          setDb(newData)
        }
      }
    })
    return
  }

  return (
    <>
      <div className="container">
        <header>
          <h1>Meeting room manager</h1>
        </header>
        <div className='body'>
          <div className="formContainer">
            <Form
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
              checkOverlap={checkOverlap}
            />
          </div>
          <Table
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        </div>
      </div>
    </>
  )
}

export default App
