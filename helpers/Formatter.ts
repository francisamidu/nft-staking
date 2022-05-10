import { formatDistance } from "date-fns";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

class Formatter {
  static formatDate(date: number | Date) {
    const newDate = new Date(date);
    const day = DAYS[newDate.getDay()];
    const month = MONTHS[newDate.getMonth()];
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
  static formatDateSimple(date: number | Date) {
    const newDate = new Date(date);
    const date_ = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    return `${date_}/${month}/${year}`;
  }
  static formatDateRelative(date: Date) {
    return formatDistance(date, new Date(), {
      addSuffix: true,
    });
  }
  static formatCurrency(value: number | string) {
    const newNumber = Number(value);
    if (typeof newNumber === "number") {
      const formatter = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formatter.format(newNumber);
    } else {
      throw new Error(`${value} is not a number`);
    }
  }
  static formatCurrencyNumber(value: string | number) {
    const newValue = Number(
      String(value)
        .split("")
        .map((val) => Number(val))
        .filter((val) => val > -1)
        .join("")
    );
    return newValue;
  }
}
export default Formatter;
