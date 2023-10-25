import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker({ dateRange, updateChart }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Function to handle date selection
  const handleStartDateChange = (date) => {
    if (date < endDate) setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    if (date > startDate) setEndDate(date);
  };

  useEffect(() => {
    setStartDate(dateRange.earliestDate);
    setEndDate(dateRange.latestDate);
  }, [dateRange]);

  return (
    <div className="date-picker">
      <span>
        From:{" "}
        <DatePicker
          selected={startDate}
          onChange={(date) => handleStartDateChange(date)}
        />
      </span>
      <span>
        To:{" "}
        <DatePicker
          selected={endDate}
          onChange={(date) => handleEndDateChange(date)}
        />
      </span>
      <button onClick={() => updateChart(startDate, endDate)}>
        {" "}
        Update Chart{" "}
      </button>
    </div>
  );
}

export default CustomDatePicker;
