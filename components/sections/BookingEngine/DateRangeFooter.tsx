import React from "react";
import { Button } from "@/components/ui/button";

interface DateRangeFooterProps {
  onClearDates: () => void;
  onClose: () => void;
  hideClose?:boolean;
  className?:any
}

export const DateRangeFooter: React.FC<DateRangeFooterProps> = ({
  onClearDates,
  hideClose=false,
  onClose,
  className="flex items-center justify-between px-8 py-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl",
}) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-4"></div>
      <div className=" flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={onClearDates}
          className="text-sm underline font-medium text-gray-900 hover:bg-transparent"
        >
          Clear dates
        </Button>

        {!hideClose && (
          <Button
            onClick={onClose}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium"
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
};
