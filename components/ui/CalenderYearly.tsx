import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

type Props = {
  onDateChange: (date: Date | undefined) => void;
};

export default function CalenderYearly({ onDateChange }: Props) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (day && month && year) {
      const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
      onDateChange(parsedDate);
    }
  }, [day, month, year]);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-[#8c8c8c]">Date of Birth</Label>
      <div className="flex gap-2">
        <Select onValueChange={(v) => setDay(v)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {days.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setMonth(v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m, index) => (
              <SelectItem key={m} value={(index + 1).toString()}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setYear(v)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
