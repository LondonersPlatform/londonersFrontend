import React from "react";
import { X } from "lucide-react";
import { format } from "date-fns";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeHeaderProps {
  dateRange: DateRange;
  nights: number;
  hideDatesPreview?: boolean;
  className?: any;
  onDateRangeChange: (range: DateRange) => void;
}

export const DateRangeHeader: React.FC<DateRangeHeaderProps> = ({
  dateRange,
  nights,
  hideDatesPreview = false,
  onDateRangeChange,
  className = "px-8 py-6 border-b border-gray-200",
}) => {
  const [activeField, setActiveField] = React.useState<"from" | "to">("from");

  React.useEffect(() => {
    if (dateRange.from && !dateRange.to) {
      setActiveField("to");
    } else if (!dateRange.from && !dateRange.to) {
      setActiveField("from");
    }
  }, [dateRange.from, dateRange.to]);

  return (
    <div className={className}>
      <div className="lg:flex    w-full items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {nights > 0 ? `${nights} nights` : "Select dates"}
          </h2>
          <p className="text-[#00000099]">
            {nights > 0 ? "" : "Add your travel dates for exact pricing"}
          </p>
          {dateRange.from && dateRange.to && (
            <p className="text-gray-600 text-sm mt-1">
              {format(dateRange.from, "dd MMM yyyy")} -{" "}
              {format(dateRange.to, "dd MMM yyyy")}
            </p>
          )}
        </div>

        {!hideDatesPreview && (
          <div className="flex shadow lg:mt-auto mt-6 lg:w-auto w-full   rounded-xl gap-0">
            {/* Check-in */}
            <div className="flex w-1/2 lg:w-auto">
              <div
                onClick={() => setActiveField("from")}
                className={` border w-full rounded-s-lg p-3 py-1 bg-white relative lg:w-[200px] cursor-pointer transition-colors duration-300
                ${
                  activeField === "from"
                    ? "border-[2px] border-black"
                    : "border-gray-300"
                }`}
              >
                <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  CHECK-IN
                </label>
                <div className="text-gray-900 text-sm">
                  {dateRange.from
                    ? format(dateRange.from, "dd/MM/yyyy")
                    : "Add date"}
                </div>
                {dateRange.from && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDateRangeChange({ from: undefined, to: dateRange.to });
                      setActiveField("from");
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Check-out */}
            <div className="flex  w-1/2 lg:w-auto">
              <div
                onClick={() => {
                  if (!dateRange.from) return;
                  setActiveField("to");
                }}
                className={`border w-full rounded-e-lg p-3 py-1 bg-white relative lg:w-[200px] transition-colors duration-300
                ${
                  !dateRange.from && !dateRange.to
                    ? "border-gray-300 opacity-50 cursor-not-allowed"
                    : activeField === "to"
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  CHECKOUT
                </label>
                <div className="text-gray-900 mt-1">
                  {dateRange.to
                    ? format(dateRange.to, "dd/MM/yyyy")
                    : "Add date"}
                </div>
                {dateRange.to && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDateRangeChange({
                        from: dateRange.from,
                        to: undefined,
                      });
                      setActiveField("to");
                    }}
                    disabled={!dateRange.from && !dateRange.to}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:text-gray-300"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
