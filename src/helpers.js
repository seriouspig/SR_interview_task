export function findEarliestAndLatestDates(interactions) {
  if (interactions.length === 0) {
    return {
      earliestDate: null,
      latestDate: null,
    };
  }

  let earliestDate = new Date(interactions[0].date);
  let latestDate = new Date(interactions[0].date);

  interactions.forEach((interaction) => {
    const currentDate = new Date(interaction.date);

    if (currentDate < earliestDate) {
      earliestDate = currentDate;
    }

    if (currentDate > latestDate) {
      latestDate = currentDate;
    }
  });

  return {
    earliestDate,
    latestDate,
  };
}

export function filterDataByDate(data, startDate, endDate) {
  // Parse the start and end dates
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  // Filter the data based on the date range
  const filteredData = data.interactions.filter((interaction) => {
    const interactionDate = new Date(interaction.date);
    return interactionDate >= startDate && interactionDate <= endDate;
  });

  return { interactions: filteredData };
}
