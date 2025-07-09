
import React, { useState } from 'react';
import { addMonths, isSameDay, isAfter, isBefore, differenceInDays } from 'date-fns';
import { DateRangeHeader } from './BookingEngine/DateRangeHeader';
import { CalendarNavigation } from './BookingEngine/CalendarNavigation';
import { CalendarMonth } from './BookingEngine/CalendarMonth';
import { DateRangeFooter } from './BookingEngine/DateRangeFooter';


interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangePickerListProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onClose: () => void;
  availableDates:any;
  minNights?:any
}

export const DateRangePickerList: React.FC<DateRangePickerListProps> = ({
  dateRange,
  minNights,
  onDateRangeChange,
  onClose,
  availableDates
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7)); // August 2025
    const nextMonth = addMonths(currentMonth, 1);
  const [selectingStart, setSelectingStart] = useState(true);
  const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);




  // Calculate nights based on dateRange
  const nights = dateRange.from && dateRange.to 
    ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleDateClick = (date: Date) => {
    if (selectingStart || !dateRange.from) {
      onDateRangeChange({ from: date, to: undefined });
      setSelectingStart(false);
    } else {
      if (isBefore(date, dateRange.from)) {
        onDateRangeChange({ from: date, to: dateRange.from });
      } else {
        onDateRangeChange({ from: dateRange.from, to: date });
      }
      setSelectingStart(true);
    }
    setHoverDate(undefined);
  };

  const clearDates = () => {
    onDateRangeChange({ from: undefined, to: undefined });
    setSelectingStart(true);
    setHoverDate(undefined);
  };

  return (
<div className=' relative'>
      <div className="bg-white scale-100 rounded-3xl     border-gray-200 w-[850px] max max-w-[90vw] ">
      <DateRangeHeader
        dateRange={dateRange}
        className={''}
        hideDatesPreview={true}
        nights={nights}
        
        onDateRangeChange={onDateRangeChange}
      />

      <CalendarNavigation
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />

      <div className="grid lg:grid-cols-2 lg:px-4 pb-6 gap-8">
        <CalendarMonth
       availableDates={availableDates}
          month={currentMonth}
          dateRange={dateRange}
          selectingStart={selectingStart}
          hoverDate={hoverDate}
          minNights={Number(minNights)+3}
          onDateClick={handleDateClick}
          onDateHover={setHoverDate}
        />
        <div className=' lg:block  hidden'>
    <CalendarMonth
     availableDates={availableDates}
          month={nextMonth}
          dateRange={dateRange}
          selectingStart={selectingStart}
          hoverDate={hoverDate}
          minNights={Number(minNights)+3}
          onDateClick={handleDateClick}
          onDateHover={setHoverDate}
        />

        </div>
    
      </div>

      <DateRangeFooter
      className={"flex items-center justify-between  border-t border-gray-200  bg-transparent rounded-b-3xl"}
        onClearDates={clearDates}
        onClose={onClose}
        hideClose={true}
      />
    </div>
</div>
  );
};