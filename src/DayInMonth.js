import React from "react";
import AppointmentInMonth from "./AppointmentInMonth";

export default ({ appointments, getDentistHealth }) => {
  const appointmentsJSX = appointments.map(({ time, patient_name, patient, dentist }, index) => (
    <AppointmentInMonth time={time} patient={patient_name} patient_id={patient} dentist={dentist} key={index} getDentistHealth={getDentistHealth} />
  ));
  return <div className="day">{appointmentsJSX}</div>;
};
