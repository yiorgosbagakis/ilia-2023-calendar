
import React, { useState } from 'react';
import './App.css'

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [text, setText] = useState('');

  function handleClick(day, month) {
    setSelectedDay({ day, month });
    setText(localStorage.getItem(`day-${day}-${month}`) || '');
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleSave() {
    localStorage.setItem(`day-${selectedDay.day}-${selectedDay.month}`, text);
  }

  const currentDate = new Date();
  const currentDay = currentDate.getUTCDate();
  const currentMonth = currentDate.getUTCMonth();
  const currentYear = currentDate.getUTCFullYear();

  const months = [
    "Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ",
    "Jul ", "Aug ", "Sep ", "Oct ", "Nov ", "Dec "
  ];
  
  return (
    <div className='App'>
         <h1>🌞 Ilia's 2023 Calendar </h1>
         {selectedDay && (
        <div>
          <textarea value={text} onChange={handleTextChange} /><br></br>
         <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      )}
      {months.map((month, monthIndex) => {
        const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
        return (
          <>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const isCurrentDay = day === currentDay && monthIndex === currentMonth;
              const isSelectedDay = selectedDay && selectedDay.day === day && selectedDay.month === monthIndex;
              return (
                <button
                  key={`${month}${day}`}
                  onClick={() => handleClick(day, monthIndex)}
                  disabled={day < currentDay && monthIndex <= currentMonth}
                  style={{
                    backgroundColor: isCurrentDay ? "#ff770a" : isSelectedDay ? "#000000" : "#eee",
                    margin: "5px",
                    color: isCurrentDay ? "black" : isSelectedDay ? "white" : "black",
                  }}
                >
                  {`${month}${day}`}
                </button>
             )
            })}
          </>
        );
      })}
   
    </div>
  );
}

export default App;
           

   
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
