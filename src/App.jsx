import { useState, useEffect } from "react";
import Chart from "./Chart";
import CustomDatePicker from "./DatePicker";
import { filterDataByDate, findEarliestAndLatestDates } from "./helpers";

function App() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [dateRange, setDateRange] = useState({});

  useEffect(() => {
    const apiUrl = "https://substantive.pythonanywhere.com/";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data)
        setDateRange(findEarliestAndLatestDates(data.interactions));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const updateChart = (startDate,endDate) => {
    setDateRange({
      earliestDate: startDate,
      latestDate: endDate
    })
    setFilteredData(filterDataByDate(data, startDate, endDate))
  };

  return (
    <>
      <div className="container">
        <CustomDatePicker dateRange={dateRange} updateChart={updateChart}/>
        {data ? (
          <Chart data={filteredData.interactions} />
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}

export default App;
