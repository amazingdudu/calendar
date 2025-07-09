import React from "react";
import classNames from "classnames";

// 星期栏，显示一到日
const weekdays = ["一", "二", "三", "四", "五", "六", "日"];

const CalendarWeekdays: React.FC = () => {
  return (
    <div
      className={classNames(
        "grid grid-cols-7 text-center text-gray-300 pb-2 select-none"
      )}
    >
      {weekdays.map((day) => (
        <div key={day} className={classNames("font-medium")}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarWeekdays;
