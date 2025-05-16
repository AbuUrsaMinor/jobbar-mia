import { isWeekend } from 'date-fns';

export const isWorkingDay = (date: Date): boolean => {
  return !isWeekend(date);
};

export const getWorkingDaysInMonth = (year: number, month: number): Date[] => {
  const workingDays: Date[] = [];
  const date = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    date.setDate(day);
    if (isWorkingDay(date)) {
      workingDays.push(new Date(date));
    }
  }

  return workingDays;
};