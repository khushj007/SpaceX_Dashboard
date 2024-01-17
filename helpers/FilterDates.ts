export default function FilterDates(
  dataArray: Record<string, any>[],
  startDate: string,
  endDate: string
): Record<string, any>[] {
  const startdate: Date = new Date(startDate);
  const enddate: Date = new Date(endDate);
  const filteredArray = dataArray.filter((item) => {
    const itemDate: Date = new Date(item.date_utc.split("T")[0]);
    return itemDate >= startdate && itemDate <= enddate;
  });
  console.log(filteredArray);
  return filteredArray;
}
