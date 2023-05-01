import React, { useState } from 'react';
import '../App.css';
import EmployeeInfo from './EmployeeInfo';

function DynamicTable({ data }) {

  const [targetId, setTargetId] = useState('');
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [closeBtnVisible, setCloseBtnVisible] = useState('none');

  const rowMouseOver = (event) => {
    setTargetId(event.target.parentNode.childNodes[1].textContent);
  }

  const handleRowClick = () => {
    setUserInfoVisible(true);
    setCloseBtnVisible('block');
  }

  const handleCloseUserInfo = () => {
    setUserInfoVisible(false);
    setCloseBtnVisible('none');
  }

  if(!data) {
    return;
  } 
  
  else if(Object.keys(data[0]).length === 7){
    return (
      <>
        <table className='record_table'>
          <thead>
            <tr>
              <th></th>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Registered</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} onClick={handleRowClick} onMouseOver={rowMouseOver}>
                <td>{row.id}</td>
                <td>{row.employee_id}</td>
                <td>{row.name}</td>
                <td>{row.department}</td>
                <td>{row.designation}</td>
                <td>{row.registered_at}</td>
                <td>{row.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Rendering User Info Page */}
        <div>
          <button style={{display: closeBtnVisible}} className='user-info-btn' onClick={handleCloseUserInfo}>X</button>
          {
            userInfoVisible && <EmployeeInfo id={targetId}/>
          }
        </div>
      </>
    );
  }

  // if data corresponds to attendance database table

  return (
    <table className='record_table'>
      <thead>
        <tr>
          <th></th>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.employee_id}</td>
            <td>{row.name}</td>
            <td>{row.date}</td>
            <td>{row.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;