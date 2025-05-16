export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWorkDay: boolean;
}

export interface CalendarMonth {
    days: CalendarDay[];
    month: number;
    year: number;
}
