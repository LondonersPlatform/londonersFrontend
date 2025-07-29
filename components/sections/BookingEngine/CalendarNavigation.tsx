
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';

interface CalendarNavigationProps {
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
}

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentMonth,
  onMonthChange,
}) => {
  return (


    
    <div className="flex items-center justify-between px-4 py-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onMonthChange(subMonths(currentMonth, 1))}
        className="hover:bg-gray-100 rounded-full "
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onMonthChange(addMonths(currentMonth, 1))}
        className="hover:bg-gray-100 rounded-full "
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};