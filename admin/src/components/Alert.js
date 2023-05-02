import React, { useState, useEffect } from 'react';
import '../App.css'

function Alert({ message, type }) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return showAlert ? (
    <div className={`alert ${type}`}>
      <p>{message}</p>
    </div>
  ) : null;
}

export default Alert;