import React from "react";

interface CalendarHeaderProps {
  year: number;
  month: number; // 0-11
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onMonthClick?: () => void; // 新增
  onYearClick?: () => void; // 新增
  showMonth?: boolean; // 控制是否显示月份
  decadeTitle?: string; // 新增，显示10年区间标题
}

// 日历头部，显示年月和切换按钮
const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  onMonthClick,
  onYearClick,
  showMonth = true,
  decadeTitle,
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
        {showMonth && (
          <button
            onClick={onPrevMonth}
            className="text-xl px-1 hover:text-blue-400"
          >
            ‹
          </button>
        )}
      </div>
      {/* 年月或10年区间显示 */}
      <div className="font-bold text-lg flex items-center gap-1">
        {decadeTitle ? (
          <span>{decadeTitle}</span>
        ) : (
          <>
            <span
              className="cursor-pointer px-1 rounded hover:bg-blue-700 hover:text-white transition-colors"
              onClick={onYearClick}
              title="选择年份"
            >
              {year}年
            </span>
            {showMonth && (
              <span
                className="cursor-pointer px-1 rounded hover:bg-blue-700 hover:text-white transition-colors"
                onClick={onMonthClick}
                title="选择月份"
              >
                {month + 1}月
              </span>
            )}
          </>
        )}
      </div>
      {/* 年份和月份切换按钮 */}
      <div className="flex items-center gap-2">
        {showMonth && (
          <button
            onClick={onNextMonth}
            className="text-xl px-1 hover:text-blue-400"
          >
            ›
          </button>
        )}
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
