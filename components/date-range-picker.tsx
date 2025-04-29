"use client"

import { useState, useRef, useEffect } from "react"
import { DateRangePicker, type RangeKeyDict } from "react-date-range"
import { X } from "lucide-react"

// Import the styles
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface DateRange {
  startDate: Date | null
  endDate: Date | null
  key: string
}

interface DateRangePickerProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (dates: [Date | null, Date | null]) => void
  initialStartDate?: Date | null
  initialEndDate?: Date | null
  type: "check-in" | "check-out"
}

export default function CustomDateRangePicker({
  isOpen,
  onClose,
  onSelect,
  initialStartDate = null,
  initialEndDate = null,
  type,
}: DateRangePickerProps) {
  const [state, setState] = useState<DateRange[]>([
    {
      startDate: initialStartDate || new Date(),
      endDate: initialEndDate || null,
      key: "selection",
    },
  ])

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    setState([
      {
        startDate: initialStartDate || new Date(),
        endDate: initialEndDate,
        key: "selection",
      },
    ])
  }, [initialStartDate, initialEndDate])

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection
    setState([selection as DateRange])

    if (selection.startDate && selection.endDate) {
      onSelect([selection.startDate, selection.endDate])
      if (type === "check-out" || (type === "check-in" && selection.endDate !== selection.startDate)) {
        setTimeout(() => onClose(), 300)
      }
    } else if (selection.startDate) {
      onSelect([selection.startDate, null])
    }
  }

  const handleClearDates = () => {
    setState([
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ])
    onSelect([null, null])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/20">
      <div
        ref={containerRef}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl animate-in fade-in duration-200"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select {type === "check-in" ? "check in" : "check out"} date</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-500 mb-6">Add your dates for exact pricing</p>

        <div className="custom-date-range-picker">
          <DateRangePicker
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"
            className="custom-date-range"
            rangeColors={["#000"]}
            showMonthAndYearPickers={false}
            showDateDisplay={false}
            staticRanges={[]}
            inputRanges={[]}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={handleClearDates} className="text-sm font-medium text-gray-700 hover:underline">
            Clear dates
          </button>
        </div>
      </div>
    </div>
  )
}

