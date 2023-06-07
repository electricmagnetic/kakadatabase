import React from "react";
import moment from "moment";

/**
  Constructs a simple select field with times at 15 mins intervals.
 */
const TimeSelector = (inputAttributes) => {
  var hourChoices = [];
  const interval = 15;

  Array.from(new Array(24)).forEach((object, hour) => {
    Array.from(new Array(4)).forEach((object, minuteIndex) => {
      const minute = minuteIndex * interval;
      const value = `${hour}:${minute}`;

      hourChoices.push({
        value: moment(value, "H:mm").format("H:mm"),
        display_name: moment(value, "H:mm").format("h:mm A"),
      });
    });
  });

  return (
    <select {...inputAttributes}>
      {hourChoices.map((option) => (
        <option value={option.value} key={option.value}>
          {option.display_name}
        </option>
      ))}
    </select>
  );
};

export default TimeSelector;
