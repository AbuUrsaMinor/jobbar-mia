import { describe, expect, it } from 'vitest';
import { isWorkDay } from '../utils/workSchedule';

describe('Work Schedule (user-specified dates only)', () => {
    it('isWorkDay correctly identifies work days in Week 1 (23, 24, 25 May 2025)', () => {
        expect(isWorkDay(new Date(2025, 4, 23))).toBe(true); // Friday
        expect(isWorkDay(new Date(2025, 4, 24))).toBe(true); // Saturday
        expect(isWorkDay(new Date(2025, 4, 25))).toBe(true); // Sunday
    });

    it('isWorkDay correctly identifies work days in Week 2 (28, 29 May 2025)', () => {
        expect(isWorkDay(new Date(2025, 4, 28))).toBe(true); // Wednesday
        expect(isWorkDay(new Date(2025, 4, 29))).toBe(true); // Thursday
    });

    it('isWorkDay correctly identifies work days in Week 3 (2, 3 June 2025)', () => {
        expect(isWorkDay(new Date(2025, 5, 2))).toBe(true); // Monday
        expect(isWorkDay(new Date(2025, 5, 3))).toBe(true); // Tuesday
    });
});