import { useState, useEffect } from 'react';
import { isWorkingDay } from '../utils/dateUtils';

const useCalendar = () => {
  const [workingDays, setWorkingDays] = useState<Date[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorkingDays = async () => {
      // Simulate fetching working days from an API or database
      const days = [];
      const startDate = new Date(); // Start from today
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // End of the month

      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        if (isWorkingDay(date)) {
          days.push(new Date(date));
        }
      }

      setWorkingDays(days);
      setLoading(false);
    };

    fetchWorkingDays();
  }, []);

  return { workingDays, loading };
};

export default useCalendar;