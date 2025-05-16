import {
    addDays,
    differenceInDays,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isToday as isDateToday,
    isSameMonth,
    startOfMonth,
    startOfWeek
} from 'date-fns';
import { sv } from 'date-fns/locale';
import { useMemo } from 'react';
import type { CalendarDay } from '../types';

// Reference date: Friday, May 23rd, 2025 (Start of Week 1)
const REFERENCE_DATE = new Date(2025, 4, 23); // Month is 0-indexed

// Working day pattern (0 = Sunday, 1 = Monday, 2 = Tuesday, etc.)
// Week 1: Friday (5), Saturday (6), Sunday (0)
// Week 2: Wednesday (3), Thursday (4)
// Week 3: Monday (1), Tuesday (2)
const WORK_PATTERN = [
    [5, 6, 0], // Week 1
    [3, 4],    // Week 2
    [1, 2]     // Week 3
];

const TOTAL_DAYS_IN_PATTERN = 21; // 3 weeks

/**
 * Determines if the given date is a work day based on the 3-week rotating pattern
 */
const isWorkDay = (date: Date): boolean => {
    const daysSinceReference = differenceInDays(date, REFERENCE_DATE);

    // Handle dates before the reference
    if (daysSinceReference < 0) {
        // Adjust to get a positive number for modulo arithmetic
        const adjustedDays = ((daysSinceReference % TOTAL_DAYS_IN_PATTERN) + TOTAL_DAYS_IN_PATTERN) % TOTAL_DAYS_IN_PATTERN;
        const weekInCycle = Math.floor(adjustedDays / 7);
        const dayOfWeek = getDay(date); // 0-6, Sunday-Saturday

        return WORK_PATTERN[weekInCycle]?.includes(dayOfWeek) || false;
    }

    // Handle dates on or after the reference
    const dayInPattern = daysSinceReference % TOTAL_DAYS_IN_PATTERN;
    const weekInCycle = Math.floor(dayInPattern / 7);
    const dayOfWeek = getDay(date); // 0-6, Sunday-Saturday

    return WORK_PATTERN[weekInCycle]?.includes(dayOfWeek) || false;
};

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
