import React from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

export default ({ time, patient_name, dentist_name, assistant, treatment, dentist, getDentistHealth}) => (
  <li className={getDentistHealth(dentist) ? "ill" : "appointment"}>
    <div className="time">{format_time(time)}</div>
    <div className="patient">Patiënt: {patient_name}</div>
    <div className="dentist">Tandarts: {dentist_name}</div>
    <div className="assistant">Assistent: {assistant}</div>
    <div className="assistant">Treatment: {treatment}</div>
  </li>
);
