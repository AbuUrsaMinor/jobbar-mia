import React from 'react';
import { useCalendar } from '../hooks/useCalendar';

const Calendar: React.FC = () => {
  const { workingDays, currentMonth, nextMonth, prevMonth } = useCalendar();

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="bg-blue-500 text-white px-4 py-2 rounded">
          Previous
        </button>
        <h2 className="text-xl font-bold">{currentMonth}</h2>
        <button onClick={nextMonth} className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </header>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }, (_, index) => (
          <div key={index} className="font-bold text-center">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</div>
        ))}
        {Array.from({ length: 42 }, (_, index) => {
          const day = index - new Date(currentMonth).getDay() + 1;
          const date = new Date(new Date(currentMonth).setDate(day));
          const isWorkingDay = workingDays.includes(date.toDateString());

          return (
            <div key={index} className={`p-2 text-center ${isWorkingDay ? 'bg-green-200' : 'bg-gray-200'}`}>
              {day > 0 && day <= new Date(currentMonth).getDate() ? day : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;