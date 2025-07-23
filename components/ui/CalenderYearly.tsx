"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString())

type Props = {
  onDateChange: (date: Date | undefined) => void
  initialDate?: Date
  value?: Date
  defaultValue?: Date
  selectedDate?: Date
}

export default function CalenderYearly({ onDateChange, initialDate, value, defaultValue, selectedDate }: Props) {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  // Function to parse date and set initial values
  const setInitialValues = (date: Date) => {
    const dayValue = date.getDate().toString()
    const monthValue = (date.getMonth() + 1).toString() // getMonth() returns 0-11
    const yearValue = date.getFullYear().toString()

    setDay(dayValue)
    setMonth(monthValue)
    setYear(yearValue)
  }
useEffect(() => {
  if (day && month && year) {
    const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    if (!isNaN(newDate.getTime())) {
      onDateChange(newDate)
    }
  }
}, [day, month, year])
  
 useEffect(() => {
  const dateToUse = initialDate || value || defaultValue || selectedDate
  if (dateToUse && !isNaN(dateToUse.getTime())) {
    const newDay = dateToUse.getDate().toString()
    const newMonth = (dateToUse.getMonth() + 1).toString()
    const newYear = dateToUse.getFullYear().toString()

    // Avoid unnecessary updates that cause infinite loop
    if (newDay !== day || newMonth !== month || newYear !== year) {
      setDay(newDay)
      setMonth(newMonth)
      setYear(newYear)
    }
  }
}, [initialDate, value, defaultValue, selectedDate])


  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-[#8c8c8c]">Date of Birth</Label>
      <div className="flex gap-2">
        <Select value={day} onValueChange={(v) => setDay(v)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {days.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={month} onValueChange={(v) => setMonth(v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m, index) => (
              <SelectItem key={m} value={(index + 1).toString()}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={year} onValueChange={(v) => setYear(v)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
