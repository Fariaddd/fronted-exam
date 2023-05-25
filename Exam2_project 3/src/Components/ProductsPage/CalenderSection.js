import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const css = `
.rdp:not([dir='rtl']) .rdp-day_range_start:not(.rdp-day_range_end){
  background-color: #090909
}
.rdp:not([dir='rtl']) .rdp-day_range_start:not(.rdp-day_range_end){
  color: white
}
.rdp-day_range_middle{
  background-color: #09090910
}
.rdp:not([dir='rtl']) .rdp-day_range_end:not(.rdp-day_range_start){
  background-color: #090909
}
.rdp:not([dir='rtl']) .rdp-day_range_end:not(.rdp-day_range_start){
  color: white
}
.rdp-day_range_end.rdp-day_range_start{
  background-color: #090909
}
.rdp-day_range_end.rdp-day_range_start{
  color: white
}
.rdp-day_range_end.rdp-day_range_start:hover:not([disabled]){
  background-color: #090909
}
`;
const CalenderSection = ({ setStartNEndDate, children }) => {
  const [selectedDate, setSelectedDate] = React.useState();
  useEffect(() => {
    setStartNEndDate(selectedDate);
  }, [selectedDate]);
  return (
    <div className="flex flex-col items-center justify-center pb-[22px] z-0">
      <style>{css}</style>
      <DayPicker
        mode="range"
        modifiersClassNames={{
          selected: "my-selected",
          today: "my-today",
        }}
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      {
        children
      }
    </div>
  );
};

export default CalenderSection;
