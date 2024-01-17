export default function Dateformater(input: Date): string {
  const outputDateString = input.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return outputDateString;
}
