import React from "react";

interface CalendarYearsProps {
  decadeStart: number; // 当前10年区间起始年
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

// 生成12个年份（前后各补1年）
function getYears(decadeStart: number) {
  return Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i);
}

const CalendarYears: React.FC<CalendarYearsProps> = ({
  decadeStart,
  selectedYear,
  onSelectYear,
}) => {
  const years = getYears(decadeStart);
  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {years.map((y, idx) => {
        const isEdge = idx === 0 || idx === 11;
        return (
          <button
            key={y}
            className={`py-2 rounded-lg transition-colors
              ${
                selectedYear === y
                  ? "bg-blue-600 text-white"
                  : isEdge
                  ? "text-gray-500"
                  : "text-gray-200"
              }
              ${!isEdge ? "hover:bg-blue-700" : ""}`}
            onClick={() => onSelectYear(y)}
          >
            {y}
          </button>
        );
      })}
    </div>
  );
};

export default CalendarYears;
