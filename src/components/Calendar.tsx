import { addDays, addMonths, format, startOfWeek, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useCalendar } from '../hooks/useCalendar';
import type { CalendarDay } from '../types';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const { days } = useCalendar(month, year);

    // Get weekday names in Swedish
    const getWeekdayNames = (): string[] => {
        const weekStart = startOfWeek(new Date(), { locale: sv });
        return Array.from({ length: 7 }).map((_, i: number) => {
            const day = addDays(weekStart, i);
            return format(day, 'EEEEEE', { locale: sv }); // Short weekday name
        });
    };

    // Format date in Swedish
    const formatDate = (date: Date, formatStr: string): string => {
        return format(date, formatStr, { locale: sv });
    };

    const weekdays = getWeekdayNames();

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => subMonths(prevDate, 1));
    }; const handleNextMonth = () => {
        setCurrentDate(prevDate => addMonths(prevDate, 1));
    };

    // Add swipe handlers for mobile navigation
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleNextMonth(),
        onSwipedRight: () => handlePreviousMonth(),
        trackMouse: false,
        preventScrollOnSwipe: true
    });

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">                <button
                onClick={handlePreviousMonth}
                className="bg-transparent hover:bg-gray-100 text-gray-800 py-2 px-6 rounded-md transition-colors min-w-[120px] border border-gray-200"
            >
                &laquo; Föregående
            </button>                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    {formatDate(currentDate, 'MMMM yyyy')}
                    <span className="ml-2 text-xs text-gray-400 hidden sm:inline">(svep för att byta månad)</span>
                </h2>
                <button
                    onClick={handleNextMonth}
                    className="bg-transparent hover:bg-gray-100 text-gray-800 py-2 px-6 rounded-md transition-colors min-w-[120px] border border-gray-200"
                >
                    Nästa &raquo;
                </button>
            </div>            <div {...swipeHandlers} className="grid grid-cols-7 gap-2 mt-4 touch-pan-y">
                {/* Weekday headers */}
                {weekdays.map((day: string, index: number) => (
                    <div
                        key={index}
                        className="text-center py-2 text-gray-500 text-sm uppercase tracking-wider"
                    >
                        {day}
                    </div>
                ))}

                {/* Calendar days */}
                {days.map(({ date, isCurrentMonth, isToday, isWorkDay }: CalendarDay, index: number) => (
                    <div
                        key={index}
                        className={`
              p-1 h-12 border-0 flex flex-col items-center justify-center
              ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'} 
              ${isToday ? 'ring-1 ring-pink-500' : ''}
              ${isWorkDay ? 'bg-pink-50' : ''}
              rounded
            `}
                    >                        <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>
                            {date.getDate()}
                        </span>
                        {isWorkDay && (
                            <span className="text-pink-500 text-xs">
                                ❤
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
