import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'
import DynamicTable from "../components/DynamicTable";

function Report() {
  // Define state variables to hold the data and the preview data
  const [data, setData] = useState(null);
  const [searchBy, setSearchBy] = useState("Month");
  const [selectedMonth, setSelectedMonth] = useState('');

  // Function to fetch the data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);


  // initializing the deafult month to the current one
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const defaultValue = `${year}-${month}`;
    setSelectedMonth(defaultValue);
  }, []);


  // fetching attendance record from the database
  const fetchData = (query) => {
    axios
      .get("http://localhost:5000/api/data", {
        data: query
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const exportReport = () => {
    axios.get("http://localhost:5000/api/csv_export", {

    }).then((response) => {
      
    })
  }


  return (
    <div className="report-subwindow subwindow">

      <div className="records-specs">

        <label htmlFor="selection">Search By: </label>
        <select name="selection" id="selection" value={searchBy} 
          onChange={(e) => {
            setSearchBy(e.target.value);
          }}>
          <option value="Month">Month</option>
          <option value="Department">Department</option>
          <option value="id">ID</option>
        </select>

        <div>
          <label htmlFor="month">Select a date:</label>
          <input 
            onChange={(e) => {
              setSelectedMonth(e.target.value)
            }}
            type="month" 
            id="month" 
            value={selectedMonth} 
            name="month"
          />
        </div>
      </div>
      
      <div className="records-table-container">
        <DynamicTable data={data}></DynamicTable>
      </div>

      <div className="buttons-container">
        <button type="submit" onClick={fetchData}>
          View Data
        </button>
        <button className="print-btn" onClick={exportReport}>
          Print
        </button>
      </div>
    </div>
  );
}

export default Report;
