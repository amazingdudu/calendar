# 日历组件 Calendar

本项目内置了一个高交互、现代风格的日历组件，支持年月日选择、10 年区间年份选择、补位年份切换等功能。

## ✨ 主要特性

- 支持“日历”、“月份”、“年份”三种选择模式，交互流畅
- 年份选择支持 10 年区间切换，补位年份可点击自动切换区间
- 月份选择支持 1~12 月网格，选中自动切换到日期视图
- 日期选择支持高亮、上下月灰显、今天按钮
- TailwindCSS 样式
- 组件化设计，便于二次开发

## 📦 目录结构

```
src/components/
  Calendar.tsx           // 主日历组件
  CalendarHeader.tsx     // 头部（年月/区间切换）
  CalendarWeekdays.tsx   // 星期栏
  CalendarDaysGrid.tsx   // 日期网格
  CalendarFooter.tsx     // 底部“今天”按钮
  CalendarMonths.tsx     // 月份选择
  CalendarYears.tsx      // 年份选择
```

## 🛠️ 组件 API

### Calendar Props

| 属性名          | 类型                        | 说明                                                                         | 默认值       |
| --------------- | --------------------------- | ---------------------------------------------------------------------------- | ------------ |
| value           | `Date \| string`            | 受控用法，当前选中日期                                                       | -            |
| defaultValue    | `Date \| string`            | 非受控用法，初始选中日期                                                     | `new Date()` |
| onChange        | `(date: Date) => void`      | 选中日期变化时回调                                                           | -            |
| showTodayButton | `boolean`                   | 是否显示“今天”按钮                                                           | `true`       |
| disabledDate    | `(date: Date) => boolean`   | 禁用某些日期（返回 true 表示禁用）                                           | -            |
| renderDayCell   | `(date, info) => ReactNode` | 自定义日期单元格渲染，info 包含 isCurrentMonth/isToday/isSelected/isDisabled | -            |
| className       | `string`                    | 自定义外层 class                                                             | -            |
| style           | `React.CSSProperties`       | 自定义外层 style                                                             | -            |

---

## 🚀 基本用法

```tsx
import React, { useState } from "react";
import Calendar from "./components/Calendar";

function App() {
  const [date, setDate] = useState<Date>(new Date());
  return <Calendar value={date} onChange={setDate} />;
}
```

---

### 🎯 非受控用法

```tsx
<Calendar defaultValue="2024-07-01" onChange={(date) => console.log(date)} />
```

---

### ⛔ 禁用部分日期

```tsx
// 禁用所有周末
<Calendar disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6} />
```

---

### 🧩 自定义日期单元格

```tsx
<Calendar
  renderDayCell={(date, info) => (
    <div>
      {date.getDate()}
      {info.isToday && <span style={{ color: "red", fontSize: 10 }}>今</span>}
      {info.isDisabled && (
        <span style={{ color: "#aaa", fontSize: 10 }}>禁</span>
      )}
    </div>
  )}
/>
```

---

### 🎨 自定义样式

```tsx
<Calendar
  className="my-calendar"
  style={{ minWidth: 320, background: "#222" }}
/>
```

---

## 其他说明

- 支持“日历”、“月份”、“年份”三种选择模式，交互流畅
- 年份选择支持 10 年区间切换，补位年份可点击自动切换区间
- 月份选择支持 1~12 月网格，选中自动切换到日期视图
- 日期选择支持高亮、上下月灰显、今天按钮
- 组件化设计，便于二次开发
- 样式基于 TailwindCSS + classnames，易于自定义和扩展

---
