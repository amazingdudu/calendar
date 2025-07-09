import React, { useState, useMemo, useEffect } from "react";
import classNames from "classnames";
import CalendarHeader from "./CalendarHeader";
import CalendarWeekdays from "./CalendarWeekdays";
import CalendarDaysGrid from "./CalendarDaysGrid";
import CalendarFooter from "./CalendarFooter";
import CalendarMonths from "./CalendarMonths";
import CalendarYears from "./CalendarYears";

interface CalendarProps {
  value?: Date | string;
  defaultValue?: Date | string;
  onChange?: (date: Date) => void;
  showTodayButton?: boolean;
  disabledDate?: (date: Date) => boolean;
  renderDayCell?: (
    date: Date,
    info: {
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isDisabled: boolean;
    }
  ) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 生成日历网格数据（6行7列，共42格），包含当前月、上月、下月的日期。
 */
function getCalendarDays(
  year: number,
  month: number,
  selected: Date,
  disabledDate?: (date: Date) => boolean
) {
  const days: any[] = [];
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startWeekDay = (firstDayOfMonth.getDay() + 6) % 7;
  for (let i = startWeekDay - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({
      date: d,
      isCurrentMonth: false,
      isToday: d.toDateString() === today.toDateString(),
      isSelected: d.toDateString() === selected.toDateString(),
      isDisabled: isDateDisabled(d, disabledDate),
    });
  }
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    const date = new Date(year, month, d);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === selected.toDateString(),
      isDisabled: isDateDisabled(date, disabledDate),
    });
  }
  while (days.length < 42) {
    const d = new Date(year, month, days.length - startWeekDay + 1);
    days.push({
      date: d,
      isCurrentMonth: false,
      isToday: d.toDateString() === today.toDateString(),
      isSelected: d.toDateString() === selected.toDateString(),
      isDisabled: isDateDisabled(d, disabledDate),
    });
  }
  return days;
}

function isDateDisabled(date: Date, disabledDate?: (date: Date) => boolean) {
  if (disabledDate && disabledDate(date)) return true;
  return false;
}

const getDateObj = (d?: Date | string) => {
  if (!d) return new Date();
  if (typeof d === "string") return new Date(d);
  return d;
};

const Calendar: React.FC<CalendarProps> = ({
  value,
  defaultValue,
  onChange,
  showTodayButton = true,
  disabledDate,
  renderDayCell,
  className,
  style,
}) => {
  // 非受控选中日期
  const [innerSelected, setInnerSelected] = useState(() =>
    getDateObj(defaultValue)
  );
  // 受控/非受控统一选中日期
  const selected = useMemo(
    () => (value ? getDateObj(value) : innerSelected),
    [value, innerSelected]
  );

  // 年月状态
  const [year, setYear] = useState(selected.getFullYear());
  const [month, setMonth] = useState(selected.getMonth());
  const [mode, setMode] = useState<"date" | "month" | "year">("date");
  const [decadeStart, setDecadeStart] = useState(
    Math.floor(selected.getFullYear() / 10) * 10
  );

  // 选中日期变更时，自动同步年月
  useEffect(() => {
    setYear(selected.getFullYear());
    setMonth(selected.getMonth());
  }, [selected]);

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
    if (isDateDisabled(date, disabledDate)) return;
    if (!value) setInnerSelected(date);
    onChange?.(date);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  };
  // 回到今天
  const goToday = () => {
    const now = new Date();
    if (isDateDisabled(now, disabledDate)) return;
    if (!value) setInnerSelected(now);
    onChange?.(now);
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
    const lastDay = new Date(year, m + 1, 0).getDate();
    const day = selected.getDate();
    const newSelected = new Date(year, m, Math.min(day, lastDay));
    if (!value) setInnerSelected(newSelected);
    onChange?.(newSelected);
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
      setTimeout(() => setMode("month"), 0);
    } else if (y > decadeStart + 9) {
      setDecadeStart(decadeStart + 10);
      setYear(y);
      setTimeout(() => setMode("month"), 0);
    } else {
      setYear(y);
      setMode("month");
    }
    // 切换年时同步选中日期
    const lastDay = new Date(y, month + 1, 0).getDate();
    const day = selected.getDate();
    const newSelected = new Date(y, month, Math.min(day, lastDay));
    if (!value) setInnerSelected(newSelected);
    onChange?.(newSelected);
  };
  // 切换10年区间
  const prevDecade = () => setDecadeStart(decadeStart - 10);
  const nextDecade = () => setDecadeStart(decadeStart + 10);

  const days = getCalendarDays(year, month, selected, disabledDate);

  return (
    <div
      className={classNames(
        "bg-neutral-900 text-white rounded-lg w-80 p-4 mx-auto shadow-lg",
        className
      )}
      style={style}
    >
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
      {mode === "date" && (
        <CalendarDaysGrid
          days={days.map((cell) => ({
            ...cell,
            render: renderDayCell ? renderDayCell(cell.date, cell) : undefined,
          }))}
          onSelect={selectDay}
        />
      )}
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
      {showTodayButton && <CalendarFooter onToday={goToday} />}
    </div>
  );
};

export default Calendar;
