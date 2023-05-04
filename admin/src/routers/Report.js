import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'
import DynamicTable from "../components/DynamicTable";

function Report() {
  // Define state variables to hold the data and the preview data
  const [data, setData] = useState(null);
  const [selectedSearch, setSelectedSearch] = useState("Month");

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

  const handleSelectChange = (event) => {
    setSelectedSearch(event.target.value);
  }

  const exportReport = () => {
    axios.get("http://localhost:5000/api/csv_export", {

    }).then((response) => {
      
    })
  }

  return (
    <div className="report-subwindow subwindow">

      <div className="records-specs">
        <label htmlFor="selection">Search By: </label>
        <select name="selection" id="selection" value={selectedSearch} 
        onChange={handleSelectChange}>
          <option value="Month">Month</option>
          <option value="Department">Department</option>
          <option value="id">ID</option>
        </select>
        <div>
          <label for="date">Select a date:</label>
          <input type="month" id="month" name="month"/>
        </div>
      </div>
      
      <div className="records-table-container">
        <DynamicTable data={data}></DynamicTable>
      </div>

      <div className="buttons-container">
        <button type="submit" onClick={fetchData}>
          View Data
        </button>
      </div>
      <button className="print-btn" onClick={exportReport}>Print</button>
    </div>
  );
}

export default Report;
