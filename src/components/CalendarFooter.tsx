import React from "react";
import classNames from "classnames";

interface CalendarFooterProps {
  onToday: () => void;
}

// 日历底部，显示“今天”按钮
const CalendarFooter: React.FC<CalendarFooterProps> = ({ onToday }) => {
  return (
    <div className="pt-4 pb-1 flex justify-center">
      <button
        className={classNames(
          "text-blue-500 hover:text-blue-400 font-medium px-4 py-1 rounded"
        )}
        onClick={onToday}
      >
        今天
      </button>
    </div>
  );
};

export default CalendarFooter;
