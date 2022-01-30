import React from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

export default ({ time, patient, dentist, getDentistHealth }) => (
  <div className={getDentistHealth(dentist) ? "ill" : "appointment"}>
    <span className="time">{format_time(time)}</span>
    <span className="patient">{patient}</span>
  </div>
);
