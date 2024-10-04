import moment from "moment";

// возвращает дату в формате yyyy-MM-dd
export function extractDate(date: string): string {
  return moment(date).toISOString(true).split("T")[0];
}

