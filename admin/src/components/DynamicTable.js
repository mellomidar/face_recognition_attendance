import React, { useEffect, useState } from 'react';
import '../App.css';
import EmployeeInfo from './EmployeeInfo';

function DynamicTable({ data }) {

  const [targetId, setTargetId] = useState('');
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [closeBtnVisible, setCloseBtnVisible] = useState('none');

  const [crudVisible, setCrudVisible] = useState(false);

  const rowMouseOver = (event) => {
    setTargetId(event.target.parentNode.childNodes[1].textContent);
  }

  const handleRowClick = () => {
    setUserInfoVisible(true);
    setCloseBtnVisible('block');
    setCrudVisible(true);
  }

  const handleCloseUserInfo = () => {
    setUserInfoVisible(false);
    setCloseBtnVisible('none');
    setCrudVisible(false);
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
              <th style={{width:'50px'}}></th>
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
                <td style={{width: '50px'}}>{row.id}</td>
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
          {crudVisible && (
            <>
              <button style={{display: closeBtnVisible}} className='user-info-btn' onClick={handleCloseUserInfo}>X</button>
              {
                crudVisible && <EmployeeInfo id={targetId} onClose={handleCloseUserInfo}/>
              }
            </>
          )}
        </div>
      </>
    );
  }

  // if data corresponds to attendance database table

  return (
    <table className='record_table'>
      <thead>
        <tr>
          <th style={{width:'50px'}}></th>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Morning In</th>
          <th>Morning Out</th>
          <th>Afternoon In</th>
          <th>Afternoon Out</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td style={{width: '50px'}}>{row.id}</td>
            <td>{row.employee_id}</td>
            <td>{row.name}</td>
            <td>{row.date}</td>
            <td>{row.status}</td>
            <td>{row.morning_in}</td>
            <td>{row.morning_out}</td>
            <td>{row.afternoon_in}</td>
            <td>{row.afternoon_out}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;