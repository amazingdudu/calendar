import React from "react";
import classNames from "classnames";

interface CalendarMonthsProps {
  selectedMonth: number; // 0-11
  onSelectMonth: (month: number) => void;
}

const months = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

// 月份选择组件
const CalendarMonths: React.FC<CalendarMonthsProps> = ({
  selectedMonth,
  onSelectMonth,
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {months.map((m, idx) => (
        <button
          key={m}
          className={classNames("py-2 rounded-lg transition-colors", {
            "bg-blue-600 text-white": selectedMonth === idx,
            "text-gray-200": selectedMonth !== idx,
            "hover:bg-blue-700": true,
          })}
          onClick={() => onSelectMonth(idx)}
        >
          {m}
        </button>
      ))}
    </div>
  );
};

export default CalendarMonths;
