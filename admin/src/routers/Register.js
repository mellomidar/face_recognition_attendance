import Axios from "axios";
import React, { useState } from "react";
import "../App.css";

function Register() {
  const [employee_id, setId] = useState();
  const [employee_name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [photo, setPhoto] = useState(null);

  const [imagePreview, setImagePreview] = useState(null)

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
    setPhoto(null);
  }

  const submitRegistration = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    const now = new Date();
    const mysqlDatetime = now.toISOString().slice(0, 19).replace('T', ' ');

    formData.append('employee_id', employee_id);
    formData.append('employee_name', employee_name);
    formData.append('department', department);
    formData.append('designation', designation);
    formData.append('photo', photo);
    formData.append('registered_at', mysqlDatetime);
    formData.append('updated_at', mysqlDatetime);

    try {
      await Axios.post('http://localhost:5000/api/insert', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(() => {
        alert('registration successful');
        clearForm();
      }); 
    } catch (error) {
      console.error('an error');
    }
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
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
              </div>
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                />
              </div>
              <div className="field">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
