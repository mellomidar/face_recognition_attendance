import React, { useState, useEffect } from 'react';
import '../App.css';

function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='date-time flexed'>
      <p className='ft-10'>Date : {dateTime.toLocaleDateString()}</p> 
      <p className='ft-10'>Time : {dateTime.toLocaleTimeString()}</p>
    </div>
  );
}

export default DateTime;