import React from "react";
import classNames from "classnames";

interface DayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled?: boolean;
  render?: React.ReactNode;
}

interface CalendarDaysGridProps {
  days: DayCell[];
  onSelect: (date: Date) => void;
}

// 日期网格，显示 6 行 7 列
const CalendarDaysGrid: React.FC<CalendarDaysGridProps> = ({
  days,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-7 gap-y-1 text-center select-none">
      {days.map((cell, idx) => (
        <button
          key={idx}
          className={classNames(
            "w-9 h-9 rounded-lg flex items-center justify-center mx-auto transition-colors",
            {
              "text-gray-500": !cell.isCurrentMonth,
              "bg-blue-600 text-white": cell.isSelected,
              "border border-blue-400": cell.isToday && !cell.isSelected,
              "hover:bg-blue-700": !cell.isDisabled,
              "opacity-50 cursor-not-allowed": cell.isDisabled,
            }
          )}
          onClick={() => !cell.isDisabled && onSelect(cell.date)}
          disabled={cell.isDisabled}
        >
          {cell.render !== undefined ? cell.render : cell.date.getDate()}
        </button>
      ))}
    </div>
  );
};

export default CalendarDaysGrid;
