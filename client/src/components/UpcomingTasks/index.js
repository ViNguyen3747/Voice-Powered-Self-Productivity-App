import React, { useState } from "react";

import Calendar, { CalendarDayHeader } from "./Calendar";
import "../common/Styles/commonStyles.css";
import Form from "../common/Form";
const Upcoming = () => {
  const [yearAndMonth, setYearAndMonth] = useState([
    new Date().getFullYear(),
    new Date().getMonth() + 1,
  ]);
  const [currentId, setCurrentId] = useState(null);
  return (
    <div className="container">
      <div className="wrapper">
        <Form
          setCurrentId={setCurrentId}
          currentId={currentId}
          rerouting="upcoming"
        />
      </div>
      <div className="wrapper">
        <Calendar
          yearAndMonth={yearAndMonth}
          onYearAndMonthChange={setYearAndMonth}
          setCurrentId={setCurrentId}
          renderDay={(calendarDayObject) => (
            <div>
              <CalendarDayHeader calendarDayObject={calendarDayObject} />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Upcoming;
