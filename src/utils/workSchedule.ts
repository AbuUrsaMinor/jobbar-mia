import { differenceInCalendarDays } from 'date-fns';

// Reference date: Friday, May 23rd, 2025 (Start of cycle)
export const REFERENCE_DATE = new Date(2025, 4, 23); // Month is 0-indexed

// 21-day pattern: true = work day, false = off day
// [Fri, Sat, Sun, Mon, Tue, Wed, Thu, Fri, Sat, Sun, Mon, Tue, Wed, Thu, Fri, Sat, Sun, Mon, Tue, Wed, Thu]
// 23 May 2025 is Friday, so index 0 is a work day (Week 1: Fri, Sat, Sun),
// Week 2: Wed (28 May, index 5), Thu (29 May, index 6),
// Week 3: Mon (2 Jun, index 10), Tue (3 Jun, index 11)
const WORK_PATTERN_21 = [
    true,  // Fri (23 May)
    true,  // Sat (24 May)
    true,  // Sun (25 May)
    false, // Mon (26 May)
    false, // Tue (27 May)
    true,  // Wed (28 May)
    true,  // Thu (29 May)
    false, // Fri (30 May)
    false, // Sat (31 May)
    false, // Sun (1 Jun)
    true,  // Mon (2 Jun)
    true,  // Tue (3 Jun)
    false, // Wed (4 Jun)
    false, // Thu (5 Jun)
    false, // Fri (6 Jun)
    false, // Sat (7 Jun)
    false, // Sun (8 Jun)
    false, // Mon (9 Jun)
    false, // Tue (10 Jun)
    false, // Wed (11 Jun)
    false, // Thu (12 Jun)
];

export const isWorkDay = (date: Date): boolean => {
    const daysSinceReference = differenceInCalendarDays(date, REFERENCE_DATE);
    const dayInPattern = ((daysSinceReference % 21) + 21) % 21;
    return WORK_PATTERN_21[dayInPattern] || false;
};

export const getWeekInCycle = (date: Date): number => {
    const daysSinceReference = differenceInCalendarDays(date, REFERENCE_DATE);
    const dayInPattern = ((daysSinceReference % 21) + 21) % 21;
    if ([0, 1, 2].includes(dayInPattern)) return 1;
    if ([5, 6].includes(dayInPattern)) return 2;
    if ([10, 11].includes(dayInPattern)) return 3;
    // Not a work day, but assign to week by position
    if (dayInPattern < 7) return 1;
    if (dayInPattern < 14) return 2;
    return 3;
};
