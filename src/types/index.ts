export interface WorkingDay {
  date: string; // ISO format date string
  isWorkingDay: boolean; // Indicates if the date is a working day
}

export type CalendarProps = {
  workingDays: WorkingDay[]; // Array of working days to be highlighted in the calendar
};