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

  const deleteData = async (id, isEdit = false) => {
    let isDelete = true
    if (!isEdit) {
      isDelete = window.confirm(
        `Confirmar eliminación de registro con id '${id}'.`
      )
    }

    await fetch(`http://localhost:5000/meetings/${id}`, {
      method: 'DELETE'
    })

    if (isDelete || isEdit) {
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

  const checkOld = () => {
    db.forEach(appointment => {
      // Check older date
      let today = new Date();
      let appDate = appointment.startDate;
      let appEndTime = appointment.endTime;
      let appEndHours = parseInt(appEndTime.substring(0,2), 10)
      let appEndMins = parseInt(appEndTime.substring(3,5), 10)

      console.log(appDate, today.toISOString().slice(0,10))
      console.log(appEndHours * 60 + appEndMins, today.getHours() * 60 + today.getMinutes())

      if (new Date(appDate).getTime() + 95400000 < today.getTime()) {
        deleteData(appointment.id, true)
        // console.log(`id ${appointment.id} old date`)
        return
      } else if ((appDate == today.toISOString().slice(0,10)) && (appEndHours * 60 + appEndMins < today.getHours() * 60 + today.getMinutes())) {
        deleteData(appointment.id, true)
        // console.log(`id ${appointment.id} old time`)
      }
    })
  }

  const MINUTE_MS = 60000
  useEffect(() => {
    const interval = setInterval(() => {
      checkOld()
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [])

  checkOld()

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
