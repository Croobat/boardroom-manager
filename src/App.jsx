import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Table from './components/Table'
// import Moment from 'moment'
// import { extendedMoment } from 'moment-range'

const testDb = []

function App() {
  const [db, setDb] = useState(testDb)

  const [dataToEdit, setDataToEdit] = useState(null)

  useEffect(() => {
    const getMeetings = async () => {
      const meetingsFromServer = await fetchMeetings()
      setDb(meetingsFromServer)
    }

    getMeetings()
  }, [])

  // Fetch meetings
  const fetchMeetings = async () => {
    const fres = await fetch('http://localhost:5000/meetings')
    const fdata = await fres.json()

    return fdata
  }

  const createData = async (data) => {
    const res = await fetch('http://localhost:5000/meetings', {
      method: 'POST',
      headers: {
      'Content-type': 'application/json'
    },
      body: JSON.stringify(data)
    })

    // Uso la fecha como id único solo por simplicidad
    data.id = Date.now()
    setDb([...db, data])
  }

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el))
    setDb(newData)
  }

  const deleteData = async (id) => {
    let isDelete = window.confirm(
      `Confirmar eliminación de registro con id '${id}'.`
    )

    await fetch(`http://localhost:5000/meetings/${id}`, {
      method: 'DELETE'
    })

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
