import React from "react";
import "./Day.css";
import AppointmentInDay from "./AppointmentInDay";

export default ({ appointments, getDentistHealth }) => {
  const appointmentsJSX = appointments.map(
    ({ time, patient_name, dentist_name, assistant, treatment, dentist }, index) => (
      <AppointmentInDay
        time={time}
        patient={patient_name}
        dentist_name={dentist_name}
        dentist={dentist}
        assistant={assistant}
        patient_name={patient_name}
        key={index}
        treatment={treatment}
        getDentistHealth={getDentistHealth}
      />
    )
  )
  return <ul className="dayview">{appointmentsJSX}</ul>;
};
