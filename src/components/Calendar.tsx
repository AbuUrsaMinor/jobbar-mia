import { addDays, addMonths, format, startOfWeek, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useCalendar } from '../hooks/useCalendar';
import type { CalendarDay } from '../types';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
    const [animating, setAnimating] = useState(false);
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const calendarRef = useRef<HTMLDivElement>(null);

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
        if (animating) return;
        setSlideDirection('right');
        setAnimating(true);
        setTimeout(() => {
            setCurrentDate(prevDate => subMonths(prevDate, 1));
            setAnimating(false);
        }, 300);
    };
    const handleNextMonth = () => {
        if (animating) return;
        setSlideDirection('left');
        setAnimating(true);
        setTimeout(() => {
            setCurrentDate(prevDate => addMonths(prevDate, 1));
            setAnimating(false);
        }, 300);
    };

    // Add swipe handlers for mobile navigation
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleNextMonth(),
        onSwipedRight: () => handlePreviousMonth(),
        trackMouse: false,
        preventScrollOnSwipe: true
    });

    return (
        <div className="w-full max-w-3xl mx-auto overflow-x-hidden" style={{ touchAction: 'pan-y' }}>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePreviousMonth}
                    aria-label="Föregående månad"
                    className="bg-transparent hover:bg-gray-100 text-gray-800 py-2 px-2 rounded-md transition-colors min-w-[44px] border border-gray-200 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex flex-col items-center flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        {formatDate(currentDate, 'MMMM')}
                    </h2>
                    <span className="text-lg font-semibold text-gray-700 text-center -mt-1 mb-1">
                        {formatDate(currentDate, 'yyyy')}
                    </span>
                    <span className="text-xs text-gray-400 mt-1 block sm:hidden">&larr; Svep för att byta månad &rarr;</span>
                </div>
                <button
                    onClick={handleNextMonth}
                    aria-label="Nästa månad"
                    className="bg-transparent hover:bg-gray-100 text-gray-800 py-2 px-2 rounded-md transition-colors min-w-[44px] border border-gray-200 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
            <div
                {...swipeHandlers}
                ref={calendarRef}
                className={`grid grid-cols-7 gap-1 sm:gap-2 mt-2 sm:mt-4 touch-pan-y transition-transform duration-300 ${slideDirection && animating ? (slideDirection === 'left' ? 'animate-slide-left' : 'animate-slide-right') : ''}`}
                onAnimationEnd={() => setSlideDirection(null)}
            >
                {/* Weekday headers */}
                {weekdays.map((day: string, index: number) => (
                    <div
                        key={index}
                        className="text-center py-2 text-gray-500 text-xs sm:text-sm uppercase tracking-wider"
                    >
                        {day}
                    </div>
                ))}

                {/* Calendar days */}
                {days.map(({ date, isCurrentMonth, isToday, isWorkDay }: CalendarDay, index: number) => (
                    <div
                        key={index}
                        className={`p-1 h-10 sm:h-12 border-0 flex flex-col items-center justify-center ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'} ${isToday ? 'ring-1 ring-pink-500' : ''} ${isWorkDay ? 'bg-pink-50' : ''} rounded w-full`}
                    >
                        <span className={`text-xs sm:text-sm ${isToday ? 'font-bold' : ''}`}>{date.getDate()}</span>
                        {isWorkDay && (
                            <span className="text-pink-500 text-xs">❤</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;

// Add slide animation to index.css:
// @keyframes slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
// @keyframes slide-right { from { transform: translateX(-100%); } to { transform: translateX(0); } }
// .animate-slide-left { animation: slide-left 0.3s cubic-bezier(0.4,0,0.2,1); }
// .animate-slide-right { animation: slide-right 0.3s cubic-bezier(0.4,0,0.2,1); }
