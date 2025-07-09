import React from "react";

interface CalendarHeaderProps {
  year: number;
  month: number; // 0-11
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
}

// 日历头部，显示年月和切换按钮
const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
}) => {
  return (
    <div className="flex items-center justify-between py-2 select-none">
      {/* 年份和月份切换按钮 */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevYear}
          className="text-xl px-1 hover:text-blue-400"
        >
          «
        </button>
        <button
          onClick={onPrevMonth}
          className="text-xl px-1 hover:text-blue-400"
        >
          ‹
        </button>
      </div>
      {/* 年月显示 */}
      <div className="font-bold text-lg">
        {year}年 {month + 1}月
      </div>
      {/* 年份和月份切换按钮 */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNextMonth}
          className="text-xl px-1 hover:text-blue-400"
        >
          ›
        </button>
        <button
          onClick={onNextYear}
          className="text-xl px-1 hover:text-blue-400"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
