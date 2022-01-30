import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Calendar from "./Calendar";
import Day from "./Day";
import generateAppointments, { data } from "./utils";

const appointments = generateAppointments(250);

const App = () => {

  const [ dentistData, setDentistData ] = useState(() => {
    return Object.assign(data, appointments)
  })

  const addPerson = (person) => {
    const type = person.type === "dentist" ? "dentists" : "patients";
    delete person.type;
    person.id = Math.floor(Math.random() * 1000);
    setDentistData((prevState => {
      prevState[type].push(person);
      return({...prevState})
    }))
  }

  const getPatientName = (patient_id) => {
    const patient = dentistData.patients.find( ({id}) => id === patient_id)
    return patient.name +" "+ patient.surname
  }
  
  const getDentistName = (dentist_id) => {
    const dentist = dentistData.dentists.find( ({id}) => id === dentist_id)
    return dentist.name +" "+ dentist.surname
  }

  const addAppointment = (appointment) => {
    appointment.patient = parseInt(appointment.patient)
    appointment.day = parseInt(appointment.day)
    appointment.time = parseInt(appointment.time)

    appointment.patient_name = getPatientName(appointment.patient)
    appointment.dentist_name = getDentistName(appointment.dentist)

    setDentistData((prevState => {
      prevState.appointments.push(appointment);
      return({...prevState})
    }))
  }

  const makeDentistSick = (dentistId) => {
    const sickDentist = dentistData.dentists.find(({id}) => id === dentistId)
    sickDentist.ill = !sickDentist.ill;
    const index = dentistData.dentists.findIndex(({id}) => id === dentistId)
    setDentistData({ ...dentistData, ...dentistData.dentists, [index]: sickDentist })
  }

  const getDentistHealth = (dentistId) => {
    if(dentistId){
      const dentist = dentistData.dentists.find(({id}) => id === dentistId)
      return dentist.ill;
    }
  }

  const filterNextDay = () => {
    return dentistData.appointments.filter(app => app.day === 1).sort((a, b) => a.time - b.time)
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar view</Link>
            </li>
            <li>
              <Link to="/day">Day view</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route path="/calendar">
              <Calendar appointments={dentistData.appointments} getDentistHealth={getDentistHealth} />
            </Route>
            <Route path="/day">
              <Day appointments={filterNextDay()} getDentistHealth={getDentistHealth} />
            </Route>
            <Route path="/">
              <Home addPerson={addPerson} dentistData={dentistData} addAppointment={addAppointment} makeDentistSick={makeDentistSick} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
export default App;