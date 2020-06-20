import { addWeeks, startOfWeek, isBefore, getYear } from "date-fns";

/** 
 * Returns a date which is the first Monday in August
 * NUS Academic Year commences on first Monday of August each Year 
 */
function getAcadYearStartDate(acadYear) {
  const year = acadYear.split('-')[0];
  const firstDateOfMonth = new Date(year, 7, 1, 0, 0,0);
  const nearestMonday = startOfWeek(firstDateOfMonth, { weekStartsOn: 1});
  
  if (isBefore(nearestMonday, firstDateOfMonth)) {
    const firstMonday = addWeeks(nearestMonday, 1);
    return firstMonday;
  }
  return nearestMonday;
}

/** 
 * Returns the Academic Year given a date
 */
function getAcadYear(date) {
  const year = getYear(date);
  let acadYear = `${year}-${year + 1}`;
  let startDate = getAcadYearStartDate(acadYear);
  if (isBefore(date, startDate)) {
    acadYear = `${year - 1}-${year}`;
  }
  return acadYear;
}

export default {
  getAcadYear
}
