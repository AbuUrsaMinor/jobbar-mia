import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    isToday as isDateToday,
    isSameMonth,
    startOfMonth,
    startOfWeek
} from 'date-fns';
import { sv } from 'date-fns/locale';
import { useMemo } from 'react';
import type { CalendarDay } from '../types';
import { isWorkDay } from '../utils/workSchedule';

/**
 * Custom hook to generate calendar data for a given month
 */
export const useCalendar = (month: number, year: number) => {
    const calendarDays = useMemo(() => {
        const firstDayOfMonth = new Date(year, month, 1);
        const startDate = startOfWeek(startOfMonth(firstDayOfMonth), { locale: sv });
        const endDate = endOfWeek(endOfMonth(firstDayOfMonth), { locale: sv });

        const days: CalendarDay[] = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            days.push({
                date: new Date(currentDate),
                isCurrentMonth: isSameMonth(currentDate, firstDayOfMonth),
                isToday: isDateToday(currentDate),
                isWorkDay: isWorkDay(currentDate)
            });
            currentDate = addDays(currentDate, 1);
        }

        return {
            days,
            month,
            year
        };
    }, [month, year]);

    return calendarDays;
};

/**
 * Helper function to format dates in Swedish format
 */
export const formatDate = (date: Date, formatString: string): string => {
    return format(date, formatString, { locale: sv });
};

/**
 * Get weekday names in Swedish
 */
export const getWeekdayNames = (): string[] => {
    const weekStart = startOfWeek(new Date(), { locale: sv });
    return Array.from({ length: 7 }).map((_, i) => {
        const day = addDays(weekStart, i);
        return formatDate(day, 'EEEEEE'); // Short weekday name
    });
};
