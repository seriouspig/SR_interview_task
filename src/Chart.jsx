import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    const dataPoint = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>
          <strong>
            {dataPoint.sector_id}.{dataPoint.name}
          </strong>
        </p>
        <p>
          <strong>Number of Interactions:</strong>{" "}
          {dataPoint.number_of_occurrences}
        </p>
        <p>
          <strong>Percentage:</strong> {dataPoint.percentage}%
        </p>
      </div>
    );
  }
  return null;
};

const Chart = ({data}) => {

  const occurrences = {};
  const totalPercentage = data.length;

  // Iterate through the interactions and count occurrences
  data.forEach((interaction) => {
    const key = `${interaction.name}-${interaction.sector_id}`;
    if (occurrences[key]) {
      occurrences[key].number_of_occurrences++;
      occurrences[key].percentage = (
        (occurrences[key].number_of_occurrences / totalPercentage) *
        100
      ).toFixed(1);
    } else {
      occurrences[key] = {
        name: interaction.name,
        sector_id: interaction.sector_id,
        number_of_occurrences: 1,
        percentage: ((1 / totalPercentage) * 100).toFixed(1),
      };
    }
  });

  // Convert the occurrences object to an array
  const resultArray = Object.values(occurrences);

  // Sort the resultArray in ascending order by number_of_occurrences
  resultArray.sort((a, b) => b.number_of_occurrences - a.number_of_occurrences);

  // Get the width of the screen
  const setChartSize = () => {
    return (window.innerWidth <= 768) ?  window.innerWidth * 0.8 : 600;
  }


  return (
    <BarChart width={setChartSize()} height={600} data={resultArray} layout="vertical">
      <XAxis
        type="number"
        dataKey="percentage"
        stroke="#229E9E"
        domain={[0, Math.ceil(parseFloat(resultArray[0].percentage))]}
        label={{ value: "Percentage", position: "top", fontSize: 12 }}
      />
      <YAxis
        dataKey="name"
        type="category"
        width={150}
        axisLine={false}
        tick={{ fontSize: 12, width: 200, textAnchor: "end" }}
      />
      <Tooltip content={<CustomTooltip />} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="percentage" fill="#229E9E" barSize={30} />
    </BarChart>
  );
};

export default Chart;
