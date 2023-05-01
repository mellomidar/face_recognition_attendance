import Axios from "axios";
import React, { useState } from "react";
import "../App.css";
import Alert from "../components/Alert";
const moment = require('moment')

function Register() {
  const [employee_id, setId] = useState("");
  const [employee_name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null)

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setPhoto(e.target.files[0])

    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file);
  }

  const clearForm = () => {
    setId("");
    setName("");
    setDepartment("");
    setDesignation("");
    setImagePreview(null);
    setPhoto(null)
  }

  const submitRegistration = async (e) => {

    e.preventDefault();
    clearForm();

    const formData = new FormData();
    const currentDatetime = moment().format('YYYY-MM-DD HH:mm:ss');

    formData.append('employee_id', employee_id);
    formData.append('employee_name', employee_name);
    formData.append('department', department);
    formData.append('designation', designation);
    formData.append('photo', photo);
    formData.append('registered_at', currentDatetime);
    formData.append('updated_at', currentDatetime);

    await Axios.post('http://localhost:5000/api/insert', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      console.log('here')
    }).catch((error) => {
      setAlertText("Registration Failed");
      setShowAlert(true);
    })
  };

  return (
    <div className="register-window subwindow">
      <div className="registration-form">
        <form onSubmit={submitRegistration}>
        <h1>Registration Form</h1>
          <div className="form-inputs">
            <div className="form-group">
              <div className="field">
                <label>ID Number</label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={employee_id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  pattern="[0-9]+"
                  inputMode="numeric"
                  title="Enter a Number"
                  required
                />
              </div>
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={employee_name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="field">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="field">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="field">
                <label htmlFor="photo"> + Upload</label>
                <div className="preview-wrapper">
                  {imagePreview && (<img className="preview" src={imagePreview} alt="Preview" />)}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="photo"
                  className="file-picker"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                    handleImageChange(e)
                  }}
                />
              </div>
            </div>
          </div>
          {showAlert && (<Alert type="sucess" message={alertText}/>)}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
