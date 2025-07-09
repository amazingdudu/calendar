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

## 🚀 快速使用

在 `App.tsx` 中直接引入并使用：

```tsx
import Calendar from "./components/Calendar";

function App() {
  return <Calendar />;
}
```

## 🛠️ 组件 API（以 Calendar 为例）

目前为内聚式用法，所有交互和状态已内置。若需自定义事件、受控用法，可参考源码扩展：

- 支持年月日切换、年份区间切换、补位年份点击、今天按钮
- 可通过修改 props 和状态实现受控

## 🎨 自定义说明

- 样式基于 TailwindCSS，可根据需求自定义 className
- 交互逻辑均有详细注释，便于二次开发
- 如需国际化、事件标记、范围选择等功能，可在现有基础上扩展

---
