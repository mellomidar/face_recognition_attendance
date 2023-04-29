import React, { useState, useEffect} from 'react';
import "../App.css";
import Container from "./Container";
import axios from 'axios';

function AttendanceData({ duration}) {
  const [visible, setVisible] = useState(true);

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) {
    return null;
  }

  return (
    <Container className="att-data flexed">
      <form className="att-data-form flexed">
        <div className="form-left flexed">
          <img className="emp-img" alt="employee" />
          <label className="flexed">
            ID : <input type="text" className="ft-12" readOnly></input>
          </label>
        </div>
        <div className="form-right">
          <div className="att-data-inputs flexed">
            <label>
              Name :<input type="text" readOnly></input>
            </label>
            <label>
              Department :<input type="text" className="ft-12" readOnly></input>
            </label>
            <label>
              Designation :
              <input type="text" className="ft-12" readOnly></input>
            </label>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default AttendanceData;
