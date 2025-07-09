import React, { useState } from "react";
import Calendar from "./components/Calendar";

function App() {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Calendar value={date} onChange={setDate} showTodayButton={false} />
    </div>
  );
}

export default App;
