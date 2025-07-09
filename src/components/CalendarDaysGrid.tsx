import React from "react";

interface DayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
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
          className={`w-9 h-9 rounded-lg flex items-center justify-center mx-auto
            ${cell.isCurrentMonth ? "" : "text-gray-500"}
            ${cell.isSelected ? "bg-blue-600 text-white" : ""}
            ${cell.isToday && !cell.isSelected ? "border border-blue-400" : ""}
            hover:bg-blue-700 transition-colors`}
          onClick={() => onSelect(cell.date)}
        >
          {cell.date.getDate()}
        </button>
      ))}
    </div>
  );
};

export default CalendarDaysGrid;
