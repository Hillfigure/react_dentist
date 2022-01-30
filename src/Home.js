import React from "react";
import "./App.css";
import Form from "./Form";

const Home = (props) => {

    return(
        <div>
            <Form addPerson={props.addPerson} dentistData={props.dentistData} addAppointment={props.addAppointment} makeDentistSick={props.makeDentistSick} /><br />
            <ul>
                <li>4 Dentists, 2 assistants, 150 appointments. Also 150 clients, I think duplicates in this assignment are unwanted in one month.</li>
                <li>All data in one js object</li>
                <li>Sort month and day view by time</li>
                <li>Add Dentist and Add Patient</li>
                <li>Make appointments with, and without assistant</li>
                <li>Several treatment types</li>
                <li>Working form and Buttons</li>
                <li>Make dentist sick</li>
                <li>Red background if dentist is sick</li>
                <li>Only able dentist can be chosen when treatment is set</li>
                <li></li>
                <li>Main focus: Make the logic work. Understand it and be able to apply it again.</li>
                <li>Further work would entail only implementations of the same filtering of state and styling</li>
            </ul>
        </div>
    )
}

export default Home;