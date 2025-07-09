import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarWeekdays from "./CalendarWeekdays";
import CalendarDaysGrid from "./CalendarDaysGrid";
import CalendarFooter from "./CalendarFooter";
import CalendarMonths from "./CalendarMonths";
import CalendarYears from "./CalendarYears";

/**
 * 生成日历网格数据（6行7列，共42格），包含当前月、上月、下月的日期。
 * @param year 当前显示的年份
 * @param month 当前显示的月份（0-11）
 * @param selected 当前选中的日期
 * @returns {Array} 每个元素包含date对象、是否本月、是否今天、是否选中
 *
 * Date相关方法说明：
 * - new Date(year, month, day)：构造日期对象，month为0-11，day为1开始。
 *   若day为0，则为上月最后一天；若day超出本月天数，则为下月对应天数。
 * - getDay()：返回星期几（0=周日，1=周一...6=周六）。
 * - getDate()：返回当月的“日”。
 * - toDateString()：返回可比较的日期字符串（只包含年月日）。
 */
function getCalendarDays(year: number, month: number, selected: Date): any[] {
  const days: any[] = [];
  const today = new Date();
  // 本月第一天
  const firstDayOfMonth = new Date(year, month, 1);
  // 本月最后一天
  const lastDayOfMonth = new Date(year, month + 1, 0); // day=0表示上月最后一天
  // 上月最后一天
  const prevMonthLastDay = new Date(year, month, 0);
  // 本月第一天是星期几（0=周一，6=周日）
  // getDay()原生0=周日，+6%7后0=周一，6=周日，方便中国习惯
  const startWeekDay = (firstDayOfMonth.getDay() + 6) % 7;

  // 1. 上月补位：如本月1号是周四，则前面补3天（周一~周三）
  for (let i = startWeekDay - 1; i >= 0; i--) {
    // day为负数时，Date会自动回到上月
    const d = new Date(year, month, -i);
    days.push({
      date: d,
      isCurrentMonth: false,
      isToday: d.toDateString() === today.toDateString(),
      isSelected: d.toDateString() === selected.toDateString(),
    });
  }
  // 2. 本月日期
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    const date = new Date(year, month, d);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === selected.toDateString(),
    });
  }
  // 3. 下月补位：补足42格
  while (days.length < 42) {
    // day超出本月天数，Date会自动进到下月
    const d = new Date(year, month, days.length - startWeekDay + 1);
    days.push({
      date: d,
      isCurrentMonth: false,
      isToday: d.toDateString() === today.toDateString(),
      isSelected: d.toDateString() === selected.toDateString(),
    });
  }
  return days;
}

// 主日历组件
const Calendar: React.FC = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-11
  const [selected, setSelected] = useState(now);
  const [mode, setMode] = useState<"date" | "month" | "year">("date"); // 支持year模式
  const [decadeStart, setDecadeStart] = useState(
    Math.floor(now.getFullYear() / 10) * 10
  ); // 10年区间起始

  // 切换到上个月
  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };
  // 切换到下个月
  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };
  // 切换到上一年
  const prevYear = () => setYear(year - 1);
  // 切换到下一年
  const nextYear = () => setYear(year + 1);
  // 选中某天
  const selectDay = (date: Date) => {
    setSelected(date);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  };
  // 回到今天
  const goToday = () => {
    setSelected(now);
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setMode("date");
  };
  // 点击月份，切换到月份选择模式
  const handleMonthClick = () => setMode("month");
  // 选择某月，切回日期模式并显示该月，并同步选中日期
  const handleSelectMonth = (m: number) => {
    setMonth(m);
    setMode("date");
    // 计算该月的天数
    const lastDay = new Date(year, m + 1, 0).getDate();
    const day = selected.getDate();
    // 如果原选中日大于该月最大天数，则选中该月最后一天
    const newSelected = new Date(year, m, Math.min(day, lastDay));
    setSelected(newSelected);
  };

  // 点击年份，切换到年份选择模式
  const handleYearClick = () => {
    setMode("year");
    setDecadeStart(Math.floor(year / 10) * 10);
  };

  // 选择某年，支持补位点击切换区间并选中，选中后进入月份选择
  const handleSelectYear = (y: number) => {
    if (y < decadeStart) {
      setDecadeStart(decadeStart - 10);
      setYear(y);
      setTimeout(() => setMode("month"), 0); // 进入月份选择
    } else if (y > decadeStart + 9) {
      setDecadeStart(decadeStart + 10);
      setYear(y);
      setTimeout(() => setMode("month"), 0);
    } else {
      setYear(y);
      setMode("month");
    }
  };

  // 切换10年区间
  const prevDecade = () => setDecadeStart(decadeStart - 10);
  const nextDecade = () => setDecadeStart(decadeStart + 10);

  const days = getCalendarDays(year, month, selected);

  return (
    <div className="bg-neutral-900 text-white rounded-lg w-80 p-4 mx-auto shadow-lg">
      <CalendarHeader
        year={year}
        month={month}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onPrevYear={mode === "year" ? prevDecade : prevYear}
        onNextYear={mode === "year" ? nextDecade : nextYear}
        onMonthClick={handleMonthClick}
        onYearClick={handleYearClick}
        showMonth={mode === "date"}
        decadeTitle={
          mode === "year" ? `${decadeStart}年-${decadeStart + 9}年` : undefined
        }
      />
      {mode === "date" && <CalendarWeekdays />}
      {mode === "date" && <CalendarDaysGrid days={days} onSelect={selectDay} />}
      {mode === "month" && (
        <CalendarMonths
          selectedMonth={month}
          onSelectMonth={handleSelectMonth}
        />
      )}
      {mode === "year" && (
        <CalendarYears
          decadeStart={decadeStart}
          selectedYear={year}
          onSelectYear={handleSelectYear}
        />
      )}
      <CalendarFooter onToday={goToday} />
    </div>
  );
};

export default Calendar;
