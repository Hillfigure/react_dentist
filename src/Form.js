import React, { useState } from "react";

const Form = (props) => {

    const [capableDentists, setCapableDentists] = useState(props.dentistData.dentists);
    const [inputs, setInputs] = useState( {type: "patient"} );
    const [appointmentInputs, setAppointmentInputs] = useState( {treatment: ""} );
    const [illDentist, setIllDentist] = useState();

    const handleChange = (input, value) => {
        setInputs({...inputs, [input]:value})
    }

    const handleAppointmentChange = (input, value) => {
        setAppointmentInputs({...appointmentInputs, [input]:value})
        if(input === "treatment") {
            if(value === "") {
                setCapableDentists(props.dentistData.dentists)
            } else {
            setCapableDentists(props.dentistData.dentists.filter(
                         dentist => dentist.skills[value] === true)
                )
            }
        }
    }

    const handleSickDentist = (value) => {
        setIllDentist({...illDentist, dentist:value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addPerson(inputs)
        setInputs({
            type: "",
            name: "",
            surname: "",
            email: "",
            phone: "",
            gender: "",
            ill: false,
            dateofbirth: "",
            skills: {
              teethpull: false,
              headremoval: false,
              facings: false,
              needlessdrilling: false
            }
        })
    }

    const handleAppointmentSubmit = (event) => {
        event.preventDefault();
        props.addAppointment(appointmentInputs)
        setAppointmentInputs({
            treatment: "",
            dentist: "",
            day: "",
            time: "",
            patient: "",
            assistant: "",
        })
    }

    const submitIllDentist = (event) => {
        event.preventDefault();
        props.makeDentistSick(illDentist.dentist)
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>Add Person
                <select
                    value={inputs.type}
                    name="type" 
                    // IS THIS SAFE??
                    onChange={event => handleChange("type", event.target.value)}
                >
                    <option value="">Choose Type</option>
                    <option value="patient">Patient</option>
                    <option value="dentist">Dentist</option>
                </select>
                <input type="text" value={inputs.name} placeholder="First Name" onChange={event => handleChange("name", event.target.value)}  />
                <input type="text" value={inputs.surname}placeholder="Surname" onChange={event => handleChange("surname", event.target.value)}  required />
                <select value={inputs.gender} onChange={event => handleChange("gender", event.target.value)} required>Gender
                    <option value="">Choose Gender</option>
                    <option value="man">Man</option>
                    <option value="vrouw">Vrouw</option>
                    <option value="trans">Trans</option>
                    <option value="alles">Alles</option>
                </select>
                <input type="text" value={inputs.email} placeholder="E-mail" onChange={event => handleChange("email", event.target.value)}  required />
                <input type="tel" value={inputs.phone} placeholder="Phone" onChange={event => handleChange("phone", event.target.value)}  required />
                <input type="text" value={inputs.dateofbirth} placeholder="Date of Birth" onChange={event => handleChange("dateofbirth", event.target.value)}  required />
                <p className={inputs.type === 'dentist' ? 'dentist' : 'client'}>
                    <input type="checkbox" id="Cavity" name="Cavity" />
                    <label htmlFor="Cavity">Cavity</label>
                    <input type="checkbox" id="Head Removal" name="Head Removal" />
                    <label htmlFor="Head Removal">Head Removal</label>
                    <input type="checkbox" id="Facings" name="Facings" />
                    <label htmlFor="Facings">Facings</label>
                    <input type="checkbox" id="Needless Drilling" name="Needless Drilling" />
                    <label htmlFor="Needless Drilling">Needless Drilling</label>
                </p>
                <button type="submit" value={"Submit"}>submit</button>
            </form>

            <form onSubmit={handleAppointmentSubmit}>Appointments
                <select value={appointmentInputs.patient} onChange={event => handleAppointmentChange("patient", event.target.value)} required>Patient
                    <option value="">Choose Patient</option>
                    {props.dentistData.patients.map(patient => 
                        <option key={patient.id} value={patient.id}>{patient.name + " " + patient.surname}</option>)}
                </select>
                <select value={appointmentInputs.treatment} onChange={event => handleAppointmentChange("treatment", event.target.value)} required>Treatments
                    <option value="">Choose Treatment</option>
                    <option value="cavity">Cavity</option>
                    <option value="headremoval">Head Removal</option>
                    <option value="facings">Facings</option>
                    <option value="needlessdrilling">Needless Drilling</option>
                </select>
                <select value={appointmentInputs.dentist} onChange={event => handleAppointmentChange("dentist", event.target.value)} required>Dentist
                <option value="">Choose Dentist</option>
                {capableDentists.map(dentist => 
              <option key={dentist.id} value={dentist.id}>{dentist.name + " " + dentist.surname}</option>)}
                </select>
                <select value={appointmentInputs.day} onChange={event => handleAppointmentChange("day", event.target.value)} required>Dag
                    <option value="">Choose Day</option>
                    <option value="1">Maandag</option>
                    <option value="2">Dinsdag</option>
                    <option value="3">Woensdag</option>
                    <option value="4">Donderdag</option>
                    <option value="5">Vrijdag</option>
                </select>
                <select value={appointmentInputs.time} onChange={event => handleAppointmentChange("time", event.target.value)} required>Tijd
                    <option value="">Choose Time</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="17">17:00</option>
                </select>                
                <select value={appointmentInputs.assistant} onChange={event => handleAppointmentChange("assistent", event.target.value)}>Assistant
                    <option value="">Choose Assistant</option>
                    {props.dentistData.assistants.map(assistant => 
                        <option key={assistant.id} value={assistant.id}>{assistant.name + " " + assistant.surname}</option>)}
                </select>
                <button type="submit">submit</button>
            </form>

            <form onSubmit={submitIllDentist}>
            <select onChange={event => handleSickDentist(event.target.value)} required>
                <option value="">Choose Ill Dentist</option>
                {capableDentists.map(dentist => 
              <option key={dentist.id} value={dentist.id}>{dentist.name + " " + dentist.surname}</option>)}
            </select>
            <button type="submit">submit</button>
            </form>
        </main>
    )               
}

export default Form;                                                